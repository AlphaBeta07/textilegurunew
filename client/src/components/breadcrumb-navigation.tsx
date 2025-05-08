import { Link } from 'wouter';
import { Home, ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  id: number;
  name: string;
  path: string;
};

type BreadcrumbNavigationProps = {
  items: {
    program?: BreadcrumbItem;
    subject?: BreadcrumbItem;
    chapter?: BreadcrumbItem;
  };
};

export function BreadcrumbNavigation({ items }: BreadcrumbNavigationProps) {
  const { program, subject, chapter } = items;

  return (
    <section className="mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/">
              <a className="inline-flex items-center text-sm font-medium text-primary">
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
            </Link>
          </li>

          {program && (
            <li>
              <div className="flex items-center">
                <ChevronRight className="text-gray-400 mx-2 w-4 h-4" />
                <Link href={program.path}>
                  <a className="text-sm font-medium text-primary">Programs</a>
                </Link>
              </div>
            </li>
          )}

          {subject && (
            <li>
              <div className="flex items-center">
                <ChevronRight className="text-gray-400 mx-2 w-4 h-4" />
                <Link href={subject.path}>
                  <a className="text-sm font-medium text-primary">
                    {subject.name}
                  </a>
                </Link>
              </div>
            </li>
          )}

          {chapter && (
            <li>
              <div className="flex items-center">
                <ChevronRight className="text-gray-400 mx-2 w-4 h-4" />
                <Link href={chapter.path}>
                  <a className="text-sm font-medium text-primary">
                    {chapter.name}
                  </a>
                </Link>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </section>
  );
}
