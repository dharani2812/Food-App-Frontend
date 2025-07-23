import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const DonatePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [foodId, setFoodId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [File, setFile] = useState(null);
  const [FoodName, setFoodName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Expiry, setExpiry] = useState("");
  const [Description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isLocating, setIsLocating] = useState(false);
  const [address, setAddress] = useState({ street: "", city: "", pincode: "" });
  const [dialog, setDialog] = useState({ open: false, message: "" });

  const navigate = useNavigate();

  const showDialog = (message) => {
    setDialog({ open: true, message });
  };

  const closeDialog = () => {
    setDialog({ open: false, message: "" });
  };

  useEffect(() => {
    const editData = localStorage.getItem("editFood");
    if (editData) {
      const food = JSON.parse(editData);
      setFoodName(food.foodName || "");
      setQuantity(food.quantity || "");
      setExpiry(new Date(food.expiry).toISOString().slice(0, 16));
      setDescription(food.description || "");
      setLocation(food.location || { lat: "", lng: "" });
      setAddress(food.address || { street: "", city: "", pincode: "" });
      setFile(null);
      setIsEditMode(true);
      setFoodId(food._id);
      localStorage.removeItem("editFood");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!File && !isEditMode) {
      showDialog("Please upload a food image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (File) formData.append("image", File);
      formData.append("foodName", FoodName);
      formData.append("quantity", Quantity);
      formData.append("expiry", Expiry);
      formData.append("description", Description);
      formData.append("address", JSON.stringify(address));
      formData.append("location", JSON.stringify(location));

      const token = localStorage.getItem("token");
      if (!token) {
        showDialog("Please login to donate food.");
        setIsSubmitting(false);
        return;
      }

      if (isEditMode && foodId) {
        await api.put(`/food/${foodId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        showDialog("✏️ Food donation updated!");
        localStorage.removeItem("editFood");
      } else {
        await api.post("/food", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        showDialog("✅ Food donation submitted!");
      }

      setFile(null);
      setFoodName("");
      setQuantity("");
      setExpiry("");
      setDescription("");
      setLocation({ lat: null, lng: null });
      setAddress({ street: "", city: "", pincode: "" });
      setIsEditMode(false);
      setFoodId(null);
    } catch (err) {
      showDialog(err.response?.data?.msg || "❌ Failed to submit donation.");
    }
    setIsSubmitting(false);
  };

  const HandleChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLocation({ lat, lng });

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            const addr = data.address;

            setAddress({
              street: addr.road || addr.suburb || "",
              city: addr.city || addr.town || addr.village || "",
              pincode: addr.postcode || "",
            });

            showDialog("📍 Location & Address fetched successfully!");
          } catch (err) {
            showDialog("❌ Location found, but address fetch failed.");
          }

          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
          showDialog("❌ Unable to fetch location. Please enable location access.");
        }
      );
    } else {
      showDialog("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center  font-heading mb-4">
        Donate Surplus Food
      </h1>
      <p className="text-lg md:text-2xl font-medium text-gray-800 text-center mb-6">
        Fill in the details below to make your donation available to nearby volunteers.
      </p>

      {/* Home button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-100 hover:bg-gray-200 border border-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg shadow"
      >
        ⬅️ Back to Home
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
      >
        <div>
          <label className="block text-lg font-semibold mb-1">
            Food Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            onChange={HandleChange}
            className="w-full file:py-1 file:px-3 file:border file:rounded-md file:bg-blue-100 file:text-blue-900"
            required={!isEditMode}
          />
          <p className="text-sm text-gray-600 mt-1">
            {File ? File.name : "No file chosen"}
          </p>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Food Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={FoodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter the Food Name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">
            Serves (Number of People) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Number of People"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">
            When will the food expire? <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={Expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the food"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">
            Location Details <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Street / Area"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="w-full mb-2 border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full mb-2 border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleGetLocation}
          disabled={isLocating}
          className={`bg-blue-100 border border-blue-400 text-blue-900 font-semibold rounded-lg px-4 py-2 mt-2 w-full transition ${
            isLocating ? "opacity-50" : "hover:bg-blue-200"
          }`}
        >
          {isLocating ? "📍 Locating..." : "📍 Use My Current Location"}
        </button>

        {location.lat && location.lng && (
          <p className="text-center text-sm text-gray-600">
            📌 Location: {location.lat}, {location.lng}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 mt-4 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : isEditMode ? "Update Donation" : "Submit Donation"}
        </button>
      </form>

      {/* MODAL / DIALOG BOX */}
      {dialog.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-medium mb-4">{dialog.message}</p>
            <button
              onClick={closeDialog}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
