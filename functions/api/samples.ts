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
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const onRequestPost = async (context: EventContext<Env>): Promise<Response> => {
  try {
    const body: any = await context.request.json();

    if (!body || !body.companyName || !body.contactName || !body.email || !body.targetChemical) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required company, contact, or chemical specification fields',
        }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `DBF-SAMPLE-${year}-${randomSeq}`;
    const id = `sample-${Date.now()}-${randomSeq}`;

    if (context.env?.DB) {
      try {
        await context.env.DB.prepare(`
          INSERT INTO sample_requests (
            id, rfq_id, company_name, contact_name, email, phone,
            province, city, delivery_address, chemical_name, cas_number,
            grade, trial_application, estimated_commercial_volume,
            tracking_number, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          id,
          body.rfqId || null,
          body.companyName,
          body.contactName,
          body.email,
          body.phone || '',
          body.province || 'Gauteng',
          body.city || 'Johannesburg',
          body.deliveryAddress || '',
          body.targetChemical || '',
          body.casNumber || null,
          body.grade || 'USP/BP/EP',
          body.trialApplication || 'Formulation Trial',
          body.estimatedCommercialVolume || null,
          trackingNumber,
          'RECEIVED',
          Date.now()
        ).run();
      } catch (dbErr) {
        console.warn('D1 sample insert warning:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        trackingNumber,
        message: 'Sample kit request received. Dispatch allocated from Johannesburg cleanroom.',
        sampleId: id,
      }),
      {
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to process sample request',
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
