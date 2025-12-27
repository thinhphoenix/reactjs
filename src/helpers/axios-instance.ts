import { envConfig } from '@/helpers/constants/env-config';
import i18n from '@/helpers/i18n';
import { TokenStorageType } from '@/types/enums/token-storage-type';
import axios from 'axios';

const TOKEN_STORAGE_TYPE = TokenStorageType.LOCAL_STORAGE;
const AUTH_TOKEN_KEY = 'authToken';

const getToken = () => {
  if (TOKEN_STORAGE_TYPE === TokenStorageType.LOCAL_STORAGE) {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } else if (TOKEN_STORAGE_TYPE === TokenStorageType.COOKIE) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === AUTH_TOKEN_KEY) {
        return value;
      }
    }
    return null;
  }
  return null;
};

const api = axios.create({
  baseURL: envConfig.apiUrl,
  timeout: envConfig.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store toast instance
let toastInstance: any = null;

export const setupApiInterceptors = (toast: any) => {
  toastInstance = toast;
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (toastInstance) {
      toastInstance.error(i18n.t('requestError', { ns: 'exception' }));
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // Hiển thị success message cho POST, PUT, DELETE (không hiển thị cho GET)
    if (toastInstance && response.config.method !== 'get') {
      const successMessage =
        response.data?.message ||
        i18n.t('operationSuccess', { ns: 'exception' });
      toastInstance.success(successMessage);
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage =
        data?.message || i18n.t('genericError', { ns: 'exception' });

      if (status === 401) {
        // Handle unauthorized
        if (toastInstance) {
          toastInstance.error(
            i18n.t('unauthorizedSession', { ns: 'exception' }),
          );
        }
        // Clear token
        localStorage.removeItem(AUTH_TOKEN_KEY);
        // Redirect to login after delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else if (status === 403) {
        // Handle forbidden
        if (toastInstance) {
          toastInstance.error(i18n.t('forbidden', { ns: 'exception' }));
        }
      } else if (status === 404) {
        // Handle not found
        if (toastInstance) {
          toastInstance.error(
            errorMessage || i18n.t('notFound', { ns: 'exception' }),
          );
        }
      } else if (status >= 500) {
        // Handle server error
        if (toastInstance) {
          toastInstance.error(i18n.t('serverError', { ns: 'exception' }));
        }
      } else {
        // Handle other errors
        if (toastInstance) {
          toastInstance.error(
            errorMessage || i18n.t('genericError', { ns: 'exception' }),
          );
        }
      }
    } else if (error.request) {
      // Handle network error
      if (toastInstance) {
        toastInstance.error(i18n.t('networkError', { ns: 'exception' }));
      }
    } else {
      // Handle other errors
      if (toastInstance) {
        toastInstance.error(
          error.message || i18n.t('genericError', { ns: 'exception' }),
        );
      }
    }
    return Promise.reject(error);
  },
);

export default api;
