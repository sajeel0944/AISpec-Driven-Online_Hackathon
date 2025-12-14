import React, { useState, useEffect } from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
  splitNavbarItems, // This import might be unused depending on Docusaurus internal structure.
} from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import { useHistory } from "@docusaurus/router";
import { UserData } from "@site/src/types/globle";

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}

function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
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

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const changeLanguage = (newLang: string) => {
    console.debug("[Navbar] changeLanguage", newLang);
    try {
      localStorage.setItem("bookLang", newLang);
    } catch (e) {
      // ignore
    }
    setLang(newLang);
    const ev = new CustomEvent("bookLanguageChanged", {
      detail: { lang: newLang },
    });
    console.debug("[Navbar] dispatching", ev);
    window.dispatchEvent(ev);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
    history.push("/"); // Redirect to home page after logout
  };

  const authItems = isAuthenticated
    ? [
        <NavbarItem
          key="welcome"
          label={`${userData.username}`}
          position="right"
          is="button"
        />,
        <div
          className="navbar__language-toggle"
          style={{
            display: "inline-flex",
            gap: 8,
            alignItems: "center",
            marginLeft: 8,
          }}
        >
          <NavbarItem
            key="lang-en"
            label={"English"}
            position="right"
            is="button"
            className={
              "button button--sm " +
              (lang === "en" ? "button--primary" : "button--outline")
            }
            onClick={() => changeLanguage("en")}
          />
          <NavbarItem
            key="lang-ur"
            label={"اردو"}
            position="right"
            is="button"
            className={
              "button button--sm " +
              (lang === "ur" ? "button--primary" : "button--outline")
            }
            onClick={() => changeLanguage("ur")}
          />
        </div>,
        <NavbarItem
          key="logout"
          label="Logout"
          position="right"
          onClick={handleLogout}
          className="button button--secondary button--sm"
          is="button"
        />,
      ]
    : [
        <NavbarItem
          key="signup"
          label="Sign Up"
          to="/signup"
          position="right"
          className="button button--primary button--sm"
          is="button"
        />,
        <NavbarItem
          key="signin"
          label="Sign In"
          to="/signin"
          position="right"
          className="button button--secondary button--sm margin-left--sm"
          is="button"
        />,
      ];

  return (
    <NavbarContentLayout
      left={<NavbarItems items={leftItems} />}
      right={
        <>
          <NavbarItems items={rightItems} />
          {authItems.map((item, i) =>
            React.cloneElement(item, { key: `auth-item-${i}` })
          )}
        </>
      }
    />
  );
}
