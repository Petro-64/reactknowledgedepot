import React from 'react';
import { TextField } from "@mui/material";

function TextAreaCounterPeter(props) {
    const CHARACTER_LIMIT = props.limit;
    const [values, setValues] = React.useState({
    });
  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };
    
      return (
        <div>
          <TextField
            label={props.label}
            inputProps={{
              maxLength: CHARACTER_LIMIT,
              name: props.input.name
            }}
            value={values.name}
            helperText={`${props.input.value.length}/${CHARACTER_LIMIT}`}
            margin="normal"
            variant="outlined"
            multiline
            onChange={handleChange("comment")}
            {...props.input}
            error={props.input.value.length === CHARACTER_LIMIT}
            fullWidth
          />
        </div>
      );
  }
  
  export default TextAreaCounterPeter;

