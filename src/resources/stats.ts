import type { ApiClient } from '../client.js';
import type { ProjectStats, ListStats } from '../types.js';

export class Stats {
	constructor(private readonly client: ApiClient) {}

	project(): Promise<ProjectStats> {
		return this.client.get('/stats');
	}

	list(listId: string): Promise<ListStats> {
		return this.client.get(`/stats/${listId}`);
	}
}
