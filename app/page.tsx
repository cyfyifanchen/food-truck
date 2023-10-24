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
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([])
  const apiUrl = 'https://data.sfgov.org/resource/rqzj-sfat.json'

  useEffect(() => {
    axios
      .get<FoodTruck[]>(apiUrl)
      .then((response) => {
        setFoodTrucks(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div className="w-full h-full text-center p-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Food Truck Web App
      </h1>
      <div className="food-truck-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodTrucks.map((truck) => (
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
  )
}

export default App
