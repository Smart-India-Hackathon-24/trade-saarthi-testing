"use client";
import ResultCard from "@/components/Common/ResultCard";
import axios from "axios";
import React, { useState } from 'react'

type TestCaseResult = {
    id: number;
    name: string;
    status: "Loading" | "Passed" | "Failed";
  };
const TitleVerification = () => {
    const [title, setTitle] = useState("");
    const [results, setResults] = useState<{ testCase: string; result: string }[]>(
      []
    );
      
    const [testCases, setTestCases] = useState<TestCaseResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const apiEndpoints = [
      "https://api.example.com/testcase1",
      "https://api.example.com/testcase2",
      "https://api.example.com/testcase3",
      "https://api.example.com/testcase4",
    ];
    const fetchData = async (url:string,title: string) => {
      
        // const requests = apiEndpoints.map((endpoint) =>
        //   axios.post(endpoint, { title })
        // );
      
        try {
            const response = await axios.post(url, { title });
            return response.data;
          } catch (error) {
            return { status: "Failed" };
          }
        // try {
        //   const responses = await Promise.all(requests);
        //   return responses.map((res) => res.data);
        // } catch (error) {
        //   throw new Error("Error fetching data from APIs");
        // }
      };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      const initialTestCases:TestCaseResult[] = [
        { id: 0, name: "Test Case 1", status: "Loading" },
        { id: 1, name: "Test Case 2", status: "Loading" },
        { id: 2, name: "Test Case 3", status: "Loading" },
        { id: 3, name: "Test Case 4", status: "Loading" },
      ];
      setTestCases(initialTestCases);
      const updatedTestCases = [...initialTestCases];
      await Promise.all(
        apiEndpoints.map(async (endpoint, index) => {
            console.log(endpoint,index,updatedTestCases[index])
          const result = await fetchData(endpoint, title);
          const status = result.status === "Passed" ? "Passed" : "Failed";
          updatedTestCases[index].status = status;
          setTestCases([...updatedTestCases]); // Update the UI dynamically
        })
      );
    //   await Promise.all(
    //     initialTestCases.map(async (testCase) => {
    //       const result = await fetchData(title, testCase.id);
    //       const status = result.status === "Passed" ? "Passed" : "Failed";
    //       updatedTestCases[testCase.id].status = status;
    //       setTestCases([...updatedTestCases]); 
    //     })
    //   );
      setLoading(false);

    //   try {
    //     const apiResponses = await fetchData(title);
    //     const formattedResults = apiResponses.map((response, index) => ({
    //       testCase: `Test Case ${index + 1}`,
    //       result: response.status, // Assuming API returns a `status` field
    //     }));
    //     setResults(formattedResults);
    //   } catch (err) {
    //     setError("Failed to fetch results. Please try again.");
    //   } finally {
    //     setLoading(false);
    //   }
    };
  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg ">
    <h1 className="text-2xl font-bold mb-4">Title Verification</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        required
      />
      <button
        type="submit"
        className="w-full p-3 bg-blue-800 text-white rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify Title"}
      </button>
    </form>
    {error && <p className="text-red-600 mt-4">{error}</p>}
    <div className="mt-6 space-y-4">
      {results.map((result, index) => (
        <ResultCard
          key={index}
          testCase={result.testCase}
          result={result.result}
        />
      ))}

{/* <ResultCard testCase="dede" result="Passed" /> */}
<div className="mt-6 space-y-4">
        {testCases.map((testCase) => (
          <div
            key={testCase.id}
            className="flex justify-between items-center p-4 border rounded-md shadow-md"
          >
            <span className="font-semibold">{testCase.name}</span>
            {testCase.status === "Loading" ? (
            //   <Loader />
            <div>LOADING.....
                </div>
            ) : (
              <span
                className={`font-bold ${
                  testCase.status === "Passed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {testCase.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default TitleVerification
