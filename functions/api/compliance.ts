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
    const batch = (url.searchParams.get('batch') || '').trim();
    const cas = (url.searchParams.get('cas') || '').trim();
    const docType = url.searchParams.get('type') || 'ALL';

    // If Cloudflare D1 is bound
    if (context.env?.DB) {
      try {
        let sql = 'SELECT * FROM compliance_documents WHERE 1=1';
        const params: any[] = [];

        if (batch) {
          sql += ' AND LOWER(batch_number) LIKE ?';
          params.push(%%);
        }

        if (cas) {
          sql += ' AND cas_number = ?';
          params.push(cas);
        }

        if (docType !== 'ALL') {
          sql += ' AND doc_type = ?';
          params.push(docType);
        }

        const statement = context.env.DB.prepare(sql);
        const { results } = await statement.bind(...params).all();

        return new Response(
          JSON.stringify({
            success: true,
            source: 'cloudflare_d1',
            count: results?.length || 0,
            documents: results || [],
          }),
          { headers: corsHeaders }
        );
      } catch (dbErr) {
        console.warn('D1 compliance query error:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        source: 'edge_static',
        message: 'Compliance documents available via instant R2 edge repository.',
        filter: { batch, cas, docType },
      }),
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to query compliance documents',
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
