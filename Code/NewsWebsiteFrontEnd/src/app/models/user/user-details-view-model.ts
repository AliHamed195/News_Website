export interface UserDetailsViewModel {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  country?: string;
  profileImagePath?: string;
  createdAt: Date;
  updatedAt?: Date;
  isBlocked: boolean;
  websiteLanguage: string;
  userTypeId: number;
  userTypeName: string;
}
