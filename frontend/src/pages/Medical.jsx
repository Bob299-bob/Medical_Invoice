import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

function Medical() {

    const [name, setName] = useState("");
    const [medicine, setMedicine] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [invoice, setInvoice] = useState(null);

    // Backend se medicines laana
    const { data, loading, error } = useFetch(
        "http://localhost:5000/api/medicines"
    );

    const generateInvoice = () => {

        if (name === "" || medicine === "") {
            alert("Please enter customer name and select medicine");
            return;
        }

        const selectedMedicine = data.find(
            (item) => item.name === medicine
        );

        const total = selectedMedicine.price * quantity;

        const invoiceData = {
            name: name,
            medicine: medicine,
            quantity: quantity,
            price: selectedMedicine.price,
            total: total
        };

        setInvoice(invoiceData);

        // Backend mein invoice save karna
        fetch("http://localhost:5000/api/invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(invoiceData)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">

                <h2 className="text-2xl font-bold mb-6">
                    Create Medical Invoice
                </h2>

                {/* Customer Name */}

                <label className="block mb-2 font-medium">
                    Customer Name
                </label>

                <input
                    type="text"
                    placeholder="Enter customer name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />

                {/* Medicine */}

                <label className="block mb-2 font-medium">
                    Select Medicine
                </label>

                {loading && <p>Loading medicines...</p>}

                {error && <p>Something went wrong</p>}

                <select
                    value={medicine}
                    onChange={(e) => setMedicine(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                >

                    <option value="">
                        Select Medicine
                    </option>

                    {data &&
                        data.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name} - ₹{item.price}
                            </option>
                        ))}

                </select>

                {/* Quantity */}

                <label className="block mb-2 font-medium">
                    Quantity
                </label>

                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full border p-2 rounded mb-5"
                />

                {/* Button */}

                <button
                    onClick={generateInvoice}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                    Generate Invoice
                </button>

                {/* Invoice */}

                {invoice && (

                    <div className="mt-8 border p-5 rounded">

                        <h2 className="text-xl font-bold text-center mb-5">
                            Medical Invoice
                        </h2>

                        <p>
                            <strong>Customer:</strong> {invoice.name}
                        </p>

                        <p>
                            <strong>Medicine:</strong> {invoice.medicine}
                        </p>

                        <p>
                            <strong>Quantity:</strong> {invoice.quantity}
                        </p>

                        <p>
                            <strong>Price:</strong> ₹{invoice.price}
                        </p>

                        <hr className="my-3" />

                        <p className="text-lg font-bold">
                            Total: ₹{invoice.total}
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Medical;