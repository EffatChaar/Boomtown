const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        boxShadow: 'none',
        backgroundColor: 'transparent'
    },
    addButton: {
        borderRadius: '50px',
        backgroundColor: theme.palette.secondary.main,
        marginRight: '10px'
    },
    component: {
        position: 'relative',
        right: '180px',
        top: '20px'
    }
})

export default styles