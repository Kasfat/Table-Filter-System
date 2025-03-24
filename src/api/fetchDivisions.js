import axios from "axios";

const fetchDivisions = async () => {
  try{
    const res = await axios.get("https://bdapi.editboxpro.com/api/divisions");
    return res.data;
  }catch(err){
    console.error("fetch error:",err);
    throw err;
  }
};

export default fetchDivisions;