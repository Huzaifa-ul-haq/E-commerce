import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import supabase from "../../SupabaseClient";

const ProtectRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); 
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (!user) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      const { data: userDetails, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (error || !userDetails || userDetails.role !== "admin") {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }

      setChecking(false);
    };

    checkUserRole();

    // 💡 Optional: listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUserRole();
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (checking || isAdmin === null) {
    return <div>Loading...</div>; 
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRoute;
