import { useSelector, useDispatch } from 'react-redux';
import ToggleButton from './components/ToggleButton';
import UpdateTimeButton from './components/UpdateTimeButton';
import getFormattedValue from './utils/getFormattedValue';
import CardSessions from './components/cardSessions';
import { useState, useEffect, useRef } from 'react';
function App(type) {
	const chronoValues = useSelector((state) => state.chrono);
	const dispatch = useDispatch();
	const state = useSelector((state) => state); // Get the entire Redux state
	const typeOfChrono = chronoValues.displayedValue.heading.toLowerCase();
	const [phasesName, setPhasesName] = useState();
	const [disabledBool, setDisabledBool] = useState();
	const ref = useRef();
	const keysToExclude = [
		'isPlaying',
		'intervalID',
		'cycles',
		'displayedValue',
		' currentPhaseIndex',
	];

	useEffect(() => {
		const phases = Object.entries(state.chrono)
			.filter(
				([key, value]) =>
					typeof value === 'object' && !keysToExclude.includes(key)
			)
			.map(([key, value]) => value);

		setPhasesName(phases);
	}, [state.chrono]);
	function addNewCard() {
		if (ref.current.value.trim().length != 0) {
			const newArray = [...phasesName];
			const newPhaseId = newArray.length + 1;
			const newPhaseName = ref.current.value;
			const newPhaseObject = {
				id: newPhaseId,
				name: newPhaseName,
				value: 1500,
				runningValue: 1500,
			};
			newArray.push(newPhaseObject);
			setPhasesName(newArray);
		}
	}
	const updateParentState = (newValue) => {
		setPhasesName(newValue);
	};
	const disableInputOnPlaying = (disabled) => {
		console.log(disabled);
		setDisabledBool(disabled);
		//const isPlaying = state.chrono.isPlaying;
		//const [disabled, setDisabled] = useState(false);
	};
	return (
		<div className='bg-gray-200 text-slate-800 pt-20 min-h-screen'>
			<div className='flex flex-col items-center content-center max-w-2xl mx-auto bg-white p-10 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000000] px-[10rem]'>
				<h1 className='text-center text-4xl font-extrabold text-amber-400'>
					<span className='text-emerald-500'>POMO</span>
					-DORO
				</h1>
				<span className='text-md mb-8 text-sky-400 text-start'>
					React & Redux
				</span>

				<div className='grid grid-cols-2 gap-4 mb-8 w-full'>
					{/* works */}
					{phasesName &&
						phasesName.map((name) => (
							<CardSessions
								key={name.id}
								id={name.id}
								name={name.name}
								value={name.value}
								obj={phasesName}
								updateParentState={updateParentState}
							/>
						))}
				</div>
				<div className='flex justify-between mb-8 px-5 py-5 bg-sky-100 shadow-[3px_3px_0px_0px_#7dd3fc] border border-sky-300 rounded-lg w-full'>
					<input
						type='text'
						ref={ref}
						className='px-3 w-2/3 border-2 font-bold border-black rounded-md shadow-[2px_2px_0px_0px_#000000] focus-visible:outline-none disabled:bg-gray-200 transition-all'
						disabled={disabledBool}
					/>

					<button
						onClick={addNewCard}
						disabled={disabledBool}
						className='px-3 py-4 h-8 text-md font-bold text-slate-900 bg-lime-400 flex justify-center items-center relative bottom-[1px] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000000] hover:bottom-[0px] hover:shadow-[0px_0px_0px_0px_#000000] transition-all disabled:bg-lime-200 hover:disabled:shadow-[2px_2px_0px_0px_#000000] hover:disabled:bottom-[1px]'>
						Add +
					</button>
				</div>
				<div className='mb-8 rounded-lg py-5 ps-24 pe-24 bg-sky-100 shadow-[3px_3px_0px_0px_#7dd3fc] border border-sky-300 w-full'>
					<p className='text-center mb-2 text-xl font-semibold'>
						{chronoValues.displayedValue.heading}
					</p>
					<p className='text-center flex justify-center mb-2'>
						<span className='text-4xl  rounded font-bold text-slate-900'>
							{getFormattedValue(chronoValues.displayedValue.value)}
						</span>
					</p>
					<p className='text-center'>Passed cycle(s) : {chronoValues.cycles}</p>
				</div>
				<ToggleButton
					type={typeOfChrono}
					disableInputOnPlaying={disableInputOnPlaying}
				/>
			</div>
		</div>
	);
}

export default App;
