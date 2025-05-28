import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const navItems = [
  { title: "Home", path: "/" },
  { title: "Users", path: "/users" },
  { title: "Chats", path: "/chats" },
  { title: "Profile", path: "/profile" },
];
const AppLayout = () => {
  const { logout } = useAuthStore();
  return (
    <div className="flex items-start justify-start w-full h-screen ">
      <div className="h-full w-[15rem]  bg-cyan-50 flex items-center justify-center">
        <ul className="h-[70%] flex w-full flex-col gap-5">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="text-slate-400 hover:text-slate-600 cursor-pointer w-full p-1 hover:bg-red-200"
            >
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-5 left-10">
        <button
          onClick={logout}
          className="border p-2 text-black rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="text-white w-full h-full bg-gray-400">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
