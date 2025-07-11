import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import {airtableConfig, getAirtableHeaders} from '../config/airtable'
import {AirtableResponse, Employee, CreateEmployeeData} from '../types/employee'

const airtableApi = axios.create({
  baseURL: airtableConfig.apiUrl,
  headers: getAirtableHeaders()
})

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await airtableApi.get<AirtableResponse>(
        `/${airtableConfig.baseId}/${encodeURIComponent(airtableConfig.tableName)}`
      )
      return response.data.records
    },
    enabled: !!airtableConfig.apiKey
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (employeeData: CreateEmployeeData) => {
      const response = await airtableApi.post(
        `/${airtableConfig.baseId}/${encodeURIComponent(airtableConfig.tableName)}`,
        {
          records: [
            {
              fields: employeeData
            }
          ]
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['employees']})
    }
  })
} 