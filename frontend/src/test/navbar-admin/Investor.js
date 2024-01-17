import { useCallback, useContext, useMemo, useState } from "react";
// import Head from 'next/head';
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "./hooks/use-selection.js";
// import { Layout as DashboardLayout } from '../navbar-admin/layout';
import { CustomersTable } from "./sections/customer/Investor-table.js";
import { CustomersSearch } from "./sections/customer/Investor-search.js";

import { applyPagination } from "./utils/apply-pagination.js";
import test1 from "../assets/products/product-1.png";
import test2 from "../assets/products/product-2.png";
import test5 from "../assets/products/product-5.png";
import test6 from "../assets/products/product-6.png";
import test7 from "../assets/products/product-7.png";
import {AddInvestor} from "./sections/customer/add-investor.js";
import AuthContext from "../../context/AuthContext.js";
import Popop from "../navbar-admin/sections/customer/popop.jsx";
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { AddCustomer } from "./sections/customer/addcustomer.js";

const now = new Date();

const Investor = () => {
  const authcontext = useContext(AuthContext);
  const { openaddadminmodal, setOpenaddadminmodal ,status,popopmessage,setOpenpopmodal,openpopmodal} = authcontext;
  const [openAddmodal, setOpenAddmodal] = useState(false);


  return (
    <>
   {openpopmodal && <Popop popopmessage={popopmessage}/>}
    {openaddadminmodal && <AddInvestor/>}
    {openAddmodal && (
        <AddCustomer
          openAddmodal={openAddmodal}
          setOpenAddmodal={setOpenAddmodal}
        />)}
      <title>Customers | Devias Kit</title>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4" style={{ color: "white" }}>
                  Admin
                </Typography>

                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  {/* <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button> */}
                  <ReactHtmlTableToExcel
        id="export-button"
        className="btn btn-info"
        table="your-table-id"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export"
      />

                </Stack>
              </Stack>
              <div>
                <Button  onClick={()=>setOpenaddadminmodal(!openaddadminmodal)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add Customer
                </Button>
                &nbsp;&nbsp;&nbsp;
              {/* </div>
              <div> */}
              <Button
                  onClick={() => setOpenAddmodal(!openAddmodal)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add Investor
                </Button>
                </div>
            </Stack>
            <CustomersSearch />

            <CustomersTable
            />
          
          </Stack>
        </Container>
      </Box>
    </>
  );
};

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Investor;
