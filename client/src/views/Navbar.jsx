import { Input } from "@/components/ui/input";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="flex m-auto w-full lg:justify-evenly bg-primary-1 py-6">
      <h1 className="text-3xl font-bold text-secondary-1 cursor-pointer ml-4 lg:ml-0">
        Les
        <span className="text-white">Read</span>
      </h1>
      <div className="w-[40%] hidden lg:flex">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "bg-input-bg rounded-sm text-text-2 focus-visible:outline-none px-4 translate-x-4"
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
      <div className="lg:flex gap-4 hidden">
        <Button variant="primary">Log In</Button>
        <Button variant="secondary">Sign Up</Button>
      </div>
    </div>
  );
};

export default Navbar;
