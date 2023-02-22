import './App.css';
import 'github-markdown-css/github-markdown.css';
import { Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Snackbar, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { MutableRefObject } from 'react';
import SteppedComponent from './SteppedComponent';
import StudyTask from './StudyTask';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import FFLTask from './FFLTask';
import Do from './Do';
import Tutorial from './Tutorial';

export function download(url: string, filename: string) {
  let link = document.createElement("a");
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  link.click();
}

function startCapture(displayMediaOptions: any,
  activeCapture: MutableRefObject<MediaStream | null>,
  activeRecorder: MutableRefObject<MediaRecorder | null>,
  filename: string) {
  return navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    .then(stream => {
      activeCapture.current = stream;
      activeRecorder.current = new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9" });
      let chunks: BlobPart[] = [];
      activeRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      let date: Date = new Date(Date.now());
      activeRecorder.current.onstop = (_) => download(URL.createObjectURL(new Blob(chunks, { type: "video/webm" })), `${filename}_${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}.webm`)
      activeRecorder.current.start();
      return chunks;
    }).catch((err) => { console.error(`Error:${err}`); return null; });
}

let captureOptions = {
  video: {
    displaySurface: "monitor"
  }
};

function stopCapture(stream: MediaStream, activeRecorder: MutableRefObject<MediaRecorder | null>) {
  try {
    activeRecorder.current!.stop();
  } catch (e) {
    console.log(e);
  }
  try {
    stream.getTracks().forEach(track => track.stop());
  } catch (e) {
    console.log(e);
  }
}

let samples: any = {};
let tasks: any = {};

fetch("https://raw.githubusercontent.com/wu000168/ffl-study/site/samples.json").then(v => v.json().then(v => samples = v));
fetch("https://raw.githubusercontent.com/wu000168/ffl-study/site/tasks.json").then(v => v.json().then(v => tasks = v));

function validateParticipantId(id: string): { formula: number, tool: "FFL" | "LaTeX" | "Word" }[] { return samples[id]; }
function generateTasks(taskIds: { formula: number, tool: "FFL" | "LaTeX" | "Word" }[],
  participantID: string, fflOnChange: (md: string, ffl: string) => void, props?: any) {
  return taskIds.map(({ formula, tool }, idx) => {
    let task = tasks[formula - 1];
    if (task) {
      switch (tool) {
        case "FFL": return (<FFLTask onChange={fflOnChange}
          task={task.description} target={task.render}
          md={task["FFL"].md} ffl={task["FFL"].ffl} ratio={task["FFL"].ratio} {...props} />);
        case "LaTeX":
          return <Box sx={{ flex: '1 1 auto', pt: 2 }}>
            <Do onLoad={() => { window.open(`https://www.overleaf.com/docs?snip_uri=${encodeURI(task["LaTeX"])}`, '_blank') }}            >
              <Typography variant='body1'>
                Please go to the new tab and follow the instructions in the document.
              </Typography>
            </Do>
          </Box>;
        case "Word":
          return <Box sx={{ flex: '1 1 auto', pt: 2 }}>
            <Do onLoad={() => { download(task['Word'], `Task${idx}_${participantID}.docx`) }}            >
              <Typography variant='body1'>
                Please open the downloaded file and follow the instructions in the document.
              </Typography>
            </Do>
          </Box>;
      }
    }
    return <Typography>Error Loading Task</Typography>
  })
}

function taskCode(fNo: number): string | undefined {
  return [undefined, "A", "B", "C", "D", "E"][fNo]
}

function toolCode(tool: string): string | undefined {
  return {
    FFL: "X",
    LaTeX: "Y",
    Word: "Z"
  }[tool]
}

function App() {
  const [started, setStarted] = React.useState(0);
  const [participantID, setParticipantId] = React.useState<string | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStepCompleted, setActiveStepCompleted] = React.useState(false);
  let taskIds = validateParticipantId(participantID ?? 'PILOT') ?? [];
  const fflTask1Md = React.useRef("");
  const fflTask1Style = React.useRef("");
  const fflTask2Md = React.useRef("");
  const fflTask2Style = React.useRef("");
  const openTaskMd = React.useRef("");
  const openTaskStyle = React.useRef("");
  let tasks = taskIds.length === 0 ? [] : generateTasks(taskIds, participantID ?? 'PILOT',
    (md, ffl) => {
      if (0 <= activeStep - 2 && activeStep - 2 <= 1) {
        fflTask1Md.current = md;
        fflTask1Style.current = ffl;
      }
      if (2 <= activeStep - 2 && activeStep - 2 <= 3) {
        fflTask2Md.current = md;
        fflTask2Style.current = ffl;
      }
    });
  tasks.push(...generateTasks([{ formula: 5, tool: "FFL" }], participantID ?? 'PILOT',
    (md, ffl) => {
      openTaskMd.current = md;
      openTaskStyle.current = ffl;
    }, { additionalTaskInfoDialog: (<img alt='inspiration' src='https://pbs.twimg.com/media/Eq6QWtvUUAEBqY5?format=png&name=small'></img>) }));
  let stepComponents: JSX.Element[] = [
    <StudyTask survey={<iframe style={{ border: '0px' }} title="Background Survey" src="https://docs.google.com/forms/d/e/1FAIpQLScwE1jTXDzSnEju_tq91NTkKiy6gY9lG-df2_5S1wkWmV_FSA/viewform?embedded=true" width='100%' height='100%'>Loading…</iframe>}
      completed={activeStepCompleted}>
      <iframe style={{ border: '0px' }} title='Consent Information' width='100%' height='100%'
        src="https://docs.google.com/document/d/e/2PACX-1vQSiLJLAZVM4sEtjtwuYEcpLtKb6zvz-ruJJKD6fm6iL7PRDvrmTZdyVgekl-qw8rEmdw258ErNuCFh/pub?embedded=true">
      </iframe>
    </StudyTask>,
    <Tutorial></Tutorial>,
    ...tasks.map(t => <StudyTask survey={<iframe style={{ border: '0px' }} title="Task Difficulty Survey" src="https://docs.google.com/forms/d/e/1FAIpQLSeqv21EgeFMwS44cCVpQL_0N8NgIsM5e9rHcTyoNgCDqULm2g/viewform?embedded=true" width="100%" height="100%">Loading…</iframe>}
      completed={activeStepCompleted}>{t}</StudyTask>),
    <StudyTask survey={<iframe style={{ border: '0px' }} title="Compensation Information" src="https://docs.google.com/forms/d/e/1FAIpQLSdUfBbtg7F0jWAJiJ6Mkyx6xMAMdRWL8gX_05eEEQTZBhMZ6g/viewform?embedded=true" width="100%" height="100%">Loading…</iframe>}
      completed={activeStepCompleted}>
      <iframe title="End of Study Survey" src="https://docs.google.com/forms/d/e/1FAIpQLSfb4YwlsU_VemH5XxbGRzqMNtiU9iO23-_mVyzVcS2aNzECGQ/viewform?embedded=true" width="100%" height="100%">Loading…</iframe>
    </StudyTask>
  ];
  const startTime = React.useRef(Date.now());
  const activeCapture = React.useRef<MediaStream | null>(null);
  const activeRecorder = React.useRef<MediaRecorder | null>(null);
  const [copyNotif, setCopyNotif] = React.useState(false);
  const studyStart = React.useRef(Date.now());
  const taskTimes = React.useRef<number[]>([]);
  const studyEnd = React.useRef(Date.now());
  const next = function () {
    if (activeStepCompleted || activeStep === 1) {
      if (activeStep === 1) {
        startCapture(captureOptions, activeCapture, activeRecorder, participantID!.toString());
      } else if (2 <= activeStep && activeStep <= 5) {
        activeRecorder.current?.resume();
        startTime.current = Date.now();
      }
      if (activeStep === stepComponents.length - 1) {
        studyEnd.current = Date.now();
        stopCapture(activeCapture.current!, activeRecorder);
        download(
          URL.createObjectURL(new Blob([getReport()], { type: 'text/json' })),
          `${participantID}.json`
        );
        setActiveStep(0);
      } else {
        setActiveStep(activeStep + 1);
      }
      setActiveStepCompleted(false);
    } else {
      activeRecorder.current?.pause();
      if (2 <= activeStep && activeStep <= 6) {
        taskTimes.current.push(Date.now() - startTime.current);
      }
      setActiveStepCompleted(true);
    }

  }
  const getReport = () => JSON.stringify({
    participantID, taskTimes, totalTime: Date.now() - studyStart.current,
    fflTasks: [
      { md: fflTask1Md, ffl: fflTask1Style },
      { md: fflTask2Md, ffl: fflTask2Style }
    ]
  })
  return (
    <div className="App">
      <Container maxWidth='lg' sx={{ height: '100vh' }}>
        <Box sx={{ height: '96%', padding: '8pt' }}>
          <SteppedComponent activeStep={started}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ flex: '1', height: '100%', width: '100%' }}
            >
              <Grid item xs={3}>
                <Dialog open={started === 0} onClose={() => { }}>
                  <DialogTitle>Participant ID</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Facilitator: Please input the Participant ID before starting this study session.
                    </DialogContentText>
                    <TextField
                      error={taskIds.length === 0}
                      helperText={taskIds.length === 0 ? "Invalid ID" : undefined}
                      autoFocus
                      margin="dense"
                      id="name"
                      fullWidth
                      variant="standard"
                      value={participantID ?? ""}
                      onChange={e => { setParticipantId(e.target.value) }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => {
                      setParticipantId(participantID ?? "PILOT");
                      if (taskIds.length > 0) setStarted(1);
                    }}>Confirm</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Box sx={{ height: '100%', width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column' }}>
              <Stepper sx={{ flex: '0', width: '100%' }} activeStep={activeStep}>
                <Step>
                  <StepLabel>Before We Start</StepLabel>
                </Step>
                <Step>
                  <StepLabel >Tutorial</StepLabel>
                </Step>
                {taskIds.map(({ formula, tool }) => {
                  return <Step>
                    <StepLabel optional={<Typography variant="caption">Tool {toolCode(tool)}</Typography>}>
                      Task {taskCode(formula)}
                    </StepLabel>
                  </Step>;
                })}
                <Step>
                  <StepLabel optional={<Typography variant="caption">Tool {toolCode("FFL")}</Typography>}>Task D</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Done</StepLabel>
                </Step>
              </Stepper>
              <Box sx={{ flex: 1, pt: 2 }}>
                <SteppedComponent activeStep={activeStep}>
                  {stepComponents}
                </SteppedComponent>
              </Box>
              <Box sx={{ flex: '0', display: "flex", flexDirection: 'row', pt: 2 }}>
                <Snackbar
                  open={copyNotif}
                  autoHideDuration={2000}
                  onClose={() => setCopyNotif(false)}
                  message="Participant ID Copied to Clipboard"
                  action={<IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => setCopyNotif(false)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>}
                />
                <Typography sx={{ flex: '1' }} align="left">
                  Your Participant ID is&nbsp;
                  <Chip label={participantID ?? "PILOT"} variant="outlined" deleteIcon={<ContentCopyIcon />}
                    onDelete={() => {
                      navigator.clipboard.writeText(participantID ?? "PILOT");
                      setCopyNotif(true);
                    }} size="small"
                  />.
                  Please click<Button onClick={next} size="small">Next</Button>when instructed by your facilitator.
                </Typography>
                <Button sx={{ flex: '0' }} onClick={next}>Next</Button>
              </Box>
            </Box>
          </SteppedComponent>
        </Box>
      </Container>
    </div >
  );
}

export default App;
