import type { ApiClient } from '../client.js';
import type {
	WebhookSummary,
	WebhookDetail,
	WebhookCreated,
	CreateWebhookParams,
	UpdateWebhookParams,
	WebhookDeliveryItem,
	TestWebhookResult,
} from '../types.js';

export class Webhooks {
	constructor(private readonly client: ApiClient) {}

	list(): Promise<WebhookSummary[]> {
		return this.client.get('/webhooks');
	}

	get(id: string): Promise<WebhookDetail> {
		return this.client.get(`/webhooks/${id}`);
	}

	create(params: CreateWebhookParams): Promise<WebhookCreated> {
		return this.client.post('/webhooks', params);
	}

	update(id: string, params: UpdateWebhookParams): Promise<WebhookDetail> {
		return this.client.patch(`/webhooks/${id}`, params);
	}

	delete(id: string): Promise<void> {
		return this.client.delete(`/webhooks/${id}`);
	}

	deliveries(id: string): Promise<WebhookDeliveryItem[]> {
		return this.client.get(`/webhooks/${id}/deliveries`);
	}

	test(id: string): Promise<TestWebhookResult> {
		return this.client.post(`/webhooks/${id}/test`);
	}
}
