import { useEffect, useState } from 'react'
import { getNews } from '../../api/apiNews'
import NewBanner from '../../components/newBanner/NewBanner'
import NewsList from '../../components/newsList/NewsList'
import Skeleton from '../../components/skeleton/Skeleton'
import styles from './Main.module.scss'

export const Main = () => {
	const [news, setNews] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setIsLoading(true)
				const response = await getNews()
				setNews(response.news)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchNews()
	}, [])

	return (
		<main className={styles.main}>
			{news?.length > 0 && !isLoading ? (
				<NewBanner item={news[0]} />
			) : (
				<Skeleton type={'banner'} count={1} />
			)}
			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton type={'item'} count={10} />
			)}
		</main>
	)
}
