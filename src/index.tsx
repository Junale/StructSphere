import { App } from "@/ui/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement)
	createRoot(rootElement).render(
		<div className="flex h-screen w-screen">
			<StrictMode>
				<App />
			</StrictMode>
		</div>
	);
else
	throw new Error("Root element not found");