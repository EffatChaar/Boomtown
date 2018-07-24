import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import { connect } from 'react-redux'


const ShareItemPreview = props => {
    return <ItemCard item={props.shareItemPreview} />
}

const mapStateToProps = state => {
    return {
        shareItemPreview: state.ShareItemPreview
    }
}

export default connect (mapStateToProps)(ShareItemPreview)