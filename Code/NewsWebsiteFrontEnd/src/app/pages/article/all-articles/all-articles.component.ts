import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [NgIf],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css',
})
export class AllArticlesComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  create(): void {
    this.router.navigate(['/Admin/articles-upsert']);
  }
}
