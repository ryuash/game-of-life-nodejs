import { Request, Response } from 'express';

interface HelloResponse {
  hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });

const rootHandler = (_req: Request, res: Response) => {
  return res.send('API is working 🤓');
};

const helloHandler = (req: Request, res: Response) => {
  const { params } = req;
  const { name = 'World' } = params;
  const response = helloBuilder(name);

  return res.json(response);
};

module.exports = {
  rootHandler,
  helloHandler
}
