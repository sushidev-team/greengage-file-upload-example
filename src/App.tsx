import { OptionOne } from './OptionOne';
import { OptionTwo } from './OptionTwo';

export default function App() {
	return (
		<div>
			<p>Option one with uncontrolled input</p>
			<OptionOne />
			<p style={{ marginTop: '50px' }}>Option one with controlled input</p>
			<OptionTwo />
		</div>
	);
}
