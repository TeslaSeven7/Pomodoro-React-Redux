import ToggleButton from './components/ToggleButton';
import UpdateTimeComponent from './components/UpdateTimeComponent';
function App() {
	return (
		<div className='bg-slate-700 text-slate-100 pt-20 min-h-screen'>
			<div className='max-w-xl mx-auto border broder-slate-500 rounded p-10'>
				<h1 className='text-center mb-8 text-3xl'>POMODORO APP</h1>
				<div className='flex justify-center mb-8'>
					{/* Sessions */}
					<div className='mr-10'>
						<p className='text-center mb-1'>Sessions</p>
						<div className='flex'>
							<UpdateTimeComponent
								sign={'-'}
								type={'session'}
							/>
							<p className='mx-4 text-xl'>25</p>
							<UpdateTimeComponent
								sign={'+'}
								type={'session'}
							/>
						</div>
					</div>
					{/* Pauses */}
					<div>
						<p className='text-center mb-1'>Pauses</p>
						<div className='flex'>
							<UpdateTimeComponent
								sign={'-'}
								type={'pause'}
							/>

							<p className='mx-4 text-xl'>5</p>
							<UpdateTimeComponent
								sign={'+'}
								type={'pause'}
							/>
						</div>
					</div>
				</div>

				<p className='text-center mb-2 text-xl font-semibold'>Work</p>
				<p className='text-center flex justify-center mb-1'>
					<span className='text-4xl p-4 rounded bg-slate-300 text-slate-900'>
						25:00
					</span>
				</p>
				<p className='text-center mb-8'>Passed cycle(s) : 0</p>
				<ToggleButton />
			</div>
		</div>
	);
}

export default App;
