import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://dev.recollect.in/api/v1";

export const providerLoginApi = async (payload) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/get-provider-token`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Provider login API error:", error?.response?.data || error);
    throw error;
  }
};



const TOKEN_KEY = "providerToken";
console.log("token",TOKEN_KEY)
export const getAssignableOrders = async (page = 0, size = 20) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
console.log("token",token);
  return axios.get(
    `https://dev.recollect.in/api/v1/order/list-assignable?size=${size}&page=${page}&sort=id`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const selfAssignOrder = async (orderId) => {
  const token = await AsyncStorage.getItem("providerToken");

  return axios.post(
    `https://dev.recollect.in/api/v1/order/self-assign/${orderId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getOrderHistory = async (page = 0, size = 20) => {
  try {
    const token = await AsyncStorage.getItem("providerToken");

    const res = await axios.get(
      `https://dev.recollect.in/api/v1/order/list-history?size=${size}&page=${page}&sort=id&direction=DESC`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
    return res.data?.data;

  } catch (error) {
    console.log("ORDER HISTORY ERROR:", error?.response?.data || error.message);
    throw error;
  }
};
