import SectionTitle from "../components/shared/SectionTitle";
import { CheckCircle, Award, Users, Factory } from "lucide-react";

const stats = [
  { label: "Лет на рынке", value: "8+" },
  { label: "Довольных клиентов", value: "1000+" },
  { label: "Реализованных проектов", value: "2500+" },
  { label: "Городов доставки", value: "85+" },
];

const values = [
  {
    icon: CheckCircle,
    title: "Качество",
    description: "Используем только качественные материалы и фурнитуру",
  },
  {
    icon: Award,
    title: "Профессионализм",
    description: "Команда опытных специалистов с многолетним стажем",
  },
  {
    icon: Users,
    title: "Клиентоориентированность",
    description: "Индивидуальный подход к каждому заказу",
  },
  {
    icon: Factory,
    title: "Производство",
    description: "Собственные производственные мощности",
  },
];

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
          alt="О компании"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 text-white">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            О компании AllLoft
          </h1>
          <p className="text-xl max-w-2xl">
            Создаем уникальную мебель с 2015 года
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl font-heading font-bold mb-6">
                История компании
              </h2>
              <p className="text-lg mb-6">
                AllLoft начала свой путь в 2015 году как небольшая мастерская по
                производству мебели в стиле лофт. За годы работы мы выросли в
                крупное производство, но сохранили главное – внимание к деталям и
                индивидуальный подход к каждому клиенту.
              </p>
              <p className="text-lg">
                Сегодня мы производим мебель для дома и бизнеса, используя
                современное оборудование и качественные материалы. Наша цель –
                создавать мебель, которая станет неотъемлемой частью вашего
                пространства.
              </p>
            </div>
            <div className="animate-fade-up">
              <img
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80"
                alt="История компании"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-heading font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <SectionTitle
            title="Наши ценности"
            subtitle="Принципы, которыми мы руководствуемся в работе"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card p-6 text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <value.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl font-heading font-bold mb-6">
                Производство
              </h2>
              <p className="text-lg mb-6">
                Наше производство оснащено современным оборудованием, которое
                позволяет создавать мебель высочайшего качества. Мы контролируем
                все этапы производства, от разработки дизайна до финальной сборки.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-accent" />
                  <span>Современное оборудование</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-accent" />
                  <span>Квалифицированные специалисты</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-accent" />
                  <span>Контроль качества на всех этапах</span>
                </li>
              </ul>
            </div>
            <div className="animate-fade-up">
              <img
                src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80"
                alt="Производство"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
