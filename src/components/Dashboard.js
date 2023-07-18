import React from "react";
import jsonData from "./data.json";

function Dashboard() {
  const products = jsonData.products;

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-white animate-bounce">
          Dashboard
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full  border ">
            <thead>
              <tr className="bg-gray-500 text-white   ">
                <th className="py-3 px-4 ">Product Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-black text-white hover:bg-gray-600 transition-colors"
                >
                  <td className="py-4 px-4">{product.name}</td>
                  <td className="py-4 px-4 ">{product.description}</td>
                  <td className="py-4 px-4">{product.price}</td>
                  <td className="py-4 px-4">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
