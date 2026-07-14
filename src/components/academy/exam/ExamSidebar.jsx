"use client";

import { Flag } from "lucide-react";

export default function ExamSidebar({
    questions,
    current,
    answers,
    flagged,
    onJump,
}) {
    return (
        <aside className="w-72 border-l border-white/10 bg-[#11161d]">

            <div className="p-6">

                <h2 className="mb-6 text-lg font-black text-white">
                    Questions
                </h2>

                <div className="grid grid-cols-5 gap-3">

                    {questions.map((_, index) => {

                        const answered =
                            answers[index] !== undefined;

                        const isCurrent =
                            current === index;

                        return (
                            <button
                                key={index}
                                onClick={() => onJump(index)}
                                className={`
h-12 rounded-xl text-sm font-bold transition

${isCurrent
? "bg-green-500 text-black"
: answered
? "bg-green-500/20 text-green-400"
: "bg-white/5 text-white hover:bg-white/10"
}
`}
                            >
                                {index + 1}
                            </button>
                        );

                    })}

                </div>

                <div className="mt-10">

                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                        Flagged
                    </h3>

                    <div className="space-y-2">

                        {flagged.length === 0 && (
                            <p className="text-sm text-gray-500">
                                None
                            </p>
                        )}

                        {flagged.map((i) => (
                            <button
                                key={i}
                                onClick={() => onJump(i)}
                                className="flex w-full items-center gap-3 rounded-xl bg-yellow-500/10 p-3 text-left"
                            >
                                <Flag
                                    size={15}
                                    className="text-yellow-400"
                                />

                                <span className="text-white">
                                    Question {i + 1}
                                </span>

                            </button>
                        ))}

                    </div>

                </div>

            </div>

        </aside>
    );
}