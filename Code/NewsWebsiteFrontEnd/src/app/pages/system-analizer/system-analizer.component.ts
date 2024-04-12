import { CategoryService } from './../../Services/Category/category.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HashTagsService } from '../../Services/HashTags/hash-tags.service';
import { forkJoin } from 'rxjs';
import { ArticlesService } from '../../Services/Articles/articles.service';
import { UsersService } from '../../Services/Users/users.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-system-analizer',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './system-analizer.component.html',
  styleUrl: './system-analizer.component.css',
})
export class SystemAnalizerComponent implements OnInit {
  isLoading: boolean = true;
  isLoadingRowTwo: boolean = true;
  // ===================================
  hashTagData: any[] = [];
  categoryData: any[] = [];
  articlesData: any[] = [];
  userData: any[] = [];
  // ===================================

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Type';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  // ===================================

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private hashTagsService: HashTagsService,
    private categoryService: CategoryService,
    private articleService: ArticlesService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDashboardData();
      this.loadDashboardDataTwo();
    }
  }

  loadDashboardData() {
    this.isLoading = true;

    // Fetch counts for hashtags
    const allTags$ = this.hashTagsService.getAllHashTagsCount();
    const usedTags$ = this.hashTagsService.getUsedHashTagsCount();

    // Fetch counts for categories
    const allCategories$ = this.categoryService.getAllcategoriesCount();
    const categoriesWithArticles$ =
      this.categoryService.getAllCategoriesWithArticlesCount();

    forkJoin({
      allTags: allTags$,
      usedTags: usedTags$,
      allCategories: allCategories$,
      categoriesWithArticles: categoriesWithArticles$,
    }).subscribe({
      next: (results) => {
        const { allTags, usedTags, allCategories, categoriesWithArticles } =
          results;

        const allTagsCount = allTags.data;
        const usedTagsCount = usedTags.data;
        const unusedTagsCount = allTagsCount - usedTagsCount;

        this.hashTagData = [
          { name: 'All Tags', value: allTagsCount },
          { name: 'Used Tags', value: usedTagsCount },
          { name: 'Unused Tags', value: unusedTagsCount },
        ];

        const allCategoriesCount = allCategories.data;
        const categoriesWithArticlesCount = categoriesWithArticles.data;
        const categoriesWithoutArticlesCount =
          allCategoriesCount - categoriesWithArticlesCount;

        this.categoryData = [
          { name: 'All Categories', value: allCategoriesCount },
          { name: 'With Articles', value: categoriesWithArticlesCount },
          { name: 'Without Articles', value: categoriesWithoutArticlesCount },
        ];

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.isLoading = false;
      },
    });
  }

  loadDashboardDataTwo() {
    this.isLoadingRowTwo = true;

    // Fetch counts for articles
    const allArticlesCount$ = this.articleService.getAllArticlesCount();
    const publishedArticlesCount$ =
      this.articleService.getPublishedArticlesCount();
    const unpublishedArticlesCount$ =
      this.articleService.getUnpublishedArticlesCount();

    // Fetch counts for users
    const usersCount$ = this.usersService.getUsersCount();
    const blockedUsersCount$ = this.usersService.getBlockedUsersCount();
    const deletedUsersCount$ = this.usersService.getDeletedUsersCount();

    forkJoin({
      allArticles: allArticlesCount$,
      publishedArticles: publishedArticlesCount$,
      unpublishedArticles: unpublishedArticlesCount$,
      usersCount: usersCount$,
      blockedUsersCount: blockedUsersCount$,
      deletedUsersCount: deletedUsersCount$,
    }).subscribe({
      next: (results) => {
        this.articlesData = [
          { name: 'All Articles', value: results.allArticles.data },
          { name: 'Published Articles', value: results.publishedArticles.data },
          {
            name: 'Unpublished Articles',
            value: results.unpublishedArticles.data,
          },
        ];

        this.userData = [
          { name: 'Total Users', value: results.usersCount.data },
          { name: 'Blocked Users', value: results.blockedUsersCount.data },
          { name: 'Deleted Users', value: results.deletedUsersCount.data },
        ];
        this.isLoadingRowTwo = false;
      },
      error: (error) => {
        console.error('Error fetching data for row two', error);
        this.isLoadingRowTwo = false;
      },
    });
  }
}
