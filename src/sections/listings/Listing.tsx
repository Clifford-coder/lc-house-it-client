import { server } from '../../lib/api';
import { DeleteListingsData, DeleteListingsVariables, ListingData } from '../listings/types';

interface Props {
	title: string;
}

const LISTINGS = `
  query Listings{
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

const DELETE_LISTING = `
  mutation DeleteListing ($id : ID!){
    deleteListing(id:$id){
      id
    }
  }
`;

export const Listings = ({ title }: Props) => {
	const fetchListings = async () => {
		const { data } = await server.fetch<ListingData>({ query: LISTINGS });
		console.log(data.listings);
	};

	const deleteListing = async () => {
		const { data } = await server.fetch<DeleteListingsData, DeleteListingsVariables>({
			query: DELETE_LISTING,
			variables: { id: '60a08013d3d94e25cc035fd5' },
		});
		console.log(data.deleteListing);
	};

	return (
		<div>
			<h1>{title}</h1>
			<button onClick={fetchListings}>Click!</button>
			<br />
			<button onClick={deleteListing}>Click!</button>
		</div>
	);
};
