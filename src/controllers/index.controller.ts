import { checkDiffInterval } from '@/utils/util';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Exemplos de teste
      const intervaloA = { start: '12:00', end: '13:00' };
      const intervaloB1 = { start: '13:00', end: '14:00' };
      const intervaloB2 = { start: '11:00', end: '12:00' };
      const intervaloB3 = { start: '11:30', end: '12:30' };
      const intervaloB4 = { start: '12:30', end: '13:30' };

      console.log(checkDiffInterval(intervaloA, intervaloB1)); // false
      console.log(checkDiffInterval(intervaloA, intervaloB2)); // false
      console.log(checkDiffInterval(intervaloA, intervaloB3)); // true
      console.log(checkDiffInterval(intervaloA, intervaloB4)); // true

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
