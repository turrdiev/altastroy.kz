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
  Loader2
} from 'lucide-react';

// --- Constants ---

const NAV_LINKS = [
  { name: 'О нас', href: '#about' },
  { name: 'Продукция', href: '#products' },
  { name: 'Преимущества', href: '#why-us' },
  { name: 'Проекты', href: '#projects' },
  { name: 'Контакты', href: '#contact' },
];

const PRODUCTS: Product[] = [
  {
    title: 'Брусчатка «Старая Азия»',
    description: 'Классическая брусчатка с имитацией натурального камня. Идеально подходит для пешеходных зон и парковок.',
    images: [
      'https://lh3.googleusercontent.com/d/1fLR8enQ-E__9oe8g6aBLIVYpoc50vivf',
      'https://lh3.googleusercontent.com/d/1jxqTHDsy7RLHlD0nyD98913uK-La41v9',
      'https://lh3.googleusercontent.com/d/1bwv4G93MosXNGRF-96q6VUtgI_xjVmXY',
      'https://lh3.googleusercontent.com/d/1_Ijd8Ga_zDCDyM4OH88unh6yB4ed1k7-',
      'https://lh3.googleusercontent.com/d/1uGSZ_aC4wqlxW-t_6TyC-FKFjeD9V-T0'
    ],
    tags: ['ГОСТ', 'Высокая нагрузка'],
    category: 'Брусчатка'
  },
  {
    title: 'Брусчатка «Кирпичик»',
    description: 'Универсальная форма для благоустройства любых территорий. Проста в укладке и надежна в эксплуатации.',
    images: [
      'https://lh3.googleusercontent.com/d/1n0JueKyjRj8Tbk_FNmQ7nu6jpgY8L4MW',
      'https://lh3.googleusercontent.com/d/1FUo5BK8728ybPjKoJbrMbFGUDav55FoB',
      'https://lh3.googleusercontent.com/d/1SihsW_vDNWOQBx7oqcCW7_RE4dfOODjP',
      'https://lh3.googleusercontent.com/d/1L4jYhfT5rbs5AjRjcORz49x3U6oCFQGX',
      'https://lh3.googleusercontent.com/d/1wxgH_woaurzXdylJBqPudMWwt4TszJfa'
    ],
    tags: ['Популярное', 'Универсальность'],
    category: 'Брусчатка'
  },
  {
    title: 'Плитка «Амстердам»',
    description: 'Элегантное решение для современных архитектурных проектов. Отличается точностью геометрии.',
    images: [
      'https://lh3.googleusercontent.com/d/1KsWdZmyu-8BpQkU2FVh-zLYQPcak_NmU',
      'https://lh3.googleusercontent.com/d/13WG1gy0spXHHmSvUVNKkecoKLCmHd13R',
      'https://lh3.googleusercontent.com/d/1v4pQKr4rUqWWRklCEovLtMKhmUwECZzl',
      'https://lh3.googleusercontent.com/d/14i_mxHOBUB8q7c7qZXJFiEODitW5Vbxu'
    ],
    tags: ['Дизайн', 'Ландшафт'],
    category: 'Плитка'
  },
  {
    title: 'Брусчатка «Волна»',
    description: 'Имеет специфическое сцепление сторон, что предотвращает сдвиг плиток при больших нагрузках.',
    images: [
      'https://lh3.googleusercontent.com/d/1VM_oDk7iSsZMwtAt5_UkRyn1ATLVGJKF',
      'https://lh3.googleusercontent.com/d/1v93cLyS4OuI9bJdmSvs58cUt_wQdxqBB',
      'https://lh3.googleusercontent.com/d/1sUa5YmNdsg5-x7UZxFr2UM0oYf4Q50GY',
      'https://lh3.googleusercontent.com/d/13-wwoTQ-znWkZbBKf4FQOJI4ooS5pV-8',
      'https://lh3.googleusercontent.com/d/189J4AWDZLfZh6pl1oCn15mqgMfRJpvoq'
    ],
    tags: ['Замок', 'Безопасность'],
    category: 'Брусчатка'
  },
  {
    title: 'Плитка «Ромб 3D»',
    description: 'Позволяет создавать уникальные визуальные эффекты и объемные рисунки на мощении.',
    images: [
      'https://lh3.googleusercontent.com/d/1RuI8Kd24opRGs6rhfHmXvI8AcUnCJ5DX',
      'https://lh3.googleusercontent.com/d/1byikNbNaAMZ2pE0w2TR3931BxAiqDJ-1',
      'https://lh3.googleusercontent.com/d/1WDWmA1DxrdrCL9FF-1SNUHcj-5K7j_Ik',
      'https://lh3.googleusercontent.com/d/1dN6zaTPFVHhLSMiqjJD3xoNe9uBCNhSW',
      'https://lh3.googleusercontent.com/d/1OSRvRd8SYA_K7awEw6Kia04zRo-DXHVC'
    ],
    tags: ['3D эффект', 'Эксклюзив'],
    category: 'Плитка'
  },
  {
    title: 'Тротуарная плитка «Квадрат»',
    description: 'Строгая классика для мощения тротуаров и больших площадей. Доступна в различных цветах.',
    images: [
      'https://lh3.googleusercontent.com/d/14wJQSZbOVwQZyQHkATrBptKdhZobVSoo',
      'https://lh3.googleusercontent.com/d/1A-I23Tzd5DmvfwufAhA-iGX_zkWdBiRG',
      'https://lh3.googleusercontent.com/d/1skZlsywA1WEMAloU5kD-CmiqRexKora9',
      'https://lh3.googleusercontent.com/d/1qEyBHh3zCsG8S9yF_FvE_RMYew2_BZ68'
    ],
    tags: ['Классика', 'Морозостойкость'],
    category: 'Плитка'
  },
  {
    title: 'Декоративная брусчатка «Мегаполис»',
    description: 'Наборная плитка разных размеров для создания естественного хаотичного рисунка укладки.',
    images: [
      'https://lh3.googleusercontent.com/d/1qlPn9IT_Qh8aZ8n7PhwIIZ-8CO_k3lR3',
      'https://lh3.googleusercontent.com/d/1dxYiDUexfHBDsMGK5E4Utc8oP8TpccRI',
      'https://lh3.googleusercontent.com/d/1quyJFN9qim0LOrnqRldTzE5S1h-U4Owl',
      'https://lh3.googleusercontent.com/d/19f8cohVjVcKzUBP5ud7xv8wN5mrpeNYy',
      'https://lh3.googleusercontent.com/d/1w9ia8IOwErjRI1s5oXnMQkUVNXb2yT8B',
      'https://lh3.googleusercontent.com/d/1mL-nfWPoBmyYugYt6oLw1bZj3MGJm-2-'
    ],
    tags: ['Тренды', 'Набор'],
    category: 'Брусчатка'
  },
  {
    title: 'Плитка «Паркет»',
    description: 'Имитирует рисунок деревянного паркета, создавая уют и эстетику натуральных материалов.',
    images: [
      'https://lh3.googleusercontent.com/d/1Qdq-3uVo9LWsabn0hx8RlutswAAr3ZsX',
      'https://lh3.googleusercontent.com/d/1KO06pYU01Dp_pvaoyI7DVBZUqkm0OK21',
      'https://lh3.googleusercontent.com/d/1Lx0OhPuN7CKNFaWAsjYClNaFNKMu2oIF',
      'https://lh3.googleusercontent.com/d/1fHdPUyHtCdr3ZfRlqvvjY3AeH9QDJBJi'
    ],
    tags: ['Текстура', 'Уют'],
    category: 'Плитка'
  },
  {
    title: 'Брусчатка «Соты»',
    description: 'Оригинальная шестигранная форма, создающая необычный геометрический паттерн.',
    images: [
      'https://lh3.googleusercontent.com/d/1BhqFWeomAu-froinD-HpVH8pLxI3Llim',
      'https://lh3.googleusercontent.com/d/1FWbYTTExeIhxgjnOmdcxZ4_HTcvoHNvG',
      'https://lh3.googleusercontent.com/d/1pHEeZkcG1EYErawAUH2um965dDKiz4Qk',
      'https://lh3.googleusercontent.com/d/178q6pgLt2n_KUXchkHAGZFkgwARqiLU8',
      'https://lh3.googleusercontent.com/d/15sKA0FWnF8W3ufjaZGrngxskg5EeJxCK'
    ],
    tags: ['Геометрия', 'Стиль'],
    category: 'Брусчатка'
  },
  {
    title: 'Плитка «Сетка»',
    description: 'Бюджетное и долговечное решение для производственных площадок и тротуаров.',
    images: [
      'https://lh3.googleusercontent.com/d/1Di8o5vHYcxlECqmQnQ1LKhgKomHWxrGP',
      'https://lh3.googleusercontent.com/d/1zn_RXzAbatgUSx9twqQvTny31cmIQT-s',
      'https://lh3.googleusercontent.com/d/1jcJSkclq1Whw88Oj6hEZrv2Nm5h_lwdD',
      'https://lh3.googleusercontent.com/d/1p6dfDpvLbXdKqe1_Yc_pNsR1hLGfx3jg',
      'https://lh3.googleusercontent.com/d/1BZsDNtgOWCMSNHzX-1eXZh2H5daRay3P'
    ],
    tags: ['Эконом', 'Практичность'],
    category: 'Плитка'
  },
  {
    title: 'Сплитерный блок «Гладкий»',
    description: 'Блок с гладкой поверхностью для возведения ровных и аккуратных стен и заборов.',
    images: [
      'https://lh3.googleusercontent.com/d/1XsaccOGXi1qCNqn6w5FJkAsDikyxCt29',
      'https://lh3.googleusercontent.com/d/1chZcADtpPHhg-Mjfyax2VpODwPvm9QP1',
      'https://lh3.googleusercontent.com/d/1pdHoJ9fJeE9taaXepqp4acqGzVzPYAqd',
      'https://lh3.googleusercontent.com/d/10jwtEu_e1apq777nYsPQNm6ezW-vPydQ'
    ],
    tags: ['Строительство', 'Минимализм'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Сплитерный блок «Рваный камень»',
    description: 'Блок с декоративной колотой поверхностью, имитирующей природный камень.',
    images: [
      'https://lh3.googleusercontent.com/d/1yzom6i4uNN_sI0DapGQL2uzDX5fIDFm8',
      'https://lh3.googleusercontent.com/d/1jMcHq_MB6icNmQZlWKeZ1CnsYCq7I2dT',
      'https://lh3.googleusercontent.com/d/1F8WEMRSJTQ_BFrOFNzqoBw2ek20ZjIXN'
    ],
    tags: ['Декор', 'Фактура'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Блок угловой декоративный',
    description: 'Специальный доборный элемент для оформления углов зданий и заборных столбов.',
    images: [
      'https://lh3.googleusercontent.com/d/1ekTYREHA872H7TO4gQbAVcD8N-WDov1u',
      'https://lh3.googleusercontent.com/d/1wyuvPgydLONhxIon5Ha2blnTpIT5NonY',
      'https://lh3.googleusercontent.com/d/17_b82mnfxkLWtW3HuQqVa2AwkqtfweWP'
    ],
    tags: ['Углы', 'Столбы'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Блок колонный',
    description: 'Предназначен для быстрого возведения несущих колонн и опорных столбов.',
    images: [
      'https://lh3.googleusercontent.com/d/1FkPb-nIa-NPoQ_TE5vXAVamondzw1FKT',
      'https://lh3.googleusercontent.com/d/1fj_JUQq88BhNqNx0hsL6UUX6Hp36rxV4',
      'https://lh3.googleusercontent.com/d/1FHHp-g6R5uPjYm6irDTQd5X3CVAWi6FU'
    ],
    tags: ['Колонны', 'Прочность'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Перегородочный блок',
    description: 'Легкий и прочный блок для возведения межкомнатных перегородок.',
    images: [
      'https://lh3.googleusercontent.com/d/1Ez-C6SBYbNrveFxcfiT53c3I6ISz9Fqa',
      'https://lh3.googleusercontent.com/d/1P7FJbNG0-1uVcOw8ucy3GFbVGD395aW1',
      'https://lh3.googleusercontent.com/d/1segKGCankrmoVkvVVRhQfdvRok9nW9DU'
    ],
    tags: ['Интерьер', 'Звукоизоляция'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Сплитерный блок «Колотый»',
    description: 'Имеет выразительную рельефную поверхность. Популярный выбор для облицовки цоколей.',
    images: [
      'https://lh3.googleusercontent.com/d/11RuEMRoyXqqONxrfTGIpMnnsNfypQx5F',
      'https://lh3.googleusercontent.com/d/1aFOR5eY2xgWbv50RlWwp_BQxr-reMYCg',
      'https://lh3.googleusercontent.com/d/1t0DybRV1kZURRNofan7-yf73UqqrlGkI'
    ],
    tags: ['Цоколь', 'Забор'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Блок декоративный «Мозаика»',
    description: 'Позволяет создавать орнаменты и уникальные узоры на фасадах за счет комбинации блоков.',
    images: [
      'https://lh3.googleusercontent.com/d/1Vjhc7zvoAo07Oi4AKyL-JFAOXwKewgw4',
      'https://lh3.googleusercontent.com/d/1FjgMpoEcSvLk5kyQTJ2EqfZYE47TG6iK',
      'https://lh3.googleusercontent.com/d/1e-QssHwO52lENLInsMH5wx01ML6joPt7'
    ],
    tags: ['Фасад', 'Индивидуальность'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Сплитерный блок «Премиум»',
    description: 'Блок увеличенной прочности с глубокой текстурой камня для элитного строительства.',
    images: [
      'https://lh3.googleusercontent.com/d/1XzvpjhEWUe77dBwWd4VsCBQJSAi8QnmC',
      'https://lh3.googleusercontent.com/d/1_gEgoKA7_XxKZ5xD-MnZ5cOXU3NopifT',
      'https://lh3.googleusercontent.com/d/1U48PMq82NwQxJmU5WN_TjAgdqO5g1G5w'
    ],
    tags: ['Премиум', 'Экстерьер'],
    category: 'Сплитерные блоки'
  },
  {
    title: 'Цветная брусчатка «Микс»',
    description: 'Коллекция с яркими и насыщенными цветами для создания акцентов в ландшафтном дизайне.',
    images: [
      'https://lh3.googleusercontent.com/d/1NV3Td7F6S6kb4AaCEQX66lczBCXytVW7',
      'https://lh3.googleusercontent.com/d/11IzC-6MxMEngYzGOOmAHjPjaewe9LNRc',
      'https://lh3.googleusercontent.com/d/1yWwAZh7ngQzjXnHmVbsalYla5xsJ5sHV',
      'https://lh3.googleusercontent.com/d/11HMxHJgbiGMT-VsrOJG336tG9bRbHkbz',
      'https://lh3.googleusercontent.com/d/1uh7tA_A2CXpBSraCHFvFtDGj9YlLj0XI',
      'https://lh3.googleusercontent.com/d/1fol2Gw_XQ6PmyBIy4rtHhzgsa6xuhEhe',
      'https://lh3.googleusercontent.com/d/1nJpS9_UYXNlwJz-GAZ0x0L49DFDyHhSi'
    ],
    tags: ['Цвет', 'Акцент'],
    category: 'Брусчатка'
  },
  {
    title: 'Брусчатка «Мраморная»',
    description: 'Изготовлена с добавлением мраморной крошки, что придает поверхности благородный блеск.',
    images: [
      'https://lh3.googleusercontent.com/d/1OjZP6uMFctPi6NMsybBf1LsOpGgDXmqR',
      'https://lh3.googleusercontent.com/d/1unNGBprZbwGTwmjUDmlKftBt7qebpeO9',
      'https://lh3.googleusercontent.com/d/1YPieTVTmpU-qx3kHxTRKWXIKkImD_Jgs'
    ],
    tags: ['Мрамор', 'Престиж'],
    category: 'Брусчатка'
  },
  {
    title: 'Плитка «Спектр»',
    description: 'Разноцветная плитка для современных городских инициатив и парковых пространств.',
    images: [
      'https://lh3.googleusercontent.com/d/1_EXt3f55OWrrqomUypMdjlJ-nX2TsaL0',
      'https://lh3.googleusercontent.com/d/1YBRH5iDAs_9_eEyk-ZCx_X0TnHNmJngn',
      'https://lh3.googleusercontent.com/d/1mmhAsJ5VfGwaHuA4Be7DFiMJm2-OtQuz',
      'https://lh3.googleusercontent.com/d/1dcKubCtSPdfkmz39PewTYf9OlsHhE9dg'
    ],
    tags: ['Парк', 'Город'],
    category: 'Плитка'
  },
  {
    title: 'Коллекция цветов «Гармония»',
    description: 'Мягкие природные оттенки брусчатки для загородных домов и частных участков.',
    images: [
      'https://lh3.googleusercontent.com/d/1DehsYNroteN0ictUvwvUlX8tpaGXmBwW',
      'https://lh3.googleusercontent.com/d/1rupyjN-xdCRjMNOGWHB1FfkKPSdLFERX',
      'https://lh3.googleusercontent.com/d/1Rnp3YEBluScAgM3ftI_fxvbkInlfYZe0',
      'https://lh3.googleusercontent.com/d/1I3OYB-kCCGvePtC9VvacqybQwmPDiUOW',
      'https://lh3.googleusercontent.com/d/1hE-zG7U-DcM4nDM84cvvKSkLp0d8TBs4',
      'https://lh3.googleusercontent.com/d/1QFOLRF6Dwwf1_JSAhJwRA-CBEluJ_oxo'
    ],
    tags: ['Эко', 'Сад'],
    category: 'Брусчатка'
  },
  {
    title: 'Бордюр магистральный',
    description: 'Усиленный бордюр для разделения проезжей части и тротуаров на дорогах.',
    images: [
      'https://lh3.googleusercontent.com/d/19qfBY4WqCLxqSos3QBh2xgaPHXor6681'
    ],
    tags: ['Дороги', 'ГОСТ'],
    category: 'Бордюры'
  },
  {
    title: 'Поребрик садовый',
    description: 'Компактный бордюр для оформления садовых дорожек и разграничения газонов.',
    images: [
      'https://lh3.googleusercontent.com/d/1aXFAh6csmO2wdplX3_rH_nm5aeyNq2A5',
      'https://lh3.googleusercontent.com/d/1kiyJVYt7cXP1IAk9wZwssO9jyMden9ZX',
      'https://lh3.googleusercontent.com/d/1SdIx3FmStTKN8dIOLjFzCMbztoNOGtP2',
      'https://lh3.googleusercontent.com/d/1SdP8n1eNqgD2_jmqO3x59mOQWEnh_jPr',
      'https://lh3.googleusercontent.com/d/1wPjif6H3BcSpJGGBcQ86GXsQ9H4Gh3cQ',
      'https://lh3.googleusercontent.com/d/1GeOPnAncVQ4v4KTybWiyQdnBvJkHfITK'
    ],
    tags: ['Для сада', 'Граница'],
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
      { name: 'Аллея', size: '195*195*60 / 80*80*60', price: '3500 ₸/м2' },
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
      { name: 'Бордюр Большой', size: '500*200*75', price: 'Серый 800 / Цветной 900 ₸/ед.' },
      { name: 'Бордюр Маленький', size: '500*120*75', price: 'Серый 700 / Цветной 800 ₸/ед.' },
      { name: 'Поребрик Метровый', size: '1000*200*80', price: 'Серый 1200 ₸/ед.' },
      { name: 'Бордюр Дорожный', size: '1000*300*150', price: 'Серый 3000 ₸/ед.' },
    ]
  },
  {
    category: 'Сплитерные блоки',
    items: [
      { name: 'Гладкий (серый)', size: '390*190*190', price: '220 ₸/ед.' },
      { name: 'Гладкий (цветной)', size: '390*190*190', price: '340 ₸/ед.' },
      { name: 'Рваный (серый)', size: '390*190*190', price: '380 ₸/ед.' },
      { name: 'Рваный (цветной)', size: '390*190*190', price: '480 ₸/ед.' },
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
    description: 'Брусчатка «Кирпичик» и плитка «Амстердам».'
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

interface Product {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onOpenGallery: (product: Product) => void;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-36 h-16">
            <img 
               src="https://lh3.googleusercontent.com/d/1xZEiso_iPVg3LnveR_o20EyN_dtRhhLa" 
               alt="Alta Stroy Logo" 
               className={`w-full h-full object-contain transition-all duration-300 ${isScrolled ? 'brightness-[0.3] contrast-125' : 'brightness-0 invert'}`}
               referrerPolicy="no-referrer"
               fetchPriority="high"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-xs xl:text-sm font-bold uppercase tracking-widest transition-all hover:text-amber-600 ${isScrolled ? 'text-zinc-600' : 'text-white/80'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 xl:gap-8">
          <div className="hidden xl:flex flex-col items-end">
            <a href="tel:+77479003331" className={`text-sm font-black hover:text-amber-600 transition-colors ${isScrolled ? 'text-zinc-900' : 'text-white'}`}>+7 (747) 900-33-31</a>
            <span className={`text-[9px] uppercase font-bold tracking-widest ${isScrolled ? 'text-zinc-400' : 'text-white/40'}`}>Алматы</span>
          </div>
          <button 
            className={`lg:hidden ${isScrolled ? 'text-zinc-900' : 'text-white'} transition-all`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <a 
            href="#contact" 
            className="hidden sm:block bg-amber-500 hover:bg-zinc-900 text-white px-6 xl:px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-500/20"
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
                    href={link.href} 
                    className="text-xl font-black uppercase tracking-tight hover:text-amber-500 border-b border-white/5 pb-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              <div className="space-y-4 pt-4">
                 <a href="tel:+77479003331" className="flex items-center gap-3 text-amber-500 font-black text-lg">
                    <Phone size={20} />
                    +7 (747) 900-33-31
                 </a>
                 <div className="flex gap-4">
                    <a href="https://www.instagram.com/altastroy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-amber-500 hover:text-black transition-colors"><Instagram size={20} /></a>
                    <a href="https://wa.me/77479003331" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-amber-500 hover:text-black transition-colors"><MessageCircle size={20} /></a>
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
          src="https://lh3.googleusercontent.com/d/1hNGOVLcoKaL8qt4882TF9WiWFvPVNfg7" 
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
            <span className="w-16 h-[2px] bg-amber-500"></span>
            <span className="text-white text-xs font-black uppercase tracking-[0.5em]">Качество Казахстанского Производства</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-white leading-[0.85] uppercase mb-10 tracking-tighter">
            <span className="text-amber-500 block">Alta</span>
            Stroy
          </h1>
          
          <p className="text-white/70 text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed font-light">
            Лидирующий завод по производству брусчатки и сплитерных блоков в Казахстане. Строим надежное будущее из высокопрочного бетона.
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="#products" className="bg-amber-500 text-white px-10 py-5 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white hover:text-zinc-900 transition-all flex items-center gap-3 group shadow-2xl shadow-amber-500/20">
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
               <span className="block text-4xl font-black text-amber-500">12+</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Лет на рынке</span>
            </div>
         </div>
         <div className="relative">
            <span className="text-white/5 text-[180px] font-black leading-none absolute -right-4 -top-24">02</span>
            <div className="relative z-10 text-right">
               <span className="block text-4xl font-black text-amber-500">100%</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Гарантия качества</span>
            </div>
         </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onOpenGallery }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white card-shadow rounded-sm p-4 relative overflow-hidden flex flex-col h-full"
    >
      <div className="aspect-square mb-5 overflow-hidden relative rounded-xs bg-zinc-50">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onOpenGallery(product)}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-colors"></div>
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.tags.map((tag: string) => (
            <span key={tag} className="bg-white/95 backdrop-blur-sm text-[8px] font-black text-zinc-900 px-2.5 py-1 uppercase tracking-widest border border-zinc-100 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        {product.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-zinc-900/80 backdrop-blur-md text-white text-[8px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 border border-white/10">
            <Plus size={10} className="text-amber-500" />
            {product.images.length} фото
          </div>
        )}
      </div>
      <div className="flex-grow">
        <span className="text-amber-600 text-[8px] font-black uppercase tracking-[0.3em] mb-1.5 block">
          {product.category}
        </span>
        <h3 className="text-zinc-900 font-black text-lg mb-2 group-hover:text-amber-600 transition-colors uppercase tracking-tight leading-tight cursor-pointer" onClick={() => onOpenGallery(product)}>
          {product.title}
        </h3>
        <p className="text-zinc-500 text-xs leading-relaxed mb-6 line-clamp-2">
          {product.description}
        </p>
      </div>
      <button 
        onClick={() => onOpenGallery(product)}
        className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group/btn border-b border-transparent hover:border-amber-600 pb-0.5 transition-all w-fit mt-auto"
      >
        Подробнее
        <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

const AdvantagesSection = () => {
  return (
    <section id="why-us" className="section-padding bg-zinc-50 text-zinc-900 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-[2px] bg-amber-500"></span>
              <span className="text-zinc-400 text-xs font-black uppercase tracking-[0.4em]">Преимущества</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-10 leading-none tracking-tighter">
              Технологии <br />
              <span className="text-amber-500 italic">качества</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-12 max-w-lg leading-relaxed font-light">
              С 2013 года мы совершенствуем процессы производства, чтобы вы получали материалы, которые выдержат любые испытания временем и климатом.
            </p>
            
            <div className="bg-white card-shadow rounded-sm p-10 relative group">
              <Quote className="text-amber-500/5 absolute right-6 bottom-6 w-32 h-32" />
              <p className="text-zinc-600 italic font-medium relative z-10 text-xl leading-relaxed">
                "Надежный фундамент благоустройства города начинается с правильного выбора производителя. Мы гарантируем результат."
              </p>
              <div className="mt-8 flex items-center gap-4">
                 <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-black">AS</div>
                 <div>
                    <span className="block font-black text-xs uppercase tracking-widest text-zinc-900">Alta Stroy team</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 relative">
            {ADVANTAGES.map((adv, idx) => (
              <motion.div 
                key={adv.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white card-shadow rounded-sm group hover:bg-zinc-900 transition-all duration-500"
              >
                <div className="text-amber-600 mb-6 group-hover:text-amber-500 transition-colors">
                  {adv.icon}
                </div>
                <h4 className="text-zinc-900 font-black text-sm mb-3 uppercase tracking-wider group-hover:text-white transition-colors">{adv.title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-400 transition-colors">{adv.text}</p>
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
    <section id="projects" className="section-padding bg-zinc-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
             <span className="text-amber-500 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Наши объекты</span>
             <h2 className="text-5xl md:text-8xl font-black text-white uppercase leading-[0.8] tracking-tighter">Наши <br /><span className="text-zinc-600 transition-colors hover:text-white">работы</span></h2>
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-4 text-white hover:text-amber-500 transition-all font-black uppercase text-xs tracking-widest"
          >
            {showAll ? 'Свернуть список' : 'Показать все работы'}
            <ChevronRight className={`w-5 h-5 transition-transform duration-500 ${showAll ? '-rotate-90' : 'rotate-90 group-hover:translate-y-1'}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative group aspect-[10/12] overflow-hidden bg-zinc-800 rounded-sm"
              >
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 blur-[0px] group-hover:blur-0"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="bg-amber-500/90 text-white font-black text-[9px] px-2 py-1 rounded-xs uppercase tracking-widest mb-3 inline-block">
                    {project.area}
                  </span>
                  <h3 className="text-white font-black text-xl uppercase leading-tight mb-2 tracking-tight">{project.title}</h3>
                  <p className="text-white/60 text-[10px] font-bold tracking-wider mt-2 group-hover:text-amber-400 transition-colors">
                    {project.description}
                  </p>
                  <div className="h-0.5 w-8 bg-amber-500 group-hover:w-full transition-all duration-500 mt-4"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <section id="contact" className="section-padding bg-zinc-50 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="bg-white p-10 md:p-16 card-shadow rounded-sm relative z-10 transition-all hover:translate-y-[-4px]">
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase mb-8 leading-none tracking-tighter">
                Сделайте первый <br />
                <span className="text-amber-600 italic">шаг</span>
              </h2>
              <p className="text-zinc-500 mb-10 text-lg font-light leading-relaxed">
                Наши эксперты помогут с выбором материала и расчетом объема. Оставьте заявку прямо сейчас.
              </p>

              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900 text-white p-10 text-center rounded-sm"
                >
                  <CheckCircle2 className="text-amber-500 w-16 h-16 mx-auto mb-6" />
                  <h3 className="text-white font-black uppercase text-xl mb-3 tracking-widest">Отправлено!</h3>
                  <p className="text-zinc-400 text-sm mb-8 font-medium">Мы свяжемся с вами в течение часа.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="bg-amber-500 text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-zinc-900 mb-2 transition-all"
                  >
                    Вернуться
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.2em] pl-1">Ваше имя</label>
                       <input 
                        required
                        type="text" 
                        placeholder="Александр" 
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-5 focus:border-amber-500 outline-none transition-colors placeholder:text-zinc-300 font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.2em] pl-1">Телефон</label>
                       <input 
                        required
                        type="tel" 
                        placeholder="+7 (___) ___-__-__" 
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-5 focus:border-amber-500 outline-none transition-colors placeholder:text-zinc-300 font-bold"
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                       <label className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.2em] pl-1">Ваш запрос</label>
                       <textarea 
                        placeholder="Например: расчет стоимости брусчатки..." 
                        rows={3}
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 p-5 focus:border-amber-500 outline-none transition-colors placeholder:text-zinc-300 font-bold resize-none"
                       ></textarea>
                  </div>
                  <button 
                    disabled={formState === 'loading'}
                    className="w-full bg-amber-500 hover:bg-zinc-900 text-white py-6 rounded-sm font-black uppercase text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 shadow-xl shadow-amber-500/20"
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
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t border-r border-amber-500/20 hidden lg:block"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b border-l border-amber-500/20 hidden lg:block"></div>
          </div>

          <div className="space-y-12">
            <div>
               <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Как нас найти</span>
               <h2 className="text-4xl font-black text-black uppercase mb-12">Центральный офис <br />и склады</h2>
               
               <div className="space-y-8">
                 <div className="flex gap-6 items-start">
                   <div className="p-4 bg-zinc-100 text-amber-500 rounded-sm">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <h4 className="text-black font-bold uppercase text-sm mb-1 tracking-wider">Адрес №1</h4>
                     <p className="text-zinc-500">г. Алматы, Бурундайская 47/5</p>
                     <p className="text-zinc-400 text-xs mt-1">Основной склад и производство</p>
                   </div>
                 </div>

                 <div className="flex gap-6 items-start">
                   <div className="p-4 bg-zinc-100 text-amber-500 rounded-sm">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <h4 className="text-black font-bold uppercase text-sm mb-1 tracking-wider">Адрес №2</h4>
                     <p className="text-zinc-500">Улица Райымбек батыра, 14</p>
                     <p className="text-zinc-400 text-xs mt-1">Офис продаж Alta Stroy</p>
                   </div>
                 </div>

                 <div className="flex gap-6 items-start">
                   <div className="p-4 bg-zinc-100 text-amber-500 rounded-sm">
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
                    className="bg-black text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-amber-500 transition-colors shadow-2xl"
                  >
                    К адресу 1
                  </a>
                  <a 
                    href="https://2gis.kz/almaty/geo/70000001101885981" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-amber-500 transition-colors shadow-2xl"
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
                  className={`w-14 md:w-24 aspect-square rounded-xs overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-amber-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
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
            <span className="text-amber-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-2 md:mb-4 block">{product.category}</span>
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
              className="flex-grow py-4 md:py-5 bg-amber-500 text-zinc-900 text-center text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-amber-500/10"
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

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['Все', 'Брусчатка', 'Сплитерные блоки', 'Плитка', 'Бордюры'];
  
  const filteredProducts = activeCategory === 'Все' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 6);

  return (
    <div className="space-y-16">
       {/* Category Filter */}
       <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-transparent text-zinc-400 hover:text-zinc-900 border border-zinc-200'}`}
            >
              {cat}
            </button>
          ))}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, idx) => (
              <ProductCard 
                key={product.title} 
                product={product} 
                index={idx} 
                onOpenGallery={(p) => setSelectedProduct(p)}
              />
            ))}
          </AnimatePresence>
       </div>

       {filteredProducts.length > 6 && (
         <div className="flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="group flex flex-col items-center gap-3 transition-all"
            >
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 group-hover:text-amber-600 transition-colors">
                 {showAll ? 'Скрыть лишнее' : 'Раскрыть подробный каталог'}
               </span>
               <div className={`w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center transition-all group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white text-zinc-400 ${showAll ? 'rotate-180' : ''}`}>
                  <ChevronRight size={20} className="rotate-90 translate-x-0.5" />
               </div>
            </button>
         </div>
       )}

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
                <div className="w-48 h-24">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1xZEiso_iPVg3LnveR_o20EyN_dtRhhLa" 
                    alt="Alta Stroy Logo" 
                    className="w-full h-full object-contain brightness-0 invert"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
             </div>
             <p className="text-zinc-400 text-sm leading-relaxed font-medium">
               Мы проектируем и производим бетонные изделия высокой прочности для частного и коммерческого строительства.
             </p>
             <div className="flex gap-4">
                <a href="https://www.instagram.com/altastroy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm hover:bg-amber-500 text-white transition-all"><Instagram size={18} /></a>
                <a href="https://wa.me/77479003331" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm hover:bg-amber-500 text-white transition-all"><MessageCircle size={18} /></a>
             </div>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-zinc-500 mb-8">Меню</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.name}><a href={link.href} className="text-zinc-400 hover:text-amber-500 text-sm font-bold transition-colors uppercase tracking-widest">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-zinc-500 mb-8">Разделы</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-400 hover:text-amber-500 text-sm font-bold transition-colors uppercase tracking-widest">Каталог цен</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-amber-500 text-sm font-bold transition-colors uppercase tracking-widest">Сертификаты</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-amber-500 text-sm font-bold transition-colors uppercase tracking-widest">Сотрудничество</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-amber-500 text-sm font-bold transition-colors uppercase tracking-widest">Доставка</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-zinc-500 mb-8">На связи</h4>
             <ul className="space-y-8">
                <li className="flex gap-4">
                   <Phone className="text-amber-500 shrink-0" size={20} />
                   <div className="flex flex-col">
                      <a href="tel:+77479003331" className="text-white font-black text-sm hover:text-amber-600 transition-colors">+7 (747) 900-33-31</a>
                      <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Отдел продаж</span>
                   </div>
                </li>
                <li className="flex gap-4">
                   <MapPin className="text-amber-500 shrink-0" size={20} />
                   <p className="text-zinc-400 text-sm font-medium">Алматы, Бурундайская 47/5 <br /><span className="text-zinc-500">Пн—Сб / 09:00—18:00</span></p>
                </li>
             </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <p className="text-zinc-500 text-[9px] uppercase font-black tracking-widest italic">© Alta Stroy 2013.</p>
              <p className="text-zinc-600 text-[8px] uppercase font-bold tracking-[0.3em] mt-1">
                Разработка: <a href="https://wa.me/77070700753" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">Alikhan Turdiev | development.kz</a>
              </p>
           </div>
           <div className="flex gap-10">
              <a href="#" className="text-zinc-500 hover:text-zinc-400 text-[9px] uppercase font-black tracking-widest transition-colors">Политика</a>
              <a href="#" className="text-zinc-500 hover:text-zinc-400 text-[9px] uppercase font-black tracking-widest transition-colors">Условия</a>
           </div>
        </div>
      </div>
    </footer>
  );
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
             <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-2 md:mb-4 block">Прайс-лист {new Date().getFullYear()}</span>
             <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Наши <span className="text-zinc-600">цены</span></h2>
           </div>
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 md:static text-white/50 hover:text-white transition-colors p-2 md:p-3 bg-white/5 rounded-full"
           >
             <X size={24} className="md:w-8 md:h-8" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 md:gap-y-12">
          {PRICE_DATA.map((section, idx) => (
            <div key={idx} className="space-y-5 md:space-y-6">
              <h3 className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] pb-3 md:pb-4 border-b border-white/10">
                {section.category}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1 group">
                    <div className="flex justify-between items-end gap-3 md:gap-4">
                      <span className="text-zinc-100 font-bold text-[10px] md:text-[11px] tracking-tight group-hover:text-amber-500 transition-colors uppercase">{item.name}</span>
                      <div className="flex-grow border-b border-white/5 border-dotted mb-1 md:mb-1.5 opacity-30"></div>
                      <span className="text-amber-500 font-black text-[10px] md:text-[11px] whitespace-nowrap">{item.price}</span>
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
             className="w-full md:w-auto px-10 py-5 bg-white text-zinc-900 text-center text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-white transition-all shadow-2xl"
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
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-amber-500 selection:text-white">
      <Navbar />
      
      <main>
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
                      <div className="w-48 h-48 bg-amber-500 absolute -top-10 -left-10 -z-10 opacity-10 blur-3xl rounded-full"></div>
                      <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter">
                        Строим <span className="text-amber-500 italic block">будущее</span>
                        <span className="text-zinc-200">вместе</span>
                      </h2>
                   </div>
                   <p className="text-zinc-600 text-xl leading-relaxed mb-10 font-light max-w-xl">
                     Alta Stroy — это производственный комплекс в Алматы, специализирующийся на высококачественных строительных материалах из бетона.
                   </p>
                   <div className="space-y-6 mb-12">
                      <div className="flex gap-4 items-start">
                         <div className="mt-1 bg-amber-500 rounded-full p-1"><CheckCircle2 size={12} className="text-white" /></div>
                         <p className="text-zinc-500 text-sm font-medium leading-relaxed">Собственный парк спецтехники и автоматизированные линии производства.</p>
                      </div>
                      <div className="flex gap-4 items-start">
                         <div className="mt-1 bg-amber-500 rounded-full p-1"><CheckCircle2 size={12} className="text-white" /></div>
                         <p className="text-zinc-500 text-sm font-medium leading-relaxed">Вся продукция сертифицирована согласно стандартам РК и ГОСТ.</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full border-4 border-amber-500/10 bg-zinc-900 flex items-center justify-center text-xs font-black text-amber-500 shadow-2xl">
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
                         <span className="block text-4xl font-black text-amber-500 mb-1">20+</span>
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
                  <span className="text-amber-600 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Наше производство</span>
                  <h2 className="text-5xl md:text-8xl font-black text-zinc-900 uppercase leading-[0.85] tracking-tighter">Весь <br /><span className="text-zinc-300">ассортимент</span></h2>
                </div>
                <div className="flex gap-4">
                   <button 
                     onClick={() => setIsPriceModalOpen(true)}
                     className="px-10 py-4 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl shadow-zinc-900/10"
                   >
                     Заказать прайс-лист
                   </button>
                </div>
             </div>

             <ProductList />
          </div>
        </section>

        <AdvantagesSection />
        <ProjectsSection />
        <ContactSection />
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
