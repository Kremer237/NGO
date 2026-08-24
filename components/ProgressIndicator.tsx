export default function ProgressIndicator({
  raisedLabel,
  goalLabel,
  pendingNote,
}: {
  raisedLabel: string;
  goalLabel: string;
  pendingNote: string;
}) {
  return (
    <div className="border border-border bg-surface p-6">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full w-0 bg-ochre" />
      </div>
      <p className="mt-3 text-sm text-slate">{pendingNote}</p>
    </div>
  );
}
