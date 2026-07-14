"use client";

export default function SectionLabel({
    title,
    subtitle,
}) {
    return (
        <div className="mb-8">

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">
                {subtitle}
            </p>

            <h2 className="mt-2 text-4xl font-black text-white">
                {title}
            </h2>

        </div>
    );
}