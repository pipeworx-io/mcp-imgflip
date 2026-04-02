# mcp-imgflip

MCP server for popular meme templates via the [Imgflip API](https://imgflip.com/api). No authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `get_memes` | Get the top 100 most popular meme templates |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "imgflip_get_memes",
      "arguments": {}
    },
    "id": 1
  }'
```

## License

MIT
