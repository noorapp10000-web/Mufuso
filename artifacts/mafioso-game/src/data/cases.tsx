export interface Case {
  id: number;
  title: string;
  crimeDescription: string;
  SvgScene: () => JSX.Element;
  occupations: string[];
  culpritIndex: number;
  clues: [string, string, string];
  solution: string;
  isUnlocked: boolean;
}

function Svg01(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="70" width="80" height="35" rx="4" fill="#2D0A10"/>
      <rect x="25" y="65" width="70" height="10" rx="2" fill="#4A0E17"/>
      <ellipse cx="60" cy="65" rx="25" ry="8" fill="#3D0A12"/>
      <rect x="55" y="30" width="10" height="35" fill="#4A0E17"/>
      <circle cx="60" cy="30" r="12" fill="none" stroke="#D4AF37" strokeWidth="2"/>
      <circle cx="60" cy="30" r="6" fill="#D4AF37" opacity="0.7"/>
      <line x1="60" y1="18" x2="60" y2="14" stroke="#D4AF37" strokeWidth="2"/>
      <line x1="72" y1="30" x2="76" y2="30" stroke="#D4AF37" strokeWidth="2"/>
      <line x1="48" y1="30" x2="44" y2="30" stroke="#D4AF37" strokeWidth="2"/>
      <rect x="35" y="75" width="50" height="25" rx="2" fill="#350810"/>
      <rect x="40" y="80" width="15" height="15" rx="1" fill="#1A0508" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="80" width="15" height="15" rx="1" fill="#1A0508" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="87" r="3" fill="#D4AF37" opacity="0.8"/>
    </svg>
  );
}

function Svg02(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="20" width="90" height="70" rx="6" fill="#2D0A10" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="22" y="28" width="76" height="54" rx="3" fill="#1A0508"/>
      <rect x="28" y="35" width="30" height="40" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="30" y="37" width="26" height="22" fill="#1A0508"/>
      <circle cx="43" cy="48" r="8" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="43" cy="48" r="4" fill="#D4AF37" opacity="0.3"/>
      <line x1="43" y1="40" x2="43" y2="48" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
      <line x1="43" y1="48" x2="49" y2="52" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
      <rect x="65" y="35" width="25" height="4" rx="1" fill="#D4AF37" opacity="0.5"/>
      <rect x="65" y="43" width="20" height="3" rx="1" fill="#4A0E17"/>
      <rect x="65" y="50" width="22" height="3" rx="1" fill="#4A0E17"/>
      <rect x="65" y="57" width="18" height="3" rx="1" fill="#4A0E17"/>
      <rect x="65" y="65" width="21" height="3" rx="1" fill="#4A0E17"/>
      <path d="M55 88 L65 88" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
      <path d="M30 88 Q55 80 65 88" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4" strokeDasharray="2 2"/>
    </svg>
  );
}

function Svg03(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="10" y="15" width="100" height="90" rx="6" fill="#2D0A10"/>
      <rect x="10" y="15" width="100" height="25" rx="6" fill="#350810"/>
      <text x="60" y="32" textAnchor="middle" fill="#D4AF37" fontSize="9" fontFamily="serif">THE GRAND MUSEUM</text>
      <rect x="20" y="50" width="35" height="45" rx="2" fill="#1A0508" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="22" y="52" width="31" height="29" fill="#350810"/>
      <rect x="70" y="50" width="35" height="45" rx="2" fill="#1A0508" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="72" y="52" width="31" height="29" fill="#350810"/>
      <ellipse cx="37" cy="67" rx="10" ry="7" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
      <circle cx="85" cy="67" r="7" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
      <line x1="37" y1="67" x2="85" y2="67" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4"/>
      <rect x="45" y="55" width="30" height="40" rx="2" fill="#4A0E17" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="50" y="58" width="20" height="20" fill="#1A0508"/>
      <path d="M50 78 Q60 70 70 78" fill="#D4AF37" opacity="0.3"/>
      <circle cx="60" cy="90" r="3" fill="#D4AF37" opacity="0.7"/>
    </svg>
  );
}

function Svg04(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <circle cx="60" cy="60" r="40" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="60" cy="60" r="25" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <rect x="45" y="30" width="30" height="50" rx="3" fill="#2D0A10" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="48" y="33" width="24" height="30" fill="#1A0508"/>
      <rect x="50" y="35" width="20" height="4" rx="1" fill="#D4AF37" opacity="0.7"/>
      <rect x="50" y="42" width="16" height="2" rx="1" fill="#4A0E17"/>
      <rect x="50" y="47" width="18" height="2" rx="1" fill="#4A0E17"/>
      <rect x="50" y="52" width="14" height="2" rx="1" fill="#4A0E17"/>
      <circle cx="58" cy="72" r="4" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="62" y1="76" x2="68" y2="82" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
      <rect x="25" y="50" width="15" height="20" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="30" y1="55" x2="35" y2="55" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="30" y1="58" x2="35" y2="58" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="30" y1="61" x2="35" y2="61" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="80" y="50" width="15" height="20" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="85" y1="55" x2="90" y2="55" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="85" y1="58" x2="90" y2="58" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg05(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="30" y="20" width="60" height="80" rx="4" fill="#2D0A10" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="35" y="25" width="50" height="15" rx="2" fill="#1A0508"/>
      <text x="60" y="35" textAnchor="middle" fill="#D4AF37" fontSize="7" fontFamily="serif">CASINO ROYAL</text>
      <rect x="38" y="45" width="44" height="30" rx="2" fill="#1A0508"/>
      <circle cx="60" cy="60" r="12" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M60 48 L64 56 L72 57 L66 63 L68 72 L60 68 L52 72 L54 63 L48 57 L56 56 Z" fill="#D4AF37" opacity="0.2" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="38" y="80" width="10" height="15" rx="1" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="55" y="80" width="10" height="15" rx="1" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="72" y="80" width="10" height="15" rx="1" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="20" y1="90" x2="40" y2="90" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <line x1="80" y1="90" x2="100" y2="90" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}

function Svg06(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="40" width="80" height="60" rx="4" fill="#2D0A10"/>
      <rect x="25" y="20" width="70" height="25" rx="3" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <text x="60" y="34" textAnchor="middle" fill="#D4AF37" fontSize="8" fontFamily="serif">OPERA HOUSE</text>
      <rect x="30" y="50" width="60" height="40" rx="2" fill="#1A0508"/>
      <path d="M30 90 Q60 55 90 90 Z" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <ellipse cx="60" cy="75" rx="15" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
      <rect x="55" y="65" width="10" height="20" rx="2" fill="#D4AF37" opacity="0.3"/>
      <circle cx="60" cy="65" r="4" fill="#D4AF37" opacity="0.6"/>
      <line x1="35" y1="88" x2="45" y2="88" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="75" y1="88" x2="85" y2="88" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg07(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="30" width="90" height="70" rx="5" fill="#2D0A10"/>
      <rect x="20" y="25" width="80" height="15" rx="3" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <text x="60" y="35" textAnchor="middle" fill="#D4AF37" fontSize="7">NATIONAL LIBRARY</text>
      <rect x="22" y="45" width="18" height="50" rx="2" fill="#4A0E17" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="42" y="45" width="18" height="50" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="62" y="45" width="18" height="50" rx="2" fill="#4A0E17" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="82" y="45" width="18" height="50" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="25" y="48" width="12" height="4" rx="0.5" fill="#D4AF37" opacity="0.4"/>
      <rect x="25" y="55" width="10" height="4" rx="0.5" fill="#D4AF37" opacity="0.3"/>
      <rect x="25" y="62" width="12" height="4" rx="0.5" fill="#D4AF37" opacity="0.4"/>
      <circle cx="62" cy="72" r="8" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="68" y1="78" x2="74" y2="84" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function Svg08(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="20" width="80" height="80" rx="8" fill="#2D0A10" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="55" r="25" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="60" cy="55" r="15" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
      <circle cx="60" cy="55" r="5" fill="#D4AF37" opacity="0.4"/>
      <line x1="60" y1="30" x2="60" y2="40" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="60" y1="70" x2="60" y2="80" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="35" y1="55" x2="45" y2="55" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="75" y1="55" x2="85" y2="55" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="35" y="80" width="50" height="15" rx="2" fill="#350810"/>
      <rect x="40" y="83" width="15" height="9" rx="1" fill="#1A0508" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="65" y="83" width="15" height="9" rx="1" fill="#1A0508" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg09(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="10" y="10" width="100" height="100" rx="10" fill="#2D0A10"/>
      <path d="M30 40 L50 20 L70 20 L90 40 L90 90 L30 90 Z" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="45" y="60" width="30" height="30" rx="2" fill="#1A0508" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="52" y="60" width="16" height="15" rx="1" fill="#2D0A10"/>
      <circle cx="60" cy="68" r="3" fill="#D4AF37" opacity="0.6"/>
      <path d="M35 40 L55 25 L65 25 L85 40" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
      <rect x="30" y="75" width="15" height="15" rx="1" fill="#4A0E17"/>
      <rect x="75" y="75" width="15" height="15" rx="1" fill="#4A0E17"/>
      <line x1="50" y1="85" x2="50" y2="95" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="70" y1="85" x2="70" y2="95" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg10(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="35" width="90" height="65" rx="5" fill="#2D0A10"/>
      <ellipse cx="60" cy="35" rx="30" ry="15" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="30" y1="35" x2="90" y2="35" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <rect x="25" y="50" width="30" height="45" rx="2" fill="#1A0508"/>
      <rect x="65" y="50" width="30" height="45" rx="2" fill="#1A0508"/>
      <rect x="45" y="65" width="30" height="30" rx="2" fill="#4A0E17" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="50" y="70" width="20" height="15" rx="1" fill="#1A0508"/>
      <circle cx="60" cy="80" r="4" fill="#D4AF37" opacity="0.6"/>
      <path d="M30 55 L35 55 L35 75 L30 75" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
      <path d="M90 55 L85 55 L85 75 L90 75" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
    </svg>
  );
}

function Svg11(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="20" width="80" height="80" rx="5" fill="#2D0A10" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="28" y="28" width="28" height="32" rx="2" fill="#350810"/>
      <rect x="64" y="28" width="28" height="32" rx="2" fill="#350810"/>
      <rect x="28" y="68" width="64" height="28" rx="2" fill="#350810"/>
      <circle cx="42" cy="44" r="8" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="48" y1="50" x2="54" y2="56" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
      <rect x="32" y="72" width="15" height="20" rx="1" fill="#1A0508"/>
      <rect x="52" y="72" width="15" height="20" rx="1" fill="#1A0508"/>
      <rect x="72" y="72" width="15" height="20" rx="1" fill="#1A0508"/>
      <line x1="64" y1="35" x2="88" y2="35" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="64" y1="40" x2="85" y2="40" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="64" y1="45" x2="88" y2="45" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="64" y1="50" x2="82" y2="50" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg12(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="10" y="50" width="100" height="55" rx="4" fill="#2D0A10"/>
      <path d="M10 50 L30 20 L90 20 L110 50 Z" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="30" y1="20" x2="30" y2="50" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="60" y1="20" x2="60" y2="50" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="90" y1="20" x2="90" y2="50" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="25" y="60" width="20" height="35" rx="2" fill="#1A0508"/>
      <rect x="75" y="60" width="20" height="35" rx="2" fill="#1A0508"/>
      <rect x="48" y="68" width="24" height="27" rx="2" fill="#4A0E17" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="82" r="5" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="82" r="2" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}

function Svg13(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <ellipse cx="60" cy="90" rx="50" ry="20" fill="#2D0A10"/>
      <rect x="45" y="30" width="30" height="60" rx="3" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="30" y="50" width="15" height="40" rx="2" fill="#2D0A10" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="75" y="50" width="15" height="40" rx="2" fill="#2D0A10" stroke="#D4AF37" strokeWidth="0.3"/>
      <rect x="50" y="35" width="20" height="20" rx="1" fill="#1A0508"/>
      <circle cx="60" cy="45" r="6" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="45" r="2" fill="#D4AF37" opacity="0.6"/>
      <line x1="55" y1="20" x2="60" y2="30" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="65" y1="20" x2="60" y2="30" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="60" y1="20" x2="60" y2="30" stroke="#D4AF37" strokeWidth="0.5"/>
      <ellipse cx="60" cy="20" rx="8" ry="4" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg14(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <circle cx="60" cy="60" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"/>
      <rect x="20" y="25" width="80" height="70" rx="5" fill="#2D0A10"/>
      <rect x="25" y="30" width="70" height="35" rx="3" fill="#1A0508"/>
      <path d="M35 45 L50 35 L70 55 L85 40" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="35" cy="45" r="2" fill="#D4AF37"/>
      <circle cx="50" cy="35" r="2" fill="#D4AF37"/>
      <circle cx="70" cy="55" r="2" fill="#D4AF37"/>
      <circle cx="85" cy="40" r="2" fill="#D4AF37"/>
      <rect x="25" y="70" width="70" height="20" rx="2" fill="#350810"/>
      <line x1="35" y1="75" x2="35" y2="85" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="50" y1="73" x2="50" y2="85" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="65" y1="77" x2="65" y2="85" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="80" y1="74" x2="80" y2="85" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg15(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="15" width="90" height="90" rx="8" fill="#2D0A10"/>
      <rect x="22" y="22" width="76" height="76" rx="5" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="60" r="20" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="60" y1="40" x2="60" y2="22" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="60" y1="80" x2="60" y2="98" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="40" y1="60" x2="22" y2="60" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="80" y1="60" x2="98" y2="60" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="60" cy="60" r="3" fill="#D4AF37" opacity="0.8"/>
      <circle cx="60" cy="47" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="71" cy="53" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="71" cy="67" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="60" cy="73" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="49" cy="67" r="2" fill="#D4AF37" opacity="0.4"/>
      <circle cx="49" cy="53" r="2" fill="#D4AF37" opacity="0.4"/>
    </svg>
  );
}

function Svg16(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="30" width="80" height="75" rx="5" fill="#2D0A10"/>
      <rect x="25" y="25" width="70" height="12" rx="3" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <text x="60" y="33" textAnchor="middle" fill="#D4AF37" fontSize="6">ROYAL HOTEL</text>
      <rect x="28" y="45" width="18" height="55" rx="1" fill="#1A0508"/>
      <rect x="52" y="45" width="18" height="55" rx="1" fill="#1A0508"/>
      <rect x="76" y="45" width="18" height="55" rx="1" fill="#1A0508"/>
      <rect x="30" y="48" width="14" height="10" rx="0.5" fill="#350810"/>
      <rect x="30" y="62" width="14" height="10" rx="0.5" fill="#350810"/>
      <rect x="30" y="76" width="14" height="10" rx="0.5" fill="#350810"/>
      <rect x="54" y="55" width="14" height="10" rx="0.5" fill="#D4AF37" opacity="0.2"/>
      <rect x="54" y="69" width="14" height="10" rx="0.5" fill="#350810"/>
      <rect x="78" y="48" width="14" height="10" rx="0.5" fill="#350810"/>
      <rect x="78" y="62" width="14" height="10" rx="0.5" fill="#350810"/>
      <circle cx="61" cy="93" r="6" fill="#4A0E17" stroke="#D4AF37" strokeWidth="1"/>
    </svg>
  );
}

function Svg17(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="20" width="90" height="80" rx="5" fill="#2D0A10"/>
      <rect x="20" y="25" width="80" height="15" rx="2" fill="#350810"/>
      <circle cx="60" cy="32" r="8" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="60" y1="24" x2="60" y2="40" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="52" y1="32" x2="68" y2="32" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="22" y="45" width="35" height="50" rx="2" fill="#1A0508"/>
      <rect x="63" y="45" width="35" height="50" rx="2" fill="#1A0508"/>
      <rect x="25" y="48" width="29" height="22" fill="#350810"/>
      <rect x="66" y="48" width="29" height="22" fill="#350810"/>
      <path d="M25 60 Q40 50 54 60" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <path d="M66 57 Q80 47 95 57" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <rect x="28" y="74" width="10" height="16" rx="0.5" fill="#2D0A10"/>
      <rect x="42" y="74" width="10" height="16" rx="0.5" fill="#2D0A10"/>
      <rect x="68" y="74" width="10" height="16" rx="0.5" fill="#2D0A10"/>
      <rect x="82" y="74" width="10" height="16" rx="0.5" fill="#2D0A10"/>
    </svg>
  );
}

function Svg18(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="10" y="10" width="100" height="100" rx="5" fill="#2D0A10"/>
      <circle cx="60" cy="50" r="30" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M35 75 L60 20 L85 75 Z" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M40 75 L60 30 L80 75 Z" fill="#1A0508"/>
      <path d="M45 75 L60 40 L75 75 Z" fill="#2D0A10"/>
      <line x1="60" y1="20" x2="60" y2="10" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="60" cy="20" r="3" fill="#D4AF37" opacity="0.8"/>
      <rect x="25" y="75" width="70" height="25" rx="3" fill="#350810"/>
      <line x1="40" y1="80" x2="40" y2="95" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="60" y1="80" x2="60" y2="95" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="80" y1="80" x2="80" y2="95" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg19(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <ellipse cx="60" cy="70" rx="45" ry="35" fill="#2D0A10"/>
      <ellipse cx="60" cy="70" rx="35" ry="25" fill="#1A0508"/>
      <ellipse cx="60" cy="70" rx="25" ry="15" fill="#2D0A10"/>
      <path d="M40 45 L60 20 L80 45" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
      <circle cx="60" cy="20" r="5" fill="#D4AF37" opacity="0.5"/>
      <line x1="60" y1="25" x2="60" y2="55" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 2"/>
      <rect x="45" y="55" width="30" height="15" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="50" y1="60" x2="70" y2="60" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="50" y1="65" x2="67" y2="65" stroke="#D4AF37" strokeWidth="0.5"/>
    </svg>
  );
}

function Svg20(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="15" width="90" height="90" rx="8" fill="#2D0A10"/>
      <rect x="25" y="25" width="70" height="70" rx="4" fill="#1A0508"/>
      <rect x="30" y="30" width="28" height="28" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="62" y="30" width="28" height="28" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="30" y="62" width="28" height="28" rx="2" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="62" y="62" width="28" height="28" rx="2" fill="#4A0E17" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M34 34 L54 54" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M66 34 L86 54" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M34 66 L54 86" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="76" cy="76" r="6" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="82" y1="82" x2="88" y2="88" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function Svg21(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="10" y="30" width="100" height="70" rx="5" fill="#2D0A10"/>
      <rect x="10" y="30" width="100" height="15" rx="5" fill="#350810" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="20" y="55" width="22" height="40" rx="2" fill="#1A0508"/>
      <rect x="49" y="55" width="22" height="40" rx="2" fill="#1A0508"/>
      <rect x="78" y="55" width="22" height="40" rx="2" fill="#1A0508"/>
      <circle cx="31" cy="67" r="6" fill="#D4AF37" opacity="0.2" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="67" r="6" fill="#D4AF37" opacity="0.2" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="89" cy="67" r="6" fill="#D4AF37" opacity="0.2" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M22 85 Q31 78 40 85" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M51 85 Q60 78 69 85" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M80 85 Q89 78 98 85" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="25" y1="95" x2="55" y2="5" stroke="#D4AF37" strokeWidth="0.3" opacity="0.2" strokeDasharray="3 3"/>
    </svg>
  );
}

function Svg22(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="20" width="80" height="80" rx="40" fill="#2D0A10" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="60" r="30" fill="#1A0508"/>
      <circle cx="60" cy="60" r="20" fill="#2D0A10"/>
      <circle cx="60" cy="60" r="10" fill="#350810"/>
      <circle cx="60" cy="60" r="3" fill="#D4AF37" opacity="0.6"/>
      <line x1="60" y1="30" x2="60" y2="40" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="60" y1="80" x2="60" y2="90" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="30" y1="60" x2="40" y2="60" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="80" y1="60" x2="90" y2="60" stroke="#D4AF37" strokeWidth="0.5"/>
      <path d="M60 60 L60 45" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M60 60 L72 65" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function Svg23(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="30" width="80" height="60" rx="5" fill="#2D0A10"/>
      <path d="M20 30 L60 10 L100 30" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="30" y="40" width="60" height="45" rx="2" fill="#1A0508"/>
      <rect x="35" y="45" width="22" height="30" rx="1" fill="#350810"/>
      <rect x="63" y="45" width="22" height="30" rx="1" fill="#350810"/>
      <rect x="48" y="55" width="24" height="35" rx="1" fill="#4A0E17" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="72" r="4" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="72" r="2" fill="#D4AF37" opacity="0.5"/>
      <rect x="38" y="47" width="16" height="10" rx="0.5" fill="#1A0508"/>
      <rect x="66" y="47" width="16" height="10" rx="0.5" fill="#1A0508"/>
    </svg>
  );
}

function Svg24(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="25" width="90" height="70" rx="5" fill="#2D0A10"/>
      <path d="M40 25 L40 95" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M60 25 L60 95" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M80 25 L80 95" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M15 45 L105 45" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <path d="M15 65 L105 65" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <rect x="20" y="30" width="18" height="12" rx="1" fill="#D4AF37" opacity="0.3"/>
      <rect x="42" y="48" width="16" height="14" rx="1" fill="#4A0E17" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="63" y="30" width="18" height="12" rx="1" fill="#350810"/>
      <rect x="22" y="68" width="14" height="14" rx="1" fill="#350810"/>
      <rect x="83" y="48" width="14" height="14" rx="1" fill="#D4AF37" opacity="0.2"/>
      <circle cx="60" cy="90" r="5" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="65" y1="95" x2="70" y2="100" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function Svg25(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="10" y="40" width="100" height="60" rx="4" fill="#2D0A10"/>
      <path d="M20 40 Q60 10 100 40" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <rect x="25" y="55" width="70" height="40" rx="2" fill="#1A0508"/>
      <rect x="30" y="58" width="60" height="8" rx="1" fill="#350810"/>
      <line x1="35" y1="62" x2="85" y2="62" stroke="#D4AF37" strokeWidth="0.3" opacity="0.5"/>
      <rect x="30" y="70" width="60" height="6" rx="1" fill="#350810"/>
      <rect x="30" y="80" width="60" height="6" rx="1" fill="#350810"/>
      <rect x="45" y="70" width="30" height="25" rx="1" fill="#4A0E17" stroke="#D4AF37" strokeWidth="0.5"/>
      <circle cx="60" cy="82" r="4" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="82" r="2" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}

function Svg26(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="15" width="90" height="90" rx="6" fill="#2D0A10"/>
      <circle cx="60" cy="45" r="22" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
      <path d="M40 45 L50 35 L60 45 L70 35 L80 45 L70 55 L60 45 L50 55 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="60" cy="45" r="8" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="45" r="3" fill="#D4AF37" opacity="0.7"/>
      <rect x="30" y="72" width="60" height="28" rx="3" fill="#350810"/>
      <line x1="35" y1="78" x2="85" y2="78" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <line x1="35" y1="83" x2="80" y2="83" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <line x1="35" y1="88" x2="82" y2="88" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <line x1="35" y1="93" x2="75" y2="93" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}

function Svg27(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="20" y="20" width="80" height="80" rx="5" fill="#2D0A10"/>
      <rect x="25" y="25" width="70" height="30" rx="3" fill="#350810"/>
      <rect x="30" y="28" width="60" height="24" rx="2" fill="#1A0508"/>
      <path d="M30 35 L55 28 L90 38" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <path d="M30 42 L60 35 L90 42" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
      <rect x="25" y="60" width="70" height="35" rx="3" fill="#350810"/>
      <circle cx="45" cy="77" r="10" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="45" cy="77" r="5" fill="#2D0A10"/>
      <circle cx="75" cy="77" r="10" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="75" cy="77" r="5" fill="#2D0A10"/>
      <line x1="55" y1="77" x2="65" y2="77" stroke="#D4AF37" strokeWidth="1"/>
    </svg>
  );
}

function Svg28(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="10" y="20" width="100" height="80" rx="5" fill="#2D0A10"/>
      <path d="M10 50 L25 35 L35 50 L50 30 L60 50 L75 35 L85 50 L100 35 L110 50" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
      <rect x="30" y="55" width="60" height="35" rx="3" fill="#350810"/>
      <rect x="35" y="60" width="50" height="25" rx="2" fill="#1A0508"/>
      <line x1="40" y1="65" x2="40" y2="80" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="50" y1="65" x2="50" y2="75" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="60" y1="65" x2="60" y2="82" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="70" y1="65" x2="70" y2="72" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="80" y1="65" x2="80" y2="78" stroke="#D4AF37" strokeWidth="0.5"/>
      <line x1="35" y1="83" x2="85" y2="83" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="60" cy="30" r="8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

function Svg29(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <circle cx="60" cy="60" r="48" fill="#2D0A10"/>
      <circle cx="60" cy="60" r="38" fill="#1A0508"/>
      <circle cx="60" cy="60" r="28" fill="#2D0A10"/>
      <circle cx="60" cy="60" r="18" fill="#350810" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="60" r="8" fill="#4A0E17" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="60" cy="60" r="3" fill="#D4AF37"/>
      <line x1="60" y1="12" x2="60" y2="30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="60" y1="90" x2="60" y2="108" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="12" y1="60" x2="30" y2="60" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="90" y1="60" x2="108" y2="60" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
    </svg>
  );
}

function Svg30(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="12" fill="#1A0508"/>
      <rect x="15" y="20" width="90" height="80" rx="6" fill="#2D0A10"/>
      <rect x="22" y="27" width="76" height="66" rx="3" fill="#1A0508"/>
      <line x1="60" y1="27" x2="60" y2="93" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
      <rect x="25" y="30" width="32" height="25" rx="2" fill="#350810"/>
      <rect x="63" y="30" width="32" height="25" rx="2" fill="#350810"/>
      <rect x="25" y="60" width="32" height="25" rx="2" fill="#4A0E17" stroke="#D4AF37" strokeWidth="0.5"/>
      <rect x="63" y="60" width="32" height="25" rx="2" fill="#350810"/>
      <circle cx="41" cy="72" r="8" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="47" y1="78" x2="53" y2="84" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30" y1="35" fill="none"/>
      <line x1="30" y1="37" x2="52" y2="37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="30" y1="41" x2="50" y2="41" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="30" y1="45" x2="52" y2="45" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="68" y1="37" x2="90" y2="37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="68" y1="41" x2="87" y2="41" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
      <line x1="68" y1="65" x2="90" y2="65" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
    </svg>
  );
}

export const CASES: Case[] = [
  {
    id: 1,
    title: "سرقة التحفة الذهبية",
    crimeDescription: "اختفت تحفة ذهبية نادرة تعود للقرن الثامن عشر من متحف القاهرة الكبير في ليلة العرض الأولى. التحفة كانت محاطة بأربعة حراس وكاميرات مراقبة، لكن المجرم تمكن من إخفاء مكانها بدلاً من تحفة مزيفة مطابقة تماماً.",
    SvgScene: Svg01,
    occupations: ["حارس أمن", "مرمم تحف", "مصور صحفي", "منسق معارض"],
    culpritIndex: 1,
    clues: [
      "شوهد شخص يحمل حقيبة كبيرة غريبة الشكل عند مدخل المتحف مساء يوم الحادثة.",
      "كاميرات المراقبة توقفت عن العمل لمدة دقيقتين بالضبط بين الساعة التاسعة والعاشرة مساءً، وحارس الأمن قال إنه لم يلاحظ ذلك.",
      "التحفة المزيفة صُنعت من مواد كيميائية خاصة يستخدمها المتخصصون في ترميم التحف والأعمال الفنية."
    ],
    solution: "مرمم التحف هو المجرم. استغل خبرته في صناعة تحفة مزيفة مطابقة تماماً للأصلية، ثم استخدم صلاحياته المشروعة للوصول إلى التحفة بحجة إجراء فحص دوري. قطع الكاميرات لمدتين دقيقتين كافيتين لإتمام عملية الإحلال. أخفى الأصل في حقيبة الأدوات الخاصة به وخرج وقت انتهاء نوبة عمله.",
    isUnlocked: true
  },
  {
    id: 2,
    title: "مخطوطة الليل",
    crimeDescription: "اختفت مخطوطة إسلامية نادرة يعود تاريخها إلى القرن الثالث عشر من مكتبة دار الكتب الوطنية في القاهرة. المخطوطة كانت محفوظة في خزنة خاصة، ولم تُكسر ولم تُفتح بالقوة.",
    SvgScene: Svg02,
    occupations: ["أرشيفي", "مترجم", "مؤرخ", "باحث أكاديمي"],
    culpritIndex: 0,
    clues: [
      "وجدت بصمات قفازات مطاطية بيضاء بالقرب من رفوف المخطوطات القديمة.",
      "المترجم الضيف طلب الاطلاع على أوراق من القرن الثالث عشر قبل يوم واحد من الحادثة، وهو ما يثير الشبهات.",
      "الأقفال الإلكترونية تسجل كل عملية فتح، والسجل يُظهر فتح الخزنة في الساعة الثانية صباحاً برمز الموظف رقم 001."
    ],
    solution: "الأرشيفي هو المجرم. كان يحتفظ بنسخة احتياطية من رمز الخزنة الرئيسية بصفته مسؤول الأرشيف. دخل المبنى في الساعة الثانية صباحاً مستخدماً بطاقته الرسمية، وارتدى قفازات مطاطية لإخفاء البصمات، وفتح الخزنة برمز وصوله المشروع وسرق المخطوطة وخبأها في حقيبة الوثائق الرسمية التي يحملها يومياً.",
    isUnlocked: true
  },
  {
    id: 3,
    title: "لغز لوحة الملك",
    crimeDescription: "استُبدلت لوحة نفيسة للملك فاروق في متحف الفن الملكي بنسخة مزيفة لا يمكن تمييزها بالعين المجردة. اكتُشف الأمر فقط حين وصل خبير دولي لتقييمها.",
    SvgScene: Svg03,
    occupations: ["ناقد فني", "بواب متحف", "مرمم لوحات", "مصمم إضاءة"],
    culpritIndex: 2,
    clues: [
      "شوهد شخص يحمل لوحة بإطار بني كبير خارج المتحف في فترة الغداء.",
      "الناقد الفني الزائر طلب تصوير اللوحة من زوايا متعددة وغير معتادة قبل أسبوع من الحادثة.",
      "الطلاء المستخدم في اللوحة المزيفة يحتاج إلى معرفة دقيقة بتقنيات رسم تلك الحقبة الزمنية وطريقة تشيخ الألوان."
    ],
    solution: "مرمم اللوحات هو المجرم. استغل دخوله الدائم إلى المخزن لدراسة أسلوب اللوحة الأصلية بتفاصيل دقيقة، ثم أمضى أشهراً في رسم نسخة مطابقة باستخدام أصباغ قديمة ومعالجة مصطنعة للتشيخ. استبدل اللوحة أثناء جلسة الترميم الدورية وأخرج الأصلية مطوية داخل أسطوانة نقل رسمية.",
    isUnlocked: true
  },
  {
    id: 4,
    title: "محاضر المحكمة المسروقة",
    crimeDescription: "اختفت ملفات محاكمة سرية تتعلق بقضية فساد كبرى من قسم أرشيف المحكمة العليا. الملفات كانت مؤمّنة برقمياً ولا يمكن طباعتها أو نسخها داخل البناية.",
    SvgScene: Svg04,
    occupations: ["محامٍ", "كاتب محكمة", "مستشار قانوني", "مراقب قضائي"],
    culpritIndex: 3,
    clues: [
      "وُجدت بقع صغيرة من الحبر على مقعد غرفة الأرشيف الرئيسية دون تفسير.",
      "المحامي الزائر طلب الاطلاع على ملفات مشابهة من نفس الفترة الزمنية مرتين خلال الأسبوع الماضي.",
      "كاميرات الردهة سجّلت شخصاً يحمل جهاز لوحي غير معتمد داخل المنطقة الآمنة في وقت متأخر من الليل."
    ],
    solution: "المراقب القضائي هو المجرم. كان يمتلك صلاحية الدخول إلى غرفة الأرشيف في أي وقت بصفة مراقب رسمي. أدخل جهازاً لوحياً خاصاً مدمجاً بتقنية تصوير مصغر، وصوّر الملفات السرية صفحة صفحة خلال جلسات مراقبة طويلة. البقع الحبر نتيجة تسرب من جهازه.",
    isUnlocked: false
  },
  {
    id: 5,
    title: "خزنة الكازينو الكبرى",
    crimeDescription: "سُرق 3 مليون جنيه من خزنة كازينو النيل الملكي دون كسر أي قفل أو إثارة أي إنذار. العملية نُفذت خلال ليلة احتفال كبرى عندما كان الكازينو على أشد حالاته ازدحاماً.",
    SvgScene: Svg05,
    occupations: ["موزع أوراق", "حارس أمن", "محاسب", "مدير قاعة"],
    culpritIndex: 2,
    clues: [
      "وُجد كأس نبيذ فارغ داخل غرفة الخزنة مع آثار طلاء أحمر على حافته.",
      "حارس الأمن في حراسة الخزنة أفاد بأنه غادر لدقائق بسبب إنذار كاذب في الطابق العلوي.",
      "الحسابات الرقمية تُظهر تلاعباً في سجلات التحصيل لثلاثة أسابيع قبل الحادثة يبلغ مجموعه بالضبط نفس المبلغ المسروق."
    ],
    solution: "المحاسب هو المجرم. على مدى ثلاثة أسابيع، كان يُسجّل مبالغ نقدية وهمية في سجلات الدخول اليومية مما أتاح له تجميع مبالغ صغيرة في صندوق سري. في ليلة الاحتفال، تعاون مع حارس خارجي لتشغيل الإنذار الكاذب ثم استخدم نسخة مكررة من مفتاح الخزنة صنعها من قالب وصلي إليه بصفته المحاسبية.",
    isUnlocked: false
  },
  {
    id: 6,
    title: "عقد الأوبرا المفقود",
    crimeDescription: "سُرق عقد الماس النادر للمطربة فاتن المصرية من غرفة تبديل الملابس في دار الأوبرا المصرية ليلة العرض الافتتاحي الكبير. العقد كان قيمته تساوي قصراً كاملاً.",
    SvgScene: Svg06,
    occupations: ["مصمم أزياء", "مايسترو", "مسرحي ديكور", "حارس الكواليس"],
    culpritIndex: 0,
    clues: [
      "وُجدت خيوط بيضاء ناعمة على الكرسي قرب خزانة الحلي في غرفة تبديل الملابس.",
      "المايسترو طلب تعديلاً أخيراً على الملابس في غرفة تبديل الملابس قبل ساعة من بدء العرض مباشرة.",
      "الكاميرا المخفية في الردهة كشفت أن الخيوط البيضاء تطابق نوعاً محدداً من الخيوط يستخدمه متخصصو الخياطة الفاخرة."
    ],
    solution: "مصمم الأزياء هو المجرم. دخل غرفة تبديل الملابس تحت ذريعة إجراء تعديل أخير على الفستان، ثم استغل لحظة انشغال المطربة بالتدريب. فتح الخزانة بمشبك شعر تدرّب على استخدامه. أخفى العقد داخل قماش الفساتين الإضافية التي حملها معه كجزء طبيعي من أدواته.",
    isUnlocked: false
  },
  {
    id: 7,
    title: "الكتاب الذي لا يُقرأ",
    crimeDescription: "اختفت نسخة فريدة من كتاب الفهرست لابن النديم من مكتبة دار الكتب الوطنية. النسخة محفورة عليها توقيع المؤلف الأصلي وتُعدّ من أثمن المخطوطات في العالم.",
    SvgScene: Svg07,
    occupations: ["أمين مكتبة", "صحفي ثقافي", "ناشر كتب", "طالب دكتوراه"],
    culpritIndex: 2,
    clues: [
      "وُجدت علامات من غبار أبيض خفيف على رف المخطوطات، مما يدل على تحريك عدة كتب.",
      "الصحفي الثقافي نشر مقالاً مفصلاً عن قيمة المخطوطة ومكانها الدقيق في المكتبة قبل ثلاثة أيام من الحادثة.",
      "سجل طلبات الاطلاع يُظهر أن المخطوطة طُلبت للتصوير من قِبل جهة نشر خاصة قبل أسبوعين."
    ],
    solution: "ناشر الكتب هو المجرم. قدّم طلباً رسمياً لتصوير المخطوطة لأغراض النشر الأكاديمي وهو ذريعة مقبولة. أثناء جلسة التصوير، استبدل المخطوطة بنسخة طباعية فاخرة من الورق المتشيخ التي أعدّها مسبقاً. الغبار الأبيض نتيجة لملمس مواد التصنيع المستخدمة في النسخة المزيفة.",
    isUnlocked: false
  },
  {
    id: 8,
    title: "ساعة الباشا المسروقة",
    crimeDescription: "سُرقت ساعة جيب نادرة من ذهب خالص تعود للخديوي عباس حلمي الثاني من متحف القصر العلوي في شبرا. الساعة كانت معروضة وسط قطع كثيرة ولم تكن ضمن أولويات الحماية.",
    SvgScene: Svg08,
    occupations: ["مرشد سياحي", "عامل صيانة", "مصور فوتوغرافي", "بائع هدايا تذكارية"],
    culpritIndex: 1,
    clues: [
      "شُوهد رجل يتوقف طويلاً أمام الواجهة التي تحتوي على الساعة ويفحص الزاوية الخلفية للخزانة.",
      "المرشد السياحي كان يشرح لمجموعته مزايا الساعة بتفصيل أكثر من المعتاد وأشار إلى أن الخزانة الزجاجية مصنوعة من نوع خاص.",
      "بقايا أداة صغيرة مصنوعة من الصلب المقاوم للصدأ وُجدت تحت الخزانة مباشرة."
    ],
    solution: "عامل الصيانة هو المجرم. استغل صلاحيته في إجراء صيانة دورية للخزانات الزجاجية. أحضر أداة إلكترونية مخصصة لفك القفل المغناطيسي دون ترك أثر واضح. أثناء رفع الزجاج للتنظيف، أخفى الساعة في حقيبة الأدوات المعتادة. وجود بقايا الأداة الصلبة دليل على خطأ تقني في العملية.",
    isUnlocked: false
  },
  {
    id: 9,
    title: "أسرار الفيلا المهجورة",
    crimeDescription: "سُرقت وثائق عقارية أصلية لأرض تُقدّر بمئات الملايين من فيلا مهجورة يُعتقد أنها تعود لعائلة شركة قناة السويس القديمة. الوثائق كانت مخبأة في غرفة سرية.",
    SvgScene: Svg09,
    occupations: ["محقق خاص", "مهندس معماري", "عامل تنظيف", "مصوّر عقاري"],
    culpritIndex: 1,
    clues: [
      "آثار أقدام حديثة وُجدت في طابق علوي لم يُدخل إليه أحد منذ سنوات طويلاً.",
      "المحقق الخاص أبدى اهتماماً غريباً بمخططات البناء الأصلية وطلب رؤيتها قبل التحقيق.",
      "الجدار الذي يُخفي الغرفة السرية يحتاج معرفة هندسية دقيقة بطريقة بناء مباني القرن التاسع عشر لاكتشافه."
    ],
    solution: "المهندس المعماري هو المجرم. كلّف دراسة مباني ذلك العصر واطّلع على مخططات البناء القديمة التي تكشف وجود غرفة مخفية. استخدم معرفته لإيجاد موضع الغرفة بدقة وفتحها بالأدوات المناسبة. آثار الأقدام دليل على تنقله في الطابق العلوي لتحديد الموضع الدقيق.",
    isUnlocked: false
  },
  {
    id: 10,
    title: "المسرح والقناع",
    crimeDescription: "سُرق قناع تمثيلي نادر صنعه الفنان الإيطالي الشهير كومياني والمرصّع بأحجار كريمة من متجر تحف قريب من دار الأوبرا المصرية. القناع عُرض ضمن معرض خاص.",
    SvgScene: Svg10,
    occupations: ["ممثل مسرحي", "مدير متجر", "كاتب مسرحي", "ناقد فني"],
    culpritIndex: 0,
    clues: [
      "وُجد قناع بلاستيكي رخيص مُلقى في الحديقة خلف المتجر.",
      "الناقد الفني نشر تقريراً مفصلاً عن القناع وتاريخه وأهميته الفنية قبل المعرض بأسبوع.",
      "الكاميرات سجّلت شخصاً يضع قناعاً مشابهاً في الفترة نفسها التي اختفى فيها القناع الأصلي."
    ],
    solution: "الممثل المسرحي هو المجرم. كان يمتلك قناعاً مسرحياً مشابهاً في الشكل العام، واستغل خبرته في التمثيل ليتصرف كزائر عادي. دخل المعرض ووضع قناعه المسرحي الرخيص مكان الأصيل استغلاله لحظة انشغال الموظفين بزوار آخرين. القناع البلاستيكي الرخيص هو الذي رماه لاحقاً في الحديقة.",
    isUnlocked: false
  },
  {
    id: 11,
    title: "قضية النزل الملكي",
    crimeDescription: "سُرق خاتم ملكي مُرصّع بياقوتة نادرة من غرفة VIP في أحد أعرق فنادق القاهرة التاريخية. صاحب الغرفة ضيف ثري زائر وكان الخاتم في خزنة الغرفة.",
    SvgScene: Svg11,
    occupations: ["موظف استقبال", "نادل غرف", "مدير أمن", "عاملة تنظيف"],
    culpritIndex: 1,
    clues: [
      "وُجدت قهوة باردة منسكبة جزئياً على منضدة خزنة الغرفة.",
      "موظف الاستقبال أبلغ عن أن ضيفاً آخر في الطابق نفسه شكا من ضوضاء في منتصف الليل.",
      "رمز الخزنة غُيّر من قِبل شخص يعرف بالضبط نظام الخزن الإلكتروني المستخدم في الغرفة."
    ],
    solution: "نادل الغرف هو المجرم. دخل الغرفة بحجة توصيل أوردر العشاء المتأخر، واستغل لحظة دخول الضيف لدورة المياه. أثناء ذلك، لاحظ أن الضيف ترك الخاتم على المنضدة قبل وضعه في الخزنة. انسكاب القهوة كان مقصوداً لإلهاء الضيف بينما أخذ الخاتم وأخفاه تحت الصينية.",
    isUnlocked: false
  },
  {
    id: 12,
    title: "شفرة المبنى القديم",
    crimeDescription: "سُرقت خرائط أرشيفية سرية لأنفاق أسفل القاهرة الخديوية من مكتب هيئة الآثار. هذه الخرائط كانت تكشف مواقع ثروات تاريخية مدفونة.",
    SvgScene: Svg12,
    occupations: ["أثري", "رسام خرائط", "موظف أرشيف", "مهندس مساحة"],
    culpritIndex: 3,
    clues: [
      "وُجد قلم رصاص ذو علامة مختبر هندسي متخصص بالقرب من درج الملفات.",
      "الأثري قدّم طلب الاطلاع على الخرائط لكنه رُفض بسبب مستوى التصنيف السري.",
      "نظام تسجيل الدخول يُظهر استخدام بطاقة هوية هندسية رسمية للوصول إلى غرفة الخرائط في أوقات غير رسمية."
    ],
    solution: "مهندس المساحة هو المجرم. كان يمتلك صلاحية الوصول إلى الغرفة لأسباب تقنية مشروعة تتعلق بالمساحات والإحداثيات. تمكّن من تحديد مكان الخرائط السرية من خلال التنسيق الرسمي مع الأرشيف، ثم دخل في ساعة متأخرة وصوّر الخرائط بكاميرا مصغّرة ثبّتها في ساعته.",
    isUnlocked: false
  },
  {
    id: 13,
    title: "سر الكاتدرائية",
    crimeDescription: "اختفت لوحة دينية نادرة من داخل كنيسة قبطية عمرها سبعة قرون وسط القاهرة التاريخية. اللوحة مرسومة على خشب الأرز وتُقدّر قيمتها بأرقام خيالية.",
    SvgScene: Svg13,
    occupations: ["قس", "مرمم أعمال دينية", "سائح أجنبي", "موظف صيانة"],
    culpritIndex: 1,
    clues: [
      "شُوهد سيارة باب واحد مركونة خارج الكنيسة في غير أوقات العبادة لفترة طويلة.",
      "السائح الأجنبي سأل عن لوحات خشب الأرز تحديداً وأبدى معرفة واسعة بتقنيات رسم تلك الحقبة.",
      "اللوحة المسروقة تُعدّ من أعقد أنواع الفن الديني ترميماً بسبب طبقاتها المتعددة من الطلاء الذهبي."
    ],
    solution: "مرمم الأعمال الدينية هو المجرم. دخل الكنيسة بتفويض رسمي لترميم عدة أعمال. أثناء العمل على لوحة مجاورة، استبدل لوحة الأرز النادرة بنسخة طلاها بطبقات متعددة تُخفي المواد الحديثة. أودع الأصلية في صناديق المواد الكيميائية التي أخرجها لاحقاً.",
    isUnlocked: false
  },
  {
    id: 14,
    title: "مؤامرة البورصة",
    crimeDescription: "سُرقت وثائق سرية بالغة الأهمية تتعلق بصفقة اندماج شركات عملاقة من مكتب مدير البورصة قبل ساعات من الإعلان الرسمي. من حصل عليها يمكنه تحقيق مليارات.",
    SvgScene: Svg14,
    occupations: ["محلل مالي", "سكرتير تنفيذي", "مدير أمن معلومات", "مستشار استثمار"],
    culpritIndex: 3,
    clues: [
      "تنبّه نظام المراقبة لمحاولة دخول غير موفقة لبريد إلكتروني رسمي من عنوان IP خارج المبنى.",
      "السكرتير التنفيذي كان مشغولاً في اجتماع طارئ لمدة ساعتين مما أتاح الوصول للمكتب دون رقابة.",
      "الوثائق طُبعت وأُرسلت إلكترونياً في الوقت نفسه، وهو ما يتطلب معرفة متقدمة بمنظومة الأمن السيبراني."
    ],
    solution: "مستشار الاستثمار هو المجرم. كان يمتلك مصلحة مباشرة في الصفقة لأنه كان يراهن على أسهم إحدى الشركتين. اخترق الشبكة الداخلية باستخدام بيانات دخول مزورة حصل عليها من موظف سابق، وطبع الوثائق واستخدمها لإعطاء تعليمات بيع وشراء لعملائه قبل الإعلان.",
    isUnlocked: false
  },
  {
    id: 15,
    title: "كوكبة الأحجار الكريمة",
    crimeDescription: "سُرق مجموعة من الأحجار الكريمة النادرة المعروضة في مزاد تاريخي بفندق سيميراميس الشهير. المجوهرات اختفت أثناء جلسة المعاينة العامة قبيل المزاد.",
    SvgScene: Svg15,
    occupations: ["خبير مجوهرات", "منسق مزاد", "حارس مسلح", "مصوّر مزاد"],
    culpritIndex: 0,
    clues: [
      "وُجدت بقايا صمغ شفاف على واجهة العرض الزجاجية.",
      "الحارس المسلح ذكر أنه رأى خبير المجوهرات يحمل عدسة مكبّرة غير معتادة الحجم.",
      "إحدى الأحجار الكريمة وُجدت لاحقاً على قطعة قماش مزروع بها طبقة صمغية اصطناعية."
    ],
    solution: "خبير المجوهرات هو المجرم. استغل صلاحيته في فحص الأحجار بالعدسة المكبّرة لتغطية عمليته. كانت العدسة مجوّفة في مقبضها وتحتوي على مادة صمغية سريعة الجفاف. عند فحص كل حجر، أخذ قياساً مزعوماً وألصق نسخة مزيفة بالصمغ على الواجهة وأخذ الأصلية معه.",
    isUnlocked: false
  },
  {
    id: 16,
    title: "سر الجناح المحجوب",
    crimeDescription: "سُرقت مجموعة من السجادات الفارسية النادرة من غرفة تخزين خاصة في فندق ستيلا دي ماري. السجادات تعود للقرن السادس عشر وكان مقرراً شحنها لمزاد لندن.",
    SvgScene: Svg16,
    occupations: ["مدير فندق", "موظف شحن", "مفتش جمارك", "ناقل فني"],
    culpritIndex: 1,
    clues: [
      "وُجدت ملصقات شحن مزورة على صناديق مشابهة للصناديق الرسمية للسجادات.",
      "مدير الفندق أبلغ عن موظف شحن جديد لم يتحقق منه بشكل كامل قبل اليوم السابق للحادثة.",
      "الكاميرات في مخزن الطابق السفلي سُجّلت عليها تحركات صناديق في وقت متأخر من الليل."
    ],
    solution: "موظف الشحن هو المجرم. صنع ملصقات شحن مزورة تطابق الأصلية. استبدل الصناديق الحقيقية بصناديق خالية تحمل نفس الأوزان بفضل وضع أثقال بداخلها ثم أخرج السجادات مطوية في حقيبة سفر ضخمة خلال نوبة عمله الليلية.",
    isUnlocked: false
  },
  {
    id: 17,
    title: "المخطط التلفزيوني",
    crimeDescription: "سُرقت خوادم تحتوي على أرشيف مرئي نادر لتسجيلات تاريخية من مقر قناة تلفزيونية حكومية قديمة. التسجيلات تحتوي على محادثات سياسية سرية من الستينيات.",
    SvgScene: Svg17,
    occupations: ["مذيع تلفزيوني", "مهندس بث", "أرشيفي إعلامي", "منتج برامج"],
    culpritIndex: 2,
    clues: [
      "وُجد كابل USB غير موصول في مقبس الخادم الرئيسي.",
      "مهندس البث أبلغ عن عُطل تقني مؤقت في الشبكة الداخلية دام 40 دقيقة قبل اكتشاف السرقة.",
      "ملفات النسخ الاحتياطية تُظهر وصولاً مجهولاً من داخل الشبكة ببيانات اعتماد الأرشيف في الساعة الثانية صباحاً."
    ],
    solution: "الأرشيفي الإعلامي هو المجرم. امتلك صلاحيات الوصول الكاملة إلى قواعد البيانات الأرشيفية. في الساعة الثانية صباحاً، أنشأ عطلاً اصطناعياً صغيراً في الشبكة لإلهاء المهندسين، ثم نسخ الأرشيف على خوادم خارجية مشفرة. الكابل USB ترك بطريق الخطأ.",
    isUnlocked: false
  },
  {
    id: 18,
    title: "حريق المعبد الزائف",
    crimeDescription: "أثناء حريق صغير متعمد في منطقة معبد الأقصر، اختفت تماثيل صغيرة نادرة محمية من حراسة مشددة. الحريق كان مجرد إلهاء مُدبَّر.",
    SvgScene: Svg18,
    occupations: ["حارس آثار", "باحث مصريات", "دليل سياحي", "مصلح تماثيل"],
    culpritIndex: 3,
    clues: [
      "آثار مادة مشعلة غير عادية وُجدت في منطقة الحريق بعيداً عن الشراعة العادية.",
      "باحث المصريات كان يصور المنطقة عن كثب في اللحظات التي سبقت الحريق مباشرة.",
      "التماثيل المسروقة وُجد منها اثنان بآثار مواد لحام وإصلاح حديثة يستخدمها المتخصصون."
    ],
    solution: "مصلح التماثيل هو المجرم. كان لديه وصول مشروع للتماثيل بذريعة الصيانة الدورية. أشعل الحريق الصغير في ركن بعيد باستخدام مادة تشتعل ببطء، ثم أثناء الفوضى والإخلاء، أخذ التماثيل وأودعها في صناديق أدوات الصيانة التي أخرجها كجزء طبيعي من عمله.",
    isUnlocked: false
  },
  {
    id: 19,
    title: "البريد الدبلوماسي",
    crimeDescription: "اختُلست رسائل دبلوماسية سرية من مكتبة سفارة أوروبية في القاهرة. الرسائل تكشف مفاوضات سرية بين دول ومن يمتلكها يستطيع ابتزاز حكومات.",
    SvgScene: Svg19,
    occupations: ["سكرتير دبلوماسي", "حارس السفارة", "مترجم فوري", "مسؤول الأرشيف"],
    culpritIndex: 2,
    clues: [
      "وُجد مظروف مفتوح بشمع مكسور على مكتب المحفوظات.",
      "حارس السفارة أبلغ عن سيارة متوقفة خارج البوابة لفترة طويلة أثناء الحادثة.",
      "الرسائل كُتبت بلغة مشفرة والشخص الوحيد القادر على فك شفرتها دون تدريب مسبق هو من يمتلك الكود."
    ],
    solution: "المترجم الفوري هو المجرم. كان يعمل في اجتماعات المفاوضات السرية وصار يحفظ عن ظهر قلب بعض المصطلحات الكودية. أثناء تواجده الرسمي في المبنى، فتح المظاريف بحذر باستخدام بخار ماء ثم أعاد إغلاقها. أخذ نسخاً مصورة ولم يسرق المظاريف الأصلية، لكن الشمع المكسور كشفه.",
    isUnlocked: false
  },
  {
    id: 20,
    title: "شبكة التجسس الثقافي",
    crimeDescription: "سُرقت أعمال فنية حصرية لفنانين مصريين معاصرين من صالة عرض دولية قبيل مزاد كبير. الأعمال اختفت واستُبدلت بنسخ مثالية خلال ليلة واحدة.",
    SvgScene: Svg20,
    occupations: ["فنان تشكيلي", "مدير صالة", "ناقل فني", "مصوّر صالة"],
    culpritIndex: 2,
    clues: [
      "أحد إطارات اللوحات كان مفكوكاً ثم أُعيد تثبيته بمسامير مختلفة.",
      "الفنان التشكيلي أبدى قلقاً مبالغاً فيه من عملية الشحن وطلب أن يكون هو من يراقبها.",
      "شركة النقل الفني وصل طاقمها بسيارتين بدلاً من سيارة واحدة وهو أمر غير معتاد."
    ],
    solution: "الناقل الفني هو المجرم. جاء بسيارتين إحداهما تحمل النسخ المزيفة الجاهزة. أثناء عملية التغليف التي يُشرف عليها وحده، استبدل اللوحات الأصلية بالمزيفة واحدة تلو الأخرى. فك الإطارات وأعاد تثبيتها. أودع الأصليات في السيارة الثانية التي غادرت أولاً.",
    isUnlocked: false
  },
  {
    id: 21,
    title: "الفيلم المسروق",
    crimeDescription: "سُرق فيلم سينمائي كلاسيكي غير منشور للمخرج الراحل يوسف شاهين من أستوديو القاهرة الكبير. الفيلم كان على أشرطة سيلويلويد وكان مقرراً عرضه للمرة الأولى.",
    SvgScene: Svg21,
    occupations: ["مخرج مساعد", "مهندس صوت", "مونتير", "حارس الأستوديو"],
    culpritIndex: 0,
    clues: [
      "وُجد صندوق فارغ يحمل اسم الفيلم خلف منضدة المعدات الاحتياطية.",
      "المونتير كان يتذمر علناً من أن أجره على الفيلم كان أقل مما وُعد به.",
      "الكاميرات الداخلية سجّلت شخصاً يعمل في مكتب التحرير في وقت متأخر من الليل ويستخدم قرص تخزين خارجياً."
    ],
    solution: "المخرج المساعد هو المجرم. كان يعلم بكل تفاصيل مكان تخزين الأشرطة وجدول أعمال المشروع. في الليل، أخذ الأشرطة ونسخها رقمياً على قرص تخزين خارجي ثم أعاد الأشرطة الفارغة في الصندوق الأصلي. كان ينوي بيع حقوق الفيلم لمنصة بث أجنبية.",
    isUnlocked: false
  },
  {
    id: 22,
    title: "لغز المنارة",
    crimeDescription: "اختفت خريطة بحرية تاريخية نادرة تعود للبحارة العرب في القرن العاشر من متحف الإسكندرية البحري. الخريطة مرسومة على جلد غزال ومحفوظة في وعاء رطوبة خاص.",
    SvgScene: Svg22,
    occupations: ["مدير متحف", "باحث تاريخي", "حارس متحف", "موظف ترميم"],
    culpritIndex: 1,
    clues: [
      "وُجد وعاء الرطوبة الخاص فارغاً ومغسولاً في أحد صناديق المخلفات.",
      "مدير المتحف تلقّى عرضاً مالياً مريباً من جامع خرائط نادر خلال الشهر الماضي وأخبر عنه.",
      "الباحث التاريخي طلب فحص الخريطة مرات عديدة بذريعة الدراسة الأكاديمية."
    ],
    solution: "الباحث التاريخي هو المجرم. تقدّم لصفقة مع جامع الخرائط الدولي وقبل العرض المالي الضخم. كان كل طلب فحص فرصة لدراسة نظام الحفظ والبحث عن كيفية إخراج الخريطة. نسّق مع شخص من الخارج يعلم بمواعيد فتح الصناديق لاستبدالها بنسخة فوتوغرافية محكمة على جلد قديم.",
    isUnlocked: false
  },
  {
    id: 23,
    title: "شبح القنصلية",
    crimeDescription: "سُرقت أختام رسمية نادرة وعملات ذهبية عثمانية من مخزن قنصلية تاريخية في القاهرة. الأختام يمكن استخدامها لتزوير وثائق تاريخية بمليارات.",
    SvgScene: Svg23,
    occupations: ["موظف قنصلية", "مرمم وثائق", "مفوض شرطة سابق", "موزع بريد"],
    culpritIndex: 2,
    clues: [
      "وُجد مسحوق طباشير ناعم على أرضية غرفة المخزن.",
      "موزع البريد لاحظ شخصاً يقف طويلاً أمام باب المخزن وكأنه يتذكر تخطيطاً.",
      "الأقفال القديمة للمخزن من نوع خاص يعرف أسرار فتحه المتخصصون في أنظمة الأمن القديمة."
    ],
    solution: "المفوض السابق هو المجرم. تعلّم أثناء خدمته كل أسرار الأقفال والأنظمة الأمنية القديمة في المباني التاريخية. زار القنصلية بذريعة مشاورة أمنية وتفقّد المبنى بعيون محترف. عاد ليلاً وفتح الأقفال القديمة التي يعرف منهجها تماماً. مسحوق الطباشير كان على أحذيته من تدريبه القديم.",
    isUnlocked: false
  },
  {
    id: 24,
    title: "ملفات الشركة",
    crimeDescription: "سُرقت بيانات سرية لعملاء شركة استثمارية ضخمة من قاعدة بيانات مؤمّنة. البيانات بيعت لمنافس دولي مما سبّب خسائر فادحة.",
    SvgScene: Svg24,
    occupations: ["مدير تقنية معلومات", "محلل بيانات", "موظف مبيعات", "مراجع داخلي"],
    culpritIndex: 1,
    clues: [
      "وُجد برنامج تجسس صغير مثبت على جهاز كمبيوتر قسم التحليلات.",
      "موظف المبيعات لاحظ أن منافساً يعرض أسعاراً مطابقة تماماً للأسعار السرية للشركة.",
      "سجل الشبكة الداخلية يُظهر نقل ملفات كبيرة خارج الشبكة في الساعة الثالثة صباحاً."
    ],
    solution: "محلل البيانات هو المجرم. كان يمتلك صلاحية قانونية للوصول إلى كل قواعد البيانات لأغراض التحليل. ثبّت برنامج تجسس مصغّراً على جهازه الخاص يقوم بنسخ البيانات تدريجياً. في الساعة الثالثة صباحاً، جدولة مهمة آلية لرفع الملفات لخادم خارجي مشفر.",
    isUnlocked: false
  },
  {
    id: 25,
    title: "قضية النادي الملكي",
    crimeDescription: "سُرقت كأس ذهبية نادرة تاريخية من مقتنيات نادي الجزيرة الملكي تعود لعصر الخديوي. الكأس كانت معروضة في القاعة الشرفية أمام مئات الأعضاء.",
    SvgScene: Svg25,
    occupations: ["مدير النادي", "نادل حفلات", "موظف استقبال", "شيف مطبخ"],
    culpritIndex: 1,
    clues: [
      "وُجدت بقع من صنّاجة الطعام على منصة العرض الزجاجية.",
      "مدير النادي لاحظ نادل جديداً لم يكن يعرف ترتيب قاعة العرض جيداً في البداية.",
      "الكاميرات سجّلت طاولة خدمة متوقفة أمام منصة العرض لمدة تسع دقائق وهو أطول بكثير من المعتاد."
    ],
    solution: "نادل الحفلات هو المجرم. أوقف طاولة الخدمة المتحركة أمام منصة العرض بحيث تحجب الكاميرا. خلال تلك الدقائق التسع وبينما كان زميله يلهي المدير بسؤال، فتح منصة العرض باستخدام مفتاح مقلّد وأخذ الكأس. البقع دليل على سقوط صينية صغيرة أثناء الإخفاء.",
    isUnlocked: false
  },
  {
    id: 26,
    title: "وثيقة المعهد السري",
    crimeDescription: "سُرق مخطط علمي سري لاختراع هام من مخبر معهد بحثي حكومي رفيع. المخطط كان في مرحلة التجريب النهائية وكان يمثل سنوات من البحث.",
    SvgScene: Svg26,
    occupations: ["باحث علمي", "مساعد مختبر", "مراجع علمي", "أمين مخبر"],
    culpritIndex: 0,
    clues: [
      "وُجدت آثار حبر طابعة سرية في سلة المهملات.",
      "مساعد المختبر أخبر أنه رأى الباحث يعمل وحيداً بعد منتصف الليل وهو أمر غير معتاد.",
      "أحد ملفات الكمبيوتر استُنسخ بجهاز تخزين خارجي وهو ما يظهر في سجل النظام تلقائياً."
    ],
    solution: "الباحث العلمي هو المجرم. تلقّى عرضاً مالياً ضخماً من شركة دولية منافسة. بعد منتصف الليل حين يخلو المعهد، طبع النسخة الكاملة للمخطط وصوّرها على جهاز تخزين خارجي يخفيه في قلمه. ورقة الطباعة التي نسي حرقها انتهت في سلة المهملات.",
    isUnlocked: false
  },
  {
    id: 27,
    title: "سيمفونية الاختفاء",
    crimeDescription: "سُرقت نوتة موسيقية مخطوطة نادرة للموسيقار المصري الكبير عبد الوهاب بخط يده من دار الأوبرا المصرية. النوتة تحتوي على مقطوعة لم تُسجّل قط.",
    SvgScene: Svg27,
    occupations: ["عازف أوركسترا", "مدير موسيقى", "مصلح آلات", "مصمم صوت"],
    culpritIndex: 2,
    clues: [
      "وُجدت قطعة صغيرة من ورق الموسيقى القديم ممزقة خلف خزانة النوتات.",
      "عازف الأوركسترا الأول كان يسأل دائماً عن تاريخ النوتات المخطوطة وأين تُخزن.",
      "الخزانة المحتوية على النوتات النادرة تُفتح بمفتاح خاص ويُوجد نسخة منه فقط لمن يحتاجه للصيانة."
    ],
    solution: "مصلح الآلات هو المجرم. كان يمتلك نسخة من مفتاح الخزانة بصفته مسؤول الصيانة. فتح الخزانة أثناء صيانة آلة قريبة وأخذ النوتة. القطعة الممزقة سقطت منه عند الإخراج المتسرع. كان ينوي بيعها لمزاد دولي متخصص في التراث الموسيقي.",
    isUnlocked: false
  },
  {
    id: 28,
    title: "شفرة الأرصاد",
    crimeDescription: "سُرقت بيانات أرصاد جوية سرية للغاية من قاعدة بيانات مركز الأرصاد الجوية المصري. البيانات تتعلق بمناطق عسكرية حساسة ويمكن استخدامها لأغراض استراتيجية.",
    SvgScene: Svg28,
    occupations: ["عالم أرصاد", "مبرمج بيانات", "ضابط ارتباط", "محلل مناخي"],
    culpritIndex: 0,
    clues: [
      "سجل الدخول يُظهر وصولاً إلى قواعد البيانات المقيدة بصلاحيات غير معتادة.",
      "المبرمج لاحظ استعلامات SQL غريبة على قواعد البيانات أثناء المراجعة الدورية.",
      "البيانات المسروقة تتضمن حسابات معقدة لا يفهمها إلا متخصص في فيزياء الغلاف الجوي."
    ],
    solution: "عالم الأرصاد هو المجرم. كان يمتلك صلاحيات الوصول الكاملة لجميع قواعد البيانات العلمية بحكم منصبه. كتب استعلامات SQL خاصة لاستخراج البيانات المقيدة بشكل متدرج وغير لافت. صدّر البيانات في صورة ملفات ضغط مشفرة يرسلها عبر شبكة مخفية.",
    isUnlocked: false
  },
  {
    id: 29,
    title: "خاتم الفرعون",
    crimeDescription: "سُرق خاتم فرعوني أصيل يُعتقد أنه كان ملكاً للفرعون رمسيس الثاني من قبو خاص أسفل المتحف المصري الكبير. الخاتم اختفى دون كسر أي من أنظمة الحماية.",
    SvgScene: Svg29,
    occupations: ["أثري متقاعد", "موظف قبو", "خبير ترميم", "مفتش أمن"],
    culpritIndex: 0,
    clues: [
      "وُجدت آثار طين جاف غير عادي قرب الخزنة الزجاجية، مختلف عن تربة المنطقة.",
      "موظف القبو أخبر أن مفتش الأمن غيّر نظام دوريات القبو فجأة قبل يومين من الحادثة.",
      "الخاتم الموضوع في مكانه لاحقاً هو نسخة إعادة إنتاج دقيقة تتطلب عقوداً من الخبرة في فن الصياغة الفرعونية."
    ],
    solution: "الأثري المتقاعد هو المجرم. أمضى عمره يدرس هذا الخاتم تحديداً وكان قادراً على صنع نسخة طبق الأصل. عرف كل نقطة ضعف في المبنى القديم وأوقات الدوريات. دخل عبر نفق جانبي مهجور قديم يعرف وجوده من أبحاثه وأخرج الخاتم الأصيل وترك النسخة الزائفة.",
    isUnlocked: false
  },
  {
    id: 30,
    title: "أسرار دار الوثائق",
    crimeDescription: "سُرقت وثائق حكومية سرية بالغة الأهمية تتعلق بحدود دولية محتملة من أرشيف دار الوثائق القومية. الوثائق مصنفة سرية للغاية وأي تسريب قد يشعل أزمة دبلوماسية.",
    SvgScene: Svg30,
    occupations: ["مدير أرشيف", "موظف تصنيف", "باحث قانوني", "مراسل صحفي"],
    culpritIndex: 3,
    clues: [
      "وُجد جهاز تصوير مصغّر في أحد أقلام الحبر المتروكة على منضدة الاطلاع.",
      "الباحث القانوني تقدّم بطلبات اطلاع على وثائق غير ذات صلة ببحثه القانوني مما لفت الانتباه.",
      "نشر موقع إخباري دولي تقريراً يحتوي على معلومات لا يمكن معرفتها إلا بالاطلاع على تلك الوثائق بالذات."
    ],
    solution: "المراسل الصحفي هو المجرم. حصل على تصريح اطلاع بذريعة تقرير تاريخي ثقافي. أخفى كاميرا مصغّرة في قلم حبر فاخر وصوّر الوثائق السرية صفحة صفحة. لم يأخذ الوثائق الأصلية لتفادي الاكتشاف الفوري. القلم المتروك كان خطأه الوحيد.",
    isUnlocked: false
  }
];
