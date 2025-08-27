import { BlogPost } from '@/app/_lib/interfaces/blog';
import { config } from '@/app/_lib/interfaces/config';
import { Plan } from '@/app/_lib/interfaces/home';
import { Locale } from '@/i18n/config';
import { http, HttpResponse } from 'msw';

const API_URL = config.apiUrl;

export const handlers = [
  http.get(API_URL + 'blog', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const locale = searchParams.get('locale') as Locale;

    let posts: BlogPost[] = [];
    if (locale === 'en') {
      posts = [
        {
          id: 1,
          title: 'Top Benefits of Renovating Your Home from Scratch',
          content:
            'Renovating your home from the ground up allows you to design each room exactly how you want it, maximizing both functionality and style. It’s an opportunity to modernize outdated systems like plumbing and electrical wiring, improving safety and efficiency. Starting fresh also means better insulation and energy savings over time. You can choose materials, layouts, and finishes that match your lifestyle and increase your home’s market value. Most importantly, a full renovation creates a space that truly feels like yours — built for comfort, durability, and beauty.',
        },
        {
          id: 2,
          title: 'Why Professional Electrical Work Matters',
          content:
            "Electrical work isn’t just about powering your lights — it’s about safety and long-term reliability. Faulty wiring or DIY mistakes can lead to costly damage, system failures, or even fire hazards. Professional electricians ensure every connection is secure and up to code, whether you're rewiring a home or installing new fixtures. With expert help, you can plan your power layout for convenience, efficiency, and smart home upgrades. Investing in licensed electrical work brings peace of mind and protects your home for years to come.",
        },
        {
          id: 3,
          title: 'Choosing the Right Flooring: Tiles vs Laminate',
          content:
            'Tile and laminate flooring each offer unique benefits depending on your needs. Tiles are water-resistant, durable, and perfect for kitchens, bathrooms, and high-traffic areas. Laminate is more cost-effective, easier to install, and offers the warm look of wood without the maintenance. Your lifestyle, room usage, and budget should guide your choice. A professional can help you compare materials and ensure flawless installation no matter what flooring you choose.',
        },
        {
          id: 4,
          title: 'Stretch Ceilings: Modern Elegance with Practical Benefits',
          content:
            'Stretch ceilings are a sleek, low-maintenance solution to update your home’s interior. Made from PVC or fabric, they can hide imperfections, wiring, or old plaster while adding a clean, modern look. They’re moisture-resistant, easy to clean, and available in countless colors and finishes — from matte to glossy to printed designs. Installation is fast and mess-free compared to traditional ceiling repairs. Stretch ceilings combine style and function, making them a popular choice for both residential and commercial spaces.',
        },
      ];
    } else if (locale === 'uk') {
      posts = [
        {
          id: 1,
          title: 'Основні переваги повної реконструкції вашого дому',
          content:
            'Реконструкція будинку з нуля дозволяє спроєктувати кожну кімнату саме так, як ви хочете, максимально використовуючи функціональність і стиль. Це можливість модернізувати застарілі системи, як-от сантехніка та електропроводка, підвищивши безпеку й ефективність. Новий початок також означає кращу ізоляцію та економію енергії з часом. Ви можете обирати матеріали, планування та оздоблення, які відповідають вашому стилю життя та підвищують ринкову вартість житла. Найголовніше — повна реконструкція створює простір, який справді відчувається вашим, побудований для комфорту, довговічності й краси.',
        },
        {
          id: 2,
          title: 'Чому професійні електромонтажні роботи мають значення',
          content:
            'Електромонтажні роботи — це не лише про світло, а й про безпеку та довгострокову надійність. Неправильна проводка чи помилки при самостійному монтажі можуть призвести до дорогих поломок, збоїв у системі або навіть пожежі. Професійні електрики гарантують, що кожне з’єднання буде безпечним і відповідатиме нормам — чи то при заміні проводки, чи при встановленні нових приладів. За допомогою фахівців ви можете спланувати електричну мережу для зручності, ефективності та підготовки до «розумного дому». Інвестиції у ліцензовані роботи дають спокій і захищають ваш дім на довгі роки.',
        },
        {
          id: 3,
          title: 'Як обрати підлогу: плитка чи ламінат',
          content:
            'Плитка й ламінат мають свої переваги залежно від ваших потреб. Плитка — водостійка, міцна й чудово підходить для кухонь, ванних кімнат та зон із високим навантаженням. Ламінат більш доступний за ціною, простіший у монтажі й створює затишний вигляд деревини без складного догляду. Ваш спосіб життя, призначення кімнати та бюджет мають визначати вибір. Фахівець допоможе порівняти матеріали й забезпечити ідеальне укладання, незалежно від того, що ви оберете.',
        },
        {
          id: 4,
          title: 'Натяжні стелі: сучасна елегантність із практичними перевагами',
          content:
            'Натяжні стелі — це стильне та невибагливе рішення для оновлення інтер’єру. Виготовлені з ПВХ або тканини, вони приховують нерівності, проводку чи стару штукатурку, додаючи простору сучасного вигляду. Вони стійкі до вологи, легко миються й доступні в безлічі кольорів і фактур — від матових до глянцевих та з друкованими візерунками. Монтаж швидкий і без бруду порівняно з традиційним ремонтом стель. Натяжні стелі поєднують стиль і практичність, тому є популярним вибором як для житлових, так і для комерційних приміщень.',
        },
      ];
    }

    return HttpResponse.json({ posts });
  }),
  http.get(API_URL + 'plan', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const locale = searchParams.get('locale') as Locale;

    let plans: Plan[] = [];
    if (locale === 'en') {
      plans = [
        {
          id: '1',
          title: 'Essential Renovation (Budget-Friendly)',
          description: 'Perfect for small updates and quick refreshes.',
          price: 100,
          features: [
            'Wallpapering & painting',
            'Laminate flooring installation',
            'Basic tiling (bathroom/kitchen splash zones)',
            'Minor electrical & plumbing adjustments',
            'Clean, durable finish',
          ],
        },
        {
          id: '2',
          title: 'Complete Renovation (Most Popular)',
          description:
            'A full-service package for major room updates. Includes everything in Essential, plus',
          price: 200,
          features: [
            'Full bathroom or kitchen renovation (plumbing, tiling, fixtures)',
            'Stretch ceiling installation',
            'Custom cabinetry for storage optimization',
            'Electrical system upgrades (lighting, outlets)',
            'Detailed project management with clear timelines',
          ],
        },
        {
          id: '3',
          title: 'Premium Renovation (Luxury & Custom Design)',
          description:
            'Tailored for full-home remodels and high-end finishes. Includes everything in Complete, plus:',
          price: 300,
          features: [
            'Entire home renovation from scratch',
            'Custom kitchen design & installation',
            'Built-in wardrobes and cabinets (made-to-measure)',
            'Advanced electrical & smart-home solutions',
            'Premium materials & finishes (tiles, flooring, décor)',
            'Personal design consultation and style matching',
          ],
        },
      ];
    } else if (locale === 'uk') {
      plans = [
        {
          id: '1',
          title: 'Базовий ремонт (економний варіант)',
          description: 'Ідеально підходить для невеликих оновлень і швидкого оновлення інтер’єру.',
          price: 100,
          features: [
            'Поклейка шпалер та фарбування',
            'Монтаж ламінату',
            'Базове укладання плитки (ванна/кухня, робочі зони)',
            'Незначні електромонтажні та сантехнічні роботи',
            'Акуратне та довговічне оздоблення',
          ],
        },
        {
          id: '2',
          title: 'Комплексний ремонт (найпопулярніший)',
          description:
            'Повний пакет послуг для масштабного оновлення кімнат. Містить усе з пакету "Базовий", а також:',
          price: 200,
          features: [
            'Повний ремонт ванної або кухні (сантехніка, плитка, обладнання)',
            'Монтаж натяжних стель',
            'Виготовлення та встановлення меблів для оптимізації зберігання',
            'Оновлення електросистеми (освітлення, розетки)',
            'Детальне управління проєктом із чіткими термінами',
          ],
        },
        {
          id: '3',
          title: 'Преміум ремонт (люкс та індивідуальний дизайн)',
          description:
            'Створений для капітальної реконструкції всього будинку та елітних рішень. Містить усе з пакету "Комплексний", а також:',
          price: 300,
          features: [
            'Повна реконструкція будинку з нуля',
            'Індивідуальний проєкт та монтаж кухні',
            'Вбудовані шафи та меблі на замовлення',
            'Розширені електричні та smart-home рішення',
            'Преміум-матеріали та оздоблення (плитка, підлога, декор)',
            'Персональна консультація дизайнера та підбір стилю',
          ],
        },
      ];
    }

    return HttpResponse.json({ plans });
  }),
];
