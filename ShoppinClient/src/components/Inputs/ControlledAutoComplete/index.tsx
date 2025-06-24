import {
  Autocomplete,
  AutocompleteCloseReason,
  CircularProgress,
  SxProps,
} from "@mui/material";
import { useController } from "react-hook-form";
import { RegisterOptions, FieldValues } from "react-hook-form";
import { SyntheticEvent } from "react";
import { TextInput } from "../TextInput";
export interface IControlledAutoCompleteOptions {
  label: string;
  id: string;
  searchKeys: string[];
}
interface IControlledAutoComplete {
  required?: boolean;
  name: string;
  label: string;
  options: IControlledAutoCompleteOptions[];
  onSelect?: (selectedValue: IControlledAutoCompleteOptions | null) => void;
  onInputChange?: (inputText: string) => void;
  disableSearchFilter?: boolean;
  noOptionsText?: string;
  loading?: boolean;
  onClose?: (
    event?: SyntheticEvent<Element, Event>,
    reason?: AutocompleteCloseReason
  ) => void;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  sx?: SxProps;
  disable?: boolean;
}
export const ControlledAutoComplete = (props: IControlledAutoComplete) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    rules: props.rules,
  });
  const { ref, onChange, value } = field;
  return (
    <Autocomplete
      noOptionsText={props.noOptionsText ? props.noOptionsText : "אין אפשרויות"}
      getOptionLabel={(option) => option.label}
      options={props.options}
      onChange={(_: any, newValue) => {
        if (props.onSelect) props.onSelect(newValue);
        onChange(newValue ? newValue.id : "");
      }}
      onClose={() => {
        if (props?.onClose) props.onClose();
      }}
      filterOptions={(op, state) => {
        return props.disableSearchFilter
          ? op
          : op.filter((option) =>
              option.label
                .toLocaleLowerCase()
                .includes(state.inputValue.toLocaleLowerCase()) ||
              option.searchKeys.find((x) =>
                x
                  .toLocaleLowerCase()
                  .includes(state.inputValue.toLocaleLowerCase())
              )
                ? true
                : false
            );
      }}
      value={
        value
          ? props.options.find((option) => {
              return value === option.id;
            }) ?? null
          : null
      }
      disabled={props.disable}
      sx={props.sx}
      renderInput={({ inputProps, InputProps }) => (
        <TextInput
          icon={props.loading ? <CircularProgress size={"18px"} /> : undefined}
          Input={{
            ...InputProps,
            inputProps,
            disabled: props.disable,
            inputRef: ref,
            onChange: (e: any) => {
              if (props.onInputChange) props.onInputChange(e.target.value);
            },
          }}
          error={error}
          label={props.label}
          required={props.required}
        />
      )}
      clearIcon={null}
    />
  );
};
