type AdSlotProps = {
  label?: string;
  compact?: boolean;
};

export default function AdSlot({ label = "AdSense ready slot", compact = false }: AdSlotProps) {
  return (
    <div className={`ad-slot ${compact ? "ad-slot-compact" : ""}`}>
      <span>Advertisement</span>
      <strong>{label}</strong>
      <p>Replace this placeholder with your Google AdSense unit before deployment.</p>
    </div>
  );
}
