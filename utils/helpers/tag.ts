type ColorType = "primary" | "secondary" | "success" | "warning" | "danger";

const colors: ColorType[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

export function getRandomColor(): ColorType {
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}
