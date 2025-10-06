import React, { useState, useContext } from 'react'
import { toast } from "react-toastify";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
const AddDoc = () => {
    const { backendURL } = useContext(AppContext)

    const [docDetails, setDocDetails] = useState({
        id: "",
        title: "",
        requirement: "",
        intro: "",
        useCase: "",
        process: "",

    })


    const changeHandler = (e) => {
        setDocDetails({ ...docDetails, [e.target.name]: e.target.value })
    }



    const handleADD = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${backendURL}/api/auth/add-doc`,
                { title, requirement, intro, useCase, process },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success(data.message);
                navigate('/document');
            }
        } catch (error) {
            toast.error(error.message);

        }

    }

    return (
        <div className="container mx-auto py-12 px-6 flex justify-center">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-b from-cyan-50 to-white p-6 rounded-lg shadow-lg">
                    <div className="bg-cyan-600 text-white rounded-md p-4 mb-4 text-center font-semibold">
                        Fill Details
                    </div>

                    <form
                        onSubmit={handleADD}
                        className="p-6 bg-slate-800 text-white rounded-md space-y-4"
                    >

                        {/* <input value={docDetails.id} onChange={changeHandler} type="text" name="id" placeholder='Type Your Id'
                            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none" /> */}



                        <input value={docDetails.title} onChange={changeHandler} type="text" name="title" placeholder='Type Your Title'
                            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none" />





                        <input value={docDetails.requirement} onChange={changeHandler} type="text" name="requirement" placeholder='Type requirement'
                            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none" />





                        <input value={docDetails.intro} onChange={changeHandler} type="text" name="intro" placeholder='Type Intro'
                            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none" />





                        <input value={docDetails.useCase} onChange={changeHandler} type="text" name="useCase" placeholder='Type useCase'
                            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none" />



                        <input value={docDetails.process} onChange={changeHandler} type="text" name="process" placeholder='Type Process'
                            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none" />



                        <button className="w-full bg-teal-400 text-slate-600 py-2 rounded mt-4">
                            ADD
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDoc
