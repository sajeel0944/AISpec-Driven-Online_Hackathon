import React, { useState, useEffect, useRef } from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { splitNavbarItems } from "@docusaurus/theme-common/internal";
import { useHistory } from "@docusaurus/router";
import { UserData } from "@site/src/types/globle";
import "/src/css/navbar.css";
import UserDropdown from "@site/src/components/Navbar/UserDropdown";
import NavbarBrand from "@site/src/components/Navbar/NavbarBrand";
import AuthButtons from "@site/src/components/Navbar/AuthButtons";
import NavbarItems from "@site/src/components/Navbar/NavbarItems";
import MobileMenu from "@site/src/components/Navbar/MobileMenu";

function NavbarContentLayout({ left, right, onToggleMenu, isMobileMenuOpen }) {
  return (
    <>
      <div className="navbar__inner">
        <div className="navbar__items">{left}</div>

        {/* Desktop Menu - Right Side */}
        <div className="navbar__items navbar__items--right">{right}</div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar__toggle"
          onClick={onToggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="menu-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </>
  );
}

export default function NavbarContent() {
  const {
    navbar: { items },
  } = useThemeConfig();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      try {
        const data = JSON.parse(userDataStr);
        setIsAuthenticated(true);
        setUserData(data);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowUserDropdown(false);
    localStorage.removeItem("userData");
    history.push("/");
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const leftContent = (
    <>
      <NavbarBrand />
      <NavbarItems items={leftItems} />
    </>
  );

  const rightContent = (
    <>
      <NavbarItems items={rightItems} />
      {isAuthenticated ? (
        <UserDropdown
          handleLogout={handleLogout}
          showUserDropdown={showUserDropdown}
          toggleUserDropdown={toggleUserDropdown}
          userData={userData}
          userDropdownRef={userDropdownRef}
        />
      ) : (
        <AuthButtons/>
      )}
    </>
  );

  return (
    <>
      <NavbarContentLayout
        left={leftContent}
        right={rightContent}
        onToggleMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <MobileMenu
        handleLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        isMobileMenuOpen={isMobileMenuOpen}
        leftItems={leftItems}
        mobileMenuRef={mobileMenuRef}
        rightItems={rightItems}
        userData={userData}
      />
    </>
  );
}
