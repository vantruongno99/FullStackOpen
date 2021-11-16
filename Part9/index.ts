import express from "express";
import { bmiCaculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (__req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { query } = req;
  const height = Number(query.height);
  const weight = Number(query.weight);

  if (!height || !weight) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = bmiCaculator(height, weight);

  return res.status(400).json({ height, weight, bmi });
});

app.get("/exercises", (req, res) => {
  const { body } = req; 
  const { dailyExercises } = body; 
  const { target } = body;
  if (!target || !dailyExercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(dailyExercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const hasNaNInDailyHours = dailyExercises.some((hours) => isNaN(hours));
  const targetNumber = Number(target);
  if (isNaN(targetNumber) || hasNaNInDailyHours) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(dailyExercises, targetNumber));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
