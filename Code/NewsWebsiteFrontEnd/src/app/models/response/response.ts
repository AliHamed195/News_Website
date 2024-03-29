export interface ResponseStructure {
  message: string;
  success: boolean;
  errors?: string;
  token?: string;
  expiration?: Date;
}
