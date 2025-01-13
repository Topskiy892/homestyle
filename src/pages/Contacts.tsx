import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionTitle from "../components/shared/SectionTitle";
import ContactForm from "../components/shared/ContactForm";

const Contacts = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
          alt="Контакты"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 text-white">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Контакты
          </h1>
          <p className="text-xl max-w-2xl">
            Свяжитесь с нами удобным для вас способом
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="card p-6 text-center animate-fade-up">
              <Phone className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-heading font-semibold text-lg mb-2">Телефон</h3>
              <a
                href="tel:+79991102868"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                +7 (999) 110-28-68
              </a>
            </div>

            <div className="card p-6 text-center animate-fade-up">
              <Mail className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
              <a
                href="mailto:info@homestyle.ru"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                info@homestyle.ru
              </a>
            </div>

            <div className="card p-6 text-center animate-fade-up">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-heading font-semibold text-lg mb-2">Адрес</h3>
              <p className="text-muted-foreground">
                Московская улица, Кузнецк
              </p>
            </div>

            <div className="card p-6 text-center animate-fade-up">
              <Clock className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-heading font-semibold text-lg mb-2">
                Режим работы
              </h3>
              <p className="text-muted-foreground">Пн-Пт: 9:00-18:00</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-up">
              <SectionTitle
                title="Напишите нам"
                subtitle="Заполните форму, и мы свяжемся с вами в ближайшее время"
                centered={false}
              />
              <ContactForm />
            </div>

            <div className="animate-fade-up">
              <SectionTitle
                title="Как нас найти"
                subtitle="Мы находимся в центре города"
                centered={false}
              />
              <div className="h-[400px] bg-secondary rounded-lg">
                {/* Add your map component here */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Карта будет добавлена позже
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;