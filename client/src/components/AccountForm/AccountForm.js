import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import { Form, Field } from 'react-final-form'
import AuthContainer from '../../containers/AuthContainer'
import PropTypes from 'prop-types'
import styles from './styles'


class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formToggle: true,
      disabled: true,
      errorMessage: ''
    }
  }
  

  validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    }
    if (!values.password) {
      errors.password = 'Required'
    }
    if (!this.state.formToggle && !values.fullname) {
        errors.fullname = 'Required'
    }
    
    return errors
  }

  render() {
    const { classes } = this.props
    const required = value => (value ? undefined : 'Input Required Here')

    return (
      <AuthContainer>
        {({ signup, login, data, loading, error }) => (
          <Form
            onSubmit = {
              this.state.formToggle
              ? values => {
                return login.mutation ({
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
            render = {({ handleSubmit, pristine, invalid, values }) => (
              <form onSubmit = {handleSubmit} className= {classes.accountForm}>
              {!this.state.formToggle && (
                <FormControl fullWidth className= {classes.formControl}>
                <InputLabel
                  htmlFor='fullname'>
                  Username
                </InputLabel>
                <Field
                  name ='fullname'
                  validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <Input
                        id='fullname'
                        type='text'
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                    )}
                  </Field>
                </FormControl>
              )}

              <FormControl
                fullWidth className= {classes.formControl}>
              <InputLabel htmlFor='email'>
                Email
              </InputLabel>
              <Field
                name='email'
                validate={required}>
              {({ input, meta }) => (
                <div>
                  <Input
                    id='email'
                    type='text'
                    {...input}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
                )}
              </Field>
            </FormControl>

            <FormControl fullWidth className= {classes.formControl}>
            <InputLabel
              htmlFor='password'>
              Password
            </InputLabel>
            <Field
              name='password'
              validate={required}>
              {({ input, meta }) => (
                <div>
                  <Input
                    id='password'
                    type='password'
                    {...input}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
                )}
              </Field>
            </FormControl>

            <FormControl className={classes.formControl}>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              >
              <Button
                type='submit'
                className= {classes.formButton}
                variant='contained'
                size='large'
                color='secondary'
                disabled= { pristine || invalid }
                >
                {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className= {classes.formToggle}
                    type='button'
                    onClick={() => {
                      this.setState({
                        formToggle: !this.state.formToggle
                      })
                    }}
                  >
                  {this.state.formToggle
                  ? 'Create an account.'
                  : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>

            </FormControl>
            <Typography className= {classes.errorMessage}>
              {login.error
              ? 'User Authentication Error: Incorrect Username or Password'
              : ''}
              {signup.error
              ? 'Error: Invalid Username or Password'
              : ''}
            </Typography>
          </form>
        )}
        />
      )}
      </AuthContainer>
    )
  }
}

AccountForm.PropTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AccountForm)