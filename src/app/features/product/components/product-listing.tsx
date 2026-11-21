"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Navbar } from "@/components/ui/navbar";
import type { Category } from "@/db/schema/catalog";

interface ProductPageProps {
  categories?: Category[];
}

export default function ProductPage({ categories = [] }: ProductPageProps) {
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    showToast("Đã thêm vào giỏ hàng");
  };

  const products = [
    {
      id: 1,
      title: "Tai nghe chống ồn chủ động ANC Bowie H1 Pro",
      subtitle: "Triệt tiêu ồn -48dB, hỗ trợ âm thanh Hi-Res LHDC, pin 80 giờ",
      category: "audio",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      specs: ["ANC -48dB", "Hi-Res Audio", "Pin 80H"],
      price: "1.350.000₫",
      originalPrice: "1.790.000₫",
      tag: "Hi-Res ANC",
    },
    {
      id: 2,
      title: "Pin sạc dự phòng Blade HD 100W Siêu mỏng",
      subtitle:
        "Hợp kim nhôm siêu mỏng 18mm, màn hình hiển thị số Watt đo dòng",
      category: "powerbanks",
      image: "/images/powerbank.jpg",
      specs: ["20.000mAh", "100W Output", "Mỏng 18mm"],
      price: "1.690.000₫",
      originalPrice: "2.100.000₫",
      tag: "Bán chạy",
    },
    {
      id: 3,
      title: "Tai nghe True Wireless siêu nhỏ gọn Bowie E16",
      subtitle:
        "Bluetooth 5.3, màng loa composite 13mm, độ trễ cực thấp 0.038s",
      category: "audio",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      specs: ["Bluetooth 5.3", "Pin 30H", "Kháng nước IPX4"],
      price: "390.000₫",
      originalPrice: "550.000₫",
      tag: "Giá tốt",
    },
    {
      id: 4,
      title: "Củ sạc GaN6 Pro 140W 4 Cổng",
      subtitle:
        'Chuẩn sạc PD 3.1, sạc MacBook Pro 16" cùng lúc 3 thiết bị khác',
      category: "chargers",
      image:
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      specs: ["140W PD 3.1", "3x Type-C + 1x USB-A", "GaN 6"],
      price: "1.490.000₫",
      originalPrice: "1.890.000₫",
      tag: "Flagship",
    },
    {
      id: 5,
      title: "Pin sạc dự phòng MagSafe Magnetic Mini 10.000mAh",
      subtitle: "Hít nam châm N52 siêu chắc chắn cho iPhone, sạc nhanh 20W PD",
      category: "powerbanks",
      image: "/images/powerbank-mini.jpg",
      specs: ["10.000mAh", "15W MagSafe", "Type-C 20W"],
      price: "790.000₫",
      originalPrice: "990.000₫",
      tag: "Mới",
    },
    {
      id: 6,
      title: "Cáp sạc Type-C to Type-C 240W bọc sợi Kevlar 2m",
      subtitle: "Bọc sợi gia cường chịu uốn 25.000 lần, tích hợp chip E-marker",
      category: "cables",
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      specs: ["240W PD 3.1", "Dài 2.0m", "Kevlar Braid"],
      price: "249.000₫",
      originalPrice: "350.000₫",
    },
    {
      id: 7,
      title: "Trạm kết nối USB-C Hub 8-in-1 vỏ kim loại tản nhiệt",
      subtitle: "Xuất HDMI 4K@60Hz, sạc pass-through 100W PD, cổng LAN 1Gbps",
      category: "cables",
      image:
        "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
      specs: ["HDMI 4K@60Hz", "100W PD", "LAN 1000Mbps"],
      price: "850.000₫",
      originalPrice: "1.100.000₫",
      tag: "Văn phòng",
    },
    {
      id: 8,
      title: "Giá đỡ điện thoại kiêm sạc MagSafe ô tô MagPro 15W",
      subtitle:
        "Tản nhiệt bán dẫn sò lạnh peltier làm mát tức thì, kẹp xoay 360°",
      category: "car",
      image:
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
      specs: ["15W MagSafe", "Tản nhiệt sò lạnh", "Xoay 360°"],
      price: "750.000₫",
      originalPrice: "950.000₫",
      tag: "Xe hơi",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-primary selection:text-white font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. NAVBAR WITH 2 MAIN TABS */}
      <Navbar
        activePage="products"
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(!cartOpen)}
      />

      {/* Cart Quick Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900 ">
                  Giỏ hàng ({cartCount})
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-slate-400 hover:text-slate-800 text-lg font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* <div className="divide-y divide-slate-100 mt-4 space-y-3">
                <div className="flex gap-3 py-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-mono font-bold text-slate-700">
                    ANC
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      Tai nghe ANC Bowie H1 Pro
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      1.350.000₫
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 py-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-mono font-bold text-slate-700">
                    100W
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      Pin sạc Blade HD 100W
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      1.690.000₫
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>Tổng cộng:</span>
              </div>
              <Button
                variant="primary"
                className="w-full font-bold"
                onClick={() => {
                  alert("Đang chuyển tới trang thanh toán...");
                  setCartOpen(false);
                }}
              >
                Thanh toán ngay
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CALM & CONFIDENT HERO SECTION */}
      <section className="py-14 sm:py-20 border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Headline & Pitch */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary font-mono">
                PRECISION TECH ACCESSORIES
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
                Phụ kiện chuẩn xác. <br />
                Nâng tầm trải nghiệm.
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
                Hệ sinh thái phụ kiện công nghệ cao cấp: tai nghe chống ồn
                Hi-Res, pin sạc dự phòng siêu mỏng, củ sạc GaN đa cổng và trạm
                kết nối thông minh.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a href="#products">
                  <Button variant="primary" size="lg" className="font-bold">
                    Khám phá sản phẩm
                  </Button>
                </a>
                <a href="#ecosystem">
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold text-slate-700"
                  >
                    Xem hệ sinh thái phụ kiện
                  </Button>
                </a>
              </div>
            </div>

            {/* Editorial Hero Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-4/3 sm:aspect-square border border-slate-200/80 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80"
                  alt="Minimalist Tech Gear Accessories"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. PRODUCT MATRIX (Đầy đủ Tai nghe, Pin dự phòng, Củ sạc, Cáp & Hub) */}
      <section id="products" className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                  Sản phẩm nổi bật
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
                Chọn phụ kiện phù hợp cho laptop, điện thoại và góc làm việc của
                bạn
              </p>
            </div>
            {/* Category Filter Pills (Responsive scroll on mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                subtitle={product.subtitle}
                image={product.image}
                specs={product.specs}
                price={product.price}
                originalPrice={product.originalPrice}
                tag={product.tag}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ECOSYSTEM HIGHLIGHT (3 Trụ Cột: Tai nghe, Pin dự phòng & Sạc GaN với ảnh và thông số riêng biệt, chính xác) */}
      <section
        id="ecosystem"
        className="py-16 sm:py-24 bg-brand-navy text-white"
      >
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-wider">
              HỆ SINH THÁI ĐỒNG BỘ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Thiết kế chuẩn xác cho mọi nhu cầu di động
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Mỗi phụ kiện sở hữu công nghệ cốt lõi riêng biệt: từ âm thanh
              chống ồn cao cấp, pin dự phòng hợp kim siêu mỏng đến củ sạc GaN
              siêu tốc.
            </p>
          </div>

          {/* 3 Pillars Grid: Each has its OWN image and its OWN accurate specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Headphone & Audio */}
            <div className="rounded-2xl bg-brand-navy-surface border border-slate-800 p-6 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden mb-5 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Tai nghe chống ồn Hi-Res"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[11px] font-mono font-bold text-brand-accent uppercase tracking-wider">
                  ÂM THANH HI-RES
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Tai nghe chống ồn ANC Bowie
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Thuật toán chống ồn chủ động Hybrid ANC triệt tiêu tạp âm môi
                  trường, mang lại không gian làm việc tập trung tuyệt đối.
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-black font-mono text-brand-accent">
                    -48dB
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Khử ồn ANC
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-white">
                    80H
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Thời lượng pin
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-emerald-400">
                    LHDC
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Chuẩn Hi-Res
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Powerbank */}
            <div className="rounded-2xl bg-brand-navy-surface border border-slate-800 p-6 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden mb-5 bg-slate-800">
                  <img
                    src="/images/powerbank.jpg"
                    alt="Pin sạc dự phòng Blade siêu mỏng"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[11px] font-mono font-bold text-brand-accent uppercase tracking-wider">
                  NĂNG LƯỢNG DI ĐỘNG
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Pin sạc dự phòng Blade HD
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Thiết kế phẳng siêu mỏng bằng hợp kim nhôm tản nhiệt, tích hợp
                  màn hình LED kỹ thuật số hiển thị dòng sạc thực tế.
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-black font-mono text-brand-accent">
                    18mm
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Độ mỏng vỏ
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-white">
                    100W
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Sạc laptop
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-emerald-400">
                    20.000
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Dung lượng mAh
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: GaN Fast Charger */}
            <div className="rounded-2xl bg-brand-navy-surface border border-slate-800 p-6 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden mb-5 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
                    alt="Củ sạc GaN6 Pro 140W"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[11px] font-mono font-bold text-brand-accent uppercase tracking-wider">
                  CÔNG NGHỆ BÁN DẪN
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Củ sạc GaN6 Pro 140W
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Vật liệu bán dẫn Gallium Nitride thu gọn kích thước củ sạc đến
                  45%, sạc đầy MacBook Pro và điện thoại cùng lúc mát mẻ.
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-black font-mono text-brand-accent">
                    140W
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Chuẩn PD 3.1
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-white">
                    4 Cổng
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    3x Type-C + 1x A
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-emerald-400">
                    -45%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Kích thước gọn
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. TRUST BAR */}
      <section className="py-10 border-b border-slate-100 bg-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                Bảo hành 1 đổi 1
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                12 tháng chính hãng
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                Giao hàng 2H
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                TP.HCM & Hà Nội
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                30 Ngày đổi trả
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Miễn phí trải nghiệm
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                100% Chính hãng
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Kiểm định an toàn quốc tế
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. CLEAN FOOTER */}
      <footer className="py-12 bg-white text-slate-500 text-xs border-t border-slate-100">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">TECHGEAR</span>
            <span>•</span>
            <span>Phụ kiện công nghệ cao cấp</span>
          </div>

          <div>© 2026 TechGear Store.</div>
        </Container>
      </footer>
    </div>
  );
}
