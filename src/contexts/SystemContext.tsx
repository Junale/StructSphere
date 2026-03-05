import type React from "react";
import { DiagramsProvider } from "./DiagramsContext";
import { EntitiesProvider } from "./EntityContext";

export const SystemProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<EntitiesProvider>
			<DiagramsProvider>{children}</DiagramsProvider>
		</EntitiesProvider>
	);
};
