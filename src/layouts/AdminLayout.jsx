import { Outlet } from "react-router-dom";
import AdminSidebar from "../dashboard/Admin/AdminSidebar";


const AdminLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth
    window.location.href = "/"; // redirect to home
  };


    return (
       
             <div className="flex flex-col md:flex-row h-screen">
      <AdminSidebar handleLogout={handleLogout} />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>   
        
    );
};

export default AdminLayout;


// Orders Management – Track all customer orders, status updates, and history.

// Payments – View payment history, pending payments, and revenue reports.

// Products / Food Items – Add, edit, or remove dishes, specials, and categories.

// Reports & Analytics – Charts and stats for orders, revenue, and top-selling items.

// Notifications – Admin alerts for new orders, issues, or important updates.

// Reviews / Feedback – View customer reviews and ratings.

// Settings – Manage admin account, dashboard preferences, and system settings.

// Logout / Sign Out – Securely log out of the admin panel.