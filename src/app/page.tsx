import Link from "next/link";

export default function Home() {
  return (
    <button className="bg-amber-300 p-4 rounded-2xl">
      <Link className="text-black text-lg font-bold" href="/categories">Pick Category</Link>
    </button>
  );
}
