/** সাইটের সব সম্পাদনযোগ্য তথ্য এখানে। প্লেসহোল্ডারগুলো নিজের লিংক দিয়ে বদলে নিন। */
export const siteConfig = {
  name: 'লেদুর ডাটাবেস অভিযান',
  shortName: 'লেদুর অভিযান',
  tagline:
    'খাতায় বাকির হিসাব লিখতে লিখতে লেদুর মাথা খারাপ! কোড লিখতে পারো, কিন্তু ডাটা সামলাতে না জানলে অ্যাপ বাঁচাবে কীভাবে?',
  description:
    'গল্পে গল্পে DBMS আর SQL — একদম শূন্য থেকে অ্যাডভান্সড পর্যন্ত, পুরোটা বাংলায়। বিশ্ববিদ্যালয় ও ব্যাংক আইটি পরীক্ষার প্রস্তুতির জন্যও।',
  /** প্রোডাকশন URL (canonical, sitemap, OG এর জন্য)। শেষে স্ল্যাশ নেই। */
  baseUrl: 'https://ledu-database-odhiyan.example.com',
  author: {
    name: 'Reduan Ahmad',
    nameEn: 'Reduan Ahmad',
    org: 'BornoSoft',
  },
  links: {
    /** হোমপেজের "ফলো করুন" বাটন */
    follow: 'https://www.facebook.com/your-page-here',
    github: 'https://github.com/your-username',
    linkedin: 'https://www.linkedin.com/in/your-username',
    facebook: 'https://www.facebook.com/your-page-here',
  },
  brand: { purple: '#6E14A9', teal: '#11A39A' },
} as const;

export type SiteConfig = typeof siteConfig;
