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
}

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
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="5" y="38" width="110" height="77" rx="4" fill="#350A22"/>
      <rect x="10" y="33" width="100" height="10" rx="2" fill="#5B0E2E"/>
      <rect x="15" y="45" width="30" height="25" rx="2" fill="#420A20" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="55" y="45" width="50" height="50" rx="2" fill="#420A20"/>
      <rect x="58" y="48" width="44" height="35" fill="#1C0418"/>
      <circle cx="80" cy="65" r="12" fill="#4A0A24" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M73 65 L80 58 L87 65 L80 72 Z" fill="#D4AF37" opacity="0.7"/>
      <circle cx="80" cy="65" r="3" fill="#D4AF37"/>
      <rect x="20" y="53" width="8" height="3" fill="#D4AF37" opacity="0.5"/>
      <rect x="20" y="59" width="8" height="3" fill="#D4AF37" opacity="0.5"/>
      <rect x="20" y="65" width="8" height="3" fill="#D4AF37" opacity="0.5"/>
      <path d="M10 90 Q60 82 110 90" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.3"/>
    </svg>
  );
}
function Svg03(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0E0812"/>
      <rect x="0" y="70" width="120" height="50" fill="#0D1A0D"/>
      <path d="M0 70 Q30 55 60 65 Q90 75 120 60 L120 70 L0 70Z" fill="#1A3020"/>
      <rect x="38" y="45" width="44" height="55" rx="3" fill="#1A3020"/>
      <rect x="30" y="40" width="60" height="10" rx="2" fill="#1F3D28"/>
      <rect x="44" y="52" width="13" height="18" rx="1" fill="#0D1A0D"/>
      <rect x="63" y="52" width="13" height="18" rx="1" fill="#0D1A0D"/>
      <rect x="50" y="78" width="20" height="22" fill="#0D1A0D"/>
      <circle cx="60" cy="28" r="12" fill="#1F3D28"/>
      <path d="M53 25 Q60 15 67 25 Q63 33 60 30 Q57 33 53 25Z" fill="#0D5C2A" opacity="0.8"/>
      <circle cx="60" cy="24" r="4" fill="#D4AF37" opacity="0.3"/>
      <circle cx="90" cy="38" r="3" fill="#D4AF37" opacity="0.25"/>
      <circle cx="28" cy="48" r="2" fill="#D4AF37" opacity="0.2"/>
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
      <path d="M24 73 Q35 55 46 73" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M49 73 Q60 52 71 73" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M74 73 Q85 57 96 73" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <circle cx="60" cy="28" r="17" fill="#4A1024" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M50 28 Q55 20 60 24 Q65 20 70 28 Q65 38 60 35 Q55 38 50 28Z" fill="#8B4513" opacity="0.7"/>
      <circle cx="60" cy="26" r="5" fill="#D4AF37" opacity="0.4"/>
    </svg>
  );
}
function Svg05(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#0A1520"/>
      <rect x="0" y="78" width="120" height="42" fill="#0A1A2A"/>
      <path d="M0 78 Q30 60 60 73 Q90 86 120 68 L120 78 L0 78Z" fill="#0D2035"/>
      <path d="M10 78 Q40 63 70 76 Q100 89 110 70" stroke="#4A9ECC" strokeWidth="1" fill="none" opacity="0.5"/>
      <ellipse cx="60" cy="50" rx="26" ry="32" fill="#1A3A5C" opacity="0.7"/>
      <path d="M45 68 Q60 80 75 68" stroke="#4A9ECC" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <circle cx="52" cy="44" r="4" fill="#4A9ECC" opacity="0.35"/>
      <circle cx="68" cy="40" r="3" fill="#4A9ECC" opacity="0.25"/>
      <line x1="60" y1="18" x2="60" y2="23" stroke="#D4AF37" strokeWidth="1.2"/>
      <line x1="60" y1="23" x2="55" y2="32" stroke="#D4AF37" strokeWidth="0.8"/>
      <line x1="60" y1="23" x2="65" y2="32" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="60" cy="15" r="3" fill="#D4AF37" opacity="0.7"/>
    </svg>
  );
}
function Svg06(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="50" width="100" height="65" rx="4" fill="#4A1024"/>
      <rect x="15" y="45" width="90" height="10" rx="2" fill="#5C2A10"/>
      <rect x="20" y="55" width="80" height="8" rx="1" fill="#2A1005"/>
      <circle cx="30" cy="75" r="10" fill="#2A1005" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="60" cy="75" r="10" fill="#2A1005" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="90" cy="75" r="10" fill="#2A1005" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M22 75 Q30 68 38 75" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M52 75 Q60 68 68 75" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M82 75 Q90 68 98 75" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <circle cx="40" cy="27" r="13" fill="#2A1005" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M35 30 Q40 23 45 30" stroke="#D4AF37" strokeWidth="1" fill="none"/>
      <circle cx="40" cy="26" r="3" fill="#D4AF37" opacity="0.5"/>
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
      <circle cx="25" cy="50" r="3" fill="#D4AF37" opacity="0.6"/>
      <circle cx="60" cy="50" r="3" fill="#D4AF37" opacity="0.6"/>
      <circle cx="95" cy="50" r="3" fill="#D4AF37" opacity="0.6"/>
      <path d="M25 75 L55 75" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <path d="M25 82 L55 82" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="82" cy="82" r="12" fill="#120820" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M76 82 Q82 76 88 82 Q82 88 76 82Z" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg08(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1A1A1A"/>
      <rect x="5" y="55" width="110" height="60" rx="3" fill="#1A1A2A"/>
      <rect x="10" y="50" width="100" height="10" rx="2" fill="#2A2A3D"/>
      <rect x="20" y="60" width="80" height="45" fill="#12121A"/>
      <circle cx="40" cy="82" r="12" fill="#2A0A18" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="40" cy="82" r="7" fill="#12120A"/>
      <circle cx="40" cy="82" r="3" fill="#D4AF37" opacity="0.7"/>
      <circle cx="80" cy="82" r="12" fill="#2A0A18" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="80" cy="82" r="7" fill="#12120A"/>
      <circle cx="80" cy="82" r="3" fill="#D4AF37" opacity="0.7"/>
      <rect x="52" y="75" width="16" height="14" rx="2" fill="#3D3D00" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="20" y="25" width="80" height="30" rx="20" fill="#2A0A18" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="35" y="30" width="50" height="20" rx="15" fill="#1A0F00"/>
      <circle cx="50" cy="40" r="5" fill="#D4AF37" opacity="0.4"/>
      <circle cx="70" cy="40" r="5" fill="#D4AF37" opacity="0.4"/>
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
      <rect x="18" y="55" width="8" height="10" fill="#D4AF37" opacity="0.12"/>
      <rect x="29" y="55" width="8" height="10" fill="#D4AF37" opacity="0.12"/>
      <rect x="40" y="55" width="8" height="10" fill="#D4AF37" opacity="0.12"/>
      <rect x="18" y="70" width="8" height="10" fill="#D4AF37" opacity="0.12"/>
      <rect x="29" y="70" width="8" height="10" fill="#D4AF37" opacity="0.12"/>
      <rect x="40" y="70" width="8" height="10" fill="#D4AF37" opacity="0.12"/>
      <path d="M60 20 L60 110" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 2"/>
      <circle cx="60" cy="15" r="8" fill="#0A1A0A" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M55 15 Q60 10 65 15 Q60 20 55 15Z" fill="#D4AF37" opacity="0.5"/>
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
      <path d="M100 60 L68 63 L63 60 L68 57 Z" fill="#D4AF37" opacity="0.3"/>
      <circle cx="60" cy="60" r="5" fill="#D4AF37"/>
      <circle cx="28" cy="28" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="92" cy="24" r="1.5" fill="#D4AF37" opacity="0.5"/>
      <circle cx="88" cy="92" r="2" fill="#D4AF37" opacity="0.3"/>
      <circle cx="18" cy="82" r="1" fill="#D4AF37" opacity="0.6"/>
    </svg>
  );
}
function Svg11(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="35" width="100" height="80" rx="3" fill="#1C0A18"/>
      <rect x="15" y="30" width="90" height="10" rx="2" fill="#2A2008"/>
      <rect x="20" y="45" width="80" height="65" fill="#150F00"/>
      <rect x="20" y="45" width="80" height="4" fill="#D4AF37" opacity="0.2"/>
      <rect x="30" y="55" width="14" height="20" rx="1" fill="#2A0A18"/>
      <rect x="53" y="55" width="14" height="20" rx="1" fill="#2A0A18"/>
      <rect x="76" y="55" width="14" height="20" rx="1" fill="#2A0A18"/>
      <rect x="32" y="57" width="10" height="16" fill="#1A0F00"/>
      <rect x="55" y="57" width="10" height="16" fill="#1A0F00"/>
      <rect x="78" y="57" width="10" height="16" fill="#1A0F00"/>
      <path d="M20 80 L100 80" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M20 90 L100 90" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="60" cy="20" r="8" fill="#2A0A18" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M56 20 L60 15 L64 20 L60 25 Z" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg12(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="75" width="120" height="45" fill="#4A0A24"/>
      <ellipse cx="60" cy="75" rx="55" ry="14" fill="#5B0E2E"/>
      <path d="M10 75 Q30 58 50 66 Q70 74 90 60 Q105 50 110 65 L110 75 L10 75Z" fill="#350A22"/>
      <rect x="35" y="30" width="50" height="45" rx="3" fill="#4A0A24"/>
      <rect x="30" y="25" width="60" height="10" rx="2" fill="#5B0E2E"/>
      <rect x="40" y="35" width="40" height="30" fill="#350A22"/>
      <ellipse cx="60" cy="20" rx="18" ry="7" fill="#5B0E2E" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M44 65 L60 75 L76 65" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <circle cx="40" cy="50" r="4" fill="#D4AF37" opacity="0.35"/>
      <circle cx="80" cy="50" r="4" fill="#D4AF37" opacity="0.35"/>
    </svg>
  );
}
function Svg13(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#071420"/>
      <path d="M0 62 Q20 42 40 56 Q60 70 80 46 Q100 22 120 50 L120 120 L0 120Z" fill="#0D1A2A"/>
      <path d="M0 52 Q25 32 50 49 Q75 65 100 41 Q110 34 120 43" stroke="#4A8ECC" strokeWidth="1" fill="none" opacity="0.4"/>
      <rect x="30" y="10" width="60" height="68" rx="4" fill="#1A2A3A" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M30 10 L60 2 L90 10" fill="#253545"/>
      <rect x="35" y="20" width="50" height="35" fill="#0D1520"/>
      <rect x="40" y="24" width="20" height="14" fill="#1A2A3A"/>
      <rect x="65" y="24" width="14" height="14" fill="#1A2A3A"/>
      <rect x="65" y="42" width="14" height="10" fill="#1A2A3A"/>
      <rect x="48" y="55" width="24" height="18" fill="#0D1520"/>
      <circle cx="60" cy="40" r="5" fill="#D4AF37" opacity="0.25"/>
    </svg>
  );
}
function Svg14(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="65" width="120" height="55" fill="#2A0A18"/>
      <rect x="0" y="60" width="120" height="8" fill="#3D1028"/>
      <path d="M0 60 L120 60 L120 68 Q100 72 80 68 Q60 64 40 68 Q20 72 0 68Z" fill="#3D1028"/>
      <rect x="20" y="10" width="80" height="50" rx="3" fill="#3D1028"/>
      <rect x="15" y="5" width="90" height="10" rx="2" fill="#4A1032"/>
      <rect x="25" y="15" width="30" height="20" rx="1" fill="#2A0A18"/>
      <rect x="65" y="15" width="30" height="20" rx="1" fill="#2A0A18"/>
      <rect x="45" y="35" width="30" height="25" fill="#2A0A18"/>
      <path d="M30 60 L30 80" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <path d="M90 60 L90 80" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <circle cx="60" cy="0" r="5" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg15(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="5" y="80" width="110" height="35" rx="3" fill="#1A1A1A"/>
      <rect x="0" y="75" width="120" height="8" fill="#2A2A2A"/>
      <rect x="15" y="25" width="90" height="55" rx="3" fill="#2D2D2D"/>
      <rect x="10" y="20" width="100" height="10" rx="2" fill="#3A3A3A"/>
      <rect x="20" y="30" width="80" height="45" fill="#1A1A1A"/>
      <circle cx="35" cy="52" r="12" fill="#2A2A2A" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="35" cy="52" r="7" fill="#1A1A1A"/>
      <circle cx="35" cy="52" r="3" fill="#D4AF37" opacity="0.6"/>
      <circle cx="85" cy="52" r="12" fill="#2A2A2A" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="85" cy="52" r="7" fill="#1A1A1A"/>
      <circle cx="85" cy="52" r="3" fill="#D4AF37" opacity="0.6"/>
      <path d="M47 52 L73 52" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <circle cx="60" cy="52" r="4" fill="#D4AF37" opacity="0.25"/>
    </svg>
  );
}
function Svg16(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="72" width="120" height="48" fill="#0A2A0A"/>
      <ellipse cx="60" cy="72" rx="55" ry="10" fill="#1A3A1A" opacity="0.8"/>
      <circle cx="30" cy="67" r="15" fill="#0A2A0A" opacity="0.7"/>
      <circle cx="60" cy="62" r="20" fill="#0A2A0A" opacity="0.7"/>
      <circle cx="90" cy="65" r="15" fill="#0A2A0A" opacity="0.7"/>
      <path d="M15 67 Q30 52 45 63" stroke="#1A5A1A" strokeWidth="2" fill="none"/>
      <path d="M45 63 Q60 47 75 62" stroke="#1A5A1A" strokeWidth="2" fill="none"/>
      <path d="M75 62 Q90 50 105 65" stroke="#1A5A1A" strokeWidth="2" fill="none"/>
      <ellipse cx="60" cy="35" rx="25" ry="20" fill="#0A2A0A" opacity="0.6" stroke="#1A5A1A" strokeWidth="0.5"/>
      <path d="M45 40 Q55 25 65 35 Q60 45 45 40Z" fill="#D4AF37" opacity="0.25"/>
      <circle cx="60" cy="35" r="5" fill="#D4AF37" opacity="0.35"/>
    </svg>
  );
}
function Svg17(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="30" width="100" height="85" rx="3" fill="#0A0A20"/>
      <rect x="15" y="25" width="90" height="10" rx="2" fill="#151530"/>
      <rect x="20" y="40" width="35" height="65" rx="2" fill="#0D0D1A" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="40" width="35" height="65" rx="2" fill="#0D0D1A" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="43" y="40" width="34" height="65" fill="#0A0A18"/>
      <rect x="43" y="75" width="34" height="30" fill="#0D0D22"/>
      <rect x="48" y="80" width="10" height="25" fill="#080810"/>
      <rect x="62" y="80" width="10" height="25" fill="#080810"/>
      <circle cx="55" cy="60" r="8" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="65" cy="55" r="8" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M50 60 Q60 50 70 58" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.5"/>
    </svg>
  );
}
function Svg18(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="62" width="120" height="58" fill="#0A1A2A"/>
      <path d="M0 62 Q30 47 60 57 Q90 67 120 52 L120 62 L0 62Z" fill="#0D2035"/>
      <rect x="30" y="20" width="60" height="42" rx="3" fill="#3D1028"/>
      <rect x="25" y="15" width="70" height="10" rx="2" fill="#4A1032"/>
      <path d="M30 62 L15 80" stroke="#4A3200" strokeWidth="3"/>
      <path d="M90 62 L105 80" stroke="#4A3200" strokeWidth="3"/>
      <ellipse cx="60" cy="62" rx="30" ry="5" fill="#3D1028"/>
      <rect x="40" y="28" width="40" height="26" fill="#2A0A18"/>
      <circle cx="50" cy="42" r="5" fill="#4A1032" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="70" cy="42" r="5" fill="#4A1032" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M10 80 Q60 72 110 80" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.35"/>
    </svg>
  );
}
function Svg19(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="5" y="50" width="110" height="65" rx="3" fill="#1A0520"/>
      <rect x="10" y="45" width="100" height="10" rx="2" fill="#2A0A30"/>
      <rect x="20" y="65" width="80" height="45" fill="#120318"/>
      <rect x="25" y="70" width="30" height="35" fill="#1A0520" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="70" width="30" height="35" fill="#1A0520" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M30 55 Q60 35 90 55" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <circle cx="60" cy="30" r="18" fill="#1A0520" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M48 30 L60 20 L72 30 L65 42 L55 42 Z" fill="#2A0A30" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="30" r="6" fill="#D4AF37" opacity="0.35"/>
    </svg>
  );
}
function Svg20(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="20" y="45" width="80" height="65" rx="4" fill="#420A20"/>
      <rect x="15" y="40" width="90" height="10" rx="2" fill="#5B0E2E"/>
      <ellipse cx="60" cy="45" rx="35" ry="8" fill="#350A22"/>
      <path d="M30 75 Q60 60 90 75" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5"/>
      <circle cx="40" cy="65" r="8" fill="#350A22" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="60" r="8" fill="#350A22" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="80" cy="65" r="8" fill="#350A22" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M40 73 L45 90 L55 90 L60 75 L65 90 L75 90 L80 73" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <ellipse cx="60" cy="28" rx="20" ry="12" fill="#5B0E2E" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="60" cy="25" r="6" fill="#D4AF37" opacity="0.35"/>
    </svg>
  );
}
function Svg21(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="80" width="120" height="40" fill="#3D1028"/>
      <path d="M0 80 Q20 65 40 75 Q60 85 80 70 Q100 55 120 70 L120 80 L0 80Z" fill="#2A0A18"/>
      <rect x="25" y="20" width="70" height="60" rx="3" fill="#2A0A18"/>
      <rect x="20" y="15" width="80" height="10" rx="2" fill="#3D1028"/>
      <rect x="30" y="28" width="25" height="35" rx="2" fill="#1A0F00" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="28" width="25" height="35" rx="2" fill="#1A0F00" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="32" y="30" width="21" height="20" fill="#120A00" opacity="0.8"/>
      <rect x="67" y="30" width="21" height="20" fill="#120A00" opacity="0.8"/>
      <rect x="44" y="55" width="32" height="25" fill="#1A0F00"/>
      <circle cx="60" cy="10" r="6" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg22(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#080812"/>
      <rect x="0" y="55" width="120" height="65" fill="#0D0D20"/>
      <rect x="5" y="50" width="110" height="10" rx="2" fill="#151528"/>
      <rect x="10" y="60" width="100" height="50" fill="#080812"/>
      <rect x="15" y="65" width="40" height="40" rx="2" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <rect x="65" y="65" width="40" height="40" rx="2" fill="#0D0D22" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="35" cy="85" r="12" fill="#080812" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M28 85 L35 78 L42 85 L35 92 Z" fill="#D4AF37" opacity="0.4"/>
      <circle cx="85" cy="85" r="10" fill="#080812" stroke="#D4AF37" strokeWidth="0.8"/>
      <rect x="79" y="79" width="12" height="12" rx="1" fill="#D4AF37" opacity="0.2"/>
      <circle cx="60" cy="25" r="20" fill="#0D0D20" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M46 25 L60 12 L74 25 L60 38 Z" fill="#151528" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}
function Svg23(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="60" width="100" height="55" rx="3" fill="#1A1A2A"/>
      <rect x="15" y="55" width="90" height="10" rx="2" fill="#252540"/>
      <rect x="20" y="65" width="80" height="45" fill="#12121A"/>
      <rect x="25" y="70" width="25" height="35" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="58" y="70" width="35" height="35" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M27 80 L48 80 M27 87 L48 87 M27 94 L48 94" stroke="#D4AF37" strokeWidth="0.4" opacity="0.4"/>
      <circle cx="75" cy="87" r="12" fill="#12121A" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M68 87 L75 80 L82 87 L75 94 Z" fill="#D4AF37" opacity="0.4"/>
      <rect x="25" y="20" width="70" height="35" rx="3" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="30" y="25" width="60" height="25" fill="#12121A"/>
      <path d="M35 37 L55 30 L75 37 L85 48 L35 48Z" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}
function Svg24(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1A0A00"/>
      <rect x="0" y="70" width="120" height="50" fill="#0A1505"/>
      <path d="M0 70 Q15 55 30 65 Q45 75 60 60 Q75 45 90 60 Q105 75 120 65 L120 70 L0 70Z" fill="#0F2008"/>
      <ellipse cx="20" cy="68" rx="12" ry="5" fill="#1A3010"/>
      <ellipse cx="50" cy="60" rx="15" ry="6" fill="#1A3010"/>
      <ellipse cx="80" cy="65" rx="12" ry="5" fill="#1A3010"/>
      <ellipse cx="100" cy="68" rx="10" ry="4" fill="#1A3010"/>
      <circle cx="25" cy="62" r="4" fill="#4A7A20" opacity="0.7"/>
      <circle cx="55" cy="54" r="5" fill="#4A7A20" opacity="0.7"/>
      <circle cx="80" cy="59" r="4" fill="#4A7A20" opacity="0.7"/>
      <circle cx="30" cy="40" r="20" fill="#1A3010" stroke="#4A7A20" strokeWidth="0.5"/>
      <circle cx="30" cy="38" r="6" fill="#D4AF37" opacity="0.25"/>
      <circle cx="80" cy="30" r="15" fill="#1A3010" stroke="#4A7A20" strokeWidth="0.5"/>
      <circle cx="80" cy="28" r="5" fill="#D4AF37" opacity="0.25"/>
    </svg>
  );
}
function Svg25(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="5" y="35" width="110" height="80" rx="3" fill="#2D2D2D"/>
      <rect x="10" y="30" width="100" height="10" rx="2" fill="#3A3A3A"/>
      <rect x="15" y="42" width="90" height="65" fill="#1A1A1A"/>
      <rect x="20" y="48" width="80" height="10" fill="#2D2D2D"/>
      <rect x="20" y="63" width="80" height="10" fill="#2D2D2D"/>
      <rect x="20" y="78" width="80" height="10" fill="#2D2D2D"/>
      <rect x="20" y="93" width="80" height="10" fill="#2D2D2D"/>
      <circle cx="25" cy="53" r="2" fill="#D4AF37" opacity="0.6"/>
      <circle cx="25" cy="68" r="2" fill="#D4AF37" opacity="0.6"/>
      <circle cx="25" cy="83" r="2" fill="#EF4444" opacity="0.8"/>
      <circle cx="25" cy="98" r="2" fill="#D4AF37" opacity="0.6"/>
      <path d="M30 15 L90 15 L90 30 L30 30 Z" fill="#5B0E2E" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M30 15 L60 8 L90 15" fill="#420A20"/>
      <circle cx="60" cy="12" r="3" fill="#D4AF37" opacity="0.7"/>
    </svg>
  );
}
function Svg26(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="0" y="75" width="120" height="45" fill="#0A2A0A"/>
      <ellipse cx="60" cy="75" rx="58" ry="12" fill="#1A3A1A"/>
      <circle cx="20" cy="70" r="15" fill="#0A3010"/>
      <circle cx="50" cy="65" r="18" fill="#0A3010"/>
      <circle cx="80" cy="68" r="15" fill="#0A3010"/>
      <circle cx="100" cy="72" r="12" fill="#0A3010"/>
      <circle cx="20" cy="68" r="5" fill="#CC1A1A" opacity="0.7"/>
      <circle cx="50" cy="60" r="6" fill="#CC1A1A" opacity="0.7"/>
      <circle cx="80" cy="64" r="5" fill="#D4AF37" opacity="0.5"/>
      <rect x="35" y="20" width="50" height="45" rx="3" fill="#0A3010"/>
      <rect x="30" y="15" width="60" height="10" rx="2" fill="#1A4020"/>
      <path d="M40 40 Q60 25 80 40 Q80 55 60 60 Q40 55 40 40Z" fill="#0A2010" opacity="0.6"/>
      <circle cx="60" cy="40" r="8" fill="#D4AF37" opacity="0.25"/>
    </svg>
  );
}
function Svg27(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1A0A00"/>
      <rect x="5" y="40" width="110" height="75" rx="4" fill="#2A0A18"/>
      <rect x="10" y="35" width="100" height="10" rx="2" fill="#3D1028"/>
      <rect x="15" y="45" width="90" height="65" fill="#1A0F00"/>
      <rect x="25" y="55" width="30" height="40" rx="1" fill="#1A0F00" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="55" width="30" height="40" rx="1" fill="#1A0F00" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="40" cy="75" r="10" fill="#D4AF37" opacity="0.7"/>
      <circle cx="40" cy="75" r="6" fill="#C0930D"/>
      <circle cx="40" cy="75" r="3" fill="#D4AF37"/>
      <circle cx="80" cy="75" r="10" fill="#D4AF37" opacity="0.7"/>
      <circle cx="80" cy="75" r="6" fill="#C0930D"/>
      <circle cx="80" cy="75" r="3" fill="#D4AF37"/>
      <path d="M50 75 L70 75" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
      <rect x="30" y="10" width="60" height="25" rx="3" fill="#2A0A18" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M42 22 L60 15 L78 22 L60 29 Z" fill="#D4AF37" opacity="0.4"/>
    </svg>
  );
}
function Svg28(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="10" y="45" width="100" height="70" rx="3" fill="#1A1A2A"/>
      <rect x="15" y="40" width="90" height="10" rx="2" fill="#252540"/>
      <rect x="20" y="55" width="80" height="55" fill="#12121A"/>
      <rect x="25" y="60" width="70" height="45" fill="#0D0D18"/>
      <circle cx="60" cy="82" r="18" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="82" r="12" fill="#0D0D18" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="82" r="7" fill="#1A1A2A"/>
      <circle cx="60" cy="82" r="3" fill="#D4AF37" opacity="0.7"/>
      <path d="M60 64 L60 68" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M78 82 L74 82" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M60 100 L60 96" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M42 82 L46 82" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M60 82 L68 76" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
      <path d="M60 82 L66 82" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
      <rect x="25" y="10" width="70" height="30" rx="3" fill="#1A1A2A" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M35 25 L85 25" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}
function Svg29(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1A0A00"/>
      <rect x="0" y="62" width="120" height="58" fill="#2A1000"/>
      <path d="M0 62 Q20 47 40 57 Q60 67 80 52 Q100 37 120 57 L120 62 L0 62Z" fill="#3D1800"/>
      <ellipse cx="30" cy="60" rx="18" ry="6" fill="#3D1800"/>
      <ellipse cx="60" cy="54" rx="22" ry="7" fill="#3D1800"/>
      <ellipse cx="90" cy="58" rx="18" ry="6" fill="#3D1800"/>
      <circle cx="30" cy="54" r="5" fill="#8B4513" opacity="0.8"/>
      <circle cx="60" cy="47" r="6" fill="#8B4513" opacity="0.8"/>
      <circle cx="90" cy="52" r="5" fill="#8B4513" opacity="0.8"/>
      <path d="M20 54 Q30 44 40 54" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
      <path d="M50 47 Q60 37 70 47" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
      <rect x="30" y="15" width="60" height="40" rx="3" fill="#2A1000" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="35" r="12" fill="#3D1800" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="60" cy="35" r="6" fill="#8B4513" opacity="0.6"/>
      <circle cx="60" cy="35" r="3" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}
function Svg30(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <rect width="120" height="120" rx="10" fill="#1C0418"/>
      <rect x="5" y="55" width="110" height="60" rx="3" fill="#0A0A25"/>
      <rect x="10" y="50" width="100" height="10" rx="2" fill="#15153A"/>
      <rect x="15" y="60" width="90" height="50" fill="#080818"/>
      <rect x="20" y="65" width="80" height="40" fill="#050510"/>
      <rect x="25" y="70" width="30" height="30" fill="#0A0A20" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="70" width="30" height="30" fill="#0A0A20" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="80" cy="85" r="10" fill="#050510" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M74 85 L80 79 L86 85 L80 91 Z" fill="#D4AF37" opacity="0.4"/>
      <rect x="30" y="10" width="60" height="40" rx="3" fill="#0A0A20" stroke="#D4AF37" strokeWidth="0.8"/>
      <path d="M35 30 L85 30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <path d="M35 22 L85 22" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <path d="M35 38 L65 38" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="90" cy="28" r="5" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}

export const CASES: Case[] = [
  {
    id: 1,
    title: "جريمة في المتحف الملكي",
    crimeScene: "في ليلة عاصفة اختفت تحفة نادرة من قاعة المعروضات الرئيسية. كاميرات المراقبة أُبطل مفعولها من الداخل. القيّمون الخمسة هم المشتبه بهم الوحيدون.",
    citizensWord: "لوحة",
    mafiusoWord: "تمثال",
    category: "فن وسرقة",
    SvgScene: Svg01,
    isUnlocked: true,
  },
  {
    id: 2,
    title: "الليلة الأخيرة في الأوبرا",
    crimeScene: "قبيل رفع الستار بدقائق وُجد المدير الفني مغشياً عليه خلف الكواليس. المشتبه الخمسة كانوا الوحيدين الذين دخلوا المبنى قبل الحادثة بساعة.",
    citizensWord: "ستارة",
    mafiusoWord: "إضاءة",
    category: "مسرح وغموض",
    SvgScene: Svg02,
    isUnlocked: true,
  },
  {
    id: 3,
    title: "اختفاء في الغابة الكثيفة",
    crimeScene: "أثناء رحلة استكشافية تبخّر قائد المجموعة فجأة. لا أثر، لا صراخ، فقط ابتسامة غريبة رآها الشهود قبل الاختفاء.",
    citizensWord: "خيمة",
    mafiusoWord: "حقيبة",
    category: "طبيعة وغموض",
    SvgScene: Svg03,
    isUnlocked: true,
  },
  {
    id: 4,
    title: "سم في حفلة القهوة",
    crimeScene: "بعد جلسة قهوة رسمية أُصيب أحد المحققين بتسمم غريب. الفنجان لا يزال على المنضدة والرائحة تنم عن شيء أُضيف سراً.",
    citizensWord: "قهوة",
    mafiusoWord: "شاي",
    category: "تسمم وخيانة",
    SvgScene: Svg04,
    isUnlocked: false,
  },
  {
    id: 5,
    title: "غريق في الليل",
    crimeScene: "في منتجع ساحلي فاخر عُثر على أحد الضيوف يطفو على السطح فجراً. لا أحد سمع شيئاً، لكن خمسة أشخاص كانوا مستيقظين في تلك الساعة.",
    citizensWord: "سباحة",
    mafiusoWord: "غوص",
    category: "جريمة ساحلية",
    SvgScene: Svg05,
    isUnlocked: false,
  },
  {
    id: 6,
    title: "سرقة المطبخ الملكي",
    crimeScene: "قُبيل مأدبة رسمية اختفى وعاء نادر من فضة مُرصّع بالجواهر. الطهاة الخمسة هم الوحيدون الذين دخلوا المطبخ ذلك الصباح.",
    citizensWord: "وعاء",
    mafiusoWord: "صينية",
    category: "سرقة فاخرة",
    SvgScene: Svg06,
    isUnlocked: false,
  },
  {
    id: 7,
    title: "الوثيقة المفقودة",
    crimeScene: "سُرقت وثيقة سرية من خزنة محكمة مغلقة. الخزنة لا تزال مقفلة ولا كسر في أي مكان. خمسة فقط يعرفون الرمز.",
    citizensWord: "مغلف",
    mafiusoWord: "ملف",
    category: "تجسس وأسرار",
    SvgScene: Svg07,
    isUnlocked: false,
  },
  {
    id: 8,
    title: "الحادث في الميدان",
    crimeScene: "انهار إطار سيارة سباق مشهورة أثناء التجربة. ونجا السائق بأعجوبة. التقرير أشار إلى أن البلط كان مفككاً عمداً قبل الانطلاق.",
    citizensWord: "إطار",
    mafiusoWord: "مكبح",
    category: "سباقات وتخريب",
    SvgScene: Svg08,
    isUnlocked: false,
  },
  {
    id: 9,
    title: "الكتاب المحظور",
    crimeScene: "اختفى كتاب نادر من قاعة النوادر في المكتبة الوطنية. النظام الأمني لم يُسجّل أي اختراق والعارفون بموقعه خمسة فقط.",
    citizensWord: "كتاب",
    mafiusoWord: "مخطوطة",
    category: "أدب ونوادر",
    SvgScene: Svg09,
    isUnlocked: false,
  },
  {
    id: 10,
    title: "خيانة في المحطة الفضائية",
    crimeScene: "على متن محطة فضائية مأهولة ظهر خلل غامض في منظومة التنفس. خمسة طاقم، وخمسة مشتبهين، والوقت ينفد.",
    citizensWord: "قمر",
    mafiusoWord: "كوكب",
    category: "فضاء وتشويق",
    SvgScene: Svg10,
    isUnlocked: false,
  },
  {
    id: 11,
    title: "اللصوص بيننا",
    crimeScene: "اختفى صندوق عطايا من قاعة ولائم فاخرة أثناء انقطاع الكهرباء المتعمد. الخدم في أماكنهم، لكن شخصاً ما تسلّل في الظلام.",
    citizensWord: "شمعة",
    mafiusoWord: "فانوس",
    category: "سرقة فندقية",
    SvgScene: Svg11,
    isUnlocked: false,
  },
  {
    id: 12,
    title: "موت في المدينة الشبح",
    crimeScene: "في مدينة مهجورة يجري فيها تصوير فيلم رعب، نجا أحد الممثلين بصعوبة من حادثة دُبِّرت على شكل مقلب. لكن النتائج أثبتت أنها لم تكن مقلباً.",
    citizensWord: "كاميرا",
    mafiusoWord: "مايكروفون",
    category: "تصوير ومكائد",
    SvgScene: Svg12,
    isUnlocked: false,
  },
  {
    id: 13,
    title: "جريمة في اليخت",
    crimeScene: "في عرض البحر وأثناء رحلة نخبوية سُمع صوت سقوط في الظلام. كلٌّ من الخمسة يدّعي أنه كان نائماً في تلك اللحظة بالضبط.",
    citizensWord: "مرساة",
    mafiusoWord: "دفّة",
    category: "بحر وأسرار",
    SvgScene: Svg13,
    isUnlocked: false,
  },
  {
    id: 14,
    title: "آخر محطة",
    crimeScene: "في قطار سريع، اختفى عقد ماسي من حقيبة مُقفلة داخل عربة الدرجة الأولى. الرحلة لم تتوقف مرة والجميع على قائمة المشتبهين.",
    citizensWord: "عربة",
    mafiusoWord: "قاطرة",
    category: "سفر وجرائم",
    SvgScene: Svg14,
    isUnlocked: false,
  },
  {
    id: 15,
    title: "الشاهد الأخير",
    crimeScene: "في قضية كبرى تُعقد جلستها الفاصلة غداً، تعرّض الشاهد الرئيسي لتهديد مجهول. خمسة فقط يعرفون مكان إقامته السري.",
    citizensWord: "شهادة",
    mafiusoWord: "اعتراف",
    category: "محاكم وشهود",
    SvgScene: Svg15,
    isUnlocked: false,
  },
  {
    id: 16,
    title: "اللعنة الخضراء",
    crimeScene: "في دفيئة نباتية نادرة ذبلت عشرة نباتات خلال ليلة واحدة. الحارس يؤكد أن لا أحد دخل، لكن البوابة فُتحت خمس مرات.",
    citizensWord: "بذرة",
    mafiusoWord: "جذر",
    category: "نباتات وغرائب",
    SvgScene: Svg16,
    isUnlocked: false,
  },
  {
    id: 17,
    title: "الصفقة المزيفة",
    crimeScene: "في ختام مزاد فني نادر، اكتُشف أن إحدى اللوحات مزيفة احترافياً. خمسة مزايدين كانوا موجودين طوال الوقت.",
    citizensWord: "مزاد",
    mafiusoWord: "معرض",
    category: "فن وتزوير",
    SvgScene: Svg17,
    isUnlocked: false,
  },
  {
    id: 18,
    title: "الحريق المدروس",
    crimeScene: "في ميناء تاريخي احترق مستودع قديم في ساعات الصباح. الحريق بدأ من ثلاث نقاط مختلفة مما يؤكد التعمد.",
    citizensWord: "مستودع",
    mafiusoWord: "رصيف",
    category: "حريق متعمد",
    SvgScene: Svg18,
    isUnlocked: false,
  },
  {
    id: 19,
    title: "القصر والسر",
    crimeScene: "في قصر فاخر خُصص لحفل ليلي كبير، سُمعت رصاصة في الساعة الثانية عشرة. لا جثة، لا دم، لكن خمسة شهود تضاربت أقوالهم.",
    citizensWord: "قاعة",
    mafiusoWord: "حديقة",
    category: "قصور وألغاز",
    SvgScene: Svg19,
    isUnlocked: false,
  },
  {
    id: 20,
    title: "عطر القاتل",
    crimeScene: "في معرض عطور فاخر ترك القاتل خلفه رائحة مخصوصة تمسكت بملابس الضحية. البحث ضنّق على خمسة أشخاص كانوا حاضرين.",
    citizensWord: "عطر",
    mafiusoWord: "كولونيا",
    category: "عطور وتحقيق",
    SvgScene: Svg20,
    isUnlocked: false,
  },
  {
    id: 21,
    title: "خيانة في الاسطبل",
    crimeScene: "قبل السباق الكبير بساعات، تبيّن أن الحصان المرشح للفوز أُعطي مادة مجهولة. البيطريون الخمسة هم الوحيدون الذين اقتربوا من الاسطبل.",
    citizensWord: "حصان",
    mafiusoWord: "جمل",
    category: "سباقات وخداع",
    SvgScene: Svg21,
    isUnlocked: false,
  },
  {
    id: 22,
    title: "الغرفة المقفلة",
    crimeScene: "وُجد أحد الأعضاء مغشياً عليه داخل غرفة ألعاب إلكترونية مقفلة من الداخل. الكاميرا لم تُسجّل أي دخول بعد منتصف الليل.",
    citizensWord: "شاشة",
    mafiusoWord: "جهاز",
    category: "تقنية وتحقيق",
    SvgScene: Svg22,
    isUnlocked: false,
  },
  {
    id: 23,
    title: "تصدّع في القمة",
    crimeScene: "في مجمع شركة كبرى تسرّبت وثائق سرية للمنافسين قبيل اجتماع الحسم. التسريب جاء من الداخل والمطّلعون خمسة فقط.",
    citizensWord: "تقرير",
    mafiusoWord: "عقد",
    category: "أعمال وخيانة",
    SvgScene: Svg23,
    isUnlocked: false,
  },
  {
    id: 24,
    title: "الحقل الممسوس",
    crimeScene: "في مزرعة موروثة بدأت المحاصيل تذبل رغم توفر المياه. تقارير التربة أشارت إلى مواد كيماوية أُضيفت عمداً في منطقة واحدة.",
    citizensWord: "قمح",
    mafiusoWord: "شعير",
    category: "مزارع وغموض",
    SvgScene: Svg24,
    isUnlocked: false,
  },
  {
    id: 25,
    title: "سجل الاتهامات",
    crimeScene: "في مخفر قديم اختفى ملف جريمة مشهورة من أرشيف محمي بكلمات سر. خمسة ضباط لديهم صلاحية الوصول.",
    citizensWord: "ملف",
    mafiusoWord: "محضر",
    category: "شرطة وأرشيف",
    SvgScene: Svg25,
    isUnlocked: false,
  },
  {
    id: 26,
    title: "دماء في الحديقة",
    crimeScene: "في حفل حديقة نخبوي عُثر على أحد الضيوف خلف شجيرات كثيفة. لم تُسمع صرخة والخمسة الآخرون كانوا يتجاذبون أطراف الحديث.",
    citizensWord: "وردة",
    mafiusoWord: "زهرة",
    category: "حدائق وجرائم",
    SvgScene: Svg26,
    isUnlocked: false,
  },
  {
    id: 27,
    title: "القبو الذهبي",
    crimeScene: "في بنك تاريخي اختُرقت خزينة خاصة دون أثر لكسر أو اختراق. المسروقات لم تكن أموالاً بل وثائق ملكية مجهولة.",
    citizensWord: "ذهب",
    mafiusoWord: "فضة",
    category: "بنوك وأسرار",
    SvgScene: Svg27,
    isUnlocked: false,
  },
  {
    id: 28,
    title: "عقارب الساعة",
    crimeScene: "في متجر ساعات نادرة توقفت جميع الساعات في اللحظة ذاتها أثناء الليل. المشبوهون الخمسة كانوا آخر من غادر المتجر.",
    citizensWord: "ساعة",
    mafiusoWord: "منبّه",
    category: "ساعات وألغاز",
    SvgScene: Svg28,
    isUnlocked: false,
  },
  {
    id: 29,
    title: "مزرعة القهوة المحروقة",
    crimeScene: "في مزرعة قهوة تنتج أندر الحبوب تلف المحصول كله في يوم واحد إثر إضافة شيء لنظام الري. الخمسة العاملون هم المشتبه بهم.",
    citizensWord: "بن",
    mafiusoWord: "كاكاو",
    category: "مزارع نادرة",
    SvgScene: Svg29,
    isUnlocked: false,
  },
  {
    id: 30,
    title: "مؤامرة الفصل الأخير",
    crimeScene: "في ليلة النهائي الكبير أُرسل تهديد مجهول لمحكّم بارز. الرسالة وصلت من داخل الملعب والخمسة الذين يملكون أجهزتهم هم المشبوهون.",
    citizensWord: "هاتف",
    mafiusoWord: "جهاز",
    category: "رياضة وتهديد",
    SvgScene: Svg30,
    isUnlocked: false,
  },
];
