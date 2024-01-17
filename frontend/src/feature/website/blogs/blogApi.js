import axios from "axios";

// selected Get Blogs APIs
export function fetchBlogDetails(token) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3002/blog?token=${token}`);
    const data = await response.json();
    resolve({ data });
  });
};

// selected Create Blog APIs
export function fetchCreateBlog(blogData, token) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3002/blog?token=${token}`, {
      method:"POST",
      body:JSON.stringify(blogData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
};

// selected Edit Blogs APIs
export function fetchEditBlogs(blogData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3002/blog/"+blogData.id, {
      method:"POST",
      body:JSON.stringify(blogData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
};

// selected Delete Blog APIs
// export function fetchDeleteBlog(blogID,token) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`http://localhost:3002/blog/${blogID}?token=${token}`,{
//       method:"DELETE"
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

export function fetchDeleteBlog(blogID, token) {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.delete(`http://localhost:3002/blog/${blogID.id}`, {
        params: {
          token:blogID.token,
          adminid:blogID.adminid
        },
      });

      const data = response.data;
      resolve({ data });
    } catch (error) {
      console.error(error);
      resolve({ error });
    }
  });
}
