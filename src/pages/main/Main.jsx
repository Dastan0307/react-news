import { useEffect } from 'react'
import { getNews } from '../../api/apiNews'
import NewBanner from '../../components/newBanner/NewBanner'
import styles from './Main.module.scss'
import { useState } from 'react'
import NewList from '../../components/newsList/NewsList'
import NewsList from '../../components/newsList/NewsList'

export const Main = () => {
	const [news, setNews] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await getNews()
				setNews(response.news)
			} catch (error) {
				console.log(error)
			}
		}
		fetchNews()
	}, [])

	return (
		<main className={styles.main}>
			{news?.length > 0 ? <NewBanner item={news[0]} /> : null}
			<NewsList news={news} />
		</main>
	)
}
