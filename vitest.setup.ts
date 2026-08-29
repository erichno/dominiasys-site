// Testes de API rodam contra o Postgres/Redis locais do docker-compose —
// nunca contra um banco em nuvem. Carrega as mesmas variáveis do dev local.
try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local pode não existir em CI — as env vars vêm de outro lugar lá.
}
