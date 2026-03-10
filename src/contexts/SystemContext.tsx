import type React from "react";
import { DiagramsProvider } from "./DiagramsContext";
import { EntitiesProvider } from "./EntityContext";
import { NodesProvider } from "./NodesContext";
import { RelationshipsProvider } from "./RelationshipsContext";

export const SystemProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<EntitiesProvider>
			<DiagramsProvider>
				<NodesProvider>
					<RelationshipsProvider>{children}</RelationshipsProvider>
				</NodesProvider>
			</DiagramsProvider>
		</EntitiesProvider>
	);
};
