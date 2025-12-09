/*
  friends.js
  - Maneja la ventana de "Mis Amigos" y el chat local.
  - Almacena la lista de amigos por usuario en localStorage.
  - Guarda mensajes globales en localStorage bajo la clave 'global_chats'
  - Diseño simple para pruebas: mensajes se comparten entre cuentas cambiando la sesión (sessionStorage.usuarioLogueado).
  NOTA: Este archivo usa solo almacenamiento local (no hay servidor).
*/

(function(){
  // Variables DOM que se asignan en init para soportar inclusión del script en <head>
  let popup = null;
  let btnOpen = null;
  let btnClose = null;
  let friendsListEl = null;
  let onlineListEl = null;
  let chatHeader = null;
  let messagesEl = null;
  let inputEl = null;
  let sendBtn = null;
  let tabs = [];
  let panelFriends = null;
  let panelAdd = null;
  let panelOnline = null;
  let addForm = null;
  let newFriendUsername = null;
  let addFriendErrorEl = null;
  let popupContent = null;

  // Devuelve el nombre de usuario que está en sesión (usuario activo).
  // Si no hay sesión, devolvemos 'anon' para evitar claves inválidas.
  function getLoggedUser(){
    return sessionStorage.getItem('usuarioLogueado') || 'anon';
  }

  // Genera la clave de localStorage para la lista de amigos de un usuario concreto.
  // Por ejemplo: friends_list_mario
  function friendsStorageKeyFor(user){
    return `friends_list_${user}`;
  }

  // Carga la lista de amigos del usuario actualmente logueado.
  function loadFriends(){
    const user = getLoggedUser();
    const key = friendsStorageKeyFor(user);
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch(e){ return []; }
  }

  // Guarda la lista de amigos para el usuario actualmente logueado.
  function saveFriends(list){
    const user = getLoggedUser();
    const key = friendsStorageKeyFor(user);
    localStorage.setItem(key, JSON.stringify(list));
  }

  // Mensajes solo en `global_chats`.

  // Estructura: [{ from: 'usernameA', to: 'usernameB', text: '...', ts: 123456789 }, ...]
  // Carga el array global de mensajes que almacenan {from,to,text,ts}.
  // Este arreglo permite que, al cambiar de sesión (usuario), los mensajes enviados
  // por A hacia B se vean cuando B inicie sesión.
  function loadGlobalMessages(){
    try { return JSON.parse(localStorage.getItem('global_chats')) || []; } catch(e) { return []; }
  }

  // Guarda el array global de mensajes en localStorage.
  function saveGlobalMessages(arr){
    try { localStorage.setItem('global_chats', JSON.stringify(arr)); } catch(e) {}
  }

  // Añade un mensaje al almacenamiento global.
  // 'from' y 'to' deben ser usernames (strings).
  function addGlobalMessage(from, to, text){
    if (!from || !to || !text) return;
    const all = loadGlobalMessages();
    const msg = { from, to, text, ts: Date.now() };
    all.push(msg);
    saveGlobalMessages(all);
    return msg;
  }

  // Devuelve todos los mensajes globales intercambiados entre userA y userB.
  function loadConversationGlobal(userA, userB){
    if (!userA || !userB) return [];
    const all = loadGlobalMessages();
    return all.filter(m => (m.from === userA && m.to === userB) || (m.from === userB && m.to === userA));
  }

  // Renderiza la lista de amigos en el panel izquierdo.
  // Cada elemento incluye el nombre, indicador online y un botón para eliminar.
  function renderFriends(){
    const friendArr = loadFriends();
    friendsListEl.innerHTML = '';
    friendArr.forEach(f => {
      const li = document.createElement('li');
      li.className = 'friend-item';
      li.style.position = 'relative';
      li.dataset.friendId = f.id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'friend-btn btn btn-block';
      // compose content: name + online dot
      const span = document.createElement('span');
      span.textContent = f.name;
      btn.appendChild(span);
      if (f.online) {
        const dot = document.createElement('span'); dot.className = 'online-dot online'; dot.setAttribute('aria-hidden','true');
        btn.appendChild(dot);
      }
      btn.addEventListener('click', (e) => { e.stopPropagation(); selectFriend(f.id, f.name, li); });
      // Boton de eliminar amigo
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'friend-delete';
      delBtn.title = 'Eliminar amigo';
      delBtn.innerHTML = '&times;';
      delBtn.addEventListener('click', (ev) => { ev.stopPropagation(); showDeleteFriendConfirm(f.id, f.name); });
      li.appendChild(btn);
      li.appendChild(delBtn);
      friendsListEl.appendChild(li);
    });
  }

  // Renderiza la lista de amigos que están online (pequeña lista separada).
  function renderOnline(){
    const friendArr = loadFriends().filter(f => f.online);
    onlineListEl.innerHTML = '';
    if (!friendArr.length) {
      const li = document.createElement('li'); li.className='friend-item'; li.textContent = 'No hay amigos online'; onlineListEl.appendChild(li); return;
    }
    friendArr.forEach(f => {
      const li = document.createElement('li'); li.className = 'friend-item';
      const btn = document.createElement('button'); btn.type='button'; btn.className='friend-btn btn btn-block'; btn.textContent = f.name;
      btn.addEventListener('click', ()=> selectFriend(f.id, f.name, li));
      // icono de online
      const dot = document.createElement('span'); dot.className='online-dot online'; li.appendChild(btn); li.appendChild(dot);
      onlineListEl.appendChild(li);
    });
  }

  // Elimina un amigo de la lista del usuario actual y borra su conversación.
  function _performDeleteFriend(id){
    if (!id) return;
    let friends = loadFriends();
    friends = friends.filter(f => f.id !== id);
    saveFriends(friends);
    if (currentFriendId === id) {
      currentFriendId = null;
      setChatActive(false);
      if (popupContent) popupContent.classList.remove('chat-open');
      chatHeader.textContent = 'Selecciona un amigo para chatear';
      messagesEl.innerHTML = '';
    }
    renderFriends();
    renderOnline();
  }

  // Muestra el popup de confirmación para eliminar a un amigo.
  // Si el popup no existe, usa un confirm() como fallback.
  function showDeleteFriendConfirm(id, name){
    const popupDel = document.getElementById('popupEliminarAmigo');
    // fallback to simple confirm if popup is missing
    if (!popupDel) {
      if (window.confirm(`¿Eliminar a ${name} de tu lista de amigos?`)) _performDeleteFriend(id);
      return;
    }
    const msgEl = popupDel.querySelector('#eliminarAmigoMsg');
    if (msgEl) msgEl.textContent = `¿Eliminar a ${name} de tu lista de amigos?`;
    if (popupDel.parentElement !== document.body) document.body.appendChild(popupDel);
    popupDel.classList.add('active');
    document.body.classList.add('no-scroll');

    const confirmar = document.getElementById('confirmarEliminarAmigo');
    const cancelar = document.getElementById('cancelarEliminarAmigo');

    function cleanup(){
      popupDel.classList.remove('active');
      document.body.classList.remove('no-scroll');
      confirmar.removeEventListener('click', onConfirm);
      cancelar.removeEventListener('click', onCancel);
    }

    function onConfirm(e){ e.stopPropagation(); _performDeleteFriend(id); cleanup(); }
    function onCancel(e){ e.stopPropagation(); cleanup(); }

    confirmar.addEventListener('click', onConfirm);
    cancelar.addEventListener('click', onCancel);

    // Si haces click fuera, se cierra el popup
    function onOverlay(e){ if (e.target === popupDel) { cleanup(); popupDel.removeEventListener('click', onOverlay); } }
    popupDel.addEventListener('click', onOverlay);
  }

  let currentFriendId = null;
  const chatPanelEl = document.querySelector('.chat-panel');

  // Muestra u oculta el panel de chat (lado derecho).
  function setChatActive(active) {
    if (!chatPanelEl) return;
    chatPanelEl.classList.toggle('chat-active', !!active);
  }

  // Selecciona un amigo: marca el elemento activo, carga mensajes y abre el panel de chat.
  function selectFriend(id, name, el){
    currentFriendId = id;
    // mark active
    document.querySelectorAll('.friend-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
    chatHeader.textContent = name;
    renderMessages(id);
    inputEl.focus();
    // muestra el chat al seleccionar un amigo
    if (popupContent) popupContent.classList.add('chat-open');
    setChatActive(true);
  }

  function renderMessages(id){
    // Carga únicamente los mensajes globales entre el usuario logueado y el amigo.
    const logged = getLoggedUser();
    const conv = loadConversationGlobal(logged, id) || [];
    const sorted = conv.slice().sort((a,b) => (a.ts||0) - (b.ts||0));
    messagesEl.innerHTML = '';
    if (!sorted.length){
      const p = document.createElement('div'); p.className='msg them'; p.textContent = 'No hay mensajes aún. Inicia la conversación.'; messagesEl.appendChild(p);
      return;
    }
    sorted.forEach(m => {
      const d = document.createElement('div');
      const isMe = (m.from === logged);
      d.className = 'msg ' + (isMe ? 'me' : 'them');
      d.textContent = m.text;
      messagesEl.appendChild(d);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Abre la ventana popup de "Mis Amigos" (se añade al body para evitar recortes por overflow).
  function openPopup(){
    if (!popup) return;
    if (popup.parentElement !== document.body) document.body.appendChild(popup);
    popup.classList.add('active');
    popup.setAttribute('aria-hidden','false');
    document.body.classList.add('no-scroll');
    // default to friends tab
    activateTab('friends');
    renderFriends();
    renderOnline();
    // hide chat until a friend is selected
    setChatActive(false);
    if (popupContent) popupContent.classList.remove('chat-open');
  }

  // Cierra la ventana popup y limpia el estado del chat.
  function closePopup(){
    if (!popup) return;
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden','true');
    document.body.classList.remove('no-scroll');
    currentFriendId = null;
    document.querySelectorAll('.friend-item').forEach(i => i.classList.remove('active'));
    chatHeader.textContent = 'Selecciona un amigo para chatear';
    messagesEl.innerHTML = '';
    // hide chat when closing
    setChatActive(false);
    if (popupContent) popupContent.classList.remove('chat-open');
  }

  // Envía un mensaje: lo guarda en el almacenamiento global con {from,to,text,ts}.
  // De esta forma, cuando el destinatario inicie sesión verá el mensaje.
  function sendMessage(){
    const text = (inputEl && inputEl.value || '').trim();
    if (!text || !currentFriendId) return;
    const logged = getLoggedUser();
    // Añadir mensaje al almacén global
    addGlobalMessage(logged, currentFriendId, text);
    // No duplicamos en el almacenamiento legacy para evitar entradas repetidas.
    inputEl.value = '';
    renderMessages(currentFriendId);
  }

  // Maneja las pestañas dentro del popup: Amigos / Añadir / Online.
  // Muestra/oculta paneles y controla si debe aparecer el panel de chat.
  function activateTab(name){
    tabs.forEach(t => { t.classList.toggle('active', t.dataset.tab === name); t.setAttribute('aria-selected', t.dataset.tab === name ? 'true' : 'false'); });
    panelFriends.classList.toggle('panel-active', name === 'friends'); panelFriends.setAttribute('aria-hidden', name === 'friends' ? 'false' : 'true');
    panelAdd.classList.toggle('panel-active', name === 'add'); panelAdd.setAttribute('aria-hidden', name === 'add' ? 'false' : 'true');
    panelOnline.classList.toggle('panel-active', name === 'online'); panelOnline.setAttribute('aria-hidden', name === 'online' ? 'false' : 'true');
    // si salimos de la pestaña "amigos", ocultar el chat
    if (name !== 'friends') {
      setChatActive(false);
      if (popupContent) popupContent.classList.remove('chat-open');
    } else {
      // si volvemos a "amigos" y hay un amigo seleccionado, mostrar chat
      if (!!currentFriendId) {
        if (popupContent) popupContent.classList.add('chat-open');
        setChatActive(true);
      } else {
        if (popupContent) popupContent.classList.remove('chat-open');
        setChatActive(false);
      }
    }
  }

  // Inicializar bindings cuando el DOM esté listo (soporta script en <head>)
  function initFriendsBindings(){
    popup = document.getElementById('popupFriends');
    btnOpen = document.getElementById('btnMisAmigos');
    btnClose = document.getElementById('closeFriends');
    friendsListEl = document.getElementById('friendsList');
    onlineListEl = document.getElementById('onlineList');
    chatHeader = document.getElementById('chatHeader');
    messagesEl = document.getElementById('messages');
    inputEl = document.getElementById('chatInput');
    sendBtn = document.getElementById('chatSend');
    tabs = Array.from(document.querySelectorAll('.friends-tab-btn'));
    panelFriends = document.getElementById('panel-friends');
    panelAdd = document.getElementById('panel-add');
    panelOnline = document.getElementById('panel-online');
    addForm = document.getElementById('addFriendForm');
    newFriendUsername = document.getElementById('newFriendUsername');
    addFriendErrorEl = document.getElementById('addFriendError');
    popupContent = popup ? popup.querySelector('.friends-popup-content') : null;

    // attach events
    if (btnOpen) btnOpen.addEventListener('click', (e)=>{ e.stopPropagation(); openPopup(); });
    // also handle buttons that use data-i18n text instead of id
    const altBtn = document.querySelector('[data-i18n="profile_friends"]');
    if (!btnOpen && altBtn) altBtn.addEventListener('click', (e)=>{ e.stopPropagation(); openPopup(); });
    if (btnClose) btnClose.addEventListener('click', (e)=>{ e.stopPropagation(); closePopup(); });
    if (popup) popup.addEventListener('click', (e)=>{ if (e.target === popup) closePopup(); });
    if (inputEl) inputEl.addEventListener('keydown', (e)=>{ if (e.key === 'Enter') sendMessage(); });
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    tabs.forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFriendsBindings); else initFriendsBindings();

  // Formulario: Añadir un nuevo amigo.
  // Valida que el username exista en localStorage.usuarios, que no sea el propio usuario y que no esté duplicado.
  if (addForm) addForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = (newFriendUsername.value || '').trim();
    if (!username) return;
    // clear previous error
    if (addFriendErrorEl) addFriendErrorEl.textContent = '';

    // load existing site users from localStorage (key: 'usuarios')
    let siteUsers = [];
    try { siteUsers = JSON.parse(localStorage.getItem('usuarios')) || []; } catch(e) { siteUsers = []; }

    const user = siteUsers.find(u => u.username === username);
    if (!user) {
      if (addFriendErrorEl) addFriendErrorEl.textContent = 'No existe ningún usuario con ese nombre de usuario.';
      return;
    }

    // prevent adding yourself: current logged username stored in sessionStorage.usuarioLogueado
    try {
      const logged = sessionStorage.getItem('usuarioLogueado');
      if (logged && logged === user.username) {
        if (addFriendErrorEl) addFriendErrorEl.textContent = 'No puedes añadirte a ti mismo como amigo.';
        return;
      }
    } catch(e) { /* ignore sessionStorage errors */ }

    const friends = loadFriends();
    const id = user.username; // usar username como id de amigo
    // prevenir duplicados
    if (friends.find(f => f.id === id)) {
      if (addFriendErrorEl) addFriendErrorEl.textContent = 'Este usuario ya está en tu lista de amigos.';
      return;
    }

    const displayName = (user.nombre || user.username) + (user.apellido ? ' ' + user.apellido : '');
    const newF = { id, name: displayName, online: !!user.online };
    friends.push(newF);
    saveFriends(friends);
    newFriendUsername.value = '';
    if (addFriendErrorEl) addFriendErrorEl.textContent = '';
    // Vuelve a la pestaña de amigos y refresca
    renderFriends();
    renderOnline();
    activateTab('friends');
  });


  // Exponer utilidades para depuración desde la consola.
  window._friendsUI = { openPopup, closePopup, renderFriends, renderOnline };

})();
