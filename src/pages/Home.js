import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className='flex justify-center items-center my-auto mt-[15%]' >
            <div className='w-[300px] h-[200px]  bg-blue-100 flex justify-center items-center gap-6 shadow-md shadow-[#00000036] rounded-md'>
                <button
                    className='px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700'
                > <Link to={'/add-Vehicle'}> Add Vehicle</Link></button>
                <button
                    className='px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700'>
                    <Link to={'/book-Vehicle'}> Book Vehicle</Link>
                </button>
            </div>
        </div>
    )
}
