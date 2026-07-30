import StatsCard from "./StatsCard";

interface Props {
  published: number;
  draft: number;
  expired: number;
}

export default function StatsSection({
  published,
  draft,
  expired,
}: Props) {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      <StatsCard title="Published" value={published} />
      <StatsCard title="Draft" value={draft} />
      <StatsCard title="Expired" value={expired} />
    </section>
  );
}