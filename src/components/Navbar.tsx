import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between p-4">
      <Logo />
      <div className="flex items-center gap-4">
        <UserButton />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
