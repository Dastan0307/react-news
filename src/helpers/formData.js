export const formData = (date) => {
	const options = {
		weekday: 'long',
		year: 'numeric',
    month: 'long',
    day: 'numeric'
	}

	return date.toLocalDateString('en-US', options)
}