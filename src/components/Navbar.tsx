import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/authSlice";

export const Navbar = () => {

  const accessToken = useSelector((state: RootState) =>  state.auth.accessToken)
  const dispatch = useDispatch<AppDispatch>()
  

  const navigate = useNavigate()


  const handleLogout = () =>{
    dispatch(logout())
    navigate('/signin')
  }

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Company
            </span>
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/quotes"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Quotes
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          {accessToken ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Profile"
                  title="Profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Logout"
                  title="Logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Sign in"
                  title="Sign in"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
  
};
