import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import { Title } from "./typography/title";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Title,
    name: "Title",
    inputs: [
      {
        name: "title",
        type: "string",
      },
    ],
  },
];
