import { useAppDispatch, useAppSelector } from "../store";
import { increment, decrement } from "../features/products/cart/cartSlice";
import {
  formatPrice,
  selectCartLines,
  selectSubtotal,
  selectSavings,
  selectFinalTotal,
  type CartLine,
} from "../features/products/cart/selectors";

export default function Basket() {
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectCartLines);
  const subtotal = useAppSelector(selectSubtotal);
  const savings = useAppSelector(selectSavings);
  const final = useAppSelector(selectFinalTotal);

  return (
    <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col">
      <h2 className="text-xl font-semibold text-slate-800 mb-1">Basket</h2>
      <p className="text-xs text-slate-500 mb-4">
        
      </p>


      <div className="flex-1 overflow-auto pr-1">
        {lines.length === 0 && (
          <p className="text-slate-400 text-sm mt-4">
            Your basket is empty. Start by adding a product.
          </p>
        )}

        {lines.map((l: CartLine) => (
          <div
            key={l.product.id}
            className="border border-slate-100 rounded-xl p-3 mb-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium text-slate-800">
                  {l.product.name}
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatPrice(l.product.price)} each
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(increment(l.product.id))}
                  className="w-8 h-8 rounded-lg bg-blue-600 text-white text-lg leading-none
                             flex items-center justify-center
                             hover:bg-blue-700 active:scale-95 transition-transform"
                >
                  +
                </button>

                <span className="w-6 text-center text-sm text-slate-800">
                  {l.quantity}
                </span>

                <button
                  onClick={() => dispatch(decrement(l.product.id))}
                  className="w-8 h-8 rounded-lg border border-blue-600 text-blue-600 text-lg leading-none
                             flex items-center justify-center
                             hover:bg-blue-50 active:scale-95 transition-transform"
                >
                  -
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-2">
              Item price {formatPrice(l.product.price)} × {l.quantity} ={" "}
              <span className="font-medium text-slate-700">
                {formatPrice(l.regularTotal)}
              </span>
            </p>

            {l.savings > 0 && (
              <p className="text-[11px] text-rose-500 mt-1">
                Savings {formatPrice(l.savings)}{" "}
                <span className="text-rose-400">
                  ({l.offerDescription})
                </span>
              </p>
            )}

            <p className="text-[11px] text-slate-700 mt-1">
              Item cost{" "}
              <span className="font-semibold">
                {formatPrice(l.finalTotal)}
              </span>
            </p>
          </div>
        ))}
      </div>

      
      <div className="mt-4 border-t border-slate-100 pt-3">
        <div className="bg-slate-50 rounded-xl px-3 py-3 text-sm space-y-1">
          <div className="flex justify-between text-slate-600">
            <span>Sub Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-rose-600">
            <span>Savings</span>
            <span>- {formatPrice(savings)}</span>
          </div>
          <div className="flex justify-between text-slate-800 font-semibold pt-1 border-t border-slate-200 mt-1">
            <span>Total Amount</span>
            <span>{formatPrice(final)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
