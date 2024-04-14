import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel } from './../../../models/pagination/pagination-model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  AngularEditorComponent,
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { CreateArticleViewModel } from '../../../models/article/create-article-view-model';
import { CategoryService } from '../../../Services/Category/category.service';
import { HashTagsService } from '../../../Services/HashTags/hash-tags.service';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';
import { ArticlesService } from '../../../Services/Articles/articles.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-and-update-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularEditorModule,
    NgMultiSelectDropDownModule,
  ],
  templateUrl: './create-and-update-article.component.html',
  styleUrl: './create-and-update-article.component.css',
})
export class CreateAndUpdateArticleComponent {
  article: CreateArticleViewModel = {
    title: '',
    coverImagePath: '',
    summary: '',
    isPublished: false,
    tags: [],
    bodyStructureAsHtmlCode: '',
    bodyStructureAsText: '',
    categoryId: 0,
    location: '',
  };
  selectedTags: any[] = [];
  categories: any[] = [];
  tags: any[] = [];
  imagePreview: string | ArrayBuffer | null = '';

  dropdownSettingsTags: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  @ViewChild('editor') editorComponent!: AngularEditorComponent;

  articleId: number | null = null;
  htmlContent: string = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '35rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    private categoryService: CategoryService,
    private hashTagsService: HashTagsService,
    private articleService: ArticlesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.params
        .pipe(
          switchMap((params) => {
            this.articleId = params['id'];
            return this.articleId
              ? this.articleService.getArticleById(this.articleId)
              : of(null);
          }),
          switchMap((articleData) => {
            if (articleData) {
              this.article = articleData.data;
              this.htmlContent = this.article.bodyStructureAsHtmlCode;
              this.imagePreview = this.article.coverImagePath;
            }
            return forkJoin({
              categories: this.loadCategories(),
              tags: this.loadTags(),
            });
          })
        )
        .subscribe({
          next: (result: { categories: any[]; tags: any[] }) => {
            this.categories = result.categories;
            this.tags = result.tags;
            if (this.article && this.article.tags.length > 0) {
              this.selectedTags = this.article.tags
                .split(',')
                .map((tag: string) => {
                  return result.tags.find(
                    (t: { text: string }) => t.text === tag
                  );
                })
                .filter((t: any) => t !== undefined);
              if (this.selectedTags.length > 0) {
                this.article.tags = this.selectedTags;
              }
            }
          },
          error: (error) => console.error('Failed to load article', error),
        });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupMutationObserver();
    }
  }

  loadArticle(id: number): void {
    this.articleService.getArticleById(id).subscribe({
      next: (response) => {
        this.article = response.data;
        this.htmlContent = this.article.bodyStructureAsHtmlCode;
        this.selectedTags = this.article.tags.split(',').map((tag: any) => {
          console.log(this.tags.find((t) => t.text === tag));
          return this.tags.find((t) => t.text === tag)?.text;
        });
        if (this.selectedTags.length > 0) {
          this.article.tags = this.selectedTags;
        }
        this.imagePreview = this.article.coverImagePath;
      },
      error: (error) => console.error('Failed to load article', error),
    });
  }

  loadCategories(): Observable<any[]> {
    const paginationModel: PaginationModel = { startRow: 1, endRow: 10000 };
    return this.categoryService
      .getAllCategories(paginationModel)
      .pipe(map((response) => response.data));
  }

  loadTags(): Observable<any[]> {
    const paginationModel: PaginationModel = { startRow: 0, endRow: 100000 };
    return this.hashTagsService
      .getAllHashTags(paginationModel)
      .pipe(map((response) => response.data));
  }

  setupMutationObserver(): void {
    const editorElement = this.editorComponent.editorWrapper.nativeElement;
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const elementNode = node as HTMLElement;
              if (elementNode.nodeName === 'IMG') {
                const wrapperDiv = this.renderer.createElement('div');
                this.renderer.setStyle(wrapperDiv, 'display', 'flex');
                this.renderer.setStyle(wrapperDiv, 'align-items', 'center');
                this.renderer.setStyle(wrapperDiv, 'justify-content', 'center');
                this.renderer.setStyle(elementNode, 'width', '70%');
                if (
                  mutation.target.nodeType === Node.ELEMENT_NODE &&
                  (mutation.target as HTMLElement).classList.contains(
                    'angular-editor-textarea'
                  )
                ) {
                  this.renderer.insertBefore(
                    mutation.target,
                    wrapperDiv,
                    elementNode
                  );
                  this.renderer.appendChild(wrapperDiv, elementNode);
                }
              }
            }
          });
        }
      }
    });

    observer.observe(editorElement, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  }

  getSafeHtmlContent(htmlContent: string): SafeHtml {
    if (isPlatformBrowser(this.platformId)) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(htmlContent, 'text/html');

      doc.querySelectorAll('img').forEach((img) => {
        if (img.parentNode) {
          let wrapperDiv = document.createElement('div');
          wrapperDiv.style.display = 'flex';
          wrapperDiv.style.alignItems = 'center';
          wrapperDiv.style.justifyContent = 'center';
          img.parentNode.replaceChild(wrapperDiv, img);
          img.style.width = '70%';
          wrapperDiv.appendChild(img);
        }
      });

      let serializedHtml = new XMLSerializer().serializeToString(doc);
      return this.sanitizer.bypassSecurityTrustHtml(serializedHtml);
    }

    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  saveArticle(): void {
    this.article.bodyStructureAsHtmlCode = this.getSafeHtmlContent(
      this.htmlContent
    ).toString();
    this.article.bodyStructureAsText = this.generateTextVersion(
      this.htmlContent
    );
    let tagsAsText = this.article.tags.map((tag: any) => tag.text).join(' ');
    this.article.tags = this.article.tags.map((tag: any) => tag.text).join(',');
    let allArticleText = [
      this.article.title,
      this.article.location,
      this.categories.find((c) => c.id == this.article.categoryId)?.name,
      this.article.summary,
      this.article.bodyStructureAsText,
      tagsAsText,
    ].join(' ');
    this.article.bodyStructureAsText = allArticleText;
    console.log(this.article);

    if (this.articleId === null) {
      console.log(this.article);
      this.articleService.saveArticle(this.articleId, this.article).subscribe({
        next: (response) => {
          console.log('Article created successfully', response);
        },
        error: (error) => console.error('Error creating the article', error),
      });
    } else {
      this.articleService
        .saveArticle(this.articleId, { ...this.article })
        .subscribe({
          next: (response) => {
            console.log('Article updated successfully', response);
          },
          error: (error) => console.error('Error updating the article', error),
        });
    }

    this.router.navigate(['/Admin/articles-all']);
  }

  cancelAndBack(): void {
    this.router.navigate(['/Admin/articles-all']);
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result ? reader.result.toString() : '';
        this.article.coverImagePath = this.imagePreview
          ? this.imagePreview.toString()
          : '';
      };
      reader.readAsDataURL(file);
    }
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  generateTextVersion(htmlContent: string): string {
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlContent, 'text/html');
    let textContent = doc.body.innerText;
    return textContent;
  }
}
