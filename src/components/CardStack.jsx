import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { CreditCard as CardIcon, Plus, Info, ChevronRight } from "lucide-react";

/**
 * Optimized Individual Credit Card Component
 */
const CreditCardItem = ({ card, position, totalCards, onClick , className}) => {
    // Tighter offsets for a neater stack
    const offset = position * 14;
    const scale = 1 - position * 0.04;
    const opacity = 1 - position * 0.25;
    const zIndex = totalCards - position;

    return (
        <div
            onClick={onClick}
            className={`
                absolute w-full h-[200px] rounded-[2rem] p-7 flex flex-col justify-between 
                shadow-2xl border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer
                bg-gradient-to-br ${card.theme}
                hover:-translate-y-4 hover:shadow-brand-accent/20
            `}
            style={{
                top: `${offset}px`,
                zIndex: zIndex,
                opacity: opacity,
                transform: `scale(${scale})`,
                filter: position > 0 ? `blur(${position * 0.5}px)` : 'none'
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-1 leading-none italic">Asset Rank #{position + 1}</p>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">{card.type} Elite</h4>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <CardIcon className="text-white opacity-80" size={20} />
                </div>
            </div>

            <div className="w-11 h-7 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400 rounded-md shadow-inner border border-white/20 relative opacity-90 overflow-hidden">
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/5" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/5" />
            </div>

            <div className="space-y-4">
    <p className="text-xl font-bold text-white tracking-[0.1em] font-mono leading-none drop-shadow-2xl">
        {card.cardNumber}
    </p>

    {card.isPlaceholder && (
        <p className="text-xs text-white/40">Add your first card</p>
    )}
                <div className="flex items-center justify-between text-white/80">
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase font-black tracking-widest text-white/20 leading-none">Holder</span>
                        <span className="text-[10px] mt-2 font-black uppercase tracking-tight leading-none">{card.holder}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] uppercase font-black tracking-widest text-white/20 leading-none">Expiry</span>
                        <span className="text-[11px] font-black leading-none mt-2">{card.expiry}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const placeholderCard = {
  id: "placeholder",
  cardNumber: "0000 0000 0000 0000",
  expiry: "MM/YY",
  holder: "Your Name",
  type: "card",
  theme: "from-slate-800 via-slate-900 to-black",
  balance: 0,
  isPlaceholder: true
};
/**
 * Neater Card Stack Component
 */
const CardStack = ({ onAddClick }) => {
    
    const { cards } = useFinance();

const displayCards = cards.length > 0 ? cards : [placeholderCard];
    const [startIndex, setStartIndex] = useState(0);

   const handleCycle = () => {
  if (displayCards.length <= 1) return;
  setStartIndex((prev) => (prev + 1) % displayCards.length);
};

   const orderedCards = displayCards.map((card, index) => {
  const total = displayCards.length;
  const position = (index - startIndex + total) % total;
        return { ...card, position };
    });

    return (
        <div className="flex flex-col gap-8 w-full max-w-[340px] animate-in slide-in-from-right-10 duration-1000 ease-out">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse" />
                    <h3 className="text-base font-black tracking-widest text-white uppercase italic">Wallet</h3>
                    <span className="text-[10px] bg-white/5 border border-white/5 px-3 py-1 rounded-full text-slate-500 font-black tracking-widest">
                        {cards.length} ACTIVE
                    </span>
                </div>
                <button
                    onClick={onAddClick}
                    className="p-2.5 bg-slate-800/80 hover:bg-brand-accent hover:text-white rounded-xl border border-white/5 transition-all text-slate-400 shadow-xl shadow-black/20 active:scale-90 group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                </button>
            </div>

            {/* Compact Stack Viewport */}
            <div className="relative w-full h-[260px] group transition-all duration-700">
                {orderedCards.map((card) => (
                    <CreditCardItem
                        key={card.id}
                        card={card}
                        position={card.position}
                       totalCards={displayCards.length}
                        className={`${card.isPlaceholder ? "opacity-60 cursor-default" : "cursor-pointer"}`}
                        onClick={card.isPlaceholder ? undefined : handleCycle}
                    />
                ))}
            </div>

            {/* Refined Health Indicator */}
            <div className="bg-slate-900 shadow-2xl p-6 rounded-3xl border border-white/5 flex items-start gap-4 transition-all hover:border-brand-accent/20 cursor-default">
                <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent shadow-inner">
                    <Info size={18} />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Wallet Intelligence</p>
                    <p className="text-[11px] font-bold leading-relaxed text-slate-400">
                        Top asset currently represents <strong className="text-white">₹{((displayCards[startIndex]?.balance || 0)).toLocaleString()}</strong> in liquid credit.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardStack;
