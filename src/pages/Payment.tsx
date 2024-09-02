import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { PAYMENT } from "../graphql/mutations/mutations";

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    currency: "BDT",
    postCode: "",
    address: "",
    phone: "",
    productId: "",
    amount: "",
  });

  // Initialize the mutation
  const [placeOrder, { loading, error, data }] = useMutation(PAYMENT);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { name, currency, postCode, address, phone, productId, amount } =
        formData;

      // Call the mutation with the input data
      const response = await placeOrder({
        variables: {
          input: {
            name,
            currency,
            postCode,
            address,
            phone,
            productId,
            amount,
          },
        },
      });

      // Handle the response (e.g., show a success message, redirect, etc.)
      console.log("Order placed successfully:", response?.data?.placeOrder);
      const gatePageUrl = response?.data?.placeOrder?.GatewayPageURL;

      if (gatePageUrl) {
        window.location.replace(gatePageUrl);
      } else {
        console.error("Gateway page URL not found.");
      }
    } catch (err) {
      // Handle errors (e.g., show an error message)
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Place an order
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Currency:
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="BDT">BDT</option>
              <option value="Dollar">Dollar</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Post Code:
            </label>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Product ID:
            </label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Amount :
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Pay Now"}
          </button>
          {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}
          {data && (
            <p className="mt-4 text-green-500">Order placed successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Payment;
