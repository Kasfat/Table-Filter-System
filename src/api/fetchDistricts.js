import axios from "axios";

const fetchDistricts = async (division) => {
  try{
    const res = await axios.get(`https://bdapi.editboxpro.com/api/districts?division=${division}`);
    return res.data;
  }catch(err){
    console.error("fetch error:",err);
    throw err;
  }
};

export default fetchDistricts;