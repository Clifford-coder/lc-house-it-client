import { baseUrl } from '.';
interface Body<TVariables> {
	query: string;
	variables?: TVariables;
}
interface Error {
	message: string;
}

export const server = {
	fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
		const response = await fetch(`${baseUrl}/api`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error('Failed to fetch listings');
		}

		return response.json() as Promise<{ data: TData; errors: Error[] }>;
	},
};
