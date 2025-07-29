import { http, HttpResponse } from 'msw';

const baseUrl = 'http://localhost:3000/api/';

export const handlers = [
  http.get(baseUrl + 'users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]);
  }),
];
