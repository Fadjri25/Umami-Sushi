import { useState } from "react";
import {
  MapPin,
  CheckCircle2,
  UtensilsCrossed,
  ArrowUpRight,
  Menu as MenuIcon,
  X,
  MessageCircle,
} from "lucide-react";

// Data Outlet & Operasional
const outlets = [
  {
    name: "Umami Sushi - Sungai Raya Dalam",
    address: "Jl. Sungai Raya Dalam No. 8A, Pontianak",
    tag: "Delivery & Takeaway Hub",
    dineIn: false,
    delivery: true,
    maps: "https://maps.google.com/?q=Sungai+Raya+Dalam+No+8A+Pontianak",
  },
  {
    name: "Umami Sushi - Reformasi",
    address: "Jl. Reformasi, Gg. Struktur, Pontianak",
    tag: "Dine-In & Casual Spot",
    dineIn: true,
    delivery: true,
    maps: "https://maps.google.com/?q=Jl.+Reformasi+Gg.+Struktur+Pontianak",
  },
];

// Data Kategori Menu Lengkap
const menuCategories = [
  { id: "all", label: "Semua Kategori" },
  { id: "sushi-roll", label: "Sushi Roll" },
  { id: "fried-roll", label: "Fried Roll" },
  { id: "nigiri-gunkan", label: "Nigiri & Gunkan" },
  { id: "donburi", label: "Rice Bowl & Don" },
  { id: "hosomaki", label: "Hosomaki" },
  { id: "appetizer-side", label: "Appetizer & Side Dish" },
  { id: "drinks", label: "Minuman" },
];

const menuItems = [
  { name: "Aburi Salmon Mentai Roll", category: "sushi-roll", desc: "Salmon panggang lembut dengan saus mentai gurih khas Umami.", highlight: "Best Seller" },
  { name: "Spicy Tuna Roll", category: "sushi-roll", desc: "Isian olahan tuna segar dengan sentuhan minyak wijen dan cabai khas.", highlight: "" },
  { name: "Crunchy Fried Chicken Roll", category: "fried-roll", desc: "Roll goreng renyah isi ayam katsu gurih dengan baluran mayo.", highlight: "Favorite" },
  { name: "Crispy Salmon Tempura Roll", category: "fried-roll", desc: "Salmon tempura digoreng emas dengan topping saus manis khas Jepang.", highlight: "" },
  { name: "Salmon Nigiri", category: "nigiri-gunkan", desc: "Irisan salmon segar di atas nasi sushi berbumbu cuka Jepang lembut.", highlight: "" },
  { name: "Tobiko Gunkan Style", category: "nigiri-gunkan", desc: "Nasi sushi dibalut nori renyah dengan isian telur ikan terbang segar.", highlight: "" },
  { name: "Inari Mentai Gunkan", category: "nigiri-gunkan", desc: "Kulit tahu manis khas Jepang diisi nasi sushi & lelehan mentai.", highlight: "" },
  { name: "Chicken Katsu Donburi", category: "donburi", desc: "Mangkuk nasi hangat dengan katsu ayam renyah & tumisan telur gurih.", highlight: "Popular" },
  { name: "Beef Teriyaki Bowl Don", category: "donburi", desc: "Irisan daging sapi lembut dimasak saus teriyaki racikan spesial.", highlight: "" },
  { name: "Salmon Hosomaki", category: "hosomaki", desc: "Roll sushi simpel berbalut nori isi potongan salmon segar murni.", highlight: "" },
  { name: "Kani Hosomaki", category: "hosomaki", desc: "Roll sushi gulung nori dengan isian stik kepiting manis lembut.", highlight: "" },
  { name: "Edamame Rebus Salted", category: "appetizer-side", desc: "Kacang kedelai Jepang rebus tabur garam laut alami segar.", highlight: "" },
  { name: "Gyoza Panggang Creamy", category: "appetizer-side", desc: "Pangsit isi daging ayam dan sayuran bertekstur crispy di bawah.", highlight: "Must Try" },
  { name: "Ocha Dingin / Hangat (Free Refill)", category: "drinks", desc: "Teh hijau khas Jepang yang segar dan menetralkan dahaga.", highlight: "" },
  { name: "Iced Lemon Tea Umami", category: "drinks", desc: "Kesegaran ekstrak lemon alami dipadukan dengan teh aromatik.", highlight: "" },
];

// Komponen Logo SVG Umami Sushi
function UmamiLogo({ className = "h-12", light = false }: { className?: string; light?: boolean }) {
  const mainColor = light ? "#FFFFFF" : "#971f20";

  return (
    <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
      {/* Icon Yatai / Roof Structure */}
      <svg
        width="44"
        height="36"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-1 transition-transform hover:scale-105"
      >
        <path
          d="M50 8L15 32H85L50 8Z"
          stroke={mainColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 32V68C20 70 35 72 50 72C65 72 80 70 80 68V32"
          stroke={mainColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M36 38C36 55 42 66 50 66C58 66 64 55 64 38"
          stroke={mainColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Kanji Accent */}
        <text
          x="50"
          y="26"
          fill={mainColor}
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="serif"
        >
          うま味
        </text>
      </svg>

      {/* Brand Text UMAMI */}
      <span
        className="font-serif tracking-[0.28em] text-lg sm:text-xl font-bold uppercase leading-none pl-[0.28em]"
        style={{ color: mainColor }}
      >
        UMAMI
      </span>
      {/* Subtext SUSHI */}
      <span
        className="text-[9px] sm:text-[10px] font-sans tracking-[0.4em] font-medium uppercase mt-0.5 pl-[0.4em]"
        style={{ color: light ? "#E5E7EB" : "#4B5563" }}
      >
        SUSHI
      </span>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredMenu =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const whatsappUrl =
    "https://wa.me/6285705062644?text=Halo%20Umami%20Sushi,%20saya%20ingin%20memesan%20sushi%20/%20reservasi%20tempat.";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans selection:bg-[#971f20] selection:text-white">
      
      {/* 🟢 TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#971f20] text-white text-[11px] sm:text-xs font-medium py-2 px-4 text-center tracking-wider flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>100% Halal Certified</span>
        <span className="opacity-40">•</span>
        <span>Pontianak, Kalimantan Barat</span>
        <span className="hidden sm:inline opacity-40">•</span>
        <span className="hidden sm:inline">Order WhatsApp: +62 857-0506-2644</span>
      </div>

      {/* 🟢 NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#971f20]/15">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <UmamiLogo />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase text-[#1C1917]/80">
            <a href="#tentang" className="hover:text-[#971f20] transition-colors">Filosofi</a>
            <a href="#menu" className="hover:text-[#971f20] transition-colors">Daftar Menu</a>
            <a href="#outlet" className="hover:text-[#971f20] transition-colors">Lokasi Cabang</a>
            <a href="#layanan" className="hover:text-[#971f20] transition-colors">Layanan</a>
          </div>

          {/* CTA Header */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#971f20] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#7a1819] transition-all shadow-md shadow-[#971f20]/20 hover:-translate-y-0.5"
            >
              <MessageCircle size={15} /> Pesan / Reservasi
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1C1917]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#971f20]/15 bg-[#FAF7F2] px-6 py-6 space-y-4">
            <a
              href="#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-[#1C1917]"
            >
              Filosofi
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-[#1C1917]"
            >
              Daftar Menu
            </a>
            <a
              href="#outlet"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-[#1C1917]"
            >
              Lokasi Cabang
            </a>
            <a
              href="#layanan"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-[#1C1917]"
            >
              Layanan
            </a>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#971f20] text-white px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase"
              >
                <MessageCircle size={16} /> Pesan / Reservasi WA
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 🟢 HERO SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-[#971f20]/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Sisi Kiri: Narasi Editorial */}
            <div className="lg:col-span-7 space-y-6">

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.08]">
                Keberagaman Rasa <br />
                <span className="text-[#971f20] italic font-normal">Authentic Umami</span> <br />
                Setiap Hari.
              </h1>

              <p className="text-base sm:text-lg text-[#1C1917]/75 font-normal leading-relaxed max-w-xl">
                Menyajikan aneka hidangan khas Jepang seperti <span className="font-semibold text-[#1C1917]">Sushi Roll, Nigiri, Gunkan, hingga Donburi</span> lezat yang diolah dari bahan berkualitas segar dengan harga terjangkau di Pontianak.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#menu"
                  className="bg-[#971f20] text-white px-8 py-4 rounded-full text-xs font-extrabold tracking-widest uppercase hover:bg-[#7a1819] transition-all shadow-lg shadow-[#971f20]/25 hover:-translate-y-0.5"
                >
                  Lihat Menu Lengkap
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#1C1917]/20 text-[#1C1917] hover:border-[#971f20] hover:text-[#971f20] px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
                >
                  Hubungi WA Kami
                </a>
              </div>

              {/* Fitur Utama */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#971f20]/15">
                <div>
                  <span className="block text-2xl font-serif font-bold text-[#971f20]">100%</span>
                  <span className="text-xs text-[#1C1917]/70 font-medium uppercase tracking-wider">Halal Certified</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif font-bold text-[#971f20]">2 Outlet</span>
                  <span className="text-xs text-[#1C1917]/70 font-medium uppercase tracking-wider">Lokasi Pontianak</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif font-bold text-[#971f20]">10+ Kategori</span>
                  <span className="text-xs text-[#1C1917]/70 font-medium uppercase tracking-wider">Pilihan Kuliner</span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Japanese Graphic Badge Block */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/5] bg-[#971f20] text-white p-8 rounded-sm shadow-2xl flex flex-col justify-between border-8 border-white">
                
                <div className="absolute inset-3 border border-white/20 pointer-events-none"></div>

                <div className="flex justify-between items-start z-10">
                  <span className="text-xs font-bold tracking-widest uppercase opacity-80">
                    PONTIANAK, KALBAR
                  </span>
                  <span className="text-2xl font-serif tracking-widest opacity-40">うま味</span>
                </div>

                <div className="text-center my-auto py-8 z-10 space-y-4">
                  <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-2">
                    <UmamiLogo light={true} />
                  </div>
                  <h3 className="text-2xl font-serif tracking-wide font-bold">
                    Cita Rasa Khas Gurih
                  </h3>
                  <p className="text-xs leading-relaxed opacity-90 max-w-xs mx-auto font-light">
                    Sajikan sushi hangat dan segar yang cocok dinikmati santai bersama keluarga, teman, dan sahabat tercinta.
                  </p>
                </div>

                <div className="border-t border-white/20 pt-4 flex justify-between items-center text-[11px] tracking-wider uppercase z-10">
                  <span>Dine-In • Takeaway</span>
                  <span className="font-bold text-amber-300">★ Affordable Premium</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🟢 SEKSI 1: FILOSOFI & KEUNGGULAN */}
      <section id="tentang" className="py-20 bg-white border-b border-[#971f20]/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#971f20] block mb-2">
              // CONCEPT & PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              Mengapa Dinamakan <span className="text-[#971f20] italic">"Umami"</span>?
            </h2>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#FAF7F2] border border-[#971f20]/10 rounded-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#971f20]/10 text-[#971f20] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1C1917]">Cita Rasa Autentik</h3>
              <p className="text-xs text-[#1C1917]/70 leading-relaxed">
                Kata <em>Umami</em> merujuk pada rasa gurih kelezatan kelima. Kami mengolah bumbu khas Jepang yang disesuaikan dengan selera masyarakat Pontianak.
              </p>
            </div>

            <div className="p-8 bg-[#FAF7F2] border border-[#971f20]/10 rounded-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#971f20]/10 text-[#971f20] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1C1917]">Bahan Segar & Halal</h3>
              <p className="text-xs text-[#1C1917]/70 leading-relaxed">
                Seluruh bahan hidangan laut, olahan ayam, hingga saus pendamping terjamin 100% Halal dengan standar kebersihan racikan harian yang tinggi.
              </p>
            </div>

            <div className="p-8 bg-[#FAF7F2] border border-[#971f20]/10 rounded-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#971f20]/10 text-[#971f20] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1C1917]">Harga Terjangkau</h3>
              <p className="text-xs text-[#1C1917]/70 leading-relaxed">
                Menikmati kualitas sushi premium tidak harus mahal. Porsi melimpah cocok disantap bersama teman, sahabat, maupun rekan kerja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 SEKSI 2: DAFTAR MENU */}
      <section id="menu" className="py-20 bg-[#FAF7F2] border-b border-[#971f20]/10">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#971f20] block mb-2">
              // DAFTAR KULINER
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1917]">
              Menu Pilihan Umami Sushi
            </h2>
            <p className="text-xs sm:text-sm text-[#1C1917]/70 mt-3 font-medium">
              Tersedia varian Appetizer, Rice Bowl, Sushi Roll, Fried Roll, Hosomaki, Nigiri, Gunkan Style, hingga Side Dish.
            </p>
          </div>

          {/* Tab Filter Kategori */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#971f20] text-white shadow-md shadow-[#971f20]/20"
                    : "bg-white text-[#1C1917]/70 hover:bg-[#971f20]/10 hover:text-[#971f20] border border-[#971f20]/15"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Menu */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 bg-white p-8 sm:p-12 rounded-sm border border-[#971f20]/20 shadow-sm">
            {filteredMenu.map((item, idx) => (
              <div
                key={idx}
                className="pb-5 border-b border-dashed border-[#1C1917]/15 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="text-base font-serif font-bold text-[#1C1917] group-hover:text-[#971f20] transition-colors">
                      {item.name}
                    </h4>
                    {item.highlight && (
                      <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#971f20]/10 text-[#971f20]">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#1C1917]/65 mt-1 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#1C1917]/60 italic mb-4">
              * Menu lengkap dan ketersediaan stok harian dapat dicek melalui pemesanan WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#971f20] text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#7a1819] transition-all"
            >
              <MessageCircle size={16} /> Pesan Menu Sekarang via WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* 🟢 SEKSI 3: LOKASI CABANG */}
      <section id="outlet" className="py-20 bg-white border-b border-[#971f20]/10">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#971f20] block mb-2">
                // LOKASI KAMI
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
                Cabang Umami Sushi Pontianak
              </h2>
            </div>
            <p className="text-xs text-[#1C1917]/70 mt-2 md:mt-0 font-medium">
              Siap melayani pesanan Dine-In, Takeaway, maupun Delivery Daring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {outlets.map((outlet, i) => (
              <div
                key={i}
                className="p-8 bg-[#FAF7F2] border-2 border-[#971f20]/15 rounded-sm relative flex flex-col justify-between hover:border-[#971f20] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-[#971f20] text-white rounded-full">
                      {outlet.tag}
                    </span>
                    <MapPin className="text-[#971f20]" size={20} />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1C1917] group-hover:text-[#971f20] transition-colors">
                    {outlet.name}
                  </h3>
                  <p className="text-xs text-[#1C1917]/80 mt-2 leading-relaxed font-medium">
                    {outlet.address}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#971f20]/10 space-y-2 text-xs text-[#1C1917]/75">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600" />
                      <span>Bisa Dikirim / Delivery: <strong>Ya</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed size={15} className={outlet.dineIn ? "text-emerald-600" : "text-amber-600"} />
                      <span>Layanan Dine-In: <strong>{outlet.dineIn ? "Tersedia" : "Fokus Delivery & Takeaway"}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={outlet.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#971f20] hover:underline"
                  >
                    Petunjuk Arah Google Maps <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🟢 SEKSI 4: CARA PEMESANAN / RESERVASI */}
      <section id="layanan" className="py-20 bg-[#971f20] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-white/70">
              // EASY ORDER & RESERVATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold">
              Ingin Menikmati Umami Sushi Hari Ini?
            </h2>
            <p className="text-xs sm:text-sm font-light text-white/85 leading-relaxed">
              Pesan secara langsung melalui WhatsApp resmi kami untuk reservasi tempat duduk atau pengiriman makanan langsung ke rumah Anda.
            </p>
          </div>

          <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-[#971f20] px-9 py-4 rounded-full text-xs font-extrabold tracking-widest uppercase hover:bg-zinc-100 transition-all shadow-xl"
            >
              Hubungi WhatsApp: +62 857-0506-2644
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-300" /> <span>Pesan Antar (Delivery)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-300" /> <span>Reservasi Tempat</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-300" /> <span>100% Halal Certified</span>
            </div>
          </div>

        </div>
      </section>

      {/* 🟢 FOOTER MINIMALIS */}
      <footer className="bg-[#1C1917] text-white py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
            
            <div className="md:col-span-5 space-y-4">
              <UmamiLogo light={true} />
              <p className="text-xs text-white/60 leading-relaxed font-light max-w-sm">
                Restoran sushi Jepang autentik berlokasi di Pontianak, Kalimantan Barat. Menyajikan aneka hidangan sushi roll, nigiri, dan donburi lezat yang halal dan terjangkau.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#971f20]">
                Lokasi Pontianak
              </h5>
              <p className="text-xs text-white/80">
                1. Jl. Sungai Raya Dalam No. 8A, Pontianak
              </p>
              <p className="text-xs text-white/80">
                2. Jl. Reformasi, Gg. Struktur, Pontianak
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#971f20]">
                Kontak Reservasi
              </h5>
              <p className="text-xs text-white/80">
                WhatsApp: +62 857-0506-2644
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold tracking-wider rounded uppercase">
                100% Halal Certified
              </span>
            </div>

          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFFFF]/50 tracking-wider uppercase gap-4">
            <span>© {new Date().getFullYear()} UMAMI SUSHI PONTIANAK. ALL RIGHTS RESERVED.</span>
            <span>JAPANESE CASUAL DINING</span>
          </div>
        </div>
      </footer>

    </div>
  );
}