import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import dateformat from "dateformat";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ total,sales } ) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Customers</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
      <Title>Total Sales</Title>
      <Typography component="p" variant="h4">
        ${sales}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {dateformat(new Date(), "yyyy-mm-dd")}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Customers
        </Link>
      </div>
    </React.Fragment>
  );
}
