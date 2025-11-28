---
layout: default
title: "Home"
description: "Portfolio — Mahdi Miri"
# --- data arrays below are editable ---
skills:
  - "Python"
  - "Machine Learning"
  - "Deep Learning"
  - "NLP & LLMs"
  - "Data Analysis"
  - "TensorFlow / Keras"
  - "PyTorch"
  - "XGBoost / Sklearn"
  - "SQL / MongoDB"
  - "Streamlit"
projects:
  - title: "Meteorological Forecasting System — Australian Rainfall Prediction"
    short: "From XGBoost to Deep Learning — ANN with embeddings achieved best F1 after threshold tuning."
    tech: "Python, XGBoost, TensorFlow/Keras, TabNet, Optuna, SMOTEENN"
    link: "https://github.com/Mahdi-Miri/Rain_Prediction-"
  - title: "Predictive Modeling for Neurodegenerative Disease Progression (ALS)"
    short: "Ordinal Logistic Regression to predict King's clinical stages of ALS; handled imbalance with SMOTE."
    tech: "Python, Statsmodels, Scikit-learn, SMOTE"
    link: "#"
  - title: "Student Performance Analytics Dashboard"
    short: "Interactive Streamlit app for student segmentation & grade prediction with clustering and predictive models."
    tech: "Streamlit, Scikit-learn, Plotly, PCA, K-Means"
    link: "#"
  - title: "Advanced Vehicle Price Valuation System"
    short: "Ensemble stacking regressor combining XGBoost, Random Forest and Linear Regression (R² ≈ 0.96)."
    tech: "Python, Scikit-learn, XGBoost, Stacking"
    link: "#"
education:
  - school: "MSc Data Science — University of Naples Federico II"
    period: "09/2023 – 12/2025"
  - school: "BSc Software Engineering — Islamic Azad University of Isfahan"
    period: "07/2019 – 08/2022"
experience:
  - title: "Internship in research on LLM — University of Naples Federico II"
    period: "02/2025 – 09/2025"
    summary: "Engineered jailbreak strategies, adversarial prompting experiments, authored technical documentation on mitigation."
  - title: "Back-End Developer — Goalearn"
    period: "02/2021 – 03/2022"
    summary: "Database architecture, API integrations, Laravel/PHP backend work."
contact:
  email: "mahdimiri7@gmail.com"
  phone: "3517867567"
  location: "Naples, Italy"
---

<section id="hero" class="section hero">
  <div class="hero-inner">
    <h2>Hi — I'm <span class="accent">Mahdi</span></h2>
    <p class="lead">I am a passionate engineer focused on building intelligent systems that solve real-world problems. I enjoy bridging the gap between complex data and actionable software solutions.</p>

    <p class="work">
      Currently exploring <strong>Large Language Models (LLMs)</strong> and <strong>Generative AI</strong>.
      Building ML pipelines, fine-tuning models, RAG systems and scalable AI integrations.
    </p>

    <div class="quick-links">
      <a class="btn" href="#projects">See projects</a>
      <a class="btn ghost" href="#contact">Contact</a>
    </div>
  </div>
</section>

<section id="about" class="section">
  <h3 class="section-title">About</h3>
  <p>
    I am an ML / AI engineer working at the intersection of research and production. My focus areas include scalable machine learning engineering, LLM evaluation and mitigation, and building end-to-end applications using modern ML frameworks.
  </p>
</section>

<section id="skills" class="section">
  <h3 class="section-title">Skills</h3>
  <ul class="skills-grid">
    {% for s in page.skills %}
      <li>{{ s }}</li>
    {% endfor %}
  </ul>
</section>

<section id="projects" class="section">
  <h3 class="section-title">Projects</h3>
  <div class="projects-grid">
    {% for p in page.projects %}
      <article class="project-card">
        <h4>{{ p.title }}</h4>
        <p class="muted">{{ p.short }}</p>
        <p class="tech">{{ p.tech }}</p>
        {% if p.link and p.link != "#" %}
          <a class="project-link" href="{{ p.link }}" target="_blank" rel="noopener">View on GitHub</a>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>

<section id="experience" class="section">
  <h3 class="section-title">Experience</h3>
  <div class="timeline">
    {% for e in page.experience %}
      <div class="timeline-item">
        <h4>{{ e.title }}</h4>
        <span class="period">{{ e.period }}</span>
        <p class="muted">{{ e.summary }}</p>
      </div>
    {% endfor %}
  </div>
</section>

<section id="education" class="section">
  <h3 class="section-title">Education</h3>
  <ul class="edu-list">
    {% for ed in page.education %}
      <li>
        <strong>{{ ed.school }}</strong>
        <span class="period">{{ ed.period }}</span>
      </li>
    {% endfor %}
  </ul>
</section>

<section id="contact" class="section">
  <h3 class="section-title">Contact</h3>
  <p class="muted">Naples, Italy · <a href="tel:3517867567">3517867567</a> · <a href="mailto:{{ page.contact.email }}">{{ page.contact.email }}</a></p>
  <p>
    <a class="link" href="https://github.com/Mahdi-Miri" target="_blank" rel="noopener">GitHub</a> ·
    <a class="link" href="https://www.linkedin.com/in/mahdi-miri-dev/" target="_blank" rel="noopener">LinkedIn</a>
  </p>
</section>
