import CustomizedBtn from "../Components/CustomizedBtn";
import HomeCard from "../Components/Home-card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(null);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  } catch (err) {
    console.error("Invalid user data in localStorage:", err);
    localStorage.removeItem("user");
    setUser(null);
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="home-page-container max-w-[1200px] mx-auto py-4 px-4">
        {/* NAVBAR */}
        <div className="flex justify-between items-center px-4 py-4 bg-white shadow-md rounded-md relative">
          <h1 className="text-lg sm:text-xl md:text-2xl font-heading text-gray-800">
            Waste Food Redistribution
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-4 items-center">
            {user ? (
              <>
                <p className="font-heading text-sm text-gray-700">
                  Welcome, <span className="font-semibold">{user.name || user.email}</span>
                </p>
                <CustomizedBtn label="About" onClick={() => navigate("/about")} />
                <CustomizedBtn label="My Donations" onClick={() => navigate("/donor-dashboard")} />
                <CustomizedBtn label="Logout" onClick={handleLogout} />
              </>
            ) : (
              <>
                <CustomizedBtn label="About" onClick={() => navigate("/about")} />
                <CustomizedBtn
                  label="Login"
                  isLoading={loadingBtn === "login"}
                  onClick={() => {
                    setLoadingBtn("login");
                    setTimeout(() => {
                      navigate("/login");
                      setLoadingBtn(null);
                    }, 800);
                  }}
                />
                <CustomizedBtn
                  label="Register"
                  isLoading={loadingBtn === "register"}
                  onClick={() => {
                    setLoadingBtn("register");
                    setTimeout(() => {
                      navigate("/register");
                      setLoadingBtn(null);
                    }, 800);
                  }}
                />
              </>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="sm:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-50 flex flex-col gap-2">
              {user ? (
                <>
                  <p className="font-heading text-sm text-gray-700">
                    Welcome, <span className="font-semibold">{user.name || user.email}</span>
                  </p>
                  <CustomizedBtn label="About" onClick={() => { setIsMenuOpen(false); navigate("/about"); }} />
                  <CustomizedBtn label="My Donations" onClick={() => { setIsMenuOpen(false); navigate("/donor-dashboard"); }} />
                  <CustomizedBtn label="Logout" onClick={() => { setIsMenuOpen(false); handleLogout(); }} />
                </>
              ) : (
                <>
                  <CustomizedBtn label="About" onClick={() => { setIsMenuOpen(false); navigate("/about"); }} />
                  <CustomizedBtn
                    label="Login"
                    isLoading={loadingBtn === "login"}
                    onClick={() => {
                      setLoadingBtn("login");
                      setTimeout(() => {
                        navigate("/login");
                        setLoadingBtn(null);
                      }, 800);
                    }}
                  />
                  <CustomizedBtn
                    label="Register"
                    isLoading={loadingBtn === "register"}
                    onClick={() => {
                      setLoadingBtn("register");
                      setTimeout(() => {
                        navigate("/register");
                        setLoadingBtn(null);
                      }, 800);
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>

        {/* BODY CONTENT */}
        <div className="text-center mt-20">
          <h1 className="text-4xl md:text-6xl font-heading text-gray-700">
            Donate Surplus Food
          </h1>
          <p className="text-lg mt-6 text-gray-600">
            Be the Reason Someone Smiles Today — Donate Food
          </p>
          <p className="text-lg mt-2 text-gray-600">
            Your Extra Food Could Be Someone’s Only Meal
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <CustomizedBtn
              label="Donate"
              onClick={() => {
                if (!user) {
                  alert("Please login or register to donate food.");
                  navigate("/login");
                } else {
                  navigate("/donate");
                }
              }}
            />
            <CustomizedBtn
              label="Request Food"
              onClick={() => {
                if (!user) {
                  alert("Please login or register to request food.");
                  navigate("/login");
                } else {
                  navigate("/request");
                }
              }}
            />
          </div>

          <h2 className="text-base text-gray-600 mt-14 italic bg-gray-200 px-6 py-4 rounded-md max-w-[600px] mx-auto">
            "As per the Supreme Court affidavit quoting a 2017 national survey,
            an estimated 4,500 children under five die daily in India due to
            hunger and malnutrition—totaling over 300,000 child deaths annually."
          </h2>
        </div>

       {/* WHAT WE DO */}
<h1 className="text-center mt-20 text-2xl md:text-4xl font-semibold">
  What We Do
</h1>
<div className="flex flex-col md:flex-row md:justify-around items-center gap-8 mt-10">
  <HomeCard
    imgsrc="food.svg"
    imgalt="food"
    content="Collect Surplus Food from Donors and Events"
  />
  <HomeCard
    imgsrc="connect-donor.svg"
    imgalt="connect-donor"
    content="Connect Donors, Volunteers, and NGOs Seamlessly"
  />
  <HomeCard
    imgsrc="reduce-food-waste.svg"
    imgalt="reduce-food-waste"
    content="Reduce Food Waste and Feed the Needy Efficiently"
  />
</div>

{/* HOW IT WORKS */}
<h1 className="text-center mt-20 text-2xl md:text-4xl font-semibold">
  How It Works
</h1>
<div className="flex flex-col md:flex-row md:justify-around items-center gap-8 mt-10">
  <div className="flex flex-col items-center bg-gray-100 px-6 py-8 rounded-xl w-full sm:w-[280px] text-center">
    <img src="donor.svg" alt="donor" width={100} height={100} />
    <h2 className="mt-4 font-medium">Step 1: Donate</h2>
    <p>Individuals or Restaurants list excess food through our platform.</p>
  </div>
  <div className="flex flex-col items-center bg-gray-100 px-6 py-8 rounded-xl w-full sm:w-[280px] text-center">
    <img src="volunteer.svg" alt="volunteer" width={100} height={100} />
    <h2 className="mt-4 font-medium">Step 2: Pickup</h2>
    <p>Volunteers receive real-time notifications and collect the food.</p>
  </div>
  <div className="flex flex-col items-center bg-gray-100 px-6 py-8 rounded-xl w-full sm:w-[280px] text-center">
    <img src="charity.svg" alt="charity" width={100} height={100} />
    <h2 className="mt-4 font-medium">Step 3: Deliver</h2>
    <p>Food is delivered safely to shelters, orphanages, and those in need.</p>
  </div>
</div>


        {/* FOOTER */}
        <footer className="mt-24 bg-gray-50 text-gray-700 py-10 px-4 rounded-t-lg">
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-xl font-heading font-semibold">
                Waste Food Redistribution Platform
              </h2>
              <p className="text-sm mt-2 text-gray-500">
                Bridging Hunger with Hope. Together, let’s end food waste.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm hover:text-indigo-600 transition duration-150">About Us</Link>
              <Link to="/contact" className="text-sm hover:text-indigo-600 transition duration-150">Contact</Link>
              
            </div>
            <div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} dharanidharan.tech — All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
