"use client";

import ExamTimer from "./ExamTimer";

export default function ExamHeader({
    current,
    total,
    duration,
    onExpire,
}) {
    const progress = ((current + 1) / total) * 100;

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1117]/95 backdrop-blur-xl">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

                <div>

                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-500">
                        Knowledge Assessment
                    </p>

                    <h1 className="mt-1 text-2xl font-black text-white">
                        Question {current + 1} of {total}
                    </h1>

                </div>

                <ExamTimer
                    duration={duration}
                    onExpire={onExpire}
                />

            </div>

            <div className="h-1 bg-white/5">

                <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-300 transition-all duration-500"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </header>
    );
}