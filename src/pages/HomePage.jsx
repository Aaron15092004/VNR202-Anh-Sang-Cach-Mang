import Header from "../components/home/Header";
import MainContent from "../components/home/MainContent";
import Footer from "../components/home/Footer";
import {
  useLazyLoad,
  useScrollReveal,
  useStickyHeader,
  useParallax,
} from "../hooks/home/useAnimations";

function HomePage() {
  useLazyLoad();
  useScrollReveal();
  useStickyHeader();
  useParallax();

  return (
    <div className="page-outer position-relative d-flex flex-column" id="page">
      <Header />
      <div className="pagelayout d-flex flex-row">
        <div className="pagelayout-b d-flex flex-column">
          <MainContent />
          <div className="page-c">
            <Footer />
          </div>
        </div>
      </div>
      <a
        href="#page"
        className="sr-only sr-only-focusable"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Scroll to top
      </a>
    </div>
  );
}

export default HomePage;
