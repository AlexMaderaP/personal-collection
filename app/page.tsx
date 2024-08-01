import { title, subtitle } from "@/components/primitives";

export default function Home() {
  console.log("hola");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block  text-center justify-center">
        <h1 className={title()}>Create </h1>
        <h1 className={title({ color: "violet" })}>Custom</h1>
        <h1 className={title()}> Collections</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Here I will display the created collections to everyone
        </h2>
      </div>
    </section>
  );
}
