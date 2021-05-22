import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Listings } from './sections';
import { baseUrl } from './lib/api';
import './styles/index.css';

const client = new ApolloClient({ uri: `${baseUrl}/api` });

render(
	<ApolloProvider client={client}>
		<Listings title="Tiny House Listings" />
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
