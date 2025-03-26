import { useEffect } from "react";
import "./App.css";
import fetchDivisions from "./api/fetchDivisions";
import { useState } from "react";
import fetchDistricts from "./api/fetchDistricts";
import { useNavigate } from "react-router-dom";
function App() {
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [status, setStatus] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [loadig, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const urlQueryParams = (division, district, status, keyword) => {
    const params = new URLSearchParams();

    if (division) {
      params.append("division", division);
    }
    if (district) {
      params.append("district", district);
    }
    if (status) {
      params.append("status", status);
    }
    if (keyword) {
      params.append("keyword", keyword);
    }
    navigate(`?${params.toString()}`);
  };

  // division fetch
  useEffect(() => {
    const getDivisions = async () => {
      setLoading(true);
      try {
        const data = await fetchDivisions();
        setDivision(data);
      } catch (err) {
        setError(err);
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
      }
    };
    getdistricts();
  }, [selectedDivision]);

  const handleDisivionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setSelectedDistrict("");
    fetchDistricts(division);

    urlQueryParams(division, "", status, keyword);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    urlQueryParams(selectedDivision, district, status, keyword);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatus(status);
    urlQueryParams(selectedDivision, selectedDistrict, status, keyword);
  };

  const handleKeywordChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    urlQueryParams(selectedDivision, selectedDistrict, status, keyword);
  };

  // const applyTableFilter = async()=>{
  //   setLoading(true);

  // }

  const resetFilter = () => {
    setSelectedDivision("");
    setSelectedDistrict("");
    setStatus("");
    setKeyword("");
    navigate("/");
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

            <div>
              <label className=" block mb-2 font-medium">Status</label>
              <select
                className=" w-full border rounded p-2"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className=" block mb-2 font-medium">Keyword</label>
              <input
                type="text"
                className=" border rounded p-2"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className=" mt-4 flex justify-center space-x-3">
            <button
              className=" bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={resetFilter}
            >
              Reset
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={applyTableFilter}
            >
              Apply Table Filter
            </button>
          </div>
        </div>

        {/* //Table data */}
        <div>
          <h2 className=" text-xl font-bold mb-2">Table Data</h2>
          <div className=" overflow-x-auto">
            <table className=" min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-200">
                  <th className=" border p-2">ID</th>
                  <th className=" border p-2">Title</th>
                  <th className=" border p-2">Completed</th>
                </tr>
              </thead>
              <tbody>
                <tr className=" text-center">
                  <td className=" border p-2">1</td>
                  <td className=" border p-2">Abiha</td>
                  <td className=" border p-2">False</td>
                </tr>
                <tr className=" text-center">
                  <td className=" border p-2">2</td>
                  <td className=" border p-2">Abiha</td>
                  <td className=" border p-2">False</td>
                </tr>
                <tr className=" text-center">
                  <td className=" border p-2">3</td>
                  <td className=" border p-2">Abiha</td>
                  <td className=" border p-2">False</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
