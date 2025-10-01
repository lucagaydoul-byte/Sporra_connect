import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  ScrollRestoration, // Hinzugefügt: ScrollRestoration importiert
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Highlights from "./components/Highlights";
import CTASection from "./components/CTASection";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import OfferDetail from "./components/OfferDetail";
import OffersList from "./components/OffersList";
import SearchResults from "./components/SearchResults";
import Impressum from "./components/impressum";
import HelpCenter from "./components/HelpCenter";
import BecomeProvider from "./components/BecomeProvider";
import Cancellation from "./components/Cancellation";
import FAQ from "./components/FAQ";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import OnboardingFlow from "./components/OnboardingFlow";
import EventCreation from "./components/EventCreation";
import UserProfile from "./components/profile/UserProfile";

import { useOffers } from "./data/offers";

// Hook für Query-Parameter
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// HomePage
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    navigate(`/offers/${category.toLowerCase()}`);
  };

  const handleShowAllOffers = () => {
    navigate("/offers");
  };

  const handleOfferSelect = (offer: any) => {
    navigate(`/offer/${offer.id}`);
  };

  return (
    <>
      <Hero />
      <Categories onCategorySelect={handleCategorySelect} />
      <Highlights
        onShowAllOffers={handleShowAllOffers}
        onOfferSelect={handleOfferSelect}
      />
      <CTASection />
      <Newsletter />
      <Footer />
    </>
  );
};

// OfferDetail Wrapper
const OfferDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const allOffers = useOffers();

  const offer = allOffers.find((o) => o.id === Number(id));

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-24 flex items-center justify-center">
        <p>Angebot nicht gefunden</p>
      </div>
    );
  }

  return <OfferDetail offer={offer} onBack={() => navigate(-1)} />;
};

// Haupt-App
const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Router>
          <ScrollRestoration /> {/* Hinzugefügt: Stellt Scrollposition wieder her */}
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/offers" element={<OffersList />} />
            <Route path="/offers/:category" element={<OffersList />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/offer/:id" element={<OfferDetailWrapper />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/become-provider" element={<BecomeProvider />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route path="/create-event" element={<EventCreation />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/impressum"
              element={
                <>
                  <Impressum />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;