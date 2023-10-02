import { useSelector } from 'react-redux';
import ToggleButton from './components/ToggleButton';
import UpdateTimeButton from './components/UpdateTimeButton';
import getFormattedValue from './utils/getFormattedValue';
function App() {
	const chronoValues = useSelector((state) => state.chrono);
	return (
		<div className='bg-gray-200 text-slate-800 pt-20 min-h-screen'>
			<div className='flex flex-col items-center content-center max-w-2xl mx-auto bg-white p-10 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000000]'>
				<h1 className='text-center text-3xl font-bold'>Pomodoro</h1>
				<span className='text-sm mb-8 '> React & Redux</span>
				<div className='flex justify-center mb-8'>
					{/* Sessions */}
					<div className='mr-10 bg-amber-300 border border-amber-400 shadow-[3px_3px_0px_0px_#ffc107] p-3 rounded-md '>
						<p className='text-center mb-1 font-semibold'>Sessions</p>
						<div className='flex'>
							<UpdateTimeButton
								sign={'-'}
								type={'session'}
							/>
							<p className='mx-4 text-xl'>{chronoValues.session.value / 60}</p>
							<UpdateTimeButton
								sign={'+'}
								type={'session'}
							/>
						</div>
					</div>
					{/* Pauses */}
					<div className='bg-green-300 border border-green-500 shadow-[3px_3px_0px_0px_#4caf50] p-3 rounded-md'>
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
				<div className='mb-8 rounded-lg py-5 ps-24 pe-24 bg-blue-100 shadow-[3px_3px_0px_0px_#90caf9] border border-blue-300'>
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
				<ToggleButton />
			</div>
		</div>
	);
}

export default App;
