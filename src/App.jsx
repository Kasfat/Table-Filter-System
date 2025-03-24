import { useEffect } from "react";
import "./App.css";
import fetchDivisions from "./api/fetchDivisions";
import { useState } from "react";
import fetchDistricts from "./api/fetchDistricts";
function App() {
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setselectedDistrict] = useState("");
  const [loadig, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // division fetch
  useEffect(() => {
    const getDivisions = async () => {
      setLoading(true);
      try {
        const data = await fetchDivisions();
        setDivision(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getDivisions();
  }, []);

  // district fetch

  useEffect(() => {
    if (!selectedDivision) {
      setDistrict([]);
      return;
    }

    const getdistricts = async () => {
      setLoading(true);
      try {
        const data = await fetchDistricts(selectedDivision);
        setDistrict(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getdistricts();
  }, [selectedDivision]);

  const handleDisivionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setselectedDistrict("");
    fetchDistricts(division);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setselectedDistrict(district);
  };

  return (
    <>
      <div className=" container mx-auto p-4">
        <h1 className=" text-2xl font-bold text-center mb-4">
          Table Filter System
        </h1>
        <div className=" bg-gray-200 p-4 rounded mb-4">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className=" block mb-2 font-medium">
                Division <span className="text-red-600">*</span>
              </label>
              <select
                className=" w-full border rounded p-2"
                value={selectedDivision}
                onChange={handleDisivionChange}
              >
                <option value="">Select Division</option>
                {division.map((division) => (
                  <option key={division.id} value={division.name}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className=" block mb-2 font-medium">
                District <span className="text-red-600">*</span>
              </label>
              <select
                className=" w-full border rounded p-2"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">Select District</option>
                {district.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
