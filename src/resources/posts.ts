import type { ApiClient } from '../client.js';
import type {
	PostSummary,
	PostDetail,
	CreatePostParams,
	UpdatePostParams,
	SendResult,
} from '../types.js';

export class Posts {
	constructor(private readonly client: ApiClient) {}

	list(listId: string): Promise<PostSummary[]> {
		return this.client.get(`/lists/${listId}/posts`);
	}

	get(listId: string, postId: string): Promise<PostDetail> {
		return this.client.get(`/lists/${listId}/posts/${postId}`);
	}

	create(listId: string, params: CreatePostParams): Promise<PostDetail> {
		return this.client.post(`/lists/${listId}/posts`, params);
	}

	update(listId: string, postId: string, params: UpdatePostParams): Promise<PostDetail> {
		return this.client.patch(`/lists/${listId}/posts/${postId}`, params);
	}

	send(listId: string, postId: string): Promise<SendResult> {
		return this.client.post(`/lists/${listId}/posts/${postId}/send`);
	}

	delete(listId: string, postId: string): Promise<void> {
		return this.client.delete(`/lists/${listId}/posts/${postId}`);
	}
}
