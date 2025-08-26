import { BlogPost } from '@/app/_lib/interfaces/blog';
import { config } from '@/app/_lib/interfaces/config';
import { Plan } from '@/app/_lib/interfaces/home';
import { http, HttpResponse } from 'msw';

const API_URL = config.apiUrl;

export const handlers = [
  http.get(API_URL + 'blog', () => {
    const posts: BlogPost[] = [
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
    return HttpResponse.json({ posts });
  }),
  http.get(API_URL + 'plan', () => {
    const plans: Plan[] = [
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
    return HttpResponse.json({ plans });
  }),
];
