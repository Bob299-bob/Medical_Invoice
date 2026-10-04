import React from "react";
import { Link } from "react-router-dom";

function Side() {
    return (
        <div className="w-56 min-h-screen bg-gray-800 text-white p-5">

            <h2 className="text-xl font-bold mb-8">
                Medical Store
            </h2>

            <div className="flex flex-col gap-4">

                <Link
                    to="/"
                    className="hover:bg-gray-700 p-2 rounded"
                >
                    Dashboard
                </Link>

                <Link
                    to="/"
                    className="hover:bg-gray-700 p-2 rounded"
                >
                    Create Invoice
                </Link>

            </div>

        </div>
    );
}

export default Side;