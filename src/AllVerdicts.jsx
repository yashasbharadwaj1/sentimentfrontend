import React, { useState, useEffect } from 'react';
import './AllVerdicts.css';
const AllVerdicts = () => {
    const [verdicts, setVerdicts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('https://myyashu1.pythonanywhere.com/sentimentapi/getallverdicts/');
            const data = await result.json();
            setVerdicts(data.output);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h3> all movie verdicts from model</h3>
            <table className="verdicts-table">
                <thead>
                <tr>
                    <th>Movie</th>
                    <th>Total Comments</th>
                    <th>Total Positive Comments</th>
                    <th>Total Negative Comments</th>
                    <th>Final Verdict</th>
                </tr>
                </thead>
                <tbody>
                {verdicts.map((verdict) => (
                    <tr key={verdict.id}>
                        <td>{verdict.movie}</td>
                        <td>{verdict.total_comments}</td>
                        <td>{verdict.total_positive_comments}</td>
                        <td>{verdict.total_negative_comments}</td>
                        <td>{verdict.final_verdict}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllVerdicts;
