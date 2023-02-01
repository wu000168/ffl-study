import React, { useEffect, useState } from 'react';
import './App.css';
import 'github-markdown-css/github-markdown.css';
import { Card, Stack } from '@mui/material';
import MarkdownIt from 'markdown-it';
import * as fflParser from 'ffl';
import { GrammarError } from 'peggy';
import { Typography } from '@mui/joy';
declare function require(path: string): any;
var fflPlugin = require('markdown-it-ffl');

function MdEditor({ md, ffl, ratio, task, target, onChange }: any) {
    ratio ??= [4, 3];
    const [mdSrc, setMdSrc] = useState(md ?? "");
    const [fflSrc, setFflSrc] = useState(ffl ?? "");
    useEffect(() => { if (onChange) onChange(mdSrc, fflSrc) }, [mdSrc, fflSrc, onChange]);
    var mdIt = MarkdownIt({
        html: true,
        linkify: true,
        typographer: true
    }).use(fflPlugin, { globalStyle: fflSrc });
    var errMsg: string | undefined, render = React.useRef('');
    try {
        fflParser.default.parseFFL(fflSrc);
        errMsg = undefined;
        render.current = mdIt.render(mdSrc);
    } catch (err) {
        let gErr = err as GrammarError;
        errMsg = `${gErr.location?.start.line}:${gErr.location?.start.column}:${gErr.message}`;
    }
    return (
        <Stack
            spacing={2} direction='row'
            alignItems='stretch' justifyContent='space-around'
            sx={{ height: '100%', width: '100%' }}>
            <Stack spacing={2} sx={{ flex: 1 }}>
                <div style={{ textAlign: 'start', marginBottom: '-8pt' }}>Markdown w/ LaTeX Math</div>
                <textarea
                    style={{ flex: ratio[0] ?? 4, resize: 'none', overflow: 'auto' }}
                    value={mdSrc} onChange={(e) => setMdSrc(e.target.value)}
                />
                <div style={{ textAlign: 'start', marginTop: '8pt', marginBottom: '-8pt' }}>Style Specification</div>
                <textarea
                    style={{ flex: ratio[1] ?? 3, resize: 'none', overflow: 'auto' }}
                    value={fflSrc} onChange={(e) => setFflSrc(e.target.value)}
                />
                {errMsg &&
                    <Typography textColor="danger" sx={{ marginTop: '-4pt' }}>{errMsg}</Typography>}
            </Stack>
            <Stack spacing={2} sx={{ flex: 1, height: "100%", display: 'flex', flexDirection: "column" }}>
                <div style={{ textAlign: 'start', marginBottom: '-8pt', flex: 0 }}>Task</div>
                {target && <img alt={target} src={target} width="100%"></img>}
                <Typography>{task ?? "Recreate the formula to as shown above to the best of your ability using the inputs on the left."}</Typography>
                <div style={{ textAlign: 'start', marginBottom: '-8pt', flex: 0 }}>Preview</div>
                <Card sx={{ textAlign: 'start', overflow: 'auto', padding: '16pt', flex: 1 }}
                    variant='outlined' className='markdown-body'>
                    <div dangerouslySetInnerHTML={{ __html: render.current }} />
                </Card>
            </Stack>
        </Stack>
    );
}

export default MdEditor;
