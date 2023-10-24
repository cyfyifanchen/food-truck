import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import App from './App' // Import the component

// Mock the Axios module to simulate the API call
jest.mock('axios')

// Define a mock response for Axios
const mockResponse = [
  {
    objectid: 1,
    applicant: 'Food Truck 1',
    facilitytype: 'Type 1',
    locationdescription: 'Location 1',
    address: 'Address 1',
    permit: 'Permit 1',
    status: 'Open',
    fooditems: 'Burger, Fries',
  },
  {
    objectid: 2,
    applicant: 'Food Truck 2',
    facilitytype: 'Type 2',
    locationdescription: 'Location 2',
    address: 'Address 2',
    permit: 'Permit 2',
    status: 'Closed',
    fooditems: 'Pizza, Salad',
  },
]

// Mock Axios get method to return the mock response
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockResponse })),
}))

test('renders food truck cards', async () => {
  // Render the component
  render(<App />)

  // Use waitFor to wait for the data to load and component to update
  await waitFor(() => {
    // Check if the food truck cards are displayed
    const foodTruckCards = screen.getAllByRole('article')
    expect(foodTruckCards).toHaveLength(mockResponse.length)

    // Check if the data from the mock response is displayed in the cards
    mockResponse.forEach((truck) => {
      expect(screen.getByText(truck.applicant)).toBeInTheDocument()
      expect(
        screen.getByText(`Facility Type: ${truck.facilitytype}`)
      ).toBeInTheDocument()
      expect(
        screen.getByText(`Location: ${truck.locationdescription}`)
      ).toBeInTheDocument()
      expect(screen.getByText(`Address: ${truck.address}`)).toBeInTheDocument()
      expect(screen.getByText(`Permit: ${truck.permit}`)).toBeInTheDocument()
      expect(screen.getByText(`Status: ${truck.status}`)).toBeInTheDocument()
      expect(
        screen.getByText(`Food Items: ${truck.fooditems}`)
      ).toBeInTheDocument()
    })
  })
})
