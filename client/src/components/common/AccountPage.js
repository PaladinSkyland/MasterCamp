import NavBar from "../NavBar";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

const AccountPage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  const UserInfomation = (props) => {
    return (
      <section className="h-screen bg-gray-100/50 m-4">
        <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
          <div className="p-4 border-t-2 border-blue-400 rounded-lg bg-gray-100/5 ">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <h1 className="text-blue-500 text-4xl">My account</h1>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">
                Account: <span className="text-xl">{userData.UserType}</span>
              </h2>
              <div className="max-w-sm mx-auto md:w-2/3">
                <div className="relative ">
                  <input
                    type="text"
                    id="user-info-email"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={userData.Email}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className=" relative ">
                    <input
                      type="text"
                      id="user-info-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={userData.LastName}
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <input
                      type="text"
                      id="user-info-first-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={userData.FirstName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-4/12">Change password</h2>
              <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-password"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="text-center md:w-3/12 md:pl-6">
                <button
                  type="button"
                  className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Change
                </button>
              </div>
            </div>
            <hr />
            <div className="w-full flex md:flex-col px-4 pb-4 ml-auto text-gray-500 md:w-1/2">
              <button
                type="submit"
                className="py-2 px-4  btn-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Save
              </button>
              {props.children}
            </div>
          </div>
        </form>
      </section>
    );
  };

  return userData ? (
    <div>
      <NavBar />
      <UserInfomation>
        <button
          onClick={logout}
          className="py-2 px-4 btn-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Logout
        </button>
      </UserInfomation>
    </div>
  ) : (
    /* Sinon */
    <div>
      <h1> non connecté</h1>
    </div>
  );
};

export default AccountPage;
