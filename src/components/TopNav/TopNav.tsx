import { Group, Button } from "@mantine/core";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div>
      <div className={"flex justify-between items-center"}>
        <Image className={"cursor-pointer inline md:hidden"} src={"/images/hamburger.svg"} width={50} height={50}
               alt={"Icon"} onClick={toggleMenu} />

        {menuOpen ? null : (
          <div className={"flex items-center gap-4 flex-1 justify-end"}>
            <NextLink href={"/login"}>Log in</NextLink>

            <Button
              variant={"outline"}
              component={NextLink}
              href={"#"}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>

      <Group
        className={`w-full px-10 md:px-20 ${menuOpen ? "" : "hidden"} fixed justify-center md:relative left-0
        top-0 right-0 bottom-0 md:flex flex-col md:flex-row bg-[#1A1B1E] z-10`}>
        <Image className={"cursor-pointer absolute md:hidden left-8 top-8"} src={"/images/cross.svg"} width={30} height={30} alt={"Icon"} onClick={toggleMenu} />

        <Button component={NextLink} href={"/"}>
          <div className={"flex items-center gap-3"}>
            <Image src={"/images/gains.svg"} height={30} width={30} alt={"Icon"} />
            <h2 className={"text-xl font-bold text-zinc-400"}>Tradewatch</h2>
          </div>
        </Button>

        <div className={"flex flex-col md:flex-row items-center justify-end gap-10 md:gap-20 flex-grow-0 mt-6 md:mt-0 md:flex-1"}>
          <div className={"flex items-center gap-12 order-1"}>
            <NextLink href={"#"}>Features</NextLink>
            <NextLink href={"#"}>Markets</NextLink>
            <NextLink href={"#"}>Blog</NextLink>
          </div>

          <div className={"hidden md:flex items-center gap-4"}>
            <NextLink href={"/login"}>Log in</NextLink>
            <Button
              variant={"outline"}
              component={NextLink}
              href={"#"}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Group>
    </div>
  );
}