import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-50">
      {/* Background Container with Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[40s] ease-linear hover:scale-110 scale-100"
          style={{ 
            backgroundImage: `url('https://cdn.webshopapp.com/shops/256009/files/431875309/xiaomi-xiaomi-smart-camera-c200.jpg')`
          }}
        />
        
        {/* Very subtle gradient to ensure text readability without hiding the product */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/10 to-transparent"></div>
        
        {/* Mobile bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center md:text-right pt-20 flex flex-col justify-center h-full">
        <div className="max-w-3xl mr-auto md:mr-0 ml-auto">
          <div className="flex justify-center md:justify-start">
            <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 bg-mi-orange rounded-full animate-pulse"></span>
              חדש: סדרת ה-4K Pro
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            הבית שלך,<br />
            <span className="text-mi-orange">
              חד יותר מאי פעם.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl md:ml-0 md:mr-0 mx-auto drop-shadow-md font-medium text-shadow">
            גלה את המצלמה החדשה ברזולוציית 4K.
            זיהוי בינה מלאכותית, מעקב תנועה חכם ואיכות תמונה עוצרת נשימה.
            האבטחה של המחר, אצלך היום.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#indoor"
              onClick={(e) => handleScroll(e, '#indoor')}
              className="group bg-mi-orange hover:bg-orange-600 text-white text-lg font-bold px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-1"
            >
              לרכישה עכשיו
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              onClick={(e) => handleScroll(e, '#features')}
              className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white text-lg font-medium px-8 py-4 rounded-full transition-all text-center flex items-center justify-center"
            >
              גלה עוד
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;