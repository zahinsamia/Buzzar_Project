// src/components/layout/Footer.jsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Buzzar. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
