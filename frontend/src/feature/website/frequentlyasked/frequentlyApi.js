import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// get api
export function fetchFreqDetails({adminid,token}) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BaseUrl.url}freq?token=${token}&adminid=${adminid}`);
    const data = await response.json();
    resolve({ data });
  });
}

// post api
export function fetchCreateFreqBlog(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${BaseUrl.url}freq`, formData);
  });
}

// edit api
export function fetchFreqEdit(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.put(
      `${BaseUrl.url}freq/${formData.id}`,
      formData
    );
  });
}

// delete api
export function fetchFreqDelete({id,token,adminid}) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}freq/${id}`,{
      params:{
        token:token,
        adminid:adminid
      }
    });
  });
}
