import { useCallback, useEffect, useReducer } from 'react';
import { server } from '../api';

export interface State<TData> {
	data: TData | null;
	loading: boolean;
	error: boolean;
}

//not that necessary
interface QueryResults<TData> extends State<TData> {
	refetch: () => void;
}

type Action<TData> = { type: 'FETCH' } | { type: 'FETCH_SUCCESS'; payload: TData } | { type: 'FETCH_ERROR' };

const reducer =
	<TData>() =>
	(state: State<TData>, action: Action<TData>): State<TData> => {
		switch (action.type) {
			case 'FETCH':
				return { ...state, loading: true };
			case 'FETCH_SUCCESS':
				return { data: action.payload, loading: false, error: false };
			case 'FETCH_ERROR':
				return { ...state, loading: false, error: true };
		}
	};

export const useQuery = <TData = any>(query: string): QueryResults<TData> => {
	const fetchReducer = reducer<TData>();
	const [state, dispatch] = useReducer(fetchReducer, { data: null, loading: false, error: false });

	const fetch = useCallback(() => {
		const fetchApi = async () => {
			try {
				dispatch({ type: 'FETCH' });
				const { data, errors } = await server.fetch<TData>({ query });
				if (errors && errors.length) throw new Error(errors[0].message);
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_ERROR' });
				throw console.error(err);
			}
		};
		fetchApi();
	}, [query]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return { ...state, refetch: fetch };
};
