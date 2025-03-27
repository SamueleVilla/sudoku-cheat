import './App.css';
import ReactLogo from './components/ReactLogo';
import SudokuGame from './components/SudokuGame';
import ThemeToggle from './components/ThemeToggle';
import ToastProvider from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ThemeToggle />
        <main>
          <SudokuGame />
        </main>
        <footer className="footer">
          <ReactLogo />
          <span className="">Powered by React</span>
        </footer>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
