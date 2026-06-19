/* 
================================================================
VYBRR - Direct Response & Digital Strategy
Premium Javascript Functionality (LM Technology Inspired)
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configurações do WhatsApp ---
    const WHATSAPP_LINK = 'https://wa.me/5500000000000'; // Substitua pelo número real da VYBRR (ex: https://wa.me/5511999999999)
    
    // --- Controle de Idiomas (PT | EN | ES) ---
    let currentLang = 'pt';
    
    // Detecta idioma do navegador
    const getBrowserLanguage = () => {
        const lang = navigator.language || navigator.userLanguage;
        const prefix = lang.slice(0, 2).toLowerCase();
        if (prefix === 'es') return 'es';
        if (prefix === 'en') return 'en';
        return 'pt'; // padrão
    };

    // Ajusta o atributo lang da tag html para acessibilidade e SEO
    const setHtmlLangAttribute = (lang) => {
        const html = document.documentElement;
        if (lang === 'pt') {
            html.setAttribute('lang', 'pt-BR');
        } else if (lang === 'en') {
            html.setAttribute('lang', 'en-US');
        } else if (lang === 'es') {
            html.setAttribute('lang', 'es');
        }
    };

    // Altera o idioma da página varrendo o DOM
    const changeLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('vybrr_lang', lang);
        setHtmlLangAttribute(lang);
        
        // Atualiza a classe ativa nos botões do seletor
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Traduz elementos de texto (data-i18n)
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Traduz atributos como placeholder (data-i18n-attr="placeholder:chave")
        const i18nAttrs = document.querySelectorAll('[data-i18n-attr]');
        i18nAttrs.forEach(element => {
            const attrExpression = element.getAttribute('data-i18n-attr');
            const [attrName, key] = attrExpression.split(':');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute(attrName, translations[lang][key]);
            }
        });
        
        // Atualiza os links e mensagens do WhatsApp
        setupWhatsAppLinks();
    };

    // Configura dinamicamente todos os links e mensagens de WhatsApp na página
    const setupWhatsAppLinks = () => {
        const waButtons = document.querySelectorAll('.wa-trigger');
        waButtons.forEach(button => {
            const isFloating = button.classList.contains('whatsapp-fixed');
            let msgText = '';
            
            if (isFloating) {
                msgText = translations[currentLang].waFloatingMessage;
            } else {
                // Caso tenha uma mensagem manual nos atributos
                const customMsg = button.getAttribute('data-message');
                msgText = customMsg ? translations[currentLang][customMsg] || customMsg : translations[currentLang].waDefaultMessage;
            }
            
            button.href = `${WHATSAPP_LINK}?text=${encodeURIComponent(msgText)}`;
            button.setAttribute('target', '_blank');
            button.setAttribute('rel', 'noopener noreferrer');
        });
    };

    // --- Envio de Formulário via WhatsApp (Direct Response) ---
    const formSubmitButton = document.getElementById('form-submit-wa');
    if (formSubmitButton) {
        formSubmitButton.addEventListener('click', () => {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const msgContent = document.getElementById('msg').value.trim();
            
            // Mensagens de erro com base no idioma ativo
            let validationMsg = 'Por favor, preencha todos os campos do formulário para prosseguir.';
            if (currentLang === 'en') {
                validationMsg = 'Please fill out all form fields to proceed.';
            } else if (currentLang === 'es') {
                validationMsg = 'Por favor, completa todos los campos del formulario para continuar.';
            }
            
            if (!name || !email || !company || !msgContent) {
                alert(validationMsg);
                return;
            }
            
            // Monta mensagem usando o template traduzido
            const template = translations[currentLang].waFormMessageTemplate;
            const formattedMessage = template
                .replace('{name}', name)
                .replace('{email}', email)
                .replace('{company}', company)
                .replace('{msg}', msgContent);
            
            const encodedMessage = encodeURIComponent(formattedMessage);
            const waUrl = `${WHATSAPP_LINK}?text=${encodedMessage}`;
            
            // Abre o WhatsApp em uma nova aba
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // --- Event Listeners para o Seletor de Idiomas ---
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            changeLanguage(selectedLang);
        });
    });

    // --- Header Scrolled Effect ---
    const header = document.querySelector('header');
    const checkHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll();

    // --- Menu Mobile Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.className = 'lucide lucide-x';
                    icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
                } else {
                    icon.className = 'lucide lucide-menu';
                    icon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
                }
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = 'lucide lucide-menu';
                    icon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== mobileToggle) {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = 'lucide lucide-menu';
                    icon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
                }
            }
        });
    }

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navHighlighter = () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', navHighlighter);

    // --- Intersection Observer para Animações On-Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Inicialização do Idioma Padrão / Salvo / Browser ---
    const savedLang = localStorage.getItem('vybrr_lang');
    const initialLang = savedLang || getBrowserLanguage();
    changeLanguage(initialLang);
});
