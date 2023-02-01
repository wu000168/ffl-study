import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { download } from "./App";
import MdEditor from "./MdEditor";

function Tutorial() {
    const [value] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        switch (newValue) {
            case 1:
                window.open(`https://www.overleaf.com/docs?snip_uri=${encodeURI("https://raw.githubusercontent.com/wu000168/ffl-study/site/tutorial.zip")}`, '_blank');
                break;
            case 2:
                download('tutorial.docx', 'tutorial.docx'); break;
        }
    };

    return <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flex: 0 }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Tool A" />
                <Tab label="Tool B" />
                <Tab label="Tool C" />
            </Tabs>
        </Box>
        <Box sx={{ flex: 1, marginTop: '8pt' }}>
            <MdEditor task="This is where your task will be displayed." />
        </Box>
    </Box>
}

export default Tutorial