import  express  from 'express'
import { tagRouter } from './router/router'
const PORT = 8080;
const HOST = '0.0.0.0';
 
// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Router
app.use(tagRouter);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});


export { app }


