import express, { Request, Response } from "express";
import { userController } from "../../controllers";

export const router = express.Router();

router.post("/loginWithGithub", userController.create);

router.post("/loginWithEmail", userController.loginUsingEmail);

router.post("/signup", userController.createUsingEmail);

router.get("/", userController.read);

router.patch("/", userController.update);

router.delete("/", userController.delete);
