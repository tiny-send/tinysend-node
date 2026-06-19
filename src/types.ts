// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

export interface ListSummary {
	id: string;
	name: string;
	subdomain: string;
	type: string;
	subscriber_count: number;
	sender_email: string | null;
	sender_domain_status: string | null;
	warmup_status: string | null;
	created_at: string;
}

export interface ListDetail {
	id: string;
	name: string;
	subdomain: string;
	type: string;
	description: string | null;
	subscriber_count: number;
	mailbox_id: string | null;
	mailbox_address: string | null;
	sender_name: string | null;
	sender_email: string | null;
	sender_domain: string | null;
	sender_domain_status: string | null;
	warmup_status: string | null;
	track_opens: boolean | null;
	track_clicks: boolean | null;
	show_archive: boolean | null;
	show_subscriber_count: boolean | null;
	created_at: string;
}

export interface CreateListParams {
	name: string;
	type?: 'newsletter' | 'waitlist' | 'announcement';
	description?: string;
}

export interface UpdateListParams {
	name?: string;
	description?: string;
	track_opens?: boolean;
	track_clicks?: boolean;
	show_archive?: boolean;
	show_subscriber_count?: boolean;
}

// ---------------------------------------------------------------------------
// Subscribers
// ---------------------------------------------------------------------------

export interface SubscriberSummary {
	id: string;
	email: string | null;
	name: string | null;
	status: string;
	source: string | null;
	subscribed_at: string | null;
	created_at: string;
	waitlist_status?: string | null;
	position?: number | null;
}

export interface SubscriberDetail {
	id: string;
	email: string | null;
	name: string | null;
	status: string;
	source: string | null;
	subscribed_at: string | null;
	last_open_at: string | null;
	last_click_at: string | null;
	country: string | null;
	city: string | null;
	created_at: string;
}

export interface CreateSubscriberParams {
	email: string;
	name?: string;
	verified?: boolean;
	/** Person-level labels merged onto the contact (unioned). Render in Apple Contacts as CATEGORIES. */
	tags?: string[];
	/** Arbitrary per-person key/values, shallow-merged onto the contact. */
	metadata?: Record<string, unknown>;
	/** Company — written to the contact. */
	org?: string;
	/** Role/title — written to the contact. */
	job_title?: string;
}

export interface UpdateSubscriberParams {
	name?: string;
	status?: 'active' | 'unsubscribed';
}

export interface ImportSubscribersParams {
	subscribers: Array<{ email: string; name?: string }>;
}

export interface ImportResult {
	imported: number;
	skipped: number;
	errors: Array<{ email: string; reason: string }>;
}

export interface ListSubscribersQuery {
	status?: 'active' | 'pending' | 'unsubscribed' | 'bounced';
	search?: string;
	cursor?: string;
	limit?: number;
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export interface PostSummary {
	id: string;
	subject: string;
	status: string;
	created_at: string;
	sent_at: string | null;
	recipients: number | null;
}

export interface PostDetail {
	id: string;
	subject: string;
	status: string;
	body_html: string | null;
	body_text: string | null;
	created_at: string;
	sent_at: string | null;
	stats?: {
		recipients: number;
		delivered: number;
		opened: number;
		clicked: number;
		bounced: number;
	};
}

export interface CreatePostParams {
	subject: string;
	body_html?: string;
	body_text?: string;
}

export interface UpdatePostParams {
	subject?: string;
	body_html?: string;
	body_text?: string;
}

export interface SendResult {
	status: string;
	recipients: number;
}

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export interface ContactSummary {
	id: string;
	kind: string;
	email: string | null;
	name: string | null;
	country: string | null;
	city: string | null;
	total_received: number;
	total_opens: number;
	total_clicks: number;
	total_replies: number;
	list_count: number;
	last_activity_at: string | null;
	created_at: string;
}

export interface ContactDetail {
	id: string;
	kind: string;
	email: string | null;
	name: string | null;
	notes: string | null;
	country: string | null;
	city: string | null;
	timezone: string | null;
	total_received: number;
	total_opens: number;
	total_clicks: number;
	total_replies: number;
	last_activity_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface ContactListMembership {
	list_id: string;
	name: string;
	subdomain: string | null;
	type: string;
	status: string;
	subscribed_at: string | null;
}

export interface ContactActivityItem {
	kind: string;
	at: string;
	subject: string;
}

export interface ContactDeliveryItem {
	id: string;
	post_id: string | null;
	subject: string;
	list_name: string;
	list_id: string | null;
	sent_at: string;
	status: string;
	open_count: number;
	click_count: number;
}

export interface ListContactsQuery {
	search?: string;
	sort?: 'top' | 'activity' | 'name' | 'email' | 'created';
	limit?: number;
}

export interface UpdateContactParams {
	notes: string;
}

// ---------------------------------------------------------------------------
// Mailboxes
// ---------------------------------------------------------------------------

export interface MailboxSummary {
	id: string;
	address: string;
	name: string | null;
	type: string;
	status: string;
	handler_count: number;
	email_count: number;
	created_at: string;
}

export interface MailboxDetail {
	id: string;
	address: string;
	local_part: string;
	domain: string;
	name: string | null;
	type: string;
	status: string;
	list_id: string | null;
	config: unknown;
	expires_at: string | null;
	handlers: HandlerDetail[];
	created_at: string;
}

export interface CreateMailboxParams {
	address: string;
	name?: string;
	type: 'persistent' | 'ephemeral';
	config?: unknown;
	expires_at?: string;
	list_id?: string;
}

export interface UpdateMailboxParams {
	name?: string;
	status?: string;
	config?: unknown;
	expires_at?: string;
}

export interface HandlerDetail {
	id: string;
	type: string;
	priority: number;
	config: unknown;
	status: string;
	created_at: string;
}

export interface CreateHandlerParams {
	type: string;
	priority: number;
	config: unknown;
	status: string;
}

export interface UpdateHandlerParams {
	type?: string;
	priority?: number;
	config?: unknown;
	status?: string;
}

export interface MailboxEmailSummary {
	id: string;
	direction: string;
	from_address: string;
	to_address: string;
	subject: string;
	status: string;
	source_tag: string | null;
	created_at: string;
}

export interface MailboxEmailDetail {
	id: string;
	direction: string;
	from_address: string;
	to_address: string;
	subject: string;
	message_id: string | null;
	in_reply_to: string | null;
	r2_key: string | null;
	status: string;
	handler_results: unknown;
	extracted_data: unknown;
	source_tag: string | null;
	contact_id: string | null;
	created_at: string;
}

export interface CreateMailboxEmailParams {
	to_address: string;
	subject: string;
	/** Plain-text body. Sent via Cloudflare Email Service from the mailbox address. */
	text_body: string;
	/** Optional HTML body. */
	html_body?: string;
	in_reply_to?: string;
	r2_key?: string;
}

export interface UpdateMailboxEmailParams {
	status: 'read' | 'archived';
}

export interface ListMailboxEmailsQuery {
	direction?: string;
	status?: string;
	source_tag?: string;
	cursor?: string;
	limit?: number;
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export interface ProjectStats {
	lists: number;
	active_subscribers: number;
	contacts: number;
	emails_sent: number;
}

export interface ListStats {
	subscribers: {
		total: number;
		active: number;
		pending: number;
		unsubscribed: number;
		bounced: number;
	};
	deliveries: {
		total_sent: number;
		total_delivered: number;
		total_opened: number;
		total_clicked: number;
		total_bounced: number;
	};
}

// ---------------------------------------------------------------------------
// Webhooks
// ---------------------------------------------------------------------------

export type WebhookEvent =
	// post
	| 'post.created' | 'post.updated' | 'post.sent' | 'post.delivered'
	| 'post.paused' | 'post.resumed' | 'post.cancelled'
	// email
	| 'email.received' | 'email.sent' | 'email.delivered'
	| 'email.bounced' | 'email.opened' | 'email.clicked' | 'email.complained'
	// subscriber
	| 'subscriber.created' | 'subscriber.confirmed' | 'subscriber.unsubscribed' | 'subscriber.deleted'
	// contact
	| 'contact.created' | 'contact.updated' | 'contact.deleted'
	// list
	| 'list.created' | 'list.updated' | 'list.deleted'
	// mailbox
	| 'mailbox.created' | 'mailbox.updated' | 'mailbox.deleted';

export interface WebhookSummary {
	id: string;
	url: string;
	events: string[];
	status: string;
	consecutive_failures: number;
	last_delivered_at: string | null;
	last_failed_at: string | null;
	created_at: string;
}

export interface WebhookDetail {
	id: string;
	url: string;
	events: string[];
	secret: string;
	status: string;
	consecutive_failures: number;
	disabled_at: string | null;
	disabled_reason: string | null;
	last_delivered_at: string | null;
	last_failed_at: string | null;
	created_at: string;
}

export interface WebhookCreated {
	id: string;
	url: string;
	events: string[];
	secret: string;
	status: string;
	created_at: string;
}

export interface CreateWebhookParams {
	url: string;
	events: WebhookEvent[];
}

export interface UpdateWebhookParams {
	url?: string;
	events?: WebhookEvent[];
	status?: 'active' | 'paused';
}

export interface WebhookDeliveryItem {
	id: string;
	event_type: string;
	event_id: string;
	http_status: number | null;
	duration_ms: number | null;
	attempt: number;
	status: string;
	error: string | null;
	delivered_at: string | null;
	created_at: string;
}

export interface TestWebhookResult {
	delivery_id: string;
	status: string;
	http_status: number | null;
	duration_ms: number | null;
}

// ---------------------------------------------------------------------------
// Usage
// ---------------------------------------------------------------------------

export interface UsageInfo {
	plan: string;
	period_start: string;
	period_end: string;
	emails_included: number;
	emails_sent: number;
	emails_remaining: number;
}

// ---------------------------------------------------------------------------
// Sender + site domain
// ---------------------------------------------------------------------------

export interface DnsRecord {
	type: string;
	name: string;
	value: string;
	/** Whether the record is visible in DNS yet. */
	found: boolean;
	/** Plain-words explanation of what the record does. */
	purpose?: string;
}

export interface SenderInfo {
	type: string;
	from_address: string;
	status: 'default' | 'pending' | 'verified' | 'failed';
	records: DnsRecord[];
	/** Plain-language description of what to do next. */
	next_step: string;
}

export interface SetSenderParams {
	/** tinysend = default @tinysend.com, custom_domain = your own domain via DNS, gmail = coming soon. */
	type: 'tinysend' | 'custom_domain' | 'gmail';
	name?: string;
	/** Local part only, the bit before the @. */
	email?: string;
	domain?: string;
}

export interface SiteDomainInfo {
	domain: string | null;
	default_url: string;
	live_url: string | null;
	status: 'not_configured' | 'pending' | 'active' | 'failed';
	records: DnsRecord[];
	next_step: string;
}

export interface SetSiteDomainParams {
	/** Domain or subdomain you own, e.g. news.acme.com. */
	domain: string;
	/** Also serve www.<domain> (for naked domains). */
	www_enabled?: boolean;
}

// ---------------------------------------------------------------------------
// Automations
// ---------------------------------------------------------------------------

export interface Automation {
	id: string;
	project_id: string;
	type: string;
	entity_type: string;
	entity_id: string;
	enabled: boolean;
	name: string | null;
	model: string | null;
	system_prompt: string | null;
	tool_permissions: Record<string, string> | null;
	schedule: string | null;
	skills: string[] | null;
	config: Record<string, unknown> | null;
	allowed_domains: string[] | null;
	created_at: string;
	updated_at: string;
}

export interface CreateAutomationParams {
	/** Defaults to the caller's project when omitted. */
	project_id?: string;
	type: string;
	entity_type: string;
	entity_id: string;
	enabled?: boolean;
	name?: string;
	model?: string;
	system_prompt?: string;
	tool_permissions?: Record<string, string>;
	schedule?: string;
	skills?: string[];
	config?: Record<string, unknown>;
	allowed_domains?: string[];
}

export interface UpdateAutomationParams {
	enabled?: boolean;
	name?: string;
	model?: string | null;
	system_prompt?: string | null;
	tool_permissions?: Record<string, string>;
	schedule?: string | null;
	skills?: string[];
	config?: Record<string, unknown>;
	allowed_domains?: string[];
}

// ---------------------------------------------------------------------------
// Invites + waitlist
// ---------------------------------------------------------------------------

export interface ProjectInvite {
	id: string;
	project_id: string;
	email: string;
	role: string;
	status: string;
	source: string;
	created_at: string;
}

export interface InviteToListParams {
	/** Invite the next N entries by position. */
	count?: number;
	/** Invite these specific subscriber ids. */
	subscribers?: string[];
	/** Invite everyone still waiting (launch day). */
	all?: boolean;
}

export interface InviteResult {
	invited: number;
}

export interface JoinListParams {
	/** Person joining by email (double opt-in). Omit to join as the authenticated agent identity. */
	email?: string;
	name?: string;
	/** Referrer's referral code, to credit a referral. */
	ref?: string;
}

export interface JoinResult {
	status: 'created' | 'exists' | 'full' | 'invalid';
	subscriber_id: string | null;
	position: number | null;
	referral_url: string | null;
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export interface OverageSettings {
	overage_enabled: boolean;
	/** Monthly spending cap in dollars. */
	overage_cap: number | null;
	overage_rate: number;
}

export interface UpdateOverageParams {
	overage_enabled: boolean;
	/** Monthly spending cap in dollars. Minimum $0.50. Required when enabling overage. */
	overage_cap: number | null;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export interface TinysendErrorBody {
	error: {
		code: string;
		message: string;
		/** Endpoint-specific extras: upgrade_url, dns_records, retryable, ... */
		[key: string]: unknown;
	};
}

// ---------------------------------------------------------------------------
// Transactional emails (POST /emails)
// ---------------------------------------------------------------------------

export interface SendEmailParams {
	/** Sending mailbox address. Optional with a mailbox-scoped key (defaults to its mailbox). */
	from?: string;
	to: string;
	subject: string;
	html?: string;
	text?: string;
	reply_to?: string;
	/** Free-form tag, filterable (stored as source_tag), e.g. "auth.verification". */
	tag?: string;
	/** User-controlled key-values, passed to Postmark and echoed in its webhooks. */
	metadata?: Record<string, string>;
}

export interface SendEmailOptions {
	/** Repeated key within 24h returns the original send instead of sending twice. */
	idempotencyKey?: string;
}

export interface EmailResult {
	id: string;
	status: string;
	from: string;
	to: string;
	subject: string | null;
	provider_message_id: string | null;
	created_at: string | null;
}
