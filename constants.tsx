
import { Product } from './types';

const generateMockReviews = () => [
  { id: 'r1', user: 'Alex G.', rating: 5, comment: 'Sangat kencang untuk gaming!', date: '2023-10-01' },
  { id: 'r2', user: 'Siti W.', rating: 4, comment: 'Layar sangat jernih tapi baterai cepat habis.', date: '2023-10-05' },
];

export const PRODUCTS: Product[] = [
  // ASUS ROG
  ...Array.from({ length: 8 }).map((_, i) => {
    const phoneNum = i + 1;
    let imageUrl = `https://picsum.photos/seed/rog${i}/400/400`;
    
    // Mapping specific URLs provided by user
    switch (phoneNum) {
      case 1:
        imageUrl = "https://image2url.com/r2/default/images/1770169023506-c993f7ff-3397-4118-8e04-b1105c897a26.jpg";
        break;
      case 2:
        imageUrl = "https://image2url.com/r2/default/images/1770169127462-7b63aec3-0570-4e7c-a66d-6e2adf28e4c0.jpg";
        break;
      case 3:
        imageUrl = "https://image2url.com/r2/default/images/1770169220431-c0758a9c-f399-4c01-82c0-ea5c9258ed65.jpg";
        break;
      case 4:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwzLKVPXgG1VlsQqXcwjYg-4C_gK3EfDkjA&s";
        break;
      case 5:
        imageUrl = "https://image2url.com/r2/default/images/1770169273604-27e95b63-2a31-4fa6-87fe-6c85f1b8d2e3.jpg";
        break;
      case 6:
        imageUrl = "https://image2url.com/r2/default/images/1770169325608-2e73275e-bda2-4ad2-b90c-c02fc8fe5a77.jpg";
        break;
      case 7:
        imageUrl = "https://image2url.com/r2/default/images/1770169390717-70ad6a12-c6fc-4188-958a-da8a7be3b2e8.jpg";
        break;
      case 8:
        imageUrl = "https://image2url.com/r2/default/images/1770169489404-16b353df-7635-4fe9-8ed1-1b115e4f3d1f.jpg";
        break;
    }

    return {
      id: `rog-${phoneNum}`,
      brand: 'Asus',
      series: 'ROG Phone',
      name: `Asus ROG Phone ${phoneNum}`,
      price: 10000000 + (i * 1500000),
      image: imageUrl,
      description: `Ultimate gaming experience with ROG Phone ${phoneNum}. High refresh rate display and top-tier performance. Dirancang khusus untuk para hardcore gamers dengan sistem pendingin tercanggih di kelasnya. Memiliki AirTrigger yang sangat responsif untuk kendali permainan yang presisi.`,
      category: 'Phone' as const,
      rating: 4.5 + (Math.random() * 0.5),
      reviews: generateMockReviews(),
      specs: {
        "Processor": "Snapdragon 8 Gen Series",
        "RAM": "12GB / 16GB LPDDR5X",
        "Storage": "256GB / 512GB UFS 4.0",
        "Display": "6.78\" AMOLED 165Hz",
        "Battery": "6000mAh with 65W HyperCharge",
        "OS": "ROG UI based on Android"
      }
    };
  }),
  // IPHONE 5-17
  ...Array.from({ length: 13 }).map((_, i) => {
    const version = i + 5;
    let name = `iPhone ${version} Pro Max`;
    let imageUrl = `https://picsum.photos/seed/iphone${version}/400/400`;

    // Map specific iPhone URLs and Name changes
    switch (version) {
      case 5:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5VIxj5O4HGbzNWI4Ba5kqLFSOIkc8hQX03Q&s";
        break;
      case 6:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdTREKj-aBRDXdccJ8LMMQY7TF53xC_GLGAw&s";
        break;
      case 7:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_CqNCj93wofjGh-RnHRggQo_asuXzSQ-mQ&s";
        break;
      case 8:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6kCrOerGnIxiRNEHw0h1_NRjcOSp-L0CdBg&s";
        break;
      case 9:
        name = "iPhone XS";
        imageUrl = "https://officepro.id/image/cache/data/journal2/Catalogue/Image/Products/Technology/APPLE/XS%20MAX%20256GB-800x800.jpg";
        break;
      case 10:
        name = "iPhone XR";
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpdSdxOK35n1UhnrsTp10zGWgY_8P8QX6FQ&s";
        break;
      case 11:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2KFFRHb6ciz3nQQhTH-11s-QcAkCSSSnDA&s";
        break;
      case 12:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9siJZXBvzJXnBwYxBpGt568yvy6gNzWyiIA&s";
        break;
      case 13:
        imageUrl = "https://p.turbosquid.com/ts-thumb/zL/6lv9SA/9G/iphone13promaxblack/png/1642127541/1920x1080/fit_q87/c1b646c156071d577c36240dbe2ac5f2390d6565/iphone13promaxblack.jpg";
        break;
      case 14:
        imageUrl = "https://parto.id/asset/foto_produk/PAKET_BUNDLING_1_-_3,5_(6).PNG";
        break;
      case 15:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSymNlZque70fGtsDvei5np2Y6HkI_N6a8DLA&s";
        break;
      case 16:
        imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQInzI69QTfhKGZZJSTKjbTAdI4ZeJ5fhSBBw&s";
        break;
      case 17:
        imageUrl = "https://cdnpro.eraspace.com/media/catalog/product/i/p/iphone-17-pro-max-silver-1000_7_2.webp";
        break;
    }

    return {
      id: `iphone-${version}`,
      brand: 'Apple',
      series: 'iPhone',
      name: name,
      price: 5000000 + (i * 2000000),
      image: imageUrl,
      description: `The iconic ${name}. Beautiful design and powerful ecosystem integration. Hadir dengan sistem kamera Pro yang revolusioner, daya tahan baterai yang luar biasa, dan chip tercepat yang pernah ada di smartphone. Layar Super Retina XDR yang memukau memberikan pengalaman visual terbaik.`,
      category: 'Phone' as const,
      rating: 4.7,
      reviews: generateMockReviews(),
      specs: {
        "Chip": version >= 15 ? "A17 Pro / A18 Bionic" : "A-Series Bionic",
        "RAM": "6GB / 8GB",
        "Display": "Super Retina XDR OLED",
        "Camera": "Triple 48MP System",
        "Body": "Titanium / Stainless Steel",
        "Connector": version >= 15 ? "USB-C" : "Lightning"
      }
    };
  }),
  // SAMSUNG S to S21 Ultra
  ...Array.from({ length: 12 }).map((_, i) => {
    const model = i === 11 ? 'S21 Ultra' : `S${i + 10}`;
    return {
      id: `samsung-${i}`,
      brand: 'Samsung',
      series: 'Galaxy S',
      name: `Samsung Galaxy ${model}`,
      price: 8000000 + (i * 1200000),
      image: `https://picsum.photos/seed/samsung${i}/400/400`,
      description: `Premium Android experience with Samsung Galaxy ${model}. Incredible camera and display. Menawarkan fitur produktivitas terbaik dengan dukungan S-Pen pada model Ultra. Fotografi malam hari (Nightography) yang luar biasa dan zoom hingga 100x yang legendaris.`,
      category: 'Phone' as const,
      rating: 4.6,
      reviews: generateMockReviews(),
      specs: {
        "Processor": "Exynos / Snapdragon Dual Version",
        "Display": "Dynamic AMOLED 2X",
        "Refresh Rate": "120Hz Adaptive",
        "Camera": "108MP / 200MP Main Sensor",
        "Battery": "5000mAh",
        "Water Resistance": "IP68 Certified"
      }
    };
  }),
  // TECHNO POVA
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `pova-${i + 1}`,
    brand: 'Tecno',
    series: 'Pova',
    name: `Tecno Pova ${i + 1}`,
    price: 2500000 + (i * 500000),
    image: `https://picsum.photos/seed/pova${i}/400/400`,
    description: `Performance powerhouse at an affordable price. Pova ${i + 1} features a massive battery. Smartphone budget yang tidak kompromi pada performa gaming dan ketahanan baterai. Desain futuristik yang terinspirasi dari robotika mecha.`,
    category: 'Phone' as const,
    rating: 4.2,
    reviews: generateMockReviews(),
    specs: {
      "Processor": "MediaTek Helio / Dimensity",
      "Battery": "6000mAh / 7000mAh",
      "Charging": "45W Fast Charging",
      "Display": "IPS LCD 90Hz / 120Hz",
      "RAM": "8GB + Extended RAM",
      "Sound": "Dual Stereo Speakers"
    }
  })),
  // INFINIX (Sample)
  {
    id: 'infinix-gt20',
    brand: 'Infinix',
    series: 'GT',
    name: 'Infinix GT 20 Pro',
    price: 4500000,
    image: 'https://picsum.photos/seed/infinix/400/400',
    description: 'Infinix latest gaming focused smartphone with Cyber Mecha design. Dilengkapi dengan chip gaming khusus dan pencahayaan RGB yang dapat disesuaikan di bagian belakang. Menghadirkan frame rate stabil untuk game kompetitif.',
    category: 'Phone' as const,
    rating: 4.4,
    reviews: generateMockReviews(),
    specs: {
      "Processor": "Dimensity 8200 Ultimate",
      "Display": "AMOLED 144Hz",
      "Design": "Cyber Mecha with RGB",
      "Cooling": "VC Liquid Cooling",
      "Bypass Charging": "Supported",
      "RAM": "12GB LPDDR5X"
    }
  },
  // IPAD
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `ipad-${i + 1}`,
    brand: 'Apple',
    series: 'iPad',
    name: `iPad Pro Gen ${i + 1} M-Series`,
    price: 12000000 + (i * 2000000),
    image: `https://picsum.photos/seed/ipad${i}/400/400`,
    description: `The world's most versatile tablet. iPad Pro Gen ${i + 1} with stunning display and powerful processor. Alat kreativitas terbaik untuk desainer, editor video, dan mahasiswa. Dengan chip M-series yang memiliki performa setara komputer desktop.`,
    category: 'Tablet' as const,
    rating: 4.9,
    reviews: generateMockReviews(),
    specs: {
      "Chip": "Apple M1 / M2 / M4",
      "Display": "Liquid Retina XDR (mini-LED)",
      "Connector": "Thunderbolt / USB 4",
      "Accessories": "Apple Pencil 2 & Magic Keyboard",
      "Audio": "Four Speaker Audio",
      "Camera": "LiDAR Scanner Included"
    }
  })),
];
