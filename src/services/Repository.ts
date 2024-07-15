type BaseRequestType = RequestInit & { baseUrl?: string };

export type BaseResponseType<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const DEFAULT_REQUEST_CONFIG: BaseRequestType = {
  headers: {
    // 'Content-Type': 'application/json',
    'Accept': 'application/json, text/html',
    'User-Agent': navigator.userAgent,
    // 'Authorization': 'none',
  },
  method: 'GET',
  cache: 'default',
  credentials: 'same-origin', //default
  mode: 'cors', //default
  // TODO: try out this later
  // mode: 'websocket',
  priority: 'auto', // default // TODO: try out this later
  redirect: 'follow', // default
  // referrer: 'about:client', // default
  // referrerPolicy: 'no-referrer',
  baseUrl: 'backend.com', // an example
};

type QueryParamsType = {
  [key: string]: string;
};

class Repository {
  private _config: BaseRequestType;

  constructor(config?: BaseRequestType) {
    this._config = { ...DEFAULT_REQUEST_CONFIG, ...config };
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
              `${acc}${idx === 0 ? '?' : ''}${key}=${value}&`,
            ''
          )
        : '';

    const request = new Request(
      `${this._config.baseUrl}/${endpoint}${params}`,
      {
        ...this._config,
        ...options,
      }
    );

    try {
      const response : Response = await fetch(request);
      const data = await response.json();

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
    return await this._execute<T>(endpoint, query, { method: 'DELETE' });
  }
}

export default Repository;
