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
  'http://34.93.137.177/api/v1/customer/address/list';


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
  'http://34.93.137.177/api/v1/mobile/list-bio-waste-categories';
const BASED_FOR_ICONS = 'http://34.93.137.177/api/v1';


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
  'http://34.93.137.177/api/v1/mobile/list-scrap-categories';
const APP_FOR_ICONS = 'http://34.93.137.177/api/v1';
export const getScrapCategories = async (token = null) => {
  try {

     const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

 
    const res = await axios.get(SCRAP_WASTE_CATEGORIES_URL, {
      timeout: 10000,
      headers,
    });
 console.log("scrapres",res)
       const payload = res?.data ?? res;
    return payload?.data ?? [];
  } catch (err) {
    console.log(
      'GET SCRAP WASTE CATEGORIES ERROR:',
      err?.response?.data ?? err?.message ?? err
    );
    throw err;
  }
};


export const buildScrapIcon = (path) => {
  if (!path) return null;
  return `http://34.93.137.177/${path}`;
};



export const placeBioWasteOrder = async ({
  scheduleDate,
  altNumber,
  addressId,
  platform = 'android',
}) => {
  try {
    const token = await AsyncStorage.getItem('tempToken');
console.log("token",token)
    if (!token) {
      throw new Error('No auth token found');
    }

   const res = await api.post(
  'http://34.93.137.177/api/v1/order/place-bio-waste-order',
  {
    scheduleDate,
    altNumber,
    platform,
    addressId,
  },
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

export const getOrderHistory = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

 const res = await api.get(
  'http://34.93.137.177/api/v1/order/list-history',
  {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
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
