import { Fragment, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const TextField = ({
  name,
  label,
  placeholder,
  required,
  type = "text",
  errors,
  disabled,
  isTextArea,
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col gap-1.5 w-full">
      <label
        className="md:text-base text-sm font-semibold text-[#1B4242]"
        htmlFor={name}>
        {label}
      </label>
      {isTextArea && (
        <textarea
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={4}
          cols={50}
          onChange={onChange}
          defaultValue={value}
          className="border-2 border-black md:py-2 py-1 px-3.5 text-base text-black rounded-md h-[8rem]"
        />
      )}

      {!isTextArea && (
        <Fragment>
          <input
            type={type === "password" ? (showPassword ? "text" : type) : type}
            autoComplete={type === "password" ? "off" : "on"}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onChange={onChange}
            defaultValue={value}
            className="py-1 px-4 text-base text-black rounded-md border border-black focus:outline-none"
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-2 right-3">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </Fragment>
      )}

      {errors && (
        <span className="text-red-800 md:text-sm text-xs font-medium ml-1">
          {errors.message}
        </span>
      )}
    </div>
  );
};
