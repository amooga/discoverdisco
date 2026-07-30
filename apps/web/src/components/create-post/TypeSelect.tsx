interface Props {
  value: string;
  onChange: (value: string) => void;
}

const types = [
  "offer",
  "product",
  "service",
  "event",
  "announcement",
];

export default function TypeSelect({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        Type *
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 p-3"
      >
        {types.map((type) => (
          <option
            key={type}
            value={type}
          >
            {type.charAt(0).toUpperCase() +
              type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}