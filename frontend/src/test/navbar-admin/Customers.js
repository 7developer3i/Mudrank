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
import { useSelection } from "./hooks/use-selection";
import { Layout as DashboardLayout } from "../navbar-admin/layout";
import { CustomersTable } from "./sections/customer/customers-table.js";
import { CustomersSearch } from "./sections/customer/customers-search.js";
import { applyPagination } from "./utils/apply-pagination.js";
import { AddCustomer } from "./sections/customer/addcustomer.js";
import test1 from "../assets/products/product-1.png";
import test2 from "../assets/products/product-2.png";
import test5 from "../assets/products/product-5.png";
import test6 from "../assets/products/product-6.png";
import test7 from "../assets/products/product-7.png";
import Popop from "../navbar-admin/sections/customer/popop.jsx";
import AuthContext from "../../context/AuthContext.js";
import ReactHtmlTableToExcel from 'react-html-table-to-excel';


const now = new Date();



const Page = () => {
  const [page, setPage] = useState(0);
  const [openAddmodal, setOpenAddmodal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const authcontext = useContext(AuthContext);
  const { status, openpopmodal, setOpenpopmodal, popopmessage,records } = authcontext;
  console.log("pppp",records);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
};

  // if (status) {
  //   setOpenpopmodal(true)
  // }
  console.log(openpopmodal, "openpopmodal..");

  return (
    <>
      {openpopmodal && <Popop popopmessage={popopmessage} />}
      {openAddmodal && (
        <AddCustomer
          openAddmodal={openAddmodal}
          setOpenAddmodal={setOpenAddmodal}
        />
      )}
      {/* <Head> */}
      <title>Customers | Devias Kit</title>
      {/* </Head> */}
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
                <Typography variant="h4">
                  Customers
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
                <Button
                  onClick={() => setOpenAddmodal(!openAddmodal)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={records.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
