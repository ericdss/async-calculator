import { UserRepository as UsersRepos } from "../../infra/mongoose/repositories/UserRepository";
import { UserService as UsersServ } from "../../domain/services/User/UserService";
import { UsersController as UsersCtrller } from "./UsersController";

import { CalculatorRepository as CalculatorRepos } from "../../infra/mongoose/repositories/CalculatorRepository";
import { CalculatorService as CalculatorServ } from "../../domain/services/Calculator/CalculatorService";
import { CalculatorController as CalculatorCtrller } from "./CalculatorsController";
import { CalculatorPublisher as CalculatorPublish } from "../../infra/services/RabbitMQ/CalculatorPublisher";


// Users
const UsersRepository = new UsersRepos();
const UsersService = new UsersServ(UsersRepository);
const UsersControler = new UsersCtrller(UsersService);


// Calculator
const CalculatorPublisher = new CalculatorPublish();
const CalculatorRepository = new CalculatorRepos();
const CalculatorService = new CalculatorServ(CalculatorRepository, CalculatorPublisher);
const CalculatorControler = new CalculatorCtrller(CalculatorService, CalculatorRepository);

export { CalculatorControler, UsersControler };