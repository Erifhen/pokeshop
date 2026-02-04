import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  user: { name: 'Cliente' }, 
  
  isCartOpen: false,
  selectedProduct: null,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openModal: (product) => set({ selectedProduct: product }),
  closeModal: () => set({ selectedProduct: null }),

  addToCart: (product) => set((state) => {
    const itemExists = state.cart.find(item => item.id === product.id);
    if (itemExists) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    )
  })),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  // Agora as funções pegam o estado sozinhas usando get()
  getTotal: () => {
    const { cart } = get();
    return cart.reduce((acc, item) => acc + ((item.preco || 0) * item.quantity), 0);
  },

  getItemCount: () => {
    const { cart } = get();
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }
}));