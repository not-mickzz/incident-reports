import type { IOA, IOAType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface IOAPattern {
  type: IOAType;
  pattern: RegExp;
  context: (match: string) => string;
}

const IOA_PATTERNS: IOAPattern[] = [
  // Windows Registry keys
  {
    type: 'registro',
    pattern: /(?:HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKLM|HKCU|HKCR|HKU)\\[^\s"'\r\n,;]+/gi,
    context: (m) => {
      const lower = m.toLowerCase();
      if (lower.includes('\\run\\') || lower.includes('\\runonce\\')) return 'Persistencia: clave de auto-inicio';
      if (lower.includes('\\services\\')) return 'Creación o modificación de servicio';
      if (lower.includes('\\currentversion\\winlogon')) return 'Posible hijacking de Winlogon';
      if (lower.includes('\\policies\\')) return 'Modificación de políticas de sistema';
      if (lower.includes('\\debugger')) return 'Image File Execution Options: posible hooking';
      return 'Clave de registro modificada';
    },
  },
  // Named pipes
  {
    type: 'pipe_nombrado',
    pattern: /\\\\\.\\pipe\\[^\s"'\r\n,;]+/gi,
    context: (m) => {
      const lower = m.toLowerCase();
      if (lower.includes('meterpreter') || lower.includes('msagent') || lower.includes('lsarpc') || lower.includes('samr'))
        return 'Pipe asociado a herramientas de post-explotación o movimiento lateral';
      return 'Named pipe sospechoso detectado';
    },
  },
  // Windows file paths (suspicious locations)
  {
    type: 'ruta',
    pattern: /(?:[A-Za-z]:\\(?:Windows\\Temp|Users\\[^\\]+\\AppData\\(?:Roaming|Local|LocalLow)|Temp|ProgramData|SystemRoot)[^\s"'\r\n,;]*|\/(?:tmp|var\/tmp|dev\/shm|proc\/[0-9]+|etc\/cron[^\s"'\r\n,;]*)\/[^\s"'\r\n,;]+)/gi,
    context: (m) => {
      const lower = m.toLowerCase();
      if (lower.includes('\\temp\\') || lower.includes('/tmp/')) return 'Ejecución desde directorio temporal (técnica común de malware)';
      if (lower.includes('appdata\\roaming') || lower.includes('appdata\\local')) return 'Artefacto en directorio AppData del usuario';
      if (lower.includes('programdata')) return 'Artefacto en ProgramData (persistencia común)';
      if (lower.includes('/dev/shm')) return 'Archivo en memoria compartida (evasión en Linux)';
      if (lower.includes('/etc/cron')) return 'Posible tarea cron maliciosa (persistencia Linux)';
      return 'Ruta de archivo en ubicación sospechosa';
    },
  },
  // Windows Event IDs
  {
    type: 'evento_windows',
    pattern: /(?:Event\s*ID|EventID|Evento)\s*:?\s*(\d{4,5})/gi,
    context: (m) => {
      const id = m.replace(/\D/g, '');
      const eventMap: Record<string, string> = {
        '4624': 'Inicio de sesión exitoso (monitorear tipo 3 para lateral movement)',
        '4625': 'Inicio de sesión fallido (posible fuerza bruta)',
        '4648': 'Inicio de sesión con credenciales explícitas (Pass-the-Hash)',
        '4662': 'Operación en objeto AD (posible DCSync)',
        '4688': 'Creación de proceso nuevo',
        '4698': 'Tarea programada creada (posible persistencia)',
        '4720': 'Cuenta de usuario creada',
        '4722': 'Cuenta de usuario habilitada',
        '4732': 'Usuario agregado a grupo privilegiado',
        '4768': 'Solicitud de ticket Kerberos (AS-REQ)',
        '4769': 'Solicitud de ticket de servicio (TGS-REQ)',
        '4771': 'Pre-autenticación Kerberos fallida (posible AS-REP Roasting)',
        '7045': 'Nuevo servicio instalado en el sistema',
        '1102': 'Log de auditoría borrado (anti-forense)',
        '4103': 'Actividad de módulo PowerShell (script block logging)',
        '4104': 'Ejecución de script PowerShell capturada',
      };
      return eventMap[id] || `Windows Event ID ${id}`;
    },
  },
  // Suspicious processes / executables with arguments
  {
    type: 'proceso',
    pattern: /(?:powershell(?:\.exe)?|cmd(?:\.exe)?|wscript(?:\.exe)?|cscript(?:\.exe)?|mshta(?:\.exe)?|rundll32(?:\.exe)?|regsvr32(?:\.exe)?|certutil(?:\.exe)?|bitsadmin(?:\.exe)?|wmic(?:\.exe)?|msiexec(?:\.exe)?|net(?:\.exe)?|sc(?:\.exe)?|schtasks(?:\.exe)?|at(?:\.exe)?|reg(?:\.exe)?|whoami(?:\.exe)?|nltest(?:\.exe)?|mimikatz(?:\.exe)?|psexec(?:\.exe)?|procdump(?:\.exe)?)(?:\s+[^\r\n]+)?/gi,
    context: (m) => {
      const lower = m.toLowerCase();
      if (lower.includes('powershell') && (lower.includes('-enc') || lower.includes('-encodedcommand'))) return 'PowerShell con comando codificado en Base64 (evasión)';
      if (lower.includes('powershell') && lower.includes('-nop')) return 'PowerShell con NoProfile (evasión de controles)';
      if (lower.includes('powershell') && lower.includes('downloadstring')) return 'PowerShell descargando y ejecutando código remoto';
      if (lower.includes('powershell') && lower.includes('iex')) return 'PowerShell Invoke-Expression (ejecución en memoria)';
      if (lower.includes('certutil') && lower.includes('-decode')) return 'CertUtil usado para decodificar payload (LOLBin)';
      if (lower.includes('certutil') && lower.includes('-urlcache')) return 'CertUtil descargando archivo (LOLBin)';
      if (lower.includes('rundll32')) return 'RunDLL32 ejecutando DLL (posible evasión de AppLocker)';
      if (lower.includes('mshta')) return 'MSHTA ejecutando HTA (Living off the Land)';
      if (lower.includes('wmic') && lower.includes('process')) return 'WMIC creando proceso remoto (lateral movement)';
      if (lower.includes('mimikatz')) return 'Mimikatz detectado (volcado de credenciales)';
      if (lower.includes('psexec')) return 'PsExec detectado (ejecución remota / movimiento lateral)';
      if (lower.includes('whoami')) return 'Enumeración de usuario actual (reconocimiento post-acceso)';
      if (lower.includes('net') && lower.includes('user')) return 'Enumeración o creación de usuarios';
      if (lower.includes('schtasks') && (lower.includes('/create') || lower.includes('/run'))) return 'Creación de tarea programada (persistencia)';
      if (lower.includes('bitsadmin')) return 'BITSAdmin descargando archivo (LOLBin)';
      return 'Proceso sospechoso detectado';
    },
  },
  // Scheduled tasks
  {
    type: 'tarea_programada',
    pattern: /\\(?:Microsoft\\Windows\\[^\s"'\r\n,;]+|Tasks\\[^\s"'\r\n,;]+\.(?:xml|job))/gi,
    context: () => 'Referencia a tarea programada (posible persistencia)',
  },
  // Services
  {
    type: 'servicio',
    pattern: /(?:sc\.exe\s+(?:create|config|start|stop)|New-Service|Set-Service|services\.msc)[^\r\n]*/gi,
    context: (m) => {
      if (m.toLowerCase().includes('create')) return 'Creación de servicio de Windows (persistencia común)';
      return 'Manipulación de servicio de Windows';
    },
  },
  // Mutex names (common malware mutex patterns)
  {
    type: 'mutex',
    pattern: /(?:mutex|Mutex|MUTEX)\s*[=:]\s*["']?([^\s"'\r\n,;]{4,})["']?/gi,
    context: () => 'Mutex de malware detectado (fingerprint de familia de malware)',
  },
];

// Common LOLBins and suspicious command patterns that don't match process names
const COMMAND_PATTERNS: IOAPattern[] = [
  {
    type: 'comando',
    pattern: /(?:net\s+(?:user|group|localgroup|accounts|use)\s[^\r\n]+|nltest\s+\/[^\r\n]+|whoami\s+\/(?:all|priv|groups)[^\r\n]*|systeminfo[^\r\n]*|ipconfig\s+\/all[^\r\n]*|arp\s+-a[^\r\n]*|netstat\s+-[^\r\n]+|tasklist[^\r\n]*|reg\s+(?:query|add|delete)[^\r\n]+)/gi,
    context: (m) => {
      const lower = m.toLowerCase();
      if (lower.startsWith('whoami')) return 'Enumeración de privilegios del usuario actual';
      if (lower.startsWith('net user') || lower.startsWith('net localgroup')) return 'Enumeración de usuarios y grupos (reconocimiento)';
      if (lower.startsWith('nltest')) return 'Enumeración de dominio Active Directory';
      if (lower.startsWith('systeminfo')) return 'Recopilación de información del sistema (reconocimiento)';
      if (lower.startsWith('arp')) return 'Enumeración de tabla ARP (descubrimiento de red)';
      if (lower.startsWith('netstat')) return 'Enumeración de conexiones de red activas';
      if (lower.startsWith('tasklist')) return 'Listado de procesos en ejecución (reconocimiento)';
      if (lower.startsWith('reg query') || lower.startsWith('reg add')) return 'Consulta o modificación del registro de Windows';
      return 'Comando de reconocimiento o enumeración detectado';
    },
  },
];

export function parseIOAs(text: string): IOA[] {
  const found: IOA[] = [];
  const seenValues = new Set<string>();
  const allPatterns = [...IOA_PATTERNS, ...COMMAND_PATTERNS];

  for (const { type, pattern, context } of allPatterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const value = match[0].trim();
      const key = value.toLowerCase();
      if (seenValues.has(key) || value.length < 3) continue;
      seenValues.add(key);
      found.push({
        id: uuidv4(),
        type,
        value,
        context: context(value),
      });
    }
  }

  return found;
}

export const IOA_TYPE_LABELS: Record<IOAType, string> = {
  proceso: 'Proceso',
  registro: 'Registro',
  ruta: 'Ruta/Archivo',
  comando: 'Comando',
  evento_windows: 'Evento Windows',
  pipe_nombrado: 'Named Pipe',
  mutex: 'Mutex',
  servicio: 'Servicio',
  tarea_programada: 'Tarea Programada',
  comportamiento: 'Comportamiento',
};

export const IOA_TYPE_COLORS: Record<IOAType, string> = {
  proceso: 'red',
  registro: 'amber',
  ruta: 'orange',
  comando: 'red',
  evento_windows: 'blue',
  pipe_nombrado: 'purple',
  mutex: 'purple',
  servicio: 'amber',
  tarea_programada: 'amber',
  comportamiento: 'slate',
};
