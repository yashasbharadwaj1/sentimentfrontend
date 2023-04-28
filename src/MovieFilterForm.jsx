
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

export const options = {
    title: "Movie Sentiment",
};
const MovieFilterForm = () => {

    const [movies, setMovies] = useState([]);
    const [results, setResults] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('https://myyashu1.pythonanywhere.com/sentimentapi/getallmovienames/')
            .then(response => response.json())
            .then(data => {
                setMovies(data.allmovies);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const movieName = event.target.movie.value;
        const url = `https://myyashu1.pythonanywhere.com/sentimentapi/filtersentimentbymovie/${movieName}/`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: movieName })
        })
            .then(response => response.json())
            .then(data => {
                setResults(data);


            })
            .catch(error => console.error(error));
    };
    useEffect(() => {
        if (results.length > 0) {
            const data = [
                ["sentiment", "type"],
                ["positive", results[0].total_positive_comments],
                ["negative", results[0].total_negative_comments],
            ];
            setChartData(data);
        }
    }, [results]);

    return (
        <div>
            <h3>Sentiment filter my movie</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="movie">Select a movie:</label>
                <select name="movie" id="movie">
                    {movies.map(movie => (
                        <option key={movie} value={movie}>{movie}</option>
                    ))}
                </select>
                <button type="submit">Filter</button>
            </form>
            {results.map(result => (
                <div key={result.id}>
                    <p>Movie: {result.movie}</p>
                    <p>Total Comments: {result.total_comments}</p>
                    <p>Total Positive Comments: {result.total_positive_comments}</p>
                    <p>Total Negative Comments: {result.total_negative_comments}</p>
                    <p>Final Verdict: {result.final_verdict}</p>

                    <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={options}
                        width={"100%"}
                        height={"100%"}

                    />
                </div>
            ))}


        </div>
    );
};

export default MovieFilterForm;
