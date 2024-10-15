import React, { useEffect, useState } from 'react';
import axiosInstance from '../../configs/AxiosConfig';
import './ListingPage.css';

const ListingPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

              return {
                ...listing,
                images: imagesResponse.data.images || [],
              };
            } catch {
              return { ...listing, images: [] };
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

  if (loading) return <p className="loading-text">Loading listings...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="listing-page-container">
      <h1>Property Listings</h1>
      <div className="listing-grid">
        {listings.map((listing) => (
          <div key={listing.listing_id} className="listing-card">
            <h2>{listing.description}</h2>
            <p>Price: ${parseFloat(listing.price).toFixed(2)}</p>
            <p>Status: {listing.is_for_sale ? 'For Sale' : 'Not for Sale'}</p>
            <p>Available From: {new Date(listing.available_from).toLocaleDateString()}</p>

            <div className="image-gallery">
              {listing.images.length > 0 ? (
                listing.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.image_url}
                    alt={`Property ${listing.property_id} - ${index + 1}`}
                    className="property-image"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;