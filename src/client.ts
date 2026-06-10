import type { TinysendErrorBody } from './types.js';

export class TinysendError extends Error {
	readonly status: number;
	readonly code: string;

	constructor(status: number, code: string, message: string) {
		super(message);
		this.name = 'TinysendError';
		this.status = status;
		this.code = code;
	}
}

export interface ClientOptions {
	baseUrl?: string;
	fetch?: typeof globalThis.fetch;
}

export class ApiClient {
	private readonly apiKey: string;
	private readonly baseUrl: string;
	private readonly _fetch: typeof globalThis.fetch;

	constructor(apiKey: string, options: ClientOptions = {}) {
		this.apiKey = apiKey;
		this.baseUrl = (options.baseUrl ?? 'https://api.tinysend.com/v1').replace(/\/$/, '');
		this._fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
	}

	async request<T>(method: string, path: string, body?: unknown): Promise<T> {
		const url = `${this.baseUrl}${path}`;
		const headers: Record<string, string> = {
			'Authorization': `Bearer ${this.apiKey}`,
			'Accept': 'application/json',
		};

		if (body !== undefined) {
			headers['Content-Type'] = 'application/json';
		}

		const resp = await this._fetch(url, {
			method,
			headers,
			body: body !== undefined ? JSON.stringify(body) : undefined,
		});

		if (resp.status === 204) {
			return undefined as T;
		}

		const contentType = resp.headers.get('content-type') ?? '';

		if (!resp.ok) {
			if (contentType.includes('application/json')) {
				const err = (await resp.json()) as TinysendErrorBody;
				throw new TinysendError(resp.status, err.error.code, err.error.message);
			}
			throw new TinysendError(resp.status, 'unknown_error', `HTTP ${resp.status}`);
		}

		if (contentType.includes('text/csv')) {
			return (await resp.text()) as T;
		}

		return (await resp.json()) as T;
	}

	get<T>(path: string): Promise<T> {
		return this.request<T>('GET', path);
	}

	post<T>(path: string, body?: unknown): Promise<T> {
		return this.request<T>('POST', path, body);
	}

	put<T>(path: string, body?: unknown): Promise<T> {
		return this.request<T>('PUT', path, body);
	}

	patch<T>(path: string, body: unknown): Promise<T> {
		return this.request<T>('PATCH', path, body);
	}

	delete(path: string): Promise<void> {
		return this.request<void>('DELETE', path);
	}
}

/** Build a query string from an object, omitting undefined values. */
export function qs(params: object): string {
	const parts: string[] = [];
	for (const [key, value] of Object.entries(params as Record<string, unknown>)) {
		if (value !== undefined && value !== null) {
			parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
		}
	}
	return parts.length > 0 ? `?${parts.join('&')}` : '';
}
