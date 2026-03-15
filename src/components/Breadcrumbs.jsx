/* =====================================================
   BREADCRUMBS — PREMIUM, GLASSMORPHIC, ELEGANT
===================================================== */

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="relative mb-12 inline-flex animate-[fadeUp_0.8s_ease-out]"
    >
      {/* Background Glass Plate */}
      <div className="absolute inset-0 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]" />
      
      <ol className="relative flex items-center gap-1 px-5 py-2.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1 group">
              {!isLast ? (
                <div className="flex items-center gap-1">
                  <a
                    href={item.href}
                    className="
                      px-2 py-1 text-[11px] font-bold uppercase tracking-widest 
                      text-gray-400 transition-all duration-300 
                      hover:text-white hover:scale-105
                    "
                  >
                    {item.label}
                  </a>
                  
                  {/* Custom Elegant Separator */}
                  <svg 
                    className="h-3 w-3 text-gray-600 transition-transform group-hover:rotate-12" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ) : (
                <span className="
                  px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] 
                  bg-gradient-to-r from-[#0a9001] to-[#ff914d] 
                  bg-clip-text text-transparent
                ">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Subtle Glow beneath breadcrumb */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-[#075a01]/40 to-transparent blur-sm" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}