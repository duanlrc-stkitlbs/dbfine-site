interface Env {
  DB?: any;
}

interface EventContext<TEnv = Env> {
  request: Request;
  env: TEnv;
  params?: Record<string, string | string[]>;
  waitUntil?: (promise: Promise<any>) => void;
  next?: () => Promise<Response>;
  data?: Record<string, unknown>;
}

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const onRequestGet = async (context: EventContext<Env>): Promise<Response> => {
  try {
    const url = new URL(context.request.url);
    const q = (url.searchParams.get('q') || '').toLowerCase().trim();
    const category = url.searchParams.get('category') || 'all';
    const grade = url.searchParams.get('grade') || 'all';

    // If D1 is connected, query D1
    if (context.env?.DB) {
      try {
        let sql = 'SELECT * FROM products WHERE 1=1';
        const params: any[] = [];

        if (category !== 'all') {
          sql += ' AND category = ?';
          params.push(category);
        }

        if (grade !== 'all') {
          sql += ' AND grade = ?';
          params.push(grade);
        }

        if (q) {
          sql += ' AND (LOWER(name) LIKE ? OR cas_number LIKE ? OR LOWER(description) LIKE ?)';
          const term = %%;
          params.push(term, term, term);
        }

        const statement = context.env.DB.prepare(sql);
        const { results } = await statement.bind(...params).all();

        return new Response(
          JSON.stringify({
            success: true,
            source: 'cloudflare_d1',
            count: results?.length || 0,
            products: results || [],
          }),
          { headers: corsHeaders }
        );
      } catch (dbErr) {
        console.warn('D1 product query fallback:', dbErr);
      }
    }

    // Default static response indicator
    return new Response(
      JSON.stringify({
        success: true,
        source: 'edge_static',
        message: 'Product directory available via static client catalog or D1 sync.',
        filter: { q, category, grade },
      }),
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to query products',
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
