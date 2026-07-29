import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
}

export default function CategoryCard({
  title,
  icon: Icon,
}: Props) {
  return (
    <button
      className="
      group
      flex
      flex-col
      items-center
      justify-center
      gap-4

      rounded-3xl
      border
      border-slate-200
      bg-white

      p-6

      transition-all
      duration-300

      hover:-translate-y-1
      hover:border-orange-400
      hover:shadow-lg
      "
    >
      <div
        className="
        rounded-2xl
        bg-orange-50
        p-4

        transition

        group-hover:bg-orange-500
        "
      >
        <Icon
          className="
          h-8
          w-8

          text-orange-600

          transition

          group-hover:text-white
          "
        />
      </div>

      <span className="font-semibold text-slate-700">
        {title}
      </span>
    </button>
  );
}