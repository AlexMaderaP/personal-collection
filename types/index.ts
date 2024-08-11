import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const CustomFieldTypes = [
  "STRING",
  "INTEGER",
  "BOOLEAN",
  "TEXT",
  "DATE",
] as const;
