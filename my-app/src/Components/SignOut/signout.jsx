import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import supabase from '../../supabaseClient';

function SignoutComponent({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return null;

  return authenticated ? children : <Navigate to="/Login" />;
}

export default SignoutComponent;
