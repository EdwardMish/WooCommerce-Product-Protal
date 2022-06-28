import { authUser } from "../_actions/user_action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Auth(Component, option, adminRoute = null) {
  function Auth_check(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(authUser()).then((res) => {
        if (!res.payload.isAuth) {
          if (option) props.history.push("/login");
        } else {
          if (!option) props.history.push("/dashboard");
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Component />;
  }

  return Auth_check;
}
