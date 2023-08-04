import { useAbout } from "@/routes";
import { component$ } from "@builder.io/qwik";
import { StyledNotionClientRenderer } from "./notion/styled-react-wrapper";

export const About = component$(() => {
  const about = useAbout();
  return (
    <div class="max-w-xl mt-10 mx-auto">
      <h4 class="text-xl font-display">{about.value.title}</h4>
      <StyledNotionClientRenderer recordMap={about.value.data} />
    </div>
  );
});
