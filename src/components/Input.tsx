import React from "react";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { FormControl, InputAdornment, TextField } from "@mui/material";

type InputProps = {
  inputName: string;
  placeholder: string;
  id: string;
  required: boolean;
  icon?: boolean;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  name: string;
  value?: string;
};

const Input = ({
  inputName,
  placeholder,
  id,
  required,
  icon,
  onChange,
  onBlur,
  name,
  value,
}: InputProps) => {
  return (
    <FormControl fullWidth>
      <TextField
        size="small"
        id={id}
        placeholder={placeholder}
        label={inputName}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ) : null,
        }}
      />
    </FormControl>
  );
};

export default Input;
