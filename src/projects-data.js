/**
 * Project Data — single source of truth
 * --------------------------------------
 * The cards in the Projects section AND the detail panel both render from this
 * array, so there is only one place to edit.
 *
 * Every number here is traceable to the resume or to the repo's own README.
 * Don't add a metric you can't point at.
 *
 * Shape:
 *   metrics  — big numbers shown in the panel's stat strip
 *   images   — real screenshots (repo assets or captures of the live demo)
 *   diagram  — column-by-column flow, used when there's no screenshot to show
 */

const GH = 'https://github.com/1234620';
const IMG = `${import.meta.env.BASE_URL}projects/`;

export const PROJECTS = [
  {
    id: 'sales-dashboard',
    name: 'Sales Performance & Forecasting Dashboard',
    org: 'EComSpace Global Impex LLP',
    period: '2026',
    tags: ['Python', 'FastAPI', 'Prophet', 'Next.js'],
    stack: ['Python', 'FastAPI', 'Prophet', 'Next.js', 'TypeScript', 'Recharts', 'Tailwind', 'pytest'],
    blurb:
      'Internship build for EComSpace Global Impex LLP — replaced manual sales reporting with a live dashboard covering 16 KPIs, forecasting, and anomaly detection.',
    metrics: [
      { value: '6.7%', label: 'MAPE achieved', note: 'against a 12% target' },
      { value: '16', label: 'KPIs tracked' },
      { value: '8 wks', label: '18 May — 11 Jul 2026' },
    ],
    problem:
      'Sales reporting ran on hand-assembled Excel workbooks. Slow to produce, stale by the time anyone read them, and impossible to ask a follow-up question of — if you wanted revenue split by region and product line, someone rebuilt the sheet.',
    build: [
      'Built an end-to-end analytics dashboard on a FastAPI backend with a Next.js (TypeScript) frontend, centralising revenue, product, regional, customer, and profitability performance across 16 KPIs.',
      'Developed a revenue forecasting workflow on Prophet and tuned it against the business target.',
      'Added rolling z-score anomaly detection over daily revenue, plus moving-average trend views for period-over-period comparison.',
      'Covered the backend with pytest.',
    ],
    how: [
      'Prophet fits the revenue series and projects it forward; the forecast is scored on MAPE so accuracy is a number the business can hold you to, not a vibe.',
      'Anomalies are flagged with a rolling z-score, so an unusual day surfaces on its own instead of waiting for someone to notice it in a spreadsheet.',
      'Charts render through Recharts against a typed API client, so the data contract between backend and frontend is enforced at compile time.',
    ],
    results: [
      '6.7% MAPE against a 12% forecasting target',
      '16 KPIs centralised in one self-serve view, replacing the manual Excel cycle',
      'Anomaly detection and forecasting where there was previously only historical reporting',
    ],
    images: [
      { src: `${IMG}sales-01-landing.jpg`, caption: 'Landing view — headline KPIs and the entry point into the dashboard' },
      { src: `${IMG}sales-02-trend.jpg`, caption: 'Revenue trend with moving averages' },
      { src: `${IMG}sales-03-forecast.jpg`, caption: 'Prophet revenue forecast — 6.7% MAPE against a 12% target' },
      { src: `${IMG}sales-04-anomaly.jpg`, caption: 'Daily revenue anomaly timeline (rolling z-score)' },
      { src: `${IMG}sales-05-regional.jpg`, caption: 'Regional revenue distribution' },
    ],
    links: { repo: `${GH}/sales-dashboard` },
  },

  {
    id: 'costiq',
    name: 'CostIQ',
    period: '2026',
    tags: ['Python', 'LangGraph', 'Multi-Agent', 'FastAPI'],
    stack: ['Python', 'LangGraph', 'FastAPI', 'Next.js 14', 'TypeScript', 'PostgreSQL', 'Redis', 'ChromaDB'],
    blurb:
      'Four autonomous agents that hunt for cost leakage in enterprise spend — and back every number with an explicit formula.',
    metrics: [
      { value: '4', label: 'LangGraph agents' },
      { value: '4', label: 'spend domains', note: 'procurement · SLAs · cloud + SaaS · finance ops' },
    ],
    problem:
      'Cost-saving dashboards are easy to build and easy to ignore. A CFO will not act on "we think you are overspending" — they need the baseline, the formula, and the audit trail behind every figure before they will sign anything.',
    build: [
      'Built four specialised agents: Spend Intelligence (duplicate invoices, rate creep, vendor overcharges), SLA Prevention (predicting breaches before they land), Resource Optimization (cloud rightsizing, SaaS licence waste), and Financial Operations (variance analysis and reconciliation).',
      'Designed the Financial Impact Statement — the output contract every agent has to satisfy.',
      'Full backend: FastAPI gateway, PostgreSQL, Redis, ChromaDB for retrieval, with a Next.js 14 frontend over REST + WebSocket.',
    ],
    how: [
      'Agents are orchestrated with LangGraph, so each one is a node in an explicit graph rather than a chain of prompt calls that nobody can reason about.',
      'Every finding must produce a Financial Impact Statement: documented baseline cost, projected savings with the formula, a 0–1 confidence score, a full audit trail, and the ROI of the intervention itself.',
      'The hard rule — no savings number without a formula behind it — is what makes the output survive scrutiny instead of being another dashboard.',
    ],
    results: [
      'Agents do not just report a problem, they propose the corrective action and price it',
      'Every figure is reconstructible from its own audit trail',
      'Deployed and live at costiq-nine.vercel.app',
    ],
    images: [
      { src: `${IMG}costiq-01-hero.jpg`, caption: 'The deployed platform at costiq-nine.vercel.app' },
    ],
    diagram: {
      caption: 'Four agents, one output contract',
      stages: [
        { label: 'Sources', items: ['Procurement', 'SLAs', 'Cloud + SaaS', 'Finance ops'] },
        { label: 'Agents (LangGraph)', items: ['Spend Intelligence', 'SLA Prevention', 'Resource Optimization', 'Financial Operations'] },
        { label: 'Contract', items: ['Financial Impact Statement', 'baseline · formula · confidence · audit trail'] },
        { label: 'Output', items: ['Priced corrective action'] },
      ],
    },
    links: { repo: `${GH}/costiq`, live: 'https://costiq-nine.vercel.app' },
  },

  {
    id: 'carrierai',
    name: 'CarrierAI — Multi-Modal Procurement Agent',
    period: '2026',
    tags: ['Python', 'Operations Research', 'MILP', 'React'],
    stack: ['Python', 'FastAPI', 'scikit-learn', 'SciPy', 'React 19', 'Leaflet', 'Gemini / Vertex AI'],
    blurb:
      'Freight routing across road, rail, ocean, and air — solved by four "brains" combining ML, operations research, and LLM reasoning.',
    metrics: [
      { value: '4', label: 'transport modes', note: 'road · rail · ocean · air' },
      { value: '4', label: 'specialised brains' },
      { value: '4', label: 'objectives balanced', note: 'cost · risk · performance · emissions' },
    ],
    problem:
      "Picking a freight carrier is a genuine operations-research problem. Cost, transit time, reliability, and emissions pull in different directions, and the right answer changes the moment the buyer's priorities change. A static rules engine cannot express that trade-off — it can only encode one fixed opinion.",
    build: [
      'Built a four-brain engine — Mode Selector (Random Forest + SHAP), Carrier Analyst (AHP-TOPSIS ranking), Risk Predictor (Gradient Boosting), and Strategist Optimizer (multi-objective MILP).',
      'Added geographic validation: haversine distance from lat/long coordinates, plus feasibility checks on whether ocean or rail is physically possible for a given origin/destination pair.',
      'Built an interactive route map in Leaflet, drawing direct domestic paths and great-circle arcs for international legs.',
      'Hand-drawn sketch UI in React 19 + Vite, written in vanilla CSS with no component framework.',
    ],
    how: [
      'FastAPI orchestrates the four brains, then aggregates their outputs into a single shipping plan.',
      'The MILP balances cost, speed, reliability, and emissions against user-selected priority weights — move the weights and you get a genuinely different plan, not a re-sorted list.',
      'SHAP values explain why a transport mode was suggested, so the recommendation is inspectable rather than a black box.',
      'A Gemini / Vertex AI pass turns the aggregated numeric result into a plain-language explanation of the reasoning.',
    ],
    results: [
      'Evaluates dozens of carriers across four transport modes in a single request',
      'Recommendations shift coherently as priorities are re-weighted',
      'Every choice ships with a natural-language rationale',
    ],
    diagram: {
      caption: 'One request, four brains, one plan',
      stages: [
        { label: 'Request', items: ['Origin → destination', 'Priority weights'] },
        { label: 'Brains', items: ['Mode Selector · RF + SHAP', 'Carrier Analyst · AHP-TOPSIS', 'Risk Predictor · Gradient Boosting', 'Strategist · multi-objective MILP'] },
        { label: 'Aggregate', items: ['Plan synthesis', 'Gemini explanation'] },
        { label: 'Output', items: ['Ranked plan + route map'] },
      ],
    },
    links: { repo: `${GH}/Carrier-Selection-Agent-in-Procurement.`, live: 'https://carrier-selection-agent-in-procurem.vercel.app' },
  },

  {
    id: 'verifai',
    name: 'VerifAI — Deepfake Detection System',
    period: '2025 — 2026',
    tags: ['Python', 'PyTorch', 'CNN-BiLSTM', 'Flask'],
    stack: ['Python', 'PyTorch', 'CNN', 'BiLSTM', 'OpenCV', 'Flask'],
    blurb:
      'A CNN-BiLSTM system that reads temporal inconsistency across frames to score media for manipulation, wrapped in a deployed web app.',
    metrics: [
      { value: '93%+', label: 'accuracy' },
      { value: '60k+', label: 'sample dataset' },
      { value: 'per-frame', label: 'confidence scoring' },
    ],
    problem:
      'A single frame rarely gives a deepfake away. The tells are temporal — inconsistent blinking, flicker at the face boundary, warping between frames. A plain image classifier throws all of that information away before it ever gets to make a decision.',
    build: [
      'Built a hybrid architecture: a CNN extracts per-frame facial features, and a BiLSTM reads the sequence of those features to catch temporal inconsistency.',
      'Trained in PyTorch on a 60,000+ sample dataset of real and manipulated media.',
      'Integrated model inference with a web interface and a deployment pipeline — drag-and-drop upload, a REST endpoint for programmatic use, and a CLI for batch runs.',
    ],
    how: [
      'Video is decoded frame-by-frame with OpenCV; faces are cropped and normalised to 128×128, then pushed through the CNN backbone.',
      'The BiLSTM consumes that frame-feature sequence in both directions and emits a single real/fake probability for the clip.',
      'The API returns the overall confidence plus frame-level scores, so you can see where in the video the model got suspicious — not just a verdict.',
      'The backbone is swappable (ResNet50, EfficientNet, or the custom CNN) without touching the temporal head.',
    ],
    results: [
      '93%+ accuracy on the 60,000+ sample evaluation set',
      'Frame-level breakdown for video, not just a single yes/no',
      'Deployed for real-world media authentication rather than left as a notebook',
    ],
    diagram: {
      caption: 'Why the temporal head matters',
      stages: [
        { label: 'Input', items: ['Image or video'] },
        { label: 'Preprocess', items: ['OpenCV decode', 'Face crop → 128×128'] },
        { label: 'Model', items: ['CNN · per-frame features', 'BiLSTM · reads the sequence both ways'] },
        { label: 'Output', items: ['Clip verdict + confidence', 'Per-frame scores'] },
      ],
    },
    links: { repo: `${GH}/DeepFake-Detection` },
  },

  {
    id: 'tripmate',
    name: 'TripMate — Multi-Agent Travel Assistant',
    period: '2025 — 2026',
    tags: ['Python', 'LangChain', 'RAG', 'Multi-Agent'],
    stack: ['Python', 'TypeScript', 'LangChain', 'AWS Bedrock', 'FastAPI', 'Next.js', 'FAISS'],
    blurb:
      'Three specialised agents — flights, hotels, itinerary — behind one chat interface, grounded in live availability instead of model memory.',
    metrics: [
      { value: '3', label: 'coordinated agents' },
      { value: '2', label: 'live travel APIs', note: 'Amadeus · Booking.com' },
    ],
    problem:
      'Ask an LLM to plan a trip and it will confidently invent flight numbers and hotels that do not exist. Planning a real trip needs live inventory, not plausible-sounding text — and the failure is invisible until someone tries to book.',
    build: [
      'Designed a 3-agent architecture: a Flight agent, a Hotel agent, and a RAG agent for itinerary generation.',
      'Wired the Flight agent to the live Amadeus API and the Hotel agent to Booking.com via RapidAPI, so every quoted option is real and currently available.',
      'Built the backend on FastAPI and the chat UI in Next.js + TypeScript with Tailwind.',
    ],
    how: [
      'An NLP layer does intent recognition and entity extraction — dates, cities, budget — and routes the turn to the right agent.',
      'The RAG agent retrieves destination context from a FAISS vector store and generates the itinerary with AWS Bedrock Titan, so recommendations are grounded in retrieved documents rather than model memory.',
      'Conversation context carries across turns, so a follow-up like "make it cheaper" resolves against the previous result instead of starting over.',
      'Each agent has a fallback path — if an upstream API fails, the chat degrades gracefully instead of dying.',
    ],
    results: [
      'End-to-end: natural-language request → live flight and hotel options → generated day-by-day itinerary',
      'Real availability from two production travel APIs, not synthetic fixtures',
      'Multi-turn context retained across agent handoffs',
    ],
    diagram: {
      caption: 'Routing a turn to the right agent',
      stages: [
        { label: 'Turn', items: ['Natural-language request'] },
        { label: 'NLP layer', items: ['Intent recognition', 'Entity extraction'] },
        { label: 'Agents', items: ['Flight · Amadeus API', 'Hotel · Booking.com', 'RAG · FAISS + Bedrock Titan'] },
        { label: 'Response', items: ['Grounded itinerary'] },
      ],
    },
    links: { repo: `${GH}/Travel-Based-Chatbot` },
  },

  {
    id: 'suspicious-object',
    name: 'Real-Time Object Detection System',
    period: '2025',
    tags: ['Python', 'YOLOv11', 'Computer Vision', 'Ultralytics'],
    stack: ['Python', 'YOLOv11s', 'Ultralytics', 'OpenCV', 'NumPy'],
    blurb:
      'A custom-trained YOLOv11s detector with an inference pipeline that runs on live camera feeds, video files, and image batches with real-time overlay.',
    metrics: [
      { value: '99.5%', label: 'mAP@50' },
      { value: '91.8%', label: 'mAP@50-95' },
      { value: '98.4%', label: 'precision', note: '98.5% recall' },
    ],
    problem:
      'Manual camera monitoring does not scale — an operator watching a wall of feeds misses the one frame that matters. The goal was a detector that flags objects the moment they enter frame, on hardware as small as a Raspberry Pi.',
    build: [
      'Trained a YOLOv11s model for 60 epochs (batch size 16, 640×640 input) on a custom annotated dataset.',
      'Wrote an inference CLI that accepts a single image, a folder, a video file, a USB webcam, or a Picamera as the source.',
      'Added interactive controls during inference — pause, capture the current frame, quit — plus optional recording of the annotated output.',
    ],
    how: [
      'Ultralytics handles the training loop; the checkpoint with the best validation mAP is kept as `best.pt`.',
      'The detection script reads frames with OpenCV, runs batched inference, and draws boxes and labels while tracking a rolling FPS average.',
      'Confidence threshold and resolution are command-line flags, so the same weights can be tuned for precision on a desktop or for speed on a Pi.',
    ],
    results: [
      'mAP@50: 99.5% · mAP@50-95: 91.8%',
      'Precision 98.4%, recall 98.5%',
      'Real-time throughput with a live FPS readout on commodity hardware',
    ],
    diagram: {
      caption: 'One model, five input sources',
      stages: [
        { label: 'Source', items: ['Image / folder', 'Video file', 'USB or Pi camera'] },
        { label: 'Pipeline', items: ['OpenCV frame read', 'YOLOv11s inference'] },
        { label: 'Overlay', items: ['Boxes + labels', 'Rolling FPS'] },
        { label: 'Output', items: ['Live view or recording'] },
      ],
    },
    links: { repo: `${GH}/Real-Time-Suspicious-Object-Recognition-` },
  },

  {
    id: 'skillmatch',
    name: 'SkillMatch — Hybrid Job Recommender',
    period: '2026',
    tags: ['Python', 'FastAPI', 'pgvector', 'Recommender Systems'],
    stack: ['Python', 'FastAPI', 'PostgreSQL 17', 'pgvector', 'React', 'TypeScript', 'Tailwind'],
    blurb:
      'A recommendation engine that answers which jobs belong at the top of a candidate feed — and, crucially, why.',
    metrics: [
      { value: '5', label: 'ranking signals', note: 'resume · skills · embeddings · collaborative · context' },
      { value: '1', label: 'datastore', note: 'Postgres 17 + pgvector' },
    ],
    problem:
      'Keyword job search is bad at the two cases that matter most: a brand-new user with no click history, and a candidate whose skills genuinely fit a role that never uses their exact words.',
    build: [
      'Built a hybrid ranker combining resume analysis, explicit skill matching, semantic embeddings, implicit collaborative filtering, and contextual signals.',
      'Structured the backend as a modular monolith on FastAPI over PostgreSQL 17 with the pgvector extension.',
      'Added an explanation layer so every recommendation ships with the reason it surfaced.',
      'Frontend in React + TypeScript (Vite) against a versioned /api/v1 surface.',
    ],
    how: [
      'Embeddings live in Postgres via pgvector, so semantic similarity is a SQL query rather than a second service to operate and keep in sync.',
      'Models are trained offline under ml/ and served from persisted artifacts — training never happens inside a request handler.',
      'Cold-start users fall back to content-based signals from their resume until enough implicit feedback accumulates for collaborative filtering to contribute.',
      'Recommendation quality is measured with standard ranking metrics rather than eyeballed.',
    ],
    results: [
      'Explainable output — every ranked job carries its reason',
      'Cold-start users get useful results on their first session',
      'Single-datastore design: embeddings and relational data in one Postgres instance',
    ],
    diagram: {
      caption: 'Five signals into one ranking',
      stages: [
        { label: 'Candidate', items: ['Resume', 'Implicit feedback', 'Context'] },
        { label: 'Signals', items: ['Skill match', 'Semantic embeddings (pgvector)', 'Collaborative filtering'] },
        { label: 'Hybrid ranker', items: ['Blend + score', 'Cold-start fallback'] },
        { label: 'Feed', items: ['Ranked jobs + why'] },
      ],
    },
    links: { repo: `${GH}/SkillMatch-Hybrid-Job-Internship-Recommendation-System` },
  },

  {
    id: 'railway',
    name: 'AI Railway Traffic Optimization',
    period: '2025',
    tags: ['Python', 'scikit-learn', 'FastAPI', 'WebSockets'],
    stack: ['Python', 'scikit-learn', 'FastAPI', 'Next.js', 'TypeScript', 'Docker'],
    blurb:
      'Predictive-maintenance models plus six optimisation algorithms, driving a live train-monitoring dashboard over WebSockets.',
    metrics: [
      { value: '99%', label: 'failure-prediction accuracy' },
      { value: '<100ms', label: 'dashboard update latency' },
      { value: '6', label: 'optimisation algorithms' },
    ],
    problem:
      'On a dense rail network a single unplanned equipment failure cascades into hours of knock-on delay. The expensive part is not the repair — it is not seeing it coming.',
    build: [
      'Trained a RandomForestClassifier for equipment-failure prediction and a GradientBoostingRegressor for continuous risk scoring on a 4,000-point dataset.',
      'Implemented six optimisation routines: headway optimisation, junction conflict resolution, speed optimisation, route optimisation, slot trading, and predictive maintenance scheduling.',
      'Built a Next.js dashboard showing live train position, speed, fuel, and delay, fed over WebSockets.',
      'Containerised the full stack with Docker.',
    ],
    how: [
      'FastAPI serves both the REST API and the WebSocket channel; the frontend subscribes once and receives pushed state updates rather than polling.',
      'Optimisation runs against current network state and returns concrete actions — hold this train, reroute that one — rather than an abstract score.',
      'When a model is unavailable the system falls back to a rule-based heuristic, so the dashboard never goes blind.',
    ],
    results: [
      '99% accuracy on the failure-prediction model',
      'Sub-100ms latency on live dashboard updates',
      'Reproducible Docker deployment for the full stack',
    ],
    diagram: {
      caption: 'From network state to a concrete action',
      stages: [
        { label: 'Network state', items: ['Position · speed', 'Fuel · delay'] },
        { label: 'ML', items: ['RandomForest · failure', 'GradientBoosting · risk', 'Heuristic fallback'] },
        { label: 'Optimise', items: ['Headway · junctions', 'Speed · routes · slots'] },
        { label: 'Dashboard', items: ['WebSocket push <100ms'] },
      ],
    },
    links: { repo: `${GH}/train-traffic-optimizer` },
  },

  {
    id: 'resume-builder',
    name: 'AI Resume Builder & ATS Agent',
    period: '2026',
    tags: ['JavaScript', 'React', 'Node.js', 'NLP'],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'OpenAI', 'LaTeX', 'pdf-parse'],
    blurb:
      'Upload a resume or start from scratch, get an ATS score with the specific fixes behind it, and export a LaTeX-typeset PDF.',
    metrics: [
      { value: '5', label: 'pipeline stages', note: 'upload · parse · score · enhance · generate' },
      { value: 'PDF + DOCX', label: 'in and out' },
    ],
    problem:
      'Most resumes are rejected by an applicant tracking system before a human ever sees them, and the candidate never finds out which parts failed to parse.',
    build: [
      'Built upload-and-parse for PDF and DOCX (pdf-parse, mammoth) plus a manual entry path.',
      'Implemented ATS scoring that returns a number and the specific suggestions behind it.',
      'Added AI content enhancement for phrasing and structure, with LaTeX templates for PDF and Word export.',
      'Added score tracking so a draft can be compared against the previous version.',
    ],
    how: [
      'An Express backend exposes a discrete endpoint per stage — upload, parse, score, enhance, generate — so each step is independently testable.',
      'Structured fields are extracted from the uploaded document first; scoring runs against that structure rather than raw text.',
      'Generation renders the structured data through a LaTeX template, which is why the output typesets cleanly instead of fighting a word processor.',
    ],
    results: [
      'Score → fix → re-score loop, so improvement is measurable rather than felt',
      'Professional LaTeX output exportable as PDF or Word',
      'Works from an existing resume or from nothing at all',
    ],
    diagram: {
      caption: 'Five endpoints, one measurable loop',
      stages: [
        { label: 'Input', items: ['PDF / DOCX upload', 'or manual entry'] },
        { label: 'Parse', items: ['Structured field extraction'] },
        { label: 'Score', items: ['ATS score', 'Specific suggestions'] },
        { label: 'Generate', items: ['LaTeX template → PDF / Word'] },
      ],
    },
    links: { repo: `${GH}/AI-Powered-Resume-Builder-ATS-Optimization-Agent` },
  },
];
