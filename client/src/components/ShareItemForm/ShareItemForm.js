import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { FormSpy, Form, Field } from 'react-final-form'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import { resetImage, updateNewItem, resetNewItem } from '../../redux/modules/ShareItemPreview'
import { Typography, TextField, Button, MenuItem, Select, Checkbox, ListItemText, FormControl, InputLabel, Input } from '@material-ui/core'
import styles from './styles'

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      selectedTags: [],
      submitted: false,
      tagError: false,
      tagsPristine: true,
      enabledByTag: false,
      enabledByImage: false,
      enabledByText: false
    }
    this.fileInput = React.createRef()
  }

  // validation
  validate = values => {
    const errors = {}
    this.setState({ submitted: false })
    if (!values.title) {
      errors.title = 'Required'
      this.setState({ enabledByText: false })
    }
    if (values.description && values.title ) {
      this.setState({ enabledByText: true })
    }
    if (!values.description) {
      errors.description = 'Required'
      this.setState({ enabledByText: false })
    }
    return errors
  }

  validateTags() {
    if (!this.state.tagsPristine && this.state.selectedTags.length === 0) {
      this.setState({ tagError: true })
      this.setState({ enabledByTag: false })
    } else {
      this.setState({ tagError: false })
      this.setState({ enabledByTag: true })
    }
  }

  handleSubmit() {
    this.setState({ submitted: true })
  }

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        })
      })
    }
    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    })
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


  handleImageSelect = e => {
    this.setState({ fileSelected: e.target.files[0] })
    this.setState({ enabledByImage: true })
  }


  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
        .map(tag => ({ title: tag.title, id: tag.id }))
    )
  }

  generateTagsText(tags, selected) {
    return tags
      .map(tag => (selected.indexOf(tag.id) > -1 ? tag.title : false))
      .filter(e => e)
      .join(', ')
  }

  handleCheckbox= event => {
    this.setState({
      selectedTags: event.target.value
    })
    this.validateTags()
    }

    
  handleTagsPristine() {
    this.setState({ tagsPristine: false })

    this.validateTags()
  }



async saveItem(values, tags, addItem) {
  const {
    validity,
    files: [file]
  } = this.fileInput.current

  if (!validity.valid || !file) return
    try {
      const itemData = {
        ...values,
        tags: this.applyTags(tags)
      }
      await addItem.mutation({
        variables: {
          item: itemData,
          image: file
        }
      })
    } catch(e) {
      throw 'error'
    }
  }

  uploadViewer(viewer, values, updateNewItem) {
    this.props.updateNewItem({
      ...values,
      itemowner: {
        fullname: viewer.fullname,
        email: viewer.email
      }
    })
  }

  handleShareReset(resetImage, resetNewItem) {
    this.setState({ selectedTags: [] })
    this.setState({ fileSelected: false })
    resetImage()
    resetNewItem()
    this.handleSubmit()
  }


  render() {
    const { classes } = this.props
    const { resetImage, updateNewItem, resetNewItem } = this.props

    return (
      <ItemsContainer>
        {({ addItem, tagData: { loading, error, tags  } }) => {
          if (loading) {
            return 'Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return (
            <div>
              <Typography>
                Share. Borrow. Prosper.
              </Typography>
              <Form
                onSubmit={values => {
                this.saveItem(values, tags, addItem)
                }}
                validate={this.validate}
                render={({
                  handleSubmit,
                  pristine,
                  submitting,
                  invalid,
                  form,
                  values,
                  reset
                }) => (
                  <form onSubmit={event => {
                    handleSubmit(event)
                    form.reset()
                    this.handleShareReset(resetImage, resetNewItem)
                  }}
                  id='shareItemForm'
                  >
                  <FormSpy
                    subscription= {{ values: true }}
                    component= {({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, tags, updateNewItem)
                    }
                    return ''
                  }}
                  />

                  <Field name='imageurl'>
                    {(input, meta) => (
                      <Fragment>
                        <Button
                          style={{ width: '100%' }}
                          variant='contained'
                          color='primary'
                          onClick={() => {
                            this.fileInput.current.click()
                          }}
                        >
                        <Typography>
                          {!this.state.fileSelected
                            ? 'Select an Image'
                            : 'Reset Image'}
                        </Typography>
                        </Button>
                        <input
                          onChange= {e => {
                            this.handleImageSelect(e)
                          }}
                          type= 'file'
                          accept= 'image/*'
                          hidden
                          ref= {this.fileInput}
                        />
                      </Fragment>
                    )}
                  </Field>

                  <div>
                  <Field
                    name='title'
                    component= {TextField}
                    type = 'text'
                    label= 'Name Your Item'
                    className= {classes.inputName}
                    />
                  </div>

                  <div>
                    <Field
                    name= 'description'
                    component= {TextField}
                    type= 'text'
                    multiline
                    rows = '4'
                    label= 'Describe Your Item'
                    />
                  </div>

                   <FormControl
                      id='tagSelector'
                      error={this.state.tagError}
                    >

                    <Field
                      name= 'tags'
                      pristine= {this.state.tagsPristine}>
                      {({ input, meta }) => {
                        return(
                          <div>
                            <InputLabel
                              htmlFor= 'select-multiple-checkbox'>
                                Tags - Please Select at Least One
                            </InputLabel>                     
                            <Select
                              multiple
                              style= {{ width: '50%' }}
                              value= {this.state.selectedTags}
                              onChange= {event => this.handleCheckbox(event)}
                              input= {
                                      <Input
                                        id='select-multiple-checkbox'
                                      />
                                      }
                              renderValue= {selected => {
                                return this.generateTagsText(tags, selected)
                              }}
                              >
                              {tags &&
                                tags.map(tag => (
                                  <MenuItem key={tag.id} value={tag.id}>
                                  <Checkbox
                                    checked={
                                      this.state.selectedTags.indexOf(tag.id) > -1}
                                  />
                                  <ListItemText primary={tag.title} />
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        )
                      }}
                      </Field>
                    </FormControl>

                    <div>
                      <Button
                        type= 'submit'
                        variant= 'contained'
                        color= 'primary'
                        disabled= {
                          !(
                            this.state.enabledByText &&
                            this.state.enabledByImage &&
                            this.state.enabledByTag
                          )
                        }
                      >
                      Share
                      </Button>

                      <Typography
                        variant= 'title'
                      >
                      {this.state.submitted
                        ? 'Thank You for Submission'
                        : ''}
                      </Typography>
                    </div>
                  </form>
                )}
                />
                
                <Typography />
              </div>
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
  classes: PropTypes.object.isRequired
}

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm))