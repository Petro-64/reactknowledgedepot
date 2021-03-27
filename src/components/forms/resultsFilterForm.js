import React from 'react';
import { Field, reduxForm } from 'redux-form';

const data = {
    // used to populate "account" reducer when "Load" is clicked
    firstName: 'Jane',
    lastName: 'Doe',
    age: '42',
    sex: 'female',
    employed: true,
    favoriteColor: 'Blue',
    bio: 'Born to write amazing Redux code.'
  }

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } 

    return errors
  }

let ResultsFilterForm = props => {
  const { handleSubmit, pristine, reset, submitting, errorMessage, errorMessageVisibility, subjectsUser } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h5>Filter data:</h5>  
      <div>
        <div>
        </div>
      </div>
      <div>
       {subjectsUser.map((value, index) => ( <>
       <label htmlFor={value.name}>
         {value.name}</label>&nbsp;
         <Field name={value.name} id={value.id} component="input" type="checkbox"/>
         <br/></>))}
      </div>
    </form>
  );
};

ResultsFilterForm = reduxForm({
  form: 'resultsFilterFormRedux', 
  validate
})(ResultsFilterForm);

export default ResultsFilterForm;