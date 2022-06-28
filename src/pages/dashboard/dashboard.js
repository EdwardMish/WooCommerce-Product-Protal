import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Chart from "./chart";
import Customers from "./customers";
import Orders from "./order";
import { reportService } from "../../services/reportService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  function createData(date, amount) {
    return { date, amount };
  }

  const [salesData, setSalesData] = useState([]);
  const [total, setTotalCustomers] = useState(0);
  const [sales, setSales] = useState(0);
 
  useEffect(() => {
    const data = [];
    reportService.getSales().then((res) => {
      const totalSales = res.data[0].totals;
      const total = res.data[0].total_sales;
      const totalCustomers = res.data[0].total_customers;
      let weekly_sales = 0.0;
      setSales(total)
      setTotalCustomers(totalCustomers);
      for (let i = 0; i < Object.keys(totalSales).length; i++) {
        weekly_sales +=  parseFloat(Object.values(totalSales)[i].sales);
      
        if (i % 7 === 0) {
         
          data.push(createData(
              Object.keys(totalSales)[i],
              weekly_sales
              // parseFloat(100 * Math.sin(i))
            ));
            weekly_sales = 0.0;
        }
        
      }
      setSalesData(data);
    });
  }, []);

 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart data={salesData} />
              </Paper>
            </Grid>
            {/* Recent Customers */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Customers total={total} sales = {sales} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
