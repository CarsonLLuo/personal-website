import { useLiveTime } from '../../hooks/useLiveTime.js';

export default function LiveTime({ className = '' }) {
  const time = useLiveTime();
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return (
    <div className={`font-mono text-[11px] uppercase tracking-widest select-none sm:text-xs ${className}`}>
      <div className="mb-0.5">
        {hours}:{minutes}:{seconds}
      </div>
      <div>{time.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</div>
    </div>
  );
}
