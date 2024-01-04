import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { PlusCircleIcon, PlusIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "NoteTaker" },
    { name: "description", content: "An Easy Way To Keep Track Of Your Notes" },
  ];
};

export default function Index() {
  return (
    <div className="gap-y-3">
      <h1 className="text-center">Start Creating Your Notes </h1>

      <Link to={'/create-form'} className="flex justify-center my-4">
        <button >
          <PlusCircleIcon height={30} className="hover:animate-pulse " />
        </button>
      </Link>
    </div>
  );
}
