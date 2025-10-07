import Nav from "@/components/nav";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen p-4 max-w-xl mx-auto">
        <Nav />
        <Outlet />
      </div>
    </>
  );
};

export default Home;
