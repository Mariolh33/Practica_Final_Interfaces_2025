// ============================================
// VARIABLES GLOBALES (DATOS EMBEBIDOS)
// ============================================
const EMBEDDED_ROUTE_DATA = window.EMBEDDED_ROUTE_DATA || {
    "route_caminoinca": {
    
        "continent": "america",
        "country": "peru",
        "title": "Camino Inca a Machu Picchu",
        "location": "Cusco, Perú",

        "images": [
        "images/ruta_detalle/caminoinca_1.jpg",
        "images/ruta_detalle/caminoinca_2.jpg",
        "images/ruta_detalle/caminoinca_3.jpg",
        "images/ruta_detalle/caminoinca_4.jpg"
        ],

        "duration": "4",
        "difficulty": "hard",
        "distance": 43,
        "elevationGain": 1200,
        "maxAltitude": 4200,

        "priceFrom": 450,
        "pricePerDay": 70,

        "rating": 4.9,
        "reviewsCount": 2847,
        "favorites": 3821,
        "travelers": 12450,

        "transport": ["hiking"],
        "features": ["camping", "local-guide", "permit-required"],

        "includes": [
        "guide",
        "transport",
        "meals",
        "camping-gear",
        "permits",
        "insurance"
        ],

        "coordinates": [-13.1604, -72.5209],

        "itinerary": [
        {
            "day": 1,
            "distance": 12,
            "duration": "5-6h",
            "altitude": 2800,
            "highlights": ["valle-sagrado", "patallaqta"]
        },
        {
            "day": 2,
            "distance": 11,
            "duration": "7-8h",
            "altitude": 4200,
            "highlights": ["warmiwañusca"]
        },
        {
            "day": 3,
            "distance": 16,
            "duration": "8-9h",
            "altitude": 2650,
            "highlights": ["runkurakay", "sayacmarca", "phuyupatamarca"]
        },
        {
            "day": 4,
            "distance": 4,
            "duration": "2h",
            "altitude": 2430,
            "highlights": ["inti-punku", "machupicchu"]
        }
        ],

        "map": {
        "start": [-13.1604, -72.5209],
        "end": [-13.1631, -72.5450],
        "polyline": [
            [-13.1604, -72.5209],
            [-13.166, -72.532],
            [-13.172, -72.540],
            [-13.1631, -72.5450]
        ]
        },

        "elevationProfile": [
        { "km": 0, "m": 2600 },
        { "km": 5, "m": 3000 },
        { "km": 15, "m": 4200 },
        { "km": 25, "m": 3600 },
        { "km": 35, "m": 2800 },
        { "km": 43, "m": 2430 }
        ],

        "reviewsData": [
            {
                "id": "r1",
                "user": "maria_gonzalez",
                "rating": 5,
                "date": "2025-01-12",
                "helpful": 45,
                "images": ["machu1.jpg", "machu2.jpg"]
            },
            {
                "id": "r2",
                "user": "carlos_mendez",
                "rating": 5,
                "date": "2025-01-03",
                "helpful": 32,
                "images": []
            },
            {
                "id": "r3",
                "user": "ana_torres",
                "rating": 4,
                "date": "2024-12-10",
                "helpful": 28,
                "images": ["patagonia1.jpg"]
            },
            {
                "id": "r4",
                "user": "jorge_castillo",
                "rating": 5,
                "date": "2024-11-15",
                "helpful": 51,
                "images": []
            },
            {
                "id": "r5",
                "user": "lucia_fernandez",
                "rating": 5,
                "date": "2024-10-20",
                "helpful": 38,
                "images": ["islandia1.jpg", "costa-rica1.jpg"]
            }
        ]
    },
    "route_patagonia": {
        "continent": "america",
        "country": "argentina",
        "title": "Trekking en la Patagonia",
        "location": "El Chaltén, Argentina",
        "images": [
            "images/ruta_detalle/patagonia_1.jpg",
            "images/ruta_detalle/patagonia_2.jpg",
            "images/ruta_detalle/patagonia_3.jpg",
            "images/ruta_detalle/patagonia_4.jpg"
        ],
        "duration": "5",
        "difficulty": "medium",
        "distance": 56,
        "elevationGain": 1500,
        "maxAltitude": 2000,
        "priceFrom": 380,
        "pricePerDay": 65,
        "rating": 4.8,
        "reviewsCount": 1950,
        "favorites": 2800,
        "travelers": 8200,
        "transport": ["hiking"],
        "features": ["camping", "local-guide", "wildlife"],
        "includes": ["guide", "transport", "meals", "camping-gear", "insurance"],
        "coordinates": [-49.3400, -72.9000],
        "itinerary": [
            {"day": 1, "distance": 10, "duration": "4-5h", "altitude": 500, "highlights": ["valle-rio-blanco"]},
            {"day": 2, "distance": 12, "duration": "5-6h", "altitude": 1000, "highlights": ["laguna-de-los-tres"]},
            {"day": 3, "distance": 15, "duration": "6-7h", "altitude": 1500, "highlights": ["fitz-roy"]},
            {"day": 4, "distance": 11, "duration": "5h", "altitude": 800, "highlights": ["laguna-torre"]},
            {"day": 5, "distance": 8, "duration": "3-4h", "altitude": 600, "highlights": ["retorno"]}
        ],
        "map": {
            "start": [-49.3400, -72.9000],
            "end": [-49.3500, -72.8900],
            "polyline": [[-49.3400, -72.9000], [-49.3450, -72.8950], [-49.3500, -72.8900]]
        },
        "elevationProfile": [
            {"km": 0, "m": 500},
            {"km": 10, "m": 800},
            {"km": 25, "m": 1400},
            {"km": 40, "m": 1000},
            {"km": 56, "m": 600}
        ],
        "reviewsData": [
            {"id": "r1", "user": "ana_torres", "rating": 5, "date": "2025-01-10", "helpful": 38, "images": []},
            {"id": "r2", "user": "diego_suarez", "rating": 5, "date": "2025-01-05", "helpful": 25, "images": []},
            {"id": "r3", "user": "sofia_vargas", "rating": 4, "date": "2024-12-28", "helpful": 19, "images": []},
            {"id": "r4", "user": "pablo_carrillo", "rating": 5, "date": "2024-12-15", "helpful": 42, "images": []},
            {"id": "r5", "user": "veronica_silva", "rating": 4, "date": "2024-12-01", "helpful": 31, "images": []}
        ]
    },
    "route_balcanes": {
        "continent": "europa",
        "country": "varios",
        "title": "Ruta de los Balcanes",
        "location": "Europa del Este",
        "images": ["images/ruta_detalle/balcanes_1.jpg", "images/ruta_detalle/balcanes_2.jpg", "images/ruta_detalle/balcanes_3.jpg", "images/ruta_detalle/balcanes_4.jpg"],
        "duration": "14",
        "difficulty": "medium",
        "distance": 1200,
        "elevationGain": 800,
        "maxAltitude": 1500,
        "priceFrom": 800,
        "pricePerDay": 57,
        "rating": 4.7,
        "reviewsCount": 1923,
        "favorites": 2100,
        "travelers": 7500,
        "transport": ["bus", "ferry"],
        "features": ["hostel", "cultural", "beaches"],
        "includes": ["transport", "accommodation", "some-meals", "guide"],
        "coordinates": [42.6507, 18.0944],
        "itinerary": [
            {"day": 1, "distance": 100, "duration": "3h", "altitude": 100, "highlights": ["sarajevo"]},
            {"day": 2, "distance": 150, "duration": "4h", "altitude": 200, "highlights": ["mostar"]},
            {"day": 3, "distance": 120, "duration": "3h", "altitude": 150, "highlights": ["dubrovnik"]},
            {"day": 4, "distance": 90, "duration": "2h", "altitude": 100, "highlights": ["kotor"]},
            {"day": 5, "distance": 110, "duration": "3h", "altitude": 120, "highlights": ["budva"]},
            {"day": 6, "distance": 130, "duration": "4h", "altitude": 200, "highlights": ["tirana"]},
            {"day": 7, "distance": 100, "duration": "3h", "altitude": 150, "highlights": ["ohrid"]}
        ],
        "map": {"start": [42.6507, 18.0944], "end": [41.3275, 19.8187], "polyline": [[42.6507, 18.0944], [42.4415, 18.5214], [41.3275, 19.8187]]},
        "elevationProfile": [{"km": 0, "m": 100}, {"km": 300, "m": 300}, {"km": 600, "m": 500}, {"km": 900, "m": 400}, {"km": 1200, "m": 200}],
        "reviewsData": [
            {"id": "r1", "user": "lucia_fernandez", "rating": 5, "date": "2024-12-05", "helpful": 41, "images": []},
            {"id": "r2", "user": "miguel_herrera", "rating": 4, "date": "2024-11-20", "helpful": 33, "images": []},
            {"id": "r3", "user": "carmen_lopez", "rating": 5, "date": "2024-11-10", "helpful": 29, "images": []}
        ]
    },
    "route_serengeti": {
        "continent": "africa",
        "country": "tanzania",
        "title": "Safari Serengeti y Ngorongoro",
        "location": "Tanzania",
        "images": ["images/ruta_detalle/serengeti_1.jpg", "images/ruta_detalle/serengeti_2.jpg", "images/ruta_detalle/serengeti_3.jpg", "images/ruta_detalle/serengeti_4.jpg"],
        "duration": "7",
        "difficulty": "easy",
        "distance": 450,
        "elevationGain": 600,
        "maxAltitude": 2300,
        "priceFrom": 1200,
        "pricePerDay": 171,
        "rating": 4.8,
        "reviewsCount": 1567,
        "favorites": 1900,
        "travelers": 5600,
        "transport": ["4x4"],
        "features": ["lodge", "local-guide", "wildlife", "photography"],
        "includes": ["guide", "transport", "meals", "accommodation", "permits", "insurance"],
        "coordinates": [-2.3333, 34.8333],
        "itinerary": [
            {"day": 1, "distance": 80, "duration": "4h", "altitude": 1400, "highlights": ["arusha-serengeti"]},
            {"day": 2, "distance": 100, "duration": "6h", "altitude": 1500, "highlights": ["seronera-valley"]},
            {"day": 3, "distance": 90, "duration": "6h", "altitude": 1600, "highlights": ["gran-migracion"]},
            {"day": 4, "distance": 70, "duration": "5h", "altitude": 1700, "highlights": ["kopjes"]},
            {"day": 5, "distance": 60, "duration": "4h", "altitude": 2300, "highlights": ["ngorongoro-crater"]},
            {"day": 6, "distance": 50, "duration": "5h", "altitude": 2200, "highlights": ["crater-floor"]}
        ],
        "map": {"start": [-2.3333, 34.8333], "end": [-3.2167, 35.5167], "polyline": [[-2.3333, 34.8333], [-2.7667, 35.0500], [-3.2167, 35.5167]]},
        "elevationProfile": [{"km": 0, "m": 1400}, {"km": 100, "m": 1550}, {"km": 250, "m": 1700}, {"km": 350, "m": 2100}, {"km": 450, "m": 1500}],
        "reviewsData": [
            {"id": "r1", "user": "jorge_castillo", "rating": 5, "date": "2024-11-28", "helpful": 58, "images": []},
            {"id": "r2", "user": "patricia_ramos", "rating": 5, "date": "2024-11-15", "helpful": 47, "images": []},
            {"id": "r3", "user": "fernando_diaz", "rating": 4, "date": "2024-10-30", "helpful": 39, "images": []}
        ]
    },
    "route_annapurna": {
        "continent": "asia",
        "country": "nepal",
        "title": "Circuito Annapurna",
        "location": "Nepal",
        "images": ["images/ruta_detalle/annapurna_1.jpg", "images/ruta_detalle/annapurna_2.jpg", "images/ruta_detalle/annapurna_3.jpg", "images/ruta_detalle/annapurna_4.jpg"],
        "duration": "14",
        "difficulty": "hard",
        "distance": 230,
        "elevationGain": 3000,
        "maxAltitude": 5416,
        "priceFrom": 600,
        "pricePerDay": 43,
        "rating": 4.9,
        "reviewsCount": 3201,
        "favorites": 4500,
        "travelers": 15200,
        "transport": ["hiking"],
        "features": ["camping", "hostel", "local-guide", "permit-required", "high-altitude"],
        "includes": ["guide", "transport", "meals", "accommodation", "permits", "insurance"],
        "coordinates": [28.5983, 83.9692],
        "itinerary": [
            {"day": 1, "distance": 15, "duration": "5-6h", "altitude": 2800, "highlights": ["besisahar-bhulbhule"]},
            {"day": 2, "distance": 18, "duration": "6-7h", "altitude": 3200, "highlights": ["jagat-dharapani"]},
            {"day": 3, "distance": 16, "duration": "5-6h", "altitude": 3700, "highlights": ["chame"]},
            {"day": 4, "distance": 14, "duration": "5h", "altitude": 4000, "highlights": ["upper-pisang"]},
            {"day": 5, "distance": 17, "duration": "6h", "altitude": 4500, "highlights": ["manang"]},
            {"day": 6, "distance": 0, "duration": "rest", "altitude": 4500, "highlights": ["aclimatacion"]},
            {"day": 7, "duration": "4h", "altitude": 4800, "highlights": ["yak-kharka"]},
            {"day": 8, "distance": 14, "duration": "6-7h", "altitude": 5416, "highlights": ["thorong-la-pass"]},
            {"day": 9, "distance": 16, "duration": "7-8h", "altitude": 3800, "highlights": ["muktinath"]},
            {"day": 10, "distance": 20, "duration": "6h", "altitude": 2800, "highlights": ["jomsom"]}
        ],
        "map": {"start": [28.5983, 83.9692], "end": [28.7631, 83.7294], "polyline": [[28.5983, 83.9692], [28.6800, 84.0300], [28.7631, 83.7294]]},
        "elevationProfile": [{"km": 0, "m": 2800}, {"km": 50, "m": 3500}, {"km": 100, "m": 4200}, {"km": 130, "m": 5416}, {"km": 180, "m": 3500}, {"km": 230, "m": 2800}],
        "reviewsData": [
            {"id": "r1", "user": "maria_gonzalez", "rating": 5, "date": "2024-10-25", "helpful": 72, "images": []},
            {"id": "r2", "user": "roberto_jimenez", "rating": 5, "date": "2024-10-10", "helpful": 68, "images": []},
            {"id": "r3", "user": "elena_morales", "rating": 5, "date": "2024-09-28", "helpful": 61, "images": []}
        ]
    },
    "route_islandia": {
        "continent": "europa",
        "country": "islandia",
        "title": "Vuelta a Islandia",
        "location": "Islandia",
        "images": ["images/ruta_detalle/islandia_1.jpg", "images/ruta_detalle/islandia_2.jpg", "images/ruta_detalle/islandia_3.jpg", "images/ruta_detalle/islandia_4.jpg"],
        "duration": "10",
        "difficulty": "easy",
        "distance": 1400,
        "elevationGain": 500,
        "maxAltitude": 800,
        "priceFrom": 1500,
        "pricePerDay": 150,
        "rating": 4.6,
        "reviewsCount": 2134,
        "favorites": 2600,
        "travelers": 9100,
        "transport": ["car"],
        "features": ["hotel", "self-drive", "nature", "hot-springs"],
        "includes": ["transport", "accommodation", "insurance"],
        "coordinates": [64.1265, -21.8174],
        "itinerary": [
            {"day": 1, "distance": 150, "duration": "4h", "altitude": 200, "highlights": ["reykjavik-vik"]},
            {"day": 2, "distance": 180, "duration": "5h", "altitude": 300, "highlights": ["jokulsarlon-glacier"]},
            {"day": 3, "distance": 160, "duration": "4h", "altitude": 250, "highlights": ["egilsstadir"]},
            {"day": 4, "distance": 140, "duration": "4h", "altitude": 200, "highlights": ["myvatn-lake"]},
            {"day": 5, "distance": 170, "duration": "4h", "altitude": 150, "highlights": ["akureyri"]},
            {"day": 6, "distance": 200, "duration": "5h", "altitude": 300, "highlights": ["west-fjords"]},
            {"day": 7, "distance": 190, "duration": "5h", "altitude": 250, "highlights": ["snaefellsnes"]},
            {"day": 8, "distance": 110, "duration": "3h", "altitude": 100, "highlights": ["golden-circle"]}
        ],
        "map": {"start": [64.1265, -21.8174], "end": [64.1265, -21.8174], "polyline": [[64.1265, -21.8174], [63.5189, -19.0208], [65.6835, -18.0897], [64.1265, -21.8174]]},
        "elevationProfile": [{"km": 0, "m": 100}, {"km": 350, "m": 300}, {"km": 700, "m": 400}, {"km": 1050, "m": 350}, {"km": 1400, "m": 100}],
        "reviewsData": [
            {"id": "r1", "user": "lucia_fernandez", "rating": 5, "date": "2024-09-20", "helpful": 52, "images": []},
            {"id": "r2", "user": "andres_ponce", "rating": 4, "date": "2024-09-10", "helpful": 44, "images": []},
            {"id": "r3", "user": "valeria_cruz", "rating": 5, "date": "2024-08-25", "helpful": 38, "images": []}
        ]
    },
    "route_angkor": {
        "continent": "asia",
        "country": "camboya",
        "title": "Templos de Angkor Wat",
        "location": "Camboya",
        "images": ["images/ruta_detalle/angkor_1.jpg", "images/ruta_detalle/angkor_2.jpg", "images/ruta_detalle/angkor_3.jpg", "images/ruta_detalle/angkor_4.jpg"],
        "duration": "3",
        "difficulty": "easy",
        "distance": 80,
        "elevationGain": 100,
        "maxAltitude": 150,
        "priceFrom": 250,
        "pricePerDay": 83,
        "rating": 4.7,
        "reviewsCount": 2456,
        "favorites": 3100,
        "travelers": 11000,
        "transport": ["bicycle"],
        "features": ["hostel", "local-guide", "cultural", "temples"],
        "includes": ["guide", "bicycle", "accommodation", "permits", "some-meals"],
        "coordinates": [13.4125, 103.8667],
        "itinerary": [
            {"day": 1, "distance": 30, "duration": "6h", "altitude": 100, "highlights": ["angkor-wat", "angkor-thom", "bayon"]},
            {"day": 2, "distance": 28, "duration": "5h", "altitude": 120, "highlights": ["ta-prohm", "preah-khan", "neak-pean"]},
            {"day": 3, "distance": 22, "duration": "4h", "altitude": 150, "highlights": ["banteay-srei", "banteay-kdei"]}
        ],
        "map": {"start": [13.4125, 103.8667], "end": [13.4125, 103.8667], "polyline": [[13.4125, 103.8667], [13.4300, 103.8900], [13.4125, 103.8667]]},
        "elevationProfile": [{"km": 0, "m": 100}, {"km": 20, "m": 110}, {"km": 40, "m": 130}, {"km": 60, "m": 140}, {"km": 80, "m": 120}],
        "reviewsData": [
            {"id": "r1", "user": "sofia_vargas", "rating": 5, "date": "2024-11-18", "helpful": 65, "images": []},
            {"id": "r2", "user": "daniel_ortega", "rating": 5, "date": "2024-11-05", "helpful": 57, "images": []},
            {"id": "r3", "user": "gabriela_rojas", "rating": 4, "date": "2024-10-22", "helpful": 48, "images": []}
        ]
    },
    "route_sahara": {
        "continent": "africa",
        "country": "marruecos",
        "title": "Desierto del Sahara",
        "location": "Marruecos",
        "images": ["images/ruta_detalle/sahara_1.jpg", "images/ruta_detalle/sahara_2.jpg", "images/ruta_detalle/sahara_3.jpg", "images/ruta_detalle/sahara_4.jpg"],
        "duration": "4",
        "difficulty": "medium",
        "distance": 300,
        "elevationGain": 400,
        "maxAltitude": 900,
        "priceFrom": 400,
        "pricePerDay": 100,
        "rating": 4.5,
        "reviewsCount": 1234,
        "favorites": 1600,
        "travelers": 4800,
        "transport": ["4x4", "camel"],
        "features": ["camping", "local-guide", "cultural", "desert"],
        "includes": ["guide", "transport", "meals", "camping-gear", "camel-ride"],
        "coordinates": [31.0456, -4.0083],
        "itinerary": [
            {"day": 1, "distance": 90, "duration": "4h", "altitude": 600, "highlights": ["marrakech-ouarzazate"]},
            {"day": 2, "distance": 120, "duration": "5h", "altitude": 800, "highlights": ["valle-dades", "gargantas-todra"]},
            {"day": 3, "distance": 70, "duration": "3h+camel", "altitude": 700, "highlights": ["merzouga", "erg-chebbi"]},
            {"day": 4, "distance": 20, "duration": "2h", "altitude": 650, "highlights": ["amanecer-dunas"]}
        ],
        "map": {"start": [31.0456, -4.0083], "end": [31.0889, -4.0106], "polyline": [[31.0456, -4.0083], [31.5167, -5.9972], [31.0889, -4.0106]]},
        "elevationProfile": [{"km": 0, "m": 600}, {"km": 80, "m": 800}, {"km": 180, "m": 850}, {"km": 250, "m": 700}, {"km": 300, "m": 650}],
        "reviewsData": [
            {"id": "r1", "user": "pablo_carrillo", "rating": 5, "date": "2024-10-15", "helpful": 43, "images": []},
            {"id": "r2", "user": "monica_reyes", "rating": 4, "date": "2024-10-01", "helpful": 35, "images": []},
            {"id": "r3", "user": "javier_nunez", "rating": 5, "date": "2024-09-18", "helpful": 29, "images": []}
        ]
    },
    "route_noruega": {
        "continent": "europa",
        "country": "noruega",
        "title": "Fjordos de Noruega",
        "location": "Noruega",
        "images": ["images/ruta_detalle/noruega_1.jpg", "images/ruta_detalle/noruega_2.jpg", "images/ruta_detalle/noruega_3.jpg", "images/ruta_detalle/noruega_4.jpg"],
        "duration": "7",
        "difficulty": "easy",
        "distance": 800,
        "elevationGain": 600,
        "maxAltitude": 1200,
        "priceFrom": 1800,
        "pricePerDay": 257,
        "rating": 4.7,
        "reviewsCount": 1678,
        "favorites": 2000,
        "travelers": 6900,
        "transport": ["train", "ferry"],
        "features": ["hotel", "scenic-train", "fjords", "nature"],
        "includes": ["transport", "accommodation", "some-meals", "train-tickets"],
        "coordinates": [60.3913, 5.3221],
        "itinerary": [
            {"day": 1, "distance": 100, "duration": "3h", "altitude": 100, "highlights": ["bergen-voss"]},
            {"day": 2, "distance": 120, "duration": "4h", "altitude": 300, "highlights": ["flam-railway"]},
            {"day": 3, "distance": 90, "duration": "3h", "altitude": 200, "highlights": ["sognefjord"]},
            {"day": 4, "distance": 150, "duration": "5h", "altitude": 400, "highlights": ["geirangerfjord"]},
            {"day": 5, "distance": 130, "duration": "4h", "altitude": 500, "highlights": ["alesund"]},
            {"day": 6, "distance": 110, "duration": "4h", "altitude": 300, "highlights": ["trondheim"]},
            {"day": 7, "distance": 100, "duration": "3h", "altitude": 200, "highlights": ["regreso-bergen"]}
        ],
        "map": {"start": [60.3913, 5.3221], "end": [60.3913, 5.3221], "polyline": [[60.3913, 5.3221], [61.4672, 5.9750], [62.4722, 6.1549], [60.3913, 5.3221]]},
        "elevationProfile": [{"km": 0, "m": 100}, {"km": 200, "m": 400}, {"km": 400, "m": 600}, {"km": 600, "m": 500}, {"km": 800, "m": 200}],
        "reviewsData": [
            {"id": "r1", "user": "veronica_silva", "rating": 5, "date": "2024-08-30", "helpful": 54, "images": []},
            {"id": "r2", "user": "ricardo_blanco", "rating": 5, "date": "2024-08-15", "helpful": 46, "images": []},
            {"id": "r3", "user": "camila_rios", "rating": 4, "date": "2024-07-28", "helpful": 38, "images": []}
        ]
    },
    "route_costarica": {
        "continent": "america",
        "country": "costarica",
        "title": "Costa Rica Aventura",
        "location": "Costa Rica",
        "images": ["images/ruta_detalle/costa-rica_1.jpg", "images/ruta_detalle/costa-rica_2.jpg", "images/ruta_detalle/costa-rica_3.jpg", "images/ruta_detalle/costa-rica_4.jpg"],
        "duration": "10",
        "difficulty": "easy",
        "distance": 450,
        "elevationGain": 700,
        "maxAltitude": 1600,
        "priceFrom": 1100,
        "pricePerDay": 110,
        "rating": 4.6,
        "reviewsCount": 1923,
        "favorites": 2300,
        "travelers": 7800,
        "transport": ["bus", "boat"],
        "features": ["hostel", "hotel", "local-guide", "wildlife", "beaches"],
        "includes": ["guide", "transport", "accommodation", "some-meals", "activities"],
        "coordinates": [10.4806, -84.7218],
        "itinerary": [
            {"day": 1, "distance": 50, "duration": "2h", "altitude": 100, "highlights": ["san-jose-la-fortuna"]},
            {"day": 2, "distance": 30, "duration": "hike", "altitude": 1600, "highlights": ["volcan-arenal", "hot-springs"]},
            {"day": 3, "distance": 60, "duration": "3h", "altitude": 1400, "highlights": ["monteverde-cloud-forest"]},
            {"day": 4, "distance": 40, "duration": "hike", "altitude": 1500, "highlights": ["canopy-tour", "hanging-bridges"]},
            {"day": 5, "distance": 80, "duration": "4h", "altitude": 300, "highlights": ["manuel-antonio"]},
            {"day": 6, "distance": 20, "duration": "beach", "altitude": 50, "highlights": ["playa-manuel-antonio"]},
            {"day": 7, "distance": 70, "duration": "3h", "altitude": 100, "highlights": ["uvita-whale-watching"]},
            {"day": 8, "distance": 60, "duration": "3h", "altitude": 50, "highlights": ["corcovado-national-park"]},
            {"day": 9, "distance": 40, "duration": "2h", "altitude": 100, "highlights": ["tortuguero"]}
        ],
        "map": {"start": [10.4806, -84.7218], "end": [9.9281, -84.0907], "polyline": [[10.4806, -84.7218], [10.4677, -84.6433], [9.9281, -84.0907]]},
        "elevationProfile": [{"km": 0, "m": 100}, {"km": 100, "m": 1500}, {"km": 200, "m": 1400}, {"km": 300, "m": 400}, {"km": 450, "m": 100}],
        "reviewsData": [
            {"id": "r1", "user": "ana_torres", "rating": 5, "date": "2024-07-20", "helpful": 49, "images": []},
            {"id": "r2", "user": "luis_garcia", "rating": 5, "date": "2024-07-08", "helpful": 42, "images": []},
            {"id": "r3", "user": "sandra_martinez", "rating": 4, "date": "2024-06-25", "helpful": 36, "images": []}
        ]
    },
    "route_muralla_china": {
        "continent": "asia",
        "country": "china",
        "title": "Gran Muralla China",
        "location": "China",
        "images": ["images/ruta_detalle/muralla-china_1.jpg", "images/ruta_detalle/muralla-china_2.jpg", "images/ruta_detalle/muralla-china_3.jpg", "images/ruta_detalle/muralla-china_4.jpg"],
        "duration": "3",
        "difficulty": "medium",
        "distance": 70,
        "elevationGain": 800,
        "maxAltitude": 1000,
        "priceFrom": 350,
        "pricePerDay": 117,
        "rating": 4.5,
        "reviewsCount": 2789,
        "favorites": 3400,
        "travelers": 12300,
        "transport": ["hiking"],
        "features": ["hotel", "local-guide", "cultural", "historical"],
        "includes": ["guide", "transport", "accommodation", "meals", "permits"],
        "coordinates": [40.4319, 116.5704],
        "itinerary": [
            {"day": 1, "distance": 25, "duration": "6-7h", "altitude": 900, "highlights": ["jinshanling-section"]},
            {"day": 2, "distance": 28, "duration": "7-8h", "altitude": 1000, "highlights": ["simatai-section", "wild-wall"]},
            {"day": 3, "distance": 17, "duration": "5h", "altitude": 800, "highlights": ["mutianyu-section"]}
        ],
        "map": {"start": [40.4319, 116.5704], "end": [40.4319, 116.5704], "polyline": [[40.4319, 116.5704], [40.6500, 117.2500], [40.4319, 116.5704]]},
        "elevationProfile": [{"km": 0, "m": 700}, {"km": 20, "m": 950}, {"km": 40, "m": 1000}, {"km": 55, "m": 900}, {"km": 70, "m": 800}],
        "reviewsData": [
            {"id": "r1", "user": "carlos_mendez", "rating": 5, "date": "2024-06-10", "helpful": 71, "images": []},
            {"id": "r2", "user": "isabel_castro", "rating": 4, "date": "2024-05-28", "helpful": 63, "images": []},
            {"id": "r3", "user": "miguel_herrera", "rating": 5, "date": "2024-05-15", "helpful": 55, "images": []}
        ]
    },
    "route_ruta66": {
        "continent": "america",
        "country": "usa",
        "title": "Ruta 66 Clásica",
        "location": "Estados Unidos",
        "images": ["images/ruta_detalle/ruta66_1.jpg", "images/ruta_detalle/ruta66_2.jpg", "images/ruta_detalle/ruta66_3.jpg", "images/ruta_detalle/ruta66_4.jpg"],
        "duration": "14",
        "difficulty": "easy",
        "distance": 3940,
        "elevationGain": 1200,
        "maxAltitude": 2200,
        "priceFrom": 2000,
        "pricePerDay": 143,
        "rating": 4.4,
        "reviewsCount": 1456,
        "favorites": 1800,
        "travelers": 6200,
        "transport": ["car"],
        "features": ["hotel", "self-drive", "historic", "americana"],
        "includes": ["transport", "accommodation", "insurance"],
        "coordinates": [41.8781, -87.6298],
        "itinerary": [
            {"day": 1, "distance": 300, "duration": "6h", "altitude": 200, "highlights": ["chicago-springfield"]},
            {"day": 2, "distance": 280, "duration": "5h", "altitude": 250, "highlights": ["st-louis"]},
            {"day": 3, "distance": 320, "duration": "6h", "altitude": 300, "highlights": ["tulsa"]},
            {"day": 4, "distance": 290, "duration": "5h", "altitude": 400, "highlights": ["oklahoma-city"]},
            {"day": 5, "distance": 270, "duration": "5h", "altitude": 500, "highlights": ["amarillo"]},
            {"day": 6, "distance": 310, "duration": "6h", "altitude": 1200, "highlights": ["santa-fe"]},
            {"day": 7, "distance": 300, "duration": "6h", "altitude": 1500, "highlights": ["albuquerque"]},
            {"day": 8, "distance": 280, "duration": "5h", "altitude": 1800, "highlights": ["flagstaff"]},
            {"day": 9, "distance": 320, "duration": "6h", "altitude": 2000, "highlights": ["grand-canyon"]},
            {"day": 10, "distance": 250, "duration": "5h", "altitude": 1800, "highlights": ["williams-seligman"]},
            {"day": 11, "distance": 290, "duration": "5h", "altitude": 1200, "highlights": ["kingman-oatman"]},
            {"day": 12, "distance": 310, "duration": "6h", "altitude": 800, "highlights": ["barstow"]},
            {"day": 13, "distance": 280, "duration": "5h", "altitude": 400, "highlights": ["san-bernardino"]},
            {"day": 14, "distance": 140, "duration": "3h", "altitude": 100, "highlights": ["santa-monica-pier"]}
        ],
        "map": {"start": [41.8781, -87.6298], "end": [34.0195, -118.4912], "polyline": [[41.8781, -87.6298], [36.1699, -95.9928], [35.4676, -97.5164], [34.0195, -118.4912]]},
        "elevationProfile": [{"km": 0, "m": 200}, {"km": 1000, "m": 400}, {"km": 2000, "m": 1500}, {"km": 3000, "m": 1800}, {"km": 3940, "m": 100}],
        "reviewsData": [
            {"id": "r1", "user": "jorge_castillo", "rating": 5, "date": "2024-05-02", "helpful": 48, "images": []},
            {"id": "r2", "user": "beatriz_fuentes", "rating": 4, "date": "2024-04-18", "helpful": 39, "images": []},
            {"id": "r3", "user": "raul_sanchez", "rating": 4, "date": "2024-04-05", "helpful": 32, "images": []}
        ]
    }
};

const EMBEDDED_USER_DATA = window.EMBEDDED_USER_DATA || {
  "maria_gonzalez": { "name": "María González", "avatar": "MG" },
  "pedro_ramirez": { "name": "Pedro Ramírez", "avatar": "PR" },
  "ana_torres": { "name": "Ana Torres", "avatar": "AT" },
  "jorge_castillo": { "name": "Jorge Castillo", "avatar": "JC" },
  "lucia_fernandez": { "name": "Lucía Fernández", "avatar": "LF" },
  "carlos_mendez": { "name": "Carlos Méndez", "avatar": "CM" },
  "sofia_vargas": { "name": "Sofía Vargas", "avatar": "SV" },
  "diego_suarez": { "name": "Diego Suárez", "avatar": "DS" },
  "laura_hernandez": { "name": "Laura Hernández", "avatar": "LH" },
  "pablo_carrillo": { "name": "Pablo Carrillo", "avatar": "PC" },

  "valeria_morales": { "name": "Valeria Morales", "avatar": "VM" },
  "ricardo_rios": { "name": "Ricardo Ríos", "avatar": "RR" },
  "elena_soto": { "name": "Elena Soto", "avatar": "ES" },
  "martin_davila": { "name": "Martín Dávila", "avatar": "MD" },
  "camila_arias": { "name": "Camila Arias", "avatar": "CA" },
  "sergio_navarro": { "name": "Sergio Navarro", "avatar": "SN" },
  "irene_santos": { "name": "Irene Santos", "avatar": "IS" },
  "julian_lopez": { "name": "Julián López", "avatar": "JL" },
  "veronica_silva": { "name": "Verónica Silva", "avatar": "VS" },
  "adrian_martinez": { "name": "Adrián Martínez", "avatar": "AM" },

  "rocio_delgado": { "name": "Rocío Delgado", "avatar": "RD" },
  "fernando_castro": { "name": "Fernando Castro", "avatar": "FC" },
  "andrea_peña": { "name": "Andrea Peña", "avatar": "AP" },
  "cristian_rey": { "name": "Cristian Rey", "avatar": "CR" },
  "estefania_molina": { "name": "Estefanía Molina", "avatar": "EM" },
  "gonzalo_ortega": { "name": "Gonzalo Ortega", "avatar": "GO" },
  "natalia_benitez": { "name": "Natalia Benítez", "avatar": "NB" },
  "hector_sierra": { "name": "Héctor Sierra", "avatar": "HS" },
  "paula_montoya": { "name": "Paula Montoya", "avatar": "PM" },
  "oscar_guerrero": { "name": "Óscar Guerrero", "avatar": "OG" },

  "diana_flores": { "name": "Diana Flores", "avatar": "DF" },
  "samuel_paredes": { "name": "Samuel Paredes", "avatar": "SP" },
  "viviana_ramos": { "name": "Viviana Ramos", "avatar": "VR" },
  "marcos_quintero": { "name": "Marcos Quintero", "avatar": "MQ" },
  "carolina_medina": { "name": "Carolina Medina", "avatar": "CM" },
  "esteban_salgado": { "name": "Esteban Salgado", "avatar": "ES" },
  "rebeca_romero": { "name": "Rebeca Romero", "avatar": "RR" },
  "rodrigo_pardo": { "name": "Rodrigo Pardo", "avatar": "RP" },
  "patricia_sandoval": { "name": "Patricia Sandoval", "avatar": "PS" },
  "alejandro_rojas": { "name": "Alejandro Rojas", "avatar": "AR" },

  "miriam_cardenas": { "name": "Miriam Cárdenas", "avatar": "MC" },
  "damian_salazar": { "name": "Damián Salazar", "avatar": "DS" },
  "isabel_roldan": { "name": "Isabel Roldán", "avatar": "IR" },
  "victor_murillo": { "name": "Víctor Murillo", "avatar": "VM" },
  "noelia_campos": { "name": "Noelia Campos", "avatar": "NC" },
  "tomas_rubio": { "name": "Tomás Rubio", "avatar": "TR" },
  "araceli_fuentes": { "name": "Araceli Fuentes", "avatar": "AF" },
  "federico_baez": { "name": "Federico Báez", "avatar": "FB" },
  "soledad_gimenez": { "name": "Soledad Giménez", "avatar": "SG" },
  "hernan_vega": { "name": "Hernán Vega", "avatar": "HV" }
};

const EMBEDDED_ROUTE_I18N = window.EMBEDDED_ROUTE_I18N || {
  "route_caminoinca": {
    "title": "Camino Inca a Machu Picchu",
    "location": "Cusco, Perú",

    "descShort": "Una experiencia única recorriendo los pasos de los antiguos incas.",
    "descLong": "El Camino Inca es considerado uno de los trekkings más espectaculares del mundo...",

    "galleryAlt": "Imagen del Camino Inca",

    "highlights": {
      "h_valle_sagrado": "Paisajes del Valle Sagrado",
      "h_patallaqta": "Ruinas de Patallaqta",
      "h_warmiwanusca": "Paso Warmiwañusca (4200 m)",
      "h_runkurakay": "Ruinas de Runkurakay",
      "h_sayacmarca": "Complejo arqueológico de Sayacmarca",
      "h_phuyupatamarca": "Phuyupatamarca, 'La ciudad sobre las nubes'",
      "h_intipunku": "Puerta del Sol (Inti Punku)",
      "h_machupicchu": "Ciudadela de Machu Picchu"
    },

    "itinerary": {
      "1": {
        "title": "Día 1: Cusco - Km 82 - Wayllabamba",
        "text": "Salida temprano de Cusco hacia el km 82..."
      },
      "2": {
        "title": "Día 2: Wayllabamba - Paso Warmiwañusca - Pacaymayo",
        "text": "El día más desafiante del recorrido..."
      },
      "3": {
        "title": "Día 3: Pacaymayo - Wiñay Wayna",
        "text": "Visitamos los complejos arqueológicos..."
      },
      "4": {
        "title": "Día 4: Wiñay Wayna - Machu Picchu - Cusco",
        "text": "Salida antes del amanecer hacia Inti Punku..."
      }
    },

    "reviews": {
        "r1": "¡Experiencia increíble! El Camino Inca superó todas mis expectativas. Los paisajes son espectaculares y llegar a Machu Picchu al amanecer fue mágico. El guía era muy conocedor y el equipo de porteadores fue excelente. La comida en el camping era sorprendentemente buena. Totalmente recomendado para cualquiera con buena condición física.",
        "r2": "Una aventura inolvidable. El segundo día es bastante exigente debido a la altitud, pero vale totalmente la pena. Los sitios arqueológicos en el camino son fascinantes y menos concurridos que Machu Picchu. Recomiendo llevar bastones de trekking y tomarse tiempo para aclimatarse en Cusco antes.",
        "r3": "Excelente trek, aunque físicamente demandante. La organización fue perfecta y el equipo muy profesional. El único inconveniente fue el clima - llovió dos días, así que prepárense bien. Las tiendas y sacos de dormir eran de buena calidad. La experiencia cultural y natural es única.",
        "r4": "Mejor experiencia de viaje de mi vida. El camino es desafiante pero gratificante. Ver Machu Picchu desde Inti Punku fue un momento que nunca olvidaré. Los porteadores son verdaderos héroes - llevan todo el equipo pesado. Vale cada euro invertido.",
        "r5": "Simplemente perfecto. La combinación de naturaleza, historia y aventura es imbatible. Los campamentos están bien ubicados y la comida es abundante. El guía compartió muchas historias fascinantes sobre la cultura inca. Consejo: reserven con la mayor anticipación posible."
    }
  },
  "route_patagonia": {
    "title": "Trekking en la Patagonia",
    "location": "El Chaltén, Argentina",
    "descShort": "Explora los espectaculares paisajes de la Patagonia argentina con vistas al Fitz Roy.",
    "descLong": "El trekking en la Patagonia es una experiencia única en uno de los rincones más salvajes y hermosos de Sudamérica. Con sus imponentes montañas, glaciares y lagos cristalinos, esta región ofrece aventura pura para los amantes del senderismo.",
    "itinerary": {
      "1": {"title": "Día 1: Llegada a El Chaltén", "text": "Llegamos a El Chaltén y realizamos una caminata corta para aclimatarnos en la zona."},
      "2": {"title": "Día 2: Laguna de los Tres", "text": "Excursión a la Laguna de los Tres con vistas espectaculares del Fitz Roy."},
      "3": {"title": "Día 3: Ascenso al Fitz Roy", "text": "Desafiante ascenso que recompensa con vistas panorámicas inolvidables."},
      "4": {"title": "Día 4: Laguna Torre", "text": "Senderismo hacia Laguna Torre con vistas del Cerro Torre."},
      "5": {"title": "Día 5: Retorno", "text": "Último día de trekking antes del retorno a la civilización."}
    },
    "reviews": {
      "r1": "Absolutamente impresionante. Los paisajes del Fitz Roy son aún más espectaculares en persona. La calidad de la organización y los guías fue excelente.",
      "r2": "Una aventura que no olvidaré nunca. La patagonia tiene algo mágico. Recomiendo llevar ropa impermeable, el clima cambia constantemente.",
      "r3": "Muy buena experiencia, aunque el tercer día fue bastante exigente. Los campamentos son cómodos y la comida es abundante.",
      "r4": "Perfecto para los amantes de la naturaleza. El Fitz Roy al atardecer es uno de los espectáculos más hermosos que he visto.",
      "r5": "Vale cada paso. La patagonia es salvaje, hermosa y adictiva. Volvería sin dudarlo."
    }
  },
  "route_balcanes": {
    "title": "Ruta de los Balcanes",
    "location": "Europa del Este",
    "descShort": "Descubre la belleza de los Balcanes visitando Bosnia, Croacia, Montenegro y Albania.",
    "descLong": "La Ruta de los Balcanes te lleva a través de algunos de los países más hermosos y menos explorados de Europa. Playas, montañas y cultura milenaria en una sola aventura. Desde las calles históricas de Sarajevo hasta las playas de Dubrovnik y las montañas de Albania.",
    "itinerary": {
      "1": {"title": "Día 1: Sarajevo", "text": "Exploración de la capital bosnia con su fascinante historia y arquitectura."},
      "2": {"title": "Día 2: Mostar", "text": "Visita al famoso puente de Mostar y los bazares otomanos."},
      "3": {"title": "Día 3: Dubrovnik", "text": "La Perla del Adriático con sus murallas medievales y playas cristalinas."},
      "4": {"title": "Día 4: Kotor", "text": "Fiordo de Kotor en Montenegro, uno de los lugares más hermosos del Mediterráneo."},
      "5": {"title": "Día 5: Budva", "text": "Playas y vida nocturna en la costa montenegrina."},
      "6": {"title": "Día 6: Tirana", "text": "La vibrante capital albanesa con su mezcla de arquitectura comunista y moderna."},
      "7": {"title": "Día 7: Ohrid", "text": "El lago más antiguo de Europa con monasterios bizantinos."}
    },
    "reviews": {
      "r1": "Los Balcanes son una joya escondida. La combinación de historia, naturaleza y gastronomía es perfecta.",
      "r2": "Excelente ruta, muy bien organizada. Los alojamientos fueron cómodos y los traslados puntuales.",
      "r3": "Me encantó la diversidad de paisajes y culturas. Cada país tiene su encanto único."
    }
  },
  "route_serengeti": {
    "title": "Safari Serengeti y Ngorongoro",
    "location": "Tanzania",
    "descShort": "Observa la gran migración y los Big Five en los parques nacionales más famosos de África.",
    "descLong": "El Safari por el Serengeti y Ngorongoro es una experiencia única para los amantes de la vida salvaje. Observa leones, elefantes, rinocerontes, búfalos y leopardos en su hábitat natural. La Gran Migración de ñus es uno de los espectáculos naturales más impresionantes del planeta.",
    "itinerary": {
      "1": {"title": "Día 1: Arusha - Serengeti", "text": "Traslado desde Arusha hacia el Parque Nacional Serengeti."},
      "2": {"title": "Día 2: Valle de Seronera", "text": "Safari completo por el corazón del Serengeti con abundante vida salvaje."},
      "3": {"title": "Día 3: Gran Migración", "text": "Búsqueda de las manadas de ñus y cebras en su migración anual."},
      "4": {"title": "Día 4: Kopjes del Serengeti", "text": "Exploración de las formaciones rocosas hogar de leones y leopardos."},
      "5": {"title": "Día 5: Cráter Ngorongoro", "text": "Descenso al cráter, un ecosistema único con increíble concentración de animales."},
      "6": {"title": "Día 6: Suelo del Cráter", "text": "Último safari en el suelo del cráter antes del retorno."}
    },
    "reviews": {
      "r1": "Ver leones cazando en el Serengeti fue el momento más emocionante de mi vida. Safari increíble.",
      "r2": "El cráter Ngorongoro es simplemente espectacular. Vimos los Big Five en un solo día.",
      "r3": "Experiencia inolvidable. Los guías son muy conocedores y los lodges son de primera calidad."
    }
  },
  "route_annapurna": {
    "title": "Circuito Annapurna",
    "location": "Nepal",
    "descShort": "Uno de los trekkings más espectaculares del mundo atravesando el paso Thorong La a 5,416m.",
    "descLong": "El Circuito Annapurna es considerado uno de los mejores trekkings del mundo. Atraviesa el paso Thorong La a más de 5,400 metros de altitud y ofrece vistas espectaculares del Himalaya. La diversidad de paisajes, desde selvas subtropicales hasta desiertos de alta montaña, es impresionante.",
    "itinerary": {
      "1": {"title": "Día 1: Besisahar - Bhulbhule", "text": "Inicio del circuito en los valles subtropicales de Nepal."},
      "2": {"title": "Día 2: Jagat - Dharapani", "text": "Ascenso gradual siguiendo el río Marsyangdi."},
      "3": {"title": "Día 3: Chame", "text": "Entrada a la zona del Annapurna con las primeras vistas de los picos nevados."},
      "4": {"title": "Día 4: Upper Pisang", "text": "Vistas espectaculares del Annapurna II y III."},
      "5": {"title": "Día 5: Manang", "text": "Llegada a Manang para aclimatación en este pueblo de alta montaña."},
      "6": {"title": "Día 6: Día de Aclimatación", "text": "Día de descanso en Manang para adaptarse a la altitud."},
      "7": {"title": "Día 7: Yak Kharka", "text": "Continuación del ascenso hacia el Thorong La."},
      "8": {"title": "Día 8: Thorong La Pass", "text": "El día más desafiante: cruce del paso a 5,416 metros de altitud."},
      "9": {"title": "Día 9: Muktinath", "text": "Descenso hacia Muktinath, un importante lugar de peregrinación."},
      "10": {"title": "Día 10: Jomsom", "text": "Llegada a Jomsom completando el circuito."}
    },
    "reviews": {
      "r1": "El Annapurna es épico. El paso Thorong La fue durísimo pero las vistas desde arriba valen todo el esfuerzo.",
      "r2": "Experiencia transformadora. La cultura nepalí, las montañas y la aventura se combinan perfectamente.",
      "r3": "Físicamente muy exigente pero emocionalmente gratificante. La aclimatación es crucial."
    }
  },
  "route_islandia": {
    "title": "Vuelta a Islandia",
    "location": "Islandia",
    "descShort": "Recorre la Ring Road descubriendo cascadas, glaciares, auroras boreales y aguas termales.",
    "descLong": "La vuelta completa a Islandia por la famosa Ring Road es un viaje de naturaleza en estado puro. Desde los géiseres hasta los glaciares, pasando por playas de arena negra y auroras boreales, cada kilómetro ofrece algo nuevo y espectacular.",
    "itinerary": {
      "1": {"title": "Día 1: Reykjavik - Vik", "text": "Ruta por la costa sur con cascadas Seljalandsfoss y Skógafoss."},
      "2": {"title": "Día 2: Jökulsárlón Glacier", "text": "Laguna glaciar con icebergs flotantes, uno de los lugares más fotogénicos de Islandia."},
      "3": {"title": "Día 3: Egilsstaðir", "text": "Fiordos del este con paisajes dramáticos y pueblos pesqueros."},
      "4": {"title": "Día 4: Lago Mývatn", "text": "Área geotérmica con formaciones de lava y aguas termales naturales."},
      "5": {"title": "Día 5: Akureyri", "text": "La capital del norte con jardines botánicos y cultura vikinga."},
      "6": {"title": "Día 6: Fiordos del Oeste", "text": "La región más remota con acantilados espectaculares y fauna marina."},
      "7": {"title": "Día 7: Península Snæfellsnes", "text": "Islandia en miniatura con volcanes, playas y pueblos pintorescos."},
      "8": {"title": "Día 8: Círculo Dorado", "text": "Geysir, Gullfoss y Parque Nacional Þingvellir antes de regresar."}
    },
    "reviews": {
      "r1": "Islandia es otro planeta. La variedad de paisajes es abrumadora. Las auroras fueron la cereza del pastel.",
      "r2": "El viaje perfecto para amantes de la naturaleza. Cada día es una nueva aventura visual.",
      "r3": "Caro pero vale cada corona. Los alojamientos fueron excelentes y el coche de alquiler impecable."
    }
  },
  "route_angkor": {
    "title": "Templos de Angkor Wat",
    "location": "Camboya",
    "descShort": "Descubre los templos milenarios de Angkor en bicicleta con amanecer en Angkor Wat.",
    "descLong": "Los templos de Angkor son uno de los complejos arqueológicos más impresionantes del mundo. Recorrerlos en bicicleta te permite explorar tanto los templos principales como los ocultos en la selva, viviendo una experiencia auténtica y activa.",
    "itinerary": {
      "1": {"title": "Día 1: Angkor Wat y Angkor Thom", "text": "Amanecer en Angkor Wat seguido de exploración del complejo de Angkor Thom y el Bayon."},
      "2": {"title": "Día 2: Templos de la Selva", "text": "Ta Prohm con árboles creciendo entre ruinas, Preah Khan y Neak Pean."},
      "3": {"title": "Día 3: Banteay Srei", "text": "El templo más ornamentado de Angkor con tallas en piedra rosa."}
    },
    "reviews": {
      "r1": "Angkor Wat al amanecer es mágico. Los templos son aún más impresionantes en persona.",
      "r2": "Recorrer los templos en bicicleta fue genial. El ritmo es perfecto para disfrutar de cada detalle.",
      "r3": "Una experiencia cultural increíble. Los guías locales conocen cada historia de las ruinas."
    }
  },
  "route_sahara": {
    "title": "Desierto del Sahara",
    "location": "Marruecos",
    "descShort": "Aventura en las dunas de Erg Chebbi con noche bajo las estrellas en campamento bereber.",
    "descLong": "La experiencia del desierto del Sahara en Marruecos es inolvidable. Desde las dunas doradas de Erg Chebbi hasta la hospitalidad bereber, pasando por las gargantas del Todra y los valles del Atlas, es un viaje que combina aventura y cultura.",
    "itinerary": {
      "1": {"title": "Día 1: Marrakech - Ouarzazate", "text": "Cruce del Alto Atlas hacia la 'puerta del desierto'."},
      "2": {"title": "Día 2: Valle del Dades y Todra", "text": "Exploración de las impresionantes gargantas del Todra."},
      "3": {"title": "Día 3: Merzouga y Erg Chebbi", "text": "Paseo en camello al atardecer y noche en campamento bereber bajo las estrellas."},
      "4": {"title": "Día 4: Amanecer en las Dunas", "text": "Amanecer en las dunas antes del retorno."}
    },
    "reviews": {
      "r1": "La noche en el desierto fue mágica. El cielo estrellado es algo que nunca olvidaré.",
      "r2": "Los bereberes fueron increíbles anfitriones. La cena y música tradicional alrededor del fuego fue especial.",
      "r3": "Las dunas son impresionantes. El paseo en camello es imprescindible."
    }
  },
  "route_noruega": {
    "title": "Fjordos de Noruega",
    "location": "Noruega",
    "descShort": "Viaje en tren por los fjordos noruegos visitando Bergen, Flåm y Geirangerfjord.",
    "descLong": "Los fjordos de Noruega ofrecen algunos de los paisajes más espectaculares de Europa. Este viaje combina trenes escénicos, ferries por los fjordos y pueblos pintorescos, mostrando lo mejor de la naturaleza noruega.",
    "itinerary": {
      "1": {"title": "Día 1: Bergen - Voss", "text": "Desde la ciudad hanseática de Bergen hacia las montañas."},
      "2": {"title": "Día 2: Flåm Railway", "text": "El tren más hermoso del mundo descendiendo hacia el fiordo."},
      "3": {"title": "Día 3: Sognefjord", "text": "Crucero por el fiordo más largo y profundo de Noruega."},
      "4": {"title": "Día 4: Geirangerfjord", "text": "Patrimonio de la UNESCO con cascadas espectaculares."},
      "5": {"title": "Día 5: Ålesund", "text": "Ciudad art nouveau reconstruida después del incendio de 1904."},
      "6": {"title": "Día 6: Trondheim", "text": "Tercera ciudad de Noruega con catedral gótica."},
      "7": {"title": "Día 7: Regreso a Bergen", "text": "Vuelta a Bergen completando el circuito de los fjordos."}
    },
    "reviews": {
      "r1": "Los fjordos son espectaculares. El tren de Flåm es realmente el más hermoso que he tomado.",
      "r2": "Noruega es cara pero vale la pena. Los paisajes son de otro mundo.",
      "r3": "Perfecta combinación de naturaleza y cultura. Los pueblos son encantadores."
    }
  },
  "route_costarica": {
    "title": "Costa Rica Aventura",
    "location": "Costa Rica",
    "descShort": "Selva tropical, playas paradisíacas y vida salvaje en Monteverde, Arenal y Manuel Antonio.",
    "descLong": "Costa Rica es el paraíso de la biodiversidad. Este viaje combina volcanes activos, bosques nubosos, playas vírgenes y una increíble variedad de fauna. Desde monos aulladores hasta perezosos, tucanes y ballenas jorobadas.",
    "itinerary": {
      "1": {"title": "Día 1: San José - La Fortuna", "text": "Traslado hacia el volcán Arenal."},
      "2": {"title": "Día 2: Volcán Arenal y Aguas Termales", "text": "Caminata cerca del volcán y relax en aguas termales naturales."},
      "3": {"title": "Día 3: Monteverde Cloud Forest", "text": "Exploración del bosque nuboso con su increíble biodiversidad."},
      "4": {"title": "Día 4: Canopy Tour", "text": "Tirolesa entre las copas de los árboles y puentes colgantes."},
      "5": {"title": "Día 5: Manuel Antonio", "text": "Traslado a la costa del Pacífico."},
      "6": {"title": "Día 6: Playa Manuel Antonio", "text": "Día de playa en el parque nacional con monos y perezosos."},
      "7": {"title": "Día 7: Uvita Whale Watching", "text": "Avistamiento de ballenas jorobadas (temporada)."},
      "8": {"title": "Día 8: Corcovado National Park", "text": "Uno de los lugares con mayor biodiversidad del planeta."},
      "9": {"title": "Día 9: Tortuguero", "text": "Canales de Tortuguero explorando en kayak."}
    },
    "reviews": {
      "r1": "Costa Rica es pura vida literalmente. La cantidad de animales que vimos fue increíble.",
      "r2": "Perfecto equilibrio entre aventura y relax. Las playas son hermosas y la selva fascinante.",
      "r3": "Los guías naturalistas son excelentes. Aprendimos mucho sobre la fauna y flora."
    }
  },
  "route_muralla_china": {
    "title": "Gran Muralla China",
    "location": "China",
    "descShort": "Camina por tramos restaurados y salvajes de la Gran Muralla con vistas impresionantes.",
    "descLong": "Caminar por la Gran Muralla China es recorrer la historia. Esta ruta combina secciones restauradas y tramos salvajes menos visitados, ofreciendo una experiencia auténtica de uno de los monumentos más impresionantes del mundo.",
    "itinerary": {
      "1": {"title": "Día 1: Jinshanling", "text": "Sección restaurada pero menos turística con torres de vigilancia bien preservadas."},
      "2": {"title": "Día 2: Simatai y Muralla Salvaje", "text": "Tramo más desafiante con secciones no restauradas y vistas espectaculares."},
      "3": {"title": "Día 3: Mutianyu", "text": "Una de las secciones más hermosas con bosques circundantes."}
    },
    "reviews": {
      "r1": "La Muralla es aún más impresionante de lo que imaginaba. La sección de Jinshanling es espectacular.",
      "r2": "Caminar por la muralla salvaje es una aventura única. Las vistas son increíbles.",
      "r3": "Físicamente exigente pero vale la pena. La historia que respira cada piedra es asombrosa."
    }
  },
  "route_ruta66": {
    "title": "Ruta 66 Clásica",
    "location": "Estados Unidos",
    "descShort": "De Chicago a Los Ángeles por la madre de todas las carreteras atravesando el corazón de América.",
    "descLong": "La mítica Ruta 66 es un viaje por la América profunda. Desde los rascacielos de Chicago hasta las playas de Santa Mónica, pasando por pueblos fantasma, diners retro y paisajes icónicos del oeste americano. Es un viaje nostálgico por la cultura estadounidense.",
    "itinerary": {
      "1": {"title": "Día 1: Chicago - Springfield", "text": "Inicio en Chicago siguiendo los primeros tramos históricos."},
      "2": {"title": "Día 2: St. Louis", "text": "El famoso Gateway Arch y BBQ de Missouri."},
      "3": {"title": "Día 3: Tulsa", "text": "Oklahoma con sus museos de la Ruta 66."},
      "4": {"title": "Día 4: Oklahoma City", "text": "Capital de Oklahoma con cultura cowboy."},
      "5": {"title": "Día 5: Amarillo", "text": "El famoso Cadillac Ranch en Texas."},
      "6": {"title": "Día 6: Santa Fe", "text": "Arte y cultura en Nuevo México."},
      "7": {"title": "Día 7: Albuquerque", "text": "Desierto del sudoeste y cultura nativa americana."},
      "8": {"title": "Día 8: Flagstaff", "text": "Puerta al Gran Cañón en Arizona."},
      "9": {"title": "Día 9: Gran Cañón", "text": "Desvío imprescindible a una de las maravillas naturales del mundo."},
      "10": {"title": "Día 10: Williams - Seligman", "text": "Pueblos clásicos de la Ruta 66 perfectamente preservados."},
      "11": {"title": "Día 11: Kingman - Oatman", "text": "Pueblo fantasma con burros salvajes."},
      "12": {"title": "Día 12: Barstow", "text": "Desierto de Mojave en California."},
      "13": {"title": "Día 13: San Bernardino", "text": "Primer McDonald's original de la Ruta 66."},
      "14": {"title": "Día 14: Santa Monica Pier", "text": "Final épico en el icónico muelle del Pacífico."}
    },
    "reviews": {
      "r1": "Un viaje nostálgico por la América clásica. Los diners vintage y pueblos retro son encantadores.",
      "r2": "La libertad de la carretera es real. Cada estado tiene su personalidad única.",
      "r3": "Hacer la Ruta 66 era un sueño desde niño. Superó todas mis expectativas."
    }
  }
};

window.EMBEDDED_ROUTE_DATA = EMBEDDED_ROUTE_DATA;
window.EMBEDDED_USER_DATA = EMBEDDED_USER_DATA;
window.EMBEDDED_ROUTE_I18N = EMBEDDED_ROUTE_I18N;

let routeData = EMBEDDED_ROUTE_DATA;
let userData = EMBEDDED_USER_DATA;
let i18nRoute = EMBEDDED_ROUTE_I18N;
let currentRouteId = 'route_caminoinca';

// ============================================
// CARGAR DATOS
// ============================================
function loadData() {
  try {
    console.log('=== INICIANDO CARGA DE DATOS ===');
    routeData = EMBEDDED_ROUTE_DATA;
    userData = EMBEDDED_USER_DATA;
    i18nRoute = EMBEDDED_ROUTE_I18N;
    console.log('routeData cargado:', routeData);
    console.log('userData cargado, usuarios:', Object.keys(userData).length);
    console.log('i18nRoute cargado:', i18nRoute);
    console.log('=== DATOS CARGADOS EXITOSAMENTE ===');
    initializeApp();
  } catch (error) {
    console.error('=== ERROR CARGANDO DATOS ===', error);
    alert('Error cargando datos: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', loadData);

// ============================================
// INICIALIZAR APP
// ============================================
function initializeApp() {
  console.log('=== INICIALIZANDO APP ===');
  console.log('URL completa:', window.location.href);
  console.log('Query string:', window.location.search);
  
  const urlParams = new URLSearchParams(window.location.search);
  let routeId = urlParams.get('id');
  
  console.log('ID desde URL (raw):', routeId);
  console.log('routeData keys disponibles:', Object.keys(routeData));
  
  // Si no hay ID o no existe, usar el primero disponible
  if (!routeId || !(routeId in routeData)) {
    console.warn('ID de ruta no encontrado o inválido:', routeId);
    routeId = 'route_caminoinca';
    console.log('Usando ruta por defecto:', routeId);
  }

  currentRouteId = routeId;

  console.log('currentRouteId final:', currentRouteId);
  console.log('Título de la ruta:', routeData[currentRouteId]?.title);

  loadRouteData(currentRouteId);
  loadGallery(currentRouteId);
  loadIncludes(currentRouteId);
  loadItinerary(currentRouteId);
  initializeTabs();
  initializeGallery();
  initializeFavoriteButton(currentRouteId);
  initializeShareButtons();
  loadWeatherData();
  loadReviews(currentRouteId);
  initializeBooking();
  initializeReviewFilters();
}

// ============================================
// CARGAR DATOS DE RUTA
// ============================================
function loadRouteData(routeId) {
  console.log('>>> loadRouteData:', routeId);
  
  const route = routeData[routeId];
  const i18n = i18nRoute[routeId] || {};

  if (!route) {
    console.error(`Ruta no encontrada: ${routeId}`);
    return;
  }

  console.log('Ruta encontrada:', route);
  console.log('i18n datos:', i18n);

  // Actualizar elementos HTML
  const updateEl = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
      console.log(`✓ ${id}: ${value}`);
    } else {
      console.warn(`✗ Elemento no existe: ${id}`);
    }
  };

  updateEl('breadcrumbTitle', i18n.title || route.title || 'Ruta');
  updateEl('routeTitle', i18n.title || route.title || '');
  updateEl('routeLocation', i18n.location || route.location || '');
  updateEl('routeRating', route.rating || '0');
  updateEl('reviewsCount', (route.reviewsCount || 0).toLocaleString());
  updateEl('routeDistance', route.distance || '0');
  updateEl('routePrice', (route.priceFrom || 0).toLocaleString());
  updateEl('routeTravelers', (route.travelers || 0).toLocaleString());
  updateEl('routeFavorites', (route.favorites || 0).toLocaleString());
  updateEl('routeShortDescription', i18n.descShort || '');
  updateEl('routeDescription', i18n.descLong || '');
}

// ============================================
// CARGAR GALERÍA
// ============================================
function loadGallery(routeId) {
  console.log('>>> loadGallery:', routeId);
  
  const route = routeData[routeId];
  if (!route || !route.images) {
    console.warn('No hay imágenes para cargar');
    return;
  }

  console.log('Imágenes encontradas:', route.images);
  console.log('Primera imagen:', route.images[0]);

  const mainImage = document.getElementById('mainImage');
  const galleryContainer = document.getElementById('galleryThumbnails');

  console.log('mainImage elemento:', mainImage);
  console.log('galleryContainer elemento:', galleryContainer);

  if (mainImage && route.images.length > 0) {
    const imagePath = `./${route.images[0]}`;
    console.log('Asignando mainImage.src a:', imagePath);
    mainImage.src = imagePath;
  }

  if (galleryContainer) {
    galleryContainer.innerHTML = route.images.map((img, idx) => `
      <img src="./${img}" alt="Foto ${idx + 1}" class="thumb ${idx === 0 ? 'active' : ''}">
    `).join('');
    console.log('Galería cargada con', route.images.length, 'imágenes');
  }
}

// ============================================
// CARGAR INCLUYE
// ============================================
function loadIncludes(routeId) {
  console.log('>>> loadIncludes:', routeId);
  
  const route = routeData[routeId];
  if (!route || !route.includes) return;

  const includesGrid = document.getElementById('includesGrid');
  if (!includesGrid) return;

  const icons = {
    'guide': { icon: 'fa-person-hiking', text: 'Guía profesional' },
    'transport': { icon: 'fa-car', text: 'Transporte' },
    'meals': { icon: 'fa-utensils', text: 'Comidas' },
    'camping-gear': { icon: 'fa-tent', text: 'Equipo camping' },
    'permits': { icon: 'fa-ticket', text: 'Permisos' },
    'insurance': { icon: 'fa-shield', text: 'Seguro' }
  };

  includesGrid.innerHTML = route.includes.map(item => {
    const config = icons[item] || { icon: 'fa-check', text: item };
    return `
      <div class="include-item">
        <i class="fas ${config.icon}"></i>
        <span>${config.text}</span>
      </div>
    `;
  }).join('');
}

// ============================================
// CARGAR ITINERARIO
// ============================================
function loadItinerary(routeId) {
  console.log('>>> loadItinerary:', routeId);
  
  const route = routeData[routeId];
  const i18n = i18nRoute[routeId] || {};

  if (!route || !route.itinerary) {
    console.warn('No hay itinerario');
    return;
  }

  const container = document.getElementById('itineraryTimeline');
  if (!container) {
    console.warn('Contenedor itineraryTimeline no existe');
    return;
  }

  container.innerHTML = route.itinerary.map(day => {
    const dayData = i18n.itinerary?.[day.day] || {};
    return `
      <div class="itinerary-day">
        <div class="day-header">
          <h3>${dayData.title || `Día ${day.day}`}</h3>
          <div class="day-stats">
            <span><i class="fas fa-route"></i> ${day.distance} km</span>
            <span><i class="fas fa-clock"></i> ${day.duration}</span>
            <span><i class="fas fa-mountain"></i> ${day.altitude}m</span>
          </div>
        </div>
        <p class="day-description">${dayData.text || 'Descripción disponible'}</p>
      </div>
    `;
  }).join('');

  console.log('✓ Itinerario cargado');
}

// ============================================
// TABS
// ============================================
function initializeTabs() {
  console.log('>>> initializeTabs');
  
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  console.log('Botones encontrados:', tabBtns.length);
  console.log('Contenidos encontrados:', tabContents.length);
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      console.log('Click en tab:', targetTab);
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      } else {
        console.warn('Contenido no encontrado:', targetTab);
      }

      if (targetTab === 'map') {
        setTimeout(initializeMap, 100);
      }
    });
  });
}

// ============================================
// GALERÍA
// ============================================
function initializeGallery() {
  console.log('>>> initializeGallery');
  
  const mainImage = document.getElementById('mainImage');
  const galleryContainer = document.getElementById('galleryThumbnails');
  
  if (!galleryContainer) {
    console.warn('Galería container no existe');
    return;
  }

  const thumbnails = galleryContainer.querySelectorAll('.thumb');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  console.log('Thumbnails encontrados:', thumbnails.length);

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (mainImage) mainImage.src = thumb.src;
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  if (fullscreenBtn && mainImage) {
    fullscreenBtn.addEventListener('click', () => {
      if (mainImage.requestFullscreen) mainImage.requestFullscreen();
      else if (mainImage.webkitRequestFullscreen) mainImage.webkitRequestFullscreen();
    });
  }
}

// ============================================
// MAPA
// ============================================
let map = null;

function initializeMap() {
  console.log('>>> initializeMap');
  
  if (map) {
    map.invalidateSize();
    return;
  }

  const route = routeData[currentRouteId];
  if (!route || !route.coordinates) {
    console.warn('No hay coordenadas para el mapa');
    return;
  }

  const mapContainer = document.getElementById('routeMap');
  if (!mapContainer) {
    console.warn('Contenedor routeMap no existe');
    return;
  }

  try {
    map = L.map('routeMap').setView(route.coordinates, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18
    }).addTo(map);

    L.marker(route.coordinates).addTo(map).bindPopup(route.title);

    console.log('✓ Mapa inicializado');
    initializeElevationChart();
  } catch (e) {
    console.error('Error inicializando mapa:', e);
  }
}

// ============================================
// GRÁFICO ELEVACIÓN
// ============================================
function initializeElevationChart() {
  console.log('>>> initializeElevationChart');
  
  const ctx = document.getElementById('elevationChart');
  if (!ctx) {
    console.warn('Canvas elevationChart no existe');
    return;
  }

  const route = routeData[currentRouteId];
  const elevationData = route?.elevationProfile || [
    { km: 0, m: 2600 },
    { km: 10, m: 3000 },
    { km: 20, m: 4200 },
    { km: 30, m: 3600 },
    { km: 40, m: 2800 },
    { km: 43, m: 2430 }
  ];

  const labels = elevationData.map(d => `Km ${d.km}`);
  const data = elevationData.map(d => d.m);

  try {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Elevación (m)',
          data: data,
          fill: true,
          backgroundColor: 'rgba(37,99,235,0.2)',
          borderColor: 'rgba(37,99,235,1)',
          borderWidth: 3,
          tension: 0.4
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
    console.log('✓ Gráfico elevación inicializado');
  } catch (e) {
    console.error('Error en gráfico:', e);
  }
}

// ============================================
// CLIMA
// ============================================
function loadWeatherData() {
  console.log('>>> loadWeatherData');
  
  const weather = { temp: 18, description: "Parcialmente nublado", humidity: 65, windSpeed: 12, icon: "02d" };

  document.getElementById('temperature').textContent = weather.temp;
  document.getElementById('weatherDescription').textContent = weather.description;
  document.getElementById('humidity').textContent = weather.humidity;
  document.getElementById('windSpeed').textContent = weather.windSpeed;
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
}

// ============================================
// FAVORITOS
// ============================================
function initializeFavoriteButton(routeId) {
  console.log('>>> initializeFavoriteButton:', routeId);
  
  const favBtn = document.getElementById('addToFavBtn');
  if (!favBtn) return;

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  let isFav = favorites.includes(routeId);
  updateFavButton(favBtn, isFav);

  favBtn.addEventListener('click', () => {
    isFav = !isFav;
    if (isFav) favorites.push(routeId);
    else favorites = favorites.filter(id => id !== routeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavButton(favBtn, isFav);
  });
}

function updateFavButton(btn, active) {
  btn.innerHTML = active ? '<i class="fas fa-heart"></i> En favoritos' : '<i class="far fa-heart"></i> Guardar';
  btn.classList.toggle('active', active);
}

// ============================================
// COMPARTIR
// ============================================
function initializeShareButtons() {
  console.log('>>> initializeShareButtons');
  
  const shareContainer = document.getElementById('shareButtons');
  if (!shareContainer) return;

  shareContainer.innerHTML = `
    <button class="btn-icon" onclick="shareWhatsApp()" title="WhatsApp">
      <i class="fab fa-whatsapp"></i>
    </button>
    <button class="btn-icon" onclick="shareFacebook()" title="Facebook">
      <i class="fab fa-facebook"></i>
    </button>
    <button class="btn-icon" onclick="shareTwitter()" title="Twitter">
      <i class="fab fa-twitter"></i>
    </button>
    <button class="btn-icon" onclick="copyLink()" title="Copiar">
      <i class="fas fa-link"></i>
    </button>
  `;
}

function shareWhatsApp() {
  const url = window.location.href;
  const title = document.getElementById('routeTitle')?.textContent || 'Mi ruta';
  window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
}

function shareFacebook() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
}

function shareTwitter() {
  const title = document.getElementById('routeTitle')?.textContent || 'Mi ruta';
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => alert('¡Enlace copiado!'));
}

// ============================================
// RESEÑAS
// ============================================
function generateStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
    else if (i < rating) stars += '<i class="fas fa-star-half-alt"></i>';
    else stars += '<i class="far fa-star"></i>';
  }
  return stars;
}

function markHelpful(id) {
  alert('Gracias por tu feedback');
}

function loadReviews(routeId) {
  console.log('>>> loadReviews:', routeId);
  
  const reviewsList = document.getElementById('reviewsList');
  if (!reviewsList) {
    console.warn('reviewsList no existe');
    return;
  }

  const route = routeData[routeId];
  if (!route || !route.reviewsData) {
    reviewsList.innerHTML = '<p>Sin reseñas</p>';
    return;
  }

  const reviews = route.reviewsData.map(r => {
    const user = userData[r.user] || { name: 'Anónimo', avatar: '?' };
    const text = i18nRoute[routeId]?.reviews?.[r.id] || 'Sin descripción';
    return { ...r, author: user.name, avatar: user.avatar, text };
  });

  reviewsList.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${r.avatar}</div>
          <div class="reviewer-name">${r.author}</div>
          <div class="review-date">${r.date}</div>
        </div>
        <div class="review-rating">${generateStars(r.rating)}</div>
      </div>
      <div class="review-text">${r.text}</div>
      <div class="review-helpful">
        ${r.helpful || 0} útil - <button onclick="markHelpful('${r.id}')">👍</button>
      </div>
    </div>
  `).join('');

  console.log('✓ Reseñas cargadas:', reviews.length);
}

// ============================================
// RESERVA Y FILTROS
// ============================================
function initializeBooking() {
  console.log('>>> initializeBooking');
  
  const bookBtn = document.getElementById('bookNowBtn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      alert('Reserva próximamente');
    });
  }
}

function initializeReviewFilters() {
  console.log('>>> initializeReviewFilters');
}

console.log('Script detalle-ruta.js cargado');
