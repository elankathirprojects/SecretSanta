import React, { useState } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const SecretSanta = () => {
  const [employees, setEmployees] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setEmployees(result.data.filter((row) => row.Employee_EmailID));
      },
      error: (error) => console.error("CSV Error:", error),
    });
  };

  const assignSecretSanta = () => {
    let shuffled = [...employees].sort(() => Math.random() - 0.5);
    let recipients = [...shuffled];
    let pairs = [];

    for (let giver of shuffled) {
      let available = recipients.filter((r) => r.Employee_EmailID !== giver.Employee_EmailID);
      if (available.length === 0) return alert("Error: Retry assignment.");
      let recipient = available[Math.floor(Math.random() * available.length)];

      pairs.push({
        giver: giver.Employee_Name,
        giverEmail: giver.Employee_EmailID,
        recipient: recipient.Employee_Name,
        recipientEmail: recipient.Employee_EmailID,
      });

      recipients = recipients.filter((r) => r !== recipient);
    }

    setAssignments(pairs);
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(assignments);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "secret_santa_assignments.csv");
  };

  const downloadSampleCSV = () => {
    const sampleFilePath = "/assets/sample_employees.csv"; // Ensure the file is in the 'public/assets' folder
    const link = document.createElement("a");
    link.href = sampleFilePath;
    link.download = "sample.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-lg mx-auto container">
      <h2 className="text-2xl font-bold mb-4">Secret Santa Game - Upload CSV File</h2>

      {/* <button onClick={downloadSampleCSV} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded btn">
        Download Sample CSV
      </button> */}
      <span className="samplecsv" onClick={downloadSampleCSV} style={{color:'green' , textDecoration:'underline'}}>Download Sample CSV</span>
      &nbsp; 
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" /> 

      {employees.length > 0 && (
        <button onClick={assignSecretSanta} className="px-4 py-2 bg-blue-500 text-white rounded btn">
          Generate Assignments
        </button>
      )}

      {assignments.length > 0 && (
        <>
          <h3 className="text-xl mt-4">Assignments:</h3>
          <center>
            <table className="table">
              <tbody>
                {assignments.map((pair, index) => (
                  <tr key={index}>
                    🎁 {pair.giver} → {pair.recipient}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadCSV} className="mt-4 px-4 py-2 bg-green-500 text-white rounded btn">
              Download Assignments CSV
            </button>
          </center>
        </>
      )}
    </div>
  );
};

export default SecretSanta;
