type Props = {
  className?: string;
  ariaLabel?: string;
  mask?: string;
};

const baseMaskStyle = {
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskSize: "contain",
  WebkitMaskSize: "contain",
} as const;

export default function BrandMark({ className = "", ariaLabel, mask = "/polymath-mask.png" }: Props) {
  return (
    <span
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      style={{
        ...baseMaskStyle,
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
      }}
      className={`inline-block bg-gray-800 transition-colors duration-500 ${className}`}
    />
  );
}
