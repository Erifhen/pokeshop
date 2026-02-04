import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import {
  ChevronLeft,
  Truck,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';

export default function Checkout({ onBack }) {
  /* ==========================
      STORE (selectors estáveis)
  ========================== */
  const cart = useCartStore((state) => state.cart);
  const subtotal = useCartStore((state) => state.getTotal()) ?? 0;

  /* ==========================
      STATES
  ========================== */
  const [discount, setDiscount] = useState(0);
  const [cep, setCep] = useState('');

  const [step, setStep] = useState('checkout');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [installments, setInstallments] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  /* ==========================
      CUPOM AUTOMÁTICO
  ========================== */
  useEffect(() => {
    if (subtotal >= 50) {
      setDiscount(subtotal * 0.2);
    } else {
      setDiscount(0);
    }
  }, [subtotal]);

  /* ==========================
      FRETE SIMBÓLICO
  ========================== */
  const freight = cep.length === 8 ? 8 : 0;
  const total = subtotal - discount + freight;

  const handleFinish = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  /* ==========================
      TELA DE SUCESSO
  ========================== */
  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-12 rounded-3xl shadow-lg text-center max-w-md">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />

          <h2 className="text-2xl font-black uppercase mb-4">
            Pedido Confirmado
          </h2>

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Este checkout faz parte de um <strong>projeto de portfólio</strong>.
            <br />
            Nenhuma compra real foi realizada e nenhum pagamento foi processado.
          </p>

          <div className="bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-widest p-4 rounded-xl mb-8">
            Ambiente 100% demonstrativo
          </div>

          <button
            onClick={onBack}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all"
          >
            Voltar à loja
          </button>
        </div>
      </div>
    );
  }

  /* ==========================
      CHECKOUT
  ========================== */
  return (
    <div className="max-w-6xl mx-auto p-6 pt-32 animate-in fade-in slide-in-from-bottom-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-6 font-black uppercase tracking-widest text-xs"
      >
        <ChevronLeft size={18} />
        Continuar Comprando
      </button>

      {/* Stepper */}
      <div className="flex items-center gap-4 mb-12 text-xs font-black uppercase tracking-widest">
        <span className="text-orange-600">Carrinho</span>
        <span className="text-gray-300">→</span>
        <span className="text-orange-600">Pagamento</span>
        <span className="text-gray-300">→</span>
        <span className="text-gray-400">Confirmação</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-2 space-y-8">
          {/* Resumo */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              Resumo do Pedido
            </h2>

            <div className="divide-y divide-gray-50">
              {cart.length === 0 ? (
                <div className="py-8 text-center text-gray-400 font-bold">
                  Seu carrinho está vazio
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-4 items-center hover:bg-gray-50 rounded-xl p-2 transition-colors"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 border">
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800">
                          {item.nome}
                        </h4>
                        <p className="text-xs text-gray-400 font-bold uppercase">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-gray-900">
                        R$ {(item.preco * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Un: R$ {item.preco.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Pagamento */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
              <CreditCard className="text-orange-500" />
              Pagamento
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['pix', 'card', 'boleto'].map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setPaymentMethod(method);
                    if (method !== 'card') setInstallments(1);
                  }}
                  className={`p-5 border-2 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    paymentMethod === method
                      ? 'border-orange-500 text-orange-600 bg-orange-50 shadow-sm'
                      : 'border-gray-100 text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {method === 'pix'
                    ? 'Pix'
                    : method === 'card'
                    ? 'Cartão'
                    : 'Boleto'}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Parcelamento
                </p>

                {[1, 3, 6].map((qtd) => (
                  <button
                    key={qtd}
                    onClick={() => setInstallments(qtd)}
                    className={`w-full p-4 rounded-xl border font-bold transition-all ${
                      installments === qtd
                        ? 'border-orange-500 text-orange-600 bg-orange-50 shadow-sm'
                        : 'border-gray-100 text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {qtd}x de R$ {(total / qtd).toFixed(2)}
                  </button>
                ))}
              </div>
            )}

            {(paymentMethod === 'pix' || paymentMethod === 'boleto') && (
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                  {paymentMethod === 'pix'
                    ? 'O QR Code do Pix será gerado após a confirmação do pedido.'
                    : 'O boleto será gerado após a confirmação do pedido.'}
                </p>
              </div>
            )}
          </section>
        </div>

        {/* COLUNA DIREITA */}
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-[2.5rem] shadow-2xl space-y-8 sticky top-32">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300 font-bold text-sm uppercase">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
                  <p className="text-green-400 text-[10px] font-black uppercase tracking-widest text-center">
                    Cupom POKE20 aplicado automaticamente
                  </p>
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  placeholder="Seu CEP"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 font-bold placeholder:text-white/60"
                  value={cep}
                  onChange={(e) =>
                    setCep(e.target.value.replace(/\D/g, '').slice(0, 8))
                  }
                />
                <Truck className="absolute left-4 top-4 text-white/70" />
              </div>

              <div className="flex justify-between text-gray-300 font-bold text-sm uppercase border-t border-white/5 pt-6">
                <span>Frete</span>
                <span>{freight ? `R$ ${freight.toFixed(2)}` : '—'}</span>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-xs uppercase text-gray-300">
                  Total Final
                </span>
                <span className="text-4xl font-black text-yellow-400">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              disabled={isProcessing || cart.length === 0}
              className="w-full bg-orange-600 hover:bg-orange-700 py-5 rounded-2xl font-black uppercase tracking-[0.2em] disabled:opacity-60 transition-transform active:scale-95"
            >
              {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
            </button>

            <p className="text-[9px] text-gray-300 text-center uppercase font-bold">
              Projeto de portfólio — nenhuma transação real
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
