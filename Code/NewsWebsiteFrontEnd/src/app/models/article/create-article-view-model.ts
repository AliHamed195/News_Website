export interface CreateArticleViewModel {
  title: string;
  coverImagePath: string;
  summary: string;
  isPublished: boolean;
  tags?: any; // in angular it is array of strings but in the api it is a string spletted by comma
  bodyStructureAsHtmlCode: string;
  bodyStructureAsText: string;
  categoryId: number;
  location: string;
}
