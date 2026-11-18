'use client';
import React, { useEffect, useMemo, useState } from 'react';

// A small comment thread in the shape Reddit's JSON returns it:
// each comment has data.replies.data.children with more comments inside.
const THREAD = [
  { id: 'a', author: 'night_owl', body: 'This is genuinely the best use of a work computer I’ve seen.', replies: [
    { id: 'b', author: 'quiet_otter', body: 'My manager walked past and nodded approvingly.', replies: [
      { id: 'c', author: 'night_owl', body: 'Peak productivity.', replies: [] },
    ] },
    { id: 'd', author: 'deep_blue_fact', body: 'Does it work on mobile?', replies: [
      { id: 'e', author: 'one-loop', body: 'Sort of! Working on it.', replies: [] },
    ] },
  ] },
  { id: 'f', author: 'meowmaster', body: 'Please add a light theme, my office is very bright.', replies: [
    { id: 'g', author: 'one-loop', body: 'Done, it’s in settings now.', replies: [] },
  ] },
];

// Order in which a depth-first recursive render visits each comment.
function walk(list, depth = 0, path = [], out = []) {
  list.forEach((c) => {
    out.push({ ...c, depth, path: [...path, c.author] });
    walk(c.replies, depth + 1, [...path, c.author], out);
  });
  return out;
}

const V1 = `function displayComments(comments, isReply = false) {
  for (let comment of comments) {
    const div = createComment(comment);
    if (isReply) div.classList.add('replied-comment');
    postSection.append(div);          // always the same parent
    if (comment.data.replies) {
      displayComments(comment.data.replies.data.children, true);
    }
  }
}`;

const V2 = `function displayCommentsRecursive(parent, comments, indent = 0) {
  for (let comment of comments) {
    const elem = createComment(comment);
    elem.style.paddingLeft = 10 * indent;
    parent.append(elem);              // append inside the parent comment
    if (comment.data.replies) {
      displayCommentsRecursive(elem, comment.data.replies.data.children, indent + 1);
    }
  }
}`;

export default function CommentTree() {
  const [version, setVersion] = useState('v2');
  const [step, setStep] = useState(null);
  const [playing, setPlaying] = useState(false);
  const order = useMemo(() => walk(THREAD), []);

  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => {
      setStep((s) => {
        const next = s === null ? 0 : s + 1;
        if (next >= order.length) { setPlaying(false); return order.length - 1; }
        return next;
      });
    }, step === null ? 50 : 900);
    return () => clearTimeout(t);
  }, [playing, step, order.length]);

  const visible = (id) => step === null || order.findIndex((c) => c.id === id) <= step;
  const current = step !== null ? order[step] : null;

  const renderV2 = (list, depth = 0) => list.map((c) => (
    visible(c.id) && (
      <div key={c.id} className={`rl-c ${current && current.id === c.id ? 'is-now' : ''}`} style={{ marginLeft: depth ? 14 : 0 }} data-depth={depth}>
        <div className="rl-c-inner">
          <span className="rl-c-author">u/{c.author}</span>
          <p>{c.body}</p>
        </div>
        {c.replies.length > 0 && <div className="rl-c-children">{renderV2(c.replies, depth + 1)}</div>}
      </div>
    )
  ));

  const renderV1 = () => order.filter((c) => visible(c.id)).map((c) => (
    <div key={c.id} className={`rl-c is-flat ${c.depth > 0 ? 'is-reply' : ''} ${current && current.id === c.id ? 'is-now' : ''}`}>
      <div className="rl-c-inner">
        <span className="rl-c-author">u/{c.author}</span>
        <p>{c.body}</p>
      </div>
    </div>
  ));

  return (
    <div className="ub-figure rl-tree">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="Version">
          <button type="button" role="tab" aria-selected={version === 'v1'} className={`ub-tab ${version === 'v1' ? 'is-on' : ''}`} onClick={() => setVersion('v1')}>2021: flat</button>
          <button type="button" role="tab" aria-selected={version === 'v2'} className={`ub-tab ${version === 'v2' ? 'is-on' : ''}`} onClick={() => setVersion('v2')}>2022: a real tree</button>
        </div>
        <div className="rl-tree-ctrl">
          <button type="button" className="ub-button" onClick={() => { setStep(null); setPlaying(true); }} disabled={playing}>
            {playing ? 'Rendering…' : 'Step through the recursion'}
          </button>
          {step !== null && !playing && <button type="button" className="ub-button ub-button-ghost" onClick={() => setStep(null)}>Show all</button>}
        </div>
      </div>

      <div className="rl-tree-grid">
        <div className="rl-thread">
          {version === 'v2' ? renderV2(THREAD) : renderV1()}
        </div>
        <div className="rl-tree-side">
          <pre className="ub-code rl-code"><code>{version === 'v1' ? V1 : V2}</code></pre>
          <div className="rl-stack">
            <p className="rl-stack-label">Call stack</p>
            {current ? (
              current.path.map((name, i) => (
                <div key={i} className="rl-frame" style={{ marginLeft: i * 10 }}>
                  {version === 'v1' ? 'displayComments' : 'displayCommentsRecursive'}(<span>{i === 0 ? 'top level' : `replies of u/${current.path[i - 1]}`}</span>, depth {i})
                </div>
              ))
            ) : (
              <p className="rl-stack-empty">Press “Step through the recursion” to watch each call.</p>
            )}
          </div>
        </div>
      </div>

      <p className="rl-tree-note">
        {version === 'v1'
          ? 'The first version did recurse, but appended every comment to the same container, so all replies ended up at one indent level and you couldn’t tell who was replying to whom.'
          : 'Appending each reply inside its parent’s element lets the DOM mirror the comment tree, so nesting comes for free, at any depth.'}
      </p>
    </div>
  );
}
