export interface CreateUserViewModel {
  userName: string;
  email: string;
  fullName: string;
  userTypeId: number;
  country?: string;
  profileImagePath?: string;
  websiteLanguage: string;
}
