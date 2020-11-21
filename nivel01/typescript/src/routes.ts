import { Request, Response } from "express";
import createUser from "./service/CreateUser";

/**
 * @deprecated Use outra função
 * @param request rescebe uma requisição
 * @param response restorna uma resposta
 * @throws
 * 
 */
export function helloWord(request: Request, response: Response) {
  const user = createUser({
    name: 'Fabiano',
    email: "a@b",
    password: '1223',
    techs: ['nodejs', 'ReactJS', 'ReactNative',
      { title: 'javascript', experience: 100 }
    ]
  });

  return response.json({ messaghe: "Hello Word" });
}