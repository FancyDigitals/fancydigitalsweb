"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, FileText, Upload, X, AlertCircle, Sparkles,
  FileSpreadsheet, FileImage, File, Loader2, Download, Save,
  Edit3, Eye, Copy, Check,
} from "lucide-react";

// Map file extensions → friendly names & handler types
const FILE_TYPES = {
  pdf: { label: "PDF", type: "pdf", editable: false },
  doc: { label: "Word", type: "docx", editable: false },
  docx: { label: "Word", type: "docx", editable: true },
  xls: { label: "Excel", type: "xlsx", editable: true },
  xlsx: { label: "Excel", type: "xlsx", editable: true },
  csv: { label: "CSV", type: "csv", editable: true },
  ppt: { label: "PowerPoint", type: "pptx", editable: false },
  pptx: { label: "PowerPoint", type: "pptx", editable: false },
  odt: { label: "OpenDocument Text", type: "docx", editable: false },
  ods: { label: "OpenDocument Sheet", type: "xlsx", editable: true },
  odp: { label: "OpenDocument Slide", type: "pptx", editable: false },
  rtf: { label: "Rich Text", type: "txt", editable: true },
  txt: { label: "Text", type: "txt", editable: true },
  md: { label: "Markdown", type: "md", editable: true },
  epub: { label: "eBook", type: "epub", editable: false },
};

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export default function DocumentViewerClient({ isPro, initialUsage, limit, userEmail, userName }) {
  const [file, setFile] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState(initialUsage);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");        // raw text content
  const [editedContent, setEditedContent] = useState(""); // for editing
  const [isEditing, setIsEditing] = useState(false);
  const [mdPreview, setMdPreview] = useState(false); // MD live preview toggle
  const [csvRows, setCsvRows] = useState([]);         // parsed CSV as 2D array
  const [copied, setCopied] = useState(false);
  const [docxHtml, setDocxHtml] = useState("");    // for DOCX rendered HTML
  const [pdfPages, setPdfPages] = useState([]);    // for PDF page images
  const [pdfLoading, setPdfLoading] = useState(false);
  const fileInputRef = useRef(null);

  const remaining = isPro ? "∞" : Math.max(0, limit - usage);

  function handleFileSelect(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    validateAndSetFile(selected);
  }

  function handleDrop(e) {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) validateAndSetFile(dropped);
  }

    // Read DOCX and convert to HTML using mammoth
  async function readFileAsDocx(f) {
    setLoading(true);
    try {
      const mammoth = await import("mammoth");
      const buffer = await f.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      setDocxHtml(result.value);
      // Also extract plain text for editing mode
      const textResult = await mammoth.extractRawText({ arrayBuffer: buffer });
      setContent(textResult.value);
      setEditedContent(textResult.value);
    } catch (err) {
      setError("Failed to read Word document: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Read PDF using pdfjs-dist — render each page as canvas image
  async function readFileAsPdf(f) {
    setPdfLoading(true);
    setLoading(true);
    try {
      const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
      // Set worker
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.mjs",
        import.meta.url
      ).toString();

      const buffer = await f.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      const pages = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport,
          canvas,
        }).promise;

        pages.push(canvas.toDataURL("image/png"));
      }
      setPdfPages(pages);
    } catch (err) {
      console.error("PDF error:", err);
      setError("Failed to read PDF: " + err.message);
    } finally {
      setPdfLoading(false);
      setLoading(false);
    }
  }

    // Read Excel/ODS files → convert to CSV-style rows
  async function readFileAsSpreadsheet(f) {
    setLoading(true);
    try {
      const XLSX = await import("xlsx");
      const buffer = await f.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
      // Normalize: ensure every row has the same number of columns
      const maxCols = Math.max(...rows.map((r) => r.length), 0);
      const normalized = rows.map((r) => {
        const arr = [...r];
        while (arr.length < maxCols) arr.push("");
        return arr.map((cell) => String(cell ?? ""));
      });
      setCsvRows(normalized);
      setContent(""); // spreadsheet uses csvRows, not content
    } catch (err) {
      setError("Failed to read spreadsheet: " + err.message);
    } finally {
      setLoading(false);
    }
  }

    async function readFileAsSpreadsheet(f) {
    setLoading(true);
    try {
      const XLSX = await import("xlsx");
      const buffer = await f.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
      const maxCols = Math.max(...rows.map((r) => r.length), 0);
      const normalized = rows.map((r) => {
        const arr = [...r];
        while (arr.length < maxCols) arr.push("");
        return arr.map((cell) => String(cell ?? ""));
      });
      setCsvRows(normalized);
      setContent("");
    } catch (err) {
      setError("Failed to read spreadsheet: " + err.message);
    } finally {
      setLoading(false);
    }
  }

    // Read file as text for TXT, MD, CSV, RTF
  async function readFileAsText(f, type) {
    setLoading(true);
    try {
      const text = await f.text();
      if (type === "csv") {
        const rows = parseCSV(text);
        setCsvRows(rows);
        setContent(text);
      } else if (type === "txt" && f.name.endsWith(".rtf")) {
        // Strip basic RTF formatting to get plain text
        const stripped = stripRTF(text);
        setContent(stripped);
        setEditedContent(stripped);
      } else {
        setContent(text);
        setEditedContent(text);
      }
    } catch (err) {
      setError("Failed to read file: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Simple CSV parser (handles quoted values with commas)
  function parseCSV(text) {
    const rows = [];
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      if (!line.trim()) continue;
      const row = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === "," && !inQuotes) {
          row.push(current);
          current = "";
        } else {
          current += char;
        }
      }
      row.push(current);
      rows.push(row);
    }
    return rows;
  }

  // Convert CSV rows back to string
  function rowsToCSV(rows) {
    return rows
      .map((row) =>
        row
          .map((cell) => {
            const s = String(cell ?? "");
            if (s.includes(",") || s.includes('"') || s.includes("\n")) {
              return `"${s.replace(/"/g, '""')}"`;
            }
            return s;
          })
          .join(",")
      )
      .join("\n");
  }

  // Basic RTF stripper — removes RTF control words, keeps text
  function stripRTF(rtf) {
    return rtf
      .replace(/\\par[d]?/g, "\n")
      .replace(/\{\\[^{}]+\}/g, "")
      .replace(/\\[a-z]+[0-9]*\s?/gi, "")
      .replace(/[{}]/g, "")
      .replace(/\\\*/g, "")
      .trim();
  }

  // Render markdown to HTML (basic — headers, bold, italic, links, code, lists)
  function renderMarkdown(md) {
    let html = md
      // Escape HTML first
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-lg text-xs overflow-x-auto my-2"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">$1</code>')
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
      // Bold + italic
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#075a01] underline" target="_blank" rel="noopener">$1</a>')
      // Lists
      .replace(/^\- (.*$)/gm, '<li class="ml-5 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-5 list-decimal">$1</li>')
      // Paragraphs (double newlines)
      .split(/\n\n+/)
      .map((block) => {
        if (block.startsWith("<h") || block.startsWith("<pre") || block.startsWith("<li")) return block;
        return `<p class="mb-3 leading-relaxed">${block.replace(/\n/g, "<br/>")}</p>`;
      })
      .join("");
    return html;
  }

  function updateCsvCell(rowIdx, colIdx, value) {
    const updated = csvRows.map((row, i) =>
      i === rowIdx ? row.map((cell, j) => (j === colIdx ? value : cell)) : row
    );
    setCsvRows(updated);
  }

  function copyContent() {
    const textToCopy = fileMeta?.type === "csv" ? rowsToCSV(csvRows) : (isEditing ? editedContent : content);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

    async function downloadFile() {
    let blob;
    let filename;
    const baseName = fileMeta.name.replace(/\.[^/.]+$/, "");

    if (fileMeta?.type === "csv") {
      const csvText = rowsToCSV(csvRows);
      blob = new Blob([csvText], { type: "text/csv" });
      filename = `${baseName}.csv`;
    } else if (fileMeta?.type === "xlsx") {
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.aoa_to_sheet(csvRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      filename = `${baseName}.xlsx`;
    } else if (fileMeta?.type === "txt" || fileMeta?.type === "md") {
      const text = isEditing ? editedContent : content;
      blob = new Blob([text], { type: "text/plain" });
      filename = fileMeta.name;
    } else if (fileMeta?.type === "docx" && isEditing) {
      // If user edited DOCX, download as .txt (formatting lost)
      blob = new Blob([editedContent], { type: "text/plain" });
      filename = `${baseName}.txt`;
    } else {
      blob = file;
      filename = fileMeta.name;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function validateAndSetFile(f) {
    setError("");
    setContent("");
    setEditedContent("");
    setCsvRows([]);
    setDocxHtml("");
    setPdfPages([]);
    setIsEditing(false);
    setMdPreview(false);

    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!ext || !FILE_TYPES[ext]) {
      setError(`Unsupported file type. We support: ${Object.keys(FILE_TYPES).join(", ")}`);
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError(`File is too large. Max size is 25MB. Your file: ${(f.size / 1024 / 1024).toFixed(1)}MB`);
      return;
    }
    if (!isPro && usage >= limit) {
      setError(`Daily limit reached (${limit}/day on Free plan). Upgrade to Pro for unlimited.`);
      return;
    }

    const meta = {
      name: f.name,
      size: f.size,
      ext,
      type: FILE_TYPES[ext].type,
      label: FILE_TYPES[ext].label,
      editable: FILE_TYPES[ext].editable,
    };
    setFile(f);
    setFileMeta(meta);
    incrementUsageOnServer();

    // Auto-load content based on file type
    if (["txt", "md", "csv"].includes(meta.type) || ext === "rtf") {
      readFileAsText(f, meta.type);
    } else if (meta.type === "xlsx") {
      readFileAsSpreadsheet(f);
    } else if (meta.type === "docx") {
      readFileAsDocx(f);
    } else if (meta.type === "pdf") {
      readFileAsPdf(f);
    }
  }

  async function incrementUsageOnServer() {
    try {
      const res = await fetch("/api/tools/document-viewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "increment" }),
      });
      const data = await res.json();
      if (data.usage) setUsage(data.usage.used);
    } catch (err) {
      console.warn("Usage tracking failed", err);
    }
  }

  function resetFile() {
    setFile(null);
    setFileMeta(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Back link */}
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shrink-0">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Document Viewer & Editor</h1>
            <p className="text-sm text-gray-600 mt-1">Open, view & edit PDF, Word, Excel, PowerPoint and 15+ formats</p>
          </div>
        </div>

        {/* Usage banner */}
        <div className="rounded-xl bg-white border border-gray-200 px-4 py-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#075a01]" />
            <p className="text-sm text-gray-700">
              {isPro ? (
                <><span className="font-bold text-[#075a01]">Pro</span> — Unlimited files</>
              ) : (
                <><span className="font-bold text-gray-900">{remaining}</span> / {limit} files left today</>
              )}
            </p>
          </div>
          {!isPro && (
            <Link href="/pricing" className="text-xs font-bold text-[#075a01] hover:underline">
              Upgrade →
            </Link>
          )}
        </div>

        {/* Upload zone (only when no file loaded) */}
        {!file && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 sm:p-12 text-center hover:border-[#075a01] transition"
          >
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-[#075a01]/10 mx-auto mb-4">
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-[#075a01]" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Upload a document</h2>
            <p className="text-sm text-gray-600 mb-5">
              Drag & drop or click to browse. Max 25MB.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.odt,.ods,.odp,.rtf,.txt,.md,.epub"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold hover:opacity-90 active:scale-95 transition shadow-lg"
            >
              <Upload className="h-4 w-4" />
              Choose File
            </button>

            {/* Supported formats grid */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-3">SUPPORTED FORMATS</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {Object.keys(FILE_TYPES).map((ext) => (
                  <span key={ext} className="text-[11px] px-2 py-1 rounded-md bg-gray-100 text-gray-700 font-mono font-semibold uppercase">
                    .{ext}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* File loaded view */}
        {file && fileMeta && (
          <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
            {/* File header */}
            <div className="border-b border-gray-100 p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#075a01]/10 shrink-0">
                <FileText className="h-5 w-5 text-[#075a01]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{fileMeta.name}</p>
                <p className="text-xs text-gray-500">
                  {fileMeta.label} · {formatSize(fileMeta.size)}
                  {fileMeta.editable && <span className="ml-2 text-[#075a01] font-semibold">· Editable</span>}
                </p>
              </div>
              <button
                onClick={resetFile}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                title="Close file"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Toolbar */}
            <div className="border-b border-gray-100 px-3 py-2 bg-gray-50 flex items-center gap-2 flex-wrap">
              {fileMeta.editable && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    isEditing
                      ? "bg-[#075a01] text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-[#075a01]"
                  }`}
                >
                  {isEditing ? <Eye className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
                  {isEditing ? "View" : "Edit"}
                </button>
              )}

              {fileMeta.type === "md" && !isEditing && (
                <button
                  onClick={() => setMdPreview(!mdPreview)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    mdPreview
                      ? "bg-[#075a01] text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-[#075a01]"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  {mdPreview ? "Raw" : "Preview"}
                </button>
              )}

              <button
                onClick={copyContent}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:border-[#075a01] transition"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#075a01]" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => downloadFile()}
                  style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold hover:opacity-90 active:scale-95 transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>

            {/* Content viewer */}
            <div className="min-h-[400px] max-h-[70vh] overflow-auto">
              {loading && (
                <div className="p-8 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 text-[#075a01] animate-spin mb-3" />
                  <p className="text-sm text-gray-600">Loading document...</p>
                </div>
              )}

              {/* TXT / RTF viewer */}
              {!loading && fileMeta.type === "txt" && (
                <div className="p-4 sm:p-6">
                  {isEditing ? (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full min-h-[500px] rounded-lg border border-gray-200 p-4 text-sm font-mono focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 resize-y"
                      placeholder="Start editing..."
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">{content}</pre>
                  )}
                </div>
              )}

              {/* MD viewer */}
              {!loading && fileMeta.type === "md" && (
                <div className="p-4 sm:p-6">
                  {isEditing ? (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full min-h-[500px] rounded-lg border border-gray-200 p-4 text-sm font-mono focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 resize-y"
                      placeholder="Start editing markdown..."
                    />
                  ) : mdPreview ? (
                    <div
                      className="prose prose-sm max-w-none text-gray-800"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">{content}</pre>
                  )}
                </div>
              )}

              {/* CSV / XLSX viewer */}
              {!loading && (fileMeta.type === "csv" || fileMeta.type === "xlsx") && csvRows.length > 0 && (
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-2 text-xs font-bold text-gray-500 border-b border-gray-200 w-12">#</th>
                        {csvRows[0]?.map((_, i) => (
                          <th key={i} className="text-left px-3 py-2 text-xs font-bold text-gray-700 border-b border-gray-200 min-w-[120px]">
                            Col {i + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvRows.map((row, rowIdx) => (
                        <tr key={rowIdx} className={rowIdx === 0 ? "bg-[#075a01]/5 font-semibold" : "hover:bg-gray-50"}>
                          <td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">{rowIdx + 1}</td>
                          {row.map((cell, colIdx) => (
                            <td key={colIdx} className="border-b border-gray-100">
                              {isEditing ? (
                                <input
                                  value={cell}
                                  onChange={(e) => updateCsvCell(rowIdx, colIdx, e.target.value)}
                                  className="w-full px-3 py-2 text-sm bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#075a01]/30"
                                />
                              ) : (
                                <span className="block px-3 py-2 text-sm text-gray-800">{cell}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* DOCX viewer */}
              {!loading && fileMeta.type === "docx" && (
                <div className="p-4 sm:p-6">
                  {isEditing ? (
                    <>
                      <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 p-2.5">
                        <p className="text-xs text-amber-800">
                          <strong>Note:</strong> Editing preserves text only. Formatting (bold, colors, tables) will be lost when downloading.
                        </p>
                      </div>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full min-h-[500px] rounded-lg border border-gray-200 p-4 text-sm font-mono focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 resize-y"
                      />
                    </>
                  ) : (
                    <div
                      className="prose prose-sm max-w-none text-gray-800 docx-content"
                      dangerouslySetInnerHTML={{ __html: docxHtml || "<p class='text-gray-400'>No content to display</p>" }}
                    />
                  )}
                </div>
              )}

              {/* PDF viewer */}
              {!loading && fileMeta.type === "pdf" && (
                <div className="p-4 sm:p-6 bg-gray-100">
                  {pdfPages.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-600">Rendering PDF...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs text-center text-gray-500 font-semibold">{pdfPages.length} page{pdfPages.length !== 1 ? "s" : ""}</p>
                      {pdfPages.map((src, i) => (
                        <div key={i} className="bg-white shadow-md rounded overflow-hidden">
                          <img src={src} alt={`Page ${i + 1}`} className="w-full h-auto block" />
                          <p className="text-[10px] text-gray-400 text-center py-2 border-t border-gray-100">Page {i + 1}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fallback for unsupported viewers (PPTX, EPUB, etc.) */}
              {!loading && !["txt", "md", "csv", "xlsx", "docx", "pdf"].includes(fileMeta.type) && (
                <div className="p-8 text-center bg-gray-50 min-h-[400px] flex flex-col items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    In-browser preview not available for <span className="text-[#075a01]">{fileMeta.label}</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-4">Click Download to save the original file, then open it locally.</p>
                  <button
                    onClick={() => downloadFile()}
                    style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold hover:opacity-90 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Original
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}