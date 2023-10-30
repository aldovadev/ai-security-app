export interface AddCompany {
  companyName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  serviceId: number;
  status: string;
  userRole: string;
}

export interface company {
  id: number;
  companyName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  serviceId: number;
  userRole: string;
  status: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
}
