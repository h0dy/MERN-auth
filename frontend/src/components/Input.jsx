import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  console.log({ ...props });
  //onChange:(e) => setName(e.target.value)
  // placeholder:"full name"
  // type: "text"
  // value: " "
  return (
    <div className="relative mb-6">
      <div className="icon-container">
        <Icon className="size-6 text-violet-600" />
      </div>
      <input {...props} className="input" />
    </div>
  );
};

export default Input;
