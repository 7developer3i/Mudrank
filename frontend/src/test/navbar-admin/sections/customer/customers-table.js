import PropTypes from "prop-types";
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
import { getInitials } from "./utils/get-initials.js";
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext.js";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";

export const CustomersTable = (props) => {
  const authcontext = useContext(AuthContext);
  const {
    adminid,
    searchTerm,
    setCustomerData,
    records,
    setRecords,
    openEditcustomer,
    setOpenEditcustomer,
    loading,
    setLoading,
  } = authcontext;
  const token = Cookies.get("admin_token");
  const AdminId = Cookies.get("admin_Id");
  const shapeStyles = { bgcolor: "primary.main", width: 40, height: 40 };
  const shapeCircleStyles = { borderRadius: "50%" };
  const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
  );

  useEffect(() => {
    const fetchCustomersData = () => {
      setLoading(true);
      axios
        .get(`${BaseUrl.url}Customers?token=${token}&adminid=${AdminId}`)
        .then((res) => {
          console.log("Customer res", res.data);
          setRecords(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    fetchCustomersData();
  }, []);

  const filterData =
    records.length > 0 &&
    records.filter((item) =>
      item.full_name?.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  console.log(filterData, "......70");
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
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
      <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table id="your-table-id">
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
                <TableCell>Active</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>updated_at</TableCell>
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
              {filterData.length > 0 &&
                filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => {
                  const formattedDate = new Date(
                    customer.updated_at
                  ).toLocaleDateString();
                  return (
                    <TableRow
                      hover
                      key={customer.id}
                    // selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          // checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(customer.id);
                            } else {
                              onDeselectOne?.(customer.id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">
                            {customer.is_logged_out == 1 ? (
                              <Badge
                                color="success"
                                overlap="circular"
                                badgeContent=" "
                                variant="dot"
                              >
                                {circle}
                              </Badge>
                            ) : (
                              <Badge
                                color="error"
                                overlap="circular"
                                badgeContent=" "
                                variant="dot"
                              >
                                {circle}
                              </Badge>
                            )}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
<Typography
                            variant="subtitle2"
                            style={{ color: "white" }}
                          >
                        {customer.full_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell
                        style={{
                          color:
                            customer.status == "completed" ? "green" : "red",
                        }}
                      >
                        {customer.status}
                      </TableCell>
                      <TableCell>{customer.phone_number}</TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>
                        <span class="text-yellow-500 flex">
                          <Button
                            variant="text"
                            onClick={() =>
                              setOpenEditcustomer(!openEditcustomer)
                            }
                            type="button"
                          >
                            <EditIcon />
                          </Button>
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
