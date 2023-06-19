import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const DeleteModel = ({ setDeleteModel, deleteItemId, setDeleteItemId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`https://skids.onrender.com/api/user/${deleteItemId}`);
      setDeleteItemId("");
      setDeleteModel(false);
      setIsDeleting(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      alert("error while deleting user...");
      setDeleteModel(false);
      setIsDeleting(false);
    }
  };
  return (
    <div className="upperModelDiv">
      <div className="deletebox">
        {!isDeleting && <p>Are you sure to delete user ?</p>}
        {isDeleting && (
          <p style={{ color: "red", fontWeight: "bolder" }}>
            Deleting user... please wait...
          </p>
        )}
        <div className="deleteboxbtn">
          <p onClick={() => setDeleteModel(false)}>Cancel</p>
          <p onClick={() => handleDelete()} className="deletebtn">
            Delete
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
