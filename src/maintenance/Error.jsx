import { useLocation } from "react-router-dom";

// material-ui
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

// assets
import error404 from "../assets/Error404.png";
import TwoCone from "../assets/TwoCone.png";
import { Link } from "react-router-dom";

// ==============================|| ERROR 404 - MAIN ||============================== //

function Error404() {
  const { pathname } = useLocation();

  return (
    <>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", pt: 1.5, pb: 1, overflow: "hidden" }}
      >
        <Grid item xs={12}>
          <Stack direction="row">
            <Grid item>
              <Box
                sx={{
                  width: { xs: 250, sm: 590 },
                  height: { xs: 130, sm: 300 },
                }}
              >
                <img
                  src={error404}
                  alt="root-billing"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  left: -40,
                  width: { xs: 130, sm: 390 },
                  height: { xs: 115, sm: 330 },
                }}
              >
                <img
                  src={TwoCone}
                  alt="root-billing"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h1">Page Not Found</Typography>
            <Typography
              color="textSecondary"
              align="center"
              sx={{ width: { xs: "73%", sm: "61%" } }}
            >
              No match for{" "}
              <Typography component="span" color="error">
                {pathname}
              </Typography>
              . Please check the URL and try again.
            </Typography>
            <Button component={Link} to variant="contained">
              Back To Home
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Error404;