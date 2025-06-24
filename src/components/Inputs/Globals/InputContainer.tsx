import { Box, BoxProps } from '@mui/material'

export const InputContainer = ({ children, sx, ...rest }: BoxProps) => {
    return (
        <Box
            {...rest}
            sx={{
                width: '100%',
                ...sx,
            }}
        >
            {children}
        </Box>
    )
}
