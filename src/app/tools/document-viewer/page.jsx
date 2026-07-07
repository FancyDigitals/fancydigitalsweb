import Link from "next/link";
import {
  FileText,
  ArrowRight,
  CheckCircle2,
  Upload,
  Eye,
  Edit3,
  Download,
  Shield,
  Zap,
  Star,
} from "lucide-react";

export const metadata = {
  title: "Free Document Viewer & Editor Online — PDF, Word, Excel, PowerPoint",
  description:
    "Open and edit PDF, Word (DOC, DOCX), Excel (XLS, XLSX, CSV), PowerPoint, and 15+ document formats free in your browser. No download, no sign-up, works on mobile.",
  keywords: [
    "free pdf viewer online",
    "pdf viewer no download",
    "open docx online free",
    "word document viewer online",
    "excel viewer online free",
    "csv viewer online",
    "powerpoint viewer online",
    "free document viewer",
    "document editor online free",
    "open pdf without adobe",
    "free pdf reader online",
    "xlsx viewer online",
    "doc viewer online",
    "pptx viewer online",
    "epub reader online",
    "rtf viewer online",
    "markdown editor online",
    "free file viewer online",
    "browser document viewer",
    "no signup document viewer",
  ],
  openGraph: {
    title: "Free Document Viewer & Editor — PDF, Word, Excel + 15 formats",
    description:
      "Open and edit any document format free in your browser. No download, no sign-up.",
    url: "https://fancydigitals.com.ng/tools/document-viewer",
    images: ["/tools/document-viewer-preview.png"],
  },
};

const FORMATS = [
  { ext: "PDF", color: "#e53e3e", desc: "View any PDF instantly" },
  { ext: "DOCX", color: "#2b579a", desc: "Word documents" },
  { ext: "DOC", color: "#2b579a", desc: "Legacy Word files" },
  { ext: "XLSX", color: "#1d6f42", desc: "Edit Excel spreadsheets" },
  { ext: "XLS", color: "#1d6f42", desc: "Legacy Excel files" },
  { ext: "CSV", color: "#1d6f42", desc: "Edit data cell by cell" },
  { ext: "PPTX", color: "#d24726", desc: "PowerPoint presentations" },
  { ext: "PPT", color: "#d24726", desc: "Legacy PowerPoint" },
  { ext: "ODT", color: "#0e76a8", desc: "OpenDocument text" },
  { ext: "ODS", color: "#0e76a8", desc: "OpenDocument spreadsheet" },
  { ext: "ODP", color: "#0e76a8", desc: "OpenDocument presentation" },
  { ext: "RTF", color: "#075a01", desc: "Rich text format" },
  { ext: "TXT", color: "#4a5568", desc: "Plain text — fully editable" },
  { ext: "MD", color: "#4a5568", desc: "Markdown with live preview" },
  { ext: "EPUB", color: "#8b5cf6", desc: "eBooks and publications" },
];

const FEATURES = [
  {
    icon: Upload,
    title: "Upload any document",
    desc: "Drag and drop or click to upload. Supports 15+ formats up to 25MB.",
  },
  {
    icon: Eye,
    title: "View instantly",
    desc: "PDF, PowerPoint, Word, and Excel render immediately in your browser.",
  },
  {
    icon: Edit3,
    title: "Edit live",
    desc: "Edit TXT, Markdown, CSV, XLSX, and DOCX content directly. Changes save instantly.",
  },
  {
    icon: Download,
    title: "Download edited file",
    desc: "Download your original or edited file in the same format.",
  },
  {
    icon: Shield,
    title: "100% private",
    desc: "Files never leave your device. Everything runs in your browser.",
  },
  {
    icon: Zap,
    title: "No install needed",
    desc: "No Adobe, no Microsoft Office, no apps. Just open your browser.",
  },
];

const FAQS = [
  {
    q: "What file types can I open?",
    a: "PDF, DOC, DOCX, XLS, XLSX, CSV, PPT, PPTX, ODT, ODS, ODP, RTF, TXT, MD, and EPUB — 15 formats total.",
  },
  {
    q: "Can I edit any file?",
    a: "TXT, Markdown, CSV, and XLSX are fully editable. Word (DOCX) supports text-only editing. PDF, PowerPoint, and EPUB are view-only.",
  },
  {
    q: "Is my file safe and private?",
    a: "Yes. All files are processed entirely in your browser using JavaScript. Nothing is uploaded to any server. Your files stay on your device.",
  },
  {
    q: "Is it really free?",
    a: "Yes — 10 files per day on the free plan. Upgrade to Pro for unlimited files.",
  },
  {
    q: "What is the maximum file size?",
    a: "25 MB per file.",
  },
  {
    q: "Do I need to create an account?",
    a: "Yes — a free Fancy Digitals account is required. Sign up takes 30 seconds and is completely free.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. The document viewer is fully responsive and works on iPhone, Android, tablets, and any desktop browser.",
  },
  {
    q: "Can I open a PDF without Adobe?",
    a: "Yes. Our PDF viewer runs in your browser with no Adobe Reader or Acrobat required.",
  },
];

export default function DocumentViewerLandingPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#075a01]/6 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#ff914d]/6 blur-[100px]" />
      </div>

      {/* HERO */}
      <section className="relative px-4 pt-20 pb-12 sm:pt-28 sm:pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#075a01]/20 bg-[#075a01]/5 px-3 py-1.5 mb-6">
            <FileText className="h-3.5 w-3.5 text-[#075a01]" />
            <span className="text-xs font-bold text-[#075a01] uppercase tracking-wide">
              Free Document Viewer &amp; Editor
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Open &amp; Edit{" "}
            <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
              Any Document
            </span>{" "}
            Free in Your Browser
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            PDF, Word, Excel, PowerPoint, CSV, Markdown, EPUB and 15+ formats.
            No download. No Adobe. No Microsoft Office. Works on any device.
          </p>

          {/* Format pills */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["PDF", "DOCX", "XLSX", "CSV", "PPTX", "TXT", "EPUB", "MD"].map((f) => (
              <span
                key={f}
                className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600"
              >
                {f}
              </span>
            ))}
            <span className="rounded-md bg-[#075a01]/10 px-2.5 py-1 text-xs font-bold text-[#075a01]">
              +7 more
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/tools/document-viewer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#0a8f01] active:scale-95 transition-all"
            >
              Open Document Viewer Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-gray-500">
              Free account required &middot; 10 files/day free
            </p>
          </div>
        </div>
      </section>

      {/* PREVIEW IMAGE */}
      <section className="relative px-4 pb-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-2xl bg-gray-50">
            {/* Replace with real screenshot once available */}
            <img
  src="/tools/document-viewer.png"
  alt="Free document viewer and editor — open PDF, Word, Excel in browser"
  className="w-full h-auto"
/>
          </div>
        </div>
      </section>

      {/* ALL FORMATS */}
      <section className="relative px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Every format. One tool.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              15 document formats supported — view or edit, all free.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
            {FORMATS.map((f) => (
              <div
                key={f.ext}
                className="rounded-xl border border-gray-100 bg-white p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition"
              >
                <div
                  className="mx-auto mb-2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg text-white text-[10px] sm:text-xs font-black"
                  style={{ backgroundColor: f.color }}
                >
                  {f.ext}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-snug">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative px-4 pb-16 sm:px-6 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-5xl py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Everything you need to handle documents
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              View, edit, and download — all in your browser for free.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#075a01]/10">
                  <f.icon className="h-5 w-5 text-[#075a01]" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Who uses this tool
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Students",
                desc: "Open lecture notes, assignments, and research papers on any device without installing apps.",
              },
              {
                title: "Remote workers",
                desc: "Review documents sent by clients on shared or work computers without installing Office.",
              },
              {
                title: "Small business owners",
                desc: "Open invoices, contracts, and reports sent in any format — PDF, Word, or Excel.",
              },
              {
                title: "Job seekers",
                desc: "Preview and edit your CV or cover letter in DOCX or PDF before sending.",
              },
              {
                title: "Mobile users",
                desc: "Open any document on your phone without needing Word, Adobe, or any other app.",
              },
              {
                title: "Anyone",
                desc: "If someone sent you a file and you can't open it — this tool opens it free.",
              },
            ].map((u) => (
              <div
                key={u.title}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-[#075a01] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{u.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-4 pb-16 sm:px-6 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-3xl py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="font-bold text-gray-900 text-sm mb-1.5">{faq.q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-8 text-center shadow-2xl sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#ff914d]/20 blur-3xl" />

            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Open your document now
              </h2>
              <p className="mt-3 text-sm text-white/80 sm:text-base">
                Free. Private. No download. Works on any device.
              </p>
              <Link
                href="/dashboard/tools/document-viewer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
              >
                Open Document Viewer Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}