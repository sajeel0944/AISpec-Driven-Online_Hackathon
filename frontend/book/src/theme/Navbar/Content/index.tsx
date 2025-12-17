import React, { useState, useEffect, useRef } from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { splitNavbarItems } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import { useHistory } from "@docusaurus/router";
import { UserData } from "@site/src/types/globle";
import "/src/css/navbar.css";

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}

function NavbarContentLayout({ left, right, onToggleMenu, isMobileMenuOpen }) {
  return (
    <>
      <div className="navbar__inner">
        <div className="navbar__items">{left}</div>
        
        {/* Desktop Menu - Right Side */}
        <div className="navbar__items navbar__items--right">{right}</div>
        
        {/* Mobile Menu Toggle */}
        <button className="navbar__toggle" onClick={onToggleMenu} aria-label="Toggle menu">
          <svg 
            className="menu-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
  const [lang, setLang] = useState<string>("en");
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
    
    const savedLang = localStorage.getItem("bookLang") || "en";
    setLang(savedLang);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (newLang: string) => {
    localStorage.setItem("bookLang", newLang);
    setLang(newLang);
    
    const event = new CustomEvent("bookLanguageChanged", {
      detail: { lang: newLang },
    });
    window.dispatchEvent(event);
  };

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

  // Custom Brand Component
  const NavbarBrand = () => (
    <a className="navbar__brand" href="/">
      <div className="navbar__logo">AI</div>
      <div className="brand-text">
        <span className="brand-name">RoboLearn</span>
        <span className="brand-tagline">Physical AI Mastery</span>
      </div>
    </a>
  );

  // Language Toggle Component
  const LanguageToggle = () => (
    <div className="navbar__language-toggle">
      <button
        className={`language-button ${lang === "en" ? "language-button--active" : ""}`}
        onClick={() => changeLanguage("en")}
        aria-label="Switch to English"
      >
        English
      </button>
      <button
        className={`language-button ${lang === "ur" ? "language-button--active" : ""}`}
        onClick={() => changeLanguage("ur")}
        aria-label="اردو میں تبدیل کریں"
      >
        اردو
      </button>
    </div>
  );

  // User Dropdown Component
  const UserDropdown = () => (
    <div className="user-menu" ref={userDropdownRef}>
      <button className="user-dropdown-toggle" onClick={toggleUserDropdown}>
        <div className="user-avatar">
          {userData?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="user-info">
          <span className="username">{userData?.username || "User"}</span>
          <span className="user-role">Student</span>
        </div>
        <svg 
          className="dropdown-arrow" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className={`user-dropdown-menu ${showUserDropdown ? "show" : ""}`}>
        <a href="/dashboard" className="dropdown-item">
          <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </a>
        <a href="/docs/intro" className="dropdown-item">
          <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          My Courses
        </a>
        <a href="/progress" className="dropdown-item">
          <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Progress
        </a>
        <div className="dropdown-item">
          <LanguageToggle />
        </div>
        <hr style={{ margin: "8px 0", borderColor: "rgba(255,255,255,0.1)" }} />
        <button onClick={handleLogout} className="dropdown-item" style={{ color: "#ef4444" }}>
          <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  // Auth Buttons Component
  const AuthButtons = () => (
    <div className="auth-buttons">
      <LanguageToggle />
      <a 
        href="/signin" 
        className="navbar__button navbar__button--secondary"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Sign In
      </a>
      <a 
        href="/signup" 
        className="navbar__button navbar__button--primary"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Sign Up
      </a>
    </div>
  );

  // Mobile Menu Component
  const MobileMenu = () => (
    <div 
      className={`navbar__mobile-menu ${isMobileMenuOpen ? "show" : ""}`}
      ref={mobileMenuRef}
    >
      <div className="mobile-menu-items">
        <NavbarItems items={[...leftItems, ...rightItems]} />
        
        <div className="mobile-auth-buttons">
          {isAuthenticated ? (
            <>
              <div className="user-info" style={{ padding: "12px", background: "rgba(10, 10, 15, 0.95)", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div className="user-avatar" style={{ width: "32px", height: "32px" }}>
                    {userData?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="username">{userData?.username || "User"}</div>
                    <div className="user-role">Student</div>
                  </div>
                </div>
              </div>
              
              <a href="/dashboard" className="dropdown-item">
                <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </a>
              
              <div style={{ padding: "12px 0" }}>
                <LanguageToggle />
              </div>
              
              <button onClick={handleLogout} className="dropdown-item" style={{ color: "#ef4444" }}>
                <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
        <UserDropdown />
      ) : (
        <AuthButtons />
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
      <MobileMenu />
    </>
  );
}