export interface ResponseStructure {
  message: string;
  success: boolean;
  data?: any;
  errors?: string;
  token?: string;
  expiration?: Date;
}
