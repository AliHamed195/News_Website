export interface Comments {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  createdById: string;
  fullName: string;
}
