import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Email"
        className="input w-full max-w-xs"
      />
      <input
        type="password"
        placeholder="Password"
        className="input w-full max-w-xs"
      />
      <input type="text" placeholder="Name" className="input w-full max-w-xs" />
      <input
        type="text"
        placeholder="Address"
        className="input w-full max-w-xs"
      />
      <a>
        {" "}
        Already a user? <Link href="/login"> sign in here </Link>{" "}
      </a>
    </div>
  );
}
