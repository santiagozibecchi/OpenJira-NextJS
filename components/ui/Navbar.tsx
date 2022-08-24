import { FC } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const Navbar: FC = () => {
   return (
      <AppBar position="sticky" elevation={0}>
         <Toolbar>
            <IconButton>
                <MenuOutlinedIcon />
            </IconButton>
         </Toolbar>
      </AppBar>
   );
};