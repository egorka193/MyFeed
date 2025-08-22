import { useState, type ReactNode } from "react";
import "./Tabs.css";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [active, setActive] = useState(0);

  return (
    <div className="ui-tabs">
      <div className="ui-tabs__list">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`ui-tabs__button ${active === i ? "active" : ""} ${
              i === 0 ? "left" : i === tabs.length - 1 ? "right" : ""
            }`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
