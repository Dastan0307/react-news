import { useEffect, useState } from 'react'
import { getCategories, getNews } from '../../api/apiNews'
import Categories from '../../components/categories/Categories'
import NewBanner from '../../components/newBanner/NewBanner'
import NewsList from '../../components/newsList/NewsList'
import Pagination from '../../components/pagination/Pagination'
import Skeleton from '../../components/skeleton/Skeleton'
import styles from './Main.module.scss'
import Search from '../../components/search/Search'
import { useDebounce } from '../../helpers/hooks/useDebounce'

export const Main = () => {
	const [news, setNews] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [categories, setCategories] = useState([])
	const [keywords, setKeywords] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('All')
	const totalPages = 10
	const pageSize = 10

	const debouncedKeywords = useDebounce(keywords, 1500)

	const fetchNews = async currentPage => {
		try {
			setIsLoading(true)
			const response = await getNews({
				page_number: currentPage,
				page_size: pageSize,
				category: selectedCategory === 'All' ? null : selectedCategory,
				keywords: debouncedKeywords,
			})
			setNews(response.news)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchCategories = async () => {
		try {
			setIsLoading(true)
			const response = await getCategories()
			setCategories(['All', ...response.categories])
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	useEffect(() => {
		fetchNews(currentPage)
	}, [currentPage, selectedCategory, debouncedKeywords])

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
		setCurrentPage(pageNumber)
	}

	return (
		<main className={styles.main}>
			<Categories
				categories={categories}
				setSelectedCategory={setSelectedCategory}
				selectedCategory={selectedCategory}
			/>
			<Search keywords={keywords} setKeywords={setKeywords} />
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
