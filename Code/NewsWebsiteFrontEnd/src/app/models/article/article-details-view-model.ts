export interface ArticleDetailsViewModel {
  id: number;
  title: string;
  coverImagePath: string;
  summary: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  isPublished: boolean;
  totalNumberOfComments: number;
  ratingAvg: number;
  totalNumberOfRatings: number;
  totalNumberOfViews: number;
  tags?: string;
  urlAsText: string;
  bodyStructureAsHtmlCode: string;
  bodyStructureAsText: string;
  createdById: string;
  createdByFullName: string;
  categoryId: number;
  categoryName: string;
  isRatedByCurrentUser: boolean;
}
