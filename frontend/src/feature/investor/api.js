import axios from "axios";

//Fetch form investor data 
export const fetchInvetsorData = async () => {

    const InvestorDataUrl = "auth/investors"
    try {
        const response = await axios.get(`http://localhost:3002/${InvestorDataUrl}`)
        return response.data
    } catch (error) {
        throw error
    }
}