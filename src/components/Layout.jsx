import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
            {/* Sidebar Section */}
            <aside className="w-64 flex-shrink-0">
                <Sidebar />
            </aside>

            {/* Main Content Component Section */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="max-w-6xl mx-auto space-y-8">
                    {children}
                </div>
                
                {/* Decorative Background Glows */}
                <div className="fixed top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="fixed bottom-0 left-64 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
            </main>
        </div>
    );
};

export default Layout;