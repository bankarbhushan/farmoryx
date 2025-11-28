import axios from "axios";
import toast from "react-hot-toast";

 axios
 
 export const getFarmer = async (
    setFarmers
 ) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/farmer/feed");

      if (res.data.data) {
        setFarmers(res.data.data);
      } else {
        setFarmers([]);
      }

    } catch (error) {
      console.error("Error fetching farmers:", error.message);
      setFarmers([]);

    }
};

export const getMerchants = async (setMerchants) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/merchant/feed");

      if ((res.data.data)) {
        setMerchants(res.data.data);
      } else {
        setMerchants([]);
      }
    } catch (error) {
      console.error("Error fetching merchants:", error.message);
      setMerchants([]);
    }
};

export  const getVeg = async (setVegs) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/veg/feed");
      if(res.data.data){
      setVegs(res.data.data);
      }else {
      setVegs([]);
      }

    } catch (error) {
      console.error("Error fetching Veg:", error.message);
      setVegs([]);
    }
}; 

export  const getBills = async (setBills) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/bill/allbills`
      );

      if ((res.data.data)) {
        setBills(res.data.data);
      } else {
        setBills([]);
      }
    } catch (error) {
      console.error("Error fetching merchants:", error.message);
      setBills([]);
    }
};

export const getFarmerBills = async (setFarmersBills) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/bill/feed?type=farmer`
      );

      if ((res.data.data)) {
        setFarmersBills(res.data.data);
      } else {
        setFarmersBills([]);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg); 
      setFarmersBills([]);
    }
};

export  const getMerchantBills = async (setMerchantBills) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/bill/feed?type=merchant`
      );

      if ((res.data.data)) {
        setMerchantBills(res.data.data);
      } else {
        setMerchantBills([]);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg); 
      setMerchantBills([]);
    }
};