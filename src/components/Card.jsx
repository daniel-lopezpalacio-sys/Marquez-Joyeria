function Card({ title, description,image }) {
  return (
    <div className="bg-yellow-600 text-black rounded-xl p-4 text-center">

   <img 
   src = {image} alt=" " 
   className="w-full h-48 object-cover rounded-lg mb-4"/>

      <p className="text-sm mb-4">
        {description}
      </p>

      <button className="bg-white px-4 py-2 rounded">
        COMPRAR
      </button>
    </div>

  )
}

export default Card