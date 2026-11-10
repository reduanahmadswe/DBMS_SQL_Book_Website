import type {
  AnchorHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
} from 'react';
import { Link } from 'react-router';
import { Answer, Callout, Dialogue, Exercise, KeyTerm, StaticCode, Summary } from './Blocks';
import { Figure } from './Figure';
import { StoryImage } from './StoryImage';
import { Quiz } from './Quiz';
import { SqlRunner } from '../playground/SqlRunner';
import { ERDiagram } from '../diagrams/ERDiagram';
import { SchemaDiagram, leduMartSchema } from '../diagrams/SchemaDiagram';
import { TableRow, TableView } from '../diagrams/TableView';
import {
  BookRoadmap,
  DataToInfo,
  DbmsLanguages,
  DbmsLayers,
  DbmsUsers,
  FileProblems,
  FileVsDbms,
} from '../diagrams/ConceptDiagrams';

import * as erdA from '@/data/erd-defs';
import * as erdB from '@/data/erd-defs-more';
import {
  DataModelShapes,
  DbmsComponents,
  KeyHierarchy,
  QueryTree,
  ThreeSchema,
  Tiers,
} from '../diagrams/ModelDiagrams';
import type { ErDiagramDef } from '../diagrams/erd-types';

const erdDefs = { ...erdA, ...erdB } as unknown as Record<string, ErDiagramDef>;

/** <Erd d="universityErd" />, নাম দিয়ে ERD সংজ্ঞা বসায় */
function Erd({ d, ...rest }: { d: string; notation?: 'chen' | 'crow'; minmax?: boolean }) {
  const def = erdDefs[d];
  if (!def) return <p>ERD পাওয়া যায়নি: {d}</p>;
  return <ERDiagram def={def} {...rest} />;
}

function LeduSchema() {
  return (
    <SchemaDiagram
      tables={leduMartSchema}
      title="লেদু মার্ট ডাটাবেসের পূর্ণ স্কিমা: ১১টি টেবিল ও তাদের foreign key সম্পর্ক"
    />
  );
}

const heading = (Tag: 'h2' | 'h3') =>
  function Heading({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
    return <Tag {...rest}>{children}</Tag>;
  };

function A({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>;
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrap">
      <table {...props} />
    </div>
  );
}

type AnyComponent = ComponentType<never>;
const cast = <T,>(c: T) => c as unknown as AnyComponent;

export const mdxComponents: Record<string, AnyComponent> = {
  h2: cast(heading('h2')),
  h3: cast(heading('h3')),
  a: cast(A),
  table: cast(Table),
  Dialogue: cast(Dialogue),
  Callout: cast(Callout),
  KeyTerm: cast(KeyTerm),
  Summary: cast(Summary),
  Exercise: cast(Exercise),
  Answer: cast(Answer),
  StaticCode: cast(StaticCode),
  Figure: cast(Figure),
  StoryImage: cast(StoryImage),
  Quiz: cast(Quiz),
  SqlRunner: cast(SqlRunner),
  ERDiagram: cast(ERDiagram),
  SchemaDiagram: cast(SchemaDiagram),
  LeduSchema: cast(LeduSchema),
  TableView: cast(TableView),
  TableRow: cast(TableRow),
  FileVsDbms: cast(FileVsDbms),
  DataToInfo: cast(DataToInfo),
  FileProblems: cast(FileProblems),
  DbmsUsers: cast(DbmsUsers),
  DbmsLanguages: cast(DbmsLanguages),
  BookRoadmap: cast(BookRoadmap),
  DbmsLayers: cast(DbmsLayers),
  Erd: cast(Erd),
  ThreeSchema: cast(ThreeSchema),
  Tiers: cast(Tiers),
  DbmsComponents: cast(DbmsComponents),
  DataModelShapes: cast(DataModelShapes),
  KeyHierarchy: cast(KeyHierarchy),
  QueryTree: cast(QueryTree),
};

export type { ReactNode };
