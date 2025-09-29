import { useState, useEffect, } from "react";
import { Button, DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, } from "flowbite-react";
import { NavLink, useNavigate } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import supabase from "../../SupabaseClient";
import { AddCartComponent } from "../AddTOCART/Addtocart";
import { useContext } from "react";
import { CartContext } from "../../CardContext";
import logo from '/images/logo-1.jpg'



export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const { setCartItems } = useContext(CartContext);

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }

    setCartItems([]);
    closeMenu();


  };



  const HandleOnClick1 = () => {
    closeMenu();
    navigate("/login")
  };

  const HandleOnClick2 = () => {
    closeMenu();
    navigate("signup");
  };



  const AuthButtons = ({ isMobile = false }) => {
    if (user) {
      return (
        <Button size="sm" onClick={signout} className={isMobile ? "cursor-pointer bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold tracking-wide shadow-lg hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-transform duration-300    " : "hidden sm:inline-block bg-gradient-to-r cursor-pointer from-teal-600 to-cyan-600 text-white font-semibold tracking-wide shadow-lg hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-transform duration-300 "}>
          Sign Out
        </Button>
      );
    }

    return (
      <div className={`flex gap-2 ${isMobile ? "flex-col " : "hidden  sm:flex not-only:"}`}>
        <Button
          className="bg-gradient-to-r from-teal-600 to-cyan-600 cursor-pointer text-white font-semibold tracking-wide shadow-lg hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-transform duration-300 "
          size="sm" onClick={HandleOnClick2}>Sign Up</Button>
        <Button
          className="bg-gradient-to-r from-teal-600 to-cyan-600 cursor-pointer text-white font-semibold tracking-wide shadow-lg hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-transform duration-300  "
          size="sm" onClick={HandleOnClick1}>Login</Button>
      </div>

    );
  };

  return (


    <Navbar className="fixed top-0 left-0 right-0 z-50 !bg-white border-b shadow-md px-4 py-3 transition-all duration-300">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <NavbarBrand>
          <img src={logo} className="h-13 w-20  object-contain  " alt="" />
        </NavbarBrand>

        {/* Right Side */}
        <div className="flex items-center gap-4 md:order-2">
          {/* Cart */}
          {user && (
            <div className="relative">
              <AddCartComponent />
            </div>
          )}



          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex">
            <AuthButtons />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={handleToggle}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Collapsible Menu */}
        <NavbarCollapse
          className={`${isOpen ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto mt-4 md:mt-0 transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col md:flex-row gap-3 md:gap-3">
            {["/", "About", "Services", "Shop", "Contact"].map((route, i) => (
              <NavLink
                key={i}
                to={route}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-md font-semibold transition-all duration-200 ${isActive
                    ? "text-white bg-cyan-600"
                    : "text-gray-700 hover:text-white hover:bg-cyan-500"
                  }`
                }
              >
                {route === "/" ? "Home" : route}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="md:hidden mt-4">
            <AuthButtons isMobile />
          </div>
        </NavbarCollapse>
      </div>
    </Navbar>



  );
}

