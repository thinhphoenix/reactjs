export const envConfig = {
  bunEnv: import.meta.env.PUBLIC_BUN_ENV,
  base:
    import.meta.env.PUBLIC_BUN_ENV === 'production'
      ? import.meta.env.PUBLIC_BASE
      : '',
  apiUrl: import.meta.env.PUBLIC_API,
  apiTimeout: Number(import.meta.env.PUBLIC_API_TIMEOUT),
  port: Number(import.meta.env.PUBLIC_PORT) || 3000,
};
