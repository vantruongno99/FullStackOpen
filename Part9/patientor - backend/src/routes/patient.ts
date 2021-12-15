import { Router } from "express";
import patientService from '../services/patient'
import { NewPatientEntry } from '../types';
const router = Router();

router.get('/', (_req, res) => {
   return res.json(patientService.getAll())
})

router.get('/:id', (req, res) => {  
   const patient = patientService.getById(req.params.id);
   if (patient) {
      res.send(patient);
   } else {
      res.sendStatus(404);
   }
});

router.post('/', (req, res) => {
   try {
      const newPatient: NewPatientEntry = req.body;

      const addedPatient = patientService.add(newPatient);
      res.json(addedPatient);
   }
   catch (e) {
      console.log(e)
   }
})

router.post('/:id/entries', (req, res) => {
   const id = req.params.id;
   const { body } = req
   const { description, date, specialist, type } = body;
   if (!description || !date || !specialist || !type) {
      res.status(400).send({ "error": "base parameters missing" }).end();
   }
   switch (type) {
      case "Hospital": {
         const { discharge } = body
         if (!discharge) {
            res.status(400).send({ "error": "parameters missing" }).end()
         }
         break;
      }
      case "OccupationalHealthcare":
         const { employerName } = body;
         if (!employerName) {
            res.status(400).send({ "error": "parameters missing" }).end();
         }
         break;
      case "HealthCheckEntry":
         const { healthCheckRating } = body;
         if (!healthCheckRating) {
            res.status(400).send({ "error": "parameters missing" }).end();
         }
         break;
      default:
         break;
   }

   const patient = patientService.update(id, body);
   if (patient) {
      res.send(patient);
   } else {
      res.sendStatus(404);
   }
})

export default router