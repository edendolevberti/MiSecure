import React from 'react';
import { ShieldCheck, Facebook, Twitter, Instagram, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-mi-orange p-1.5 rounded-lg text-white">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xl font-bold">MiSecure</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              שותף האבטחה הרשמי של שיאומי. מספקים פתרונות אבטחה מהשורה הראשונה לבתים ועסקים ברחבי העולם.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-mi-orange transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-mi-orange transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-mi-orange transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">מוצרים</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#indoor" onClick={(e) => handleScroll(e, 'indoor')} className="hover:text-mi-orange transition-colors">מצלמות פנים</a></li>
              <li><a href="#outdoor" onClick={(e) => handleScroll(e, 'outdoor')} className="hover:text-mi-orange transition-colors">מצלמות חוץ</a></li>
              <li><a href="#indoor" onClick={(e) => handleScroll(e, 'indoor')} className="hover:text-mi-orange transition-colors">מוניטורים לתינוק</a></li>
              <li><a href="#features" onClick={(e) => handleScroll(e, 'features')} className="hover:text-mi-orange transition-colors">תכונות ופיצ'רים</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">תמיכה</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="https://www.mi.com/global/support/guide/" target="_blank" rel="noopener noreferrer" className="hover:text-mi-orange transition-colors">מדריך התקנה (Xiaomi)</a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.xiaomi.smarthome" target="_blank" rel="noopener noreferrer" className="hover:text-mi-orange transition-colors">הורדת אפליקציה Mi Home</a></li>
              <li><a href="https://www.mi.com/global/service/warranty" target="_blank" rel="noopener noreferrer" className="hover:text-mi-orange transition-colors">אחריות בינלאומית</a></li>
              <li><a href="mailto:support@misecure.co.il" className="hover:text-mi-orange transition-colors">צור קשר במייל</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">ניוזלטר</h4>
            <p className="text-gray-400 text-sm mb-4">הירשמו לקבלת טיפים לאבטחה ומבצעים בלעדיים.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="הכנס אימייל"
                className="bg-gray-800 text-white px-4 py-2 rounded-r-lg focus:outline-none w-full text-sm"
              />
              <button type="submit" className="bg-mi-orange px-4 py-2 rounded-l-lg font-bold text-sm hover:bg-orange-600 transition-colors">
                הצטרף
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MiSecure. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">מדיניות פרטיות</a>
            <a href="#" className="hover:text-white">תנאי שימוש</a>
            {onAdminClick && (
              <button onClick={onAdminClick} className="flex items-center gap-1 hover:text-mi-orange transition-colors">
                <Lock size={14} />
                כניסת מנהל
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;