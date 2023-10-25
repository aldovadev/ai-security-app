export interface AddCompany {
  company_name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  service_id: number;
  status: string;
  user_role: string;
}

export interface company {
  id: number;
  company_name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  service_id: number;
  user_role: string;
  status: string;
  refresh_token?: string;
  createdAt: string;
  updatedAt: string;
}
