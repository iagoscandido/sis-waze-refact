import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import Cities from "@/app/(private)/dashboard/_components/cities";
import Sort from "@/app/(private)/dashboard/_components/sort";
import LegendPopover from "@/components/legend";
import Logo from "@/components/logo";
import MobileMenuIcon from "@/components/mobile-menu-icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCities } from "@/lib/fetchers/cities";
import { getQueryClient } from "@/lib/get-query-client";

// Navigation links array to be used in both desktop and mobile menus
type NavigationLink = {
  href: string;
  label: string;
  active?: boolean;
};

const navigationLinks: NavigationLink[] = [
  { href: "/dashboard", label: "Unusual" },
  { href: "/dashboard/waze-routes", label: "Rotas" },
];

const Navbar = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="border-b px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <MobileMenuIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    <NavigationMenuItem>
                      <Cities />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Sort />
                    </NavigationMenuItem>
                    {navigationLinks.map((link) => (
                      <NavigationMenuItem key={link.label} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="py-1.5"
                          active={link.active}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <Link href="#" className="text-primary hover:text-primary/90">
                <Logo />
              </Link>
              {/* Navigation menu */}
              <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuLink
                        active={link.active}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem>
                    <Cities />
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Sort />
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-2">
            <LegendPopover />
            <ModeToggle />
          </div>
        </div>
      </header>
    </HydrationBoundary>
  );
};

export { Navbar };
