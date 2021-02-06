import { Controller, Get } from "@nestjs/common";
import DatabasesService from "./Databases.service";

@Controller("databases")
export class DatabasesController {
  constructor(private readonly database: DatabasesService) {}
  @Get()
  public getCurrentDatabase(): string {
    return this.database.getLocation();
  }
}

export default DatabasesController;
