import React, { useState, useEffect } from "react";
import { accountService } from "../../services";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../_actions/user_action";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../breadcrumb";
import { Link } from "react-router-dom";
import UserAvatar from "react-user-avatar";

function Header(props) {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isUser, setUser] = useState(false);
  const [avatar, setUserAvatar] = useState("John Me");
  const [crumbs, setCrumbs] = useState(["home", "dashboard"]);
  const [account, setAccount] = useState(false);
  const [product, setProduct] = useState(false);
  const [customer, setCustomer] = useState(false);
  const handleLogout = () => {

    dispatch(logoutUser()).then((res) => {
      if (res.payload.success) {
        setUser(false);
        props.history.push("/");
      } else {
        alert("error");
      }
    });
  };
  const openMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const UserMenu = () => {
    return menuVisible ? (
      <div
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Your Profile
        </Link>

        <Link
          to="/setting"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Settings
        </Link>

        <Link
          to="/"
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Sign out
        </Link>
      </div>
    ) : (
      <></>
    );
  };
  const MobileUserMenu = () => {
    return menuVisible ? (
      <div className="mt-3 px-2 space-y-1">
        <Link
          to="/profile"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          Your Profile
        </Link>

        <Link
          to="/setting"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          Settings
        </Link>

        <Link
          to="/"
          onClick={handleLogout}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          Sign out
        </Link>
      </div>
    ) : (
      <></>
    );
  };
  const DashboardHeader = () => {
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/dashboard"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium text-gray-50"
                  >
                    Dashboard
                  </Link>

                  <span 
                    className="mx-10 flex items-center py-6 text-sm leading-5 focus:outline-none relative text-gray-300 hover:text-white rounded-md text-sm font-medium cursor-pointer "
                    onClick={() => setAccount(!account)}
                  >
                    Account settings
                    <span className="pl-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down inline-block"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                    {account && (
                      <ul className="bg-white shadow rounded mt-2 py-1 w-32 left-0 mt-40 ml-4 absolute ">
                        <Link to="/account/listing">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Listing Pages
                          </li>
                        </Link>
                        <Link to="/account/detail">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Detail page
                          </li>
                        </Link>
                        <Link to="/account/addNew">
                          {" "}
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Add new page
                          </li>
                        </Link>
                      </ul>
                    )}
                  </span>

                  <Link
                    to="/project"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Rep Management
                  </Link>

                  <span
                    className="mx-10 flex items-center py-6 text-sm leading-5 focus:outline-none relative text-gray-300 hover:text-white px-3 py-6 rounded-md text-sm font-medium cursor-pointer "
                    onClick={() => setProduct(!product)}
                  >
                    Products
                    <span className="pl-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down inline-block"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                    {product && (
                      <ul className="bg-white shadow rounded mt-2 py-1 w-32 left-0 mt-40 ml-4 absolute ">
                        <Link to="/products/listing">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Listing Pages
                          </li>
                        </Link>
                        <Link to="/products/detail">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Detail page
                          </li>
                        </Link>
                        <Link to="/products/addNew">
                          {" "}
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Add new page
                          </li>
                        </Link>
                      </ul>
                    )}
                  </span>

                  <span
                    className="mx-10 flex items-center py-6 text-sm leading-5 focus:outline-none relative text-gray-300 hover:text-white px-3 py-6 rounded-md text-sm font-medium cursor-pointer "
                    onClick={() => setCustomer(!customer)}
                  >
                    Customers
                    <span className="pl-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down inline-block"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                    {customer && (
                      <ul className="bg-white shadow rounded mt-2 py-1 w-32 left-0 mt-40 ml-4 absolute ">
                        <Link to="/customers/listing">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Listing Pages
                          </li>
                        </Link>
                        <Link to="/customers/detail">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Detail page
                          </li>
                        </Link>
                        <Link to="/customers/addNew">
                          {" "}
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Add new page
                          </li>
                        </Link>
                      </ul>
                    )}
                  </span>
                  <Link
                    to="/report"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Analytics
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>

                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      onClick={openMenu}
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <UserAvatar size="48" name={avatar} />
                    </button>
                  </div>
                  <UserMenu />
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={openMenu}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>

            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </Link>

            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </Link>

            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </Link>

            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Reports
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <UserAvatar size="48" name={avatar} />
              </div>

              <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
            <MobileUserMenu />
          </div>
        </div>
      </nav>
    );
  };
  const GeneralHeader = () => {
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>

                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  };
  const isAuth = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const route = ("home" + location.pathname).split("/");
    setCrumbs(route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    accountService.auth().then((res) => {
      if (res.data.isAuth) {
        setUser(true);
        setUserAvatar(res.data.name);
      } else setUser(false);
    });
  }, [isAuth]);

  return isUser ? (
    <>
      <DashboardHeader /> <Breadcrumb crumbs={crumbs} />
    </>
  ) : (
    <>
      <GeneralHeader /> <Breadcrumb crumbs={crumbs} />
    </>
  );
}

export default withRouter(Header);
