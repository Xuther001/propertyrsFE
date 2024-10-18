import React, { useEffect, useState } from 'react';
import axiosInstance from '../../configs/AxiosConfig';
import PropertyDetailsOverlay from '../PropertyDetailsOverlay/PropertyDetailsOverlay';
import './ListingPage.css';

const ListingPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingResponse = await axiosInstance.get('/listing');
        const listingData = listingResponse.data;

        const listingsWithImages = await Promise.all(
          listingData.map(async (listing) => {
            try {
              const imagesResponse = await axiosInstance.get(
                `/propertyimages/${listing.property_id}/images`
              );

              const images = imagesResponse.data.images || [];

              // Select the 'main' image if available, otherwise use the first image or empty array
              const mainImage =
                images.find((img) => img.image_url.includes('main')) || images[0] || null;

              return {
                ...listing,
                images,
                mainImage,
              };
            } catch {
              return { ...listing, images: [], mainImage: null };
            }
          })
        );

        setListings(listingsWithImages);
      } catch {
        setError('Failed to fetch listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
  };

  const handleCloseOverlay = () => {
    setSelectedListing(null);
  };

  if (loading) return <p className="loading-text">Loading listings...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="listing-page-container">
      <h1>Property Listings</h1>
      <div className="listing-grid">
        {listings.map((listing) => (
          <div
            key={listing.listing_id}
            className="listing-card"
            onClick={() => handleListingClick(listing)}
          >
            <h2>{listing.description}</h2>
            <p>Price: ${parseFloat(listing.price).toFixed(2)}</p>
            <p>Status: {listing.is_for_sale ? 'For Sale' : 'Not for Sale'}</p>
            <p>Available From: {new Date(listing.available_from).toLocaleDateString()}</p>

            {listing.mainImage ? (
              <img
                src={listing.mainImage.image_url}
                alt={`Property ${listing.property_id} - Main`}
                className="property-image"
              />
            ) : (
              <p>No main image available</p>
            )}
          </div>
        ))}
      </div>

      {selectedListing && (
        <PropertyDetailsOverlay
          listing={selectedListing}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
};

export default ListingPage;