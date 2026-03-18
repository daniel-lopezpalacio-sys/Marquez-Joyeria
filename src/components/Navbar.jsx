function Navbar() {
  return (
    <header className="flex items-center justify-between px-10 py-4 bg-black/80 text-white">
      <h2 className="text-2xl font-bold text-yellow-500">
        Joyería Márquez
      </h2>

      <nav>
        <ul className="flex gap-8">
          <li><a href="#" className="hover:text-yellow-500">ORO</a></li>
          <li><a href="#" className="hover:text-yellow-500">PLATA</a></li>
          <li><a href="#" className="hover:text-yellow-500">ESMERALDAS</a></li>
          <li><a href="#" className="hover:text-yellow-500">RELOJERÍA</a></li>
        </ul>
      </nav>

      <div className="flex">
        <input
          type="search"
          placeholder="Buscar..."
          className="px-3 py-2 bg-transparent border border-yellow-500"
        />
        <button className="px-4 bg-yellow-600">Buscar</button>
      </div>
    </header>
  )
}

export default Navbar