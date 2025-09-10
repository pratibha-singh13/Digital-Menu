export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-orange-600">Digital Menu</h1>
        <nav className="space-x-6">
          <a href="#menu" className="hover:text-orange-500">Menu</a>
          <a href="#booking" className="hover:text-orange-500">Book a Table</a>
          <a href="#contact" className="hover:text-orange-500">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Restaurant,<br /> Now Digital 🍽️
          </h2>
          <p className="text-lg text-gray-700">
            Browse the menu, book tables, order takeaways, or get food delivered — 
            all in one smooth, easy-to-use platform.
          </p>
          <div className="space-x-4 mt-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition">
              View Menu
            </button>
            <button className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300 transition">
              Book a Table
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
            alt="Digital Menu Preview"
            className="rounded-2xl shadow-xl max-w-md"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-white" id="menu">
        <h3 className="text-3xl font-bold text-center mb-10">What You Can Do</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-orange-50 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">📋 Explore Menu</h4>
            <p>View all dishes, prices, and descriptions digitally.</p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">🍴 Table Booking</h4>
            <p>Reserve your seat ahead of time hassle-free.</p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">🛵 Takeaway & Delivery</h4>
            <p>Order for pickup or delivery with just a few taps.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        © {new Date().getFullYear()} DiscountMithra. All rights reserved.
      </footer>
    </div>
  )
}
