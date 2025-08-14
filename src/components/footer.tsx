import React from "react";
import { Box, Link, Typography } from "@mui/material";



const Footer: React.FC = () => {
    
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 2,
        borderTop: "1px solid #ccc", 
        display: "flex",
        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Work in progress by{" "}
        <Link
          href="https://ca.linkedin.com/in/j44dge"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michael
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        View source:{" "}
        <Link
          href="https://github.com/j44dge/react-quiz-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
