import {
  SxProps,
  Select,
  MenuItem,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";
import { FocusEvent, ReactNode, forwardRef, useId, useMemo } from "react";
import { useController } from "react-hook-form";
import { WithError } from "../Globals/WithError";
import { CustomLabel } from "../Globals/CustomLabel";
import { InputContainer } from "../Globals/InputContainer";

export type ISelectOption = { value: string | number; label: string };

export interface ICustomSelect extends Omit<SelectProps, "variant"> {
  options?: ISelectOption[];
  tooltip?: string;
  required?: boolean;
  /** string or dictionary key */
  errormessage?: string;
  sx?: SxProps;
  inputSx?: SxProps;
  errorSx?: SxProps;
  label?: string;
  disableErrorIcon?: boolean;
  nullableOption?: boolean;
  placeholder?: string;
  addDividerToMenuItem?: boolean;
}
export const CustomSelect = forwardRef<HTMLInputElement, ICustomSelect>(
  (props, ref) => {
    const id = useId();
    const {
      label,
      required,
      sx,
      tooltip,
      inputSx,
      errorSx,
      errormessage,
      endAdornment,
      nullableOption,
      disableErrorIcon,
      options,
      placeholder,
      addDividerToMenuItem,
      ...rest
    } = props;

    const errorMsg = useMemo(() => {
      if (!errormessage) return undefined;
      return errormessage ?? "שגיאה";
    }, [errormessage]);

    const iconStyles = {
      right: "unset",
      left: "7px",
    };

    return (
      <InputContainer sx={sx}>
        {label ? (
          <CustomLabel
            isSelect
            id={id}
            label={label}
            error={Boolean(errorMsg?.length)}
            required={required}
            tooltip={props.tooltip}
          />
        ) : null}
        <WithError errorMsg={errorMsg} errorSx={errorSx}>
          <Select
            labelId={id}
            variant="outlined"
            inputRef={ref}
            aria-describedby={`${id}-helper-text`}
            aria-required={!!required}
            error={Boolean(errorMsg)}
            fullWidth
            renderValue={rest.renderValue ?? undefined}
            sx={{
              backgroundColor: "#fff",
              "& .MuiSelect-icon": iconStyles,
              "& .MuiSelect-select .notranslate::after": placeholder
                ? {
                    content: `'${placeholder}'`,
                    opacity: "0.42",
                  }
                : {},
              ...inputSx,
            }}
            {...rest}
          >
            {nullableOption ? (
              <MenuItem
                sx={(theme) => ({ color: theme.palette.text.disabled })}
                value=""
              >
                {"אין אפשרויות"}
              </MenuItem>
            ) : null}
            {options
              ? options.map((op, i) => (
                  <MenuItem
                    value={op.value}
                    key={`${id}-${i}`}
                    divider={
                      addDividerToMenuItem
                        ? i !== options.length - 1
                        : undefined
                    }
                  >
                    {op.label}
                  </MenuItem>
                ))
              : null}
          </Select>
        </WithError>
      </InputContainer>
    );
  }
);

export interface IControlledSelect extends ICustomSelect {
  name: string;
}

export const ControlledSelect = ({ name, ...props }: IControlledSelect) => {
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

  const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
    if (props.onChange) props.onChange(e, child);
    onChange(e);
  };

  return (
    <CustomSelect
      {...props}
      onBlur={handleBlur}
      onChange={handleChange}
      {...rest}
      errormessage={
        error?.message ? (props.label ? error?.message : "שגיאה") : undefined
      }
    />
  );
};

CustomSelect.displayName = "CustomSelect";
