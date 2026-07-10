export type SortMode = "newest" | "name" | "role" | "company";

type SortDropdownProps = {
  value: SortMode;
  onChange: (value: SortMode) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="gallery-select-label">
      <span className="sr-only">Sort portfolios</span>
      <select
        aria-label="Sort portfolios"
        className="gallery-select"
        onChange={(event) => onChange(event.target.value as SortMode)}
        value={value}
      >
        <option value="newest">Newest</option>
        <option value="name">Name</option>
        <option value="role">Role</option>
        <option value="company">Company</option>
      </select>
    </label>
  );
}
