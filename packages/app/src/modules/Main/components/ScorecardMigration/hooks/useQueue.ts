import async from "async";
import { useCallback, useRef, useState } from "react";

export default function useQueue({ drain, task }: any) {
	const [progress, setProgress] = useState(0);
	const queue = useRef(
		async.queue((variable: any, callback: any) => {
			task(variable).then((results: any) => {
				callback(results);
			});
		}, 1),
	);
	queue.current?.drain(drain);

	const add = useCallback((task: any) => {
		queue.current.push(task, (err: any) => {
			if (err) {
				console.error(err);
			}
			setProgress((prevState) => prevState + 1);
		});
	}, []);

	return {
		add,
		started: queue.current?.started,
		kill: queue.current?.kill,
		progress,
		length: queue.current?.length(),
	};
}
