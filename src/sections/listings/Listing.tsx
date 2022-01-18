import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Alert, Avatar, Button, List, Spin } from 'antd';
import './styles/Listings.css';

import { Listings as ListingData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingsData,
  DeleteListingVariables as DeleteListingsVariables,
} from './__generated__/DeleteListing';
import { ListingsSkeleton } from './components';
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
  const [
    deleteListing,
    { loading: deleteListLoading, error: deleteListError },
  ] = useMutation<DeleteListingsData, DeleteListingsVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            description={listing.address}
            avatar={<Avatar src={listing.image} size={48} shape="square" />}
            title={listing.title}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading)
    return (
      <div className="listings-wrap">
        <ListingsSkeleton title={title} />
      </div>
    );
  if (error)
    return (
      <div className="listings-wrap">
        <ListingsSkeleton title={title} error />
      </div>
    );

  const deleteListingErrorAlert = deleteListError ? (
    <Alert
      type="error"
      message="Something went wrong in the deletion process"
    />
  ) : null;

  return (
    <div className="listings-wrap">
      <Spin spinning={deleteListLoading}>
        {deleteListingErrorAlert}
        <h1>{title}</h1>
        {listingsList}
      </Spin>
    </div>
  );
};
