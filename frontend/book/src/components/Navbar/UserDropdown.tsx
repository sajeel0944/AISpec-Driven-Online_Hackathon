import { UserData } from "@site/src/types/globle";
import { RefObject } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const UserDropdown = ({
  userDropdownRef,
  toggleUserDropdown,
  userData,
  showUserDropdown,
  handleLogout,
}: {
  userDropdownRef: RefObject<HTMLDivElement>;
  toggleUserDropdown: () => void;
  userData: UserData;
  showUserDropdown: boolean;
  handleLogout: () => void;
}) => {
  return (
    <div className="user-menu" ref={userDropdownRef}>
      <button className="user-dropdown-toggle" onClick={toggleUserDropdown}>
        <div className="user-avatar">
          {userData?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="user-info">
          <span className="username">{userData?.username || "User"}</span>
          <span className="user-role">{userData.education || ""}</span>
        </div>
        <svg
          className="dropdown-arrow"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div className={`user-dropdown-menu ${showUserDropdown ? "show" : ""}`}>
        <a href="/dashboard" className="dropdown-item">
          <svg
            className="dropdown-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </a>
        <a href="/docs/intro" className="dropdown-item">
          <svg
            className="dropdown-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          My Courses
        </a>
        <a href="/progress" className="dropdown-item">
          <svg
            className="dropdown-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Progress
        </a>
        <ThemeToggle />
        <div className="dropdown-item">
          <LanguageToggle/>
        </div>
        <hr style={{ margin: "8px 0", borderColor: "rgba(255,255,255,0.1)" }} />
        <div
          onClick={handleLogout}
          className="dropdown-item"
          style={{ cursor: "pointer" }}
        >
          <svg
            className="dropdown-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
