import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

import anilloImg from "../assets/images/anillo.jpg";
import jandcoImg from "../assets/images/jandco.jpg";
import collarImg from "../assets/images/collar.png";
import promoVideo from "../assets/video/home.mp4";


function HomePage() {
    return (
        <div className="bg-black min-h-screen">

            <Navbar />
            <Hero />

            <section className="grid md:grid-cols-3 gap-6 p-10 bg-[#0b0b0b]">
                <Card
                  title="ANILLO SOBERANíA"
                  description= "Este anillo destaca por su diseño elegante y sofisticado."
                  image={anilloImg}
                />

                <Card
                  title="RELOJ BILLIONAIRE"
                  description= "Pieza de alta relojería extrema y lujo absoluto."
                  image={jandcoImg}
                />

                <Card
                  title="COLAR DUQUESA"
                  description= "joya de alta elegancia con esmeraldas."
                  image={collarImg}
                />

            </section> 
            

                <section className="relative w-full  h-[70vh] overflow-hidden">

                    <video 
                    src={promoVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </section>
                <Footer />
        </div>

    )
}

export default HomePage
