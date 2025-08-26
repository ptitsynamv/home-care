export interface BlogPost {
  id: number;
  title: string;
  content: string;
}
export interface BlogResponse {
  posts: BlogPost[];
}
