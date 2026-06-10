import type { ApiClient } from '../client.js';
import type { DomainInfo, SetupDomainParams } from '../types.js';

export class Domains {
	constructor(private readonly client: ApiClient) {}

	get(listId: string): Promise<DomainInfo> {
		return this.client.get(`/lists/${listId}/domain`);
	}

	setup(listId: string, params: SetupDomainParams): Promise<DomainInfo> {
		return this.client.post(`/lists/${listId}/domain`, params);
	}

	verify(listId: string): Promise<DomainInfo> {
		return this.client.post(`/lists/${listId}/domain/verify`);
	}

	remove(listId: string): Promise<void> {
		return this.client.delete(`/lists/${listId}/domain`);
	}
}
