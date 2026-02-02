import { Outlet } from "react-router-dom";
import AdminSidebar from "../dashboard/Admin/AdminSidebar";


const AdminLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


    return (
       
             <div className="flex flex-col md:flex-row h-screen">
      <AdminSidebar handleLogout={handleLogout} />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-2 lg:p-6">
        <Outlet />
      </div>
    </div>   
        
    );
};

export default AdminLayout;

