import React from "react";

const Result = ({ alldata, cgpa }) => {
  //console.log(alldata);
  return (
    <div>
      <div className="max-w-4xl mx-auto  p-6 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Semester Result Summary
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-purple-100">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-purple-900">
                  Course Code
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-purple-900">
                  Course Title
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-purple-900">
                  Credit
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-purple-900">
                  Grade
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-purple-900">
                  Grade Point
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {alldata.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {course.customCourseId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {course.courseTitle}
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-800">
                    {course.totalCredit}
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-800 font-semibold">
                    {course.gradeLetter}
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-800">
                    {course.pointEquivalent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm font-medium text-purple-800">
          <div className="bg-purple-50 px-4 py-2 rounded-lg shadow-inner">
            Total
          </div>
          <div className="bg-purple-50 px-4 py-2 rounded-lg shadow-inner">
          
           
          </div>
          <div className="bg-purple-50 px-4 py-2 rounded-lg shadow-inner">
            SGPA: <span className="font-bold text-purple-900">{alldata[0].cgpa}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
