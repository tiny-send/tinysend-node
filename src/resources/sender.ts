import type { ApiClient } from '../client.js';
import type { SenderInfo, SetSenderParams } from '../types.js';

/** Sender configuration: who emails come from (tinysend default or your own domain). */
export class Sender {
	constructor(private readonly client: ApiClient) {}

	get(listId: string): Promise<SenderInfo> {
		return this.client.get(`/lists/${listId}/sender`);
	}

	set(listId: string, params: SetSenderParams): Promise<SenderInfo> {
		return this.client.put(`/lists/${listId}/sender`, params);
	}

	/** Re-check sender domain DNS now. */
	check(listId: string): Promise<SenderInfo> {
		return this.client.post(`/lists/${listId}/sender/check`);
	}

	remove(listId: string): Promise<void> {
		return this.client.delete(`/lists/${listId}/sender`);
	}
}
