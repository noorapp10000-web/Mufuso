import type { JSX } from "react";

export interface Case {
  id: number;
  title: string;
  crimeScene: string;
  citizensWord: string;
  mafiusoWord: string;
  category: string;
  SvgScene: () => JSX.Element;
  isUnlocked: boolean;
  players: 4 | 5;
}

/* ─── SVG Scenes 01–30 (4 Players) ─── */

function Svg01(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="60" width="100" height="55" rx="3" fill="#350A22"/>
      <rect x="15" y="55" width="90" height="10" rx="2" fill="#5B0E2E"/>
      <rect x="20" y="65" width="30" height="40" rx="2" fill="#1C0418" stroke="#D4AF37" strokeWidth="0.8"/>
      <rect x="70" y="65" width="30" height="40" rx="2" fill="#1C0418" stroke="#D4AF37" strokeWidth="0.8"/>
      <rect x="40" y="78" width="40" height="37" fill="#1C0418" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="50" y="35" width="20" height="25" fill="#350A22"/>
      <rect x="35" y="28" width="50" height="12" rx="2" fill="#5B0E2E"/>
      <circle cx="60" cy="28" r="5" fill="#D4AF37" opacity="0.7"/>
      <line x1="20" y1="55" x2="100" y2="55" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="35" cy="115" r="5" fill="#130212" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="85" cy="115" r="5" fill="#130212" stroke="#D4AF37" strokeWidth="1"/>
    </svg>
  );
}
function Svg02(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#071420"/>
      <rect x="0" y="70" width="120" height="50" fill="#0D1A2A"/>
      <path d="M0 70 Q30 55 60 65 Q90 75 120 60 L120 70 L0 70Z" fill="#0D2035"/>
      <rect x="20" y="30" width="80" height="40" rx="3" fill="#1A3050"/>
      <rect x="15" y="25" width="90" height="10" rx="2" fill="#253545"/>
      <rect x="25" y="35" width="20" height="15" fill="#0D1520"/>
      <rect x="55" y="35" width="35" height="25" fill="#0D1520"/>
      <path d="M10 70 L10 85" stroke="#4A3200" strokeWidth="3"/>
      <path d="M110 70 L110 85" stroke="#4A3200" strokeWidth="3"/>
      <circle cx="60" cy="12" r="8" fill="#1A3050" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M55 12 L60 7 L65 12 L60 17Z" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg03(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0E0812"/>
      <rect x="0" y="70" width="120" height="50" fill="#0D1A0D"/>
      <rect x="38" y="45" width="44" height="55" rx="3" fill="#1A3020"/>
      <rect x="30" y="40" width="60" height="10" rx="2" fill="#1F3D28"/>
      <rect x="44" y="52" width="13" height="18" rx="1" fill="#0D1A0D"/>
      <rect x="63" y="52" width="13" height="18" rx="1" fill="#0D1A0D"/>
      <rect x="50" y="78" width="20" height="22" fill="#0D1A0D"/>
      <circle cx="60" cy="28" r="12" fill="#1F3D28"/>
      <path d="M53 25 Q60 15 67 25 Q63 33 60 30 Q57 33 53 25Z" fill="#0D5C2A" opacity="0.8"/>
      <circle cx="60" cy="24" r="4" fill="#D4AF37" opacity="0.3"/>
    </svg>
  );
}
function Svg04(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1A0A00"/>
      <rect x="5" y="68" width="110" height="47" rx="3" fill="#321320"/>
      <rect x="10" y="63" width="100" height="10" rx="2" fill="#4A1024"/>
      <ellipse cx="35" cy="73" rx="13" ry="6" fill="#4A1024" stroke="#D4AF37" strokeWidth="0.5"/>
      <ellipse cx="60" cy="73" rx="13" ry="6" fill="#4A1024" stroke="#D4AF37" strokeWidth="0.5"/>
      <ellipse cx="85" cy="73" rx="13" ry="6" fill="#4A1024" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="28" r="17" fill="#4A1024" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M50 28 Q55 20 60 24 Q65 20 70 28 Q65 38 60 35 Q55 38 50 28Z" fill="#8B4513" opacity="0.7"/>
      <circle cx="60" cy="26" r="5" fill="#D4AF37" opacity="0.4"/>
      <circle cx="40" cy="60" r="3" fill="#CC0000" opacity="0.7"/>
    </svg>
  );
}
function Svg05(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1520"/>
      <rect x="5" y="35" width="110" height="80" rx="3" fill="#1A2A3A"/>
      <rect x="10" y="30" width="100" height="10" rx="2" fill="#253545"/>
      <rect x="15" y="45" width="90" height="65" fill="#0D1A2A"/>
      <rect x="20" y="52" width="80" height="8" fill="#1A2A3A"/>
      <rect x="20" y="68" width="80" height="8" fill="#1A2A3A"/>
      <rect x="20" y="84" width="80" height="8" fill="#1A2A3A"/>
      <circle cx="25" cy="56" r="2" fill="#D4AF37" opacity="0.6"/>
      <circle cx="25" cy="72" r="2" fill="#D4AF37" opacity="0.6"/>
      <circle cx="25" cy="88" r="2" fill="#EF4444" opacity="0.8"/>
      <path d="M30 15 L90 15 L90 30 L30 30Z" fill="#5B0E2E" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="12" r="3" fill="#D4AF37" opacity="0.7"/>
    </svg>
  );
}
function Svg06(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A0A"/>
      <rect x="10" y="50" width="100" height="65" rx="4" fill="#1A0A00"/>
      <rect x="15" y="45" width="90" height="10" rx="2" fill="#2A1000"/>
      <path d="M30 90 Q40 60 60 55 Q80 50 95 80" stroke="#FF6600" strokeWidth="3" fill="none" opacity="0.7"/>
      <path d="M35 90 Q45 65 60 62 Q75 59 88 80" stroke="#FF4400" strokeWidth="2" fill="none" opacity="0.5"/>
      <circle cx="60" cy="55" r="8" fill="#FF6600" opacity="0.3"/>
      <circle cx="60" cy="55" r="4" fill="#FF8800" opacity="0.5"/>
      <rect x="20" y="90" width="80" height="20" fill="#1A0A00"/>
      <rect x="30" y="20" width="60" height="25" rx="3" fill="#2A1000" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="10" r="5" fill="#D4AF37" opacity="0.4"/>
    </svg>
  );
}
function Svg07(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="30" width="100" height="85" rx="4" fill="#1A0A2A"/>
      <rect x="15" y="25" width="90" height="10" rx="2" fill="#2A1040"/>
      <rect x="20" y="40" width="80" height="8" fill="#120820"/>
      <rect x="20" y="60" width="35" height="45" rx="2" fill="#120820" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="60" width="35" height="45" rx="2" fill="#120820" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="82" cy="82" r="12" fill="#120820" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M76 82 Q82 76 88 82 Q82 88 76 82Z" fill="#D4AF37" opacity="0.5"/>
      <rect x="35" y="14" width="50" height="12" rx="3" fill="#D4AF37" opacity="0.15"/>
    </svg>
  );
}
function Svg08(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1A1A1A"/>
      <rect x="15" y="45" width="90" height="70" rx="3" fill="#1A1A2A"/>
      <rect x="10" y="40" width="100" height="10" rx="2" fill="#2A2A3D"/>
      <circle cx="60" cy="82" r="22" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="60" cy="82" r="15" fill="#0D0D18" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="82" r="4" fill="#D4AF37" opacity="0.8"/>
      <path d="M60 60 L60 65" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M82 82 L77 82" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M60 104 L60 99" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M38 82 L43 82" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M60 82 L70 74" stroke="#D4AF37" strokeWidth="1.2" opacity="0.9"/>
      <path d="M60 82 L68 82" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
      <rect x="25" y="10" width="70" height="30" rx="3" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg09(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A0A"/>
      <rect x="5" y="40" width="110" height="75" rx="3" fill="#0A1A0A"/>
      <rect x="10" y="35" width="100" height="10" rx="2" fill="#1A2A1A"/>
      <rect x="15" y="50" width="40" height="55" rx="2" fill="#0D150D" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="50" width="40" height="55" rx="2" fill="#0D150D" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M60 20 L60 110" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 2"/>
      <circle cx="60" cy="15" r="8" fill="#0A1A0A" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M55 15 Q60 10 65 15 Q60 20 55 15Z" fill="#D4AF37" opacity="0.5"/>
      <rect x="20" y="58" width="10" height="6" fill="#D4AF37" opacity="0.15"/>
      <rect x="20" y="68" width="10" height="6" fill="#EF4444" opacity="0.4"/>
    </svg>
  );
}
function Svg10(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050510"/>
      <circle cx="60" cy="60" r="52" fill="#080818"/>
      <circle cx="60" cy="60" r="40" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5"/>
      <circle cx="60" cy="60" r="25" fill="#100D1A"/>
      <path d="M60 20 L63 52 L60 57 L57 52 Z" fill="#D4AF37" opacity="0.8"/>
      <path d="M60 100 L57 68 L60 63 L63 68 Z" fill="#D4AF37" opacity="0.5"/>
      <path d="M20 60 L52 57 L57 60 L52 63 Z" fill="#D4AF37" opacity="0.5"/>
      <circle cx="60" cy="60" r="5" fill="#D4AF37"/>
      <circle cx="28" cy="28" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="92" cy="24" r="1.5" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg11(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1505"/>
      <rect x="0" y="65" width="120" height="55" fill="#0F2008"/>
      <path d="M0 65 Q15 50 30 60 Q45 70 60 55 Q75 40 90 55 Q105 70 120 60 L120 65 L0 65Z" fill="#1A3010"/>
      <ellipse cx="25" cy="62" rx="14" ry="5" fill="#1A4010"/>
      <ellipse cx="60" cy="55" rx="18" ry="6" fill="#1A4010"/>
      <ellipse cx="90" cy="60" rx="14" ry="5" fill="#1A4010"/>
      <circle cx="25" cy="57" r="5" fill="#4A7A20" opacity="0.8"/>
      <circle cx="60" cy="49" r="6" fill="#EF4444" opacity="0.5"/>
      <circle cx="90" cy="55" r="5" fill="#4A7A20" opacity="0.7"/>
      <rect x="30" y="15" width="60" height="40" rx="3" fill="#1A3010" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="35" r="12" fill="#0A2008" stroke="#4A7A20" strokeWidth="0.8"/>
      <circle cx="60" cy="35" r="5" fill="#D4AF37" opacity="0.25"/>
    </svg>
  );
}
function Svg12(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="75" width="120" height="45" fill="#4A0A24"/>
      <ellipse cx="60" cy="75" rx="55" ry="14" fill="#5B0E2E"/>
      <rect x="35" y="28" width="50" height="47" rx="3" fill="#4A0A24"/>
      <rect x="30" y="23" width="60" height="10" rx="2" fill="#5B0E2E"/>
      <rect x="40" y="33" width="40" height="32" fill="#350A22"/>
      <path d="M40 33 L80 65" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M80 33 L40 65" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <ellipse cx="60" cy="18" rx="18" ry="7" fill="#5B0E2E" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="14" r="3" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg13(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A18"/>
      <path d="M0 62 Q20 45 40 55 Q60 65 80 48 Q100 31 120 50 L120 120 L0 120Z" fill="#12122A"/>
      <rect x="10" y="65" width="100" height="8" rx="2" fill="#2A2A5A"/>
      <rect x="5" y="73" width="110" height="5" rx="1" fill="#1A1A3A"/>
      <rect x="20" y="40" width="80" height="25" rx="3" fill="#1A2A3A" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="25" y="45" width="20" height="15" fill="#0D1520"/>
      <rect x="55" y="45" width="35" height="15" fill="#0D1520"/>
      <rect x="45" y="58" width="30" height="25" fill="#0D1520"/>
      <rect x="50" y="10" width="20" height="30" rx="2" fill="#1A2A3A" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="8" r="4" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg14(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="65" width="120" height="55" fill="#2A0A18"/>
      <rect x="10" y="25" width="100" height="40" rx="3" fill="#3D1028"/>
      <rect x="15" y="20" width="90" height="10" rx="2" fill="#4A1032"/>
      <rect x="20" y="32" width="80" height="28" fill="#2A0A18"/>
      <path d="M25 45 L95 45" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <path d="M25 38 L95 38" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <path d="M25 52 L65 52" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="90" cy="43" r="6" fill="#EF4444" opacity="0.5"/>
      <rect x="30" y="65" width="60" height="45" rx="2" fill="#3D1028" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M45 80 L75 80 M45 88 L75 88" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5"/>
    </svg>
  );
}
function Svg15(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050510"/>
      <rect x="30" y="5" width="60" height="110" rx="3" fill="#0A0A20" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="35" y="10" width="50" height="100" fill="#050510"/>
      <rect x="38" y="15" width="44" height="8" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="38" y="28" width="44" height="8" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="38" y="41" width="44" height="8" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="38" y="54" width="44" height="8" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="38" y="67" width="44" height="8" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="38" y="80" width="44" height="8" fill="#EF4444" opacity="0.3" stroke="#EF4444" strokeWidth="0.3"/>
      <circle cx="10" cy="60" r="8" fill="#0A0A20" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="110" cy="60" r="8" fill="#0A0A20" stroke="#D4AF37" strokeWidth="0.8"/>
    </svg>
  );
}
function Svg16(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1520"/>
      <rect x="5" y="30" width="110" height="85" rx="3" fill="#0D2035"/>
      <rect x="10" y="25" width="100" height="10" rx="2" fill="#153045"/>
      <rect x="15" y="40" width="90" height="70" fill="#0A1825"/>
      <rect x="20" y="48" width="30" height="20" rx="2" fill="#0D2035" stroke="#4A9ECC" strokeWidth="0.5"/>
      <rect x="60" y="48" width="40" height="55" rx="2" fill="#0D2035" stroke="#4A9ECC" strokeWidth="0.5"/>
      <rect x="20" y="75" width="30" height="30" rx="2" fill="#0D2035" stroke="#4A9ECC" strokeWidth="0.5"/>
      <circle cx="80" cy="75" r="14" fill="#081518" stroke="#4A9ECC" strokeWidth="0.8"/>
      <circle cx="80" cy="75" r="8" fill="#0A1520"/>
      <circle cx="80" cy="75" r="3" fill="#4A9ECC" opacity="0.5"/>
      <circle cx="35" cy="58" r="5" fill="#EF4444" opacity="0.4"/>
    </svg>
  );
}
function Svg17(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A20"/>
      <rect x="10" y="30" width="100" height="85" rx="3" fill="#0D0D22"/>
      <rect x="15" y="25" width="90" height="10" rx="2" fill="#151528"/>
      <rect x="20" y="40" width="35" height="65" rx="2" fill="#0A0A18" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="40" width="35" height="65" rx="2" fill="#0A0A18" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="43" y="40" width="34" height="65" fill="#080815"/>
      <rect x="48" y="80" width="10" height="25" fill="#060610"/>
      <rect x="62" y="80" width="10" height="25" fill="#060610"/>
      <circle cx="55" cy="58" r="10" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="65" cy="52" r="10" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M48 58 Q60 45 72 54" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <circle cx="60" cy="15" r="4" fill="#EF4444" opacity="0.6"/>
    </svg>
  );
}
function Svg18(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050510"/>
      <rect x="5" y="25" width="110" height="90" rx="3" fill="#080818"/>
      <rect x="10" y="20" width="100" height="10" rx="2" fill="#101025"/>
      <rect x="15" y="35" width="90" height="75" fill="#050510"/>
      <rect x="20" y="40" width="80" height="8" fill="#0D0D22"/>
      <rect x="20" y="55" width="80" height="8" fill="#0D0D22"/>
      <rect x="20" y="70" width="80" height="8" fill="#0D0D22"/>
      <rect x="20" y="85" width="80" height="8" fill="#0D0D22"/>
      <circle cx="25" cy="44" r="2" fill="#00FF88" opacity="0.5"/>
      <circle cx="25" cy="59" r="2" fill="#00FF88" opacity="0.5"/>
      <circle cx="25" cy="74" r="2" fill="#EF4444" opacity="0.8"/>
      <circle cx="25" cy="89" r="2" fill="#00FF88" opacity="0.5"/>
      <rect x="35" y="7" width="50" height="12" rx="2" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg19(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="5" y="50" width="110" height="65" rx="3" fill="#1A0520"/>
      <rect x="10" y="45" width="100" height="10" rx="2" fill="#2A0A30"/>
      <rect x="20" y="60" width="80" height="50" fill="#120318"/>
      <rect x="25" y="65" width="30" height="35" fill="#1A0520" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="65" width="30" height="35" fill="#1A0520" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="30" r="20" fill="#1A0520" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M48 30 L60 20 L72 30 L65 42 L55 42 Z" fill="#2A0A30" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="30" r="5" fill="#D4AF37" opacity="0.5"/>
      <circle cx="60" cy="30" r="2" fill="#D4AF37" opacity="0.9"/>
    </svg>
  );
}
function Svg20(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1808"/>
      <rect x="5" y="30" width="110" height="85" rx="3" fill="#0D2010"/>
      <rect x="10" y="25" width="100" height="10" rx="2" fill="#153018"/>
      <rect x="15" y="40" width="90" height="70" fill="#0A1808"/>
      <line x1="15" y1="60" x2="105" y2="60" stroke="#4A7A20" strokeWidth="0.5" opacity="0.5"/>
      <line x1="15" y1="80" x2="105" y2="80" stroke="#4A7A20" strokeWidth="0.5" opacity="0.5"/>
      <line x1="40" y1="40" x2="40" y2="110" stroke="#4A7A20" strokeWidth="0.5" opacity="0.5"/>
      <line x1="80" y1="40" x2="80" y2="110" stroke="#4A7A20" strokeWidth="0.5" opacity="0.5"/>
      <path d="M20 48 L35 42 L55 50 L75 38 L95 45" stroke="#EF4444" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <circle cx="75" cy="38" r="4" fill="#EF4444" opacity="0.8"/>
      <rect x="25" y="12" width="70" height="12" rx="2" fill="#0D2010" stroke="#4A7A20" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg21(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="35" width="100" height="80" rx="3" fill="#2A0A18"/>
      <rect x="15" y="30" width="90" height="10" rx="2" fill="#3D1028"/>
      <rect x="30" y="45" width="60" height="60" rx="2" fill="#1A0F00" stroke="#D4AF37" strokeWidth="0.8"/>
      <rect x="35" y="50" width="50" height="50" fill="#120A00"/>
      <circle cx="60" cy="75" r="18" fill="#1A0F00" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M50 75 L60 65 L70 75 L65 85 L55 85Z" fill="#2A1800" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="60" cy="75" r="5" fill="#D4AF37" opacity="0.5"/>
      <circle cx="60" cy="20" r="6" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg22(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#071420"/>
      <rect x="0" y="68" width="120" height="52" fill="#0A1A2A"/>
      <path d="M0 68 Q30 50 60 62 Q90 74 120 56 L120 68 L0 68Z" fill="#0D2035"/>
      <ellipse cx="60" cy="68" rx="30" ry="6" fill="#1A3050"/>
      <rect x="20" y="25" width="80" height="43" rx="3" fill="#1A3050" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="25" y="30" width="30" height="20" fill="#0D1520"/>
      <rect x="65" y="30" width="30" height="30" fill="#0D1520"/>
      <rect x="42" y="38" width="20" height="25" fill="#0D1520"/>
      <path d="M35 68 L20 85" stroke="#4A3200" strokeWidth="3"/>
      <path d="M85 68 L100 85" stroke="#4A3200" strokeWidth="3"/>
      <circle cx="60" cy="12" r="7" fill="#1A3050" stroke="#D4AF37" strokeWidth="0.8"/>
    </svg>
  );
}
function Svg23(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0818"/>
      <rect x="5" y="25" width="110" height="90" rx="3" fill="#0D0D25"/>
      <rect x="10" y="20" width="100" height="10" rx="2" fill="#151538"/>
      <rect x="15" y="35" width="45" height="75" fill="#080818"/>
      <rect x="68" y="35" width="42" height="75" fill="#080818"/>
      <rect x="20" y="42" width="8" height="8" fill="#D4AF37" opacity="0.15"/>
      <rect x="32" y="42" width="8" height="8" fill="#D4AF37" opacity="0.15"/>
      <rect x="44" y="42" width="8" height="8" fill="#D4AF37" opacity="0.15"/>
      <rect x="20" y="55" width="8" height="8" fill="#D4AF37" opacity="0.15"/>
      <rect x="32" y="55" width="8" height="8" fill="#EF4444" opacity="0.4"/>
      <rect x="20" y="68" width="35" height="5" fill="#D4AF37" opacity="0.2"/>
      <rect x="20" y="78" width="35" height="5" fill="#D4AF37" opacity="0.2"/>
      <circle cx="89" cy="72" r="18" fill="#080818" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M80 72 L89 63 L98 72 L89 81Z" fill="#1A1A35" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="89" cy="72" r="5" fill="#D4AF37" opacity="0.3"/>
    </svg>
  );
}
function Svg24(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A18"/>
      <rect x="0" y="65" width="120" height="55" fill="#0A1208"/>
      <path d="M0 65 Q20 50 40 60 Q60 70 80 55 Q100 40 120 55 L120 65 L0 65Z" fill="#0F1A0A"/>
      <rect x="15" y="25" width="90" height="40" rx="3" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="20" y="30" width="80" height="30" fill="#0D0D18"/>
      <rect x="25" y="35" width="20" height="10" fill="#1A1A2A"/>
      <rect x="55" y="35" width="10" height="20" fill="#1A1A2A"/>
      <rect x="70" y="35" width="25" height="10" fill="#1A1A2A"/>
      <circle cx="30" cy="52" r="4" fill="#D4AF37" opacity="0.6"/>
      <circle cx="90" cy="52" r="4" fill="#D4AF37" opacity="0.6"/>
      <path d="M25 75 Q60 65 95 75" stroke="#EF4444" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="4 2"/>
      <rect x="40" y="10" width="40" height="14" rx="2" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg25(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A18"/>
      <circle cx="60" cy="60" r="50" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.4" opacity="0.4"/>
      <circle cx="60" cy="60" r="35" fill="#080818" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3"/>
      <circle cx="60" cy="60" r="20" fill="#0A0A15"/>
      <path d="M60 10 L60 30 M60 90 L60 110 M10 60 L30 60 M90 60 L110 60" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3"/>
      <path d="M22 22 L36 36 M84 84 L98 98 M22 98 L36 84 M84 36 L98 22" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"/>
      <circle cx="60" cy="60" r="4" fill="#D4AF37" opacity="0.7"/>
      <path d="M60 60 L85 40" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
      <path d="M60 60 L80 60" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="25" cy="35" r="3" fill="#D4AF37" opacity="0.3"/>
      <circle cx="95" cy="30" r="2" fill="#D4AF37" opacity="0.4"/>
    </svg>
  );
}
function Svg26(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1808"/>
      <rect x="5" y="35" width="110" height="80" rx="3" fill="#1A3010"/>
      <rect x="10" y="30" width="100" height="10" rx="2" fill="#224020"/>
      <rect x="15" y="45" width="90" height="65" fill="#0A1808"/>
      <rect x="20" y="50" width="35" height="55" rx="2" fill="#1A3010" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="50" width="35" height="55" rx="2" fill="#1A3010" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M20 75 L55 75 M65 75 L100 75" stroke="#D4AF37" strokeWidth="0.4" opacity="0.4"/>
      <circle cx="37" cy="63" r="7" fill="#CC1A1A" opacity="0.6"/>
      <circle cx="37" cy="63" r="3" fill="#EF4444" opacity="0.8"/>
      <circle cx="82" cy="63" r="7" fill="#224020" opacity="0.8"/>
      <rect x="45" y="20" width="30" height="10" rx="2" fill="#1A3010" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg27(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1520"/>
      <rect x="10" y="40" width="100" height="75" rx="3" fill="#0D2035"/>
      <rect x="15" y="35" width="90" height="10" rx="2" fill="#153045"/>
      <rect x="20" y="50" width="80" height="60" fill="#0A1828"/>
      <ellipse cx="60" cy="75" rx="30" ry="20" fill="#0D2035" stroke="#4A9ECC" strokeWidth="0.8"/>
      <ellipse cx="60" cy="75" rx="18" ry="12" fill="#081520" stroke="#4A9ECC" strokeWidth="0.5"/>
      <circle cx="60" cy="75" r="5" fill="#4A9ECC" opacity="0.3"/>
      <path d="M30 75 Q35 60 60 58 Q85 56 90 75" stroke="#4A9ECC" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <rect x="40" y="10" width="40" height="25" rx="3" fill="#0D2035" stroke="#4A9ECC" strokeWidth="0.5"/>
      <circle cx="60" cy="8" r="4" fill="#4A9ECC" opacity="0.4"/>
    </svg>
  );
}
function Svg28(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#080810"/>
      <rect x="5" y="30" width="110" height="85" rx="3" fill="#0D0D20"/>
      <rect x="10" y="25" width="100" height="10" rx="2" fill="#151528"/>
      <rect x="15" y="40" width="90" height="70" fill="#080818"/>
      <rect x="20" y="48" width="38" height="55" fill="#0A0A15"/>
      <rect x="22" y="52" width="8" height="4" fill="#00FF88" opacity="0.3"/>
      <rect x="22" y="60" width="8" height="4" fill="#00FF88" opacity="0.3"/>
      <rect x="22" y="68" width="8" height="4" fill="#EF4444" opacity="0.5"/>
      <rect x="22" y="76" width="8" height="4" fill="#00FF88" opacity="0.3"/>
      <rect x="65" y="48" width="35" height="55" fill="#0A0A15"/>
      <circle cx="82" cy="75" r="14" fill="#080815" stroke="#00FF88" strokeWidth="0.8" opacity="0.6"/>
      <path d="M75 75 L82 68 L89 75 L82 82Z" fill="#00FF88" opacity="0.2"/>
      <circle cx="82" cy="75" r="4" fill="#00FF88" opacity="0.3"/>
      <rect x="40" y="12" width="40" height="12" rx="2" fill="#0D0D20" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg29(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0A0A"/>
      <rect x="5" y="35" width="110" height="80" rx="3" fill="#2A1010"/>
      <rect x="10" y="30" width="100" height="10" rx="2" fill="#3D1818"/>
      <rect x="15" y="45" width="90" height="65" fill="#1A0808"/>
      <rect x="20" y="52" width="50" height="50" fill="#250E0E" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="75" y="52" width="25" height="50" fill="#250E0E" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="24" y="56" width="42" height="40" fill="#1A0808"/>
      <circle cx="45" cy="76" r="14" fill="#250E0E" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M36 76 Q45 67 54 76 Q45 85 36 76Z" fill="#D4AF37" opacity="0.3"/>
      <circle cx="45" cy="76" r="4" fill="#D4AF37" opacity="0.5"/>
      <rect x="25" y="20" width="70" height="10" rx="2" fill="#2A1010" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg30(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A0A"/>
      <rect x="25" y="10" width="70" height="100" rx="4" fill="#151515"/>
      <rect x="30" y="15" width="60" height="90" fill="#0A0A0A"/>
      <rect x="35" y="20" width="50" height="35" fill="#151515"/>
      <rect x="35" y="60" width="22" height="25" fill="#151515"/>
      <rect x="63" y="60" width="22" height="25" fill="#151515"/>
      <rect x="45" y="90" width="30" height="10" fill="#151515"/>
      <circle cx="60" cy="37" r="12" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M54 37 L60 30 L66 37 L60 44Z" fill="#D4AF37" opacity="0.4"/>
      <circle cx="60" cy="37" r="3" fill="#D4AF37" opacity="0.6"/>
      <path d="M50 90 L50 100 L70 100 L70 90" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="60" cy="8" r="4" fill="#EF4444" opacity="0.6"/>
    </svg>
  );
}

/* ─── SVG Scenes 31–60 (5 Players) ─── */

function Svg31(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#080D18"/>
      <rect x="5" y="20" width="110" height="95" rx="3" fill="#0D1525"/>
      <rect x="10" y="15" width="100" height="10" rx="2" fill="#152030"/>
      <rect x="15" y="30" width="42" height="75" rx="2" fill="#0A1020" stroke="#4A7ACC" strokeWidth="0.5"/>
      <rect x="63" y="30" width="42" height="75" rx="2" fill="#0A1020" stroke="#4A7ACC" strokeWidth="0.5"/>
      <rect x="18" y="35" width="36" height="5" fill="#4A7ACC" opacity="0.2"/>
      <rect x="18" y="44" width="36" height="5" fill="#4A7ACC" opacity="0.2"/>
      <rect x="18" y="53" width="36" height="5" fill="#EF4444" opacity="0.4"/>
      <rect x="18" y="62" width="36" height="5" fill="#4A7ACC" opacity="0.2"/>
      <rect x="18" y="71" width="36" height="5" fill="#4A7ACC" opacity="0.2"/>
      <rect x="66" y="35" width="36" height="5" fill="#4A7ACC" opacity="0.2"/>
      <rect x="66" y="44" width="36" height="5" fill="#4A7ACC" opacity="0.2"/>
      <rect x="66" y="53" width="36" height="5" fill="#4A7ACC" opacity="0.2"/>
      <rect x="66" y="62" width="20" height="5" fill="#EF4444" opacity="0.4"/>
      <rect x="30" y="8" width="60" height="7" rx="2" fill="#0D1525" stroke="#4A7ACC" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg32(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A18"/>
      <rect x="5" y="40" width="110" height="75" rx="3" fill="#121225"/>
      <rect x="10" y="35" width="100" height="10" rx="2" fill="#1A1A35"/>
      <ellipse cx="60" cy="55" rx="48" ry="8" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="12" y="63" width="96" height="48" fill="#0D0D20"/>
      <rect x="15" y="65" width="10" height="8" rx="1" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="30" y="65" width="10" height="8" rx="1" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="45" y="65" width="10" height="8" rx="1" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="60" y="65" width="10" height="8" rx="1" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="75" y="65" width="10" height="8" rx="1" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="90" y="65" width="10" height="8" rx="1" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="25" y="15" width="70" height="20" rx="3" fill="#0D0D20" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="12" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg33(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0015"/>
      <rect x="0" y="50" width="120" height="70" fill="#10001A"/>
      <circle cx="30" cy="20" r="15" fill="#CC00AA" opacity="0.15"/>
      <circle cx="70" cy="15" r="12" fill="#0066CC" opacity="0.15"/>
      <circle cx="100" cy="25" r="10" fill="#CC0044" opacity="0.15"/>
      <rect x="5" y="50" width="110" height="5" rx="2" fill="#1A0025"/>
      <rect x="10" y="55" width="100" height="60" fill="#0A0015"/>
      <rect x="15" y="60" width="18" height="50" rx="1" fill="#150020" stroke="#CC00AA" strokeWidth="0.5" opacity="0.6"/>
      <rect x="40" y="60" width="18" height="50" rx="1" fill="#150020" stroke="#0066CC" strokeWidth="0.5" opacity="0.6"/>
      <rect x="65" y="60" width="18" height="50" rx="1" fill="#150020" stroke="#CC0044" strokeWidth="0.5" opacity="0.6"/>
      <rect x="90" y="60" width="18" height="50" rx="1" fill="#150020" stroke="#CC00AA" strokeWidth="0.5" opacity="0.6"/>
      <rect x="20" y="45" width="80" height="8" rx="2" fill="#1A0025" stroke="#CC00AA" strokeWidth="0.4" opacity="0.5"/>
    </svg>
  );
}
function Svg34(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#051015"/>
      <rect x="5" y="25" width="110" height="90" rx="3" fill="#081820"/>
      <rect x="10" y="20" width="100" height="10" rx="2" fill="#102530"/>
      <rect x="20" y="35" width="35" height="70" rx="3" fill="#0D2028" stroke="#2A9ECC" strokeWidth="0.8"/>
      <rect x="65" y="35" width="35" height="70" rx="3" fill="#0D2028" stroke="#2A9ECC" strokeWidth="0.8"/>
      <ellipse cx="37" cy="72" rx="12" ry="18" fill="#051520" stroke="#2A9ECC" strokeWidth="0.5"/>
      <circle cx="37" cy="65" r="5" fill="#2A9ECC" opacity="0.2"/>
      <circle cx="37" cy="65" r="2" fill="#2A9ECC" opacity="0.4"/>
      <ellipse cx="82" cy="72" rx="12" ry="18" fill="#051520" stroke="#2A9ECC" strokeWidth="0.5"/>
      <circle cx="82" cy="65" r="5" fill="#EF4444" opacity="0.15"/>
      <path d="M94 35 L94 50" stroke="#EF4444" strokeWidth="1" opacity="0.5"/>
      <rect x="40" y="10" width="40" height="10" rx="2" fill="#081820" stroke="#2A9ECC" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg35(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050A10"/>
      <rect x="5" y="20" width="110" height="95" rx="3" fill="#08101A"/>
      <rect x="10" y="15" width="100" height="10" rx="2" fill="#102030"/>
      <circle cx="60" cy="70" r="40" fill="none" stroke="#00CC66" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="60" cy="70" r="28" fill="none" stroke="#00CC66" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="60" cy="70" r="16" fill="none" stroke="#00CC66" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="60" cy="70" r="5" fill="#00CC66" opacity="0.2"/>
      <line x1="20" y1="70" x2="100" y2="70" stroke="#00CC66" strokeWidth="0.4" opacity="0.3"/>
      <line x1="60" y1="30" x2="60" y2="110" stroke="#00CC66" strokeWidth="0.4" opacity="0.3"/>
      <path d="M60 70 L88 48" stroke="#00CC66" strokeWidth="1.5" opacity="0.8"/>
      <circle cx="88" cy="48" r="4" fill="#EF4444" opacity="0.7"/>
      <rect x="25" y="25" width="70" height="20" rx="2" fill="#08101A" stroke="#00CC66" strokeWidth="0.5"/>
      <rect x="30" y="29" width="40" height="4" fill="#00CC66" opacity="0.15"/>
      <rect x="30" y="36" width="25" height="4" fill="#EF4444" opacity="0.3"/>
    </svg>
  );
}
function Svg36(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#020810"/>
      <rect x="0" y="55" width="120" height="65" fill="#040C18"/>
      <path d="M0 55 Q20 40 40 50 Q60 60 80 45 Q100 30 120 45 L120 55 L0 55Z" fill="#061020"/>
      <path d="M15 55 L25 75 Q35 80 45 75 L55 55" fill="#0A1828" stroke="#1A4A8A" strokeWidth="0.8"/>
      <path d="M25 75 Q35 85 45 75" fill="#0D1830"/>
      <path d="M35 55 L35 75" stroke="#1A4A8A" strokeWidth="0.5"/>
      <circle cx="35" cy="48" r="8" fill="#0A1828" stroke="#1A4A8A" strokeWidth="0.8"/>
      <rect x="30" y="44" width="10" height="5" fill="#061020"/>
      <rect x="60" y="25" width="55" height="30" rx="3" fill="#0A1828" stroke="#1A4A8A" strokeWidth="0.5"/>
      <path d="M65 35 L110 35" stroke="#1A4A8A" strokeWidth="0.4" opacity="0.5"/>
      <circle cx="70" cy="42" r="3" fill="#D4AF37" opacity="0.4"/>
      <circle cx="60" cy="12" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg37(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#100818"/>
      <rect x="15" y="45" width="90" height="70" rx="3" fill="#1A0A28"/>
      <rect x="10" y="40" width="100" height="10" rx="2" fill="#250E38"/>
      <rect x="20" y="55" width="80" height="55" fill="#12061E"/>
      <rect x="25" y="60" width="30" height="45" rx="2" fill="#1A0A28" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="60" width="30" height="45" rx="2" fill="#1A0A28" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="47" y="75" width="26" height="30" fill="#12061E" stroke="#D4AF37" strokeWidth="0.3"/>
      <path d="M20 40 L60 25 L100 40" stroke="#D4AF37" strokeWidth="0.8" fill="none"/>
      <path d="M20 40 L60 25 L100 40" stroke="#D4AF37" strokeWidth="0.8" fill="none"/>
      <circle cx="60" cy="22" r="8" fill="#1A0A28" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M55 22 L60 16 L65 22 L60 28Z" fill="#D4AF37" opacity="0.5"/>
      <circle cx="60" cy="10" r="3" fill="#D4AF37" opacity="0.7"/>
    </svg>
  );
}
function Svg38(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A10"/>
      <rect x="0" y="65" width="120" height="55" fill="#121218"/>
      <rect x="10" y="25" width="25" height="40" rx="2" fill="#181820" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="40" y="15" width="40" height="50" rx="2" fill="#181820" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="85" y="30" width="30" height="35" rx="2" fill="#181820" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="12" y="30" width="7" height="5" fill="#D4AF37" opacity="0.1"/>
      <rect x="12" y="40" width="7" height="5" fill="#D4AF37" opacity="0.1"/>
      <rect x="45" y="20" width="10" height="8" fill="#D4AF37" opacity="0.1"/>
      <rect x="60" y="20" width="10" height="8" fill="#D4AF37" opacity="0.1"/>
      <rect x="45" y="35" width="10" height="8" fill="#D4AF37" opacity="0.1"/>
      <rect x="60" y="35" width="10" height="8" fill="#D4AF37" opacity="0.1"/>
      <rect x="0" y="63" width="120" height="4" fill="#252525"/>
      <circle cx="60" cy="8" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg39(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#080808"/>
      <rect x="0" y="55" width="120" height="65" fill="#101010"/>
      <path d="M0 55 Q15 45 30 55 L30 115 L0 115Z" fill="#151515"/>
      <path d="M90 55 Q105 45 120 55 L120 115 L90 115Z" fill="#151515"/>
      <ellipse cx="60" cy="55" rx="30" ry="8" fill="#151515" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="30" y="55" width="60" height="60" fill="#0A0A0A"/>
      <path d="M30 75 Q60 70 90 75" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M30 90 Q60 85 90 90" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <rect x="40" y="20" width="40" height="35" rx="3" fill="#151515" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="48" y="26" width="24" height="20" fill="#0A0A0A"/>
      <circle cx="60" cy="10" r="5" fill="#D4AF37" opacity="0.3"/>
    </svg>
  );
}
function Svg40(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#020810"/>
      <rect x="0" y="70" width="120" height="50" fill="#040C15"/>
      <path d="M0 70 Q30 60 60 65 Q90 70 120 62 L120 70 L0 70Z" fill="#061020"/>
      <path d="M10 60 Q35 45 60 50 Q85 55 110 45 L115 48 Q90 58 65 53 Q40 48 15 63Z" fill="#1A3050"/>
      <path d="M55 52 L75 45 L80 48 L60 55Z" fill="#253545"/>
      <path d="M55 52 L45 55 L48 58 L58 55Z" fill="#1A2A40"/>
      <circle cx="58" cy="53" r="3" fill="#D4AF37" opacity="0.3"/>
      <line x1="15" y1="70" x2="15" y2="85" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <line x1="30" y1="70" x2="30" y2="90" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <line x1="45" y1="70" x2="45" y2="88" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <rect x="25" y="15" width="70" height="25" rx="3" fill="#0A1525" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="10" r="3" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg41(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050A10"/>
      <rect x="5" y="25" width="110" height="90" rx="3" fill="#081520"/>
      <rect x="10" y="20" width="100" height="10" rx="2" fill="#102030"/>
      <rect x="15" y="35" width="90" height="75" fill="#060F18"/>
      <rect x="20" y="45" width="18" height="45" rx="3" fill="#0A1828" stroke="#4A9ECC" strokeWidth="0.8"/>
      <rect x="45" y="45" width="18" height="45" rx="3" fill="#0A1828" stroke="#4A9ECC" strokeWidth="0.8"/>
      <rect x="70" y="45" width="18" height="45" rx="3" fill="#0A1828" stroke="#EF4444" strokeWidth="0.8"/>
      <rect x="95" y="45" width="15" height="45" rx="3" fill="#0A1828" stroke="#4A9ECC" strokeWidth="0.8"/>
      <ellipse cx="29" cy="75" rx="7" ry="12" fill="#081015" stroke="#4A9ECC" strokeWidth="0.4"/>
      <ellipse cx="54" cy="75" rx="7" ry="12" fill="#081015" stroke="#4A9ECC" strokeWidth="0.4"/>
      <ellipse cx="79" cy="75" rx="7" ry="12" fill="#081015" stroke="#EF4444" strokeWidth="0.4"/>
      <rect x="25" y="10" width="70" height="10" rx="2" fill="#081520" stroke="#4A9ECC" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg42(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0808"/>
      <rect x="0" y="70" width="120" height="50" fill="#121010"/>
      <path d="M0 70 Q60 55 120 70" stroke="#1A1210" strokeWidth="5" fill="none"/>
      <path d="M5 70 L5 50 L25 70" fill="#181515" stroke="#252020" strokeWidth="0.5"/>
      <path d="M115 70 L115 50 L95 70" fill="#181515" stroke="#252020" strokeWidth="0.5"/>
      <path d="M5 70 L115 70" stroke="#2A2525" strokeWidth="6"/>
      <path d="M15 70 L15 45 Q60 35 105 45 L105 70" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M35 45 L35 70 M60 38 L60 70 M85 45 L85 70" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="48" cy="55" r="3" fill="#EF4444" opacity="0.6"/>
      <rect x="30" y="15" width="60" height="20" rx="3" fill="#181515" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg43(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1010"/>
      <rect x="5" y="25" width="110" height="90" rx="3" fill="#0D1815"/>
      <rect x="10" y="20" width="100" height="10" rx="2" fill="#152820"/>
      <rect x="15" y="35" width="90" height="75" fill="#081210"/>
      <circle cx="60" cy="30" r="12" fill="#1A2820" stroke="#2ACC88" strokeWidth="0.8"/>
      <circle cx="60" cy="30" r="6" fill="#0D1810"/>
      <path d="M40 30 L20 30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 2"/>
      <path d="M80 30 L100 30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 2"/>
      <rect x="25" y="55" width="70" height="50" rx="2" fill="#0D1815" stroke="#2ACC88" strokeWidth="0.5"/>
      <ellipse cx="60" cy="75" rx="25" ry="10" fill="#081210" stroke="#2ACC88" strokeWidth="0.5"/>
      <path d="M35 95 L85 95" stroke="#2ACC88" strokeWidth="0.4" opacity="0.4"/>
      <path d="M38 88 L82 88" stroke="#2ACC88" strokeWidth="0.4" opacity="0.4"/>
    </svg>
  );
}
function Svg44(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0808"/>
      <rect x="15" y="30" width="90" height="85" rx="4" fill="#1A1210"/>
      <rect x="10" y="25" width="100" height="10" rx="2" fill="#252015"/>
      <rect x="20" y="40" width="80" height="70" fill="#100E08"/>
      <circle cx="60" cy="72" r="25" fill="#1A1208" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="60" cy="72" r="18" fill="#100E08" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="60" cy="72" r="10" fill="#1A1208"/>
      <rect x="55" y="62" width="10" height="18" rx="2" fill="#100E08" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="50" y="68" width="20" height="8" rx="2" fill="#100E08" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="72" r="3" fill="#D4AF37" opacity="0.5"/>
      <rect x="30" y="12" width="60" height="12" rx="3" fill="#1A1210" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg45(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050A05"/>
      <rect x="0" y="65" width="120" height="55" fill="#0A1208"/>
      <path d="M0 65 Q15 50 30 58 Q45 66 60 52 Q75 38 90 55 Q105 72 120 60 L120 65 L0 65Z" fill="#0F1A0A"/>
      <circle cx="25" cy="52" r="16" fill="#0A2005" stroke="#2A7A20" strokeWidth="0.5"/>
      <circle cx="65" cy="45" r="20" fill="#0A2005" stroke="#2A7A20" strokeWidth="0.5"/>
      <circle cx="100" cy="55" r="14" fill="#0A2005" stroke="#2A7A20" strokeWidth="0.5"/>
      <circle cx="65" cy="42" r="6" fill="#2A7A20" opacity="0.3"/>
      <circle cx="25" cy="50" r="4" fill="#2A7A20" opacity="0.2"/>
      <rect x="30" y="10" width="60" height="30" rx="5" fill="#0A1508" stroke="#2A7A20" strokeWidth="0.8"/>
      <rect x="35" y="15" width="50" height="20" fill="#050A05"/>
      <circle cx="60" cy="25" r="6" fill="#EF4444" opacity="0.3"/>
      <circle cx="60" cy="25" r="3" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg46(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#080808"/>
      <rect x="10" y="25" width="100" height="90" rx="2" fill="#101010"/>
      <rect x="12" y="27" width="14" height="14" fill="#181818"/>
      <rect x="26" y="27" width="14" height="14" fill="#0A0A0A"/>
      <rect x="40" y="27" width="14" height="14" fill="#181818"/>
      <rect x="54" y="27" width="14" height="14" fill="#0A0A0A"/>
      <rect x="68" y="27" width="14" height="14" fill="#181818"/>
      <rect x="82" y="27" width="14" height="14" fill="#0A0A0A"/>
      <rect x="96" y="27" width="14" height="14" fill="#181818"/>
      <rect x="12" y="41" width="14" height="14" fill="#0A0A0A"/>
      <rect x="26" y="41" width="14" height="14" fill="#181818"/>
      <rect x="40" y="41" width="14" height="14" fill="#0A0A0A"/>
      <rect x="54" y="41" width="14" height="14" fill="#181818"/>
      <rect x="68" y="41" width="14" height="14" fill="#0A0A0A"/>
      <rect x="82" y="41" width="14" height="14" fill="#181818"/>
      <rect x="96" y="41" width="14" height="14" fill="#0A0A0A"/>
      <circle cx="40" cy="34" r="6" fill="#D4AF37" opacity="0.6"/>
      <circle cx="54" cy="48" r="5" fill="#F0F0F0" opacity="0.5"/>
      <circle cx="68" cy="62" r="4" fill="#D4AF37" opacity="0.4"/>
      <circle cx="60" cy="8" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg47(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#100808"/>
      <rect x="0" y="68" width="120" height="52" fill="#180C08"/>
      <path d="M15 68 L15 30 L50 10 L85 30 L85 68Z" fill="#1A1008" stroke="#8B4513" strokeWidth="0.5"/>
      <path d="M50 10 L85 30 L115 20 L50 10Z" fill="#251508"/>
      <rect x="30" y="45" width="40" height="23" fill="#0A0808"/>
      <rect x="35" y="48" width="12" height="20" fill="#1A1008"/>
      <rect x="53" y="48" width="12" height="20" fill="#1A1008"/>
      <path d="M20 55 Q30 40 50 50" stroke="#FF6600" strokeWidth="2" fill="none" opacity="0.7"/>
      <path d="M20 68 Q25 55 35 60" stroke="#FF4400" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <circle cx="25" cy="55" r="5" fill="#FF6600" opacity="0.3"/>
      <rect x="85" y="25" width="30" height="43" rx="2" fill="#1A1008" stroke="#8B4513" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg48(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050510"/>
      <rect x="0" y="72" width="120" height="48" fill="#080818"/>
      <line x1="60" y1="72" x2="60" y2="20" stroke="#D4AF37" strokeWidth="2"/>
      <path d="M50 20 L70 20 L70 25 L50 25Z" fill="#D4AF37" opacity="0.4"/>
      <path d="M45 40 L60 20 L75 40" fill="#0D0D20" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M40 55 L60 25 L80 55" fill="#0D0D20" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="30" cy="55" r="12" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="30" cy="55" r="20" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"/>
      <circle cx="30" cy="55" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.15"/>
      <circle cx="90" cy="55" r="12" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="90" cy="55" r="20" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"/>
      <rect x="52" y="80" width="16" height="30" fill="#0D0D20" stroke="#D4AF37" strokeWidth="0.3"/>
    </svg>
  );
}
function Svg49(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#180E05"/>
      <path d="M0 80 Q20 65 40 75 Q60 85 80 70 Q100 55 120 68 L120 120 L0 120Z" fill="#221205"/>
      <ellipse cx="25" cy="72" rx="20" ry="6" fill="#2A1808"/>
      <ellipse cx="65" cy="65" rx="28" ry="7" fill="#2A1808"/>
      <ellipse cx="100" cy="70" rx="18" ry="5" fill="#2A1808"/>
      <path d="M20 68 L35 60 L45 65 L40 70Z" fill="#3A2010"/>
      <path d="M45 64 L55 58 L62 63 L58 68Z" fill="#3A2010"/>
      <path d="M62 62 L72 56 L78 61 L74 66Z" fill="#3A2010"/>
      <circle cx="35" cy="60" r="4" fill="#D4AF37" opacity="0.3"/>
      <circle cx="55" cy="55" r="3" fill="#D4AF37" opacity="0.2"/>
      <rect x="25" y="15" width="70" height="40" rx="3" fill="#2A1808" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="35" r="12" fill="#221205" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M54 35 L60 28 L66 35 L60 42Z" fill="#D4AF37" opacity="0.25"/>
    </svg>
  );
}
function Svg50(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#020408"/>
      <circle cx="60" cy="60" r="55" fill="#030510"/>
      <circle cx="18" cy="22" r="2" fill="#D4AF37" opacity="0.5"/>
      <circle cx="95" cy="15" r="1.5" fill="#D4AF37" opacity="0.6"/>
      <circle cx="105" cy="45" r="1" fill="#D4AF37" opacity="0.4"/>
      <circle cx="8" cy="70" r="1.5" fill="#D4AF37" opacity="0.4"/>
      <circle cx="112" cy="88" r="1" fill="#D4AF37" opacity="0.5"/>
      <circle cx="30" cy="100" r="1.5" fill="#D4AF37" opacity="0.3"/>
      <circle cx="60" cy="55" r="20" fill="#050A15" stroke="#4A7ACC" strokeWidth="0.5"/>
      <circle cx="60" cy="55" r="12" fill="#030510"/>
      <ellipse cx="60" cy="55" rx="20" ry="6" fill="none" stroke="#4A7ACC" strokeWidth="0.5" opacity="0.5"/>
      <path d="M60 35 L60 75" stroke="#4A7ACC" strokeWidth="0.3" opacity="0.3"/>
      <circle cx="60" cy="55" r="3" fill="#4A7ACC" opacity="0.5"/>
      <circle cx="80" cy="55" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg51(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050A18"/>
      <rect x="0" y="60" width="120" height="60" fill="#081528"/>
      <path d="M0 60 Q20 45 40 55 Q60 65 80 50 Q100 35 120 50 L120 60 L0 60Z" fill="#0A1830"/>
      <rect x="30" y="15" width="60" height="45" rx="3" fill="#0D2035" stroke="#4A7ACC" strokeWidth="0.8"/>
      <rect x="35" y="20" width="50" height="35" fill="#081525"/>
      <rect x="40" y="50" width="40" height="10" rx="1" fill="#1A3050"/>
      <path d="M50 50 L50 60" stroke="#4A7ACC" strokeWidth="0.5"/>
      <path d="M60 50 L60 60" stroke="#4A7ACC" strokeWidth="0.5"/>
      <path d="M70 50 L70 60" stroke="#4A7ACC" strokeWidth="0.5"/>
      <circle cx="60" cy="35" r="8" fill="#081525" stroke="#4A7ACC" strokeWidth="0.5"/>
      <circle cx="60" cy="35" r="3" fill="#4A7ACC" opacity="0.3"/>
      <path d="M30 60 L90 60 L90 80 Q60 90 30 80Z" fill="#4A7ACC" opacity="0.1"/>
    </svg>
  );
}
function Svg52(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#080808"/>
      <rect x="5" y="20" width="110" height="95" rx="3" fill="#101010"/>
      <rect x="10" y="15" width="100" height="10" rx="2" fill="#181818"/>
      <rect x="15" y="30" width="90" height="75" fill="#0A0A0A"/>
      <rect x="20" y="38" width="35" height="10" fill="#181818"/>
      <rect x="65" y="38" width="35" height="10" fill="#181818"/>
      <rect x="20" y="55" width="35" height="10" fill="#181818"/>
      <rect x="65" y="55" width="35" height="10" fill="#181818"/>
      <rect x="20" y="72" width="35" height="10" fill="#181818"/>
      <rect x="65" y="72" width="35" height="10" fill="#EF4444" opacity="0.3"/>
      <rect x="20" y="89" width="35" height="10" fill="#181818"/>
      <rect x="65" y="89" width="35" height="10" fill="#EF4444" opacity="0.3"/>
      <circle cx="22" cy="43" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="22" cy="60" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="22" cy="77" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="22" cy="94" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="67" cy="43" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="67" cy="60" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="67" cy="77" r="2" fill="#EF4444" opacity="0.6"/>
      <circle cx="67" cy="94" r="2" fill="#EF4444" opacity="0.6"/>
    </svg>
  );
}
function Svg53(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#100810"/>
      <rect x="5" y="40" width="110" height="75" rx="3" fill="#1A0A1A"/>
      <rect x="10" y="35" width="100" height="10" rx="2" fill="#250E25"/>
      <rect x="15" y="50" width="90" height="60" fill="#120812"/>
      <circle cx="60" cy="80" r="28" fill="#1A0A1A" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="60" cy="80" r="18" fill="#120812" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="60" cy="80" r="8" fill="#1A0A1A"/>
      <circle cx="60" cy="80" r="3" fill="#D4AF37" opacity="0.7"/>
      <path d="M48 80 Q60 68 72 80 Q60 92 48 80Z" fill="#D4AF37" opacity="0.2"/>
      <circle cx="50" cy="15" r="12" fill="#1A0A1A" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="70" cy="15" r="12" fill="#1A0A1A" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M58 15 Q60 10 62 15" stroke="#D4AF37" strokeWidth="1" fill="none"/>
    </svg>
  );
}
function Svg54(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#050A18"/>
      <rect x="0" y="60" width="120" height="60" fill="#0A1528"/>
      <path d="M0 60 Q15 50 30 58 Q45 66 60 55 Q75 44 90 52 Q105 60 120 52 L120 60 L0 60Z" fill="#0D1A32"/>
      <rect x="20" y="20" width="80" height="40" rx="3" fill="#0D1A32" stroke="#4A9ECC" strokeWidth="0.5"/>
      <rect x="25" y="25" width="70" height="30" fill="#081525"/>
      <rect x="30" y="30" width="30" height="8" fill="#0D1A32"/>
      <rect x="30" y="42" width="45" height="5" fill="#0D1A32"/>
      <circle cx="85" cy="37" r="8" fill="#081525" stroke="#4A9ECC" strokeWidth="0.5"/>
      <circle cx="85" cy="37" r="3" fill="#4A9ECC" opacity="0.2"/>
      <path d="M25 62 Q60 70 95 62" stroke="#4A9ECC" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <circle cx="20" cy="8" r="3" fill="#D4AF37" opacity="0.3"/>
      <circle cx="35" cy="5" r="2" fill="#D4AF37" opacity="0.3"/>
      <circle cx="85" cy="8" r="3" fill="#D4AF37" opacity="0.3"/>
    </svg>
  );
}
function Svg55(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0A08"/>
      <rect x="0" y="70" width="120" height="50" fill="#121210"/>
      <path d="M55 10 L65 10 L65 70 L55 70Z" fill="#1A1A18"/>
      <path d="M55 70 L20 70 L20 90 L5 90 L5 95 L25 95 L25 75 L55 75Z" fill="#181815"/>
      <path d="M65 70 L100 70 L100 90 L115 90 L115 95 L95 95 L95 75 L65 75Z" fill="#181815"/>
      <path d="M0 75 L20 75 L20 72 L0 72Z" fill="#252520"/>
      <path d="M100 75 L120 75 L120 72 L100 72Z" fill="#252520"/>
      <rect x="15" y="88" width="15" height="5" fill="#D4AF37" opacity="0.2"/>
      <rect x="90" y="88" width="15" height="5" fill="#D4AF37" opacity="0.2"/>
      <circle cx="60" cy="10" r="5" fill="#EF4444" opacity="0.5"/>
      <rect x="40" y="30" width="40" height="15" rx="2" fill="#1A1A18" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg56(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#030A05"/>
      <rect x="5" y="20" width="110" height="95" rx="3" fill="#060E08"/>
      <rect x="10" y="15" width="100" height="10" rx="2" fill="#0C1A10"/>
      <rect x="15" y="30" width="90" height="75" fill="#040A06"/>
      <rect x="20" y="38" width="12" height="8" rx="1" fill="#0A2010" stroke="#00CC44" strokeWidth="0.5"/>
      <rect x="38" y="38" width="12" height="8" rx="1" fill="#0A2010" stroke="#00CC44" strokeWidth="0.5"/>
      <rect x="56" y="38" width="12" height="8" rx="1" fill="#0A2010" stroke="#00CC44" strokeWidth="0.5"/>
      <rect x="74" y="38" width="12" height="8" rx="1" fill="#0A2010" stroke="#EF4444" strokeWidth="0.5"/>
      <rect x="92" y="38" width="12" height="8" rx="1" fill="#0A2010" stroke="#00CC44" strokeWidth="0.5"/>
      <path d="M26 46 Q32 55 44 46" stroke="#00CC44" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <path d="M44 46 Q50 55 62 46" stroke="#00CC44" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <path d="M62 46 Q68 55 80 46" stroke="#EF4444" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <rect x="20" y="60" width="80" height="5" fill="#00CC44" opacity="0.1"/>
      <rect x="20" y="70" width="80" height="5" fill="#00CC44" opacity="0.1"/>
      <rect x="20" y="80" width="80" height="5" fill="#00CC44" opacity="0.1"/>
      <rect x="20" y="90" width="50" height="5" fill="#EF4444" opacity="0.2"/>
    </svg>
  );
}
function Svg57(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A0808"/>
      <rect x="0" y="70" width="120" height="50" fill="#121010"/>
      <path d="M20 70 L30 20 L45 20 L55 70Z" fill="#1A1510" stroke="#AA8800" strokeWidth="0.5"/>
      <path d="M65 70 L75 20 L90 20 L100 70Z" fill="#1A1510" stroke="#AA8800" strokeWidth="0.5"/>
      <ellipse cx="37" cy="20" rx="8" ry="4" fill="#AA8800" opacity="0.3"/>
      <ellipse cx="82" cy="20" rx="8" ry="4" fill="#AA8800" opacity="0.3"/>
      <path d="M37 16 Q37 5 37 16" stroke="#AA8800" strokeWidth="1.5" opacity="0.4"/>
      <path d="M82 16 Q82 5 82 16" stroke="#AA8800" strokeWidth="1.5" opacity="0.4"/>
      <path d="M30 5 Q37 0 44 5" stroke="#AA8800" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M75 5 Q82 0 89 5" stroke="#AA8800" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <rect x="5" y="65" width="110" height="8" rx="2" fill="#1A1510" stroke="#AA8800" strokeWidth="0.4"/>
      <rect x="40" y="75" width="40" height="40" rx="2" fill="#1A1510" stroke="#AA8800" strokeWidth="0.5"/>
      <circle cx="60" cy="95" r="8" fill="#0A0808" stroke="#AA8800" strokeWidth="0.8"/>
      <circle cx="60" cy="8" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>
  );
}
function Svg58(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#080508"/>
      <circle cx="60" cy="60" r="5" fill="#CC0033" opacity="0.7"/>
      <circle cx="20" cy="25" r="4" fill="#CC0033" opacity="0.5"/>
      <circle cx="95" cy="20" r="4" fill="#CC0033" opacity="0.5"/>
      <circle cx="15" cy="90" r="4" fill="#CC0033" opacity="0.5"/>
      <circle cx="100" cy="95" r="4" fill="#CC0033" opacity="0.5"/>
      <circle cx="55" cy="15" r="3" fill="#CC0033" opacity="0.4"/>
      <path d="M60 60 L20 25" stroke="#CC0033" strokeWidth="0.5" opacity="0.4"/>
      <path d="M60 60 L95 20" stroke="#CC0033" strokeWidth="0.5" opacity="0.4"/>
      <path d="M60 60 L15 90" stroke="#CC0033" strokeWidth="0.5" opacity="0.4"/>
      <path d="M60 60 L100 95" stroke="#CC0033" strokeWidth="0.5" opacity="0.4"/>
      <path d="M60 60 L55 15" stroke="#CC0033" strokeWidth="0.5" opacity="0.4"/>
      <path d="M20 25 L55 15 M55 15 L95 20 M20 25 L15 90 M95 20 L100 95 M15 90 L100 95" stroke="#CC0033" strokeWidth="0.3" opacity="0.2"/>
      <circle cx="60" cy="60" r="12" fill="none" stroke="#CC0033" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke="#CC0033" strokeWidth="0.3" opacity="0.2"/>
    </svg>
  );
}
function Svg59(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#030305"/>
      <rect x="5" y="50" width="15" height="65" rx="1" fill="#0A0A10"/>
      <rect x="22" y="35" width="20" height="80" rx="1" fill="#0A0A10"/>
      <rect x="44" y="45" width="15" height="70" rx="1" fill="#0A0A10"/>
      <rect x="61" y="30" width="25" height="85" rx="1" fill="#0A0A10"/>
      <rect x="88" y="40" width="18" height="75" rx="1" fill="#0A0A10"/>
      <rect x="108" y="55" width="7" height="60" rx="1" fill="#0A0A10"/>
      <rect x="0" y="110" width="120" height="10" fill="#060608"/>
      <circle cx="12" cy="60" r="2" fill="#D4AF37" opacity="0.15"/>
      <circle cx="35" cy="45" r="3" fill="#D4AF37" opacity="0.1"/>
      <circle cx="50" cy="55" r="2" fill="#D4AF37" opacity="0.1"/>
      <circle cx="75" cy="38" r="3" fill="#D4AF37" opacity="0.1"/>
      <path d="M0 110 Q60 95 120 110" stroke="#EF4444" strokeWidth="0.5" fill="none" opacity="0.3"/>
    </svg>
  );
}
function Svg60(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#030810"/>
      <rect x="5" y="15" width="25" height="95" rx="2" fill="#060E18" stroke="#1A4A8A" strokeWidth="0.5"/>
      <rect x="35" y="15" width="25" height="95" rx="2" fill="#060E18" stroke="#1A4A8A" strokeWidth="0.5"/>
      <rect x="65" y="15" width="25" height="95" rx="2" fill="#060E18" stroke="#1A4A8A" strokeWidth="0.5"/>
      <rect x="95" y="15" width="20" height="95" rx="2" fill="#060E18" stroke="#1A4A8A" strokeWidth="0.5"/>
      <rect x="8" y="20" width="19" height="4" fill="#1A4A8A" opacity="0.3"/>
      <rect x="8" y="28" width="19" height="4" fill="#1A4A8A" opacity="0.3"/>
      <rect x="8" y="36" width="19" height="4" fill="#1A4A8A" opacity="0.3"/>
      <rect x="38" y="20" width="19" height="4" fill="#1A4A8A" opacity="0.3"/>
      <rect x="38" y="28" width="19" height="4" fill="#EF4444" opacity="0.4"/>
      <rect x="38" y="36" width="19" height="4" fill="#1A4A8A" opacity="0.3"/>
      <rect x="68" y="20" width="19" height="4" fill="#1A4A8A" opacity="0.3"/>
      <rect x="68" y="28" width="19" height="4" fill="#1A4A8A" opacity="0.3"/>
      <rect x="98" y="20" width="14" height="4" fill="#1A4A8A" opacity="0.3"/>
      <circle cx="60" cy="8" r="4" fill="#EF4444" opacity="0.6"/>
    </svg>
  );
}

/* ─── Cases Array ─── */

export const CASES: Case[] = [
  /* ── 4-Player Cases (1–30) ── */
  {
    id: 1,
    title: "الوريث المشبوه",
    crimeScene: "في قصر عريق لأسرة نافذة وُجد كبيرها ميتاً قبل ساعات من توقيع وصيته الجديدة التي تُغيّر توزيع الثروة كلياً. أربعة ورثة كانوا في القصر تلك الليلة وكل منهم يدّعي أنه كان نائماً.",
    citizensWord: "وصية",
    mafiusoWord: "إقرار",
    category: "جرائم الميراث",
    SvgScene: Svg01,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 2,
    title: "الرصيف الصامت",
    crimeScene: "في ميناء خاص تحت جسر قديم وُجد رجل أعمال ملقى والحقيبة بجانبه فارغة تماماً. أربعة بحّارة كانوا يعملون في المنطقة تلك الليلة ولا أحد منهم يعترف برؤية شيء غير عادي.",
    citizensWord: "مرسى",
    mafiusoWord: "رصيف",
    category: "جرائم الميناء",
    SvgScene: Svg02,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 3,
    title: "الكواليس الملعونة",
    crimeScene: "خلف كواليس مسرح فاخر وُجد المخرج الشهير ميتاً قبل ساعتين من الليلة الافتتاحية. أربعة من طاقم المسرح لا يزالون في المبنى ولكل منهم مفتاح غرفة التحكم في الإضاءة.",
    citizensWord: "خشبة",
    mafiusoWord: "ستارة",
    category: "مسرح وخيانة",
    SvgScene: Svg03,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 4,
    title: "الحفلة المميتة",
    crimeScene: "في حفل عشاء دبلوماسي سري سقط أحد الضيوف المؤثرين فجأة بعد رشفة من كأسه. الطاهي والنادل والحارس الشخصي والمساعد كانوا الأقرب إلى طاولته طوال تلك الليلة.",
    citizensWord: "سُم",
    mafiusoWord: "مُركَّز",
    category: "تسميم وخداع",
    SvgScene: Svg04,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 5,
    title: "السفارة المخترقة",
    crimeScene: "في سفارة دولة حليفة تسرّبت وثائق إستراتيجية سرية إلى جهة مجهولة. أربعة ضباط هم الوحيدون الذين دخلوا غرفة الأرشيف تلك الليلة ويملكون رمز الدخول المشفر.",
    citizensWord: "وثيقة",
    mafiusoWord: "تقرير",
    category: "تجسس وأسرار",
    SvgScene: Svg05,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 6,
    title: "المستودع المحترق",
    crimeScene: "في مستودع مغلق اشتعلت النيران ليلاً وأتت على مستندات مالية بالغة الأهمية. أربعة موظفين من الشركة كانوا آخر من يملك مفاتيح المبنى وسجّل دخولهم في الكاميرات الأمنية.",
    citizensWord: "حريق",
    mafiusoWord: "لهب",
    category: "حرائق متعمدة",
    SvgScene: Svg06,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 7,
    title: "المزاد الأسود",
    crimeScene: "في مزاد فني سري بيعت لوحة نادرة بسعر مشبوه لمشترٍ مجهول الهوية. الأربعة الحاضرون الذين دفعوا تأمين الدخول لديهم وثائق مزوّرة والمالك الحقيقي للعمل لا يعرف شيئاً عن البيع.",
    citizensWord: "مزاد",
    mafiusoWord: "معرض",
    category: "فن وتزوير",
    SvgScene: Svg07,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 8,
    title: "ورشة الساعاتي",
    crimeScene: "في ورشة ساعات نادرة تاريخية اختفت ساعة جيب ملكية مرصّعة بالجواهر. أربعة صنّاعين يعملون في المحل والمالك أكد أنها كانت في واجهة العرض قبل الإغلاق بأقل من ساعة واحدة.",
    citizensWord: "ساعة",
    mafiusoWord: "ميقاتية",
    category: "سرقة دقيقة",
    SvgScene: Svg08,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 9,
    title: "القصر المهجور",
    crimeScene: "في منزل تاريخي وُجدت رسائل مجهولة مخبّأة تحت أرضية غرفة مغلقة منذ سنوات طويلة. أربعة ورثة يتنازعون الملكية ولكل منهم مصلحة في اختفاء هذه الرسائل قبل جلسة المحكمة.",
    citizensWord: "رسالة",
    mafiusoWord: "مذكرة",
    category: "أسرار الميراث",
    SvgScene: Svg09,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 10,
    title: "القاضي الأخير",
    crimeScene: "قبل ساعات من إصدار حكمه في قضية تاريخية بالغة الأثر وُجد قاضٍ شهير ميتاً في مكتبه المحصّن. أربعة من المتهمين الكبار في القضية المنتظرة لا يزالون طلقاء ولكل منهم دوافع واضحة.",
    citizensWord: "حكم",
    mafiusoWord: "قرار",
    category: "عدالة ومؤامرة",
    SvgScene: Svg10,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 11,
    title: "المزرعة السرية",
    crimeScene: "في مزرعة عضوية نادرة وجد صاحبها أن محصوله الموسمي المميز تلف بالكامل في يوم واحد. تحاليل المختبر أثبتت تلاعباً كيميائياً مقصوداً في نقطة واحدة محددة من نظام الري.",
    citizensWord: "بذور",
    mafiusoWord: "شتلة",
    category: "مزارع وتخريب",
    SvgScene: Svg11,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 12,
    title: "الاستوديو المحمي",
    crimeScene: "في استوديو تصوير فاخر سُرقت صور خاصة سرية لشخصية نافذة من خادم محمي بحراسة مشددة. أربعة مصورين دخلوا الاستوديو تلك الليلة والملفات المحذوفة لا تزال على الجهاز الرئيسي فقط.",
    citizensWord: "صورة",
    mafiusoWord: "لقطة",
    category: "تصوير وابتزاز",
    SvgScene: Svg12,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 13,
    title: "محطة القطار القديمة",
    crimeScene: "في محطة قطار مهجورة عُثر على حقيبة مليئة بوثائق حكومية سرية مخبّأة في التخزين القديم. أربعة موظفين في شركة اللوجستيات يملكون وصولاً إلى هذه المنطقة المقيّدة ولا أحد يتكلم.",
    citizensWord: "حقيبة",
    mafiusoWord: "شنطة",
    category: "سفر وتهريب",
    SvgScene: Svg13,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 14,
    title: "مكتب المحامي",
    crimeScene: "في مكتب محامٍ شهير وُجد على طاولته عقد موقّع بحبر أحمر مريب إلى جانب رسالة تهديد مجهولة. الأربعة الذين زاروا مكتبه في اليوم نفسه ليسوا موكّلين عاديين وكلهم ينكرون.",
    citizensWord: "عقد",
    mafiusoWord: "اتفاقية",
    category: "قانون وتهديد",
    SvgScene: Svg14,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 15,
    title: "البرج المالي",
    crimeScene: "في ناطحة سحاب مالية تعطّل نظام المراقبة كله لأربع دقائق وخلالها نُقلت مبالغ طائلة إلى حسابات مجهولة في دول أخرى. أربعة مبرمجين كانوا يعملون في مركز التحكم تلك الليلة.",
    citizensWord: "تحويل",
    mafiusoWord: "حوالة",
    category: "جرائم مالية",
    SvgScene: Svg15,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 16,
    title: "المستشفى الخاص",
    crimeScene: "في مستشفى نخبوي لقي مريض ثري حتفه بسبب جرعة دواء خاطئة في الليل ولم يُسجّل أحد دخوله إلى غرفته. أربعة من أفراد الطاقم الطبي يملكون بطاقات وصول خاصة إلى طابقه.",
    citizensWord: "جرعة",
    mafiusoWord: "حقنة",
    category: "جرائم طبية",
    SvgScene: Svg16,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 17,
    title: "المجمع السكني",
    crimeScene: "في مجمع سكني فاخر اختفى وريث ثروة ضخمة في ليلة إعلان التركة الرسمية. كاميرات الأمن سُرق تسجيلها بالكامل والأربعة من سكان طابقه هم آخر من رآه قبل الاختفاء.",
    citizensWord: "اختفاء",
    mafiusoWord: "تغيب",
    category: "اختطاف وثروات",
    SvgScene: Svg17,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 18,
    title: "مركز البيانات",
    crimeScene: "في خادم بيانات حكومي سري شُغّل برنامج خبيث نقل ملفات استخباراتية حساسة إلى عنوان مجهول. أربعة مهندسين فقط يملكون وصولاً للقسم الذي بدأ منه الاختراق الصامت.",
    citizensWord: "اختراق",
    mafiusoWord: "تسريب",
    category: "أمن معلومات",
    SvgScene: Svg18,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 19,
    title: "القلعة الأوروبية",
    crimeScene: "في قلعة تاريخية نادرة سُرقت جوهرة ملكية من معرض أمني مكثّف دون أي كسر أو اختراق للزجاج. أربعة من حراس المتحف الذين عملوا في نوبة الليل هم المشتبه بهم الوحيدون.",
    citizensWord: "ماسة",
    mafiusoWord: "جوهرة",
    category: "سرقات تاريخية",
    SvgScene: Svg19,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 20,
    title: "غرفة العمليات",
    crimeScene: "في غرفة عمليات سرية وُجدت خريطة طريق مزوّرة بدلاً من الأصل تحتوي على معلومات مغلوطة تقود إلى كارثة محقّقة. أربعة ضباط يملكون الوصول ولا أحد يعرف من وضع الخريطة المزيّفة.",
    citizensWord: "خريطة",
    mafiusoWord: "مخطط",
    category: "تزوير عسكري",
    SvgScene: Svg20,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 21,
    title: "النادي السري",
    crimeScene: "في نادٍ سري لكبار رجال الأعمال فُتحت خزنة المستندات المغلقة منذ عشر سنوات وكانت فارغة تماماً. أربعة من المؤسسين الأصليين يعرفون محتويات الخزنة ولكل منهم مصلحة في اختفائها.",
    citizensWord: "خزنة",
    mafiusoWord: "صندوق",
    category: "مؤسسات سرية",
    SvgScene: Svg21,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 22,
    title: "رحلة الصيد",
    crimeScene: "في رحلة صيد بحرية خاصة اختفى أحد أصحاب السفينة في عرض البحر دون أثر ولم يُسمع صراخ. الأربعة الآخرون على متن السفينة يدّعون أنه نام مبكراً ولم يستيقظ في الصباح.",
    citizensWord: "مرساة",
    mafiusoWord: "طوق",
    category: "جرائم بحرية",
    SvgScene: Svg22,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 23,
    title: "ديوان الوزير",
    crimeScene: "في مكتب وزير نافذ سُرق محضر اجتماع حساس قبل جلسة برلمانية تاريخية. أربعة من المستشارين المقرّبين يملكون وصولاً لمكتبه ولكل منهم علاقة مثيرة للشبهة بالجهة المنافسة.",
    citizensWord: "محضر",
    mafiusoWord: "ملف",
    category: "سياسة وتجسس",
    SvgScene: Svg23,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 24,
    title: "معسكر النخبة",
    crimeScene: "في معسكر تدريب نخبوي سُرق سلاح استراتيجي خلال تمرين ليلي مكثّف. أربعة جنود كانوا يحرسون مستودع الأسلحة في تلك الساعة وكاميرا المراقبة التقطت جزءاً من وجه واحد منهم.",
    citizensWord: "سلاح",
    mafiusoWord: "عتاد",
    category: "عسكري وخيانة",
    SvgScene: Svg24,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 25,
    title: "الحفلة الدبلوماسية",
    crimeScene: "في حفل استقبال دبلوماسي رفيع أُوقف بث تشفير مباحثات سرية لدقائق وخلالها نُقلت محادثة كاملة لجهة ثالثة مجهولة. أربعة مرافقون يملكون المشغّلات الخاصة بالبث المشفّر.",
    citizensWord: "تشفير",
    mafiusoWord: "شيفرة",
    category: "دبلوماسية وتجسس",
    SvgScene: Svg25,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 26,
    title: "غاليري الخداع",
    crimeScene: "في غاليري فن معاصر بيعت ثلاث لوحات أصيلة ووُجد بعدها أنها مقلّدة والأصل مهرَّب خارج البلاد. أربعة متخصصين قيّموا الأعمال وأحدهم أصدر شهادة التوثيق ثم اختفى.",
    citizensWord: "لوحة",
    mafiusoWord: "رسمة",
    category: "فن وتزوير",
    SvgScene: Svg26,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 27,
    title: "خزان المياه",
    crimeScene: "في خزان مياه ضخم يغذّي منطقة بأكملها أُضيفت مادة كيميائية مجهولة أثّرت على محطة الإمداد. أربعة مهندسين يشرفون على مراقبة الخزان وسجل الدخول للمنظومة أُحرق عمداً.",
    citizensWord: "خزان",
    mafiusoWord: "مستودع",
    category: "تخريب بنية تحتية",
    SvgScene: Svg27,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 28,
    title: "معمل الباحث",
    crimeScene: "في بريد إلكتروني مشفّر وجده الباحث قبل وفاته كان يحتوي رمزاً غريباً مخفياً داخل نص عادي. ثلاثة زملاء ومساعد واحد يملكون كلمة مرور نظامه وكانوا في المختبر ليلة الحادثة.",
    citizensWord: "إشارة",
    mafiusoWord: "رمز",
    category: "ألغاز رقمية",
    SvgScene: Svg28,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 29,
    title: "غرفة الترميم",
    crimeScene: "في أثناء ترميم لوحة تاريخية نفيسة اكتشف الخبير أن القطعة الأهم استُبدلت بأخرى مزوّرة بدقة متناهية دون علمه. أربعة مرمّمين عملوا على اللوحة وكل منهم أنجز مرحلة مختلفة.",
    citizensWord: "ترميم",
    mafiusoWord: "صيانة",
    category: "تراث وخداع",
    SvgScene: Svg29,
    isUnlocked: true,
    players: 4,
  },
  {
    id: 30,
    title: "البيت الأحمر",
    crimeScene: "في مجمع سكني فاخر وُجد أحد السكان ميتاً في مصعده المخصوص بعد أن تعطّل لثلاث دقائق وأُعيد تشغيله. أربعة من السكان وصلوا في الفترة نفسها وسجلاتهم تشير إلى نفس الطابق.",
    citizensWord: "مصعد",
    mafiusoWord: "درج",
    category: "جرائم مغلقة",
    SvgScene: Svg30,
    isUnlocked: true,
    players: 4,
  },

  /* ── 5-Player Cases (31–60) ── */
  {
    id: 31,
    title: "أوراق النسيان",
    crimeScene: "في أرشيف حكومي ضخم وُجد أن ملفات عشر قضايا مغلقة قد حُذف منها اسم واحد بعينه من جميعها في توقيت متزامن. خمسة موظفين فقط يملكون صلاحية تعديل هذه الملفات وكل التعديلات جرت في يوم واحد.",
    citizensWord: "سجل",
    mafiusoWord: "ملف",
    category: "أرشيف وتزوير",
    SvgScene: Svg31,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 32,
    title: "العقل المدبّر",
    crimeScene: "في اجتماع مجلس إدارة سري انتُزعت صلاحيات رئيس الشركة في غيابه المفاجئ برسالة توكيل رسمية مزوّرة. خمسة أعضاء صوّتوا على القرار وواحد منهم أرسل الوثيقة المزوّرة من بريد إلكتروني مجهول.",
    citizensWord: "توكيل",
    mafiusoWord: "تفويض",
    category: "أعمال ومؤامرة",
    SvgScene: Svg32,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 33,
    title: "الليلة الحمراء",
    crimeScene: "في نادٍ ليلي خاص استُبدلت بطاقات دخول عشرة أشخاص ببطاقات مزوّرة دون علمهم وأُتيح لشخص آخر الدخول باسمهم وارتكب جريمة. خمسة مضيفين يعملون في بوابة الدخول وأحدهم سهّل العملية.",
    citizensWord: "بطاقة",
    mafiusoWord: "هوية",
    category: "جرائم ليلية",
    SvgScene: Svg33,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 34,
    title: "الجوهر المخفي",
    crimeScene: "في متحف علمي نادر سُرقت عينة جيولوجية فريدة لا مثيل لها في العالم من صندوق قاعة الأبحاث المغلقة. خمسة باحثين فقط يملكون مفاتيح القاعة وسجل الدخول يُظهر خمسة دخولات في ليلة السرقة.",
    citizensWord: "عينة",
    mafiusoWord: "نموذج",
    category: "علوم وسرقة",
    SvgScene: Svg34,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 35,
    title: "الشيفرة الأخيرة",
    crimeScene: "في غرفة عمليات أمنية وُجد أن مفتاح النظام الرئيسي قد بُدّل من الداخل مما أوقف منظومة دفاع بأكملها لساعات حرجة. خمسة مهندسين كانوا يعملون في الوردية الليلية تلك الليلة.",
    citizensWord: "مفتاح",
    mafiusoWord: "كود",
    category: "أمن وتخريب",
    SvgScene: Svg35,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 36,
    title: "الميناء العميق",
    crimeScene: "في منشأة بحرية عسكرية رُصدت حركة غواصة غير مسجّلة على شاشات الرادار لدقائق قبل أن تختفي فجأة. خمسة من طاقم المراقبة البحرية كانوا في الوردية ولم يُبلّغ أحد منهم في الوقت المناسب.",
    citizensWord: "غواصة",
    mafiusoWord: "زورق",
    category: "عسكري وخيانة",
    SvgScene: Svg36,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 37,
    title: "الثعبان في القصر",
    crimeScene: "في مقر رئاسي رفيع رُصد اختراق خفي لشبكة الاتصالات الداخلية وأُرسلت رسائل بهوية مسؤولين مزوّرة. خمسة من فريق الاتصالات والتقنية يملكون وصول المستوى الأعلى إلى بنية الشبكة.",
    citizensWord: "اتصال",
    mafiusoWord: "تواصل",
    category: "قصر وتجسس",
    SvgScene: Svg37,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 38,
    title: "ملكية الظلام",
    crimeScene: "في صفقة عقارية مليارية وُجد أن التوقيع على العقد مزوّر والمشتري الحقيقي مجهول الهوية كلياً. خمسة سماسرة كانوا حاضرين في جلسة التوقيع ولكل منهم عمولة ضخمة معلّقة على إتمام الصفقة.",
    citizensWord: "عقار",
    mafiusoWord: "أرض",
    category: "عقارات وتزوير",
    SvgScene: Svg38,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 39,
    title: "النفق الرمادي",
    crimeScene: "في مصنع صناعي ضخم اكتُشف نفق سري تحت الأرض يصل إلى مستودع حكومي مجاور. الخمسة المشرفون على تجديد البنية التحتية خلال الأشهر الثلاثة الأخيرة هم المشتبه بهم الوحيدون.",
    citizensWord: "نفق",
    mafiusoWord: "ممر",
    category: "تهريب وبنية",
    SvgScene: Svg39,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 40,
    title: "الطائرة المجهولة",
    crimeScene: "في مطار خاص أُقلعت طائرة دون تسجيل رسمي وحملت شحنة مجهولة ثم أُفرغت قبل الفجر دون أثر. خمسة من موظفي العمليات الأرضية كانوا في الخدمة وأحدهم فتح بوابة الشحن الخاصة.",
    citizensWord: "طائرة",
    mafiusoWord: "مروحية",
    category: "تهريب جوي",
    SvgScene: Svg40,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 41,
    title: "أصابع الجليد",
    crimeScene: "في مختبر طبي سري أُخرجت عينات دم نادرة مستخدمة في بحث سري دون أي توثيق رسمي. خمسة علماء يملكون وصول المستوى الأعلى إلى ثلاجات التخزين الطبية والبروتوكول يُلزم بالتوثيق.",
    citizensWord: "دم",
    mafiusoWord: "نسيج",
    category: "أبحاث طبية",
    SvgScene: Svg41,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 42,
    title: "الجسر المكسور",
    crimeScene: "في موقع بناء جسر ضخم عُثر على وثائق هندسية مزوّرة أفضت إلى استخدام مواد رديئة في البنية الأساسية. خمسة مهندسين وقّعوا على تقرير الجودة وأحدهم أجرى تعديلاً خفياً في الساعات الأخيرة.",
    citizensWord: "مواصفات",
    mafiusoWord: "معايير",
    category: "بناء وتلاعب",
    SvgScene: Svg42,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 43,
    title: "الجرّاح الأخير",
    crimeScene: "في غرفة عمليات خاصة أُجريت عملية سرية دون توثيق في السجلات الرسمية على مريض يُفترض أنه أُدخل لسبب آخر. خمسة من الطاقم الطبي حضروا تلك العملية ولا أحد منهم يتكلم.",
    citizensWord: "جراحة",
    mafiusoWord: "عملية",
    category: "طب وأسرار",
    SvgScene: Svg43,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 44,
    title: "صندوق بلا مفتاح",
    crimeScene: "في مؤسسة مصرفية رُصد فتح خزينة لا تُفتح إلا بموافقة خمسة في آنٍ واحد وقد فُتحت من طرف واحد فقط. الخمسة الذين يملكون أجزاء المفتاح كلهم موجودون وكلهم ينكرون المشاركة.",
    citizensWord: "أمانة",
    mafiusoWord: "وديعة",
    category: "بنوك وسرقة",
    SvgScene: Svg44,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 45,
    title: "الزهر المرّ",
    crimeScene: "في حديقة نباتات نادرة اختُلست بذرة نوع منقرض تقدّر بملايين وأُدخل صندوق مزيّف بدلاً منها. خمسة متخصصين فقط يعملون في الجزء المحمي من الحديقة وأحدهم غيّر سجل الجرد.",
    citizensWord: "بذرة",
    mafiusoWord: "نبتة",
    category: "نباتات وسرقة",
    SvgScene: Svg45,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 46,
    title: "اللعبة المزدوجة",
    crimeScene: "في بطولة دولية للشطرنج عُثر على جهاز ضئيل الحجم مخبّأ في زر ملابس أحد المتنافسين يستقبل إشارات تلمح للحركات. خمسة من المنظمين دخلوا غرفة الاستعداد وحدهم قبل الجولة الأخيرة.",
    citizensWord: "غش",
    mafiusoWord: "تزوير",
    category: "رياضة وغش",
    SvgScene: Svg46,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 47,
    title: "المعبد المحترق",
    crimeScene: "في معبد أثري نادر احترق جزء من الجدار الرئيسي ونُقلت من تحته قطعة أثرية مخفية منذ قرون. خمسة من حراس الليل وعلماء الآثار كانوا الوحيدين المصرح لهم بالتواجد تلك الليلة.",
    citizensWord: "أثر",
    mafiusoWord: "قطعة",
    category: "آثار وتهريب",
    SvgScene: Svg47,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 48,
    title: "الصوت الأسود",
    crimeScene: "في إذاعة حكومية سرية بُثّت إشارة مشفّرة خفية لمدة ثانيتين بين فقرتين تبدو للعامة كتشويش عشوائي. خمسة مهندسين يتحكمون في مزج الصوت والإرسال لا يعرف المدير من أرسل الإشارة.",
    citizensWord: "بث",
    mafiusoWord: "إرسال",
    category: "اتصالات وتجسس",
    SvgScene: Svg48,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 49,
    title: "القافلة الضائعة",
    crimeScene: "في مسار تجاري صحراوي اختفت قافلة شحن بضائع نادرة وأُعيد ظهورها بعد ثلاثة أيام فارغة تماماً. خمسة من المنسّقين والسائقين يعرفون المسار السري ولكل منهم قصة مختلفة تماماً.",
    citizensWord: "شحنة",
    mafiusoWord: "بضاعة",
    category: "تهريب صحراوي",
    SvgScene: Svg49,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 50,
    title: "الأفق الداكن",
    crimeScene: "في محطة تحكم بقمر صناعي تجاري استُلّت بيانات الأقمار المجاورة وأُرسلت لعنوان مجهول لثوانٍ معدودة فقط. خمسة من مشغّلي المحطة الأرضية يملكون صلاحية الإرسال العالي في ذلك التوقيت.",
    citizensWord: "قمر",
    mafiusoWord: "مدار",
    category: "فضاء وتجسس",
    SvgScene: Svg50,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 51,
    title: "النهاية المفتوحة",
    crimeScene: "في محطة نهر صناعية ضخمة فُتح صمام رئيسي عن بُعد دون أمر رسمي مما تسبّب في فيضان جزئي مقصود لمنطقة محددة. خمسة مشغّلين فقط يملكون رمز الفتح عن بُعد في ذلك الوقت.",
    citizensWord: "صمام",
    mafiusoWord: "أنبوب",
    category: "بنية وتخريب",
    SvgScene: Svg51,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 52,
    title: "أسماء بلا وجوه",
    crimeScene: "في سجل مدني رسمي وُجد أن خمسة وعشرين هوية مزيّفة صُدرت بأسماء أشخاص متوفين. موظف واحد من بين الخمسة العاملين في قسم الأرشيف الرقمي وافق على جميع هذه الطلبات في أسبوع.",
    citizensWord: "هوية",
    mafiusoWord: "جواز",
    category: "هوية وتزوير",
    SvgScene: Svg52,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 53,
    title: "الخاتم الأسود",
    crimeScene: "في حفل خطوبة رسمي لعائلتين متنافستين تبيّن بعد الحفل أن الخاتم المُقدَّم كان مسروقاً من متحف تاريخي شهير. خمسة من أفراد العائلة المنظمة كانوا مسؤولين عن تجهيز القاعة وتنظيم الحفل.",
    citizensWord: "خاتم",
    mafiusoWord: "حلية",
    category: "سرقة وخداع",
    SvgScene: Svg53,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 54,
    title: "الجليد الأبيض",
    crimeScene: "في قاعدة أبحاث قطبية سرية وُجد أن أجهزة قياس المناخ أُعيد ضبطها لتسجّل بيانات مزيّفة لأشهر متتالية. خمسة علماء يملكون وصول أجهزة القياس الرئيسية وأحدهم كان يحتفظ بالبيانات الحقيقية سراً.",
    citizensWord: "بيانات",
    mafiusoWord: "قياس",
    category: "أبحاث وتلاعب",
    SvgScene: Svg54,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 55,
    title: "الطريق الثالث",
    crimeScene: "في عملية أمنية سرية كُشف عن وجود مسار هروب ثالث لم يكن معروفاً في خطط العملية الأصلية. خمسة أعضاء من الفريق المخطّط للعملية يعلمون بوجوده وواحد منهم أوصل المعلومة للطرف الآخر.",
    citizensWord: "طريق",
    mafiusoWord: "مسار",
    category: "عمليات وخيانة",
    SvgScene: Svg55,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 56,
    title: "كلمة وعلامة",
    crimeScene: "في منظمة دولية سرية اكتُشف أن أحد الأعضاء يستخدم شفرة مخفية داخل تقاريره الرسمية لتمرير معلومات حساسة. خمسة من كتّاب التقارير يملكون صلاحية النشر المباشر دون مراجعة مسبقة.",
    citizensWord: "شفرة",
    mafiusoWord: "سيجنال",
    category: "تجسس رقمي",
    SvgScene: Svg56,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 57,
    title: "اللحظة الفارقة",
    crimeScene: "في محطة توليد طاقة نووية رُصد اشتعال غير مبرر في وحدة ثانوية استُخدم لإلهاء الطاقم لدقيقتين حرجتين. خمسة مهندسين كانوا في موقع التحكم المركزي وكل منهم يؤكد أنه لم يتحرك من مكانه.",
    citizensWord: "حادث",
    mafiusoWord: "طارئ",
    category: "نووي وتخريب",
    SvgScene: Svg57,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 58,
    title: "العصفور الأسود",
    crimeScene: "في شبكة استخباراتية دولية وُجد عميل مزدوج اخترق خمس خلايا سرية في وقت واحد تماماً. الخمسة الذين يعرفون الهياكل الكاملة لجميع هذه الخلايا هم وحدهم القادرون على هذا الاختراق الشامل.",
    citizensWord: "عميل",
    mafiusoWord: "جاسوس",
    category: "استخبارات وخيانة",
    SvgScene: Svg58,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 59,
    title: "المدينة الصامتة",
    crimeScene: "في ليلة انقطع فيها التيار الكهربائي عن حي بأكمله لمدة ثماني دقائق فُرّغت ثلاثة مستودعات ضخمة دون إثارة أي إنذار. خمسة موظفين في شركة الكهرباء يملكون صلاحية التحكم في ذلك التحويل.",
    citizensWord: "انقطاع",
    mafiusoWord: "تعطل",
    category: "سرقة منظمة",
    SvgScene: Svg59,
    isUnlocked: true,
    players: 5,
  },
  {
    id: 60,
    title: "نهاية اللعبة",
    crimeScene: "في منشأة تخزين بيانات عالمية شُغّل فيروس متطور في اللحظة الأخيرة قبل تحديث أمني شامل وأبطله من الداخل تماماً. الخمسة الذين يملكون توقيت التحديث الدقيق وصلاحية الدخول الأمني هم الوحيدون القادرون.",
    citizensWord: "فيروس",
    mafiusoWord: "برمجية",
    category: "أمن رقمي عالمي",
    SvgScene: Svg60,
    isUnlocked: true,
    players: 5,
  },
];
