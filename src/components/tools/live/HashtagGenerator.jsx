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
  save: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  hash: "M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  plus: "M12 4.5v15m7.5-7.5h-15",
  x: "M6 18L18 6M6 6l12 12",
  folder: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z",
  caption: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  star: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
};

/* ============================================
   CONSTANTS
============================================ */
const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    color: "#e1306c",
    bg: "from-[#e1306c]/10 to-[#f77737]/10",
    maxHashtags: 30,
    recommended: "10–15",
    strategy: "Mix small, medium and large hashtags. Put them in the caption or first comment.",
    svgPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#010101",
    bg: "from-[#010101]/10 to-[#69C9D0]/10",
    maxHashtags: 100,
    recommended: "3–5",
    strategy: "Use 2–3 niche hashtags and 1–2 trending ones. Keep total under 5 for best results.",
    svgPath: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    color: "#000000",
    bg: "from-[#000000]/10 to-[#333333]/10",
    maxHashtags: 2,
    recommended: "1–2",
    strategy: "Use 1–2 relevant hashtags only. More than 2 reduces engagement on Twitter/X.",
    svgPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0077b5",
    bg: "from-[#0077b5]/10 to-[#00a0dc]/10",
    maxHashtags: 5,
    recommended: "3–5",
    strategy: "Use professional, industry-specific hashtags. Avoid trending ones — LinkedIn rewards niche content.",
    svgPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#ff0000",
    bg: "from-[#ff0000]/10 to-[#ff6b6b]/10",
    maxHashtags: 15,
    recommended: "3–5",
    strategy: "Add hashtags above the description. YouTube shows top 3 above the title. Focus on searchable terms.",
    svgPath: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877f2",
    bg: "from-[#1877f2]/10 to-[#42a5f5]/10",
    maxHashtags: 30,
    recommended: "2–5",
    strategy: "Facebook hashtags have limited impact. Use 2–5 broad hashtags. Focus more on content quality.",
    svgPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

const NICHES = [
  "Fashion", "Food", "Travel", "Fitness", "Beauty", "Tech", "Business",
  "Photography", "Art", "Music", "Gaming", "Education", "Health", "Finance",
  "Parenting", "Sports", "Cars", "Real Estate", "Marketing", "Design",
  "Nigeria", "Africa", "Lifestyle", "Motivation", "Entrepreneur",
];

/* ============================================
   HASHTAG DATABASE
============================================ */
const HASHTAG_DB = {
  // General
  general: {
    small: ["#contentcreator", "#smallbusiness", "#digitalmarketing", "#socialmediatips", "#contentmarketing", "#growyourbusiness", "#onlinebusiness", "#creativeentrepreneur", "#brandstrategy", "#marketingtips"],
    medium: ["#entrepreneur", "#motivation", "#success", "#business", "#marketing", "#branding", "#startup", "#leadership", "#mindset", "#growth"],
    large: ["#love", "#instagood", "#photooftheday", "#follow", "#like", "#beautiful", "#happy", "#viral", "#trending", "#explore"],
  },
  fashion: {
    small: ["#fashionblogger", "#ootdshare", "#styleinspo", "#fashionstyle", "#outfitpost", "#fashionlover", "#clothingbrand", "#fashionweek", "#styleblogger", "#fashionphotography"],
    medium: ["#fashion", "#style", "#outfit", "#ootd", "#streetstyle", "#fashionista", "#lookbook", "#aesthetic", "#clothes", "#trendy"],
    large: ["#love", "#instagood", "#instafashion", "#beautiful", "#model", "#photography", "#photooftheday", "#instastyle", "#moda", "#luxury"],
  },
  food: {
    small: ["#foodblogger", "#foodphotography", "#homecooking", "#foodie", "#instafood", "#foodlover", "#healthyrecipes", "#mealprep", "#cookingathome", "#foodblog"],
    medium: ["#food", "#yummy", "#delicious", "#tasty", "#recipe", "#healthy", "#cooking", "#eat", "#dinner", "#lunch"],
    large: ["#foodporn", "#instafood", "#foodstagram", "#homemade", "#fresh", "#vegan", "#vegetarian", "#breakfast", "#cafe", "#restaurant"],
  },
  travel: {
    small: ["#travelblogger", "#travelgram", "#wanderlust", "#travelphotography", "#traveltheworld", "#solotravel", "#backpacking", "#traveltips", "#adventuretime", "#exploremore"],
    medium: ["#travel", "#explore", "#adventure", "#vacation", "#trip", "#holiday", "#nature", "#landscape", "#wanderlust", "#tourism"],
    large: ["#instagood", "#beautiful", "#photooftheday", "#photography", "#love", "#traveler", "#world", "#beach", "#sunset", "#travelphoto"],
  },
  fitness: {
    small: ["#fitnessmotivation", "#workoutathome", "#gymmotivation", "#fitnessjourney", "#fitlife", "#healthylifestyle", "#fitnessblogger", "#strengthtraining", "#cardio", "#yogalife"],
    medium: ["#fitness", "#workout", "#gym", "#health", "#healthy", "#bodybuilding", "#training", "#exercise", "#motivation", "#fit"],
    large: ["#love", "#instagood", "#beautiful", "#lifestyle", "#sport", "#running", "#yoga", "#nutrition", "#muscle", "#gains"],
  },
  beauty: {
    small: ["#beautyblogger", "#makeuptutorial", "#skincareroutine", "#beautyproducts", "#makeuplover", "#skincareadvice", "#beautytips", "#glowup", "#naturalbeauty", "#makeupoftheday"],
    medium: ["#beauty", "#makeup", "#skincare", "#cosmetics", "#lipstick", "#glam", "#selfcare", "#glow", "#eyeshadow", "#foundation"],
    large: ["#love", "#beautiful", "#instagood", "#girl", "#photography", "#fashion", "#makeupartist", "#lifestyle", "#luxury", "#mua"],
  },
  tech: {
    small: ["#techblogger", "#technews", "#gadgets", "#coding", "#developer", "#programming", "#softwareengineering", "#techindustry", "#innovation", "#startuplife"],
    medium: ["#technology", "#tech", "#coding", "#software", "#programming", "#developer", "#digital", "#innovation", "#startup", "#ai"],
    large: ["#instagram", "#instagood", "#photography", "#business", "#entrepreneur", "#future", "#computer", "#mobile", "#internet", "#data"],
  },
  business: {
    small: ["#smallbusinessowner", "#businesstips", "#entrepreneurmindset", "#businessgrowth", "#ceo", "#businesswoman", "#businesscoach", "#growyourbrand", "#businessadvice", "#successmindset"],
    medium: ["#business", "#entrepreneur", "#success", "#marketing", "#motivation", "#leadership", "#startup", "#hustle", "#goals", "#finance"],
    large: ["#love", "#instagood", "#inspiration", "#life", "#money", "#work", "#boss", "#dream", "#ambition", "#millionaire"],
  },
  nigeria: {
    small: ["#naija", "#nigerianfashion", "#nigerianfood", "#naijabusiness", "#nigerianentrepreneur", "#9jastyle", "#lagoslife", "#abujalife", "#madeinnigeria", "#buyanigerian"],
    medium: ["#nigeria", "#lagos", "#abuja", "#african", "#africa", "#naijagirl", "#naijaboy", "#afrochic", "#afrobeats", "#nollywood"],
    large: ["#love", "#beautiful", "#instagood", "#photography", "#fashion", "#blackbeauty", "#melanin", "#africanfashion", "#culture", "#diaspora"],
  },
  marketing: {
    small: ["#digitalmarketingtips", "#socialmediamarketing", "#contentcreation", "#emailmarketing", "#seoexpert", "#growthhacking", "#marketingstrategy", "#onlinemarketing", "#brandbuilding", "#marketingagency"],
    medium: ["#marketing", "#digitalmarketing", "#socialmedia", "#branding", "#content", "#business", "#advertising", "#seo", "#growth", "#strategy"],
    large: ["#entrepreneur", "#success", "#motivation", "#business", "#money", "#work", "#hustle", "#startup", "#goals", "#leadership"],
  },
  lifestyle: {
    small: ["#lifestyleblogger", "#lifestylegoals", "#dailylife", "#minimaliving", "#luxurylifestyle", "#lifestyledesign", "#positivevibes", "#selfimprovement", "#morningroutine", "#dailyroutine"],
    medium: ["#lifestyle", "#motivation", "#inspiration", "#happy", "#love", "#life", "#positivity", "#mindset", "#goals", "#wellness"],
    large: ["#instagood", "#beautiful", "#photography", "#photooftheday", "#smile", "#follow", "#like", "#nature", "#art", "#summer"],
  },
  design: {
    small: ["#graphicdesigner", "#uidesign", "#webdesign", "#logodesign", "#brandidentity", "#creativedesign", "#designinspiration", "#visualidentity", "#designagency", "#typographydesign"],
    medium: ["#design", "#graphic", "#creative", "#art", "#branding", "#logo", "#illustration", "#typography", "#ui", "#ux"],
    large: ["#instagood", "#beautiful", "#photography", "#color", "#minimal", "#aesthetic", "#artist", "#digitalart", "#artwork", "#creativity"],
  },
  motivation: {
    small: ["#motivationalquotes", "#dailymotivation", "#successmindset", "#mindsetshift", "#growthmindset", "#positivemindset", "#motivationalcontent", "#inspiredaily", "#quoteoftheday", "#dailyinspiration"],
    medium: ["#motivation", "#inspiration", "#success", "#mindset", "#goals", "#hustle", "#dream", "#believe", "#positive", "#growth"],
    large: ["#love", "#instagood", "#life", "#happy", "#beautiful", "#follow", "#like", "#quote", "#instagram", "#photooftheday"],
  },
};

const PLATFORM_SPECIFIC = {
  instagram: ["#explorepage", "#explore", "#instadaily", "#instafollow", "#instamood", "#instaphoto", "#insta", "#instagrammers", "#igers", "#picoftheday"],
  tiktok: ["#foryou", "#foryoupage", "#fyp", "#viral", "#trending", "#tiktok", "#tiktokviral", "#fypシ", "#duet", "#tiktoktrend"],
  twitter: ["#MondayMotivation", "#TuesdayThoughts", "#WednesdayWisdom", "#ThursdayThoughts", "#FridayFeeling", "#SaturdayVibes", "#SundayFunday", "#trending", "#thread", "#twittercommunity"],
  linkedin: ["#linkedintips", "#linkedinlearning", "#professionalnetwork", "#careertips", "#jobsearch", "#leadership", "#networking", "#personaldevelopment", "#careergrowth", "#worklifebalance"],
  youtube: ["#youtube", "#youtuber", "#subscribe", "#video", "#newvideo", "#vlog", "#tutorial", "#howto", "#youtubechannel", "#content"],
  facebook: ["#facebook", "#facebooklive", "#facebookmarketing", "#facebookgroup", "#facebookads", "#social", "#community", "#share", "#like", "#follow"],
};

const SAVED_KEY = "fd_hashtag_sets";

/* ============================================
   GENERATE ENGINE
============================================ */
function generateHashtags(keyword, platform, niche) {
  const kw = keyword.toLowerCase().trim();
  const words = kw.split(/\s+/).filter(Boolean);

  // Keyword-based hashtags
  const keywordTags = [];
  if (kw) {
    keywordTags.push(`#${words.join("")}`);
    keywordTags.push(`#${words.join("_")}`);
    if (words.length > 1) {
      words.forEach((w) => keywordTags.push(`#${w}`));
      keywordTags.push(`#${kw.replace(/\s+/g, "")}`);
    }
    keywordTags.push(`#${words.join("")}content`);
    keywordTags.push(`#${words.join("")}tips`);
    keywordTags.push(`#${words.join("")}life`);
    keywordTags.push(`#${words.join("")}daily`);
    keywordTags.push(`#${words.join("")}community`);
    keywordTags.push(`#best${words.join("")}`);
    keywordTags.push(`#${words.join("")}lover`);
    keywordTags.push(`#${words.join("")}goals`);
    keywordTags.push(`#${words.join("")}motivation`);
    keywordTags.push(`#${words.join("")}style`);
    keywordTags.push(`#${words.join("")}blog`);
  }

  // Niche-based
  const nicheKey = niche?.toLowerCase() || "";
  const nicheData = HASHTAG_DB[nicheKey] || HASHTAG_DB.general;

  // Platform-specific
  const platformTags = PLATFORM_SPECIFIC[platform] || [];

  const result = {
    small: [...new Set([...keywordTags.slice(0, 5), ...nicheData.small])].slice(0, 15),
    medium: [...new Set([...keywordTags.slice(5, 8), ...nicheData.medium, ...HASHTAG_DB.general.medium])].slice(0, 10),
    large: [...new Set([...platformTags.slice(0, 5), ...nicheData.large, ...HASHTAG_DB.general.large])].slice(0, 10),
  };

  return result;
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedNiche, setSelectedNiche] = useState("general");
  const [generated, setGenerated] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [caption, setCaption] = useState("");
  const [setName, setSetName] = useState("");
  const [savedSets, setSavedSets] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); } catch { return []; }
  });
  const [activeTab, setActiveTab] = useState("generator");
  const [copied, setCopied] = useState("");
  const [notification, setNotification] = useState("");

  const platform = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];

  function notify(msg) { setNotification(msg); setTimeout(() => setNotification(""), 2000); }

  function generate() {
    if (!keyword.trim() && selectedNiche === "general") { notify("Enter a keyword or select a niche"); return; }
    const result = generateHashtags(keyword, selectedPlatform, selectedNiche);
    setGenerated(result);
    setSelected(new Set([...result.small, ...result.medium.slice(0, 3), ...result.large.slice(0, 2)]));
    notify("Hashtags generated");
  }

  function toggleTag(tag) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  function selectAll(tags) {
    setSelected((prev) => { const next = new Set(prev); tags.forEach((t) => next.add(t)); return next; });
  }

  function deselectAll(tags) {
    setSelected((prev) => { const next = new Set(prev); tags.forEach((t) => next.delete(t)); return next; });
  }

  const selectedArray = [...selected];
  const selectedCount = selectedArray.length;
  const totalChars = selectedArray.join(" ").length;
  const isOverLimit = selectedCount > platform.maxHashtags;

  function copyTags(tags, label = "Hashtags") {
    navigator.clipboard.writeText(tags.join(" ")).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
      notify(`${label} copied`);
    });
  }

  function copyWithCaption() {
    const text = caption ? `${caption}\n\n${selectedArray.join(" ")}` : selectedArray.join(" ");
    navigator.clipboard.writeText(text).then(() => { setCopied("caption"); setTimeout(() => setCopied(""), 2000); notify("Caption + hashtags copied"); });
  }

  function saveSet() {
    if (!selectedArray.length) { notify("Select hashtags first"); return; }
    const name = setName || `${keyword || selectedNiche} — ${platform.name}`;
    const newSet = { name, tags: selectedArray, platform: platform.name, ts: new Date().toLocaleTimeString() };
    const updated = [newSet, ...savedSets];
    setSavedSets(updated);
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(updated)); } catch {}
    setSetName("");
    notify(`"${name}" saved`);
  }

  function deleteSaved(i) {
    const updated = savedSets.filter((_, j) => j !== i);
    setSavedSets(updated);
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(updated)); } catch {}
  }

  function loadSaved(set) {
    setSelected(new Set(set.tags));
    setActiveTab("generator");
    notify("Set loaded");
  }

  const TABS = [
    { id: "generator", label: "Generator", icon: IC.hash },
    { id: "caption", label: "Caption Builder", icon: IC.caption },
    { id: "saved", label: "Saved Sets", icon: IC.folder },
  ];

  /* ============================================
     TAG PILL
  ============================================ */
  function TagPill({ tag, size }) {
    const isSelected = selected.has(tag);
    const sizeColors = {
      small: isSelected ? "bg-green-500 text-white border-green-500" : "bg-green-50 text-green-700 border-green-100 hover:bg-green-100",
      medium: isSelected ? "bg-blue-500 text-white border-blue-500" : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
      large: isSelected ? "bg-purple-500 text-white border-purple-500" : "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
    };
    return (
      <button onClick={() => toggleTag(tag)}
        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${sizeColors[size]}`}>
        {tag}
      </button>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">

      {notification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          {notification}
        </div>
      )}

      {/* TABS */}
      <div className="flex rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-bold transition ${activeTab === tab.id ? "text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}
            style={activeTab === tab.id ? { backgroundColor: platform.color } : {}}>
            <Ico d={tab.icon} className="h-4 w-4" />
            <span className="hidden sm:block">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* ============ GENERATOR TAB ============ */}
      {activeTab === "generator" && (
        <div className="grid gap-4 xl:grid-cols-[1fr_340px]">

          {/* LEFT */}
          <div className="space-y-4">

            {/* Platform selector */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Platform</h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {PLATFORMS.map((p) => (
                  <button key={p.id} onClick={() => setSelectedPlatform(p.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl p-2.5 transition ${selectedPlatform === p.id ? "text-white shadow-md" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                    style={selectedPlatform === p.id ? { backgroundColor: p.color } : {}}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={p.svgPath} />
                    </svg>
                    <span className="text-[9px] sm:text-[10px] font-bold leading-tight text-center">{p.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Platform strategy */}
              <div className="mt-3 rounded-xl p-3 text-xs" style={{ backgroundColor: `${platform.color}10` }}>
                <p className="font-bold mb-0.5" style={{ color: platform.color }}>
                  {platform.name} Strategy — Recommended: {platform.recommended} hashtags (max {platform.maxHashtags})
                </p>
                <p className="text-gray-600">{platform.strategy}</p>
              </div>
            </div>

            {/* Keyword + Niche */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Your Topic</h3>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">Keyword or Topic</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && generate()}
                    placeholder="e.g. digital marketing, Nigerian fashion, web design..."
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#e1306c] focus:ring-2 focus:ring-[#e1306c]/10"
                  />
                  {keyword && (
                    <button onClick={() => setKeyword("")} className="rounded-xl border border-gray-200 px-3 py-2.5 text-gray-400 hover:text-gray-600 transition">
                      <Ico d={IC.x} className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-600">Niche / Category</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setSelectedNiche("general")}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${selectedNiche === "general" ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    style={selectedNiche === "general" ? { backgroundColor: platform.color } : {}}>
                    General
                  </button>
                  {NICHES.map((n) => {
                    const id = n.toLowerCase().replace(/\s+/g, "");
                    const hasData = !!HASHTAG_DB[id];
                    return (
                      <button key={n} onClick={() => setSelectedNiche(hasData ? id : "general")}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${selectedNiche === id ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        style={selectedNiche === id ? { backgroundColor: platform.color } : {}}>
                        {n}
                        {!hasData && <span className="ml-1 opacity-50">·</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button onClick={generate}
                className="w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: platform.color }}>
                Generate Hashtags
              </button>
            </div>

            {/* Generated hashtags */}
            {generated && (
              <div className="space-y-4">
                {[
                  { key: "small", label: "Small", desc: "Under 500K posts — less competition, easier to rank", color: "green" },
                  { key: "medium", label: "Medium", desc: "500K–2M posts — good balance of reach and competition", color: "blue" },
                  { key: "large", label: "Large", desc: "Over 2M posts — high reach but competitive", color: "purple" },
                ].map(({ key, label, desc, color }) => (
                  <div key={key} className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full bg-${color}-500`} />
                          <h3 className="text-xs sm:text-sm font-bold text-gray-900">{label} Hashtags</h3>
                          <span className={`rounded-full bg-${color}-50 px-2 py-0.5 text-[10px] font-bold text-${color}-600`}>
                            {generated[key].length}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5 ml-4">{desc}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => selectAll(generated[key])}
                          className="rounded-xl border border-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition">
                          All
                        </button>
                        <button onClick={() => deselectAll(generated[key])}
                          className="rounded-xl border border-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition">
                          None
                        </button>
                        <button onClick={() => copyTags(generated[key], `${label} tags`)}
                          className="rounded-xl border border-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition flex items-center gap-1">
                          <Ico d={copied === `${label} tags` ? IC.check : IC.copy} className="h-3 w-3" />
                          {copied === `${label} tags` ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {generated[key].map((tag) => (
                        <TagPill key={tag} tag={tag} size={key} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — SELECTED + ACTIONS */}
          <div className="space-y-4">

            {/* Counter */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">Selected Hashtags</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${isOverLimit ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                  {selectedCount} / {platform.maxHashtags}
                </span>
              </div>

              {isOverLimit && (
                <div className="mb-3 rounded-xl bg-red-50 border border-red-100 p-3 text-xs text-red-600 font-semibold">
                  Over {platform.name} limit by {selectedCount - platform.maxHashtags}. Remove some hashtags.
                </div>
              )}

              {/* Progress bar */}
              <div className="mb-4 h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((selectedCount / platform.maxHashtags) * 100, 100)}%`,
                    backgroundColor: isOverLimit ? "#ef4444" : platform.color,
                  }} />
              </div>

              {selectedArray.length > 0 ? (
                <>
                  <div className="max-h-48 overflow-y-auto rounded-xl bg-gray-50 p-3 text-sm leading-relaxed text-gray-700 font-medium break-words">
                    {selectedArray.join(" ")}
                  </div>
                  <p className="mt-2 text-[10px] text-gray-400">{totalChars} characters</p>

                  <div className="mt-3 space-y-2">
                    <button onClick={() => copyTags(selectedArray, "selected")}
                      className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition ${copied === "selected" ? "bg-green-500" : ""}`}
                      style={copied !== "selected" ? { backgroundColor: platform.color } : {}}>
                      <Ico d={copied === "selected" ? IC.check : IC.copy} className="h-4 w-4" />
                      {copied === "selected" ? "Copied!" : "Copy Selected Hashtags"}
                    </button>
                    <button onClick={() => setSelected(new Set())}
                      className="w-full rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition">
                      Clear Selection
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center text-xs text-gray-400">
                  <Ico d={IC.hash} className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                  Generate hashtags and click to select them
                </div>
              )}
            </div>

            {/* Save set */}
            {selectedArray.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-2">
                <h3 className="text-xs font-bold text-gray-900">Save This Set</h3>
                <input type="text" value={setName} onChange={(e) => setSetName(e.target.value)}
                  placeholder="Name this set..."
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#e1306c]" />
                <button onClick={saveSet}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white hover:bg-black transition">
                  <Ico d={IC.save} className="h-3.5 w-3.5" /> Save Set
                </button>
              </div>
            )}

            {/* Platform tips */}
            <div className="rounded-2xl border p-4" style={{ borderColor: `${platform.color}30`, backgroundColor: `${platform.color}08` }}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: platform.color }}>
                {platform.name} Tips
              </p>
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-700">
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: platform.color }}>→</span>Recommended: {platform.recommended} hashtags per post</li>
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: platform.color }}>→</span>Maximum allowed: {platform.maxHashtags} hashtags</li>
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: platform.color }}>→</span>{platform.strategy}</li>
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: platform.color }}>→</span>Rotate hashtag sets between posts to avoid shadow ban</li>
                <li className="flex gap-2"><span className="font-bold shrink-0" style={{ color: platform.color }}>→</span>Mix niche and broad hashtags for best reach</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============ CAPTION BUILDER TAB ============ */}
      {activeTab === "caption" && (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Write Your Caption</h3>
              <textarea rows={8} value={caption} onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your post caption here. The selected hashtags will be added below it automatically..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#e1306c] focus:ring-2 focus:ring-[#e1306c]/10" />
              <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                <span>{caption.length} characters in caption</span>
                <span>{selectedCount} hashtags selected</span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-xs font-bold text-gray-900">Platform</h3>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.slice(0, 4).map((p) => (
                  <button key={p.id} onClick={() => setSelectedPlatform(p.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${selectedPlatform === p.id ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    style={selectedPlatform === p.id ? { backgroundColor: p.color } : {}}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Full Post Preview</h3>
              <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed min-h-[200px] whitespace-pre-wrap break-words">
                {caption || <span className="text-gray-300">Your caption will appear here...</span>}
                {caption && selectedArray.length > 0 && "\n\n"}
                {selectedArray.length > 0 && (
                  <span className="text-blue-500 font-medium">{selectedArray.join(" ")}</span>
                )}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                <span>{(caption + (caption && selectedArray.length > 0 ? "\n\n" : "") + selectedArray.join(" ")).length} total characters</span>
                <span style={{ color: isOverLimit ? "#ef4444" : "#075a01" }}>
                  {selectedCount}/{platform.maxHashtags} hashtags
                </span>
              </div>
            </div>

            <button onClick={copyWithCaption}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition ${copied === "caption" ? "bg-green-500" : ""}`}
              style={copied !== "caption" ? { backgroundColor: platform.color } : {}}>
              <Ico d={copied === "caption" ? IC.check : IC.copy} className="h-4 w-4" />
              {copied === "caption" ? "Copied!" : "Copy Caption + Hashtags"}
            </button>

            {selectedArray.length === 0 && (
              <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-4 text-xs text-yellow-700">
                <p className="font-bold mb-1">No hashtags selected</p>
                <p>Go to the Generator tab, generate hashtags, then select the ones you want to include.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ SAVED SETS TAB ============ */}
      {activeTab === "saved" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Saved Hashtag Sets ({savedSets.length})</h3>
            {savedSets.length > 0 && (
              <button onClick={() => { setSavedSets([]); localStorage.removeItem(SAVED_KEY); }}
                className="text-xs font-semibold text-red-400 hover:text-red-600">Clear all</button>
            )}
          </div>

          {savedSets.length === 0 ? (
            <div className="py-16 text-center">
              <Ico d={IC.folder} className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No saved sets yet</p>
              <p className="text-xs text-gray-300 mt-1">Generate hashtags, select your favourites, then save the set</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedSets.map((set, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{set.name}</p>
                      <p className="text-[10px] text-gray-400">{set.platform} · {set.tags.length} hashtags · {set.ts}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => loadSaved(set)}
                        className="rounded-xl px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
                        style={{ backgroundColor: platform.color }}>
                        Load
                      </button>
                      <button onClick={() => { navigator.clipboard.writeText(set.tags.join(" ")); notify("Copied"); }}
                        className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-white transition">
                        Copy
                      </button>
                      <button onClick={() => deleteSaved(i)}
                        className="rounded-xl border border-red-100 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-50 transition">
                        <Ico d={IC.trash} className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {set.tags.slice(0, 10).map((tag) => (
                      <span key={tag} className="rounded-full bg-white border border-gray-200 px-2.5 py-1 text-[10px] font-semibold text-gray-600">
                        {tag}
                      </span>
                    ))}
                    {set.tags.length > 10 && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
                        +{set.tags.length - 10} more
                      </span>
                    )}
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