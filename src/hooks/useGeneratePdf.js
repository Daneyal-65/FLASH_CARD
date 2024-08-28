import { useCallback } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const useGeneratePdf = () => {
  const generatePdf = useCallback((data) => {
    const doc = new jsPDF();
    console.log(data);
    data.forEach((item, index) => {
      // Add a title for each group
      doc.text(`Group ${index + 1}: ${item.groupname}`, 14, 20 + index * 60);

      // Add group description
      doc.text(`Description: ${item.description}`, 14, 30 + index * 60);

      // Prepare table data for terms
      const tableData = item.terms.map((term, i) => [
        i + 1,
        term.term_name,
        term.description,
      ]);

      // AutoTable for terms
      doc.autoTable({
        head: [["#", "Term Name", "Description"]],
        body: tableData,
        startY: 35 + index * 60, // Adjust start position based on the index
        theme: "grid",
        margin: { top: 10, left: 14, right: 14, bottom: 10 },
      });
    });

    doc.save("flashcards.pdf");
  }, []);

  return generatePdf;
};

export default useGeneratePdf;
