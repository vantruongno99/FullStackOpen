import { Router } from "express";
import diagnoseService from "../services/diagnose";

const router = Router();

router.get("/", (_req, res) => {
  return res.json(diagnoseService.getAll());
});

export default router;