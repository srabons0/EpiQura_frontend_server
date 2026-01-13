import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaCalendarCheck,
  FaCreditCard,
  FaStar,
  FaBell,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

const UserDashboardNav = () => {
  return (
    <aside className="h-screen w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">

      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-xl font-semibold tracking-wide">
          Food<span className="text-orange-500">Hub</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          User Dashboard
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <NavItem to="/dashboard/user/home" icon={FaHome} label="Dashboard" />
        <NavItem to="/dashboard/user/orders" icon={FaClipboardList} label="My Orders" />
        {/* <NavItem to="/dashboard/user/bookings" icon={FaCalendarCheck} label="My Bookings" /> */}
        <NavItem to="/dashboard/user/payments" icon={FaCreditCard} label="Payments" />
        <NavItem to="/dashboard/user/reviews" icon={FaStar} label="My Reviews" />
        <NavItem to="/dashboard/user/notifications" icon={FaBell} label="Notifications" />
        <NavItem to="/dashboard/user/profile" icon={FaUserCog} label="Profile Settings" />
        <NavItem to="/" icon={FaHome} label="Home" />
      </nav>
      
    </aside>
  );
};

const NavItem = ({ to, icon: Icon, label, danger }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
        ${
          isActive
            ? "bg-orange-500 text-white shadow-lg"
            : danger
            ? "text-red-400 hover:bg-red-500/10 hover:text-red-500"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }
        `
      }
    >
      <Icon className="text-lg" />
      {label}
    </NavLink>
  );
};

export default UserDashboardNav;
