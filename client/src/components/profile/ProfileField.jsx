import React from "react";
import { MdEdit, MdOutlineCheck } from "react-icons/md";

const ProfileField = ({
  editing,
  value,
  onChange,
  onBlur,
  toggleEdit,
  label,
  name,
  icon,
  type,
}) => {
  return (
    <div className="flex items-start justify-start gap-3 mb-3 px-4 py-2 text-sm border-b border-light dark:border-dark">
      <div className="mt-1 text-light2 dark:text-dark2">{icon}</div>
      <div className="w-full flex flex-col items-start justify-start relative mb-3">
        <label className="text-light2 dark:text-dark2 mb-1 capitalize">
          {label}
        </label>

        {!editing ? (
          <span className="dark:text-dark break-all">{value}</span>
        ) : (
          <input
            type={type}
            name={name}
            className="w-full h-8 outline-none bg-inherit border-b border-light dark:border-dark text-light dark:text-dark"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}

        <div
          className="absolute top-0 right-0 cursor-pointer"
          onClick={toggleEdit}
        >
          {!editing ? <MdEdit /> : <MdOutlineCheck className="text-lg" />}
        </div>
      </div>
    </div>
  );
};

export default ProfileField;
