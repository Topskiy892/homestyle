import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">AllLoft</h3>
            <p className="text-gray-300 mb-4">
              Создаем уникальную мебель для вашего комфорта с 2015 года
            </p>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <a href="tel:+79991102868" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Phone size={18} />
                <span>+7 (999) 110-28-68</span>
              </a>
              <a href="mailto:info@allloft.ru" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Mail size={18} />
                <span>info@allloft.ru</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin size={18} />
                <span>Московская улица, Кузнецк</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock size={18} />
                <span>Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-300 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Срок изготовления: 5-10 рабочих дней
              </li>
              <li className="text-gray-300">
                Доставка по всей России
              </li>
              <li className="text-gray-300">
                Собственное производство
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AllLoft. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;