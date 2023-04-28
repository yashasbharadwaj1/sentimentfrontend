import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const HeroAnalytics = () => {
    const [heroes, setHeroes] = useState([]);
    const [selectedHero, setSelectedHero] = useState('');
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        const fetchHeroes = async () => {
            const result = await fetch('https://myyashu1.pythonanywhere.com/sentimentapi/allheroes/');
            const data = await result.json();
            setHeroes(data.allheroes);
        };

        fetchHeroes();
    }, []);

    const handleSelectHero = async (hero) => {
        setSelectedHero(hero);
        const result = await fetch(`https://myyashu1.pythonanywhere.com/sentimentapi/filterbyhero/${encodeURIComponent(hero)}/`);
        const data = await result.json();
        setHeroData(data);
    };

    return (
        <div>
            <h3>Hero Analytics</h3>
            <div>
                <label htmlFor="hero-select">Select a hero:</label>
                <select id="hero-select" value={selectedHero} onChange={(e) => handleSelectHero(e.target.value)}>
                    <option value="">Select a hero</option>
                    {heroes.map((hero) => (
                        <option key={hero} value={hero}>
                            {hero}
                        </option>
                    ))}
                </select>
            </div>
            {heroData && (
                <div>
                    <h4>{heroData.industry}</h4>
                    <ul>
                        {heroData.hero_plus_verdict.map((movieData) => (
                            <li key={movieData.movie}>
                                {movieData.movie}: {movieData.final_verdict}
                            </li>
                        ))}
                    </ul>

                </div>
            )}

        </div>
    );
};

export default HeroAnalytics;
