import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const CompanyCard = (props) => {
  const { company } = props;
  const getRelativeTime = (updatedDate) => {
    const targetDate = parseISO(updatedDate);
    const currentDate = new Date();

    // Calculate the difference in days between the target date and the current date
    const daysDifference = Math.floor(
      (currentDate - targetDate) / (1000 * 60 * 60 * 24)
    );

    let formattedDistance;
    let timeAgo;

    if (daysDifference < 1) {
      // Within the same day
      formattedDistance = "today";
      timeAgo = "today";
    } else if (daysDifference < 30) {
      // Within the past 30 days
      formattedDistance = formatDistanceToNow(targetDate, { addSuffix: true });
      timeAgo = `${daysDifference} days ago`;
    } else if (daysDifference < 365) {
      // Within the past year
      const monthsAgo = Math.floor(daysDifference / 30);
      formattedDistance = `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
      timeAgo = `${monthsAgo} months ago`;
    } else {
      // More than a year ago
      const yearsAgo = Math.floor(daysDifference / 365);
      formattedDistance = `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
      timeAgo = `${yearsAgo} years ago`;
    }

    return formattedDistance;
  };

  // Example usage
  const updatedDate = "2022-05-12 18:18:50";
  const { formattedDistance, timeAgo } = getRelativeTime(updatedDate);

  const subscribers = company.subscribers.split(",");
  const initialArray = subscribers; // Just use subscribers directly

  const [uniqueCount, setUniqueCount] = useState(0);

  useEffect(() => {
    // Using the Set to get unique items
    const uniqueItems = new Set(initialArray);

    // Set the count of unique subscribers
    setUniqueCount(uniqueItems.size);
  }, [initialArray]);

  return (
    <>
    <table id="your-table-id">
    <Card id="your-table-id"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box id="your-table-id"
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={company.logo_url} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {company.company_name}
        </Typography>
        <Typography align="center" variant="body1">
          {company.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {getRelativeTime(company.updated_date)}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {uniqueCount} Subscribers
          </Typography>
          <Typography color="text.secondary" display="inline" variant="body2">
            {company.is_deleted==0 ? (<Button variant="text" color="success">
  Active
</Button>):(<Button variant="text" color="error">
  Pending
</Button>)} 
          </Typography>
        </Stack>
      </Stack>
        {/* <Typography>
        <span class="text-yellow-500 flex">
          <Button
            variant="text"
            type="button"
          >
            <EditIcon/>
          </Button>
          <Button variant="text" color="error">
            <DeleteIcon />
          </Button>
        </span>
        </Typography> */}
    </Card>
    </table>
    </>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
