/* eslint-disable react/prop-types */

import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ListOrdered, ShoppingBasket } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// eslint-disable-next-line react-refresh/only-export-components
export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icons: <LayoutDashboard />,
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icons: <ShoppingBasket />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icons: <ListOrdered />,
  },
  // {
  //   id: 'features',
  //   label: 'Features',
  //   path: '/admin/features',
  //   icons: <Anvil />,
  // }
]


function MenuItems({ setOpen }) {

  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {
        adminSidebarMenuItems.map((menuItem) => (
          <div key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path)
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            {menuItem.icons}
            <span>{menuItem.label}</span>
          </div>
        ))
      }
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {

  const navigate = useNavigate();

  return (

    <Fragment>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="felx flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>

      </Sheet>

      <aside className="hidden lg:flex w-64 flex-col border-r bg-background p-6">
        <div className="flex cursor-pointer items-center gap-2" >
          <ChartNoAxesCombined size={30} />
          <h1 onClick={() =>
            navigate('/admin/dashboard')}
            className="text-2xl font-extrabold">Admin Panel</h1>

        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;




