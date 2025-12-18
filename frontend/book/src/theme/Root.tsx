import React, { useState, useEffect, JSX, PropsWithChildren } from "react";
import { useLocation } from "@docusaurus/router"; // Import useLocation
import Chatbot from "@site/src/components/Chat/Chatbot"; // Import the Chatbot component
import { AuthProvider } from "@site/src/contexts/AuthContext"; // Import AuthProvider
import CustomFooter from "../components/CustomFooter";

export default function Root({ children }: PropsWithChildren): JSX.Element {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    setTransitionStage("fadeOut");
  }, [location.pathname]);

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage("fadeIn");
      }, 300); // Duration of fade-out animation
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, children]);

  useEffect(() => {
    if (window.google?.translate) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ur",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const showChatbot = location.pathname.startsWith("/docs");

  return (
    <AuthProvider>
      <>
        {/* REQUIRED for Google Translate */}
        <div id="google_translate_element" style={{ display: "none" }} />

        <div className="layout-root">
          <div
            className={`layout-transition-container ${
              transitionStage === "fadeIn" ? "fade-in" : "fade-out"
            }`}
          >
            {displayChildren}
          </div>

          {showChatbot && <Chatbot />}
          <CustomFooter />
        </div>
      </>
    </AuthProvider>
  );
}
