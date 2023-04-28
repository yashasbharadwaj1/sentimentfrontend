import React, { useState, useEffect } from 'react';
import './FilterByVerdict.css';

const FilterByVerdict = () => {
    const [verdicts, setVerdicts] = useState([]);
    const [selectedVerdict, setSelectedVerdict] = useState('');
    const [moviesByVerdict, setMoviesByVerdict] = useState([]);

    useEffect(() => {
        const fetchVerdicts = async () => {
            const result = await fetch(
                'https://myyashu1.pythonanywhere.com/sentimentapi/getallpossibleverdicts/'
            );
            const data = await result.json();
            setVerdicts(data.allpossibleverdicts);
        };
        fetchVerdicts();
    }, []);

    const handleSelectChange = async (event) => {
        const result = await fetch(
            `https://myyashu1.pythonanywhere.com/sentimentapi/filterbyverdict/${event.target.value}/`
        );
        const data = await result.json();
        setMoviesByVerdict(data.movies_by_verdict);
        setSelectedVerdict(event.target.value);
    };

    return (
        <div>
            <h3>Filter By Verdict</h3>
            <div className="container">
                <div className="dropdown-container">
                    <label htmlFor="verdict-select">Select Verdict:</label>
                    <select
                        name="verdict-select"
                        id="verdict-select"
                        value={selectedVerdict}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select a verdict</option>
                        {verdicts.map((verdict) => (
                            <option key={verdict} value={verdict}>
                                {verdict}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="table-container">
                    {moviesByVerdict.length > 0 && (
                        <table>
                            <thead>
                            <tr>
                                <th>Movie</th>
                            </tr>
                            </thead>
                            <tbody>
                            {moviesByVerdict.map((movie) => (
                                <tr key={movie}>
                                    <td>{movie}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterByVerdict;
