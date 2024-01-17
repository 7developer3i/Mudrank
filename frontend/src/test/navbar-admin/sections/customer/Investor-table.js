import PropTypes from "prop-types";
import { format } from "date-fns";
import { BaseUrl } from "../../../../apis/contant.js";
import DeleteIcon from "@mui/icons-material/Delete";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import { Scrollbar } from './components/scrollbar.js';
import { getInitials } from "./utils/get-initials.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext.js";
import Cookies from "js-cookie";
import AddInvestor from "./add-investor.js";
import Popop from "./popop.jsx";


export const CustomersTable = (props) => {
  const authcontext = useContext(AuthContext);
  const [mergeData, setMergeData] = useState([]);
  const [selectvalue, setSelectvalue] = useState("");
  const [id, setId] = useState("");
  const {
    investorData,
    setInvestorData,
    adminrecords,
    setAdminRecords,
    adminsearch,
    setAdminsearch,
    usertableData,
    setUsertableData,
    loading, superadmin, setSuperadmin,
    setLoading, setOpenpopmodal, superadminrole,
    openpopmodal, setOpenaddadminmodal,
    status, setStatus,
    popopmessage, setPopopmessage
  } = authcontext;
  const token = Cookies.get("admin_token");
  const { adminid } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // console.log(superadminrole, "iiooo");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BaseUrl.url}Investors?token=${token}&adminid=${adminid}`)
      .then((res) => {
        console.log("investorData res", res.data);
        // setInvestorData(res.data);
        setAdminRecords(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });

    axios
      .get(`${BaseUrl.url}userData`)
      .then((res) => {
        console.log("user res", res.data);
        setUsertableData(res.data.data);
        setSuperadmin(res.data.role)
      })
      .catch((err) => {
        console.log("err", err);
      });


  }, []);

  useEffect(() => {
    const combinedData = [...adminrecords, ...usertableData];
    setMergeData(combinedData);
  }, [adminrecords, usertableData]);



  // useEffect(() => {
  const editfunction = (email) => {
    // console.log("edit func...", email, selectvalue);
    console.log("ssss",selectvalue);
      axios
        .put(`${BaseUrl.url}updateRole`, { role: selectvalue, email:email })
        .then((res) => {
          console.log("edit data res", res.data);
          setStatus(res.data.status)
          setPopopmessage(res.data.message)
          setOpenpopmodal(true)
          setTimeout(() => {
            setOpenpopmodal(false)
          }, 2000);
          setOpenaddadminmodal(false)
          console.log("resstatus investor", res.data.status, res.data.message);
        })
        .catch((err) => {
          console.log("err", err);
        });

  }
  // }, [id, selectvalue,popopmessage]);

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    selected = [],
  } = props;

  // console.log(mergeData, "mergeData..");


  const filteredList =
    mergeData.length > 0 &&
    mergeData.filter(
      (item) =>
        item.full_name?.toLowerCase().includes(adminsearch.toLowerCase()) ||
        item.username?.toLowerCase().includes(adminsearch.toLowerCase())
    );
    console.log(filteredList);

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const handleDelete = (email) => {
    // console.log("email", email);

    axios.put(`${BaseUrl.url}updateInvestorUser`, { "email": email }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err, "err");
    })
  }

  return (
    <>
      {openpopmodal && <Popop popopmessage={popopmessage} />}
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
                <TableCell>Name</TableCell>
                {/* <TableCell>Phone Number</TableCell> */}
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Action</TableCell>
                {/* <TableCell>Created_date</TableCell> */}
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
                filteredList.filter((item) => superadminrole === 'superadmin' || item.role !== 'superadmin').slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  // // const showItem = superadminrole === "admin" || item.role !== superadmin;
                  // console.log(showItem,"showitem");
                  // console.log(item.id,"ppoooo");
                  const formatedDate = new Date(
                    item.created_at
                  ).toLocaleDateString();
                  const formatedDatetwo = new Date(
                    item.created_date
                  ).toLocaleDateString();
                  const isSelected = selected.includes(item.id);
                  // console.log(formatedDate, formatedDatetwo, "ooooooooooooooooo")

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
                            {item.full_name ? item.full_name : item.username}
                          </Typography>
                        </Stack>
                      </TableCell>
                      {/* <TableCell>{item.phone_number}</TableCell> */}
                      <TableCell>{item.email == null ? 'Not Added' : item.email}</TableCell>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{item.role}</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          onChange={(e) => {
                            setSelectvalue(e.target.value);
                            editfunction(item.email);
                          }}
                        >
                          {superadminrole === 'superadmin' ? (
                            [
                              <MenuItem key="admin" value="Admin">
                                Admin
                              </MenuItem>,
                              <MenuItem key="superadmin" value="SuperAdmin">
                                SuperAdmin
                              </MenuItem>,
                              <MenuItem key="customer" value="Customer">
                                Customer
                              </MenuItem>,
                              <MenuItem key="investor" value="Investor">
                                Investor
                              </MenuItem>,
                            ]
                          ) : superadminrole === 'admin' ? (
                            [
                              <MenuItem key="admin" value="Admin">
                                Admin
                              </MenuItem>,
                              <MenuItem key="customer" value="Customer">
                                Customer
                              </MenuItem>,
                              <MenuItem key="investor" value="Investor">
                                Investor
                              </MenuItem>,
                            ]
                          ) : (
                            // Provide a default case with a single array element
                            <MenuItem key="defaultRole" value="DefaultRole">
                              Default Role
                            </MenuItem>
                          )}
                        </Select>

                      </FormControl>


                      <TableCell
                        style={{
                          color: item.status == "completed" ? "green" : "red",
                        }}
                      >
                        {item.status}
                      </TableCell>
                      <TableCell>
                        {formatedDate == 'Invalid Date' ? formatedDatetwo : formatedDate}
                      </TableCell>
                      <TableCell>
                        <span class="text-red-500 flex" onClick={() => handleDelete(item.email)}>


                          <DeleteIcon />
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mergeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
