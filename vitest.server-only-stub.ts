// server-only usa um truque de condição do bundler do Next que o Vite/Vitest
// não reconhece. Nos testes, que legitimamente rodam em contexto de
// servidor, isso vira um no-op em vez de barrar o import.
export {};
