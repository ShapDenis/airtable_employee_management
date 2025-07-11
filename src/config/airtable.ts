export const airtableConfig = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY || '',
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID || 'apppKSslAnV8PDfxN',
  tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Employee list',
  apiUrl: 'https://api.airtable.com/v0'
}

export const getAirtableHeaders = () => ({
  'Authorization': `Bearer ${airtableConfig.apiKey}`,
  'Content-Type': 'application/json'
}) 