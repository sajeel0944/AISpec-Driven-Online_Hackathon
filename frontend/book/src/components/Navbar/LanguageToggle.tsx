import { useEffect, useState } from "react";

const LanguageToggle = () => {
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bookLang");
      if (stored) setLang(stored);
    }
  }, []);

  const changeLanguage = (newLang: "en" | "ur") => {
    if (typeof window === "undefined") return;
    localStorage.setItem("bookLang", newLang);

    let attempts = 0;
    const interval = setInterval(() => {
      const select = document.querySelector(
        "select.goog-te-combo"
      ) as HTMLSelectElement | null;

      if (select) {
        select.value = newLang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }

      attempts++;
      if (attempts > 10) clearInterval(interval);
    }, 300);
  };

  return (
    <div className="navbar__language-toggle">
      <button
        className={`language-button ${
          lang === "en" ? "language-button--active" : ""
        }`}
        onClick={() => changeLanguage("en")}
      >
        English
      </button>

      <button
        className={`language-button ${
          lang === "ur" ? "language-button--active" : ""
        }`}
        onClick={() => changeLanguage("ur")}
      >
        اردو
      </button>
    </div>
  );
};

export default LanguageToggle;
