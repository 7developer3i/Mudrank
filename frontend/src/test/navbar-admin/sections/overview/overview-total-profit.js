import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../../apis/contant.js";
import AuthContext from "../../../../context/AuthContext.js";

export const OverviewTotalProfit = (props) => {
  const authcontext = useContext(AuthContext);
  const { totalamount, setTotalamount } = authcontext;
  const [formattedAmount, setFormattedAmount] = useState('');


  const { value, sx } = props;

  useEffect(() => {
    axios
      .get(`${BaseUrl.url}totalAmount`)
      .then((res) => {
        console.log("amount res", res.data);
        setTotalamount(res.data);
        const formattedAmount = formatAmount(res.data.totalAmount);
        setFormattedAmount(formattedAmount);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  function formatAmount(amount) {
    if (amount >= 1000) {
      const formattedAmount = (amount / 1000).toFixed(0);
      return `${formattedAmount}k`;
    } else {
      return amount.toString();
    }
  }

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Profit
            </Typography>
            <Typography variant="h4" color={"#000000"}>
              {formattedAmount}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
