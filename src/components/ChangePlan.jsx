import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, createTheme } from '@mui/material';
import ChangePlanXs from "./ChangePlanXs";
import { useSelector } from "react-redux";
import CheckoutButton from "../components/CheckoutButton";

export default function ChangePlan() {
  const navigate = useNavigate();
  const theme = createTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('lg'));
  const { membership } = useSelector((state) => state.auth);

  const PREMIUM_PRICE_ID = "price_1PnABkP3dSOC4uCmWjEsUf3p";  

  return (
    <Box sx={{ width: "100wh", height: "100vh" }}>
      {isXs ? (
        // WINDOW SIZE SMALLER THAN LG
        <ChangePlanXs />
      ) : (
        // WINDOW SIZE LARGER THAN LG
        <Box
          id="membership"
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            padding: "2rem",
            pl: { xs: "0", sm: "4.5rem", md: "10rem" },
            gap: { lg: "5rem" },
          }}
        >
          <Card
            size="lg"
            variant="outlined"
            sx={{ height: "30rem", width: "20rem" }}
          >
            <Chip size="sm" variant="outlined" color="neutral">
              Standard
            </Chip>
            <Typography level="h2">Basic</Typography>
            <Divider inset="none" />
            <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Access to exclusive blogs{" "}
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Development monitoring in profiles{" "}
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Cancel anytime
              </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
              <Typography level="title-lg" sx={{ mr: "auto" }}>
                Free
              </Typography>
            </CardActions>
          </Card>

          <Card
            variant="solid"
            color="neutral"
            invertedColors
            sx={{ bgcolor: "neutral.900", height: "30rem", width: "20rem" }}
          >
            <Chip size="sm" variant="outlined" color="neutral">
              PRO
            </Chip>
            <Typography level="h2">Premium</Typography>
            <Divider inset="none" />
            <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Access to exclusive blogs{" "}
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Monthly workout plans{" "}
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Development monitoring in profiles{" "}
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Cancel anytime
              </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
              <Typography level="title-lg" sx={{ mr: "auto" }}>
                20${" "}
                <Typography fontSize="sm" textColor="text.tertiary">
                  / month
                </Typography>
              </Typography>
              {membership === "Premium" ? (
                <Button variant="soft" color="neutral">
                  Cancel
                </Button>
              ) : (
                <CheckoutButton priceId={PREMIUM_PRICE_ID} />
              )}
            </CardActions>
          </Card>
        </Box>
      )}
    </Box>
  );
}
