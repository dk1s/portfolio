import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Poppins is loaded in index.html (Google Fonts), so no bundled font CSS here
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
