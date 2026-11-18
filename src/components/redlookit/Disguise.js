'use client';
import React, { useState } from 'react';

// Made-up sample posts, used to show how one Reddit post maps onto an email.
const POSTS = [
  { sub: 'r/AskReddit', title: 'What’s a small skill everyone should learn?', author: 'quiet_otter', score: 18432, comments: 6120 },
  { sub: 'r/aww', title: 'My cat has decided the keyboard is her bed now', author: 'meowmaster', score: 32110, comments: 412 },
  { sub: 'r/todayilearned', title: 'TIL octopuses have three hearts', author: 'deep_blue_fact', score: 45201, comments: 1890 },
  { sub: 'r/webdev', title: 'I built a site that makes Reddit look like email', author: 'one-loop', score: 9050, comments: 734 },
];

const initials = (sub) => sub.replace('r/', '').replace(/[a-z]/g, '').slice(0, 2) || sub.slice(2, 4).toUpperCase();
const COLORS = ['#c239b3', '#0f6cbd', '#13a10e', '#ca5010'];

export default function Disguise() {
  const [mode, setMode] = useState('outlook');
  const [open, setOpen] = useState(0);
  const isOutlook = mode === 'outlook';
  const p = POSTS[open];

  return (
    <div className="ub-figure rl-disguise">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="View">
          <button type="button" role="tab" aria-selected={!isOutlook} className={`ub-tab ${!isOutlook ? 'is-on' : ''}`} onClick={() => setMode('reddit')}>What you’re reading</button>
          <button type="button" role="tab" aria-selected={isOutlook} className={`ub-tab ${isOutlook ? 'is-on' : ''}`} onClick={() => setMode('outlook')}>What your boss sees</button>
        </div>
      </div>

      <div className={`rl-window ${isOutlook ? 'is-outlook' : 'is-reddit'}`}>
        <div className="rl-window-top">
          {isOutlook ? (
            <>
              <span className="rl-app">Outlook</span>
              <span className="rl-search">Search subreddit</span>
            </>
          ) : (
            <>
              <span className="rl-app rl-app-reddit">reddit</span>
              <span className="rl-search">Search Reddit</span>
            </>
          )}
        </div>
        <div className="rl-window-body">
          <aside className="rl-folders">
            {isOutlook ? (
              <>
                <p className="rl-folder-h">Favourites</p>
                <p className="rl-folder is-on">Inbox</p>
                <p className="rl-folder">Drafts</p>
                <p className="rl-folder">Sent Items</p>
                <p className="rl-folder-h">Your Subreddits</p>
                {POSTS.slice(0, 3).map((x) => <p key={x.sub} className="rl-folder">{x.sub.replace('r/', '')}</p>)}
              </>
            ) : (
              <>
                <p className="rl-folder-h">Feeds</p>
                <p className="rl-folder is-on">Popular</p>
                <p className="rl-folder-h">Communities</p>
                {POSTS.map((x) => <p key={x.sub} className="rl-folder">{x.sub}</p>)}
              </>
            )}
          </aside>

          <div className="rl-list">
            {POSTS.map((x, i) => (
              <button key={x.title} type="button" className={`rl-row ${open === i ? 'is-on' : ''}`} onClick={() => setOpen(i)}>
                {isOutlook ? (
                  <>
                    <span className="rl-avatar" style={{ background: COLORS[i] }}>{initials(x.sub)}</span>
                    <span className="rl-row-text">
                      <strong>{x.title}</strong>
                      <span>{x.sub}</span>
                      <span className="rl-row-meta">⇧ {x.score.toLocaleString()} ⇩</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="rl-votes">▲<b>{(x.score / 1000).toFixed(1)}k</b>▼</span>
                    <span className="rl-row-text">
                      <span className="rl-row-sub">{x.sub} · u/{x.author}</span>
                      <strong>{x.title}</strong>
                      <span className="rl-row-meta">💬 {x.comments.toLocaleString()} comments</span>
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="rl-read" key={`${mode}-${open}`}>
            {isOutlook ? (
              <>
                <h4>{p.title}</h4>
                <div className="rl-mail-from">
                  <span className="rl-avatar" style={{ background: COLORS[open] }}>{initials(p.sub)}</span>
                  <span>
                    <strong>{p.author}</strong> &lt;{p.author.replace(/_/g, '')}@securemail.org&gt;
                    <em>To: you · {p.comments.toLocaleString()} replies</em>
                  </span>
                </div>
                <p className="rl-mail-body">Re: {p.title}<br />Looks like a perfectly normal work email.</p>
              </>
            ) : (
              <>
                <p className="rl-row-sub">{p.sub} · Posted by u/{p.author}</p>
                <h4>{p.title}</h4>
                <p className="rl-mail-body">▲ {p.score.toLocaleString()} · 💬 {p.comments.toLocaleString()} comments</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="rl-map" aria-label="How Reddit maps to email">
        {[
          ['Subreddit', 'Folder in the sidebar'],
          ['Post', 'Email in the inbox'],
          ['Post title', 'Subject line'],
          ['Username', 'Sender with a fake address'],
          ['Comments', 'A reply thread'],
        ].map(([a, b]) => (
          <div key={a}><span>{a}</span><i>→</i><span>{b}</span></div>
        ))}
      </div>
    </div>
  );
}
