/**
 * Project Data — single source of truth
 * --------------------------------------
 * The cards in the Projects section AND the detail panel are both rendered
 * from this array, so there is only one place to edit.
 *
 * Every number here is traceable to the repo README or the resume.
 * Don't add a metric you can't point at.
 */

const GH = 'https://github.com/1234620';

export const PROJECTS = [
  {
    id: 'suspicious-object',
    name: 'Real-Time Suspicious Object Detection',
    period: '2025',
    tags: ['Python', 'YOLOv11', 'Computer Vision', 'Security'],
    stack: ['Python', 'YOLOv11s', 'Ultralytics', 'OpenCV', 'NumPy'],
    blurb:
      'Custom-trained YOLOv11s detector for surveillance footage. Runs on live camera feeds, video files, and image batches with real-time bounding-box overlay.',
    problem:
      'Manual CCTV monitoring does not scale — an operator watching a wall of feeds misses the one frame that matters. I wanted a detector that flags suspicious objects the moment they enter frame, on hardware as small as a Raspberry Pi.',
    build: [
      'Trained a YOLOv11s model for 60 epochs on a custom dataset of 30,000+ annotated images (batch size 16, 640×640 input).',
      'Wrote an inference CLI that accepts a single image, a folder, a video file, a USB webcam, or a Picamera as the source.',
      'Added interactive controls during inference — pause, capture the current frame, quit — plus optional recording of the annotated output.',
    ],
    how: [
      'Ultralytics handles the training loop; the checkpoint with the best validation mAP is kept as `best.pt`.',
      'The detection script reads frames with OpenCV, runs batched inference, and draws boxes + labels while tracking a rolling FPS average.',
      'Confidence threshold and resolution are command-line flags, so the same model can be tuned for precision on a desktop or speed on a Pi.',
    ],
    results: [
      'mAP@50: 99.5%',
      'mAP@50-95: 91.8%',
      'Precision: 98.4% · Recall: 98.5%',
      'Real-time throughput with live FPS readout on commodity hardware',
    ],
    links: { repo: `${GH}/Real-Time-Suspicious-Object-Recognition-` },
  },

  {
    id: 'deepfake',
    name: 'Deepfake Detection Framework',
    period: '2025',
    tags: ['Python', 'PyTorch', 'CNN-BiLSTM', 'Flask'],
    stack: ['Python', 'PyTorch', 'CNN', 'BiLSTM', 'OpenCV', 'Flask'],
    blurb:
      'Hybrid CNN–BiLSTM model that scores images and video for manipulation, wrapped in a full-stack web app with a REST API.',
    problem:
      'A single frame rarely gives a deepfake away. The tells are temporal — inconsistent blinking, flicker at the face boundary, warping between frames. A plain image classifier throws all of that away.',
    build: [
      'Built a hybrid architecture: a CNN extracts per-frame facial features, a BiLSTM reads the sequence of those features to catch temporal inconsistency.',
      'Trained in PyTorch on a 60,000-sample dataset of real and manipulated media.',
      'Shipped it as a Flask web app — drag-and-drop upload, a REST endpoint for programmatic use, and a CLI for batch runs.',
    ],
    how: [
      'Video is decoded frame-by-frame with OpenCV, faces are cropped and normalised to 128×128, then pushed through the CNN backbone.',
      'The BiLSTM consumes the frame-feature sequence in both directions and emits a single real/fake probability for the clip.',
      'The API returns the overall confidence score plus frame-level scores, so you can see *where* in the video the model got suspicious.',
      'Backbone is swappable — ResNet50, EfficientNet, or the custom CNN — without touching the temporal head.',
    ],
    results: [
      '93%+ accuracy on the 60,000-sample evaluation set',
      'Real-time confidence scoring through the Flask REST API',
      'Frame-level breakdown for videos, not just a single verdict',
    ],
    links: { repo: `${GH}/DeepFake-Detection` },
  },

  {
    id: 'travel-chatbot',
    name: 'RAG Multi-Agent Travel Chatbot',
    period: '2025',
    tags: ['Python', 'LangChain', 'RAG', 'Multi-Agent'],
    stack: ['Python', 'TypeScript', 'LangChain', 'AWS Bedrock', 'FastAPI', 'Next.js', 'FAISS'],
    blurb:
      'Three specialised agents — flights, hotels, itinerary — coordinated behind one chat interface, grounded in live availability data.',
    problem:
      'Ask an LLM to plan a trip and it will confidently invent flight numbers and hotels that do not exist. Planning a real trip needs live inventory, not plausible-sounding text.',
    build: [
      'Designed a 3-agent architecture: a Flight agent, a Hotel agent, and a RAG agent for itinerary generation.',
      'Wired the Flight agent to the live Amadeus API and the Hotel agent to Booking.com via RapidAPI, so every quoted option is real and currently available.',
      'Built the backend on FastAPI and the chat UI in Next.js + TypeScript with Tailwind.',
    ],
    how: [
      'An NLP layer does intent recognition and entity extraction (dates, cities, budget) and routes the turn to the right agent.',
      'The RAG agent retrieves destination context from a FAISS vector store and generates the itinerary with Amazon Bedrock Titan, so recommendations are grounded in retrieved documents rather than model memory.',
      'Conversation context is carried across turns, so follow-ups like "make it cheaper" resolve against the previous result.',
      'Each agent has a fallback path — if an upstream API fails, the chat degrades gracefully instead of dying.',
    ],
    results: [
      'End-to-end flow: natural-language request → live flight + hotel options → generated day-by-day itinerary',
      'Real availability data from two production travel APIs, not synthetic fixtures',
      'Multi-turn context retained across agent handoffs',
    ],
    links: { repo: `${GH}/Travel-Based-Chatbot` },
  },

  {
    id: 'railway',
    name: 'AI Railway Traffic Optimization',
    period: '2025',
    tags: ['Python', 'scikit-learn', 'FastAPI', 'WebSockets'],
    stack: ['Python', 'scikit-learn', 'FastAPI', 'Next.js', 'TypeScript', 'Docker'],
    blurb:
      'Predictive-maintenance models plus six optimisation algorithms, driving a live train-monitoring dashboard.',
    problem:
      'On a dense rail network a single unplanned equipment failure cascades into hours of knock-on delay. The expensive part is not the repair — it is not seeing it coming.',
    build: [
      'Trained a RandomForestClassifier for equipment-failure prediction and a GradientBoostingRegressor for continuous risk scoring on a 4,000-point dataset.',
      'Implemented six optimisation routines: headway optimisation, junction conflict resolution, speed optimisation, route optimisation, slot trading, and predictive maintenance scheduling.',
      'Built a Next.js dashboard showing live train position, speed, fuel, and delay, fed over WebSockets.',
      'Containerised the whole stack with Docker.',
    ],
    how: [
      'FastAPI serves both the REST API and the WebSocket channel; the frontend subscribes once and receives pushed state updates.',
      'Optimisation runs against current network state and returns concrete actions (hold this train, reroute that one) rather than an abstract score.',
      'When a model is unavailable the system falls back to a rule-based heuristic, so the dashboard never goes blind.',
    ],
    results: [
      '99% accuracy on the failure-prediction model',
      'Sub-100ms latency on live WebSocket dashboard updates',
      'Reproducible Docker deployment for the full stack',
    ],
    links: { repo: `${GH}/train-traffic-optimizer` },
  },

  {
    id: 'skillmatch',
    name: 'SkillMatch — Hybrid Job Recommender',
    period: '2026',
    tags: ['Python', 'FastAPI', 'pgvector', 'Recommender Systems'],
    stack: ['Python', 'FastAPI', 'PostgreSQL 17', 'pgvector', 'React', 'TypeScript', 'Tailwind'],
    blurb:
      'A recommendation engine that answers which jobs belong at the top of a candidate feed — and, crucially, why.',
    problem:
      'Keyword job search is bad at the two cases that matter most: a brand-new user with no click history (cold start), and a candidate whose skills match a role that never uses their exact words.',
    build: [
      'Built a hybrid ranker that combines resume analysis, explicit skill matching, semantic embeddings, implicit collaborative filtering, and contextual signals.',
      'Structured the backend as a modular monolith on FastAPI over PostgreSQL 17 with the pgvector extension.',
      'Added an explanation layer so every recommendation ships with the reason it surfaced.',
      'Frontend in React + TypeScript (Vite) talking to a versioned `/api/v1` surface.',
    ],
    how: [
      'Embeddings live in Postgres via pgvector, so semantic similarity is a SQL query rather than a separate vector service to operate.',
      'Models are trained offline under `ml/` and served from persisted artifacts — training never happens inside a request handler.',
      'Cold-start users fall back to content-based signals from their resume until enough implicit feedback accumulates for collaborative filtering to help.',
      'Recommendation quality is measured with standard ranking metrics rather than eyeballed.',
    ],
    results: [
      'Explainable output — every ranked job carries its reason',
      'Cold-start users get useful results on their first session',
      'Single-datastore design: embeddings and relational data in one Postgres instance',
    ],
    links: { repo: `${GH}/SkillMatch-Hybrid-Job-Internship-Recommendation-System` },
  },

  {
    id: 'costiq',
    name: 'CostIQ',
    period: '2026',
    tags: ['Python', 'LangGraph', 'Multi-Agent', 'FastAPI'],
    stack: ['Python', 'LangGraph', 'FastAPI', 'Next.js 14', 'TypeScript', 'PostgreSQL', 'Redis', 'ChromaDB'],
    blurb:
      'Four autonomous agents that hunt for cost leakage in enterprise spend and back every number with an explicit formula.',
    problem:
      'Cost-saving dashboards are easy to build and easy to ignore. A CFO will not act on "we think you are overspending" — they need the baseline, the formula, and the audit trail behind every figure.',
    build: [
      'Built four specialised agents: Spend Intelligence (duplicate invoices, rate creep, vendor overcharges), SLA Prevention (predicting breaches before they land), Resource Optimization (cloud rightsizing, SaaS licence waste), and Financial Operations (variance analysis and reconciliation).',
      'Designed the Financial Impact Statement — the output format every agent must emit.',
      'Full backend stack: FastAPI gateway, PostgreSQL, Redis, ChromaDB for retrieval, Next.js 14 frontend over REST + WebSocket.',
    ],
    how: [
      'Agents are orchestrated with LangGraph, so each one is a node in an explicit graph rather than a chain of prompt calls.',
      'Every finding must produce a Financial Impact Statement: documented baseline cost, projected savings *with the formula*, a 0–1 confidence score, a complete audit trail, and the ROI of the intervention itself.',
      'The hard rule: no savings number without a formula behind it. That constraint is what makes the output survive scrutiny.',
    ],
    results: [
      'Agents do not just report — they propose the corrective action and price it',
      'Every figure is reconstructible from its audit trail',
      'Deployed demo at costiq-nine.vercel.app',
    ],
    links: { repo: `${GH}/costiq`, live: 'https://costiq-nine.vercel.app' },
  },

  {
    id: 'carrierai',
    name: 'CarrierAI — Procurement Co-Pilot',
    period: '2026',
    tags: ['Python', 'Operations Research', 'MILP', 'React'],
    stack: ['Python', 'FastAPI', 'scikit-learn', 'SciPy', 'React 19', 'Leaflet', 'Gemini'],
    blurb:
      'Multi-modal logistics routing across road, rail, ocean, and air — solved with a four-brain mix of ML, operations research, and LLM reasoning.',
    problem:
      'Picking a freight carrier is a genuine operations-research problem: cost, transit time, reliability, and emissions all pull in different directions, and the right answer changes when the buyer\'s priorities change. Static rules engines cannot express that trade-off.',
    build: [
      'Built a four-brain engine — Mode Selector (Random Forest + SHAP), Carrier Analyst (AHP-TOPSIS ranking), Risk Predictor (Gradient Boosting), Strategist Optimizer (multi-objective MILP).',
      'Added geographic validation: haversine distance from lat/long, plus feasibility checks on whether ocean or rail is physically possible for a given origin/destination pair.',
      'Built an interactive route map with Leaflet, drawing direct domestic paths and great-circle arcs for international legs.',
      'Hand-drawn sketch UI in React 19 + Vite, written in vanilla CSS with no component framework.',
    ],
    how: [
      'FastAPI orchestrates the four brains, then aggregates their outputs into a single shipping plan.',
      'The MILP balances cost, speed, reliability, and emissions against user-selected priority weights — move the weights, get a genuinely different plan.',
      'SHAP values explain why a transport mode was suggested, so the recommendation is inspectable rather than a black box.',
      'A Gemini pass turns the aggregated numeric result into a plain-language explanation of the reasoning.',
    ],
    results: [
      'Evaluates dozens of carriers across four transport modes in one request',
      'Recommendations shift coherently as priorities are re-weighted',
      'Every choice comes with a natural-language rationale',
    ],
    links: { repo: `${GH}/Carrier-Selection-Agent-in-Procurement.` },
  },

  {
    id: 'sales-dashboard',
    name: 'Sales Performance & Forecasting Dashboard',
    period: 'May — Jul 2026',
    tags: ['Python', 'FastAPI', 'Prophet', 'Next.js'],
    stack: ['Python', 'FastAPI', 'Prophet', 'Next.js', 'TypeScript', 'Recharts', 'Tailwind', 'pytest'],
    blurb:
      'Internship project for Parasnath Distribution Group — replaced manual Excel sales reporting with a live forecasting dashboard.',
    problem:
      'Sales reporting ran on hand-assembled Excel workbooks: slow to produce, stale by the time anyone read them, and impossible to ask follow-up questions of.',
    build: [
      'Built an end-to-end dashboard with a FastAPI backend and a Next.js (TypeScript) frontend.',
      'Added regional revenue analysis, revenue trends with moving averages, ML revenue forecasting, and a daily anomaly timeline.',
      'Covered the backend with pytest.',
    ],
    how: [
      'Prophet produces the revenue forecast; moving averages smooth the trend view for period-over-period comparison.',
      'Anomaly detection flags unusual daily revenue so outliers surface on their own instead of being spotted by hand.',
      'Charts are rendered with Recharts against a typed API client, so the data contract is enforced at compile time.',
    ],
    results: [
      'Replaced the manual Excel reporting cycle with a self-serve dashboard',
      'Forecasting and anomaly detection where there was previously only historical reporting',
      'Delivered inside the MPSTME NMIMS × Parasnath Technical Internship Program 2026',
    ],
    links: { repo: `${GH}/sales-dashboard` },
  },

  {
    id: 'resume-builder',
    name: 'AI Resume Builder & ATS Agent',
    period: '2026',
    tags: ['JavaScript', 'React', 'Node.js', 'NLP'],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'OpenAI', 'LaTeX', 'pdf-parse'],
    blurb:
      'Upload a resume or start from scratch, get an ATS score with actionable fixes, and export a LaTeX-typeset PDF.',
    problem:
      'Most resumes are rejected by an applicant tracking system before a human sees them, and the candidate never finds out which parts failed to parse.',
    build: [
      'Built upload-and-parse for PDF and DOCX (pdf-parse, mammoth) plus a manual entry path.',
      'Implemented ATS scoring that returns a number *and* the specific suggestions behind it.',
      'Added AI content enhancement for phrasing and structure, and LaTeX templates for PDF/Word export.',
      'Added score tracking so you can compare a draft against the previous version.',
    ],
    how: [
      'An Express backend exposes discrete endpoints per stage — upload, parse, score, enhance, generate — so each step is independently testable.',
      'Structured fields are extracted from the uploaded document first; scoring runs against that structure rather than raw text.',
      'Generation renders the structured data through a LaTeX template, which is why the output typesets cleanly instead of fighting a word processor.',
    ],
    results: [
      'Score → fix → re-score loop, so improvement is measurable',
      'Professional LaTeX output exportable as PDF or Word',
      'Works from an existing resume or from nothing',
    ],
    links: { repo: `${GH}/AI-Powered-Resume-Builder-ATS-Optimization-Agent` },
  },
];
