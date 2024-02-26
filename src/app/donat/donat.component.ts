import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donat',
  templateUrl: './donat.component.html',
  styleUrls: ['./donat.component.css']
})
export class DonatComponent implements OnInit {
  comments: { author: string, body: string }[];
  newComment: { author: string, body: string };
  showComments: boolean;

  constructor() {
    this.comments = [];
    this.newComment = { author: '', body: '' };
    this.showComments = JSON.parse(localStorage.getItem('showComments') || 'false');
  }

  ngOnInit(): void {
    const savedComments = localStorage.getItem('comments');
    this.comments = savedComments ? JSON.parse(savedComments) : [];
  }

  addComment(): void {
    if (this.newComment.author !== '' && this.newComment.body !== '') {
      this.comments.push(this.newComment);
      this.newComment = { author: '', body: '' };
      this.saveCommentsToLocalStorage();
    }
  }

  deleteComment(index: number): void {
    this.comments.splice(index, 1);
    this.saveCommentsToLocalStorage();
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
    localStorage.setItem('showComments', JSON.stringify(this.showComments));
  }

  private saveCommentsToLocalStorage(): void {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }
}
