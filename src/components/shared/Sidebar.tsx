import { ImStatsDots } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Sidebar = () => {
  const { pathname } = useLocation();

  const sidebarLinks = [
    // {
    //   item: "System Users",
    //   navs: [
    //     {
    //       path: "/",
    //       Icon: RxDashboard,
    //       label: "Dashboard",
    //       relativePath2: "",
    //       relativePath: "",
    //     },
    //   ],
    // },
    {
      item: "Products",
      navs: [
        {
          label: "Manage Products",
          Icon: TbBrandProducthunt,
          path: "/",
          relativePath: "",
          relativePath2: "",
        },
        {
          path: "/add-product",
          Icon: MdOutlineAddShoppingCart,
          label: "Add Product",
          relativePath: "edit-product",
        },
      ],
    },
    {
      item: "Sales",
      navs: [
        {
          label: "Sales History",
          path: "/sales-history",
          relativePath: "",
          Icon: ImStatsDots,
        },
      ],
    },
  ];

  return (
    <div className="lg:border-r border-[#DDDDDD] lg:pl-5 2xl:pl-7 space-y-2 2xl:space-y-5">
      {sidebarLinks.map((singleItem) => (
        <div key={singleItem?.item} className="">
          <p className="text-textDark pb-2 2xl:pb-3">{singleItem?.item}</p>
          <div className="space-y-0.5 2xl:space-y-1">
            {singleItem.navs.map((nav) => (
              <div key={nav.label}>
                <Link
                  to={nav.path}
                  className={`relative flex items-center gap-2 2xl:gap-3 pl-2 lg:pl-4 hover:bg-textDark hover:rounded-[10px]  hover:text-white hover:font-semibold group py-1.5 2xl:py-2 ${pathname === nav.path ||
                    pathname === nav.relativePath ||
                    pathname === nav.relativePath2
                    ? "text-white font-semibold bg-textDark rounded-[10px]"
                    : "text-textSecondary"
                    }`}
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full group-hover:bg-[#494949] p-1 ${pathname === nav.path ||
                      pathname === nav.relativePath ||
                      pathname === nav.relativePath2
                      ? "bg-[#494949]"
                      : "bg-[#F5F5F6]"
                      }`}
                  >
                    <nav.Icon className="text-xl " />
                  </div>
                  <p className="">{nav.label}</p>
                  <div
                    className={`group-hover:bg-[#EC9414] absolute h-4 w-1 right-0 top-[35%] rounded-l ${pathname === nav.path ||
                      pathname === nav.relativePath ||
                      pathname === nav.relativePath2
                      ? "bg-[#EC9414]"
                      : ""
                      }`}
                  ></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
