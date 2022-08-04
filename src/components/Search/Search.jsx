import React, { useEffect, useState } from "react";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

import "./Search.scss";

const Search = () => {
	const [searchMovie, setSearchMovie] = useState({
		data: [],
		loading: true,
		searchTerm: "",
		error: ""
	});

	const getMovie = async () => {
		const res = await movieApi.get(`?apiKey=${APIKey}&type=movie`);
		console.log(res.data);
		setSearchMovie({
			data: res.data,
			loading: false,
			searchTerm: "",
			error: ""
		});
	};

	useEffect(() => {
		getMovie();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		if (searchMovie.searchTerm === "") {
			return setSearchMovie({
				...searchMovie,
				error: "Please enter a search term"
			});
		}

		const response = await movieApi.get(
			`?${APIKey}&s=${searchMovie.searchTerm}`
		);
		setSearchMovie({
			data: response.data,
			loading: false,
			searchTerm: "",
			error: ""
		});
	};

	// const { data, loading } = searchMovie;
	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-control"
					placeholder="Search movie"
					onChange={e =>
						setSearchMovie({ ...searchMovie, searchTerm: e.target.value })
					}
					value={searchMovie.searchTerm}
					autoFocus
				/>
			</form>
			<p className="text-white">{searchMovie.error ? searchMovie.error : ""}</p>
		</div>
	);
};

export default Search;
