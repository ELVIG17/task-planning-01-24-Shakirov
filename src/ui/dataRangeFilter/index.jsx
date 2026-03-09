import styles from "./style/index.module.css";

const DEFAULT_OPTIONS = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export const DateRangeFilter = ({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
}) => {
  return (
    <div className={styles.root}>
      {options.map((opt) => {
        const active = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            className={`${styles.btn} ${active ? styles.active : ""}`}
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
