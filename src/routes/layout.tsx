import { Slot, component$ } from "@builder.io/qwik";
// import Header from "../components/header/header";
// import Footer from "../components/footer/footer";

export default component$(() => {
  return (
    <>
      <main class="min-h-screen flex flex-col">
        <Slot />
      </main>
    </>
  );
});
