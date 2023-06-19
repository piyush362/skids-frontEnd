import React, { useEffect, useState } from 'react'
import "./style.css";
import Loder from '../Loder/Loder';
import axios from "axios";

const EditUserModel = ({ setEditModel, editItemId, setEditItemId }) => {

    const [isUploading, setIsUplaoding] = useState(false);
    const [loading, setloading] = useState(true)
    const [tempId] = useState(editItemId);

    const [user, setuser] = useState({
        username: "",
        useremail: "",
        userphone: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setuser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const getuserList = async () => {
        try {
            const response = await axios.get(`https://skids.onrender.com/api/user/${editItemId}`)
            const data = response.data
            setuser((prev) => ({
                ...prev,
                username: data.username,
                useremail: data.useremail,
                userphone: data.userphone
            }))
            setEditItemId("")
            setloading(false)
        } catch (error) {
            alert("error while updating...")
            setEditModel(false)
            setloading(false)
        }
    }

    if (editItemId !== "") {
        getuserList();
    }

    const handleSubmt = async (e) => {
        e.preventDefault();
        if (user.username === "" || user.useremail === "") {
            alert("Username and Email should not be empty");
            return;
        } else if (user.useremail) {
            // Email regex pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(user.useremail)) {
                alert("Invalid email format");
                return;
            }
        }
        try {
            setIsUplaoding(true);
            const response = await axios.put(
                `https://skids.onrender.com/api/user/${tempId}`,
                user
            );
            //   console.log(response.data);
            setEditModel(false);
            setIsUplaoding(false);
            window.location.reload();
        } catch (error) {
            alert("Error while updating user..");
            setEditModel(false);
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
                    <p>Update User</p>
                    <p onClick={() => setEditModel(false)}>Close X</p>
                </div>
                {loading && <p style={{
                    textAlign: 'center',
                    fontWeight: 400,
                    marginTop: 210
                }}>Please wait, Loading....</p>}
                {!loading && <div>
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="useremail">UserEmail</label>
                        <input
                            type="text"
                            name="useremail"
                            value={user.useremail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="userphone">UserNumber</label>
                        <input
                            type="text"
                            name="userphone"
                            value={user.userphone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>}


                {/* {isUploading && <p>Adding new user, Please wait...</p>} */}
                <div className="adduserbtn">
                    <p onClick={(e) => handleSubmt(e)}>Add User</p>
                </div>
            </div>

            {isUploading && (
                <p className="uploadingbox">Updating user, Please wait...</p>
            )}
        </div>
    )
}

export default EditUserModel