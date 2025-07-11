export interface Employee {
  id: string
  fields: {
    'Employee ID': string
    'First Name': string
    'Last Name': string
    'Job Title': string
    'Department': string
    'Email': string
    'Phone Number': string
    'Full Name'?: string
  }
  createdTime: string
}

export interface CreateEmployeeData {
  'Employee ID': string
  'First Name': string
  'Last Name': string
  'Job Title': string
  'Department': string
  'Email': string
  'Phone Number': string
}

export interface AirtableResponse {
  records: Employee[]
}

export interface AirtableCreateResponse {
  records: Employee[]
} 