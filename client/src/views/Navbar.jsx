import { Input } from "@/components/ui/input";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuthStore from "../zustand-store/authStore";
import { userLogOut } from "../utils/postApi";
import { toast } from "../components/ui/use-toast";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuthStore();

  const handleLogout = async () => {
    await userLogOut();
    logout();
    toast({
      description: "You have been logged out successfully",
    });
  };
  return (
    <div className="flex m-auto w-full lg:justify-between bg-primary-1 py-6 px-[60px]">
      <h1 className="text-3xl font-bold text-secondary-1 cursor-pointer ml-4 lg:ml-0">
        <Link to="/">
          Les
          <span className="text-white">Read</span>
        </Link>
      </h1>
      <div className="w-[40%] hidden lg:flex">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "bg-input-bg rounded-sm text-text-2 focus-visible:outline-none px-4 translate-x-4 h-[40px]"
            )}
          >
            <div className="flex gap-1">
              Menus
              <RiArrowDropDownLine size="20px" className="mt-[2px]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn("bg-input-bg text-text-2")}>
            <DropdownMenuItem>Top Seller</DropdownMenuItem>
            <DropdownMenuItem>Trending</DropdownMenuItem>
            <DropdownMenuItem>New Release</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input className={cn("w-full ")} placeholder="Search books here" />
      </div>
      {isLoggedIn ? (
        <div className="lg:flex gap-3 hidden items-center">
          <CiHeart className="text-white text-2xl font-semibold cursor-pointer" />
          <IoCartOutline className="text-white text-2xl font-semibold cursor-pointer" />
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn("rounded-sm focus-visible:outline-none")}
            >
              <div className="flex gap-1">
                <div className="flex gap-2">
                  <img
                    src={user.profileImage}
                    className="h-[40px] w-[40px] rounded-md"
                  />
                  <div>
                    <h5 className="text-[14px] text-white font-bold">
                      {user.fullName}
                    </h5>
                    <p className="text-[10px] text-secondary-1">{user.email}</p>
                  </div>
                </div>
                <RiArrowDropDownLine
                  size="20px"
                  className="mt-[2px] text-white"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("bg-input-bg text-text-2")}>
              <DropdownMenuItem>
                {" "}
                <Button className={cn("p-0")}>
                  {" "}
                  <Link to={`/profile/${user.userName}`}>View Profile</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className={cn("p-0")} onClick={handleLogout}>
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="lg:flex gap-4 hidden">
          <Link to="/login">
            <Button variant="primary">Log In</Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary">Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
