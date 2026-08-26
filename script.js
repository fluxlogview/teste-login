// script.js — Login básico com SQLite (sql.js)
// Usa sql.js via CDN para funcionar sem servidor.

const sqlScript = document.createElement('script');
sqlScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
document.head.appendChild(sqlScript);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // Exemplo simples: validar usuário existente no banco local
  // Em produção: usar hash (bcrypt) e não armazenar senhas em texto
  document.getElementById('msg').textContent = `Tentando login: ${user}`;
  console.log('Login solicitado para:', user);
});
