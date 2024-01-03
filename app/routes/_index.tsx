import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { PlusCircleIcon, PlusIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="gap-y-3">
      <h1 className="text-center">Start Creating Your Notes </h1>

      <Link to={'/create-form'} >
        <button >
          <PlusCircleIcon className="hover:animate-pulse" />
        </button>
      </Link>
    </div>
  );
}
