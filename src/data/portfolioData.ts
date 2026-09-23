import { Project, PricingPlan, Testimonial, Certificate } from '../types';

/**
 * =========================================================================================
 * 📸 КАК ДА ДОБАВЯТЕ СНИМКИ / ЛИНКОВЕ КЪМ ПРОЕКТИТЕ:
 * =========================================================================================
 * Във всеки проект по-долу има масив `images: [ ... ]`.
 * 1. Първата снимка `images[0]` е ГЛАВНАТА корица, която се зарежда на началната страница.
 * 2. Всички следващи снимки се показват като малки интерактивни картинки (thumbnails) отдолу.
 * 3. При клик върху някоя от малките снимки, тя веднага се визуализира в главния контейнер!
 * 4. Можете да слагате директни интернет линкове (напр. "https://site.com/image.png")
 *    или локални файлове (напр. "/assets/my_image.png").
 * =========================================================================================
 */

export const projectsData: Project[] = [
  {
    id: 'yana-karnolska',
    title: 'Яна Кърнолска — Психолог',
    subtitle: 'Landing Page & Management Platform',
    category: 'Уеб Дизайн & Разработка',
    
    // 📸 СПИСЪК С ЛИНКОВЕ КЪМ СНИМКИТЕ:
    images: [
      'https://i.ibb.co/V0FyVc45/Screenshot-2026-09-23-004823.png',              // 1-ва (Главна снимка / Корица)
      'https://i.ibb.co/Qj9dzM2P/Screenshot-2026-09-23-005156.png',
      'https://i.ibb.co/qY5nY1TC/Screenshot-2026-09-23-005121.png',
      'https://i.ibb.co/CKX9Hhsd/Screenshot-2026-09-23-005058.png',
      'https://i.ibb.co/KxBD6d86/Screenshot-2026-09-23-005043.png',
      'https://i.ibb.co/3ymYTd44/Screenshot-2026-09-23-005020.png',
    ],
    thumbnail: 'https://i.ibb.co/V0FyVc45/Screenshot-2026-09-23-004823.png',

    client: 'Яна Кърнолска (Психолог & Психотерапевт)',
    year: '2024',
    role: 'UI/UX Дизайнер & Frontend Разработчик',
    shortDescription: 'Модерен и елегантен уебсайт с интерактивна форма за записване на часове, Telegram известия в реално време и динамична блог система.',
    fullDescription: 'Цялостен дизайн и разработка на персонален уебсайт и платформа за практиката на психолог Яна Кърнолска. Проектът създава топла, предразполагаща и защитена атмосфера за клиентите, съчетана с удобна автоматизация за терапевта чрез форма за резервации, автоматични Telegram известия и блог за статии.',
    problem: 'Нужда от топло, естетично и функционално дигитално присъствие, което да автоматизира записването на часове и комуникацията за сесии без тромава ръчна обработка.',
    solution: 'Разработен е изчистен и успокояващ дизайн с пастелни земни тонове, плавни Framer Motion анимации, интерактивен модал за резервации и директна интеграция с Telegram Bot API за моментални нотификации при нова заявка.',
    features: [
      'Естетичен и респонсив дизайн в успокояващи пастелни тонове с плавни Framer Motion анимации',
      'Интерактивна форма за записване на час (Booking Modal) с избор на вид услуга и дата',
      'Директни Telegram известия в реално време към терапевта при всяка нова резервация',
      'Динамична блог система за авторски статии с модален прозорец за четене и категории',
      'Пълна мобилна оптимизация за светкавично бързо зареждане на всякакви устройства',
      'Валидация на въведените клиентски данни в реално време и защитена сигурност'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Telegram Bot API', 'Lucide React', 'Vite', 'Figma'],
    liveUrl: 'https://yanakarnolska.bg',
    githubUrl: 'https://github.com/viktorShandrov/Qna_Karnolska_Landing',
    gallery: [
      {
        title: 'Начален екран (Hero Section)',
        description: 'Топло представяне с акцент върху доверието, спокойствието и личния контакт.',
        image: 'https://i.ibb.co/V0FyVc45/Screenshot-2026-09-23-004823.png'
      },
      {
        title: 'Модул за запазване на час (Booking Modal)',
        description: 'Интерактивен избор на услуга, дата и час с моментални Telegram известия.',
        image: 'https://i.ibb.co/Qj9dzM2P/Screenshot-2026-09-23-005156.png'
      }
    ]
  },
  {
    id: 'gratsiela-art',
    title: 'Gratsiela Art — Онлайн Галерия & E-Commerce',
    subtitle: 'Платформа за авторско изкуство, картини и дигитални продукти',
    category: 'Full-Stack E-Commerce & Галерия',
    
    // 📸 СПИСЪК С ЛИНКОВЕ КЪМ СНИМКИТЕ:
    images: [
      'https://i.ibb.co/Xf1b9z2g/Screenshot-2026-09-23-005646.png',           // 1-ва (Главна снимка / Корица)
      'https://i.ibb.co/mCnZ6hV0/Screenshot-1.png',
      'https://i.ibb.co/4nJbkk9B/Screenshot-2026-09-23-005827.png',
      'https://i.ibb.co/N2PKRbRX/Screenshot-2026-09-23-005806.png',
      'https://i.ibb.co/rfTjt848/Screenshot-2026-09-23-005738.png',
      'https://i.ibb.co/hRrkTL0Y/Screenshot-2026-09-23-005711.png',
    ],
    thumbnail: 'https://i.ibb.co/Xf1b9z2g/Screenshot-2026-09-23-005646.png',

    client: 'Грациела Иванова (Художник & Творец)',
    year: '2024',
    role: 'Full-Stack Developer & UI/UX Архитект',
    shortDescription: 'Премиум уеб платформа и онлайн магазин за авторско изкуство със Stripe Checkout, защитени дигитални сваляния, двуезичност (BG/EN) и Dashboard.',
    fullDescription: 'Цялостна уеб платформа и електронен магазин за представяне и продажба на оригинални картини, лимитирани арт принтове и дигитални арт ръководства за художника Грациела Иванова. Проектът съчетава луксозна естетика (тъмен режим с акценти от шампанско и злато) със стабилна бекенд архитектура за автоматизирани плащания и сигурно стриймване на дигитално съдържание.',
    problem: 'Нужда от независим контрол върху представянето и директните продажби на творбите без платформени такси, комисионни или тромави готови CMS системи (като WordPress/WooCommerce).',
    solution: 'Разработен е къстъм Full-Stack софтуер с Express.js бекенд, Stripe Checkout & Webhook интеграция за надеждни трансакции, адаптивен слой за база данни (PostgreSQL / JSON), защитени еднократни линкове за дигитални сваляния и цялостен Dashboard за управление.',
    features: [
      'Хибриден e-commerce каталог за оригинални картини, принтове и дигитални продукти',
      'Автоматизирани онлайн плащания със Stripe Checkout и асинхронен Webhook слушател',
      'Защитено стриймване и еднократни линкове за сваляне на дигитални арт продукти',
      'Цялостен администраторски панел (Dashboard) за CRUD управление на творби и поръчки',
      'Автоматични трансакционни имейли за потвърждение чрез Nodemailer',
      'Двуезичен интерфейс (Български / Английски) и SEO оптимизация с OpenGraph'
    ],
    techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'Stripe API', 'Nodemailer', 'JavaScript ES6+', 'HTML5', 'CSS3'],
    liveUrl: 'https://gratsiela.art',
    githubUrl: 'https://github.com/viktorShandrov/Gratsiela',
    gallery: [
      {
        title: 'Главна галерия и каталог',
        description: 'Премиум тъмна визия с акцент върху детайла и текстурите на авторските картини.',
        image: 'https://i.ibb.co/Xf1b9z2g/Screenshot-2026-09-23-005646.png'
      },
      {
        title: 'Администраторски панел (Dashboard)',
        description: 'Защитено управление на продукти, клиентски поръчки и промо кодове.',
        image: 'https://i.ibb.co/mCnZ6hV0/Screenshot-1.png'
      }
    ]
  },
  {
    id: 'easy-domoupravitel',
    title: 'Easy Domoupravitel — Управление на входове',
    subtitle: 'SaaS платформа за дигитално и прозрачно управление на етажна собственост',
    category: 'SaaS Платформа & Full-Stack App',
    
    // 📸 СПИСЪК С ЛИНКОВЕ КЪМ СНИМКИТЕ:
    images: [
      'https://i.ibb.co/Cs61ggwm/Gemini-Generated-Image-23s5hu23s5hu23s5.jpg',
      'https://i.ibb.co/G40RjGyb/Screenshot-20.png',
      'https://i.ibb.co/yBs0xDBq/Screenshot-19.png',
      'https://i.ibb.co/4ZrZyymS/Screenshot-18.png',
      'https://i.ibb.co/Pv7cdBj5/Screenshot-17.png',
      'https://i.ibb.co/W43mX3tR/Screenshot-16.png',
      'https://i.ibb.co/LdYb97Hs/Screenshot-15.png',
      'https://i.ibb.co/6JDwpcFw/Screenshot-14.png',
      'https://i.ibb.co/rKk0mhfc/Screenshot-13.png',
      'https://i.ibb.co/tWcQ8TT/Screenshot-12.png',
      'https://i.ibb.co/67k1Pr2S/Screenshot-11.png',
      'https://i.ibb.co/m5Z9p3KK/Screenshot-10.png',
      'https://i.ibb.co/cK2Yb6Bt/Screenshot-9.png',
      'https://i.ibb.co/qYyLRxZZ/Screenshot-8.png',
      'https://i.ibb.co/nM6XBSLX/Screenshot-7.png'
    ],
    thumbnail: 'https://i.ibb.co/G40RjGyb/Screenshot-20.png',

    client: 'Easy Domoupravitel (Етажна Собственост)',
    year: '2024',
    role: 'Full-Stack SaaS Архитект & Разработчик',
    shortDescription: 'Цялостна SaaS платформа за прозрачно управление на жилищни сгради с автоматично начисляване на такси, портал за живущите с QR код, Telegram известия за аварии и PDF ведомости.',
    fullDescription: 'Easy Domoupravitel е модерна Full-Stack платформа, разработена да замени остарелите тетрадки и хаотични Excel таблици с цялостна автоматизация за домоуправители и живущи. Системата предлага автоматично разпределяне и начисляване на месечни такси, публичен портал за преглед на задълженията без сложна регистрация, система за подаване на сигнали за повреди с мигновени Telegram известия и 1-click експорт на месечни финансови отчети в PDF формат.',
    problem: 'Липса на прозрачност за събраните средства и разходи във входа, хаос и грешки при изчисляване на таксите според брой живущи/асансьор, пропуснати сигнали за аварии и часове ръчна работа по месечните отчети.',
    solution: 'Разработено е Next.js уеб приложение с Prisma ORM и PostgreSQL, което автоматизира целия цикъл: от начисляване на такси и депозити, през директни Telegram нотификации при подаден сигнал, до готов за печат PDF месечен отчет.',
    features: [
      'Централизирано управление на сгради, входове и детайлни профили на апартаменти',
      'Автоматично начисляване на месечни такси и фонд ремонти според зададени правила',
      'Публичен портал за живущите с персонален линк и QR код за проверка на задължения',
      'Система за подаване на сигнали за повреди с моментални Telegram бот известия',
      'Автоматично генериране на месечни финансови отчети и ведомости в готов за печат PDF',
      'Аналитичен Dashboard за домоуправителя с графики за приходи, разходи и събираемост'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'PostgreSQL', 'Telegram Bot API', 'Radix UI'],
    liveUrl: '',
    githubUrl: 'https://github.com/viktorShandrov/easy_domoupravitel',
    gallery: [
      {
        title: 'Главно табло на домоуправителя (Dashboard)',
        description: 'Преглед на текущия баланс, приходи, разходи и статистика за събираемостта на входа.',
        image: 'https://i.ibb.co/G40RjGyb/Screenshot-20.png'
      },
      {
        title: 'Управление на апартаменти и начислени такси',
        description: 'Пълен списък на имотите, брой обитатели, депозити и текущи задължения.',
        image: 'https://i.ibb.co/yBs0xDBq/Screenshot-19.png'
      }
    ]
  },
  {
    id: 'align-us',
    title: 'AlignUs — Group Meeting Scheduler',
    subtitle: 'Платформа за координиране на срещи и наличности в реално време',
    category: 'SaaS Платформа & Full-Stack App',
    
    // 📸 СПИСЪК С ЛИНКОВЕ КЪМ СНИМКИТЕ:
    images: [
      'https://i.ibb.co/9kDdFCYs/Screenshot-2.png',               // 1-ва (Главна снимка / Корица)
      'https://i.ibb.co/gZLp8f3S/Screenshot-3.png',
      'https://i.ibb.co/1jGb1rH/Screenshot-4.png',
      // 'https://i.ibb.co/YBfGbkbw/Screenshot-5.png',
      'https://i.ibb.co/21H9H41H/Screenshot-6.png',
    ],
    thumbnail: 'https://i.ibb.co/9kDdFCYs/Screenshot-2.png',

    client: 'AlignUs Productivity',
    year: '2024',
    role: 'Full-Stack Architect & Lead Engineer',
    shortDescription: 'Високопроизводително SaaS приложение за планиране на групови срещи с интерактивни топлинни карти (heatmaps), AI алгоритъм за препоръка на слотове и синхронизация в реално време.',
    fullDescription: 'AlignUs е модерно SaaS уеб приложение, проектирано да елиминира безкрайната комуникация и часовите несъответствия при организиране на срещи между екипи. Платформата предоставя визуален drag-and-drop календар за наличности, автоматично изчисляване на топлинни карти на съвпаденията (Heatmap), интелигентен алгоритъм за препоръка на най-добрите интервали, 1-click експорт към Google/Outlook календари и вграден аналитичен Dashboard в реално време.',
    problem: 'Тромава координация при насрочване на срещи в големи екипи, водеща до десетки съобщения в чата, объркани часови зони и изгубено време.',
    solution: 'Разработка на бърз интерактивен интерфейс с Optimistic UI и Drizzle ORM / Serverless PostgreSQL бекенд, който визуализира общата наличност като топлинна карта и автоматично препоръчва оптималните часови интервали.',
    features: [
      'Интерактивен Drag & Drop календар за избор на свободни часови слотове с 30-минутна прецизност',
      'Динамична топлинна карта (Heatmap) за моментална визуализация на груповата наличност',
      'Smart Match алгоритъм (findBestSlotWindows) за автоматична препоръка на най-добрите интервали',
      'Защита на самоличността на участниците чрез Persistent Device UUID без нужда от регистрация',
      'Оптимистичен UI и фонова синхронизация с база данни в реално време',
      'Вграден аналитичен Dashboard за проследяване на ангажираността и ключови KPI метрики'
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Drizzle ORM', 'PostgreSQL', 'Framer Motion', 'Lucide Icons'],
    liveUrl: 'https://alignus.app',
    githubUrl: 'https://github.com/viktorShandrov/AlignUs',
    gallery: [
      {
        title: 'Интерактивна топлинна карта (Heatmap)',
        description: 'Визуализация на груповата наличност в реално време с препоръка на топ интервали.',
        image: 'https://i.ibb.co/9kDdFCYs/Screenshot-2.png'
      },
      {
        title: 'Аналитичен Dashboard за активност',
        description: 'Проследяване на сесии, запазени наличности и ключови метрики в реално време.',
        image: 'https://i.ibb.co/gZLp8f3S/Screenshot-3.png'
      }
    ]
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic-site',
    name: 'Инфо & Снимки (Сайт-визитка)',
    price: '75 €',
    description: 'Идеално за личен сайт, портфолио или презентация само с информация, снимки и контакти.',
    features: [
      'Модерен дизайн с информация & снимки',
      'Адаптивен за всички видове мобилни устройства и компютри',
      'Форма за бърз контакт и социални мрежи',
      'Базова оптимизация за бързина и Google SEO',
      'Качване на хостинг и настройка на домейн'
    ],
    deliveryTime: '2-4 дни'
  },
  {
    id: 'dynamic-content',
    name: 'Продукти & Статии (Динамичен)',
    price: '100 €',
    popular: true,
    description: 'За сайтове с динамично съдържание – добавяне на продукти, блог със статии или каталог с услуги.',
    features: [
      'Всичко включено от предходния план',
      'Каталог / Секция за добавяне на продукти',
      'Динамичен блог за публикации и статии',
      'Интерактивни категории и филтри',
      'Лесно управление и редакция на съдържанието'
    ],
    deliveryTime: '4-7 дни'
  },
  {
    id: 'ecommerce-complex',
    name: 'Плащания & Сложни Системи',
    price: '125 €',
    description: 'За проекти с онлайн плащания (Stripe), автоматични резервации, ботове или сложна логика.',
    features: [
      'Всичко включено от предходните планове',
      'Интеграция на сигурни онлайн плащания (Stripe)',
      'Интерактивно запазване на часове / поръчки',
      'Telegram известия в реално време при заявки',
      'Специфични интеграции и персонализирани функции'
    ],
    deliveryTime: '7-12 дни'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Яна Кърнолска',
    role: 'Психолог & Психотерапевт',
    company: 'Частна практика гр. София',
    content: 'Виктор създаде уебсайт, който надмина всичките ми очаквания! Клиентите ми постоянно споделят колко красив и лесен за запазване на час е сайтът. Автоматичните Telegram известия за часове са невероятно удобство. Професионално отношение и бърза работа!',
    rating: 5
  },
  {
    id: '2',
    name: 'Грациела Иванова',
    role: 'Художник & Визуален артист',
    company: 'Gratsiela Art Studio',
    content: 'Виктор изгради платформа, която представя картините ми по невероятно елегантен начин. Stripe плащанията и автоматичното изпращане на дигиталните файлове спестяват часове ръчна работа всеки ден. Истински професионализъм!',
    rating: 5
  },
  {
    id: '3',
    name: 'Мартин Димитров',
    role: 'Product Lead',
    company: 'SyncFlow Team',
    content: 'AlignUs спестява часове на екипа ни всяка седмица при насрочване на срещи с клиенти и колеги от различни часови зони. Топлинната карта и моменталната синхронизация правят планирането истинско удоволствие!',
    rating: 5
  }
];

export const certificatesData: Certificate[] = [
  {
    id: 'js-backend',
    title: 'JS Back-End',
    issuer: 'Software University',
    date: 'Май 2023',
    grade: '6.00 / 6.00',
    image: '/assets/certificates/cert-js-backend.jpg',
    verifyUrl: 'https://softuni.bg/Certificates/Details/175231/4de14651',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB']
  },
  {
    id: 'angular',
    title: 'Angular',
    issuer: 'Software University',
    date: 'Юни 2023',
    grade: '6.00 / 6.00',
    image: '/assets/certificates/cert-angular.jpg',
    verifyUrl: 'https://softuni.bg/Certificates/Details/182995/187c2304',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Routing']
  },
  {
    id: 'html-css',
    title: 'HTML & CSS',
    issuer: 'Software University',
    date: 'Септември 2023',
    grade: '6.00 / 6.00',
    image: '/assets/certificates/cert-html-css.jpg',
    verifyUrl: 'https://softuni.bg/Certificates/Details/190872/6c6b321e',
    skills: ['HTML5', 'CSS3', 'Responsive Design']
  },
  {
    id: 'react',
    title: 'ReactJS',
    issuer: 'Software University',
    date: 'Октомври 2023',
    grade: '6.00 / 6.00',
    image: '/assets/certificates/cert-react.jpg',
    verifyUrl: 'https://softuni.bg/Certificates/Details/197867/373cd984',
    skills: ['React', 'Hooks', 'State Management']
  }
];

