import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes: [],
                type: "Hospital",
                discharge: {
                    date: "",
                    criteria: ""
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) errors.date = requiredError;
                if (!values.description) errors.description = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                if (!values.type) errors.type = requiredError;
                if (!values.discharge) errors.discharge = requiredError;

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Type of entry"
                            name="type"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Entry description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist name"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Discharge Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />
                        <Field
                            label="Discharge Criteria"
                            placeholder="Criteria for discharge"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddEntryForm;