import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { FormSpy, Form, Field } from 'react-final-form'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import { resetImage, updateNewItem, resetNewItem } from '../../redux/modules/ShareItemPreview'
import { Typography, TextField, Button, ListItemText, Checkbox, FormControl, InputLabel } from '@material-ui/core'
import validate from './helpers/validation'
import styles from './styles'

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      selectedTags: [],
      submitted: false
    }
    this.fileInput = React.createRef()
  }

  // validation
  validate(values) {
    const errors = {}
    if (!values.title) {
      errors.title = 'Required'
    }
    if (!values.description) {
      errors.description = 'Required'
    }
    if (!values.tags || values.tags.length === 0) {
      errors.tags = 'Select a tag'
    }
    return errors
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader()
    reader.onload = e => {
      resolve(
        `data:${this.state.fileSelected.mimeType};base64, ${btoa(
          e.target.result
        )}`
      )
    }
    reader.readAsBinaryString(this.state.fileSelected)
  })
}

getTags = tags => {
  if (tags) {
    return tags.map(tag => {
      tag = JSON.parse(tag)
      delete tag.__typename
      return tag
    })
  }
  return []
}

async saveItem(values, tags, addItem, form) {
  const {
    validity,
    files: [file]
  } = this.fileInput.current

  if (!validity.valid) return
  // const tags = this.getTags(values.tags)
    try {
      const itemData = {
        ...values,
        tags
      }
      await addItem.mutation({
        variables: {
          item: itemData,
          image: file
        }
      })
      this.setState({ done: true })
      this.props.resetImage()
      this.props.resetNewItem()
      form.reset()
    } catch(e) {
      throw ('Error saving item')
  }
}

dispatchUpdate(values, updateNewItem) {
  if (!values.imageurl && this.state.fileSelected) {
    this.getBase64Url().then(imageurl => {
      updateNewItem({
        imageurl
      })
    })
  }
  const tags = this.getTags(values.tags)
  updateNewItem({
    ...values,
    tags
  })
}

  handleImageSelect = e => {
  this.setState({ fileSelected: e.target.files[0] })
}

  render() {
    const { classes } = this.props
    const { resetImage, updateNewItem } = this.props
    const { fileSelected } = this.state

    return (
      <ItemsContainer>
        {({ addItem, tagData: { loading, error, tags } }) => {
          if (loading) {
            return 'Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return (
            <Form
              validate= {validate}
              onSubmit= {values => {
                this.saveItem(values, addItem)
              }}
              render={({ handleSubmit, pristine, invalid, values, form }) => (
              <form onSubmit= {() => handleSubmit(form)}>
                <FormSpy
                  subscription= {{ values:true }}
                  component= {({ values }) => {
                    if (values) {
                      this.dispatchUpdate(values, updateNewItem)
                    }
                    return ''
                  }}
                  />
                  <FormControl>
                    <Field
                      name='imageurl'
                      render= {({ input, meta }) => (
                      <Fragment>
                        <Button
                          variant= 'contained'
                          color= 'primary'
                          onClick= {
                            this.fileSelected ? () => {
                              this.setState({ fileSelected: false })
                              this.fileInput.current.value = ''
                              resetImage()
                            }
                          : () => {
                            this.fileInput.current.click()
                          }
                        }
                        >
                        {fileSelected ? 'Remove Image' : 'Select an Image'}
                        </Button>
                          
                        <input
                          type= 'file'
                          accept= 'image/*'
                          hidden
                          ref= {this.fileInput}
                          onChange= {e => {
                            this.handleImageSelect(e)
                          }}
                        />
                      </Fragment>
                    )}
                  />
                  </FormControl>

                  <FormControl>
                    <Field
                      name='title'
                      type = 'text'>
                      {({ input, meta }) => (
                        <Fragment>
                          <TextField
                            placeholder= 'Name Your Item'
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <Typography>
                              {meta.error}
                            </Typography>
                          )}
                        </Fragment>
                      )}
                    </Field>
                  </FormControl>
                    
                  <FormControl>
                    <Field
                      name='description'
                      type = 'text'>
                      {({ input, meta }) => (
                        <Fragment>
                          <TextField
                            placeholder= 'Describe Your Item'
                            multiline
                            {...input} 
                          />
                          {meta.error && meta.touched && (
                            <Typography>
                              {meta.error}
                            </Typography>
                          )}
                        </Fragment>
                      )}
                    </Field>
                  </FormControl>

                  {tags && tags.map(tag => (
                    <Field
                      key= {tag.id}
                      name= 'tags'
                      type= 'checkbox'
                      value= {JSON.stringify(tag)}
                    >
                    {({ input, meta }) => (
                      <Fragment>
                        <InputLabel>
                          <Checkbox
                            {...input}
                          />
                          <ListItemText primary= {tag.title} />
                        </InputLabel>
                        {meta.error && meta.touched && (
                          <Typography>
                            {meta.error}
                          </Typography>
                        )}
                      </Fragment>
                    )}
                    </Field>
                  ))}

                  <FormControl>
                    <Button
                      type= 'submit'
                      variant= 'contained'
                      color= 'primary'
                      disabled= { invalid || pristine || !fileSelected }
                    >
                    Share
                    </Button>
                  </FormControl>
                </form>
              )}
            />
          )
        }}
      </ItemsContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item))
  },
  resetNewItem() {
    dispatch(resetNewItem())
  },
  resetImage() {
    dispatch(resetImage())
  }
})

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  resetImage: PropTypes.func.isRequired,
  resetNewItem: PropTypes.func.isRequired,
  updateNewItem: PropTypes.func.isRequired
}

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm))