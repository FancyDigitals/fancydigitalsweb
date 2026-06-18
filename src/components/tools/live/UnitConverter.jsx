"use client";

import { useState, useMemo, useCallback } from "react";

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
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  check: "M4.5 12.75l6 6 9-13.5",
  swap: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  star: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  history: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  table: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m2.25-2.25h.375a1.125 1.125 0 011.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375m0-3.75h-3.75",
};

/* ============================================
   UNIT DEFINITIONS
============================================ */
const CATEGORIES = [
  {
    id: "length",
    name: "Length",
    icon: "📏",
    color: "#0ea5e9",
    baseUnit: "m",
    units: [
      { id: "km", name: "Kilometre", symbol: "km", toBase: 1000, fromBase: 0.001 },
      { id: "m", name: "Metre", symbol: "m", toBase: 1, fromBase: 1 },
      { id: "cm", name: "Centimetre", symbol: "cm", toBase: 0.01, fromBase: 100 },
      { id: "mm", name: "Millimetre", symbol: "mm", toBase: 0.001, fromBase: 1000 },
      { id: "mi", name: "Mile", symbol: "mi", toBase: 1609.344, fromBase: 0.000621371 },
      { id: "yd", name: "Yard", symbol: "yd", toBase: 0.9144, fromBase: 1.09361 },
      { id: "ft", name: "Foot", symbol: "ft", toBase: 0.3048, fromBase: 3.28084 },
      { id: "in", name: "Inch", symbol: "in", toBase: 0.0254, fromBase: 39.3701 },
      { id: "nm", name: "Nautical Mile", symbol: "nmi", toBase: 1852, fromBase: 0.000539957 },
      { id: "um", name: "Micrometre", symbol: "μm", toBase: 0.000001, fromBase: 1000000 },
    ],
  },
  {
    id: "weight",
    name: "Weight",
    icon: "⚖️",
    color: "#8b5cf6",
    baseUnit: "kg",
    units: [
      { id: "t", name: "Tonne", symbol: "t", toBase: 1000, fromBase: 0.001 },
      { id: "kg", name: "Kilogram", symbol: "kg", toBase: 1, fromBase: 1 },
      { id: "g", name: "Gram", symbol: "g", toBase: 0.001, fromBase: 1000 },
      { id: "mg", name: "Milligram", symbol: "mg", toBase: 0.000001, fromBase: 1000000 },
      { id: "lb", name: "Pound", symbol: "lb", toBase: 0.453592, fromBase: 2.20462 },
      { id: "oz", name: "Ounce", symbol: "oz", toBase: 0.0283495, fromBase: 35.274 },
      { id: "st", name: "Stone", symbol: "st", toBase: 6.35029, fromBase: 0.157473 },
      { id: "ug", name: "Microgram", symbol: "μg", toBase: 0.000000001, fromBase: 1000000000 },
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "🌡️",
    color: "#ef4444",
    baseUnit: "c",
    units: [
      { id: "c", name: "Celsius", symbol: "°C" },
      { id: "f", name: "Fahrenheit", symbol: "°F" },
      { id: "k", name: "Kelvin", symbol: "K" },
      { id: "r", name: "Rankine", symbol: "°R" },
    ],
  },
  {
    id: "area",
    name: "Area",
    icon: "📐",
    color: "#22c55e",
    baseUnit: "m2",
    units: [
      { id: "km2", name: "Square Kilometre", symbol: "km²", toBase: 1000000, fromBase: 0.000001 },
      { id: "m2", name: "Square Metre", symbol: "m²", toBase: 1, fromBase: 1 },
      { id: "cm2", name: "Square Centimetre", symbol: "cm²", toBase: 0.0001, fromBase: 10000 },
      { id: "mm2", name: "Square Millimetre", symbol: "mm²", toBase: 0.000001, fromBase: 1000000 },
      { id: "ha", name: "Hectare", symbol: "ha", toBase: 10000, fromBase: 0.0001 },
      { id: "ac", name: "Acre", symbol: "ac", toBase: 4046.86, fromBase: 0.000247105 },
      { id: "mi2", name: "Square Mile", symbol: "mi²", toBase: 2589988.11, fromBase: 0.000000386102 },
      { id: "ft2", name: "Square Foot", symbol: "ft²", toBase: 0.092903, fromBase: 10.7639 },
      { id: "in2", name: "Square Inch", symbol: "in²", toBase: 0.00064516, fromBase: 1550 },
      { id: "yd2", name: "Square Yard", symbol: "yd²", toBase: 0.836127, fromBase: 1.19599 },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    icon: "🧪",
    color: "#f97316",
    baseUnit: "l",
    units: [
      { id: "l", name: "Litre", symbol: "L", toBase: 1, fromBase: 1 },
      { id: "ml", name: "Millilitre", symbol: "mL", toBase: 0.001, fromBase: 1000 },
      { id: "m3", name: "Cubic Metre", symbol: "m³", toBase: 1000, fromBase: 0.001 },
      { id: "cm3", name: "Cubic Centimetre", symbol: "cm³", toBase: 0.001, fromBase: 1000 },
      { id: "gal_us", name: "US Gallon", symbol: "gal (US)", toBase: 3.78541, fromBase: 0.264172 },
      { id: "gal_uk", name: "UK Gallon", symbol: "gal (UK)", toBase: 4.54609, fromBase: 0.219969 },
      { id: "qt", name: "Quart (US)", symbol: "qt", toBase: 0.946353, fromBase: 1.05669 },
      { id: "pt", name: "Pint (US)", symbol: "pt", toBase: 0.473176, fromBase: 2.11338 },
      { id: "fl_oz", name: "Fluid Ounce (US)", symbol: "fl oz", toBase: 0.0295735, fromBase: 33.814 },
      { id: "cup", name: "Cup (US)", symbol: "cup", toBase: 0.236588, fromBase: 4.22675 },
      { id: "tbsp", name: "Tablespoon", symbol: "tbsp", toBase: 0.0147868, fromBase: 67.628 },
      { id: "tsp", name: "Teaspoon", symbol: "tsp", toBase: 0.00492892, fromBase: 202.884 },
    ],
  },
  {
    id: "speed",
    name: "Speed",
    icon: "💨",
    color: "#ec4899",
    baseUnit: "mps",
    units: [
      { id: "mps", name: "Metres per Second", symbol: "m/s", toBase: 1, fromBase: 1 },
      { id: "kph", name: "Kilometres per Hour", symbol: "km/h", toBase: 0.277778, fromBase: 3.6 },
      { id: "mph", name: "Miles per Hour", symbol: "mph", toBase: 0.44704, fromBase: 2.23694 },
      { id: "knot", name: "Knot", symbol: "kn", toBase: 0.514444, fromBase: 1.94384 },
      { id: "fps", name: "Feet per Second", symbol: "ft/s", toBase: 0.3048, fromBase: 3.28084 },
      { id: "mach", name: "Mach", symbol: "Ma", toBase: 343, fromBase: 0.00291545 },
    ],
  },
  {
    id: "time",
    name: "Time",
    icon: "⏱️",
    color: "#f59e0b",
    baseUnit: "s",
    units: [
      { id: "y", name: "Year", symbol: "yr", toBase: 31536000, fromBase: 0.0000000317098 },
      { id: "mo", name: "Month", symbol: "mo", toBase: 2592000, fromBase: 0.000000385802 },
      { id: "wk", name: "Week", symbol: "wk", toBase: 604800, fromBase: 0.00000165344 },
      { id: "d", name: "Day", symbol: "d", toBase: 86400, fromBase: 0.0000115741 },
      { id: "h", name: "Hour", symbol: "h", toBase: 3600, fromBase: 0.000277778 },
      { id: "min", name: "Minute", symbol: "min", toBase: 60, fromBase: 0.0166667 },
      { id: "s", name: "Second", symbol: "s", toBase: 1, fromBase: 1 },
      { id: "ms", name: "Millisecond", symbol: "ms", toBase: 0.001, fromBase: 1000 },
      { id: "us", name: "Microsecond", symbol: "μs", toBase: 0.000001, fromBase: 1000000 },
      { id: "ns", name: "Nanosecond", symbol: "ns", toBase: 0.000000001, fromBase: 1000000000 },
    ],
  },
  {
    id: "data",
    name: "Data",
    icon: "💾",
    color: "#6366f1",
    baseUnit: "b",
    units: [
      { id: "b", name: "Bit", symbol: "bit", toBase: 1, fromBase: 1 },
      { id: "B", name: "Byte", symbol: "B", toBase: 8, fromBase: 0.125 },
      { id: "KB", name: "Kilobyte", symbol: "KB", toBase: 8000, fromBase: 0.000125 },
      { id: "MB", name: "Megabyte", symbol: "MB", toBase: 8000000, fromBase: 0.000000125 },
      { id: "GB", name: "Gigabyte", symbol: "GB", toBase: 8000000000, fromBase: 0.000000000125 },
      { id: "TB", name: "Terabyte", symbol: "TB", toBase: 8000000000000, fromBase: 0.000000000000125 },
      { id: "PB", name: "Petabyte", symbol: "PB", toBase: 8000000000000000, fromBase: 1.25e-16 },
      { id: "Kib", name: "Kibibyte", symbol: "KiB", toBase: 8192, fromBase: 0.0001220703125 },
      { id: "Mib", name: "Mebibyte", symbol: "MiB", toBase: 8388608, fromBase: 0.000000119209 },
      { id: "Gib", name: "Gibibyte", symbol: "GiB", toBase: 8589934592, fromBase: 0.000000000116415 },
    ],
  },
  {
    id: "pressure",
    name: "Pressure",
    icon: "🔧",
    color: "#14b8a6",
    baseUnit: "pa",
    units: [
      { id: "pa", name: "Pascal", symbol: "Pa", toBase: 1, fromBase: 1 },
      { id: "kpa", name: "Kilopascal", symbol: "kPa", toBase: 1000, fromBase: 0.001 },
      { id: "mpa", name: "Megapascal", symbol: "MPa", toBase: 1000000, fromBase: 0.000001 },
      { id: "bar", name: "Bar", symbol: "bar", toBase: 100000, fromBase: 0.00001 },
      { id: "psi", name: "PSI", symbol: "psi", toBase: 6894.76, fromBase: 0.000145038 },
      { id: "atm", name: "Atmosphere", symbol: "atm", toBase: 101325, fromBase: 0.00000986923 },
      { id: "torr", name: "Torr", symbol: "Torr", toBase: 133.322, fromBase: 0.00750062 },
      { id: "mmhg", name: "mmHg", symbol: "mmHg", toBase: 133.322, fromBase: 0.00750062 },
    ],
  },
  {
    id: "energy",
    name: "Energy",
    icon: "⚡",
    color: "#eab308",
    baseUnit: "j",
    units: [
      { id: "j", name: "Joule", symbol: "J", toBase: 1, fromBase: 1 },
      { id: "kj", name: "Kilojoule", symbol: "kJ", toBase: 1000, fromBase: 0.001 },
      { id: "cal", name: "Calorie", symbol: "cal", toBase: 4.184, fromBase: 0.239006 },
      { id: "kcal", name: "Kilocalorie", symbol: "kcal", toBase: 4184, fromBase: 0.000239006 },
      { id: "wh", name: "Watt-hour", symbol: "Wh", toBase: 3600, fromBase: 0.000277778 },
      { id: "kwh", name: "Kilowatt-hour", symbol: "kWh", toBase: 3600000, fromBase: 0.000000277778 },
      { id: "btu", name: "BTU", symbol: "BTU", toBase: 1055.06, fromBase: 0.000947817 },
      { id: "ev", name: "Electronvolt", symbol: "eV", toBase: 1.60218e-19, fromBase: 6.24151e18 },
    ],
  },
];

/* ============================================
   CONVERSION ENGINE
============================================ */
function convertTemp(value, from, to) {
  let celsius;
  switch (from) {
    case "c": celsius = value; break;
    case "f": celsius = (value - 32) * 5 / 9; break;
    case "k": celsius = value - 273.15; break;
    case "r": celsius = (value - 491.67) * 5 / 9; break;
    default: celsius = value;
  }
  switch (to) {
    case "c": return celsius;
    case "f": return celsius * 9 / 5 + 32;
    case "k": return celsius + 273.15;
    case "r": return (celsius + 273.15) * 9 / 5;
    default: return celsius;
  }
}

function convert(value, from, to, category) {
  if (isNaN(value) || value === "") return "";
  const num = parseFloat(value);
  if (category.id === "temperature") {
    return convertTemp(num, from, to);
  }
  const fromUnit = category.units.find((u) => u.id === from);
  const toUnit = category.units.find((u) => u.id === to);
  if (!fromUnit || !toUnit) return "";
  const base = num * fromUnit.toBase;
  return base * toUnit.fromBase;
}

function formatResult(value) {
  if (value === "" || value === null || value === undefined) return "";
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  if (Math.abs(num) === 0) return "0";
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 0.000001 && Math.abs(num) > 0)) {
    return num.toExponential(6);
  }
  if (Number.isInteger(num)) return num.toLocaleString();
  return parseFloat(num.toPrecision(8)).toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function getTempFormula(from, to) {
  const formulas = {
    "c-f": "°F = (°C × 9/5) + 32",
    "f-c": "°C = (°F − 32) × 5/9",
    "c-k": "K = °C + 273.15",
    "k-c": "°C = K − 273.15",
    "f-k": "K = (°F + 459.67) × 5/9",
    "k-f": "°F = K × 9/5 − 459.67",
    "c-r": "°R = (°C + 273.15) × 9/5",
    "r-c": "°C = (°R × 5/9) − 273.15",
  };
  return formulas[`${from}-${to}`] || null;
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function UnitConverter() {
  const [categoryId, setCategoryId] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [inputValue, setInputValue] = useState("1");
  const [activeTab, setActiveTab] = useState("converter");
  const [favourites, setFavourites] = useState([]);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState("");

  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  function notify(msg) { setNotification(msg); setTimeout(() => setNotification(""), 2000); }

  function selectCategory(id) {
    const cat = CATEGORIES.find((c) => c.id === id);
    setCategoryId(id);
    setFromUnit(cat.units[0].id);
    setToUnit(cat.units[1].id);
    setInputValue("1");
  }

  const result = useMemo(() => {
    return convert(inputValue, fromUnit, toUnit, category);
  }, [inputValue, fromUnit, toUnit, category]);

  const reverseResult = useMemo(() => {
    if (result === "") return "";
    return convert(result, toUnit, fromUnit, category);
  }, [result, toUnit, fromUnit, category]);

  function swap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(result !== "" ? formatResult(result) : inputValue);
  }

  function copyResult() {
    const text = `${formatResult(result)} ${category.units.find((u) => u.id === toUnit)?.symbol}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      notify("Result copied");
      addToHistory();
    });
  }

  function addToHistory() {
    if (!inputValue || result === "") return;
    const fromU = category.units.find((u) => u.id === fromUnit);
    const toU = category.units.find((u) => u.id === toUnit);
    const entry = {
      from: `${inputValue} ${fromU?.symbol}`,
      to: `${formatResult(result)} ${toU?.symbol}`,
      category: category.name,
      ts: new Date().toLocaleTimeString(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, 20));
  }

  function toggleFavourite() {
    const key = `${categoryId}:${fromUnit}:${toUnit}`;
    const exists = favourites.find((f) => f.key === key);
    if (exists) {
      setFavourites((prev) => prev.filter((f) => f.key !== key));
      notify("Removed from favourites");
    } else {
      const fromU = category.units.find((u) => u.id === fromUnit);
      const toU = category.units.find((u) => u.id === toUnit);
      setFavourites((prev) => [...prev, {
        key, categoryId, fromUnit, toUnit,
        label: `${fromU?.symbol} → ${toU?.symbol}`,
        category: category.name,
      }]);
      notify("Added to favourites");
    }
  }

  function loadFavourite(fav) {
    selectCategory(fav.categoryId);
    setTimeout(() => { setFromUnit(fav.fromUnit); setToUnit(fav.toUnit); }, 10);
    setActiveTab("converter");
    notify("Loaded");
  }

  const isFavourited = favourites.some((f) => f.key === `${categoryId}:${fromUnit}:${toUnit}`);

  // Full conversion table
  const conversionTable = useMemo(() => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return [];
    return category.units.map((unit) => ({
      unit,
      result: convert(inputValue, fromUnit, unit.id, category),
    }));
  }, [inputValue, fromUnit, category]);

  const formula = category.id === "temperature"
    ? getTempFormula(fromUnit, toUnit)
    : (() => {
        const fromU = category.units.find((u) => u.id === fromUnit);
        const toU = category.units.find((u) => u.id === toUnit);
        if (!fromU || !toU) return null;
        const factor = fromU.toBase * toU.fromBase;
        const fmtFactor = parseFloat(factor.toPrecision(6));
        return `1 ${fromU.symbol} = ${fmtFactor} ${toU.symbol}`;
      })();

  const TABS = [
    { id: "converter", label: "Converter", icon: IC.swap },
    { id: "table", label: "Full Table", icon: IC.table },
    { id: "favourites", label: "Favourites", icon: IC.star },
    { id: "history", label: "History", icon: IC.history },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">

      {notification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          {notification}
        </div>
      )}

      {/* CATEGORY SELECTOR */}
      <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => selectCategory(cat.id)}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 sm:p-2.5 transition text-center ${categoryId === cat.id ? "text-white shadow-md" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
              style={categoryId === cat.id ? { backgroundColor: cat.color } : {}}>
              <span className="text-base sm:text-lg leading-none">{cat.icon}</span>
              <span className="text-[8px] sm:text-[10px] font-bold leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="flex rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[9px] sm:text-[10px] font-bold transition ${activeTab === tab.id ? "text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}
            style={activeTab === tab.id ? { backgroundColor: category.color } : {}}>
            <Ico d={tab.icon} className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============ CONVERTER TAB ============ */}
      {activeTab === "converter" && (
        <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
          <div className="space-y-4">

            {/* Main converter */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                  {category.name} Converter
                </h3>
                <button onClick={toggleFavourite}
                  className={`flex items-center gap-1 rounded-xl border px-3 py-1.5 text-[10px] font-bold transition ${isFavourited ? "border-yellow-300 bg-yellow-50 text-yellow-600" : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}>
                  <Ico d={IC.star} className="h-3.5 w-3.5" />
                  {isFavourited ? "Saved" : "Save"}
                </button>
              </div>

              {/* FROM */}
              <div className="mb-3">
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">From</label>
                <div className="flex gap-2">
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                    className="w-40 sm:w-48 shrink-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none transition focus:ring-2"
                    style={{ focusBorderColor: category.color }}>
                    {category.units.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-lg font-bold outline-none transition focus:ring-2"
                    style={{ borderColor: inputValue ? category.color : undefined }}
                  />
                </div>
              </div>

              {/* SWAP button */}
              <div className="flex justify-center my-2">
                <button onClick={swap}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: category.color }}>
                  <Ico d={IC.swap} className="h-4 w-4" /> Swap Units
                </button>
              </div>

              {/* TO */}
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">To</label>
                <div className="flex gap-2">
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                    className="w-40 sm:w-48 shrink-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none transition">
                    {category.units.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                  <div className="flex-1 relative">
                    <div className="w-full rounded-xl border-2 px-4 py-3 text-lg font-bold"
                      style={{ borderColor: category.color, backgroundColor: `${category.color}08`, color: category.color }}>
                      {result !== "" ? formatResult(result) : "—"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Result display */}
              <div className="rounded-2xl p-4 text-center mb-4"
                style={{ backgroundColor: `${category.color}10` }}>
                <p className="text-xs text-gray-500 mb-1">Result</p>
                <p className="text-2xl sm:text-3xl font-black" style={{ color: category.color }}>
                  {result !== "" ? formatResult(result) : "—"}
                  <span className="ml-2 text-base font-bold">
                    {category.units.find((u) => u.id === toUnit)?.symbol}
                  </span>
                </p>
                {reverseResult !== "" && (
                  <p className="mt-1 text-xs text-gray-400">
                    = {formatResult(reverseResult)} {category.units.find((u) => u.id === fromUnit)?.symbol} (reverse)
                  </p>
                )}
              </div>

              {/* Formula */}
              {formula && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 mb-4 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Formula</p>
                  <p className="text-sm font-mono font-bold text-gray-700">{formula}</p>
                </div>
              )}

              <button onClick={copyResult} disabled={result === ""}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition ${copied ? "bg-green-500" : ""} disabled:opacity-30`}
                style={!copied ? { backgroundColor: category.color } : {}}>
                <Ico d={copied ? IC.check : IC.copy} className="h-4 w-4" />
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>

            {/* Quick reference */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">
                Quick Reference — Common {category.name} Conversions
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {getQuickRef(category.id).map((ref, i) => (
                  <button key={i} onClick={() => {
                    setFromUnit(ref.from);
                    setToUnit(ref.to);
                    setInputValue("1");
                  }}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-xs hover:bg-gray-100 transition text-left">
                    <span className="font-semibold text-gray-700">{ref.label}</span>
                    <span className="font-bold" style={{ color: category.color }}>
                      {formatResult(convert(1, ref.from, ref.to, category))} {category.units.find((u) => u.id === ref.to)?.symbol}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">All Units — {category.name}</h3>
              <div className="space-y-2">
                {category.units.map((unit) => (
                  <button key={unit.id}
                    onClick={() => { setFromUnit(unit.id); }}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-xs transition ${fromUnit === unit.id ? "text-white" : "border-gray-100 bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                    style={fromUnit === unit.id ? { backgroundColor: category.color, borderColor: category.color } : {}}>
                    <span className="font-semibold">{unit.name}</span>
                    <span className="font-bold font-mono">{unit.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: `${category.color}30`, backgroundColor: `${category.color}08` }}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: category.color }}>Tips</p>
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-700">
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: category.color }}>→</span>Click Swap to reverse the conversion instantly</li>
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: category.color }}>→</span>Click any unit on the left to set it as the source</li>
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: category.color }}>→</span>Use Full Table to see all conversions at once</li>
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: category.color }}>→</span>Save frequent conversions to Favourites</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============ FULL TABLE TAB ============ */}
      {activeTab === "table" && (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3">
              Full Conversion Table — {category.name}
            </h3>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500">Convert from:</span>
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none">
                {category.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
              <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                className="w-28 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none" placeholder="Value" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: category.color }}>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white">Unit</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white">Symbol</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-white">Result</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white">Copy</th>
                </tr>
              </thead>
              <tbody>
                {conversionTable.map((row, i) => (
                  <tr key={row.unit.id} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} ${fromUnit === row.unit.id ? "font-bold" : ""}`}>
                    <td className="px-4 py-3 text-gray-700">
                      {row.unit.name}
                      {fromUnit === row.unit.id && <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: category.color }}>source</span>}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-500">{row.unit.symbol}</td>
                    <td className="px-4 py-3 text-right font-bold" style={{ color: category.color }}>
                      {row.result !== "" ? formatResult(row.result) : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => {
                        navigator.clipboard.writeText(`${formatResult(row.result)} ${row.unit.symbol}`);
                        notify("Copied");
                      }}
                        className="rounded-lg border border-gray-100 p-1.5 text-gray-400 hover:text-gray-700 transition">
                        <Ico d={IC.copy} className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============ FAVOURITES TAB ============ */}
      {activeTab === "favourites" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Saved Conversions ({favourites.length})</h3>
            {favourites.length > 0 && (
              <button onClick={() => setFavourites([])} className="text-xs font-semibold text-red-400 hover:text-red-600">Clear all</button>
            )}
          </div>
          {favourites.length === 0 ? (
            <div className="py-16 text-center">
              <Ico d={IC.star} className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No saved conversions</p>
              <p className="text-xs text-gray-300 mt-1">Click Save in the converter to bookmark frequent conversions</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {favourites.map((fav, i) => {
                const cat = CATEGORIES.find((c) => c.id === fav.categoryId);
                return (
                  <button key={i} onClick={() => loadFavourite(fav)}
                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:shadow-md transition text-left">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-1">{fav.category}</p>
                      <p className="text-sm font-bold text-gray-900">{fav.label}</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: cat?.color }}>
                      {cat?.icon}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============ HISTORY TAB ============ */}
      {activeTab === "history" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Conversion History ({history.length})</h3>
            {history.length > 0 && (
              <button onClick={() => setHistory([])} className="text-xs font-semibold text-red-400 hover:text-red-600">Clear</button>
            )}
          </div>
          {history.length === 0 ? (
            <div className="py-16 text-center">
              <Ico d={IC.history} className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No history yet</p>
              <p className="text-xs text-gray-300 mt-1">Copy a result to add it to history</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-16 shrink-0">{item.category}</span>
                    <span className="text-sm text-gray-700 font-semibold">{item.from}</span>
                    <Ico d={IC.swap} className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                    <span className="text-sm font-bold" style={{ color: category.color }}>{item.to}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2">{item.ts}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================
   QUICK REFERENCE DATA
============================================ */
function getQuickRef(categoryId) {
  const refs = {
    length: [
      { from: "km", to: "mi", label: "1 Kilometre → Miles" },
      { from: "mi", to: "km", label: "1 Mile → Kilometres" },
      { from: "m", to: "ft", label: "1 Metre → Feet" },
      { from: "ft", to: "m", label: "1 Foot → Metres" },
      { from: "cm", to: "in", label: "1 Centimetre → Inches" },
      { from: "in", to: "cm", label: "1 Inch → Centimetres" },
    ],
    weight: [
      { from: "kg", to: "lb", label: "1 Kilogram → Pounds" },
      { from: "lb", to: "kg", label: "1 Pound → Kilograms" },
      { from: "g", to: "oz", label: "1 Gram → Ounces" },
      { from: "oz", to: "g", label: "1 Ounce → Grams" },
      { from: "t", to: "lb", label: "1 Tonne → Pounds" },
      { from: "st", to: "kg", label: "1 Stone → Kilograms" },
    ],
    temperature: [
      { from: "c", to: "f", label: "0°C → Fahrenheit" },
      { from: "f", to: "c", label: "32°F → Celsius" },
      { from: "c", to: "k", label: "0°C → Kelvin" },
      { from: "k", to: "c", label: "273.15K → Celsius" },
    ],
    area: [
      { from: "m2", to: "ft2", label: "1 m² → Square Feet" },
      { from: "ha", to: "ac", label: "1 Hectare → Acres" },
      { from: "km2", to: "mi2", label: "1 km² → Square Miles" },
      { from: "ac", to: "ha", label: "1 Acre → Hectares" },
    ],
    volume: [
      { from: "l", to: "gal_us", label: "1 Litre → US Gallons" },
      { from: "gal_us", to: "l", label: "1 US Gallon → Litres" },
      { from: "ml", to: "fl_oz", label: "1 mL → Fluid Ounces" },
      { from: "cup", to: "ml", label: "1 Cup → Millilitres" },
      { from: "l", to: "qt", label: "1 Litre → Quarts" },
      { from: "tbsp", to: "ml", label: "1 Tablespoon → mL" },
    ],
    speed: [
      { from: "kph", to: "mph", label: "1 km/h → mph" },
      { from: "mph", to: "kph", label: "1 mph → km/h" },
      { from: "mps", to: "kph", label: "1 m/s → km/h" },
      { from: "knot", to: "kph", label: "1 Knot → km/h" },
    ],
    time: [
      { from: "h", to: "min", label: "1 Hour → Minutes" },
      { from: "d", to: "h", label: "1 Day → Hours" },
      { from: "wk", to: "d", label: "1 Week → Days" },
      { from: "y", to: "d", label: "1 Year → Days" },
      { from: "min", to: "s", label: "1 Minute → Seconds" },
      { from: "mo", to: "d", label: "1 Month → Days" },
    ],
    data: [
      { from: "GB", to: "MB", label: "1 GB → Megabytes" },
      { from: "TB", to: "GB", label: "1 TB → Gigabytes" },
      { from: "MB", to: "KB", label: "1 MB → Kilobytes" },
      { from: "GB", to: "KB", label: "1 GB → Kilobytes" },
    ],
    pressure: [
      { from: "atm", to: "psi", label: "1 Atm → PSI" },
      { from: "bar", to: "psi", label: "1 Bar → PSI" },
      { from: "kpa", to: "psi", label: "1 kPa → PSI" },
      { from: "psi", to: "bar", label: "1 PSI → Bar" },
    ],
    energy: [
      { from: "kcal", to: "kj", label: "1 kcal → Kilojoules" },
      { from: "kwh", to: "j", label: "1 kWh → Joules" },
      { from: "btu", to: "j", label: "1 BTU → Joules" },
      { from: "kj", to: "kcal", label: "1 kJ → Kilocalories" },
    ],
  };
  return refs[categoryId] || [];
}