interface PriceTagProps {
  price: string;
}

export const PriceTag = ({ price }: PriceTagProps) => {
  if (!price) return null;

  return (
    <div className="my-6 p-4 rounded-xl border border-price/30 bg-price/5 text-ink-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-price inline-block" />
        <span className="text-xs font-mono uppercase tracking-widest font-bold text-price">
          The Price Paid / Trade-Off
        </span>
      </div>
      <p className="font-prose text-sm leading-relaxed text-ink-1 pl-4 border-l-2 border-price/40">
        {price}
      </p>
    </div>
  );
};
