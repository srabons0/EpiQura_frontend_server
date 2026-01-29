import { Link, NavLink, Outlet } from "react-router-dom";
import img1 from "../../assets/logo/logo.png"
import { BiDish, BiSolidFoodMenu } from "react-icons/bi";
import { motion } from "framer-motion"
import { IoHome } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { FaBook, FaUsers } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import useScrollToTop from "../components/ui/useScrollToTop";
import UserDashboardNav from "../dashboard/User/UserDashboardNav";



const UserLayout = () => {
    useScrollToTop();
    const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
    return (
      <div>
        <div className="flex flex-col md:flex-row h-screen">
      <UserDashboardNav handleLogout={handleLogout} />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>   
      </div>
    );
};

export default UserLayout;

