export interface GeneralArticleDetailsViewModel {
  createdById: string;
  createdByFullName: string;
  urlAsText: string;
  id: number;
  title: string;
  summary: string;
  coverImagePath?: string;
  totalNumberOfViews: number;
  ratingAvg: number;
  createdAt: Date;
  isPublished: boolean;
  lat: number;
  lng: number;
}
