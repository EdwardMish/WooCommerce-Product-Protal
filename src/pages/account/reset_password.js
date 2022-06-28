import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { accountService, alertService } from "../../services";

function ResetPassword({ history }) {
  const TokenStatus = {
    Validating: "Validating",
    Valid: "Valid",
    Invalid: "Invalid",
  };
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { hash } = queryString.parse(window.location.search);

    const data = { token: hash };
    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);
    accountService
      .validateResetToken(data)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getForm() {
    const initialValues = {
      password: "",
      confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

    function onSubmit({ password }, { setSubmitting }) {
      alertService.clear();
      const resetData = { token: token, password: password };
      accountService
        .resetPassword(resetData)
        .then(() => {
          alert("Password reset successful, you can now login.");
          alertService.success(
            "Password reset successful, you can now login.",
            { keepAfterRouteChange: true }
          );
          history.push("login");
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });
    }

    return (
      <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              RESET PASSWORD
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="rounded-md shadow-sm -space-y-px">
                  <label className="sr-only">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={
                      "form-control appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="rounded-md shadow-sm -space-y-px py-4">
                  <label className="sr-only">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={
                      "form-control appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" +
                      (errors.confirmPassword && touched.confirmPassword
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-row py-4">
                  <div className="form-group col">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Reset Password
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return (
          <div>
            Token validation failed, if the token has expired you can get a new
            one at the <Link to="/forgot-password">forgot password</Link> page.
          </div>
        );
      case TokenStatus.Validating:
        return <div>Validating token...</div>;
      default:
        return;
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {getBody()}
    </div>
  );
}
export default withRouter(ResetPassword);
