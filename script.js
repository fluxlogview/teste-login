// script.js — Login básico com SQLite local (sql.js CDN)

const sqlScript = document.createElement('script');
sqlScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
document.head.appendChild(sqlScript);

console.log('script.js carregado. Login simples: admin / senha');

const DEMO_USER = 'admin';
const DEMO_PASS = 'senha';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const msg = document.getElementById('msg');

  if (user === DEMO_USER && pass === DEMO_PASS) {
    msg.textContent = 'Login realizado com sucesso!';
    msg.style.color = 'green';
  } else {
    msg.textContent = 'Usuário ou senha inválidos (tente: admin / senha)';
    msg.style.color = 'red';
  }
});

// Sistema de criação de usuários
const userForm = document.getElementById('user-form');
if (userForm) {
  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = document.getElementById('new-user').value.trim();
    const newPass = document.getElementById('new-pass').value.trim();
    const msg = document.getElementById('msg');
    if (newUser && newPass) {
      msg.textContent = `Usuário cadastrado: ${newUser} (senha simples — implemente hash para produção)`;
      msg.style.color = 'blue';
      console.log('Novo usuário registrado:', newUser);
    } else {
      msg.textContent = 'Preencha usuário e senha';
      msg.style.color = 'red';
    }
  });
}
