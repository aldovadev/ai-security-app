import { visitorData } from "./visitor.model"
import { employeeData } from "./employee.model"

export interface recognizedData {
  name: string
  gender: string
  type: string
  id: string
  origin?: string
  destination?: string
  date: string
  duration: string
  url: string
  color: string
  status: string
  icon: string
}

export interface visitorResponse {
  message: string
  status: string
  type: string
  data: visitorData
  url: string
}

export interface employeeResponse {
  message: string
  status: string
  type: string
  data: employeeData
  url: string
}

export interface unknownResponse {
  message: string
  error: string
}

