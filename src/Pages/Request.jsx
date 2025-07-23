import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "../Components/RequestCard";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import AOS from "aos";
import api from "../api"; // ✅ Make sure the path is correct
import "aos/dist/aos.css";

const Request = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestingId, setRequestingId] = useState(null);
  const [pickingUpId, setPickingUpId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [tempName, setTempName] = useState("");
  const [tempPhone, setTempPhone] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser._id);
    }
  }, []);

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/food", {
        headers: { Authorization: token },
      });
      setFoods(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch foods:", err);
      setError("Something went wrong while fetching foods.");
    }
  };

  useEffect(() => {
    fetchFoods().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredFoods(foods);
  }, [foods]);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const handleRequest = async (foodId, requesterName, requesterPhone) => {
    if (!requesterName || !requesterPhone) {
      toast.error("Name and phone number are required.");
      return;
    }
    try {
      setRequestingId(foodId);
      await api.put(
        `https://food-app-backend-16ip.onrender.com/api/food/request/${foodId}`,
        {
          requesterId: user._id,
          requesterName,
          requesterPhone,
        }
      );
      toast.success("✅ Request sent!");
      await fetchFoods();
    } catch (err) {
      console.error("❌ Request error:", err);
      toast.error("❌ Something went wrong while requesting");
    } finally {
      setRequestingId(null);
    }
  };

const handlePickup = async (foodId) => {
  try {
    setPickingUpId(foodId);
    const res = await api.put(`/food/pickup/${foodId}`);
    const updatedFood = res.data.food;
    setFoods((prev) =>
      prev.map((item) => (item._id === foodId ? updatedFood : item))
    );
    toast.success("✅ Marked as picked up");
  } catch (err) {
    console.error("❌ Pickup failed", err);
    toast.error("❌ Something went wrong");
  } finally {
    setPickingUpId(null);
  }
};


  const handleCancelRequest = async (foodId) => {
    try {
      setCancellingId(foodId);
      const res = await axios.put(`/food/cancel/${foodId}`);
      const updatedFood = res.data.food;
      setFoods((prev) =>
        prev.map((item) => (item._id === foodId ? updatedFood : item))
      );
      toast.success("❌ Request Cancelled");
    } catch (err) {
      console.error("Cancel request error:", err);
      toast.error("Something went wrong.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilterStatus(selected);

    if (selected === "all") {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(
        foods.filter((food) => food.status?.toLowerCase() === selected)
      );
    }
    setVisibleCount(6);
  };

  const fetchMoreData = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Available Food Donations
      </h1>

      <div className="text-center mb-4">
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="available">Only Available</option>
          <option value="requested">Only Requested</option>
          <option value="pickedup">Only Picked Up</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading food data...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : filteredFoods.length === 0 ? (
        <p className="text-center text-gray-500">
          No food items available right now.
        </p>
      ) : (
        <InfiniteScroll
          dataLength={visibleCount}
          next={fetchMoreData}
          hasMore={visibleCount < filteredFoods.length}
          loader={<p className="text-center mt-4">Loading more...</p>}
        >
          <div className="flex flex-wrap justify-center gap-5">
            {filteredFoods.slice(0, visibleCount).map((food, index) => (
              <RequestCard
                key={food._id}
                food={food}
                userId={user?._id}
                handleRequest={() => {
                  setSelectedFoodId(food._id);
                  setShowModal(true);
                }}
                handlePickup={handlePickup}
                handleCancelRequest={handleCancelRequest}
                requestingId={requestingId}
                pickingUpId={pickingUpId}
                cancellingId={cancellingId}
                aosDelay={index * 100}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Request Pickup</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="border w-full px-4 py-2 mb-3 rounded"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
              className="border w-full px-4 py-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowModal(false);
                  setTempName("");
                  setTempPhone("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => {
                  handleRequest(selectedFoodId, tempName, tempPhone);
                  setShowModal(false);
                  setTempName("");
                  setTempPhone("");
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
