/**
 * Hasrul — the host/NPC who greets the visitor in the entry scene (ADR-0006).
 *
 * Stylised flat-vector character: short dark hair, horizontal chin patch,
 * warm open smile, charcoal polo, subtly pointed ears.
 * Hand-authored SVG — crisp at any size; re-skin once Phase-2 shared visual
 * identity (ADR-0005) lands. Distinct from the visitor's cosmetic emoji avatar.
 */

type Props = {
  size?: number;
  className?: string;
  /** Draw the framed background circle (default true). */
  framed?: boolean;
};

export function HasrulAvatar({ size = 128, className, framed = true }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Hasrul"
    >
      {framed && (
        <>
          <circle cx="100" cy="100" r="100" fill="#ece5d8" />
          <circle cx="100" cy="100" r="98" fill="none" stroke="#dcd3c2" strokeWidth="2" />
          <clipPath id="hb-clip">
            <circle cx="100" cy="100" r="100" />
          </clipPath>
        </>
      )}

      <g clipPath={framed ? 'url(#hb-clip)' : undefined}>
        {/* polo */}
        <path
          d="M28,200 C28,170 42,153 70,149 L130,149 C158,153 172,170 172,200 Z"
          fill="#3b3e43"
        />
        <path d="M100,167 L100,198" stroke="#2f3236" strokeWidth="3" />
        <circle cx="100" cy="175" r="2.6" fill="#26282c" />
        <circle cx="100" cy="189" r="2.6" fill="#26282c" />
        <path d="M83,150 L101,151 L101,170 L89,160 Z" fill="#313438" />
        <path d="M119,150 L99,151 L99,170 L111,160 Z" fill="#313438" />

        {/* neck */}
        <path d="M86,128 L86,152 Q100,160 114,152 L114,128 Z" fill="#d4a87a" />
        <path d="M86,128 Q100,142 114,128 L114,135 Q100,148 86,135 Z" fill="#c49468" />

        {/* ears */}
        <ellipse cx="57" cy="95" rx="7" ry="11" fill="#e2b88a" />
        <ellipse cx="143" cy="95" rx="7" ry="11" fill="#e2b88a" />

        {/* head */}
        <ellipse cx="100" cy="90" rx="43" ry="51" fill="#e2b88a" />

        {/* hair — full swept top with a side part, covering crown + temples */}
        <path
          d="M54,94 C49,58 66,34 100,34 C134,34 151,58 146,94 C143,81 138,74 130,70 C123,67 116,65 110,64 C106,63 103,62 100,62 C95,63 90,65 84,68 C76,72 67,79 60,89 C57,90 55,90 54,94 Z"
          fill="#1c1a19"
        />
        <path d="M114,45 C96,53 79,61 67,77" stroke="#322c28" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* eyebrows */}
        <path d="M73,79 Q82,74 91,78" stroke="#1c1a19" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M109,78 Q118,74 127,79" stroke="#1c1a19" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* eyes */}
        <path d="M76,87 Q82,82 88,87 Q82,90 76,87 Z" fill="#2a2622" />
        <path d="M112,87 Q118,82 124,87 Q118,90 112,87 Z" fill="#2a2622" />
        <circle cx="80.5" cy="86" r="1.2" fill="#fff" />
        <circle cx="116.5" cy="86" r="1.2" fill="#fff" />

        {/* nose */}
        <path d="M95,103 Q100,106 105,103" stroke="#c09060" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="96.5" cy="103" r="1" fill="#b08055" />
        <circle cx="103.5" cy="103" r="1" fill="#b08055" />

        {/* smile */}
        <path d="M85,113 Q100,120 115,113 Q110,127 100,128 Q90,127 85,113 Z" fill="#7a4646" />
        <path d="M89,114 Q100,119 111,114 Q107,122 100,122 Q93,122 89,114 Z" fill="#f8f6ef" />

        {/* chin patch — flat top, domed bottom, lighter than hair */}
        <path d="M86,133 L114,133 Q115,143 100,146 Q85,143 86,133 Z" fill="#443830" />
      </g>
    </svg>
  );
}
