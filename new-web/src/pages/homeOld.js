import Container from '@mui/material/Container'
import CloseIcon from '@mui/icons-material/Close'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useQuery from '../features/hooks/useQuery'
function HomeOld() {
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
        const res = await axios.get('http://localhost:3002/trips')
        return setTrips(res.data)
      }
      const res = await axios.get(
        `http://localhost:3002/trips?keyword=${keyword}`,
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

  const handleChange = (e) => {
    setKeyword(e.target.value)
  }
  return (
    <Container maxWidth="sm">
      <div className=" py-10 min-h-screen">
        <div className="text-3xl font-bold text-blue-400 grow flex justify-center">
          เที่ยวไหนดี
        </div>
        <div>
          <div className="mt-5 px-2">
            {/* Input */} 
            <div className="relative">
              <input
                id="search"
                onChange={handleChange}
                className="w-full text-center bg-transparent appearance-none border-b-[1px] border-b-slate-400  focus:border-b-blue-500 focus:border-b-2  py-2 px-4 text-slate-700 font-bold leading-tight focus:outline-none "
                type="text"
                value={keyword}
                placeholder="หาที่เที่ยวแล้วไปกับ..."
              />
              {keyword && (
                <div className="absolute right-0 top-0 translate-y-1">
                  <CloseIcon
                    className="!w-[20px] !h-[20px] text-slate-400 cursor-pointer"
                    onClick={() => setKeyword('')}
                  />
                </div>
              )}
            </div>
            {/* Input */}

            {/* List */}
            {trips.length === 0 && (
              <div className="flex justify-center mt-4 text-xl font-bold text-slate-400">
                ไม่พบข้อมูล...
              </div>
            )}
            <div className="flex flex-col space-y-12 mt-4">
              {trips.map((trip, index) => (
                <div key={index} className="flex flex-col lg:flex-row  ">
                  <img
                    src={trip.photos[0]}
                    alt={trip.title}
                    className="lg:w-1/4 h-[190px] lg:h-auto object-cover rounded-lg cursor-pointer hover:scale-105 duration-150 ease-in"
                  />
                  {/*  */}
                  <div className="lg:w-3/4 lg:pl-4 pt-1 flex flex-col justify-between">
                    <div>
                      <h1
                        className="text-lg sm:text-2xl font-bold cursor-pointer"
                        onClick={() => window.open(trip.url)}
                      >
                        {trip.title}
                      </h1>
                      <div className=" text-slate-400 font-medium flex w-3/4 lg:w-2/4 mt-2">
                        <div className="text-sm flex-1 truncate">
                          {trip.description}
                        </div>
                        <div
                          className="underline cursor-pointer text-base text-blue-500 "
                          onClick={() => window.open(trip.url)}
                        >
                          อ่านต่อ
                        </div>
                      </div>
                      <ul className="text-sm flex flex-wrap space-x-2 text-slate-400 font-medium mt-1">
                        <li>หมวด:</li>
                        {trip.tags.map((tag, tagIndex) => (
                          <li
                            key={tagIndex}
                            className="underline cursor-pointer"
                            onClick={() => setKeyword(tag)}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-3 mt-3">
                      {trip.photos.map((photo, photoIndex) => {
                        if (photoIndex === 0) return null
                        return (
                          <img
                            key={photoIndex}
                            alt="ภาพประกอบการท่องเที่ยว"
                            src={photo}
                            className="w-[25%] object-cover rounded-lg cursor-pointer hover:scale-105 duration-150 ease-in"
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomeOld
