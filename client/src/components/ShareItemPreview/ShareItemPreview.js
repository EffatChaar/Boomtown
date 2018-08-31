import React from 'react'
import ItemCard from '../ItemCard'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { ViewerContext } from '../../context/ViewerProvider'
import PropTypes from 'prop-types'
import styles from './styles'


const ShareItemPreview = props => {
  return(
      <ViewerContext.Consumer>
    {({ viewer }) => {
      props.shareItemPreview.itemowner = {
        fullname: viewer.fullname,
        email: viewer.email
      }
      return <ItemCard item= {props.shareItemPreview} />
    }}
    </ViewerContext.Consumer>
  )

}

const mapStateToProps = state => ({
    shareItemPreview: state.shareItemPreview
  })


ShareItemPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  shareItemPreview: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    imageurl: PropTypes.string,
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    itemowner: PropTypes.shape({
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired
  })
}

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview))