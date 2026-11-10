import type { ErDiagramDef } from '@/components/diagrams/erd-types';

/** ভূমিকা অধ্যায়ের ছোট্ট ERD: Customer 1—N Order, Order M—N Product (quantity সহ) */
export const leduMiniErd: ErDiagramDef = {
  title: 'লেদু মার্টের ছোট ERD: কাস্টমার, অর্ডার ও পণ্য',
  entities: [
    {
      id: 'customer',
      name: 'Customer',
      x: 170,
      y: 230,
      attrs: [
        { name: 'customer_id', kind: 'key' },
        { name: 'name' },
        { name: 'phone' },
        { name: 'address', kind: 'composite', children: [{ name: 'area' }, { name: 'city' }] },
      ],
      cf: { x: 150, y: 120 },
    },
    {
      id: 'order',
      name: 'Order',
      x: 600,
      y: 230,
      attrs: [{ name: 'order_id', kind: 'key' }, { name: 'order_date' }, { name: 'status' }],
      cf: { x: 480, y: 120 },
    },
    {
      id: 'product',
      name: 'Product',
      x: 1030,
      y: 230,
      attrs: [{ name: 'product_id', kind: 'key' }, { name: 'name' }, { name: 'price' }],
      cf: { x: 860, y: 120 },
    },
  ],
  rels: [
    {
      id: 'places',
      name: 'places',
      x: 385,
      y: 230,
      links: [
        { entity: 'customer', card: '1' },
        { entity: 'order', card: 'N', total: true },
      ],
    },
    {
      id: 'contains',
      name: 'contains',
      x: 815,
      y: 230,
      links: [
        { entity: 'order', card: 'M', total: true },
        { entity: 'product', card: 'N' },
      ],
      attrs: [{ name: 'quantity' }],
      cf: { x: 670, y: 330 },
    },
  ],
};

/* ───────────── অধ্যায় ৫: অ্যাট্রিবিউটের ধরন ───────────── */
export const attrKindsErd: ErDiagramDef = {
  title: 'Customer এন্টিটির সব ধরনের অ্যাট্রিবিউট',
  entities: [
    {
      id: 'c',
      name: 'Customer',
      x: 300,
      y: 200,
      attrs: [
        { name: 'customer_id', kind: 'key' },
        { name: 'name' },
        { name: 'phone', kind: 'multi' },
        { name: 'address', kind: 'composite', children: [{ name: 'area' }, { name: 'city' }] },
        { name: 'joined_on' },
        { name: 'tenure_days', kind: 'derived' },
        { name: 'email', nullable: true },
      ],
    },
  ],
  rels: [],
};

/* ধাপ ১: শুধু এন্টিটি (অধ্যায় ৫) */
export const leduStep5: ErDiagramDef = {
  title: 'ধাপ ১, লেদু মার্টের মূল এন্টিটি: Customer, Order, Product',
  entities: [
    {
      id: 'c',
      name: 'Customer',
      x: 120,
      y: 160,
      attrs: [{ name: 'customer_id', kind: 'key' }, { name: 'name' }, { name: 'phone' }],
    },
    {
      id: 'o',
      name: 'Order',
      x: 520,
      y: 160,
      attrs: [{ name: 'order_id', kind: 'key' }, { name: 'order_date' }, { name: 'status' }],
    },
    {
      id: 'p',
      name: 'Product',
      x: 920,
      y: 160,
      attrs: [{ name: 'product_id', kind: 'key' }, { name: 'name' }, { name: 'price' }],
    },
  ],
  rels: [],
};

/* ───────────── অধ্যায় ৬ ───────────── */
export const rel11Erd: ErDiagramDef = {
  title: 'রাইডার ও বাইক: ১:১ সম্পর্ক',
  entities: [
    {
      id: 'r',
      name: 'Rider',
      x: 120,
      y: 160,
      attrs: [{ name: 'rider_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'b',
      name: 'Bike',
      x: 620,
      y: 160,
      attrs: [{ name: 'bike_no', kind: 'key' }, { name: 'model' }],
    },
  ],
  rels: [
    {
      id: 'rides',
      name: 'rides',
      x: 370,
      y: 160,
      links: [
        { entity: 'r', card: '1', total: true },
        { entity: 'b', card: '1' },
      ],
    },
  ],
};

export const relUnaryErd: ErDiagramDef = {
  title: 'Employee ও তার ম্যানেজার: unary (recursive) সম্পর্ক',
  entities: [
    {
      id: 'e',
      name: 'Employee',
      x: 300,
      y: 330,
      attrs: [{ name: 'employee_id', kind: 'key' }, { name: 'name' }, { name: 'salary' }],
    },
  ],
  rels: [
    {
      id: 'sup',
      name: 'supervises',
      x: 300,
      y: 150,
      links: [
        { entity: 'e', card: '1', role: 'manager' },
        { entity: 'e', card: 'N', role: 'subordinate' },
      ],
    },
  ],
};

export const relTernaryErd: ErDiagramDef = {
  title: 'Supplier–Product–Store: ternary সম্পর্ক',
  entities: [
    {
      id: 's',
      name: 'Supplier',
      x: 120,
      y: 120,
      attrs: [{ name: 'supplier_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'p',
      name: 'Product',
      x: 720,
      y: 120,
      attrs: [{ name: 'product_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 't',
      name: 'Store',
      x: 420,
      y: 470,
      attrs: [{ name: 'store_id', kind: 'key' }, { name: 'city' }],
    },
  ],
  rels: [
    {
      id: 'sup',
      name: 'supplies',
      x: 420,
      y: 230,
      links: [
        { entity: 's', card: 'M' },
        { entity: 'p', card: 'N' },
        { entity: 't', card: 'N' },
      ],
      attrs: [{ name: 'quantity' }, { name: 'supply_date' }],
    },
  ],
};

export const weakEntityErd: ErDiagramDef = {
  title: 'Order ও তার Order_Item: weak entity ও identifying relationship',
  entities: [
    {
      id: 'o',
      name: 'Order',
      x: 140,
      y: 170,
      attrs: [{ name: 'order_id', kind: 'key' }, { name: 'order_date' }],
    },
    {
      id: 'i',
      name: 'Order_Item',
      x: 640,
      y: 170,
      weak: true,
      attrs: [{ name: 'line_no', kind: 'partial' }, { name: 'quantity' }, { name: 'unit_price' }],
    },
  ],
  rels: [
    {
      id: 'has',
      name: 'has',
      x: 390,
      y: 170,
      identifying: true,
      links: [
        { entity: 'o', card: '1' },
        { entity: 'i', card: 'N', total: true },
      ],
    },
  ],
};

/** ধাপ ২: অধ্যায় ৬ শেষে, সম্পর্কসহ মূল গঠন */
export const leduStep6: ErDiagramDef = {
  title: 'ধাপ ২, Customer, Order, Product, Category, Supplier ও তাদের সম্পর্ক',
  entities: [
    {
      id: 'c',
      name: 'Customer',
      x: 90,
      y: 330,
      attrs: [{ name: 'customer_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'o',
      name: 'Order',
      x: 480,
      y: 330,
      attrs: [{ name: 'order_id', kind: 'key' }, { name: 'order_date' }],
    },
    {
      id: 'p',
      name: 'Product',
      x: 480,
      y: 40,
      attrs: [{ name: 'product_id', kind: 'key' }, { name: 'name' }, { name: 'price' }],
    },
    {
      id: 'k',
      name: 'Category',
      x: 90,
      y: 40,
      attrs: [{ name: 'category_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 's',
      name: 'Supplier',
      x: 870,
      y: 40,
      attrs: [{ name: 'supplier_id', kind: 'key' }, { name: 'name' }],
    },
  ],
  rels: [
    {
      id: 'places',
      name: 'places',
      x: 285,
      y: 330,
      links: [
        { entity: 'c', card: '1' },
        { entity: 'o', card: 'N', total: true },
      ],
    },
    {
      id: 'contains',
      name: 'contains',
      x: 480,
      y: 185,
      links: [
        { entity: 'o', card: 'M', total: true },
        { entity: 'p', card: 'N' },
      ],
      attrs: [{ name: 'quantity' }],
    },
    {
      id: 'in',
      name: 'belongs_to',
      x: 285,
      y: 40,
      links: [
        { entity: 'k', card: '1' },
        { entity: 'p', card: 'N', total: true },
      ],
    },
    {
      id: 'sup',
      name: 'supplies',
      x: 675,
      y: 40,
      links: [
        { entity: 's', card: '1' },
        { entity: 'p', card: 'N', total: true },
      ],
    },
  ],
};

/* ───────────── অধ্যায় ৭: EER ───────────── */
export const eerEmployeeErd: ErDiagramDef = {
  title: 'Employee-এর specialization: Rider, Store_Manager, Support_Agent (disjoint, partial)',
  entities: [
    {
      id: 'e',
      name: 'Employee',
      x: 420,
      y: 60,
      attrs: [{ name: 'employee_id', kind: 'key' }, { name: 'name' }, { name: 'salary' }],
    },
    { id: 'r', name: 'Rider', x: 120, y: 330, attrs: [{ name: 'bike_no' }] },
    { id: 'm', name: 'Store_Manager', x: 420, y: 330, attrs: [{ name: 'bonus' }] },
    { id: 's', name: 'Support_Agent', x: 720, y: 330, attrs: [{ name: 'shift' }] },
  ],
  rels: [],
  isas: [{ id: 'sp', parent: 'e', children: ['r', 'm', 's'], kind: 'd', x: 420, y: 200 }],
};
