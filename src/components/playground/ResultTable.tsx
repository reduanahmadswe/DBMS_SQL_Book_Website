import { formatCell, type ResultSet } from '@/lib/sql-core';
import { bnDigits } from '@/content/meta';

const MAX_ROWS = 200;

export function ResultTable({ result }: { result: ResultSet }) {
  const shown = result.rows.slice(0, MAX_ROWS);
  return (
    <div>
      <div className="max-h-96 overflow-auto rounded-lg border border-line bg-surface">
        <table className="w-full border-collapse text-[0.93rem] leading-snug">
          <caption className="sr-only">কোয়েরির ফলাফল</caption>
          <thead className="sticky top-0 bg-surface-2">
            <tr>
              {result.columns.map((c, i) => (
                <th
                  key={i}
                  scope="col"
                  className="whitespace-nowrap border-b border-line px-3 py-2 text-left font-semibold"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r, ri) => (
              <tr key={ri} className="odd:bg-bg">
                {r.map((v, ci) => (
                  <td
                    key={ci}
                    className={`whitespace-nowrap border-b border-line px-3 py-1.5 ${v === null ? 'italic text-ink-faint' : ''}`}
                  >
                    {formatCell(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        {bnDigits(result.rows.length)}টি সারি
        {result.rows.length > MAX_ROWS ? ` (প্রথম ${bnDigits(MAX_ROWS)}টি দেখানো হচ্ছে)` : ''}
      </p>
    </div>
  );
}
