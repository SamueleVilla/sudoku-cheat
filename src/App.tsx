import './App.css';
import ReactLogo from './components/ReactLogo';
import SudokuGame from './components/SudokuGame';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster></Toaster>
      <main>
        <SudokuGame />
      </main>
      <footer className="footer">
        <ReactLogo />
        <span>Powered by React</span>
      </footer>
    </>
  );
}

export default App;
