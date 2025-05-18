import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Howler } from 'howler';

// Configure Howler globally
Howler.autoUnlock = true;
Howler.html5PoolSize = 10;

createRoot(document.getElementById("root")!).render(<App />);
