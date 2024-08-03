import { socialItems } from '@/app/components/header/social-items'

export const Socials = () => {
	return (
		<div className='flex gap-3 items-center'>
			<span>Obuna bo&apos;ling:</span>
			{socialItems.map((s) => (
				<div
					key={s.name}
					className='hover:text-blue-400'>
					{s.icon}
				</div>
			))}
		</div>
	)
}
