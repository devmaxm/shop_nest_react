import {Box, CircularProgress} from "@mui/material";

export default function Loader() {
    return (
        <Box sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "black",
            opacity: 0.3,
            zIndex: 10
        }}>
            <div style={{height: "100%", width: '100%', position: "relative"}}>
                <CircularProgress sx={{top: "50%", position: "absolute"}}/>
            </div>

        </Box>
    )
}