import { type ApiClient, qs } from '../client.js';
import type {
	MailboxSummary,
	MailboxDetail,
	CreateMailboxParams,
	UpdateMailboxParams,
	MailboxEmailSummary,
	MailboxEmailDetail,
	CreateMailboxEmailParams,
	UpdateMailboxEmailParams,
	ListMailboxEmailsQuery,
} from '../types.js';

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

	/** Update email status (read/archived). */
	update(mailboxId: string, emailId: string, params: UpdateMailboxEmailParams): Promise<MailboxEmailDetail> {
		return this.client.patch(`/mailboxes/${mailboxId}/emails/${emailId}`, params);
	}
}

export class Mailboxes {
	readonly emails: MailboxEmails;

	constructor(private readonly client: ApiClient) {
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
