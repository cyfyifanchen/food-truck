'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface FoodTruck {
  objectid: number
  applicant: string
  facilitytype: string
  locationdescription: string
  address: string
  permit: string
  status: string
  fooditems: string
}

const App: React.FC = () => {
  const apiUrl = 'https://data.sfgov.org/resource/rqzj-sfat.json'
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([])
  // Initial Data
  const [filterValue, setFilterValue] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get<FoodTruck[]>(apiUrl)
      .then((response) => {
        setFoodTrucks(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setIsLoading(true)
      })
  }, [])

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value)
  }

  // Filter food trucks based on the selected option
  const filteredTrucks =
    filterValue === 'mexican'
      ? foodTrucks.filter((truck) =>
          truck.fooditems?.toLowerCase().includes('tacos')
        )
      : filterValue === 'chinese'
      ? foodTrucks.filter((truck) =>
          truck.fooditems?.toLowerCase().includes('chinese')
        )
      : filterValue === 'italian'
      ? foodTrucks.filter((truck) =>
          truck.fooditems?.toLowerCase().includes('italian')
        )
      : foodTrucks

  return (
    <div className="w-full h-full text-center p-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Food Trucks</h1>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="filterSelect"
        >
          Filter by Food Item:
        </label>
        <select
          id="filterSelect"
          className="block w-full border border-gray-300 rounded py-2 px-3"
          value={filterValue}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Mexican</option>
          <option value="italian">Italian</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      <div className="w-full h-full text-center p-10">
        <div className="food-truck-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrucks.map((truck) => (
            <div
              className="food-truck-card p-6 border border-gray-200 bg-white rounded shadow-lg"
              key={truck.objectid}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                {truck.applicant}
              </h2>
              <div className="text-left text-sm">
                <p className="mb-1">Facility Type: {truck.facilitytype}</p>
                <p className="mb-1">Location: {truck.locationdescription}</p>
                <p className="mb-1">Address: {truck.address}</p>
                <p className="mb-1">Permit: {truck.permit}</p>
                <p className="mb-1">Status: {truck.status}</p>
                <p>Food Items: {truck.fooditems}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
