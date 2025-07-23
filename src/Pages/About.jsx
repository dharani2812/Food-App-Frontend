import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-10">
      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800">
        About Me
      </h1>
      <p className="text-center text-gray-600 mt-4 px-4 md:px-20">
        I'm on a mission to reduce food waste and hunger by building a platform
        that connects food donors with those in need.
      </p>

      {/* Mission */}
      <h2 className="text-2xl font-semibold mt-12 text-gray-800">My Mission</h2>
      <p className="text-gray-600 mt-2">
        My goal is to create a hunger-free society by efficiently redistributing
        excess food to people who need it most. This project is a step toward
        reducing food waste, supporting the underprivileged, and promoting social
        responsibility through the power of technology.
      </p>

      {/* Why I Started */}
      <h2 className="text-2xl font-semibold mt-10 text-gray-800">Why I Started</h2>
      <p className="text-gray-600 mt-2">
        Every day, tons of edible food go to waste while millions of people
        struggle with hunger. This contradiction inspired me to build a system
        that empowers individuals, restaurants, and organizations to donate surplus
        food easily, responsibly, and impactfully.
      </p>

      {/* How It Works */}
      <h2 className="text-2xl font-semibold mt-10 text-gray-800">How It Works</h2>
      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
        <li>Donors can list surplus food on the platform.</li>
        <li>Verified volunteers or NGOs are notified to pick it up.</li>
        <li>The food is delivered to people in need quickly and safely.</li>
      </ul>

      {/* Meet the Creator */}
      <h2 className="text-2xl font-semibold mt-10 text-gray-800">Meet the Creator</h2>
      <p className="text-gray-600 mt-2">
        Hi, I'm Dharanidharan D — a passionate full-stack developer driven to solve
        real-world problems with code. I single-handedly designed and developed
        this platform to fight food waste and hunger using technology and community
        collaboration.
      </p>

      {/* Call to Action */}
      <div className="mt-10 bg-indigo-100 text-center py-6 px-4 rounded-lg">
        <h3 className="text-xl font-heading font-medium text-gray-800">
          Want to make a difference?
        </h3>
        <p className="text-gray-600 mt-2">
          Be a part of this mission — your extra food can become someone’s only meal.
        </p>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Link to="/register">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Join Now
            </button>
          </Link>
          <Link to="/donate">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Donate Food
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
