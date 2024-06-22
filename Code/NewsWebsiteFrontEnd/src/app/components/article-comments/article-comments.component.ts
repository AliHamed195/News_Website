import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../Services/Comment/comment.service';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { Comments } from '../../models/comment/comment';
import { CommentResponse } from '../../models/comment/CommentResponse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.css',
})
export class ArticleCommentsComponent implements OnInit {
  articleUrl: string | null = null;
  comments: Comments[] = [];
  newCommentText: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthServiceService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleUrl = params.get('url');
      if (this.articleUrl) {
        this.loadComments();
      }
    });
    this.isLoggedIn = !!this.authService.getUserInfo();
  }

  loadComments(): void {
    if (!this.articleUrl) return;
    this.commentService.getComments(this.articleUrl).subscribe({
      next: (response) => {
        if (response.success) {
          this.comments = response.data;
          console.log('Comments:', response);
        }
      },
      error: (err) => console.error('Error fetching comments:', err),
    });
  }

  addComment(): void {
    if (!this.articleUrl || !this.newCommentText.trim()) return;
    this.commentService
      .addComment(this.articleUrl, this.newCommentText.trim())
      .subscribe({
        next: () => {
          this.newCommentText = '';
          this.loadComments();
        },
        error: (err) => console.error('Error adding comment:', err),
      });
  }

  updateComment(commentId: number, text: string): void {
    if (!text.trim()) return;
    this.commentService.updateComment(commentId, text.trim()).subscribe({
      next: () => this.loadComments(),
      error: (err) => console.error('Error updating comment:', err),
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => this.loadComments(),
      error: (err) => console.error('Error deleting comment:', err),
    });
  }

  promptUpdate(comment: Comments): void {
    const updatedText = prompt('Edit your comment', comment.text);
    if (updatedText !== null) {
      this.updateComment(comment.id, updatedText);
    }
  }
}
