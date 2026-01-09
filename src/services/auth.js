// src/api/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api'; // your axios instance
import axios from 'axios';

const MOBILE_LIST_URL = 'https://dev.recollect.in/api/v1/mobile/list-pickup-services';
const BASE_FOR_ICONS = 'http://dev.recollect.in/api/v1';



const normalizePhone = (rawPhone) => {
  const digits = (rawPhone || '').replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (/^91\d{10}$/.test(digits)) return `+${digits}`;
  if (digits.startsWith('+')) return digits;
  return `+${digits}`; // fallback
};

export const sendCustomerOtp = async (phone) => {
  if (!phone) throw new Error('phone required');

  const phoneNumber = normalizePhone(phone); // +91XXXXXXXXXX

  try {
    const res = await api.post(
      '/get-customer-token',
      { phoneNumber }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(
      'SEND CUSTOMER OTP ERROR:',
      err?.response?.data ?? err.message ?? err
    );
    throw err;
  }
};




export const getPickupServices = async (token = null) => {
  try {
   
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;


    const res = await axios.get(MOBILE_LIST_URL, {
      headers,
      timeout: 10000,
    });

    const payload = res?.data ?? res;
    return payload?.data ?? payload ?? [];
  } catch (err) {
    const msg = err?.response?.data ?? err?.message ?? err;
    console.log('PICKUP SERVICES ERROR:', msg);
    throw err;
  }
};

export const buildServiceIconUrl = (iconPath) => {
  if (!iconPath) return null;
  return `${BASE_FOR_ICONS}/${iconPath.replace(/^\/+/, '')}`;
};


const CUSTOMER_ADDRESS_LIST_URL =
  'https://dev.recollect.in/api/v1/customer/address/list';


export const getCustomerAddresses = async (token = null) => {
  try {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.get(CUSTOMER_ADDRESS_LIST_URL, {
      headers,
      timeout: 10000,
    });
console.log("addresssres",res);
    const payload = res?.data ?? res;

    // API shape: { data: { content: [...] } }
    return payload?.data?.content ?? [];
  } catch (err) {
    console.log(
      'GET CUSTOMER ADDRESSES ERROR:',
      err?.response?.data ?? err?.message ?? err
    );
    throw err;
  }
};


const BIO_WASTE_CATEGORIES_URL =
  'https://dev.recollect.in/api/v1/mobile/list-bio-waste-categories';
const BASED_FOR_ICONS = 'https://dev.recollect.in/api/v1';


export const getBioWasteCategories = async (token = null) => {
  try {
      const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.get(BIO_WASTE_CATEGORIES_URL, {
      timeout: 10000,
      headers,
    });
console.log("categories",res);
    const payload = res?.data ?? res;
    return payload?.data ?? [];
  } catch (err) {
    console.log(
      'GET BIO WASTE CATEGORIES ERROR:',
      err?.response?.data ?? err?.message ?? err
    );
    throw err;
  }
};


export const buildBioWasteIcon = (path) => {
  if (!path) return null;
  return `${BASED_FOR_ICONS}/${path.replace(/^\/+/, '')}`;
};

const SCRAP_WASTE_CATEGORIES_URL =
  'https://dev.recollect.in/api/v1/mobile/list-scrap-categories';
const APP_FOR_ICONS = 'https://dev.recollect.in/api/v1';
export const getScrapCategories = async (token = null, districtId) => {
  try {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.get(
      `${SCRAP_WASTE_CATEGORIES_URL}?districtId=${districtId}`,
      {
        timeout: 10000,
        headers,
      }
    );

    console.log("scrapres", res);

    const payload = res?.data ?? res;
    return payload?.data ?? [];
  } catch (err) {
    console.log(
      "GET SCRAP WASTE CATEGORIES ERROR:",
      err?.response?.data ?? err?.message ?? err
    );
    throw err;
  }
};



export const buildScrapIcon = (path) => {
  if (!path) return null;
  return `https://dev.recollect.in/${path}`;
};


export const placeBioWasteOrder = async (payload) => {
  try {
    const token = await AsyncStorage.getItem('tempToken');

    if (!token) throw new Error('No auth token found');

    const res = await api.post(
      'https://dev.recollect.in/api/v1/order/place-bio-waste-order',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      'Place Bio Waste Order Error:',
      error?.response?.data || error.message
    );
    throw error;
  }
};



const TOKEN_KEY = 'tempToken';

export const getOrderHistory = async ({
  page = 0,
  size = 20,
  sort = 'id',
  direction = 'ASC',
} = {}) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    const res = await api.get(
      'https://dev.recollect.in/api/v1/order/list-history',
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        params: {
          page,
          size,
          sort,
          direction,
        },
      }
    );

    return res.data?.data?.content || [];
  } catch (error) {
    console.error(
      'Get Order History Error:',
      error?.response?.data || error.message
    );
    throw error;
  }
};


export const placeScrapOrder = async (payload) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) throw new Error("No auth token found");

    const res = await api.post(
      "https://dev.recollect.in/api/v1/order/place-scrap-order",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(
      "Place Scrap Order Error:",
      error?.response?.data || error.message
    );
    throw error;
  }
};


const BASE_URL = "https://dev.recollect.in/api/v1";

export const addCustomerAddress = async (payload) => {
  const token = await AsyncStorage.getItem("tempToken");

  const res = await fetch(
    `${BASE_URL}/customer/address/add`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  return { ok: res.ok, data };
};



const BASED_URL = "https://dev.recollect.in/api/v1";

export const updateCustomerAddress = async (payload) => {
  const token = await AsyncStorage.getItem("tempToken");

  const res = await fetch(
    `${BASED_URL}/customer/address/update`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  return { ok: res.ok, data };
};

export const getCancellationReasons = async () => {
  const token = await AsyncStorage.getItem("tempToken");

  const res = await fetch(
    `${BASED_URL}/order/list-cancellation-reasons`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
console.log("cancelreasons",data)
  return { ok: res.ok, data };
};



export const updateCustomerProfile = async (payload) => {
  const token = await AsyncStorage.getItem("tempToken");

  const res = await fetch(
    `${BASED_URL}/customer/update-profile`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(payload),
    }
  );

  let data = null;

  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  return { ok: res.ok, status: res.status, data };
};


const URL = "https://dev.recollect.in/api/v1";

export const deleteCustomerAddress = async (id) => {
  const token = await AsyncStorage.getItem("tempToken");

  const res = await fetch(
    `${URL}/customer/address/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    }
  );

  const data = await res.json();

  return { ok: res.ok, data };
};

const BASE = "https://dev.recollect.in/api/v1";

export const getAvailablePickupDates = async (regionId, fromDate, toDate) => {
  const token = await AsyncStorage.getItem("tempToken");

  const url = `${BASE}/scrap-region/list/available-dates/${regionId}?fromDate=${fromDate}&toDate=${toDate}`;

  console.log("REQUEST:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  let data = null;

  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  console.log("STATUS:", res.status);

  return { ok: res.ok, status: res.status, data };
};


export const getOrderDetails = async (orderId) => {
  try {
    const token = await AsyncStorage.getItem("tempToken");

    const res = await api.get(
      `https://dev.recollect.in/api/v1/order/details/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data?.data || null;
  } catch (err) {
    console.log("Order Details Error:", err?.response?.data || err);
    throw err;
  }
};

export const getWardList = async (size = 20) => {
  try {
    const token = await AsyncStorage.getItem("tempToken");

    let page = 0;
    let all = [];
    let hasMore = true;

    while (hasMore) {
      const res = await api.get(
        `https://dev.recollect.in/api/v1/ward/list?size=${size}&page=${page}&sort=id&direction=ASC`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res?.data?.data;

      const content = data?.content || [];
      all = [...all, ...content];

      const totalPages = data?.totalPages ?? 0;

      page++;

      hasMore = page < totalPages;
    }

    return all;
  } catch (err) {
    console.log("Ward List Error:", err?.response?.data || err);
    throw err;
  }
};


export const getScrapRegionList = async (size = 20) => {
  try {
    const token = await AsyncStorage.getItem("tempToken");

    let page = 0;
    let all = [];
    let hasMore = true;

    while (hasMore) {
      const res = await api.get(
        `https://dev.recollect.in/api/v1/scrap-region/list?size=${size}&page=${page}&sort=id&direction=ASC`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res?.data?.data;

      const content = data?.content || [];
      all = [...all, ...content];

      const totalPages = data?.totalPages ?? 0;

      page++;

      hasMore = page < totalPages;
    }

    return all;
  } catch (err) {
    console.log("Scrap Region List Error:", err?.response?.data || err);
    throw err;
  }
};
export const getCustomerAddressDetails = async (id) => {
  try {
    const token = await AsyncStorage.getItem("tempToken");

    const res = await api.get(
      `https://dev.recollect.in/api/v1/customer/address/details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data?.data || null;
  } catch (e) {
    console.log("ADDRESS DETAILS ERROR", e?.response?.data || e);
    throw e;
  }
};
