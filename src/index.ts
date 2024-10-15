import { Hono } from 'hono'

const app = new Hono()

async function authMiddlware(c : any, next : any) {
  if (c.req.header("Authorization")) {
    await next()
  } else {
    return c.text("You dont have access");
  }
}


app.post('/', authMiddlware,  async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({
    data: body,
    header : c.req.header("Authorization"),
    param : c.req.query("param")
  })
})
export default app
