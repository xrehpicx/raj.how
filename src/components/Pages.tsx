import { useBlogs } from "@/routes";
import { component$ } from "@builder.io/qwik";

export const Pages = component$(() => {
  const blogs = useBlogs().value;
  return (
    <div class="max-w-xl mt-10 mx-auto">
      <h4 class="text-xl font-display">{blogs.title}</h4>

      <div class="grid grid-cols-2 gap-4">
        {blogs.value.map((blog) => (
          <div key={JSON.stringify(blog)}>
            <a
              href={`/story/${blog.id}`}
              target="_blank"
              class="text-sm block animate-fade-in-up font-display underline underline-offset-2"
            >
              {blog.title}
            </a>
            <p class="text-xs text-balance animate-fade-in">{blog.desc}</p>
            {/* <NRenderer styled recordMap={project.recordMap} /> */}
          </div>
        ))}
      </div>
    </div>
  );
});
