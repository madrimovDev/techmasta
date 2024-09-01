import { redirect } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client'

const Page = () => {
	redirect('/authorization/login')
}

export default Page
