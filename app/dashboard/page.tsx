'use client'

import React, { useEffect, useState } from 'react'
import Skeleton from '@/app/ui/skeleton'
import { fetchFoodTrucks } from '@/app/lib/api'

export default function Page() {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([])
  const [filterValue, setFilterValue] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchFoodTrucks()
        setFoodTrucks(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(true)
      }
    }

    fetchData()
  }, [])

  // Handle filter change
  function handleFilterChange(value: string) {
    setFilterValue(value)
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
      <div className="flex border-fresh-textColor justify-center"></div>
      <div className="w-full h-full text-center p-10">
        <div className="mt-5 mb-10">
          <h2 className="font-bold text-xl mb-5 text-textColor">
            Select truckee by country
          </h2>
          <div className="flex space-x-4">
            <button
              className={`py-2 px-4 rounded ${
                filterValue === 'all'
                  ? 'bg-fresh-textColor text-white'
                  : 'bg-white text-color'
              }`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button
              className={`py-2 px-4 rounded ${
                filterValue === 'chinese'
                  ? 'bg-fresh-textColor text-white'
                  : 'bg-white text-color'
              }`}
              onClick={() => handleFilterChange('chinese')}
            >
              Chinese
            </button>
            <button
              className={`py-2 px-4 rounded ${
                filterValue === 'mexican'
                  ? 'bg-fresh-textColor text-white'
                  : 'bg-white text-color'
              }`}
              onClick={() => handleFilterChange('mexican')}
            >
              Mexican
            </button>
            <button
              className={`py-2 px-4 rounded ${
                filterValue === 'italian'
                  ? 'bg-fresh-textColor text-white'
                  : 'bg-white text-color'
              }`}
              onClick={() => handleFilterChange('italian')}
            >
              Italian
            </button>
          </div>
        </div>
        <div className="food-truck-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array(9)
                .fill(undefined)
                .map((index) => (
                  <div
                    className="food-truck-card p-6 rounded shadow-lg"
                    key={index}
                  >
                    <Skeleton />
                  </div>
                ))
            : filteredTrucks.map((truck) => (
                <div
                  className="food-truck-card p-6 bg-white border border-gray-200 rounded-lg shadow-md"
                  key={truck.objectid}
                >
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    {truck.applicant}
                  </h2>
                  <div className="text-left text-sm mt-2 text-gray-600">
                    <p className="mb-1">
                      <strong>Facility Type:</strong> (truck.facilitytype)
                    </p>
                    <p className="mb-1">
                      <strong>Location:</strong>
                      <span className="block text-gray-500 text-sm mt-1">
                        {truck.locationdescription}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong>Address:</strong> {truck.address}
                    </p>
                    <p className="mb-1">
                      <strong>Permit:</strong> {truck.permit}
                    </p>
                    <p className="mb-1">
                      <strong>Status:</strong> {truck.status}
                    </p>
                    <p>
                      <strong>Food Items:</strong> {truck.fooditems}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
