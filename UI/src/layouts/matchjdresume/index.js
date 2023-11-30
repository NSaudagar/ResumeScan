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
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Input,
  VStack,
  Text,
  Code,
  Stack,
} from "@chakra-ui/react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Candidate Shortlisting components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { MuiFileInput } from 'mui-file-input'

// Candidate Shortlisting example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";

// Data
import ScanResult from "./scanresult";

function MatchJDResume() {



  const [value, setValue] = React.useState(null)


  const [, setfileURL] = useState("");
  const [selectedJD, setSelectedJD] = useState(null);
  const [selectedResumes, setSelectedResumes] = useState(null);
  const [uploadedFile, setuploadedFile] = useState({});
  const [isUploading, setisUploading] = useState(false);
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [uploadResponse, setUploadResponse] = useState(null);
  // const { columns: pColumns, rows: pRows } = ScanResult(uploadResponse);
  const datacolumns = [{ Header: "Candidate Name", accessor: "name", "width": "30%", "align": "left" },
    { Header: "budget", accessor: "budget", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "completion", accessor: "completion", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  const [datarows, setdatarows] = useState([]);



  let uploadJD = React.createRef();
  let uploadResume = React.createRef();

  // Track selected file before the upload
  const handleSelectJD = (e) => {
    const selectedJDList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selectedJDList.push(e.target.files.item(i));
    }
    setSelectedJD(selectedJDList);
  };

  const handleSelectResumes = (e) => {
    const selectedResumeList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selectedResumeList.push(e.target.files.item(i));
    }
    setSelectedResumes(selectedResumeList);
  };

  const processResponse = (data) => {
    data.forEach(element => {
      obj = {
        name: <Project name="{element.key}" />,
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            $2,500  responseData
          </MDTypography>
          
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            working
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      }

      
    });
    
      
  };

  // Upload file to server
  const handleUploadFile = async (ev) => {
    ev.preventDefault();

    setisUploading(true);
    const data = new FormData();
    // Append the file to the request body
    for (let i = 0; i < uploadJD.files.length; i++) {
      data.append("jd", uploadJD.files[i], uploadJD.files[i].name);
    }

    // for (let i = 0; i < uploadResume.files.length; i++) {
    //   formdata.append(
    //     uploadResume.files[${i}]
    //     `prerequisites[${i}].productid`,
    //     uploadResume.files[i].productid
    //   );
    // }
    for (let i = 0; i < uploadResume.files.length; i++) {
      data.append("resume_" + i, uploadResume.files[i], uploadResume.files[i].name);
    }

    data.append("resumecount", uploadResume.files.length)

    // data.append("resume", uploadResume.files)

    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setuploadProgress(Math.round((loaded / total) * 100));
        },
      };
      const response = await axios.post(
        "http://localhost:8080/api/jd/upload",
        data,
        config
      );
      const body = response.data;
      console.log(body);
      setfileURL(`http://localhost:8080/api/jd/upload/${body.filename}`);
      if (response.status === 200) {
        setisFileUploaded(true); // flag to show the uploaded file
        setisUploading(false);
        setuploadedFile(selectedJD);
        processResponse(response.data)
        // set the uploaded file to show the name
      }
    } catch (error) {
      console.error(error);
      setisUploading(false);
    }
  };




  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>

            <Card>
              <MDBox
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
                  Match Candidate Profiles with Job Description
                </MDTypography>
              </MDBox>
                <MDBox pt={3} >

                  <form onSubmit={handleUploadFile}>

                  {!isFileUploaded && (

                    <Grid container spacing={6}>
                      <Grid item xs={5} margin={6}>

                        <label
                          htmlFor="jd"
                          style={{
                            cursor: "pointer",
                            padding: 10,
                            marginBottom: 20,
                            border: "1px solid #000",
                            borderRadius: 10,
                            background: "#4682B4",
                            color: "white",
                          }}
                        >
                          Select Job Description to upload
                          <Input
                            id="jd"
                            type="file"
                            ref={(ref) => {
                              uploadJD = ref;
                            }}
                            onChange={handleSelectJD}
                            style={{ display: "none" }}
                          />
                        </label>

                        <VStack bg="#D3D3D3" p={30} borderRadius={20} marginTop={20} alignItems={"start"}>
                          <Text fontWeight="bold">Selected JD File:</Text>
                          <Flex pb={20} direction="column">
                            {selectedJD &&
                              selectedJD.map((item, index) => {
                                return (
                                  <Text key={index}>
                                    {/* <b>{index + 1}. </b> */}
                                    {item.name}
                                  </Text>
                                );
                              })}
                          </Flex>
                        </VStack>
                      </Grid>



                      <Grid item xs={5} margin={6}>


                        <label
                          htmlFor="resume"
                          style={{
                            cursor: "pointer",
                            padding: 10,
                            marginBottom: 20,
                            border: "1px solid #000",
                            borderRadius: 10,
                            background: "#4682B4",
                            color: "white",
                          }}
                        >
                          Select Resumes to upload
                          <Input
                            id="resume"
                            type="file"
                            multiple
                            ref={(refi) => {
                              uploadResume = refi;
                            }}
                            onChange={handleSelectResumes}
                            style={{ display: "none" }}
                          />
                        </label>

                        <VStack bg="#D3D3D3" p={30} borderRadius={20} marginTop={20} alignItems={"start"}>
                          <Text fontWeight="bold">Selected Resumes -</Text>
                          <Flex pb={20} direction="column">
                            {selectedResumes &&
                              selectedResumes.map((item, index) => {
                                return (
                                  <Text key={index}>
                                    <b>{index + 1}. </b>
                                    {item.name}
                                  </Text>
                                );
                              })}
                          </Flex>
                        </VStack>
                      </Grid>

                    </Grid>)}


                  {!isFileUploaded && (
                    <Grid container margin={5} spacing={6} alignItems={"center"} alignContent={"center"}>
                      <Grid item xs={4} margin={0} >
                      </Grid>
                      <Grid item xs={4} margin={0} >
                        <Box
                          as="button"
                          type="submit"
                          disabled={selectedJD ? false : true}
                          p={15}
                          textAlign="center"
                          fontWeight={600}
                          border="1px solid #000"
                          borderRadius={10}
                          bg={"#4B0082"}
                          color={"white"}
                          cursor="pointer"
                        >
                          Upload Documents & See Result
                        </Box>
                      </Grid>
                      <Grid item xs={4} margin={0} >
                      </Grid>
                    </Grid>)}


                    <Grid container spacing={6} alignItems={"center"} alignContent={"center"}>
                      <Grid item xs={3} margin={0} >
                      </Grid>


                      <Grid item xs={6} margin={0} >


                        {/* Show the upload progress */}
                        {isUploading && (
                          <>
                            <CircularProgress value={uploadProgress} thickness="12px">
                              <CircularProgressLabel>{uploadProgress}%</CircularProgressLabel>
                            </CircularProgress>
                          </>
                        )}


                        {/* Show the success message and file names after upload */}
                        {isFileUploaded && (
                            <VStack bg="azure" p={30} borderRadius={20}>
                              <Box p={10} textAlign="center" color={"green"}>
                                <h3>Below File(s) uploaded successfully</h3>
                              </Box>
                              <Flex pb={20} direction="column">
                                {uploadedFile &&
                                  uploadedFile.map((item, index) => {
                                    return (
                                      <Text key={index}>
                                        <b>{index + 1}. </b>
                                        {item.name}
                                      </Text>
                                    );
                                  })}
                              </Flex>
                            </VStack>
                        )}

                      </Grid>



                      <Grid item xs={3} margin={0} >
                      </Grid>
                    </Grid>

                  </form>
                </MDBox>
            </Card>

          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
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
                  Scan Result
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>





                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <MDBox>
                      {/* <MDTypography variant="h6" gutterBottom>
                        Projects
                      </MDTypography> */}
                      <MDBox display="flex" alignItems="center" lineHeight={0}>
                        <Icon
                          sx={{
                            fontWeight: "bold",
                            color: ({ palette: { info } }) => info.main,
                            mt: -0.5,
                          }}
                        >
                          done
                        </Icon>
                        <MDTypography variant="h6" fontWeight="regular" color="text">
                          &nbsp;<strong>3</strong> resumes scanned for SDET profile
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <MDBox color="text" px={2}>
                      {/* <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                        more_vert
                      </Icon> */}
                    </MDBox>
                    {/* {renderMenu} */}
                  </MDBox>


                  <MDBox pt={3}>
                      <DataTable
                        table={{ columns: datacolumns, rows: datarows }}
                        isSorted={true}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />

                  </MDBox>



              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MatchJDResume;
