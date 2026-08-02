/* ==========================================================================
   Interactive Scripts - Chilakala Pavani Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Typewriter Effect
    const words = [
        "AI Agent Developer",
        "Generative AI Specialist",
        "Machine Learning Developer",
        "CSBS Undergraduate"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    let typingSpeed = 100;

    function type() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster delete
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal type
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    type();

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Skills Bar Animation
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        bar.style.transform = 'scaleX(1)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        skillsObserver.observe(skillsSection);
    }

    // 5. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200; // Offset for accuracy

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Neural Network Interactive SVG Tooltip
    const nodes = document.querySelectorAll('.node-interactive');
    const tooltip = document.getElementById('node-tooltip');

    if (nodes && tooltip) {
        nodes.forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                const infoText = e.target.getAttribute('data-info');
                tooltip.textContent = infoText;
                tooltip.style.color = 'var(--accent-primary)';
                tooltip.style.borderColor = 'var(--accent-primary)';
            });

            node.addEventListener('mouseleave', () => {
                tooltip.textContent = "Hover over nodes to inspect Agent Pipeline";
                tooltip.style.color = 'var(--text-secondary)';
                tooltip.style.borderColor = 'rgba(0, 242, 254, 0.2)';
            });
        });
    }

    // 7. Interactive Chatbot Agent Terminal Mockup
    const terminalBody = document.getElementById('terminal-body');
    const terminalForm = document.getElementById('terminal-form');
    const terminalInput = document.getElementById('terminal-input');
    const suggestButtons = document.querySelectorAll('.suggest-btn');

    // Predefined answers knowledge-base
    const responseDB = {
        help: `Available commands:<br>
          - <span class="cmd-highlight">skills</span>: List technical skills in GenAI, ML, and programming.<br>
          - <span class="cmd-highlight">projects</span>: Provide details of key deep learning projects.<br>
          - <span class="cmd-highlight">education</span>: View college degree, major, CGPA and timeline.<br>
          - <span class="cmd-highlight">experience</span>: View virtual simulations (Tata, Goldman Sachs).<br>
          - <span class="cmd-highlight">certifications</span>: View cloud (AWS) and AI certifications.<br>
          - <span class="cmd-highlight">contact</span>: Display phone number, email, and social networks.<br>
          - <span class="cmd-highlight">clear</span>: Clear terminal console history.`,
        
        skills: `<strong>=== Technical Skill Sets ===</strong><br>
          - <strong>Generative AI:</strong> Prompt Engineering, LLMs (Gemini, Claude, GPT), RAG pipelines, OpenAI API, AI Agents, LangChain (Basics).<br>
          - <strong>Machine Learning:</strong> Deep Learning, Neural Networks, Feature Engineering, Model Training & Validation.<br>
          - <strong>Libraries:</strong> TensorFlow, Scikit-learn, Pandas, NumPy, Matplotlib.<br>
          - <strong>Languages:</strong> Python, SQL.<br>
          - <strong>Developer Tools:</strong> Git, GitHub, VS Code, Google Colab, Power BI.`,
        
        projects: `<strong>=== Project Registry ===</strong><br>
          1. <strong>Vital Health Monitoring System (Deep Learning):</strong><br>
             Estimates blood pressure using physiological datasets in Python. Features extensive data preprocessing, feature engineering, and model validation using MAE & RMSE metrics.<br>
          2. <strong>Intrusion Detection System for IoT (DL & CyberSecurity):</strong><br>
             A deep neural network classifier designed to classify IoT traffic attacks. Achieved 94% classification accuracy while reducing false positive alerts.`,
        
        education: `<strong>=== Academic Records ===</strong><br>
          - <strong>Degree:</strong> Bachelor of Technology (B.Tech) - Computer Science and Business Systems<br>
          - <strong>Institution:</strong> GITAM University, Bengaluru Campus<br>
          - <strong>Timeline:</strong> 2022 – 2026 (Undergraduate)<br>
          - <strong>Academic Performance:</strong> CGPA 8.58 / 10.0`,
        
        experience: `<strong>=== Virtual Simulations & Experience ===</strong><br>
          - <strong>Goldman Sachs Operations Simulation:</strong> Delinquency metrics modeling, credit risk analysis, and operational workflow improvements.<br>
          - <strong>Tata Group Data Analytics Simulation:</strong> Strategic customer metrics extraction, visualization dashboard design, and business data analytics reporting.`,
        
        certifications: `<strong>=== Verified Certifications ===</strong><br>
          - AWS Certified Cloud Practitioner (Amazon Web Services)<br>
          - Generative AI Fundamentals<br>
          - Data Structures & Algorithms (Coursera)<br>
          - Machine Learning Foundations (Internshala)<br>
          - AICTE Virtual Internship Program`,
        
        contact: `<strong>=== Connection Hub ===</strong><br>
          - <strong>Email:</strong> <a href="mailto:chilakalapavaniwork05@gmail.com" class="cmd-highlight">chilakalapavaniwork05@gmail.com</a><br>
          - <strong>Phone:</strong> <a href="tel:+919392748440" class="cmd-highlight">+91 9392748440</a><br>
          - <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/chilakala-pavani-09509b326/" target="_blank" class="cmd-highlight">linkedin.com/in/chilakala-pavani</a><br>
          - <strong>GitHub:</strong> <a href="https://github.com/chilakala-pavani" target="_blank" class="cmd-highlight">github.com/chilakala-pavani</a>`
    };

    function addTerminalRow(sender, text, isSystem = false) {
        if (!terminalBody) return;
        
        const row = document.createElement('div');
        row.className = `terminal-row ${isSystem ? 'system-msg' : sender === 'Guest' ? 'user-msg' : 'agent-msg'}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        if (isSystem) {
            row.innerHTML = `<span class="terminal-time">[${timestamp}]</span> <span class="text-green">[SYSTEM]</span> ${text}`;
        } else if (sender === 'Guest') {
            row.innerHTML = `<span class="terminal-time">[${timestamp}]</span> <span class="terminal-prompt-indicator">guest@terminal:~#</span> <span class="guest-cmd">${text}</span>`;
        } else {
            row.innerHTML = `<span class="terminal-time">[${timestamp}]</span> <span class="terminal-prompt">Pavani-Agent&gt;</span> ${text}`;
        }
        
        terminalBody.appendChild(row);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function processCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase().replace('/', '');
        
        if (cleanCmd === '') return;

        // Log guest query
        addTerminalRow('Guest', cmd);

        if (cleanCmd === 'clear') {
            setTimeout(() => {
                terminalBody.innerHTML = `
                  <div class="terminal-row system-msg">
                      <span class="terminal-time">[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span> 
                      <span class="text-green">[SYSTEM]</span> Console cleared.
                  </div>
                  <div class="terminal-row agent-msg">
                      <span class="terminal-prompt">Pavani-Agent&gt;</span> Console buffer cleared. How else can I help you? Type <span class="cmd-highlight">help</span> for commands.
                  </div>
                `;
            }, 100);
            return;
        }

        // Simulating thinking lag
        const thinkingRow = document.createElement('div');
        thinkingRow.className = 'terminal-row agent-msg';
        thinkingRow.innerHTML = `<span class="terminal-prompt">Pavani-Agent&gt;</span> Processing query [thinking...]`;
        terminalBody.appendChild(thinkingRow);
        terminalBody.scrollTop = terminalBody.scrollHeight;

        setTimeout(() => {
            thinkingRow.remove();
            
            // Core RAG/Intent mapping logic
            let response = '';
            
            if (responseDB[cleanCmd]) {
                response = responseDB[cleanCmd];
            } else {
                // Match keywords
                if (cleanCmd.includes('hi') || cleanCmd.includes('hello') || cleanCmd.includes('hey')) {
                    response = "Hello! I'm Pavani's portfolio agent. Feel free to type <span class='cmd-highlight'>skills</span>, <span class='cmd-highlight'>projects</span>, or <span class='cmd-highlight'>contact</span> to get started!";
                } else if (cleanCmd.includes('skill') || cleanCmd.includes('python') || cleanCmd.includes('sql') || cleanCmd.includes('agent') || cleanCmd.includes('langchain') || cleanCmd.includes('api')) {
                    response = responseDB.skills;
                } else if (cleanCmd.includes('project') || cleanCmd.includes('health') || cleanCmd.includes('intrusion') || cleanCmd.includes('iot')) {
                    response = responseDB.projects;
                } else if (cleanCmd.includes('education') || cleanCmd.includes('college') || cleanCmd.includes('gitam') || cleanCmd.includes('btech') || cleanCmd.includes('cgpa')) {
                    response = responseDB.education;
                } else if (cleanCmd.includes('cert') || cleanCmd.includes('aws') || cleanCmd.includes('fundamentals')) {
                    response = responseDB.certifications;
                } else if (cleanCmd.includes('experience') || cleanCmd.includes('tata') || cleanCmd.includes('goldman') || cleanCmd.includes('forage')) {
                    response = responseDB.experience;
                } else if (cleanCmd.includes('contact') || cleanCmd.includes('email') || cleanCmd.includes('phone') || cleanCmd.includes('number') || cleanCmd.includes('linkedin')) {
                    response = responseDB.contact;
                } else {
                    response = `I couldn't locate precise information for: "${cmd}". Let me query the RAG embeddings...<br>
                      *No exact matches found.* Try typing <span class="cmd-highlight">help</span> to view supported commands.`;
                }
            }
            
            addTerminalRow('Pavani-Agent', response);
        }, 600); // 600ms latency simulation
    }

    if (terminalForm && terminalInput) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = terminalInput.value;
            if (val.trim() !== '') {
                processCommand(val);
                terminalInput.value = '';
            }
        });
    }

    // Direct suggestion button clicks
    suggestButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            processCommand(cmd);
        });
    });

    // 8. Contact Form Mock Submit
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Visual loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pulse-anim"><circle cx="12" cy="12" r="10"></circle></svg>`;
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `✓ Thank you for reaching out! Your message was sent successfully. Pavani will contact you shortly.`;
                
                // Clear fields
                contactForm.reset();
                
                // Clear message after 6 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 6000);
            }, 1200); // 1.2s mock API latency
        });
    }
});
