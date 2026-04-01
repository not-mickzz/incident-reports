# 🛡️ Incident Reports — Plataforma de Reportes de Incidentes de Seguridad

Plataforma web profesional para la creación, gestión y exportación de reportes de incidentes de ciberseguridad. Permite documentar incidentes con clasificación por taxonomía, indicadores de compromiso (IOCs), indicadores de ataque (IOAs), timeline, análisis técnico y mapeo a frameworks de seguridad (MITRE ATT&CK, NIST-CSF, ISO 27002, CIS Top 18). Incluye autenticación, exportación a PDF y almacenamiento en Supabase.

---

## ✨ Funcionalidades

- **Wizard de 6 pasos** — flujo guiado para crear reportes: datos generales, clasificación, IOCs, IOAs, timeline, acciones y preview
- **Auto-detección de IOCs** — detecta IPs, hashes MD5/SHA1/SHA256, dominios, URLs y emails con defanging automático
- **Indicadores de Ataque (IOAs)** — documentación de comportamiento malicioso con contexto
- **Mapeo automático a frameworks** — MITRE ATT&CK, NIST-CSF, ISO 27002, CIS Top 18 y SCF
- **Exportación a PDF** — generación de PDF profesional con paginación inteligente (sin cortes entre secciones)
- **Almacenamiento en Supabase** — metadatos del reporte en base de datos y PDF en Storage privado
- **Autenticación** — acceso protegido con email y contraseña via Supabase Auth
- **Biblioteca de incidentes** — referencia completa de taxonomías con ejemplos reales, CVEs y controles
- **Metodología** — documentación del framework utilizado
- **TLP** — clasificación de reportes según Traffic Light Protocol

---

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework principal (App Router) |
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilos |
| [Zustand](https://zustand-demo.pmnd.rs/) | Estado global y persistencia local |
| [Supabase](https://supabase.com/) | Auth, base de datos y almacenamiento de PDFs |
| [jsPDF](https://github.com/parallax/jsPDF) | Generación de PDFs |
| [html2canvas-pro](https://github.com/niklasvh/html2canvas) | Captura de HTML a imagen para PDF (con soporte oklab) |
| [Vercel](https://vercel.com/) | Deploy |

---

## 📦 Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/incident-reports.git
cd incident-reports
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto (ver sección siguiente).

### 4. Inicia el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

Puedes encontrar estos valores en tu proyecto de Supabase en **Settings → API**.

---

## 🗄️ Configuración de Supabase

### 1. Tabla `reports`

Ejecuta esto en el **SQL Editor** de Supabase:

```sql
create table reports (
  id uuid primary key,
  created_at timestamptz default now(),
  data jsonb not null,
  pdf_path text
);
```

### 2. Bucket de Storage

- Ve a **Storage → New bucket**
- Nombre: `pdfs`
- Déjalo **privado** (no marcar como público)

### 3. Políticas RLS

Ejecuta esto en el **SQL Editor**:

```sql
-- Storage
CREATE POLICY "allow upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'pdfs');

CREATE POLICY "allow select" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'pdfs');

-- Tabla reports
CREATE POLICY "allow insert" ON public.reports
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "allow select" ON public.reports
FOR SELECT TO authenticated
USING (true);
```

### 4. Crear usuario

Ve a **Authentication → Users → Add user → Create new user** e ingresa tu email y contraseña. Este será el único usuario con acceso a la plataforma.

---

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── (app)/              # Rutas protegidas con header y footer
│   │   ├── biblioteca/     # Biblioteca de incidentes
│   │   ├── metodologia/    # Documentación del framework
│   │   ├── nuevo/          # Wizard de creación de reportes
│   │   ├── reporte/        # Vista de reporte guardado
│   │   └── page.tsx        # Landing page
│   ├── login/              # Página de autenticación
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/             # Header, Footer, FaviconInject
│   ├── report/             # ReportDocument, StepPreview, Wizard
│   └── ui/                 # Badge, Button, Card, etc.
├── data/                   # Taxonomías, severidades, TLP
├── lib/                    # Utilidades, Supabase client, PDF generator
├── store/                  # Estado global con Zustand
└── types/                  # Tipos TypeScript
```

---

## 📄 Licencia

MIT © 2026 — [mickzz.xyz](https://mickzz.xyz)
