import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// selected Get Blogs APIs
export function fetchCompletedstartupDetails({ token, adminid }) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${BaseUrl.url}startup?token=${token}&adminid=${adminid}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

// selected Create Blog APIs
export function fetchCreateCompletedstartupDetails(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${BaseUrl.url}startup`, formData);
  });
}

// selected Edit Blogs APIs
export function fetchEditBlogs(formData, token) {
  return new Promise(async (resolve) => {
    const response = await axios.put(`${BaseUrl.url}startup`, formData, {
      params: {
        token: token,
      },
    });
  });
}

// selected Delete Blog APIs
export function fetchDeleteBlog({id,token,adminid}) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}startup/${id}`, {
     params:{
      token:token,
      adminid:adminid
     }
    });
  });
}
