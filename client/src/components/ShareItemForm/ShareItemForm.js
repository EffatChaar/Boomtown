import React, { Component, Fragment } from 'react'
import { FormSpy, Form, Field } from 'react-final-form'
import { Checkbox, Button, InputLabel, TextField,Select,Input,MenuItem,ListItemText} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import { resetImage, updateNewItem, resetNewItem } from '../../redux/modules/ShareItemPreview'
import Typography from '@material-ui/core/Typography'
import { classes } from '@material-ui/core/styles';
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

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  validate = values => {
    console.log(values)
  }
  handleImageSelect = e => {
    this.setState({ fileSelected :e.target.files[0]})
  }

  handleChange = event => {
    this.setState({ selectedTags: event.target.value })
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
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
        .map(tag => ({ title: tag.title, id: tag.id }))
    )
  }
//   getTags = tags => {
//     if(tags) {
//       return tags.map(tag => JSON.parse(tag))
//     }
//     return []
// }

dispatchUpdate(values, tags,updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        })
      })
    }

    updateNewItem({
      ...values,
      tags:this.applyTags(tags)
    })
  }


  handleCheckbox= event => {
  this.setState({
    selectedTags: event.target.value
  })
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
      this.setState({ done: true })
    } catch(e) {
      console.log(e)
    }
  }
  render() {
    const { resetImage, updateNewItem, resetNewItem } = this.props
    return (
      <ItemsContainer>
        {({ addItem,tagData: { loading, error, tags  }}) => {
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
            initialValues={{}}
            validate={this.validate}
            render={({
              handleSubmit,
              pristine,
              submitting,
              invalid,
              form,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <FormSpy
                  subscription={{ values: true }}
                  component={({ values }) => {
                    if (Object.keys(values).length !== 0) {
                      this.dispatchUpdate(values, tags, updateNewItem)
                    }
                    return ''
                  }}
                />
<Field name="imageurl">
                    {(input, meta) => (
                      <Fragment>
                        <Button
                          style={{ width: '100%' }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.fileInput.current.click();
                            // TODO: if i click this and there is an image
                            // selected already, clear the image from the state
                            // and start over.
                          }}
                        >
                          Select an Image!
                        </Button>
                        <input
                          onChange={e => this.handleImageSelect(e)}
                          type="file"
                          accept="image/*"
                          hidden
                          ref={this.fileInput}
                        />
                      </Fragment>
                    )}
                  </Field>
                  <Field name="title">
                  {({ input, meta }) => (
                    <TextField 
                    placeholder="Name your Item"
                    {...input} />
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
                <Select
                      multiple
                      style={{ width: '50%' }}
                      value={this.state.selectedTags}
                      onChange={event => this.handleCheckbox(event)}
                      input={<Input />}
                      renderValue={selected => {
                        return this.generateTagsText(tags, selected);
                      }}
                    >
                      {tags &&
                        tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.id}>
                            <Checkbox
                              checked={
                                this.state.selectedTags.indexOf(tag.id) > -1
                              }
                            />
                            <ListItemText primary={tag.title} />
                          </MenuItem>
                        ))}
                      }
                    </Select>
                <Field
                  render={({ input, meta }) => (
                    <Button type="submit" variant="contained" color="default">
                      Share
                    </Button>
                  )}
                />
                <pre>{JSON.stringify(values, 0, 2)}</pre>
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