import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import Header from "../components/header/header";
import { Title } from "./typography/title";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Header,
    name: "Header",
    inputs: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "subtitle",
        type: "string",
      },
    ],
  },
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
