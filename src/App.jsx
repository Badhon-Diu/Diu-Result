import axios from "axios";
import { useState } from "react";
import "./App.css";
import Result from "./Result";
function App() {
  const [formData, setFormData] = useState({
    studentId: "",
    semester: "",
  });

  const [alldata, setalldata] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [cgpa, setCgpa] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { studentId, semester } = formData;
      const url = `http://software.diu.edu.bd:8006/result?grecaptcha=&semesterId=${semester}&studentId=${studentId}`;

      const response = await axios.get(url);

      //console.log("API Response:", response.data);
      setalldata(response.data);
      //let cgpaValue = response.data.cgpa;
     
      //setCgpa(cgpaValue)
      //console.log(cgpaValue)
      //console.log("here si your data", cgpaValue);
      // You can show response to user here if you want
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  console.log(alldata)

  return (
    <div>
      <div className="mb-3 backdrop-blur-3xl  z-10  flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full mx-auto p-6 bg-gray-900/20 rounded-xl shadow-xl glass-container"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img className="w-20" src="./gpa.png" alt="School Logo" />
          </div>

          {/* Student ID Input */}
          <div className="mb-6">
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-gray-400 text-gray-200"
              placeholder="Enter Student ID"
              onChange={handleChange}
              required
            />
          </div>

          {/* Semester Select */}
          <div className="mb-6">
            <label
              htmlFor="semester"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-200"
              onChange={handleChange}
              required
            >
              <option value="" disabled selected className="bg-gray-800">
                Select a semester
              </option>
              <option value="231" className="bg-gray-800">
                Spring 2023
              </option>
              <option value="232" className="bg-gray-800">
                Summer 2023
              </option>
              <option value="233" className="bg-gray-800">
                Fall 2023
              </option>
              <option value="241" className="bg-gray-800">
                Spring 2024
              </option>
              <option value="242" className="bg-gray-800">
                Summer 2024
              </option>
              <option value="243" className="bg-gray-800">
                Fall 2024
              </option>
              <option value="251" className="bg-gray-800">
                Spring 2025
              </option>
              <option value="252" className="bg-gray-800">
                Summer 2025
              </option>
              <option value="253" className="bg-gray-800">
                Fall 2025
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {alldata.length >0 && <Result cgpa={cgpa} alldata={alldata}></Result>}
    </div>
  );
}

export default App;
