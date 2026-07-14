"use client";

export default function ContentCard({ children }) {
    return (
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[#11161d] shadow-[0_30px_80px_rgba(0,0,0,.35)]">
            {children}
        </section>
    );
}