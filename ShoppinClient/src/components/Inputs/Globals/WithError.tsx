import { Box, SxProps } from '@mui/material'
import { ReactNode } from 'react'
import { ErrorSection } from './ErrorSection'

export const WithError = ({
    children,
    errorMsg,
    errorSx,
}: {
    children: ReactNode
    errorMsg?: string
    errorSx?: SxProps
}) => {
    return (
        <Box width='100%' position='relative'>
            <div>{children}</div>
            <ErrorSection message={errorMsg} sx={errorSx} />
        </Box>
    )
}
