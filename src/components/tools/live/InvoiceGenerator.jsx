"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/* ============================================
   ICONS
============================================ */
function Ico({ d, className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const IC = {
  plus: "M12 4.5v15m7.5-7.5h-15",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  download: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  print: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z",
  save: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  upload: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
  check: "M4.5 12.75l6 6 9-13.5",
  duplicate: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75",
  folder: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z",
  x: "M6 18L18 6M6 6l12 12",
};

/* ============================================
   CONSTANTS
============================================ */
const CURRENCIES = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

const PAYMENT_TERMS = [
  "Due on Receipt",
  "Net 7",
  "Net 14",
  "Net 30",
  "Net 60",
  "Net 90",
];

const STORAGE_KEY = "fd_invoice_data";
const SAVED_KEY = "fd_saved_invoices";

function emptyItem() {
  return { id: Date.now() + Math.random(), desc: "", qty: 1, rate: 0, taxRate: 0 };
}

function newInvoice() {
  return {
    invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentTerms: "Net 30",
    currency: "NGN",
    from: { name: "", email: "", phone: "", address: "", city: "", country: "Nigeria" },
    to: { name: "", email: "", phone: "", address: "", city: "", country: "" },
    items: [emptyItem()],
    taxRate: 0,
    discountType: "percent",
    discountValue: 0,
    notes: "",
    bankDetails: "",
    logoUrl: null,
    accentColor: "#075a01",
    showTax: true,
    showDiscount: false,
  };
}

/* ============================================
   MATH
============================================ */
function calcItem(item) {
  const subtotal = item.qty * item.rate;
  const tax = subtotal * (item.taxRate / 100);
  return { subtotal, tax, total: subtotal + tax };
}

function calcTotals(invoice) {
  const itemSubtotal = invoice.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const itemTax = invoice.items.reduce((s, i) => s + i.qty * i.rate * (i.taxRate / 100), 0);
  const globalTax = itemSubtotal * (invoice.taxRate / 100);
  const totalTax = itemTax + globalTax;

  let discount = 0;
  if (invoice.showDiscount) {
    if (invoice.discountType === "percent") {
      discount = itemSubtotal * (invoice.discountValue / 100);
    } else {
      discount = invoice.discountValue;
    }
  }

  const total = itemSubtotal + totalTax - discount;
  return { subtotal: itemSubtotal, tax: totalTax, discount, total };
}

function formatMoney(amount, symbol) {
  return `${symbol}${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState(newInvoice);
  const [activeTab, setActiveTab] = useState("editor");
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [notification, setNotification] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const logoInputRef = useRef(null);

  const currency = CURRENCIES.find((c) => c.code === invoice.currency) || CURRENCIES[0];
  const totals = calcTotals(invoice);

  function notify(msg) { setNotification(msg); setTimeout(() => setNotification(""), 2500); }

  // Load from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { const d = JSON.parse(saved); setInvoice(d); if (d.logoUrl) setLogoPreview(d.logoUrl); }
      const savedList = localStorage.getItem(SAVED_KEY);
      if (savedList) setSavedInvoices(JSON.parse(savedList));
    } catch {}
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice)); } catch {}
    }, 1000);
    return () => clearTimeout(timer);
  }, [invoice]);

  function set(path, value) {
    setInvoice((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function addItem() {
    setInvoice((p) => ({ ...p, items: [...p.items, emptyItem()] }));
  }

  function removeItem(id) {
    setInvoice((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) }));
  }

  function updateItem(id, field, value) {
    setInvoice((p) => ({
      ...p,
      items: p.items.map((i) => i.id === id ? { ...i, [field]: value } : i),
    }));
  }

  function duplicateItem(id) {
    setInvoice((p) => {
      const idx = p.items.findIndex((i) => i.id === id);
      const item = { ...p.items[idx], id: Date.now() };
      const items = [...p.items];
      items.splice(idx + 1, 0, item);
      return { ...p, items };
    });
  }

  function handleLogo(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogoPreview(ev.target.result);
      set("logoUrl", ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function saveInvoice() {
    const list = [...savedInvoices, { ...invoice, savedAt: new Date().toLocaleString() }];
    setSavedInvoices(list);
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch {}
    notify(`Invoice ${invoice.invoiceNumber} saved`);
  }

  function loadInvoice(inv) {
    setInvoice(inv);
    if (inv.logoUrl) setLogoPreview(inv.logoUrl);
    setActiveTab("editor");
    notify("Invoice loaded");
  }

  function deleteSaved(i) {
    const list = savedInvoices.filter((_, j) => j !== i);
    setSavedInvoices(list);
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch {}
    notify("Deleted");
  }

  function resetInvoice() {
    setInvoice(newInvoice());
    setLogoPreview(null);
    notify("Reset");
  }

  function handlePrint() {
    const inv = invoice;
    const curr = currency;
    const tots = totals;

    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head>
<title>Invoice ${inv.invoiceNumber}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; background: white; font-size: 13px; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } }
  .page { max-width: 800px; margin: 0 auto; padding: 48px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 3px solid ${inv.accentColor}; }
  .logo { max-height: 64px; max-width: 180px; object-fit: contain; }
  .brand-name { font-size: 22px; font-weight: 800; color: ${inv.accentColor}; }
  .invoice-label { font-size: 28px; font-weight: 800; color: ${inv.accentColor}; }
  .invoice-meta { text-align: right; }
  .invoice-num { font-size: 14px; color: #666; margin-top: 6px; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 36px; }
  .party-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 8px; }
  .party-name { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
  .party-detail { font-size: 12px; color: #555; line-height: 1.6; }
  .dates { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #f8f8f8; border-radius: 10px; padding: 16px; margin-bottom: 32px; }
  .date-item label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #999; display: block; margin-bottom: 4px; }
  .date-item span { font-size: 13px; font-weight: 600; color: #1a1a1a; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  thead th { padding: 10px 12px; text-align: left; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: white; background: ${inv.accentColor}; }
  thead th:last-child { text-align: right; }
  tbody td { padding: 12px; font-size: 13px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
  tbody td:last-child { text-align: right; font-weight: 600; }
  tbody tr:nth-child(even) { background: #fafafa; }
  .totals { display: flex; justify-content: flex-end; }
  .totals-box { width: 280px; }
  .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
  .totals-row.total { font-size: 16px; font-weight: 800; color: ${inv.accentColor}; border-top: 2px solid ${inv.accentColor}; border-bottom: none; margin-top: 4px; padding-top: 12px; }
  .notes { margin-top: 32px; padding: 16px; background: #f8f8f8; border-radius: 10px; border-left: 4px solid ${inv.accentColor}; }
  .notes-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 8px; }
  .notes-text { font-size: 12px; color: #555; line-height: 1.6; white-space: pre-wrap; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 11px; color: #aaa; }
  .print-btn { position: fixed; bottom: 24px; right: 24px; background: ${inv.accentColor}; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
  .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; background: ${inv.accentColor}20; color: ${inv.accentColor}; margin-top: 8px; }
</style></head><body>
<div class="page">
  <div class="header">
    <div>
      ${inv.logoUrl ? `<img src="${inv.logoUrl}" class="logo" alt="Logo" />` : `<div class="brand-name">${inv.from.name || "Your Business"}</div>`}
      <div class="party-detail" style="margin-top:8px">${inv.from.address || ""}${inv.from.city ? `, ${inv.from.city}` : ""}${inv.from.country ? `, ${inv.from.country}` : ""}</div>
      <div class="party-detail">${inv.from.email || ""}${inv.from.phone ? ` · ${inv.from.phone}` : ""}</div>
    </div>
    <div class="invoice-meta">
      <div class="invoice-label">INVOICE</div>
      <div class="invoice-num">${inv.invoiceNumber}</div>
      <div class="status-badge">UNPAID</div>
    </div>
  </div>

  <div class="parties">
    <div>
      <div class="party-label">Bill From</div>
      <div class="party-name">${inv.from.name || "—"}</div>
      <div class="party-detail">${inv.from.email || ""}${inv.from.phone ? `<br>${inv.from.phone}` : ""}</div>
    </div>
    <div>
      <div class="party-label">Bill To</div>
      <div class="party-name">${inv.to.name || "—"}</div>
      <div class="party-detail">${inv.to.address || ""}${inv.to.city ? `<br>${inv.to.city}` : ""}${inv.to.country ? `, ${inv.to.country}` : ""}${inv.to.email ? `<br>${inv.to.email}` : ""}${inv.to.phone ? `<br>${inv.to.phone}` : ""}</div>
    </div>
  </div>

  <div class="dates">
    <div class="date-item"><label>Issue Date</label><span>${inv.issueDate || "—"}</span></div>
    <div class="date-item"><label>Due Date</label><span>${inv.dueDate || "On Receipt"}</span></div>
    <div class="date-item"><label>Payment Terms</label><span>${inv.paymentTerms}</span></div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:40%">Description</th>
        <th style="width:15%;text-align:center">Qty</th>
        <th style="width:20%;text-align:right">Rate</th>
        ${inv.showTax ? '<th style="width:10%;text-align:center">Tax</th>' : ""}
        <th style="width:15%">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${inv.items.map((item) => {
        const calc = calcItem(item);
        return `<tr>
          <td>${item.desc || "—"}</td>
          <td style="text-align:center">${item.qty}</td>
          <td style="text-align:right">${formatMoney(item.rate, curr.symbol)}</td>
          ${inv.showTax ? `<td style="text-align:center">${item.taxRate}%</td>` : ""}
          <td>${formatMoney(calc.total, curr.symbol)}</td>
        </tr>`;
      }).join("")}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-box">
      <div class="totals-row"><span>Subtotal</span><span>${formatMoney(tots.subtotal, curr.symbol)}</span></div>
      ${tots.tax > 0 ? `<div class="totals-row"><span>Tax</span><span>${formatMoney(tots.tax, curr.symbol)}</span></div>` : ""}
      ${tots.discount > 0 ? `<div class="totals-row"><span>Discount</span><span>-${formatMoney(tots.discount, curr.symbol)}</span></div>` : ""}
      <div class="totals-row total"><span>Total (${curr.code})</span><span>${formatMoney(tots.total, curr.symbol)}</span></div>
    </div>
  </div>

  ${inv.notes || inv.bankDetails ? `
  <div class="notes">
    ${inv.notes ? `<div class="notes-label">Notes & Terms</div><div class="notes-text">${inv.notes}</div>` : ""}
    ${inv.bankDetails ? `<div class="notes-label" style="margin-top:12px">Payment Details</div><div class="notes-text">${inv.bankDetails}</div>` : ""}
  </div>` : ""}

  <div class="footer">
    Generated with Fancy Digitals Invoice Generator · fancydigitals.com.ng/tools/invoice-generator
  </div>
</div>
<button class="print-btn no-print" onclick="window.print()">Download PDF</button>
</body></html>`);
    win.document.close();
    notify("Print preview opened");
  }

  /* ============================================
     INPUT CLASSES
  ============================================ */
  const ic = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10";
  const lc = "mb-1 block text-xs font-semibold text-gray-600";

  const TABS = [
    { id: "editor", label: "Editor", icon: IC.eye },
    { id: "preview", label: "Preview", icon: IC.print },
    { id: "saved", label: "Saved", icon: IC.folder },
  ];

  /* ============================================
     RENDER
  ============================================ */
  return (
    <div className="space-y-4 sm:space-y-5">

      {notification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          {notification}
        </div>
      )}

      {/* TABS + ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold transition ${activeTab === tab.id ? "bg-[#075a01] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}>
              <Ico d={tab.icon} className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={saveInvoice}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
            <Ico d={IC.save} className="h-3.5 w-3.5" /> Save
          </button>
          <button onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:opacity-90 transition">
            <Ico d={IC.download} className="h-3.5 w-3.5" /> Download PDF
          </button>
          <button onClick={resetInvoice}
            className="flex items-center gap-1.5 rounded-xl border border-red-100 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-50 transition">
            <Ico d={IC.refresh} className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ============ EDITOR TAB ============ */}
      {activeTab === "editor" && (
        <div className="grid gap-4 xl:grid-cols-[1fr_320px]">

          {/* LEFT — MAIN FORM */}
          <div className="space-y-4">

            {/* Business details */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">Your Business</h3>
                <div className="flex items-center gap-2">
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
                  <button onClick={() => logoInputRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition">
                    <Ico d={IC.upload} className="h-3 w-3" />
                    {logoPreview ? "Change Logo" : "Upload Logo"}
                  </button>
                  {logoPreview && (
                    <button onClick={() => { setLogoPreview(null); set("logoUrl", null); }}
                      className="rounded-xl border border-red-100 px-2 py-1.5 text-[10px] font-bold text-red-400 hover:bg-red-50 transition">
                      <Ico d={IC.x} className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {logoPreview && (
                <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <img src={logoPreview} alt="Logo" className="h-12 w-auto rounded-lg object-contain" />
                  <p className="text-xs text-gray-500">Logo will appear on the invoice</p>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={lc}>Business / Your Name</label>
                  <input type="text" value={invoice.from.name} onChange={(e) => set("from.name", e.target.value)} placeholder="Fancy Digitals" className={ic} />
                </div>
                <div>
                  <label className={lc}>Email</label>
                  <input type="email" value={invoice.from.email} onChange={(e) => set("from.email", e.target.value)} placeholder="hello@yourbusiness.com" className={ic} />
                </div>
                <div>
                  <label className={lc}>Phone</label>
                  <input type="tel" value={invoice.from.phone} onChange={(e) => set("from.phone", e.target.value)} placeholder="+234..." className={ic} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lc}>Address</label>
                  <input type="text" value={invoice.from.address} onChange={(e) => set("from.address", e.target.value)} placeholder="Street address" className={ic} />
                </div>
                <div>
                  <label className={lc}>City</label>
                  <input type="text" value={invoice.from.city} onChange={(e) => set("from.city", e.target.value)} placeholder="Lagos" className={ic} />
                </div>
                <div>
                  <label className={lc}>Country</label>
                  <input type="text" value={invoice.from.country} onChange={(e) => set("from.country", e.target.value)} placeholder="Nigeria" className={ic} />
                </div>
              </div>
            </div>

            {/* Client details */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900">Bill To (Client)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={lc}>Client Name / Company</label>
                  <input type="text" value={invoice.to.name} onChange={(e) => set("to.name", e.target.value)} placeholder="Client or company name" className={ic} />
                </div>
                <div>
                  <label className={lc}>Email</label>
                  <input type="email" value={invoice.to.email} onChange={(e) => set("to.email", e.target.value)} placeholder="client@email.com" className={ic} />
                </div>
                <div>
                  <label className={lc}>Phone</label>
                  <input type="tel" value={invoice.to.phone} onChange={(e) => set("to.phone", e.target.value)} placeholder="+234..." className={ic} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lc}>Address</label>
                  <input type="text" value={invoice.to.address} onChange={(e) => set("to.address", e.target.value)} placeholder="Client address" className={ic} />
                </div>
                <div>
                  <label className={lc}>City</label>
                  <input type="text" value={invoice.to.city} onChange={(e) => set("to.city", e.target.value)} placeholder="City" className={ic} />
                </div>
                <div>
                  <label className={lc}>Country</label>
                  <input type="text" value={invoice.to.country} onChange={(e) => set("to.country", e.target.value)} placeholder="Country" className={ic} />
                </div>
              </div>
            </div>

            {/* Line items */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900">Line Items</h3>

              {/* Header */}
              <div className="mb-2 hidden sm:grid grid-cols-[1fr_80px_100px_80px_80px_60px] gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                <span>Description</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Rate ({currency.symbol})</span>
                {invoice.showTax && <span className="text-center">Tax %</span>}
                <span className="text-right">Amount</span>
                <span />
              </div>

              <div className="space-y-2">
                {invoice.items.map((item, idx) => {
                  const calc = calcItem(item);
                  return (
                    <div key={item.id} className="grid gap-2 sm:grid-cols-[1fr_80px_100px_80px_80px_60px] items-start rounded-xl border border-gray-100 bg-gray-50 p-2 sm:p-0 sm:bg-transparent sm:border-0">
                      <input type="text" value={item.desc} onChange={(e) => updateItem(item.id, "desc", e.target.value)}
                        placeholder="Service or product description" className={`${ic} bg-white`} />
                      <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)}
                        min="0" step="0.5" className={`${ic} bg-white text-center`} />
                      <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                        min="0" step="0.01" className={`${ic} bg-white text-right`} />
                      {invoice.showTax && (
                        <input type="number" value={item.taxRate} onChange={(e) => updateItem(item.id, "taxRate", parseFloat(e.target.value) || 0)}
                          min="0" max="100" className={`${ic} bg-white text-center`} />
                      )}
                      <div className="flex items-center justify-end rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-bold text-gray-800">
                        {formatMoney(calc.total, currency.symbol)}
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => duplicateItem(item.id)} title="Duplicate"
                          className="flex h-10 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-[#075a01] transition">
                          <Ico d={IC.duplicate} className="h-3.5 w-3.5" />
                        </button>
                        {invoice.items.length > 1 && (
                          <button onClick={() => removeItem(item.id)} title="Remove"
                            className="flex h-10 w-9 items-center justify-center rounded-xl border border-red-100 bg-white text-red-400 hover:bg-red-50 transition">
                            <Ico d={IC.trash} className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button onClick={addItem}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-xs font-bold text-gray-500 hover:border-[#075a01] hover:text-[#075a01] transition">
                <Ico d={IC.plus} className="h-4 w-4" /> Add Line Item
              </button>
            </div>

            {/* Notes and bank details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <label className="mb-2 block text-xs sm:text-sm font-bold text-gray-900">Notes & Payment Terms</label>
                <textarea rows={4} value={invoice.notes} onChange={(e) => set("notes", e.target.value)}
                  placeholder="Thank you for your business. Please make payment by the due date."
                  className={`${ic} resize-none`} />
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <label className="mb-2 block text-xs sm:text-sm font-bold text-gray-900">Bank / Payment Details</label>
                <textarea rows={4} value={invoice.bankDetails} onChange={(e) => set("bankDetails", e.target.value)}
                  placeholder={`Bank: GTBank\nAccount Name: Fancy Digitals\nAccount Number: 0123456789\nSort Code: 058`}
                  className={`${ic} resize-none`} />
              </div>
            </div>
          </div>

          {/* RIGHT — SETTINGS */}
          <div className="space-y-4">

            {/* Invoice details */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Invoice Details</h3>

              <div>
                <label className={lc}>Invoice Number</label>
                <input type="text" value={invoice.invoiceNumber} onChange={(e) => set("invoiceNumber", e.target.value)} className={ic} />
              </div>
              <div>
                <label className={lc}>Issue Date</label>
                <input type="date" value={invoice.issueDate} onChange={(e) => set("issueDate", e.target.value)} className={ic} />
              </div>
              <div>
                <label className={lc}>Due Date</label>
                <input type="date" value={invoice.dueDate} onChange={(e) => set("dueDate", e.target.value)} className={ic} />
              </div>
              <div>
                <label className={lc}>Payment Terms</label>
                <select value={invoice.paymentTerms} onChange={(e) => set("paymentTerms", e.target.value)} className={ic}>
                  {PAYMENT_TERMS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={lc}>Currency</label>
                <select value={invoice.currency} onChange={(e) => set("currency", e.target.value)} className={ic}>
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.symbol} {c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tax and discount */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Tax & Discount</h3>

              <button onClick={() => set("showTax", !invoice.showTax)}
                className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition">
                <span className="text-xs font-semibold text-gray-700">Enable per-item tax</span>
                <div className={`h-5 w-9 rounded-full transition-colors ${invoice.showTax ? "bg-[#075a01]" : "bg-gray-200"}`}>
                  <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${invoice.showTax ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </button>

              <div>
                <label className={lc}>Global Tax Rate (%)</label>
                <input type="number" value={invoice.taxRate} onChange={(e) => set("taxRate", parseFloat(e.target.value) || 0)}
                  min="0" max="100" step="0.5" className={ic} placeholder="e.g. 7.5 for VAT" />
              </div>

              <button onClick={() => set("showDiscount", !invoice.showDiscount)}
                className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition">
                <span className="text-xs font-semibold text-gray-700">Enable discount</span>
                <div className={`h-5 w-9 rounded-full transition-colors ${invoice.showDiscount ? "bg-[#075a01]" : "bg-gray-200"}`}>
                  <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${invoice.showDiscount ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </button>

              {invoice.showDiscount && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {["percent", "fixed"].map((t) => (
                      <button key={t} onClick={() => set("discountType", t)}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${invoice.discountType === t ? "bg-[#075a01] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {t === "percent" ? "Percent (%)" : `Fixed (${currency.symbol})`}
                      </button>
                    ))}
                  </div>
                  <input type="number" value={invoice.discountValue} onChange={(e) => set("discountValue", parseFloat(e.target.value) || 0)}
                    min="0" className={ic} placeholder={invoice.discountType === "percent" ? "e.g. 10" : `e.g. 5000`} />
                </div>
              )}
            </div>

            {/* Totals summary */}
            <div className="rounded-2xl border border-[#075a01]/20 bg-[#075a01]/5 p-4 sm:p-5 space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3">Summary</h3>
              {[
                { label: "Subtotal", value: totals.subtotal },
                ...(totals.tax > 0 ? [{ label: "Tax", value: totals.tax }] : []),
                ...(totals.discount > 0 ? [{ label: "Discount", value: -totals.discount, negative: true }] : []),
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm text-gray-700">
                  <span>{row.label}</span>
                  <span className={row.negative ? "text-red-500" : ""}>
                    {row.negative ? "-" : ""}{formatMoney(Math.abs(row.value), currency.symbol)}
                  </span>
                </div>
              ))}
              <div className="border-t border-[#075a01]/20 pt-2 flex items-center justify-between">
                <span className="text-base font-bold text-[#075a01]">Total ({currency.code})</span>
                <span className="text-xl font-bold text-[#075a01]">{formatMoney(totals.total, currency.symbol)}</span>
              </div>
            </div>

            {/* Accent color */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <label className="mb-3 block text-xs font-bold text-gray-900">Invoice Accent Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={invoice.accentColor} onChange={(e) => set("accentColor", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-xl border border-gray-100 bg-transparent p-0.5" />
                <div className="flex flex-wrap gap-2">
                  {["#075a01", "#1d4ed8", "#7c3aed", "#be185d", "#b45309", "#1e293b"].map((c) => (
                    <button key={c} onClick={() => set("accentColor", c)}
                      className="h-7 w-7 rounded-full border-2 border-white shadow-sm transition hover:scale-110"
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ PREVIEW TAB ============ */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-end">
            <button onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition">
              <Ico d={IC.download} className="h-4 w-4" /> Download PDF
            </button>
            <button onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
              <Ico d={IC.print} className="h-4 w-4" /> Print
            </button>
          </div>

          {/* Live preview */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {/* Invoice preview header */}
            <div className="p-6 sm:p-10" style={{ borderTop: `4px solid ${invoice.accentColor}` }}>

              {/* Top row */}
              <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                <div>
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="h-14 w-auto object-contain mb-2" />
                  ) : (
                    <p className="text-xl font-bold" style={{ color: invoice.accentColor }}>{invoice.from.name || "Your Business"}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{invoice.from.address}{invoice.from.city ? `, ${invoice.from.city}` : ""}</p>
                  <p className="text-xs text-gray-500">{invoice.from.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black" style={{ color: invoice.accentColor }}>INVOICE</p>
                  <p className="text-sm text-gray-500 mt-1">{invoice.invoiceNumber}</p>
                  <div className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: invoice.accentColor }}>
                    UNPAID
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div className="grid gap-6 sm:grid-cols-2 mb-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">From</p>
                  <p className="font-bold text-gray-900">{invoice.from.name || "—"}</p>
                  <p className="text-sm text-gray-500">{invoice.from.email}</p>
                  <p className="text-sm text-gray-500">{invoice.from.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Bill To</p>
                  <p className="font-bold text-gray-900">{invoice.to.name || "—"}</p>
                  <p className="text-sm text-gray-500">{invoice.to.address}{invoice.to.city ? `, ${invoice.to.city}` : ""}</p>
                  <p className="text-sm text-gray-500">{invoice.to.email}</p>
                  <p className="text-sm text-gray-500">{invoice.to.phone}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-3 gap-3 rounded-2xl bg-gray-50 p-4 mb-6">
                {[
                  { label: "Issue Date", value: invoice.issueDate },
                  { label: "Due Date", value: invoice.dueDate || "On Receipt" },
                  { label: "Terms", value: invoice.paymentTerms },
                ].map((d) => (
                  <div key={d.label}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{d.label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Items table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: invoice.accentColor }}>
                      {["Description", "Qty", "Rate", ...(invoice.showTax ? ["Tax"] : []), "Amount"].map((h) => (
                        <th key={h} className="px-3 py-2.5 text-left text-xs font-bold text-white first:rounded-tl-xl last:rounded-tr-xl last:text-right">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, i) => {
                      const calc = calcItem(item);
                      return (
                        <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-3 py-2.5 text-gray-700">{item.desc || "—"}</td>
                          <td className="px-3 py-2.5 text-center text-gray-700">{item.qty}</td>
                          <td className="px-3 py-2.5 text-right text-gray-700">{formatMoney(item.rate, currency.symbol)}</td>
                          {invoice.showTax && <td className="px-3 py-2.5 text-center text-gray-700">{item.taxRate}%</td>}
                          <td className="px-3 py-2.5 text-right font-semibold text-gray-900">{formatMoney(calc.total, currency.symbol)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-6">
                <div className="w-64 space-y-1.5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span><span>{formatMoney(totals.subtotal, currency.symbol)}</span>
                  </div>
                  {totals.tax > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax</span><span>{formatMoney(totals.tax, currency.symbol)}</span>
                    </div>
                  )}
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-sm text-red-500">
                      <span>Discount</span><span>-{formatMoney(totals.discount, currency.symbol)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 text-base font-bold" style={{ color: invoice.accentColor }}>
                    <span>Total ({currency.code})</span>
                    <span>{formatMoney(totals.total, currency.symbol)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {(invoice.notes || invoice.bankDetails) && (
                <div className="rounded-xl border-l-4 bg-gray-50 p-4 space-y-3" style={{ borderColor: invoice.accentColor }}>
                  {invoice.notes && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Notes & Terms</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
                    </div>
                  )}
                  {invoice.bankDetails && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Payment Details</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.bankDetails}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 text-center text-[10px] text-gray-300 border-t pt-4">
                Generated with Fancy Digitals Invoice Generator · fancydigitals.com.ng/tools/invoice-generator
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ SAVED TAB ============ */}
      {activeTab === "saved" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Saved Invoices ({savedInvoices.length})</h3>
            {savedInvoices.length > 0 && (
              <button onClick={() => { setSavedInvoices([]); localStorage.removeItem(SAVED_KEY); notify("All cleared"); }}
                className="text-xs font-semibold text-red-400 hover:text-red-600">
                Clear all
              </button>
            )}
          </div>

          {savedInvoices.length === 0 ? (
            <div className="py-16 text-center">
              <Ico d={IC.folder} className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No saved invoices</p>
              <p className="text-xs text-gray-300 mt-1">Click Save in the editor to save invoices here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedInvoices.map((inv, i) => {
                const tots = calcTotals(inv);
                const curr = CURRENCIES.find((c) => c.code === inv.currency) || CURRENCIES[0];
                return (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: inv.accentColor }}>
                        INV
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{inv.invoiceNumber}</p>
                        <p className="text-xs text-gray-500">{inv.to.name || "No client"} · {inv.savedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-base font-bold" style={{ color: inv.accentColor }}>{formatMoney(tots.total, curr.symbol)}</p>
                      <div className="flex gap-1.5">
                        <button onClick={() => loadInvoice(inv)}
                          className="rounded-xl bg-[#075a01] px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition">
                          Load
                        </button>
                        <button onClick={() => deleteSaved(i)}
                          className="rounded-xl border border-red-100 px-2.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-50 transition">
                          <Ico d={IC.trash} className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}