export default function getFormattedValue(time) {
	const minutes = `${
		Math.trunc(time / 60) < 10
			? `0${Math.trunc(time / 60)}`
			: Math.trunc(time / 60)
	}`;
	const seconds = `${time % 60 < 10 ? `0${time % 60}` : time % 60}`;
	return `${minutes}:${seconds}`;
}
