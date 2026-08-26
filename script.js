// script.js — Login com SQLite local (sql.js CDN)

const sqlScript = document.createElement('script');
sqlScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
document.head.appendChild(sqlScript);

console.log('script.js carregado. Usando SQLite local.');

// Login — valida contra banco SQLite
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const msg = document.getElementById('msg');

    try {
      // Aguarda sql.js carregar
      await new Promise(r => sqlScript.addEventListener('load', r));
      const SQL = await initSqlJs();
      const db = new SQL.Database();
      // Tenta abrir banco local (se existir no mesmo nível)
      try {
        db.run("ATTACH DATABASE 'teste-login.sqlite' AS db");
      } catch (e) {
        // Se nao existir arquivo, usa banco em memoria (para testes via GitHub Pages)
      }
      // Consulta simples (para demo sem hash real, compara direto; producao usar hash)
      const stmt = db.prepare("SELECT username FROM users WHERE username = ? AND password_hash = ?");
      const res = stmt.getAsObject([user, pass]);
      stmt.free();
      if (res && res.username === user) {
        msg.textContent = 'Login realizado com sucesso!';
        msg.style.color = 'green';
        window.open('criar-usuario.html', '_blank', 'width=500,height=400');
      } else {
        msg.textContent = 'Usuário ou senha inválidos (tente: admin / senha)';
        msg.style.color = 'red';
      }
    } catch (err) {
      msg.textContent = 'Erro ao validar login (banco local nao disponivel — teste via file:// ou adicione hash)';
      msg.style.color = 'red';
      console.error(err);
    }
  });
}

function initSqlJs() {
  return new Promise((resolve) => {
    if (window.initSqlJs) return resolve(window.initSqlJs);
    const check = setInterval(() => {
      if (window.initSqlJs) { clearInterval(check); resolve(window.initSqlJs); }
    }, 200);
  });
}

// Sistema de criação de usuários
const userForm = document.getElementById('user-form');
if (userForm) {
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newUser = document.getElementById('new-user').value.trim();
    const newPass = document.getElementById('new-pass').value.trim();
    const msg = document.getElementById('msg');
    if (!newUser || !newPass) {
      msg.textContent = 'Preencha usuário e senha';
      msg.style.color = 'red';
      return;
    }
    try {
      await new Promise(r => sqlScript.addEventListener('load', r));
      const SQL = await initSqlJs();
      const db = new SQL.Database();
      db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT)");
      db.run("INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)", [newUser, newPass]);
      msg.textContent = `Usuário cadastrado: ${newUser}`;
      msg.style.color = 'blue';
      console.log('Novo usuário registrado:', newUser);
    } catch (err) {
      msg.textContent = 'Erro ao cadastrar (banco local nao disponivel)';
      msg.style.color = 'red';
      console.error(err);
    }
  });
}
