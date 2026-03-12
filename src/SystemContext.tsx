import type React from "react";
import { DiagramsProvider } from "@/Diagram/DiagramsContext";
import { EntitiesProvider } from "@/Entity/EntityContext";
import { NodesProvider } from "@/Node/NodesContext";
import { RelationshipsProvider } from "@/Relationship/RelationshipsContext";
import { ChatProvider } from "./Chat/ChatContext";
import { SettingsProvider } from "./Settings/SettingsContext";

export const SystemProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<SettingsProvider>
			<ChatProvider>
				<EntitiesProvider>
					<DiagramsProvider>
						<NodesProvider>
							<RelationshipsProvider>{children}</RelationshipsProvider>
						</NodesProvider>
					</DiagramsProvider>
				</EntitiesProvider>
			</ChatProvider>
		</SettingsProvider>
	);
};
