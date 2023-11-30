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
import { Margin } from "@mui/icons-material";

function JDUpload() {
  const [, setfileURL] = useState("");
  const [selectedJD, setSelectedJD] = useState(null);
  const [selectedResumes, setSelectedResumes] = useState(null);
  const [uploadedFile, setuploadedFile] = useState({});
  const [isUploading, setisUploading] = useState(false);
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);

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
      data.append("resume_"+i, uploadResume.files[i], uploadResume.files[i].name);
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
        setuploadedFile(selectedJD); // set the uploaded file to show the name
      }
    } catch (error) {
      console.error(error);
      setisUploading(false);
    }
  };

  return (
    // <Flex
    //   align="center"
    //   direction="column"
    //   px={20}
    //   bg={"#9DD2F2"}
    //   minH={"100vh"}
    // >
      <Stack
        spacing={4}
        align="center"
        // bg={"#F2F2F2"}
        p={20}
        my={20}
        borderRadius={20}
        minH={"90vh"}
      >
        {/* <Box w={500} textAlign="center" px={10}>
          <Text fontWeight="bold" color="gray.700">
            Please Select Job Description
          </Text>
        </Box> */}
        {/* Upload file form */}
        <form onSubmit={handleUploadFile}>
          <Flex justify="center" align="center" direction="row">

          <div style={{width:"500px", Margin:"50px"}}>
              <label
                htmlFor="jd"
                style={{
                  cursor: "pointer",
                  padding: 10,
                  marginBottom: 20,
                  border: "1px solid #000",
                  borderRadius: 10,
                  background: "#698DAF",
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

              <VStack bg="azure" p={30} borderRadius={20} marginTop={20} alignItems={"start"}>
                <Text fontWeight="normal">Selected JDs -</Text>
                <Flex pb={20} direction="column">
                  {selectedJD &&
                    selectedJD.map((item, index) => {
                      return (
                        <Text key={index}>
                          <b>{index + 1}. </b>
                          {item.name}
                        </Text>
                      );
                    })}
                </Flex>
              </VStack>

            </div>


{/* REsume Starts */}
            <div style={{width:"50%"}}>
              <label
                htmlFor="resume"
                style={{
                  cursor: "pointer",
                  padding: 10,
                  marginBottom: 20,
                  border: "1px solid #000",
                  borderRadius: 10,
                  background: "#698DAF",
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

              <VStack bg="azure" p={30} borderRadius={20} marginTop={20} alignItems={"start"}>
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
            </div>



          </Flex>

          <Box
                as="button"
                type="submit"
                disabled={selectedJD ? false : true}
                p={15}
                textAlign="center"
                fontWeight={600}
                border="1px solid #000"
                borderRadius={10}
                bg={"#698DAF"}
                color={"white"}
                cursor="pointer"
              >
                Upload Documents & Analyze
              </Box>

        </form>

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
          <>
            <Flex justify="center" align="center" direction="column">
              <Box p={10} textAlign="center" color={"green"}>
                <h3>File(s) uploaded successfully</h3>
              </Box>
            </Flex>
            <VStack bg="azure" p={30} borderRadius={20}>
              <Text fontWeight="bold">Uploaded file(s)</Text>
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
          </>
        )}
      </Stack>
    // </Flex>
  );
}

export default JDUpload;
