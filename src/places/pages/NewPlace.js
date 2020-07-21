import React, { useState } from 'react'
import { useForm, Controller }  from 'react-hook-form'
import { TextField, Button, Grid } from '@material-ui/core'

const NewPlace = () => {
  const { control, handleSubmit } = useForm();
  const [errors, setErrors] = useState({
    title: "",
    description: ""
  })
  const onSubmit = data => console.log(data);

  const validate = ({ type, text }) => {
    const errorText = text.length > 0 ? "" : "This field is required"
    switch (type) {
      case "TITLE":
        setErrors(errors => ({ ...errors, title: errorText }))
        break;
      case "DESCRIPTION":
        setErrors(errors => ({ ...errors, description: errorText }))
        break;
      default:
        break;
    }
  }
    

  return (
    <Grid item container justify="center">
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2} style={{width: "100%"}}>
        <Grid item>
          <Controller
            control={control}
            defaultValue=""
            name="title"
            render={({ onChange, onBlur, value }) => (
              <TextField
                fullWidth
                onChange={onChange}
                onBlur={(data) => { validate({ type: "TITLE", text: data.target.value }); onBlur() }}
                selected={value}
                label="Title"
                error={!!errors.title}
                helperText={errors.title}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            defaultValue=""
            name="description"
            render={({ onChange, onBlur, value }) => (
              <TextField
                multiline
                rows={4}
                variant="outlined"
                onChange={onChange}
                onBlur={(data) => { validate({ type: "DESCRIPTION", text: data.target.value }); onBlur() }}
                selected={value}
                label="Description"
                error={!!errors.description}
                helperText={errors.description}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button type="submit">Add place</Button>
        </Grid>
      </Grid>
    </form>
    </Grid>
  );
}

export default NewPlace;