import Navbar from '../Nav/Navbar';
import { Outlet } from "react-router-dom";
import Sidebar from '../Layout/Sidebar';
import Addjob from '../joblist/AddJob'

function Welcome() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Welcome;