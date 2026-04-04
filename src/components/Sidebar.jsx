import { NavLink } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import { LayoutDashboard, ReceiptText, PieChart, ShieldUser, TrendingUp } from "lucide-react";
import CustomSelect from "./CustomSelect";

const Sidebar = () => {
    const { role, setRole } = useFinance();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
        { icon: <ReceiptText size={20} />, label: "Transactions", path: "/transactions" },
        { icon: <PieChart size={20} />, label: "Insights", path: "/insights" },
    ];

    const roleOptions = [
        { value: "viewer", label: "Viewer Mode" },
        { value: "admin", label: "Admin Access" }
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

            {/* Role Switcher Section (Redesigned with CustomSelect) */}
            <div className="glass p-5 rounded-2xl border-brand-accent/20 bg-brand-accent/5 relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-4 text-brand-accent relative z-10">
                    <ShieldUser size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#60efff]">Access Control</span>
                </div>
                
                <div className="relative z-10">
                    <CustomSelect 
                        options={roleOptions}
                        value={role}
                        onChange={setRole}
                        className="w-full"
                    />
                </div>

                <p className="mt-4 text-[10px] text-slate-500 leading-relaxed text-center font-black uppercase tracking-tighter opacity-60">
                    {role === "admin" ? "Write Access Active" : "Read-Only Environment"}
                </p>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/10 blur-2xl rounded-full" />
            </div>
        </div>
    );
};

export default Sidebar;