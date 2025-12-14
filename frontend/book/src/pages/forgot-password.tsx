
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function ForgotPassword(): JSX.Element {
  return (
    <Layout title="Forgot Password" description="Reset your password">
      <main className="auth-page-wrapper">
        <div className="auth-card">
          <div className="auth-form-card">
            <div className="auth-card-header">
              <h3>Forgot your password?</h3>
              <p className="header-subtitle">Enter your email to receive reset instructions.</p>
            </div>

            <div className="auth-card-body">
              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input id="email" type="email" className="form-control" placeholder="you@example.com" />
                </div>

                <div className="form-actions">
                  <button type="submit" className="auth-submit-button">Send reset link</button>
                </div>
              </form>
            </div>

            <div className="auth-card-footer">
              Remembered your password?{' '}
              <Link to="/signin" className="signin-link">Sign in</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
