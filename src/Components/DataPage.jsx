import React from 'react'
import { useEffect, useState } from 'react'
import jsPDF from 'jspdf'

const DataPage = () => {
    const [allData, setallData] = useState([]);

    const generatePdf = (item) => {
        const doc = new jsPDF();
        doc.text(`Name: ${item.name}`, 10, 10);
        doc.text(`Email: ${item.email}`, 10, 20);
        doc.text(`Roll No. : ${item.RollNo}`, 10, 30);
        doc.text(`Mobile No. : ${item.MobileNo}`, 10, 40);
        doc.text(`Address : ${item.Address}`, 10, 50);
        const pdfBlob = doc.output('blob');
        const blobURL = URL.createObjectURL(pdfBlob);
        window.open(blobURL);
    }

    const generateAllpdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('All Forms Data', 70, 10);

        doc.setFontSize(15)
        let y = doc.getLineHeight() * 2;
        for (let i = 0; i < allData.length; i++) {
            doc.text(`Name: ${allData[i].name}`, 10, y - 10);
            y = y + 20.7;
            doc.text(`Email: ${allData[i].email}`, 10, y - 15);
            y = y + 20.7;
            doc.text(`Roll No.: ${allData[i].RollNo}`, 10, y - 20);
            y = y + 20.7;
            doc.text(`Mobile No. : ${allData[i].MobileNo}`, 10, y - 25);
            y = y + 20.7;
            doc.text(`Address : ${allData[i].Address}`, 10, y - 30);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1);
            doc.line(10, y - 15, 200, y - 15);
            y = y + doc.getLineHeight();
        }

        const pdfBlob = doc.output('blob');
        const allpdfUrl = URL.createObjectURL(pdfBlob);
        window.open(allpdfUrl)
    }

    const fetchData = () => {
        const response = fetch('http://localhost:5000/forms').then(response => response.json()).then(data => setallData(data))
    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/forms/${id}`, { method: 'DELETE' });
        if (response.ok) {
            setallData((prev) => prev.filter((data) => (data.id != id)));
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <table className="border-2 w-full">
                <thead className="underline text-center">
                    <tr>
                        <td className="px-3">Name</td>
                        <td className="px-3">Email</td>
                        <td className="px-3">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {allData.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => { generatePdf(item) }} className="border mx-2 rounded-xl px-2 font-sm bg-blue-200 hover:bg-blue-400">View PDF</button>
                                <button onClick={() => { handleDelete(item.id) }} className="border rounded-xl px-3 font-sm bg-blue-200 hover:bg-blue-400">Delete Form</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button onClick={() => { generateAllpdf() }} className="rounded-xl bg-red-400 text-white hover:bg-red-500 px-4 py-2">
                    Generate all PDF
                </button>
            </div>
        </div>
    )
}

export default DataPage
