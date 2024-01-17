import axios from "axios"
import { useEffect, useState } from "react"

export const StartupDetails = () => {

    const [startupsData, setStartUpsData] = useState([]);

    const fetchData = () => {
        axios.get("http://localhost:3002/auth/admin-startup-data").then((res) => {
            console.log(res);
            if (res.status === 200) {
                setStartUpsData(res.data.result);
            }
        }).catch((err) => console.log(err))
    };

    useEffect(()=>{
      return () => fetchData();
    },[]);
    return (
        <>
            <div className="flex justify-center my-10">
                <div className="col-span-12">
                    <div className="overflow-auto lg:overflow-visible ">
                        <table className="table text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-gray-800 text-gray-500">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3 text-left">Slots</th>
                                    <th className="p-3 text-left">Valuation Cap</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {startupsData.map((datas, index) =>
                                    <tr className="bg-gray-800" key={index}>
                                        <td className="p-3">
                                            <div className="flex align-items-center">
                                                <img className="rounded-full h-12 w-12  object-cover" src={datas.logo_url} alt="unsplash image" />
                                                <div className="ml-3">
                                                    <div className="">{datas.company_name}</div>
                                                    <div className="text-gray-500">{datas.company_email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            {datas.slot_available}
                                        </td>
                                        <td className="p-3 font-bold">
                                            {datas.valuation_cap}
                                        </td>
                                        <td className="p-3">
                                            <span className="bg-green-400 text-gray-50 rounded-md px-2">{datas.is_deleted === 0 ? "Available" : 'No Stock'}</span>
                                        </td>
                                        <td className="p-3 ">
                                            <a href="#" className="text-gray-400 hover:text-gray-100 mr-2">
                                                <i className="material-icons-outlined text-base">visibility</i>
                                            </a>
                                            <a href="#" className="text-gray-400 hover:text-gray-100  mx-2">
                                                <i className="material-icons-outlined text-base">edit</i>
                                            </a>
                                            <a href="#" className="text-gray-400 hover:text-gray-100  ml-2">
                                                <i className="material-icons-round text-base">delete_outline</i>
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}