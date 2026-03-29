export interface BibliotecaEntry {
  code: string;
  name: string;
  category: string;
  description: string;
  technicalDetail: string;
  realWorldExamples: {
    name: string;
    year: string;
    description: string;
    source: string;
  }[];
  cves: { id: string; description: string }[];
  mitreTechniques: {
    id: string;
    name: string;
    url: string;
  }[];
  indicators: string[];
  attackFlow: string[];
  impact: string;
  detectionMethods: string[];
  references: { title: string; url: string; type: 'paper' | 'blog' | 'standard' | 'tool' | 'news' }[];
}

export const BIBLIOTECA: BibliotecaEntry[] = [
  {
    code: 'A.I.1',
    name: 'Acceso no autorizado a almacenamiento',
    category: 'Acceso No Autorizado',
    description:
      'Ocurre cuando un atacante obtiene acceso a sistemas de almacenamiento (bases de datos, buckets S3, NAS, file servers) sin la autorización correspondiente. Puede involucrar credenciales robadas, configuraciónes por defecto, o explotación de permisos mal configurados.',
    technicalDetail:
      'Los atacantes buscan almacenamiento expuesto mediante escaneo de puertos (3306 MySQL, 5432 PostgreSQL, 27017 MongoDB, 6379 Redis) o enumeración de buckets cloud (S3, Azure Blob, GCS). Las causas mas comúnes son: credenciales por defecto, buckets públicos, ACLs permisivas, y falta de autenticación en servicios internos. En entornos cloud, la misconfiguración de IAM policies permite escalamiento lateral hacia storage.',
    realWorldExamples: [
      {
        name: 'Capital One Data Breach',
        year: '2019',
        description: 'Un atacante exploto una vulnerabilidad SSRF en un WAF mal configurado para acceder a metadatos de AWS y luego a buckets S3 con datos de 106 millones de clientes.',
        source: 'https://www.justice.gov/usao-wdwa/press-release/file/1188626/download',
      },
      {
        name: 'Microsoft Power Apps - Datos expuestos',
        year: '2021',
        description: 'Se descubrieron 38 millones de registros expuestos en portales Microsoft Power Apps debido a configuración por defecto que dejaba las tablas de datos como públicas.',
        source: 'https://www.upguard.com/breaches/power-apps',
      },
      {
        name: 'Elasticsearch clusters expuestos',
        year: '2020',
        description: 'Investigadores de Comparitech encontraron mas de 9,000 clusters Elasticsearch sin autenticación expuestos a Internet, conteniendo datos sensibles de multiples organizaciónes.',
        source: 'https://www.comparitech.com/blog/information-security/elasticsearch-exposed/',
      },
    ],
    cves: [
      { id: 'CVE-2019-5418', description: 'Ruby on Rails - File Content Disclosure via Action View' },
      { id: 'CVE-2020-17530', description: 'Apache Struts RCE que permitia acceso a archivos del servidor' },
    ],
    mitreTechniques: [
      { id: 'T1078', name: 'Valid Accounts', url: 'https://attack.mitre.org/techniques/T1078/' },
      { id: 'T1110', name: 'Brute Force', url: 'https://attack.mitre.org/techniques/T1110/' },
    ],
    indicators: [
      'Accesos desde IPs no reconocidas a servicios de almacenamiento',
      'Consultas masivas o dumps de bases de datos fuera de horario',
      'Uso de credenciales de servicio desde ubicaciones anomalas',
      'Transferencias de datos inusuales en volumen o frecuencia',
      'Alertas de servicios cloud por accesos no autorizados a buckets',
    ],
    attackFlow: [
      'Reconocimiento: Escaneo de puertos o enumeración de buckets cloud',
      'Acceso inicial: Uso de credenciales por defecto, robadas, o explotación de misconfiguración',
      'Acceso al almacenamiento: Conexión directa a la base de datos o bucket',
      'Exfiltración: Descarga masiva de datos mediante queries o herramientas de sync',
      'Persistencia (opcional): Creacion de cuentas backdoor o modificación de permisos',
    ],
    impact:
      'Exposición de datos sensibles (PII, datos financieros, propiedad intelectual). Puede derivar en multas regulatorias (GDPR, LGPD), perdida de confianza de clientes, y uso de datos para ataques secundarios como phishing dirigido o extorsion.',
    detectionMethods: [
      'Monitoreo de accesos a bases de datos con Database Activity Monitoring (DAM)',
      'Alertas de AWS CloudTrail / Azure Monitor para accesos anomalos a storage',
      'Reglas SIEM para detectar bulk downloads o queries anomalas',
      'Escaneo periódico de buckets públicos con herramientas como ScoutSuite o Prowler',
      'Network monitoring para transferencias de datos inusuales',
    ],
    references: [
      { title: 'OWASP - Broken Access Control', url: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/', type: 'standard' },
      { title: 'CIS Benchmark for AWS S3', url: 'https://www.cisecurity.org/benchmark/amazon_web_services', type: 'standard' },
      { title: 'NIST SP 800-53 AC-3: Access Enforcement', url: 'https://csrc.nist.gov/públications/detail/sp/800-53/rev-5/final', type: 'standard' },
      { title: 'Prowler - AWS Security Tool', url: 'https://github.com/prowler-cloud/prowler', type: 'tool' },
    ],
  },
  {
    code: 'A.I.2',
    name: 'Ataque de fuerza bruta exitoso',
    category: 'Acceso No Autorizado',
    description:
      'Un atacante logra obtener acceso a un sistema probando sistematicamente combinaciones de credenciales hasta encontrar las correctas. Incluye ataques de diccionario, credential stuffing, y password spraying.',
    technicalDetail:
      'Los ataques de fuerza bruta modernos van mas alla del simple intento de contrasenas. El credential stuffing utiliza listas de credenciales filtradas de breaches anteriores (disponibles en foros como BreachForums). El password spraying prueba pocas contrasenas comúnes contra muchas cuentas para evitar bloqueos. Las herramientas comúnes incluyen Hydra, Medusa, Burp Suite Intruder, y scripts personalizados. Los objetivos tipicos son: SSH (22), RDP (3389), paneles de administración web, VPNs, y APIs de autenticación.',
    realWorldExamples: [
      {
        name: 'SolarWinds - Password Spraying por Nobelium',
        year: '2021',
        description: 'El grupo Nobelium (APT29) utilizo password spraying masivo contra organizaciónes para obtener acceso inicial, combinado con abuso de tokens OAuth.',
        source: 'https://www.microsoft.com/en-us/security/blog/2021/10/25/nobelium-targeting-delegated-administrative-privileges-to-facilitate-broader-attacks/',
      },
      {
        name: 'Citrix ADC - Credential Stuffing masivo',
        year: '2020',
        description: 'Multiples organizaciónes reportaron ataques de credential stuffing contra Citrix Gateway, utilizando credenciales de la coleccion "Collection #1" filtrada en 2019.',
        source: 'https://support.citrix.com/article/CTX276998',
      },
    ],
    cves: [
      { id: 'CVE-2023-46747', description: 'F5 BIG-IP - Authentication bypass que facilitaba ataques de fuerza bruta' },
      { id: 'CVE-2021-22986', description: 'F5 BIG-IP iControl REST - No autenticación requerida' },
    ],
    mitreTechniques: [
      { id: 'T1110', name: 'Brute Force', url: 'https://attack.mitre.org/techniques/T1110/' },
      { id: 'T1110.001', name: 'Password Guessing', url: 'https://attack.mitre.org/techniques/T1110/001/' },
      { id: 'T1110.003', name: 'Password Spraying', url: 'https://attack.mitre.org/techniques/T1110/003/' },
      { id: 'T1110.004', name: 'Credential Stuffing', url: 'https://attack.mitre.org/techniques/T1110/004/' },
    ],
    indicators: [
      'Alto volumen de intentos de login fallidos desde una o multiples IPs',
      'Patrones de password spraying: pocos intentos por cuenta pero muchas cuentas',
      'Uso de user-agents asociados a herramientas de ataque (Hydra, Medusa)',
      'Accesos exitosos inmediatamente despues de multiples fallos',
      'Logins desde ubicaciones geograficas inusuales tras intentos fallidos',
    ],
    attackFlow: [
      'Preparacion: Recopilacion de listas de usuarios y contrasenas (OSINT, breaches previos)',
      'Ejecución: Lanzamiento de ataque con herramienta automatizada',
      'Exito: Obtencion de credenciales validas',
      'Post-explotación: Acceso al sistema, movimiento lateral, persistencia',
      'Exfiltración: Robo de datos o instalacion de backdoor',
    ],
    impact:
      'Compromiso total de cuentas de usuario o administrador. Puede llevar a robo de datos, movimiento lateral dentro de la red, instalacion de ransomware, o uso de la cuenta comprometida para ataques de phishing interno.',
    detectionMethods: [
      'Reglas SIEM para detectar multiples fallos de autenticación (>5 en 5 min)',
      'Correlacion de IPs con listas de reputacion (AbuseIPDB, Shodan)',
      'Monitoreo de failed login patterns con herramientas como CrowdStrike Falcon',
      'Implementación de CAPTCHA despues de N intentos fallidos',
      'Alertas de impossible travel (login desde 2 paises en minutos)',
    ],
    references: [
      { title: 'OWASP - Credential Stuffing Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html', type: 'standard' },
      { title: 'Have I Been Pwned', url: 'https://haveibeenpwned.com/', type: 'tool' },
      { title: 'NIST SP 800-63B: Digital Identity Guidelines', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html', type: 'standard' },
      { title: 'Hydra - Network Logon Cracker', url: 'https://github.com/vanhauser-thc/thc-hydra', type: 'tool' },
    ],
  },
  {
    code: 'A.I.3',
    name: 'Explotación de vulnerabilidades de autenticación',
    category: 'Explotación de Vulnerabilidades',
    description:
      'Aprovechamiento de fallas en mecanismos de autenticación para obtener acceso sin credenciales validas. Incluye bypass de autenticación, manipulacion de tokens, session hijacking, y explotación de vulnerabilidades en protocolos de autenticación.',
    technicalDetail:
      'Las vulnerabilidades de autenticación pueden existir en multiples capas: bypass de login mediante inyección SQL en formularios de autenticación, manipulacion de JWT (algoritmo none, clave debil, falta de validación de firma), session fixation, session hijacking via XSS, vulnerabilidades en implementaciónes OAuth/OIDC, y bypass de MFA. Los ataques modernos incluyen abuso de SAML assertions, forging de cookies de sesión, y explotación de race conditions en procesos de autenticación.',
    realWorldExamples: [
      {
        name: 'Fortinet FortiOS Authentication Bypass',
        year: '2022',
        description: 'CVE-2022-40684 permitia a atacantes no autenticados realizar operaciónes administrativas en FortiGate, FortiProxy y FortiSwitchManager mediante HTTP/HTTPS requests especialmente crafteados.',
        source: 'https://www.fortiguard.com/psirt/FG-IR-22-377',
      },
      {
        name: 'Microsoft Exchange ProxyLogon',
        year: '2021',
        description: 'Cadena de vulnerabilidades (CVE-2021-26855, CVE-2021-26857) que permitia autenticación bypass y ejecución remota de codigo en servidores Exchange, explotada masivamente por Hafnium.',
        source: 'https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/',
      },
      {
        name: 'Okta Breach via Lapsus$',
        year: '2022',
        description: 'El grupo Lapsus$ comprometio a un proveedor de soporte de Okta, obteniendo acceso a herramientas internas que permitieron resetear contrasenas y MFA de clientes de Okta.',
        source: 'https://www.okta.com/blog/2022/03/updated-okta-statement-on-lapsus/',
      },
    ],
    cves: [
      { id: 'CVE-2022-40684', description: 'Fortinet FortiOS/FortiProxy - Authentication bypass via crafted HTTP requests' },
      { id: 'CVE-2021-26855', description: 'Microsoft Exchange Server SSRF (ProxyLogon)' },
      { id: 'CVE-2023-22515', description: 'Atlassian Confluence - Broken Access Control leading to unauthorized admin access' },
      { id: 'CVE-2024-1709', description: 'ConnectWise ScreenConnect Authentication Bypass' },
    ],
    mitreTechniques: [
      { id: 'T1190', name: 'Exploit Public-Facing Application', url: 'https://attack.mitre.org/techniques/T1190/' },
      { id: 'T1588.006', name: 'Obtain Capabilities: Vulnerabilities', url: 'https://attack.mitre.org/techniques/T1588/006/' },
    ],
    indicators: [
      'Requests HTTP anomalos contra endpoints de autenticación',
      'Uso de tokens JWT con firma invalida o algoritmo none',
      'Acceso administrativo sin login previo registrado',
      'Patrones de tráfico asociados a exploits públicos (PoC)',
      'Alertas de WAF por payloads de authentication bypass',
    ],
    attackFlow: [
      'Reconocimiento: Identificacion de tecnologia de autenticación (fingerprinting)',
      'Busqueda de exploit: CVE público o fuzzing del mecanismo de auth',
      'Explotación: Envío de request malicioso para bypass de autenticación',
      'Acceso: Obtencion de sesión autenticada (generalmente admin)',
      'Post-explotación: Creacion de cuentas persistentes, exfiltración, pivot',
    ],
    impact:
      'Compromiso total del sistema con privilegios de administrador. Permite al atacante acceder a toda la información, modificar configuraciónes, crear cuentas backdoor, y potencialmente comprometer toda la infraestructura conectada.',
    detectionMethods: [
      'WAF rules para detectar payloads de authentication bypass conocidos',
      'Monitoreo de accesos administrativos sin autenticación previa',
      'Correlacion de CVEs públicados con versiones de software en uso',
      'Análisis de logs de autenticación para sesiónes anomalas',
      'Vulnerability scanning periódico con Nessus, Qualys o OpenVAS',
    ],
    references: [
      { title: 'OWASP - Broken Authentication', url: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/', type: 'standard' },
      { title: 'CWE-287: Improper Authentication', url: 'https://cwe.mitre.org/data/definitions/287.html', type: 'standard' },
      { title: 'NIST SP 800-63: Digital Identity Guidelines', url: 'https://pages.nist.gov/800-63-3/', type: 'standard' },
      { title: 'PortSwigger - Authentication vulnerabilities', url: 'https://portswigger.net/web-security/authentication', type: 'blog' },
    ],
  },
  {
    code: 'A.I.4',
    name: 'Uso de credenciales comprometidas',
    category: 'Acceso No Autorizado',
    description:
      'Uso de credenciales legitimas que fueron obtenidas de manera ilicita: compradas en mercados de la dark web, extraidas de data breaches, obtenidas via infostealers, o capturadas mediante phishing. El atacante se autentica como un usuario legitimo.',
    technicalDetail:
      'Las credenciales comprometidas provienen de multiples fuentes: bases de datos filtradas (Collection #1-5, RockYou2021), infostealers como RedLine, Raccoon, Vidar que roban credenciales de navegadores, malware bancario, keyloggers, y ataques de phishing. Los mercados de credenciales (Russian Market, Genesis Market) venden "bots" que incluyen cookies de sesión, credenciales guardadas, y fingerprints de navegador completos. Initial Access Brokers (IABs) venden acceso VPN/RDP a redes corporativas.',
    realWorldExamples: [
      {
        name: 'Uber Breach via Lapsus$',
        year: '2022',
        description: 'Un atacante compro credenciales de un contratista de Uber en la dark web (probablemente de un infostealer). Despues de MFA fatigue (bombardeo de push notifications), obtuvo acceso completo a sistemas internos.',
        source: 'https://www.uber.com/newsroom/security-update/',
      },
      {
        name: 'Colonial Pipeline Ransomware',
        year: '2021',
        description: 'El ataque de ransomware DarkSide que paralizo el oleoducto mas grande de EE.UU. comenzo con credenciales VPN comprometidas encontradas en una filtración de datos.',
        source: 'https://www.bloomberg.com/news/articles/2021-06-04/hackers-breached-colonial-pipeline-using-compromised-password',
      },
      {
        name: 'Snowflake Customer Breaches',
        year: '2024',
        description: 'Multiples clientes de Snowflake (Ticketmaster, AT&T, Santander) fueron comprometidos usando credenciales robadas por infostealers, afectando a cientos de millones de registros.',
        source: 'https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion',
      },
    ],
    cves: [],
    mitreTechniques: [
      { id: 'T1078', name: 'Valid Accounts', url: 'https://attack.mitre.org/techniques/T1078/' },
      { id: 'T1555', name: 'Credentials from Password Stores', url: 'https://attack.mitre.org/techniques/T1555/' },
      { id: 'T1528', name: 'Steal Application Access Token', url: 'https://attack.mitre.org/techniques/T1528/' },
    ],
    indicators: [
      'Login exitoso desde IP/geolocalizacion inusual',
      'Impossible travel: login desde paises distintos en minutos',
      'Uso de credenciales fuera de horario laboral',
      'Multiples cuentas accedidas desde la misma IP anomala',
      'Credenciales aparecen en feeds de threat intelligence (HIBP, SpyCloud)',
    ],
    attackFlow: [
      'Obtencion: Compra en dark web, infostealer, phishing, o data breach',
      'Validación: Prueba de credenciales contra el objetivo',
      'Acceso: Login exitoso con credenciales validas (bypass de detección)',
      'Reconocimiento interno: Enumeración de permisos, shares, sistemas',
      'Movimiento lateral: Uso de las mismas credenciales o nuevas encontradas',
      'Objetivo final: Exfiltración, ransomware, o persistencia',
    ],
    impact:
      'El atacante opera como un usuario legitimo, dificultando la detección. Puede acceder a datos confidenciales, correo corporativo, VPN, sistemas internos. En casos de cuentas privilegiadas, el compromiso es total. Multiples breaches masivos (Colonial Pipeline, Uber, Snowflake) comenzaron con credenciales comprometidas.',
    detectionMethods: [
      'Monitoreo de impossible travel y anomalias de geolocalizacion',
      'Integración con Have I Been Pwned API para detectar credenciales filtradas',
      'UEBA (User and Entity Behavior Analytics) para detectar comportamiento anomalo',
      'Monitoreo de dark web y mercados de credenciales (SpyCloud, Recorded Future)',
      'Requerimiento de MFA resistente a phishing (FIDO2/WebAuthn)',
    ],
    references: [
      { title: 'Have I Been Pwned', url: 'https://haveibeenpwned.com/', type: 'tool' },
      { title: 'Mandiant - UNC5537 Snowflake Analysis', url: 'https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion', type: 'blog' },
      { title: 'NIST SP 800-63B: Memorized Secrets', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html', type: 'standard' },
      { title: 'SpyCloud - Stolen Credentials Intelligence', url: 'https://spycloud.com/', type: 'tool' },
    ],
  },
  {
    code: 'A.II.1',
    name: 'Envío de correo no deseado o phishing desde infraestructura propia',
    category: 'Abuso de Infraestructura',
    description:
      'La infraestructura de la organización (servidores de correo, aplicaciones web, formularios) es utilizada para enviar correo no deseado (spam) o correos de phishing, ya sea por un atacante que comprometio el servidor o por un usuario interno malicioso.',
    technicalDetail:
      'El atacante compromete un servidor de correo (Exchange, Postfix, Sendmail) o una aplicacion web que envia emails (formularios de contacto, newsletters). Desde ahi envia correos de phishing o spam utilizando la reputacion del dominio de la organización. Los metodos incluyen: relay abierto, compromiso de cuentas de correo, abuso de APIs de envío (SendGrid, Mailgun con API keys expuestas), o inyección de encabezados SMTP en formularios web.',
    realWorldExamples: [
      {
        name: 'Compromiso de servidores Exchange para phishing',
        year: '2023',
        description: 'Multiples organizaciónes reportaron que sus servidores Exchange comprometidos via ProxyShell fueron usados para enviar phishing interno (BEC) a sus propios empleados y socios comerciales.',
        source: 'https://www.trendmicro.com/en_us/research/21/k/analyzing-proxyshell-related-incidents-via-trend-micro-managed-x.html',
      },
      {
        name: 'SendGrid API Keys expuestas en GitHub',
        year: '2022',
        description: 'Investigadores encontraron miles de API keys de SendGrid expuestas en repositorios públicos de GitHub, que fueron usadas para enviar phishing masivo.',
        source: 'https://www.bleepingcomputer.com/news/security/twilio-discloses-data-breach-after-sms-phishing-attack-on-employees/',
      },
    ],
    cves: [
      { id: 'CVE-2021-34473', description: 'Microsoft Exchange ProxyShell - usado para compromiso y envío de spam' },
    ],
    mitreTechniques: [
      { id: 'T1566', name: 'Phishing', url: 'https://attack.mitre.org/techniques/T1566/' },
    ],
    indicators: [
      'Aumento subito en volumen de correos salientes',
      'Correos salientes a dominios no relacionados con el negocio',
      'Reportes de bounce-back masivos (NDRs)',
      'Blacklisting del dominio/IP en listas como Spamhaus',
      'Alertas de SPF/DKIM fail en correos enviados',
    ],
    attackFlow: [
      'Compromiso: Acceso al servidor de correo o API de envío',
      'Preparacion: Carga de templates de phishing y listas de destinatarios',
      'Envío: Distribucion masiva de correos usando la infraestructura comprometida',
      'Resultado: Victimas reciben phishing "legitimo" desde dominio confiable',
    ],
    impact:
      'Dano reputacional severo al dominio de la organización. Blacklisting que afecta comúnicaciones legitimas. Posible responsabilidad legal. Si se usa para phishing interno, puede llevar a compromiso de mas cuentas.',
    detectionMethods: [
      'Monitoreo de volumen de correo saliente con baseline de comportamiento',
      'Alertas de blacklisting (MXToolbox, Spamhaus)',
      'Revision de logs SMTP para envíos anomalos',
      'Implementación estricta de SPF, DKIM y DMARC con politica reject',
      'Rate limiting en servidor de correo',
    ],
    references: [
      { title: 'DMARC.org - Best Practices', url: 'https://dmarc.org/', type: 'standard' },
      { title: 'Spamhaus - Block List Check', url: 'https://check.spamhaus.org/', type: 'tool' },
      { title: 'MXToolbox - Email Health', url: 'https://mxtoolbox.com/', type: 'tool' },
    ],
  },
  {
    code: 'A.IV.1',
    name: 'Ejecución remota de codigo',
    category: 'Ejecución de Codigo',
    description:
      'Un atacante logra ejecutar codigo arbitrario en un sistema remoto sin necesidad de acceso físico. Es una de las vulnerabilidades mas críticas ya que otorga control total sobre el sistema afectado.',
    technicalDetail:
      'La ejecución remota de codigo (RCE) puede ocurrir mediante: deserializacion insegura (Java, PHP, Python pickle), inyección de comandos OS, vulnerabilidades de buffer overflow, template injection (SSTI), upload de archivos maliciosos con ejecución, vulnerabilidades en parsers (ImageMagick, Log4j), y explotación de servicios expuestos. Log4Shell (CVE-2021-44228) fue uno de los RCE mas impactantes, afectando millones de aplicaciones Java globalmente.',
    realWorldExamples: [
      {
        name: 'Log4Shell (Log4j)',
        year: '2021',
        description: 'Vulnerabilidad crítica en Apache Log4j (CVE-2021-44228) que permitia RCE mediante una simple cadena de texto en cualquier campo que fuera logueado. Afecto a millones de aplicaciones Java incluyendo Apple iCloud, Steam, Minecraft, y servicios AWS.',
        source: 'https://logging.apache.org/log4j/2.x/security.html',
      },
      {
        name: 'MOVEit Transfer RCE',
        year: '2023',
        description: 'El grupo Cl0p exploto CVE-2023-34362 (SQL injection to RCE) en MOVEit Transfer para robar datos de mas de 2,500 organizaciónes incluyendo Shell, BBC, y el gobierno de EE.UU.',
        source: 'https://www.progress.com/security/moveit-transfer-and-moveit-cloud-vulnerability',
      },
      {
        name: 'Spring4Shell',
        year: '2022',
        description: 'CVE-2022-22965 permitia RCE en aplicaciones Spring Framework corriendo en JDK 9+ con Tomcat, mediante manipulacion del ClassLoader.',
        source: 'https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement',
      },
    ],
    cves: [
      { id: 'CVE-2021-44228', description: 'Apache Log4j - Log4Shell JNDI Injection RCE' },
      { id: 'CVE-2023-34362', description: 'MOVEit Transfer - SQL Injection leading to RCE' },
      { id: 'CVE-2022-22965', description: 'Spring Framework - Spring4Shell RCE' },
      { id: 'CVE-2024-3094', description: 'XZ Utils - Backdoor en libreria de compresion (supply chain)' },
      { id: 'CVE-2023-44487', description: 'HTTP/2 Rapid Reset - DoS via protocol abuse' },
    ],
    mitreTechniques: [
      { id: 'T1203', name: 'Exploitation for Client Execution', url: 'https://attack.mitre.org/techniques/T1203/' },
      { id: 'T1059', name: 'Command and Scripting Interpreter', url: 'https://attack.mitre.org/techniques/T1059/' },
    ],
    indicators: [
      'Requests HTTP con payloads de explotación conocidos (JNDI lookup, serialized objects)',
      'Procesos hijo anomalos spawneados por servicios web (cmd.exe, /bin/sh)',
      'Conexiónes salientes desde servidores a IPs de C2',
      'Alertas de EDR por ejecución de codigo sospechoso',
      'Modificación de archivos del sistema o creacion de webshells',
    ],
    attackFlow: [
      'Reconocimiento: Identificacion de tecnologia y version vulnerable',
      'Weaponizacion: Preparacion de exploit (payload, C2 server, listener)',
      'Delivery: Envío del exploit via HTTP request, email, o archivo',
      'Explotación: Ejecución del codigo arbitrario en el sistema objetivo',
      'Instalacion: Deploy de backdoor, webshell, o implant de C2',
      'C2: Establecimiento de canal de comando y control',
      'Acciones: Movimiento lateral, exfiltración, o ransomware',
    ],
    impact:
      'Control total del sistema comprometido. El atacante puede robar datos, instalar ransomware, pivotar a la red interna, o usar el sistema como proxy para otros ataques. RCEs como Log4Shell y MOVEit generaron impactos de billones de dolares globalmente.',
    detectionMethods: [
      'WAF con reglas actualizadas para CVEs recientes',
      'EDR con capacidad de detectar process injection y command execution anomala',
      'Network monitoring para conexiónes a IPs de C2 conocidas',
      'Vulnerability scanning continuo con Nessus, Qualys, Rapid7',
      'File integrity monitoring (FIM) para detectar webshells',
      'SIEM con reglas de correlacion para cadena de ataque completa',
    ],
    references: [
      { title: 'OWASP - Injection', url: 'https://owasp.org/Top10/A03_2021-Injection/', type: 'standard' },
      { title: 'MITRE ATT&CK - Exploitation for Client Execution', url: 'https://attack.mitre.org/techniques/T1203/', type: 'standard' },
      { title: 'CISA KEV Catalog', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog', type: 'standard' },
      { title: 'Nuclei - Vulnerability Scanner', url: 'https://github.com/projectdiscovery/nuclei', type: 'tool' },
    ],
  },
  {
    code: 'A.IV.2',
    name: 'Inyección de prompts en modelos LLM',
    category: 'Ejecución de Codigo',
    description:
      'Manipulacion de inputs a modelos de lenguaje (LLM) para hacer que el modelo ignore sus instrucciones, revele información confidencial del system prompt, ejecute acciones no autorizadas, o genere contenido danino. Es un vector de ataque emergente con la adopcion masiva de IA.',
    technicalDetail:
      'Los ataques de prompt injection se dividen en: Direct Prompt Injection (el usuario manipula directamente el input), Indirect Prompt Injection (instrucciones maliciosas embebidas en datos que el LLM procesa, como emails o paginas web), y Jailbreaking (técnicas para evadir guardrails). Las técnicas incluyen: DAN (Do Anything Now), role-playing attacks, encoding/obfuscation de instrucciones, y multi-step social engineering del modelo. Cuando LLMs tienen acceso a herramientas (function calling), prompt injection puede llevar a data exfiltration, acciones no autorizadas en APIs, o code execution.',
    realWorldExamples: [
      {
        name: 'ChatGPT Plugins - Indirect Prompt Injection',
        year: '2023',
        description: 'Investigadores demostraron que paginas web maliciosas podian embeber instrucciones ocultas que ChatGPT ejecutaba al navegar con plugins, permitiendo exfiltrar datos del usuario.',
        source: 'https://arxiv.org/abs/2302.12173',
      },
      {
        name: 'Bing Chat - Exfiltración via prompt injection en web',
        year: '2023',
        description: 'Se demostro que instrucciones embebidas en paginas web (texto invisible) podian hacer que Bing Chat filtrara el historial de conversacion del usuario a un servidor externo.',
        source: 'https://greshake.github.io/',
      },
      {
        name: 'Samsung - Fuga de codigo via ChatGPT',
        year: '2023',
        description: 'Empleados de Samsung compartieron codigo fuente confidencial y notas de reuniones internas con ChatGPT, resultando en fuga de propiedad intelectual. Samsung posteriormente prohibio el uso de herramientas IA generativa.',
        source: 'https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak',
      },
    ],
    cves: [],
    mitreTechniques: [
      { id: 'T1611', name: 'Escape to Host', url: 'https://attack.mitre.org/techniques/T1611/' },
    ],
    indicators: [
      'Inputs que contienen instrucciones meta ("ignora tus instrucciones anteriores")',
      'Intentos de extraer el system prompt del modelo',
      'Requests con encoding inusual (base64, rot13, únicode tricks)',
      'Patrones de multi-turn conversation que escalan privilegios gradualmente',
      'Outputs del modelo que contienen datos del system prompt o configuración interna',
    ],
    attackFlow: [
      'Reconocimiento: Identificar el LLM y sus capacidades (tools, APIs, datos)',
      'Craft de payload: Crear prompt injection directa o indirecta',
      'Inyección: Enviar payload como input o embeber en datos que el LLM procesa',
      'Bypass: Evadir filtros de seguridad con encoding o jailbreak techniques',
      'Exfiltración: Extraer system prompt, datos confidenciales, o ejecutar acciones',
    ],
    impact:
      'Fuga de system prompts e información confidencial, ejecución de acciones no autorizadas en APIs conectadas, generación de contenido danino, y manipulacion de respuestas del modelo para phishing o desinformación.',
    detectionMethods: [
      'Input/output filtering para patrones de prompt injection conocidos',
      'Guardrails como Llama Guard, NeMo Guardrails, o Azure AI Content Safety',
      'Monitoreo de outputs para detección de data leakage',
      'Sandboxing de herramientas y APIs accesibles por el LLM',
      'Red teaming periódico del sistema de IA',
    ],
    references: [
      { title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', type: 'standard' },
      { title: 'Not what you signed up for: Compromising Real-World LLM-Integrated Applications', url: 'https://arxiv.org/abs/2302.12173', type: 'paper' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-ai', type: 'standard' },
      { title: 'Garak - LLM Vulnerability Scanner', url: 'https://github.com/leondz/garak', type: 'tool' },
    ],
  },
  {
    code: 'A.IV.4',
    name: 'Inyección de consultas SQL',
    category: 'Inyección',
    description:
      'Insercion de codigo SQL malicioso en inputs de una aplicacion que son incorporados en consultas a la base de datos sin sanitizacion adecuada. Permite leer, modificar o eliminar datos, y en casos severos ejecutar comandos en el sistema operativo.',
    technicalDetail:
      'SQL injection puede ser: In-band (Classic) donde los resultados se muestran en la respuesta, Blind (Boolean/Time-based) donde se infiere información por el comportamiento de la aplicacion, y Out-of-band donde los datos se exfiltran por un canal alternativo (DNS, HTTP). Las técnicas avanzadas incluyen: UNION-based injection para combinar resultados, stacked queries para ejecutar multiples comandos, second-order injection donde el payload se almacena y ejecuta despues, y SQLi a RCE via xp_cmdshell (MSSQL), LOAD_FILE/INTO OUTFILE (MySQL), o COPY (PostgreSQL).',
    realWorldExamples: [
      {
        name: 'MOVEit Transfer - Cl0p Ransomware',
        year: '2023',
        description: 'SQL injection en MOVEit Transfer (CVE-2023-34362) fue explotada por Cl0p para robar datos de mas de 2,500 organizaciónes, incluyendo Shell, BBC, Ernst & Young, y multiples agencias del gobierno de EE.UU.',
        source: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a',
      },
      {
        name: 'Heartland Payment Systems',
        year: '2008',
        description: 'SQL injection llevo al robo de 130 millones de tarjetas de credito. Fue el breach de tarjetas mas grande de la historia en su momento. El atacante Albert Gonzalez fue sentenciado a 20 anos de prision.',
        source: 'https://www.justice.gov/opa/pr/leader-hacking-ring-sentenced-massive-identity-thefts-payment-processor-and-retail-networks',
      },
      {
        name: 'Sony Pictures Hack',
        year: '2011',
        description: 'Ataque de SQL injection contra Sony Pictures Online expuso datos de 77 millones de cuentas de PlayStation Network, resultando en una caida del servicio de 23 dias.',
        source: 'https://blog.playstation.com/2011/04/26/update-on-playstation-network-and-qriocity/',
      },
    ],
    cves: [
      { id: 'CVE-2023-34362', description: 'MOVEit Transfer SQL Injection (explotada por Cl0p)' },
      { id: 'CVE-2023-36934', description: 'MOVEit Transfer additional SQL injection' },
      { id: 'CVE-2024-27198', description: 'JetBrains TeamCity Authentication Bypass via SQLi' },
    ],
    mitreTechniques: [
      { id: 'T1505.001', name: 'SQL Stored Procedures', url: 'https://attack.mitre.org/techniques/T1505/001/' },
    ],
    indicators: [
      'Requests con caracteres SQL en parametros (quotes, UNION, SELECT, OR 1=1)',
      'Errores de base de datos expuestos en respuestas HTTP',
      'Tiempo de respuesta anomalo (indicador de time-based blind SQLi)',
      'Alertas WAF por patrones de SQL injection',
      'Consultas SQL anomalas en logs de base de datos',
    ],
    attackFlow: [
      'Descubrimiento: Identificar parametros inyectables (formularios, URLs, headers)',
      'Fingerprinting: Determinar tipo de DBMS (MySQL, MSSQL, PostgreSQL, Oracle)',
      'Explotación: Inyectar queries para extraer schema, tablas, y datos',
      'Escalamiento: Obtener credenciales de admin, pivotar a otros sistemas',
      'RCE (si aplica): Usar funciones del DBMS para ejecutar comandos OS',
    ],
    impact:
      'Acceso completo a la base de datos: lectura, modificación y eliminacion de datos. En casos severos, ejecución de comandos en el sistema operativo. Historicamente responsable de algunos de los breaches mas grandes (Heartland: 130M tarjetas, MOVEit: 2,500+ organizaciónes).',
    detectionMethods: [
      'WAF con reglas específicas para SQL injection (ModSecurity, AWS WAF)',
      'RASP (Runtime Application Self-Protection) como Contrast Security',
      'Database Activity Monitoring para queries anomalas',
      'SAST/DAST en pipeline CI/CD (SonarQube, Burp Suite, OWASP ZAP)',
      'Parametrized queries y ORM como mitigacion principal',
    ],
    references: [
      { title: 'OWASP - SQL Injection', url: 'https://owasp.org/www-community/attacks/SQL_Injection', type: 'standard' },
      { title: 'PortSwigger - SQL Injection', url: 'https://portswigger.net/web-security/sql-injection', type: 'blog' },
      { title: 'sqlmap - Automatic SQL Injection Tool', url: 'https://sqlmap.org/', type: 'tool' },
      { title: 'CWE-89: SQL Injection', url: 'https://cwe.mitre.org/data/definitions/89.html', type: 'standard' },
    ],
  },
  {
    code: 'B.I.5',
    name: 'Filtración de datos personales',
    category: 'Fuga de Información',
    description:
      'Exposición no autorizada de datos personales identificables (PII) como nombres, RUT/DNI, direcciones, datos de salud, información financiera. Puede ocurrir por breach externo, error interno, o insider threat.',
    technicalDetail:
      'La filtración de datos personales puede ocurrir por multiples vectores: exfiltración via malware o RAT, transferencia a servicios cloud no autorizados (shadow IT), envío por email, dispositivos USB, bases de datos expuestas, APIs sin autenticación que retornan PII, backups no cifrados, y screenshots/fotos de pantalla. Los datos se monetizan en mercados de la dark web donde un registro completo (fullz) con nombre, SSN, fecha de nacimiento, y datos financieros se vende entre $5-$65 USD dependiendo del pais.',
    realWorldExamples: [
      {
        name: 'Equifax Data Breach',
        year: '2017',
        description: 'Explotación de Apache Struts (CVE-2017-5638) expuso datos personales de 147 millones de personas incluyendo SSN, fechas de nacimiento y direcciones. Equifax pago $700M en acuerdos.',
        source: 'https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement',
      },
      {
        name: 'Marriott International',
        year: '2018',
        description: 'Breach del sistema de reservas Starwood expuso datos de 500 millones de huespedes incluyendo pasaportes y tarjetas de credito. El acceso no autorizado habia existido desde 2014.',
        source: 'https://news.marriott.com/news/2018/11/30/marriott-announces-starwood-guest-reservation-database-security-incident',
      },
      {
        name: 'LATAM - Filtraciónes en Chile',
        year: '2023',
        description: 'Multiples filtraciónes de bases de datos con RUT, nombres y datos financieros de ciudadanos chilenos fueron públicadas en foros de la dark web, afectando a millones de personas.',
        source: 'https://www.csirt.gob.cl/',
      },
    ],
    cves: [
      { id: 'CVE-2017-5638', description: 'Apache Struts RCE - Usado en breach de Equifax' },
    ],
    mitreTechniques: [
      { id: 'T1567', name: 'Exfiltration Over Web Service', url: 'https://attack.mitre.org/techniques/T1567/' },
      { id: 'T1005', name: 'Data from Local System', url: 'https://attack.mitre.org/techniques/T1005/' },
    ],
    indicators: [
      'Transferencias masivas de datos a destinos externos',
      'Queries de base de datos que extraen grandes volumenes de PII',
      'Uso de servicios de file sharing no corporativos',
      'Alertas DLP por contenido con patrones de PII (SSN, tarjetas, RUT)',
      'Datos de la organización aparecen en dark web o paste sites',
    ],
    attackFlow: [
      'Acceso: Compromiso de sistema con acceso a datos personales',
      'Reconocimiento: Identificacion de bases de datos con PII valiosa',
      'Recoleccion: Dump de datos mediante queries, export, o copia de archivos',
      'Staging: Compresion y/o cifrado de datos para exfiltración',
      'Exfiltración: Transferencia a servidor externo, cloud, o medio físico',
      'Monetizacion: Venta en dark web, extorsion, o uso para fraude',
    ],
    impact:
      'Violacion de regulaciones de privacidad (GDPR multa hasta 4% revenue global, LGPD). Robo de identidad para victimas. Dano reputacional severo. Costos de notificación, remediation y litigio. Equifax pago $700M, Marriott 18.4M GBP en multas GDPR.',
    detectionMethods: [
      'DLP (Data Loss Prevention) en endpoints, email y red',
      'CASB para monitorear uso de servicios cloud no autorizados',
      'Database Activity Monitoring para queries anomalas sobre tablas con PII',
      'Monitoreo de dark web para datos de la organización (Digital Shadows, Recorded Future)',
      'Clasificación automática de datos sensibles con herramientas como Varonis',
    ],
    references: [
      { title: 'GDPR - Reglamento General de Protección de Datos', url: 'https://gdpr-info.eu/', type: 'standard' },
      { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', type: 'standard' },
      { title: 'Verizon DBIR (Data Breach Investigations Report)', url: 'https://www.verizon.com/business/resources/reports/dbir/', type: 'paper' },
      { title: 'Identity Theft Resource Center', url: 'https://www.idtheftcenter.org/', type: 'blog' },
    ],
  },
  {
    code: 'C.I.5',
    name: 'Denegación de servicio por explotación',
    category: 'Denegación de Servicio',
    description:
      'Interrupcion de servicio causada por la explotación de vulnerabilidades de software que provocan crash, consumo excesivo de recursos, o estado irrecuperable del servicio, a diferencia de DDoS volumetrico.',
    technicalDetail:
      'A diferencia del DDoS volumetrico, este tipo de DoS explota vulnerabilidades específicas para causar caida del servicio con mínimo tráfico. Ejemplos incluyen: ReDoS (Regular Expression DoS) con inputs que causan backtracking exponencial, HTTP/2 Rapid Reset (CVE-2023-44487) que abusa del protocolo, Slowloris que mantiene conexiónes HTTP abiertas con headers incompletos, vulnerabilidades que causan null pointer dereference o infinite loops, y ataques de complejidad algoritmica (hash collision DoS).',
    realWorldExamples: [
      {
        name: 'HTTP/2 Rapid Reset Attack',
        year: '2023',
        description: 'Nuevo tipo de DDoS que abusaba de la caracteristica RST_STREAM de HTTP/2. Google reporto un ataque record de 398 millones de requests por segundo. Afecto a servidores Nginx, Apache, y servicios cloud.',
        source: 'https://cloud.google.com/blog/products/identity-security/how-it-works-the-novel-http2-rapid-reset-ddos-attack',
      },
      {
        name: 'Apache Log4j DoS',
        year: '2021',
        description: 'Ademas del RCE, Log4Shell podia causar DoS mediante lookups recursivos que consumian toda la memoria del servidor.',
        source: 'https://logging.apache.org/log4j/2.x/security.html',
      },
    ],
    cves: [
      { id: 'CVE-2023-44487', description: 'HTTP/2 Rapid Reset - DDoS por abuso de protocolo' },
      { id: 'CVE-2022-21449', description: 'Java Psychic Signatures - Bypass de ECDSA que podia causar DoS' },
    ],
    mitreTechniques: [
      { id: 'T1499', name: 'Endpoint Denial of Service', url: 'https://attack.mitre.org/techniques/T1499/' },
      { id: 'T1499.004', name: 'Application or System Exploitation', url: 'https://attack.mitre.org/techniques/T1499/004/' },
    ],
    indicators: [
      'Crash repetido de servicios con el mismo patron',
      'Consumo anomalo de CPU/memoria sin aumento proporcional de tráfico',
      'Requests HTTP con payloads disenados para causar procesamiento excesivo',
      'Conexiónes HTTP/2 con patron de RST_STREAM rápido',
      'Core dumps o logs de error indicando null pointer o stack overflow',
    ],
    attackFlow: [
      'Reconocimiento: Identificar version de software y vulnerabilidades conocidas',
      'Craft de payload: Crear request que explote la vulnerabilidad especifica',
      'Envío: Dirigir el payload al servicio objetivo',
      'Impacto: Crash del servicio, consumo de recursos, o estado irrecuperable',
      'Persistencia: Repetir automáticamente para mantener el servicio caido',
    ],
    impact:
      'Interrupcion del servicio que puede ser prolongada si no se identifica la causa raíz. A diferencia del DDoS volumetrico, requiere poco ancho de banda pero puede ser muy efectivo. El HTTP/2 Rapid Reset genero el ataque DDoS mas grande jamas registrado.',
    detectionMethods: [
      'Monitoreo de crash loops en servicios con herramientas de APM',
      'Rate limiting y circuit breakers en APIs y servicios web',
      'Actualizacion proactiva de software vulnerable',
      'WAF con protección contra HTTP/2 abuse',
      'Alertas de consumo anomalo de recursos (CPU > 90% sin justificacion)',
    ],
    references: [
      { title: 'OWASP - Denial of Service', url: 'https://owasp.org/www-community/attacks/Denial_of_Service', type: 'standard' },
      { title: 'Cloudflare - HTTP/2 Rapid Reset', url: 'https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/', type: 'blog' },
      { title: 'CISA - HTTP/2 Rapid Reset Advisory', url: 'https://www.cisa.gov/news-events/alerts/2023/10/10/http2-rapid-reset-vulnerability-cve-2023-44487', type: 'standard' },
    ],
  },
  {
    code: 'D.I.4',
    name: 'Modificación de logs de auditoria',
    category: 'Alteración de Datos',
    description:
      'Manipulacion, eliminacion o alteración de registros de auditoria y logs para ocultar evidencia de actividad maliciosa. Es una técnica anti-forensics crítica que los atacantes usan para cubrir sus huellas.',
    technicalDetail:
      'Los atacantes modifican logs para eliminar evidencia de su actividad. Las técnicas incluyen: eliminacion selectiva de entradas de log (sed/grep en Linux, wevtutil en Windows), truncamiento de archivos de log, modificación de timestamps, deshabilitar servicios de logging (auditd, Windows Event Log), redireccion de logs a /dev/null, manipulacion de syslog, y limpieza de logs de aplicaciones web. Los atacantes avanzados (APTs) usan herramientas especializadas como Timestomp para modificar MAC times y Log Killer para Windows Event Logs.',
    realWorldExamples: [
      {
        name: 'SolarWinds Sunburst',
        year: '2020',
        description: 'El malware Sunburst incluia funcionalidad especifica para manipular logs, deshabilitando servicios de auditoria y eliminando entradas de Event Log de Windows relacionadas con su actividad.',
        source: 'https://www.mandiant.com/resources/blog/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor',
      },
      {
        name: 'APT29 (Cozy Bear) - Log Tampering',
        year: '2021',
        description: 'CISA reporto que APT29 sistematicamente deshabilitaba logging en servidores comprometidos y eliminaba logs de Exchange Online para ocultar su acceso a correos del gobierno de EE.UU.',
        source: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-148a',
      },
    ],
    cves: [],
    mitreTechniques: [
      { id: 'T1070.001', name: 'Indicator Removal: Clear Windows Event Logs', url: 'https://attack.mitre.org/techniques/T1070/001/' },
      { id: 'T1070.003', name: 'Indicator Removal: Clear Command History', url: 'https://attack.mitre.org/techniques/T1070/003/' },
    ],
    indicators: [
      'Gaps o huecos en la secuencia temporal de logs',
      'Reduccion subita del volumen de logs',
      'Eventos de "log cleared" o "audit policy changed" en Windows Event Log (Event ID 1102)',
      'Servicios de logging detenidos (auditd, rsyslog)',
      'Modificación de permisos en directorios de logs',
    ],
    attackFlow: [
      'Compromiso: Obtener acceso con privilegios al sistema',
      'Identificacion: Localizar archivos y servicios de logging',
      'Supresion: Deshabilitar logging en tiempo real para actividad futura',
      'Limpieza: Eliminar o modificar logs existentes de la actividad pasada',
      'Validación: Verificar que no quedan rastros en logs alternativos',
    ],
    impact:
      'Destrucción de evidencia forense, imposibilidad de reconstruir el timeline del incidente, incumplimiento de requisitos regulatorios de retencion de logs, y potencial de que el atacante continue operando sin detección.',
    detectionMethods: [
      'Envío de logs a SIEM centralizado e inmutable (no modificable desde el endpoint)',
      'Alertas por Event ID 1102 (Windows audit log cleared)',
      'Monitoreo de estado de servicios de logging (auditd, syslog)',
      'Comparacion de volumen de logs contra baseline',
      'Logs write-once en almacenamiento WORM (Write Once Read Many)',
      'Integridad de logs con hashing y blockchain-based logging',
    ],
    references: [
      { title: 'MITRE ATT&CK - Indicator Removal', url: 'https://attack.mitre.org/techniques/T1070/', type: 'standard' },
      { title: 'NIST SP 800-92: Guide to Computer Security Log Management', url: 'https://csrc.nist.gov/públications/detail/sp/800-92/final', type: 'standard' },
      { title: 'SANS - Log Management Best Practices', url: 'https://www.sans.org/white-papers/35542/', type: 'paper' },
    ],
  },
  // ── A.II.2 ──────────────────────────────────────────────────────────────────
  {
    code: 'A.II.2',
    name: 'Inclusión de sitio fraudulento en infraestructura propia',
    category: 'Acceso No Autorizado',
    description:
      'Ocurre cuando un atacante logra alojar o referenciar contenido fraudulento (páginas de phishing, iframes maliciosos, redirectores) dentro de la infraestructura legítima de una organización. Esto otorga al sitio malicioso la reputación y el dominio confiable de la víctima, aumentando drásticamente la tasa de éxito de los engaños.',
    technicalDetail:
      'Los vectores más comunes incluyen: compromiso de CMS (WordPress, Drupal, Joomla) mediante plugins vulnerables o credenciales débiles para subir páginas de phishing; abuso de funcionalidades de redirección abierta (Open Redirect) en aplicaciones web; inyección de iframes en páginas existentes a través de XSS persistente; o aprovechamiento de subdominios abandonados (Subdomain Takeover) que aún resuelven a infraestructura de la organización. Las herramientas de phishing-kit como Evilginx2 o Gophish facilitan la creación de páginas clonadas que se alojan en la infraestructura comprometida. El atacante también puede abusar de buckets S3 o Azure Blob Storage con hosting estático habilitado.',
    realWorldExamples: [
      {
        name: 'Subdomain Takeover en Zendesk y otros SaaS',
        year: '2021',
        description: 'Investigadores documentaron miles de subdominios de empresas Fortune 500 vulnerables a takeover, permitiendo a atacantes alojar contenido fraudulento bajo dominios corporativos legítimos.',
        source: 'https://0xpatrik.com/subdomain-takeover-basics/',
      },
      {
        name: 'Compromiso de sitios WordPress para phishing bancario',
        year: '2022',
        description: 'Campañas masivas comprometieron sitios WordPress legítimos para alojar páginas de phishing contra clientes de bancos latinoamericanos, aprovechando la reputación de los dominios para evadir filtros.',
        source: 'https://blog.sucuri.net/2022/08/wordpress-malware-redirects-to-phishing-pages.html',
      },
      {
        name: 'Open Redirect en Google para phishing',
        year: '2020',
        description: 'Atacantes explotaron una vulnerabilidad de open redirect en servicios de Google para crear URLs de phishing que parecían legítimas de google.com, engañando a usuarios y filtros de correo.',
        source: 'https://www.bleepingcomputer.com/news/security/google-open-redirect-flaw-actively-abused-in-phishing-campaigns/',
      },
    ],
    cves: [
      { id: 'CVE-2022-21661', description: 'WordPress Core - SQL injection que permitía compromiso para alojar contenido malicioso' },
      { id: 'CVE-2021-34473', description: 'Microsoft Exchange Server - SSRF que facilitaba el uso de infraestructura propia para ataques' },
      { id: 'CVE-2020-11738', description: 'WordPress Duplicator Plugin - Path traversal para subir archivos maliciosos' },
    ],
    mitreTechniques: [
      { id: 'T1583.001', name: 'Acquire Infrastructure: Domains', url: 'https://attack.mitre.org/techniques/T1583/001/' },
      { id: 'T1584', name: 'Compromise Infrastructure', url: 'https://attack.mitre.org/techniques/T1584/' },
    ],
    indicators: [
      'Nuevos archivos o directorios creados en el servidor web sin cambios de despliegue autorizados',
      'Tráfico HTTP hacia rutas desconocidas o no documentadas en el servidor',
      'Presencia de kits de phishing (archivos .zip, carpetas con páginas clonadas de bancos)',
      'Subdominios con registros DNS apuntando a servicios externos no autorizados',
      'Alertas de Google Search Console o Safe Browsing sobre contenido malicioso',
      'Logs de acceso con patrones de scraping de páginas de login',
    ],
    attackFlow: [
      'Reconocimiento: Identificar CMS, subdominios y funcionalidades de redirect en la organización objetivo',
      'Compromiso inicial: Explotar plugin vulnerable, credenciales débiles o subdomain takeover',
      'Instalación: Subir kit de phishing o configurar redirección al sitio fraudulento',
      'Operación: Distribuir URLs del sitio fraudulento por correo, SMS o redes sociales',
      'Recolección: Capturar credenciales o datos de víctimas que visitan el sitio',
      'Limpieza: Eliminar evidencia del kit para evitar detección',
    ],
    impact:
      'Daño severo a la reputación de la organización al vincular su dominio con actividades fraudulentas. Las víctimas del phishing pueden demandar a la organización por negligencia. Los buscadores pueden marcar el sitio como peligroso (Google Safe Browsing), afectando el SEO y la confianza de todos los usuarios.',
    detectionMethods: [
      'Monitoreo de integridad de archivos (FIM) en el servidor web con OSSEC o Wazuh',
      'Escaneo periódico de subdominios con Subfinder o Amass para detectar takeovers',
      'Alertas automáticas de Google Search Console y Bing Webmaster Tools',
      'Web Application Firewall (WAF) con reglas para detectar upload de kits de phishing',
      'Escaneo de reputación de dominio con VirusTotal y URLscan.io',
      'Revisión de logs de acceso para detectar rutas anómalas con alto tráfico',
    ],
    references: [
      { title: 'OWASP - Unvalidated Redirects and Forwards', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html', type: 'standard' },
      { title: 'Subdomain Takeover - HackerOne', url: 'https://www.hackerone.com/application-security/guide-subdomain-takeovers', type: 'blog' },
      { title: 'Google Safe Browsing API', url: 'https://developers.google.com/safe-browsing', type: 'tool' },
      { title: 'MITRE ATT&CK - Compromise Infrastructure', url: 'https://attack.mitre.org/techniques/T1584/', type: 'standard' },
    ],
  },
  // ── A.III.1 ─────────────────────────────────────────────────────────────────
  {
    code: 'A.III.1',
    name: 'Envío de correo no deseado sobre una organización',
    category: 'Acceso No Autorizado',
    description:
      'Campañas de spam o phishing en las que el nombre, marca o infraestructura de una organización es utilizada sin autorización para engañar a destinatarios. El atacante envía correos masivos que aparentan provenir de la organización víctima para distribuir malware, robar credenciales o cometer fraude.',
    technicalDetail:
      'Los atacantes emplean spoofing de dominio explotando la ausencia o misconfiguration de registros SPF, DKIM y DMARC. Herramientas como Gophish, King Phisher o SET (Social Engineering Toolkit) automatizan el envío. Las técnicas incluyen: uso de dominios lookalike (homoglyph attacks: rnicrosoft.com), subdominios de servicios legítimos (mail.empresa-phishing.com), abuso de servicios de email marketing (SendGrid, Mailchimp) con cuentas comprometidas, y explotación de open relays SMTP. El Business Email Compromise (BEC) es una variante sofisticada donde se suplanta al CEO o CFO para ordenar transferencias bancarias.',
    realWorldExamples: [
      {
        name: 'Campaña BEC contra empresas latinoamericanas',
        year: '2022',
        description: 'El grupo Cosmic Lynx (APT ruso) lanzó campañas BEC sofisticadas suplantando CEOs de empresas Fortune 500, solicitando transferencias millonarias a bancos en Hong Kong.',
        source: 'https://www.agari.com/email-security-blog/cosmic-lynx-russian-bec/',
      },
      {
        name: 'Phishing masivo suplantando BBVA y Santander',
        year: '2023',
        description: 'Campañas masivas de phishing en España y Latinoamérica suplantaron la identidad de BBVA y Santander con dominios lookalike, comprometiendo miles de cuentas bancarias.',
        source: 'https://www.incibe.es/incibe-cert/alerta-temprana/avisos/campana-phishing-suplantando-entidades-bancarias',
      },
      {
        name: 'IRS Phishing Campaign - EE.UU.',
        year: '2021',
        description: 'Atacantes suplantaron al IRS durante la temporada de impuestos enviando millones de correos fraudulentos solicitando datos personales y bancarios de ciudadanos estadounidenses.',
        source: 'https://www.irs.gov/newsroom/irs-warns-of-new-phishing-scam-involving-economic-impact-payments',
      },
    ],
    cves: [
      { id: 'CVE-2020-10713', description: 'BootHole - Vulnerabilidad en GRUB2 distribuida por correo phishing con archivos adjuntos maliciosos' },
      { id: 'CVE-2017-11882', description: 'Microsoft Office Equation Editor - Explotado masivamente en campañas de phishing con adjuntos Word' },
    ],
    mitreTechniques: [
      { id: 'T1566.001', name: 'Phishing: Spearphishing Attachment', url: 'https://attack.mitre.org/techniques/T1566/001/' },
      { id: 'T1566.002', name: 'Phishing: Spearphishing Link', url: 'https://attack.mitre.org/techniques/T1566/002/' },
    ],
    indicators: [
      'Quejas de clientes o socios por correos sospechosos que aparentan ser de la organización',
      'Aumento en reportes de spam/phishing en herramientas como PhishTank con el dominio propio',
      'Registros DNS de dominios lookalike similares al dominio corporativo',
      'Ausencia o fallo en registros DMARC que permita spoofing del dominio',
      'Alertas de Google Workspace o Microsoft 365 Defender por uso indebido del dominio',
    ],
    attackFlow: [
      'Reconocimiento: Recolectar información de la organización (empleados, logo, plantillas de correo reales)',
      'Preparación: Registrar dominios lookalike o configurar spoofing donde DMARC es ausente',
      'Infraestructura: Configurar servidores SMTP o abusar de servicios de email marketing',
      'Envío masivo: Distribuir correos con señuelos relevantes (facturas, RR.HH., alertas de seguridad)',
      'Explotación: Víctima hace clic en enlace malicioso o abre adjunto infectado',
      'Monetización: Robo de credenciales, fraude bancario o instalación de ransomware',
    ],
    impact:
      'Daño a la reputación corporativa, pérdida de confianza de clientes, posibles responsabilidades legales si las víctimas sufren pérdidas económicas. La organización víctima puede ser incluida en listas negras de correo, afectando la entregabilidad de sus comunicaciones legítimas.',
    detectionMethods: [
      'Implementar y monitorear política DMARC en modo reject (p=reject)',
      'Monitoreo de registros de dominios similares con herramientas como dnstwist o CertStream',
      'Revisar reportes DMARC diarios (rua/ruf) para detectar intentos de spoofing',
      'Alertas de PhishTank y APWG (Anti-Phishing Working Group) con el dominio propio',
      'Monitoreo de redes sociales y foros para detección temprana de campañas',
      'Servicios de Brand Protection como Recorded Future o ZeroFOX',
    ],
    references: [
      { title: 'DMARC.org - Email Authentication', url: 'https://dmarc.org/', type: 'standard' },
      { title: 'APWG eCrime Reports', url: 'https://apwg.org/resources/apwg-reports/', type: 'paper' },
      { title: 'NIST SP 800-177: Trustworthy Email', url: 'https://csrc.nist.gov/publications/detail/sp/800-177/rev-1/final', type: 'standard' },
      { title: 'dnstwist - Domain Name Permutation Engine', url: 'https://github.com/elceef/dnstwist', type: 'tool' },
    ],
  },
  // ── A.III.2 ─────────────────────────────────────────────────────────────────
  {
    code: 'A.III.2',
    name: 'Envío usando remitentes de la institución',
    category: 'Acceso No Autorizado',
    description:
      'El atacante envía correos maliciosos utilizando cuentas o servidores de correo reales de la organización, tras haber comprometido una cuenta de usuario o el propio servidor SMTP. A diferencia del spoofing externo, estos correos pasan todos los controles de autenticación (SPF, DKIM, DMARC) porque provienen de infraestructura legítima.',
    technicalDetail:
      'El compromiso de cuentas de correo puede ocurrir mediante: phishing previo, credential stuffing, acceso a buzones con OAuth token theft (abuso de aplicaciones maliciosas de terceros), o compromiso del servidor Exchange/O365 mediante vulnerabilidades como ProxyShell. Una vez con acceso, el atacante usa la cuenta para enviar phishing interno (Business Email Compromise) o para distribuir malware a la lista de contactos. La técnica T1566.003 (Spearphishing via Service) incluye el abuso de servicios internos de mensajería y correo. Las reglas de reenvío automático (inbox rules) son frecuentemente configuradas para mantener acceso persistente.',
    realWorldExamples: [
      {
        name: 'Compromiso de Exchange Online en ataque SolarWinds',
        year: '2020',
        description: 'Actores de Nobelium comprometieron cuentas de correo de USAID y otras organizaciones gubernamentales usando tokens OAuth robados, enviando phishing desde cuentas legítimas de estas organizaciones.',
        source: 'https://msrc-blog.microsoft.com/2021/05/27/new-sophisticated-email-based-attack-from-nobelium/',
      },
      {
        name: 'Compromiso de correos corporativos en sector salud',
        year: '2021',
        description: 'Atacantes comprometieron cuentas de correo de hospitales en EE.UU. y enviaron correos internos solicitando cambios de datos bancarios para pagos de nómina, desviando millones de dólares.',
        source: 'https://www.hhs.gov/sites/default/files/wire-transfer-fraud-and-bec.pdf',
      },
    ],
    cves: [
      { id: 'CVE-2021-34473', description: 'Microsoft Exchange Server ProxyShell - RCE que permitía comprometer el servidor de correo y enviar desde cuentas legítimas' },
      { id: 'CVE-2021-26855', description: 'Microsoft Exchange Server ProxyLogon - SSRF para acceso a buzones sin autenticación' },
    ],
    mitreTechniques: [
      { id: 'T1566.003', name: 'Phishing: Spearphishing via Service', url: 'https://attack.mitre.org/techniques/T1566/003/' },
      { id: 'T1078', name: 'Valid Accounts', url: 'https://attack.mitre.org/techniques/T1078/' },
    ],
    indicators: [
      'Reglas de reenvío automático configuradas hacia dominios externos no autorizados',
      'Correos enviados fuera del horario laboral habitual de la cuenta',
      'Volumen de correos enviados muy superior al promedio histórico de la cuenta',
      'Inicio de sesión desde IPs o ubicaciones geográficas no habituales',
      'Aplicaciones OAuth de terceros autorizadas no reconocidas en el tenant',
      'Quejas de destinatarios por correos inesperados provenientes de la cuenta',
    ],
    attackFlow: [
      'Acceso inicial: Comprometer cuenta de correo mediante phishing, credential stuffing o explotación de servidor',
      'Persistencia: Configurar regla de reenvío automático o aplicación OAuth maliciosa',
      'Reconocimiento: Leer correos para entender contexto, jerarquía y conversaciones en curso',
      'Preparación: Redactar correos de phishing o BEC aprovechando contexto real de la organización',
      'Envío: Distribuir correos maliciosos desde la cuenta legítima comprometida',
      'Explotación: Engañar a destinatarios para transferir fondos, revelar credenciales o ejecutar malware',
    ],
    impact:
      'Alto impacto financiero por fraudes BEC (pérdidas medias de USD 125.000 por incidente según FBI IC3). Daño reputacional grave al comprometer la confianza en las comunicaciones internas. Posible escalada a compromiso total de la red si se distribuye malware internamente.',
    detectionMethods: [
      'Auditoría periódica de reglas de reenvío automático en buzones (Exchange, Gmail)',
      'Alertas de Microsoft Defender for Office 365 o Google Workspace sobre actividad anómala',
      'MFA obligatorio en todas las cuentas de correo para dificultar acceso con credenciales robadas',
      'SIEM con reglas de correlación para detectar logins anómalos seguidos de envíos masivos',
      'Revisión trimestral de aplicaciones OAuth autorizadas en el tenant',
      'User and Entity Behavior Analytics (UEBA) para detectar patrones de envío inusuales',
    ],
    references: [
      { title: 'FBI IC3 - Business Email Compromise', url: 'https://www.ic3.gov/Media/Y2023/PSA230609', type: 'standard' },
      { title: 'CISA - Microsoft Exchange ProxyShell', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-321a', type: 'standard' },
      { title: 'Microsoft - Defending Against OAuth App Attacks', url: 'https://www.microsoft.com/en-us/security/blog/2022/09/22/microsoft-investigation-compromised-connector-cloud-flow/', type: 'blog' },
    ],
  },
  // ── A.IV.3 ──────────────────────────────────────────────────────────────────
  {
    code: 'A.IV.3',
    name: 'Inyección de consultas NoSQL',
    category: 'Acceso No Autorizado',
    description:
      'Ataque que explota la falta de sanitización en consultas a bases de datos NoSQL (MongoDB, CouchDB, Redis, Cassandra) para manipular la lógica de las consultas. A diferencia de SQLi, utiliza operadores específicos del motor NoSQL (como $where, $gt, $regex en MongoDB) para evadir autenticación o extraer datos.',
    technicalDetail:
      'En MongoDB, la inyección más común explota el paso de objetos JSON directamente sin validación. Por ejemplo, en un login: `{"username": "admin", "password": {"$gt": ""}}` devuelve verdadero para cualquier contraseña. Los operadores JavaScript ($where) permiten inyección de código ejecutado en el motor. En Redis, la inyección puede ocurrir a través de comandos concatenados en RESP protocol. Las herramientas NoSQLMap y nosql-injection-fuzzer automatizan la detección y explotación. En aplicaciones Node.js con Mongoose, la falta de validación de tipos permite que parámetros de query string se interpreten como objetos.',
    realWorldExamples: [
      {
        name: 'Vulnerabilidad NoSQLi en aplicación de telecomunicaciones',
        year: '2021',
        description: 'Investigadores de NCC Group documentaron inyección NoSQL en múltiples APIs REST de telecomunicaciones que usaban MongoDB, permitiendo bypass de autenticación con el operador $ne.',
        source: 'https://research.nccgroup.com/2021/03/15/nosql-injection-in-node-js/',
      },
      {
        name: 'HackerOne - NoSQL Injection en plataforma SaaS',
        year: '2022',
        description: 'Un investigador de bug bounty descubrió inyección NoSQL en una plataforma SaaS de gestión empresarial, permitiendo extracción de todos los registros de usuarios sin autenticación.',
        source: 'https://hackerone.com/reports/1430373',
      },
      {
        name: 'Exposición de datos en CouchDB sin autenticación',
        year: '2017',
        description: 'Miles de instancias CouchDB expusieron datos mediante consultas maliciosas aprovechando la API REST sin autenticación habilitada por defecto en versiones antiguas.',
        source: 'https://www.shodan.io/search?query=couchdb',
      },
    ],
    cves: [
      { id: 'CVE-2019-7609', description: 'Kibana - Prototype pollution que facilitaba inyección en consultas Elasticsearch' },
      { id: 'CVE-2022-24999', description: 'qs library (Node.js) - Prototype pollution que permite manipulación de consultas NoSQL' },
    ],
    mitreTechniques: [
      { id: 'T1505.003', name: 'Server Software Component: Web Shell', url: 'https://attack.mitre.org/techniques/T1505/003/' },
      { id: 'T1190', name: 'Exploit Public-Facing Application', url: 'https://attack.mitre.org/techniques/T1190/' },
    ],
    indicators: [
      'Parámetros HTTP con caracteres especiales NoSQL: $where, $gt, $ne, $regex, $exists',
      'Respuestas de autenticación exitosas sin credenciales válidas conocidas',
      'Consultas con tiempo de respuesta anómalamente alto (uso de $where con JS)',
      'Errores de aplicación exponiendo stack traces con nombres de colecciones MongoDB',
      'Logs de aplicación con objetos JSON anómalos en campos de login o búsqueda',
    ],
    attackFlow: [
      'Reconocimiento: Identificar tecnología NoSQL utilizada (headers, errores, tiempo de respuesta)',
      'Prueba: Inyectar operadores básicos ($gt, $ne) en campos de autenticación o búsqueda',
      'Bypass de autenticación: Usar operador que siempre evalúe a verdadero para acceder sin credenciales',
      'Extracción de datos: Usar $regex con fuerza bruta para extraer valores campo por campo',
      'Escalada: Explotar operadores JavaScript ($where) para ejecutar código en el servidor',
      'Exfiltración: Descargar colecciones completas de la base de datos',
    ],
    impact:
      'Acceso no autorizado a datos de usuarios, bypass completo de autenticación, exfiltración masiva de información sensible almacenada en la base de datos NoSQL. En casos con operadores JavaScript, puede escalar a ejecución remota de código.',
    detectionMethods: [
      'WAF con reglas específicas para detectar operadores NoSQL en parámetros HTTP',
      'Validación estricta de tipos en la aplicación (nunca aceptar objetos donde se espera string)',
      'Monitoreo de logs de aplicación para caracteres y operadores NoSQL en inputs',
      'Herramientas DAST (OWASP ZAP, Burp Suite) con payloads NoSQLi en el ciclo CI/CD',
      'Database Activity Monitoring para detectar consultas con operadores inusuales',
    ],
    references: [
      { title: 'OWASP - Testing for NoSQL Injection', url: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection', type: 'standard' },
      { title: 'NoSQLMap - Automated NoSQL Exploitation', url: 'https://github.com/codingo/NoSQLMap', type: 'tool' },
      { title: 'NCC Group - NoSQL Injection Research', url: 'https://research.nccgroup.com/2021/03/15/nosql-injection-in-node-js/', type: 'paper' },
    ],
  },
  // ── B.I.1 ───────────────────────────────────────────────────────────────────
  {
    code: 'B.I.1',
    name: 'Adversario en el medio (MitM)',
    category: 'Recopilación de Información',
    description:
      'Ataque en el que el adversario se posiciona entre dos partes comunicantes para interceptar, leer o modificar el tráfico sin que ninguna de las partes lo detecte. Afecta la confidencialidad e integridad de las comunicaciones y puede usarse para robar credenciales, sesiones o datos sensibles en tránsito.',
    technicalDetail:
      'Las técnicas MitM más comunes incluyen: ARP Poisoning (envenenamiento de caché ARP en redes locales usando herramientas como Ettercap, Bettercap, o arpspoof), DNS Spoofing (respuestas DNS falsas para redirigir tráfico), SSL Stripping (downgrade de HTTPS a HTTP con sslstrip), rogue access points Wi-Fi (Evil Twin), y BGP Hijacking a nivel de enrutamiento global. En entornos modernos con TLS, los ataques se enfocan en: certificados falsos con CAs comprometidas, explotación de HSTS preload incompleto, y abuso de proxies transparentes. Herramientas como mitmproxy, Wireshark y Responder son usadas en fases de reconocimiento y captura.',
    realWorldExamples: [
      {
        name: 'BGP Hijacking por Rostelecom',
        year: '2020',
        description: 'Rostelecom (operador ruso) anunció incorrectamente prefijos BGP de más de 8.800 rutas de internet, redirigiendo tráfico de Google, Amazon, Cloudflare y otras empresas a través de sus redes.',
        source: 'https://www.manrs.org/2020/04/not-just-russian-bgp-hijacking-affecting-major-internet-companies/',
      },
      {
        name: 'Operación Windigo - MitM en servidores Linux',
        year: '2014',
        description: 'Malware Ebury comprometió 25.000 servidores Linux para realizar MitM en conexiones SSH, robando credenciales de administradores que se conectaban a servidores comprometidos.',
        source: 'https://www.welivesecurity.com/wp-content/uploads/2014/03/operation_windigo.pdf',
      },
      {
        name: 'Superfish - Lenovo preinstala CA maliciosa',
        year: '2015',
        description: 'Lenovo preinstalaba adware Superfish con una CA raíz propia, permitiendo MitM en todo el tráfico HTTPS de portátiles vendidos, interceptando comunicaciones bancarias y de correo.',
        source: 'https://www.eff.org/deeplinks/2015/02/further-analysis-superfish-adware',
      },
    ],
    cves: [
      { id: 'CVE-2014-0160', description: 'Heartbleed - OpenSSL memory disclosure que permitía interceptar claves privadas para MitM' },
      { id: 'CVE-2021-3449', description: 'OpenSSL - NULL pointer dereference en TLS 1.2 renegociación que facilitaba ataques MitM' },
      { id: 'CVE-2015-0204', description: 'FREAK Attack - Downgrade de RSA export ciphers facilitando MitM en conexiones TLS' },
    ],
    mitreTechniques: [
      { id: 'T1557', name: 'Adversary-in-the-Middle', url: 'https://attack.mitre.org/techniques/T1557/' },
      { id: 'T1557.001', name: 'ARP Cache Poisoning', url: 'https://attack.mitre.org/techniques/T1557/001/' },
      { id: 'T1557.002', name: 'LLMNR/NBT-NS Poisoning and SMB Relay', url: 'https://attack.mitre.org/techniques/T1557/002/' },
    ],
    indicators: [
      'Entradas ARP duplicadas o anómalas en la tabla ARP de dispositivos de red',
      'Certificados TLS con emisores desconocidos o no confiables en tráfico inspeccionado',
      'Latencia inusualmente alta en comunicaciones de red internas',
      'Alertas de HSTS o certificate pinning en navegadores o aplicaciones',
      'Tráfico LLMNR/NBT-NS inusual en capturas de red (Wireshark, Zeek)',
      'Múltiples dispositivos respondiendo a la misma IP en la red local',
    ],
    attackFlow: [
      'Posicionamiento: Conectarse a la misma red o comprometer un nodo intermedio (switch, router, DNS)',
      'Intercepción: Ejecutar ARP poisoning, DNS spoofing o configurar rogue AP para redirigir tráfico',
      'Descifrado: SSL stripping, uso de certificado falso o captura de tráfico no cifrado',
      'Captura: Recolectar credenciales, tokens de sesión, y datos sensibles del tráfico interceptado',
      'Modificación (opcional): Alterar el contenido de las comunicaciones en tiempo real',
      'Limpieza: Restaurar tablas ARP o desactivar el rogue AP para evitar detección',
    ],
    impact:
      'Robo de credenciales y sesiones activas, compromiso de comunicaciones confidenciales, fraude financiero mediante modificación de transacciones, y acceso a información privilegiada. En ataques BGP, puede afectar a millones de usuarios simultáneamente.',
    detectionMethods: [
      'Dynamic ARP Inspection (DAI) en switches gestionados para validar entradas ARP',
      'Implementación de HSTS Preload y Certificate Transparency monitoring',
      'Network Detection and Response (NDR) con análisis de anomalías en tráfico',
      'DNS Security Extensions (DNSSEC) para proteger respuestas DNS',
      'Monitoreo de BGP con herramientas como RIPE Stat o Cloudflare Radar',
      'Segmentación de red y 802.1X para control de acceso a la red local',
    ],
    references: [
      { title: 'MITRE ATT&CK - Adversary-in-the-Middle', url: 'https://attack.mitre.org/techniques/T1557/', type: 'standard' },
      { title: 'OWASP - Transport Layer Protection Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html', type: 'standard' },
      { title: 'Bettercap - Network Attack Framework', url: 'https://www.bettercap.org/', type: 'tool' },
      { title: 'EFF - Encrypting the Web', url: 'https://www.eff.org/encrypt-the-web', type: 'blog' },
    ],
  },
  // ── B.I.2 ───────────────────────────────────────────────────────────────────
  {
    code: 'B.I.2',
    name: 'Apropiación de credenciales mediante phishing',
    category: 'Recopilación de Información',
    description:
      'El atacante engaña a usuarios para que ingresen sus credenciales en sitios o formularios falsos que imitan portales legítimos. Las credenciales capturadas son luego usadas para acceder a sistemas reales de la organización, comprometiendo cuentas y datos.',
    technicalDetail:
      'Las campañas modernas de credential harvesting utilizan frameworks como Evilginx2 (proxy inverso que captura credenciales y cookies de sesión MFA), Modlishka o Muraena para ataques adversary-in-the-middle en tiempo real que eluden MFA basado en OTP. Los kits de phishing avanzados replican en tiempo real la interfaz del servicio objetivo con antibot, geofencing y detección de crawlers. El keylogging mediante JavaScript (formularios) captura entradas sin que el usuario envíe el formulario. Técnicas adicionales incluyen: QR code phishing (quishing), phishing por voz (vishing), y abuso de servicios legítimos (Google Forms, Microsoft Forms, Notion) como páginas de captura.',
    realWorldExamples: [
      {
        name: 'Twilio y Cloudflare - Campaña 0ktapus',
        year: '2022',
        description: 'La campaña 0ktapus comprometió más de 130 organizaciones mediante páginas de phishing que imitaban portales Okta, capturando credenciales y tokens MFA en tiempo real con proxy Evilginx.',
        source: 'https://www.group-ib.com/blog/0ktapus/',
      },
      {
        name: 'Operación Phishing Microsoft 365 - 10.000 organizaciones',
        year: '2022',
        description: 'Microsoft documentó una campaña de adversary-in-the-middle phishing que comprometió más de 10.000 organizaciones capturando tokens de sesión post-MFA de Office 365.',
        source: 'https://www.microsoft.com/en-us/security/blog/2022/07/12/from-cookie-theft-to-bec-attackers-use-aitm-phishing-sites-as-entry-point-to-further-financial-fraud/',
      },
    ],
    cves: [
      { id: 'CVE-2023-23397', description: 'Microsoft Outlook - Elevación de privilegios que permite robo de hashes NTLM sin interacción del usuario, complementando ataques de phishing' },
      { id: 'CVE-2021-34527', description: 'PrintNightmare - Explotado post-phishing para escalada de privilegios tras captura de credenciales iniciales' },
    ],
    mitreTechniques: [
      { id: 'T1566', name: 'Phishing', url: 'https://attack.mitre.org/techniques/T1566/' },
      { id: 'T1056.001', name: 'Input Capture: Keylogging', url: 'https://attack.mitre.org/techniques/T1056/001/' },
      { id: 'T1539', name: 'Steal Web Session Cookie', url: 'https://attack.mitre.org/techniques/T1539/' },
    ],
    indicators: [
      'Registros de dominios similares al corporativo creados recientemente (últimas 48 horas)',
      'Usuarios reportando haber recibido correos solicitando reingresar credenciales',
      'Logins exitosos desde IPs o ubicaciones geográficas no habituales post-campaña',
      'Alertas de imposible travel: mismo usuario autenticado desde dos países en minutos',
      'Peticiones HTTP a páginas de phishing conocidas en logs de proxy/DNS',
      'Tokens de sesión utilizados desde IPs diferentes a las del login original',
    ],
    attackFlow: [
      'Preparación: Registrar dominio lookalike y desplegar kit de phishing con proxy inverso',
      'Envío: Distribuir correo de phishing con enlace al sitio falso',
      'Captura: Víctima ingresa credenciales; el proxy las reenvía al sitio real y captura la sesión',
      'Evasión de MFA: Capturar cookie de sesión post-autenticación para eludir segundo factor',
      'Acceso: Usar credenciales o cookies capturadas para acceder al sistema real',
      'Persistencia: Registrar nueva aplicación OAuth, crear cuenta backdoor o establecer reenvío de correo',
    ],
    impact:
      'Compromiso total de cuentas de usuarios y administradores, acceso a datos corporativos sensibles, inicio de ataques BEC (Business Email Compromise) con pérdidas financieras promedio de USD 125.000, y uso como punto de entrada para ataques de ransomware.',
    detectionMethods: [
      'Implementar MFA resistente a phishing: FIDO2/WebAuthn (llaves de seguridad físicas)',
      'Monitoreo de registros de dominios similares con alertas automáticas (CertStream)',
      'Microsoft Defender for Identity o herramientas UEBA para detectar accesos anómalos',
      'Entrenamiento y simulacros de phishing periódicos para usuarios (KnowBe4, Proofpoint)',
      'Herramientas de reporteo de phishing en el cliente de correo (botón "Reportar phishing")',
      'Análisis de URLs en tiempo real con VirusTotal o herramientas de sandboxing de correo',
    ],
    references: [
      { title: 'CISA - Phishing Guidance', url: 'https://www.cisa.gov/sites/default/files/publications/phishing-infographic-508c.pdf', type: 'standard' },
      { title: 'Evilginx2 - Adversary-in-the-Middle Phishing Framework', url: 'https://github.com/kgretzky/evilginx2', type: 'tool' },
      { title: 'Group-IB - 0ktapus Campaign Analysis', url: 'https://www.group-ib.com/blog/0ktapus/', type: 'paper' },
      { title: 'FIDO Alliance - Phishing-Resistant MFA', url: 'https://fidoalliance.org/phishing-resistant-mfa/', type: 'standard' },
    ],
  },
  // ── B.I.3 ───────────────────────────────────────────────────────────────────
  {
    code: 'B.I.3',
    name: 'Base de datos sin protección expuestas',
    category: 'Recopilación de Información',
    description:
      'Bases de datos accesibles directamente desde Internet o redes internas sin requerir autenticación, o con credenciales por defecto, exponiendo su contenido completo a cualquier actor. Este tipo de exposición ocurre frecuentemente en entornos cloud mal configurados y en despliegues rápidos sin revisión de seguridad.',
    technicalDetail:
      'Los motores más frecuentemente expuestos incluyen MongoDB (27017), Elasticsearch (9200), Redis (6379), Cassandra (9042) y CouchDB (5984), todos los cuales históricamente no requerían autenticación por defecto. Los atacantes usan Shodan, Censys y BinaryEdge para identificar estas instancias en minutos. Las herramientas automatizadas como mongo-express-scanner o redis-cli permiten acceso inmediato. En entornos cloud, la misconfiguration de Security Groups (AWS) o Network Security Groups (Azure) deja puertos abiertos al mundo. Los grupos de ransomware como Meow y Midnight han automatizado el descubrimiento y cifrado de estas bases de datos, exigiendo rescate.',
    realWorldExamples: [
      {
        name: 'Elasticsearch - Datos de 250 millones de clientes Microsoft expuestos',
        year: '2020',
        description: 'Investigadores de Comparitech descubrieron un índice Elasticsearch de Microsoft con 250 millones de registros de soporte al cliente expuestos públicamente sin autenticación.',
        source: 'https://www.comparitech.com/blog/information-security/microsoft-customer-support-database-open/',
      },
      {
        name: 'Ataque Meow - Destrucción masiva de MongoDB y Elasticsearch',
        year: '2020',
        description: 'El ataque automatizado "Meow" borró más de 4.000 bases de datos MongoDB y Elasticsearch expuestas, reemplazando su contenido con la cadena "meow" como señal de que habían sido encontradas.',
        source: 'https://www.bleepingcomputer.com/news/security/new-meow-attack-has-destroyed-over-4-000-unsecured-databases/',
      },
      {
        name: 'Redis sin autenticación usado para minería de criptomonedas',
        year: '2018',
        description: 'Múltiples actores explotaron instancias Redis expuestas sin autenticación para escribir claves SSH autorizadas y obtener acceso al servidor, instalando malware de minería.',
        source: 'https://redis.io/docs/management/security/',
      },
    ],
    cves: [
      { id: 'CVE-2022-0543', description: 'Redis - Escape del sandbox Lua con ejecución de código arbitrario en instancias accesibles' },
      { id: 'CVE-2020-7954', description: 'Apache CouchDB - Escalada de privilegios en instancias con configuración por defecto' },
    ],
    mitreTechniques: [
      { id: 'T1530', name: 'Data from Cloud Storage', url: 'https://attack.mitre.org/techniques/T1530/' },
      { id: 'T1190', name: 'Exploit Public-Facing Application', url: 'https://attack.mitre.org/techniques/T1190/' },
    ],
    indicators: [
      'Instancia de base de datos con puerto abierto directamente en Internet (Shodan hit)',
      'Accesos a la base de datos desde rangos de IP públicos no autorizados',
      'Ausencia de registros de autenticación previos al acceso (sin login requerido)',
      'Volumen inusual de lecturas o exportaciones desde la base de datos',
      'Alertas de AWS Config, Azure Security Center o GCP Security Command Center sobre exposición',
      'Bases de datos encontradas en reportes de herramientas de escaneo como Shodan o Censys',
    ],
    attackFlow: [
      'Descubrimiento: Escanear Internet con Shodan/Censys buscando puertos de bases de datos abiertos',
      'Verificación: Confirmar acceso sin autenticación intentando conexión directa',
      'Enumeración: Listar bases de datos, colecciones y esquemas disponibles',
      'Exfiltración: Descargar datos completos con mongodump, elasticdump o redis-cli',
      'Destrucción/Extorsión (opcional): Borrar datos y dejar nota exigiendo rescate',
      'Monetización: Vender datos en foros clandestinos o usarlos para ataques dirigidos',
    ],
    impact:
      'Exposición masiva de datos de clientes (PII, datos financieros, credenciales), sanciones regulatorias (GDPR hasta 4% de facturación anual global), daño reputacional severo, y posible pérdida irreversible de datos si el atacante los elimina.',
    detectionMethods: [
      'Escaneo periódico de la postura de exposición con Shodan API o Censys',
      'Reglas de Security Groups/NSGs que bloqueen puertos de base de datos desde Internet',
      'Habilitar autenticación y cifrado TLS en todos los motores de base de datos',
      'AWS Config Rules, Azure Policy o GCP Security Command Center para detectar misconfigurations',
      'Alertas de Prowler (AWS) o Checkov para validar configuraciones de red en IaC',
      'Network segmentation: bases de datos solo accesibles desde subredes de aplicación',
    ],
    references: [
      { title: 'CIS Benchmark for MongoDB', url: 'https://www.cisecurity.org/benchmark/mongodb', type: 'standard' },
      { title: 'Shodan - Internet-Connected Databases', url: 'https://www.shodan.io/', type: 'tool' },
      { title: 'OWASP - Database Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html', type: 'standard' },
      { title: 'Comparitech - Exposed Database Research', url: 'https://www.comparitech.com/blog/information-security/elasticsearch-exposed/', type: 'blog' },
    ],
  },
  // ── B.I.4 ───────────────────────────────────────────────────────────────────
  {
    code: 'B.I.4',
    name: 'Documentos públicos con datos sensibles',
    category: 'Recopilación de Información',
    description:
      'Documentos internos de una organización que contienen información sensible (datos personales, credenciales, configuraciones, información financiera) se vuelven accesibles públicamente debido a publicación accidental, misconfiguration de permisos en repositorios o almacenamiento cloud, o divulgación no autorizada.',
    technicalDetail:
      'Los vectores más comunes incluyen: buckets S3 o Azure Blob con permisos de lectura pública, repositorios GitHub/GitLab públicos con documentos que contienen datos sensibles, Google Drive o SharePoint con enlaces de "cualquier persona con el enlace puede ver", y motores de búsqueda que indexan documentos internos expuestos (Google Dorks: site:empresa.com filetype:pdf "confidencial"). La técnica OSINT de "document harvesting" usa herramientas como TheHarvester, Recon-ng o FOCA (para metadatos de documentos Office que revelan usuarios, rutas de red, software). Los metadatos de documentos PDF y Office frecuentemente contienen nombres de usuario, rutas de red internas y versiones de software.',
    realWorldExamples: [
      {
        name: 'Exposición de documentos del Pentágono en AWS S3',
        year: '2017',
        description: 'Investigadores encontraron tres buckets S3 públicos del Pentágono con terabytes de datos de vigilancia de medios sociales del ejército de EE.UU., incluyendo contraseñas en texto plano.',
        source: 'https://www.upguard.com/breaches/the-pentagon-s3',
      },
      {
        name: 'Documentos internos de gobierno mexicano filtrados',
        year: '2022',
        description: 'El grupo hacktivista Guacamaya filtró 6 TB de documentos militares mexicanos obtenidos de servidores con vulnerabilidades, exponiendo documentos confidenciales con datos de ciudadanos.',
        source: 'https://www.animalpolitico.com/seguridad/guacamaya-hackeo-sedena-documentos',
      },
      {
        name: 'FOCA - Extracción de metadatos de documentos públicos',
        year: 'Continuo',
        description: 'La herramienta FOCA (Fingerprinting Organizations with Collected Archives) extrae metadatos de documentos públicos de organizaciones, revelando infraestructura interna, usuarios y software.',
        source: 'https://github.com/ElevenPaths/FOCA',
      },
    ],
    cves: [
      { id: 'CVE-2021-26084', description: 'Confluence Server - RCE que permitía acceder y exportar documentos sensibles de espacios de trabajo' },
      { id: 'CVE-2019-19781', description: 'Citrix ADC - Path traversal que permitía leer archivos de configuración con datos sensibles' },
    ],
    mitreTechniques: [
      { id: 'T1213', name: 'Data from Information Repositories', url: 'https://attack.mitre.org/techniques/T1213/' },
      { id: 'T1593', name: 'Search Open Websites/Domains', url: 'https://attack.mitre.org/techniques/T1593/' },
    ],
    indicators: [
      'Documentos con clasificación "Confidencial" o "Interno" indexados en motores de búsqueda',
      'Buckets cloud con permisos públicos de lectura en herramientas de auditoría (S3Scanner)',
      'Metadatos de documentos que revelan usuarios internos, rutas UNC o versiones de software',
      'Accesos masivos a documentos específicos desde IPs externas no autorizadas',
      'Alertas de DLP (Data Loss Prevention) por descarga masiva de documentos',
      'Menciones de documentos internos en foros clandestinos o Telegram',
    ],
    attackFlow: [
      'Reconocimiento pasivo: Usar Google Dorks, Shodan y herramientas OSINT para encontrar documentos expuestos',
      'Descarga: Obtener documentos mediante acceso público sin autenticación',
      'Análisis de metadatos: Extraer información técnica y de usuarios con FOCA u otras herramientas',
      'Explotación: Usar información obtenida para ataques dirigidos (spearphishing, enumeración de usuarios)',
      'Movimiento lateral: Usar credenciales o rutas de red encontradas en documentos',
      'Divulgación o venta: Publicar documentos sensibles o venderlos a competidores o actores maliciosos',
    ],
    impact:
      'Exposición de información estratégica, datos personales de empleados y clientes, secretos comerciales, y configuraciones de infraestructura. Las sanciones regulatorias (GDPR, Ley de Protección de Datos) pueden ser severas. La información técnica facilita ataques más sofisticados contra la organización.',
    detectionMethods: [
      'Auditoría periódica de permisos en repositorios cloud (S3Scanner, CloudSploit)',
      'Implementar DLP corporativo para detectar y bloquear el envío de documentos sensibles',
      'Clasificación automática de documentos con herramientas como Microsoft Purview',
      'Configurar alertas de Google Alerts con nombres internos de proyectos o documentos',
      'Revisión de metadatos antes de publicar cualquier documento externo',
      'Monitoreo de repositorios GitHub/GitLab para documentos con datos sensibles (truffleHog)',
    ],
    references: [
      { title: 'FOCA - Document Metadata Extractor', url: 'https://github.com/ElevenPaths/FOCA', type: 'tool' },
      { title: 'NIST SP 800-60: Guide for Mapping Types of Information to Security Categories', url: 'https://csrc.nist.gov/publications/detail/sp/800-60/vol-1-rev-1/final', type: 'standard' },
      { title: 'UpGuard - Exposed S3 Buckets Research', url: 'https://www.upguard.com/blog/what-is-an-unsecured-s3-bucket', type: 'blog' },
    ],
  },
  // ── B.I.6 ───────────────────────────────────────────────────────────────────
  {
    code: 'B.I.6',
    name: 'Keylogger en uso',
    category: 'Recopilación de Información',
    description:
      'Software o hardware que registra silenciosamente todas las pulsaciones de teclado realizadas por un usuario, capturando credenciales, números de tarjeta de crédito, comunicaciones privadas y cualquier información ingresada. Los keyloggers pueden ser instalados por malware, actores con acceso físico, o mediante técnicas de ingeniería social.',
    technicalDetail:
      'Los keyloggers de software operan a nivel de: API de Windows (SetWindowsHookEx para hooking de teclado), filtros de kernel (driver-level keyloggers que operan en Ring 0, más difíciles de detectar), y hypervisor-level (captura antes del sistema operativo). Los keyloggers modernos como parte de RATs (Remote Access Trojans: njRAT, DarkComet, AsyncRAT) incluyen captura de pantalla, clipboard hijacking y grabación de audio. Los keyloggers de hardware se instalan entre el teclado y el puerto USB/PS2 y son invisibles al sistema operativo. Técnicas de evasión incluyen: cifrado de logs, comunicación a C2 en intervalos irregulares, y polimorfismo para evadir firmas antivirus.',
    realWorldExamples: [
      {
        name: 'Operación Ke3chang - APT KeyLogger contra gobiernos europeos',
        year: '2019',
        description: 'El grupo APT15 (Ke3chang) utilizó keyloggers personalizados como parte de su suite de malware MirageFox para espiar a ministerios de relaciones exteriores europeos durante años.',
        source: 'https://www.nccgroup.com/uk/about-us/newsroom-and-events/blogs/2018/march/apt15-is-alive-and-strong-an-analysis-of-royalcli-and-royaldns/',
      },
      {
        name: 'Keylogger HawkEye en campañas de fraude financiero',
        year: '2019',
        description: 'El FBI desmanteló una red de fraude que usó el keylogger HawkEye para robar credenciales bancarias y de correo de miles de empresas, causando pérdidas millonarias.',
        source: 'https://www.justice.gov/usao-sdny/pr/two-individuals-charged-hawkeye-keylogger-scheme',
      },
      {
        name: 'FormBook - Keylogger como servicio (MaaS)',
        year: '2022',
        description: 'FormBook, un keylogger disponible como Malware-as-a-Service por USD 29/mes, fue uno de los malware más distribuidos de 2022, capturando credenciales de miles de organizaciones globalmente.',
        source: 'https://any.run/malware-trends/formbook',
      },
    ],
    cves: [
      { id: 'CVE-2021-40444', description: 'Microsoft MSHTML - RCE usado para instalar keyloggers mediante documentos Office maliciosos' },
      { id: 'CVE-2022-30190', description: 'Microsoft MSDT (Follina) - Ejecución de código que permitía instalar keyloggers sin macros habilitadas' },
    ],
    mitreTechniques: [
      { id: 'T1056.001', name: 'Input Capture: Keylogging', url: 'https://attack.mitre.org/techniques/T1056/001/' },
      { id: 'T1119', name: 'Automated Collection', url: 'https://attack.mitre.org/techniques/T1119/' },
    ],
    indicators: [
      'Procesos desconocidos con acceso a la API SetWindowsHookEx o equivalente',
      'Archivos de log cifrados o codificados en directorios de usuario o temporales',
      'Tráfico de red hacia IPs/dominios C2 desconocidos en intervalos regulares',
      'Uso inusual de CPU en segundo plano por procesos no identificados',
      'Detecciones de antivirus/EDR de familias de RAT con capacidad de keylogging',
      'Dispositivos USB no autorizados conectados entre teclado y equipo (hardware keylogger)',
    ],
    attackFlow: [
      'Infección inicial: Instalar keylogger mediante phishing, exploit de navegador, o acceso físico',
      'Establecimiento: Configurar persistencia (registro de Windows, tarea programada, servicio)',
      'Captura: Registrar todas las pulsaciones de teclado y capturas de pantalla',
      'Almacenamiento: Guardar logs localmente en archivo cifrado',
      'Exfiltración: Enviar logs al servidor C2 del atacante periódicamente',
      'Explotación: Usar credenciales capturadas para acceder a sistemas bancarios, correo o VPN',
    ],
    impact:
      'Compromiso total de todas las credenciales del usuario afectado, incluyendo banca en línea, correo corporativo, VPN y sistemas críticos. La captura puede durar meses sin detección, acumulando un extenso historial de credenciales y comunicaciones privadas.',
    detectionMethods: [
      'EDR (CrowdStrike, SentinelOne, Microsoft Defender) con detección de hooking de teclado',
      'Monitoreo de procesos con acceso a APIs de captura de input (Sysmon Event ID 10)',
      'Análisis de tráfico de red para detectar exfiltración periódica a C2',
      'Application whitelisting (Windows Defender Application Control) para bloquear binarios no autorizados',
      'Inspección física de puertos USB para detectar dispositivos hardware keylogger',
      'Autenticación con llaves de seguridad FIDO2 que no son vulnerables a keylogging',
    ],
    references: [
      { title: 'MITRE ATT&CK - Input Capture', url: 'https://attack.mitre.org/techniques/T1056/', type: 'standard' },
      { title: 'Sysmon - Windows System Monitor', url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon', type: 'tool' },
      { title: 'ANY.RUN - FormBook Analysis', url: 'https://any.run/malware-trends/formbook', type: 'blog' },
      { title: 'SANS - Detecting Keyloggers', url: 'https://www.sans.org/blog/detecting-keyloggers-on-windows-systems/', type: 'blog' },
    ],
  },
  // ── B.I.7 ───────────────────────────────────────────────────────────────────
  {
    code: 'B.I.7',
    name: 'Divulgación de enumeraciones en foros',
    category: 'Recopilación de Información',
    description:
      'Información sobre la estructura interna de la organización (usuarios, grupos, roles, estructura de directorios, topología de red) aparece publicada en foros clandestinos o públicos, frecuentemente resultado de enumeración activa por parte de atacantes o de filtraciones internas. Esta información facilita ataques más precisos y dirigidos.',
    technicalDetail:
      'La enumeración de usuarios y estructuras puede obtenerse mediante: enumeración LDAP/Active Directory sin autenticación o con credenciales básicas, explotación de OSINT en LinkedIn (estructura organizacional), abuse del protocolo Kerberos (AS-REP Roasting revela nombres de usuarios válidos), SMB null sessions en sistemas sin parchear, metadatos de documentos públicos, y APIs REST sin protección que devuelven listas de usuarios. Los foros donde aparece esta información incluyen BreachForums, Telegram, y foros especializados como Exploit.in o XSS.is. Los atacantes a menudo publican "teasers" con parcial información para demostrar acceso y atraer compradores.',
    realWorldExamples: [
      {
        name: 'Lapsus$ - Divulgación de estructura interna de Nvidia',
        year: '2022',
        description: 'El grupo Lapsus$ publicó en Telegram la estructura interna de Nvidia, incluyendo usuarios, grupos y proyectos, tras comprometer sus sistemas y exfiltrar 1 TB de datos.',
        source: 'https://www.bleepingcomputer.com/news/security/nvidia-confirms-employee-credentials-data-stolen-in-cyberattack/',
      },
      {
        name: 'Filtración de directorio de empleados de Twitter',
        year: '2022',
        description: 'Un investigador aprovechó una vulnerabilidad en la API de Twitter para enumerar 5,4 millones de cuentas asociando números de teléfono y correos a usuarios, publicando el resultado en foros.',
        source: 'https://www.bleepingcomputer.com/news/security/twitter-confirms-zero-day-used-to-expose-data-of-54-million-accounts/',
      },
    ],
    cves: [
      { id: 'CVE-2021-42278', description: 'Active Directory - sAMAccountName spoofing que facilitaba enumeración y escalada de privilegios' },
      { id: 'CVE-2020-1472', description: 'Zerologon - Vulnerabilidad Netlogon que permitía enumeración y compromiso de Active Directory sin credenciales' },
    ],
    mitreTechniques: [
      { id: 'T1589', name: 'Gather Victim Identity Information', url: 'https://attack.mitre.org/techniques/T1589/' },
      { id: 'T1078', name: 'Valid Accounts', url: 'https://attack.mitre.org/techniques/T1078/' },
    ],
    indicators: [
      'Publicaciones en foros clandestinos con nombres de usuarios o estructura de AD de la organización',
      'Consultas LDAP masivas desde hosts no autorizados en logs de Active Directory',
      'Intentos de AS-REP Roasting detectados en logs de Kerberos (Event ID 4768)',
      'Enumeración de usuarios mediante SMB null sessions (Event ID 4624, logon type 3)',
      'Búsquedas en LinkedIn con filtros específicos de la organización desde IPs de tor/VPN',
      'Menciones de la organización en monitores de dark web y foros especializados',
    ],
    attackFlow: [
      'Reconocimiento externo: OSINT en LinkedIn, sitio web, documentos públicos',
      'Enumeración activa: Consultas LDAP, Kerberos, SMB para obtener usuarios y grupos',
      'Validación: Confirmar usuarios válidos mediante intentos de autenticación o OSINT cruzado',
      'Publicación: Divulgar información en foros para venta o como demostración de acceso',
      'Explotación secundaria: Usar la información para ataques dirigidos de spearphishing o password spraying',
      'Escalada: Aprovechar roles y grupos conocidos para planificar movimiento lateral',
    ],
    impact:
      'La enumeración de usuarios facilita ataques de credential stuffing y password spraying precisos. La exposición de la estructura organizacional permite ataques BEC más convincentes. La publicación en foros incrementa el riesgo al hacer la información accesible a múltiples actores.',
    detectionMethods: [
      'Monitoreo de logs de Active Directory para enumeraciones masivas (Microsoft Advanced Threat Analytics)',
      'Configurar honeypot users en AD para detectar enumeración (cuentas trampa que nunca deben ser accedidas)',
      'Restricción de LDAP anónimo y null sessions en controladores de dominio',
      'Alertas de Microsoft Defender for Identity para AS-REP Roasting y Kerberoasting',
      'Servicios de vigilancia de dark web (Recorded Future, Digital Shadows) para menciones del dominio',
      'Limitación de información pública en sitio web corporativo y LinkedIn',
    ],
    references: [
      { title: 'Microsoft - Active Directory Hardening', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/executive-summary', type: 'standard' },
      { title: 'MITRE ATT&CK - Account Discovery', url: 'https://attack.mitre.org/techniques/T1087/', type: 'standard' },
      { title: 'BloodHound - AD Enumeration Tool', url: 'https://github.com/BloodHoundAD/BloodHound', type: 'tool' },
      { title: 'Digital Shadows - Dark Web Monitoring', url: 'https://www.digitalshadows.com/', type: 'tool' },
    ],
  },
  // ── B.II.1 ──────────────────────────────────────────────────────────────────
  {
    code: 'B.II.1',
    name: 'Filtración de configuraciones en aplicación',
    category: 'Recopilación de Información',
    description:
      'Archivos de configuración de aplicaciones que contienen información sensible (cadenas de conexión, claves de API, contraseñas de servicio, configuraciones de seguridad) quedan expuestos a usuarios no autorizados a través de endpoints de la aplicación, repositorios o rutas accesibles públicamente.',
    technicalDetail:
      'Las exposiciones más frecuentes incluyen: endpoints de actuator de Spring Boot (/actuator/env, /actuator/configprops) que revelan toda la configuración de la aplicación en JSON, archivos .env expuestos en el raíz del servidor web, endpoints de health check que revelan versiones y configuraciones, respuestas de error detalladas con stack traces que incluyen rutas y configuraciones, y archivos de configuración en directorios públicos (web.config, application.yml, config.php). En frameworks como Laravel, la exposición del archivo .env revela APP_KEY, credenciales de base de datos y claves de servicios externos. Los frameworks de infraestructura como Terraform o Ansible también generan archivos de estado con secretos en texto plano.',
    realWorldExamples: [
      {
        name: 'Exposición de Spring Boot Actuator en producción',
        year: '2022',
        description: 'Múltiples organizaciones financieras expusieron sus endpoints /actuator/env en producción, revelando credenciales de bases de datos Oracle, claves AWS y contraseñas de servicios externos.',
        source: 'https://blog.detectify.com/2021/04/01/spring-boot-actuator-misuse/',
      },
      {
        name: 'Archivos .env expuestos de tiendas online',
        year: '2021',
        description: 'Investigadores de Sansec descubrieron miles de tiendas en línea con archivos .env accesibles públicamente, exponiendo credenciales de bases de datos y claves de pasarelas de pago.',
        source: 'https://sansec.io/research/dotenv-credentials-magecart',
      },
      {
        name: 'Twitch - Filtración de código fuente y configuraciones',
        year: '2021',
        description: 'Un atacante filtró 125 GB de datos de Twitch incluyendo código fuente, configuraciones internas y datos de pagos a streamers, expuestos desde un servidor mal configurado.',
        source: 'https://blog.twitch.tv/en/2021/10/15/updates-on-the-twitch-security-incident/',
      },
    ],
    cves: [
      { id: 'CVE-2022-22965', description: 'Spring4Shell - RCE en Spring Framework que comprometía la aplicación y exponía sus configuraciones' },
      { id: 'CVE-2020-5410', description: 'Spring Cloud Config - Path traversal que permitía leer archivos de configuración arbitrarios del servidor' },
    ],
    mitreTechniques: [
      { id: 'T1552', name: 'Unsecured Credentials', url: 'https://attack.mitre.org/techniques/T1552/' },
      { id: 'T1190', name: 'Exploit Public-Facing Application', url: 'https://attack.mitre.org/techniques/T1190/' },
    ],
    indicators: [
      'Accesos HTTP 200 a rutas como /.env, /actuator/env, /config.php, /web.config',
      'Peticiones GET a endpoints de actuator o health desde IPs externas',
      'Logs de error en aplicación que contienen rutas absolutas o nombres de variables de entorno',
      'Escaneos automatizados buscando archivos de configuración conocidos (user-agent de herramientas de escaneo)',
      'Acceso a archivos de configuración de terraform (.tfstate) o ansible (vault files)',
    ],
    attackFlow: [
      'Reconocimiento: Enumerar endpoints comunes de frameworks (actuator, healthz, .env)',
      'Descubrimiento: Acceder a endpoint de configuración sin autenticación',
      'Extracción: Obtener credenciales, claves de API y cadenas de conexión',
      'Reutilización: Usar credenciales extraídas para acceder a bases de datos, APIs o servicios cloud',
      'Persistencia: Crear nuevos recursos con las credenciales cloud obtenidas',
      'Exfiltración: Robar datos almacenados en los servicios accedidos',
    ],
    impact:
      'Compromiso de múltiples sistemas conectados mediante las credenciales expuestas, acceso completo a bases de datos con datos de usuarios, y potencial escalada a infraestructura cloud completa con claves AWS/Azure/GCP filtradas.',
    detectionMethods: [
      'WAF con reglas para bloquear acceso a rutas de configuración conocidas',
      'Deshabilitar endpoints de actuator en producción o protegerlos con autenticación',
      'Nunca almacenar secretos en archivos de configuración en repositorios; usar Vault o Secrets Manager',
      'Escaneo de dependencias y configuraciones con herramientas SAST (Checkov, tfsec)',
      'Monitoreo de logs de acceso para peticiones a rutas sensibles',
      'Content Security Policy y headers de seguridad para limitar exposición de errores',
    ],
    references: [
      { title: 'OWASP - Security Misconfiguration', url: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/', type: 'standard' },
      { title: 'HashiCorp Vault - Secrets Management', url: 'https://www.vaultproject.io/', type: 'tool' },
      { title: 'Detectify - Spring Boot Actuator Misuse', url: 'https://blog.detectify.com/2021/04/01/spring-boot-actuator-misuse/', type: 'blog' },
    ],
  },
  // ── B.II.2 ──────────────────────────────────────────────────────────────────
  {
    code: 'B.II.2',
    name: 'Filtración de secretos en rutas de aplicación',
    category: 'Recopilación de Información',
    description:
      'Secretos criptográficos (tokens JWT, claves privadas, API keys, contraseñas) quedan expuestos en rutas accesibles de la aplicación web, ya sea en el código fuente JavaScript del frontend, en respuestas de la API, en comentarios HTML, o en rutas de archivos estáticos no protegidas.',
    technicalDetail:
      'Los mecanismos de exposición más comunes incluyen: credenciales hardcodeadas en archivos JavaScript bundleados accesibles en /static/js/ (analizables con herramientas como jsluice o LinkFinder), tokens JWT con información sensible decodificable en jwt.io, claves privadas RSA/EC servidas como archivos estáticos, API keys en código fuente de aplicaciones Single Page Application (SPA), y secretos en source maps (.js.map) accesibles cuando están habilitados en producción. La herramienta TruffleHog puede detectar estos secretos en código JavaScript desplegado. En APIs REST, las respuestas pueden incluir campos ocultos con tokens o secretos que el frontend no muestra pero que son accesibles inspeccionando la red.',
    realWorldExamples: [
      {
        name: 'Exposición de tokens AWS en JavaScript de frontend',
        year: '2021',
        description: 'Investigadores descubrieron que múltiples aplicaciones bancarias móviles y web incluían tokens AWS de acceso hardcodeados en su JavaScript, permitiendo acceso directo a buckets S3 con datos de clientes.',
        source: 'https://trufflesecurity.com/blog/searching-for-secrets-in-javascript',
      },
      {
        name: 'Peloton API - Datos de usuarios expuestos en respuestas',
        year: '2021',
        description: 'La API de Peloton devolvía datos privados de usuarios sin autenticación en sus respuestas JSON, incluyendo tokens de acceso que podían ser reutilizados para acceder a cuentas ajenas.',
        source: 'https://techcrunch.com/2021/05/05/peloton-data-exposed/',
      },
    ],
    cves: [
      { id: 'CVE-2021-44228', description: 'Log4Shell - Explotado en aplicaciones que exponían datos de configuración incluyendo secretos en sus logs' },
      { id: 'CVE-2023-32315', description: 'Openfire - Path traversal que permitía acceder a archivos de configuración con credenciales de administrador' },
    ],
    mitreTechniques: [
      { id: 'T1552.001', name: 'Unsecured Credentials: Credentials in Files', url: 'https://attack.mitre.org/techniques/T1552/001/' },
      { id: 'T1213', name: 'Data from Information Repositories', url: 'https://attack.mitre.org/techniques/T1213/' },
    ],
    indicators: [
      'Cadenas con formato de API key o token en archivos JavaScript del frontend (BEGIN RSA PRIVATE KEY, AKIA, etc.)',
      'Source maps (.js.map) accesibles públicamente en servidores de producción',
      'Respuestas de API con campos que contienen tokens o hashes inusuales',
      'Herramientas de auditoría (GitLeaks, TruffleHog) detectando secretos en código desplegado',
      'Accesos a rutas de archivos estáticos inusuales desde IPs externas',
    ],
    attackFlow: [
      'Reconocimiento: Inspeccionar código fuente JavaScript de la aplicación web en el navegador',
      'Análisis: Usar herramientas como LinkFinder o jsluice para extraer endpoints y secretos',
      'Extracción: Identificar API keys, tokens JWT, o credenciales hardcodeadas',
      'Validación: Probar que los secretos encontrados son válidos y tienen privilegios',
      'Explotación: Usar los secretos para acceder a APIs, servicios cloud o bases de datos',
      'Escalada: Usar acceso inicial para moverse lateralmente hacia sistemas más sensibles',
    ],
    impact:
      'Compromiso de APIs y servicios externos conectados, acceso no autorizado a infraestructura cloud, robo de datos de usuarios, y potencial compromiso total de la aplicación si los secretos permiten acceso administrativo.',
    detectionMethods: [
      'Integrar herramientas de detección de secretos en CI/CD (GitLeaks, TruffleHog, detect-secrets)',
      'Nunca incluir secretos en código frontend; usar variables de entorno en tiempo de compilación solo para no-secretos',
      'Usar servicios de gestión de secretos: AWS Secrets Manager, Azure Key Vault, HashiCorp Vault',
      'Desactivar source maps en entornos de producción',
      'Escaneo periódico del código desplegado con herramientas DAST',
      'Rotación inmediata de cualquier secreto que haya podido quedar expuesto',
    ],
    references: [
      { title: 'TruffleHog - Secrets Scanner', url: 'https://trufflesecurity.com/trufflehog', type: 'tool' },
      { title: 'GitLeaks - Secret Detection', url: 'https://github.com/gitleaks/gitleaks', type: 'tool' },
      { title: 'OWASP - Cryptographic Failures', url: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/', type: 'standard' },
      { title: 'NIST - Secrets Management Best Practices', url: 'https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final', type: 'standard' },
    ],
  },
  // ── B.III.1 ─────────────────────────────────────────────────────────────────
  {
    code: 'B.III.1',
    name: 'Archivo de control de versión expuesto',
    category: 'Recopilación de Información',
    description:
      'Archivos de metadatos de sistemas de control de versiones (directorios .git, .svn, .hg) quedan accesibles públicamente en servidores web, permitiendo a atacantes reconstruir el código fuente completo, historial de cambios y cualquier secreto que haya existido en el repositorio en cualquier momento.',
    technicalDetail:
      'Cuando el directorio .git/ es accesible en un servidor web, herramientas como git-dumper o GitTools pueden reconstruir el repositorio completo haciendo peticiones HTTP a archivos conocidos (.git/HEAD, .git/config, .git/objects/). El historial completo de Git contiene todos los archivos y commits, incluyendo secretos que pudieron haber sido "eliminados" en commits posteriores (git log --all --full-history). La herramienta GitDumper automatiza la extracción incluso cuando el directory listing está deshabilitado. Para SVN, el directorio .svn/ expone el archivo entries con rutas y revisiones. Esta vulnerabilidad es catalogada como OWASP Top 10 A05 (Security Misconfiguration) y es sorprendentemente común en aplicaciones web.',
    realWorldExamples: [
      {
        name: '.git expuesto en plataforma de e-commerce latinoamericana',
        year: '2021',
        description: 'Investigadores de seguridad encontraron el directorio .git expuesto en múltiples tiendas online latinoamericanas, extrayendo código fuente completo con credenciales de bases de datos y claves de pasarelas de pago.',
        source: 'https://blog.detectify.com/2018/01/22/how-we-found-the-exposed-git-repositories-on-the-web/',
      },
      {
        name: 'Exposición masiva de repositorios .git en sitios web',
        year: '2019',
        description: 'Un estudio de Snyk encontró que el 1% de los sitios web en el millón de sitios más visitados de Alexa tenían directorios .git accesibles públicamente, incluyendo sitios gubernamentales y bancarios.',
        source: 'https://snyk.io/blog/exposed-git-repositories/',
      },
    ],
    cves: [
      { id: 'CVE-2022-24816', description: 'GeoServer - Exposición de archivos internos incluyendo configuración de repositorios git' },
      { id: 'CVE-2018-11776', description: 'Apache Struts - RCE que podía combinarse con git expuesto para reconstruir código fuente y encontrar más vulnerabilidades' },
    ],
    mitreTechniques: [
      { id: 'T1552', name: 'Unsecured Credentials', url: 'https://attack.mitre.org/techniques/T1552/' },
      { id: 'T1213', name: 'Data from Information Repositories', url: 'https://attack.mitre.org/techniques/T1213/' },
    ],
    indicators: [
      'Respuestas HTTP 200 para peticiones a /.git/HEAD o /.git/config',
      'User-agents de herramientas de extracción git (git-dumper, GitTools)',
      'Múltiples peticiones secuenciales a objetos git (/.git/objects/xx/)',
      'Alertas de WAF para accesos a rutas de control de versiones',
      'Aparición del código fuente de la organización en repositorios externos no autorizados',
    ],
    attackFlow: [
      'Descubrimiento: Probar /.git/HEAD en el servidor web objetivo',
      'Verificación: Confirmar que el repositorio es accesible y obtener el HEAD commit',
      'Extracción: Usar git-dumper para descargar todos los objetos del repositorio',
      'Reconstrucción: Reconstruir el árbol de archivos y el historial completo de commits',
      'Análisis: Buscar secretos, credenciales y vulnerabilidades en el código fuente',
      'Explotación: Usar información obtenida para ataques dirigidos o comprometer servicios conectados',
    ],
    impact:
      'Exposición del código fuente propietario, descubrimiento de todas las credenciales que alguna vez existieron en el repositorio (incluyendo eliminadas), identificación de vulnerabilidades en el código para ataques dirigidos, y robo de propiedad intelectual.',
    detectionMethods: [
      'Configurar el servidor web para denegar acceso a directorios .git, .svn, .hg (nginx deny, Apache deny all)',
      'Incluir /.git en .htaccess o configuración de servidor para bloquear acceso',
      'Escanear periódicamente la aplicación con herramientas como nikto o git-hound',
      'Implementar WAF con reglas para bloquear peticiones a rutas de VCS',
      'Usar pipelines CI/CD que no copien el directorio .git al servidor de producción',
      'Herramientas de DAST en CI/CD que verifiquen la ausencia de exposición de VCS',
    ],
    references: [
      { title: 'git-dumper - Extractor de repositorios .git expuestos', url: 'https://github.com/arthaud/git-dumper', type: 'tool' },
      { title: 'OWASP - Security Misconfiguration', url: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/', type: 'standard' },
      { title: 'Detectify - Exposed .git Repositories', url: 'https://blog.detectify.com/2018/01/22/how-we-found-the-exposed-git-repositories-on-the-web/', type: 'blog' },
    ],
  },
  // ── B.III.2 ─────────────────────────────────────────────────────────────────
  {
    code: 'B.III.2',
    name: 'Sistema de control de versión expuesto',
    category: 'Recopilación de Información',
    description:
      'El servidor completo de control de versiones de la organización (GitLab, GitHub Enterprise, Bitbucket, Gitea) queda accesible públicamente con registro abierto, sin autenticación, o con credenciales débiles, permitiendo acceso a todos los repositorios de código fuente, incluyendo proyectos privados.',
    technicalDetail:
      'Las instancias de GitLab o Gitea auto-alojadas a menudo tienen el registro público habilitado por defecto, permitiendo a cualquier persona crear una cuenta y potencialmente acceder a proyectos internos configurados como "internos" (visibles para usuarios autenticados). Las vulnerabilidades históricas de GitLab como CVE-2021-22205 (RCE sin autenticación) han comprometido miles de instancias. La exposición en Shodan de GitLab, Gitea, Gogs y Bitbucket auto-alojados es frecuente. Los atacantes también explotan tokens de acceso personal (PAT) con permisos excesivos filtrados en repositorios. La técnica de GitHub dorking busca secretos en repositorios públicos con consultas como "org:empresa password" o "org:empresa apikey".',
    realWorldExamples: [
      {
        name: 'GitLab RCE masivo - CVE-2021-22205',
        year: '2021',
        description: 'La vulnerabilidad crítica CVE-2021-22205 en GitLab permitía ejecución remota de código sin autenticación. Miles de instancias fueron comprometidas, con acceso completo a todos los repositorios.',
        source: 'https://about.gitlab.com/releases/2021/11/01/security-release-gitlab-14-4-1-released/',
      },
      {
        name: 'Exposición de código fuente de Samsung en GitHub',
        year: '2019',
        description: 'Investigadores descubrieron que empleados de Samsung subieron código fuente propietario incluyendo credenciales de AWS y secretos de aplicaciones a repositorios públicos de GitHub.',
        source: 'https://spidersilk.com/news/samsung-galaxy-source-code-leaked',
      },
      {
        name: 'Uber - Credenciales AWS en repositorio GitHub público',
        year: '2022',
        description: 'Un contratista de Uber publicó accidentalmente credenciales de AWS en un repositorio GitHub público, lo que fue usado por el atacante Lapsus$ para comprometer infraestructura crítica de Uber.',
        source: 'https://www.uber.com/newsroom/security-update/',
      },
    ],
    cves: [
      { id: 'CVE-2021-22205', description: 'GitLab CE/EE - RCE sin autenticación mediante subida de imágenes con ExifTool' },
      { id: 'CVE-2022-2884', description: 'GitLab - RCE en importación desde GitHub que permitía acceder a todos los repositorios' },
    ],
    mitreTechniques: [
      { id: 'T1213', name: 'Data from Information Repositories', url: 'https://attack.mitre.org/techniques/T1213/' },
      { id: 'T1552.001', name: 'Unsecured Credentials: Credentials in Files', url: 'https://attack.mitre.org/techniques/T1552/001/' },
    ],
    indicators: [
      'Instancia de GitLab/Gitea accesible desde Internet sin autenticación requerida para navegar',
      'Registro público habilitado en instancia auto-alojada de Git',
      'Peticiones de usuarios anónimos o recién registrados a repositorios internos',
      'Tokens de acceso personal (PAT) con actividad desde IPs no corporativas',
      'Alertas de GitHub Advanced Security o GitLab SAST por secretos encontrados',
      'Repositorios privados clonados por usuarios no autorizados en logs de acceso',
    ],
    attackFlow: [
      'Descubrimiento: Localizar instancia de Git auto-alojada mediante Shodan o escaneo directo',
      'Acceso: Registrar cuenta pública o explotar vulnerabilidad de autenticación',
      'Enumeración: Listar todos los repositorios accesibles (públicos, internos, privados)',
      'Clonado: Descargar repositorios de mayor interés (infraestructura, aplicaciones core)',
      'Análisis: Buscar secretos en código, historial de commits y configuraciones',
      'Explotación: Usar credenciales o código obtenido para comprometer sistemas de producción',
    ],
    impact:
      'Exposición total del código fuente propietario y secretos históricos, compromiso de múltiples sistemas a partir de credenciales encontradas, robo de propiedad intelectual, y capacidad del atacante de encontrar y explotar vulnerabilidades conocidas solo internamente.',
    detectionMethods: [
      'Restringir acceso a la instancia de Git a la red interna o VPN corporativa',
      'Deshabilitar el registro público en instancias auto-alojadas',
      'Aplicar patches de seguridad de GitLab/Gitea inmediatamente tras su publicación',
      'Escaneo automático de secretos en todos los commits con hooks pre-receive',
      'Auditoría periódica de tokens de acceso personal y su nivel de privilegio',
      'Configurar alertas de acceso anómalo o clonado masivo de repositorios',
    ],
    references: [
      { title: 'GitLab Security - CVE-2021-22205', url: 'https://about.gitlab.com/releases/2021/11/01/security-release-gitlab-14-4-1-released/', type: 'news' },
      { title: 'GitHub - Secret Scanning', url: 'https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning', type: 'tool' },
      { title: 'MITRE ATT&CK - Data from Information Repositories', url: 'https://attack.mitre.org/techniques/T1213/', type: 'standard' },
    ],
  },
  // ── C.I.1 ───────────────────────────────────────────────────────────────────
  {
    code: 'C.I.1',
    name: 'Agotamiento de conexiones TCP',
    category: 'Denegación de Servicio',
    description:
      'Ataque de denegación de servicio que explota el proceso de establecimiento de conexiones TCP (three-way handshake) para agotar los recursos del servidor, impidiendo que conexiones legítimas puedan establecerse. El tipo más conocido es el SYN Flood, donde el atacante envía masivamente paquetes SYN sin completar el handshake.',
    technicalDetail:
      'En un SYN Flood, el atacante envía paquetes TCP SYN con IPs de origen falsificadas (spoofed). El servidor responde con SYN-ACK y mantiene el estado de conexión "half-open" en su tabla de conexiones (backlog queue) esperando el ACK final que nunca llega. Cuando el backlog se llena (típicamente 1.024-8.192 entradas), el servidor rechaza nuevas conexiones. Herramientas como hping3, nmap, y herramientas de estrés como LOIC y Siege pueden generar este tráfico. La mitigación SYN Cookies permite al servidor codificar el estado en el número de secuencia, eliminando la necesidad de mantener half-open connections. Variantes incluyen ACK Flood, FIN Flood y RST Flood.',
    realWorldExamples: [
      {
        name: 'Ataque SYN Flood contra proveedores DNS raíz',
        year: '2016',
        description: 'Ataques de SYN Flood distribuidos contra servidores DNS raíz alcanzaron 5 millones de paquetes por segundo, aunque la infraestructura anycast absorbió el ataque sin impacto significativo.',
        source: 'https://www.icann.org/en/blogs/details/update-on-root-zone-ddos-attack-8-12-2016-en',
      },
      {
        name: 'TCP State-Exhaustion contra Cloudflare',
        year: '2022',
        description: 'Cloudflare mitigó un ataque de agotamiento de conexiones TCP de 26 millones de solicitudes por segundo, el mayor registrado hasta la fecha, originado desde 5.067 dispositivos comprometidos.',
        source: 'https://blog.cloudflare.com/26m-rps-ddos/',
      },
    ],
    cves: [
      { id: 'CVE-2018-5391', description: 'Linux kernel - FragmentSmack: Fragmentación IP que causaba agotamiento de CPU similar a SYN flood' },
      { id: 'CVE-1999-0116', description: 'SYN Flood - Vulnerabilidad clásica de agotamiento de conexiones TCP documentada en múltiples sistemas operativos' },
    ],
    mitreTechniques: [
      { id: 'T1499.001', name: 'Endpoint Denial of Service: OS Exhaustion Flood', url: 'https://attack.mitre.org/techniques/T1499/001/' },
    ],
    indicators: [
      'Gran cantidad de conexiones TCP en estado SYN_RECV en netstat o ss',
      'Aumento abrupto de tráfico de entrada en interfaces de red (paquetes SYN sin completar)',
      'Degradación severa del rendimiento del servidor o imposibilidad de aceptar nuevas conexiones',
      'Logs del sistema con errores "connection refused" o "backlog queue full"',
      'Alertas del proveedor de red o CDN por tráfico volumétrico entrante',
      'CPU elevada en kernel por procesamiento de interrupciones de red',
    ],
    attackFlow: [
      'Preparación: Obtener herramientas de flood (hping3, LOIC) o controlar botnet',
      'Lanzamiento: Enviar masivamente paquetes SYN con IPs de origen falsificadas al objetivo',
      'Agotamiento: La tabla de half-open connections del servidor se llena',
      'Denegación: Nuevas conexiones legítimas son rechazadas por falta de recursos',
      'Mantenimiento: Continuar el flood para mantener el agotamiento',
    ],
    impact:
      'Indisponibilidad total o parcial de servicios web y aplicaciones, pérdidas económicas por tiempo de inactividad, afectación a clientes y usuarios finales, y potencial uso como distracción para ocultar otras actividades maliciosas.',
    detectionMethods: [
      'Habilitar SYN Cookies en el sistema operativo (net.ipv4.tcp_syncookies=1 en Linux)',
      'Configurar rate limiting de paquetes SYN en firewall y router de borde',
      'Servicios de scrubbing anti-DDoS (Cloudflare, Akamai, Radware)',
      'Monitoreo de flujos de red con NetFlow/IPFIX para detectar picos anómalos',
      'Reducir el timeout de half-open connections (tcp_synack_retries)',
      'Aumentar el tamaño del backlog TCP para ganar tiempo de respuesta',
    ],
    references: [
      { title: 'CERT - SYN Flooding Attacks', url: 'https://www.cert.org/historical/advisories/CA-1996-21.cfm', type: 'standard' },
      { title: 'Cloudflare - DDoS Attack Trends', url: 'https://blog.cloudflare.com/ddos-threat-report-2023-q4/', type: 'blog' },
      { title: 'NIST SP 800-189: Resilient Interdomain Traffic Exchange', url: 'https://csrc.nist.gov/publications/detail/sp/800-189/final', type: 'standard' },
    ],
  },
  // ── C.I.2 ───────────────────────────────────────────────────────────────────
  {
    code: 'C.I.2',
    name: 'Apagado no autorizado de sistemas',
    category: 'Denegación de Servicio',
    description:
      'Un actor con acceso a sistemas o infraestructura apaga, reinicia o suspende servicios y servidores de forma no autorizada, causando interrupción del servicio. Puede ocurrir de forma remota mediante acceso a consolas de gestión o hipervisores, o físicamente en el centro de datos.',
    technicalDetail:
      'Los vectores de apagado remoto incluyen: abuso de consolas de gestión fuera de banda (IPMI, iDRAC, iLO, CIMC) con credenciales por defecto o robadas; acceso a hypervisores (VMware vCenter, Hyper-V, Proxmox) para apagar VMs; uso de herramientas de gestión cloud (AWS, Azure, GCP) para detener instancias; scripts que ejecutan comandos shutdown/halt en sistemas comprometidos; y abuso de herramientas de administración remota (Ansible, Chef, Puppet). Los atacantes de ransomware frecuentemente apagan controladores de dominio y servidores de backup antes de cifrar datos. El comando `shutdown -h now` en Linux o `Stop-Computer` en PowerShell son los vectores más directos cuando se tiene acceso.',
    realWorldExamples: [
      {
        name: 'NotPetya - Apagado masivo de sistemas en Ucrania',
        year: '2017',
        description: 'NotPetya apagó permanentemente miles de sistemas en Ucrania y globalmente, incluyendo la empresa naviera Maersk que perdió 300 millones de USD por el apagado total de su infraestructura.',
        source: 'https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/',
      },
      {
        name: 'Ataque a Colonial Pipeline - Parada operativa',
        year: '2021',
        description: 'Tras el ataque de ransomware DarkSide, Colonial Pipeline apagó preventivamente sus sistemas de control industrial, causando escasez de combustible en la costa este de EE.UU.',
        source: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a',
      },
    ],
    cves: [
      { id: 'CVE-2019-6260', description: 'IPMI/BMC - Vulnerabilidades en interfaces de gestión fuera de banda que permitían apagado remoto' },
      { id: 'CVE-2021-21985', description: 'VMware vCenter - RCE que permitía a atacantes apagar y eliminar máquinas virtuales' },
    ],
    mitreTechniques: [
      { id: 'T1529', name: 'System Shutdown/Reboot', url: 'https://attack.mitre.org/techniques/T1529/' },
      { id: 'T1489', name: 'Service Stop', url: 'https://attack.mitre.org/techniques/T1489/' },
    ],
    indicators: [
      'Eventos de apagado o reinicio de sistemas fuera de ventanas de mantenimiento programadas',
      'Accesos a consolas IPMI, iDRAC o iLO desde IPs no autorizadas',
      'Comandos shutdown/halt ejecutados desde cuentas de servicio o en horarios inusuales',
      'Múltiples sistemas apagados en un corto período de tiempo',
      'Alertas de hipervisor por detención masiva de máquinas virtuales',
      'Pérdida de visibilidad en herramientas de monitoreo para múltiples hosts simultáneamente',
    ],
    attackFlow: [
      'Acceso: Comprometer cuenta con privilegios de gestión de sistemas o consola IPMI',
      'Reconocimiento: Identificar sistemas críticos (controladores de dominio, servidores de backup)',
      'Preparación: Planificar secuencia de apagado para maximizar impacto',
      'Ejecución: Enviar comandos de apagado a sistemas críticos simultáneamente',
      'Persistencia del daño: Asegurar que los sistemas no arranquen correctamente (corrupción de MBR)',
      'Exfiltración previa (opcional): Robar datos antes del apagado destructivo',
    ],
    impact:
      'Interrupción total de operaciones de negocio, pérdidas económicas por tiempo de inactividad, daño potencial a datos en memoria no guardados, y en entornos industriales, riesgo para la seguridad física de instalaciones y personal.',
    detectionMethods: [
      'Monitoreo de eventos de apagado/reinicio en SIEM (Windows Event ID 1074, 6006)',
      'Alertas de monitoreo de disponibilidad (Nagios, Zabbix, Datadog) para detección de caídas',
      'Restringir acceso a consolas IPMI/BMC a redes de gestión dedicadas',
      'Requerir MFA y aprobación de cambio para acciones de apagado en sistemas críticos',
      'Implementar "man-in-the-middle" aprobación para comandos de shutdown en sistemas productivos',
      'Segmentación de redes de gestión con acceso solo desde jump servers auditados',
    ],
    references: [
      { title: 'MITRE ATT&CK - System Shutdown/Reboot', url: 'https://attack.mitre.org/techniques/T1529/', type: 'standard' },
      { title: 'CISA - VMware vCenter Vulnerabilities', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-148a', type: 'standard' },
      { title: 'NIST SP 800-82: Guide to ICS Security', url: 'https://csrc.nist.gov/publications/detail/sp/800-82/rev-2/final', type: 'standard' },
    ],
  },
  // ── C.I.3 ───────────────────────────────────────────────────────────────────
  {
    code: 'C.I.3',
    name: 'Ataque de amplificación DNS/NTP',
    category: 'Denegación de Servicio',
    description:
      'Ataques de denegación de servicio distribuida que explotan servidores DNS o NTP abiertos para amplificar el volumen de tráfico dirigido al objetivo. El atacante envía pequeñas peticiones con IP de origen falsificada (la víctima), recibiendo respuestas mucho más grandes que inundan el ancho de banda de la víctima.',
    technicalDetail:
      'En la amplificación DNS, el atacante consulta registros tipo ANY o grandes registros TXT/DNSSEC a resolvers abiertos con IP de origen falsificada. El factor de amplificación es de 28-73x (petición de 40 bytes, respuesta hasta 3.000 bytes). En NTP, se abusa del comando monlist (CVE-2013-5211) que devuelve los últimos 600 clientes que consultaron el servidor, con amplificación de hasta 556x. Las herramientas de ataque incluyen saddam (NTP amplification), y diversas herramientas de booter/stresser disponibles comercialmente. Otros protocolos usados: SSDP (amplificación 30x), memcached (amplificación 51.000x en el ataque a GitHub 2018), CLDAP (70x).',
    realWorldExamples: [
      {
        name: 'GitHub DDoS via Memcached - 1,35 Tbps',
        year: '2018',
        description: 'GitHub sufrió el mayor DDoS registrado en ese momento (1,35 Tbps) mediante amplificación memcached. El ataque explotó miles de servidores memcached abiertos en el puerto 11211.',
        source: 'https://github.blog/2018-03-01-ddos-incident-report/',
      },
      {
        name: 'Amplificación NTP - Grandes plataformas de juego',
        year: '2014',
        description: 'Una campaña de amplificación NTP de hasta 400 Gbps afectó proveedores de alojamiento de juegos en Francia, siendo uno de los primeros ataques en superar los 300 Gbps.',
        source: 'https://blog.cloudflare.com/technical-details-behind-a-400gbps-ntp-amplification-ddos-attack/',
      },
    ],
    cves: [
      { id: 'CVE-2013-5211', description: 'NTP monlist - Amplificación de tráfico mediante comando monlist en servidores NTP sin parchear' },
      { id: 'CVE-2015-5477', description: 'BIND DNS - TKEY query que causaba caída del servidor, usado en ataques dirigidos' },
    ],
    mitreTechniques: [
      { id: 'T1499.002', name: 'Endpoint Denial of Service: Service Exhaustion Flood', url: 'https://attack.mitre.org/techniques/T1499/002/' },
      { id: 'T1498.002', name: 'Network Denial of Service: Reflection Amplification', url: 'https://attack.mitre.org/techniques/T1498/002/' },
    ],
    indicators: [
      'Tráfico UDP masivo entrante desde múltiples fuentes (servidores DNS/NTP públicos)',
      'Paquetes UDP con puerto de origen 53 (DNS) o 123 (NTP) en volúmenes anómalos',
      'Agotamiento de ancho de banda en enlace de Internet del objetivo',
      'Alertas de NetFlow con picos de tráfico UDP de miles de fuentes diferentes',
      'Logs de firewall con miles de paquetes UDP descartados por superar límites',
    ],
    attackFlow: [
      'Preparación: Identificar listas de resolvers DNS abiertos o servidores NTP con monlist habilitado',
      'Falsificación: Configurar herramienta de ataque con IP de origen falsificada (la víctima)',
      'Amplificación: Enviar pequeñas peticiones a miles de servidores abiertos simultáneamente',
      'Inundación: Los servidores responden con tráfico masivo a la IP de la víctima',
      'Saturación: El ancho de banda y los recursos de red de la víctima se agotan',
    ],
    impact:
      'Saturación completa del ancho de banda de Internet del objetivo, indisponibilidad de todos los servicios online, afectación a proveedores de tránsito upstream, y costos adicionales por tráfico excesivo en entornos cloud con facturación por transferencia.',
    detectionMethods: [
      'Servicios anti-DDoS con scrubbing center (Cloudflare Magic Transit, Akamai Prolexic)',
      'Implementar BCP38/uRPF en routers de borde para bloquear paquetes con IPs falsificadas',
      'Deshabilitar monlist en servidores NTP propios (noquery en ntp.conf)',
      'Limitar recursión DNS a clientes autorizados (no resolver abierto)',
      'Monitoreo de ancho de banda con alertas de umbral (PRTG, Zabbix, Grafana)',
      'Contratar capacidad de tráfico anti-DDoS upstream con el proveedor de Internet',
    ],
    references: [
      { title: 'US-CERT - UDP-Based Amplification Attacks', url: 'https://www.cisa.gov/uscert/ncas/alerts/TA14-017A', type: 'standard' },
      { title: 'Cloudflare - NTP Amplification DDoS Attack', url: 'https://blog.cloudflare.com/technical-details-behind-a-400gbps-ntp-amplification-ddos-attack/', type: 'blog' },
      { title: 'Open Resolver Project', url: 'http://openresolverproject.org/', type: 'tool' },
    ],
  },
  // ── C.I.4 ───────────────────────────────────────────────────────────────────
  {
    code: 'C.I.4',
    name: 'Ataque físico contra infraestructura TI',
    category: 'Denegación de Servicio',
    description:
      'Daño, destrucción o sabotaje intencional de equipos físicos de infraestructura TI (servidores, switches, cableado, UPS, sistemas de refrigeración) que resulta en interrupción de servicios digitales. Puede ser perpetrado por actores externos, insiders o en el contexto de conflictos geopolíticos.',
    technicalDetail:
      'Los ataques físicos contra infraestructura TI incluyen: destrucción directa de equipos en centros de datos o salas de servidores, corte de cables de fibra óptica (sabotaje de infraestructura de comunicaciones), ataques electromagnéticos (EMP) que dañan circuitos, manipulación de sistemas de climatización o potencia para causar sobrecalentamiento o cortes, instalación de hardware malicioso (implantes, keyloggers de hardware), y robo de equipos con datos. En conflictos armados, los ataques a centros de datos y torres de comunicación son objetivos militares reconocidos. Los insiders representan un vector especialmente peligroso al tener acceso físico legítimo.',
    realWorldExamples: [
      {
        name: 'Corte de cables submarinos en el Mediterráneo',
        year: '2022',
        description: 'Múltiples cortes de cables de fibra óptica submarinos en el Mediterráneo interrumpieron conectividad a Internet de varios países de África y Europa, afectando millones de usuarios.',
        source: 'https://www.zdnet.com/article/multiple-subsea-cables-have-been-cut-in-the-mediterranean-sea/',
      },
      {
        name: 'Sabotaje de infraestructura de telecomunicaciones en Francia',
        year: '2022',
        description: 'Ataques coordinados contra infraestructura de fibra óptica de operadores como SFR, Orange y Bouygues en Francia cortaron servicio a cientos de miles de clientes en múltiples regiones.',
        source: 'https://www.lemonde.fr/pixels/article/2022/04/27/des-actes-de-sabotage-perturbent-des-connexions-internet-en-france_6124019_4408996.html',
      },
    ],
    cves: [
      { id: 'CVE-2019-9670', description: 'Zimbra - RCE que podía complementar ataques físicos al comprometer sistemas de gestión de infraestructura' },
    ],
    mitreTechniques: [
      { id: 'T1200', name: 'Hardware Additions', url: 'https://attack.mitre.org/techniques/T1200/' },
      { id: 'T1561', name: 'Disk Wipe', url: 'https://attack.mitre.org/techniques/T1561/' },
    ],
    indicators: [
      'Caída simultánea de múltiples sistemas en el mismo rack o sala de servidores',
      'Alarmas físicas de sensores de acceso, temperatura o humedad en el centro de datos',
      'Pérdida de conectividad de red en segmentos completos sin causa lógica identificada',
      'Evidencia visual de daño físico, cables cortados o equipos removidos',
      'Registros de acceso físico con entradas no autorizadas al centro de datos',
      'Alertas de sistemas UPS por pérdida de alimentación o manipulación',
    ],
    attackFlow: [
      'Reconocimiento: Identificar ubicación de centros de datos e infraestructura crítica',
      'Acceso físico: Comprometer seguridad física (tailgating, credenciales robadas, cómplice interno)',
      'Sabotaje: Dañar equipos, cortar cables, manipular sistemas de potencia o refrigeración',
      'Amplificación: El daño físico causa cascada de fallos en sistemas dependientes',
      'Fuga: Abandonar el sitio antes de que se active respuesta de seguridad',
    ],
    impact:
      'Interrupción extendida de servicios (horas o días) hasta reemplazar equipos dañados, pérdida permanente de datos si los discos son destruidos sin backup, costos elevados de reemplazo de hardware, e impacto en la continuidad del negocio que puede ser irrecuperable para organizaciones pequeñas.',
    detectionMethods: [
      'Control de acceso físico con múltiples factores (tarjeta + PIN + biometría) al centro de datos',
      'CCTV con cobertura completa y retención de 90+ días en áreas de infraestructura',
      'Sensores de vibración, temperatura y humedad con alertas en tiempo real',
      'Procedimientos de escolta obligatoria para visitantes en zonas de servidores',
      'Inventario de hardware con marcado y verificación periódica de integridad física',
      'Plan de continuidad de negocio con sitio de recuperación ante desastres activo',
    ],
    references: [
      { title: 'NIST SP 800-116: Physical Security for IT', url: 'https://csrc.nist.gov/publications/detail/sp/800-116/rev-1/final', type: 'standard' },
      { title: 'ISO 27001 - Control A.11: Physical Security', url: 'https://www.iso.org/standard/27001', type: 'standard' },
      { title: 'CISA - Physical Security Guide for Critical Infrastructure', url: 'https://www.cisa.gov/physical-security', type: 'standard' },
    ],
  },
  // ── C.I.6 ───────────────────────────────────────────────────────────────────
  {
    code: 'C.I.6',
    name: 'Eliminación de configuraciones críticas',
    category: 'Denegación de Servicio',
    description:
      'Un atacante con acceso privilegiado elimina o destruye configuraciones críticas de sistemas (archivos de configuración, políticas de firewall, configuraciones de red, configuraciones de aplicaciones) causando que servicios sean inaccesibles o que la seguridad se degrade drásticamente.',
    technicalDetail:
      'Los objetivos frecuentes incluyen: eliminación de configuraciones de firewall (iptables, pf, Windows Firewall) que expone sistemas; borrado de archivos de configuración de aplicaciones web (nginx.conf, httpd.conf, application.yml) que impide el arranque; destrucción de configuraciones de Active Directory (Group Policy Objects, OUs); eliminación de certificados TLS almacenados; y borrado de configuraciones de VPN. El ransomware moderno frecuentemente incluye componentes específicos para eliminar shadow copies y backups antes del cifrado. Herramientas como vssadmin delete shadows /all en Windows o rm -rf /etc/nginx/ en Linux son vectores directos. Los atacantes con acceso a AWS pueden eliminar Security Groups, VPCs o Route Tables.',
    realWorldExamples: [
      {
        name: 'Shamoon - Destrucción de sistemas en Saudi Aramco',
        year: '2012',
        description: 'Shamoon destruyó configuraciones y datos en más de 30.000 estaciones de trabajo de Saudi Aramco, requiriendo semanas de recuperación y reemplazo de hardware.',
        source: 'https://www.mandiant.com/resources/blog/shamoon-attacks',
      },
      {
        name: 'OldGremlin - Ransomware con eliminación de backups',
        year: '2021',
        description: 'El grupo OldGremlin eliminó configuraciones de backup y shadow copies antes de cifrar sistemas de organizaciones rusas, imposibilitando la recuperación sin pagar el rescate.',
        source: 'https://www.group-ib.com/blog/oldgremlin/',
      },
    ],
    cves: [
      { id: 'CVE-2021-34527', description: 'PrintNightmare - Usada para obtener privilegios y posteriormente eliminar configuraciones de seguridad' },
      { id: 'CVE-2020-1472', description: 'Zerologon - Permitía resetear contraseña del DC y luego eliminar políticas de grupo' },
    ],
    mitreTechniques: [
      { id: 'T1485', name: 'Data Destruction', url: 'https://attack.mitre.org/techniques/T1485/' },
      { id: 'T1561', name: 'Disk Wipe', url: 'https://attack.mitre.org/techniques/T1561/' },
    ],
    indicators: [
      'Comandos de eliminación ejecutados en archivos de configuración críticos (rm, del, vssadmin)',
      'Servicios que dejan de funcionar por ausencia de archivos de configuración',
      'Eventos de eliminación de GPO o políticas en Active Directory Event Log',
      'Shadow copies eliminadas (vssadmin list shadows devuelve vacío)',
      'Alertas de cambio de configuración en SIEM para sistemas de firewall o red',
      'Fallos en cadena de sistemas dependientes tras la eliminación de configuración central',
    ],
    attackFlow: [
      'Compromiso: Obtener acceso privilegiado al sistema objetivo',
      'Identificación: Localizar archivos y rutas de configuración críticos',
      'Eliminación: Borrar configuraciones de forma sistemática empezando por backups y shadow copies',
      'Destrucción: Eliminar configuraciones de servicios críticos para maximizar impacto',
      'Impacto: Los servicios dejan de funcionar al no poder cargar configuraciones',
      'Extorsión (opcional): Exigir rescate a cambio de restaurar las configuraciones',
    ],
    impact:
      'Interrupción severa y prolongada de servicios, necesidad de restauración desde backup (si existe), horas o días de tiempo de inactividad para reconstruir configuraciones complejas, y exposición de seguridad si se eliminan reglas de firewall o certificados.',
    detectionMethods: [
      'Monitoreo de integridad de archivos (FIM) en directorios de configuración con Wazuh o OSSEC',
      'Backups inmutables de configuraciones críticas en almacenamiento WORM o cloud separado',
      'Control de acceso basado en roles estricto para archivos de configuración de producción',
      'Alertas de SIEM para comandos de eliminación en rutas de configuración sensibles',
      'Gestión de configuración con control de versiones (GitOps, Ansible, Terraform) con historial inmutable',
      'Separación de privilegios: usar cuentas distintas para leer vs. modificar configuraciones',
    ],
    references: [
      { title: 'MITRE ATT&CK - Data Destruction', url: 'https://attack.mitre.org/techniques/T1485/', type: 'standard' },
      { title: 'NIST SP 800-53 CM-3: Configuration Change Control', url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final', type: 'standard' },
      { title: 'Mandiant - Shamoon Analysis', url: 'https://www.mandiant.com/resources/blog/shamoon-attacks', type: 'paper' },
    ],
  },
  // ── C.I.7 ───────────────────────────────────────────────────────────────────
  {
    code: 'C.I.7',
    name: 'Tráfico de red excesivo (volumétrico)',
    category: 'Denegación de Servicio',
    description:
      'Ataque de denegación de servicio que genera volúmenes masivos de tráfico de red para saturar el ancho de banda disponible de la víctima, haciendo que los servicios legítimos sean inaccesibles por congestión de la infraestructura de red. Es el tipo más común de ataque DDoS y puede ser ejecutado con o sin amplificación.',
    technicalDetail:
      'Los ataques volumétricos modernos utilizan botnets de IoT (Mirai y variantes), redes de PCs comprometidas, o servicios de booter/stresser contratados. Los vectores incluyen: UDP Flood, ICMP Flood, y ataques de amplificación/reflexión (DNS, NTP, memcached, SSDP). Los ataques más grandes documentados superan el Terabit por segundo. Las botnets de IoT son particularmente efectivas por la enorme cantidad de dispositivos con ancho de banda residencial. El tráfico generado puede ser de: paquetes aleatorios (volumétrico puro), tráfico con IP de origen falsificada (spoofed), o tráfico legítimo desde dispositivos comprometidos (no falsificado, difícil de filtrar). Los servicios anti-DDoS emplean scrubbing centers con capacidad de absorber cientos de Gbps.',
    realWorldExamples: [
      {
        name: 'Mirai Botnet - Ataque a Dyn DNS',
        year: '2016',
        description: 'La botnet Mirai (cámaras IP y routers IoT comprometidos) lanzó un ataque de 1,2 Tbps contra el proveedor DNS Dyn, dejando inaccesibles Twitter, Netflix, Reddit y otros sitios durante horas.',
        source: 'https://blog.cloudflare.com/inside-mirai-the-infamous-iot-botnet-a-retrospective-analysis/',
      },
      {
        name: 'Google mitigó ataque DDoS de 398 Mpps',
        year: '2022',
        description: 'Google Cloud mitigó el mayor ataque DDoS conocido a nivel de capa 7: 46 millones de solicitudes por segundo originadas desde 5.256 IPs en 132 países en tan solo 69 segundos.',
        source: 'https://cloud.google.com/blog/products/identity-security/google-cloud-mitigated-largest-ddos-attack-peaking-above-46-million-rps',
      },
    ],
    cves: [
      { id: 'CVE-2016-10401', description: 'ZyXEL - Credenciales por defecto usadas por Mirai para construir botnet y lanzar ataques volumétricos' },
      { id: 'CVE-2017-17215', description: 'Huawei HG532 - RCE usado para incorporar dispositivos a botnets DDoS volumétricas' },
    ],
    mitreTechniques: [
      { id: 'T1499', name: 'Endpoint Denial of Service', url: 'https://attack.mitre.org/techniques/T1499/' },
      { id: 'T1498', name: 'Network Denial of Service', url: 'https://attack.mitre.org/techniques/T1498/' },
    ],
    indicators: [
      'Saturación del enlace de Internet (utilización de ancho de banda al 95-100%)',
      'Latencia extremadamente alta o pérdida de paquetes en todos los servicios',
      'Tráfico entrante de miles o millones de fuentes IP únicas simultáneamente',
      'Alertas del proveedor de Internet por tráfico anómalo en el enlace',
      'Logs de firewall con millones de paquetes bloqueados en cortos períodos',
      'Monitoreo de NetFlow mostrando pico repentino de tráfico UDP/ICMP inusual',
    ],
    attackFlow: [
      'Preparación: Adquirir botnet, contratar servicio de booter, o usar amplificadores',
      'Análisis: Identificar ancho de banda máximo del objetivo para calibrar el ataque',
      'Lanzamiento: Iniciar tráfico masivo desde múltiples fuentes hacia la IP del objetivo',
      'Saturación: El enlace de Internet de la víctima alcanza su capacidad máxima',
      'Persistencia: Mantener el ataque para sostener la denegación de servicio',
    ],
    impact:
      'Indisponibilidad completa de todos los servicios online (web, correo, VPN), pérdidas económicas directas por tiempo de inactividad, daño reputacional ante clientes, y posibles costos de tráfico adicionales en plataformas cloud con facturación variable.',
    detectionMethods: [
      'Contratar servicio de mitigación DDoS siempre activo (Cloudflare, Akamai, AWS Shield Advanced)',
      'Monitoreo de ancho de banda en tiempo real con umbrales de alerta (PRTG, LibreNMS)',
      'Análisis de flujos de red con NetFlow/sFlow para detectar fuentes y patrones de ataque',
      'Rate limiting y filtrado por geolocalización en períodos de ataque',
      'Anycast routing para distribuir el tráfico de ataque entre múltiples puntos de presencia',
      'BGP Blackholing con el proveedor de Internet para desviar tráfico de ataque',
    ],
    references: [
      { title: 'CISA - Understanding and Responding to DDoS Attacks', url: 'https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf', type: 'standard' },
      { title: 'Cloudflare DDoS Threat Report 2023', url: 'https://blog.cloudflare.com/ddos-threat-report-2023-q4/', type: 'blog' },
      { title: 'NIST SP 800-189: BGP Security', url: 'https://csrc.nist.gov/publications/detail/sp/800-189/final', type: 'standard' },
    ],
  },
  // ── C.II.1 ──────────────────────────────────────────────────────────────────
  {
    code: 'C.II.1',
    name: 'Secuestro de recursos (cryptojacking)',
    category: 'Denegación de Servicio',
    description:
      'Un atacante instala software de minería de criptomonedas en sistemas de la víctima sin su consentimiento, utilizando la CPU/GPU y el ancho de banda de la organización para generar criptomonedas que se transfieren al atacante. Aunque no destruye datos, degrada severamente el rendimiento y aumenta los costos operativos.',
    technicalDetail:
      'Los vectores de infección incluyen: exploits web que inyectan JavaScript de minería (Coinhive y sucesores), malware descargado mediante phishing o exploits (XMRig es el minero más utilizado), vulnerabilidades de servidores web (Log4Shell, ProxyShell), containers mal configurados en Kubernetes, y funciones serverless comprometidas. En entornos cloud, el cryptojacking puede generar facturas de decenas de miles de USD antes de ser detectado. La moneda más minada es Monero (XMR) por su resistencia a ASIC (minería eficiente en CPU) y privacidad. Los grupos TeamTNT y Kinsing son especialmente activos en entornos Docker/Kubernetes. Los mineros utilizan técnicas de evasión como renombrar el proceso, limitar el uso de CPU para evitar alertas, y ejecutarse solo cuando el sistema está inactivo.',
    realWorldExamples: [
      {
        name: 'TeamTNT - Cryptojacking en clusters Kubernetes',
        year: '2021',
        description: 'El grupo TeamTNT comprometió miles de clusters Kubernetes y Docker con APIs expuestas para instalar mineros XMRig, generando ingresos estimados en millones de dólares en Monero.',
        source: 'https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/teamtnt-continues-to-target-cloud-services',
      },
      {
        name: 'Tesla AWS comprometida para minería',
        year: '2018',
        description: 'El entorno AWS de Tesla fue comprometido debido a un dashboard Kubernetes sin contraseña, siendo usado para minar criptomonedas. Los atacantes usaron CloudFlare para ocultar el pool de minería.',
        source: 'https://redlock.io/blog/cryptojacking-tesla',
      },
      {
        name: 'Operación PowerGhost - Cryptojacking en redes corporativas',
        year: '2018',
        description: 'PowerGhost infectó redes corporativas en Latinoamérica y otras regiones usando EternalBlue y técnicas fileless para instalar mineros sin archivos en la memoria del sistema.',
        source: 'https://securelist.com/powerghost/86505/',
      },
    ],
    cves: [
      { id: 'CVE-2021-44228', description: 'Log4Shell - Ampliamente explotado para instalar mineros XMRig en servidores Java vulnerables' },
      { id: 'CVE-2017-0144', description: 'EternalBlue (MS17-010) - Usado por PowerGhost y WannaMine para propagación de cryptojacking en redes corporativas' },
    ],
    mitreTechniques: [
      { id: 'T1496', name: 'Resource Hijacking', url: 'https://attack.mitre.org/techniques/T1496/' },
    ],
    indicators: [
      'CPU o GPU al 90-100% de uso de forma sostenida sin procesos legítimos que lo justifiquen',
      'Proceso con nombre inusual (kworker, sysupdate, networkservice) consumiendo alta CPU',
      'Tráfico de red hacia puertos de pools de minería conocidos (3333, 4444, 5555, 7777)',
      'Aumento significativo en facturas de energía eléctrica o cloud computing',
      'Alertas de monitoreo de sistema por temperatura elevada o throttling de CPU',
      'Conexiones salientes a dominios o IPs asociados a pools XMR (xmrig.com, supportxmr.com)',
    ],
    attackFlow: [
      'Acceso inicial: Explotar vulnerabilidad en servidor web, API o contenedor mal configurado',
      'Descarga: Obtener el binario del minero (XMRig) desde servidor C2 o URL pública',
      'Instalación: Instalar el minero con persistencia (cron, systemd, registro de Windows)',
      'Evasión: Limitar uso de CPU, renombrar proceso, o ejecutar solo cuando el sistema esté inactivo',
      'Minería: Conectar al pool de Monero y comenzar a generar criptomoneda',
      'Monetización: Los XMR minados se transfieren automáticamente a la cartera del atacante',
    ],
    impact:
      'Degradación severa del rendimiento de aplicaciones y servicios, aumento de costos de energía y cloud computing (casos documentados de facturas de USD 50.000+ en entornos AWS), daño a hardware por sobrecalentamiento, y uso de la infraestructura como plataforma para actividades ilícitas.',
    detectionMethods: [
      'Monitoreo de CPU con alertas por uso sostenido superior al umbral (Datadog, Grafana)',
      'EDR con detección de mineros conocidos (CrowdStrike, SentinelOne tienen firmas de XMRig)',
      'Filtrado de DNS para bloquear dominios de pools de minería conocidos',
      'Monitoreo de tráfico de red para conexiones a puertos típicos de minería (3333, 4444)',
      'Hardening de Kubernetes: deshabilitar acceso anónimo a la API, usar Network Policies',
      'AWS GuardDuty o Azure Defender con detección de cryptojacking en entornos cloud',
    ],
    references: [
      { title: 'CISA - Cryptomining Malware', url: 'https://www.cisa.gov/news-events/alerts/2018/09/20/hidden-cobra-north-koreas-lazarus-group', type: 'standard' },
      { title: 'RedLock - Tesla Cryptojacking Analysis', url: 'https://redlock.io/blog/cryptojacking-tesla', type: 'blog' },
      { title: 'Securelist - PowerGhost Analysis', url: 'https://securelist.com/powerghost/86505/', type: 'paper' },
      { title: 'MITRE ATT&CK - Resource Hijacking', url: 'https://attack.mitre.org/techniques/T1496/', type: 'standard' },
    ],
  },
  // ── C.II.2 ──────────────────────────────────────────────────────────────────
  {
    code: 'C.II.2',
    name: 'Sobrecarga de bases de datos (SQL)',
    category: 'Denegación de Servicio',
    description:
      'Ataques que explotan la base de datos relacional como vector de denegación de servicio, enviando consultas SQL extremadamente costosas en términos computacionales, creando bloqueos masivos (locks), o explotando características del motor de base de datos para agotar sus recursos y hacer que la aplicación sea inaccesible.',
    technicalDetail:
      'Las técnicas incluyen: consultas con SLEEP() o BENCHMARK() para mantener conexiones abiertas y bloquear recursos; inyección de consultas que realizan full table scans en tablas grandes sin índices; creación masiva de transacciones que generan deadlocks; abuso de funciones costosas como REGEXP en MySQL sobre tablas grandes; explotación de cursores y procedimientos almacenados con bucles infinitos; y envío masivo de consultas de escritura que saturan el log de transacciones. Las herramientas de estrés legítimas como HammerDB o pgbench pueden ser abusadas. En SQL Server, los ataques de connection pool exhaustion bloquean nuevas conexiones de la aplicación. Los ataques de "heavy query" son difíciles de distinguir de consultas legítimas mal optimizadas.',
    realWorldExamples: [
      {
        name: 'DoS en MySQL mediante REGEXP maliciosa',
        year: '2015',
        description: 'Investigadores demostraron que una sola consulta MySQL con una expresión regular diseñada específicamente podía causar 100% de CPU en el servidor de base de datos durante minutos.',
        source: 'https://www.percona.com/blog/2015/07/22/regex-denial-of-service-in-mysql/',
      },
      {
        name: 'Ataques de lock contention en bases de datos bancarias',
        year: '2022',
        description: 'Múltiples instituciones financieras reportaron ataques que explotaban endpoints de API sin rate limiting para generar miles de transacciones concurrentes, causando lock contention y denegación de servicio.',
        source: 'https://owasp.org/www-community/attacks/Traffic_flood',
      },
    ],
    cves: [
      { id: 'CVE-2021-27928', description: 'MariaDB/MySQL - DoS mediante consulta especialmente diseñada que causaba fallo del servidor' },
      { id: 'CVE-2022-21413', description: 'MySQL Server - DoS en MySQL Server Optimizer que permitía a usuarios autenticados causar bloqueo del servicio' },
    ],
    mitreTechniques: [
      { id: 'T1499.003', name: 'Endpoint Denial of Service: Application Exhaustion Flood', url: 'https://attack.mitre.org/techniques/T1499/003/' },
    ],
    indicators: [
      'CPU del servidor de base de datos al 100% durante períodos prolongados',
      'Aumento masivo de conexiones activas a la base de datos (connection pool exhaustion)',
      'Queries con tiempo de ejecución anómalamente largo en logs de slow queries',
      'Alertas de deadlock en logs de MySQL/PostgreSQL/SQL Server',
      'Logs de aplicación con errores de timeout de base de datos para usuarios legítimos',
      'Uso de SLEEP(), BENCHMARK() o expresiones regulares complejas en queries de producción',
    ],
    attackFlow: [
      'Reconocimiento: Identificar endpoints de API o formularios que interactúan con la base de datos',
      'Análisis: Encontrar queries sin índices, funciones costosas o sin rate limiting',
      'Ataque: Enviar masivamente consultas costosas o conexiones que no se cierran',
      'Agotamiento: El servidor de base de datos agota CPU, memoria o conexiones disponibles',
      'Cascada: La aplicación no puede consultar la base de datos y devuelve errores a usuarios',
    ],
    impact:
      'Indisponibilidad completa de la aplicación dependiente de la base de datos, corrupción potencial de transacciones en curso al forzar el cierre del servidor, y pérdida de datos no comprometidos en el log de transacciones si el ataque coincide con una ventana de backup.',
    detectionMethods: [
      'Habilitar slow query log y alertar por queries que superen umbrales de tiempo',
      'Database Activity Monitoring (DAM) con detección de patrones de consulta anómalos',
      'Rate limiting en la capa de aplicación para endpoints que ejecutan queries costosas',
      'Resource governor en SQL Server para limitar CPU/memoria por usuario o grupo',
      'Monitoreo de métricas de base de datos (conexiones activas, CPU, lock waits) con Grafana',
      'Revisar y optimizar periódicamente índices para que consultas legítimas no sean costosas',
    ],
    references: [
      { title: 'Percona - MySQL DoS via REGEXP', url: 'https://www.percona.com/blog/2015/07/22/regex-denial-of-service-in-mysql/', type: 'blog' },
      { title: 'OWASP - SQL Injection Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', type: 'standard' },
      { title: 'CIS Benchmark for Microsoft SQL Server', url: 'https://www.cisecurity.org/benchmark/microsoft_sql_server', type: 'standard' },
    ],
  },
  // ── C.II.3 ──────────────────────────────────────────────────────────────────
  {
    code: 'C.II.3',
    name: 'Uso excesivo de ancho de banda',
    category: 'Denegación de Servicio',
    description:
      'Consumo deliberado o malicioso de la capacidad de ancho de banda de la organización, ya sea saturando el enlace de entrada desde el exterior o abusando del ancho de banda de salida mediante transferencias masivas de datos, impactando la calidad de servicio para usuarios legítimos y aumentando costos operativos.',
    technicalDetail:
      'Diferencia de C.I.7 (volumétrico externo puro): este incidente incluye también el abuso del ancho de banda de salida por parte de actores internos o sistemas comprometidos. Los vectores incluyen: exfiltración masiva de datos que satura el enlace de salida, servidores comprometidos que actúan como nodos de distribución de contenido pirata o malware, abuso de servidores de medios para streaming no autorizado, descarga masiva de datos de servicios cloud propios (egress costs), y ataques de tipo "loopback" donde el tráfico de ataque circula internamente. En entornos cloud (AWS, Azure), el abuso del ancho de banda de salida puede generar facturas imprevistas de miles de dólares por cargos de egress. El Data Transfer Out en AWS cuesta hasta USD 0,09/GB.',
    realWorldExamples: [
      {
        name: 'Exfiltración de datos de Equifax - Saturación de salida',
        year: '2017',
        description: 'Los atacantes en el caso Equifax exfiltraron 145 millones de registros de forma incremental durante 76 días, generando tráfico de salida inusual que no fue detectado por falta de monitoreo de ancho de banda.',
        source: 'https://www.congress.gov/116/meeting/house/110087/documents/HHRG-116-GO00-20191024-SD002.pdf',
      },
      {
        name: 'Servidores comprometidos como CDN para malware',
        year: '2022',
        description: 'Investigadores documentaron que grupos APT comprometían servidores universitarios y gubernamentales con buen ancho de banda para distribuir malware, consumiendo toda la capacidad disponible.',
        source: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-321a',
      },
    ],
    cves: [
      { id: 'CVE-2019-18935', description: 'Telerik UI - RCE que permitía usar servidores comprometidos para tráfico masivo no autorizado' },
      { id: 'CVE-2021-26084', description: 'Atlassian Confluence - RCE usado para instalar bots de tráfico que abusaban del ancho de banda' },
    ],
    mitreTechniques: [
      { id: 'T1498', name: 'Network Denial of Service', url: 'https://attack.mitre.org/techniques/T1498/' },
      { id: 'T1041', name: 'Exfiltration Over C2 Channel', url: 'https://attack.mitre.org/techniques/T1041/' },
    ],
    indicators: [
      'Saturación del enlace de Internet en dirección de salida (upload) sin actividad legítima',
      'Aumento inesperado en facturas de transferencia de datos cloud (AWS, Azure, GCP)',
      'Transferencias grandes a IPs externas no autorizadas o no conocidas',
      'Servidores con tráfico de red inusualmente alto comparado con su función',
      'Alertas de monitoreo por uso de ancho de banda fuera del rango normal (>2 desviaciones estándar)',
      'Logs de proxy o firewall con transferencias HTTP/S de cientos de GB a dominios externos',
    ],
    attackFlow: [
      'Compromiso: Instalar malware en servidor con buen ancho de banda',
      'Configuración: Establecer el servidor como nodo de distribución o exfiltración',
      'Transferencia: Iniciar transferencias masivas de datos de salida',
      'Saturación: El ancho de banda disponible se agota para tráfico legítimo',
      'Monetización: Exfiltrar datos valiosos o usar el servidor para otras actividades ilícitas',
    ],
    impact:
      'Degradación de servicios para usuarios legítimos por saturación del enlace, costos inesperados de transferencia en entornos cloud, posible exfiltración de datos sensibles incluida en el tráfico excesivo, y riesgo de corte del servicio por el proveedor de Internet.',
    detectionMethods: [
      'Implementar monitoreo de ancho de banda por host y servicio con alertas de umbral',
      'Data Loss Prevention (DLP) para detectar y bloquear transferencias masivas de datos',
      'Establecer límites de egress en entornos cloud con AWS Service Quotas o Azure Limits',
      'NetFlow/IPFIX análisis para identificar los hosts y destinos con mayor volumen de tráfico',
      'Segmentación de red para limitar el ancho de banda disponible por zona o VLAN',
      'Alertas de facturación en AWS/Azure/GCP cuando el gasto supera umbrales definidos',
    ],
    references: [
      { title: 'Equifax - Post-Incident Congressional Report', url: 'https://www.congress.gov/116/meeting/house/110087/documents/HHRG-116-GO00-20191024-SD002.pdf', type: 'paper' },
      { title: 'NIST SP 800-137: Information Security Continuous Monitoring', url: 'https://csrc.nist.gov/publications/detail/sp/800-137/final', type: 'standard' },
      { title: 'AWS - Cost Anomaly Detection', url: 'https://aws.amazon.com/aws-cost-management/aws-cost-anomaly-detection/', type: 'tool' },
    ],
  },
  // ── D.I.1 ───────────────────────────────────────────────────────────────────
  {
    code: 'D.I.1',
    name: 'Alteración de bases de datos',
    category: 'Manipulación de Datos',
    description:
      'Un actor malicioso con acceso a la base de datos modifica registros de forma no autorizada para alterar información crítica del negocio: balances financieros, datos de inventario, registros de clientes, resultados de auditorías o cualquier información cuya integridad sea crítica para las operaciones. A diferencia de la destrucción, el objetivo es el engaño manteniendo la apariencia de normalidad.',
    technicalDetail:
      'La alteración puede ocurrir directamente mediante SQL (UPDATE, INSERT, DELETE) con credenciales comprometidas, a través de inyección SQL que permite ejecutar queries modificadoras, mediante acceso directo al motor de base de datos con credenciales de servicio robadas, o mediante el abuso de procedimientos almacenados. Las alteraciones sofisticadas modifican también los logs de auditoría de la base de datos para ocultar los cambios. En fraudes financieros, los atacantes pueden alterar saldos, reversiones de transacciones, o tablas de conversión de divisas. El malware financiero como Carbanak especializó en la alteración silenciosa de bases de datos bancarias. La detección es difícil porque los registros modificados parecen legítimos si no hay controles de integridad.',
    realWorldExamples: [
      {
        name: 'Carbanak - Alteración de bases de datos bancarias',
        year: '2015',
        description: 'El grupo Carbanak alteró bases de datos de más de 100 bancos en 30 países, modificando saldos de cuentas para luego extraer el dinero mediante cajeros automáticos, robando hasta USD 1.000 millones.',
        source: 'https://www.kaspersky.com/about/press-releases/2015_carbanak-apt-the-great-bank-robbery',
      },
      {
        name: 'Bangladesh Bank Heist - Modificación de transferencias SWIFT',
        year: '2016',
        description: 'Hackers del grupo Lazarus alteraron instrucciones SWIFT en la base de datos del Banco Central de Bangladesh, robando USD 81 millones mediante transferencias fraudulentas a Filipinas.',
        source: 'https://www.reuters.com/article/us-cyber-heist-bangladesh-idUSKCN0WQ0AR',
      },
      {
        name: 'Alteración de resultados de laboratorio COVID-19',
        year: '2020',
        description: 'El FBI investigó incidentes donde atacantes modificaron resultados en bases de datos de laboratorios de salud pública, alterando registros de pruebas COVID-19 positivas a negativas.',
        source: 'https://www.ic3.gov/Media/Y2020/PSA200430',
      },
    ],
    cves: [
      { id: 'CVE-2012-2122', description: 'MySQL Authentication Bypass - Permitía autenticación sin contraseña correcta, posibilitando alteraciones directas' },
      { id: 'CVE-2021-22019', description: 'VMware vCenter - Vulnerabilidad que permitía acceder y modificar bases de datos de configuración' },
    ],
    mitreTechniques: [
      { id: 'T1565.001', name: 'Data Manipulation: Stored Data Manipulation', url: 'https://attack.mitre.org/techniques/T1565/001/' },
    ],
    indicators: [
      'Cambios en registros de base de datos sin transacciones correspondientes en el sistema de negocio',
      'Discrepancias entre datos de base de datos y reportes generados fuera de la DB',
      'Usuarios de base de datos ejecutando UPDATE/DELETE fuera de horario laboral',
      'Alertas de triggers de auditoría de base de datos por modificaciones masivas',
      'Diferencias en hashes de integridad de tablas críticas',
      'Logs de auditoría de base de datos con gaps temporales o entradas eliminadas',
    ],
    attackFlow: [
      'Acceso: Comprometer credenciales de base de datos o usuario de aplicación con permisos de escritura',
      'Reconocimiento: Explorar el esquema de la base de datos para entender las tablas críticas',
      'Manipulación: Ejecutar queries UPDATE/INSERT modificando registros específicos de alto valor',
      'Encubrimiento: Modificar o eliminar logs de auditoría de la base de datos',
      'Explotación: Realizar operaciones fraudulentas basadas en los datos alterados',
      'Persistencia: Configurar triggers o procedimientos almacenados para mantener las alteraciones',
    ],
    impact:
      'Fraude financiero de alto impacto, toma de decisiones empresariales basadas en datos falsos, incumplimiento regulatorio (SOX, PCI-DSS) por datos financieros inexactos, daño reputacional severo si se descubre la manipulación, y pérdida de confianza de clientes e inversores.',
    detectionMethods: [
      'Habilitar auditoría de base de datos completa (Oracle Audit Vault, SQL Server Audit)',
      'Implementar checksums o hashing de tablas críticas con verificación periódica',
      'Database Activity Monitoring (DAM) con alertas para queries UPDATE/DELETE masivos',
      'Reconciliación automática de saldos entre sistemas (base de datos vs. sistema contable)',
      'Separación de privilegios: usuarios de aplicación sin permisos UPDATE directos en tablas críticas',
      'Replicación de base de datos a sistema de solo lectura para comparación periódica',
    ],
    references: [
      { title: 'MITRE ATT&CK - Stored Data Manipulation', url: 'https://attack.mitre.org/techniques/T1565/001/', type: 'standard' },
      { title: 'Kaspersky - Carbanak APT Report', url: 'https://www.kaspersky.com/about/press-releases/2015_carbanak-apt-the-great-bank-robbery', type: 'paper' },
      { title: 'PCI DSS - Data Integrity Requirements', url: 'https://www.pcisecuritystandards.org/document_library/', type: 'standard' },
      { title: 'CIS Benchmark for Database Servers', url: 'https://www.cisecurity.org/cis-benchmarks/', type: 'standard' },
    ],
  },
  // ── D.I.2 ───────────────────────────────────────────────────────────────────
  {
    code: 'D.I.2',
    name: 'Alteración de sitio web (defacement)',
    category: 'Manipulación de Datos',
    description:
      'Modificación no autorizada del contenido visible de un sitio web para reemplazarlo con mensajes del atacante, propaganda política o religiosa, declaraciones de hackeo, o contenido ofensivo. Es uno de los incidentes más visibles públicamente y causa daño reputacional inmediato aunque raramente involucra robo de datos.',
    technicalDetail:
      'Los métodos de defacement incluyen: explotación de vulnerabilidades en CMS (WordPress, Joomla, Drupal) mediante plugins/temas vulnerables; inyección SQL que permite escribir archivos en el servidor; compromiso de credenciales FTP/SFTP/Panel de hosting; explotación de vulnerabilidades de subida de archivos; compromiso de cuentas de registrador de dominio para apuntar DNS a servidor del atacante; y acceso a través de shell web previamente instalado. Los grupos hacktivistas como Anonymous, Turk Hack Team y Syrian Electronic Army han realizado campañas masivas de defacement político. Zone-H es el archivo histórico de defacements donde atacantes registran sus "logros". Los defacements masivos automatizados explotan CMS con la misma vulnerabilidad en miles de sitios simultáneamente.',
    realWorldExamples: [
      {
        name: 'Defacement de sitios gubernamentales ucranianos',
        year: '2022',
        description: 'Días antes de la invasión rusa de Ucrania, decenas de sitios gubernamentales ucranianos fueron defaceados con mensajes amenazantes en ucraniano, ruso y polaco.',
        source: 'https://www.microsoft.com/en-us/security/blog/2022/01/15/destructive-malware-targeting-ukrainian-organizations/',
      },
      {
        name: 'Campaña masiva de defacement de WordPress',
        year: '2019',
        description: 'Un solo actor comprometió más de 3.000 sitios WordPress en 24 horas explotando una vulnerabilidad en el plugin Social Warfare, reemplazando el contenido con propaganda política.',
        source: 'https://www.wordfence.com/blog/2019/03/social-warfare-vulnerability-exploited-in-the-wild/',
      },
    ],
    cves: [
      { id: 'CVE-2019-9978', description: 'WordPress Social Warfare Plugin - XSS almacenado que permitía defacement sin autenticación' },
      { id: 'CVE-2020-11738', description: 'WordPress Duplicator Plugin - Path traversal que permitía leer y escribir archivos del servidor' },
    ],
    mitreTechniques: [
      { id: 'T1491.003', name: 'Defacement: External Defacement', url: 'https://attack.mitre.org/techniques/T1491/003/' },
    ],
    indicators: [
      'Contenido del sitio web reemplazado o con mensajes de "Hacked by" o propaganda',
      'Modificación de archivos index.html/php sin deploy autorizado',
      'Alertas de monitoreo de disponibilidad con respuestas HTTP 200 pero contenido cambiado',
      'Nuevos archivos PHP o HTML en el servidor web no incluidos en el despliegue',
      'Entradas en Zone-H o similares con el dominio de la organización',
      'Accesos FTP o SFTP desde IPs no autorizadas en logs del servidor',
    ],
    attackFlow: [
      'Reconocimiento: Identificar tecnología CMS y versiones con herramientas como WhatWeb',
      'Explotación: Explotar vulnerabilidad en CMS, plugin, o credenciales comprometidas',
      'Acceso al servidor: Subir web shell o modificar directamente archivos del servidor',
      'Defacement: Reemplazar o modificar archivos index con el contenido del atacante',
      'Proclamación: Registrar el defacement en Zone-H o anunciarlo en redes sociales',
    ],
    impact:
      'Daño reputacional inmediato y visible, pérdida de confianza de visitantes y clientes, impacto en posicionamiento SEO (Google puede marcar el sitio como comprometido), potencial propagación de contenido ofensivo o desinformación, y posibles consecuencias legales si se publica contenido ilegal.',
    detectionMethods: [
      'Monitoreo de integridad de archivos web con FIM (OSSEC, Tripwire) en el servidor',
      'Alertas de cambio de contenido con herramientas de monitoreo web (Uptime Robot con verificación de contenido)',
      'WAF con reglas para bloquear subida de archivos PHP o scripts desde el exterior',
      'Sistema de despliegue CI/CD que sobreescriba archivos en cada deploy (inmutabilidad)',
      'Google Search Console y Bing Webmaster para alertas de contenido comprometido',
      'Restauración automática desde backup ante detección de cambios no autorizados',
    ],
    references: [
      { title: 'Zone-H - Web Defacement Archive', url: 'https://www.zone-h.org/', type: 'tool' },
      { title: 'OWASP - Web Application Security', url: 'https://owasp.org/www-project-top-ten/', type: 'standard' },
      { title: 'Wordfence - WordPress Security Blog', url: 'https://www.wordfence.com/blog/', type: 'blog' },
    ],
  },
  // ── D.I.3 ───────────────────────────────────────────────────────────────────
  {
    code: 'D.I.3',
    name: 'Manipulación de datos no autentificados',
    category: 'Manipulación de Datos',
    description:
      'Modificación de datos en tránsito o en reposo que no están protegidos por mecanismos de autenticación de integridad (firmas digitales, MACs, checksums criptográficos), permitiendo al atacante alterar información sin dejar rastros verificables. Afecta la confiabilidad de los datos cuando no existe forma de verificar si han sido modificados.',
    technicalDetail:
      'Los vectores incluyen: manipulación de parámetros en aplicaciones web sin validación server-side (parameter tampering), modificación de tokens JWT con algoritmo "none" o mediante uso de la clave pública como secreto HMAC, alteración de cookies de sesión sin firma criptográfica, manipulación de mensajes en protocolos sin integridad (HTTP puro sin TLS), modificación de archivos de configuración o datos en repositorios sin checksums, y ataques de bit-flipping en criptosistemas con modos de operación CBC sin autenticación (padding oracle). La falta de validación de integridad en APIs REST que aceptan parámetros de usuario directamente como datos de negocio es extremadamente común.',
    realWorldExamples: [
      {
        name: 'JWT "alg: none" en múltiples plataformas',
        year: '2015',
        description: 'Investigadores descubrieron que múltiples plataformas aceptaban tokens JWT con el algoritmo "none", permitiendo a cualquier usuario modificar sus privilegios en el token sin firma válida.',
        source: 'https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/',
      },
      {
        name: 'Padding Oracle Attack contra aplicaciones bancarias',
        year: '2018',
        description: 'Múltiples aplicaciones bancarias latinoamericanas usaban cifrado AES-CBC sin autenticación de integridad, siendo vulnerables a ataques POODLE/padding oracle que permitían modificar datos cifrados.',
        source: 'https://www.nccgroup.com/us/about-us/newsroom-and-events/blogs/2019/november/padding-oracles-everywhere/',
      },
    ],
    cves: [
      { id: 'CVE-2022-21449', description: 'Java ECDSA "Psychic Signatures" - Firmas digitales vacías aceptadas como válidas, permitiendo manipulación de datos autenticados' },
      { id: 'CVE-2015-9235', description: 'jsonwebtoken - Vulnerabilidad de algoritmo "none" en tokens JWT que permitía manipulación sin firma' },
    ],
    mitreTechniques: [
      { id: 'T1565', name: 'Data Manipulation', url: 'https://attack.mitre.org/techniques/T1565/' },
      { id: 'T1565.002', name: 'Data Manipulation: Transmitted Data Manipulation', url: 'https://attack.mitre.org/techniques/T1565/002/' },
    ],
    indicators: [
      'Parámetros HTTP con valores modificados que difieren del flujo normal de la aplicación',
      'Tokens JWT con campos de privilegio elevados que no corresponden al usuario autenticado',
      'Checksum o hash de archivos que no coincide con el esperado en sistema de verificación',
      'Errores de aplicación por datos en formato inesperado (posible manipulación en tránsito)',
      'Transacciones con valores atípicos que no siguen patrones históricos del usuario',
      'Alertas de WAF por parameter tampering o manipulación de cookies',
    ],
    attackFlow: [
      'Interceptación: Capturar datos en tránsito (MitM) o en reposo sin protección de integridad',
      'Análisis: Entender el formato y estructura de los datos para identificar campos críticos',
      'Modificación: Alterar campos de interés (privilegios, saldos, identificadores) sin disparar alertas',
      'Reenvío: Enviar los datos modificados al sistema receptor',
      'Explotación: El sistema procesa los datos falsos como legítimos por falta de verificación de integridad',
    ],
    impact:
      'Escalada de privilegios mediante modificación de tokens, fraude financiero por alteración de importes de transacciones, acceso a recursos de otros usuarios por modificación de identificadores, y decisiones de negocio basadas en datos comprometidos.',
    detectionMethods: [
      'Firmar digitalmente todos los tokens y mensajes críticos (JWT con RS256/ES256, no HS256 sin secreto fuerte)',
      'Usar HTTPS con HSTS en todas las comunicaciones para prevenir manipulación en tránsito',
      'Validar todos los parámetros server-side independientemente de lo enviado por el cliente',
      'Implementar MACs (Message Authentication Codes) para archivos de datos críticos',
      'Usar modos de cifrado autenticado (AES-GCM) en lugar de AES-CBC sin MAC',
      'Auditorías de seguridad de APIs con enfoque en parameter tampering y JWT security',
    ],
    references: [
      { title: 'Auth0 - Critical JWT Vulnerabilities', url: 'https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/', type: 'blog' },
      { title: 'OWASP - Insecure Direct Object References', url: 'https://owasp.org/www-project-top-ten/', type: 'standard' },
      { title: 'NIST SP 800-57: Cryptographic Key Management', url: 'https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final', type: 'standard' },
    ],
  },
  // ── D.II.1 ──────────────────────────────────────────────────────────────────
  {
    code: 'D.II.1',
    name: 'Alteración de reglas de firewall',
    category: 'Manipulación de Datos',
    description:
      'Modificación no autorizada de las reglas de firewall (perimetral, de host, o en la nube) para abrir puertos y servicios que deberían estar bloqueados, permitir comunicaciones no autorizadas, o eliminar controles de seguridad de red. El atacante manipula las políticas de seguridad para facilitar su propio acceso o el de otros actores.',
    technicalDetail:
      'Los vectores de alteración incluyen: acceso a paneles de gestión de firewall con credenciales comprometidas (Palo Alto Panorama, Cisco ASDM, pfSense); modificación de Security Groups de AWS o Network Security Groups de Azure mediante credenciales IAM comprometidas; uso de herramientas de automatización (Terraform, Ansible) con acceso no autorizado para modificar configuraciones de red; explotación de vulnerabilidades en el propio firewall (CVE de Fortigate, Palo Alto, SonicWall); e inyección de rutas BGP que modifica el tráfico a nivel de enrutamiento. Los atacantes frecuentemente añaden reglas que permiten su propia IP o rangos amplios (0.0.0.0/0) en servicios de gestión antes de otras actividades maliciosas.',
    realWorldExamples: [
      {
        name: 'Pulse Secure VPN - Modificación de configuraciones de acceso',
        year: '2021',
        description: 'Actores APT explotaron CVE-2021-22893 en Pulse Secure VPN para modificar configuraciones de acceso y firewall, manteniendo acceso persistente a organizaciones gubernamentales y de defensa.',
        source: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-110a',
      },
      {
        name: 'Fortinet FortiGate - Modificación de reglas por actores APT',
        year: '2023',
        description: 'El grupo Volt Typhoon explotó Fortinet FortiGate para crear reglas de firewall que permitían tráfico lateral dentro de infraestructura crítica de EE.UU., permaneciendo sin detección por meses.',
        source: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a',
      },
    ],
    cves: [
      { id: 'CVE-2022-40684', description: 'Fortinet FortiOS/FortiProxy - Bypass de autenticación que permitía modificar configuraciones de firewall incluyendo reglas y políticas' },
      { id: 'CVE-2021-22893', description: 'Pulse Connect Secure - RCE que permitía modificar configuraciones de acceso y firewall en VPNs corporativas' },
    ],
    mitreTechniques: [
      { id: 'T1562.004', name: 'Impair Defenses: Disable or Modify System Firewall', url: 'https://attack.mitre.org/techniques/T1562/004/' },
    ],
    indicators: [
      'Cambios en reglas de firewall fuera de ventanas de mantenimiento programadas',
      'Nuevas reglas de acceso permisivas (allow any, 0.0.0.0/0) no documentadas',
      'Accesos al panel de gestión del firewall desde IPs no autorizadas',
      'Alertas de sistemas de gestión de cambio (ITSM) por modificaciones no aprobadas',
      'Tráfico en puertos que previamente estaban bloqueados según políticas de seguridad',
      'Logs de auditoría del firewall con eliminación o modificación de reglas críticas',
    ],
    attackFlow: [
      'Compromiso: Obtener credenciales de gestión del firewall mediante phishing o credential stuffing',
      'Acceso: Autenticarse en el panel de gestión del firewall (Panorama, ASDM, CLI)',
      'Reconocimiento: Analizar las reglas existentes para entender el contexto de seguridad',
      'Modificación: Añadir reglas permisivas o eliminar reglas restrictivas estratégicas',
      'Persistencia: Asegurar que la regla persiste tras reinicios o actualizaciones de configuración',
      'Explotación: Usar el acceso habilitado por las nuevas reglas para avanzar en el ataque',
    ],
    impact:
      'Exposición de servicios internos que deberían estar bloqueados, facilitación de movimiento lateral dentro de la red, creación de backdoors de red persistentes, y violación de los controles de segmentación de red que protegen sistemas críticos.',
    detectionMethods: [
      'Gestión de cambios (Change Management) obligatoria para toda modificación de firewall',
      'SIEM con ingesta de logs de auditoría del firewall y alertas por cambios de reglas',
      'Comparación periódica del estado actual de reglas contra baseline aprobado (firewall compliance)',
      'MFA obligatorio para acceso al panel de gestión del firewall',
      'Uso de herramientas de gestión de políticas de firewall (AlgoSec, Tufin) con aprobación de cambios',
      'Network Detection and Response para detectar tráfico en puertos previamente bloqueados',
    ],
    references: [
      { title: 'CISA - Fortinet Vulnerabilities', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a', type: 'standard' },
      { title: 'NIST SP 800-41: Guidelines on Firewalls and Firewall Policy', url: 'https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final', type: 'standard' },
      { title: 'CIS Controls - Network Monitoring and Defense', url: 'https://www.cisecurity.org/controls/', type: 'standard' },
    ],
  },
  // ── D.II.2 ──────────────────────────────────────────────────────────────────
  {
    code: 'D.II.2',
    name: 'Desactivación de registros de seguridad',
    category: 'Manipulación de Datos',
    description:
      'Un atacante con acceso privilegiado deshabilita, manipula o elimina los sistemas de registro y auditoría de seguridad para ocultar su actividad maliciosa y dificultar la detección y el análisis forense posterior. Es frecuentemente una de las primeras acciones tras obtener acceso con privilegios elevados.',
    technicalDetail:
      'Las técnicas incluyen: deshabilitar el servicio de auditoría de Windows (auditpol /clear), eliminar el log de eventos de Windows (Event ID 1102 indica borrado del log de seguridad), detener agentes de SIEM (Splunk Universal Forwarder, Elastic Agent, Filebeat), eliminar archivos de log del sistema (/var/log/auth.log, /var/log/syslog), modificar la configuración de syslog para enviar logs a un destino controlado por el atacante, deshabilitar auditd en Linux, manipular políticas de retención para reducir el tiempo de conservación, y configurar reglas de exclusión en el EDR para los propios procesos del atacante. Los grupos APT también usan técnicas de log tampering más sutiles: modificar timestamps, añadir entradas falsas para confundir el análisis, o filtrar eventos específicos.',
    realWorldExamples: [
      {
        name: 'SolarWinds - Eliminación de registros por Sunburst',
        year: '2020',
        description: 'El malware Sunburst eliminó sistemáticamente rastros de logs en los sistemas comprometidos, incluyendo eventos de Windows y logs de aplicación, durante el período activo de espionaje.',
        source: 'https://www.fireeye.com/blog/threat-research/2020/12/evasion-techniques-and-controls-defenses-sunburst.html',
      },
      {
        name: 'NotPetya - Eliminación de logs en sistemas comprometidos',
        year: '2017',
        description: 'NotPetya eliminó todos los logs de eventos de Windows en los sistemas que comprometía antes de sobreescribir el MBR, impidiendo cualquier análisis forense posterior.',
        source: 'https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/',
      },
    ],
    cves: [
      { id: 'CVE-2021-34527', description: 'Windows Print Spooler (PrintNightmare) - Usado para obtener SYSTEM y deshabilitar auditorías' },
      { id: 'CVE-2020-1472', description: 'Zerologon - Permitía comprometer el DC y deshabilitar auditorías de Active Directory' },
    ],
    mitreTechniques: [
      { id: 'T1562.002', name: 'Impair Defenses: Disable Windows Event Logging', url: 'https://attack.mitre.org/techniques/T1562/002/' },
      { id: 'T1070', name: 'Indicator Removal', url: 'https://attack.mitre.org/techniques/T1070/' },
    ],
    indicators: [
      'Windows Event ID 1102 (Security Log Cleared) o Event ID 104 (System Log Cleared)',
      'Gaps temporales en logs de SIEM sin explicación en los hosts afectados',
      'Agente de SIEM desconectado o reportando sin eventos durante períodos de actividad del sistema',
      'Servicio auditd detenido en sistemas Linux sin autorización',
      'Comandos auditpol o wevtutil ejecutados desde cuentas no administrativas estándar',
      'Reducción súbita del volumen de logs recibidos desde un host específico',
    ],
    attackFlow: [
      'Privilegios elevados: Obtener acceso de administrador local o SYSTEM en el sistema objetivo',
      'Inventario: Identificar los sistemas de logging activos (agentes, servicios, archivos de log)',
      'Desactivación: Detener servicios de logging, agentes de SIEM, y deshabilitar auditoría',
      'Eliminación retroactiva: Borrar logs existentes que pudieran registrar el acceso inicial',
      'Actividad: Realizar actividades maliciosas sin dejar registro en sistemas locales',
      'Restauración (opcional): Reactivar logging para evitar alertas por ausencia prolongada de eventos',
    ],
    impact:
      'Pérdida irreversible de evidencia forense para determinar el alcance del compromiso, imposibilidad de reconstruir el timeline del ataque, incumplimiento de requisitos regulatorios de retención de logs (PCI-DSS Req. 10, ISO 27001 A.12.4), y potencial continuación del atacante sin detección.',
    detectionMethods: [
      'Enviar logs a SIEM centralizado e inmutable (no modificable desde el endpoint comprometido)',
      'Alertas automáticas por Event ID 1102 y 104 en cualquier sistema Windows',
      'Monitoreo del estado de agentes de SIEM con alerta si un host deja de enviar logs',
      'Logs write-once en almacenamiento WORM o servicios cloud de logging (AWS CloudWatch con retención)',
      'Auditoría de integridad de la propia configuración de auditoría (auditpol settings)',
      'Red team exercises periódicos para verificar que las técnicas de evasión de logging son detectadas',
    ],
    references: [
      { title: 'MITRE ATT&CK - Impair Defenses', url: 'https://attack.mitre.org/techniques/T1562/', type: 'standard' },
      { title: 'NSA/CISA - Cybersecurity Information Sheet: Logging', url: 'https://www.nsa.gov/Press-Room/News-Highlights/Article/Article/2784906/nsa-cisa-release-cybersecurity-information-sheet-on-logging-practices/', type: 'standard' },
      { title: 'NIST SP 800-92: Guide to Computer Security Log Management', url: 'https://csrc.nist.gov/publications/detail/sp/800-92/final', type: 'standard' },
    ],
  },
  // ── D.II.3 ──────────────────────────────────────────────────────────────────
  {
    code: 'D.II.3',
    name: 'Modificación de políticas de acceso',
    category: 'Manipulación de Datos',
    description:
      'Un atacante con acceso privilegiado modifica las políticas de control de acceso del sistema (Group Policy Objects, IAM policies, ACLs, políticas de rol en aplicaciones) para otorgarse o a terceros privilegios adicionales, reducir controles de seguridad, o mantener acceso persistente de forma difícil de detectar.',
    technicalDetail:
      'Los vectores más comunes incluyen: modificación de GPOs en Active Directory para deshabilitar controles de seguridad (antivirus, firewall, bloqueo de pantalla) o añadir usuarios al grupo de administradores locales; creación de políticas IAM en AWS con permisos amplios (AdministratorAccess) para cuentas controladas por el atacante; modificación de roles de aplicación para elevar privilegios de cuentas de bajo nivel; alteración de ACLs de directorios para acceder a recursos protegidos; y creación de relaciones de confianza entre dominios de Active Directory para federar acceso. Los frameworks de post-explotación como Cobalt Strike, Metasploit y BloodHound facilitan la identificación y modificación de políticas de acceso en AD.',
    realWorldExamples: [
      {
        name: 'Lapsus$ - Modificación de políticas en Okta y Azure AD',
        year: '2022',
        description: 'Lapsus$ obtuvo acceso de superadministrador a Okta y modificó políticas de autenticación para eliminar MFA de cuentas estratégicas, afectando a cientos de empresas clientes de Okta.',
        source: 'https://www.okta.com/blog/2022/03/oktas-investigation-of-the-january-2022-compromise/',
      },
      {
        name: 'APT41 - Modificación de políticas IAM en AWS',
        year: '2020',
        description: 'APT41 comprometió entornos AWS de múltiples organizaciones y creó políticas IAM persistentes con acceso amplio, usando estas cuentas backdoor para mantener acceso a largo plazo.',
        source: 'https://www.mandiant.com/resources/apt41-initiates-global-intrusion-campaign-using-multiple-exploits',
      },
    ],
    cves: [
      { id: 'CVE-2021-42278', description: 'Active Directory - sAMAccountName spoofing que permitía modificar políticas de acceso mediante impersonación de controladores de dominio' },
      { id: 'CVE-2021-42287', description: 'Active Directory - Escalada de privilegios que permitía modificar membresía de grupos privilegiados y políticas de acceso' },
    ],
    mitreTechniques: [
      { id: 'T1489', name: 'Service Stop', url: 'https://attack.mitre.org/techniques/T1489/' },
      { id: 'T1098', name: 'Account Manipulation', url: 'https://attack.mitre.org/techniques/T1098/' },
    ],
    indicators: [
      'Cambios en GPOs de Active Directory fuera de ventanas de mantenimiento autorizadas',
      'Nuevas políticas IAM con permisos amplios creadas por cuentas inusuales en entornos cloud',
      'Usuarios añadidos a grupos de alta privilegiación (Domain Admins, Global Administrators) sin ticket de cambio',
      'Alertas de Microsoft Defender for Identity por modificaciones de políticas de dominio',
      'AWS CloudTrail con eventos CreatePolicy o AttachUserPolicy desde IPs no corporativas',
      'Relaciones de confianza de dominio nuevas o modificadas en Active Directory',
    ],
    attackFlow: [
      'Compromiso: Obtener privilegios suficientes para modificar políticas (Domain Admin, Global Admin, IAM Admin)',
      'Reconocimiento: Analizar las políticas existentes para identificar la forma óptima de persistencia',
      'Modificación: Crear o alterar políticas para otorgar acceso permanente a cuentas controladas',
      'Encubrimiento: Hacer las modificaciones lo más sutiles posible para evitar detección (añadir permisos incrementales)',
      'Persistencia: Las políticas modificadas sobreviven a cambios de contraseña y se aplican automáticamente',
      'Abuso: Usar los privilegios obtenidos para acceso continuo o escalada a objetivos adicionales',
    ],
    impact:
      'Acceso persistente de largo plazo que sobrevive a rotaciones de contraseñas, escalada de privilegios a recursos críticos, violación del principio de mínimo privilegio que puede exponer datos de alta sensibilidad, y dificultad extrema para erradicar completamente el acceso del atacante.',
    detectionMethods: [
      'Alertas en SIEM por cambios en membresía de grupos privilegiados de AD (Event ID 4728, 4732)',
      'AWS CloudTrail con alertas para acciones IAM de alto impacto (CreatePolicy, AttachRolePolicy)',
      'Microsoft Defender for Identity para detección de cambios anómalos en Active Directory',
      'Auditoría periódica de GPOs con comparación contra estado de referencia aprobado',
      'Revisión trimestral de políticas IAM con herramientas como IAM Access Analyzer o Prisma Cloud',
      'Implementar Identity Governance and Administration (IGA) con aprobación de cambios de acceso',
    ],
    references: [
      { title: 'MITRE ATT&CK - Account Manipulation', url: 'https://attack.mitre.org/techniques/T1098/', type: 'standard' },
      { title: 'CIS Controls - Account Management', url: 'https://www.cisecurity.org/controls/cis-controls-list', type: 'standard' },
      { title: 'AWS - IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html', type: 'standard' },
      { title: 'Microsoft - Secure Privileged Access', url: 'https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-roadmap', type: 'standard' },
    ],
  },
];

// For entries not in the detailed library, generate a mínimal entry from taxonomy
export function getLibraryEntry(code: string): BibliotecaEntry | undefined {
  return BIBLIOTECA.find((b) => b.code === code);
}
