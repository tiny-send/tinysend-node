import { type ApiClient, qs } from '../client.js';
import type {
	ContactSummary,
	ContactDetail,
	ContactListMembership,
	ContactActivityItem,
	ContactDeliveryItem,
	ListContactsQuery,
	UpdateContactParams,
} from '../types.js';

export class Contacts {
	constructor(private readonly client: ApiClient) {}

	list(query?: ListContactsQuery): Promise<ContactSummary[]> {
		return this.client.get(`/contacts${qs(query ?? {})}`);
	}

	get(id: string): Promise<ContactDetail> {
		return this.client.get(`/contacts/${id}`);
	}

	update(id: string, params: UpdateContactParams): Promise<ContactDetail> {
		return this.client.patch(`/contacts/${id}`, params);
	}

	lists(id: string): Promise<ContactListMembership[]> {
		return this.client.get(`/contacts/${id}/lists`);
	}

	activity(id: string): Promise<ContactActivityItem[]> {
		return this.client.get(`/contacts/${id}/activity`);
	}

	emails(id: string): Promise<ContactDeliveryItem[]> {
		return this.client.get(`/contacts/${id}/emails`);
	}
}
