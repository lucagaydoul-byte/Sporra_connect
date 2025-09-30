import React from "react";

// Alle Angebote für die Website
export interface Offer {
  id: number;
  title: string;
  provider: string;
  image: string;
  price: string;
  period: string;
  district: string;
  rating: number;
  duration: string;
  category: string;
  description: string;
  date: string;
  time: string;
  currentParticipants: number;
  maxParticipants: number;
  location: string;
  fullDescription: string;
  content: string;
  createdBy?: string;
  createdAt?: Date;
}

// Globaler Event Store
class EventStore {
  private static instance: EventStore;
  private offers: Offer[] = [];
  private listeners: ((offers: Offer[]) => void)[] = [];

  private constructor(initialOffers: Offer[] = []) {
    this.offers = [...initialOffers];
  }

  static getInstance(initialOffers: Offer[] = []): EventStore {
    if (!EventStore.instance) {
      EventStore.instance = new EventStore(initialOffers);
    }
    return EventStore.instance;
  }

  getAllOffers(): Offer[] {
    return [...this.offers];
  }

  addOffer(offer: Omit<Offer, "id">): Offer {
    const newOffer: Offer = {
      ...offer,
      id: Math.max(...this.offers.map((o) => o.id), 0) + 1,
      createdAt: new Date(),
    };

    this.offers.unshift(newOffer); // neueste zuerst
    this.notifyListeners();

    try {
      localStorage.setItem(
        "userCreatedOffers",
        JSON.stringify(this.offers.filter((o) => o.createdBy))
      );
    } catch (e) {
      console.error("Fehler beim Speichern in localStorage:", e);
    }

    return newOffer;
  }

  subscribe(listener: (offers: Offer[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getAllOffers()));
  }

  loadUserOffers() {
    try {
      const saved = localStorage.getItem("userCreatedOffers");
      if (saved) {
        const userOffers = JSON.parse(saved);
        userOffers.forEach((offer: Offer) => {
          if (!this.offers.find((o) => o.id === offer.id)) {
            this.offers.unshift(offer);
          }
        });
        this.notifyListeners();
      }
    } catch (error) {
      console.error("Error loading user offers:", error);
    }
  }
}

// Default offers (bestehende Daten)
const defaultOffers: Offer[] = [
  // Fahrrad (3 Angebote)
  {
    id: 1,
    title: "Innenstadt Bike Tour",
    provider: "Frankfurt City Cycling",
    image:
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "15",
    period: "/Tour",
    district: "Innenstadt",
    rating: 4.7,
    duration: "2 Std",
    category: "Fahrrad",
    description:
      "Entdecke Frankfurt auf zwei Rädern - geführte Tour durch die Innenstadt.",
    date: "2024-03-15",
    time: "10:00",
    currentParticipants: 8,
    maxParticipants: 15,
    location: "Römerberg, Frankfurt",
    fullDescription:
      "Eine entspannte Fahrradtour durch die Frankfurter Innenstadt. Wir besuchen die wichtigsten Sehenswürdigkeiten und versteckten Ecken der Stadt.",
    content: "Stadtführung, Sightseeing, Anfänger geeignet",
  },
  {
    id: 2,
    title: "Mountainbike Taunus",
    provider: "Taunus Bike Adventures",
    image:
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "35",
    period: "/Tour",
    district: "Taunus",
    rating: 4.9,
    duration: "4 Std",
    category: "Fahrrad",
    description: "Anspruchsvolle Mountainbike-Touren durch den Taunus.",
    date: "2024-03-16",
    time: "09:00",
    currentParticipants: 6,
    maxParticipants: 10,
    location: "Feldberg Parkplatz",
    fullDescription:
      "Herausfordernde Mountainbike-Tour durch die schönsten Trails des Taunus. Für erfahrene Biker mit guter Kondition.",
    content: "Mountainbike, Fortgeschrittene, Taunus, Trails",
  },
  {
    id: 3,
    title: "E-Bike Main-Radweg",
    provider: "E-Motion Frankfurt",
    image:
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "25",
    period: "/Tour",
    district: "Sachsenhausen",
    rating: 4.6,
    duration: "3 Std",
    category: "Fahrrad",
    description: "Entspannte E-Bike Tour entlang des Mains.",
    date: "2024-03-17",
    time: "14:00",
    currentParticipants: 4,
    maxParticipants: 12,
    location: "Sachsenhäuser Ufer",
    fullDescription:
      "Gemütliche E-Bike Tour entlang des Mains. Perfekt für alle Altersgruppen und Fitness-Level.",
    content: "E-Bike, entspannt, Main, Senioren geeignet",
  },

  // Fußball (3 Angebote)
  {
    id: 4,
    title: "Erwachsenen Fußball Training",
    provider: "FC Frankfurt Hobby",
    image:
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "45",
    period: "/Monat",
    district: "Nordend",
    rating: 4.8,
    duration: "90 Min",
    category: "Fußball",
    description: "Fußballtraining für Erwachsene jeden Levels.",
    date: "2024-03-15",
    time: "18:30",
    currentParticipants: 16,
    maxParticipants: 22,
    location: "Sportplatz Nordend",
    fullDescription:
      "Professionelles Fußballtraining für Erwachsene. Technik, Taktik und Kondition in freundlicher Atmosphäre.",
    content: "Training, Erwachsene, alle Level, Technik",
  },
  {
    id: 5,
    title: "Frauen Fußball Gruppe",
    provider: "Ladies FC Frankfurt",
    image:
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "40",
    period: "/Monat",
    district: "Westend",
    rating: 4.9,
    duration: "90 Min",
    category: "Fußball",
    description: "Fußballgruppe nur für Frauen in entspannter Atmosphäre.",
    date: "2024-03-16",
    time: "19:00",
    currentParticipants: 12,
    maxParticipants: 18,
    location: "Sportplatz Westend",
    fullDescription:
      "Eine tolle Fußballgruppe nur für Frauen. Egal ob Anfängerin oder erfahrene Spielerin - alle sind willkommen!",
    content: "Frauen, nur Frauen, entspannt, alle Level",
  },
  {
    id: 6,
    title: "Ü40 Fußball Runde",
    provider: "Oldies but Goldies FC",
    image:
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "35",
    period: "/Monat",
    district: "Bockenheim",
    rating: 4.7,
    duration: "90 Min",
    category: "Fußball",
    description: "Fußball für die Generation 40+.",
    date: "2024-03-17",
    time: "17:00",
    currentParticipants: 14,
    maxParticipants: 20,
    location: "Sportplatz Bockenheim",
    fullDescription:
      "Fußball für Männer über 40. Weniger Tempo, mehr Spaß und Kameradschaft stehen im Vordergrund.",
    content: "Ü40, Männer, entspannt, Spaß",
  },

  // Basketball (3 Angebote)
  {
    id: 7,
    title: "Streetball Sessions",
    provider: "Frankfurt Ballers",
    image:
      "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "30",
    period: "/Monat",
    district: "Ostend",
    rating: 4.8,
    duration: "2 Std",
    category: "Basketball",
    description: "Streetball auf professionellen Outdoor-Courts.",
    date: "2024-03-15",
    time: "16:00",
    currentParticipants: 8,
    maxParticipants: 12,
    location: "Basketballplatz Ostend",
    fullDescription:
      "Authentisches Streetball-Erlebnis auf modernen Outdoor-Courts. Perfekt für alle Basketball-Liebhaber.",
    content: "Streetball, Outdoor, alle Level, Urban",
  },
  {
    id: 8,
    title: "Basketball Anfänger Kurs",
    provider: "Basketball Academy Frankfurt",
    image:
      "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "55",
    period: "/Monat",
    district: "Nordend",
    rating: 4.6,
    duration: "90 Min",
    category: "Basketball",
    description: "Basketball-Grundlagen für komplette Anfänger.",
    date: "2024-03-16",
    time: "18:00",
    currentParticipants: 5,
    maxParticipants: 15,
    location: "Sporthalle Nordend",
    fullDescription:
      "Lerne Basketball von Grund auf! Professionelle Trainer bringen dir alle Basics bei - von Dribbling bis Wurftechnik.",
    content: "Anfänger, Grundlagen, Training, Indoor",
  },
  {
    id: 9,
    title: "Basketball Liga Spiele",
    provider: "Frankfurt Basketball League",
    image:
      "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "60",
    period: "/Saison",
    district: "Innenstadt",
    rating: 4.9,
    duration: "2 Std",
    category: "Basketball",
    description: "Wettkampf-Basketball in der Stadtliga.",
    date: "2024-03-17",
    time: "20:00",
    currentParticipants: 10,
    maxParticipants: 12,
    location: "Sporthalle Innenstadt",
    fullDescription:
      "Spiele in der offiziellen Frankfurt Basketball League. Für erfahrene Spieler mit Wettkampfambitionen.",
    content: "Liga, Wettkampf, erfahrene Spieler, Indoor",
  },

  // Skaten (3 Angebote)
  {
    id: 10,
    title: "Skateboard Workshop",
    provider: "Frankfurt Skate School",
    image:
      "https://images.pexels.com/photos/1230662/pexels-photo-1230662.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "40",
    period: "/Workshop",
    district: "Innenstadt",
    rating: 4.7,
    duration: "3 Std",
    category: "Skaten",
    description: "Skateboard-Grundlagen für Einsteiger.",
    date: "2024-03-15",
    time: "14:00",
    currentParticipants: 6,
    maxParticipants: 10,
    location: "Skatepark Innenstadt",
    fullDescription:
      "Lerne Skateboard fahren von professionellen Trainern. Sicherheitsausrüstung wird gestellt.",
    content: "Skateboard, Anfänger, Workshop, Sicherheit",
  },
  {
    id: 11,
    title: "Longboard City Tour",
    provider: "Frankfurt Longboard Crew",
    image:
      "https://images.pexels.com/photos/1230662/pexels-photo-1230662.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "20",
    period: "/Tour",
    district: "Sachsenhausen",
    rating: 4.5,
    duration: "2 Std",
    category: "Skaten",
    description: "Entspannte Longboard-Tour durch Frankfurt.",
    date: "2024-03-16",
    time: "16:00",
    currentParticipants: 4,
    maxParticipants: 8,
    location: "Sachsenhäuser Ufer",
    fullDescription:
      "Cruise durch Frankfurt auf dem Longboard. Eine entspannte Tour für alle, die das Gleiten lieben.",
    content: "Longboard, entspannt, Tour, Cruising",
  },
  {
    id: 12,
    title: "Inline-Skating Gruppe",
    provider: "Skate Frankfurt",
    image:
      "https://images.pexels.com/photos/1230662/pexels-photo-1230662.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "25",
    period: "/Monat",
    district: "Westend",
    rating: 4.8,
    duration: "90 Min",
    category: "Skaten",
    description: "Inline-Skating für Fitness und Spaß.",
    date: "2024-03-17",
    time: "18:00",
    currentParticipants: 7,
    maxParticipants: 12,
    location: "Grüneburgpark",
    fullDescription:
      "Regelmäßige Inline-Skating Gruppe für Fitness und Spaß. Alle Levels willkommen!",
    content: "Inline-Skating, Fitness, Gruppe, Park",
  },

  // Paddel (3 Angebote)
  {
    id: 13,
    title: "Kajak Main Tour",
    provider: "Frankfurt Wassersport",
    image:
      "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "45",
    period: "/Tour",
    district: "Westend",
    rating: 4.9,
    duration: "3 Std",
    category: "Paddel",
    description: "Geführte Kajak-Tour auf dem Main.",
    date: "2024-03-15",
    time: "11:00",
    currentParticipants: 5,
    maxParticipants: 8,
    location: "Bootshaus Westend",
    fullDescription:
      "Erlebe Frankfurt vom Wasser aus! Professionell geführte Kajak-Tour mit kompletter Ausrüstung.",
    content: "Kajak, Main, geführt, Ausrüstung inklusive",
  },
  {
    id: 14,
    title: "SUP Anfänger Kurs",
    provider: "Stand Up Paddle Frankfurt",
    image:
      "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "50",
    period: "/Kurs",
    district: "Sachsenhausen",
    rating: 4.7,
    duration: "2 Std",
    category: "Paddel",
    description: "Stand Up Paddling lernen für Einsteiger.",
    date: "2024-03-16",
    time: "15:00",
    currentParticipants: 3,
    maxParticipants: 6,
    location: "Mainufer Sachsenhausen",
    fullDescription:
      "Lerne Stand Up Paddling in einem professionellen Anfängerkurs. Board und Paddle werden gestellt.",
    content: "SUP, Anfänger, Kurs, Board inklusive",
  },
  {
    id: 15,
    title: "Kanu Wanderung",
    provider: "Outdoor Frankfurt",
    image:
      "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "40",
    period: "/Tour",
    district: "Höchst",
    rating: 4.8,
    duration: "4 Std",
    category: "Paddel",
    description: "Mehrstündige Kanu-Wanderung mit Picknick.",
    date: "2024-03-17",
    time: "10:00",
    currentParticipants: 6,
    maxParticipants: 10,
    location: "Bootsverleih Höchst",
    fullDescription:
      "Ausgedehnte Kanu-Wanderung mit Picknick-Pause. Ein ganzer Tag auf dem Wasser!",
    content: "Kanu, Wanderung, Picknick, ganzer Tag",
  },

  // Laufen (3 Angebote)
  {
    id: 16,
    title: "Stadtwald Laufgruppe",
    provider: "Frankfurt Runners",
    image:
      "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "20",
    period: "/Monat",
    district: "Sachsenhausen",
    rating: 4.6,
    duration: "60 Min",
    category: "Laufen",
    description: "Laufgruppe für alle Geschwindigkeiten.",
    date: "2024-03-15",
    time: "19:00",
    currentParticipants: 12,
    maxParticipants: 25,
    location: "Stadtwald Frankfurt",
    fullDescription:
      "Regelmäßige Laufgruppe im Stadtwald. Verschiedene Geschwindigkeitsgruppen für alle Niveaus.",
    content: "Laufen, Gruppe, alle Niveaus, Stadtwald",
  },
  {
    id: 17,
    title: "Intervall Training",
    provider: "Run Faster Frankfurt",
    image:
      "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "25",
    period: "/Monat",
    district: "Innenstadt",
    rating: 4.8,
    duration: "60 Min",
    category: "Laufen",
    description: "Professionelles Intervalltraining für Fortgeschrittene.",
    date: "2024-03-16",
    time: "18:30",
    currentParticipants: 10,
    maxParticipants: 20,
    location: "Sportplatz Innenstadt",
    fullDescription:
      "Gezieltes Intervalltraining zur Leistungssteigerung. Für ambitionierte Läuferinnen und Läufer.",
    content: "Intervall, Training, Leistung, Fortgeschrittene",
  },
  {
    id: 18,
    title: "Anfänger Laufkurs",
    provider: "Laufstart Frankfurt",
    image:
      "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    price: "30",
    period: "/Kurs",
    district: "Nordend",
    rating: 4.7,
    duration: "8 Wochen",
    category: "Laufen",
    description: "Laufkurs für absolute Anfänger.",
    date: "2024-03-17",
    time: "17:00",
    currentParticipants: 8,
    maxParticipants: 15,
    location: "Sportplatz Nordend",
    fullDescription:
      "Starte deine Laufkarriere mit einem strukturierten 8-Wochen-Kurs. Perfekt für absolute Anfänger.",
    content: "Anfänger, Kurs, Laufen, 8 Wochen Programm",
  },
];

// Singleton-Store initialisieren
export const eventStore = EventStore.getInstance(defaultOffers);

// Hook: alle Angebote live abrufen
export const useOffers = () => {
  const [offers, setOffers] = React.useState<Offer[]>(eventStore.getAllOffers());

  React.useEffect(() => {
    const unsubscribe = eventStore.subscribe(setOffers);
    eventStore.loadUserOffers();
    return unsubscribe;
  }, []);

  return offers;
};

// Selektoren
export const allOffers = () => eventStore.getAllOffers();
export const topOffers = () =>
  eventStore.getAllOffers().filter((offer) => offer.rating >= 4.8);
