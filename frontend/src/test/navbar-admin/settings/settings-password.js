import { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../../../apis/contant";
import AuthContext from "../../../context/AuthContext";
import Popop from "../sections/customer/popop";

export const SettingsPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordtwo, setPasswordtwo] = useState("");
  const authcontext = useContext(AuthContext);
  const { adminid, popopmessage, setPopopmessage, openpopmodal, setOpenpopmodal } = authcontext;
  
  const handleEdit = (e) => {
    e.preventDefault();
    if (password=="" || passwordtwo=="") {
      alert("please enter password for update")
      return
    }
    if (password !== passwordtwo) {
      alert("password doesn't match");
      return
    }
    axios
      .put(`${BaseUrl.url}auth/change-password/${adminid}`, {
        "newPassword": passwordtwo,
      })
      .then((res) => {
        console.log("reess", res.data);
        setPopopmessage(res.data.message)
        if (res.data.status) {
          setOpenpopmodal(true)
          setTimeout(() => {
            setOpenpopmodal(false)
          }, 2000);

        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      {openpopmodal && <Popop popopmessage={popopmessage} />}
      <form>
        <Card>
          <CardHeader subheader="" title="Password" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 400 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                value={password}
              />
              <TextField
                fullWidth
                label="Password (Confirm)"
                name="confirm"
                onChange={(e) => setPasswordtwo(e.target.value)}
                type="text"
                value={passwordtwo}
              />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" style={{backgroundColor:"#85FFFF"}} onClick={(e) => handleEdit(e)}>
              Update
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
