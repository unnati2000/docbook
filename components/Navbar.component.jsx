import { Fragment } from "react";
import { CogIcon, HomeIcon, ViewGridIcon } from "@heroicons/react/outline";
import {
  AiOutlineHistory,
  AiOutlineBarChart,
  AiFillMedicineBox,
} from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { MdOutlineMood } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";

const sidebarNavigation = [
  { name: "Home", href: "/home", icon: HomeIcon, current: false },
  { name: "Dashboard", href: "/dashboard", icon: ViewGridIcon, current: false },
  { name: "History", href: "/history", icon: AiOutlineHistory, current: false },
  {
    name: "Symptoms",
    href: "/symptom",
    icon: AiOutlineBarChart,
    current: false,
  },
  { name: "Moods", href: "/mood", icon: MdOutlineMood, current: false },
  {
    name: "Medications",
    href: "/medication",
    icon: GiMedicines,
    current: false,
  },
  { name: "Settings", href: "/settings", icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ user, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <>
      <div className="hidden min-h-screen w-28  bg-blue-700 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex flex-col flex-shrink-0 flex items-center">
            <AiFillMedicineBox className="h-10 w-10 mb-1 text-white" />
            <p className="text-white font-semibold">DocBook</p>
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-blue-800 text-white"
                    : "text-blue-100 hover:bg-blue-800 hover:text-white",
                  "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-white"
                      : "text-blue-300 group-hover:text-white",
                    "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-blue-700 pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ViewGridIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <AiFillMedicineBox className="h-10 w-10 mb-1 text-white" />
                </div>
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {sidebarNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-blue-800 text-white"
                              : "text-blue-100 hover:bg-blue-800 hover:text-white",
                            "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-blue-300 group-hover:text-white",
                              "mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Navbar;
