# tinysend

Official TypeScript SDK for the [tinysend](https://tinysend.com) API. Zero dependencies, fetch-based — works in Node.js, Bun, Deno, Cloudflare Workers, and browsers.

- website: [tinysend.com](https://tinysend.com)
- docs: [tinysend.com/docs](https://tinysend.com/docs)
- agents: [tinysend.com/agents](https://tinysend.com/agents)

## Install

```bash
npm install tinysend
```

## Usage

```typescript
import { Tinysend } from 'tinysend';

const ts = new Tinysend('sk_...');

// lists
const lists = await ts.lists.list();
const list = await ts.lists.create({ name: 'Weekly Update' });

// subscribers
await ts.subscribers.create(list.id, { email: 'user@example.com', verified: true });

// send an email
const post = await ts.posts.create(list.id, {
  subject: 'Hello World',
  body_html: '<p>Welcome to our newsletter!</p>',
});
await ts.posts.send(list.id, post.id);

// contacts
const contacts = await ts.contacts.list({ search: 'john' });

// mailboxes
const mailboxes = await ts.mailboxes.list();

// stats
const stats = await ts.stats.project();

// webhooks
const hook = await ts.webhooks.create({
  url: 'https://example.com/webhook',
  events: ['post.sent', 'subscriber.created'],
});
```

## Error handling

```typescript
import { Tinysend, TinysendError } from 'tinysend';

try {
  await ts.lists.get('nonexistent');
} catch (err) {
  if (err instanceof TinysendError) {
    console.log(err.status);  // 404
    console.log(err.code);    // 'not_found'
    console.log(err.message); // 'list not found'
  }
}
```

## Configuration

```typescript
const ts = new Tinysend('sk_...', {
  baseUrl: 'https://api.tinysend.com/v1',  // default
  fetch: customFetch,                        // custom fetch implementation
});
```

## License

MIT

---

a [system operator](https://systemoperator.com) product
