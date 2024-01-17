import { BaseUrl } from "../../../../apis/contant.js";
import {
  Avatar,
  Box,
  Button,
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
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext.js";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const InvestmentUser = (props) => {
  const authcontext = useContext(AuthContext);
  const { userinvestor, setUserinvestor, loading, setLoading } = authcontext;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BaseUrl.url}userinvestment`)
      .then((res) => {
        setUserinvestor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
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

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <>
      <Typography variant="h4" style={{ color: "white" }}>
        Investment Details
      </Typography>
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
                <TableCell>Company Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Spend Amount</TableCell>
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
              {userinvestor &&
                userinvestor.map((item, index) => {


                  const formattedDate = new Date(item.created_date).toLocaleDateString();
                  const isSelected = selected.includes(item.id);
                  const inputDate = formattedDate;
                  const dateParts = inputDate.split("/");
                  const formattedDates = `${parseInt(dateParts[1],10)} ${getMonthName(parseInt(dateParts[0], 10))}, ${dateParts[2]}`;

                  function getMonthName(month) {
                    const months = [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ];
                    return months[month - 1];
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
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.company_name}</TableCell>
                      <TableCell
                        style={{
                          color: item.status == "white" ? "green" : "red",
                        }}
                      >
                        {item.status}
                      </TableCell>
                      <TableCell>{item.total_amount}</TableCell>
                      <TableCell>{formattedDates}</TableCell>
                      <TableCell>
                        <span class="text-yellow-500 flex">
                          <Button variant="text" color="error">
                            <DeleteIcon />
                          </Button>
                        </span>
                      </TableCell>
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
    </>
  );
};

// CustomersTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array,
// };