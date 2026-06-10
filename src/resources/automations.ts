import type { ApiClient } from '../client.js';
import type { Automation, CreateAutomationParams, UpdateAutomationParams } from '../types.js';

export class Automations {
	constructor(private readonly client: ApiClient) {}

	async list(): Promise<Automation[]> {
		const resp = await this.client.get<{ data: Automation[] }>('/automations');
		return resp.data;
	}

	get(id: string): Promise<Automation> {
		return this.client.get(`/automations/${id}`);
	}

	create(params: CreateAutomationParams): Promise<Automation> {
		return this.client.post('/automations', params);
	}

	update(id: string, params: UpdateAutomationParams): Promise<Automation> {
		return this.client.patch(`/automations/${id}`, params);
	}

	delete(id: string): Promise<void> {
		return this.client.delete(`/automations/${id}`);
	}
}
