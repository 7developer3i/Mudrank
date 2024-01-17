import PropTypes from "prop-types";
import { format } from "date-fns";
import { BaseUrl } from "../../../../apis/contant.js";

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
// import { Scrollbar } from './components/scrollbar.js';
import { getInitials } from "./utils/get-initials.js";
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext.js";
import Cookies from "js-cookie";

export const CustomersTable = (props) => {

  const authcontext = useContext(AuthContext);
  const {
    kycData,
    setKycData,
    kycrecords,
    setKycRecords,
    kycsearch,
    setKycSearch,
    loading,
    setLoading,
  } = authcontext;
  
  const token = Cookies.get("admin_token");
  const adminId = Cookies.get("admin_Id");

  useEffect(() => {
    const fetchKycDocs = () => {
      setLoading(true);
      axios
        .get(`${BaseUrl.url}KycData?token=${token}&adminid=${adminId}`)
        .then((res) => {
          setKycRecords(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    fetchKycDocs();
  }, []);

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  // useEffect(() => {
  //   const filteredList =
  //     kycrecords &&
  //     kycrecords.filter((item) => item.full_name.includes(kycsearch));
  //   setKycRecords(filteredList);
  // }, [kycsearch]);

  const filteredList =
  kycrecords.length > 0 &&
  kycrecords.filter((item) => item.full_name?.toLowerCase().startsWith(kycsearch.toLowerCase()));


  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      {/* <Scrollbar> */}
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Date Of BIrth</TableCell>
              <TableCell>Pancard Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
            {filteredList &&
              filteredList.map((item, index) => {
                const fromatedDate = new Date(
                  item.created_date
                ).toLocaleDateString();
                const isSelected = selected.includes(item.id);
                {
                  /* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */
                }

                return (
                  <TableRow hover key={item.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(item.id);
                          } else {
                            onDeselectOne?.(item.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                        <Typography
                          variant="subtitle2"
                          style={{ color: "white" }}
                        >
                          {item.full_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.phone_number}</TableCell>
                    <TableCell>{item.date_of_birth}</TableCell>
                    <TableCell>{item.pancard_number}</TableCell>
                    <TableCell
                      style={{
                        color: item.status == "valid" ? "green" : "red",
                      }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell>{fromatedDate}</TableCell>
                    <span class="text-yellow-500 flex">
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Delete
                      </button>
                    </span>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
      {/* </Scrollbar> */}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
