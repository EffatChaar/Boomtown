const styles = theme => ({
    root: {
      flexGrow: 1,
      height: '100%',
      background: theme.palette.secondary.main,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing.unit * 8,
        justifyContent: 'flex-start'
      }
    },
    itemCard: {
      padding: '16px'
    }
})
  
  export default styles