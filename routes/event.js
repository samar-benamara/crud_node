import express from "express";
import { addEvent, getEventById, updateEvent } from "../controller/event.js";
import { validateEvent } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/create", validateEvent, addEvent);
router.get("/:id", getEventById);
router.patch("/:id", updateEvent);

export default router;
