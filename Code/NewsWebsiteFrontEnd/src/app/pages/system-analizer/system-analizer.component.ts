import { CategoryService } from './../../Services/Category/category.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HashTagsService } from '../../Services/HashTags/hash-tags.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-system-analizer',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './system-analizer.component.html',
  styleUrl: './system-analizer.component.css',
})
export class SystemAnalizerComponent implements OnInit {
  isLoading: boolean = true;

  // ===================================
  hashTagData: any[] = [];
  categoryData: any[] = [];
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
  // ===================================

  constructor(
    private hashTagsService: HashTagsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
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
}
