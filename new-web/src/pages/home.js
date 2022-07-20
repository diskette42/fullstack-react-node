import Trips from '../components/Trips'
import { TripsContextProvider } from '../context/tripsContext'
function Home() {
  return (
    <TripsContextProvider>
      <Trips />
    </TripsContextProvider>
  )
}

export default Home
