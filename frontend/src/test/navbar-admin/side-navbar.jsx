import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useTheme } from "@emotion/react";
import devias_kit_pro from "../assets/devias-kit-pro.png";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";

export const SideNavbar = () => {
  const authcontext = useContext(AuthContext);
  const { nameStore, superadminrole } = authcontext;
  const adminName = Cookies.get("admin_name")
  // console.log("aaaaaaabbbbbbb",adminName);

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          // component={NextLink}
          href="/"
          sx={{
            display: "inline-flex",
            height: 32,
            width: 32,
          }}
        >
          <svg
            fill="none"
            height="100%"
            viewBox="0 0 24 24"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity={0.16}
              d="M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z"
              fill={"#6366F1"}
            />
            <path
              d="M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z"
              fill={"#6366F1"}
            />
          </svg>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            p: "12px",
          }}
        >
          <div>
            <Typography color="inherit" variant="subtitle1">
              {adminName}
            </Typography>
          </div>
          <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
            <ChevronUpDownIcon />
          </SvgIcon>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {items.map((item) => {
            const active = item.path ? "" === item.path : false;
            {/* console.log(active, item.path); */}

            // Check if superadminrole is present and set to 'superadmin' and id is not 8
            // const showItem = superadminrole === "superadmin" || item.id !== 8;

            // Conditionally render the item based on the showItem condition
            // if (showItem) {
              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            // } else {
            //   return null;
            // }
          })}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Typography color="neutral.100" variant="subtitle2">
          Need more features?
        </Typography>
        <Typography color="neutral.500" variant="body2">
          Check out our Pro solution template.
        </Typography>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            mx: "auto",
            width: "160px",
            "& img": {
              width: "100%",
            },
          }}
        >
          <img alt="Go to pro" src={devias_kit_pro} />
        </Box>
        <Button
          component="a"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowTopRightOnSquareIcon />
            </SvgIcon>
          }
          fullWidth
          href="https://material-kit-pro-react.devias.io/"
          sx={{ mt: 2 }}
          target="_blank"
          variant="contained"
        >
          Pro Live Preview
        </Button>
      </Box>
    </Box>
  );
};
