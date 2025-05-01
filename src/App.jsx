import { useState } from "react";
import "./App.css";
import Result from "./Result";

function App() {
  const [formData, setFormData] = useState({
    studentId: "",
    semester: "",
  });

  const [alldata, setalldata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { studentId, semester } = formData;

      if (!studentId || !semester) {
        setError("Please enter both Student ID and select a semester");
        return;
      }

      // Create the direct URL to the DIU result systemnpm run dev
      const resultUrl = `http://peoplepulse.diu.edu.bd:8189/result?grecaptcha=&semesterId=${semester}&studentId=${studentId}`;

      // For deployed environments, show instructions
      if (window.location.protocol === "https:") {
        setError(
          "Due to security restrictions, we cannot fetch results directly. " +
            "Click the button below to open the DIU result page in a new tab."
        );

        // Create a button that will open the direct link in a new tab
        const openButton = document.createElement("button");
        openButton.textContent = "View Results";
        openButton.className =
          "mt-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none transition-colors";
        openButton.onclick = () => window.open(resultUrl, "_blank");

        // Find the error message div and append the button after it
        const errorDiv = document.querySelector("[data-error-message]");
        if (errorDiv) {
          errorDiv.appendChild(openButton);
        }

        return;
      }

      // The code below will only run in local development (HTTP) environment
      setLoading(true);
      setError("");

      // Direct API call for local development
      const response = await fetch(resultUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        setalldata(data);
      } else {
        setError(
          "No results found. Please check your Student ID and Semester."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-3 backdrop-blur-3xl z-10 flex items-center justify-center">
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
              defaultValue=""
            >
              <option value="" disabled>
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
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>

          {error && (
            <div
              data-error-message
              className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md text-center"
            >
              {error}
            </div>
          )}
        </form>
      </div>
      {alldata.length > 0 && <Result cgpa={0} alldata={alldata} />}
    </div>
  );
}

export default App;
