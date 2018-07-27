import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ViewerProvider } from './context/ViewerProvider'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import client from './apollo'
import registerServiceWorker from './registerServiceWorker'
import theme from './theme/index'
import Routes from './routes/index'
import store from './redux/index'

import './index.css'


const App = () => {
  return (
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <ViewerProvider>
          <Router>
            <Routes/>
          </Router>
          </ViewerProvider>
        </ApolloProvider>
      </MuiThemeProvider>
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
