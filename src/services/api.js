import { products, getProductById, getBestSellers, getNewArrivals, getRelatedProducts } from '../data/products';
import { collections } from '../data/collections';
import { testimonials } from '../data/testimonials';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'; // Replace with your actual API URL

// Simulate API call delay
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  // Products
  async getProducts(params = {}) {
    await simulateDelay();
    // Simulate filtering/pagination if needed
    let filteredProducts = [...products];

    if (params.category && params.category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.limit) {
      filteredProducts = filteredProducts.slice(0, params.limit);
    }
    // In a real API, you'd send params to backend: fetch(`${API_BASE_URL}/products?${new URLSearchParams(params)}`)
    return filteredProducts;
  },

  async getProduct(id) {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/products/${id}`)
    return getProductById(id);
  },

  async getBestSellers(limit) {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/products/best-sellers?limit=${limit}`)
    return getBestSellers(limit);
  },

  async getNewArrivals(limit) {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/products/new-arrivals?limit=${limit}`)
    return getNewArrivals(limit);
  },

  async getRelatedProducts(currentProductId, category, limit) {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/products/related?currentId=${currentProductId}&category=${category}&limit=${limit}`)
    return getRelatedProducts(currentProductId, category, limit);
  },

  // Collections
  async getCollections() {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/collections`)
    return collections;
  },

  // Testimonials
  async getTestimonials() {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/testimonials`)
    return testimonials;
  },

  // Newsletter Subscription
  async subscribeToNewsletter(email) {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/newsletter/subscribe`, { method: 'POST', body: JSON.stringify({ email }) })
    console.log(`Subscribed ${email} to newsletter.`);
    return { success: true, message: 'Subscription successful!' };
  },

  // Contact Form Submission
  async submitContactForm(formData) {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/contact`, { method: 'POST', body: JSON.stringify(formData) })
    console.log('Contact form submitted:', formData);
    return { success: true, message: 'Message sent successfully!' };
  },

  // Checkout - example, would be more complex with actual payment gateway integration
  async placeOrder(orderData) {
    await simulateDelay();
    // In a real API: fetch(`${API_BASE_URL}/orders`, { method: 'POST', body: JSON.stringify(orderData) })
    console.log('Order placed:', orderData);
    return { success: true, orderId: 'ORD-' + Math.random().toString(36).substr(2, 9) };
  }
};

export default api;
