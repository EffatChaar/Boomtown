import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router} from 'react-router-dom'
// import { Provider as ReduxProvider } from 'react-redux'
import client from './apollo'
import registerServiceWorker from './registerServiceWorker'
import theme from './theme'

/**
 * @TODO: Initialize Apollo Client
 *
 * Uncomment the following line when Apollo Client is configured:
 *
 * Below in your <App />, wrap your pages in an <ApolloProvider /> component
 * and pass it `client` as the `client` prop value so they will
 * have access to data exposed by your GraphQL API.
 */

/**
 * @TODO: Add Routing
 *
 * Uncomment the following line when your routes are configured
 */
import Routes from './routes/index'
 /*
 * Below in your <App />, nest your <Routes /> inside of <BrowserRouter />
 * component to enable routing in your client app.
 */

/**
 * @TODO: Initialize Redux Store
 *
 * Uncomment the following line when your Redux store is configured
 *
 * Below in your <App />, wrap a <ReduxProvider /> component around all
 * of the app's children, and pass it the imported `store` as the `store`
 * prop's value.
 */
import store from './redux'
/**
 * @TODO: Add the Viewer Context
 *
 * import { ViewerProvider } from './context/ViewerProvider'
 *
 * Below in your <App />, wrap the <ViewerProvider /> component around
 * the <BrowserRouter /> component so the router is aware of whether a
 * user is currently logged in and who that user is.
 */
import Home from './pages/Home'
import './index.css'
import ItemsContainer from './containers/ItemsContainer';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Router>
        </Router>
      </ApolloProvider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
