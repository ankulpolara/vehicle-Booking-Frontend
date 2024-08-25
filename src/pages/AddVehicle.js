import React, { useState } from 'react';
import { CITY } from '../constant';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const AddVehicle = () => {
    const [city, setCity] = useState(CITY[1].value);
    const [name, setName] = useState("");
    const [withAC, setWithAC] = useState("");
    const [withoutAC, setWithoutAC] = useState("");
    const [maxAllowed, setMaxAllowed] = useState("");

    const addVehicle = async () => {
        // Validate all fields
        if (!city || !name || !withAC || !withoutAC || !maxAllowed) {
            toast.error("Please fill in all fields before submitting.");
            return;
        }

        let data = { city, name, withAC, withoutAC, maxAllowed };

        // Show loading toast
        const loadingToastId = toast.loading("Adding vehicle...");

        try {
            let response = await axios.post('https://vehicle-booking-backend-j5qu.onrender.com/api/v1/create', data);

            if (response.data) {
                toast.update(loadingToastId, { render: "Vehicle added successfully", type: "success", isLoading: false, autoClose: 5000 });

                // Reset form fields
                setCity(CITY[1].value);
                setName("");
                setWithAC("");
                setWithoutAC("");
                setMaxAllowed("");
            } else {
                toast.update(loadingToastId, { render: "Failed to add vehicle. Please try again.", type: "error", isLoading: false, autoClose: 5000 });
            }
        } catch (error) {
            console.error("Error adding vehicle:", error);
            toast.update(loadingToastId, { render: "An error occurred while adding the vehicle. Please try again.", type: "error", isLoading: false, autoClose: 5000 });
        }
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-center text-2xl mb-10">Add Vehicle</h1>
            <div className="w-8/12 bg-blue-200 p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <label htmlFor="city" className="block text-gray-700 mb-2">Select City:</label>
                    <select
                        name="city"
                        id="city"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200 text-black"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                        {CITY.map((ct) => (
                            <option value={ct.value} key={ct.id}>{ct.value}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Add Vehicle Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200 text-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="withAC" className="block text-gray-700 mb-2">Price per KM (with AC):</label>
                    <input
                        type="text"
                        id="withAC"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200 text-black"
                        value={withAC}
                        onChange={(e) => setWithAC(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="withoutAC" className="block text-gray-700 mb-2">Price per KM (without AC):</label>
                    <input
                        type="text"
                        id="withoutAC"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200 text-black"
                        value={withoutAC}
                        onChange={(e) => setWithoutAC(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="maxAllowed" className="block text-gray-700 mb-2">Max Allowed Person:</label>
                    <input
                        type="text"
                        id="maxAllowed"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200 text-black"
                        value={maxAllowed}
                        onChange={(e) => setMaxAllowed(e.target.value)}
                    />
                </div>

                <button
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                    onClick={addVehicle}
                >
                    Add Vehicle
                </button>
            </div>
        </div>
    );
}
