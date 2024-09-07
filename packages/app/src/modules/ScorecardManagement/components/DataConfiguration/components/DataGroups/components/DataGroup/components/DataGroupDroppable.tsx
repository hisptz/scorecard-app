import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";


export function DataGroupDroppable({ children }: { children: ReactNode }) {
	const { setNodeRef } = useDroppable({
		id: `data-groups-droppable`
	});

	return (
		<div ref={setNodeRef}>
			{children}
		</div>
	);
}
