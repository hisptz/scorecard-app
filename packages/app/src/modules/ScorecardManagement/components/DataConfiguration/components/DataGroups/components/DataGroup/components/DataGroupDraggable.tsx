import { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";


export function DataGroupDraggable({ children, id }: { children: ReactNode, id: string }) {
	const { setNodeRef} = useDraggable({
		id
	});

	return (
		<div ref={setNodeRef}>
			{children}
		</div>
	);
}
