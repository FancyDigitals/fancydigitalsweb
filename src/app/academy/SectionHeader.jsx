"use client";

export default function SectionHeader({
    number,
    eyebrow,
    title,
    description,
}) {
    return (
        <header className="mb-8">

            <div className="flex items-center gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-400 text-2xl font-black text-black">
                    {String(number).padStart(2, "0")}
                </div>

                <div>

                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">
                        {eyebrow}
                    </p>

                    <h2 className="mt-1 text-4xl font-black text-white">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-400">
                            {description}
                        </p>
                    )}

                </div>

            </div>

        </header>
    );
}