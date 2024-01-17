import axios from "axios";
import { BaseUrl } from "../../../apis/contant";

// Fetch Available Startups model Data for investor
export const fetchData = async () => {
  const fetchStartupsUrI = "available/startups";

  try {
    const response = await axios.get(
      `${BaseUrl.url}${fetchStartupsUrI}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Close Startups model Data for investor
export const fetchCloseData = async () => {
  const fetchCloseData = "close/startups";
  try {
    const response = await axios.get(
      `${BaseUrl.url}${fetchCloseData}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Startups model Data for admin

export const fetchAdminStartupData = async () => {
  const fetchStartupsUrI = "auth/admin-startup-data";
  try {
    const response = await axios.get(
      `${BaseUrl.url}${fetchStartupsUrI}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Startup_highlights Data

export const fetchHighlights = async () => {
  const fetchHighlightsUrI = "auth/fetch-startup-highlight";
  try {
    const response = await axios.get(
      `${BaseUrl.url}${fetchHighlightsUrI}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Verify Startups data by Superadmin

export const verifyStartups = async (id) => {
  const fetchHighlightsUrI = `auth/startup/${id}/verify`;
  try {
    const response = await axios.post(
      `${BaseUrl.url}${fetchHighlightsUrI}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Startup_documents Data 
export const fetchStartup_documents = async (Id) => {
  const fetchStatup_documents = `auth/startup/${Id}/documents`;
  try {
    const response = await axios.get(
      `${BaseUrl.url}${fetchStatup_documents}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};