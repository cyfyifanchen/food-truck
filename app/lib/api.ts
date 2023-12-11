import { keysToCamelCase } from '@/app/lib/case'

export async function fetchFoodTrucks() {
  const apiUrl = 'https://data.sfgov.org/resource/rqzj-sfat.json'
  const response = await fetch(apiUrl)
  const data = await response.json()
  const camelCasedData = keysToCamelCase(data)
  return camelCasedData
}
