import { useEffect, useState } from 'react'
import { getNews } from '../../api/apiNews'
import NewBanner from '../../components/newBanner/NewBanner'
import NewsList from '../../components/newsList/NewsList'
import Pagination from '../../components/pagination/Pagination'
import Skeleton from '../../components/skeleton/Skeleton'
import styles from './Main.module.scss'

export const Main = () => {
	const [news, setNews] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10
	const pageSize = 10

	useEffect(() => {
		const fetchNews = async currentPage => {
			try {
				setIsLoading(true)
				const response = await getNews(currentPage, pageSize)
				setNews(response.news)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchNews(currentPage)
	}, [currentPage])

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handlePageClick = pageNumber => {
		setCurrentPage(currentPage)
	}

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
			<Pagination
				totalPages={totalPages}
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				currentPage={currentPage}
			/>
		</main>
	)
}
