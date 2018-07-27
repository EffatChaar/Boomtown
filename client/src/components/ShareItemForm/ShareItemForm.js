import React, { Component, Fragment } from 'react'
import { FormSpy, Form, Field } from 'react-final-form'
import { Button, TextField, Checkbox, InputLabel } from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../../redux/modules/ShareItemPreview'
import Typography from '@material-ui/core/Typography'
import { classes } from '@material-ui/core/styles';
import styles from './styles'

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      // selectedTags: [],
      // submitted: false
      imageurl: ''
    }
  }
  onSubmit = values => {
    console.log(values)
  }
  validate = values => {
    console.log(values)
  }
  handleImageSelect = e => {
    this.setState({ fileSelected :e.target.files[0]})
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
  // applyTags(tags) {
  //   return (
  //     tags &&
  //     tags
  //       .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
  //       .map(tag => ({ title: tag.title, id: tag.id }))
  //   )
  // }
getTags = tags => {
    if(tags) {
      return tags.map(tag => JSON.parse(tag))
    }
    return []
}

dispatchUpdate(values, updateNewItem) {
    if (!values.imageUrl && this.state.fileSelected) {
      this.getBase64Url().then(imageUrl => {
        updateNewItem({
          imageUrl
        })
      })
    }

    const tags = this.getTags(values.tags)
    updateNewItem({
      ...values,
      tags
    })
}


handleCheckbox(event) {}

async saveItem(values, tags, addItem) {
  const {
    validity,
    files: [file]
  } = this.fileInput.current
  if (!validity.valid || !file) return;
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
      this.setState({ done: true })
    } catch(e) {
      console.log(e)
    }
  }
  render() {
    const { classes, updateNewItem, resetNewItem } = this.props
    return (
      <ItemsContainer>
        {({ tagData: { loading, error, tags  }, addItem }) => {
          if (loading) {
            return 'Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return (
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
              form
            }) => (
              <form onSubmit={handleSubmit} className={classes.ShareItemForm}>
                <FormSpy
                  subscription={{ values: true }}
                  component={({ values }) => {
                    if (values) {
                      this.dispatchUpdate(values, tags, updateNewItem)
                    }
                    return ''
                  }}
                />

                <Typography variant="display4" className={classes.headline} >
                  Share. Borrow. Prosper.
                </Typography>
                <Field name="imageurl" >
                  {(input, meta) => (
                    <Fragment>
                      <Button
                        onClick={() => {
                          this.fileRef.current.click()
                          // Todo
                        }}
                      >
                        Upload an image!
                      </Button>
                      <input
                        onChange={e => this.handleImageSelect(e)}
                        type="file"
                        accept="image/*"
                        hidden
                        ref={this.fileRef}
                      />
                    </Fragment>
                  )}
                  </Field>
                  <Field name="title">
                  {({ input, meta }) => (
                    <TextField placeholder="Name your Item" {...input} />
                  )}
                </Field>
                <Field name="description">
                  {({ input, meta }) => (
                    <TextField
                      placeholder="Describe your Item"
                      multiline
                      {...input}
                    />
                  )}
                </Field>
                {tags && tags.map(tag => (
                  <Field
                    key={tag.id}
                    name="tags"
                    type="checkbox"
                    value={JSON.stringify(tag)}
                  >
                    {({ input, meta }) => (
                      <InputLabel>
                        <Checkbox {...input} />
                          {tag.title}
                      </InputLabel>
                    )}
                  </Field>
                ))}              
                <Field
                  render={({ input, meta }) => (
                    <Button type="submit" variant="contained" color="secondary">
                      Share
                    </Button>
                  )}
                />
                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
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
    console.log(item)
    dispatch(updateNewItem(item))
  },
  resetNewItem() {
    dispatch(resetNewItem())
  },
  resetImage() {
    dispatch(resetImage())
  }
})

export default connect(
  undefined,
  mapDispatchToProps
)(ShareItemForm)