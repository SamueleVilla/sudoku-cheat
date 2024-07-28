import reactLogo from "./../../assets/react.svg";
import "./ReactLogo.css";

export default function ReactLogo() {
  return (
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
  );
}
