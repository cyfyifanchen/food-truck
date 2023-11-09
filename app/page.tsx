'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Logo } from './components/logo'
import Skeleton from './components/skeleton'

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

  // Random food truck
  const [randomFoodTrucks, setRandomFoodTrucks] = useState<FoodTruck[]>([])

  // Function to select a random food truck
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
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="italic text-gray-400">A local food truck service</p>
      <div className="mt-20">
        <button
          onClick={selectRandomFoodTrucks}
          className="bg-textColor bg-gray-900 hover:bg-gray-500 text-[#ffffff] font-bold py-2 px-4 rounded"
        >
          Roll Three For Me
        </button>
        <p className="text-gray-400 mt-3">
          Hard to decide what to eat, roll for me.
        </p>
      </div>
      <div className="w-full h-full text-center p-10">
        <div className="food-truck-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {randomFoodTrucks.map((truck) => (
            <div
              className="border-b-[40px] border border-greenish food-truck-card p-6 mb-10  bg-cardColor rounded shadow-sm"
              key={truck.objectid}
            >
              <h2 className="text-2xl font-semibold text-textColor mb-8">
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
        <div className="mt-5 mb-10">
          <h2 className="font-bold text-xl mb-5 text-textColor">
            Or pick your lunch idea by country
          </h2>
          <select
            id="filterSelect"
            className="block w-full rounded py-2 px-3"
            value={filterValue}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="chinese">Chinese</option>
            <option value="mexican">Mexican</option>
            <option value="italian">Italian</option>
          </select>
        </div>
        <div className="food-truck-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array(9)
                .fill(undefined)
                .map((_, index) => (
                  <div
                    className="food-truck-card p-6 border border-gray-200 bg-white rounded shadow-lg"
                    key={index}
                  >
                    <Skeleton />
                  </div>
                ))
            : filteredTrucks.map((truck) => (
                <div
                  className="food-truck-card p-6 text-white bg-cardColor rounded shadow-md"
                  key={truck.objectid}
                >
                  <h2 className="capitalize text-2xl font-semibold text-textColor mb-8">
                    {truck.applicant}
                  </h2>
                  <div className="text-left text-sm mt-2 text-gray">
                    <p className="mb-1">Facility Type: {truck.facilitytype}</p>
                    <p className="mb-1">
                      Location: {truck.locationdescription}
                    </p>
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
