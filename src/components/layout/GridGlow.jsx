export default function GridGlow() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-drift-1 absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="animate-drift-2 absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent-2/15 blur-[120px]" />
      <div className="animate-drift-3 absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-accent-3/10 blur-[120px]" />
    </div>
  );
}