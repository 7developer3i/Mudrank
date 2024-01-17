import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// get api
export function fetchPrivacyDetails({ token, adminid }) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${BaseUrl.url}privacy?token=${token}&adminid=${adminid}`,
      {}
    );
    const data = await response.json();
    resolve({ data });
  });
}

// post api
export function fetchCreatePrivacyBlog(formData) {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(`${BaseUrl.url}privacy`, formData);
      resolve(response);
    } catch (error) {
      // Handle the error
      console.error(error);
      resolve(error);
    }
  });
}

// edit api
export function fetchPrivacyEdit(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.put(
      `${BaseUrl.url}privacy/${formData.id}`,
      formData
    );
  });
}

// delete api
export function fetchPrivacyDelete({ id, token, adminid }) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}privacy/${id}`, {
      params: {
        token: token,
        adminid: adminid,
      },
    });
  });
}
