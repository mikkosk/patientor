import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, ErrorMessage, getIn } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection } from "./FormField";
import { FormEntry } from "../types";
import { useStateValue } from "../state";
import { NumberField } from "../AddPatientModal/FormField";
import { parse } from "path";


interface Props {
  onSubmit: (values: FormEntry) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        description: "",
        discharge: {
            dischargeDate: "",
            criteria: ""
        },
        healthCheckRating: 0,
        sickLeave: {
            startDate: "",
            endDate: ""
        },
        employerName: "",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | object } = {};
        if(!values.type) {
            errors.type = requiredError;
        }
        if(!values.date) {
            errors.date = requiredError;
        } else if (!Date.parse(values.date)) {
            errors.date = "Wrong format"
        }
        if(!values.specialist) {
            errors.specialist = requiredError;
        }
        if(!values.description) {
            errors.description = requiredError;
        }
        if(values.type === "HealthCheck") {
            if (!values.healthCheckRating && values.healthCheckRating !== 0) {
                errors.healthCheckRating = requiredError;
            }
        } else if (values.type === "Hospital") {
                if(values.discharge) {
                    if(!values.discharge.criteria) {
                        const discharge = errors.discharge;
                        if(typeof discharge !== 'string') {
                            errors.discharge = { ...discharge, criteria: requiredError };
                        }
                    }
                    if(!values.discharge.dischargeDate) {
                        const discharge = errors.discharge;
                        if(typeof discharge !== 'string') {
                            errors.discharge = { ...discharge, dischargeDate: requiredError };
                        }
                    }

                    else if(!Date.parse(values.discharge.dischargeDate)) {
                        const discharge = errors.discharge;
                        if(typeof discharge !== 'string') {
                            errors.discharge = { ...discharge, dischargeDate: "Wrong format" };
                        }
                    }
                }
                
        } else if (values.type === "OccupationalHealthcare") {
            if(!values.employerName) {
                errors.employerName = requiredError;
            }
            if(values.sickLeave) {
                if(!Date.parse(values.sickLeave.startDate)) {
                    const sickLeave = errors.sickLeave;
                    if(typeof sickLeave !== 'string') {
                        errors.sickLeave = { ...sickLeave, startDate: "Wrong format" };
                    }
                }

                if(!Date.parse(values.sickLeave.endDate)) {
                    const sickLeave = errors.sickLeave;
                    if(typeof sickLeave !== 'string') {
                        errors.sickLeave = { ...sickLeave, endDate: "Wrong format" };
                    }
                }
            }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
            /> 
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {values.type === "HealthCheck" && (
                <Field
                    label="healthCheckRating"
                    name="healthCheckRating"
                    component={NumberField}
                    min={0}
                    max={3}
                />
            )}
            {values.type === "OccupationalHealthcare" && (
                <div>
                    <Field
                        label="Employer Name"
                        placeholder="Employer Name"
                        name="employerName"
                        component={TextField}
                    />
                    <h2>Sickleave</h2>
                    <Field
                        label="Start Date"
                        placeholder="Start Date"
                        name="sickLeave.startDate"
                        component={TextField}
                    />
                    <Field
                        label="End Date"
                        placeholder="End Date"
                        name="sickLeave.endDate"
                        component={TextField}
                    />
                </div>

            )}
            {values.type === "Hospital" && (
                <div>
                    <h2>Discharge</h2>
                    <Field
                        label="Discharge date"
                        placeholder="YYYY-MM-DD"
                        name="discharge.dischargeDate"
                        component={TextField}
                    />
                    <Field
                        label="Criteria"
                        placeholder="Criteria"
                        name="discharge.criteria"
                        component={TextField}
                    />
                </div>
            )}
            
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
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;