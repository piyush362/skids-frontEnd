import { useEffect, useState } from "react";
import axios from "axios";
import "./Globle_style.css";
import Usercard from "./Usercard";
import AddUserModel from "./models/AddUserModel";
import DeleteModel from "./models/DeleteModel";
import Loder from "./Loder/Loder";
import EditUserModel from "./models/EditUserModel";

const UserList = () => {
  const [allUsers, setAllUsers] = useState(null);

  const [deleteItemId, setDeleteItemId] = useState("");
  const [editItemId, setEditItemId] = useState("");

  //models
  const [adduserModel, setAddUserModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [editModel, setEditModel] = useState(false);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("https://skids.onrender.com/api/users");
      setAllUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="uppercontainer">
        <p>All Users..</p>
        <button onClick={() => setAddUserModel(!adduserModel)}>
          + ADD NEW USER
        </button>
      </div>
      <div className="usercardcontainer">
        {!allUsers && <Loder />}
        <p>
          {allUsers && allUsers.length === 0 ? "No record available" : null}
        </p>
        {allUsers &&
          allUsers.map((user, index) => (
            <Usercard
              key={index}
              userdetail={user}
              srn={index}
              setDeleteModel={setDeleteModel}
              setDeleteItemId={setDeleteItemId}
              setEditModel={setEditModel}
              setEditItemId={setEditItemId}
            />
          ))}
      </div>

      {adduserModel && <AddUserModel setAddUserModel={setAddUserModel} />}
      {deleteModel && (
        <DeleteModel
          setDeleteModel={setDeleteModel}
          deleteItemId={deleteItemId}
          setDeleteItemId={setDeleteItemId}
        />
      )}
      {editModel && (
        <EditUserModel
          setEditModel={setEditModel}
          editItemId={editItemId}
          setEditItemId={setEditItemId}
        />
      )}
    </>
  );
};

export default UserList;
