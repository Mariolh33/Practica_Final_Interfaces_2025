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
  const newFriendName = document.getElementById('newFriendName');
  const popupContent = popup ? popup.querySelector('.friends-popup-content') : null;

  const SAMPLE = [ {id: 'f1', name: 'Alicia', online: true}, {id: 'f2', name: 'Carlos', online: false} ];

  function loadFriends(){
    try {
      const raw = localStorage.getItem('friends_list');
      if (!raw) return SAMPLE.slice();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return SAMPLE.slice();
      return parsed;
    } catch(e){ return SAMPLE.slice(); }
  }

  function saveFriends(list){
    localStorage.setItem('friends_list', JSON.stringify(list));
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

  // render friends as buttons with online indicator
  function renderFriends(){
    const friendArr = loadFriends();
    friendsListEl.innerHTML = '';
    friendArr.forEach(f => {
      const li = document.createElement('li');
      li.className = 'friend-item';
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
      li.appendChild(btn);
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
    const msgs = loadMessages(id);
    messagesEl.innerHTML = '';
    if (!msgs.length){
      const p = document.createElement('div'); p.className='msg them'; p.textContent = 'No hay mensajes aún. Inicia la conversación.'; messagesEl.appendChild(p);
      return;
    }
    msgs.forEach(m => {
      const d = document.createElement('div');
      d.className = 'msg ' + (m.from === 'me' ? 'me' : 'them');
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
    const msgs = loadMessages(currentFriendId);
    const now = Date.now();
    msgs.push({ from: 'me', text, ts: now });
    saveMessages(currentFriendId, msgs);
    inputEl.value = '';
    renderMessages(currentFriendId);
    setTimeout(()=>{
      const reply = { from: 'them', text: '¡Recibido! Respuesta automática.', ts: Date.now() };
      const m2 = loadMessages(currentFriendId); m2.push(reply); saveMessages(currentFriendId, m2); renderMessages(currentFriendId);
    }, 900);
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
    const name = (newFriendName.value || '').trim();
    if (!name) return;
    const friends = loadFriends();
    const id = 'f' + Date.now();
    const newF = { id, name, online: false };
    friends.push(newF);
    saveFriends(friends);
    newFriendName.value = '';
    // switch back to friends tab and refresh
    renderFriends();
    activateTab('friends');
  });

  // initialize sample if empty
  (function ensureSample(){
    const f = loadFriends();
    if (!f || !f.length){ saveFriends(SAMPLE); }
  })();

  // Expose for debugging
  window._friendsUI = { openPopup, closePopup, renderFriends, renderOnline };

})();
