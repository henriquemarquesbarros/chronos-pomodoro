import { Link } from 'react-router';

type RouterLinkProps = React.ComponentProps<'a'> & {
  href: string;
  children: React.ReactNode;
};

export function RouterLink({ children, href, ...props }: RouterLinkProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
