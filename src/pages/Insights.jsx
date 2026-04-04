import { useFinance } from "../context/FinanceContext";
import { Sparkles, TrendingUp, AlertCircle, PieChart, ArrowRight, Zap } from "lucide-react";

export default function Insights() {
    const { transactions, totalExpenses } = useFinance();

    // 🔹 Robust Expense Extraction
    const expensesOnly = transactions.filter(t => 
        t.type === "expense" && 
        !["salary", "freelance", "dividend", "income"].includes(t.category.toLowerCase())
    );

    const categoryMap = {};
    expensesOnly.forEach(e => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });

    const categories = Object.keys(categoryMap).sort((a, b) => categoryMap[b] - categoryMap[a]);
    const highest = categories[0] || "None";
    const highestAmount = categoryMap[highest] || 0;

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-10 duration-1000 ease-out">
            {/* Minimalist Header */}
            <header className="px-2 space-y-1">
                <div className="flex items-center gap-3">
                    <Zap className="text-brand-primary" size={18} />
                    <h3 className="text-base font-black tracking-widest text-white uppercase italic">Insights</h3>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-7">System Analysis</p>
            </header>

            {/* Smart Insight Card - Redesigned for Neatness */}
            <div className="glass-container p-8 relative group overflow-hidden border border-white/5 shadow-2xl">
                <div className="flex flex-col gap-8 relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/20">
                                <Sparkles className="text-brand-primary" size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Dominant Sector</span>
                        </div>
                        <div className="px-3 py-1 bg-red-400/10 border border-red-400/20 rounded-full flex items-center gap-2">
                            <TrendingUp className="text-red-400" size={12} />
                            <span className="text-[9px] font-black text-red-100 uppercase tracking-widest">Urgent</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-4xl font-black text-white tracking-tighter capitalize">{highest}</h4>
                        <p className="text-sm font-bold text-slate-400 tracking-tight">₹{highestAmount.toLocaleString()} total outflow</p>
                    </div>

                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-brand-primary/20 transition-all">
                        <AlertCircle className="text-brand-primary shrink-0" size={18} />
                        <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                            <strong className="text-white">Advisory:</strong> Your {highest} spending is high. Capping this at 15% could save you <strong className="text-brand-primary">₹{(highestAmount * 0.15).toFixed(0)}</strong> next month.
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brand-accent/5 blur-[40px] rounded-full" />
            </div>

            {/* Progressive Breakdown - Dynamic Bars for neatness */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Breakdown</h4>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Top Sectors</span>
                </div>

                <div className="space-y-5 px-1">
                    {categories.slice(0, 4).map((cat, i) => {
                        const percentage = totalExpenses > 0 ? (categoryMap[cat] / totalExpenses) * 100 : 0;
                        return (
                            <div key={i} className="group cursor-default">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">{cat}</span>
                                    <span className="text-[11px] font-black text-white tracking-widest">₹{categoryMap[cat].toLocaleString()}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                                    <div 
                                        className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {categories.length === 0 && (
                        <div className="p-8 bg-slate-900 shadow-inner rounded-3xl border border-white/5 text-center">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-600">Pending sufficient data...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Smart Action Call */}
            <button className="group w-full py-5 bg-slate-900 border border-white/5 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-brand-primary hover:border-brand-primary transition-all shadow-xl active:scale-95">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-950 transition-colors">Generate Full Insight</span>
                <ArrowRight size={16} className="text-slate-500 group-hover:text-slate-950 transition-all group-hover:translate-x-1" />
            </button>
        </div>
    );
}