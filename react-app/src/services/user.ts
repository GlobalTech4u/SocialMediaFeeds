import axios from "axios";

const createUser = async (formData: FormData) => {
    const url = process.env.REACT_APP_BASE_API_URL + "/api/user";
     return  axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
}

export { createUser }