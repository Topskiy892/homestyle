import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SectionTitle from "@/components/shared/SectionTitle";
import { Ruler, Clock, Palette, Shield, Tool } from "lucide-react";

const CustomFurniture = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    preferred_date: "",
    preferred_time: "",
    furniture_type: "",
    additional_notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Submitting measurement request:', formData);
      
      const { error } = await supabase
        .from('measurement_requests')
        .insert([formData]);

      if (error) throw error;

      toast.success("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        preferred_date: "",
        preferred_time: "",
        furniture_type: "",
        additional_notes: "",
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const benefits = [
    {
      icon: Ruler,
      title: "Точные замеры",
      description: "Бесплатный выезд специалиста для замеров и консультации",
    },
    {
      icon: Clock,
      title: "Быстрое изготовление",
      description: "Срок изготовления от 14 дней",
    },
    {
      icon: Palette,
      title: "Индивидуальный дизайн",
      description: "Разработка уникального проекта под ваши потребности",
    },
    {
      icon: Tool,
      title: "Профессиональный монтаж",
      description: "Установка мебели опытными специалистами",
    },
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "Гарантия на всю мебель от 12 месяцев",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80"
          alt="Мебель на заказ"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 text-white">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Мебель на заказ
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Создаем уникальную мебель по вашим размерам и пожеланиям
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <SectionTitle
            title="Преимущества мебели на заказ"
            subtitle="Почему стоит выбрать индивидуальное производство"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="card p-6 text-center"
              >
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <SectionTitle
            title="Заявка на бесплатный замер"
            subtitle="Оставьте заявку, и наш специалист свяжется с вами для уточнения деталей"
          />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="furniture_type" className="block text-sm font-medium text-gray-700">
                  Тип мебели
                </label>
                <select
                  id="furniture_type"
                  name="furniture_type"
                  value={formData.furniture_type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                >
                  <option value="">Выберите тип мебели</option>
                  <option value="kitchen">Кухня</option>
                  <option value="wardrobe">Шкаф-купе</option>
                  <option value="closet">Гардеробная</option>
                  <option value="bathroom">Мебель для ванной</option>
                  <option value="living_room">Мебель для гостиной</option>
                  <option value="office">Офисная мебель</option>
                  <option value="other">Другое</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Адрес
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700">
                  Предпочтительная дата
                </label>
                <input
                  type="date"
                  id="preferred_date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700">
                  Предпочтительное время
                </label>
                <select
                  id="preferred_time"
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                >
                  <option value="">Выберите время</option>
                  <option value="morning">Утро (9:00 - 12:00)</option>
                  <option value="afternoon">День (12:00 - 17:00)</option>
                  <option value="evening">Вечер (17:00 - 20:00)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">
                Дополнительные пожелания
              </label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Отправить заявку
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CustomFurniture;