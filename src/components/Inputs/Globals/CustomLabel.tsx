import { Box, InputLabel } from "@mui/material";

interface ICustomLabel {
  id?: string;
  required?: boolean;
  label: string;
  tooltip?: string;
  error?: boolean;
  isSelect: boolean;
}
export const CustomLabel = ({
  id,
  label,
  required,
  error,
  isSelect,
}: ICustomLabel) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={1}
      width={"100%"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} color={"#E63946"}>
        {required && <>*</>}
        <InputLabel
          disableAnimation
          error={error}
          id={isSelect ? id : undefined}
          htmlFor={isSelect ? undefined : id}
        >
          {label}
        </InputLabel>
      </Box>
    </Box>
  );
};
