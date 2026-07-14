"use client";

import { ArrowDown } from "lucide-react";

export default function FloatingContinue() {

    function next() {

        const sections = [...document.querySelectorAll("[data-lesson-block]")];

        const current = sections.find(
            s => s.getBoundingClientRect().top > 120
        );

        current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    }

    return (

        <button
            onClick={next}
            className="fixed bottom-6 right-6 z-50 flex h-14 items-center gap-3 rounded-full bg-green-600 px-7 font-bold text-white shadow-2xl transition hover:scale-105"
        >

            Continue

            <ArrowDown size={18} />

        </button>

    );

}