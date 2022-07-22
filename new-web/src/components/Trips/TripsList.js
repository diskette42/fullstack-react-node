import React from 'react'
import { useTripsCTX } from '../../context/tripsContext'
import { motion } from 'framer-motion'
function TripsList() {
  const { trips, keyword, setKeyword, isLoading } = useTripsCTX()

  if (isLoading) {
    return (
      <div className="flex justify-center mt-4 text-xl font-bold text-slate-400">
        Loading...
      </div>
    )
  }
  if (trips.length === 0) {
    return (
      <div className="flex justify-center mt-4 text-xl font-bold text-slate-400">
        ไม่พบข้อมูล...
      </div>
    )
  }
  return (
    <motion.div
      key={keyword}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: { opacity: 0 },
        pageAnimate: {
          opacity: 1,
        },
      }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col space-y-12 mt-4">
        {trips.map((trip, index) => (
          <div key={index} className="flex flex-col lg:flex-row  ">
            <img
              src={trip.photos[0]}
              alt={trip.title}
              className="lg:w-1/4 h-[190px] lg:h-auto object-cover rounded-lg cursor-pointer hover:scale-105 duration-150 ease-in"
            />
            <div className="lg:w-3/4 lg:pl-4 pt-1 flex flex-col justify-between">
              <div>
                <h1
                  className="text-lg sm:text-2xl font-bold cursor-pointer mt-1 lg:mt-0"
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
    </motion.div>
  )
}

export default TripsList
