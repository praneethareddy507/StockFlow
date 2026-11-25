import { useLocation } from "react-router-dom";
import {
  ChevronRight,
  CalendarDays,
  UserRound,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const pageName =
    location.pathname.startsWith("/products")
      ? "Inventory"
      : "Overview";

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="navbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={15} />
        <strong>{pageName}</strong>
      </div>

      <div className="navbar-actions">
        <div className="navbar-date">
          <CalendarDays size={17} />
          <span>{today}</span>
        </div>

        <div className="navbar-divider"></div>

        <div className="profile-section">
          <div className="profile-avatar">
            <UserRound size={20} />
          </div>

          <div className="profile-info">
            <strong>My workspace</strong>
            <span>Inventory account</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;