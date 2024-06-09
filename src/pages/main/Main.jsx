import { useState } from 'react'
import { getCategories, getNews } from '../../api/apiNews'
import Categories from '../../components/categories/Categories'
import NewBanner from '../../components/newBanner/NewBanner'
import NewsList from '../../components/newsList/NewsList'
import Pagination from '../../components/pagination/Pagination'
import Search from '../../components/search/Search'
import { PAG, TOTAL_PAGES } from '../../constants/constants'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import { useFetch } from '../../helpers/hooks/useFetch'
import styles from './Main.module.scss'

export const Main = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [keywords, setKeywords] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('All')

	const debouncedKeywords = useDebounce(keywords, 1500)

	const { data, error, isLoading } = useFetch(getNews, {
		page_number: currentPage,
		page_size: PAG,
		category: selectedCategory === 'All' ? null : selectedCategory,
		keywords: debouncedKeywords,
	})

	const { data: dataCategories } = useFetch(getCategories)

	const handleNextPage = () => {
		if (currentPage < TOTAL_PAGES) {
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
			{dataCategories ? <Categories
				categories={dataCategories.categories}
				setSelectedCategory={setSelectedCategory}
				selectedCategory={selectedCategory}
			/> : null}
			<Search keywords={keywords} setKeywords={setKeywords} />
			<NewBanner
				isLoading={isLoading}
				item={data && data.news && data.news[0]}
			/>
			<NewsList isLoading={isLoading} news={data?.new} />
			<Pagination
				TOTAL_PAGES={TOTAL_PAGES}
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				currentPage={currentPage}
			/>
		</main>
	)
}
