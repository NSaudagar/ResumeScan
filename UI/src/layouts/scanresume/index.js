/**
=========================================================
* Candidate Shortlisting - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Candidate Shortlisting components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";

// Candidate Shortlisting examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import FileUpload from "react-material-file-upload";
import { useState } from "react";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import UploadFiles from "./uploadfiles";
import JDUpload from "./jdupload/jdupload";
import { background } from "@chakra-ui/react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
// const [files, setFiles] = useState<File>([]);

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={12}>
        <MDBox mb={12}>

        <Grid container spacing={3} alignItems="center" >

            <Grid item >
            <Card>
              <MDBox  pt={12}
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={12}>
              Candidates

              </MDBox>
            </Card>


                <MDTypography fontWeight="bold" variant="body1">
                    Match Candidates with Job Profile
                  </MDTypography>
            <JDUpload/>
            {/* <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" /> */}
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6} sx={{ ml: "auto" }}>
          JOb Description
          <JDUpload/>

          </Grid> */}
        </Grid>


{/*         
          <Grid container spacing={3} xs={12} md={12}>
                <Card id="upload-resume" >
                  <JDUpload/>

                  <MDBox pt={3} px={2}>
                  <MDTypography variant="h6" fontWeight="bold">
                    Job Description 
                  </MDTypography>
                    <JDUpload/>

                    {/* <UploadFiles/> */}
                {/* </MDBox>
                </Card> */}

                {/* <Transactions /> */}
              {/* <BillingInformation /> */}
          {/* </Grid> */} 
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
