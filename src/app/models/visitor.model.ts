export interface newVisitor {
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  originId?: string | number;
  destinationId: string;
  startDate: string;
  endDate: string;
  visitReason: string;
}

export interface otp {
  email: string;
  otpCode: string;
}

export interface visitorResponse {
  message: string;
  status: string;
  company: string;
  data: visitorData[];
}

export interface visitorData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  startDate: string;
  endDate: string;
  visitReason: string;
  visitNumber: string;
  originId: string;
  destinationId: string;
  statusId: number;
  photoPath: string;
  createdAt: string;
  updatedAt: string;
}

export interface visitorStatus {
  id: string;
  statusId: number;
}

export interface statusId {
  id: number;
  statusName: string;
  statusId: number;
}

export interface visitorProfile {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  address: string;
  company_origin: string;
  company_destination: string;
  start_date: string;
  end_date: string;
  visit_reason: string;
  visit_number: string;
  visit_status: string;
  photo_path: string;
  createdAt: string;
  updatedAt: string;
}

export interface trackingVisit {
  message: string;
  status: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: string;
    startDate: string;
    endDate: string;
    visitReason: string;
    visitNumber: string;
    originId: string;
    destinationId: string;
    statusId: number;
    photoPath: string;
    createdAt: string;
    updatedAt: string;
    origin: {
      companyName: string;
    };
    destination: {
      companyName: string;
    };
    status: {
      statusName: string;
    };
  };
  url: string;
  tracking: {
    visitorId: string;
    visitNumber: string;
    statusFrom: number;
    statusTo: number;
    updatedAt: string;
    from: {
      statusName: string;
    };
    to: {
      statusName: string;
    };
  }[];
}
