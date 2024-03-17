export interface HashTagDetailsViewModel {
  id: number;
  text: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  createdById: string;
  userFullName: string;
}
