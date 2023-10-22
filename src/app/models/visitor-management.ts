export interface newVisitor {
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  originId?: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  visitReason: string;
}

export interface otp {
  email: string;
  otp_code: string;
}

export interface visitorResponse {
  message: string;
  status: string;
  company: string;
  data: visitorData[];
}

export interface visitorData {
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

export interface visitorStatus {
  id: number;
  visit_status: string;
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
