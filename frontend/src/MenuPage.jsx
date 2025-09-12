import React, { useMemo, useState } from 'react'

const ITEMS = [
  // Starters
  {
    id: 's1',
    name: 'Crispy Veg Spring Rolls',
    category: 'Starters',
    price: 129,
    desc: 'Golden rolls served with sweet chili sauce.',
    img: 'https://images.unsplash.com/photo-1604908177522-4f8b6f3d9f4a?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 's2',
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 179,
    desc: 'Smoky grilled cottage cheese with spices.',
    img: 'https://images.unsplash.com/photo-1604908177584-93f0f3a6d3a6?auto=format&fit=crop&w=800&q=60',
  },

  // Mains
  {
    id: 'm1',
    name: 'Butter Chicken',
    category: 'Mains',
    price: 249,
    desc: 'Classic creamy tomato-based butter chicken.',
    img: 'https://images.unsplash.com/photo-1604908177466-9f7bd8d1b8a9?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'm2',
    name: 'Paneer Butter Masala',
    category: 'Mains',
    price: 229,
    desc: 'Rich and creamy paneer curry.',
    img: 'https://images.unsplash.com/photo-1620896220330-6fc4e7d1b3b6?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'm3',
    name: 'Margherita Pizza',
    category: 'Mains',
    price: 199,
    desc: 'Classic cheese & tomato with basil.',
    img: 'https://images.unsplash.com/photo-1548365328-9d94d2b3b5b6?auto=format&fit=crop&w=800&q=60',
  },

  // Desserts
  {
    id: 'd1',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    price: 99,
    desc: 'Warm fudgy brownie with vanilla ice cream.',
    img: 'https://images.unsplash.com/photo-1603079847616-9c6a9a5f0c6b?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'd2',
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 79,
    desc: 'Soft milk dumplings soaked in sugar syrup.',
    img: 'https://images.unsplash.com/photo-1606788075760-63a3df6d9d6f?auto=format&fit=crop&w=800&q=60',
  },

  // Beverages
  {
    id: 'b1',
    name: 'Masala Chai',
    category: 'Beverages',
    price: 39,
    desc: 'Traditional spiced tea.',
    img: 'https://images.unsplash.com/photo-1515477090765-3a7f3fb2b92b?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'b2',
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 99,
    desc: 'Iced coffee with cream.',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60',
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(ITEMS.map(i => i.category)))]

export default function MenuPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('popular') // popular | price-asc | price-desc
  const [cart, setCart] = useState({}) // {id: qty}

  const filtered = useMemo(() => {
    let out = ITEMS.filter(it => {
      const q = query.trim().toLowerCase()
      const inQuery = !q || it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
      const inCategory = category === 'All' || it.category === category
      return inQuery && inCategory
    })

    if (sort === 'price-asc') out = out.sort((a,b) => a.price - b.price)
    else if (sort === 'price-desc') out = out.sort((a,b) => b.price - a.price)
    // else popular - keep original order

    return out
  }, [query, category, sort])

  function addToCart(itemId) {
    setCart(prev => {
      const next = { ...prev }
      next[itemId] = (next[itemId] || 0) + 1
      return next
    })
  }

  function removeFromCart(itemId) {
    setCart(prev => {
      const next = { ...prev }
      if (!next[itemId]) return prev
      next[itemId] = next[itemId] - 1
      if (next[itemId] <= 0) delete next[itemId]
      return next
    })
  }

  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0)
  const cartTotal = Object.entries(cart).reduce((s, [id, qty]) => {
    const item = ITEMS.find(i => i.id === id)
    return s + (item?.price || 0) * qty
  }, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-orange-600">DiscountMithra — Digital Menu</h1>
          <p className="text-sm text-gray-600">Table Booking • Takeaway • Delivery</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search dishes, e.g. 'paneer'..."
              className="pl-3 pr-10 py-2 rounded-lg border focus:ring-2 focus:ring-orange-300 outline-none"
            />
            <svg className="w-5 h-5 absolute right-2 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="py-2 px-3 rounded-lg border bg-white">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={sort} onChange={e => setSort(e.target.value)}
              className="py-2 px-3 rounded-lg border bg-white">
              <option value="popular">Sort: Popular</option>
              <option value="price-asc">Sort: Price ↑</option>
              <option value="price-desc">Sort: Price ↓</option>
            </select>
          </div>

          {/* Cart */}
          <button
            type="button"
            className="ml-2 inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            onClick={() => {
              // scroll to cart (simple UX)
              const el = document.getElementById('cart-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 6M7 13l-2 7h12l-2-7M16 21a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z"/>
            </svg>
            Cart ({cartCount})
          </button>
        </div>
      </header>

      {/* Categories pills */}
      <nav className="mt-6 flex gap-3 overflow-x-auto pb-2">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full border ${category === c ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
          >
            {c}
          </button>
        ))}
      </nav>

      {/* Grid */}
      <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <article key={item.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <img src={item.img} alt={item.name} className="menu-img mb-4" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">₹{item.price}</div>
                <div className="text-xs text-gray-400">{item.category}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 rounded-lg border"
                  aria-label={`Remove one ${item.name}`}
                >
                  −
                </button>
                <div className="w-8 text-center">{cart[item.id] || 0}</div>
                <button
                  onClick={() => addToCart(item.id)}
                  className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                  aria-label={`Add one ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Cart summary */}
      <section id="cart-section" className="mt-10 bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Order Summary</h2>
          <div className="text-lg font-bold">Total: ₹{cartTotal}</div>
        </div>

        <div className="mt-4">
          {!cartCount ? (
            <p className="text-gray-500">Your cart is empty. Add items to place an order.</p>
          ) : (
            <ul className="space-y-3">
              {Object.entries(cart).map(([id, qty]) => {
                const it = ITEMS.find(x => x.id === id)
                if (!it) return null
                return (
                  <li key={id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{it.name} <span className="text-sm text-gray-500">x{qty}</span></div>
                      <div className="text-sm text-gray-400">₹{it.price} each</div>
                    </div>
                    <div className="font-semibold">₹{it.price * qty}</div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => { setCart({}) }}
            className="px-4 py-2 rounded-lg border"
          >
            Clear
          </button>
          <button
            onClick={() => alert('Proceed to checkout — integrate payment / order flow next')}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white"
            disabled={!cartCount}
          >
            Checkout
          </button>
        </div>
      </section>

      <footer className="mt-10 text-center text-gray-500">
        © {new Date().getFullYear()} DiscountMithra • Digital Menu Preview
      </footer>
    </div>
  )
}
