"use client";

export default function ExamOption({
    letter,
    text,
    selected,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full rounded-2xl border p-5 transition-all duration-200 text-left

${
selected
? "border-green-500 bg-green-500/10"
: "border-white/10 bg-[#151922] hover:border-green-500/40 hover:-translate-y-1"
}`}
        >
            <div className="flex gap-5">

                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold

${
selected
? "bg-green-500 text-black"
: "bg-white/10 text-white"
}`}
                >
                    {letter}
                </div>

                <p className="text-white leading-7">
                    {text}
                </p>

            </div>
        </button>
    );
}