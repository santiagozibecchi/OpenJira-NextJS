import { FC, useContext } from "react";
import {
   Divider,
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { UIContext } from "../../context/ui";

// Box -> es como un div pero que nos permite utilizar el propio tema que tenems en la app

const menuItems: string[] = ["Inbox", "Started", "SendEmail", "Drafts"];

export const SideBar: FC = () => {
   const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

   return (
      <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
         <Box sx={{ width: "250px" }}>
            <Box sx={{ padding: "5px 10px" }}>
               <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Menu
               </Typography>
               <List>
                  {menuItems.map((text, index) => (
                     <ListItem button key={text}>
                        <ListItemIcon>
                           {index % 2 ? (
                              <InboxOutlinedIcon />
                           ) : (
                              <MailOutlineOutlinedIcon />
                           )}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItem>
                  ))}
               </List>

               <Divider />

               <List>
                  {menuItems.map((text, index) => (
                     <ListItem button key={text}>
                        <ListItemIcon>
                           {index % 2 ? (
                              <InboxOutlinedIcon />
                           ) : (
                              <MailOutlineOutlinedIcon />
                           )}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItem>
                  ))}
               </List>
            </Box>
         </Box>
      </Drawer>
   );
};
