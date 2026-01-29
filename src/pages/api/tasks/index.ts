import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, locals: { runtime: { env: { PB_DB } } } }) => {
  const actived = url.searchParams.get('actived');
  console.log(actived);

  const sql = 'SELECT * FROM tasks';
  const tasks = await PB_DB.prepare(sql).all();

  if (actived === 'true') {
    const results = tasks.results
      .filter(task => !task.disabled && task.countries !== '[]')
      .map(task => {
        delete task.icon_url;
        delete task.disabled;
        return { ...task, countries: JSON.parse(task.countries as string).join(','), disabled: !!task.disabled };
      });
    return Response.json(results);
  } else {
    return Response.json(tasks.results);
  }
}