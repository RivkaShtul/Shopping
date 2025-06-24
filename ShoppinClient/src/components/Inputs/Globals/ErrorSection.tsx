import { Stack, SxProps, Typography } from "@mui/material";

export const ErrorSection = ({
  message,
  sx,
  stackSx,
}: {
  message?: string;
  sx?: SxProps;
  stackSx?: SxProps;
}) => {
  if (!message) return null;

  return (
    <Stack
      direction={"row"}
      gap={"4px"}
      alignItems={"center"}
      sx={{
        position: "absolute",
        top: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        ...stackSx,
      }}
    >
      <Typography
        color={"primary"}
        fontWeight={400}
        fontSize="14px"
        whiteSpace="pre-line"
        role="alert"
        sx={{
          ...sx,
        }}
      >
        {message}
      </Typography>
    </Stack>
  );
};
