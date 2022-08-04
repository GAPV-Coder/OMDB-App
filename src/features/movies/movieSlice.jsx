import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
	"movies/fetchAsyncMovies",
	async () => {
		const movieText = "Power";
		const response = await movieApi.get(
			`?apiKey=${APIKey}&s=${movieText}&type=movie`
		);
		return response.data;
	}
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
	"movies/fetchAsyncMovieOrShowDetail",
	async id => {
		const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
		return response.data;
	}
);

// Render input to filter movie genres
export const fetchAsyncMovieGenres = createAsyncThunk(
	"movies/fetchAsyncMovieGenres",
	async () => {
		const response = await movieApi.get(`?apiKey=${APIKey}&list=genre`);
		return response.data;
	}
);

const initialState = {
	movies: {},
	shows: {},
	selectMovieOrShow: {}
};

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		removeSelectedMovieOrShow: state => {
			state.selectMovieOrShow = {};
		}
	},
	extraReducers: {
		[fetchAsyncMovies.pending]: () => {
			console.log("Pending");
		},
		[fetchAsyncMovies.fulfilled]: (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, movies: payload };
		},
		[fetchAsyncMovies.rejected]: () => {
			console.log("Rejected!");
		},
		[fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, selectMovieOrShow: payload };
		},
		[fetchAsyncMovieGenres.fulfilled]: (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, movieGenres: payload };
		}
	}
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = state => state.movies.movies;
export const getGenres = state => state.movies.movieGenres;
export const getSelectedMovieOrShow = state => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
