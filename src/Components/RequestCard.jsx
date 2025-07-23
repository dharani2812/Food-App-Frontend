import { useState } from "react";

const RequestCard = ({
  food,
  handleRequest,
  handlePickup,
  handleCancelRequest,
  requestingId,
  pickingUpId,
  cancellingId,
  userId,
  aosDelay = 0,
}) => {
  const [cancelId, setCancelId] = useState(null);

  const imageUrl = food.image?.includes("localhost")
  ? food.image.replace("http://localhost:5000", "https://food-app-backend-16ip.onrender.com")
  : food.image?.startsWith("http")
  ? food.image
  : `https://food-app-backend-16ip.onrender.com/uploads/${food.image}`;


  const status = food.status?.toLowerCase();

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between w-full max-w-sm mx-auto border border-gray-100"
      data-aos="zoom-in"
      data-aos-delay={aosDelay}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={food.foodName}
          className="w-full h-44 object-cover rounded-xl mb-3"
        />
        {status === "available" && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Available
          </span>
        )}
        {status === "requested" && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Requested
          </span>
        )}
        {status === "pickedup" && (
          <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
            Picked Up
          </span>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{food.foodName}</h2>
        <p className="text-sm">🍽️ <span className="font-medium">Quantity:</span> {food.quantity}</p>
        <p className="text-sm">📅 <span className="font-medium">Expiry:</span> {new Date(food.expiry).toLocaleDateString()}</p>
        <p className="text-sm">
          📍 <span className="font-medium">Address:</span>{" "}
          {food.address.street}, {food.address.city} - {food.address.pincode}
        </p>
        <p className="text-sm text-gray-600">{food.description}</p>

        {food.createdAt && (
          <p className="text-xs text-gray-400">
            🕒 Donated on: {new Date(food.createdAt).toLocaleString()}
          </p>
        )}
        {food.requestedAt && (
          <p className="text-xs text-yellow-600">
            📤 Requested At: {new Date(food.requestedAt).toLocaleString()}
          </p>
        )}
        {food.pickedUpAt && (
          <p className="text-xs text-green-600">
            ✅ Picked Up At: {new Date(food.pickedUpAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 space-y-2">
        {status === "available" && (
          <button
            onClick={() => handleRequest(food._id)}
            disabled={requestingId === food._id}
            className={`w-full py-2 rounded-md font-medium text-white transition ${
              requestingId === food._id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {requestingId === food._id ? "Requesting..." : "Request Pickup"}
          </button>
        )}

        {status === "requested" && food.pickedUpAt == null && (
          <>
            <button
              onClick={() => handlePickup(food._id)}
              disabled={pickingUpId === food._id}
              className={`w-full py-2 rounded-md font-medium text-white transition ${
                pickingUpId === food._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {pickingUpId === food._id ? "Marking..." : "Mark as Picked Up"}
            </button>

            {food.requesterId === userId && pickingUpId !== food._id && (
              <button
                onClick={() => {
                  setCancelId(food._id);
                  handleCancelRequest(food._id).finally(() => setCancelId(null));
                }}
                disabled={cancelId === food._id}
                className={`w-full py-2 rounded-md font-medium text-white transition ${
                  cancelId === food._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {cancelId === food._id ? "Cancelling..." : "❌ Not Want"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
