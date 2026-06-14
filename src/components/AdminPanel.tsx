import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft,
  LayoutGrid
} from 'lucide-react';
import { 
  Product, 
  COLLECTIONS, 
  getProductColors, 
  getProductSize 
} from '../App';

export const AdminLogin = ({ onLoginSuccess, onBackHome }: { onLoginSuccess: () => void; onBackHome: () => void }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin') {
      onLoginSuccess();
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden text-white font-sans">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-500/30 rounded-full blur-[180px] opacity-10 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-zinc-900 border border-zinc-805/40 border-zinc-800 p-10 rounded-3xl shadow-2xl relative z-10 space-y-8"
      >
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 flex items-center justify-center rounded-2xl mx-auto border border-yellow-500/20 shadow-inner">
            <Lock size={26} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wider text-white">Alta Stroy</h2>
          <p className="text-zinc-400 text-xs font-semibold tracking-wider uppercase">Система администрирования каталога</p>
          <p className="text-zinc-500 text-[11px] font-bold">Введите пароль для входа в панель управления базой данных</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-zinc-400 text-[9px] uppercase font-black tracking-widest pl-1 block">Пароль управления</label>
            <input 
              type="password"
              required
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setLoginError(false);
              }}
              placeholder="Введите пароль..."
              className="w-full bg-white/5 border border-zinc-800 text-white py-4 px-5 rounded-2xl text-sm placeholder:text-zinc-605 outline-none focus:border-yellow-500 transition-colors font-bold"
            />
            {loginError && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-[10px] uppercase font-black tracking-widest pl-1 mt-1"
              >
                Неверный пароль доступа!
              </motion.p>
            )}
            <p className="text-[10px] text-zinc-500 mt-2 font-medium">Демо-пароль: <span className="font-mono text-white bg-white/5 px-2 py-0.5 rounded border border-white/5 font-bold">admin</span></p>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full bg-yellow-500 hover:bg-white text-zinc-950 font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl transition-all shadow-xl shadow-yellow-500/15 select-none cursor-pointer"
            >
              Войти в систему
            </button>
          </div>
        </form>

        <div className="border-t border-zinc-800/60 pt-6 text-center">
          <button 
            onClick={onBackHome}
            className="text-zinc-500 hover:text-white text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-2 group cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Вернуться на сайт
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const AdminDashboard = ({ 
  products, 
  handleOpenEditModal, 
  handleDeleteProduct, 
  moveProductOrder, 
  onLogout, 
  onBackHome 
}: {
  products: Product[];
  handleOpenEditModal: (prod: Product | null) => void;
  handleDeleteProduct: (title: string) => void;
  moveProductOrder: (title: string, direction: 'prev' | 'next') => void;
  onLogout: () => void;
  onBackHome: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'Брусчатка' | 'Плитка' | 'Сплитерные блоки' | 'Бордюры'>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeTab === 'all' || p.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (cat: string) => {
    return products.filter(p => p.category === cat).length;
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-24 selection:bg-yellow-500 selection:text-zinc-950">
      <header className="bg-zinc-900 text-white border-b border-zinc-800 shadow-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500 text-zinc-950 p-2.5 rounded-xl font-black">
              <Settings size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black uppercase tracking-wider">Alta Stroy</h1>
                <span className="bg-green-500/10 text-green-400 text-[9px] uppercase font-black px-2 py-0.5 rounded-full border border-green-500/20">Admin</span>
              </div>
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-0.5">Панель управления ассортиментом</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={onBackHome}
              className="bg-zinc-800 hover:bg-yellow-500 hover:text-zinc-950 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-zinc-700/50 flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={12} />
              Перейти к сайту
            </button>
            <button 
              onClick={() => handleOpenEditModal(null)}
              className="bg-yellow-500 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-yellow-500/15 cursor-pointer"
            >
              <Plus size={14} />
              Добавить товар
            </button>
            <button 
              onClick={onLogout}
              className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-red-500/20 shadow-sm cursor-pointer"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 animate-fade-in">
          <div className="bg-white p-6 border border-zinc-200/60 rounded-2xl shadow-sm relative overflow-hidden group hover:border-yellow-500 transition-colors">
            <span className="text-zinc-400 text-[9px] uppercase font-black tracking-widest block mb-1">Всего товаров</span>
            <span className="text-3xl font-black text-zinc-900 group-hover:text-yellow-650 transition-colors">{products.length}</span>
            <div className="absolute right-4 bottom-4 text-zinc-100 group-hover:text-yellow-500/5 transition-colors pointer-events-none">
              <LayoutGrid size={48} />
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/60 rounded-2xl shadow-sm relative overflow-hidden">
            <span className="text-zinc-400 text-[9px] uppercase font-black tracking-widest block mb-1">Брусчатка</span>
            <span className="text-3xl font-black text-zinc-900">{getCategoryCount('Брусчатка')}</span>
            <div className="text-[10px] text-zinc-400 mt-2 font-bold uppercase">Активные позиции</div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/60 rounded-2xl shadow-sm relative overflow-hidden">
            <span className="text-zinc-400 text-[9px] uppercase font-black tracking-widest block mb-1">Тротуарная плитка</span>
            <span className="text-3xl font-black text-zinc-900">{getCategoryCount('Плитка')}</span>
            <div className="text-[10px] text-zinc-400 mt-2 font-bold uppercase">Активные позиции</div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/60 rounded-2xl shadow-sm relative overflow-hidden">
            <span className="text-zinc-400 text-[9px] uppercase font-black tracking-widest block mb-1">Сплитерные блоки</span>
            <span className="text-3xl font-black text-zinc-900">{getCategoryCount('Сплитерные блоки')}</span>
            <div className="text-[10px] text-zinc-400 mt-2 font-bold uppercase">Активные позиции</div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/60 rounded-2xl shadow-sm relative overflow-hidden">
            <span className="text-zinc-400 text-[9px] uppercase font-black tracking-widest block mb-1">Бордюры и поребрики</span>
            <span className="text-3xl font-black text-zinc-900">{getCategoryCount('Бордюры')}</span>
            <div className="text-[10px] text-zinc-400 mt-2 font-bold uppercase">Активные позиции</div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50/50">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {(['all', 'Брусчатка', 'Плитка', 'Сплитерные блоки', 'Бордюры'] as const).map(tab => {
                const isActive = activeTab === tab;
                const counts = tab === 'all' ? products.length : getCategoryCount(tab);
                const transl: Record<string, string> = {
                  all: 'Все разделы',
                  'Брусчатка': 'Брусчатка',
                  'Плитка': 'Тротуарная плитка',
                  'Сплитерные блоки': 'Сплитерные блоки',
                  'Бордюры': 'Бордюры'
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-205 cursor-pointer ${
                      isActive 
                        ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/10' 
                        : 'bg-white hover:bg-zinc-100 text-zinc-500 border border-zinc-200/80 hover:text-zinc-900'
                    }`}
                  >
                    {transl[tab]} <span className="ml-1 opacity-60">({counts})</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-[320px] shrink-0">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по базе данных..."
                className="w-full bg-white border border-zinc-200 pl-11 pr-4 py-3 rounded-xl text-xs font-bold text-zinc-805 placeholder-zinc-400 outline-none focus:border-yellow-500 transition-colors"
              />
              <span className="absolute left-4 top-3.5 text-zinc-400">
                <Search size={14} className="text-zinc-400" />
              </span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center text-zinc-400 space-y-3">
              <p className="font-extrabold uppercase text-xs tracking-widest text-zinc-400">Позиций не найдено</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-zinc-50/20 text-zinc-400 text-[9px] uppercase font-black tracking-[0.2em] border-b border-zinc-100">
                    <th className="py-4.5 px-6 w-[80px]">Фото</th>
                    <th className="py-4.5 px-6">Название и описание</th>
                    <th className="py-4.5 px-6 w-[150px]">Категория</th>
                    <th className="py-4.5 px-6 w-[150px]">Размеры / Теги</th>
                    <th className="py-4.5 px-6 w-[130px] text-center">Сортировка</th>
                    <th className="py-4.5 px-6 w-[150px] text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm">
                  {filteredProducts.map((p, index) => {
                    const productColors = getProductColors(p.title);
                    const productSize = getProductSize(p.title);
                    return (
                      <tr key={p.title} className="hover:bg-zinc-50/30 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="w-14 h-14 bg-zinc-100 rounded-lg border border-zinc-100 overflow-hidden relative shadow-sm group-hover:border-zinc-300 transition-colors">
                            <img 
                              src={p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600'} 
                              alt={p.title} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-0.5 right-0.5 bg-black/75 text-white text-[8px] px-1 rounded-sm font-mono scale-90">
                              {p.images?.length || 1}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6 max-w-sm">
                          <div className="font-black text-zinc-900 text-sm tracking-tight group-hover:text-yellow-600 transition-colors">{p.title}</div>
                          <div className="text-zinc-500 text-xs truncate max-w-[280px] mt-1 line-clamp-2 white-space-pre-wrap">{p.description}</div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="bg-zinc-100 text-zinc-900 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-zinc-200/50">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <div className="space-y-1.5 max-w-[170px]">
                            <div className="text-[10px] text-zinc-500 font-mono tracking-tight leading-none">{productSize}</div>
                            <div className="flex flex-wrap gap-1">
                              {p.tags.map(t => (
                                <span key={t} className="bg-yellow-50 text-yellow-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={() => moveProductOrder(p.title, 'prev')}
                              disabled={index === 0}
                              className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-lg disabled:opacity-30 disabled:hover:bg-zinc-100 select-none cursor-pointer transition-colors"
                              title="Переместить вверх"
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button 
                              onClick={() => moveProductOrder(p.title, 'next')}
                              disabled={index === filteredProducts.length - 1}
                              className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-lg disabled:opacity-30 disabled:hover:bg-zinc-100 select-none cursor-pointer transition-colors"
                              title="Переместить вниз"
                            >
                              <ArrowDown size={12} />
                            </button>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleOpenEditModal(p)}
                              className="p-2 bg-zinc-100/50 text-zinc-600 hover:bg-yellow-500 hover:text-zinc-900 rounded-xl transition-all cursor-pointer"
                              title="Редактировать товар"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(p.title)}
                              className="p-2 bg-zinc-100/50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all cursor-pointer"
                              title="Удалить товар"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
