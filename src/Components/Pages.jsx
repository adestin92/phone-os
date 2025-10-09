import { useState, useEffect } from "react";
import "./Pages.css";

const PagesComponent = () => {
  const [activePage, setActivePage] = useState(null);
  const [draft, setDraft] = useState({ title: "", body: "" });

  const startNewPage = () => {
    setDraft({ title: "", body: "" });
    setActivePage("new");
  };

  if (activePage === null) {
    return (
      <div className="pages-content">
        <div className="button-container">
          <h1>Pages</h1>
          <button onClick={startNewPage}>Start Writing</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <textarea
        className="page-body"
        placeholder="Start typing…"
        value={draft.body}
        onChange={(e) => setDraft({ ...draft, body: e.target.value })}
      />
      <div className="page-footer">
        done
        <span class="material-symbols-outlined">
        file_save
        </span>
      </div>
    </div>
  );
};

export default PagesComponent;
