import './App.css';
import 'github-markdown-css/github-markdown.css';
import { Container } from '@mui/material';
import MdEditor from './MdEditor';
declare function require(path: string): any;

function App() {
  return (
    <div className="App">
      <Container maxWidth='lg' sx={{ height: '100vh', padding: '8pt' }}>
        <MdEditor></MdEditor>
      </Container>
    </div>
  );
}

export default App;
