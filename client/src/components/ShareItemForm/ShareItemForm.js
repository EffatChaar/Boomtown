import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import ShareItemPreview from '../ShareItemPreview/ShareItemPreview';
import { resetImage, updateNewItem, resetNewItem } from '../../redux/modules/ShareItemPreview'
import { FormSpy } from 'react-final-form'



const ShareItemForm = props => {
  const { classes } = props;

  return (
    <div>

      <TextField
        label="Item Name"
        id="margin-none"
      />
      <FormSpy
        subscription={{ values: true }}
        component={({ values }) => {
        if (values) {
        this.updateNewItem(values);
        }
        return '';
      }}
      />
      />
    </div>
  );
};

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item))
  },
  resetImage() {
    dispatch(resetImage())
  },
  resetNewItem() {
    dispatch(resetNewItem())
  }
})
export default connect(undefined, mapDispatchToProps)(ShareItemForm)
