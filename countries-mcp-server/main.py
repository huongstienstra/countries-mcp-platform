#!/usr/bin/env python3

from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("countries-mcp-server")

# Constants
COUNTRIES_API_BASE = "http://localhost:3000"

async def make_countries_request(url: str) -> dict[str, Any] | None:
    """Make a request to the Countries API with proper error handling."""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception:
            return None

@mcp.tool()
async def get_country_info(name: str) -> str:
    """Get detailed information about a specific country.
    
    Args:
        name: Name of the country
    """
    url = f"{COUNTRIES_API_BASE}/countries/{name}"
    data = await make_countries_request(url)
    
    if not data:
        return "Unable to fetch country information or country not found."
    
    return str(data)

@mcp.tool()
async def get_countries_by_region(region: str) -> str:
    """Get all countries in a specific region.
    
    Args:
        region: Region name (e.g., Europe, Asia, Africa)
    """
    url = f"{COUNTRIES_API_BASE}/countries/region/{region}"
    data = await make_countries_request(url)
    
    if not data:
        return "Unable to fetch countries for this region."
    
    return str(data)

@mcp.tool()
async def get_countries_by_currency(currency: str) -> str:
    """Find countries that use a specific currency.
    
    Args:
        currency: Currency code or name
    """
    url = f"{COUNTRIES_API_BASE}/countries/currency/{currency}"
    data = await make_countries_request(url)
    
    if not data:
        return "Unable to fetch countries for this currency."
    
    return str(data)

@mcp.tool()
async def get_countries_by_language(language: str) -> str:
    """Find countries where a specific language is spoken.
    
    Args:
        language: Language name
    """
    url = f"{COUNTRIES_API_BASE}/countries/language/{language}"
    data = await make_countries_request(url)
    
    if not data:
        return "Unable to fetch countries for this language."
    
    return str(data)

@mcp.tool()
async def get_country_by_capital(capital: str) -> str:
    """Find a country by its capital city.
    
    Args:
        capital: Capital city name
    """
    url = f"{COUNTRIES_API_BASE}/countries/capital/{capital}"
    data = await make_countries_request(url)
    
    if not data:
        return "Unable to fetch country for this capital or capital not found."
    
    return str(data)

@mcp.tool()
async def get_all_countries() -> str:
    """Get all countries sorted by population."""
    url = f"{COUNTRIES_API_BASE}/countries"
    data = await make_countries_request(url)
    
    if not data:
        return "Unable to fetch countries list."
    
    return str(data)

@mcp.tool()
async def get_country_stats() -> str:
    """Get interesting statistics about the countries database."""
    url = f"{COUNTRIES_API_BASE}/stats"
    data = await make_countries_request(url)
    
    if not data:
        return "Unable to fetch country statistics."
    
    return str(data)

if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport='stdio')