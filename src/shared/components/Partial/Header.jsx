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
import noteLogo from "../../../assets/note-logo.png";
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
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        {/* Left: Menu & Logo */}
        <div className="flex min-w-fit items-center gap-4">
          <Menu className="h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100" />
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={noteLogo} alt="Logo" className="w-18 h-18 cursor-pointer" />
            <h1 className="font-poppins text-2xl  text-gray-800 cursor-pointer ml-[-18px]">ota</h1>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="mx-8 flex max-w-2xl flex-1 items-center rounded-lg bg-gray-100 px-4 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 ml-3 flex-1 outline-none text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Right: Icons & Profile */}
        <div className="flex items-center gap-2">
          <RotateCcw className="h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100" onClick={refresh} />
          <Table className="h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100" />
          <Settings className="h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100" />
          <Component className="h-12 w-12 cursor-pointer rounded-full p-3 text-gray-600 hover:bg-gray-100" />
       
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-12 w-12 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
