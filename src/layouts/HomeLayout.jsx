import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../styles/home/home.css";

const HomeLayout = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default HomeLayout;
