import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Listings as ListingData } from './__generated__/Listings';
import {
	DeleteListing as DeleteListingsData,
	DeleteListingVariables as DeleteListingsVariables,
} from './__generated__/DeleteListing';
interface Props {
	title: string;
}

const LISTINGS = gql`
	query Listings {
		listings {
			id
			title
			image
			address
			price
			numOfGuests
			numOfBeds
			rating
		}
	}
`;

const DELETE_LISTING = gql`
	mutation DeleteListing($id: ID!) {
		deleteListing(id: $id) {
			id
		}
	}
`;

export const Listings = ({ title }: Props) => {
	const { data, refetch, loading, error } = useQuery<ListingData>(LISTINGS);
	const [deleteListing, { loading: deleteListLoading, error: deleteListError }] =
		useMutation<DeleteListingsData, DeleteListingsVariables>(DELETE_LISTING);

	const handleDeleteListing = async (id: string) => {
		await deleteListing({ variables: { id } });
		refetch();
	};

	const listings = data ? data.listings : null;

	const listingsList = listings ? (
		<ul>
			{listings.map((listing) => (
				<li key={listing.id}>
					{listing.title}
					<button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
				</li>
			))}
		</ul>
	) : null;

	if (loading) return <h1>Loading.....</h1>;
	if (error) return <h1>Something went wrong, please try again later</h1>;

	const deleteListingMessage = deleteListLoading ? <h4>Deletion in progress</h4> : null;
	const deleteListingError = deleteListError ? <h4>Something went wrong in the deletion process</h4> : null;

	return (
		<div>
			<h1>{title}</h1>
			{listingsList}
			{deleteListingMessage}
			{deleteListingError}
		</div>
	);
};
