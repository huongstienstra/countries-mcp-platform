# Countries MCP Server

A Model Context Protocol (MCP) server that provides access to countries data through a local countries API server.

## Features

The MCP server provides the following tools:

- `get_country_info` - Get detailed information about a specific country
- `get_countries_by_region` - Get all countries in a specific region  
- `get_countries_by_currency` - Find countries that use a specific currency
- `get_countries_by_language` - Find countries where a specific language is spoken
- `get_country_by_capital` - Find a country by its capital city
- `get_all_countries` - Get all countries sorted by population
- `get_country_stats` - Get interesting statistics about the countries database

## Prerequisites

1. Install dependencies:
```bash
pip install -e .
```

2. Start the local countries server:
```bash
cd ../local-countries-server
npm install
npm start
```

The local server should be running on http://localhost:3000

## Usage

Run the MCP server:
```bash
python main.py
```

The server will connect to the local countries API and provide MCP tools for accessing country data.

## Configuration

By default, the server connects to `http://localhost:3000`. You can modify the base URL in the `CountriesMCPServer` constructor if needed.