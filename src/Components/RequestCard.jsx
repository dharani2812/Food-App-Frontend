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

  const imageUrl = food.image?.startsWith("http")
    ? food.image
    : `https://food-app-backend-16ip.onrender.com/uploads/${food.image}`;

  const status = food.status?.toLowerCase();

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col justify-between max-w-[380px] w-full mx-auto"
      data-aos="zoom-in"
      data-aos-delay={aosDelay}
    >
      <img
        src={imageUrl}
        alt={food.FoodName}
        className="w-full h-44 object-cover rounded-lg mb-3"
      />

      <h2 className="text-lg font-semibold mb-1">{food.foodName}</h2>
      <p>🍽️ Quantity: {food.quantity}</p>
      <p>📅 Expiry: {new Date(food.expiry).toLocaleDateString()}</p>
      <p>📍 Address: {food.address.street}, {food.address.city} - {food.address.pincode}</p>
      <p className="text-gray-600 mt-2">{food.description}</p>

      <p className="mt-2">
        <span className="font-medium">Status:</span>{" "}
        {status === "pickedup"
          ? "✅ Picked Up"
          : status === "requested"
          ? "⏳ Requested"
          : "🟢 Available"}
      </p>

      {food.createdAt && (
        <p className="text-sm text-gray-500 mt-1">
          🕒 Donated on: {new Date(food.createdAt).toLocaleString()}
        </p>
      )}

      {food.requestedAt && (
        <p className="text-yellow-600 text-sm mt-1">
          📤 Requested At: {new Date(food.requestedAt).toLocaleString()}
        </p>
      )}

      {food.pickedUpAt && (
        <p className="text-green-600 text-sm mt-1">
          ✅ Picked Up At: {new Date(food.pickedUpAt).toLocaleString()}
        </p>
      )}

      {status === "available" && (
        <button
          onClick={() => handleRequest(food._id)}
          disabled={requestingId === food._id}
          className={`mt-3 ${
            requestingId === food._id
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded`}
        >
          {requestingId === food._id ? "Requesting..." : "Request Pickup"}
        </button>
      )}

      {status === "requested" && food.pickedUpAt == null && (
        <>
          <button
            onClick={() => handlePickup(food._id)}
            disabled={pickingUpId === food._id}
            className={`mt-3 ${
              pickingUpId === food._id
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded`}
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
              className={`mt-2 ${
                cancelId === food._id
                  ? "bg-gray-400"
                  : "bg-red-600 hover:bg-red-700"
              } text-white px-4 py-2 rounded`}
            >
              {cancelId === food._id ? "Cancelling..." : "❌ Not Want"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RequestCard;
