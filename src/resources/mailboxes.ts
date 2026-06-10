import { type ApiClient, qs } from '../client.js';
import type {
	MailboxSummary,
	MailboxDetail,
	CreateMailboxParams,
	UpdateMailboxParams,
	HandlerDetail,
	CreateHandlerParams,
	UpdateHandlerParams,
	MailboxEmailSummary,
	MailboxEmailDetail,
	CreateMailboxEmailParams,
	ListMailboxEmailsQuery,
} from '../types.js';

export class MailboxHandlers {
	constructor(private readonly client: ApiClient) {}

	create(mailboxId: string, params: CreateHandlerParams): Promise<HandlerDetail> {
		return this.client.post(`/mailboxes/${mailboxId}/handlers`, params);
	}

	update(mailboxId: string, handlerId: string, params: UpdateHandlerParams): Promise<HandlerDetail> {
		return this.client.patch(`/mailboxes/${mailboxId}/handlers/${handlerId}`, params);
	}

	delete(mailboxId: string, handlerId: string): Promise<void> {
		return this.client.delete(`/mailboxes/${mailboxId}/handlers/${handlerId}`);
	}
}

export class MailboxEmails {
	constructor(private readonly client: ApiClient) {}

	list(mailboxId: string, query?: ListMailboxEmailsQuery): Promise<MailboxEmailSummary[]> {
		return this.client.get(`/mailboxes/${mailboxId}/emails${qs(query ?? {})}`);
	}

	get(mailboxId: string, emailId: string): Promise<MailboxEmailDetail> {
		return this.client.get(`/mailboxes/${mailboxId}/emails/${emailId}`);
	}

	create(mailboxId: string, params: CreateMailboxEmailParams): Promise<MailboxEmailDetail> {
		return this.client.post(`/mailboxes/${mailboxId}/emails`, params);
	}
}

export class Mailboxes {
	readonly handlers: MailboxHandlers;
	readonly emails: MailboxEmails;

	constructor(private readonly client: ApiClient) {
		this.handlers = new MailboxHandlers(client);
		this.emails = new MailboxEmails(client);
	}

	list(): Promise<MailboxSummary[]> {
		return this.client.get('/mailboxes');
	}

	get(id: string): Promise<MailboxDetail> {
		return this.client.get(`/mailboxes/${id}`);
	}

	create(params: CreateMailboxParams): Promise<MailboxDetail> {
		return this.client.post('/mailboxes', params);
	}

	update(id: string, params: UpdateMailboxParams): Promise<MailboxDetail> {
		return this.client.patch(`/mailboxes/${id}`, params);
	}

	delete(id: string): Promise<void> {
		return this.client.delete(`/mailboxes/${id}`);
	}
}
