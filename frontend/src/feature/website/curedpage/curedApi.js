import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// get api
export function fetchCuratedDetails({ token, adminid }) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${BaseUrl.url}curated?token=${token}&adminid=${adminid}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

// post api
export function fetchCreateCuratedBlog(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${BaseUrl.url}curated`, formData);
  });
}

// edit api
export function fetchCuratedEdit(formData) {
  return new Promise(async (resolve) => {
    const response = await axios.put(
      `${BaseUrl.url}curated/${formData.id}`,
      formData,
      {
        params: {
          token: formData.token,
          adminid: formData.adminid,
        },
      }
    );
  });
}

// delete api
export function fetchCuratedDelete({ id, token, adminid }) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BaseUrl.url}curated/${id}`, {
      params: {
        token: token,
        adminid: adminid,
      },
    });
    const data = response.data.message
    resolve({ data })
  });
}

// export function fetchTest() {
//   try {
//     const response = axios.post("", new URLSearchParams()); // data post 3 types -- new URLSearchParams(formData), json.strigify(formData), Formdata
//   } catch (error) {
//     throw error;
//   }
// }
