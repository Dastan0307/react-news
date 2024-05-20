import { formData } from '../helpers/formData'

import styles from './Header.module.scss'

const Header = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>NEWS REACT</h1>
			<p className={styles.date}>{formData(new Date())}</p>
		</header>
	)
}

export default Header
