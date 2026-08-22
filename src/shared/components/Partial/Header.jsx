import {
  Menu,
  Search,
  RotateCcw,
  Table,
  Settings,
  Component,
  LogOut,
} from "lucide-react";
// import profilePicture from "../../../assets/ProfilePicture.jpg";
import noteLogo from "../../../assets/noteLogo.png";
import { clearTokens } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  }

  const handleLogout = () => {
    clearTokens();
    navigate("/signIn", { replace: true });
  };


  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-3 shadow-sm sm:px-4">
        {/* Left: Menu & Logo */}
        <div className="flex min-w-fit items-center gap-2 sm:gap-4">
          <Menu className="h-10 w-10 cursor-pointer rounded-full p-2 text-gray-600 hover:bg-gray-100 sm:h-12 sm:w-12 sm:p-3" />
          <div className="flex cursor-pointer items-center" onClick={() => navigate("/")}>
            <img src={noteLogo} alt="Logo" className="h-10 w-10 cursor-pointer sm:h-14 sm:w-14" />
            <h1 className="-ml-2 cursor-pointer font-poppins text-xl text-gray-800 sm:-ml-4 sm:text-2xl">ota</h1>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="mx-2 hidden flex-1 items-center rounded-lg bg-gray-100 px-4 py-2 md:flex lg:mx-8">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="ml-3 flex-1 bg-gray-100 text-gray-700 outline-none placeholder-gray-500"
          />
        </div>

        {/* Right: Icons & Profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          <RotateCcw className="h-10 w-10 cursor-pointer rounded-full p-2 text-gray-600 hover:bg-gray-100 sm:h-12 sm:w-12 sm:p-3" onClick={refresh} />
          <Table className="hidden h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100 sm:block" />
          <Settings className="hidden h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100 md:block" />
          <Component className="hidden h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100 md:block" />
       
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:h-12 sm:w-12"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
          {/* <img
            src={profilePicture}
            className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-200"
            alt="Profile Picture"
          /> */}
        </div>
      </header>
    </>
  );
}

export default Header;
