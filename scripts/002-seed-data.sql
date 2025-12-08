-- Script de données initiales pour PharmaShop

-- Insertion des catégories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Bien-être', 'bien-etre', 'Produits de bien-être et relaxation', 1),
  ('Beauté & Hygiène', 'beaute-hygiene', 'Soins du corps et hygiène quotidienne', 2),
  ('Prévention', 'prevention', 'Vitamines, compléments et prévention santé', 3),
  ('Nutrition', 'nutrition', 'Compléments alimentaires et nutrition sportive', 4),
  ('Sport', 'sport', 'Produits pour sportifs et récupération', 5),
  ('Bébé & Maman', 'bebe-maman', 'Soins pour bébé et futures mamans', 6),
  ('Solaire', 'solaire', 'Protection solaire et après-soleil', 7),
  ('Bio', 'bio', 'Produits biologiques et naturels', 8),
  ('Médical', 'medical', 'Équipements et dispositifs médicaux', 9),
  ('Orthopédie', 'orthopedie', 'Produits orthopédiques et maintien', 10)
ON CONFLICT (slug) DO NOTHING;

-- Insertion des marques
INSERT INTO brands (name, slug, description) VALUES
  ('Bioderma', 'bioderma', 'Spécialiste des soins dermatologiques'),
  ('Avène', 'avene', 'Eau thermale et soins apaisants'),
  ('La Roche-Posay', 'la-roche-posay', 'Dermocosmétique recommandée par les dermatologues'),
  ('Nuxe', 'nuxe', 'Soins naturels et sensoriels'),
  ('Vichy', 'vichy', 'Santé et beauté de la peau'),
  ('Weleda', 'weleda', 'Cosmétique naturelle et biodynamique'),
  ('Mustela', 'mustela', 'Soins pour bébé et maman'),
  ('Arkopharma', 'arkopharma', 'Phytothérapie et santé naturelle'),
  ('Pileje', 'pileje', 'Micronutrition et compléments alimentaires'),
  ('Sanofi', 'sanofi', 'Laboratoire pharmaceutique'),
  ('Pierre Fabre', 'pierre-fabre', 'Santé et cosmétique'),
  ('Uriage', 'uriage', 'Soins thermaux')
ON CONFLICT (slug) DO NOTHING;

-- Updated products with real placeholder images instead of generic ones
INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count) 
SELECT 
  'Crème Hydratante Sensibio', 
  'creme-hydratante-sensibio',
  'Crème hydratante pour peaux sensibles. Formule légère et apaisante adaptée aux peaux réactives.',
  'Hydratation quotidienne peaux sensibles',
  15.90,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  50,
  true,
  false,
  4.5,
  128
FROM categories c, brands b
WHERE c.slug = 'beaute-hygiene' AND b.slug = 'bioderma'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Eau Thermale Spray 300ml',
  'eau-thermale-spray-300ml',
  'Eau thermale apaisante en spray. Calme et rafraîchit les peaux sensibles.',
  'Spray apaisant eau thermale',
  8.50,
  10.90,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  120,
  true,
  false,
  4.7,
  256
FROM categories c, brands b
WHERE c.slug = 'beaute-hygiene' AND b.slug = 'avene'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Huile Prodigieuse 100ml',
  'huile-prodigieuse-100ml',
  'Huile sèche multi-usage pour visage, corps et cheveux. Nourrit et sublime la peau.',
  'Huile sèche multi-usage',
  29.90,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  45,
  true,
  false,
  4.8,
  312
FROM categories c, brands b
WHERE c.slug = 'beaute-hygiene' AND b.slug = 'nuxe'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Lait Corporel Bébé 500ml',
  'lait-corporel-bebe-500ml',
  'Lait hydratant pour la peau délicate de bébé. Sans parfum, hypoallergénique.',
  'Hydratation douce pour bébé',
  12.50,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  80,
  false,
  true,
  4.6,
  89
FROM categories c, brands b
WHERE c.slug = 'bebe-maman' AND b.slug = 'mustela'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Magnésium Marin 90 gélules',
  'magnesium-marin-90-gelules',
  'Complément alimentaire au magnésium marin. Contribue à réduire la fatigue.',
  'Anti-fatigue magnésium marin',
  14.90,
  18.90,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  200,
  true,
  false,
  4.4,
  156
FROM categories c, brands b
WHERE c.slug = 'prevention' AND b.slug = 'arkopharma'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Anthelios Spray SPF50+ 200ml',
  'anthelios-spray-spf50-200ml',
  'Protection solaire très haute en spray. Résistant à l''eau, adapté aux peaux sensibles.',
  'Protection solaire SPF50+',
  22.90,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  65,
  true,
  true,
  4.7,
  198
FROM categories c, brands b
WHERE c.slug = 'solaire' AND b.slug = 'la-roche-posay'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Huile Essentielle Lavande Bio 10ml',
  'huile-essentielle-lavande-bio',
  'Huile essentielle de lavande vraie biologique. Favorise la relaxation et le sommeil.',
  'Relaxation et bien-être',
  9.90,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  150,
  false,
  false,
  4.5,
  87
FROM categories c, brands b
WHERE c.slug = 'bien-etre' AND b.slug = 'weleda'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Probiotiques Lactibiane 30 gélules',
  'probiotiques-lactibiane-30',
  'Probiotiques pour l''équilibre de la flore intestinale. Souches microbiotiques sélectionnées.',
  'Équilibre flore intestinale',
  24.90,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  90,
  true,
  false,
  4.6,
  142
FROM categories c, brands b
WHERE c.slug = 'nutrition' AND b.slug = 'pileje'
ON CONFLICT (slug) DO NOTHING;

-- Additional products with images
INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Sérum Minéral 89 50ml',
  'serum-mineral-89-50ml',
  'Sérum fortifiant et repulpant à l''acide hyaluronique. Hydrate et renforce la peau.',
  'Sérum booster hydratation',
  22.50,
  29.90,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  75,
  true,
  true,
  4.8,
  234
FROM categories c, brands b
WHERE c.slug = 'beaute-hygiene' AND b.slug = 'vichy'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Crème Réparatrice Cica-Crème',
  'creme-reparatrice-cica',
  'Crème réparatrice apaisante pour les peaux irritées et abîmées. Action cicatrisante.',
  'Réparation peaux abîmées',
  11.90,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  95,
  false,
  false,
  4.5,
  167
FROM categories c, brands b
WHERE c.slug = 'beaute-hygiene' AND b.slug = 'uriage'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Doliprane 1000mg 8 comprimés',
  'doliprane-1000mg-8-comprimes',
  'Paracétamol 1000mg pour le traitement de la douleur et de la fièvre chez l''adulte.',
  'Antidouleur et antipyrétique',
  2.90,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  500,
  false,
  false,
  4.3,
  89
FROM categories c, brands b
WHERE c.slug = 'medical' AND b.slug = 'sanofi'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, original_price, image_url, category_id, brand_id, stock_quantity, is_featured, is_new, rating, review_count)
SELECT
  'Gel Désinfectant Mains 100ml',
  'gel-desinfectant-mains-100ml',
  'Gel hydroalcoolique pour l''hygiène des mains. Élimine 99.9% des bactéries.',
  'Désinfection des mains',
  4.50,
  5.90,
  '/placeholder.svg?height=300&width=300',
  c.id,
  b.id,
  300,
  false,
  false,
  4.4,
  203
FROM categories c, brands b
WHERE c.slug = 'prevention' AND b.slug = 'pierre-fabre'
ON CONFLICT (slug) DO NOTHING;
