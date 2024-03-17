import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeneralArticleDetailsViewModel } from './models/article/general-article-details-view-model';
import { GeneralArticleDetailsComponent } from './components/article/general-article-details/general-article-details.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, GeneralArticleDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NewsWebsiteFrontEnd';

  articles: GeneralArticleDetailsViewModel[] = [
    {
      createdById: 'user123',
      createdByFullName: 'Jane Doe',
      urlAsText: 'article-1',
      id: 1,
      title: 'The Future of Technology',
      summary: 'This article discusses the future of technology and its impact on society.',
      coverImagePath: 'assets/images/default-article-cover.webp',
      totalNumberOfViews: 150,
      ratingAvg: 4.5,
      createdAt: new Date('2021-01-01')
    },
    {
      createdById: 'user456',
      createdByFullName: 'John Smith',
      urlAsText: 'article-2',
      id: 2,
      title: 'Exploring the Natural World',
      summary: 'This article explores the natural world and the beauty of nature.',
      coverImagePath: 'assets/images/default-article-cover.webp',
      totalNumberOfViews: 250,
      ratingAvg: 4.8,
      createdAt: new Date('2021-01-01')
    },
    {
      createdById: 'user789',
      createdByFullName: 'Alex Johnson',
      urlAsText: 'article-3',
      id: 3,
      title: 'Advancements in Health Care',
      summary: 'This article discusses the latest advancements in health care and medicine.',
      coverImagePath: undefined,
      totalNumberOfViews: 300,
      ratingAvg: 4.9,
      createdAt: new Date('2021-01-01')
    }
  ];

}
