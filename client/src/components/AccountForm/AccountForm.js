import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import styles from './styles'
import { Form, Field } from 'react-final-form'
import AuthContainer from '../../containers/AuthContainer'
import validate from './helpers/validation'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formToggle: true
    }
  }
  handleSubmit = values => {
    return {
      ...values
    }
  }
  validate = values => {
    let errors = {}
    if (!values.email) {
      errors.email = "Email Required Here!"
    }
    if (!this.state.formToggle) {
      if(!values.fullname) {
        errors.fullname = "Please Enter Your Name"
      }
    }
    if (!values.password) {
      errors.password = "Please Enter Your Password"
    }
    return errors
  }

  render() {
    const { classes } = this.props
    return (
      <AuthContainer>
        {({ signup, login }) => (
          <Form
            onSubmit = {
              this.state.formToggle
              ? values => {
                login.mutation ({
                  variables: {
                    user: values
                  }
                })
              }
              : values => {
                signup.mutation ({
                  variables: {
                    user: values
                  }
                })
              }
            }
            validate = {this.validate}
            render = {({ handleSubmit, submitting, pristine, form, invalid, values }) => (
              <form onSubmit = {handleSubmit} className = {classes.accountForm}>
              {!this.state.formToggle && (
                <FormControl fullWidth className = {classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field name ='fullname'>
                {({ input, meta}) => (
                <Input
                  id="fullname"
                  type="text"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  {...input}
                />
                )}
                </Field>
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Field name="email">
            {({ input, meta }) => (
            <Input
              id="email"
              type="text"
              inputProps={{
                autoComplete: 'off'
              }}
              {...input}
            />
            )}
            </Field>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Field name="password">
          {({ input, meta }) => (
          <Input
            id="password"
            type="password"
            inputProps={{
              autoComplete: 'off'
            }}
            {...input}
          />
          )}
          </Field>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button
              type="submit"
              className={classes.formButton}
              variant="contained"
              size="large"
              color="default"
              disabled={pristine || invalid || submitting}
            >
              {this.state.formToggle ? 'Enter' : 'Create Account'}
            </Button>
            <Typography>
              <button
                className={classes.formToggle}
                type="button"
                onClick={() => {
                  form.reset()
                  this.setState( prevState => ({
                    formToggle: !prevState.formToggle
                  }))
                }}
              >
                {this.state.formToggle
                  ? 'Create an account.'
                  : 'Login to existing account.'}
              </button>
            </Typography>
          </Grid>
        </FormControl>
        <Typography className={classes.errorMessage}>
          {/* @TODO: Display sign-up and login errors */}
        </Typography>
      </form>
        )}
        />
      )}
      </AuthContainer>
    )}
  }
export default withStyles(styles)(AccountForm)