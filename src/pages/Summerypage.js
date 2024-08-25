import React, { useContext, useEffect, useState } from 'react';
import "../App.css"
import 'react-toastify/dist/ReactToastify.css';
import { bookingContext } from '../context/bookingcontext';

export const Summerypage = () => {
    const { bookData } = useContext(bookingContext);

    const costPerPerson = () => {
        if (bookData) {
            return bookData[0].vehicleType === "AC" ? bookData[1].withAC : bookData[1].withoutAC;
        }
        return 0;
    }

    const getTotalCost = () => {
        if (bookData) {
            const personCost = costPerPerson();
            return personCost * bookData[0].totalPassangers;
        }
        return 0;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className='text-center font-bold text-2xl mb-4'>
                Booking Summary
            </h1>
            {bookData && (
                <div className=" p-6 rounded-lg shadow-md w-1/2 mx-auto mt-10 bg-[#e6e4e4]">
                    <div className="mb-4 ">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Destination City:</span>
                            <p>{bookData[0].city}</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Vehicle Name:</span>
                            <p>{bookData[0].vehicleName}</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Vehicle Type:</span>
                            <p>{bookData[0].vehicleType}</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Total Passengers:</span>
                            <p>{bookData[0].totalPassangers}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Cost per Passenger:</span>
                            <p className='font-bold'>${costPerPerson()}</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Total Cost:</span>
                            <p className='font-bold'> ${getTotalCost()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
