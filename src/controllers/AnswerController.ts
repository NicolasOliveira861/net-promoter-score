import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  // http://localhost:3333/answers/10?u=559ab797-55b0-47eb-a30d-89dc0a335168
  /*
    * Route Params => Parâmetros que compõem a rota
      routes.get("/answers/:value")

    * Query Params => Busca, paginação, não obrigatórios
    ?
    chave=valor
  */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey user does not exists!");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
