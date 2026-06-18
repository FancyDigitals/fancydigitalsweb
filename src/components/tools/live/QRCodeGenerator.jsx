"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";

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
  link: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.25",
  text: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12",
  wifi: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
  mail: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  phone: "M2.25 6.338c0 6.075 4.953 11 11.028 11H15a2.25 2.25 0 002.25-2.25v-.776a.75.75 0 00-.527-.721l-3.295-.987a.75.75 0 00-.849.344l-.665 1.108a10.507 10.507 0 01-4.32-4.32l1.108-.665a.75.75 0 00.344-.85l-.987-3.294a.75.75 0 00-.72-.527H4.5A2.25 2.25 0 002.25 6.338z",
  sms: "M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  user: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  download: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  check: "M4.5 12.75l6 6 9-13.5",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  history: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  camera: "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z",
  upload: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
  scan: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75z",
  logo: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  csv: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  print: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z",
  utm: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z",
  x: "M6 18L18 6M6 6l12 12",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  grid: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
};

/* ============================================
   CONSTANTS
============================================ */
const MODES = [
  { id: "url", label: "URL", icon: IC.link },
  { id: "text", label: "Text", icon: IC.text },
  { id: "wifi", label: "WiFi", icon: IC.wifi },
  { id: "email", label: "Email", icon: IC.mail },
  { id: "phone", label: "Phone", icon: IC.phone },
  { id: "sms", label: "SMS", icon: IC.sms },
  { id: "vcard", label: "Contact", icon: IC.user },
];

const TABS = [
  { id: "generate", label: "Generate", icon: IC.scan },
  { id: "scan", label: "Scan / Decode", icon: IC.camera },
  { id: "batch", label: "Batch CSV", icon: IC.csv },
  { id: "print", label: "Print Layout", icon: IC.print },
  { id: "history", label: "History", icon: IC.history },
];

const ERROR_LEVELS = [
  { id: "L", label: "L", desc: "7%" },
  { id: "M", label: "M", desc: "15%" },
  { id: "Q", label: "Q", desc: "25%" },
  { id: "H", label: "H", desc: "30%" },
];

const PRESET_ICONS = [
  { id: "none", label: "None", emoji: "—" },
  { id: "globe", label: "Globe", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
  { id: "wifi", label: "WiFi", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>' },
  { id: "phone", label: "Phone", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' },
  { id: "mail", label: "Email", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' },
  { id: "heart", label: "Heart", svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' },
  { id: "star", label: "Star", svg: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
];

const COLOR_PRESETS = [
  { fg: "#000000", bg: "#ffffff", label: "Classic" },
  { fg: "#075a01", bg: "#ffffff", label: "Green" },
  { fg: "#ffffff", bg: "#075a01", label: "Inv. Green" },
  { fg: "#1e3a5f", bg: "#ffffff", label: "Navy" },
  { fg: "#f97316", bg: "#ffffff", label: "Orange" },
  { fg: "#8b5cf6", bg: "#ffffff", label: "Purple" },
  { fg: "#e11d48", bg: "#ffffff", label: "Red" },
  { fg: "#000000", bg: "#fef9c3", label: "Dark/Yellow" },
];

const TEMPLATES = [
  {
    id: "restaurant",
    label: "Restaurant Menu",
    mode: "url",
    prefill: { url: "https://yourmenu.com" },
    label2: "Customers scan to view your digital menu",
  },
  {
    id: "business",
    label: "Business Card",
    mode: "vcard",
    prefill: { vcardName: "Your Name", vcardOrg: "Your Company", vcardPhone: "+234...", vcardEmail: "you@company.com", vcardUrl: "https://yoursite.com" },
    label2: "Scan to save contact details instantly",
  },
  {
    id: "event",
    label: "Event Check-in",
    mode: "url",
    prefill: { url: "https://yourevent.com/checkin" },
    label2: "Attendees scan at the door to check in",
  },
  {
    id: "wifi",
    label: "Guest WiFi",
    mode: "wifi",
    prefill: { wifiSSID: "GuestWiFi", wifiPassword: "password123", wifiSecurity: "WPA" },
    label2: "Guests scan to connect automatically",
  },
  {
    id: "payment",
    label: "Payment Link",
    mode: "url",
    prefill: { url: "https://paystack.com/pay/yourlink" },
    label2: "Customers scan to pay instantly",
  },
  {
    id: "social",
    label: "Social Media",
    mode: "url",
    prefill: { url: "https://instagram.com/yourhandle" },
    label2: "Scan to follow on social media",
  },
];

const CSV_TEMPLATE = `name,type,content,fgColor,bgColor
My Website,url,https://fancydigitals.com.ng,#000000,#ffffff
My WiFi,wifi,SSID:MyNetwork|PASS:password123|SEC:WPA,#075a01,#ffffff
My Phone,phone,+2349012345678,#000000,#ffffff
My Email,email,hello@fancydigitals.com.ng,#000000,#ffffff
My Text,text,Hello World,#8b5cf6,#ffffff`;

/* ============================================
   HELPERS
============================================ */
function buildQRData(mode, fields, utmEnabled, utmParams) {
  let data = "";
  switch (mode) {
    case "url":
      data = fields.url || "";
      if (utmEnabled && data && (data.startsWith("http://") || data.startsWith("https://"))) {
        const params = new URLSearchParams();
        if (utmParams.source) params.set("utm_source", utmParams.source);
        if (utmParams.medium) params.set("utm_medium", utmParams.medium);
        if (utmParams.campaign) params.set("utm_campaign", utmParams.campaign);
        if (utmParams.content) params.set("utm_content", utmParams.content);
        const qs = params.toString();
        if (qs) data = `${data}${data.includes("?") ? "&" : "?"}${qs}`;
      }
      return data;
    case "text": return fields.text || "";
    case "wifi": return `WIFI:T:${fields.wifiSecurity || "WPA"};S:${fields.wifiSSID || ""};P:${fields.wifiPassword || ""};H:${fields.wifiHidden ? "true" : "false"};;`;
    case "email": return `mailto:${fields.emailTo || ""}?subject=${encodeURIComponent(fields.emailSubject || "")}&body=${encodeURIComponent(fields.emailBody || "")}`;
    case "phone": return `tel:${fields.phone || ""}`;
    case "sms": return `smsto:${fields.smsTo || ""}:${fields.smsBody || ""}`;
    case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.vcardName || ""}\nORG:${fields.vcardOrg || ""}\nTEL:${fields.vcardPhone || ""}\nEMAIL:${fields.vcardEmail || ""}\nURL:${fields.vcardUrl || ""}\nEND:VCARD`;
    default: return "";
  }
}

function parseCsvRow(row) {
  const cols = row.split(",").map((c) => c.trim());
  return {
    name: cols[0] || "",
    type: cols[1] || "url",
    content: cols[2] || "",
    fgColor: cols[3] || "#000000",
    bgColor: cols[4] || "#ffffff",
  };
}

function buildDataFromCsvRow(row) {
  switch (row.type) {
    case "wifi": {
      const parts = Object.fromEntries(row.content.split("|").map((p) => p.split(":")));
      return `WIFI:T:${parts.SEC || "WPA"};S:${parts.SSID || ""};P:${parts.PASS || ""};;`;
    }
    case "email": return `mailto:${row.content}`;
    case "phone": return `tel:${row.content}`;
    case "sms": return `smsto:${row.content}`;
    default: return row.content;
  }
}

async function generateQRCanvas(data, options) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    QRCode.toCanvas(canvas, data, options, (err) => {
      if (err) reject(err);
      else resolve(canvas);
    });
  });
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function QRCodeGenerator() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const scanCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const csvInputRef = useRef(null);
  const animFrameRef = useRef(null);
  const streamRef = useRef(null);

  const [mode, setMode] = useState("url");
  const [activeTab, setActiveTab] = useState("generate");
  const [fields, setFields] = useState({
    url: "https://fancydigitals.com.ng",
    text: "", wifiSSID: "", wifiPassword: "", wifiSecurity: "WPA",
    wifiHidden: false, emailTo: "", emailSubject: "", emailBody: "",
    phone: "", smsTo: "", smsBody: "",
    vcardName: "", vcardOrg: "", vcardPhone: "", vcardEmail: "", vcardUrl: "",
  });

  // Customisation
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState("H");
  const [margin, setMargin] = useState(4);

  // Logo
  const [logoMode, setLogoMode] = useState("none");
  const [logoDataUrl, setLogoDataUrl] = useState(null);
  const [selectedPresetIcon, setSelectedPresetIcon] = useState("none");
  const [logoSize, setLogoSize] = useState(20);

  // UTM
  const [utmEnabled, setUtmEnabled] = useState(false);
  const [utmParams, setUtmParams] = useState({ source: "qr", medium: "print", campaign: "", content: "" });

  // State
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState("");
  const [generating, setGenerating] = useState(false);

  // Scan
  const [scanMode, setScanMode] = useState("upload");
  const [cameraActive, setCameraActive] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState("");
  const [scanning, setScanning] = useState(false);

  // Batch
  const [csvText, setCsvText] = useState(CSV_TEMPLATE);
  const [batchRows, setBatchRows] = useState([]);
  const [batchGenerating, setBatchGenerating] = useState(false);
  const [batchResults, setBatchResults] = useState([]);

  // Print
  const [printLayout, setPrintLayout] = useState("center");
  const [printLabel, setPrintLabel] = useState("");
  const [printSubLabel, setPrintSubLabel] = useState("");
  const [printGridCols, setPrintGridCols] = useState(3);

  function notify(msg) { setNotification(msg); setTimeout(() => setNotification(""), 2500); }
  function setField(key, value) { setFields((p) => ({ ...p, [key]: value })); }

  const currentData = buildQRData(mode, fields, utmEnabled, utmParams);
  const hasData = currentData.trim().length > 0;

  /* ============================================
     DRAW QR TO CANVAS WITH OPTIONAL LOGO
  ============================================ */
  const drawQR = useCallback(async () => {
    if (!currentData.trim()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setGenerating(true);

    try {
      await new Promise((resolve, reject) => {
        QRCode.toCanvas(canvas, currentData, {
          width: size, margin,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
        }, (err) => err ? reject(err) : resolve());
      });

      // Draw logo/icon overlay
      if (logoMode !== "none") {
        const ctx = canvas.getContext("2d");
        const logoW = (size * logoSize) / 100;
        const logoH = logoW;
        const logoX = (size - logoW) / 2;
        const logoY = (size - logoH) / 2;

        // White background circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, (logoW / 2) + 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();

        if (logoMode === "upload" && logoDataUrl) {
          const img = new Image();
          img.src = logoDataUrl;
          await new Promise((r) => { img.onload = r; });
          ctx.drawImage(img, logoX, logoY, logoW, logoH);
        } else if (logoMode === "preset" && selectedPresetIcon !== "none") {
          const preset = PRESET_ICONS.find((p) => p.id === selectedPresetIcon);
          if (preset?.svg) {
            const blob = new Blob([preset.svg.replace('stroke="currentColor"', `stroke="${fgColor}"`).replace('fill="currentColor"', `fill="${fgColor}"`)], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.src = url;
            await new Promise((r) => { img.onload = r; });
            ctx.drawImage(img, logoX, logoY, logoW, logoH);
            URL.revokeObjectURL(url);
          }
        }
      }
    } catch {}
    setGenerating(false);
  }, [currentData, size, fgColor, bgColor, errorLevel, margin, logoMode, logoDataUrl, selectedPresetIcon, logoSize]);

  useEffect(() => { drawQR(); }, [drawQR]);

  /* ============================================
     DOWNLOAD
  ============================================ */
  function downloadPNG() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `qr-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    saveToHistory();
    notify("PNG downloaded");
  }

  async function downloadSVG() {
    if (!currentData.trim()) return;
    try {
      const svg = await QRCode.toString(currentData, {
        type: "svg", margin,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: errorLevel, width: size,
      });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `qr-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(a.href);
      saveToHistory();
      notify("SVG downloaded");
    } catch { notify("SVG failed"); }
  }

  async function copyImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true); setTimeout(() => setCopied(false), 2000);
        notify("Image copied");
      } catch { notify("Use Download PNG instead"); }
    });
  }

  function saveToHistory() {
    const canvas = canvasRef.current;
    if (!canvas || !currentData.trim()) return;
    const thumbnail = canvas.toDataURL("image/png");
    setHistory((prev) => [{ data: currentData, mode, thumbnail, ts: new Date().toLocaleTimeString(), size, fgColor, bgColor },...prev].slice(0, 12));
  }

  /* ============================================
     LOGO UPLOAD
  ============================================ */
  function handleLogoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setLogoDataUrl(ev.target.result); setLogoMode("upload"); };
    reader.readAsDataURL(file);
  }

  /* ============================================
     SCAN — IMAGE UPLOAD
  ============================================ */
  async function handleScanUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanError(""); setScanResult(null); setScanning(true);
    try {
      const jsQR = (await import("jsqr")).default;
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;
      await new Promise((r) => { img.onload = r; });
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      const result = jsQR(imageData.data, imageData.width, imageData.height);
      URL.revokeObjectURL(url);
      if (result) setScanResult(result.data);
      else setScanError("No QR code found in this image. Make sure the QR code is clear and well-lit.");
    } catch { setScanError("Failed to read image."); }
    setScanning(false);
  }

  /* ============================================
     SCAN — CAMERA
  ============================================ */
  async function startCamera() {
    setScanError(""); setScanResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setCameraActive(true);
      scanFrame();
    } catch { setScanError("Camera access denied. Please allow camera permission."); }
  }

  function stopCamera() {
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setCameraActive(false);
  }

  async function scanFrame() {
    const jsQR = (await import("jsqr")).default;
    function tick() {
      const video = videoRef.current;
      const canvas = scanCanvasRef.current;
      if (!video || !canvas) return;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const result = jsQR(imageData.data, imageData.width, imageData.height);
        if (result) { setScanResult(result.data); stopCamera(); return; }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    }
    tick();
  }

  useEffect(() => () => stopCamera(), []);

  /* ============================================
     BATCH CSV
  ============================================ */
  async function generateBatch() {
    const lines = csvText.trim().split("\n").slice(1).filter((l) => l.trim());
    if (!lines.length) { notify("No valid rows found"); return; }
    setBatchGenerating(true);
    setBatchResults([]);
    const results = [];
    for (const line of lines) {
      const row = parseCsvRow(line);
      if (!row.content) continue;
      const data = buildDataFromCsvRow(row);
      try {
        const canvas = await generateQRCanvas(data, {
          width: 200, margin: 2,
          color: { dark: row.fgColor, light: row.bgColor },
          errorCorrectionLevel: "H",
        });
        results.push({ ...row, thumbnail: canvas.toDataURL("image/png"), canvas });
      } catch {}
    }
    setBatchResults(results);
    setBatchGenerating(false);
    notify(`${results.length} QR codes generated`);
  }

  function downloadAllBatch() {
    batchResults.forEach((r, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.download = `${r.name || `qr-${i + 1}`}.png`;
        a.href = r.thumbnail;
        a.click();
      }, i * 300);
    });
    notify("Downloading all...");
  }

  function parseCsvFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCsvText(ev.target.result);
    reader.readAsText(file);
  }

  /* ============================================
     PRINT
  ============================================ */
  function handlePrint() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const win = window.open("", "_blank");
    const isGrid = printLayout === "grid";
    const items = isGrid ? batchResults : [{ thumbnail: dataUrl, name: printLabel }];

    win.document.write(`<!DOCTYPE html><html><head><title>QR Code — Fancy Digitals</title><style>
      body { margin: 0; font-family: system-ui, sans-serif; background: white; }
      @media print { body { margin: 0; } .no-print { display: none; } }
      .center-layout { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 40px; }
      .center-layout img { max-width: 400px; width: 100%; }
      .label { margin-top: 16px; font-size: 24px; font-weight: 700; text-align: center; }
      .sublabel { margin-top: 8px; font-size: 14px; color: #666; text-align: center; }
      .grid-layout { display: grid; grid-template-columns: repeat(${printGridCols}, 1fr); gap: 24px; padding: 24px; }
      .grid-item { display: flex; flex-direction: column; align-items: center; border: 1px solid #eee; border-radius: 12px; padding: 16px; }
      .grid-item img { width: 100%; max-width: 180px; }
      .grid-label { margin-top: 8px; font-size: 12px; font-weight: 600; text-align: center; }
      .footer { text-align: center; padding: 16px; font-size: 11px; color: #aaa; border-top: 1px solid #eee; margin-top: 24px; }
      .print-btn { position: fixed; bottom: 20px; right: 20px; background: #075a01; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; }
    </style></head><body>`);

    if (isGrid && batchResults.length > 0) {
      win.document.write(`<div class="grid-layout">`);
      batchResults.forEach((item) => {
        win.document.write(`<div class="grid-item"><img src="${item.thumbnail}" /><div class="grid-label">${item.name}</div></div>`);
      });
      win.document.write(`</div>`);
    } else {
      win.document.write(`<div class="center-layout">
        <img src="${dataUrl}" alt="QR Code" />
        ${printLabel ? `<div class="label">${printLabel}</div>` : ""}
        ${printSubLabel ? `<div class="sublabel">${printSubLabel}</div>` : ""}
      </div>`);
    }

    win.document.write(`<div class="footer">Generated by Fancy Digitals — fancydigitals.com.ng/tools/qr-code-generator</div>`);
    win.document.write(`<button class="print-btn no-print" onclick="window.print()">Print</button>`);
    win.document.write(`</body></html>`);
    win.document.close();
  }

  /* ============================================
     INPUT FORMS
  ============================================ */
  const ic = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/10";
  const lc = "mb-1 block text-xs font-semibold text-gray-600";

  function InputForm() {
    switch (mode) {
      case "url": return (
        <div className="space-y-3">
          <div>
            <label className={lc}>Website URL</label>
            <input type="url" value={fields.url} onChange={(e) => setField("url", e.target.value)} placeholder="https://example.com" className={ic} />
          </div>
          {/* UTM Builder */}
          <div>
            <button onClick={() => setUtmEnabled(!utmEnabled)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition">
              <span className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <Ico d={IC.utm} className="h-4 w-4 text-[#f97316]" /> Add UTM tracking parameters
              </span>
              <div className={`h-5 w-9 rounded-full transition-colors ${utmEnabled ? "bg-[#f97316]" : "bg-gray-200"}`}>
                <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${utmEnabled ? "translate-x-4" : "translate-x-0"}`} />
              </div>
            </button>
            {utmEnabled && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { key: "source", placeholder: "qr, print, email" },
                  { key: "medium", placeholder: "print, digital, social" },
                  { key: "campaign", placeholder: "summer-sale, launch" },
                  { key: "content", placeholder: "menu, poster, card" },
                ].map((u) => (
                  <div key={u.key}>
                    <label className={lc}>utm_{u.key}</label>
                    <input type="text" value={utmParams[u.key]} onChange={(e) => setUtmParams((p) => ({ ...p, [u.key]: e.target.value }))}
                      placeholder={u.placeholder} className={ic} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
      case "text": return (
        <div>
          <label className={lc}>Plain Text</label>
          <textarea rows={4} value={fields.text} onChange={(e) => setField("text", e.target.value)}
            placeholder="Enter any text..." className={`${ic} resize-none`} />
          <p className="mt-1 text-[10px] text-gray-400">{fields.text.length} characters</p>
        </div>
      );
      case "wifi": return (
        <div className="space-y-3">
          <div><label className={lc}>Network Name (SSID)</label><input type="text" value={fields.wifiSSID} onChange={(e) => setField("wifiSSID", e.target.value)} placeholder="Your WiFi name" className={ic} /></div>
          <div><label className={lc}>Password</label><input type="text" value={fields.wifiPassword} onChange={(e) => setField("wifiPassword", e.target.value)} placeholder="WiFi password" className={ic} /></div>
          <div>
            <label className={lc}>Security</label>
            <div className="flex gap-2">{["WPA", "WEP", "nopass"].map((s) => (<button key={s} onClick={() => setField("wifiSecurity", s)} className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${fields.wifiSecurity === s ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>))}</div>
          </div>
          <button onClick={() => setField("wifiHidden", !fields.wifiHidden)} className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition">
            <span className="text-xs font-semibold text-gray-700">Hidden network</span>
            <div className={`h-5 w-9 rounded-full transition-colors ${fields.wifiHidden ? "bg-[#f97316]" : "bg-gray-200"}`}><div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${fields.wifiHidden ? "translate-x-4" : "translate-x-0"}`} /></div>
          </button>
        </div>
      );
      case "email": return (
        <div className="space-y-3">
          <div><label className={lc}>To</label><input type="email" value={fields.emailTo} onChange={(e) => setField("emailTo", e.target.value)} placeholder="recipient@example.com" className={ic} /></div>
          <div><label className={lc}>Subject</label><input type="text" value={fields.emailSubject} onChange={(e) => setField("emailSubject", e.target.value)} placeholder="Subject line" className={ic} /></div>
          <div><label className={lc}>Body</label><textarea rows={3} value={fields.emailBody} onChange={(e) => setField("emailBody", e.target.value)} placeholder="Email body..." className={`${ic} resize-none`} /></div>
        </div>
      );
      case "phone": return (
        <div><label className={lc}>Phone Number</label><input type="tel" value={fields.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="+2349012345678" className={ic} /><p className="mt-1 text-[10px] text-gray-400">Include country code</p></div>
      );
      case "sms": return (
        <div className="space-y-3">
          <div><label className={lc}>Phone Number</label><input type="tel" value={fields.smsTo} onChange={(e) => setField("smsTo", e.target.value)} placeholder="+2349012345678" className={ic} /></div>
          <div><label className={lc}>Message</label><textarea rows={3} value={fields.smsBody} onChange={(e) => setField("smsBody", e.target.value)} placeholder="Pre-filled message..." className={`${ic} resize-none`} /></div>
        </div>
      );
      case "vcard": return (
        <div className="space-y-3">
          <div><label className={lc}>Full Name</label><input type="text" value={fields.vcardName} onChange={(e) => setField("vcardName", e.target.value)} placeholder="John Doe" className={ic} /></div>
          <div><label className={lc}>Organisation</label><input type="text" value={fields.vcardOrg} onChange={(e) => setField("vcardOrg", e.target.value)} placeholder="Company" className={ic} /></div>
          <div><label className={lc}>Phone</label><input type="tel" value={fields.vcardPhone} onChange={(e) => setField("vcardPhone", e.target.value)} placeholder="+2349012345678" className={ic} /></div>
          <div><label className={lc}>Email</label><input type="email" value={fields.vcardEmail} onChange={(e) => setField("vcardEmail", e.target.value)} placeholder="john@example.com" className={ic} /></div>
          <div><label className={lc}>Website</label><input type="url" value={fields.vcardUrl} onChange={(e) => setField("vcardUrl", e.target.value)} placeholder="https://example.com" className={ic} /></div>
        </div>
      );
      default: return null;
    }
  }

  /* ============================================
     RENDER
  ============================================ */
  return (
    <div className="space-y-4 sm:space-y-5">

      {notification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-pulse">
          {notification}
        </div>
      )}

      {/* MAIN TABS */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 rounded-xl py-2.5 px-1 text-[9px] sm:text-[10px] font-bold transition ${activeTab === tab.id ? "bg-[#f97316] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}>
            <Ico d={tab.icon} className="h-4 w-4" />
            <span className="text-center leading-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ============ GENERATE TAB ============ */}
      {activeTab === "generate" && (
        <div className="grid gap-4 sm:gap-5 xl:grid-cols-[1fr_340px]">
          <div className="space-y-4">

            {/* Templates */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Quick Templates</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {TEMPLATES.map((t) => (
                  <button key={t.id}
                    onClick={() => { setMode(t.mode); setFields((p) => ({ ...p, ...t.prefill })); notify(`${t.label} template loaded`); }}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-left hover:bg-[#f97316]/5 hover:border-[#f97316]/20 transition">
                    <p className="text-xs font-bold text-gray-800">{t.label}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400 leading-tight">{t.label2}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode selector */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">QR Code Type</h3>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {MODES.map((m) => (
                  <button key={m.id} onClick={() => setMode(m.id)}
                    className={`flex flex-col items-center gap-1 rounded-xl p-2 sm:p-2.5 transition ${mode === m.id ? "bg-[#f97316] text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}>
                    <Ico d={m.icon} className="h-4 w-4" />
                    <span className="text-[9px] sm:text-[10px] font-bold">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input form */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-2">
                <Ico d={MODES.find((m2) => m2.id === mode)?.icon || IC.link} className="h-4 w-4 text-[#f97316]" />
                {MODES.find((m2) => m2.id === mode)?.label} Details
              </h3>
              <InputForm />
            </div>

            {/* Customisation */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-5">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Customise</h3>

              {/* Size */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700">Size</label>
                  <span className="rounded-xl bg-[#f97316]/10 px-3 py-1 text-xs font-bold text-[#f97316]">{size}px</span>
                </div>
                <input type="range" min={100} max={1000} step={50} value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full accent-[#f97316]" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {[150, 200, 300, 400, 500].map((s) => (
                    <button key={s} onClick={() => setSize(s)} className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${size === s ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}px</button>
                  ))}
                </div>
              </div>

              {/* Colours */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">Foreground</label>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-2">
                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent" />
                    <code className="text-xs font-mono text-gray-700">{fgColor}</code>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">Background</label>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-2">
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent" />
                    <code className="text-xs font-mono text-gray-700">{bgColor}</code>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button key={p.label} onClick={() => { setFgColor(p.fg); setBgColor(p.bg); }}
                    className="flex items-center gap-1.5 rounded-xl border border-gray-100 px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                    <span className="h-3 w-3 rounded-full border border-gray-200" style={{ backgroundColor: p.fg }} />
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Error level */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">Error Correction <span className="font-normal text-gray-400">— higher = more damage resistant</span></label>
                <div className="grid grid-cols-4 gap-2">
                  {ERROR_LEVELS.map((l) => (
                    <button key={l.id} onClick={() => setErrorLevel(l.id)}
                      className={`rounded-xl py-2 text-center transition ${errorLevel === l.id ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      <p className="text-sm font-bold">{l.label}</p>
                      <p className="text-[9px]">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Margin */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700">Quiet Zone</label>
                  <span className="text-xs font-bold text-[#f97316]">{margin}</span>
                </div>
                <input type="range" min={0} max={10} value={margin} onChange={(e) => setMargin(parseInt(e.target.value))} className="w-full accent-[#f97316]" />
              </div>
            </div>

            {/* Logo / Icon */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-2">
                <Ico d={IC.logo} className="h-4 w-4 text-gray-400" /> Center Logo / Icon
                <span className="text-[10px] font-normal text-gray-400">requires H error correction</span>
              </h3>

              <div className="flex gap-2">
                {[{ id: "none", label: "None" }, { id: "preset", label: "Preset Icon" }, { id: "upload", label: "Upload Logo" }].map((o) => (
                  <button key={o.id} onClick={() => setLogoMode(o.id)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${logoMode === o.id ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {o.label}
                  </button>
                ))}
              </div>

              {logoMode === "preset" && (
                <div>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {PRESET_ICONS.map((p) => (
                      <button key={p.id} onClick={() => setSelectedPresetIcon(p.id)}
                        className={`rounded-xl p-2.5 flex flex-col items-center gap-1 transition ${selectedPresetIcon === p.id ? "bg-[#f97316] text-white" : "bg-gray-50 hover:bg-gray-100"}`}>
                        {p.svg ? (
                          <span className="h-5 w-5" dangerouslySetInnerHTML={{ __html: p.svg.replace('stroke="currentColor"', `stroke="${selectedPresetIcon === p.id ? "#fff" : "#374151"}"`) }} />
                        ) : <span className="text-sm">{p.emoji}</span>}
                        <span className="text-[9px] font-bold">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {logoMode === "upload" && (
                <div>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <button onClick={() => logoInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-6 text-sm font-semibold text-gray-500 hover:border-[#f97316] hover:text-[#f97316] transition">
                    <Ico d={IC.upload} className="h-5 w-5" />
                    {logoDataUrl ? "Change logo image" : "Upload logo (PNG, SVG, JPG)"}
                  </button>
                  {logoDataUrl && <img src={logoDataUrl} alt="Logo preview" className="mt-2 h-12 w-12 rounded-xl object-contain border border-gray-100 mx-auto" />}
                </div>
              )}

              {logoMode !== "none" && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700">Logo Size</label>
                    <span className="text-xs font-bold text-[#f97316]">{logoSize}%</span>
                  </div>
                  <input type="range" min={10} max={35} value={logoSize} onChange={(e) => setLogoSize(parseInt(e.target.value))} className="w-full accent-[#f97316]" />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — PREVIEW */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">Preview</h3>
                {generating && <span className="text-[10px] text-gray-400 animate-pulse">Generating...</span>}
              </div>

              <div className="flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-4 sm:p-6 min-h-[220px]">
                {hasData ? (
                  <canvas ref={canvasRef} className="rounded-xl max-w-full" style={{ imageRendering: "pixelated" }} />
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Ico d={IC.scan} className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400">Enter content to generate</p>
                  </div>
                )}
                {!hasData && <canvas ref={canvasRef} className="hidden" />}
              </div>

              {hasData && (
                <div className="mt-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={downloadPNG} className="flex items-center justify-center gap-2 rounded-xl bg-[#f97316] py-3 text-sm font-bold text-white hover:bg-[#ea6c0a] transition">
                      <Ico d={IC.download} className="h-4 w-4" /> PNG
                    </button>
                    <button onClick={downloadSVG} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                      <Ico d={IC.download} className="h-4 w-4" /> SVG
                    </button>
                  </div>
                  <button onClick={copyImage} className={`w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition ${copied ? "bg-green-500 text-white border-green-500" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                    <Ico d={copied ? IC.check : IC.copy} className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy Image"}
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={saveToHistory} className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition">
                      <Ico d={IC.history} className="h-3.5 w-3.5" /> Save
                    </button>
                    <button onClick={handlePrint} className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition">
                      <Ico d={IC.print} className="h-3.5 w-3.5" /> Print
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Encoded data */}
            {hasData && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-xs font-bold text-gray-900">Encoded Data</h3>
                <div className="rounded-xl bg-gray-50 p-3 max-h-20 overflow-y-auto">
                  <code className="text-[10px] text-gray-600 break-all leading-relaxed">{currentData}</code>
                </div>
                <p className="mt-1 text-[10px] text-gray-400">{currentData.length} characters</p>
              </div>
            )}

            {/* Tips */}
            <div className="rounded-2xl border border-[#f97316]/10 bg-[#f97316]/5 p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#f97316]">Tips</p>
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-700">
                <li className="flex gap-2"><span className="text-[#f97316] font-bold shrink-0">→</span>Use H error correction for logos and print</li>
                <li className="flex gap-2"><span className="text-[#f97316] font-bold shrink-0">→</span>Minimum 2×2cm for reliable scanning</li>
                <li className="flex gap-2"><span className="text-[#f97316] font-bold shrink-0">→</span>High contrast colours scan best</li>
                <li className="flex gap-2"><span className="text-[#f97316] font-bold shrink-0">→</span>SVG format is best for large print</li>
                <li className="flex gap-2"><span className="text-[#f97316] font-bold shrink-0">→</span>Always test before printing in bulk</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============ SCAN TAB ============ */}
      {activeTab === "scan" && (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="space-y-4">
            <div className="flex rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              {[{ id: "upload", label: "Upload Image", icon: IC.upload }, { id: "camera", label: "Use Camera", icon: IC.camera }].map((tab) => (
                <button key={tab.id} onClick={() => { setScanMode(tab.id); setScanResult(null); setScanError(""); if (tab.id !== "camera") stopCamera(); }}
                  className={`flex flex-1 items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold transition ${scanMode === tab.id ? "bg-[#f97316] text-white" : "text-gray-400 hover:bg-gray-50"}`}>
                  <Ico d={tab.icon} className="h-4 w-4" /> {tab.label}
                </button>
              ))}
            </div>

            {scanMode === "upload" && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleScanUpload} />
                <button onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 py-12 hover:border-[#f97316] hover:bg-[#f97316]/5 transition">
                  <Ico d={IC.upload} className="h-10 w-10 text-gray-300" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Upload QR code image</p>
                    <p className="mt-1 text-xs text-gray-400">PNG, JPG, WEBP supported</p>
                  </div>
                </button>
                {scanning && <p className="mt-3 text-center text-sm text-gray-500 animate-pulse">Scanning...</p>}
              </div>
            )}

            {scanMode === "camera" && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                {!cameraActive ? (
                  <button onClick={startCamera}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#f97316] py-6 text-sm font-bold text-white hover:bg-[#ea6c0a] transition">
                    <Ico d={IC.camera} className="h-6 w-6" /> Start Camera Scan
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-black">
                      <video ref={videoRef} className="w-full rounded-2xl" playsInline muted />
                      <canvas ref={scanCanvasRef} className="hidden" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="h-48 w-48 border-2 border-[#f97316] rounded-2xl opacity-70" />
                      </div>
                      <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/80 font-semibold">Point at QR code</p>
                    </div>
                    <button onClick={stopCamera} className="w-full rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                      Stop Camera
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Scan Result */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900">Scan Result</h3>
            {scanError && (
              <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
                <p className="text-sm font-bold text-red-600 mb-1">Scan failed</p>
                <p className="text-xs text-red-500">{scanError}</p>
              </div>
            )}
            {scanResult ? (
              <div className="space-y-3">
                <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
                  <p className="text-xs font-bold text-green-700 mb-1 flex items-center gap-1">
                    <Ico d={IC.check} className="h-3.5 w-3.5" /> QR Code Decoded Successfully
                  </p>
                  <p className="text-sm text-green-800 break-all leading-relaxed font-mono">{scanResult}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(scanResult); notify("Copied"); }}
                    className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-black transition">
                    <Ico d={IC.copy} className="h-3.5 w-3.5" /> Copy Result
                  </button>
                  {(scanResult.startsWith("http://") || scanResult.startsWith("https://")) && (
                    <a href={scanResult} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                      <Ico d={IC.eye} className="h-3.5 w-3.5" /> Open URL
                    </a>
                  )}
                  <button onClick={() => { setFields((p) => ({ ...p, url: scanResult })); setMode("url"); setActiveTab("generate"); notify("Loaded into generator"); }}
                    className="flex items-center gap-1.5 rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-2 text-xs font-bold text-[#f97316] hover:bg-[#f97316]/20 transition">
                    <Ico d={IC.refresh} className="h-3.5 w-3.5" /> Generate QR from this
                  </button>
                </div>
              </div>
            ) : !scanError && (
              <div className="py-12 text-center">
                <Ico d={IC.scan} className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400 font-medium">No result yet</p>
                <p className="text-xs text-gray-300 mt-1">Upload an image or use camera to decode a QR code</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ BATCH TAB ============ */}
      {activeTab === "batch" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">Batch QR Code Generator</h3>
                <p className="mt-0.5 text-xs text-gray-400">Upload a CSV or edit below. One QR code per row.</p>
              </div>
              <div className="flex gap-2">
                <input ref={csvInputRef} type="file" accept=".csv,.txt" className="hidden" onChange={parseCsvFile} />
                <button onClick={() => csvInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                  <Ico d={IC.upload} className="h-3.5 w-3.5" /> Upload CSV
                </button>
                <button onClick={() => { const b = new Blob([CSV_TEMPLATE], { type: "text/csv" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "qr-template.csv"; a.click(); }}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                  <Ico d={IC.download} className="h-3.5 w-3.5" /> Template
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-[#f97316]/5 border border-[#f97316]/10 p-3 mb-4">
              <p className="text-[10px] font-bold text-[#f97316] mb-1">CSV Format:</p>
              <code className="text-[10px] text-gray-600">name, type, content, fgColor, bgColor</code><br />
              <code className="text-[10px] text-gray-500">type options: url, text, phone, email, sms, wifi</code>
            </div>

            <textarea rows={8} value={csvText} onChange={(e) => setCsvText(e.target.value)}
              className="w-full resize-y rounded-xl border border-gray-200 p-3 font-mono text-xs outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/10" />

            <button onClick={generateBatch} disabled={batchGenerating}
              className="mt-3 w-full rounded-xl bg-[#f97316] py-3 text-sm font-bold text-white hover:bg-[#ea6c0a] disabled:opacity-50 transition">
              {batchGenerating ? "Generating..." : "Generate All QR Codes"}
            </button>
          </div>

          {batchResults.length > 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">{batchResults.length} QR Codes Generated</h3>
                <div className="flex gap-2">
                  <button onClick={downloadAllBatch}
                    className="flex items-center gap-1.5 rounded-xl bg-[#f97316] px-4 py-2 text-xs font-bold text-white hover:bg-[#ea6c0a] transition">
                    <Ico d={IC.download} className="h-3.5 w-3.5" /> Download All
                  </button>
                  <button onClick={() => { setPrintLayout("grid"); handlePrint(); }}
                    className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                    <Ico d={IC.print} className="h-3.5 w-3.5" /> Print Grid
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {batchResults.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-3 text-center">
                    <img src={r.thumbnail} alt={r.name} className="w-full rounded-xl mb-2 bg-white" />
                    <p className="text-xs font-bold text-gray-800 truncate">{r.name}</p>
                    <span className="text-[10px] text-gray-400 capitalize">{r.type}</span>
                    <a href={r.thumbnail} download={`${r.name}.png`}
                      className="mt-2 flex items-center justify-center gap-1 rounded-xl bg-gray-100 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-gray-200 transition">
                      <Ico d={IC.download} className="h-3 w-3" /> Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============ PRINT TAB ============ */}
      {activeTab === "print" && (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Print Layout</h3>

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">Layout Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ id: "center", label: "Centered (A4)", icon: IC.print }, { id: "grid", label: "Grid (Batch)", icon: IC.grid }].map((l) => (
                    <button key={l.id} onClick={() => setPrintLayout(l.id)}
                      className={`flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition ${printLayout === l.id ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      <Ico d={l.icon} className="h-4 w-4" /> {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {printLayout === "center" && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">Main Label</label>
                    <input type="text" value={printLabel} onChange={(e) => setPrintLabel(e.target.value)}
                      placeholder="e.g. Scan to visit our menu" className={ic} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">Sub Label</label>
                    <input type="text" value={printSubLabel} onChange={(e) => setPrintSubLabel(e.target.value)}
                      placeholder="e.g. fancydigitals.com.ng" className={ic} />
                  </div>
                </>
              )}

              {printLayout === "grid" && (
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-700">Columns per Row</label>
                  <div className="flex gap-2">
                    {[2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setPrintGridCols(n)}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${printGridCols === n ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                  {batchResults.length === 0 && (
                    <div className="mt-3 rounded-xl bg-yellow-50 border border-yellow-100 p-3">
                      <p className="text-xs text-yellow-700 font-semibold">No batch QR codes yet</p>
                      <p className="text-[10px] text-yellow-600 mt-0.5">Go to Batch CSV tab and generate QR codes first, then return here to print them in a grid.</p>
                    </div>
                  )}
                </div>
              )}

              <button onClick={handlePrint} disabled={!hasData && printLayout === "center"}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-bold text-white hover:bg-black disabled:opacity-30 transition">
                <Ico d={IC.print} className="h-4 w-4" /> Open Print Preview
              </button>

              <div className="rounded-xl bg-[#f97316]/5 border border-[#f97316]/10 p-3">
                <p className="text-[10px] font-bold text-[#f97316] mb-1">Print Tips</p>
                <ul className="space-y-1 text-[10px] text-gray-600">
                  <li>→ Use 300px+ size for crisp print quality</li>
                  <li>→ H error correction survives real-world wear</li>
                  <li>→ Test scan the printed QR before bulk printing</li>
                  <li>→ Leave at least 5mm white space around the QR</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Print preview */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900">Layout Preview</h3>
            <div className="rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 p-6 min-h-[300px] flex flex-col items-center justify-center">
              {hasData ? (
                <>
                  <canvas ref={canvasRef} className="rounded-xl max-w-[200px] w-full" style={{ imageRendering: "pixelated" }} />
                  {printLabel && <p className="mt-4 text-base font-bold text-gray-900 text-center">{printLabel}</p>}
                  {printSubLabel && <p className="mt-1 text-sm text-gray-500 text-center">{printSubLabel}</p>}
                  <div className="mt-4 w-full border-t border-gray-100 pt-3 text-center">
                    <p className="text-[10px] text-gray-300">fancydigitals.com.ng/tools/qr-code-generator</p>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Ico d={IC.print} className="h-10 w-10 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Generate a QR code first</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============ HISTORY TAB ============ */}
      {activeTab === "history" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Saved QR Codes</h3>
            {history.length > 0 && (
              <button onClick={() => setHistory([])} className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 transition">
                <Ico d={IC.trash} className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <div className="py-16 text-center">
              <Ico d={IC.history} className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No saved QR codes yet</p>
              <p className="text-xs text-gray-300 mt-1">Click Save or Download in the Generate tab</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {history.map((item, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  <img src={item.thumbnail} alt="QR" className="w-full rounded-xl mb-3 bg-white p-2" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#f97316]/10 px-2 py-0.5 text-[10px] font-bold text-[#f97316] capitalize">{item.mode}</span>
                      <span className="text-[10px] text-gray-400">{item.ts}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 truncate">{item.data}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => { setFgColor(item.fgColor); setBgColor(item.bgColor); setSize(item.size); setActiveTab("generate"); notify("Settings restored"); }}
                        className="flex-1 rounded-xl bg-[#f97316] py-2 text-[10px] font-bold text-white hover:bg-[#ea6c0a] transition">
                        Load
                      </button>
                      <a href={item.thumbnail} download={`qr-${i + 1}.png`}
                        className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 hover:bg-white transition">
                        <Ico d={IC.download} className="h-3.5 w-3.5 text-gray-500" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}