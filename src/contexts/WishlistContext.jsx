import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { t } = useTranslation();
  const [wishlistItems, setWishlistItems] = useState(() => {
    // Initialize wishlist from localStorage
    const savedWishlist = localStorage.getItem('silvera_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('silvera_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some(item => item.id === product.id);
      if (exists) {
        // Optional: show a message that item is already in wishlist
        // alert(`${product.name} ${t('wishlist.already_in_wishlist')}`);
        return prevItems;
      }
      return [...prevItems, product];
    });
    // Optional: Show a toast notification
    // alert(`${product.name} ${t('wishlist.added_to_wishlist')}`);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== productId));
    // Optional: Show a toast notification
    // alert(t('wishlist.item_removed'));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
