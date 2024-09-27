import { ApolloClient, InMemoryCache } from '@apollo/client';

// let client = null;

export const getClient = () => {
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_API_URL,
		cache: new InMemoryCache(),
		headers: {
			Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
		},
	});

	return client;
};
