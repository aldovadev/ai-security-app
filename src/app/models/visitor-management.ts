export interface visitorInfo {
  name: string;
  email: string;
  phone_number: string;
  visit_date: String;
  visit_reason: string;
}

export interface newVisitor {
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  address: string;
  company_origin?: string;
  company_destination: string;
  start_date: Date;
  end_date: Date;
  visit_reason: string;
}

export interface otp {
  email: string;
  otp_code: string;
}
