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
  usernameOrEmail: yup.string().required('Username or Email is required'),
  password: yup.string().required('Password is required'),
}).required();

function SignIn() {
  const { isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // TODO: Integrate with backend API (T024, T025, T026)
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Layout
      title="Sign In"
      description="Sign in to your account">
      <header className={clsx('hero hero-auth-header')}>
        <div className="container">
          <h1 className="hero__title auth-header-title">Welcome Back!</h1>
        </div>
      </header>
      <main className="auth-page-wrapper">
        <div className="auth-card">
          <div className="auth-card-header">
            <h3>Sign In</h3>
          </div>
          <div className="auth-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="margin-bottom--md">
                <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
                <input
                  type="text"
                  id="usernameOrEmail"
                  className="form-control"
                  {...register('usernameOrEmail')}
                />
                {errors.usernameOrEmail && <p className="text--danger">{errors.usernameOrEmail.message}</p>}
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

              <button type="submit" className="button button--primary button--block auth-submit-button">
                Sign In
              </button>
            </form>
          </div>
          <div className="auth-card-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default SignIn;