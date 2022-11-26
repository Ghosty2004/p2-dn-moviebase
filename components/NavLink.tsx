import Link from "next/link";
import { useRouter } from "next/router";

type NavLinkProps = {
    href: string;
    children: React.ReactNode
};

export default function NavLink(props: NavLinkProps): JSX.Element {
    const router = useRouter();
    return (
        <Link href={props.href} style={{
            background: `rgba(0, 0, 0, ${router.pathname === props.href ? 0.3 : 0.1})`,
            borderRadius: '10px'
        }}>{props.children}
        </Link>
    );
};