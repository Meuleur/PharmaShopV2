export interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  description: string
  composition: string
  usage: string
  warnings: string
  stock: number
  tags: string[]
  relatedProducts?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "bien-etre",
    name: "Bien-être",
    slug: "bien-etre",
    description: "Produits pour votre bien-être quotidien",
    image: "/placeholder.svg",
    productCount: 156
  },
  {
    id: "beaute-hygiene",
    name: "Beauté & Hygiène",
    slug: "beaute-hygiene",
    description: "Soins du corps et du visage",
    image: "/placeholder.svg",
    productCount: 243
  },
  {
    id: "prevention",
    name: "Prévention",
    slug: "prevention",
    description: "Prévention et protection santé",
    image: "/placeholder.svg",
    productCount: 89
  },
  {
    id: "nutrition",
    name: "Nutrition",
    slug: "nutrition",
    description: "Compléments alimentaires",
    image: "/placeholder.svg",
    productCount: 178
  },
  {
    id: "sport",
    name: "Sport",
    slug: "sport",
    description: "Nutrition sportive",
    image: "/placeholder.svg",
    productCount: 67
  },
  {
    id: "bebe-maman",
    name: "Bébé & Maman",
    slug: "bebe-maman",
    description: "Soins pour bébé et maman",
    image: "/placeholder.svg",
    productCount: 134
  },
  {
    id: "solaire",
    name: "Solaire",
    slug: "solaire",
    description: "Protection solaire",
    image: "/placeholder.svg",
    productCount: 45
  },
  {
    id: "medical",
    name: "Fournitures médicales",
    slug: "medical",
    description: "Matériel médical",
    image: "/placeholder.svg",
    productCount: 92
  }
]

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Vitamine C 1000mg - 30 comprimés",
    brand: "Arkopharma",
    category: "nutrition",
    price: 12.99,
    originalPrice: 16.99,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 234,
    description: "Complément alimentaire à base de vitamine C pour renforcer vos défenses naturelles. Formule hautement dosée pour une efficacité optimale.",
    composition: "Vitamine C (acide L-ascorbique) 1000mg, Agent de charge (cellulose microcristalline), Anti-agglomérants (stéarate de magnésium, dioxyde de silicium)",
    usage: "1 comprimé par jour, à prendre le matin avec un grand verre d'eau. Cure de 30 jours.",
    warnings: "Ne pas dépasser la dose journalière recommandée. Tenir hors de portée des enfants. Ne se substitue pas à une alimentation variée.",
    stock: 45,
    tags: ["vitamine", "immunité", "bio", "nouveauté"],
    relatedProducts: ["prod-2", "prod-5", "prod-8"]
  },
  {
    id: "prod-2",
    name: "Crème Hydratante Visage SPF30 - 50ml",
    brand: "Avène",
    category: "beaute-hygiene",
    price: 18.50,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 456,
    description: "Crème hydratante haute protection pour peaux sensibles. Texture légère non grasse avec protection UV.",
    composition: "Eau thermale Avène, Filtres UV organiques, Glycérine, Beurre de karité",
    usage: "Appliquer matin et soir sur visage et cou nettoyés. Renouveler l'application toutes les 2h en cas d'exposition solaire.",
    warnings: "Éviter le contour des yeux. En cas d'irritation, cesser l'utilisation.",
    stock: 28,
    tags: ["bio", "peaux-sensibles", "solaire"],
    relatedProducts: ["prod-1", "prod-7", "prod-12"]
  },
  {
    id: "prod-3",
    name: "Spray Nasal Décongestionnant - 15ml",
    brand: "Otrivin",
    category: "prevention",
    price: 8.99,
    originalPrice: 11.50,
    image: "/placeholder.svg",
    rating: 4.2,
    reviews: 187,
    description: "Spray nasal pour décongestionner rapidement le nez en cas de rhume ou rhinite.",
    composition: "Xylométazoline 0.1%, Eau purifiée, Chlorure de sodium",
    usage: "1 pulvérisation dans chaque narine, 2 à 3 fois par jour. Ne pas utiliser plus de 7 jours consécutifs.",
    warnings: "Déconseillé aux enfants de moins de 6 ans. Ne pas utiliser en cas d'hypertension.",
    stock: 67,
    tags: ["rhume", "hiver"],
    relatedProducts: ["prod-4", "prod-6"]
  },
  {
    id: "prod-4",
    name: "Pansements Stériles Assortis - Boîte de 100",
    brand: "Steroplast",
    category: "medical",
    price: 9.99,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 312,
    description: "Boîte de pansements stériles hypoallergéniques, différentes tailles pour toutes les blessures du quotidien.",
    composition: "Support en tissu non-tissé, Compresse absorbante, Adhésif hypoallergénique",
    usage: "Nettoyer et sécher la plaie. Appliquer le pansement en évitant de toucher la compresse. Changer quotidiennement.",
    warnings: "Usage externe uniquement. Consulter un médecin si la plaie ne guérit pas.",
    stock: 156,
    tags: ["premiers-soins", "famille"],
    relatedProducts: ["prod-9", "prod-11"]
  },
  {
    id: "prod-5",
    name: "Gel Nettoyant Doux - 200ml",
    brand: "Cetaphil",
    category: "beaute-hygiene",
    price: 14.99,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 523,
    description: "Gel nettoyant visage et corps pour peaux sensibles. Formule douce sans savon.",
    composition: "Aqua, Glycérine, Coco-glucoside, Panthenol, Allantoïne",
    usage: "Appliquer sur peau humide, masser délicatement et rincer à l'eau tiède. Matin et soir.",
    warnings: "Éviter le contact avec les yeux. En cas de contact, rincer abondamment.",
    stock: 89,
    tags: ["bio", "peaux-sensibles", "hypoallergénique"],
    relatedProducts: ["prod-2", "prod-7"]
  },
  {
    id: "prod-6",
    name: "Sirop Toux Sèche - 150ml",
    brand: "Pholcodine",
    category: "prevention",
    price: 7.50,
    originalPrice: 9.99,
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 198,
    description: "Sirop pour calmer les toux sèches irritatives. Action rapide et durable.",
    composition: "Pholcodine 5mg/5ml, Saccharose, Arôme naturel de fraise",
    usage: "Adultes: 2 cuillères à café, 3 fois par jour. Enfants +6 ans: 1 cuillère à café, 3 fois par jour.",
    warnings: "Ne pas conduire après la prise. Peut provoquer de la somnolence.",
    stock: 43,
    tags: ["hiver", "toux"],
    relatedProducts: ["prod-3", "prod-10"]
  },
  {
    id: "prod-7",
    name: "Lait Corps Réparateur - 400ml",
    brand: "Eucerin",
    category: "beaute-hygiene",
    price: 16.90,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 678,
    description: "Lait corporel intensément nourrissant pour peaux très sèches. Absorption rapide.",
    composition: "Aqua, Glycérine, Urée 5%, Céramides, Beurre de karité",
    usage: "Appliquer généreusement sur peau propre et sèche, une à deux fois par jour.",
    warnings: "Usage externe. Éviter les muqueuses.",
    stock: 72,
    tags: ["bio", "peaux-sèches", "best-seller"],
    relatedProducts: ["prod-2", "prod-5"]
  },
  {
    id: "prod-8",
    name: "Magnésium + Vitamine B6 - 60 gélules",
    brand: "Arkopharma",
    category: "nutrition",
    price: 11.50,
    originalPrice: 14.90,
    image: "/placeholder.svg",
    rating: 4.4,
    reviews: 289,
    description: "Complément alimentaire pour réduire la fatigue et favoriser le fonctionnement normal du système nerveux.",
    composition: "Magnésium (oxyde de magnésium) 300mg, Vitamine B6 1.4mg",
    usage: "2 gélules par jour avec un grand verre d'eau, de préférence le matin.",
    warnings: "Déconseillé aux enfants et femmes enceintes sans avis médical.",
    stock: 134,
    tags: ["stress", "fatigue", "nouveauté"],
    relatedProducts: ["prod-1", "prod-13"]
  },
  {
    id: "prod-9",
    name: "Thermomètre Digital Sans Contact",
    brand: "Braun",
    category: "medical",
    price: 49.99,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 445,
    description: "Thermomètre infrarouge sans contact, mesure en 1 seconde. Précision médicale.",
    composition: "Dispositif médical électronique avec capteur infrarouge",
    usage: "Pointer vers le front à 3-5cm de distance. Appuyer sur le bouton. Lecture instantanée.",
    warnings: "Lire la notice avant utilisation. Conserver à température ambiante.",
    stock: 23,
    tags: ["medical", "famille", "high-tech"],
    relatedProducts: ["prod-4", "prod-11"]
  },
  {
    id: "prod-10",
    name: "Pastilles Gorge Miel-Citron - 24 pastilles",
    brand: "Strepsils",
    category: "prevention",
    price: 6.50,
    image: "/placeholder.svg",
    rating: 4.1,
    reviews: 156,
    description: "Pastilles adoucissantes pour le mal de gorge. Goût miel-citron agréable.",
    composition: "Dichlorobenzyl alcool 1.2mg, Amylmétacrésol 0.6mg, Miel, Arôme citron",
    usage: "Laisser fondre lentement dans la bouche. 1 pastille toutes les 2-3 heures, max 12/jour.",
    warnings: "Déconseillé aux enfants de moins de 6 ans.",
    stock: 198,
    tags: ["hiver", "gorge"],
    relatedProducts: ["prod-3", "prod-6"]
  },
  {
    id: "prod-11",
    name: "Compresses Stériles 10x10cm - 50 unités",
    brand: "Mercurochrome",
    category: "medical",
    price: 8.90,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 267,
    description: "Compresses de gaze stériles pour soins des plaies. Grande absorption.",
    composition: "Gaze de coton 100% hydrophile, stérilisée",
    usage: "Nettoyer la plaie avec une compresse imbibée de sérum physiologique. Changer régulièrement.",
    warnings: "Usage unique. Ne pas réutiliser.",
    stock: 245,
    tags: ["premiers-soins", "medical"],
    relatedProducts: ["prod-4", "prod-9"]
  },
  {
    id: "prod-12",
    name: "Crème Solaire SPF50+ Enfant - 150ml",
    brand: "Bioderma",
    category: "solaire",
    price: 22.90,
    originalPrice: 27.50,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 534,
    description: "Protection solaire très haute pour enfants. Résistante à l'eau et au sable.",
    composition: "Filtres UVA/UVB, Vitamine E, Sans parfum, Sans parabène",
    usage: "Appliquer généreusement 20 minutes avant exposition. Renouveler toutes les 2h et après baignade.",
    warnings: "Éviter exposition solaire entre 12h-16h. Protéger avec chapeau et lunettes.",
    stock: 67,
    tags: ["solaire", "enfant", "bio", "best-seller"],
    relatedProducts: ["prod-2", "prod-7"]
  },
  {
    id: "prod-13",
    name: "Oméga 3 Huile de Poisson - 90 capsules",
    brand: "Solgar",
    category: "nutrition",
    price: 24.90,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 412,
    description: "Complément alimentaire riche en EPA et DHA pour le cœur et le cerveau.",
    composition: "Huile de poisson 1000mg (EPA 180mg, DHA 120mg), Vitamine E",
    usage: "1 à 3 capsules par jour avec les repas.",
    warnings: "Déconseillé en cas d'allergie au poisson. Consulter un médecin si traitement anticoagulant.",
    stock: 56,
    tags: ["cardio", "cerveau", "premium"],
    relatedProducts: ["prod-1", "prod-8"]
  },
  {
    id: "prod-14",
    name: "Collyre Yeux Secs - 10ml",
    brand: "Systane",
    category: "prevention",
    price: 13.50,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 298,
    description: "Gouttes oculaires pour hydrater et apaiser les yeux secs. Longue durée.",
    composition: "Polyéthylène glycol 400, Propylène glycol, Hydroxypropyl guar",
    usage: "1 à 2 gouttes dans chaque œil, 2 à 4 fois par jour selon besoin.",
    warnings: "Ne pas toucher l'œil avec l'embout. Jeter 28 jours après ouverture.",
    stock: 89,
    tags: ["yeux", "écrans"],
    relatedProducts: ["prod-15"]
  },
  {
    id: "prod-15",
    name: "Spray Buccal Haleine Fraîche - 15ml",
    brand: "CB12",
    category: "beaute-hygiene",
    price: 9.90,
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 178,
    description: "Spray pour une haleine fraîche instantanée. Neutralise les odeurs.",
    composition: "Zinc, Fluor, Menthol, Chlorhexidine",
    usage: "1 pulvérisation dans la bouche après les repas. Ne pas avaler immédiatement.",
    warnings: "Ne remplace pas le brossage des dents.",
    stock: 134,
    tags: ["hygiène", "pratique"],
    relatedProducts: ["prod-5"]
  },
  {
    id: "prod-16",
    name: "Crème Anti-Âge Nuit - 50ml",
    brand: "Vichy",
    category: "beaute-hygiene",
    price: 32.90,
    originalPrice: 39.90,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 623,
    description: "Soin de nuit régénérant anti-rides. Action sur les signes de l'âge.",
    composition: "Rétinol pur, Acide hyaluronique, Eau thermale Vichy, Vitamine C",
    usage: "Appliquer le soir sur visage et cou nettoyés. Éviter le contour des yeux.",
    warnings: "Peut augmenter la sensibilité au soleil. Appliquer protection SPF le matin.",
    stock: 45,
    tags: ["anti-âge", "premium", "best-seller"],
    relatedProducts: ["prod-2", "prod-7"]
  },
  {
    id: "prod-17",
    name: "Probiotiques 10 Milliards UFC - 30 gélules",
    brand: "Lactibiane",
    category: "nutrition",
    price: 19.90,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 387,
    description: "Ferments lactiques pour l'équilibre de la flore intestinale.",
    composition: "4 souches de ferments lactiques, 10 milliards UFC, FOS",
    usage: "1 gélule par jour le matin à jeun avec un verre d'eau. Cure de 30 jours.",
    warnings: "Conserver au frais après ouverture.",
    stock: 78,
    tags: ["digestion", "immunité"],
    relatedProducts: ["prod-1", "prod-8"]
  },
  {
    id: "prod-18",
    name: "Baume Lèvres Réparateur - 15ml",
    brand: "La Roche-Posay",
    category: "beaute-hygiene",
    price: 7.90,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 789,
    description: "Stick lèvres ultra-nourrissant pour lèvres sèches et gercées.",
    composition: "Beurre de karité 10%, MP-Lipides, Eau thermale",
    usage: "Appliquer aussi souvent que nécessaire sur les lèvres.",
    warnings: "Usage externe uniquement.",
    stock: 234,
    tags: ["lèvres", "hiver", "best-seller"],
    relatedProducts: ["prod-2", "prod-5"]
  },
  {
    id: "prod-19",
    name: "Masque Visage Purifiant Argile - 75ml",
    brand: "Cattier",
    category: "beaute-hygiene",
    price: 11.50,
    originalPrice: 13.90,
    image: "/placeholder.svg",
    rating: 4.4,
    reviews: 267,
    description: "Masque à l'argile verte pour purifier et matifier les peaux grasses.",
    composition: "Argile verte 35%, Huile essentielle de romarin bio, Aloe vera",
    usage: "Appliquer en couche épaisse sur visage nettoyé. Laisser poser 10 min. Rincer à l'eau tiède. 1 à 2 fois par semaine.",
    warnings: "Éviter le contour des yeux et des lèvres.",
    stock: 67,
    tags: ["bio", "peaux-grasses", "masque"],
    relatedProducts: ["prod-5", "prod-7"]
  },
  {
    id: "prod-20",
    name: "Tisane Sommeil Bio - 20 sachets",
    brand: "Pukka",
    category: "bien-etre",
    price: 5.90,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 456,
    description: "Infusion relaxante à base de plantes bio pour favoriser l'endormissement.",
    composition: "Valériane, Camomille, Lavande, Fleur d'oranger (100% bio)",
    usage: "Infuser 1 sachet dans 250ml d'eau frémissante pendant 5 minutes. Boire 30 minutes avant le coucher.",
    warnings: "Déconseillé aux femmes enceintes. Peut provoquer de la somnolence.",
    stock: 156,
    tags: ["bio", "sommeil", "tisane"],
    relatedProducts: ["prod-21"]
  },
  {
    id: "prod-21",
    name: "Huile Essentielle Lavande Bio - 10ml",
    brand: "Pranarôm",
    category: "bien-etre",
    price: 8.50,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 334,
    description: "Huile essentielle 100% pure et naturelle. Relaxante et apaisante.",
    composition: "Lavandula angustifolia 100% pure",
    usage: "Diffusion: 5 gouttes dans diffuseur. Application cutanée: diluée dans huile végétale.",
    warnings: "Déconseillé aux femmes enceintes et enfants -6 ans. Ne pas ingérer pure.",
    stock: 98,
    tags: ["bio", "aromathérapie", "stress"],
    relatedProducts: ["prod-20"]
  },
  {
    id: "prod-22",
    name: "Shampoing Cheveux Gras - 250ml",
    brand: "Klorane",
    category: "beaute-hygiene",
    price: 9.90,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 289,
    description: "Shampoing purifiant à l'ortie pour cheveux à tendance grasse.",
    composition: "Extrait d'ortie bio, Base lavante douce",
    usage: "Appliquer sur cheveux mouillés, masser, laisser agir 2 minutes, rincer. Usage fréquent.",
    warnings: "Éviter le contact avec les yeux.",
    stock: 123,
    tags: ["cheveux", "bio"],
    relatedProducts: ["prod-23"]
  },
  {
    id: "prod-23",
    name: "Après-Shampoing Démêlant - 200ml",
    brand: "Klorane",
    category: "beaute-hygiene",
    price: 10.50,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 312,
    description: "Après-shampoing démêlant au beurre de mangue. Cheveux doux et brillants.",
    composition: "Beurre de mangue, Agents conditionneurs",
    usage: "Après le shampoing, appliquer sur longueurs et pointes. Laisser agir 2 minutes. Rincer.",
    warnings: "Usage externe uniquement.",
    stock: 145,
    tags: ["cheveux", "démêlant"],
    relatedProducts: ["prod-22"]
  },
  {
    id: "prod-24",
    name: "Sérum Vitamine C - 30ml",
    brand: "Caudalie",
    category: "beaute-hygiene",
    price: 39.90,
    originalPrice: 49.90,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 892,
    description: "Sérum éclat anti-taches à la vitamine C stabilisée. Teint lumineux.",
    composition: "Vitamine C stabilisée 10%, Acide hyaluronique, Polyphénols de raisin",
    usage: "Appliquer 3-4 gouttes matin et/ou soir sur visage et cou avant la crème.",
    warnings: "Conserver à l'abri de la lumière. Peut picoter légèrement.",
    stock: 34,
    tags: ["premium", "anti-taches", "éclat", "best-seller"],
    relatedProducts: ["prod-16", "prod-2"]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return products
  return products.filter(p => p.category === categorySlug)
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter(p => p.tags.includes(tag))
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  )
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product || !product.relatedProducts) return []
  return product.relatedProducts
    .map(id => getProductById(id))
    .filter(Boolean) as Product[]
}

export function getPromotionProducts(): Product[] {
  return products.filter(p => p.originalPrice && p.originalPrice > p.price)
}
