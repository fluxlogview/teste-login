// database/init.js — Inicializa SQLite local e insere usuário demo
const initSql = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
INSERT OR IGNORE INTO users (username, password_hash) VALUES ('admin', 'senha');
`;
console.log('Banco inicializado com usuário demo: admin / senha');
