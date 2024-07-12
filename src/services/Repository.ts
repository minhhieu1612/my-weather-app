type BaseRequestType = RequestInit & { baseUrl?: string };

export type BaseResponseType<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const BASE_API_CONFIG: BaseRequestType = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/html',
    'User-Agent': navigator.userAgent,
    'Authorization': 'none',
  },
  method: 'GET',
  cache: 'default',
  credentials: 'same-origin', //default
  mode: 'cors', //default
  // TODO: try out this later
  // mode: 'websocket',
  priority: 'auto', // default // TODO: try out this later
  redirect: 'follow', // default
  referrer: 'about:client', // default
  referrerPolicy: 'origin-when-cross-origin',
  baseUrl: 'backend.com', // an example
};

const DEFAULT_BASE_URL = 'backend.com';

type QueryParamsType = {
  [key: string]: string;
};

class Repository {
  private _config: BaseRequestType;

  constructor(config?: BaseRequestType) {
    this._config = { ...BASE_API_CONFIG, ...config };
  }

  private async _execute<T>(
    endpoint: string,
    query?: QueryParamsType,
    options?: BaseRequestType
  ): Promise<BaseResponseType<T>> {
    const params =
      query !== undefined
        ? Object.entries(query).reduce(
            (acc, [key, value], idx) =>
              `${acc}${idx === 0 ? '?' : ''}${key}=${value}`,
            ''
          )
        : '';

    const request = new Request(
      `${this._config.baseUrl || DEFAULT_BASE_URL}/${endpoint}${params}`,
      {
        ...this._config,
        ...options,
      }
    );

    try {
      const rawData = await fetch(request);
      const data = await rawData.json();

      return {
        success: true,
        data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async get<T>(endpoint: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, query);
  }

  async post<T>(endpoint: string, body: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, query, { body, method: 'POST' });
  }

  async put<T>(endpoint: string, body: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, query, { body, method: 'PUT' });
  }

  async delete<T>(endpoint: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, undefined, { method: 'DELETE' });
  }
}

export default Repository;
