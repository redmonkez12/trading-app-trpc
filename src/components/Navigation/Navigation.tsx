import NextLink from "next/link";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";
import Image from "next/image";
import { api } from "~/utils/api";

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

  return (
    <Stack className={"w-[250px] self-start"}>
      <h2 className={"font-bold text-white text-center"}>{currentUser?.name || ""}</h2>

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
