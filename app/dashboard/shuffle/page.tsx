'use client'

import React, { useEffect, useState } from 'react'
import { fetchFoodTrucks } from '@/app/lib/api'

export default function Page() {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([])
  const [filterValue, setFilterValue] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [randomFoodTrucks, setRandomFoodTrucks] = useState<FoodTruck[]>([])

  const selectRandomFoodTrucks = () => {
    const numberOfRandomTrucks = 3
    const randomTrucks = []

    for (let i = 0; i < numberOfRandomTrucks; i++) {
      const randomIndex = Math.floor(Math.random() * filteredTrucks.length)
      randomTrucks.push(filteredTrucks[randomIndex])
    }

    setRandomFoodTrucks(randomTrucks)
  }

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value)
  }

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
      <div className="mt-20">
        <button
          onClick={selectRandomFoodTrucks}
          className="bg-fresh-textColor hover:bg-fresh-subTextColor text-[#ffffff] text-xl font-bold py-4 px-6 rounded"
        >
          Shuffle Three Truckees For Me
        </button>
        <p className="text-gray-400 mt-3">
          Hard to decide what to eat, for me.
        </p>
      </div>
      <div className="w-full h-full text-center p-10">
        <div className="food-truck-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {randomFoodTrucks.map((truck) => (
            <div
              className="border-t-[30px] border border-fresh-textColor food-truck-card mb-10  bg-fresh-cardColor rounded shadow-sm"
              key={truck.objectid}
            >
              <div className="bg-fresh-textColor py-5">
                <h2 className="text-xl bg-fresh-textColor font-semibold text-white mb-4">
                  {truck.applicant}
                </h2>
              </div>
              <div className="p-6 text-left text-sm">
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
