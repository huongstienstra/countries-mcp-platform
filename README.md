# Countries MCP Server Project

A Model Context Protocol (MCP) server that provides access to countries data through a local Node.js API server. This project demonstrates how to build and integrate MCP servers with Claude Desktop.

## Project Structure

```
mcp-countries/
├── local-countries-server/          # Node.js API server
│   ├── server.js                    # Express server with countries endpoints
│   ├── services/countryService.js   # Business logic for country operations
│   ├── data/countries.js            # Countries database
│   └── package.json                 # Node.js dependencies
└── countries-mcp-server/            # Python MCP server
    ├── main.py                      # MCP server implementation
    ├── pyproject.toml               # Python dependencies
    └── README.md                    # This file
```

## Setup Instructions

### 1. Set Up the Local Countries Server

First, start the Node.js API server that provides the countries data:

```bash
cd local-countries-server
npm install
npm start
```

The server will start on `http://localhost:3000` and provide these endpoints:
- `GET /countries/:name` - Get detailed info about any country
- `GET /countries/region/:region` - List countries by region
- `GET /countries/currency/:currency` - Find countries using specific currency
- `GET /countries/language/:language` - Find countries by spoken language
- `GET /countries/capital/:capital` - Find country by capital city
- `GET /countries` - List all countries (sorted by population)
- `GET /stats` - Get interesting database statistics

### 2. Set Up the MCP Server

The MCP server connects to the local API and exposes the data as MCP tools:

```bash
cd countries-mcp-server
```

#### Install Dependencies

The project uses `uv` for Python package management. Install it first:

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
# or with Homebrew
brew install uv
```

Dependencies will be automatically installed when the server runs.

### 3. Configure Claude Desktop

Add the MCP server to Claude Desktop's configuration:

1. Open (or create) the Claude Desktop config file:
```bash
# macOS
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. Add the MCP server configuration:
```json
{
  "mcpServers": {
    "countries-mcp-server": {
      "command": "/Users/YOUR_USERNAME/.local/bin/uv",
      "args": [
        "--directory",
        "/ABSOLUTE/PATH/TO/mcp-countries/countries-mcp-server",
        "run",
        "main.py"
      ]
    }
  }
}
```

**Important**: Replace the paths with your actual absolute paths:
- Replace `YOUR_USERNAME` with your actual username
- Replace `/ABSOLUTE/PATH/TO/mcp-countries` with the full path to your project

3. Restart Claude Desktop completely to load the new configuration.

## Usage

### Available MCP Tools

Once configured, the following tools will be available in Claude Desktop:

1. **get_country_info** - Get detailed information about a specific country
   - Parameter: `name` (string) - Name of the country

2. **get_countries_by_region** - Get all countries in a specific region
   - Parameter: `region` (string) - Region name (e.g., Europe, Asia, Africa)

3. **get_countries_by_currency** - Find countries that use a specific currency
   - Parameter: `currency` (string) - Currency code or name

4. **get_countries_by_language** - Find countries where a specific language is spoken
   - Parameter: `language` (string) - Language name

5. **get_country_by_capital** - Find a country by its capital city
   - Parameter: `capital` (string) - Capital city name

6. **get_all_countries** - Get all countries sorted by population
   - No parameters required

7. **get_country_stats** - Get interesting statistics about the countries database
   - No parameters required

### Example Prompts for Claude

Here are some example prompts you can use with Claude Desktop:

```
"Tell me about Japan using the country info tool"

"What countries are in Europe? Use the regions tool"

"Which countries use the Euro currency?"

"What countries speak Spanish?"

"What country has Paris as its capital?"

"Show me all countries sorted by population"

"Give me some interesting statistics about the countries database"

"Compare the populations of China, India, and the United States"

"List all countries in Africa and their capitals"

"Which countries border the United States?"
```

## How It Works

### Architecture

1. **Local Countries Server** (Node.js)
   - Provides RESTful API endpoints for country data
   - Handles business logic and data filtering
   - Runs on `http://localhost:3000`

2. **Countries MCP Server** (Python)
   - Connects to the local API server
   - Exposes country data as MCP tools
   - Communicates with Claude Desktop via stdio transport

3. **Claude Desktop Integration**
   - Automatically starts the MCP server when launched
   - Makes tools available in conversations
   - Handles tool execution and response formatting

### Data Flow

```
Claude Desktop → MCP Server → Local API Server → Country Data
```

1. User asks Claude about countries
2. Claude calls the appropriate MCP tool
3. MCP server makes HTTP request to local API
4. Local API returns country data
5. MCP server formats and returns data to Claude
6. Claude presents the information to the user

## Troubleshooting

### Common Issues

1. **MCP Server Not Connecting**
   - Ensure the local countries server is running on port 3000
   - Check that `uv` is installed and in your PATH
   - Verify the paths in `claude_desktop_config.json` are absolute and correct
   - Restart Claude Desktop after configuration changes

2. **"Cannot connect to countries server" Error**
   - Make sure the Node.js server is running: `npm start` in `local-countries-server/`
   - Check if port 3000 is available: `curl http://localhost:3000`

3. **Tools Not Appearing in Claude**
   - Verify the MCP server configuration is correct
   - Check Claude Desktop logs for errors
   - Ensure you've restarted Claude Desktop

### Viewing Logs

Check MCP server logs for debugging:

```bash
# macOS
tail -f ~/Library/Logs/Claude/mcp-server-countries-mcp-server.log
```

### Testing the Setup

1. Test the local API server:
```bash
curl http://localhost:3000/countries/Japan
```

2. Test the MCP server directly:
```bash
cd countries-mcp-server
uv run main.py
# Should start without errors
```

## Development

### Modifying the Countries Data

Edit `local-countries-server/data/countries.js` to add or modify country information.

### Adding New MCP Tools

1. Add new endpoint to `local-countries-server/server.js`
2. Add corresponding tool function to `countries-mcp-server/main.py`
3. Use the `@mcp.tool()` decorator pattern

### Technical Details

- **MCP Protocol Version**: 2025-06-18
- **Transport**: stdio
- **Python MCP Framework**: FastMCP
- **Local API Framework**: Node.js

## License

This project is for educational purposes and demonstrates MCP integration patterns.