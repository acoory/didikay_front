import React, {useEffect, useState} from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Scissors, Star, ChevronDown } from "lucide-react";
// import ImageCarousel from "../components/ImageCarousel";
import { Header } from "../components/Header.tsx";
import { ReservationButton } from "../components/ReservationButton.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const images = [
  "/images/realisations/rea_1.webp",
  "/images/realisations/rea_2.webp",
  "/images/realisations/rea_3.webp",
  "/images/realisations/rea_4.webp",
  "/images/realisations/rea_5.webp",
  "/images/realisations/rea_6.webp",
  "/images/realisations/rea_7.webp",
  "/images/realisations/rea_8.webp",
  "/images/realisations/rea_9.webp",
];

// Horaires d'ouverture
const horaires = [
  { jour: "Lundi", heures: "10:00 - 19:00" },
  { jour: "Mardi", heures: "10:00 - 19:00" },
  { jour: "Mercredi", heures: "10:00 - 19:00" },
  { jour: "Jeudi", heures: "10:00 - 19:00" },
  { jour: "Vendredi", heures: "10:00 - 19:00" },
  { jour: "Samedi", heures: "09:00 - 18:00" },
  { jour: "Dimanche", heures: "Fermé" },
];

// Témoignages clients
const temoignages = [
  { 
    nom: "Sarah L.", 
    texte: "J'ai adoré mon expérience chez KAYDIDI! Mes locks sont magnifiques et tiennent parfaitement.", 
    note: 5 
  },
  { 
    nom: "Thomas R.", 
    texte: "Service impeccable et personnel très professionnel. Je recommande vivement ce salon.", 
    note: 5 
  },
  { 
    nom: "Marie C.", 
    texte: "La meilleure lockticienne de Marseille. Je ne vais nulle part ailleurs!", 
    note: 5 
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2.5);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1.5);  // Sur mobile, afficher 1 slide
      } else {
        setSlidesPerView(2.5);  // Sur les écrans plus grands, afficher 2.5 slides
      }
    };

    handleResize(); // Appel initial
    window.addEventListener('resize', handleResize);

    // Masquer l'indicateur de défilement après 5 secondes
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Détection de la visibilité de l'élément
  const onScrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header/>

      {/* Hero Section */}
      <motion.div
        id="salon"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3, duration: 0.8}}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-2 text-center tracking-wider">
              KAYDIDI
            </h1>
            <div className="h-1 w-24 bg-[#e86126] mx-auto mb-6"></div>
          </motion.div>
          
          <motion.p
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5, duration: 0.8}}
            className="text-xl md:text-2xl mb-8 text-center max-w-2xl font-light"
          >
            Hairstylist & Lockticienne professionnelle
          </motion.p>
          
          <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: 0.7, duration: 0.5}}
            className="mb-16"
          >
            <ReservationButton/>
          </motion.div>
          
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                transition={{delay: 1, duration: 0.5}}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
                onClick={() => onScrollToElement('services')}
              >
                <p className="text-sm font-light mb-2">Découvrir</p>
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.section
        id="services"
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
        className="py-24 px-4 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
            <div className="h-1 w-16 bg-[#e86126] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services pour sublimer vos cheveux et votre style.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{y: -10, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"}}
              className="bg-white rounded-xl p-8 shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#fdeae1] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Scissors className="w-8 h-8 text-[#e86126]" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Coiffure</h3>
              <p className="text-gray-600 text-center">
                Coupes professionnelles, coiffures pour tous types de cheveux, adaptées à votre style et personnalité.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{y: -10, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"}}
              className="bg-white rounded-xl p-8 shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#fdeae1] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#e86126]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6C9 6 9 3 12 3C15 3 15 6 15 6M15 18C15 18 15 21 12 21C9 21 9 18 9 18M6 15C6 15 3 15 3 12C3 9 6 9 6 9M18 9C18 9 21 9 21 12C21 15 18 15 18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Locks</h3>
              <p className="text-gray-600 text-center">
                Création, entretien et stylisme de locks par notre lockticienne expérimentée.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{y: -10, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"}}
              className="bg-white rounded-xl p-8 shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#fdeae1] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#e86126]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Soins</h3>
              <p className="text-gray-600 text-center">
                Traitements hydratants, soins réparateurs et massages du cuir chevelu pour des cheveux en pleine santé.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Carousel Section */}
      <motion.section
        id="realisations"
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Réalisations</h2>
            <div className="h-1 w-16 bg-[#e86126] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos créations et le talent de notre équipe à travers nos plus belles réalisations.
            </p>
          </div>
          
          <Swiper
            modules={[EffectCoverflow, Parallax, Autoplay, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            speed={800}
            spaceBetween={20}
            loop={true}
            slidesPerView={slidesPerView}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-[600px] rounded-lg mt-12"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="relative flex justify-center rounded-lg">
                <div
                  className={`relative overflow-hidden rounded-xl shadow-xl transition-all duration-700 ease-in-out ${
                    index === activeIndex
                      ? "scale-100 filter-none"
                      : "scale-90 filter brightness-75"
                  }`}
                  style={{
                    transformOrigin: "center",
                    willChange: "transform, filter",
                  }}
                >
                  <img
                    src={src}
                    alt={`Réalisation ${index + 1}`}
                    className="object-cover w-full h-full rounded-xl"
                  />
                  {index === activeIndex && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white font-medium">Réalisation #{index + 1}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
        className="py-24 bg-[#fdeae1]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nos clients disent</h2>
            <div className="h-1 w-16 bg-[#e86126] mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {temoignages.map((temoignage, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.2, duration: 0.5}}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < temoignage.note ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{temoignage.texte}"</p>
                <p className="font-medium text-gray-900">{temoignage.nom}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Histoire</h2>
              <div className="h-1 w-16 bg-[#e86126] mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Depuis 2010, notre salon s'engage à offrir des services de coiffure exceptionnels dans une ambiance
                chaleureuse et accueillante. Notre équipe de professionnels passionnés combine expertise technique et
                créativité pour révéler votre beauté naturelle.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Spécialisés dans les locks et tous types de cheveux, nous sommes fiers d'accompagner notre clientèle diverse 
                avec des services sur mesure et un savoir-faire reconnu.
              </p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#e86126]" />
                Nos Horaires
              </h3>
              <div className="space-y-3">
                {horaires.map((horaire, index) => (
                  <div key={index} className="flex justify-between pb-2 border-b border-gray-200 last:border-0">
                    <span className="font-medium">{horaire.jour}</span>
                    <span className={`${horaire.heures === "Fermé" ? "text-red-500" : "text-gray-600"}`}>
                      {horaire.heures}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
        className="py-24 bg-gray-50"
        id="contact"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nous Contacter</h2>
            <div className="h-1 w-16 bg-[#e86126] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prenez rendez-vous dès maintenant ou contactez-nous pour plus d'informations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <motion.div
                initial={{opacity: 0, x: -20}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md transition-transform hover:transform hover:scale-105"
              >
                <div className="bg-[#fdeae1] p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-[#e86126]"/>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Adresse</h3>
                  <p className="text-gray-600">49 boulevard de paris, 13002 Marseille</p>
                  <a 
                    href="https://maps.google.com/?q=49+boulevard+de+paris+13002+Marseille" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#e86126] font-medium mt-2 inline-block hover:underline"
                  >
                    Voir sur Google Maps
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{opacity: 0, x: -20}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6, delay: 0.2}}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md transition-transform hover:transform hover:scale-105"
              >
                <div className="bg-[#fdeae1] p-3 rounded-full">
                  <Phone className="w-6 h-6 text-[#e86126]"/>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Téléphone</h3>
                  <p className="text-gray-600">+33 6 XX XX XX XX</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{opacity: 0, x: -20}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6, delay: 0.4}}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md transition-transform hover:transform hover:scale-105"
              >
                <div className="bg-[#fdeae1] p-3 rounded-full">
                  <Instagram className="w-6 h-6 text-[#e86126]"/>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instagram</h3>
                  <p className="text-gray-600">@_kaydidi_</p>
                  <a 
                    href="https://www.instagram.com/_kaydidi_" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#e86126] font-medium mt-2 inline-block hover:underline"
                  >
                    Suivez-nous
                  </a>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.6}}
              className="h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.935424224028!2d5.368023!3d43.30496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0b84552a4cb%3A0x25cc3db8b4e49df3!2s49%20Bd%20de%20Paris%2C%2013002%20Marseille!5e0!3m2!1sfr!2sfr!4v1684936243851!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">KAYDIDI</h3>
              <p className="text-gray-400 mb-4">
                Salon de coiffure & locks professionnels à Marseille.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/_kaydidi_" target="_blank" rel="noopener noreferrer" className="hover:text-[#e86126] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-[#e86126] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="#salon" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#realisations" className="text-gray-400 hover:text-white transition-colors">Nos Réalisations</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-gray-400">
                <p className="mb-2">49 boulevard de paris, 13002 Marseille</p>
                <p className="mb-2">+33 6 XX XX XX XX</p>
                <p>contact@kaydidi.fr</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} KAYDIDI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
