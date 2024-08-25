import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookingContext } from '../context/bookingcontext';

export const BookVehicle = () => {
    const [cityName, setcityName] = useState([]);
    const [cty, setcty] = useState("");
    const [vehicleName, setvehicleName] = useState("");
    const [distance, setdistance] = useState("");
    const [vehicleType, setvehicleType] = useState("");
    const [totalPassangers, settotalPassangers] = useState("");

    const navigate = useNavigate();
    const { bookData, setbookData, updateValue } = useContext(bookingContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://vehicle-booking-backend-j5qu.onrender.com/api/v1/get-city");
                setcityName(response.data.response);
            } catch (error) {
                console.error("Error fetching city data:", error);
                toast.error("Failed to load cities.");
            }
        };
        fetchData();
    }, []);

    const Booking = async () => {
        if (!cty || !vehicleName || !distance || !vehicleType || !totalPassangers) {
            toast.info("Please fill all the details.");
            return;
        }

        const data = {
            city: cty,
            vehicleName,
            distance,
            vehicleType,
            totalPassangers
        };

        // Show loading toast
        const loadingToastId = toast.loading("Booking vehicle...");

        try {
            const Response = await axios.post('https://vehicle-booking-backend-j5qu.onrender.com/api/v1/booking', data);
            console.log(Response);

            if (Response.data.data) {
                updateValue(Response.data.data);
                toast.update(loadingToastId, {
                    render: "Vehicle booked successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 5000
                });

                // Reset form fields
                setcty("");
                setvehicleName("");
                setdistance("");
                setvehicleType("");
                settotalPassangers("");

                navigate(`/summery`);
            } else if (Response.data.message) {
                toast.update(loadingToastId, {
                    render: Response.data.message,
                    type: "warn",
                    isLoading: false,
                    autoClose: 5000
                });
            } else {
                toast.update(loadingToastId, {
                    render: "Error while booking",
                    type: "error",
                    isLoading: false,
                    autoClose: 5000
                });
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.update(loadingToastId, {
                render: "Error while booking",
                type: "error",
                isLoading: false,
                autoClose: 5000
            });
        }
    };

    // Filter data only if cityName is not empty
    let filterData = [];
    if (cty && cityName.length > 0) {
        filterData = cityName.filter((one) => one.city === cty);
    }

    return (
        <div>
            <h1 className='mt-[5%] text-center text-[25px]'>Book Vehicle</h1>
            <div className='flex justify-center items-center my-auto mt-[4%]'>
                <div className='w-8/12 h-auto py-5 bg-blue-100 flex justify-center items-center gap-6 shadow-md shadow-[#00000036] rounded-md flex-col'>
                    {/* City Name */}
                    <label htmlFor="city" className='flex gap-4'>
                        <p>Select City:</p>
                        <select
                            name="city"
                            id="city"
                            className='text-gray-500'
                            value={cty}
                            onChange={(e) => setcty(e.target.value)}
                        >
                            <option value="" disabled>Select City</option>
                            {
                                cityName.length > 0 && cityName
                                    .filter((ct, index, self) =>
                                        index === self.findIndex((t) => (
                                            t.city === ct.city
                                        ))
                                    )
                                    .map((ct) => (
                                        <option value={ct.city} key={ct._id}>
                                            {ct.city}
                                        </option>
                                    ))
                            }
                        </select>
                    </label>

                    {/* Vehicle Name */}
                    <label htmlFor="vehicleName" className='flex gap-4'>
                        <p>Select Vehicle:</p>
                        <select
                            name="vehicleName"
                            id="vehicleName"
                            className='text-gray-500'
                            value={vehicleName}
                            onChange={(e) => setvehicleName(e.target.value)}
                            disabled={!cty || filterData.length === 0}
                        >
                            <option value="" disabled>
                                {cty ? "Choose vehicle" : "Please choose city"}
                            </option>
                            {filterData.length > 0 ? (
                                filterData.map((ct) => (
                                    <option value={ct.name} key={ct._id}>
                                        {ct.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    No vehicles available
                                </option>
                            )}
                        </select>
                    </label>

                    {/* Distance */}
                    <label htmlFor="distance" className='flex gap-4'>
                        <p>Add distance (in KM):</p>
                        <input
                            type="text"
                            className='text-gray-500'
                            value={distance}
                            onChange={(e) => setdistance(e.target.value)}
                        />
                    </label>

                    {/* Vehicle Type */}
                    <div>
                        <h3 className='font-bold text-[20px] mt-3'>Vehicle Type</h3>
                        <label htmlFor="ac" className='flex gap-2'>
                            <input
                                type="radio"
                                id='ac'
                                name="vehicleType"
                                value="AC"
                                onChange={(e) => setvehicleType(e.target.value)}
                            />
                            <p>AC</p>
                        </label>
                        <label htmlFor="non-ac" className='flex gap-2'>
                            <input
                                type="radio"
                                id='non-ac'
                                name="vehicleType"
                                value="NON-AC"
                                onChange={(e) => setvehicleType(e.target.value)}
                            />
                            <p>NON AC</p>
                        </label>
                    </div>

                    {/* Total Passengers */}
                    <div className='flex flex-col gap-3'>
                        <h3 className='font-bold text-[20px] mt-3'>Total Passengers</h3>
                        <input
                            type="text"
                            className='text-gray-500'
                            value={totalPassangers}
                            onChange={(e) => settotalPassangers(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={Booking}
                        className='px-4 py-2 font-semibold text-gray-500 bg-blue-500 rounded hover:bg-blue-700'
                    >
                        Book Vehicle
                    </button>
                </div>
            </div>
        </div>
    );
};
