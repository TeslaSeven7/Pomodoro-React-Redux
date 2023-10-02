import React from 'react';
import { useDispatch } from 'react-redux';
import { updateChronoValues } from '../features/chrono';
export default function UpdateTimeComponent({ sign, type }) {
	const dispatch = useDispatch();
	function handleUpdate() {
		dispatch(updateChronoValues({ type, value: sign === '+' ? 60 : -60 }));
	}
	return (
		<button
			onClick={handleUpdate}
			className='w-8 h-8 text-4xl text-slate-700 bg-white flex justify-center items-center relative bottom-[1px] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000000] hover:bottom-[0px] hover:shadow-[0px_0px_0px_0px_#000000] transition-all'>
			<span className='relative bottom-1 pointer-events-none'>{sign}</span>
		</button>
	);
}
