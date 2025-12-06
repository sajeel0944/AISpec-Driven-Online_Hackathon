import React from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';
import { Redirect } from '@docusaurus/router'; // Docusaurus v2/v3 compatible Redirect

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect them to the /signin page, but save the current URL they tried to go to
    // so they can be redirected there after successful authentication.
    return <Redirect to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;