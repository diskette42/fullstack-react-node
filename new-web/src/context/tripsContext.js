import axios from 'axios'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import useQuery from '../features/hooks/useQuery'

const TripsContext = createContext(null)

export const TripsContextProvider = ({ children }) => {
  const query = useQuery()
  const queryKeyword = query.get('keyword')
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [keyword, setKeyword] = useState(queryKeyword ? queryKeyword : '')
  // Remove !!Eslint Warning!! when using useEffect with useCallback
  const setQueryKeyword = useCallback(() => {
    if (keyword === '') {
      return navigate('/')
    }
    return navigate(`/?keyword=${keyword}`)
  }, [keyword, navigate])

  const getTrip = useCallback(async () => {
    try {
      if (!keyword) {
        const res = await axios.get('http://localhost:9000/api/trips')
        return setTrips(res.data)
      }
      const res = await axios.get(
        `http://localhost:9000/api/trips?keyword=${keyword}`,
      )
      return setTrips(res.data)
    } catch (e) {
      console.log(e)
    }
  }, [keyword])

  useEffect(() => {
    getTrip()
    setQueryKeyword()
  }, [getTrip, setQueryKeyword])

  const value = {
    trips,
    setTrips,
    keyword,
    setKeyword,
  }

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
}

export const useTripsCTX = () => useContext(TripsContext)
