export function AbstractAvatar() {
  const hexPoints = [
    [40, 4], [72, 22], [72, 58],
    [40, 76], [8, 58], [8, 22],
  ] as const

  return (
    <div className="relative w-20 h-20">
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <defs>
          <clipPath id="hex-clip">
            <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" />
          </clipPath>
        </defs>
        {/* Hex background */}
        <polygon
          points="40,4 72,22 72,58 40,76 8,58 8,22"
          fill="#0d0d18"
          stroke="#4f6ef7"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* K monogram */}
        <text
          x="40"
          y="52"
          textAnchor="middle"
          fontFamily="var(--font-cal), Inter, serif"
          fontSize="32"
          fontWeight="600"
          fill="#4f6ef7"
          fillOpacity="0.9"
        >
          K
        </text>
        {/* Corner accent dots */}
        {hexPoints.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#4f6ef7" fillOpacity="0.6" />
        ))}
      </svg>
    </div>
  )
}
