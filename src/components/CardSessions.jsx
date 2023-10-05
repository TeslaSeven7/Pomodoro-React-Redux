import React from 'react';
import UpdateTimeButton from './UpdateTimeButton';
import classNames from 'classnames';
export default function CardSessions(props) {
	const name = props.name.charAt(0).toUpperCase() + props.name.slice(1);
	function deleteCard(props) {
		const idToRemove = props.id;
		const newArray = props.obj.filter((obj) => {
			return obj.id !== idToRemove;
		});
		props.updateParentState(newArray);
	}
	return (
		<div
			className={classNames(
				'p-3 rounded-md relative w-full',
				props.id % 2 == 0
					? 'bg-emerald-300 border border-emerald-500 shadow-[3px_3px_0px_0px_#10b981]'
					: 'bg-amber-300 border border-amber-400 shadow-[3px_3px_0px_0px_#ffc107]'
			)}>
			<div
				className={classNames(
					'absolute top-1 right-1 font-bold cursor-pointer  h-4 w-4 flex items-center justify-center border rounded-sm transition-all',
					props.id % 2 == 0
						? 'text-emerald-500 border-emerald-500'
						: 'text-amber-500 border-amber-500'
				)}
				onClick={() => deleteCard(props)}>
				<span className='relative bottom-[2px]'>x</span>
			</div>
			<p className='text-center mb-1 font-semibold'>{name}</p>
			<div className='flex justify-center items-center'>
				<UpdateTimeButton
					sign={'-'}
					type={props.name}
				/>
				<p className='mx-4 text-xl'>{props.value / 60}</p>
				<UpdateTimeButton
					sign={'+'}
					type={props.name}
				/>
			</div>
		</div>
	);
}
