const propertyData = {
  verrieres: {
    title: "Les Verrières Secrètes",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    description: "Élégant T3 rénové au cœur du centre historique, très recherché pour les séjours loisirs.",
    details: ["Taux d'occupation : 77 %", "Revenus annuels : 34 000 €", "Note moyenne : 4,91 / 5"]
  },
  ecrin: {
    title: "L'Écrin",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    description: "Chalet premium en montagne, expérience haut de gamme pour familles et groupes.",
    details: ["Taux d'occupation : 60 %", "Revenus annuels : 65 000 €", "Note moyenne : 5 / 5"]
  },
  vitapasibla: {
    title: "Vitapasibla",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    description: "Villa avec piscine privée et vue mer, idéale pour grands groupes jusqu'à 12 personnes.",
    details: ["Taux d'occupation : 55 %", "Revenus annuels : 65 000 €", "Note moyenne : 5 / 5"]
  },
  "bleu-horizon": {
    title: "Bleu Horizon",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Appartement design proche des plages, excellent positionnement saisonnier.",
    details: ["Taux d'occupation : 73 %", "Revenus annuels : 42 000 €", "Note moyenne : 4,86 / 5"]
  },
  "villa-alba": {
    title: "Villa Alba",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    description: "Maison familiale avec jardin, idéale pour les longs séjours estivaux.",
    details: ["Taux d'occupation : 68 %", "Revenus annuels : 58 000 €", "Note moyenne : 4,9 / 5"]
  },
  "domaine-sea": {
    title: "Domaine Sea",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    description: "Grand bien premium à forte capacité, demande constante en haute saison.",
    details: ["Taux d'occupation : 62 %", "Revenus annuels : 71 000 €", "Note moyenne : 4,88 / 5"]
  }
};

function formatEur(value) {
  return `${Math.round(value).toLocaleString("fr-FR")}\u00a0€`;
}

function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("menuToggle");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (!sidebar || !toggle || !backdrop) return;

  const close = () => {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
  };

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    backdrop.classList.toggle("open");
  });
  backdrop.addEventListener("click", close);
  sidebar.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  elements.forEach((el) => observer.observe(el));
}

function initModals() {
  const modal = document.getElementById("propertyModal");
  if (!modal) return;

  const image = document.getElementById("modalImage");
  const title = document.getElementById("modalTitle");
  const description = document.getElementById("modalDescription");
  const details = document.getElementById("modalDetails");

  const close = () => modal.classList.remove("open");
  document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", close));

  document.querySelectorAll("[data-modal-target]").forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.getAttribute("data-modal-target");
      const data = propertyData[key];
      if (!data) return;
      image.src = data.image;
      image.alt = data.title;
      title.textContent = data.title;
      description.textContent = data.description;
      if (details) {
        details.innerHTML = "";
        data.details.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          details.appendChild(li);
        });
      }
      modal.classList.add("open");
    });
  });
}

const SIM_TYPE_META = {
  studio: { label: "Studio", sub: "Idéal centre-ville & courte durée" },
  t2: { label: "T2", sub: "Deux pièces, fort potentiel locatif" },
  t3: { label: "T3", sub: "Familles & séjours moyens" },
  t4: { label: "T4", sub: "Grande capacité, premium" },
  maison: { label: "Maison", sub: "Villa ou maison avec extérieur" }
};

const SIM_CITY_META = {
  martigues: { label: "Martigues", sub: "Côte Bleue & proximité" },
  carry: { label: "Carry-le-Rouet", sub: "Littoral haut de gamme" },
  istres: { label: "Istres", sub: "Calme & stratégie tarifaire" },
  marseille: { label: "Marseille", sub: "Forte demande urbaine" }
};

const SIM_CONDITION_META = {
  excellent: { label: "Excellent", sub: "Très bon état général" },
  bon: { label: "Bon", sub: "État entretenu" },
  moyen: { label: "Moyen", sub: "Rafraîchissement possible" }
};

const SIM_YEAR_META = {
  after2010: { label: "Après 2010", sub: "Construction récente" },
  between2000_2010: { label: "2000 – 2010", sub: "Période intermédiaire" },
  before2000: { label: "Avant 2000", sub: "Bien plus ancien" }
};

function cycleSelectIndex(select, delta) {
  const n = select.options.length;
  let i = select.selectedIndex;
  i = (i + delta + n) % n;
  select.selectedIndex = i;
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

function animatePickerDisplay(button, direction) {
  const picker = button.closest(".picker-field");
  const display = picker?.querySelector(".picker-display");
  if (!display) return;
  display.classList.remove("is-moving-left", "is-moving-right");
  // Force reflow so animation restarts on quick taps
  void display.offsetWidth;
  display.classList.add(direction < 0 ? "is-moving-left" : "is-moving-right");
}

function syncSimTypeLabels() {
  const select = document.getElementById("simType");
  const labelEl = document.getElementById("simTypeLabel");
  const subEl = document.getElementById("simTypeSublabel");
  if (!select || !labelEl || !subEl) return;
  const meta = SIM_TYPE_META[select.value] || { label: select.value, sub: "" };
  labelEl.textContent = meta.label;
  subEl.textContent = meta.sub;
}

function syncSimCityLabels() {
  const select = document.getElementById("simCity");
  const labelEl = document.getElementById("simCityLabel");
  const subEl = document.getElementById("simCitySublabel");
  if (!select || !labelEl || !subEl) return;
  const meta = SIM_CITY_META[select.value] || { label: select.value, sub: "" };
  labelEl.textContent = meta.label;
  subEl.textContent = meta.sub;
}

function syncConditionLabels() {
  const select = document.getElementById("simCondition");
  const labelEl = document.getElementById("simConditionLabel");
  const subEl = document.getElementById("simConditionSublabel");
  if (!select || !labelEl || !subEl) return;
  const meta = SIM_CONDITION_META[select.value] || { label: select.value, sub: "" };
  labelEl.textContent = meta.label;
  subEl.textContent = meta.sub;
}

function syncYearLabels() {
  const select = document.getElementById("simYear");
  const labelEl = document.getElementById("simYearLabel");
  const subEl = document.getElementById("simYearSublabel");
  if (!select || !labelEl || !subEl) return;
  const meta = SIM_YEAR_META[select.value] || { label: select.value, sub: "" };
  labelEl.textContent = meta.label;
  subEl.textContent = meta.sub;
}

function initSimAnchors() {
  const links = document.querySelectorAll(".sim-anchor");
  const sections = document.querySelectorAll("#step-type, #step-city, #step-details, #step-equipment, #step-results");
  if (!links.length || !sections.length) return;

  const setActive = (id) => {
    links.forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("is-active", href === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.getAttribute("id"));
        }
      });
    },
    { rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href")?.replace("#", "");
      if (id) setTimeout(() => setActive(id), 50);
    });
  });
}

function initSimulator() {
  const simType = document.getElementById("simType");
  if (!simType) return;

  const simCity = document.getElementById("simCity");
  const simBeds = document.getElementById("simBeds");
  const simSlider = document.getElementById("simSlider");
  const simSliderValue = document.getElementById("simSliderValue");
  const simMonthly = document.getElementById("simMonthly");
  const simYearly = document.getElementById("simYearly");

  const typePrev = document.getElementById("simTypePrev");
  const typeNext = document.getElementById("simTypeNext");
  const cityPrev = document.getElementById("simCityPrev");
  const cityNext = document.getElementById("simCityNext");
  const simCondition = document.getElementById("simCondition");
  const simYear = document.getElementById("simYear");
  const conditionPrev = document.getElementById("simConditionPrev");
  const conditionNext = document.getElementById("simConditionNext");
  const yearPrev = document.getElementById("simYearPrev");
  const yearNext = document.getElementById("simYearNext");

  const baseByType = { studio: 1250, t2: 1800, t3: 2400, t4: 3000, maison: 3800 };
  const cityBoost = { martigues: 1, carry: 1.1, istres: 0.95, marseille: 1.18 };
  const equipmentBoost = { piscine: 220, terrasse: 120, vue: 200, jacuzzi: 260, parking: 100 };

  function calculate() {
    const typeValue = baseByType[simType.value] || 1500;
    const cityValue = cityBoost[simCity.value] || 1;
    const bedsValue = Number(simBeds.value) * 70;
    const target = Number(simSlider.value);

    let equipmentsValue = 0;
    document.querySelectorAll(".check-grid input:checked").forEach((item) => {
      equipmentsValue += equipmentBoost[item.value] || 0;
    });

    const monthly = (typeValue + bedsValue + equipmentsValue + target * 0.25) * cityValue;
    const yearly = monthly * 12;

    simSliderValue.textContent = formatEur(target);
    simMonthly.textContent = formatEur(monthly);
    simYearly.textContent = formatEur(yearly);
  }

  function onTypeOrCityChange() {
    syncSimTypeLabels();
    syncSimCityLabels();
    calculate();
  }

  typePrev?.addEventListener("click", () => {
    animatePickerDisplay(typePrev, -1);
    cycleSelectIndex(simType, -1);
  });
  typeNext?.addEventListener("click", () => {
    animatePickerDisplay(typeNext, 1);
    cycleSelectIndex(simType, 1);
  });
  cityPrev?.addEventListener("click", () => {
    animatePickerDisplay(cityPrev, -1);
    cycleSelectIndex(simCity, -1);
  });
  cityNext?.addEventListener("click", () => {
    animatePickerDisplay(cityNext, 1);
    cycleSelectIndex(simCity, 1);
  });
  conditionPrev?.addEventListener("click", () => {
    animatePickerDisplay(conditionPrev, -1);
    if (simCondition) cycleSelectIndex(simCondition, -1);
  });
  conditionNext?.addEventListener("click", () => {
    animatePickerDisplay(conditionNext, 1);
    if (simCondition) cycleSelectIndex(simCondition, 1);
  });
  yearPrev?.addEventListener("click", () => {
    animatePickerDisplay(yearPrev, -1);
    if (simYear) cycleSelectIndex(simYear, -1);
  });
  yearNext?.addEventListener("click", () => {
    animatePickerDisplay(yearNext, 1);
    if (simYear) cycleSelectIndex(simYear, 1);
  });

  document.querySelectorAll("[data-step-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-step-target");
      const direction = Number(button.getAttribute("data-step-dir") || 0);
      const input = targetId ? document.getElementById(targetId) : null;
      if (!(input instanceof HTMLInputElement)) return;

      const min = Number(input.min || 0);
      const max = Number(input.max || 999);
      const current = Number(input.value || min);
      const next = Math.min(max, Math.max(min, current + direction));
      input.value = String(next);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  simType.addEventListener("change", onTypeOrCityChange);
  simCity.addEventListener("change", onTypeOrCityChange);
  simCondition?.addEventListener("change", syncConditionLabels);
  simYear?.addEventListener("change", syncYearLabels);
  [simBeds, simSlider].forEach((el) => el.addEventListener("input", calculate));
  document.querySelectorAll(".check-grid input").forEach((el) => el.addEventListener("change", calculate));

  syncSimTypeLabels();
  syncSimCityLabels();
  syncConditionLabels();
  syncYearLabels();
  calculate();
  initSimAnchors();
}

function initForms() {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Merci ! Votre demande a bien été reçue. Nous revenons vers vous rapidement.");
    });
  });
}

initSidebar();
initReveal();
initModals();
initSimulator();
initForms();
