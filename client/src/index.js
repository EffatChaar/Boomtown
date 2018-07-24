import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import client from './apollo'
import registerServiceWorker from './registerServiceWorker'
import theme from './theme'
import Routes from './routes/index'
import store from './redux/index'
import Home from './pages/Home'
import './index.css'


/**
 * @TODO: Add the Viewer Context
 *
 * import { ViewerProvider } from './context/ViewerProvider'
 *
 * Below in your <App />, wrap the <ViewerProvider /> component around
 * the <BrowserRouter /> component so the router is aware of whether a
 * user is currently logged in and who that user is.
 */

// import ItemsContainer from './containers/ItemsContainer';

const App = () => {
  return (
    <ReduxProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Router>
          <Routes/>
        </Router>
        </ApolloProvider>
    </MuiThemeProvider>
  </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
