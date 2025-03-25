import React, {useEffect, useState} from "react";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
// import ImageCarousel from "../components/ImageCarousel";
import { Header } from "../components/Header.tsx";
import { ReservationButton } from "../components/ReservationButton.tsx";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
                  'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"/>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <motion.h1
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.8}}
                className="text-5xl md:text-6xl font-bold mb-6 text-center"
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
                          alt={`Slide ${index}`}
                          className="object-cover w-full h-full rounded-lg"
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
                  Depuis 2010, notre salon s'engage à offrir des services de coiffure exceptionnels dans une ambiance
                  chaleureuse et accueillante. Notre équipe de professionnels passionnés combine expertise technique et
                  créativité pour révéler votre beauté naturelle.
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
                      <p className="text-gray-600">123 Rue de la Coiffure, 75001 Paris</p>
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
                      <p className="text-gray-600">01 23 45 67 89</p>
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
                      <p className="text-gray-600">contact@salondecoiffure.fr</p>
                    </div>
                  </motion.div>
                  <motion.div
                      initial={{opacity: 0, x: -50}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.6}}
                      className="flex gap-4 pt-4"
                  >
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      <Instagram className="w-6 h-6"/>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      <Facebook className="w-6 h-6"/>
                    </a>
                  </motion.div>
                </div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    className="h-[300px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
                >
                  Carte Interactive
                </motion.div>
              </div>
            </div>
          </motion.section>
      </div>
);
}

export default Home;
