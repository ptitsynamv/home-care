import { BlogPost } from '@/app/_lib/blog';
import { config } from '@/app/_lib/config';
import { http, HttpResponse } from 'msw';

const API_URL = config.apiUrl;

export const handlers = [
  http.get(API_URL + 'blog', () => {
    const posts: BlogPost[] = [
      { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
      { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
    ];
    return HttpResponse.json({ posts });
  }),
];
