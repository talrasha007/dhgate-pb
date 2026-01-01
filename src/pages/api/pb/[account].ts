import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params: { account }, url, locals: { runtime } }) => {
  return Response.json({ status: 'ok' });
};