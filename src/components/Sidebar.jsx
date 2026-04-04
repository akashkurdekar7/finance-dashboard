import { NavLink } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import { LayoutDashboard, ReceiptText, PieChart, ShieldUser, TrendingUp, ChevronDown } from "lucide-react";

const Sidebar = () => {
    const { role, setRole } = useFinance();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
        { icon: <ReceiptText size={20} />, label: "Transactions", path: "/transactions" },
        { icon: <PieChart size={20} />, label: "Insights", path: "/insights" },
    ];

    return (
        <div className="h-full bg-slate-950/40 backdrop-blur-3xl border-r border-slate-800 p-6 flex flex-col gap-8 shadow-2xl">
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                    <TrendingUp className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Finance.io
                </h1>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300
                            ${isActive 
                                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-lg shadow-brand-primary/5" 
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"}
                        `}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Role Switcher Section (Admin/Viewer) */}
            <div className="glass p-5 rounded-2xl border-brand-accent/20 bg-brand-accent/5 relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-3 text-brand-accent relative z-10">
                    <ShieldUser size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Access Control</span>
                </div>
                
                <div className="relative z-10">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700/50 rounded-lg py-2.5 px-4 text-sm font-semibold focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all cursor-pointer appearance-none text-slate-200 hover:bg-slate-800"
                    >
                        <option value="viewer">Viewer Mode</option>
                        <option value="admin">Admin Access</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-focus-within:rotate-180 transition-transform" size={16} />
                </div>

                <p className="mt-3 text-[10px] text-slate-500 leading-relaxed text-center font-medium opacity-80 uppercase tracking-tighter">
                    {role === "admin" ? "Write capabilities active" : "Read-only environment"}
                </p>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/10 blur-2xl rounded-full" />
            </div>
        </div>
    );
};

export default Sidebar;