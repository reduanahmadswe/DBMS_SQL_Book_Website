import type { ErDiagramDef } from '@/components/diagrams/erd-types';

export const eerOverlapErd: ErDiagramDef = {
  title: 'Person-এর overlapping ও total specialization: Student, Teacher',
  entities: [
    {
      id: 'p',
      name: 'Person',
      x: 300,
      y: 60,
      attrs: [{ name: 'nid', kind: 'key' }, { name: 'name' }],
    },
    { id: 's', name: 'Student', x: 90, y: 330, attrs: [{ name: 'roll_no' }] },
    { id: 't', name: 'Teacher', x: 510, y: 330, attrs: [{ name: 'designation' }] },
  ],
  rels: [],
  isas: [{ id: 'sp', parent: 'p', children: ['s', 't'], kind: 'o', total: true, x: 300, y: 200 }],
};

export const isaTriangleErd: ErDiagramDef = {
  title: 'ক্লাসিক ISA ত্রিভুজ নোটেশন',
  entities: [
    {
      id: 'e',
      name: 'Employee',
      x: 260,
      y: 50,
      attrs: [{ name: 'employee_id', kind: 'key' }, { name: 'name' }],
    },
    { id: 'r', name: 'Rider', x: 90, y: 300, attrs: [{ name: 'bike_no' }] },
    { id: 'm', name: 'Manager', x: 430, y: 300, attrs: [{ name: 'bonus' }] },
  ],
  rels: [],
  isas: [
    { id: 'sp', parent: 'e', children: ['r', 'm'], kind: 'isa', shape: 'triangle', x: 260, y: 185 },
  ],
};

export const aggregationErd: ErDiagramDef = {
  title: 'Aggregation: Rider–Order "delivers" সম্পর্কটিকে একটি একক হিসেবে Support_Agent মনিটর করে',
  entities: [
    { id: 'r', name: 'Rider', x: 90, y: 130, attrs: [{ name: 'rider_id', kind: 'key' }] },
    { id: 'o', name: 'Order', x: 560, y: 130, attrs: [{ name: 'order_id', kind: 'key' }] },
    { id: 'a', name: 'Support_Agent', x: 330, y: 470, attrs: [{ name: 'agent_id', kind: 'key' }] },
  ],
  rels: [
    {
      id: 'del',
      name: 'delivers',
      x: 325,
      y: 130,
      links: [
        { entity: 'r', card: 'N' },
        { entity: 'o', card: 'M' },
      ],
    },
    {
      id: 'mon',
      name: 'monitors',
      x: 325,
      y: 330,
      links: [
        { entity: 'a', card: '1' },
        { entity: 'del', card: 'N' },
      ],
    },
  ],
  aggs: [{ id: 'ag', label: 'Aggregation: delivers', rel: 'del', entities: ['r', 'o'] }],
};

export const categoryErd: ErDiagramDef = {
  title: 'Category (Union type): Payer হতে পারে Customer অথবা Corporate_Client',
  entities: [
    { id: 'c', name: 'Customer', x: 90, y: 60, attrs: [{ name: 'customer_id', kind: 'key' }] },
    { id: 'k', name: 'Corporate_Client', x: 540, y: 60, attrs: [{ name: 'tin', kind: 'key' }] },
    { id: 'p', name: 'Payer', x: 315, y: 330, attrs: [{ name: 'payer_id', kind: 'key' }] },
  ],
  rels: [],
  isas: [{ id: 'u', parent: 'p', children: ['c', 'k'], kind: 'u', x: 315, y: 200 }],
};

/* ───────────── অধ্যায় ৮: পূর্ণ লেদু মার্ট ERD ───────────── */
export const leduFullErd: ErDiagramDef = {
  title: 'পূর্ণ লেদু মার্ট ERD',
  entities: [
    {
      id: 'k',
      name: 'Category',
      x: 100,
      y: 60,
      attrs: [{ name: 'category_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'p',
      name: 'Product',
      x: 520,
      y: 60,
      attrs: [{ name: 'product_id', kind: 'key' }, { name: 'price' }],
    },
    {
      id: 's',
      name: 'Supplier',
      x: 940,
      y: 60,
      attrs: [{ name: 'supplier_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'c',
      name: 'Customer',
      x: 100,
      y: 400,
      attrs: [{ name: 'customer_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'o',
      name: 'Order',
      x: 520,
      y: 400,
      attrs: [{ name: 'order_id', kind: 'key' }, { name: 'order_date' }],
    },
    {
      id: 't',
      name: 'Store',
      x: 940,
      y: 400,
      attrs: [{ name: 'store_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'm',
      name: 'Payment',
      x: 100,
      y: 720,
      attrs: [{ name: 'payment_id', kind: 'key' }, { name: 'method' }],
    },
    {
      id: 'd',
      name: 'Delivery',
      x: 520,
      y: 720,
      attrs: [{ name: 'delivery_id', kind: 'key' }, { name: 'status' }],
    },
    {
      id: 'r',
      name: 'Rider',
      x: 940,
      y: 720,
      attrs: [{ name: 'rider_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'e',
      name: 'Employee',
      x: 1400,
      y: 400,
      attrs: [{ name: 'employee_id', kind: 'key' }, { name: 'name' }],
    },
  ],
  rels: [
    {
      id: 'in',
      name: 'belongs_to',
      x: 310,
      y: 60,
      links: [
        { entity: 'k', card: '1' },
        { entity: 'p', card: 'N', total: true },
      ],
    },
    {
      id: 'sup',
      name: 'supplies',
      x: 730,
      y: 60,
      links: [
        { entity: 's', card: '1' },
        { entity: 'p', card: 'N', total: true },
      ],
    },
    {
      id: 'contains',
      name: 'contains',
      x: 520,
      y: 230,
      links: [
        { entity: 'o', card: 'M', total: true },
        { entity: 'p', card: 'N' },
      ],
      attrs: [{ name: 'quantity' }],
    },
    {
      id: 'places',
      name: 'places',
      x: 310,
      y: 400,
      links: [
        { entity: 'c', card: '1' },
        { entity: 'o', card: 'N', total: true },
      ],
    },
    {
      id: 'handles',
      name: 'handles',
      x: 730,
      y: 400,
      links: [
        { entity: 't', card: '1' },
        { entity: 'o', card: 'N', total: true },
      ],
    },
    {
      id: 'pays',
      name: 'paid_by',
      x: 310,
      y: 720,
      links: [
        { entity: 'o', card: '1' },
        { entity: 'm', card: 'N', total: true },
      ],
    },
    {
      id: 'dl',
      name: 'has',
      x: 520,
      y: 560,
      links: [
        { entity: 'o', card: '1' },
        { entity: 'd', card: '1' },
      ],
    },
    {
      id: 'ca',
      name: 'carries',
      x: 730,
      y: 720,
      links: [
        { entity: 'r', card: '1' },
        { entity: 'd', card: 'N', total: true },
      ],
    },
    {
      id: 'wa',
      name: 'works_at',
      x: 1170,
      y: 400,
      links: [
        { entity: 't', card: '1' },
        { entity: 'e', card: 'N', total: true },
      ],
    },
    {
      id: 'hr',
      name: 'has_rider',
      x: 940,
      y: 560,
      links: [
        { entity: 't', card: '1' },
        { entity: 'r', card: 'N', total: true },
      ],
    },
  ],
};

/* ───────────── অধ্যায় ৮: ক্লাসিক পরীক্ষার ERD ───────────── */
export const universityErd: ErDiagramDef = {
  title: 'University: Student–Course–Teacher–Department',
  entities: [
    {
      id: 'd',
      name: 'Department',
      x: 420,
      y: 60,
      attrs: [{ name: 'dept_id', kind: 'key' }, { name: 'dname' }],
    },
    {
      id: 's',
      name: 'Student',
      x: 100,
      y: 380,
      attrs: [{ name: 'student_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'c',
      name: 'Course',
      x: 540,
      y: 380,
      attrs: [{ name: 'course_code', kind: 'key' }, { name: 'title' }, { name: 'credits' }],
    },
    {
      id: 't',
      name: 'Teacher',
      x: 960,
      y: 380,
      attrs: [{ name: 'teacher_id', kind: 'key' }, { name: 'name' }],
    },
  ],
  rels: [
    {
      id: 'maj',
      name: 'majors_in',
      x: 100,
      y: 210,
      links: [
        { entity: 'd', card: '1' },
        { entity: 's', card: 'N', total: true },
      ],
    },
    {
      id: 'emp',
      name: 'employs',
      x: 700,
      y: 210,
      links: [
        { entity: 'd', card: '1' },
        { entity: 't', card: 'N', total: true },
      ],
    },
    {
      id: 'enr',
      name: 'enrolls',
      x: 320,
      y: 380,
      links: [
        { entity: 's', card: 'M' },
        { entity: 'c', card: 'N' },
      ],
      attrs: [{ name: 'grade' }],
    },
    {
      id: 'tch',
      name: 'teaches',
      x: 750,
      y: 380,
      links: [
        { entity: 't', card: '1' },
        { entity: 'c', card: 'N', total: true },
      ],
    },
  ],
};

export const libraryErd: ErDiagramDef = {
  title: 'Library: Member–Book–Author–Publisher',
  entities: [
    {
      id: 'm',
      name: 'Member',
      x: 100,
      y: 200,
      attrs: [{ name: 'member_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'b',
      name: 'Book',
      x: 560,
      y: 200,
      attrs: [{ name: 'isbn', kind: 'key' }, { name: 'title' }],
    },
    {
      id: 'a',
      name: 'Author',
      x: 1020,
      y: 200,
      attrs: [{ name: 'author_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'p',
      name: 'Publisher',
      x: 560,
      y: 480,
      attrs: [{ name: 'pub_id', kind: 'key' }, { name: 'name' }],
    },
  ],
  rels: [
    {
      id: 'bor',
      name: 'borrows',
      x: 330,
      y: 200,
      links: [
        { entity: 'm', card: 'M' },
        { entity: 'b', card: 'N' },
      ],
      attrs: [{ name: 'issue_date' }, { name: 'due_date' }],
    },
    {
      id: 'wr',
      name: 'writes',
      x: 790,
      y: 200,
      links: [
        { entity: 'a', card: 'M' },
        { entity: 'b', card: 'N', total: true },
      ],
    },
    {
      id: 'pub',
      name: 'publishes',
      x: 560,
      y: 340,
      links: [
        { entity: 'p', card: '1' },
        { entity: 'b', card: 'N', total: true },
      ],
    },
  ],
};

export const hospitalErd: ErDiagramDef = {
  title: 'Hospital: Patient–Doctor–Department–Room',
  entities: [
    {
      id: 'p',
      name: 'Patient',
      x: 100,
      y: 200,
      attrs: [{ name: 'patient_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'd',
      name: 'Doctor',
      x: 560,
      y: 200,
      attrs: [{ name: 'doctor_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'm',
      name: 'Department',
      x: 1020,
      y: 200,
      attrs: [{ name: 'dept_id', kind: 'key' }, { name: 'dname' }],
    },
    {
      id: 'r',
      name: 'Room',
      x: 100,
      y: 500,
      attrs: [{ name: 'room_no', kind: 'key' }, { name: 'type' }],
    },
  ],
  rels: [
    {
      id: 'con',
      name: 'consults',
      x: 330,
      y: 200,
      links: [
        { entity: 'p', card: 'M' },
        { entity: 'd', card: 'N' },
      ],
      attrs: [{ name: 'visit_date' }, { name: 'diagnosis' }],
    },
    {
      id: 'wi',
      name: 'works_in',
      x: 790,
      y: 200,
      links: [
        { entity: 'm', card: '1' },
        { entity: 'd', card: 'N', total: true },
      ],
    },
    {
      id: 'adm',
      name: 'admitted_to',
      x: 100,
      y: 350,
      links: [
        { entity: 'r', card: '1' },
        { entity: 'p', card: 'N' },
      ],
    },
  ],
};

export const bankErd: ErDiagramDef = {
  title: 'Bank: Customer–Account–Loan–Branch–ATM Transaction',
  entities: [
    {
      id: 'c',
      name: 'Customer',
      x: 100,
      y: 240,
      attrs: [{ name: 'customer_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'a',
      name: 'Account',
      x: 560,
      y: 240,
      attrs: [{ name: 'acc_no', kind: 'key' }, { name: 'balance' }],
    },
    {
      id: 'b',
      name: 'Branch',
      x: 1020,
      y: 240,
      attrs: [{ name: 'branch_id', kind: 'key' }, { name: 'city' }],
    },
    {
      id: 'l',
      name: 'Loan',
      x: 100,
      y: 560,
      attrs: [{ name: 'loan_no', kind: 'key' }, { name: 'amount' }],
    },
    {
      id: 'x',
      name: 'ATM_Transaction',
      x: 560,
      y: 560,
      weak: true,
      attrs: [{ name: 'txn_no', kind: 'partial' }, { name: 'txn_time' }, { name: 'amount' }],
    },
  ],
  rels: [
    {
      id: 'h',
      name: 'holds',
      x: 330,
      y: 240,
      links: [
        { entity: 'c', card: 'M' },
        { entity: 'a', card: 'N', total: true },
      ],
    },
    {
      id: 'm',
      name: 'maintains',
      x: 790,
      y: 240,
      links: [
        { entity: 'b', card: '1' },
        { entity: 'a', card: 'N', total: true },
      ],
    },
    {
      id: 'bo',
      name: 'borrows',
      x: 100,
      y: 400,
      links: [
        { entity: 'c', card: '1' },
        { entity: 'l', card: 'N' },
      ],
    },
    {
      id: 'u',
      name: 'performed_on',
      x: 560,
      y: 400,
      identifying: true,
      links: [
        { entity: 'a', card: '1' },
        { entity: 'x', card: 'N', total: true },
      ],
    },
  ],
};

export const hotelErd: ErDiagramDef = {
  title: 'Hotel booking: Guest–Room–Hotel',
  entities: [
    {
      id: 'g',
      name: 'Guest',
      x: 100,
      y: 200,
      attrs: [{ name: 'guest_id', kind: 'key' }, { name: 'name' }, { name: 'phone' }],
    },
    {
      id: 'r',
      name: 'Room',
      x: 600,
      y: 200,
      attrs: [{ name: 'room_no', kind: 'key' }, { name: 'type' }, { name: 'price' }],
    },
    {
      id: 'h',
      name: 'Hotel',
      x: 600,
      y: 500,
      attrs: [{ name: 'hotel_id', kind: 'key' }, { name: 'name' }],
    },
  ],
  rels: [
    {
      id: 'bk',
      name: 'books',
      x: 350,
      y: 200,
      links: [
        { entity: 'g', card: 'M' },
        { entity: 'r', card: 'N' },
      ],
      attrs: [{ name: 'check_in' }, { name: 'check_out' }],
    },
    {
      id: 'hs',
      name: 'has',
      x: 600,
      y: 350,
      links: [
        { entity: 'h', card: '1' },
        { entity: 'r', card: 'N', total: true },
      ],
    },
  ],
};

export const ecommerceErd: ErDiagramDef = {
  title: 'E-commerce: Customer–Order–Product–Seller',
  entities: [
    {
      id: 'c',
      name: 'Customer',
      x: 100,
      y: 200,
      attrs: [{ name: 'customer_id', kind: 'key' }, { name: 'name' }],
    },
    {
      id: 'o',
      name: 'Order',
      x: 560,
      y: 200,
      attrs: [{ name: 'order_id', kind: 'key' }, { name: 'order_date' }],
    },
    {
      id: 'p',
      name: 'Product',
      x: 1020,
      y: 200,
      attrs: [{ name: 'product_id', kind: 'key' }, { name: 'title' }, { name: 'price' }],
    },
    {
      id: 's',
      name: 'Seller',
      x: 1020,
      y: 500,
      attrs: [{ name: 'seller_id', kind: 'key' }, { name: 'shop_name' }],
    },
    {
      id: 'y',
      name: 'Payment',
      x: 560,
      y: 500,
      attrs: [{ name: 'payment_id', kind: 'key' }, { name: 'method' }],
    },
  ],
  rels: [
    {
      id: 'pl',
      name: 'places',
      x: 330,
      y: 200,
      links: [
        { entity: 'c', card: '1' },
        { entity: 'o', card: 'N', total: true },
      ],
    },
    {
      id: 'ct',
      name: 'contains',
      x: 790,
      y: 200,
      links: [
        { entity: 'o', card: 'M', total: true },
        { entity: 'p', card: 'N' },
      ],
      attrs: [{ name: 'quantity' }],
    },
    {
      id: 'sl',
      name: 'sells',
      x: 1020,
      y: 350,
      links: [
        { entity: 's', card: '1' },
        { entity: 'p', card: 'N', total: true },
      ],
    },
    {
      id: 'py',
      name: 'paid_by',
      x: 560,
      y: 350,
      links: [
        { entity: 'o', card: '1', total: true },
        { entity: 'y', card: '1', total: true },
      ],
    },
  ],
};
