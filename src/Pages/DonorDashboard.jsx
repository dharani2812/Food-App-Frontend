import React, { useEffect, useState } from "react";
import api from "../api"; // ✅ Uses configured axios instance
import { toast } from "react-toastify";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [foodId, setFoodId] = useState(null);

  useEffect(() => {
    const editData = localStorage.getItem("editFood");
    if (editData) {
      console.log("Edit mode triggered, data stored in localStorage.");
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchDonations = async () => {
      try {
        const donorId = user._id || user.id;

        const res = await api.get(`/food/donations?donorId=${donorId}`); // ✅ Updated
        setDonations(res.data);
      } catch (err) {
        toast.error("❌ Failed to load donations.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/food/${id}`); // ✅ Updated
      toast.success("🗑️ Deleted successfully");
      setDonations(donations.filter((d) => d._id !== id));
    } catch (err) {
      toast.error("❌ Failed to delete donation");
    }
  };

  const handleEdit = (foodItem) => {
    localStorage.setItem("editFood", JSON.stringify(foodItem));
    toast.info("Redirecting to edit...");
    window.location.href = "/donate";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Donations
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations found.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {donations.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow-xl rounded-2xl w-[300px] overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              <img
                src={`https://food-app-backend-16ip.onrender.com/uploads/${food.image}`}
                alt={food.foodName}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {food.foodName}
                </h2>
                <p className="text-sm text-gray-600">
                  🍽 Quantity: {food.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  📍 Location:{" "}
                  {typeof food.location === "object"
                    ? `${food.location.lat}, ${food.location.lng}`
                    : food.location || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  ⏰ Expiry: {new Date(food.expiry).toLocaleDateString()}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(food)}
                    className="bg-blue-400 text-black px-4 py-1 rounded hover:bg-blue-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
