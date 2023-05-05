import { Stack, NavLink, Badge, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Gains } from "~/components/Gains/Gains";

const routes = [
  {
    url: "/markets",
    parent: "/assets",
    label: "Markets",
    image: "market"
  },
  {
    url: "/statistics",
    parent: "/statistics",
    label: "Statistics",
    image: "statistics"
  },
  {
    url: "/positions",
    parent: "/positions",
    label: "Positions",
    image: "portfolio"
  },
  {
    url: "/profile",
    parent: "/profile",
    label: "Profile",
    image: "user"
  }
];


export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
};

type Props = {
  user: User | null;
};


export function Navigation({ user }: Props) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  async function onLogout() {
    try {
      await signOut();
      await router.push("/login");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={"md:h-full"}>
      <Image className={"cursor-pointer inline md:hidden"} src={"/images/hamburger.svg"} width={50} height={50}
             alt={"Icon"} onClick={toggleMenu} />

      <Stack color={"dark"} variant={"filled"} className={`border-r border-slate-500 border-solid px-8 md:px-16
       h-full absolute md:relative py-8 md:py-0 left-0 top-0 right-0 bottom-0 z-10 md:flex ${menuOpen ? "" : "hidden"}`}
             align={"center"}>
        <div className={"flex items-center gap-3 relative w-full justify-center"}>
          <Image className={"cursor-pointer absolute md:hidden left-2"} src={"/images/cross.svg"} width={30} height={30}
                 alt={"Icon"} onClick={toggleMenu} />
          <Gains />
          <h2 className={"text-xl font-bold"}>Tradewatch</h2>
        </div>

        <div className={"relative flex flex-col items-center mt-12"}>
          <div className={"relative h-[80px] w-[80px]"}>
            <Image className={"rounded-full shadow-all-sides"} src={user?.image || ""} fill alt={"User image"} />
          </div>

          <div className={"flex flex-col font-bold items-center relative"}>
            <Badge className="shadow-all-sides absolute bottom-[3.125rem]" color={"dark"} variant={"filled"}>
              <div className={"flex py-6"}>
                <Image className={"rounded-full mr-1"} src={"/images/dollar.svg"} height={12} width={12}
                       alt={"Dollar"} />
                <div className={"text-xs"}>2000</div>
              </div>
            </Badge>

            <div className={"mt-10"}>
              <div>John Doe</div>
            </div>
          </div>

          <div className={"mt-20"}>
            {routes.map(route => (
              <NavLink
                component={NextLink}
                key={route.url}
                href={route.url}
                label={route.label}
                icon={<span className={"w-[20px] h-[20px] relative"}>
                {colorScheme === "dark" &&<Image src={`/images/${route.image}.svg`} fill alt={"Icon"} />}
                {colorScheme === "light" && <Image src={`/images/${route.image}-dark.svg`} fill alt={"Icon"} />}
              </span>}
                className={`flex items-center gap-4 p-2 ${currentRoute.includes(route.parent) || currentRoute.includes(route.url) ? "active font-bold" : ""}`}/>
            ))}

            <NavLink
              label={"Logout"}
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onClick={onLogout}
              icon={<span className={"w-[20px] h-[20px] relative"}>
              {colorScheme === "dark" && <Image src={`/images/logout.svg`} fill alt={"Icon"} />}
              {colorScheme === "light" && <Image src={`/images/logout-dark.svg`} fill alt={"Icon"} />}
            </span>}
              className={`flex items-center gap-4 p-2`}/>
          </div>
        </div>
      </Stack>
    </div>
  );
}