import type { ApiClient } from '../client.js';
import type { ListSummary, ListDetail, CreateListParams, UpdateListParams } from '../types.js';

export class Lists {
	constructor(private readonly client: ApiClient) {}

	list(): Promise<ListSummary[]> {
		return this.client.get('/lists');
	}

	get(id: string): Promise<ListDetail> {
		return this.client.get(`/lists/${id}`);
	}

	create(params: CreateListParams): Promise<ListDetail> {
		return this.client.post('/lists', params);
	}

	update(id: string, params: UpdateListParams): Promise<ListDetail> {
		return this.client.patch(`/lists/${id}`, params);
	}

	delete(id: string): Promise<void> {
		return this.client.delete(`/lists/${id}`);
	}
}
