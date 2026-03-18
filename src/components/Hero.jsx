import LoginPage from "../features/auth/LoginPage"
import HeroImg from "../assets/Hero.jpg"

function Hero() {
  return (
    <section 
    className="h-[70vh] flex items-center justify-between px-10 text-white bg-cover bg-center"
    style={{ backgroundImage: `url(${HeroImg})` }}
    >
      
      <div>
        <h1 className="text-5xl font-bold">
          JOYERÍA MÁRQUEZ
          <br />
          <span className="text-yellow-500 text-3xl">
            BELLEZA Y ELEGANCIA
          </span>
        </h1>

        <p className="mt-4">
          Luce elegante y sutil con cada joya Márquez.
          <br />
          Haz que tu luz brille.
        </p>

        <button className="mt-6 px-6 py-3 bg-yellow-600 rounded-full">
          Únete a nosotros
        </button>
      </div>

      <LoginPage />
    </section>
  )
}

export default Hero