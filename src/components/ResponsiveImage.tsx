import type { CSSProperties, ImgHTMLAttributes } from "react";
import manifestData from "@/data/image-variants.generated.json" with { type: "json" };

type ManifestEntry = {
  width: number;
  height: number;
  variants: { src: string; width: number; height: number }[];
};

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

const manifest = manifestData as Record<string, ManifestEntry>;

export function ResponsiveImage({ src, alt, width, height, fill = false, priority = false, sizes, className, style, ...props }: ResponsiveImageProps) {
  const entry = manifest[src];
  const srcSet = entry?.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
  const imageStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : style ?? {};

  return (
    // Variants and srcset are generated at build time for the static export.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={fill ? undefined : width ?? entry?.width}
      height={fill ? undefined : height ?? entry?.height}
      className={className}
      style={imageStyle}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
