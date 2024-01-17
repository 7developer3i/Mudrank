// import Head from 'next/head';
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "../../navbar-admin/layout.js";
import { CompanyCard } from "./sections/companies/company-card.js";
import { CompaniesSearch } from "./sections/companies/companies-search.js";
import test1 from "../../assets/logos/logo-dropbox.png";
import test2 from "../../assets/logos/logo-medium.png";
import test5 from "../../assets/logos/logo-slack.png";
import test6 from "../../assets/logos/logo-lyft.png";
import test7 from "../../assets/logos/logo-github.png";
import test8 from "../../assets/logos/logo-squarespace.png";
import { BaseUrl } from "../../../apis/contant.js";
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext.js";
import "./loader.css";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

const Page = () => {
  const authcontext = useContext(AuthContext);
  const {
    companyrecords,
    setCompanyRecords,
    companysearch,
    loading,
    setLoading,
  } = authcontext;

  useEffect(() => {
    const fetchStartupsData = () => {
      setLoading(true);
      axios
        .get(`${BaseUrl.url}auth/admin-startup-data`)
        .then((res) => {
          console.log("ress admin-startup-data", res.data.result);
          setCompanyRecords(res.data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    fetchStartupsData();
  }, []);

  const filterData =
    companyrecords.length > 0 &&
    companyrecords.filter((item) =>
      item.company_name?.toLowerCase().startsWith(companysearch.toLowerCase())
    );

  return (
    <>
      {/* <Head> */}
      <title>Companies | Devias Kit</title>
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
                <Typography variant="h4" style={{ color: "white" }}>
                  Companies
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
                  {/* <ReactHtmlTableToExcel
                    id="export-button"
                    className="btn btn-info"
                    table="your-table-id"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export"
                  /> */}
                  <ReactHtmlTableToExcel
        id="export-button"
        className="btn btn-info"
        table="your-table-id"
        filename="exported_data"
        sheet="Sheet 1"
        buttonText="Export to Excel"
      />
                </Stack>
              </Stack>
              <div>
                <Button
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
            <CompaniesSearch />
            <Grid container spacing={3}>
              {loading && (
                <div
                  id="loading-overlay"
                  class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60"
                >
                  <svg
                    class="animate-spin h-8 w-8 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>

                  <span class="text-white text-3xl font-bold">Loading...</span>
                </div>
              )}
              {filterData &&
                filterData.map((company) => (
                  <Grid xs={12} md={6} lg={4} key={company.id}>
                    <CompanyCard company={company} />
                  </Grid>
                ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Pagination count={3} size="small" /> */}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
