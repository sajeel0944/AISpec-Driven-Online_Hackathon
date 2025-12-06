import React from 'react';
import Layout from '@theme/Layout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useAuth } from '@site/src/contexts/AuthContext';
import { Redirect } from '@docusaurus/router';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  education: yup.string().required('Education is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
}).required();

function SignUp() {
  const { isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // TODO: Integrate with backend API (T016, T017, T018)
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Layout
      title="Sign Up"
      description="Sign up for an account">
      <header className={clsx('hero hero-auth-header')}>
        <div className="container">
          <h1 className="hero__title auth-header-title">Create Your Account</h1>
        </div>
      </header>
      <main className="auth-page-wrapper">
        <div className="auth-card">
          <div className="auth-card-header">
            <h3>Sign Up</h3>
          </div>
          <div className="auth-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="margin-bottom--md">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  {...register('username')}
                />
                {errors.username && <p className="text--danger">{errors.username.message}</p>}
              </div>

              <div className="margin-bottom--md">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  {...register('email')}
                />
                {errors.email && <p className="text--danger">{errors.email.message}</p>}
              </div>

              <div className="margin-bottom--md">
                <label htmlFor="education" className="form-label">Education</label>
                <input
                  type="text"
                  id="education"
                  className="form-control"
                  {...register('education')}
                />
                {errors.education && <p className="text--danger">{errors.education.message}</p>}
              </div>

              <div className="margin-bottom--md">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  {...register('password')}
                />
                {errors.password && <p className="text--danger">{errors.password.message}</p>}
              </div>

              <div className="margin-bottom--md">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text--danger">{errors.confirmPassword.message}</p>}
              </div>

              <button type="submit" className="button button--primary button--block auth-submit-button">
                Sign Up
              </button>
            </form>
          </div>
          <div className="auth-card-footer">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default SignUp;