import Papa from "papaparse";
import { saveAs } from "file-saver";

// Parse CSV file
export const parseCSV = (file, callback) => {
  Papa.parse(file, {
    header: true,
    complete: callback,
    error: (error) => console.error("Error parsing CSV:", error),
  });
};

// Convert JSON to CSV and download
export const downloadCSV = (data, filename = "output.csv") => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};
