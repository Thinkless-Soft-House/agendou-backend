import { Router } from 'express';
import SeedController from '@controllers/seed.controller';
import { Routes } from '@interfaces/routes.interface';

class SeedRoute implements Routes {
  public path = '/seed';
  public router = Router();
  public seedController = new SeedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.seedController.seedDatabase);
  }
}

export default SeedRoute;
