import { Router } from "express";
import validateUser from "./users.middleware";
import * as UserHandler from "./users.handler";

const router = Router();

router.get("/", UserHandler.findAll);
router.get("/:id", UserHandler.findOne);
router.post("/", validateUser, UserHandler.createOne);
router.put("/:id", validateUser, UserHandler.updateOne);
router.delete("/:id", UserHandler.deleteOne);

export default router;
