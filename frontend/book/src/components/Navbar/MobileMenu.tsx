import { UserData } from "@site/src/types/globle";
import { RefObject } from "react";
import NavbarItems from "./NavbarItems";
import LanguageToggle from "./LanguageToggle";
import type { NavbarItem } from "@docusaurus/theme-common";

const MobileMenu = ({
  userData,
  handleLogout,
  isMobileMenuOpen,
  mobileMenuRef,
  isAuthenticated,
  rightItems,
  leftItems,
}: {
  userData: UserData;
  handleLogout: () => void;
  isMobileMenuOpen: boolean;
  mobileMenuRef: RefObject<HTMLDivElement>;
  leftItems: NavbarItem[];
  rightItems: NavbarItem[];
  isAuthenticated: boolean;
}) => {
  return (
    <div
      className={`navbar__mobile-menu ${isMobileMenuOpen ? "show" : ""}`}
      ref={mobileMenuRef}
    >
      <div className="mobile-menu-items">
        <NavbarItems items={[...leftItems, ...rightItems]} />

        <div className="mobile-auth-buttons">
          {isAuthenticated ? (
            <>
              <div
                className="user-info"
                style={{
                  padding: "12px",
                  background: "rgba(10, 10, 15, 0.95)",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    className="user-avatar"
                    style={{ width: "32px", height: "32px" }}
                  >
                    {userData?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="username">
                      {userData?.username || "User"}
                    </div>
                    <div className="user-role">Student</div>
                  </div>
                </div>
              </div>

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

              <div style={{ padding: "12px 0" }}>
                <LanguageToggle />
              </div>

              <button
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
              </button>
            </>
          ) : (
            <>
              <LanguageToggle />
              <a
                href="/signin"
                className="navbar__button navbar__button--secondary"
                style={{ width: "100%" }}
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="navbar__button navbar__button--primary"
                style={{ width: "100%" }}
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
