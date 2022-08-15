import Koa from 'koa';
import mainRouter from '../routes';
import koaBody from 'koa-body';


const app = new Koa();

app.use(koaBody());

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err: any) {
    console.log(`HUBO UN ERROR ${err.message}`);
    ctx.status = 500;
    ctx.body = { error: err.message };
    ctx.app.emit('error', err, ctx);
  }
});



app.use(mainRouter);

export default app;