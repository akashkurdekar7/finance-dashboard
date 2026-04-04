import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useFinance } from "../context/FinanceContext";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                <p className="text-xl font-black text-brand-primary">₹{payload[0].value.toLocaleString()}</p>
                <div className="w-8 h-1 bg-brand-primary/40 rounded-full mt-2" />
            </div>
        );
    }
    return null;
};

export default function BalanceTrend() {
    const { transactions } = useFinance();

    const data = useMemo(() => {
        if (!transactions.length) return [];

        // Sort by date chronologically
        const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        let cumulative = 0;
        const trendData = sorted.map(t => {
            cumulative += t.type === "income" ? t.amount : -t.amount;
            return {
                date: new Date(t.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
                balance: cumulative
            };
        });

        // Group by same date to only show last balance of the day
        const uniqueDates = [];
        const dateMap = {};
        trendData.forEach(d => {
            dateMap[d.date] = d.balance;
        });
        
        Object.keys(dateMap).forEach(date => {
            uniqueDates.push({ date, balance: dateMap[date] });
        });

        return uniqueDates.slice(-7); // Show last 7 active days for neatness
    }, [transactions]);

    return (
        <div className="w-full h-[320px] glass-container p-8 border border-white/5 shadow-3xl">
            <header className="flex items-center justify-between mb-8 px-2">
                <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Asset Velocity</h4>
                    <h3 className="text-2xl font-black text-white tracking-tighter">Balance Flow</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Real-Time</span>
                </div>
            </header>

            <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--color-brand-primary)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} 
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                            type="monotone" 
                            dataKey="balance" 
                            stroke="var(--color-brand-primary)" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorBal)" 
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
