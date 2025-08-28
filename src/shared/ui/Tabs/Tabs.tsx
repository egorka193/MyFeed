import styles from "./tabs.module.css";

interface Tab {
  id: string; 
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

export const Tabs = ({ tabs, activeId, onChange }: TabsProps) => {
  return (
    <div className={styles.uiTabs}>
      <div className={styles.uiTabs__list}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            className={[
              styles.uiTabs__button,
              activeId === tab.id ? styles.active : "",
              i === 0 ? styles.left : i === tabs.length - 1 ? styles.right : "",
            ].join(" ")}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
