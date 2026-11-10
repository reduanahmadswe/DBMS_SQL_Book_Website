/** ERD-র ডাটা-চালিত সংজ্ঞা। একই সংজ্ঞা থেকে Chen ও Crow's Foot দুটোই আঁকা হয়। */
export type AttrKind = 'simple' | 'key' | 'partial' | 'multi' | 'derived' | 'composite';

export interface ErAttr {
  name: string;
  kind?: AttrKind;
  /** composite attribute-এর উপাদান */
  children?: ErAttr[];
  /** Crow's Foot-এ FK চিহ্ন */
  fk?: boolean;
  /** NULL হতে পারে (Crow's Foot-এ দেখায়) */
  nullable?: boolean;
  /** Chen-এ নির্দিষ্ট কোণে (ডিগ্রি, 0 = ডানে, 90 = নিচে) বসাতে */
  angle?: number;
}

export interface ErEntity {
  id: string;
  name: string;
  x: number;
  y: number;
  weak?: boolean;
  attrs: ErAttr[];
  /** Crow's Foot-এর জন্য আলাদা অবস্থান (না দিলে x,y) */
  cf?: { x: number; y: number };
}

export interface ErLink {
  entity: string;
  /** 1 = এক, N/M = অনেক */
  card: '1' | 'N' | 'M';
  /** total participation (ন্যূনতম ১) */
  total?: boolean;
  role?: string;
}

export interface ErRel {
  id: string;
  name: string;
  x: number;
  y: number;
  identifying?: boolean;
  links: ErLink[];
  attrs?: ErAttr[];
  cf?: { x: number; y: number };
}

export interface ErIsa {
  id: string;
  parent: string;
  children: string[];
  /** d = disjoint, o = overlapping */
  kind: 'd' | 'o' | 'u' | 'isa';
  /** circle (EER, d/o/u) বা triangle (ক্লাসিক ISA) */
  shape?: 'circle' | 'triangle';
  /** parent-এর সাথে double line */
  total?: boolean;
  x: number;
  y: number;
}

export interface ErDiagramDef {
  title: string;
  entities: ErEntity[];
  rels: ErRel[];
  isas?: ErIsa[];
  /** Aggregation: একটি সম্পর্ক ও তার এন্টিটিগুলোকে ডটেড বাক্সে ঘিরে একটি "এন্টিটি"র মতো ব্যবহার */
  aggs?: { id: string; label?: string; rel: string; entities: string[] }[];
}
