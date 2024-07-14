export const logoStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  m: "2rem 0 4rem",
  alignItems: "center",
};

export const frameStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
};

export const linkStyle = {
  color: "#545665",
  textDecoration: "none",
};

export const textFieldStyle = {
  width: "20rem",
  mt: "2rem",
  backgroundColor: "#ecf0f0",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
  borderRadius: "0.5rem",
  transition: "0.3s",
  "&:hover": {
    boxShadow:
      "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
  },
};
