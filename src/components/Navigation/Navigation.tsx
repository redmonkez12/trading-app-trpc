import { useState } from "react";
import NextLink from "next/link";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { api } from "~/utils/api";

const routes = [
  {
    url: "/markets",
    parent: "/assets",
    label: "Markets",
    image: "market.svg",
  },
  {
    url: "/statistics",
    parent: "/statistics",
    label: "Statistics",
    image: "statistics.svg",
  },
  {
    url: "/profile",
    parent: "/profile",
    label: "Profile",
    image: "user.svg",
  },
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
  const { data: currentUser } = api.users.getAll.useQuery({ userId: user?.id || ""} );
  const router = useRouter();
  const currentRoute = router.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  async function onLogout() {
    try {
      await signOut();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={"flex items-start w-full md:w-[320px]"}>
      <Image className={"cursor-pointer inline md:hidden"} src={"/images/hamburger.svg"} width={50} height={50} alt={"Icon"} onClick={toggleMenu} />

      <Stack className={`self-start ${menuOpen ? "" : "hidden"}
      md:flex absolute bg-[#1A1B1E] md:relative flex-1 px-8
      h-screen md:h-auto left-0 top-0 right-0 bottom-0 z-10`}>
        <div className={"flex items-center"}>
          <Image className={"cursor-pointer md:hidden"} src={"/images/cross.svg"} width={30} height={30} alt={"Icon"} onClick={toggleMenu} />
          <h2 className={"font-bold text-white text-center flex-1"}>{currentUser?.name || ""}</h2>
        </div>

        {routes.map(route => (
          <NextLink
            key={route.url}
            href={route.url}
            onClick={toggleMenu}
            className={`flex items-center gap-4 bg-[#339af0] text-white p-2 ${currentRoute.includes(route.parent) || currentRoute.includes(route.url) ? "active font-bold" : ""}`}>
          <span className={"w-[20px] h-[20px] relative"}>
            <Image src={`/images/${route.image}`} fill alt={"Icon"} />
          </span>
          <span>{route.label}</span>
          </NextLink>
        ))}

        <NextLink
          href={"/login"}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onClick={onLogout}
          className={`flex items-center gap-4 bg-[#339af0] text-white p-2`}>
           <span className={"w-[20px] h-[20px] relative"}>
            <Image src={`/images/logout.svg`} fill alt={"Icon"} />
          </span>
          <span>Logout </span>
        </NextLink>
      </Stack>
    </div>
  );
}
