
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionsPage from './pages/CollectionsPage'; // <-- Bu sayfa kullanılacak
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';

function App() {
  const { i18n } = useTranslation();

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* DİKKAT: Buradaki rota tanımını güncelliyoruz! */}
          {/* Hem '/collections' (genel liste) hem de '/collections/:collectionId' (filtreli liste) için aynı CollectionsPage bileşenini kullanacağız. */}
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:collectionId" element={<CollectionsPage />} /> {/* <-- Bu satırı ekleyin! */}

          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
        </Routes>
      </Layout>
      <FloatingWhatsApp />
    </>
  );
}

export default App;
