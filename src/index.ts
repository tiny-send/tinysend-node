import { ApiClient, type ClientOptions } from './client.js';
import { Lists } from './resources/lists.js';
import { Subscribers } from './resources/subscribers.js';
import { Posts } from './resources/posts.js';
import { Contacts } from './resources/contacts.js';
import { Mailboxes } from './resources/mailboxes.js';
import { Stats } from './resources/stats.js';
import { Webhooks } from './resources/webhooks.js';
import { Usage } from './resources/usage.js';
import { Domains } from './resources/domains.js';

export class Tinysend {
	readonly lists: Lists;
	readonly subscribers: Subscribers;
	readonly posts: Posts;
	readonly contacts: Contacts;
	readonly mailboxes: Mailboxes;
	readonly stats: Stats;
	readonly webhooks: Webhooks;
	readonly usage: Usage;
	readonly domains: Domains;

	constructor(apiKey: string, options?: ClientOptions) {
		const client = new ApiClient(apiKey, options);
		this.lists = new Lists(client);
		this.subscribers = new Subscribers(client);
		this.posts = new Posts(client);
		this.contacts = new Contacts(client);
		this.mailboxes = new Mailboxes(client);
		this.stats = new Stats(client);
		this.webhooks = new Webhooks(client);
		this.usage = new Usage(client);
		this.domains = new Domains(client);
	}
}

// Re-export everything
export { TinysendError } from './client.js';
export type { ClientOptions } from './client.js';
export * from './types.js';
