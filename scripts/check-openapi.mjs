// Cross-check the SDK against the live openapi spec.
// Fails if the SDK calls an endpoint that doesn't exist (method+path),
// or if the API has endpoints the SDK doesn't cover (unless allowlisted).
// Usage: node scripts/check-openapi.mjs [spec-url]

import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SPEC_URL = process.argv[2] ?? 'https://api.tinysend.com/v1/openapi.json';

// API endpoints the SDK intentionally does not wrap.
const SKIP = new Set([
	'POST /billing/subscribe', // dashboard-only checkout flow
	'GET /lists/{listId}/domain', // deprecated alias of /sender
	'PUT /lists/{listId}/domain',
	'DELETE /lists/{listId}/domain',
	'POST /lists/{listId}/domain/check',
	'GET /lists/{listId}/stats', // alias of GET /stats/{listId}
	'POST /sdk/feedback', // TinysendKit (native apps, ts_pub_ keys) — not this secret-key SDK's surface
	'POST /sdk/subscribe',
]);

const srcDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

// normalize a path to a comparable shape: params -> «»
const normalize = (p) => p.replace(/\{[^}]+\}|\$\{[^}]+\}|:[a-zA-Z]+/g, '«»').replace(/\/$/, '');

async function collectSdkCalls() {
	const calls = new Set();
	const files = (await readdir(srcDir, { recursive: true })).filter((f) => f.endsWith('.ts'));
	for (const f of files) {
		const text = await readFile(join(srcDir, f), 'utf8');
		// this.client.get(`/lists/${id}`) | this.client.post('/lists', ...)
		const re = /this\.client\.(get|post|put|patch|delete)(?:<[^>]*>)?\(\s*(`([^`]+)`|'([^']+)')/g;
		for (const m of text.matchAll(re)) {
			const method = m[1].toUpperCase();
			let path = m[3] ?? m[4];
			path = path.split('${qs(')[0]; // strip query-string suffix
			calls.add(`${method} ${normalize(path)}`);
		}
	}
	return calls;
}

const resp = await fetch(SPEC_URL);
if (!resp.ok) {
	console.error(`failed to fetch spec: ${resp.status} ${SPEC_URL}`);
	process.exit(1);
}
const spec = await resp.json();

const specOps = new Map(); // normalized -> original label
for (const [path, ops] of Object.entries(spec.paths)) {
	for (const method of Object.keys(ops)) {
		if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
		const label = `${method.toUpperCase()} ${path}`;
		specOps.set(`${method.toUpperCase()} ${normalize(path)}`, label);
	}
}

const sdkCalls = await collectSdkCalls();
const skipNormalized = new Set([...SKIP].map((s) => {
	const [m, p] = s.split(' ');
	return `${m} ${normalize(p)}`;
}));

let failed = false;

// 1. SDK calls that don't exist in the API
for (const call of [...sdkCalls].sort()) {
	if (!specOps.has(call)) {
		console.error(`✗ SDK calls missing endpoint: ${call}`);
		failed = true;
	}
}

// 2. API endpoints the SDK doesn't cover
for (const [norm, label] of [...specOps.entries()].sort()) {
	if (!sdkCalls.has(norm) && !skipNormalized.has(norm)) {
		console.error(`✗ API endpoint not covered by SDK: ${label}`);
		failed = true;
	}
}

// 3. stale skip entries
for (const norm of skipNormalized) {
	if (!specOps.has(norm)) {
		console.error(`✗ SKIP entry no longer in spec (remove it): ${norm}`);
		failed = true;
	}
}

if (failed) process.exit(1);
console.log(`✓ SDK matches API: ${sdkCalls.size} SDK calls, ${specOps.size} spec endpoints, ${skipNormalized.size} intentionally skipped`);
