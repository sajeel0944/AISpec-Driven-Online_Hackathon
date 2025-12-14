import React, { useState } from "react";
import Layout from "@theme/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "@site/src/css/custom-auth.css";
import { SignInFormData } from "../types/auth";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { signInResponse } from "../api/Auth";

const schema = yup
  .object({
    usernameOrEmail: yup.string().required("Username or Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  const API_URL = siteConfig.customFields.apiUrl;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const response = await signInResponse(data, String(API_URL));
      if (response.status === "success") {
        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(response.data));
        // Redirect to dashboard or home page
        window.location.href = "/docs/intro";
      } else {
        console.error("Signup error:", response.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Sign In"
      description="Sign in to your account to continue your learning journey"
      noFooter={false}
    >
      <main className="auth-page-wrapper">
        <div className="auth-card">
          {/* Left Hero Section */}
          <div className="auth-hero">
            <div className="hero-content">
              <h2>Welcome Back!</h2>
              <p>
                Sign in to continue your learning journey, access your courses,
                and track your progress.
              </p>

              <ul className="features-list">
                <li>Access your personalized dashboard</li>
                <li>Continue where you left off</li>
                <li>Track your learning progress</li>
                <li>Join community discussions</li>
                <li>Download your certificates</li>
              </ul>

              <div className="testimonial">
                <div className="testimonial-content">
                  "This platform transformed my learning experience. The
                  community and resources are incredible!"
                </div>
                <div className="testimonial-author">
                  <span className="author-name">Sarah Johnson</span>
                  <span className="author-role">Computer Science Student</span>
                </div>
              </div>

              <img
                src={useBaseUrl("/img/auth-signin-illustration.svg")}
                alt="Sign In Illustration"
                className="auth-illustration"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Right Form Section */}
          <div className="auth-form-card">
            <div className="brand-header">
              <div className="brand-logo">L</div>
              <h1>LearnHub</h1>
            </div>

            <div className="auth-card-header">
              <h3>Sign In to Your Account</h3>
              <p className="header-subtitle">
                Enter your credentials to continue
              </p>
            </div>

            <div className="auth-card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="form-group">
                  <label htmlFor="usernameOrEmail" className="form-label">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    id="usernameOrEmail"
                    className={`form-control ${
                      errors.usernameOrEmail ? "error" : ""
                    }`}
                    placeholder="Enter username or email"
                    {...register("usernameOrEmail")}
                  />
                  {errors.usernameOrEmail && (
                    <div className="error-message">
                      <span className="error-icon">⚠</span>
                      {errors.usernameOrEmail.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="forgot-password-link"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="password-input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={`form-control ${
                        errors.password ? "error" : ""
                      }`}
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4396 8.99731 11.147 8.99731 11.9193C8.99731 13.4885 10.2656 14.761 11.8348 14.761C12.5996 14.761 13.304 14.4383 13.8294 13.917M6.49902 6.64715C4.59971 7.90024 3.15305 9.783 2.45703 11.9193C3.28428 14.1413 5.08202 16 7.49902 16C9.25902 16 10.72 14.936 11.8348 14.761M12.999 12.1194C14.769 11.7157 15.999 10.0332 15.999 7.91928C15.999 5.70094 14.207 4 11.999 4C11.2715 4 10.5886 4.19981 9.99902 4.55413"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <div className="error-message">
                      <span className="error-icon">⚠</span>
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">Remember me</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="auth-card-footer">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default SignIn;
