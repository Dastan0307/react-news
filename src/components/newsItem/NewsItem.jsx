import { formatTimeAgo } from '../../helpers/formatTimeAgo.js'
import styles from './NewItem.module.scss'

const NewsItem = ({ item }) => {
	return (
		<li className={styles.item}>
			<div className={styles.wrapper} style={{backgroundImage: `url(${item.image})`}}></div>
			<div className={styles.info}>
				<h3 className={styles.title}>{item.title}</h3>
				<p className={styles.extra}>
					{formatTimeAgo(item.published)} by {item.author}
				</p>
			</div>
		</li>
	)
}

export default NewsItem
