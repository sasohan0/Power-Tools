import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../Hooks/useAdmin";
import Footer from "../Shared/Footer";
import Loading from "../Shared/Loading";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  console.log(admin);

  if (loading || adminLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="drawer drawer-mobile ">
        <input
          id="dashboard-sidebar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side ">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            {!admin && (
              <>
                <li>
                  <Link to="/dashboard/myOrders">My Orders</Link>
                </li>

                <li>
                  <Link to="/dashboard/review">Add A Review</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/dashboard">My Profile</Link>
            </li>

            {admin && (
              <>
                <li>
                  <Link to="/dashboard/users">Make Admin</Link>
                </li>
                <li>
                  <Link to="/dashboard/addProduct">Add A Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageProducts">Manage Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageOrders">Manage All Orders</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
