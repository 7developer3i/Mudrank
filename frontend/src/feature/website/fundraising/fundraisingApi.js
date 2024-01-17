import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

export function fetchCreatefundraisingBlog(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${BaseUrl.url}fundraising`, formData);
  });
}

export function fetchFundraisingDetails({ token, adminid }) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${BaseUrl.url}fundraising?token=${token}&adminid=${adminid}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchfundraisingEdit(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.put(`${BaseUrl.url}fundraising`, formData);
  });
}

export function fetchfundraisingDelete({id,token,adminid}) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}fundraising/${id}`, {
      params: {
        token: token,
        adminid:adminid
      },
    });
  });
}
