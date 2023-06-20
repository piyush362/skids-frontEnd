import { useState } from "react";
import "./style.css";
import axios from "axios";

const AddUserModel = ({ setAddUserModel }) => {
  const [isUploading, setIsUplaoding] = useState(false);

  const [newuser, setnewuser] = useState({
    username: "",
    useremail: "",
    userphone: "",
  });

  const handleInputChange = (event) => {
    setnewuser({
      ...newuser,
      [event.target.name]: event.target.value.toLowerCase(),
    });
  };

  const handleSubmt = async (e) => {
    if (newuser.username === "" || newuser.useremail === "") {
      alert("Username and Email should not be empty");
      return;
    } else if (newuser.useremail) {
      // Email regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(newuser.useremail)) {
        alert("Invalid email format");
        return;
      }
    }

    // Phone number regex pattern
    const phonePattern = /^\d{10}$/;

    if (newuser.userphone && !phonePattern.test(newuser.userphone)) {
      alert("Invalid phone number format. Please enter a 10-digit number.");
      return;
    }

    try {
      setIsUplaoding(true);
      const response = await axios.post(
        "https://skids.onrender.com/api/user",
        newuser
      );
      if (response.data === "User already exists.") {
        alert(response.data);
        setIsUplaoding(false);
        setnewuser({
          username: "",
          useremail: "",
          userphone: "",
        })
        return;
      }
      setAddUserModel(false);
      setIsUplaoding(false);
      alert("user added...");
      window.location.reload();
    } catch (error) {
      alert("Error while adding new user..fill all fields");
      setIsUplaoding(false);
    }
  };


  return (
    <div className="upperModelDiv">
      <div className="addUserModel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <p>Add New User</p>
          <p onClick={() => setAddUserModel(false)}>Close X</p>
        </div>
        <div>
          <div>
            <label htmlFor="username">UserName *</label>
            <input
              type="text"
              name="username"
              value={newuser.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="useremail">UserEmail *</label>
            <input
              type="text"
              name="useremail"
              value={newuser.useremail}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="userphone">UserNumber *</label>
            <input
              type="text"
              name="userphone"
              value={newuser.userphone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* {isUploading && <p>Adding new user, Please wait...</p>} */}
        <div className="adduserbtn">
          <p onClick={(e) => handleSubmt(e)}>Add User</p>
        </div>
      </div>

      {isUploading && (
        <p className="uploadingbox">Adding new user, Please wait...</p>
      )}
    </div>
  );
};

export default AddUserModel;
