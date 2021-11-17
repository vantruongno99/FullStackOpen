import diagnoses from '../data/diagnoses.json'
import { DiagnoseEntry } from '../types'

const getAll = ():DiagnoseEntry[]=>{
      return diagnoses;
}

export default{getAll}