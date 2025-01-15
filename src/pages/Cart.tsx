import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import SectionTitle from "../components/shared/SectionTitle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          delivery_address: formData.address,
          total_amount: getTotalPrice(),
          status: 'new'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Send confirmation email
      const orderDetails = items.map(item => 
        `<p>${item.name} - ${item.quantity}шт. - ${item.price * item.quantity}₽</p>`
      ).join('');

      const { error: emailError } = await supabase.functions.invoke('send-order-confirmation', {
        body: {
          to: formData.email,
          userName: formData.name,
          orderDetails: orderDetails,
          totalAmount: getTotalPrice(),
          deliveryAddress: formData.address
        }
      });

      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue with order success even if email fails
      }

      toast.success("Заказ успешно оформлен! Мы отправили подтверждение на вашу почту.");
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-medium">Корзина пуста</h2>
          <p className="mt-2 text-muted-foreground">
            Перейдите в каталог, чтобы добавить товары
          </p>
          <Link to="/catalog" className="btn-primary mt-4 inline-block">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <SectionTitle title="Корзина" subtitle="Ваши выбранные товары" />
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-md object-cover"
            />
            <div className="flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <p className="mt-1 font-medium text-accent">
                {item.price.toLocaleString("ru-RU")} ₽ × {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-destructive hover:text-destructive/80"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between text-lg font-medium">
            <span>Итого:</span>
            <span>{getTotalPrice().toLocaleString("ru-RU")} ₽</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="btn-primary mt-4 w-full">Оформить заказ</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Оформление заказа</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
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
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Адрес доставки
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
                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Оформление..." : "Подтвердить заказ"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Cart;