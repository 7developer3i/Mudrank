import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// get api
export function fetchAboutDetails({ token, adminid }) {

  return new Promise(async (resolve) => {
    const response = await fetch(
      `${BaseUrl.url}about?token=${token}&adminid=${adminid}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

// post api
export function fetchCreateAbout(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${BaseUrl.url}about`, formData);
  });
}

// edit api
export function fetchAboutEdit(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.put(`${BaseUrl.url}about`, formData);
  });
}

// delete api
export function fetchAboutDelete({id, token,adminid}) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}about/${id}`, {
      params: {
        token: token,
        adminid:adminid
      },
    });
  });
}
