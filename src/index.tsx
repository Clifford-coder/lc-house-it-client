import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Listings, Host, User, Listing, NotFound } from './sections';
import { baseUrl } from './lib/api';
import './styles/index.css';

const client = new ApolloClient({ uri: `${baseUrl}/api` });

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/host" exact component={Host} />
      <Route path="/listing/:id" exact component={Listing} />
      <Route path="/listings/:location" exact component={Listings} />
      <Route path="/user/:id" exact component={User} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
