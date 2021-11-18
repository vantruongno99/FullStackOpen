import diagnoses from '../data/diagnoses.json'
import { Diagnosis } from '../types'

const getAll = ():Diagnosis[]=>{
      return diagnoses;
}

export default{getAll}