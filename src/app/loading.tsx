import Image from "next/image";

export default function Loading() {
  return (
    <main className="route-loading" aria-live="polite" aria-busy="true">
      <div className="route-loading-mark">
        <Image src="/ceasiun-logo.svg" alt="" width={52} height={52} priority />
      </div>
      <p className="eyebrow">Ceasiun</p>
      <p className="route-loading-label">Loading page</p>
      <div className="route-loading-bar" aria-hidden="true"><span /></div>
    </main>
  );
}
