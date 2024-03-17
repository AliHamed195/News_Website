export interface CategoryDetailsViewModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  createdById: string;
  userFullName: string;
  articlesCount: number;
}
