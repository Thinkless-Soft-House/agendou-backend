import { NextFunction, Request, Response } from 'express';
import SeedService from '@/services/seed.service';

class SeedController {
  public seedService = new SeedService();

  public seedDatabase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.seedService.seed();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default SeedController;
