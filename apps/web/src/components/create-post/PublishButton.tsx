interface Props {
  onPublish: () => void;
}

export default function PublishButton({
  onPublish,
}: Props) {
  return (
    <button
      onClick={onPublish}
      className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
    >
      🚀 Publish Advertisement
    </button>
  );
}