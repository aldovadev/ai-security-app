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
  origin: object;
  destination: object;
  status: object;
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
  message: string;
  data: visitorData;
  url: string;
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
