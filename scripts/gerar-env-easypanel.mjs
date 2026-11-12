import crypto from 'node:crypto';

const genHex = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const genB64 = (bytes = 32) => crypto.randomBytes(bytes).toString('base64');
const sha512 = (str) => crypto.createHash('sha512').update(str).digest('hex');

const wahaKey = genHex(16);
const wahaSha512 = sha512(wahaKey);
const srhToken = genHex(24);

const env = `# ==============================================================================
# DeskcommCRM — Configuração de Ambiente para Easypanel
# ==============================================================================
DOMAIN=crm.bragentes.ia.br
NEXT_PUBLIC_APP_URL=https://crm.bragentes.ia.br
PORT=3000

# --- Supabase & PostgreSQL (Opção B - Local no Easypanel) ----------------------
NEXT_PUBLIC_SUPABASE_URL=https://sb.bragentes.ia.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q
SUPABASE_DB_URL=postgresql://postgres:your-super-secret-and-long-postgres-password@bragentes_supabase-db-1:5432/postgres
SUPABASE_SERVER_URL=http://bragentes_supabase-kong-1:8000

# --- Criptografia & Segredos ---------------------------------------------------
INTERNAL_SECRET=${genHex(32)}
INTERNAL_CRON_SECRET=${genHex(32)}
CPF_ENCRYPTION_KEY=${genB64(32)}
AI_CRED_AES_KEY=${genB64(32)}
WAHA_BYO_ENCRYPTION_KEY=${genB64(32)}
ENCRYPTION_KEY=${genHex(32)}

# --- Redis / SRH ---------------------------------------------------------------
SRH_TOKEN=${srhToken}
UPSTASH_REDIS_REST_URL=http://srh:80
UPSTASH_REDIS_REST_TOKEN=${srhToken}

# --- WhatsApp / WAHA ----------------------------------------------------------
WAHA_API_BASE_URL=http://waha:3000
WAHA_WEBHOOK_BASE_URL=http://app:3000
WAHA_API_KEY=${wahaKey}
WAHA_API_KEY_SHA512=${wahaSha512}
WAHA_HMAC_SECRET=${genHex(32)}
WHATSAPP_HOOK_HMAC_KEY=${genHex(32)}
WHATSAPP_DEFAULT_ENGINE=NOWEB
WHATSAPP_RESTART_ALL_SESSIONS=True
WAHA_WEBHOOK_REQUIRE_SIGNATURE=false

# --- Imagens Oficiais ---------------------------------------------------------
APP_IMAGE=ghcr.io/melgarafael/deskcommcrm:stable
WORKER_IMAGE=ghcr.io/melgarafael/deskcomm-worker:stable
SCHEDULER_IMAGE=ghcr.io/melgarafael/deskcomm-scheduler:stable
WAHA_IMAGE=devlikeapro/waha:latest-2026.7.2
`;

console.log(env);
