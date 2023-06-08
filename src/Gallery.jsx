import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const url = `https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_API_KEY}`

const Gallery = () => {
	const { searchTerm } = useGlobalContext()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['images', searchTerm],
		queryFn: async () => {
			const response = await axios.get(`${url}&query=${searchTerm}`)
			return response.data
		},
	})

	if (isLoading) {
		return (
			<section>
				<h2>Loading...</h2>
			</section>
		)
	}
	if (isError) {
		return (
			<section>
				<h2>There was an error...</h2>
			</section>
		)
	}

	const results = data.results
	if (results.length < 1) {
		return (
			<section>
				<h2>No results found....</h2>
			</section>
		)
	}
	return (
		<section className='image-container'>
			{results.map(item => {
				const imgUrl = item?.urls?.regular
				return <img src={imgUrl} alt={item.alt_description} className='img' key={item.id} />
			})}
		</section>
	)
}
export default Gallery
