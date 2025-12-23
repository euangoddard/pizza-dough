import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta property="og:site_name" content="Pizza Dough Calculator" />
      <meta property="og:title" content="Pizza Dough Calculator" />
      <meta
        property="og:description"
        content="Calculate the perfect pizza dough recipe."
      />
      <meta
        property="og:image"
        content="https://pizza-dough.euans.space/og-image.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Pizza Dough Calculator" />
      <meta
        name="twitter:description"
        content="Calculate the perfect pizza dough recipe."
      />
      <meta
        name="twitter:image"
        content="https://pizza-dough.euans.space/og-image.png"
      />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
