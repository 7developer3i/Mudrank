import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// get api
export const fetchBrowseDetails = ({ token, adminid }) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BaseUrl.url}browse?token=${token}&adminid=${adminid}`);
    const data = await response.json();
    resolve({ data });
  });
}

// post api
export function fetchCreateBrowseBlog(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${BaseUrl.url}browse`, formData);
  });
}

// edit api
export function fetchBrowseEdit(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.put(
      `${BaseUrl.url}browse/${formData.id}`,
      formData
    );
  });
}

// delete api
export function fetchBrowseDelete(id) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}browse/${id}`);
  });
}
