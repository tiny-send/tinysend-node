import type { ApiClient } from '../client.js';
import type { SiteDomainInfo, SetSiteDomainParams } from '../types.js';

/** Custom domain for a list's public archive site. */
export class SiteDomains {
	constructor(private readonly client: ApiClient) {}

	get(listId: string): Promise<SiteDomainInfo> {
		return this.client.get(`/lists/${listId}/site-domain`);
	}

	set(listId: string, params: SetSiteDomainParams): Promise<SiteDomainInfo> {
		return this.client.post(`/lists/${listId}/site-domain`, params);
	}

	/** Re-check site domain DNS now. */
	check(listId: string): Promise<SiteDomainInfo> {
		return this.client.post(`/lists/${listId}/site-domain/check`);
	}

	remove(listId: string): Promise<void> {
		return this.client.delete(`/lists/${listId}/site-domain`);
	}
}
