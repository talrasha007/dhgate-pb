import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals: { runtime: { env: { PB_DB } }} }) => {
  const result = await PB_DB.prepare('SELECT * FROM account').all();
  if (result.success) {
    return Response.json(result.results);
  } else {
    return Response.json({ error: result.error }, { status: 500 });
  }
};