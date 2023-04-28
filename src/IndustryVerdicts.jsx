import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const IndustryVerdicts = () => {
    const [industries, setIndustries] = useState([]);
    const [industry, setIndustry] = useState('');
    const [verdicts, setVerdicts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchIndustries = async () => {
            const result = await fetch('https://myyashu1.pythonanywhere.com/sentimentapi/getallindustrynames/');
            const data = await result.json();
            setIndustries(data.allindustries);
        };
        fetchIndustries();
    }, []);

    const handleIndustryChange = async (e) => {
        setIndustry(e.target.value);
        setLoading(true);
        const result = await fetch(`https://myyashu1.pythonanywhere.com/sentimentapi/filterindustryverdicts/${e.target.value}/`);
        const data = await result.json();
        setVerdicts(data);
        setLoading(false);
    };

    return (
        <div>
            <h3>Industry Verdicts</h3>
            <label htmlFor="industry-select">Select an industry:</label>
            <select id="industry-select" value={industry} onChange={handleIndustryChange}>
                <option value="">--Select--</option>
                {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                ))}
            </select>
            {loading && <p>Loading...</p>}
            {verdicts && (
                <>
                    <Chart
                        chartType="PieChart"
                        data={[
                            ['Verdict', 'Count'],
                            ['Positive', verdicts.total_positive_verdicts],
                            ['Negative', verdicts.total_negative_verdicts],
                        ]}
                        options={{
                            title: `How many movies turned out to be positive or negative for ${industry}`,
                            is3D: true,
                        }}
                        width="100%"
                        height="400px"
                        legendToggle
                    />
                    <h4>Movie Verdict List:</h4>
                    <ul>
                        {verdicts.movie_plus_verdict.map((movieVerdict) => (
                            <li key={movieVerdict.movie}>
                                {movieVerdict.movie}: {movieVerdict.final_verdict}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default IndustryVerdicts;

