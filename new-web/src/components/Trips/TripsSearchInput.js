import React from 'react'
import { useTripsCTX } from '../../context/tripsContext'
import CloseIcon from '@mui/icons-material/Close'

function TripsSearchInput() {
  const { keyword, setKeyword } = useTripsCTX()
  const handleChange = (e) => {
    setKeyword(e.target.value)
  }
  return (
    <div className="relative mt-5">
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
  )
}

export default TripsSearchInput
