import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params: { account }, locals: { runtime: { env: { PB_DB } }} }) => {
  const acc = await PB_DB.prepare('SELECT * FROM account WHERE account = ?').bind(account).first();
  if (!acc) {
    return new Response('Account not found', { status: 404 });
  }

  const url = new URL('https://aff.dhgate.com/api/affiliate/order/queryOrderList?beginDate=2026-01-03&endDate=2026-01-03&pageNum=2&pageSize=20&orderNo=&verifyStatus=&mediaId=&trackingSourceId=');

  return await fetch(url, {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'aff-client': '1',
      authorization: acc.api_key as string,
    }
  });
};