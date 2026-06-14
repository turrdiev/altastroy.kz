/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Instagram, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Plus, 
  Quote, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  Menu, 
  X,
  Send,
  Loader2,
  Palette,
  Ruler,
  LayoutGrid,
  ArrowLeft,
  ArrowUpRight,
  Edit3,
  Trash2,
  ArrowUp,
  ArrowDown,
  Lock,
  Unlock,
  Search
} from 'lucide-react';

import { AdminLogin, AdminDashboard } from './components/AdminPanel';

// --- Constants ---

const NAV_LINKS = [
  { name: 'О нас', href: '#about' },
  { name: 'Продукция', href: '#products' },
  { name: 'Прайс-лист', href: '#price', isPrice: true },
  { name: 'Преимущества', href: '#why-us' },
  { name: 'Проекты', href: '#projects' },
  { name: 'Контакты', href: '#contact' },
];

const PRODUCTS: Product[] = [
  {
    title: 'Брусчатка «Старая Азия»',
    description: 'Классическая брусчатка с имитацией натурального камня. Идеально подходит для пешеходных зон и парковок.',
    images: [
      'https://lh3.googleusercontent.com/d/1TIZ3nqXstse1jTsx7B_q5EqlCV00f-cf',
      'https://lh3.googleusercontent.com/d/1fLR8enQ-E__9oe8g6aBLIVYpoc50vivf',
      'https://lh3.googleusercontent.com/d/1jxqTHDsy7RLHlD0nyD98913uK-La41v9',
      'https://lh3.googleusercontent.com/d/1bwv4G93MosXNGRF-96q6VUtgI_xjVmXY',
      'https://lh3.googleusercontent.com/d/1_Ijd8Ga_zDCDyM4OH88unh6yB4ed1k7-'
    ],
    tags: ['ГОСТ', 'Высокая нагрузка'],
    category: 'Брусчатка'
  },
  {
    title: 'Брусчатка «Кирпичик»',
    description: 'Универсальная форма для благоустройства любых территорий. Проста в укладке и надежна в эксплуатации.',
    images: [
      'https://lh3.googleusercontent.com/d/1xFg0qaL9HGi3fvq0ZPdMSv_I9j_f3tED',
      'https://lh3.googleusercontent.com/d/1n0JueKyjRj8Tbk_FNmQ7nu6jpgY8L4MW',
      'https://lh3.googleusercontent.com/d/1FUo5BK8728ybPjKoJbrMbFGUDav55FoB',
      'https://lh3.googleusercontent.com/d/1SihsW_vDNWOQBx7oqcCW7_RE4dfOODjP',
      'https://lh3.googleusercontent.com/d/1L4jYhfT5rbs5AjRjcORz49x3U6oCFQGX'
    ],
    tags: ['Популярное', 'Универсальность'],
    category: 'Брусчатка'
  },
  {
    title: 'Брусчатка «Квадро»',
    description: 'Современная квадратная форма с идеальными пропорциями. Идеально стыкуется и подходит для благоустройства территорий.',
    images: [
      'https://lh3.googleusercontent.com/d/1D2fbb-WP6_p604pa8y_ap6D2lhXN5rYV'
    ],
    tags: ['ГОСТ', 'Геометрия'],
    category: 'Брусчатка'
  },
  {
    title: 'Брусчатка «Старый Город»',
    description: 'Имитирует старинную каменную мостовую. Комплект из камней разного размера воссоздает атмосферу европейских улочек.',
    images: [
      'https://lh3.googleusercontent.com/d/1gvaB0YB5M6AcPFU4s8KZvFnNqkeQsmxC'
    ],
    tags: ['Ретро', 'Эстетика'],
    category: 'Брусчатка'
  },
  {
    title: 'Брусчатка «Ромбик 3D»',
    description: 'Позволяет создавать уникальные визуальные эффекты и объемные рисунки на мощении.',
    images: [
      'https://lh3.googleusercontent.com/d/1p6cZn3fQ_KEFxah6hNErtJj4GlY4uzYK',
      'https://lh3.googleusercontent.com/d/1RuI8Kd24opRGs6rhfHmXvI8AcUnCJ5DX',
      'https://lh3.googleusercontent.com/d/1byikNbNaAMZ2pE0w2TR3931BxAiqDJ-1',
      'https://lh3.googleusercontent.com/d/1WDWmA1DxrdrCL9FF-1SNUHcj-5K7j_Ik',
      'https://lh3.googleusercontent.com/d/1dN6zaTPFVHhLSMiqjJD3xoNe9uBCNhSW'
    ],
    tags: ['3D эффект', 'Эксклюзив'],
    category: 'Брусчатка'
  },
  {
    title: 'Брусчатка «Ландхаус»',
    description: 'Премиальное многоформатное решение для изысканных загородных резиденций и ландшафтных ансамблей.',
    images: [
      'https://lh3.googleusercontent.com/d/1h0hBaxdMvZNv6hBKq0nc9rdZdwqh5FeS'
    ],
    tags: ['Премиум', 'Ландшафт'],
    category: 'Брусчатка'
  },

  {
    title: 'Сплитерный блок 390х190х190',
    description: 'Высокопрочный сплитерный блок с идеальной геометрией для возведения стен, прочных заборов и перегородок.',
    images: [
      'https://lh3.googleusercontent.com/d/1Av3X5YC7BvdxSNxmjMA_PZZ0pxjFWqad'
    ],
    tags: ['Стены', 'ГОСТ', 'Прочность'],
    category: 'Сплитерные блоки'
  },

  {
    title: 'Бордюр «Дорожный» 100х30х15',
    description: 'Дорожный бордюр высокой прочности для разграничения проезжей части и тротуаров.',
    images: [
      'https://lh3.googleusercontent.com/d/1p1okdTw-kknrZamKESNyZ7I1hI6I1NL8'
    ],
    tags: ['Дороги', 'ГОСТ'],
    category: 'Бордюры'
  },
  {
    title: 'Поребрик 100х20х8',
    description: 'Универсальный поребрик для благоустройства пешеходных зон, отмостки и садовых дорожек.',
    images: [
      'https://lh3.googleusercontent.com/d/1kXXloTj-Gwlhv0H7axl23ibWddY_-pVA'
    ],
    tags: ['Пешеходный', 'Благоустройство'],
    category: 'Бордюры'
  },
  {
    title: 'Навершия на столбы',
    description: 'Декоративные элементы для защиты верхушек заборных столбов от осадков.',
    images: [
      'https://lh3.googleusercontent.com/d/1dKDIZLXTOGLECl0pKmKVgGQ56SOob7rh',
      'https://lh3.googleusercontent.com/d/12IgaFvf5OcFuL6zKdl8b08uR2jIGsV-W'
    ],
    tags: ['Защита', 'Декор'],
    category: 'Декоративные элементы'
  }
];

const PRICE_DATA = [
  {
    category: 'Брусчатка (Серая)',
    items: [
      { name: 'Кирпичик', size: '200*100*60', price: '2900 ₸/м2' },
      { name: 'Квадро', size: '200*200*60 / 100*100*60', price: '3500 ₸/м2' },
      { name: 'Ландхаус', size: '80*160*60 / 160*160*60 / 240*160*60', price: '3500 ₸/м2' },
      { name: 'Ромбик 3D', size: '270*160*60', price: '3300 ₸/м2' },
      { name: 'Старая Азия', size: '200*200*60 / 200*100*60 / 100*100*60', price: '3300 ₸/м2' },
      { name: 'Старый Город', size: '180*120*60 / 120*120*60 / 90*120*60 / 60*120*60', price: '3500 ₸/м2' },
    ]
  },
  {
    category: 'Брусчатка (Цветная)',
    items: [
      { name: 'Кирпичик', size: '200*100*60', price: 'СЦ 3300 / БЦ 3800 / БиЗ 4300 ₸/м2' },
      { name: 'Квадро', size: '200*200*60 / 100*100*60', price: 'СЦ 4000 ₸/м2' },
      { name: 'Ландхаус', size: '80*160*60 / 160*160*60 / 240*160*60', price: 'СЦ 4000 / БЦ 4500 / CM 5000 ₸/м2' },
      { name: 'Ромбик 3D', size: '270*160*60', price: 'СЦ 3600 / БЦ 4000 ₸/м2' },
      { name: 'Старая Азия', size: '200*200*60 / 200*100*60 / 100*100*60', price: 'СЦ 3600 / БЦ 4000 ₸/м2' },
      { name: 'Старый Город', size: '180*120*60 / 120*120*60 / 90*120*60 / 60*120*60', price: 'СЦ 4000 / БЦ 4200 ₸/м2' },
    ]
  },
  {
    category: 'Бордюрные камни',
    items: [
      { name: 'Бордюр «Дорожный»', size: '1000*300*150', price: 'Серый 3000 ₸/ед.' },
      { name: 'Поребрик', size: '1000*200*80', price: 'Серый 1200 ₸/ед.' },
    ]
  },
  {
    category: 'Сплитерные блоки',
    items: [
      { name: 'Сплитерный блок (серый)', size: '390*190*190', price: '220 ₸/ед.' },
      { name: 'Сплитерный блок (цветной)', size: '390*190*190', price: '340 ₸/ед.' }
    ]
  },
  {
    category: 'Колонны',
    items: [
      { name: 'Колонна 40x40 Рваная', size: '390*390*190', price: 'Серый 750 / Цветной 850 ₸/ед.' },
      { name: 'Колонна 40x40 Гладкая', size: '390*390*190', price: 'Серый 650 / Цветной 750 ₸/ед.' },
      { name: 'Колонна 33x33 Рваная', size: '330*330*190', price: 'Серый 650 / Цветной 750 ₸/ед.' },
      { name: 'Колонна 33x33 Гладкая', size: '330*330*190', price: 'Серый 600 / Цветной 700 ₸/ед.' },
    ]
  },
  {
    category: 'Накрывочные элементы',
    items: [
      { name: 'Шляпа рядовая', size: '400*260', price: 'Cерый 700 / Цветной 800 ₸/ед.' },
      { name: 'Пирамида', size: '400*400', price: 'Cерый 2100 / Цветной 2300 ₸/ед.' },
      { name: 'Медуза', size: '450*450', price: 'Cерый 2100 / Цветной 2300 ₸/ед.' },
    ]
  },
  {
    category: 'Дополнительно',
    items: [
      { name: 'Геотекстиль', size: '-', price: '599 ₸ (акция)' },
      { name: 'Облицовка рваная (серая)', size: '390*190*190', price: '400 ₸/ед.' },
      { name: 'Облицовка рваная (цветная)', size: '390*190*190', price: '500 ₸/ед.' },
    ]
  }
];

const ADVANTAGES = [
  {
    icon: <Settings className="w-8 h-8" />,
    title: 'Современное оборудование',
    text: 'Используем передовые технологии для производства бетонных изделий высшего класса.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Контроль качества',
    text: 'Строгий лабораторный контроль на каждом этапе производства.'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Долговечность',
    text: 'Наши изделия отличаются морозостойкостью и долгим сроком службы (более 20 лет).'
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Собственное производство',
    text: 'Мы — производители, а значит, даем лучшие цены без посредников.'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Условия для оптовиков',
    text: 'Специальные цены и индивидуальные графики поставок для крупных объектов.'
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: 'Логистика',
    text: 'Налаженная система поставок по всему миру и оперативная доставка продукции в любые регионы.'
  }
];

const PROJECTS = [
  { 
    title: 'Парк «Старая Азия»', 
    area: '1000 кв.м', 
    img: 'https://lh3.googleusercontent.com/d/1SF3A38lNzmYYsPrXUoy15CdVd_JVA02j',
    description: 'Брусчатка «Старая Азия» в коричневом цвете.'
  },
  { 
    title: 'Техцентр, Медеуский р-н', 
    area: '400 кв.м', 
    img: 'https://lh3.googleusercontent.com/d/13NceI-IDBEHCTgwbt1w09XN7imEuVok4',
    description: 'Пункт замены масла. Брусчатка «Кирпичик» серый и черный.'
  },
  { 
    title: 'Магазин «Светофор»', 
    area: '800 кв.м', 
    img: 'https://lh3.googleusercontent.com/d/1ak-zATGaIuPc8PLNxd5BzW-glQ_fhXme',
    description: 'г. Конаев. Брусчатка «Кирпичик» в сером цвете.'
  },
  { 
    title: 'ЖК «Каспий»', 
    area: '1800+ кв.м', 
    img: 'https://lh3.googleusercontent.com/d/1B7My6V3EIQgIvufzd06IfHABvsVxeE9Q',
    description: 'Брусчатка «Кирпичик» и «Квадро».'
  },
  { 
    title: 'Медцентр, г. Конаев', 
    area: '12000+ шт', 
    img: 'https://lh3.googleusercontent.com/d/15s9a7P2XNs1kutN-uzXkBHdeTMWHg5Cv',
    description: 'Сплитерный блок «Гладкий» в сером цвете.'
  },
  { 
    title: 'Городское благоустройство', 
    area: '14000+ кв.м', 
    img: 'https://lh3.googleusercontent.com/d/1Xcdhne1rbXFrtipoemjSYpOJc2w63OaR', 
    description: 'Брусчатка «Ромбик 3Д» в различных расцветках.'
  }
];

export interface Product {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  category: string;
}

interface InquiryItem {
  id: string;
  title: string;
  category: string;
  qty: number;
  unit: string;
  color: string;
  pricePerUnit: number;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onOpenGallery: (product: Product) => void;
}

// --- Components ---

const AltaStroyLogo = ({ dark = false, className = "w-full h-full" }: { dark?: boolean; className?: string }) => {
  const logoUrl = dark 
    ? "https://lh3.googleusercontent.com/d/1MI3TyZ5H-AYf1wBtzFJ1HXEjDysB6c0L" 
    : "https://lh3.googleusercontent.com/d/1dYJBhp95dqMoOsGmB1B67a1bQbRT_tBM";

  return (
    <img 
      src={logoUrl} 
      alt="Alta Stroy" 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

const Navbar = ({ onNavigateHome, isSubpage, onOpenPriceModal }: { onNavigateHome?: () => void; isSubpage?: boolean; onOpenPriceModal?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (link: typeof NAV_LINKS[0]) => {
    setMobileMenuOpen(false);
    if (link.isPrice) {
      if (onOpenPriceModal) onOpenPriceModal();
      return;
    }
    const href = link.href;
    if (isSubpage && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSubpage || isScrolled ? 'glass-nav bg-white/95 border-b border-zinc-100 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          onClick={onNavigateHome} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-52 h-20">
            <AltaStroyLogo dark={!(isSubpage || isScrolled)} className="w-full h-full object-contain transition-all duration-300" />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={isSubpage || link.isPrice ? undefined : link.href} 
              onClick={() => handleLinkClick(link)}
              className={`text-xs xl:text-sm font-bold uppercase tracking-widest transition-all hover:text-yellow-600 cursor-pointer ${isSubpage || isScrolled ? 'text-zinc-600' : 'text-white/80'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 xl:gap-8">
          <div className="hidden xl:flex flex-col items-end">
            <a href="tel:+77479003331" className={`text-sm font-black hover:text-yellow-600 transition-colors ${isSubpage || isScrolled ? 'text-zinc-900' : 'text-white'}`}>+7 (747) 900-33-31</a>
            <span className={`text-[9px] uppercase font-bold tracking-widest ${isSubpage || isScrolled ? 'text-zinc-400' : 'text-white/40'}`}>Алматы</span>
          </div>
          <button 
            className={`lg:hidden ${isSubpage || isScrolled ? 'text-zinc-900' : 'text-white'} transition-all`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <a 
            href="#contact" 
            onClick={() => handleLinkClick({ name: 'Контакты', href: '#contact' })}
            className="hidden sm:block bg-yellow-500 hover:bg-zinc-900 text-white px-6 xl:px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-yellow-500/20"
          >
            Связаться
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 text-white overflow-hidden border-t border-white/10"
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <a 
                    key={link.name} 
                    href={isSubpage || link.isPrice ? undefined : link.href}
                    className="text-xl font-black uppercase tracking-tight hover:text-yellow-500 border-b border-white/5 pb-2 transition-colors cursor-pointer"
                    onClick={() => handleLinkClick(link)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              <div className="space-y-4 pt-4">
                 <a href="tel:+77479003331" className="flex items-center gap-3 text-yellow-500 font-black text-lg">
                    <Phone size={20} />
                    +7 (747) 900-33-31
                  </a>
                 <div className="flex gap-4">
                    <a href="https://www.instagram.com/altastroy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-yellow-500 hover:text-black transition-colors"><Instagram size={20} /></a>
                    <a href="https://wa.me/77479003331" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-yellow-500 hover:text-black transition-colors"><MessageCircle size={20} /></a>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[750px] flex items-center overflow-hidden bg-zinc-900">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 scale-105">
        <img 
          src="https://lh3.googleusercontent.com/d/1uv5KqG9OOg2HUQzHkveto4TtRsHZ-sQG" 
          alt="Alta Stroy Concrete Production" 
          className="w-full h-full object-cover opacity-60 transition-transform duration-[10s] hover:scale-110"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-16 h-[2px] bg-yellow-500"></span>
            <span className="text-white text-xs font-black uppercase tracking-[0.5em]">Качество Казахстанского Производства</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-white leading-[0.85] uppercase mb-10 tracking-tighter">
            <span className="text-yellow-500 block">Alta</span>
            Stroy
          </h1>
          
          <p className="text-white/70 text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed font-light">
            Лидирующий завод по производству брусчатки и сплитерных блоков в Казахстане. Строим надежное будущее из высокопрочного бетона.
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="#products" className="bg-yellow-500 text-white px-10 py-5 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white hover:text-zinc-900 transition-all flex items-center gap-3 group shadow-2xl shadow-yellow-500/20">
              Посмотреть каталог
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="backdrop-blur-md bg-white/5 border border-white/20 text-white px-10 py-5 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white hover:text-zinc-900 transition-all">
              О компании
            </a>
          </div>
        </motion.div>
      </div>

      {/* Side Numbers */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-20">
         <div className="relative">
            <span className="text-white/5 text-[180px] font-black leading-none absolute -right-4 -top-24">01</span>
            <div className="relative z-10 text-right">
               <span className="block text-4xl font-black text-yellow-500">12+</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Лет на рынке</span>
            </div>
         </div>
         <div className="relative">
            <span className="text-white/5 text-[180px] font-black leading-none absolute -right-4 -top-24">02</span>
            <div className="relative z-10 text-right">
               <span className="block text-4xl font-black text-yellow-500">100%</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Гарантия качества</span>
            </div>
         </div>
      </div>
    </section>
  );
};

const AdvantagesSection = () => {
  return (
    <section id="why-us" className="section-padding bg-zinc-50 text-zinc-900 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-[2px] bg-yellow-500"></span>
              <span className="text-zinc-400 text-xs font-black uppercase tracking-[0.4em]">Преимущества</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-10 leading-none tracking-tighter">
              Технологии <br />
              <span className="text-yellow-500 italic">качества</span>
            </h2>
            <p className="text-zinc-650 text-lg mb-12 max-w-lg leading-relaxed font-light">
              С 2013 года мы совершенствуем процессы производства, чтобы вы получали материалы, которые выдержат любые испытания временем и климатом.
            </p>
            
            <div className="bg-white card-shadow rounded-2xl p-10 relative group border border-zinc-100">
              <Quote className="text-yellow-500/5 absolute right-6 bottom-6 w-32 h-32" />
              <p className="text-zinc-650 italic font-semibold relative z-10 text-lg leading-relaxed mb-6">
                "Надежный фундамент благоустройства города начинается с правильного выбора производителя. Alta Stroy гарантирует безупречную прочность каждого изделия."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">AS</div>
                <div>
                  <h4 className="text-zinc-900 font-bold text-sm">Alta Stroy</h4>
                  <p className="text-zinc-400 text-xs font-semibold">Качество, проверенное временем</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {ADVANTAGES.map((adv, idx) => (
              <motion.div 
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 card-shadow rounded-2xl border border-zinc-100/50 hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="p-4 bg-zinc-50 text-yellow-500 rounded-xl w-fit mb-6">
                  {adv.icon}
                </div>
                <h3 className="text-zinc-900 font-extrabold uppercase text-xs tracking-widest mb-3">{adv.title}</h3>
                <p className="text-zinc-550 text-xs leading-relaxed font-semibold">{adv.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <section id="works" className="section-padding bg-zinc-950 text-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Наши объекты</span>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase leading-[0.8] tracking-tighter">Наши <br /><span className="text-zinc-500 transition-colors hover:text-white">работы</span></h2>
          </div>
          <button 
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-3 text-white hover:text-yellow-500 transition-all font-black uppercase text-[11px] tracking-widest bg-zinc-900 px-6 py-3 rounded-full border border-zinc-800"
          >
            {showAll ? 'Свернуть список' : 'Показать все работы'}
            <ChevronRight className={`w-4 h-4 transition-transform duration-500 ${showAll ? '-rotate-90' : 'rotate-90 group-hover:translate-x-1'}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative group aspect-[10/12] overflow-hidden bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-yellow-500/30 transition-all duration-500"
              >
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="bg-yellow-500 text-zinc-950 font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest mb-3.5 inline-block">
                    {project.area}
                  </span>
                  <h3 className="text-white font-black text-lg uppercase leading-tight mb-2 tracking-tight line-clamp-2">{project.title}</h3>
                  <p className="text-white/60 text-[10px] font-bold tracking-normal line-clamp-2 mt-2 group-hover:text-yellow-400 transition-colors">
                    {project.description}
                  </p>
                  <div className="h-[2px] w-6 bg-yellow-500 group-hover:w-full transition-all duration-500 mt-4"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ 
  defaultMessage,
  inquiryCart = [],
  setInquiryCart
}: { 
  defaultMessage?: string;
  inquiryCart?: InquiryItem[];
  setInquiryCart?: React.Dispatch<React.SetStateAction<InquiryItem[]>>;
}) => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    if (inquiryCart && inquiryCart.length > 0) {
      let text = "Здравствуйте! Хочу рассчитать стоимость и заказать следующие позиции:\n";
      inquiryCart.forEach((item, idx) => {
        const totalCost = item.qty * item.pricePerUnit;
        text += `${idx + 1}. ${item.title} (Цвет: ${item.color}) — ${item.qty} ${item.unit} (~${totalCost.toLocaleString()} ₸)\n`;
      });
      text += `\nПожалуйста, свяжитесь со мной для уточнения деталей.`;
      setMessage(text);
    } else {
      setMessage(defaultMessage || '');
    }
  }, [inquiryCart, defaultMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (!setInquiryCart) return;
    if (newQty <= 0) return;
    setInquiryCart(prev => prev.map(item => item.id === itemId ? { ...item, qty: newQty } : item));
  };

  const handleRemoveItem = (itemId: string) => {
    if (!setInquiryCart) return;
    setInquiryCart(prev => prev.filter(item => item.id !== itemId));
  };

  const totalSum = inquiryCart.reduce((sum, item) => sum + item.qty * item.pricePerUnit, 0);

  const getWhatsAppLink = () => {
    let text = `Добрый день! Меня зовут ${userName || 'Александр'}. Хочу получить смету и обсудить заказ:\n\n`;
    if (inquiryCart && inquiryCart.length > 0) {
      inquiryCart.forEach((item, idx) => {
        const tCost = item.qty * item.pricePerUnit;
        text += `• ${item.title} (Цвет: ${item.color}) — ${item.qty} ${item.unit} (~${tCost.toLocaleString()} ₸)\n`;
      });
      text += `\n*Итого приблизительно:* ~${totalSum.toLocaleString()} ₸\n`;
    } else {
      text += `${message || 'Интересует консультация по брусчатке/блокам.'}\n`;
    }
    text += `\nМой телефон: ${userPhone || ''}`;
    return `https://wa.me/77479003331?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="section-padding bg-zinc-50 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="relative">
            <div className="bg-white p-6 md:p-12 card-shadow rounded-3xl relative z-10 transition-all hover:translate-y-[-4px]">
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase mb-8 leading-none tracking-tighter">
                Сделайте первый <br />
                <span className="text-yellow-600 italic">шаг</span>
              </h2>
              <p className="text-zinc-500 mb-10 text-lg font-light leading-relaxed">
                Наши эксперты помогут с выбором материала и расчетом объема. Оставьте заявку прямо сейчас.
              </p>

              {/* ESTIMATE CART LISTING */}
              {inquiryCart && inquiryCart.length > 0 && (
                <div className="mb-8 border border-zinc-200 rounded-2xl p-5 bg-zinc-50/50 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60 font-medium">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                      Смета для заказа ({inquiryCart.length})
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setInquiryCart && setInquiryCart([])}
                      className="text-[9px] font-black uppercase text-yellow-600 hover:text-zinc-900 transition-colors"
                    >
                      Очистить
                    </button>
                  </div>

                  <div className="divide-y divide-zinc-150 max-h-[220px] overflow-y-auto pr-1">
                    {inquiryCart.map(item => {
                      const itemTotal = item.qty * item.pricePerUnit;
                      return (
                        <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-10 h-10 object-cover rounded-md border border-zinc-200 shrink-0" 
                                referrerPolicy="no-referrer"
                              />
                            )}
                            <div>
                              <h4 className="text-[11px] font-extrabold uppercase text-zinc-900 tracking-tight leading-tight line-clamp-1">
                                {item.title}
                              </h4>
                              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                {item.color} • {item.pricePerUnit} ₸/{item.unit}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-zinc-200 rounded-lg bg-white overflow-hidden shrink-0">
                              <button 
                                type="button"
                                onClick={() => handleUpdateQty(item.id, item.qty - (item.unit === 'м²' ? 10 : 1))}
                                className="px-1.5 py-0.5 text-[10px] font-black text-zinc-500 hover:bg-zinc-100"
                              >
                                -
                              </button>
                              <span className="px-2 text-[10px] font-black text-zinc-800 min-w-8 text-center bg-zinc-50/30">
                                {item.qty}
                              </span>
                              <button 
                                type="button"
                                onClick={() => handleUpdateQty(item.id, item.qty + (item.unit === 'м²' ? 10 : 1))}
                                className="px-1.5 py-0.5 text-[10px] font-black text-zinc-500 hover:bg-zinc-100"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-right min-w-[70px] shrink-0">
                              <div className="text-[11px] font-black text-zinc-950">
                                {itemTotal.toLocaleString()} ₸
                              </div>
                            </div>

                            <button 
                              type="button" 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-zinc-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-zinc-200 flex justify-between items-center text-sm">
                    <span className="font-bold text-zinc-500 uppercase text-[10px] tracking-wider">Итого сметы:</span>
                    <span className="font-black text-zinc-950 text-base">~ {totalSum.toLocaleString()} ₸</span>
                  </div>
                </div>
              )}

              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-955 text-white p-8 text-center rounded-2xl border border-zinc-800"
                >
                  <CheckCircle2 className="text-yellow-500 w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-white font-black uppercase text-lg mb-2 tracking-widest">Заявка принята!</h3>
                  <p className="text-zinc-400 text-xs mb-6 font-medium leading-relaxed">
                    Данные зафиксированы. Наш менеджер уже производит точный расчет по Вашему составу.
                  </p>
                  
                  <div className="space-y-3">
                    <a 
                      href={getWhatsAppLink()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-wider hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/10"
                    >
                      <MessageCircle size={15} />
                      Подтвердить в WhatsApp
                    </a>
                    
                    <button 
                      type="button"
                      onClick={() => setFormState('idle')}
                      className="w-full bg-zinc-800 text-zinc-400 py-3 rounded-xl font-bold uppercase text-[9px] tracking-widest hover:bg-zinc-700 transition-all border border-zinc-700/50"
                    >
                      Назад
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.2em] pl-1">Ваше имя</label>
                       <input 
                        required
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Александр" 
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-5 focus:border-yellow-500 outline-none transition-colors placeholder:text-zinc-300 font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.2em] pl-1">Телефон</label>
                       <input 
                        required
                        type="tel" 
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__" 
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-5 focus:border-yellow-500 outline-none transition-colors placeholder:text-zinc-300 font-bold"
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                       <label className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.2em] pl-1">Ваш запрос</label>
                       <textarea 
                        required
                        placeholder="Например: расчет стоимости брусчатки..." 
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-5 focus:border-yellow-500 outline-none transition-colors placeholder:text-zinc-300 font-bold resize-none"
                       ></textarea>
                  </div>
                  <button 
                    disabled={formState === 'loading'}
                    className="w-full bg-yellow-500 hover:bg-zinc-900 text-white py-6 rounded-sm font-black uppercase text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 shadow-xl shadow-yellow-500/20"
                  >
                    {formState === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                    ) : (
                      <>
                        Отправить данные
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-zinc-300 text-center uppercase tracking-widest font-black italic">Конфиденциальность гарантирована</p>
                </form>
              )}
            </div>
            
            {/* Design accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t border-r border-yellow-500/20 hidden lg:block"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b border-l border-yellow-500/20 hidden lg:block"></div>
          </div>

          <div className="space-y-12">
            <div>
               <span className="text-yellow-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Как нас найти</span>
               <h2 className="text-4xl font-black text-black uppercase mb-12">Центральный офис <br />и склады</h2>
               
               <div className="space-y-8">
                 <div className="flex gap-6 items-start">
                   <div className="p-4 bg-zinc-100 text-yellow-500 rounded-sm">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <h4 className="text-black font-bold uppercase text-sm mb-1 tracking-wider">Адрес №1</h4>
                     <p className="text-zinc-500">г. Алматы, Бурундайская 47/5</p>
                     <p className="text-zinc-400 text-xs mt-1">Основной склад и производство</p>
                   </div>
                 </div>

                 <div className="flex gap-6 items-start">
                   <div className="p-4 bg-zinc-100 text-yellow-500 rounded-sm">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <h4 className="text-black font-bold uppercase text-sm mb-1 tracking-wider">Адрес №2</h4>
                     <p className="text-zinc-500">Улица Райымбек батыра, 14</p>
                     <p className="text-zinc-400 text-xs mt-1">Офис продаж Alta Stroy</p>
                   </div>
                 </div>

                 <div className="flex gap-6 items-start">
                   <div className="p-4 bg-zinc-100 text-yellow-500 rounded-sm">
                     <Clock size={24} />
                   </div>
                   <div>
                     <h4 className="text-black font-bold uppercase text-sm mb-1 tracking-wider">График работы</h4>
                     <p className="text-zinc-500">Пн-Сб: 09:00 — 18:00</p>
                     <p className="text-zinc-500">Вс: Выходной</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="h-[400px] w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all border border-zinc-200 overflow-hidden relative">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46471.700812497!2d76.898128!3d43.277165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE2JzM3LjgiTiA3NsKwNTMnNTMuMyJF!5e0!3m2!1sru!2skz!4v1713693200000!5m2!1sru!2skz"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
               <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 text-white">
                  <a 
                    href="https://www.google.com/maps/dir//43.34975,76.909842" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-yellow-500 transition-colors shadow-2xl"
                  >
                    К адресу 1
                  </a>
                  <a 
                    href="https://2gis.kz/almaty/geo/70000001101885981" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-yellow-500 transition-colors shadow-2xl"
                  >
                    К адресу 2 (2GIS)
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductGalleryModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-start md:items-center justify-center p-0 md:p-8 bg-zinc-950/95 backdrop-blur-sm overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full z-[70] md:top-6 md:right-6"
      >
        <X size={24} className="md:w-8 md:h-8" />
      </button>

      <div className="container max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center px-4 py-16 md:py-8">
        {/* Gallery */}
        <div className="space-y-4 md:space-y-6 w-full">
          <motion.div 
            key={activeImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/3] w-full rounded-sm overflow-hidden bg-zinc-900 border border-white/5"
          >
            <img 
              src={product.images[activeImage]} 
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {product.images.length > 1 && (
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 md:w-24 aspect-square rounded-xs overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-yellow-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="text-white space-y-6 md:space-y-8">
          <div>
            <span className="text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-2 md:mb-4 block">{product.category}</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-6">{product.title}</h2>
            <p className="text-zinc-400 text-sm md:text-xl font-light leading-relaxed">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {product.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-sm text-[9px] md:text-xs font-black uppercase tracking-widest text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-4 md:gap-5">
            <a 
              href="#contact" 
              onClick={onClose}
              className="flex-grow py-4 md:py-5 bg-yellow-500 text-zinc-900 text-center text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-yellow-500/10"
            >
              Заказать расчет
            </a>
            <a 
              href="https://wa.me/77479003331" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-grow py-4 md:py-5 bg-white/5 border border-white/10 text-white text-center text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const COLLECTIONS: {
  id: string;
  title: string;
  subtitle: string;
  categoryName: string;
  thickness: string;
  colors: string;
  shapes: string;
  image: string;
}[] = [
  {
    id: 'paving',
    title: 'Брусчатка',
    subtitle: 'Премиальная коллекция для знаковых объектов',
    categoryName: 'Брусчатка',
    thickness: '60-80 мм',
    colors: '12 цветов',
    shapes: '6 форм',
    image: 'https://lh3.googleusercontent.com/d/1gvaB0YB5M6AcPFU4s8KZvFnNqkeQsmxC'
  },
  {
    id: 'splitters',
    title: 'Сплитерные блоки',
    subtitle: 'Усиленная прочность для высокой надежности и стен',
    categoryName: 'Сплитерные блоки',
    thickness: '190 мм',
    colors: '10 цветов',
    shapes: '1 форма',
    image: 'https://lh3.googleusercontent.com/d/1Av3X5YC7BvdxSNxmjMA_PZZ0pxjFWqad'
  },
  {
    id: 'borders',
    title: 'Бордюры и поребрики',
    subtitle: 'Надежное и долговечное дорожное обрамление',
    categoryName: 'Бордюры',
    thickness: '80-150 мм',
    colors: '8 цветов',
    shapes: '2 формы',
    image: 'https://lh3.googleusercontent.com/d/1kXXloTj-Gwlhv0H7axl23ibWddY_-pVA'
  }
];

const ALTA_STROY_COLORS = [
  { name: 'Хан-Тенгри 101', hex: '#8FA095', texture: 'https://lh3.googleusercontent.com/d/1Xcdhne1rbXFrtipoemjSYpOJc2w63OaR' },
  { name: 'Шымбулак 102', hex: '#BA9EA1', texture: 'https://lh3.googleusercontent.com/d/1unNGBprZbwGTwmjUDmlKftBt7qebpeO9' },
  { name: 'Шарын 103', hex: '#7E4F53', texture: 'https://lh3.googleusercontent.com/d/1jMcHq_MB6icNmQZlWKeZ1CnsYCq7I2dT' },
  { name: 'Каратау 104', hex: '#2A2B2D', texture: 'https://lh3.googleusercontent.com/d/1jxqTHDsy7RLHlD0nyD98913uK-La41v9' },
  { name: 'Хантау 105', hex: '#DDD6C4', texture: 'https://lh3.googleusercontent.com/d/1_Ijd8Ga_zDCDyM4OH88unh6yB4ed1k7-' },
  { name: 'Мон-Блан 111', hex: '#A3B5C0', texture: 'https://lh3.googleusercontent.com/d/1L4jYhfT5rbs5AjRjcORz49x3U6oCFQGX' },
  { name: 'Нордэнд 112', hex: '#CBD1D4', texture: 'https://lh3.googleusercontent.com/d/1A-I23Tzd5DmvfwufAhA-iGX_zkWdBiRG' },
  { name: 'Дан-Бланш 113', hex: '#778287', texture: 'https://lh3.googleusercontent.com/d/1YPieTVTmpU-qx3kHxTRKWXIKkImD_Jgs' },
  { name: 'Дюфур 114', hex: '#949B9F', texture: 'https://lh3.googleusercontent.com/d/1uGSZ_aC4wqlxW-t_6TyC-FKFjeD9V-T0' },
  { name: 'Дюнан 115', hex: '#BAA998', texture: 'https://lh3.googleusercontent.com/d/1KO06pYU01Dp_pvaoyI7DVBZUqkm0OK21' },
  { name: 'Монте-Роза 116', hex: '#9E8884', texture: 'https://lh3.googleusercontent.com/d/1byikNbNaAMZ2pE0w2TR3931BxAiqDJ-1' },
];

export const getProductColors = (productTitle: string) => {
  let hash = 0;
  for (let i = 0; i < productTitle.length; i++) {
    hash = productTitle.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorsCount = 3 + (Math.abs(hash) % 3); // 3 to 5 colors
  const result: string[] = [];
  for (let i = 0; i < colorsCount; i++) {
    const idx = (Math.abs(hash) + i * 2) % ALTA_STROY_COLORS.length;
    const colorName = ALTA_STROY_COLORS[idx].name;
    if (!result.includes(colorName)) {
      result.push(colorName);
    }
  }
  return result;
};

export const getProductSize = (productTitle: string): string => {
  if (productTitle.includes('Старая Азия')) return '200×200×60, 200×100×60';
  if (productTitle.includes('Кирпичик')) return '200×100×60, 200×100×80';
  if (productTitle.includes('Квадро')) return '140×140×60, 200×200×60';
  if (productTitle.includes('Старый Город')) return '180×120×60, 120×120×60, 90×120×60';
  if (productTitle.includes('Ландхаус')) return '240×160×60, 160×160×60, 80×160×65';
  if (productTitle.includes('Амстердам')) return '300×300×60';
  if (productTitle.includes('Волна')) return '220×110×60';
  if (productTitle.includes('Ромбик')) return '270×160×60';
  if (productTitle.includes('Ромб')) return '270×160×60';
  if (productTitle.includes('Квадрат')) return '200×200×60, 100×100×60';
  if (productTitle.includes('Мегаполис')) return '80×160×60, 160×160×60, 240×160×60';
  if (productTitle.includes('Паркет')) return '300×100×60';
  if (productTitle.includes('Соты')) return '200×200×60';
  if (productTitle.includes('Сетка')) return '300×300×30';
  if (productTitle.toLowerCase().includes('сплитерный блок')) return '390×190×190';
  if (productTitle.includes('Гладкий')) return '390×190×190';
  if (productTitle.includes('Рваный')) return '390×190×190';
  if (productTitle.includes('колонный')) return '390×390×190';
  if (productTitle.includes('угловой')) return '390×190×190';
  if (productTitle.includes('Перегородочный')) return '390×90×190';
  if (productTitle.includes('Колотый')) return '390×190×190';
  if (productTitle.includes('Мозаика')) return '390×190×190';
  if (productTitle.includes('Премиум')) return '390×190×190';
  if (productTitle.includes('Микс')) return '200×100×60';
  if (productTitle.includes('Мраморная')) return '200×100×60';
  if (productTitle.includes('Спектр')) return '300×300×60';
  if (productTitle.includes('Гармония')) return '200×100×60';
  if (productTitle.includes('Дорожный')) return '1000×300×150';
  if (productTitle.includes('Поребрик')) return '1000×200×80';
  if (productTitle.includes('Навершия')) return '400×400 / 450×450';
  return '300×200';
};

const ProductList = ({
  selectedCollection,
  setSelectedCollection,
  products,
  isAdmin,
  handleOpenEditModal,
  handleDeleteProduct,
  moveProductOrder
}: {
  selectedCollection: typeof COLLECTIONS[0] | null;
  setSelectedCollection: (col: typeof COLLECTIONS[0] | null) => void;
  products: Product[];
  isAdmin: boolean;
  handleOpenEditModal: (prod: Product | null) => void;
  handleDeleteProduct: (productTitle: string) => void;
  moveProductOrder: (productTitle: string, direction: 'prev' | 'next') => void;
}) => {
  // Filters within active collection
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModelFilter, setActiveModelFilter] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active items calculation based on category, search filter, model filter
  const currentCollectionProducts = selectedCollection
    ? products.filter(p => p.category === selectedCollection.categoryName)
    : [];

  const filteredProducts = currentCollectionProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected model title if any
    const matchesModel = !activeModelFilter || p.title === activeModelFilter;
    
    return matchesSearch && matchesModel;
  });

  return (
    <div className="space-y-12">

      <AnimatePresence mode="wait">
        {!selectedCollection ? (
          // --- COLLECTIONS LIST GRID VIEW ---
          <motion.div
            key="collections-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {COLLECTIONS.map(col => {
              // Count positions in this collection
              const count = products.filter(p => p.category === col.categoryName).length;
              return (
                <div 
                  key={col.id}
                  className="group bg-white border border-zinc-200/80 hover:border-yellow-500 rounded-[32px] p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="space-y-6">
                    {/* Cover Image */}
                    <div className="aspect-[1.35] overflow-hidden rounded-[22px] relative bg-zinc-50 border border-zinc-100">
                      <img 
                        src={col.image} 
                        alt={col.title} 
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-[1.03] transition-all duration-700 ease-out"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/10 opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Products Count Badge */}
                      <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-md text-white text-[9px] font-black px-3.5 py-2 rounded-xl uppercase tracking-wider border border-white/10 flex items-center gap-1.5 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                        {count} позиций
                      </div>
                    </div>

                    {/* Metadata Header */}
                    <div className="space-y-2">
                      <h3 className="text-zinc-950 font-black text-xl xl:text-2xl uppercase tracking-tight leading-tight group-hover:text-yellow-600 transition-colors duration-300">
                        {col.title}
                      </h3>
                      <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
                        {col.subtitle}
                      </p>
                    </div>

                    {/* Dimension Specifications badge list */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-zinc-100 uppercase">
                      <div className="text-center">
                        <span className="block text-[9px] font-black text-zinc-400 tracking-widest mb-1.5 uppercase">ТОЛЩИНА</span>
                        <span className="text-xs font-black text-zinc-900 tracking-tight block leading-none">{col.thickness.toUpperCase()}</span>
                      </div>
                      <div className="text-center border-l border-zinc-150">
                        <span className="block text-[9px] font-black text-zinc-400 tracking-widest mb-1.5 uppercase">ЦВЕТА</span>
                        <span className="text-xs font-black text-zinc-900 tracking-tight block leading-none">{col.colors.toUpperCase()}</span>
                      </div>
                      <div className="text-center border-l border-zinc-150">
                        <span className="block text-[9px] font-black text-zinc-400 tracking-widest mb-1.5 uppercase">ФОРМЫ</span>
                        <span className="text-xs font-black text-zinc-900 tracking-tight block leading-none">{col.shapes.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Button Action */}
                  <div className="mt-6 space-y-2.5">
                    <button
                      onClick={() => {
                        setSelectedCollection(col);
                        setSearchQuery('');
                        setActiveModelFilter(null);
                      }}
                      className="w-full py-4.5 bg-zinc-950 hover:bg-yellow-500 hover:text-zinc-950 text-white font-black text-[10px] uppercase tracking-widest rounded-[16px] flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-zinc-950/10 hover:shadow-yellow-500/20 active:scale-[0.98] cursor-pointer"
                    >
                      СМОТРЕТЬ КОЛЛЕКЦИЮ
                      <ArrowUpRight size={14} className="shrink-0 transition-transform duration-305 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadPriceList(col.id);
                        }}
                        className="py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black text-[9px] uppercase tracking-wider rounded-[14px] flex items-center justify-center gap-1 transition-all duration-300 active:scale-[0.98] cursor-pointer border border-zinc-200/50"
                      >
                        <ArrowDown size={12} className="text-zinc-500 shrink-0" />
                        EXCEL (.XLS)
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadPriceListPDF(col.id);
                        }}
                        className="py-3 bg-yellow-550/10 hover:bg-yellow-500/20 text-yellow-700 hover:text-yellow-805 font-black text-[9px] uppercase tracking-wider rounded-[14px] flex items-center justify-center gap-1 transition-all duration-300 active:scale-[0.98] cursor-pointer border border-yellow-500/20"
                      >
                        <ArrowDown size={12} className="text-yellow-600 shrink-0" />
                        PDF ПРАЙС
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          // --- DETAILED PRODUCTS VIEW (selectedCollection is active) ---
          <motion.div 
            key="positions-viewport"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Nav back & summary meta header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-200 pb-8">
              <button 
                onClick={() => setSelectedCollection(null)}
                className="group flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-900 transition-colors uppercase tracking-wider"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Назад к коллекциям
              </button>

              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-zinc-100 py-1.5 px-3 rounded-lg text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                  Толщина: {selectedCollection.thickness}
                </div>
                <div className="bg-zinc-100 py-1.5 px-3 rounded-lg text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                  Палитра: {selectedCollection.colors}
                </div>
                <div className="bg-zinc-100 py-1.5 px-3 rounded-lg text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                  Формы: {selectedCollection.shapes}
                </div>
              </div>
            </div>

            {/* Collection main heading with action details */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="text-yellow-600 text-xs font-black uppercase tracking-[0.4em] mb-2 block">Коллекция изделий</span>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight leading-none">
                  {selectedCollection.title}
                </h2>
              </div>
            </div>

            {/* In-view Search bar & Add items interface */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-zinc-100/50 p-4 rounded-2xl border border-zinc-200/50">
               <div className="relative w-full sm:max-w-md">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Поиск по этой коллекции..."
                   className="w-full bg-white border border-zinc-200 pl-10 pr-4 py-3 rounded-xl text-xs font-black text-zinc-800 placeholder-zinc-400 outline-none focus:border-yellow-500 transition-colors"
                 />
                 <span className="absolute left-4 top-3.5 text-zinc-400">
                   <Search size={14} className="text-zinc-500" />
                 </span>
               </div>

               {isAdmin && (
                 <button 
                   onClick={() => handleOpenEditModal(null)}
                   className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                 >
                   <Plus size={16} />
                   Добавить новый товар
                 </button>
               )}
            </div>

            {/* Side-by-side responsive layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
              
              {/* Left Sidebar: Model Filters Swatches */}
              <div className="w-full lg:w-[280px] shrink-0">
                <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-wider">Фильтры</h3>
                    {activeModelFilter && (
                      <button 
                        onClick={() => setActiveModelFilter(null)}
                        className="text-[10px] font-black text-yellow-600 hover:text-zinc-900 uppercase tracking-wider transition-colors"
                      >
                        Сбросить
                      </button>
                    )}
                  </div>
                  
                  <div className="border-t border-zinc-100" />
                  
                  <div className="space-y-3">
                    <span className="text-zinc-500 text-[10px] uppercase font-black block tracking-widest pl-1">Модель</span>
                    
                    <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                      {currentCollectionProducts.map(product => {
                        const isSelected = activeModelFilter === product.title;
                        
                        // Extract name inside quotes or simplified title, e.g. "Старая Азия" from "Брусчатка «Старая Азия»"
                        let displayName = product.title;
                        const match = product.title.match(/«([^»]+)»/);
                        if (match) {
                          displayName = match[1];
                        }
                        
                        const coverImg = product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600';

                        return (
                          <button 
                            key={product.title}
                            onClick={() => setActiveModelFilter(isSelected ? null : product.title)}
                            type="button"
                            className="group flex flex-col items-center text-center space-y-1 cursor-pointer focus:outline-none"
                          >
                            <div className={`w-14 h-14 rounded-xl relative overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-yellow-500 scale-105 ring-2 ring-yellow-500/20 shadow-md' : 'border-zinc-200 group-hover:border-zinc-400'}`}>
                              <img src={coverImg} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-black/5" />
                            </div>
                            <span className={`text-[8px] font-black tracking-tight leading-[11px] line-clamp-2 max-w-[64px] uppercase transition-colors ${isSelected ? 'text-yellow-600' : 'text-zinc-500 group-hover:text-zinc-900'}`}>
                              {displayName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Positions and Product Cards */}
              <div className="flex-grow w-full space-y-6">
                
                {/* Header Line */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-100">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    {filteredProducts.length} позиция(и)
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-500">
                    <span className="uppercase tracking-wider text-[9px] font-black text-zinc-400">Другие разделы:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {COLLECTIONS.filter(col => col.id !== selectedCollection.id).map(col => (
                        <button 
                          key={col.id} 
                          onClick={() => {
                            setSelectedCollection(col);
                            setSearchQuery('');
                            setActiveModelFilter(null);
                          }}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-950 transition-colors rounded-lg text-[9px] font-bold"
                        >
                          {col.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cards List Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 border border-zinc-200 text-center space-y-4">
                    <p className="text-zinc-400 font-extrabold uppercase text-xs tracking-widest">Нет товаров под данный фильтр</p>
                    <p className="text-zinc-500 text-xs">Пожалуйста, выберите другие модели на панели фильтров или измените поисковый запрос.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, idx) => {
                      const productSize = getProductSize(product.title);
                      return (
                        <motion.div 
                          key={product.title} 
                          layout
                          className="group bg-white border border-zinc-200 rounded-3xl p-4 relative overflow-hidden flex flex-col h-full shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          {/* Admin controls */}
                          {isAdmin && (
                            <div className="absolute top-2 left-2 right-2 z-30 flex justify-between gap-1 p-1 bg-zinc-900/95 backdrop-blur-md border border-white/5 rounded-xl">
                              <div className="flex gap-1 animate-pulse-subtle">
                                <button 
                                  onClick={() => moveProductOrder(product.title, 'prev')}
                                  disabled={idx === 0}
                                  title="Переместить левее"
                                  className="p-1 px-2 bg-white/10 hover:bg-yellow-500 hover:text-black text-white text-[10px] font-black rounded-lg disabled:opacity-20 transition-all uppercase flex items-center gap-0.5"
                                >
                                  <ArrowUp size={11} className="-rotate-90" />
                                </button>
                                <button 
                                  onClick={() => moveProductOrder(product.title, 'next')}
                                  disabled={idx === filteredProducts.length - 1}
                                  title="Переместить правее"
                                  className="p-1 px-2 bg-white/10 hover:bg-yellow-500 hover:text-black text-white text-[10px] font-black rounded-lg disabled:opacity-20 transition-all uppercase flex items-center gap-0.5"
                                >
                                  <ArrowDown size={11} className="-rotate-90" />
                                </button>
                              </div>
                              
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => handleOpenEditModal(product)}
                                  className="p-1 px-2 bg-yellow-500 text-black text-[10px] font-black rounded-lg flex items-center gap-1 hover:bg-white transition-all"
                                >
                                  <Edit3 size={10} /> РЕД.
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(product.title)}
                                  className="p-1 px-2 bg-red-650 text-white text-[10px] font-black rounded-lg flex items-center gap-1 hover:bg-red-700 transition-all"
                                >
                                  <Trash2 size={10} /> УДАЛ.
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Image box */}
                          <div className="aspect-[4/3] mb-4 overflow-hidden relative rounded-2xl bg-zinc-50 border border-zinc-100">
                            <img 
                              src={product.images[0]} 
                              alt={product.title} 
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 cursor-pointer"
                              onClick={() => setSelectedProduct(product)}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                            {product.images.length > 1 && (
                              <div className="absolute bottom-2.5 right-2.5 bg-zinc-950/80 backdrop-blur-md text-white text-[8px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-widest flex items-center gap-1 border border-white/5">
                                <Plus size={10} className="text-yellow-500" />
                                {product.images.length} фото
                              </div>
                            )}
                          </div>

                          {/* Card Content body */}
                          <div className="flex-grow flex flex-col justify-between mb-4">
                            <div>
                              <span className="text-yellow-600 text-[8px] font-black uppercase tracking-[0.25em] mb-1 block">
                                {product.category}
                              </span>
                              <h3 className="text-zinc-900 font-extrabold text-[15px] mb-1.5 group-hover:text-yellow-650 transition-colors uppercase tracking-tight leading-tight cursor-pointer" onClick={() => setSelectedProduct(product)}>
                                {product.title}
                              </h3>
                              <p className="text-zinc-500 text-[11px] leading-relaxed mb-4 line-clamp-2 font-medium">
                                {product.description}
                              </p>
                            </div>

                            {/* Spec line details */}
                            <div className="space-y-1.5 py-2.5 border-t border-zinc-100">
                              <div className="flex items-center gap-2 text-zinc-600 text-[11px]">
                                <Ruler size={12} className="text-zinc-400" />
                                <span className="font-bold">Размеры: {productSize} мм</span>
                              </div>
                              <div className="flex items-center gap-2 text-zinc-600 text-[11px]">
                                <Palette size={12} className="text-zinc-400" />
                                <span className="font-bold">Всего цветов: {getProductColors(product.title).length} вариантов</span>
                              </div>
                            </div>
                          </div>

                          {/* premium button (white/yellow/black theme, rounded as in screen 1) */}
                          <button 
                            onClick={() => setSelectedProduct(product)}
                            className="w-full py-4 bg-zinc-950 hover:bg-yellow-500 hover:text-zinc-950 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-zinc-950/10 hover:shadow-yellow-500/10"
                          >
                            Узнать подробнее
                            <ArrowUpRight size={13} className="shrink-0" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>





      {/* Product Highres detail gallery */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductGalleryModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-56 h-28">
                  <AltaStroyLogo dark={true} className="w-full h-full object-contain" />
                </div>
             </div>
             <p className="text-zinc-400 text-sm leading-relaxed font-medium">
               Мы проектируем и производим бетонные изделия высокой прочности для частного и коммерческого строительства.
             </p>
             <div className="flex gap-4">
                <a href="https://www.instagram.com/altastroy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm hover:bg-yellow-500 text-white transition-all"><Instagram size={18} /></a>
                <a href="https://wa.me/77479003331" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm hover:bg-yellow-500 text-white transition-all"><MessageCircle size={18} /></a>
             </div>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-zinc-500 mb-8">Меню</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.name}><a href={link.href} className="text-zinc-400 hover:text-yellow-500 text-sm font-bold transition-colors uppercase tracking-widest">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-zinc-500 mb-8">Разделы</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-400 hover:text-yellow-500 text-sm font-bold transition-colors uppercase tracking-widest">Каталог цен</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-yellow-500 text-sm font-bold transition-colors uppercase tracking-widest">Сертификаты</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-yellow-500 text-sm font-bold transition-colors uppercase tracking-widest">Сотрудничество</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-yellow-500 text-sm font-bold transition-colors uppercase tracking-widest">Доставка</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-zinc-500 mb-8">На связи</h4>
             <ul className="space-y-8">
                <li className="flex gap-4">
                   <Phone className="text-yellow-500 shrink-0" size={20} />
                   <div className="flex flex-col">
                      <a href="tel:+77479003331" className="text-white font-black text-sm hover:text-yellow-600 transition-colors">+7 (747) 900-33-31</a>
                      <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Отдел продаж</span>
                   </div>
                </li>
                <li className="flex gap-4">
                   <MapPin className="text-yellow-500 shrink-0" size={20} />
                   <p className="text-zinc-400 text-sm font-medium">Алматы, Бурундайская 47/5 <br /><span className="text-zinc-500">Пн—Сб / 09:00—18:00</span></p>
                </li>
             </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <p className="text-zinc-500 text-[9px] uppercase font-black tracking-widest italic">© Alta Stroy 2013.</p>
              <p className="text-zinc-600 text-[8px] uppercase font-bold tracking-[0.3em] mt-1">
                Разработка: <a href="https://wa.me/77070700753" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-yellow-500 transition-colors">Alikhan Turdiev | development.kz</a>
              </p>
           </div>
           <div className="flex gap-10">
              <span 
                onClick={() => {
                  window.history.pushState({}, '', '/admin');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }} 
                className="text-zinc-500 hover:text-zinc-400 text-[9px] uppercase font-black tracking-widest transition-colors cursor-pointer"
              >
                Портал
              </span>
              <a href="#" className="text-zinc-500 hover:text-zinc-400 text-[9px] uppercase font-black tracking-widest transition-colors">Политика</a>
              <a href="#" className="text-zinc-500 hover:text-zinc-400 text-[9px] uppercase font-black tracking-widest transition-colors">Условия</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export const downloadPriceList = (type: string) => {
  let filename = '';
  let headers: string[] = [];
  let rows: string[][] = [];

  if (type === 'paving' || type === 'pavings' || type === 'Брусчатка') {
    filename = 'AltaStroy_Price_Paving.csv';
    headers = ['Раздел', 'Наименование', 'Размер (мм)', 'Тип / Цемент', 'Цена (Тенге)'];
    rows = [
      ['Брусчатка Серая', 'Кирпичик', '200*100*60', 'Серый цемент', '3000 ₸/м2'],
      ['Брусчатка Серая', 'Квадро', '200*200*60 / 100*100*60', 'Серый цемент', '3500 ₸/м2'],
      ['Брусчатка Серая', 'Ландхаус', '80*160*60 / 160*160*60 / 240*160*60', 'Серый цемент', '3600 ₸/м2'],
      ['Брусчатка Серая', 'Ромбик 3D', '270*160*60', 'Серый цемент', '3400 ₸/м2'],
      ['Брусчатка Серая', 'Старая Азия', '200*200*60 / 200*100*60 / 100*100*60', 'Серый цемент', '3400 ₸/м2'],
      ['Брусчатка Серая', 'Старый Город', '180*120*60 / 120*120*60 / 90*120*60 / 60*120*60', 'Серый цемент', '3500 ₸/м2'],
      ['Брусчатка Серая', 'Аллея', '195*195*60 / 80*80*60', 'Серый цемент', '3500 ₸/м2'],
      ['Брусчатка Цветная', 'Кирпичик', '200*100*60', 'СЦ (Серый цемент)', '3300 ₸/м2'],
      ['Брусчатка Цветная', 'Кирпичик', '200*100*60', 'БЦ (Белый цемент)', '3900 ₸/м2'],
      ['Брусчатка Цветная', 'Кирпичик', '200*100*60', 'БиЗ (Белый и Зеленый)', '4500 ₸/м2'],
      ['Брусчатка Цветная', 'Квадро', '200*200*60 / 100*100*60', 'СЦ (Серый цемент)', '4000 ₸/м2'],
      ['Брусчатка Цветная', 'Ландхаус', '80*160*60 / 160*160*60 / 240*160*60', 'СЦ (Серый цемент)', '4100 ₸/м2'],
      ['Брусчатка Цветная', 'Ландхаус', '80*160*60 / 160*160*60 / 240*160*60', 'БЦ (Белый цемент)', '4600 ₸/м2'],
      ['Брусчатка Цветная', 'Ландхаус', '80*160*60 / 160*160*60 / 240*160*60', 'СМ (Color Mix)', '5000 ₸/м2'],
      ['Брусчатка Цветная', 'Ромбик 3D', '270*160*60', 'СЦ (Серый цемент)', '3600 ₸/м2'],
      ['Брусчатка Цветная', 'Ромбик 3D', '270*160*60', 'БЦ (Белый цемент)', '4000 ₸/м2'],
      ['Брусчатка Цветная', 'Старая Азия', '200*200*60 / 200*100*60 / 100*100*60', 'СЦ (Серый цемент)', '3600 ₸/м2'],
      ['Брусчатка Цветная', 'Старая Азия', '200*200*60 / 200*100*60 / 100*100*60', 'БЦ (Белый цемент)', '4000 ₸/м2'],
      ['Брусчатка Цветная', 'Старый Город', '180*120*60 / 120*120*60 / 90*120*60 / 60*120*60', 'СЦ (Серый цемент)', '4000 ₸/м2'],
      ['Брусчатка Цветная', 'Старый Город', '180*120*60 / 120*120*60 / 90*120*60 / 60*120*60', 'БЦ (Белый цемент)', '4200 ₸/м2'],
    ];
  } else if (type === 'splitters' || type === 'blocks' || type === 'Сплитерные блоки') {
    filename = 'AltaStroy_Price_Blocks.csv';
    headers = ['Раздел', 'Наименование', 'Размер (мм)', 'Вес', 'Тип / Цвет', 'Цена (Тенге за ед)'];
    rows = [
      ['Сплитерные блоки', 'Сплитерный блок (серый)', '390*190*190', '14 кг', 'Серый', '220 ₸'],
      ['Сплитерные блоки', 'Сплитерный блок (цветной)', '390*190*190', '14 кг', 'Цветной', '340 ₸'],
      ['Сплитерные блоки', 'Облицовка рваная (серая)', '390*190*190', '17 кг', 'Серый', '400 ₸'],
      ['Сплитерные блоки', 'Облицовка рваная (цветная)', '390*190*190', '17 кг', 'Цветной', '500 ₸'],
      ['Колонны', 'Колонна 40x40 Рваная', '390*390*190', '30 кг', 'Серый', '750 ₸'],
      ['Колонны', 'Колонна 40x40 Рваная', '390*390*190', '30 кг', 'Цветной', '850 ₸'],
      ['Колонны', 'Колонна 40x40 Гладкая', '390*390*190', '25 кг', 'Серый', '650 ₸'],
      ['Колонны', 'Колонна 40x40 Гладкая', '390*390*190', '25 кг', 'Цветной', '750 ₸'],
      ['Колонны', 'Колонна 33x33 Рваная', '330*330*190', '18 кг', 'Серый', '650 ₸'],
      ['Колонны', 'Колонна 33x33 Рваная', '330*330*190', '18 кг', 'Цветной', '750 ₸'],
      ['Колонны', 'Колонна 33x33 Гладкая', '330*330*190', '15 кг', 'Серый', '600 ₸'],
      ['Колонны', 'Колонна 33x33 Гладкая', '330*330*190', '15 кг', 'Цветной', '700 ₸'],
    ];
  } else if (type === 'borders' || type === 'Бордюры' || type === 'Бордюры и поребрики') {
    filename = 'AltaStroy_Price_Borders.csv';
    headers = ['Раздел', 'Наименование', 'Размер (мм)', 'Цвет', 'Цена (Тенге за ед)'];
    rows = [
      ['Бордюрные камни', 'Бордюр «Дорожный»', '1000*300*150', 'Серый', '3200 ₸'],
      ['Бордюрные камни', 'Поребрик', '1000*200*80', 'Серый', '1300 ₸'],
      ['Бордюрные камни', 'Бордюр Большой', '500*200*75', 'Серый', '800 ₸'],
      ['Бордюрные камни', 'Бордюр Большой', '500*200*75', 'Цветной', '900 ₸'],
      ['Бордюрные камни', 'Бордюр Маленький', '500*120*75', 'Серый', '700 ₸'],
      ['Бордюрные камни', 'Бордюр Маленький', '500*120*75', 'Цветной', '800 ₸'],
      ['Накрывочные элементы', 'Шляпа рядовая', '400*260', 'Серый', '700 ₸'],
      ['Накрывочные элементы', 'Шляпа рядовая', '400*260', 'Цветной', '800 ₸'],
      ['Накрывочные элементы', 'Пирамида', '400*400', 'Серый', '2100 ₸'],
      ['Накрывочные элементы', 'Пирамида', '400*400', 'Цветной', '2300 ₸'],
      ['Накрывочные элементы', 'Медуза', '450*450', 'Серый', '2100 ₸'],
      ['Накрывочные элементы', 'Медуза', '450*450', 'Цветной', '2300 ₸'],
    ];
  } else {
    filename = 'AltaStroy_Price_Full.csv';
    headers = ['Раздел', 'Наименование', 'Размер', 'Цена'];
    rows = [];
    PRICE_DATA.forEach(section => {
      section.items.forEach(item => {
        rows.push([section.category, item.name, item.size, item.price]);
      });
    });
  }

  // Generate CSV string with semicolons for Excel compatibility in CIS region
  const csvContent = "\uFEFF" + [
    headers.join(";"),
    ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(";"))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPriceListPDF = (type: string) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Пожалуйста, разрешите всплывающие окна в браузере для генерации PDF!');
    return;
  }

  let mainTitle = '';
  let subTitle = '';
  let sectionsToRender: Array<{ category: string; items: Array<{ name: string; size: string; price: string }> }> = [];

  if (type === 'paving' || type === 'pavings' || type === 'paving_stones' || type === 'Брусчатка') {
    mainTitle = 'БРУСЧАТКА';
    subTitle = 'ВИБРОПРЕСОВАННАЯ КЛАССИКА';
    sectionsToRender = PRICE_DATA.filter(s => s.category.includes('Брусчатка'));
  } else if (type === 'splitters' || type === 'blocks' || type === 'Сплитерные блоки') {
    mainTitle = 'СПЛИТЕРНЫЕ БЛОКИ';
    subTitle = 'СТРОИТЕЛЬНЫЙ КАМЕНЬ & СЕРИЯ КОЛОНН';
    sectionsToRender = [
      PRICE_DATA.find(s => s.category.toLowerCase().includes('сплитер')) || { category: 'Сплитерные блоки', items: [] },
      PRICE_DATA.find(s => s.category.toLowerCase().includes('колонн')) || { category: 'Колонны', items: [] },
      {
        category: 'Облицовка рваный камень',
        items: [
          { name: 'Облицовка рваная (серая)', size: '390*190*190', price: '400 ₸/ед.' },
          { name: 'Облицовка рваная (цветная)', size: '390*190*190', price: '500 ₸/ед.' }
        ]
      }
    ].filter(s => s && s.items && s.items.length > 0) as any;
  } else if (type === 'borders' || type === 'Бордюры' || type === 'Бордюры и поребрики') {
    mainTitle = 'БОРДЮРЫ И НАКРЫВКИ';
    subTitle = 'ДОРОЖНОЕ ОБРАМЛЕНИЕ & СИСТЕМЫ ЗАБОРОВ';
    sectionsToRender = [
      PRICE_DATA.find(s => s.category.toLowerCase().includes('бордюр')) || { category: 'Бордюры и поребрики', items: [] },
      PRICE_DATA.find(s => s.category.toLowerCase().includes('накрывочн')) || { category: 'Накрывочные элементы', items: [] },
      {
        category: 'Дополнительные элементы',
        items: [
          { name: 'Геотекстиль', size: '-', price: '599 ₸/м2' }
        ]
      }
    ].filter(s => s && s.items && s.items.length > 0) as any;
  } else {
    mainTitle = 'ПОЛНЫЙ КАТАЛОГ';
    subTitle = 'СТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ АЛЬТА СТРОЙ';
    sectionsToRender = PRICE_DATA;
  }

  // Fallback if empty array filter
  if (!sectionsToRender || sectionsToRender.length === 0) {
    sectionsToRender = PRICE_DATA;
  }

  const currentDateStr = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  // Generate gorgeous HTML styled exactly like high-end company lists
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Прайс-лист АЛЬТА СТРОЙ - ${mainTitle}</title>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            color: #18181b;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            max-width: 850px;
            margin: 0 auto;
            padding: 40px 30px;
            box-sizing: border-box;
          }
          .header {
            background-color: #000000;
            color: #ffffff;
            padding: 40px;
            border-radius: 24px;
            border-bottom: 6px solid #eab308;
            margin-bottom: 40px;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .title-area {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .company-logo {
            font-size: 32px;
            font-weight: 900;
            letter-spacing: 4px;
            color: #ffffff;
            text-transform: uppercase;
          }
          .logo-accent {
            color: #eab308;
          }
          .motto {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2.5px;
            color: #a1a1aa;
            text-transform: uppercase;
            margin-top: 4px;
          }
          .price-badge {
            background-color: #eab308;
            color: #000000;
            padding: 8px 18px;
            border-radius: 50px;
            font-weight: 900;
            font-size: 12px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
          }
          .headline {
            margin-top: 30px;
          }
          .headline h1 {
            font-size: 40px;
            font-weight: 900;
            margin: 0;
            letter-spacing: -1px;
            color: #ffffff;
            text-transform: uppercase;
          }
          .headline p {
            font-size: 13px;
            margin: 6px 0 0 0;
            color: #eab308;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .meta-info {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #a1a1aa;
            margin-top: 30px;
            border-top: 1px solid #27272a;
            padding-top: 15px;
            font-weight: 600;
          }
          .table-section {
            margin-bottom: 45px;
            page-break-inside: avoid;
          }
          .table-title {
            font-size: 16px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #1c1917;
            border-left: 5px solid #eab308;
            padding-left: 15px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .table-grid {
            border: 2px solid #eab308;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          }
          .table-header {
            background-color: #18181b;
            color: #ffffff;
            display: grid;
            grid-template-columns: 2fr 1.2fr 1.8fr;
            padding: 16px 24px;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .table-row {
            display: grid;
            grid-template-columns: 2fr 1.2fr 1.8fr;
            padding: 18px 24px;
            font-size: 13px;
            align-items: center;
            border-bottom: 1px solid #f4f4f5;
            background-color: #fefcf0; /* elegant off-white yellow background matching screenshot theme */
          }
          .table-row:last-child {
            border-bottom: none;
          }
          .table-row:nth-child(even) {
            background-color: #fffef7;
          }
          .item-name {
            font-weight: 700;
            color: #1c1917;
            text-transform: uppercase;
            font-size: 13px;
          }
          .item-size {
            font-size: 11px;
            color: #71717a;
            font-weight: 700;
            letter-spacing: 0.5px;
          }
          .item-price {
            font-size: 14px;
            font-weight: 900;
            color: #1c1917;
            background-color: #ffffff;
            border: 1px solid #eab308;
            padding: 8px 14px;
            border-radius: 8px;
            text-align: center;
            width: fit-content;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
          }
          .footer {
            background-color: #fafafa;
            border-top: 1px solid #f4f4f5;
            padding: 35px;
            margin-top: 60px;
            border-radius: 20px;
            font-size: 11px;
            line-height: 1.8;
            color: #52525b;
            font-weight: 600;
            text-align: center;
          }
          .footer-address {
            margin-top: 15px;
            font-size: 12px;
            font-weight: 850;
            color: #18181b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .action-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background-color: #eab308;
            color: #000000;
            border: none;
            padding: 16px 36px;
            font-weight: 900;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(234, 179, 8, 0.4);
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s ease-in-out;
            z-index: 999;
          }
          .action-btn:hover {
            transform: scale(1.05);
            background-color: #f1c40f;
          }
          @media print {
            .action-btn {
              display: none !important;
            }
            body {
              background: none;
              color: #000000;
            }
            .container {
              padding: 0;
              max-width: 100%;
            }
            .header {
              box-shadow: none;
              border-radius: 0;
            }
            .table-grid {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title-area">
              <div>
                <div class="company-logo">ALTA <span class="logo-accent">STROY</span></div>
                <div class="motto">Ваше фундаментальное решение</div>
              </div>
              <div class="price-badge">PDF ПРАЙС</div>
            </div>
            <div class="headline">
              <h1>${mainTitle}</h1>
              <p>${subTitle}</p>
            </div>
            <div class="meta-info">
              <div>Действителен на: ${currentDateStr}</div>
              <div>г. Алматы</div>
            </div>
          </div>

          ${sectionsToRender.map(section => `
            <div class="table-section">
              <div class="table-title">
                <span>${section.category}</span>
              </div>
              <div class="table-grid">
                <div class="table-header">
                  <div>Наименование</div>
                  <div>Размер (мм)</div>
                  <div>Цена (в тенге)</div>
                </div>
                ${section.items.map(item => `
                  <div class="table-row">
                    <div class="item-name">${item.name}</div>
                    <div class="item-size">${item.size !== '-' ? item.size : 'Индивидуально'}</div>
                    <div>
                      <div class="item-price">${item.price}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}

          <div class="footer">
            <div>* Цены указаны в тенге (KZT). Конечная стоимость зависит от запрашиваемого объема закупа, условий оплаты и адреса логистики.</div>
            <div class="footer-address">
              Адрес производства: г. Алматы <br>
              Офис 1: Мкр. Карасу, ул. Бурундайская 47/5 <br>
              Офис 2: Пос. Бесагаш, ул. Райымбека, д. 14
            </div>
          </div>
        </div>

        <button class="action-btn" onclick="window.print()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          СОХРАНИТЬ В PDF / ПЕЧАТЬ
        </button>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 550);
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

const PriceListModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-start justify-center p-0 md:p-8 bg-zinc-950/98 backdrop-blur-md overflow-y-auto"
    >
      <div className="w-full max-w-5xl px-4 py-12 md:px-0 md:my-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-6">
           <div>
             <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-2 md:mb-4 block">Прайс-лист {new Date().getFullYear()}</span>
             <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Наши <span className="text-zinc-600">цены</span></h2>
           </div>
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 md:static text-white/50 hover:text-white transition-colors p-2 md:p-3 bg-white/5 rounded-full"
           >
             <X size={24} className="md:w-8 md:h-8" />
           </button>
        </div>

        {/* DOWNLOAD SECTION (EXCEL & PDF) */}
        <div className="mb-12 bg-zinc-900/50 border border-white/10 p-6 md:p-8 rounded-[32px] space-y-6">
          <div>
            <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 block">Загрузить каталоги прайс-листов</span>
            <h3 className="text-white text-lg md:text-xl font-black uppercase tracking-wider mb-2">Официальные прайс-листы ALTA STROY</h3>
            <p className="text-zinc-400 text-xs font-medium leading-relaxed max-w-2xl">
              Выберите нужный вам раздел строительных материалов. Доступны классический формат Excel для быстрых расчетов и официальный PDF-формат с готовой стилистикой для печати и сохранения:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CARD 1 */}
            <div className="bg-zinc-950/60 border border-white/5 hover:border-yellow-500/20 p-5 rounded-[20px] flex flex-col justify-between transition-all duration-300">
              <div className="mb-4">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-3 font-bold text-xs">01</div>
                <h4 className="text-white text-sm font-black uppercase tracking-wide">Брусчатка</h4>
                <p className="text-zinc-400 text-[11px] font-medium mt-1 leading-relaxed">Вибропрессованная плитка, классические формы и 3D брусчатка.</p>
              </div>
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => downloadPriceList('paving')}
                  className="w-full py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-400" />
                  Excel (.xls)
                </button>
                <button
                  onClick={() => downloadPriceListPDF('paving')}
                  className="w-full py-2.5 px-3 bg-yellow-500 hover:bg-yellow-600 text-zinc-950 font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-yellow-500/5 cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-950" />
                  Скачать PDF
                </button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-zinc-950/60 border border-white/5 hover:border-yellow-500/20 p-5 rounded-[20px] flex flex-col justify-between transition-all duration-300">
              <div className="mb-4">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-300 mb-3 font-bold text-xs">02</div>
                <h4 className="text-white text-sm font-black uppercase tracking-wide">Сплитер. Блоки</h4>
                <p className="text-zinc-400 text-[11px] font-medium mt-1 leading-relaxed">Гладкие, рваные блоки, облицовка, тумбы и колонны 40х40 / 33х33.</p>
              </div>
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => downloadPriceList('splitters')}
                  className="w-full py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-400" />
                  Excel (.xls)
                </button>
                <button
                  onClick={() => downloadPriceListPDF('splitters')}
                  className="w-full py-2.5 px-3 bg-yellow-500 hover:bg-yellow-600 text-zinc-950 font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-yellow-500/5 cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-950" />
                  Скачать PDF
                </button>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-zinc-950/60 border border-white/5 hover:border-yellow-500/20 p-5 rounded-[20px] flex flex-col justify-between transition-all duration-300">
              <div className="mb-4">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-300 mb-3 font-bold text-xs">03</div>
                <h4 className="text-white text-sm font-black uppercase tracking-wide">Бордюры & декор</h4>
                <p className="text-zinc-400 text-[11px] font-medium mt-1 leading-relaxed">Дорожные камни, поребрики, декоративные накрывки и шляпы.</p>
              </div>
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => downloadPriceList('borders')}
                  className="w-full py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-400" />
                  Excel (.xls)
                </button>
                <button
                  onClick={() => downloadPriceListPDF('borders')}
                  className="w-full py-2.5 px-3 bg-yellow-500 hover:bg-yellow-600 text-zinc-950 font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-yellow-500/5 cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-950" />
                  Скачать PDF
                </button>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-yellow-500/5 border border-yellow-500/25 hover:border-yellow-500/40 p-5 rounded-[20px] flex flex-col justify-between transition-all duration-300">
              <div className="mb-4">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-3 font-bold text-xs">ALL</div>
                <h4 className="text-white text-sm font-black uppercase tracking-wide">Полный прайс</h4>
                <p className="text-zinc-400 text-[11px] font-medium mt-1 leading-relaxed font-sans font-semibold">Все разделы производства Альта Строй в одной сводной таблице.</p>
              </div>
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => downloadPriceList('all')}
                  className="w-full py-2.5 px-3 bg-zinc-850 hover:bg-zinc-750 text-white font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all border border-zinc-700 cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-400" />
                  Excel (.xls)
                </button>
                <button
                  onClick={() => downloadPriceListPDF('all')}
                  className="w-full py-2.5 px-3 bg-white hover:bg-zinc-100 text-zinc-950 font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <ArrowDown size={11} className="text-zinc-950" />
                  Полный PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 md:gap-y-12">
          {PRICE_DATA.map((section, idx) => (
            <div key={idx} className="space-y-5 md:space-y-6">
              <h3 className="text-yellow-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] pb-3 md:pb-4 border-b border-white/10">
                {section.category}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1 group">
                    <div className="flex justify-between items-end gap-3 md:gap-4">
                      <span className="text-zinc-100 font-bold text-[10px] md:text-[11px] tracking-tight group-hover:text-yellow-500 transition-colors uppercase">{item.name}</span>
                      <div className="flex-grow border-b border-white/5 border-dotted mb-1 md:mb-1.5 opacity-30"></div>
                      <span className="text-yellow-500 font-black text-[10px] md:text-[11px] whitespace-nowrap">{item.price}</span>
                    </div>
                    {item.size !== '-' && (
                      <span className="text-zinc-500 text-[8px] uppercase font-bold tracking-[0.2em]">{item.size}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest text-center md:text-left max-w-md leading-relaxed md:leading-loose">
             * Цены указаны для ознакомления и могут меняться в зависимости от объема заказа и условий доставки. Сплитерные блоки и колонны отпускаются поштучно.
           </p>
           <a 
             href="#contact" 
             onClick={onClose}
             className="w-full md:w-auto px-10 py-5 bg-white text-zinc-900 text-center text-[10px] font-black uppercase tracking-[0.3em] hover:bg-yellow-500 hover:text-white transition-all shadow-2xl"
           >
              Получить точный расчет
           </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<typeof COLLECTIONS[0] | null>(null);

  // --- Administration Database & Routing States ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('altastroy_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const allowedPavingTitles = [
          'Брусчатка «Квадро»',
          'Брусчатка «Старый Город»',
          'Брусчатка «Ромбик 3D»',
          'Брусчатка «Старая Азия»',
          'Брусчатка «Ландхаус»',
          'Брусчатка «Кирпичик»'
        ];
        const allowedBorderTitles = [
          'Бордюр «Дорожный» 100х30х15',
          'Поребрик 100х20х8'
        ];
        const allowedSplitterTitles = [
          'Сплитерный блок 390х190х190'
        ];
        
        // Filter out any legacy paving stones/borders/splitters not in the allowed lists
        const filtered = parsed.filter((p: any) => {
          if (p.category === 'Брусчатка') {
            return allowedPavingTitles.includes(p.title);
          }
          if (p.category === 'Бордюры') {
            return allowedBorderTitles.includes(p.title);
          }
          if (p.category === 'Сплитерные блоки') {
            return allowedSplitterTitles.includes(p.title);
          }
          return true;
        });

        // Ensure all required models from PRODUCTS exists in the listing
        const existingTitles = filtered.map((p: any) => p.title);
        PRODUCTS.forEach(p => {
          if (!existingTitles.includes(p.title)) {
            filtered.push(p);
          }
        });

        return filtered;
      } catch (e) {
        console.error("Error reading altastroy_products", e);
      }
    }
    return PRODUCTS;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('altastroy_admin_active') === 'true';
  });

  const [isAdminPage, setIsAdminPage] = useState(() => {
    return window.location.pathname.toLowerCase() === '/admin';
  });

  // Track SPA window-location changes internally
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminPage(window.location.pathname.toLowerCase() === '/admin');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setIsAdminPage(path.toLowerCase() === '/admin');
  };

  // Hoisted editing position values
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Брусчатка');
  const [formTags, setFormTags] = useState('');
  const [formImages, setFormImages] = useState<string[]>(['']);

  // Persists updates to catalog
  useEffect(() => {
    localStorage.setItem('altastroy_products', JSON.stringify(products));
  }, [products]);

  const handleOpenEditModal = (prod: Product | null) => {
    if (prod) {
      setEditingProduct(prod);
      setFormTitle(prod.title);
      setFormDescription(prod.description);
      setFormCategory(prod.category);
      setFormTags(prod.tags.join(', '));
      setFormImages(prod.images && prod.images.length > 0 ? [...prod.images] : ['']);
    } else {
      setEditingProduct(null);
      setFormTitle('');
      setFormDescription('');
      setFormCategory(selectedCollection?.categoryName || 'Брусчатка');
      setFormTags('');
      setFormImages(['']);
    }
    setShowEditModal(true);
  };

  const handleDeleteProduct = (productTitle: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить товар "${productTitle}"?`)) {
      setProducts(prev => prev.filter(p => p.title !== productTitle));
    }
  };

  const moveProductOrder = (productTitle: string, direction: 'prev' | 'next') => {
    const currentIndex = products.findIndex(p => p.title === productTitle);
    if (currentIndex === -1) return;

    let targetIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= products.length) return;

    const updated = [...products];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;
    setProducts(updated);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const validImages = formImages.map(img => img.trim()).filter(Boolean);
    const finalImages = validImages.length > 0 ? validImages : ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600'];
    const parsedTags = formTags.split(',').map(t => t.trim()).filter(Boolean);

    const updatedProduct: Product = {
      title: formTitle,
      description: formDescription,
      images: finalImages,
      tags: parsedTags,
      category: formCategory
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.title === editingProduct.title ? updatedProduct : p));
    } else {
      setProducts(prev => [...prev, updatedProduct]);
    }
    setShowEditModal(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('altastroy_admin_active');
    navigateTo('/');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [selectedCollection, isAdminPage]);

  if (isAdminPage) {
    if (isAdmin) {
      return (
        <>
          <AdminDashboard 
            products={products}
            handleOpenEditModal={handleOpenEditModal}
            handleDeleteProduct={handleDeleteProduct}
            moveProductOrder={moveProductOrder}
            onLogout={handleLogout}
            onBackHome={() => navigateTo('/')}
          />

          {/* Edit/Add Item Modal */}
          <AnimatePresence>
            {showEditModal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto font-sans text-zinc-900"
              >
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-white rounded-3xl border border-zinc-200 p-8 md:p-10 max-w-2xl w-full my-8 space-y-8 relative"
                >
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>

                  <div className="border-b border-zinc-100 pb-5 text-left">
                    <span className="text-yellow-600 block text-[9px] font-black uppercase tracking-widest mb-1">Редактирование каталога</span>
                    <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                      {editingProduct ? 'Редактировать товар' : 'Добавить новую позицию'}
                    </h3>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-6 text-left">
                     <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-zinc-500 text-[9px] uppercase font-black pl-1 block">Название товара</label>
                         <input 
                           type="text"
                           required
                           value={formTitle}
                           onChange={(e) => setFormTitle(e.target.value)}
                           className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-4 rounded-2xl text-xs font-bold outline-none focus:border-yellow-500 transition-colors"
                         />
                       </div>

                       <div className="space-y-2">
                         <label className="text-zinc-500 text-[9px] uppercase font-black pl-1 block">Категория</label>
                         <select 
                           value={formCategory}
                           onChange={(e) => setFormCategory(e.target.value)}
                           className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-4 rounded-2xl text-xs font-bold outline-none focus:border-yellow-500 transition-colors"
                         >
                           {COLLECTIONS.map(col => (
                             <option key={col.id} value={col.categoryName}>{col.categoryName}</option>
                           ))}
                           <option value="Декоративные элементы">Декоративные элементы</option>
                         </select>
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-zinc-500 text-[9px] uppercase font-black pl-1 block">Краткое описание</label>
                       <textarea 
                         rows={3}
                         value={formDescription}
                         onChange={(e) => setFormDescription(e.target.value)}
                         className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-4 rounded-2xl text-xs font-bold outline-none focus:border-yellow-500 resize-none transition-colors"
                       ></textarea>
                     </div>

                     <div className="space-y-2">
                       <label className="text-zinc-500 text-[9px] uppercase font-black pl-1 block">Теги и свойства (через запятую)</label>
                       <input 
                         type="text"
                         value={formTags}
                         onChange={(e) => setFormTags(e.target.value)}
                         className="w-full bg-zinc-50 border border-zinc-200 text-zinc-905 p-4 rounded-2xl text-xs font-bold outline-none focus:border-yellow-500 transition-colors"
                       />
                     </div>

                     <div className="space-y-2">
                       <label className="text-zinc-400 text-[9px] uppercase font-black pl-1 block">Ссылки на фотографии (URL - Google Drive, Unsplash, Imgur)</label>
                       <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                         {formImages.map((img, idx) => (
                           <div key={idx} className="flex gap-2 items-center">
                             <input 
                               type="text"
                               value={img}
                               onChange={(e) => {
                                 const updated = [...formImages];
                                 updated[idx] = e.target.value;
                                 setFormImages(updated);
                               }}
                               className="flex-grow bg-zinc-50 border border-zinc-200 text-zinc-900 p-3.5 rounded-xl text-xs font-bold outline-none focus:border-yellow-500 transition-colors"
                             />
                             {formImages.length > 1 && (
                               <button 
                                 type="button"
                                 onClick={() => setFormImages(formImages.filter((_, i) => i !== idx))}
                                 className="p-3.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
                               >
                                 <Trash2 size={14} />
                               </button>
                             )}
                           </div>
                         ))}
                       </div>
                       <button 
                         type="button"
                         onClick={() => setFormImages([...formImages, ''])}
                         className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                       >
                         <Plus size={12} />
                         Добавить еще фото
                       </button>
                     </div>

                     <div className="pt-6 border-t border-zinc-100 flex justify-end gap-3">
                       <button 
                         type="button"
                         onClick={() => setShowEditModal(false)}
                         className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                       >
                         Отмена
                       </button>
                       <button 
                         type="submit"
                         className="px-8 py-3 bg-yellow-500 hover:bg-zinc-900 text-zinc-950 hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-yellow-500/15 cursor-pointer"
                       >
                         Сохранить
                       </button>
                     </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    }
    return (
      <AdminLogin 
        onLoginSuccess={() => { setIsAdmin(true); localStorage.setItem('altastroy_admin_active', 'true'); }} 
        onBackHome={() => navigateTo('/')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-500 selection:text-white">
      <Navbar onNavigateHome={() => setSelectedCollection(null)} isSubpage={selectedCollection !== null} onOpenPriceModal={() => setIsPriceModalOpen(true)} />
      
      <main>
        <AnimatePresence mode="wait">
          {selectedCollection === null ? (
            <motion.div
              key="main-landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Hero />
              
              {/* About / Experience Section */}
              <section id="about" className="section-padding bg-white text-zinc-900 relative overflow-hidden">
                <div className="container mx-auto">
                   <div className="grid lg:grid-cols-2 gap-24 items-center">
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                         <div className="relative inline-block mb-10">
                            <div className="w-48 h-48 bg-yellow-500 absolute -top-10 -left-10 -z-10 opacity-10 blur-3xl rounded-full"></div>
                            <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter">
                              Строим <span className="text-yellow-500 italic block">будущее</span>
                              <span className="text-zinc-200">вместе</span>
                            </h2>
                         </div>
                         <p className="text-zinc-600 text-xl leading-relaxed mb-10 font-light max-w-xl">
                           Alta Stroy — это производственный комплекс в Алматы, специализирующийся на высококачественных строительных материалах из бетона.
                         </p>
                         <div className="space-y-6 mb-12">
                            <div className="flex gap-4 items-start">
                               <div className="mt-1 bg-yellow-500 rounded-full p-1"><CheckCircle2 size={12} className="text-white" /></div>
                               <p className="text-zinc-500 text-sm font-medium leading-relaxed">Собственный парк спецтехники и автоматизированные линии производства.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                               <div className="mt-1 bg-yellow-500 rounded-full p-1"><CheckCircle2 size={12} className="text-white" /></div>
                               <p className="text-zinc-500 text-sm font-medium leading-relaxed">Вся продукция сертифицирована согласно стандартам РК и ГОСТ.</p>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full border-4 border-yellow-500/10 bg-zinc-900 flex items-center justify-center text-xs font-black text-yellow-500 shadow-2xl">
                               +1200
                            </div>
                            <div className="flex flex-col">
                               <span className="text-zinc-900 font-black text-sm uppercase tracking-widest">Доверие партнеров</span>
                               <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Проекты по всему Казахстану</span>
                            </div>
                         </div>
                      </motion.div>

                      <div className="relative">
                         {/* Background element */}
                         <div className="absolute -inset-4 bg-zinc-50 rounded-sm -z-10 rotate-2"></div>
                         <div className="aspect-[4/5] bg-zinc-100 overflow-hidden relative rounded-sm shadow-2xl border-8 border-white">
                            <img 
                              src="https://lh3.googleusercontent.com/d/1SZf70_rMVNeg-8oHybI6CuWhw-HoPYQc" 
                              alt="Production Facility" 
                              className="w-full h-full object-cover transition-all duration-1000 grayscale hover:grayscale-0"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute top-8 right-8 bg-zinc-900 text-white p-6 rounded-sm shadow-2xl transform hover:rotate-3 transition-transform">
                               <span className="block text-4xl font-black text-yellow-500 mb-1">20+</span>
                               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Типов изделий</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </section>

              {/* Products Grid */}
              <section id="products" className="section-padding bg-zinc-50 relative">
                <div className="container mx-auto">
                   <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                      <div>
                        <span className="text-yellow-600 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Наше производство</span>
                        <h2 className="text-5xl md:text-8xl font-black text-zinc-900 uppercase leading-[0.85] tracking-tighter">Весь <br /><span className="text-zinc-300">ассортимент</span></h2>
                      </div>
                      <div className="flex gap-4">
                         <button 
                           onClick={() => setIsPriceModalOpen(true)}
                           className="px-10 py-4 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl shadow-zinc-900/10"
                         >
                           Заказать прайс-лист
                         </button>
                      </div>
                   </div>

                   <ProductList 
                     selectedCollection={selectedCollection} 
                     setSelectedCollection={setSelectedCollection}
                     products={products}
                     isAdmin={isAdmin}
                     handleOpenEditModal={handleOpenEditModal}
                     handleDeleteProduct={handleDeleteProduct}
                     moveProductOrder={moveProductOrder}
                   />
                </div>
              </section>

              <AdvantagesSection />
              <ProjectsSection />
              <ContactSection />
            </motion.div>
          ) : (
            <motion.div
              key="collection-viewport"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-50 min-h-screen"
            >
              {/* Premium Hero Header for collection subpage */}
              <div className="bg-zinc-950 text-white pt-40 pb-20 relative overflow-hidden border-b border-zinc-900 shadow-2xl">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500 rounded-full blur-[160px] opacity-20 pointer-events-none"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                  <div className="flex flex-col gap-5">
                    {/* Compact Breadcrumbs */}
                    <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      <button onClick={() => setSelectedCollection(null)} className="hover:text-yellow-500 transition-colors">Главная</button>
                      <span>/</span>
                      <span className="text-yellow-500">Коллекции</span>
                      <span>/</span>
                      <span className="text-white normal-case font-bold">{selectedCollection.title}</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.85] mt-2">
                      <span className="text-yellow-500 font-black italic">{selectedCollection.title}</span>
                    </h1>
                    
                    <p className="text-zinc-400 text-sm md:text-base font-semibold max-w-2xl mt-4 leading-relaxed">
                      {selectedCollection.subtitle}. Заводское качество, гарантирующее безупречный вид и долгий срок службы.
                    </p>
                  </div>
                </div>
              </div>

              {/* Injected focused viewport catalog */}
              <div className="container mx-auto px-6 py-16">
                <ProductList 
                  selectedCollection={selectedCollection} 
                  setSelectedCollection={setSelectedCollection}
                  products={products}
                  isAdmin={isAdmin}
                  handleOpenEditModal={handleOpenEditModal}
                  handleDeleteProduct={handleDeleteProduct}
                  moveProductOrder={moveProductOrder}
                />
              </div>

              {/* Dynamically prefills collection query details */}
              <div className="bg-white border-t border-zinc-200">
                <ContactSection defaultMessage={`Здравствуйте! Меня заинтересовала коллекция "${selectedCollection.title}". Пожалуйста, свяжитесь со мной для подробной консультации и расчета стоимости.`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Quick Action Floating Button */}
      <a 
        href="https://wa.me/77479003331" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-pulse hover:animate-none"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
        </span>
      </a>
       <AnimatePresence>
         {isPriceModalOpen && (
           <PriceListModal 
             isOpen={isPriceModalOpen} 
             onClose={() => setIsPriceModalOpen(false)} 
           />
         )}
       </AnimatePresence>
    </div>
  );
}
