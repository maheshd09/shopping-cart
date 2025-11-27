import { useAppDispatch, useAppSelector } from "../store";
import { addProduct } from "../features/products/cart/cartSlice";
import { formatPrice } from "../features/products/cart/selectors";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((s) => s.products.items);

  return (
    <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Products</h2>
      </div>

      <ul className="divide-y divide-slate-100">
        {products.map((p) => (
          <li
            key={p.id}
            className="py-3 flex items-center justify-between text-sm hover:bg-slate-50 rounded-xl px-2 transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-medium text-slate-800">{p.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500 w-20 text-right">
                {formatPrice(p.price)}
              </span>

              <button
                onClick={() => dispatch(addProduct(p.id))}
                className="px-4 py-1.5 rounded-full text-xs font-semibold
                           bg-blue-500 text-white shadow-sm
                           hover:bg-blue-600 active:scale-95
                           transition-transform"
              >
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
