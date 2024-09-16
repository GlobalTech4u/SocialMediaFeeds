import { FormEvent, useRef } from "react";

import { createUser } from "./services/user";
import "./App.css";

function App() {
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadFileTest = async (event: FormEvent) => {
    event.preventDefault();

    if (fileRef?.current?.files && fileRef?.current?.files?.length > 0) {
      const formData = new FormData();
      // TODO :- Update the frontend with all required input fields and send real time values
      formData.set("profilePicture", fileRef?.current?.files[0]);
      formData.set("firstName", "Shubham");
      formData.set("lastName", "Saxena");
      formData.set("email", "shubham@gmail.com");
      formData.set("jobTitle", "software engineer");
      formData.set("gender", "male");
      formData.set("password", "password");

      createUser(formData);
    }
  };

  return (
    <div className={"app"}>
      <form onSubmit={uploadFileTest}>
        <div className="user-form">
          <input
            type="file"
            className="form-control-file"
            ref={fileRef}
            name="profilePicture"
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
