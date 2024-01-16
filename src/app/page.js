import InputField from "@/components/InputField";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center flex-col w-full gap-10 bg-zinc-900 text-gray-100">
      <h1 className="text-5xl md:text-8xl font-bold">Url Shortner</h1>

      <InputField />
    </main>
  );
}
