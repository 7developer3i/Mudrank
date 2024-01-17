// selected Get Happy Customer APIs
export function fetchHappyCustomers() {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3002/customer");
      const data = await response.json();
      resolve({ data });
    });
  };
  
  // selected Create Happy Customer APIs
  export function fetchCreateHCustomer(hcustomerData) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3002/customer", {
        method:"POST",
        body:JSON.stringify(hcustomerData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    });
  };
  
  // selected Edit Happy Customer  APIs
  export function fetchEditHCustomer(hcustomerData) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3002/customer/"+hcustomerData.id, {
        method:"POST",
        body:JSON.stringify(hcustomerData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    });
  };
  
  // selected Delete Happy Customer  APIs
  export function fetchDeleteHCustomer(hcustomerID) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3002/customer/"+hcustomerID,{
        method:"DELETE"
      });
      const data = await response.json();
      resolve({ data });
    });
  }