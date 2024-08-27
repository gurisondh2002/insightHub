const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
    end_year: {
        type: String
    },
    intensity: {
        type: Number
    },
    sector: {
        type: String
    },
    topic: {
        type: String
    },
    insight: {
        type: String
    },
    url: {
        type: String
    },
    region: {
        type: String
    },
    start_year: {
        type: String
    },
    impact: {
        type: String
    },
    added: {
        type: Date,
        default: Date.now
    },
    published: {
        type: Date
    },
    country: {
        type: String
    },
    relevance: {
        type: Number
    },
    pestle: {
        type: String
    },
    source: {
        type: String
    },
    title: {
        type: String
    },
    likelihood: {
        type: Number
    }
});

module.exports = mongoose.model('Insight', InsightSchema);
