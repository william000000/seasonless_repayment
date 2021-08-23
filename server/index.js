/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import routes from './routes';
import Response from './helpers/Response';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/", routes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to My App"
  });
});

app.use((req, res, next) =>
  next({
    status: 404,
    message: "The url you tried is currently unavaillable"
  })
);

app.use((err, req, res, next) =>
  Response.errorMessage(req, res, err.message, err.status || 500)
);

let PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App is listening to port ${PORT}`));



export default app;
