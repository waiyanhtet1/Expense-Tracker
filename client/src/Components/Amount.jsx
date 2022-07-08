import {
  Card,
  CardContent,
  Divider,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { numberWithCommas } from "../utilis/format";

function Amount() {
  const { transcations } = useContext(GlobalContext);
  const amount = transcations.map((t) => t.amount);
  const total = amount.reduce((prev, current) => prev + current, 0).toFixed(2);

  const income = amount
    .filter((item) => item > 0)
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2);

  const expense = (
    amount
      .filter((item) => item < 0)
      .reduce((prev, current) => prev + current, 0) * -1
  ).toFixed(2);

  return (
    <>
      <Grid container align="center" sx={{ mt: 7 }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card
            sx={{
              width: 300,
              mt: 3,
            }}
          >
            <CardContent>
              <Typography color="cardFontColor" variant="h6">
                Your Balance
              </Typography>
              <Typography color="cardFontColor" variant="balance">
                $ {numberWithCommas(total)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <Typography color="success.main" variant="body1" sx={{ mr: 5 }}>
                  Income <br />
                  +$ {numberWithCommas(income)}
                </Typography>

                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography color="error.main" variant="body1" sx={{ ml: 5 }}>
                  Expense <br /> -$ {numberWithCommas(expense)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Amount;
