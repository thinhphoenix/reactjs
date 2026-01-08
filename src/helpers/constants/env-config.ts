export const envConfig = {
  bunEnv: import.meta.env.PUBLIC_BUN_ENV || 'development',
  base:
    import.meta.env.PUBLIC_BUN_ENV === 'production'
      ? import.meta.env.PUBLIC_BASE
      : '',
  apiUrl: import.meta.env.PUBLIC_API || 'https://jsonplaceholder.typicode.com',
  apiTimeout: Number(import.meta.env.PUBLIC_API_TIMEOUT) || 8000,
  port: Number(import.meta.env.PUBLIC_PORT) || 3000,
};
