/**
=========================================================
* Candidate Shortlisting - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 CandidateBrewers (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Candidate Shortlisting helper functions
import pxToRem from "assets/theme/functions/pxToRem";

// Candidate Shortlisting base styles
import colors from "assets/theme/base/colors";
import boxShadows from "assets/theme/base/boxShadows";
import borders from "assets/theme/base/borders";

const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.md,
    },
  },
};

export default popover;
