import Main from '@/pages/Main'
import CurrencyPage from '@/pages/CurrencyPage'
import DetailedInformationPage from '@/pages/DetailedInformationPage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: Main,
		props: true
	},
	{
		path: '/currency',
		component: CurrencyPage,
		props: true
	},
	{
		path: '/detailedInformation',
		component: DetailedInformationPage,
		name: 'detailedInformationPage',
		props: true
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
})

export default router