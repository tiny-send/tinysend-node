import type { ApiClient } from '../client.js';
import type { UsageInfo } from '../types.js';

export class Usage {
	constructor(private readonly client: ApiClient) {}

	get(): Promise<UsageInfo> {
		return this.client.get('/usage');
	}
}
