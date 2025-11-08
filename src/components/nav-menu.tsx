import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ComponentProps } from "react";

type Role = "admin" | "user";

interface NavMenuProps extends ComponentProps<typeof NavigationMenu> {
  role: Role;
}

export const NavMenu = ({ role, ...props }: NavMenuProps) => {

  console.log(role)
  // กำหนดเมนูตาม role
  const menuItems =
    role === "user"
      ? [
          { label: "จองตั๋ว", href: "/" },
          { label: "ยกเลิกจองตั๋ว", href: "/cancel" },
        ]
      : [
          { label: "รายการจองทั้งหมด", href: "/admin/bookings" },
          { label: "จัดการตั๋ว", href: "/admin/tickets" },
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
