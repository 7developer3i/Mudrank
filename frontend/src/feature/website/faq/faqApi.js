import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// get api
export function fetchFaqDetails({ token, adminid }) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${BaseUrl.url}faq?token=${token}&adminid=${adminid}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

// post api
export function fetchCreateFaqBlog(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${BaseUrl.url}faq`, formData);
  });
}

// edit api
export function fetchFaqEdit(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.put(
      `${BaseUrl.url}faq/${formData.id}`,
      formData
    );
  });
}

// delete api
export function fetchFaqDelete({adminid,token,id}) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}faq/${id}token`, {
    params: {
      token: token,
      adminid: adminid,
    },
  }
      
    );
  });
}
