export interface UpdateArticleViewModel {
  title: string;
  coverImagePath: string;
  summary: string;
  isPublished: boolean;
  tags?: string;
  bodyStructureAsHtmlCode: string;
  bodyStructureAsText: string;
  categoryId: number;
}
