import React from 'react';
import play from '../assets/play-button.svg';
import reset from '../assets/reset.svg';
import { useSelector, useDispatch } from 'react-redux';
import { startChrono, resetChrono } from '../features/chrono';
import classNames from 'classnames';

export default function ToggleButton({ type, action }) {
	const dispatch = useDispatch();
	const chronoValues = useSelector((state) => state.chrono);
	function toggleChrono() {
		if (!chronoValues.isPlaying) {
			dispatch(startChrono(type, action));
		} else {
			dispatch(resetChrono());
		}
	}
	return (
		<button
			onClick={toggleChrono}
			className={classNames(
				'px-4 py-2 text-slate-900 flex  justify-center items-center mx-auto border-2 relative bottom-[3px] border-black rounded shadow-[4px_4px_0px_0px_#000000] hover:bottom-[0px] hover:shadow-[0px_0px_0px_0px_#000000] transition-all',
				chronoValues.isPlaying ? 'bg-orange-400' : 'bg-lime-400'
			)}>
			<span className='mr-3 text-lg font-bold'>
				{chronoValues.isPlaying ? 'Reset' : 'Start'}
			</span>
			<img
				className='w-5'
				src={chronoValues.isPlaying ? reset : play}
				alt=''
			/>
		</button>
	);
}
