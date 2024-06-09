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
import { useFilters } from '../../helpers/hooks/useFilters'

export const Main = () => {

	const { filters, changeFilter} = useFilters({
		page_number: 1,
		page_size: PAG,
		category: null,
		keywords: '',
	})

	const debouncedKeywords = useDebounce(filters.keywords, 1500)

	const { data, isLoading } = useFetch(getNews, {
		...filters,
		keywords: debouncedKeywords,
	})

	const { data: dataCategories } = useFetch(getCategories)

	const handleNextPage = () => {
		if (filters.page_number < TOTAL_PAGES) {
			changeFilter('page_number', filters.page_number + 1)
		}
	}

	const handlePreviousPage = () => {
		if (filters.page_number > 1) {
			changeFilter('page_number', filters.page_number - 1)
		}
	}

	const handlePageClick = pageNumber => {
		changeFilter('page_number', pageNumber)
	}

	return (
		<main className={styles.main}>
			{dataCategories ? (
				<Categories
					categories={dataCategories.categories}
					selectedCategory={filters.category}
					setSelectedCategory={category => changeFilter('category', category)}
				/>
			) : null}
			<Search
				keywords={filters.keywords}
				setKeywords={keywords => changeFilter('keywords', keywords)}
			/>
			<NewBanner
				isLoading={isLoading}
				item={data && data.news && data.news[0]}
			/>
			<NewsList isLoading={isLoading} news={data?.news} />
			<Pagination
				totalPages={TOTAL_PAGES}
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				currentPage={filters.page_number}
			/>
		</main>
	)
}
