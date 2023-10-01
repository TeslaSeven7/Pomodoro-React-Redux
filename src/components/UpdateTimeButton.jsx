import React from 'react';

export default function UpdateTimeComponent({ sign, type }) {
	return (
		<button className='w-8 h-8 text-4xl text-slate-700 bg-slate-200 rounded flex justify-center items-center'>
			<span className='relative bottom-1 pointer-events-none'>{sign}</span>
		</button>
	);
}
