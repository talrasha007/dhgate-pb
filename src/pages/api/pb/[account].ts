import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params: { account }, url, locals: { runtime: { env: { PB_DB } } } }) => {
  const { orderNum, sAmount: sAmountStr, eCommis: eCommisStr, cTime, pTime, region, device, tracking } = Object.fromEntries(url.searchParams.entries());
  if (orderNum && sAmountStr && eCommisStr && cTime && pTime && region && device && tracking) {
    const sAmount = parseFloat(sAmountStr);
    const eCommis = parseFloat(eCommisStr);
    if (isNaN(sAmount) || isNaN(eCommis)) {
      return Response.json({ status: 'error', message: 'Invalid amount format' }, { status: 400 });
    }

    if (tracking.indexOf(`|${account}|`) === -1) {
      return Response.json({ status: 'error', message: 'Tracking does not match account' }, { status: 400 });
    }

    await PB_DB.prepare(
      `INSERT INTO pb_order (account, order_num, s_amount, e_commis, c_time, p_time, region, device, tracking)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(account, orderNum, sAmount, eCommis, cTime, pTime, region, device, tracking).run();
  }

  return Response.json({ status: 'ok' });
};