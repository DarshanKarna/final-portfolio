/* ═══════════════════════════════════════════════════════
   PROJECTS — Modal open/close with data
   ═══════════════════════════════════════════════════════ */

(function () {
  const projectsData = [
    {
      title: 'Student Posture Analysis',
      category: 'Computer Vision / AI',
      image: 'assets/images/project-1.png',
      description:
        'AI-powered web app that detects, tracks, and classifies student postures from classroom CCTV feeds in real time. Uses YOLOv8 + BoT-SORT for multi-object tracking, classifying 8 posture types — Listening, Hand Raising, Sleeping, Standing, Writing, Reading, Looking Screen, and Turning Back. Features async video processing, HTML5 Canvas detection overlay, filterable data tables, and session analytics dashboards with Recharts visualizations.',
      tags: ['YOLOv8', 'React 18', 'TypeScript', 'FastAPI', 'BoT-SORT', 'OpenCV', 'Recharts', 'Tailwind CSS'],
      github: 'https://github.com/DarshanKarna/student_postrue_analysis',
    },
    {
      title: 'Nepal Cricket Predictor',
      category: 'ML / Sports Analytics',
      image: 'assets/images/project-2.png',
      description:
        'Real-time predictive analytics dashboard forecasting outcomes for Nepal\'s international cricket matches. A Random Forest classifier trained on historical T20I/ODI data delivers instant win probabilities. Features interactive parameter input for match scenarios, data visualization of team and player performance trends, and a fully responsive UI powered by Framer Motion animations.',
      tags: ['Scikit-learn', 'React', 'TypeScript', 'FastAPI', 'Random Forest', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/DarshanKarna/nepal-cricket-predictor',
    },
    {
      title: 'RAG-Lang',
      category: 'AI / DSL Design',
      image: 'assets/images/project-3.png',
      description:
        'A declarative Domain-Specific Language (DSL) that replaces verbose Python with English-like scripts for orchestrating Retrieval-Augmented Generation workflows. Uses the Lark parser to compile human-readable DSL syntax into an Abstract Syntax Tree (AST), which is then interpreted to execute pipeline stages: document loading via PyMuPDF, intelligent text chunking via LangChain, agent configuration, and multi-step query execution.',
      tags: ['Python', 'Lark Parser', 'PyMuPDF', 'LangChain', 'OpenAI API', 'DSL Design'],
      github: 'https://github.com/DarshanKarna/RAG-Lang',
    },
    {
      title: 'Agentic RAG with Self-Correction',
      category: 'AI / NLP',
      image: 'assets/images/project-4.png',
      description:
        'A robust agentic RAG pipeline (B.Tech AI 4th-Semester Project) featuring LangGraph state-machine orchestration, NLI-based hallucination detection using a local DeBERTa Cross-Encoder, self-correction loops for automatic query reformulation and answer regeneration, source-level citation tracking with highlighting, and a unified RAGAS evaluation suite comparing Naive vs Self-Correcting RAG approaches across faithfulness and relevancy metrics.',
      tags: ['LangGraph', 'ChromaDB', 'Groq', 'Llama 3', 'DeBERTa NLI', 'RAGAS', 'React'],
      github: 'https://github.com/DarshanKarna/AGENTIC-RAG-WITH-SELF-CORRECTION-AND-CITATION-HIGHLIGHTING',
    },
    {
      title: 'ASCII Yourself',
      category: 'Creative / Generative AI',
      image: 'assets/images/project-5.png',
      description:
        'A retro-futuristic cyberpunk HUD that transforms live webcam feeds into stylized ASCII art at 60 FPS. Features Sobel gradient-based edge detection with directional structural characters, AI-powered tactical assessments via Google Gemini 2.5 Flash with text-to-speech voicing through the SpeechSynthesis API, procedural sci-fi audio synthesis via Web Audio API oscillators, and immersive CRT aesthetic effects including scanlines, screen curvature, and glassmorphism panels.',
      tags: ['React', 'TypeScript', 'Vite', 'Gemini 2.5 Flash', 'Web Audio API', 'Sobel Filters', 'Canvas'],
      github: 'https://github.com/DarshanKarna/Ascii_Darshan_yourself',
    },
  ];

  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalLinks = document.getElementById('modal-links');

  const projectCards = document.querySelectorAll('.project-card');

  // Open modal
  const openModal = (index) => {
    const project = projectsData[index];
    if (!project) return;

    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDesc.textContent = project.description;

    // Tags
    modalTags.innerHTML = project.tags
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join('');

    // Links
    modalLinks.innerHTML = `
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        View on GitHub <span class="arrow">↗</span>
      </a>
      <button class="btn btn-outline" onclick="document.getElementById('project-modal').classList.remove('open'); document.body.style.overflow = '';">
        Close
      </button>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Trap focus
    modalClose.focus();
  };

  // Close modal
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Event listeners
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-project'), 10);
      openModal(index);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = parseInt(card.getAttribute('data-project'), 10);
        openModal(index);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
})();
