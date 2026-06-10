import type { ApiClient } from '../client.js';
import type { ProjectInvite } from '../types.js';

/** Pending project invites for the caller. */
export class Invites {
	constructor(private readonly client: ApiClient) {}

	async list(): Promise<ProjectInvite[]> {
		const resp = await this.client.get<{ data: ProjectInvite[] }>('/invites');
		return resp.data;
	}

	approve(id: string): Promise<void> {
		return this.client.post(`/invites/${id}/approve`);
	}

	reject(id: string): Promise<void> {
		return this.client.post(`/invites/${id}/reject`);
	}
}
