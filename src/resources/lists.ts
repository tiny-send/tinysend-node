import type { ApiClient } from '../client.js';
import type {
	ListSummary,
	ListDetail,
	CreateListParams,
	UpdateListParams,
	InviteToListParams,
	InviteResult,
	JoinListParams,
	JoinResult,
} from '../types.js';

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

	/** Invite waiting subscribers off a waitlist (next N, specific ids, or all). */
	invite(listId: string, params: InviteToListParams): Promise<InviteResult> {
		return this.client.post(`/lists/${listId}/invite`, params);
	}

	/** Join a list/waitlist — by email (double opt-in) or as the authenticated agent identity. */
	join(listId: string, params?: JoinListParams): Promise<JoinResult> {
		return this.client.post(`/lists/${listId}/join`, params ?? {});
	}
}
