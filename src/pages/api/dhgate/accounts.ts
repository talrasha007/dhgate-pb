import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals: { runtime: { env: { PB_DB } }} }) => {
  const accounts = await PB_DB.prepare('SELECT * FROM account').all();
  return Response.json(accounts);
};