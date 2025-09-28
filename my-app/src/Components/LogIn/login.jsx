
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { Link } from "react-router";
import supabase from "../../SupabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router";


export function LoginInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage("");
  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    setMessage(error.message);
    return;
  }

  if (data) {
    const user = data.user;


    const { data: userDetails, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (userError) {
      setMessage("Error fetching user role: " + userError.message);
      await supabase.auth.signOut();
      return;
    }

    if (userDetails?.role === "admin") {
      navigate("/admin/orders");
    } else {
      navigate("/");
    }
  }
};


  return (
   <div className="w-full h-[90vh] flex justify-center items-center bg-gradient-to-br from-teal-100 via-cyan-100 to-gray-200">
  <div className="w-[400px] bg-white shadow-2xl border border-teal-300 rounded-3xl p-8 mt-20 px-5">
    {message && (
      <span className="text-teal-700 font-semibold text-2xl text-center block mb-4">
        {message}
      </span>
    )}

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <h1 className="text-4xl font-serif font-extrabold text-center text-teal-700">
      Login
      </h1>

      <div>
        <Label
          htmlFor="email2"
          className="block mb-1 !text-teal-700 font-semibold"
        >
          Your Email
        </Label>
        <TextInput
          id="email2"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          shadow
          className="border rounded-lg border-gray-100 focus:border-teal-600 focus:ring-2 focus:ring-cyan-400 transition"
        />
      </div>

      <div>
        <Label
          htmlFor="password2"
          className="block mb-2 !text-teal-700 font-semibold"
        >
          Your Password
        </Label>
        <TextInput
          id="password2"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          shadow
          className="border rounded-lg border-gray-100 focus:border-teal-600 focus:ring-2 focus:ring-cyan-400 transition"
        />
      </div>

      <Label htmlFor="agree" className="flex text-sm  gap-2 !text-gray-900">
        Don’t have an account?
        <Link
          to="/signUp"
          className="text-cyan-600 underline font-extrabold hover:text-cyan-700"
        >
          Register
        </Link>
      </Label>

      <Button
        className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold tracking-wide shadow-lg hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-transform duration-300  "
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size="sm" light className="mr-2" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  </div>
</div>

  );
}
