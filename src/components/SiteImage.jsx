import { useEffect, useState } from "react";
import Icon from "./Icon";

/** Image with lazy loading and an on-brand fallback for missing / broken URLs. */
export default function SiteImage({ src, alt = "", className = "", eager = false, ...rest }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  if (failed) {
    return (
      <div role="img" aria-label={alt || "Image unavailable"} className={`flex items-center justify-center bg-ice water-pattern text-aqua ${className}`}>
        <Icon name="drop" className="h-10 w-10" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} {...rest} />;
}
