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
  console.log(role);
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {role === "user" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">จองตั๋ว</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">ยกเลิกจองตั๋ว</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        {role === "admin" && (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/admin/bookings">รายการจองทั้งหมด</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/admin/tickets">จัดการตั๋ว</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
