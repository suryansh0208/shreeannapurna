import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNavbar } from '@/components/layout/MobileNavbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { CartDrawer } from '@/components/cart/CartDrawer';

import { HomePage } from '@/pages/HomePage';
import { MenuPage } from '@/pages/MenuPage';
import { RestaurantPage } from '@/pages/RestaurantPage';
import { SweetsPage } from '@/pages/SweetsPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderSuccessPage } from '@/pages/OrderSuccessPage';
import { PaymentStatusPage } from '@/pages/PaymentStatusPage';
import { TrackOrderPage } from '@/pages/TrackOrderPage';
import { OffersPage } from '@/pages/OffersPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsPage } from '@/pages/TermsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-cream-100 font-sans text-brown-700">
        <AnnouncementBar />
        <Navbar onOpenCart={() => setCartOpen(true)} onOpenMobileNav={() => setMobileNavOpen(true)} />
        <MobileNavbar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/sweets" element={<SweetsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/payment-status" element={<PaymentStatusPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
