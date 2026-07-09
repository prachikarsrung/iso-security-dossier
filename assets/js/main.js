document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const toggleBtn = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if(toggleBtn) toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));

    // Set Active Nav Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // Render ISO 27001
    if(document.getElementById('clauses-container')) render27001Clauses();
    if(document.getElementById('annex-container')) render27001Annex();

    // Render ISO 42001
    if(document.getElementById('ai-table-body')) render42001();

    // Render ISO 27002 Case Studies
    if(document.getElementById('case-study-container')) setupCaseStudies();
});

function render27001Clauses() {
    const container = document.getElementById('clauses-container');
    container.innerHTML = iso27001Clauses.map(item => createAccordion(item)).join('');
    attachAccordionListeners();
}

function render27001Annex() {
    const container = document.getElementById('annex-container');
    const categories = [
        { key: 'org', title: 'Organizational Controls (5)', icon: '🏢' },
        { key: 'people', title: 'People Controls (6)', icon: '👥' },
        { key: 'physical', title: 'Physical Controls (7)', icon: '🔒' },
        { key: 'tech', title: 'Technological Controls (8)', icon: '💻' }
    ];
    
    let html = '';
    categories.forEach(cat => {
        html += `<h3 style="margin: 2rem 0 1rem; color: var(--accent-cyan);">${cat.icon} ${cat.title}</h3>`;
        html += iso27001AnnexA[cat.key].map(item => createAccordion(item)).join('');
    });
    container.innerHTML = html;
    attachAccordionListeners();
}

function render42001() {
    const tbody = document.getElementById('ai-table-body');
    tbody.innerHTML = iso42001Controls.map(item => `
        <tr>
            <td><strong style="color: var(--accent-emerald);">${item.id}</strong></td>
            <td>${item.name}</td>
            <td>${item.q}</td>
            <td>${item.evid}</td>
            <td><span class="badge badge-pending">Pending</span></td>
        </tr>
    `).join('');
}

function setupCaseStudies() {
    const btns = document.querySelectorAll('.case-btn');
    const contentBox = document.getElementById('case-study-content');
    const titleBox = document.getElementById('case-study-title');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const study = caseStudies[id];
            titleBox.innerText = study.title;
            contentBox.innerHTML = study.content;
            
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Load first one by default
    if(btns.length > 0) btns[0].click();
}

function createAccordion(item) {
    return `
        <div class="accordion-item">
            <div class="accordion-header">
                <span><strong style="color: var(--accent-cyan); margin-right: 10px;">${item.id}</strong> ${item.title}</span>
                <span class="chevron">▼</span>
            </div>
            <div class="accordion-content">
                <div class="accordion-body">
                    <div class="info-block"><h4>Requirement</h4><p>${item.req}</p></div>
                    <div class="info-block"><h4>Process</h4><p>${item.proc}</p></div>
                    <div class="info-block"><h4>Evidence</h4><p>${item.evid}</p></div>
                </div>
            </div>
        </div>
    `;
}

function attachAccordionListeners() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const chevron = header.querySelector('.chevron');
            content.classList.toggle('open');
            chevron.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
}
