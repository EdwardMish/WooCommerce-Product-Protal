import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function UserMenu({ open, history }) {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = (props) => {
    dispatch(logoutUser()).then((res) => {
      if (res.payload.success) {
        setUser(false);
        props.history.push("/");
      } else {
        alert("error");
      }
    });
  };
  useEffect(() => {
    setMenuVisible(!menuVisible);
  }, [open]);

  return menuVisible ? (
    <div
      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <a
        href="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        Your Profile
      </a>

      <a
        href="/setting"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        Settings
      </a>

      <a
        href="#"
        onClick={handleLogout}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        Sign out
      </a>
    </div>
  ) : (
    <></>
  );
}

export default withRouter(UserMenu);
