import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
	BsCheckCircle,
	BsExclamationOctagonFill,
	BsExclamationTriangle
} from 'react-icons/bs'

// Define status-based text color using Tailwind classes
const statusStyles: Record<string, string> = {
	success: 'text-green-500',
	error: 'text-red-500',
	info: 'text-blue-500',
	warning: 'text-yellow-500'
}

// The makeToast function with status (default: success), title, and optional message
export const makeToast = (
	title: string,
	message?: string,
	status: 'success' | 'error' | 'info' | 'warning' = 'success', // Default status is 'success'
	options?: ToastOptions
) => {
	const textColor = statusStyles[status]

	return toast(
		<div className='flex gap-2'>
			<div className={`${textColor} text-xl mt-1`}>
				{status === 'success' ? (
					<BsCheckCircle />
				) : status === 'warning' ? (
					<BsExclamationTriangle />
				) : (
					<BsExclamationOctagonFill />
				)}
			</div>
			<div>
				<strong className={`block font-bold capitalize`}>{title}</strong>
				{message && <p className='mt-1'>{message}</p>}
			</div>
		</div>,
		options
	)
}
