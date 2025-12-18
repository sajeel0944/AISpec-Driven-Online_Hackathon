import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const getValue = localStorage.getItem("theme");
    setTheme(getValue);
  }, []);

  const changeBg = () => {
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      window.location.reload();
    } else {
      localStorage.setItem("theme", "dark");
      window.location.reload();
    }
  };

  return (
    <button onClick={changeBg} className="theme-toggle-btn">
      <span>{theme === "light" ? "🌙" : "☀️"}</span>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;
