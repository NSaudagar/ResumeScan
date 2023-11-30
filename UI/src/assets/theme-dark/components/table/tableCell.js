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

// Candidate Shortlisting base styles
import borders from "assets/theme-dark/base/borders";
import colors from "assets/theme-dark/base/colors";

// Candidate Shortlisting helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { borderWidth } = borders;
const { light } = colors;

const tableCell = {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};

export default tableCell;
