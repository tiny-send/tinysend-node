import { type ApiClient, qs } from '../client.js';
import type {
	SubscriberSummary,
	SubscriberDetail,
	CreateSubscriberParams,
	UpdateSubscriberParams,
	ImportSubscribersParams,
	ImportResult,
	ListSubscribersQuery,
} from '../types.js';

export class Subscribers {
	constructor(private readonly client: ApiClient) {}

	list(listId: string, query?: ListSubscribersQuery): Promise<SubscriberSummary[]> {
		return this.client.get(`/lists/${listId}/subscribers${qs(query ?? {})}`);
	}

	get(listId: string, subscriberId: string): Promise<SubscriberDetail> {
		return this.client.get(`/lists/${listId}/subscribers/${subscriberId}`);
	}

	create(listId: string, params: CreateSubscriberParams): Promise<SubscriberSummary> {
		return this.client.post(`/lists/${listId}/subscribers`, params);
	}

	update(listId: string, subscriberId: string, params: UpdateSubscriberParams): Promise<SubscriberSummary> {
		return this.client.patch(`/lists/${listId}/subscribers/${subscriberId}`, params);
	}

	delete(listId: string, subscriberId: string): Promise<void> {
		return this.client.delete(`/lists/${listId}/subscribers/${subscriberId}`);
	}

	import(listId: string, params: ImportSubscribersParams): Promise<ImportResult> {
		return this.client.post(`/lists/${listId}/subscribers/import`, params);
	}

	export(listId: string): Promise<string> {
		return this.client.get(`/lists/${listId}/subscribers/export`);
	}
}
