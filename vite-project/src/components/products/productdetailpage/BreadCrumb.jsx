import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const crumbs = location.pathname.split("/").filter((crumb) => crumb !== "");

  if (location.pathname === "/") return null;

  const buildPath = (index) => "/" + crumbs.slice(0, index + 1).join("/");

  return (
    <nav className="text-sm text-gray-500 max-w-7xl mb-4 mt-2 px-6">
      <ol className="list-reset flex flex-wrap items-center">
        <li>
          <Link to="/" className="text-gray-600 max-w-7xl hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li>
              <span className="mx-2">
                <IoIosArrowForward />
              </span>
            </li>
            <li>
              {index !== crumbs.length - 1 ? (
                <Link
                  to={buildPath(index)}
                  className="text-gray-600 hover:underline capitalize"
                >
                  {decodeURIComponent(crumb)}
                </Link>
              ) : (
                <span className="text-gray-800 capitalize">
                  {decodeURIComponent(crumb)}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
