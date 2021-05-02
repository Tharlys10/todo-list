import { AuthenticationUserController } from "@modules/accounts/useCases/authenticationUser/AuthenticationUserController";
import { Router } from "express";

const authenticationRoutes = Router();

const authenticationUserController = new AuthenticationUserController();

authenticationRoutes.post("/", authenticationUserController.handle);

export { authenticationRoutes }