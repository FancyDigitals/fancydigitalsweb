/* =====================================================
   BREADCRUMBS — PURE STATIC, FRAMEWORK-AGNOSTIC
===================================================== */

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {!isLast ? (
                <a
                  href={item.href}
                  className="transition hover:text-[#075a01]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-medium text-gray-900">
                  {item.label}
                </span>
              )}

              {!isLast && <span className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
