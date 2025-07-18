const countries = require('../data/countries');

class CountryService {
  
  getCountryInfo(countryName) {
    const country = countries.find(c => 
      c.name.toLowerCase() === countryName.toLowerCase()
    );
    return country || null;
  }

  getCountriesByRegion(region) {
    return countries.filter(c => 
      c.region.toLowerCase() === region.toLowerCase()
    );
  }

  searchCountriesByCurrency(currency) {
    return countries.filter(c => 
      c.currencies.some(curr => 
        curr.toLowerCase() === currency.toLowerCase()
      )
    );
  }

  getCountriesByLanguage(language) {
    return countries.filter(c => 
      c.languages.some(lang => 
        lang.toLowerCase() === language.toLowerCase()
      )
    );
  }

  getAllCountries() {
    return countries.sort((a, b) => b.population - a.population);
  }

  getCountryByCapital(capital) {
    const country = countries.find(c => 
      c.capital.toLowerCase() === capital.toLowerCase()
    );
    return country || null;
  }

  getCountryStats() {
    const totalCountries = countries.length;
    const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
    const regionStats = {};
    const currencyStats = {};
    const languageStats = {};

    countries.forEach(country => {
      regionStats[country.region] = (regionStats[country.region] || 0) + 1;
      
      country.currencies.forEach(currency => {
        currencyStats[currency] = (currencyStats[currency] || 0) + 1;
      });
      
      country.languages.forEach(language => {
        languageStats[language] = (languageStats[language] || 0) + 1;
      });
    });

    const largestCountry = countries.reduce((max, c) => 
      c.area > max.area ? c : max
    );
    
    const mostPopulousCountry = countries.reduce((max, c) => 
      c.population > max.population ? c : max
    );

    return {
      totalCountries,
      totalPopulation,
      regionBreakdown: regionStats,
      currencyBreakdown: currencyStats,
      languageBreakdown: languageStats,
      largestCountryByArea: {
        name: largestCountry.name,
        area: largestCountry.area
      },
      mostPopulousCountry: {
        name: mostPopulousCountry.name,
        population: mostPopulousCountry.population
      }
    };
  }
}

module.exports = new CountryService();