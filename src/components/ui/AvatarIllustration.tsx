export default function AvatarIllustration() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Glow ring */}
        <circle cx="160" cy="160" r="140" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="0 160 160" to="360 160 160" dur="30s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="160" r="118" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.2">
          <animateTransform attributeName="transform" type="rotate" from="360 160 160" to="0 160 160" dur="20s" repeatCount="indefinite" />
        </circle>

        {/* Background circle */}
        <circle cx="160" cy="160" r="100" fill="#111113" stroke="#3b82f6" strokeWidth="0.5" opacity="0.8" />

        {/* Glow center */}
        <circle cx="160" cy="160" r="100" fill="url(#glowGrad)" opacity="0.15" />

        {/* Body */}
        <rect x="120" y="195" width="80" height="55" rx="16" fill="#1e293b" />
        <rect x="125" y="200" width="70" height="45" rx="14" fill="#0f172a" />

        {/* Shirt detail */}
        <rect x="148" y="205" width="24" height="3" rx="1.5" fill="#3b82f6" opacity="0.6" />
        <rect x="153" y="211" width="14" height="2" rx="1" fill="#3b82f6" opacity="0.3" />

        {/* Neck */}
        <rect x="150" y="183" width="20" height="16" rx="6" fill="#fbbf80" />

        {/* Head */}
        <ellipse cx="160" cy="163" rx="32" ry="34" fill="#fbbf80" />

        {/* Hair */}
        <ellipse cx="160" cy="133" rx="32" ry="14" fill="#1c1917" />
        <rect x="128" y="133" width="8" height="18" rx="4" fill="#1c1917" />
        <rect x="184" y="133" width="8" height="14" rx="4" fill="#1c1917" />
        <ellipse cx="160" cy="130" rx="28" ry="10" fill="#292524" />

        {/* Eyes */}
        <ellipse cx="148" cy="162" rx="5" ry="5.5" fill="white" />
        <ellipse cx="172" cy="162" rx="5" ry="5.5" fill="white" />
        <circle cx="149.5" cy="163" r="3" fill="#1e293b" />
        <circle cx="173.5" cy="163" r="3" fill="#1e293b" />
        <circle cx="150.5" cy="161.5" r="1" fill="white" />
        <circle cx="174.5" cy="161.5" r="1" fill="white" />

        {/* Eyebrows */}
        <path d="M143 155 Q148 152 153 155" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M167 155 Q172 152 177 155" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Smile */}
        <path d="M151 173 Q160 180 169 173" stroke="#c2855a" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Laptop */}
        <rect x="108" y="228" width="104" height="62" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="0.5" />
        <rect x="113" y="232" width="94" height="50" rx="4" fill="#020617" />

        {/* Code lines on screen */}
        <rect x="119" y="238" width="30" height="2" rx="1" fill="#3b82f6" opacity="0.8" />
        <rect x="119" y="243" width="50" height="2" rx="1" fill="#06b6d4" opacity="0.6" />
        <rect x="124" y="248" width="40" height="2" rx="1" fill="#a78bfa" opacity="0.6" />
        <rect x="119" y="253" width="35" height="2" rx="1" fill="#3b82f6" opacity="0.5" />
        <rect x="124" y="258" width="55" height="2" rx="1" fill="#06b6d4" opacity="0.4" />
        <rect x="119" y="263" width="28" height="2" rx="1" fill="#a78bfa" opacity="0.5" />
        <rect x="124" y="268" width="45" height="2" rx="1" fill="#3b82f6" opacity="0.6" />

        {/* Cursor blink on screen */}
        <rect x="174" y="238" width="1.5" height="10" rx="1" fill="#3b82f6">
          <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
        </rect>

        {/* Floating badges */}
        <g>
          <rect x="32" y="120" width="52" height="22" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="0.5" />
          <text x="58" y="135" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="monospace">React</text>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="3s" repeatCount="indefinite" />
        </g>
        <g>
          <rect x="236" y="108" width="56" height="22" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.5" />
          <text x="264" y="123" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="monospace">Flutter</text>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,6;0,0" dur="4s" repeatCount="indefinite" />
        </g>
        <g>
          <rect x="40" y="210" width="58" height="22" rx="6" fill="#0f172a" stroke="#a78bfa" strokeWidth="0.5" />
          <text x="69" y="225" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace">Python</text>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,5;0,0" dur="3.5s" repeatCount="indefinite" />
        </g>
        <g>
          <rect x="230" y="205" width="60" height="22" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="0.5" />
          <text x="260" y="220" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="monospace">Node.js</text>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="2.8s" repeatCount="indefinite" />
        </g>

        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}