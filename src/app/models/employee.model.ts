export interface NewEmployee {
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  position: string;
  address: string;
  companyId: string;
  employeeId: string;
}

export interface employeeData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  position: string;
  address: string;
  companyId: string;
  employeeId: string;
  photoPath: string;
  createdAt: string;
  updatedAt: string;
  company: {
    companyName: string
  };
}

