/**
 * Imgflip MCP — wraps Imgflip API (free, no auth for template listing)
 *
 * Tools:
 * - get_memes: Get the top 100 meme templates with name, url, width, and height
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.imgflip.com';

type RawMeme = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};

type RawGetMemesResponse = {
  success: boolean;
  error_message?: string;
  data: {
    memes: RawMeme[];
  };
};

function formatMeme(meme: RawMeme) {
  return {
    id: meme.id,
    name: meme.name,
    url: meme.url,
    width: meme.width,
    height: meme.height,
    box_count: meme.box_count,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'get_memes',
    description:
      'Get the top 100 most popular meme templates from Imgflip, including name, image URL, dimensions, and text box count.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

async function callTool(name: string, _args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_memes':
      return getMemes();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function getMemes() {
  const res = await fetch(`${BASE_URL}/get_memes`);
  if (!res.ok) throw new Error(`Imgflip API error: ${res.status}`);

  const data = (await res.json()) as RawGetMemesResponse;
  if (!data.success) throw new Error(`Imgflip API error: ${data.error_message ?? 'unknown error'}`);

  return {
    count: data.data.memes.length,
    memes: data.data.memes.map(formatMeme),
  };
}

export default { tools, callTool } satisfies McpToolExport;
