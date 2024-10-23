import axiosInstance from "../utils/axiosInstance";

export const signUp = async (data) => {
  try {
    const resp = await axiosInstance.post("/create-user", data);
    return resp.data;
  } catch (error) {
    throw error.resp.data;
  }
};

export const signIn = async (data) => {
  try {
    const resp = await axiosInstance.post("/login-user", data);
    return resp.data;
  } catch (error) {
    throw error.resp.data;
  }
};

export const createBooking = async (data) => {
  try {
    const resp = await axiosInstance.post("/createbooking", data);
    return resp.data;
  } catch (error) {
    throw error.resp.data;
  }
};

export const getAllBokkings = async (pageNumber, limit) => {
  try {
    const resp = await axiosInstance.get("/getallbooking", {
      params: {
        page: pageNumber,
        limit: limit,
      },
    });
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllBokkingsCalendar = async () => {
  try {
    const resp = await axiosInstance.get("/getallcustomer");
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteBooking = async (id) => {
  try {
    const resp = await axiosInstance.delete(`/deletebooking/${id}`);
  } catch (error) {
    throw error.resp;
  }
};
