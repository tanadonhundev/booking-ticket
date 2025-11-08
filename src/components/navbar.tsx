import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import AppLogoutButton from "./app/AppLogoutButton";
import { authClient } from "@/lib/auth-client";

type Role = "admin" | "user";
export default async function Navbar() {
  const { data: session } = await authClient.getSession();

  const rawRole = session?.user.role; // string | null | undefined
  // แปลงให้เป็น Role หรือ default เป็น "user"
  const role: Role = rawRole === "admin" ? "admin" : "user";
  return (
    <main>
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-12">
            ระบบขายตั๋วออนไลน์
            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" role={role} />
          </div>

          <div className="flex items-center gap-3">
            {!session && (
              <>
                <Button variant="outline" className="hidden sm:inline-flex">
                  <Link href={"/login"}>เข้าสู่ระบบ</Link>
                </Button>
                <Button>
                  <Link href={"/singup"}>สมัครสมาชิก</Link>
                </Button>
              </>
            )}
            {session && <AppLogoutButton />}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}
