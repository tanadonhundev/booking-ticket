import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export const NavMenu = async ({ ...props }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin = session?.user?.role === "admin";

  const menuItems = isAdmin
    ? [
        { label: "รายการจองทั้งหมด", href: "/admin/bookings" },
        { label: "จัดการตั๋ว", href: "/admin/tickets" },
      ]
    : [
        { label: "จองตั๋ว", href: "/" },
        { label: "ยกเลิกจองตั๋ว", href: "/cancel" },
      ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
