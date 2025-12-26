import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'mi-360-2k',
    name: 'מצלמת אבטחה ביתית Mi 360° 2K',
    category: 'indoor',
    price: 199,
    description: 'איכות תמונה 2K חדה במיוחד עם ניטור 360°. מושלם לסלון ולניטור תינוקות.',
    features: ['צילום 360°', 'רזולוציית 2K', 'זיהוי בני אדם ב-AI', 'שמע דו-כיווני'],
    imageUrl: 'https://picsum.photos/400/400?random=1',
    resolution: '2304 x 1296'
  },
  {
    id: 'mi-outdoor-aw300',
    name: 'מצלמת חוץ Xiaomi AW300',
    category: 'outdoor',
    price: 249,
    description: 'ראיית לילה צבעונית 2K עם עמידות למים ואבק בתקן IP66. אידיאלי לחניה ולחצר.',
    features: ['ראיית לילה צבעונית', 'עמידות למים IP66', 'הגדרת אזורי מיקוד', 'אזעקה קולית ואור'],
    imageUrl: 'https://picsum.photos/400/400?random=2',
    resolution: '2K'
  },
  {
    id: 'mi-c200',
    name: 'מצלמה חכמה Xiaomi C200',
    category: 'indoor',
    price: 149,
    description: '1080p Full HD עם תמיכה בראיית לילה. פתרון קומפקטי לכל חדר.',
    features: ['1080p HD', 'ראיית לילה אינפרא-אדום', 'זיהוי תנועה', 'עובד עם Google Home'],
    imageUrl: 'https://picsum.photos/400/400?random=3',
    resolution: '1920 x 1080'
  },
  {
    id: 'mi-solar-bw400',
    name: 'מצלמה סולארית חיצונית BW400',
    category: 'outdoor',
    price: 549,
    description: 'אבטחה ללא חוטים המופעלת סולארית עם מחשוב חכם ובהירות 2.5K.',
    features: ['מופעל סולארית', 'אלחוטי', 'רזולוציית 2.5K', 'זווית רחבה 132°'],
    imageUrl: 'https://picsum.photos/400/400?random=4',
    resolution: '2.5K'
  },
  {
    id: 'mi-c400',
    name: 'מצלמה חכמה Xiaomi C400',
    category: 'indoor',
    price: 229,
    description: 'אבטחת 4MP משודרגת עם תכונות זיהוי AI ותמיכה ב-Wi-Fi כפול.',
    features: ['חדות 4MP', 'Wi-Fi בתדר כפול', 'סיבוב 360°', 'מצב פרטיות'],
    imageUrl: 'https://picsum.photos/400/400?random=5',
    resolution: '2560 x 1440'
  },
  {
    id: 'mi-magnetic',
    name: 'מצלמת Mi 2K (תושבת מגנטית)',
    category: 'indoor',
    price: 119,
    description: 'תושבת מגנטית רב-תכליתית המאפשרת למקם את מצלמת ה-2K הקומפקטית בכל מקום.',
    features: ['בסיס מגנטי', 'זווית רחבה 125°', 'תמונת 2K', 'Motion Lapse'],
    imageUrl: 'https://picsum.photos/400/400?random=6',
    resolution: '2K'
  }
];

export const SYSTEM_INSTRUCTION = `
You are 'MiBot', a specialized sales assistant for MiSecure, a Xiaomi surveillance camera retailer in Israel.
Your goal is to help customers choose the right camera for their Home (indoor) or Garage (outdoor).
You MUST speak in Hebrew.

Here is the current product catalog:
${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, category: p.category, price: p.price, features: p.features })))}

Rules:
1. Be polite, concise, and helpful. Speak Hebrew naturally.
2. If a user asks for an outdoor or garage camera, recommend the 'Outdoor' category products.
3. If a user asks for a baby monitor or living room camera, recommend 'Indoor' products.
4. Highlight features like Night Vision, 2K resolution, and AI detection.
5. If asked about prices, quote the specific price from the catalog in NIS (₪).
6. Do not mention competitors. Focus only on Xiaomi products.
`;