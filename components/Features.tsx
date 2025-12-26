import React from 'react';
import { Moon, Shield, Wifi, Smartphone, Sun, Eye } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Moon className="w-8 h-8 text-mi-orange" />,
      title: "ראיית לילה משופרת",
      description: "ראו בבירור בחושך מוחלט עם נוריות אינפרא-אדום ברגישות גבוהה ומצב לילה צבעוני בדגמים נבחרים."
    },
    {
      icon: <Shield className="w-8 h-8 text-mi-orange" />,
      title: "זיהוי אדם AI",
      description: "אלגוריתמים חכמים מסננים התראות שווא מחיות מחמד או חרקים, ומתריעים רק כשזה באמת חשוב."
    },
    {
      icon: <Wifi className="w-8 h-8 text-mi-orange" />,
      title: "Wi-Fi בתדר כפול",
      description: "חיבור אמין עם תמיכה ברשתות 2.4GHz ו-5GHz להזרמת וידאו חלקה יותר."
    },
    {
      icon: <Sun className="w-8 h-8 text-mi-orange" />,
      title: "עמידות למזג אוויר",
      description: "דירוג IP66 מבטיח שמצלמות החניה והחוץ שלך יעמדו בגשם, אבק ושמש."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-mi-orange" />,
      title: "אפליקציית Mi Home",
      description: "שלטו בכל מהטלפון. צפו בשידורים חיים, נגנו הקלטות, ודברו בזמן אמת."
    },
    {
      icon: <Eye className="w-8 h-8 text-mi-orange" />,
      title: "רזולוציית 2K ו-4K",
      description: "תפסו כל פרט עם עדשות בחדות גבוהה המספקות בהירות טובה עד פי 4 מ-1080p."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">למה לבחור באבטחה של שיאומי?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            שילוב של חומרה מתקדמת עם תוכנה אינטליגנטית כדי לספק את השקט הנפשי האולטימטיבי לנכס שלך.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;