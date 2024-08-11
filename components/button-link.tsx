import { button } from "@nextui-org/theme";

import { Link } from "@/navigation";

function ButtonLink({ href, message }: { href: string; message: string }) {
  return (
    <Link
      className={button({
        color: "primary",
        variant: "solid",
      })}
      href={href}
    >
      {message}
    </Link>
  );
}

export default ButtonLink;
