import NextLink from "next/link";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";
import Image from "next/image";

const routes = [
  {
    url: "/markets",
    parent: "/assets",
    label: "Markets",
    image: "market.svg",
  },
  {
    url: "/profile",
    parent: "/profile",
    label: "Profile",
    image: "user.svg",
  },
];

export function Navigation() {
  const router = useRouter();
  const currentRoute = router.pathname;
  console.log(currentRoute);

  return (
    <Stack className={"w-[250px] self-start"}>
      {routes.map(route => (
        <NextLink
          key={route.url}
          href={route.url}
          className={`flex items-center gap-4 bg-[#339af0] text-white p-2 ${currentRoute.includes(route.parent) || currentRoute.includes(route.url) ? "active font-bold" : ""}`}>
          <span className={"w-[20px] h-[20px] relative"}>
            <Image src={`/images/${route.image}`} fill alt={"Icon"} />
          </span>
          <span>{route.label}</span>
        </NextLink>
      ))}
    </Stack>
  );
}
