import { Router } from "express";
import patientService from '../services/patient'
import { NewPatientEntry} from '../types';
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

export default router