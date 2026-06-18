import { type ApiClient } from '../client.js';
import type { SendEmailParams, SendEmailOptions, EmailResult } from '../types.js';

export class Emails {
	constructor(private readonly client: ApiClient) {}

	/**
	 * Send a transactional email (one recipient, sent synchronously).
	 * With a mailbox-scoped key (sk_mbx_*) `from` is optional — it defaults to
	 * the key's mailbox. Pass `idempotencyKey` to make retries safe: a repeated
	 * key returns the original send instead of sending twice.
	 */
	send(params: SendEmailParams, options?: SendEmailOptions): Promise<EmailResult> {
		return this.client.post(
			'/emails',
			params,
			options?.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : undefined,
		);
	}

	get(id: string): Promise<EmailResult> {
		return this.client.get(`/emails/${id}`);
	}
}
