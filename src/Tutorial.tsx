import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { download } from "./App";
import FFLTask from "./FFLTask";

function Tutorial() {
    const [value] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        switch (newValue) {
            case 1:
                window.open(`https://www.overleaf.com/docs?snip_uri=${encodeURI("https://raw.githubusercontent.com/wu000168/ffl-study/site/tutorial.zip")}`, '_blank');
                break;
        }
    };

    return <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flex: 0 }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Tool X" />
                <Tab label="Tool Y" />
            </Tabs>
        </Box>
        <Box sx={{ flex: 1, marginTop: '8pt' }}>
            <FFLTask task="This is where your task will be displayed."
                md="$$ P^t(q|\Delta, e_t) = P^t_s(q|\Delta, s_t) P^t_c(s_t|\Delta, e_t) $$"
                ffl="$P^t_?$ { color: red; }" ratio={[1, 3]} />
        </Box>
    </Box>
}

export default Tutorial