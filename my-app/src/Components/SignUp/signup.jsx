
import { useState } from "react";
import { Label, TextInput, Button, Spinner } from "flowbite-react";
import supabase from "../../SupabaseClient";
import { Link, useNavigate } from "react-router"; 

export function SignUpComponent() {
  const [fullName, setFullName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    setLoading(true);

    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, 
        },
        shouldCreateUserSession: true, 
      },
    });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      return;
    }

  
    setMessage("Your account was created");
    setFullName("");
    setEmail("");
    setPassword("");
    setLoading(false);

    
    setTimeout(() => {
      navigate("/Login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-100 via-cyan-100 to-gray-200 py-5 px-5">
  <div className="w-sm h-auto bg-white shadow-2xl border border-teal-300 rounded-3xl p-8 mt-15">
    {message && (
      <span className="text-teal-700 font-bold text-2xl text-center block mb-6 underline">
        {message}
      </span>
    )}

    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
      <h1 className="text-4xl font-serif font-extrabold text-center text-teal-700">
        Sign Up
      </h1>

      <div>
        <Label htmlFor="full-name" className="block mb-1 !text-teal-700 font-semibold">
          Full Name
        </Label>
        <TextInput
          id="full-name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          shadow
          className="border rounded-lg border-gray-100 focus:border-teal-600 focus:ring-2 focus:ring-cyan-400 transition w-full"
        />
      </div>

      <div>
        <Label htmlFor="email2" className="block mb-1 !text-teal-700 font-semibold">
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
          className="border rounded-lg border-gray-100 focus:border-teal-600 focus:ring-2 focus:ring-cyan-400 transition w-full"
        />
      </div>

      <div>
        <Label htmlFor="password2" className="block mb-1 !text-teal-700 font-semibold">
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
          className="border rounded-lg border-gray-100 focus:border-teal-600 focus:ring-2 focus:ring-cyan-400 transition w-full"
        />
      </div>


      <Label htmlFor="agree" className="flex !text-gray-800 text-sm gap-1 ">
        Already have an account?
        <Link
          to={"/Login"}
          className="text-cyan-600 underline font-extrabold hover:text-cyan-700"
        >
          Login
        </Link>
      </Label>

      <Button
        className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold tracking-wide shadow-lg hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-transform duration-300 w-full"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size="sm" light className="mr-2" />
            Creating account...
          </>
        ) : (
          "Register new account"
        )}
      </Button>
    </form>
  </div>
</div>

  );
}
