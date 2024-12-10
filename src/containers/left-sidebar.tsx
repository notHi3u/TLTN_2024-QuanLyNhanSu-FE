import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import routes from "@/helper/sidebar-routes";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Image from "next/image";
import { RiExpandUpDownLine } from "react-icons/ri";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";
import { IoIosMail } from "react-icons/io";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaClipboardUser } from "react-icons/fa6";
import { setPageTitle } from "@/features/common/header-slide";
import { RootState } from "@/lib/store";
import { useAuth } from "@/lib/auth-provider";

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const LeftSidebar = ({ isOpen, onToggle }: LeftSidebarProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const { logout } = useAuth(); 

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isSidebarOpen");
      return savedState === "true" || savedState === null;
    }
    return true;
  });

  useEffect(() => {
    const routeObj = routes.find((r) => r.path === pathname);
    if (routeObj) {
      dispatch(setPageTitle({ title: routeObj.pageTitle }));
    }
  }, [pathname, dispatch]);

  const renderIcon = (icon?: React.ReactNode, style?: React.CSSProperties) => {
    const scaleStyle = {
      transform: isSidebarOpen ? undefined : "scale(1.4)",
      marginTop: isSidebarOpen ? undefined : "0.1rem",
      marginBottom: isSidebarOpen ? undefined : "0.1rem",
      transition: "transform 0.4s ease",
    };
    return (
      React.cloneElement(icon as React.ReactElement, {
        style: { ...style, ...scaleStyle },
      }) || (
        <IoIosMail
          className="text-[#ffcc4a]"
          style={{ ...style, ...scaleStyle }}
        />
      )
    );
  };

  const handleLogout = async () => {
    await logout();
    //router.push("/login"); // Redirect to the login page
  };

  const renderMenuItems = (items: typeof routes) =>
    items.map((route) => {
      const isParentActive = pathname === route.path;
      return (
        <div key={route.path} className={`${isSidebarOpen ? "" : ""}`}>
          <Link
            href={route.path}
            prefetch
            className={`${
              isParentActive
                ? "bg-primary-50 border-primary-300"
                : "border-transparent"
            } hover:border-primary-300 hover:bg-primary-50 flex mr-2 items-center my-1 p-2 transition-transform transform rounded-lg border-2 ${
              isSidebarOpen ? "" : "justify-center py-3"
            }`}
          >
            {renderIcon(route.icon, {})}
            {isSidebarOpen && (
              <span className={`ml-2 text-xs lg:text-sm`}>
                {route.pageName}
              </span>
            )}
          </Link>
        </div>
      );
    });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    onToggle(!isOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`fixed flex flex-col pl-2 inset-0 z-50 ${
        isOpen ? "block" : "hidden"
      } lg:relative lg:block h-screen bg-primary-100 text-foreground`}
    >
      <div className="flex flex-grow overflow-y-auto flex-col h-[calc(100%-5rem)]">
        <div
          className={`flex h-16 mt-2 items-center transition-colors duration-300 ease-in-out justify-between ${
            isSidebarOpen ? "" : "justify-center"
          }`}
        >
          <div className="flex justify-center items-center">
            <Image
              src="/favicon-96x96.png"
              alt="Company Logo"
              className={`${isSidebarOpen ? "-ml-1" : "ml-1"}`}
              width={56}
              height={56}
            />
            <div
              className={`flex transition-all duration-300 ease-in-out items-center justify-center text-xl font-bold mx-1 h-full ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Watatek
            </div>
          </div>
          <div
            className={`absolute top-6 ${
              isSidebarOpen ? "right-0" : "-right-5"
            }`}
          >
            <Button
              isIconOnly
              className="bg-transparent text-2xl"
              onClick={handleToggleSidebar}
            >
              {isSidebarOpen ? <FaCaretSquareLeft /> : <FaCaretSquareRight />}
            </Button>
          </div>
        </div>
        <ScrollShadow
          hideScrollBar
          offset={100}
          orientation="horizontal"
          className="h-[90%] transition-colors duration-300 ease-in-out overflow-y-auto"
        >
          <div>
            <div className={`my-2 text-sm ${isSidebarOpen ? "block" : "hidden"}`}>
              MAIN MENU
            </div>
            {renderMenuItems(routes)}
          </div>
        </ScrollShadow>
      </div>
      <div
        className={` ${
          isSidebarOpen
            ? "bg-primary-50 p-3 border-primary-300 border-2 mr-2"
            : "p-2"
        } flex-none flex rounded-xl transition-colors duration-300 ease-in-out`}
      >
        {isSidebarOpen ? (
          <>
            <div className="flex flex-col justify-center mx-1">
              <div className="font-bold select-none">
                {user.user?.username}
              </div>
              <div className="text-sm font-light select-none">
                {user.user?.email}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <Button isIconOnly size="sm" className="bg-transparent">
                    <RiExpandUpDownLine className="text-xl" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="border rounded-xl border-primary-300">
                  <div className="py-2 flex flex-col gap-2">
                    <Button
                      startContent={<IoLogOut className="text-xl" />}
                      className="justify-start"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <Button
                      startContent={<FaClipboardUser className="text-xl" />}
                      className="justify-start"
                    >
                      User Details
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default LeftSidebar;
