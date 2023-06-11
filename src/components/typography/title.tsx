import { component$ } from "@builder.io/qwik";

export const Title = component$(({ title }: { title: string }) => {
  return (
    <div class="border-b border-white/20 mb-1">
      <span class="font-sans font-bold">{title}</span>
    </div>
  );
});
