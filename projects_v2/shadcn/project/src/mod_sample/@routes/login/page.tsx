import React from "react";
import {useRouterNavigate, useRouterSearchParams, Composite, useUserInfos, useLogOutUser, useUserStateRefresh, useFormSubmit} from "jopi-rewrite/uikit";

import * as jk_translate from "jopi-toolkit/jk_translate";
import logo from "./logo.png";

const trInvalidIdentifier = jk_translate.translate("page.login.invalidIdentifierOrPassword", {default: "Invalid identifier2"});
const trCheckMailOrPassword = jk_translate.translate("page.login.checkMailOrPassword", {default: "Check you e-mail and/or password"});
const trRememberMe = jk_translate.translate("page.login.rememberMe", {default: "Remember me"});
const trForgotPassword = jk_translate.translate("page.login.forgotPassword", {default: "Forgot password?"});
const trWelcomeBack = jk_translate.translate("page.login.welcomeBack", {default: "Welcome back! Please sign in to continue"});
const trSignIn = jk_translate.translate("page.login.signIn", {default: "Sign in"});

export default function() {
    const navigate = useRouterNavigate();
    const searchParams = useRouterSearchParams();
    const returnUrl = searchParams.get('returnUrl') ? decodeURIComponent(searchParams.get('returnUrl')!) : '/';
    const [isAuhFailed, setIsAuhFailed] = React.useState(false);

    const isLoggedIn = useUserInfos();
    const logOutUser = useLogOutUser();
    const declareUserStateChange = useUserStateRefresh();

    const [submitForm, _] = useFormSubmit((res) => {
        if (res.isOk) {
            // We don't need to decode the result
            // since the only interesting thing here
            // is the cookie that is automatically set.
            //
            setIsAuhFailed(false);

            declareUserStateChange();
            navigate(returnUrl);
        } else {
            setIsAuhFailed(true);
        }
    });

    // Already connected when navigate to this page?
    // => Show the logout page.
    //
    if (isLoggedIn) {
        return <div className="w-full flex flex-col items-center justify-center mt-20">
            <div>You are already logged as: {isLoggedIn.fullName}</div>
            <div onClick={logOutUser}
                 className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity
                flex items-center justify-center cursor-pointer">
                Logout
            </div>
        </div>;
    }

    // Note connected?
    // => Show the login page.
    //
    return (
        <div className="w-full min-h-screen flex">
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-[200px]"
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <form onSubmit={(e) => submitForm(e)}
                      className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">{trSignIn}</h2>
                    <p className="text-sm text-gray-500/90 mt-3">{trWelcomeBack}</p>

                    {isAuhFailed && (
                        <div className="mt-6 w-full p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                          clipRule="evenodd"/>
                                </svg>
                                <p className="text-sm text-red-700 font-medium">{trInvalidIdentifier}</p>
                            </div>
                            <p className="text-xs text-red-600 mt-1">{trCheckMailOrPassword}</p>
                        </div>
                    )}

                    <div className={isAuhFailed ? "mt-8" : "mt-20"}></div>

                    <div
                        className={`flex items-center w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                            isAuhFailed ? 'border-red-300 bg-red-50/30' : 'border-gray-300/60'
                        }`}>
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                                  fill={isAuhFailed ? "#DC2626" : "#6B7280"}/>
                        </svg>
                        <input name="login" type="email" required defaultValue="johan@mymail.com" placeholder="Email id"
                               className={`bg-transparent outline-none text-sm w-full h-full ${
                                   isAuhFailed ? 'text-red-600 placeholder-red-400' : 'text-gray-500/80 placeholder-gray-500/80'
                               }`}/>
                    </div>

                    <div
                        className={`flex items-center mt-6 w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                            isAuhFailed ? 'border-red-300 bg-red-50/30' : 'border-gray-300/60'
                        }`}>
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                                fill={isAuhFailed ? "#DC2626" : "#6B7280"}/>
                        </svg>
                        <input name="password" type="password" placeholder="Password"
                               className={`bg-transparent outline-none text-sm w-full h-full ${
                                   isAuhFailed ? 'text-red-600 placeholder-red-400' : 'text-gray-500/80 placeholder-gray-500/80'
                               }`} required defaultValue="mypassword"/>
                    </div>

                    <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                        <div className="flex items-center gap-2">
                            <input name="remember" className="h-5" type="checkbox" id="checkbox"/>
                            <label className="text-sm" htmlFor="checkbox">{trRememberMe}</label>
                        </div>
                        <a className="text-sm underline" href="#">{trForgotPassword}</a>
                    </div>

                    <button type="submit"
                            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                        Login
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <a
                        className="text-indigo-400 hover:underline" href="#">Sign up</a></p>

                    <Composite name={isAuhFailed ? "page.login.logInError" : "page.login.notLogIn"} />
                </form>
            </div>
        </div>
    );
};