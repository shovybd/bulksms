import Image from "next/image";
import React from "react";
import deleteImg from "/public/images/delete.svg";
import editImg from "/public/images/edit.svg";

const Tables = (props) => {
  const { name, body, email } = props.tableData;
  return (
    <tr>
      <td className="name-data">{name}</td>
      <td className="address-data">{body}</td>
      <td className="contact-data">{email}</td>
      <td className="options-data d-flex">
        <div className="edit-option d-flex">
          <div>
            <Image src={editImg} />
          </div>
          <p>Edit</p>
        </div>
        <div className="delete-option d-flex">
          <div>
            <Image src={deleteImg} />
          </div>
          <p>Delete</p>
        </div>
      </td>
    </tr>
  );
};

export default Tables;
