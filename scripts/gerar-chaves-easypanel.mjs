import crypto from "node:crypto";

function hex(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

const wahaKey = hex(16);
const wahaHash = crypto.createHash("sha512").update(wahaKey).digest("hex");

const env = `# ==============================================================================
# DeskcommCRM — Configuração de Ambiente para Easypanel
# ==============================================================================
# Domínio público da aplicação (sem barra no final)
DOMAIN=crm.bragentes.ia.br
NEXT_PUBLIC_APP_URL=https://crm.bragentes.ia.br

# --- Banco de Dados & Supabase (Opção B - Easypanel) ---------------------------
# Se o Supabase estiver em um subdomínio com SSL (ex: sb.bragentes.ia.br):
NEXT_PUBLIC_SUPABASE_URL=https://sb.bragentes.ia.br

# Chaves do Supabase (obtidas no painel do serviço Supabase no Easypanel):
NEXT_PUBLIC_SUPABASE_ANON_KEY=PREENCHA_COM_A_ANON_KEY_DO_SUPABASE
SUPABASE_SERVICE_ROLE_KEY=PREENCHA_COM_A_SERVICE_ROLE_KEY_DO_SUPABASE

# Conexão direta ao PostgreSQL do Supabase (para migrations e admin):
# Formato: postgresql://postgres:SENHA@NOME_DO_HOST_DO_POSTGRES:5432/postgres
SUPABASE_DB_URL=postgresql://postgres:PREENCHA_SENHA@bragentes_supabase_db:5432/postgres

# --- Segredos Criptográficos (Gerados Automaticamente) -------------------------
ENCRYPTION_KEY=${hex(32)}
INTERNAL_SECRET=${hex(32)}
INTERNAL_CRON_SECRET=${hex(32)}
SRH_TOKEN=${hex(24)}

# --- WhatsApp / WAHA ----------------------------------------------------------
WAHA_API_KEY=${wahaKey}
WAHA_API_KEY_SHA512=${wahaHash}
WAHA_HMAC_SECRET=${hex(32)}
WHATSAPP_DEFAULT_ENGINE=NOWEB
WHATSAPP_RESTART_ALL_SESSIONS=True

# --- Modelos de IA (Opcional - Pode ser configurado pela interface depois) ---
# OPENAI_API_KEY=
# ANTHROPIC_API_KEY=
# GOOGLE_GENERATIVE_AI_API_KEY=

# --- Imagens Oficiais de Produção (ghcr.io) -----------------------------------
APP_IMAGE=ghcr.io/melgarafael/deskcommcrm:stable
WORKER_IMAGE=ghcr.io/melgarafael/deskcomm-worker:stable
SCHEDULER_IMAGE=ghcr.io/melgarafael/deskcomm-scheduler:stable
WAHA_IMAGE=devlikeapro/waha:latest-2026.7.2
`;

console.log(env);
