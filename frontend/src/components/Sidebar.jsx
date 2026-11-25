import { NavLink, useNavigate } from "react-router-dom";
import {
  Package,
  LayoutDashboard,
  Boxes,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Inventory",
      path: "/products",
      icon: Boxes,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Package size={25} />
        </div>
        <div>
          <h2>stockflow.</h2>
          <span>Inventory workspace</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-label">WORKSPACE</p>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
              <ChevronRight
                size={16}
                className="nav-arrow"
              />
            </NavLink>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <div className="workspace-card">
          <div className="workspace-icon">
            <Boxes size={22} />
          </div>
          <h4>Stay in control.</h4>
          <p>Better inventory. Smarter business.</p>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Sign out</span>
        </button>

        <p className="sidebar-footer">
          StockFlow · Version 1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;