import { useSelector, useDispatch } from 'react-redux';
import ToggleButton from './components/ToggleButton';
import UpdateTimeButton from './components/UpdateTimeButton';
import getFormattedValue from './utils/getFormattedValue';
import { choseChrono } from './features/chrono';
function App(type) {
	const chronoValues = useSelector((state) => state.chrono);
	const dispatch = useDispatch();
	const state = useSelector((state) => state); // Get the entire Redux state
	const typeOfChrono = chronoValues.displayedValue.heading.toLowerCase();

	function handleChoose() {
		dispatch(choseChrono('pause'));
	}

	return (
		<div className='bg-gray-200 text-slate-800 pt-20 min-h-screen'>
			<div className='flex flex-col items-center content-center max-w-2xl mx-auto bg-white p-10 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000000]'>
				<h1 className='text-center text-4xl font-extrabold text-amber-400'>
					<span className='text-emerald-500'>POMO</span>
					-DORO
				</h1>
				<span className='text-md mb-8 text-sky-400 text-start'>
					React & Redux
				</span>
				<div className='flex justify-center mb-8'>
					{/* works */}
					<div className='mr-10 bg-amber-300 border border-amber-400 shadow-[3px_3px_0px_0px_#ffc107] p-3 rounded-md '>
						<p className='text-center mb-1 font-semibold'>Sessions</p>
						<div className='flex'>
							<UpdateTimeButton
								sign={'-'}
								type={'work'}
							/>
							<p className='mx-4 text-xl'>{chronoValues.work.value / 60}</p>
							<UpdateTimeButton
								sign={'+'}
								type={'work'}
							/>
						</div>
					</div>
					{/* Pauses */}
					<div
						className='bg-emerald-300 border border-emerald-500 shadow-[3px_3px_0px_0px_#10b981] p-3 rounded-md'
						onClick={handleChoose}>
						<p className='text-center mb-1  font-semibold'>Pauses</p>
						<div className='flex'>
							<UpdateTimeButton
								sign={'-'}
								type={'pause'}
							/>

							<p className='mx-4 text-xl '>{chronoValues.pause.value / 60}</p>
							<UpdateTimeButton
								sign={'+'}
								type={'pause'}
							/>
						</div>
					</div>
				</div>
				<div className='mb-8 rounded-lg py-5 ps-24 pe-24 bg-sky-100 shadow-[3px_3px_0px_0px_#7dd3fc] border border-sky-300'>
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
				<ToggleButton type={typeOfChrono} />
			</div>
		</div>
	);
}

export default App;
