import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article-for-read',
  standalone: true,
  imports: [],
  templateUrl: './article-for-read.component.html',
  styleUrl: './article-for-read.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArticleForReadComponent implements OnInit {
  @Input() articleBody!: string;
  safeBodyContent!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.processHtmlContent(this.articleBody);
  }

  private processHtmlContent(htmlContent: string): void {
    const bodyContent = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/);
    if (bodyContent && bodyContent[1]) {
      this.safeBodyContent = this.sanitizer.bypassSecurityTrustHtml(
        bodyContent[1]
      );
    }
  }
}
