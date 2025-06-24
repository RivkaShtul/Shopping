import { OutlinedInputProps, SxProps, OutlinedInput } from "@mui/material";
import { ChangeEvent, FocusEvent, forwardRef, useId, useMemo } from "react";
import { useController } from "react-hook-form";
import { InputContainer } from "../Globals/InputContainer";
import { CustomLabel } from "../Globals/CustomLabel";
import { WithError } from "../Globals/WithError";

export interface ICustomInput extends OutlinedInputProps {
  tooltip?: string;
  required?: boolean;
  /** string or dictionary key */
  errormessage?: string;
  sx?: SxProps;
  inputSx?: SxProps;
  errorSx?: SxProps;
  label?: string;
  disableErrorIcon?: boolean;
}
export const CustomInput = forwardRef<HTMLInputElement, ICustomInput>(
  (props, ref) => {
    const id = useId();
    const {
      label,
      required,
      sx,
      tooltip,
      inputSx,
      errormessage,
      endAdornment,
      disableErrorIcon,
      errorSx,
      ...rest
    } = props;
    const errorMsg = useMemo(() => {
      if (!errormessage) return undefined;
      return errormessage ?? "שגיאה";
    }, [errormessage]);

    return (
      <InputContainer sx={sx}>
        <CustomLabel
          isSelect={false}
          id={id}
          label={label ?? ""}
          error={Boolean(errorMsg?.length)}
          required={required}
          tooltip={props.tooltip}
        />
        <WithError errorMsg={errorMsg} errorSx={errorSx}>
          <OutlinedInput
            id={id}
            inputRef={ref}
            aria-describedby={`${id}-helper-text`}
            aria-required={!!required}
            error={Boolean(errorMsg)}
            fullWidth
            sx={{
              backgroundColor: "#fff",
              ...inputSx,
            }}
            endAdornment={endAdornment}
            {...rest}
          />
        </WithError>
      </InputContainer>
    );
  }
);

export interface IControlledInput extends ICustomInput {
  name: string;
}

export const ControlledInput = ({ name, ...props }: IControlledInput) => {
  const {
    field: { onBlur, onChange, disabled, ...rest },
    fieldState: { error },
  } = useController({ name: name });

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (props.onBlur) props.onBlur(e);
    onBlur();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e);
    onChange(e);
  };
  return (
    <CustomInput
      {...props}
      onBlur={handleBlur}
      onChange={handleChange}
      {...rest}
      errormessage={error?.message}
    />
  );
};

CustomInput.displayName = "CustomInput";
