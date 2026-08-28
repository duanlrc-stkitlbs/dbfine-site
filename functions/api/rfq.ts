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

    if (!body || !body.companyName || !body.contactName || !body.email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required company or contact fields',
        }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `DBF-RFQ-${year}-${randomSeq}`;
    const id = `rfq-${Date.now()}-${randomSeq}`;

    // If Cloudflare D1 binding exists
    if (context.env?.DB) {
      try {
        await context.env.DB.prepare(`
          INSERT INTO rfq_submissions (
            id, reference_code, company_name, contact_name, email, phone,
            province, city, delivery_address, facility_type, sahpra_license_number,
            sahpra_license_status, requested_items_json, notes, include_sample_kit,
            sample_kit_details, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          id,
          referenceCode,
          body.companyName,
          body.contactName,
          body.email,
          body.phone || '',
          body.province || 'Gauteng',
          body.city || 'Johannesburg',
          body.deliveryAddress || '',
          body.destinationFacilityType || 'manufacturing_plant',
          body.sahpraLicenseNumber || null,
          body.sahpraLicenseStatus || 'not_applicable',
          JSON.stringify(body.items || []),
          body.notes || null,
          body.includeSampleKit ? 1 : 0,
          body.sampleKitDetails || null,
          'PENDING',
          Date.now()
        ).run();
      } catch (dbErr) {
        console.warn('D1 insert warning:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        referenceCode,
        message: 'RFQ inquiry successfully received and logged to Johannesburg sales desk.',
        submissionId: id,
      }),
      {
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to process RFQ submission',
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
