import React, { useEffect, useState } from 'react';
import './App.css';
import 'github-markdown-css/github-markdown.css';
import { Card, CardContent, Chip, Dialog, IconButton, Stack } from '@mui/material';
import MarkdownIt from 'markdown-it';
import * as fflParser from 'ffl';
import { GrammarError } from 'peggy';
import { CloseOutlined, InfoOutlined } from '@mui/icons-material';
declare function require(path: string): any;
var fflPlugin = require('markdown-it-ffl');

function FFLTask({ md, ffl, ratio, task, target, onChange, additionalTaskInfoDialog }: any) {
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
    var taskRender = MarkdownIt().use(fflPlugin, { globalStyle: target?.ffl ?? "" });
    const [infoOpen, setInfoOpen] = useState(false);
    return (
        <Stack spacing={2} sx={{ height: '100%', width: '100%' }} direction='column'>
            <Stack
                spacing={2} direction='row' sx={{ flex: 1 }}
                alignItems='stretch' justifyContent='space-around'
            >
                <Stack spacing={2} sx={{ flex: 1, height: "100%", display: 'flex', flexDirection: "column" }}>
                    <div style={{ textAlign: 'start', marginBottom: '-8pt' }}>Markdown w/ LaTeX Math</div>
                    <textarea spellCheck={false}
                        style={{ flex: ratio[0] ?? 4, resize: 'none', overflow: 'auto', fontSize: '12pt', fontFamily: 'monospace' }}
                        value={mdSrc} onChange={(e) => setMdSrc(e.target.value)}
                    />
                    <div style={{ textAlign: 'start', marginBottom: '-8pt', flex: 0, display: "flex" }}>
                        <span style={{ flex: 1 }}>Style Specification</span>
                        <span style={{ flex: 0, marginTop: '-4pt' }}> {errMsg ? <Chip size="small" variant="outlined" color="error" label="Invalid/Incomplete Syntax" /> : ""}</span>
                    </div>
                    <textarea spellCheck={false}
                        style={{
                            flex: ratio[1] ?? 3, resize: 'none', overflow: 'auto', fontSize: '12pt', fontFamily: 'monospace',
                            outlineColor: errMsg ? "red" : "", borderColor: errMsg ? "red" : ""
                        }}
                        value={fflSrc} onChange={(e) => setFflSrc(e.target.value)}
                    />
                </Stack>
                <Stack spacing={2} sx={{ flex: 1, height: "100%", display: 'flex', flexDirection: "column" }}>
                    <div style={{ textAlign: 'start', marginBottom: '-8pt', flex: 0, display: "flex" }}>
                        <span style={{ flex: 1 }}>Task</span>
                        {additionalTaskInfoDialog &&
                            <span style={{ flex: 0, marginTop: '-4pt' }}>
                                <IconButton size="small" onClick={() => setInfoOpen(true)}>
                                    <InfoOutlined fontSize="inherit" />
                                </IconButton>
                                <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
                                    <Stack
                                        direction="row-reverse"
                                        justifyContent="flex-start"
                                        alignItems="baseline"
                                        spacing={2}
                                    ><IconButton onClick={() => setInfoOpen(false)} style={{ marginBottom: '-16pt' }}>
                                            <CloseOutlined />
                                        </IconButton>
                                    </Stack>
                                    {additionalTaskInfoDialog}
                                </Dialog>

                            </span>
                        }
                    </div>
                    <Card variant='outlined' className='markdown-body' >
                        <CardContent sx={{ textAlign: 'start', flex: 0, minHeight: 'fit-content', overflow: 'auto' }}>
                            {task ?? "Recreate the formula to as shown above to the best of your ability using the inputs on the left."}
                            <br />
                            {target ? <div style={{ marginBottom: '-16pt', marginTop: '8pt' }}>
                                <span dangerouslySetInnerHTML={{ __html: taskRender.render(target?.md ?? "") }} />
                            </div> : []}
                        </CardContent>
                    </Card>
                    <div style={{ textAlign: 'start', marginBottom: '-8pt', flex: 0 }}>Preview</div>
                    <Card variant='outlined' className='markdown-body' sx={{ maxHeight: '60vh', flex: 1 }}>
                        <CardContent sx={{ textAlign: 'start', maxHeight: '100%', flex: 1, overflow: 'auto' }}>
                            <div dangerouslySetInnerHTML={{ __html: render.current }} />
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default FFLTask;
