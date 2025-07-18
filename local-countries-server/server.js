const express = require('express');
const countryService = require('./services/countryService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Countries Server API',
    version: '1.0.0',
    endpoints: [
      'GET /countries/region/:region - List countries by region',
      'GET /countries/currency/:currency - Find countries using specific currency',
      'GET /countries/language/:language - Find countries by spoken language',
      'GET /countries/capital/:capital - Find country by capital city',
      'GET /countries - List all countries (sorted by population)',
      'GET /countries/:name - Get detailed info about any country',
      'GET /stats - Get interesting database statistics'
    ]
  });
});

app.get('/countries/region/:region', (req, res) => {
  try {
    const countries = countryService.getCountriesByRegion(req.params.region);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/countries/currency/:currency', (req, res) => {
  try {
    const countries = countryService.searchCountriesByCurrency(req.params.currency);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/countries/language/:language', (req, res) => {
  try {
    const countries = countryService.getCountriesByLanguage(req.params.language);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/countries/capital/:capital', (req, res) => {
  try {
    const country = countryService.getCountryByCapital(req.params.capital);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/countries', (req, res) => {
  try {
    const countries = countryService.getAllCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/countries/:name', (req, res) => {
  try {
    const country = countryService.getCountryInfo(req.params.name);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/stats', (req, res) => {
  try {
    const stats = countryService.getCountryStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🌍 Countries Server running on http://localhost:${PORT}`);
  console.log('📊 Available endpoints:');
  console.log('  GET / - API documentation');
  console.log('  GET /countries/:name - Get country info');
  console.log('  GET /countries/region/:region - Countries by region');
  console.log('  GET /countries/currency/:currency - Countries by currency');
  console.log('  GET /countries/language/:language - Countries by language');
  console.log('  GET /countries - All countries (by population)');
  console.log('  GET /countries/capital/:capital - Country by capital');
  console.log('  GET /stats - Database statistics');
});

module.exports = app;