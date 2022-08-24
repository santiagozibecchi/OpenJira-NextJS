import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import { Navbar, SideBar } from "../ui";

// sx es lo mismo que style pero este tiene acceso al theme

interface Props {
   title?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({
   title = "OpenJira",
   children,
}) => {
   return (
      <Box sx={{ flexFlow: 1 }}>
         <Head>
            <title>{title}</title>
         </Head>

         <Navbar />
         <SideBar />

         <Box sx={{ padding: "10px 20px" }}>{children}</Box>
      </Box>
   );
};
