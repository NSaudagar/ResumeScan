import http from "./http-common";
import axios from "axios";

class UploadFilesService {
  async upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    const header = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }

    return axios.post(
      "http://127.0.0.1:8080/api/jd/upload",
      formData,
      {
        headers: header,
        onUploadProgress,
      }
    );
  }

  getFiles() {
    return http.get("http://127.0.0.1:8080/api/jd/files");//.headers("Access-Control-Allow-Origin","*");
  }
}

export default new UploadFilesService();