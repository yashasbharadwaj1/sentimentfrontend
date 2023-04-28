import React, { useState, useEffect } from 'react';

const App = () => {
    const [heroines, setHeroines] = useState([]);
    const [selectedHeroine, setSelectedHeroine] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const fetchHeroines = async () => {
            const response = await fetch('https://myyashu1.pythonanywhere.com/sentimentapi/allheroines/');
            const data = await response.json();
            setHeroines(data.allheroines);
        };

        fetchHeroines();
    }, []);

    const handleHeroineSelection = async (heroine) => {
        setSelectedHeroine(heroine);
        const response = await fetch(`https://myyashu1.pythonanywhere.com/sentimentapi/filterbyheroine/${heroine}/`);
        const data = await response.json();
        setFilteredMovies(data.heroine_plus_verdict);
    };

    return (
        <div>
            <h3>Select a heroine:</h3>
            <select value={selectedHeroine} onChange={(e) => handleHeroineSelection(e.target.value)}>
                <option value="">--Select a heroine--</option>
                {heroines.map((heroine, index) => (
                    <option key={index} value={heroine}>{heroine}</option>
                ))}
            </select>
            {filteredMovies.length > 0 && (
                <div>
                    <h3>Filtered movies:</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Final Verdict</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredMovies.map((movie, index) => (
                            <tr key={index}>
                                <td>{movie.movie}</td>
                                <td>{movie.final_verdict}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default App;
