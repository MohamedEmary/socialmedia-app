export interface User {
  _id: string | null;
  name: string | null;
  photo: string | null;
}

export interface Comment {
  _id: string | null;
  content: string | null;
  commentCreator: User;
  post: string | null;
  createdAt: string | null;
}

export interface Post {
  id: string | null;
  body: string | null;
  image: string | null;
  user: User;
  comments: Comment[] | [];
  createdAt: string | null;
}

export interface CommentRequest {
  content: string | null;
  post: string | null;
}
