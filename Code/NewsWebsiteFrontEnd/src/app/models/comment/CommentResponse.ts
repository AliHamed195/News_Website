import { Comments } from './comment';

export interface CommentResponse {
  success: boolean;
  message: string;
  data: Comments[];
}
