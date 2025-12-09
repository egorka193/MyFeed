import styles from "./tabs.module.css";

interface Tab<T extends string> {
  id: T; 
  label: string;
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[];
  activeId: T;
  onChange: (id: T) => void;
}

export const Tabs = <T extends string>({ tabs, activeId, onChange }: TabsProps<T>) => {
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
