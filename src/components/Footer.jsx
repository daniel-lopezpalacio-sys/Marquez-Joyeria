function Footer() {
    return(
        <footer className="bg-[#0b0b0b] text-gray-300 pt-14 pb-8 px-6 border-t border-gray-800">

            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
                <div>
                    <h4 className="text-white font-semibold mb-6">Contacto</h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-center gap-5">New York City</li>
                        <li className="flex items-center gap-2">+ 877 6904296</li>
                        <a href="mailto:hola@joyeriamarquez.com"
                        className="hover:text-yellow-500 transition">
                            hola@joyeriamarquez.com</a>
                    </ul>
                </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm-gray-500">
                © 2026 Joyería Márquez · Alta Joyería
            </div>
        </footer>
    )
}

export default Footer;