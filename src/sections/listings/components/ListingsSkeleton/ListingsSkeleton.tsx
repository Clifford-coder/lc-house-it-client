import { Alert, Divider, Skeleton } from 'antd';

interface Props {
	title: string;
	error?: boolean;
}

export const ListingsSkeleton = ({ title, error = false }: Props) => {
	const errorAlert = error ? <Alert type="error" message="Something went wrong, please try again later" /> : null;
	return (
		<div>
			{errorAlert}
			<h2>{title}</h2>
			<Skeleton paragraph={{ rows: 1 }} active />
			<Divider />
			<Skeleton paragraph={{ rows: 1 }} active />
			<Divider />
			<Skeleton paragraph={{ rows: 1 }} active />
		</div>
	);
};
