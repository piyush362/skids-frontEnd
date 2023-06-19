import "./Globle_style.css";

const Usercard = ({ srn, userdetail, setDeleteModel, setDeleteItemId, setEditModel, setEditItemId }) => {
  return (
    <div className="usercard">
      <div className="usercardleft">
        <div>{srn + 1}</div>
        <div className="userdetailes">
          <h4 className="username">{userdetail.username}</h4>
          <p>{userdetail.useremail}</p>
          <p>{userdetail.userphone}</p>
        </div>
      </div>
      <div className="usercardbtn">
        <p onClick={() => {
          setEditModel(true)
          setEditItemId(userdetail._id)
        }}>EDIT</p>
        <p onClick={() => {
          setDeleteModel(true)
          setDeleteItemId(userdetail._id)
        }}>DELETE</p>
      </div>
    </div>
  );
};

export default Usercard;
