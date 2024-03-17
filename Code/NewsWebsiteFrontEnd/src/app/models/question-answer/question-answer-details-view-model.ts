export interface QuestionAnswerDetailsViewModel {
  id: number;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  createdById: string;
  userFullName: string;
}
