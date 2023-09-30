import React from 'react';
import play from '../assets/play-button.svg';
import reset from '../assets/reset.svg';
export default function ToggleButton() {
	return (
		<button className='px-4 py-2 text-slate-800 flex justify-center items-center mx-auto bg-slate-300 rounded hover:bg-slate-200'>
			<span className='mr-3 text-lg'>Start</span>
			<img
				className='w-5'
				src={play}
				alt=''
			/>
		</button>
	);
}
