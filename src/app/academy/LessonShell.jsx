"use client";

export default function LessonShell({ hero, sidebar, children }) {
    return (
        <div className="min-h-screen bg-[#090B11]">

            <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">

                {hero}

                <div className="mt-10 grid gap-10 xl:grid-cols-[280px_minmax(0,1fr)]">

                    <aside className="hidden xl:block sticky top-24 h-fit">
                        {sidebar}
                    </aside>

                    <main className="min-w-0 space-y-12">
                        {children}
                    </main>

                </div>

            </div>

        </div>
    );
}