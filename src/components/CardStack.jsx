import { useFinance } from "../context/FinanceContext";
import { CreditCard as CardIcon, Plus, Info } from "lucide-react";

/**
 * Individual Credit Card Component
 * Optimized for larger stacks (4+ cards)
 */
const CreditCardItem = ({ card, index, totalCards }) => {
    // Top card should be index totalCards - 1
    // The relative offset determines how much of the underlying cards is visible
    const offset = (totalCards - 1 - index) * 16; 

    return (
        <div 
            className={`
                absolute w-full h-[210px] rounded-[2.5rem] p-7 flex flex-col justify-between 
                shadow-2xl border border-white/10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer
                bg-gradient-to-br ${card.theme}
                hover:-translate-y-12 hover:scale-[1.05] hover:z-50 active:scale-[0.98]
                hover:shadow-brand-primary/20
            `}
            style={{ 
                top: `${offset}px`,
                zIndex: index,
                // Make underlying cards slightly darker/more transparent
                opacity: 1 - (totalCards - 1 - index) * 0.12,
                transform: `scale(${1 - (totalCards - 1 - index) * 0.02})`
            }}
        >
            {/* Card Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1 leading-none">Security Asset</p>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">{card.type} Elite</h4>
                </div>
                <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                    <CardIcon className="text-white" size={22} />
                </div>
            </div>

            {/* Premium Card Chip */}
            <div className="w-12 h-8 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400 rounded-lg shadow-inner border border-white/20 overflow-hidden relative opacity-90">
                <div className="absolute inset-0 bg-black/5 grid grid-cols-3 gap-0.5 p-1">
                    <div className="border-r border-black/10" />
                    <div className="border-r border-black/10" />
                    <div className="border-r border-black/10" />
                    <div className="border-t border-black/10 col-span-3" />
                </div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
                <p className="text-2xl font-black text-white tracking-[0.12em] font-mono leading-none drop-shadow-2xl">
                    {card.cardNumber}
                </p>
                
                <div className="flex items-center justify-between text-white/90">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase font-black tracking-widest text-white/30 leading-none">Holder</span>
                        <span className="text-xs font-black uppercase tracking-tight leading-none">{card.holder}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] uppercase font-black tracking-widest text-white/30 leading-none">Valid Thru</span>
                        <span className="text-xs font-black leading-none">{card.expiry}</span>
                    </div>
                </div>
            </div>

            {/* Decorative Glass Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/10 blur-3xl rounded-full pointer-events-none" />
        </div>
    );
};

/**
 * Enhanced Card Stack Component
 */
const CardStack = () => {
    const { cards } = useFinance();

    return (
        <div className="flex flex-col gap-8 w-full max-w-[360px] animate-in slide-in-from-right-10 duration-1000 ease-out">
            {/* Action Bar */}
            <div className="flex items-center justify-between px-3">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                    <h3 className="text-lg font-black tracking-tight text-white uppercase italic">Wallet</h3>
                    <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400 font-black tracking-widest">
                        {cards.length} ACTIVE
                    </span>
                </div>
                <button className="p-2.5 bg-slate-800/80 hover:bg-brand-primary hover:text-slate-950 rounded-xl border border-white/5 transition-all text-slate-400 shadow-xl shadow-black/20 active:scale-90 group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                </button>
            </div>

            {/* Stack Viewport - Height adjusted for 4+ cards */}
            <div 
                className="relative w-full group" 
                style={{ height: `${210 + (cards.length - 1) * 16}px` }}
            >
                {cards.map((card, idx) => (
                    <CreditCardItem 
                        key={card.id} 
                        card={card} 
                        index={idx} 
                        totalCards={cards.length} 
                    />
                ))}
            </div>

            {/* Card Health Indicator */}
            <div className="bg-slate-900 shadow-2xl p-5 rounded-[2rem] border border-white/5 flex items-start gap-4 transition-all hover:border-brand-primary/20">
                <div className="p-2.5 bg-brand-primary/10 rounded-2xl text-brand-primary shadow-inner">
                    <Info size={18} />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Note</p>
                    <p className="text-[11px] font-bold leading-relaxed text-slate-400">
                        You have <strong className="text-white">4 active lines</strong> of credit. Your debt-to-income ratio is currently in the <span className="text-brand-primary">Optimal Zone</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardStack;
