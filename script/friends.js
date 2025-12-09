/* Simple friends list + chat demo
   - Stores friends list in localStorage key 'friends_list' (if not found, uses sample)
   - Stores conversations in localStorage under 'chat_<friendId>' as JSON array of messages
   - UI: opens popup #popupFriends, lists friends in #friendsList, shows messages in #messages
*/
(function(){
  const popup = document.getElementById('popupFriends');
  const btnOpen = document.getElementById('btnMisAmigos');
  const btnClose = document.getElementById('closeFriends');
  const friendsListEl = document.getElementById('friendsList');
  const onlineListEl = document.getElementById('onlineList');
  const chatHeader = document.getElementById('chatHeader');
  const messagesEl = document.getElementById('messages');
  const inputEl = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const tabs = Array.from(document.querySelectorAll('.friends-tab-btn'));
  const panelFriends = document.getElementById('panel-friends');
  const panelAdd = document.getElementById('panel-add');
  const panelOnline = document.getElementById('panel-online');
  const addForm = document.getElementById('addFriendForm');
  const newFriendUsername = document.getElementById('newFriendUsername');
  const addFriendErrorEl = document.getElementById('addFriendError');
  const popupContent = popup ? popup.querySelector('.friends-popup-content') : null;

  const SAMPLE = [ {id: 'f1', name: 'Alicia', online: true}, {id: 'f2', name: 'Carlos', online: false} ];

  function getLoggedUser(){
    return sessionStorage.getItem('usuarioLogueado') || 'anon';
  }

  function friendsStorageKeyFor(user){
    return `friends_list_${user}`;
  }

  function loadFriends(){
    const user = getLoggedUser();
    const key = friendsStorageKeyFor(user);
    try {
      // Migration: if global friends_list exists and per-user key missing, copy it for the current user
      const globalRaw = localStorage.getItem('friends_list');
      if (globalRaw && !localStorage.getItem(key)) {
        try { localStorage.setItem(key, globalRaw); localStorage.removeItem('friends_list'); } catch(e){}
      }
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch(e){ return []; }
  }

  function saveFriends(list){
    const user = getLoggedUser();
    const key = friendsStorageKeyFor(user);
    localStorage.setItem(key, JSON.stringify(list));
  }

  function listConvoKey(id){ return `chat_${id}`; }

  function loadMessages(id){
    try {
      const raw = localStorage.getItem(listConvoKey(id));
      if (!raw) return [];
      return JSON.parse(raw);
    } catch(e){ return []; }
  }

  function saveMessages(id, messages){
    localStorage.setItem(listConvoKey(id), JSON.stringify(messages));
  }

  // Global messages store so two different logged accounts can exchange messages
  // Structure: [{ from: 'usernameA', to: 'usernameB', text: '...', ts: 123456789 }, ...]
  function loadGlobalMessages(){
    try { return JSON.parse(localStorage.getItem('global_chats')) || []; } catch(e) { return []; }
  }

  function saveGlobalMessages(arr){
    try { localStorage.setItem('global_chats', JSON.stringify(arr)); } catch(e) {}
  }

  function addGlobalMessage(from, to, text){
    if (!from || !to || !text) return;
    const all = loadGlobalMessages();
    const msg = { from, to, text, ts: Date.now() };
    all.push(msg);
    saveGlobalMessages(all);
    return msg;
  }

  function loadConversationGlobal(userA, userB){
    if (!userA || !userB) return [];
    const all = loadGlobalMessages();
    return all.filter(m => (m.from === userA && m.to === userB) || (m.from === userB && m.to === userA));
  }

  // render friends as buttons with online indicator
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
      // delete button
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

  // render online list
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
      // online dot
      const dot = document.createElement('span'); dot.className='online-dot online'; li.appendChild(btn); li.appendChild(dot);
      onlineListEl.appendChild(li);
    });
  }

  // show confirmation popup for deleting friend, then perform deletion
  function _performDeleteFriend(id){
    if (!id) return;
    let friends = loadFriends();
    friends = friends.filter(f => f.id !== id);
    saveFriends(friends);
    // remove conversation history for this friend
    try { localStorage.removeItem(listConvoKey(id)); } catch(e){}
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

    // click outside to close
    function onOverlay(e){ if (e.target === popupDel) { cleanup(); popupDel.removeEventListener('click', onOverlay); } }
    popupDel.addEventListener('click', onOverlay);
  }

  let currentFriendId = null;
  const chatPanelEl = document.querySelector('.chat-panel');

  function setChatActive(active) {
    if (!chatPanelEl) return;
    chatPanelEl.classList.toggle('chat-active', !!active);
  }

  function selectFriend(id, name, el){
    currentFriendId = id;
    // mark active
    document.querySelectorAll('.friend-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
    chatHeader.textContent = name;
    renderMessages(id);
    inputEl.focus();
    // show chat panel now that a friend is selected
    if (popupContent) popupContent.classList.add('chat-open');
    setChatActive(true);
  }

  function renderMessages(id){
    // Merge legacy per-conversation messages with global messages for this pair
    const legacy = loadMessages(id) || [];
    const logged = sessionStorage.getItem('usuarioLogueado') || 'me';
    const global = loadConversationGlobal(logged, id) || [];
    // map legacy messages to a compatible format: 'me' => logged, 'them' => friend id
    const legacyMapped = legacy.map(m => ({
      from: (m.from === 'me' ? logged : id),
      to: (m.from === 'me' ? id : logged),
      text: m.text,
      ts: m.ts || 0
    }));
    // Combine and deduplicate by key (ts|from|to|text) to avoid double entries
    const combined = legacyMapped.concat(global).sort((a,b)=> (a.ts||0) - (b.ts||0));
    const seen = new Set();
    const deduped = [];
    combined.forEach(m => {
      const key = `${m.ts}|${m.from}|${m.to}|${m.text}`;
      if (!seen.has(key)) { seen.add(key); deduped.push(m); }
    });
    messagesEl.innerHTML = '';
    if (!deduped.length){
      const p = document.createElement('div'); p.className='msg them'; p.textContent = 'No hay mensajes aún. Inicia la conversación.'; messagesEl.appendChild(p);
      return;
    }
    deduped.forEach(m => {
      const d = document.createElement('div');
      const isMe = (m.from === logged);
      d.className = 'msg ' + (isMe ? 'me' : 'them');
      d.textContent = m.text;
      messagesEl.appendChild(d);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

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

  // send message
  function sendMessage(){
    const text = (inputEl && inputEl.value || '').trim();
    if (!text || !currentFriendId) return;
    const logged = sessionStorage.getItem('usuarioLogueado') || 'me';
    // add to global messages so recipient sees it when they log in
    addGlobalMessage(logged, currentFriendId, text);
    // Do NOT write the same message to legacy storage to avoid duplicates.
    inputEl.value = '';
    renderMessages(currentFriendId);
  }

  // Tab activation
  function activateTab(name){
    tabs.forEach(t => { t.classList.toggle('active', t.dataset.tab === name); t.setAttribute('aria-selected', t.dataset.tab === name ? 'true' : 'false'); });
    panelFriends.classList.toggle('panel-active', name === 'friends'); panelFriends.setAttribute('aria-hidden', name === 'friends' ? 'false' : 'true');
    panelAdd.classList.toggle('panel-active', name === 'add'); panelAdd.setAttribute('aria-hidden', name === 'add' ? 'false' : 'true');
    panelOnline.classList.toggle('panel-active', name === 'online'); panelOnline.setAttribute('aria-hidden', name === 'online' ? 'false' : 'true');
    // if switching away from friends tab, hide chat panel
    if (name !== 'friends') {
      setChatActive(false);
      if (popupContent) popupContent.classList.remove('chat-open');
    } else {
      // if friends tab and a friend is selected, show chat
      if (!!currentFriendId) {
        if (popupContent) popupContent.classList.add('chat-open');
        setChatActive(true);
      } else {
        if (popupContent) popupContent.classList.remove('chat-open');
        setChatActive(false);
      }
    }
  }

  // wire events
  if (btnOpen) btnOpen.addEventListener('click', (e)=>{ e.stopPropagation(); openPopup(); });
  if (btnClose) btnClose.addEventListener('click', (e)=>{ e.stopPropagation(); closePopup(); });
  if (popup) popup.addEventListener('click', (e)=>{ if (e.target === popup) closePopup(); });
  if (inputEl) inputEl.addEventListener('keydown', (e)=>{ if (e.key === 'Enter') sendMessage(); });
  if (sendBtn) sendBtn.addEventListener('click', sendMessage);

  tabs.forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));

  // add friend form
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
    const id = user.username; // use username as friend id
    // prevent duplicates
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
    // switch back to friends tab and refresh
    renderFriends();
    renderOnline();
    activateTab('friends');
  });

  // no automatic seeding: start with an empty friends list by default

  // Expose for debugging
  window._friendsUI = { openPopup, closePopup, renderFriends, renderOnline };

})();
