
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Approutes from "./Routes/Approutes";

function App() {


  return (
    <div className="bg-#faf9f5 h-screen mx-10">
      <Approutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
