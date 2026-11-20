import { Fragment } from 'react';

/** Renders `*word*` segments with the italic serif accent. */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <span key={i} className="serif-accent pr-[0.06em]">
            {p.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
