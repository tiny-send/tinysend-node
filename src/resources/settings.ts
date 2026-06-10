import type { ApiClient } from '../client.js';
import type { OverageSettings, UpdateOverageParams } from '../types.js';

export class Settings {
	constructor(private readonly client: ApiClient) {}

	getOverage(): Promise<OverageSettings> {
		return this.client.get('/settings/overage');
	}

	setOverage(params: UpdateOverageParams): Promise<OverageSettings> {
		return this.client.post('/settings/overage', params);
	}
}
