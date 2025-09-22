import { ReactNode } from "react";


export function IconResize({ size, children }: { size: number; children: ReactNode }) {

	return (
		<div className={`[&>svg]:w-[${size}px] [&>svg]:h-[${size}px]`}>
			{children}
		</div>
	);
}
