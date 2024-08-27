"use client";

import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, Radar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    RadarController,
    ArcElement,
    RadialLinearScale
} from 'chart.js';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import pf from '../../public/pf.png';
import pm from '../../public/pm.png';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    RadarController,
    ArcElement,
    RadialLinearScale
);


const DashboardPage = () => {

    const [adminName, setAdminName] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAdminName(localStorage.getItem('adminName'));
        }
    }, []);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        topic: '',
        sector: '',
        pestle: '',
        end_year: '',
        country: '',
        source: '',
        likelihood: ''
    });

    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hours = new Date().getHours();
        let greet = '';

        if (hours < 12) {
            greet = 'Good Morning';
        } else if (hours < 18) {
            greet = 'Good Afternoon';
        } else {
            greet = 'Good Evening';
        }

        setGreeting(greet);
    }, []);

    useEffect(() => {
        const checkAndInsertData = async () => {
            try {
                const insights = [
                    {
                        "end_year": "",
                        "intensity": 6,
                        "sector": "Energy",
                        "topic": "gas",
                        "insight": "Annual Energy Outlook",
                        "url": "http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf",
                        "region": "Northern America",
                        "start_year": "",
                        "impact": "",
                        "added": "January, 20 2017 03:51:25",
                        "published": "January, 09 2017 00:00:00",
                        "country": "United States of America",
                        "relevance": 2,
                        "pestle": "Industries",
                        "source": "EIA",
                        "title": "U.S. natural gas consumption is expected to increase during much of the projection period.",
                        "likelihood": 3
                    },
                    {
                        "end_year": 2016,
                        "intensity": 3,
                        "sector": "Retail",
                        "topic": "export",
                        "insight": "IEA Says Oil Prices May Fall Even Further Before Supply Fades in 2016",
                        "url": "http://www.bloomberg.com/news/articles/2015-07-10/iea-says-oil-price-may-fall-further-before-supply-fades-in-2016",
                        "region": "",
                        "start_year": "",
                        "impact": "",
                        "added": "July, 03 2016 06:00:23",
                        "published": "July, 10 2015 00:00:00",
                        "country": "",
                        "relevance": 1,
                        "pestle": "Economic",
                        "source": "Bloomberg Business",
                        "title": "There will be no overall production growth outside the Organization of Petroleum Exporting Countries next year for the first time since 2008.",
                        "likelihood": 3
                    },
                    {
                        "end_year": "",
                        "intensity": 2,
                        "sector": "",
                        "topic": "",
                        "insight": "Greenhouse gas",
                        "url": "https://en.wikipedia.org/wiki/Greenhouse_gas",
                        "region": "World",
                        "start_year": "",
                        "impact": "",
                        "added": "July, 03 2016 05:28:48",
                        "published": "July, 03 2016 00:00:00",
                        "country": "",
                        "relevance": 1,
                        "pestle": "",
                        "source": "Wikipedia",
                        "title": "Earth's surface temperature could exceed historical values as early as 2047.",
                        "likelihood": 2
                    }
                ];
                const response = await axios.post('http://localhost:5000/api/insights/insert', insights);
                console.log(response.data);
            } catch (error) {
                console.error('Error initializing data:', error);
            }
        };

        checkAndInsertData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/insights/all');
                console.log("HELLO", response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = data;

            if (filters.topic) {
                filtered = filtered.filter(item => item.topic === filters.topic);
            }
            if (filters.sector) {
                filtered = filtered.filter(item => item.sector === filters.sector);
            }
            if (filters.pestle) {
                filtered = filtered.filter(item => item.pestle === filters.pestle);
            }
            if (filters.likelihood) {
                filtered = filtered.filter(item => item.likelihood === filters.likelihood);
            }
            if (filters.country) {
                filtered = filtered.filter(item => item.country === filters.country);
            }
            if (filters.end_year) {
                filtered = filtered.filter(item => item.end_year === filters.end_year);
            }
            if (filters.source) {
                filtered = filtered.filter(item => item.source === filters.source);
            }

            setFilteredData(filtered);
        };

        applyFilters();
    }, [data, filters]);

    const generateChartData = (insights) => {
        const topics = [...new Set(insights.map(insight => insight.topic))];
        const pestles = [...new Set(insights.map(insight => insight.pestle))];

        return {
            barData: {
                labels: topics,
                datasets: [{
                    label: 'Intensity',
                    data: topics.map(topic => insights.filter(i => i.topic === topic).reduce((sum, i) => sum + i.intensity, 0)),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            lineData: {
                labels: topics,
                datasets: [{
                    label: 'Intensity Over Time',
                    data: topics.map(topic => insights.filter(i => i.topic === topic).reduce((sum, i) => sum + i.intensity, 0)),
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            pieData: {
                labels: topics,
                datasets: [{
                    label: 'Topic Distribution',
                    data: topics.map(topic => insights.filter(i => i.topic === topic).length),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            radarData: {
                labels: ['Relevance', 'Likelihood', 'Impact', 'Intensity'],
                datasets: [{
                    label: 'Insight Evaluation',
                    data: [
                        insights.reduce((acc, i) => acc + i.relevance, 0) / insights.length,
                        insights.reduce((acc, i) => acc + i.likelihood, 0) / insights.length,
                        insights.reduce((acc, i) => acc + i.impact, 0) / insights.length,
                        insights.reduce((acc, i) => acc + i.intensity, 0) / insights.length
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            doughnutData: {
                labels: pestles,
                datasets: [{
                    label: 'Pestle Distribution',
                    data: pestles.map(pestle => insights.filter(i => i.pestle === pestle).length),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        };
    };

    const chartData = generateChartData(filteredData);

    const totalInsights = filteredData.length;
    const uniquePestles = [...new Set(filteredData.map(insight => insight.pestle))].length;
    const uniqueTopics = [...new Set(filteredData.map(insight => insight.topic))].length;
    const uniqueSectors = [...new Set(filteredData.map(insight => insight.sector))].length;

    const latestInsight = filteredData.sort((a, b) => new Date(b.added) - new Date(a.added))[0];

    const cardData = [
        {
            title: 'Total Insights',
            image: require("../../public/insight.png"),
            content: totalInsights.toLocaleString(),
        },
        {
            title: 'Total Pestle Types',
            image: require("../../public/pestle.png"),
            content: uniquePestles.toLocaleString(),
        },
        {
            title: 'Total Topics',
            image: require("../../public/topic.png"),
            content: uniqueTopics.toLocaleString(),
        },
        {
            title: 'Total Sectors',
            image: require("../../public/sector.png"),
            content: uniqueSectors.toLocaleString(),
        }
    ];

    const adminGender = typeof window !== 'undefined' ? localStorage.getItem('adminGender') : 'Male';

    const imageSrc = adminGender === 'Male' ? pm : pf;


    return (
        <div>
            <div className='flex justify-between flex-wrap gap-5'>
                <div className='w-[39%] p-4 rounded-md bg-white'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <p className="text-[30px] text-[#142A6E] font-semibold">
                                {greeting}
                            </p>
                            <p className="text-[25px] text-[#142A6E] font-semibold">{adminName}</p>
                            <p>Hope you are doing well</p>
                        </div>
                        <Image src={imageSrc} alt="Person" className="w-40 h-40 mb-2" />
                    </div>
                </div>
                <div className='w-[59%] p-4 rounded-md bg-white'>
                    {latestInsight && (
                        <div className="latest-insight">
                            <p className='text-[20px] text-[#142A6E] font-semibold'>Latest Insight</p>
                            <p><strong>Title:</strong> {latestInsight.title}</p>
                            <p><strong>Insight:</strong> {latestInsight.insight}</p>
                            <div className='flex justify-between'>
                                <p><strong>Country:</strong> {latestInsight.country}</p>
                                <p><strong>Published:</strong> {new Date(latestInsight.published).toLocaleDateString()}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p><strong>Relevance:</strong> {latestInsight.relevance}</p>
                                <a href={latestInsight.url} target="_blank" rel="noopener noreferrer" className='text-[#18BADD]' style={{ textDecoration: "underline" }}>Read More</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className='flex flex-col items-center justify-center p-5 rounded-md cursor-pointer bg-white'
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <Image src={card.image} alt={card.title} className='w-16 h-16 mb-2' />
                        <p className='text-lg text-[#18BADD] font-semibold'>{card.title}</p>
                        <div
                            className={`text-[18px] transition-transform duration-300 ease-in-out ${hoveredCard === index ? 'transform scale-105 text-[#142A6E]' : 'text-gray-400'}`}
                        >
                            {card.content}
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-5 gap-1 flex'>
                <input
                    type="text"
                    placeholder="Filter by topic"
                    className='p-2 bg-white rounded-md'
                    onChange={(e) => setFilters(prev => ({ ...prev, topic: e.target.value }))}
                />
                <input
                    type="text"
                    className='p-2 bg-white rounded-md'
                    placeholder="Filter by sector"
                    onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                />
                <input
                    type="text"
                    className='p-2 bg-white rounded-md'
                    placeholder="Filter by pestle"
                    onChange={(e) => setFilters(prev => ({ ...prev, pestle: e.target.value }))}
                />
                <input
                    type="text"
                    className='p-2 bg-white rounded-md'
                    placeholder="Filter by end year"
                    onChange={(e) => setFilters(prev => ({ ...prev, end_year: e.target.value }))}
                />
                <input
                    type="text"
                    className='p-2 bg-white rounded-md'
                    placeholder="Filter by source"
                    onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                />
                <input
                    type="text"
                    className='p-2 bg-white rounded-md'
                    placeholder="Filter by country"
                    onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                />
                {/* <button onClick={applyFilter} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Apply Filters</button>
                <button onClick={resetFilters} className="bg-gray-500 text-white px-4 py-2 rounded ml-2 mt-2">Reset Filters</button> */}
            </div>

            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5 min-w-full">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-base font-semibold mb-2">Intensity Bar Chart</h3>
                        <Bar data={chartData.barData} options={{ responsive: true }} />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-base font-semibold mb-2">Intensity Over Time</h3>
                        <Line data={chartData.lineData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 min-w-full">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-base font-semibold mb-2">Topic Distribution</h3>
                        <Pie data={chartData.pieData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Pie Chart' } } }} />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-base font-semibold mb-2">Insight Evaluation</h3>
                        <Radar data={chartData.radarData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Radar Chart' } } }} />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-base font-semibold mb-2">Pestle Distribution</h3>
                        <Doughnut data={chartData.doughnutData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Doughnut Chart' } } }} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardPage;