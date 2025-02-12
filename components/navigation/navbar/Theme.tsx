"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Theme = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;

// "use client";

// import Image from "next/image";
// import { useTheme } from "next-themes";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export default function ThemeToggle() {
//   const { setTheme, resolvedTheme: currentTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           size="icon"
//           variant={"outline"}
//           className="cursor-pointer outline-none focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200"
//         >
//           {currentTheme === "light" && (
//             <Image
//               src={"/icons/sun.svg"}
//               width={30}
//               height={30}
//               alt="light mode logo"
//               priority
//               loading="eager"
//               className="active-theme"
//             />
//           )}
//           {currentTheme === "dark" && (
//             <Image
//               src={"/icons/moon.svg"}
//               width={30}
//               height={30}
//               alt="dark mode logo"
//               priority
//               loading="eager"
//               className="active-theme"
//             />
//           )}
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           <Image
//             src={"/icons/sun.svg"}
//             width={20}
//             height={20}
//             alt="light mode logo"
//             priority
//             loading="eager"
//             className="invert-colors"
//           />
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           <Image
//             src={"icons/moon.svg"}
//             width={20}
//             height={20}
//             alt="light mode logo"
//             priority
//             loading="eager"
//           />
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           <Image
//             src={"/icons/computer.svg"}
//             width={20}
//             height={20}
//             alt="light mode logo"
//             priority
//             loading="eager"
//           />
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
