import React, {useEffect, useState} from "react";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
// import ImageCarousel from "../components/ImageCarousel";
import { Header } from "../components/Header.tsx";
import { ReservationButton } from "../components/ReservationButton.tsx";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import { Helmet } from 'react-helmet-async';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../index.css";
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


function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2.5);

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

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>KAYDIDI - Salon de Coiffure à Marseille | Locks et Coiffures Afro</title>
          <meta name="description" content="Spécialiste des locks, tresses, nattes et coiffures afro à Marseille. KAYDIDI vous propose des prestations de qualité pour sublimer vos cheveux. Réservez en ligne dès maintenant !" />
          <meta name="keywords" content="salon coiffure, locks, tresses, nattes, coiffure afro, Marseille, 13002, KAYDIDI" />
          <meta property="og:title" content="KAYDIDI - Salon de Coiffure à Marseille" />
          <meta property="og:description" content="Spécialiste des locks, tresses, nattes et coiffures afro à Marseille. Réservez votre prestation en ligne." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://kaydidicoiffure.fr" />
          <meta property="og:image" content="/images/logo.png" />
          <link rel="canonical" href="https://kaydidicoiffure.fr" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "KAYDIDI",
              "image": "/images/logo.png",
              "url": "https://kaydidicoiffure.fr",
              "telephone": "0769048760",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Boulevard de Paris",
                "addressLocality": "Marseille",
                "postalCode": "13002",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.30496,
                "longitude": 5.368023
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "19:00"
                }
              ],
              "priceRange": "€€",
              "sameAs": [
                "https://www.instagram.com/kaydidi_locks/"
              ],
              "description": "Spécialiste des locks, tresses, nattes et coiffures afro à Marseille. KAYDIDI vous propose des prestations de qualité pour sublimer vos cheveux."
            }
          `}</script>
        </Helmet>
        <Header/>

        {/* Hero Section */}
        <motion.div
            id={"salon"}
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1}}
            className="relative h-[100vh] bg-cover bg-center"
            style={{
              backgroundImage:
                  'url("./images/3C0DED25-265D-44BD-9E9D-81C7F02E93F2.jpg")',
            }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"/>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <motion.h1
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.8}}
                className="text-5xl md:text-6xl font-bold mb-6 text-center"
                style={{ fontFamily: 'TAN Moonlight' }}
            >
              KAYDIDI
            </motion.h1>
            <motion.p
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5, duration: 0.8}}
                className="text-xl md:text-2xl mb-8 text-center max-w-2xl"
            >
              Hairstylist & Lockticienne
            </motion.p>
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.7, duration: 0.5}}
            >
              <ReservationButton/>
            </motion.div>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <motion.section
            id={"realisations"}
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="py-16"
        >
          <div className=" relative  mx-auto">
            <div className="py-12 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Nos réalisations</h2>
            </div>
            <Swiper
                modules={[Parallax, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={800}
                spaceBetween={20}
                loop={true}
                slidesPerView={slidesPerView}
                centeredSlides={true}
                parallax={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-[700px] rounded-lg"
                aria-label="Galerie de réalisations"
            >
              {images.map((src, index) => (
                  <SwiperSlide key={index} className="relative flex justify-center rounded-lg">
                    <div
                        className={`relative w-[90%] h-[90%] overflow-hidden rounded-lg shadow-lg transition-all duration-700 ease-in-out ${
                            index === activeIndex
                                ? "scale-110 filter-none"
                                : "scale-90  filter grayscale brightness-75"
                        }`}
                        style={{
                          transformOrigin: "center",
                          willChange: "transform, filter",
                        }}
                    >
                      <img
                          src={src}
                          alt={`Réalisation de coiffure ${index + 1} - KAYDIDI Salon`}
                          className="object-cover w-full h-full rounded-lg"
                          loading={index <= 2 ? "eager" : "lazy"}
                      />
                    </div>
                  </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </motion.section>

          {/* About Section */}
          <motion.section
              id={"about"}
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="py-16"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Notre Histoire</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                Chez Kaydidi Coiffure, chaque coiffure commence par une vraie rencontre. Je te coiffe comme j’aimerais qu’on me coiffe : avec écoute, soin, et style. Diplômée et passionnée, j’accueille tous types de cheveux dans un salon privé où tu es au centre.
Ici, pas de passage à la chaîne — juste toi, ton moment, ta coiffure. Bienvenue chez Kaydidi.

                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="py-16 bg-gray-50"
              id="contact"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Nous Contacter</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-6">
                  <motion.div
                      initial={{opacity: 0, x: -50}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.6}}
                      className="flex items-center gap-4"
                  >
                    <MapPin className="w-6 h-6 text-gray-600"/>
                    <div>
                      <h3 className="font-semibold">Adresse</h3>
                      <p className="text-gray-600">boulevard de paris, 13002 Marseille</p>
                    </div>
                  </motion.div>
                  <motion.div
                      initial={{opacity: 0, x: -50}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.2}}
                      className="flex items-center gap-4"
                  >
                    <Phone className="w-6 h-6 text-gray-600"/>
                    <div>
                     <h3 className="font-semibold">Téléphone</h3>
                     <p className="text-gray-600">07 69 04 87 60</p>
                    </div>
                  </motion.div>
                  <motion.div
                      initial={{opacity: 0, x: -50}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.4}}
                      className="flex items-center gap-4"
                  >
                    <Mail className="w-6 h-6 text-gray-600"/>
                    <div>
                     <h3 className="font-semibold">Email</h3>
                     <p className="text-gray-600">elodiieboyedon@gmail.com</p>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    className="h-[300px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
                >
           
              <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.935424224028!2d5.368023!3d43.30496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0b84552a4cb%3A0x25cc3db8b4e49df3!2sBoulevard%20de%20Paris%2C%2013002%20Marseille!5e0!3m2!1sfr!2sfr!4v1684936243851!5m2!1sfr!2sfr"
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
      </div>
);
}

export default Home;
