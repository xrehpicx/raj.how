import { component$ } from "@builder.io/qwik";
// import { QwikLogo } from "../icons/qwik";

export default component$((props: { name: string; subtitle: string }) => {
  return (
    <header class="pt-[20vh] container max-w-xl mx-auto flex-1">
      <h4 class="font-bold">{props.name}</h4>
      <p>{props.subtitle}</p>
    </header>
  );
});
