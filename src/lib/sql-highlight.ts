/** প্লেগ্রাউন্ড এডিটরের জন্য ছোট্ট SQL টোকেনাইজার (Shiki রানটাইমে লোড না করার জন্য)। */
export type TokenKind = 'kw' | 'str' | 'num' | 'cmt' | 'fn' | 'plain';
export interface Token {
  text: string;
  kind: TokenKind;
}

const KEYWORDS = new Set(
  `select from where group by having order limit offset distinct as and or not in is null like between exists case when then else end
join inner left right full outer cross natural on using union all intersect except insert into values update set delete create table view index trigger
drop alter add column primary key foreign references unique check default constraint with recursive over partition rows range unbounded preceding following current row
asc desc begin commit rollback savepoint release transaction pragma explain query plan if replace conflict do nothing returning cascade restrict
integer text real numeric blob int varchar char date datetime boolean true false collate glob escape cast ignore temp temporary rename to after before each for instead of`.split(
    /\s+/,
  ),
);
const FUNCS = new Set(
  `count sum avg min max abs round length lower upper substr trim ltrim rtrim replace coalesce nullif ifnull iif strftime date time datetime julianday
row_number rank dense_rank ntile lag lead first_value last_value group_concat total typeof random printf instr cast`.split(
    /\s+/,
  ),
);

const RE =
  /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^']|'')*'?)|(\b\d+(?:\.\d+)?\b)|([\p{L}_][\p{L}\p{N}_]*)|([\s\S])/gu;

export function tokenize(src: string): Token[] {
  const out: Token[] = [];
  const push = (text: string, kind: TokenKind) => {
    const last = out[out.length - 1];
    if (last && last.kind === kind && kind === 'plain') last.text += text;
    else out.push({ text, kind });
  };
  for (const m of src.matchAll(RE)) {
    if (m[1]) push(m[1], 'cmt');
    else if (m[2]) push(m[2], 'str');
    else if (m[3]) push(m[3], 'num');
    else if (m[4]) {
      const w = m[4].toLowerCase();
      if (KEYWORDS.has(w)) push(m[4], 'kw');
      else if (FUNCS.has(w)) push(m[4], 'fn');
      else push(m[4], 'plain');
    } else push(m[5] ?? '', 'plain');
  }
  return out;
}
