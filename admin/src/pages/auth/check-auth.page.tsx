import { localStorage } from '../../shared/utils'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
	checkFor: 'auth' | 'main'
}

const CheckAuthPage = ({ checkFor }: Props) => {
	const accessToken = localStorage.getItem<string>('accessToken')

	if (accessToken) {
		return checkFor === 'auth' ? (
			<Navigate
				to={`/`}
				replace
			/>
		) : (
			<Outlet />
		)
	}
	return checkFor === 'main' ? (
		<Navigate
			to={`/auth`}
			replace
		/>
	) : (
		<Outlet />
	)
}

export default CheckAuthPage
