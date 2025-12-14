import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@docusaurus/Link";
import { Redirect, useHistory } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { CreateAccount, SignupFormData } from "@site/src/types/auth";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { signUpResponse } from "../api/Auth";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    education: yup.string().required("Education is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

function SignUp() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const { siteConfig } = useDocusaurusContext();
  const [loading, setLoading] = useState<boolean>(false);
  const API_URL = siteConfig.customFields.apiUrl;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  const password = watch("password", "");

  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setRequirements(checks);

    const score = Object.values(checks).filter(Boolean).length;
    setPasswordStrength((score / 5) * 100);
  }, [password]);

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      setLoading(true);
      const userData: CreateAccount = {
        username: data.username,
        email: data.email,
        education: data.education,
        password: data.password,
      };

      const response = await signUpResponse(userData, String(API_URL));
      if (response.status == "success") {
        localStorage.setItem("userData", JSON.stringify(response.data));

        history.push("/docs/intro");
      } else {
        console.error("Signup error:", response.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const history = useHistory();

  const getStrengthColor = () => {
    if (passwordStrength < 20) return "#ef4444";
    if (passwordStrength < 40) return "#f59e0b";
    if (passwordStrength < 60) return "#fbbf24";
    if (passwordStrength < 80) return "#10b981";
    return "#059669";
  };

  return (
    <Layout
      title="Sign Up"
      description="Create your account and start your learning journey"
      noFooter={false}
    >
      <main className="auth-page-wrapper">
        <div className="auth-card">
          {/* Left Hero Section */}
          <div className="auth-hero">
            <div className="hero-content">
              <h2>Join Thousands of Learners</h2>
              <p>
                Create your account to access premium content, track your
                progress, and join our community of passionate learners.
              </p>

              <ul className="features-list">
                <li>Access to all courses and tutorials</li>
                <li>Personalized learning path</li>
                <li>Track your progress</li>
                <li>Join community discussions</li>
                <li>Get certificates of completion</li>
              </ul>

              <img
                src={useBaseUrl("/img/auth-illustration.svg")}
                alt="Learning Illustration"
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
              <h3>Create Account</h3>
              <p className="header-subtitle">
                Start your learning journey today
              </p>
            </div>

            <div className="auth-card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={`form-control ${errors.username ? "error" : ""}`}
                    placeholder="Enter your username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <div className="error-message">
                      <span>⚠</span> {errors.username.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? "error" : ""}`}
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="error-message">
                      <span>⚠</span> {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="education" className="form-label">
                    Education Level
                  </label>
                  <select
                    id="education"
                    className={`form-control ${
                      errors.education ? "error" : ""
                    }`}
                    {...register("education")}
                  >
                    <option value="">Select your education level</option>
                    <option value="high-school">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="phd">PhD</option>
                    <option value="professional">Professional</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.education && (
                    <div className="error-message">
                      <span>⚠</span> {errors.education.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${errors.password ? "error" : ""}`}
                    placeholder="Create a strong password"
                    {...register("password")}
                  />

                  {/* Password Strength Indicator */}
                  {password && (
                    <>
                      <div className="password-strength">
                        <div className="strength-bar">
                          <div
                            className="strength-fill"
                            style={{
                              width: `${passwordStrength}%`,
                              backgroundColor: getStrengthColor(),
                            }}
                          />
                        </div>
                      </div>

                      <div className="password-requirements">
                        <ul>
                          <li className={requirements.length ? "valid" : ""}>
                            At least 8 characters
                          </li>
                          <li className={requirements.uppercase ? "valid" : ""}>
                            One uppercase letter
                          </li>
                          <li className={requirements.lowercase ? "valid" : ""}>
                            One lowercase letter
                          </li>
                          <li className={requirements.number ? "valid" : ""}>
                            One number
                          </li>
                          <li className={requirements.special ? "valid" : ""}>
                            One special character
                          </li>
                        </ul>
                      </div>
                    </>
                  )}

                  {errors.password && (
                    <div className="error-message">
                      <span>⚠</span> {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-control ${
                      errors.confirmPassword
                        ? "error"
                        : password
                        ? "success"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <div className="error-message">
                      <span>⚠</span> {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="auth-card-footer">
              Already have an account?{" "}
              <Link to="/signin" className="signin-link">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default SignUp;
