import { Container } from '@mui/material'
import React from 'react'
import TripsHeader from './TripsHeader'
import TripsList from './TripsList'
import TripsSearchInput from './TripsSearchInput'

function Trips() {
  return (
    <Container maxWidth="sm">
      <div className="py-10 min-h-screen">
        <TripsHeader />
        <div className="px-2">
          <TripsSearchInput />
          <TripsList />
        </div>
      </div>
    </Container>
  )
}

export default Trips
