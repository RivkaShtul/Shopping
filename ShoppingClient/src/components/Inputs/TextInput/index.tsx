import React, { forwardRef } from "react";
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { useId } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { WithError } from "../Globals/WithError";

export interface ITextInput {
  tooltip?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  icon?: React.ReactElement;
  error?: Partial<FieldError>;
  field?: Partial<ControllerRenderProps<FieldValues, any>>;
  Input?: OutlinedInputProps;
  name?: string;
  sx?: object;
  width?: string;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;

  onBlur?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInput>(
  (props, ref) => {
    const id = useId();
    const { error, icon, label, Input, field, required, ...rest } = props;
    const inputProps = {
      ...field,
      ...rest,
      ...Input,
    };

    return (
      <Box
        width={props.width || "min(370px, 100%)"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={1}
        >
          <Box display={"flex"} color={(theme) => theme.palette.error.main}>
            {required && <>*</>}
            <InputLabel
              disableAnimation
              error={Boolean(error?.message)}
              id={`${id}-${label}`}
            >
              {label}
            </InputLabel>
          </Box>
        </Box>
        <WithError errorMsg={error?.message}>
          <OutlinedInput
            inputRef={ref}
            aria-labelledby={`${id}-${props.label}`}
            aria-describedby={`${id}-helper-text`}
            aria-required={!!required}
            error={Boolean(error?.message)}
            {...inputProps}
            label={props.label}
            placeholder={props.placeholder}
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              ...props.sx,
            }}
            endAdornment={
              props.icon && (
                <InputAdornment position="end">{icon}</InputAdornment>
              )
            }
          />
        </WithError>
      </Box>
    );
  }
);

TextInput.displayName = "TextInput";
