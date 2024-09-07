// services/index.ts

type FetchInterceptor = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<[RequestInfo | URL, RequestInit | undefined]>;

const interceptors: FetchInterceptor[] = [];

export function addInterceptor(interceptor: FetchInterceptor) {
  interceptors.push(interceptor);
}

async function fetchWithInterceptors(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  let currentInput: RequestInfo | URL = input;
  let currentInit: RequestInit = init || {}; // 기본값 제공

  for (const interceptor of interceptors) {
    const result = await interceptor(currentInput, currentInit);
    currentInput = result[0];
    currentInit = result[1] || {}; // interceptor가 undefined를 반환할 경우 빈 객체 사용
  }

  const response = await fetch(currentInput, currentInit);

  // 여기에 응답 인터셉터를 추가할 수 있습니다.

  return response;
}

const baseURL = process.env.URL || '';

const apiClient = {
  get: (url: string, init?: RequestInit) =>
    fetchWithInterceptors(`${baseURL}${url}`, { ...init, method: 'GET' }),
  post: (url: string, body?: any, init?: RequestInit) =>
    fetchWithInterceptors(`${baseURL}${url}`, {
      ...init,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: (url: string, body?: any, init?: RequestInit) =>
    fetchWithInterceptors(`${baseURL}${url}`, {
      ...init,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  patch: (url: string, body?: any, init?: RequestInit) =>
    fetchWithInterceptors(`${baseURL}${url}`, {
      ...init,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: (url: string, init?: RequestInit) =>
    fetchWithInterceptors(`${baseURL}${url}`, { ...init, method: 'DELETE' }),
};

export default apiClient;
