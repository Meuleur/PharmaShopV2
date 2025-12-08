"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase, type Product, type Category, type Brand } from "@/lib/supabase"
import { Sliders, X, ChevronDown, Filter, Tag, ChevronRight, Stethoscope } from "lucide-react"
import Link from "next/link"

function CatalogContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [tempPriceRange, setTempPriceRange] = useState([0, 100])

  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [selectedMedicalEquipment, setSelectedMedicalEquipment] = useState<string[]>([])

  const medicalEquipmentCategories = [
    'orthopedie',
    'podologie',
    'contention',
    'oncologie',
    'incontinence',
    'maintien-domicile',
    'consommables-medicaux',
    'post-operatoire',
    'droguerie-preparatoire'
  ]

  useEffect(() => {
    async function fetchData() {
      const [categoriesRes, brandsRes] = await Promise.all([
        supabase.from('categories').select('*').order('display_order'),
        supabase.from('brands').select('*').order('name')
      ])

      if (categoriesRes.data) setCategories(categoriesRes.data)
      if (brandsRes.data) setBrands(brandsRes.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPriceRange(tempPriceRange)
    }, 500)

    return () => clearTimeout(timer)
  }, [tempPriceRange])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            category:categories(*)
          `)
          .gte('price', priceRange[0])
          .lte('price', priceRange[1])

        if (selectedCategories.length > 0 || selectedMedicalEquipment.length > 0) {
          const allSelectedSlugs = [...selectedCategories, ...selectedMedicalEquipment]
          const categoryIds = categories
            .filter(c => allSelectedSlugs.includes(c.slug))
            .map(c => c.id)
          if (categoryIds.length > 0) {
            query = query.in('category_id', categoryIds)
          }
        }

        if (selectedBrands.length > 0) {
          const brandIds = brands
            .filter(b => selectedBrands.includes(b.slug))
            .map(b => b.id)
          query = query.in('brand_id', brandIds)
        }

        if (minRating) {
          query = query.gte('rating', minRating)
        }

        if (showNewOnly) {
          query = query.eq('is_new', true)
        }

        if (showInStockOnly) {
          query = query.gt('stock_quantity', 0)
        }

        switch (sortBy) {
          case 'price-low':
            query = query.order('price', { ascending: true })
            break
          case 'price-high':
            query = query.order('price', { ascending: false })
            break
          case 'newest':
            query = query.order('created_at', { ascending: false })
            break
          case 'rating':
            query = query.order('rating', { ascending: false })
            break
          default:
            query = query.order('is_featured', { ascending: false })
            query = query.order('review_count', { ascending: false })
        }

        const { data, error } = await query

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categories.length > 0 || selectedCategories.length === 0) {
      fetchProducts()
    }
  }, [sortBy, selectedCategories, selectedMedicalEquipment, selectedBrands, priceRange, minRating, showNewOnly, showInStockOnly, categories, brands])

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    selectedMedicalEquipment.length +
    (minRating ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 100 ? 1 : 0) +
    (showNewOnly ? 1 : 0) +
    (showInStockOnly ? 1 : 0)

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedMedicalEquipment([])
    setMinRating(null)
    setPriceRange([0, 100])
    setShowNewOnly(false)
    setShowInStockOnly(false)
  }

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    )
  }

  const toggleBrand = (slug: string) => {
    setSelectedBrands(prev =>
      prev.includes(slug)
        ? prev.filter(b => b !== slug)
        : [...prev, slug]
    )
  }

  const toggleMedicalEquipment = (slug: string) => {
    setSelectedMedicalEquipment(prev =>
      prev.includes(slug)
        ? prev.filter(m => m !== slug)
        : [...prev, slug]
    )
  }

  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case 'category':
        if (value) setSelectedCategories(prev => prev.filter(c => c !== value))
        break
      case 'brand':
        if (value) setSelectedBrands(prev => prev.filter(b => b !== value))
        break
      case 'rating':
        setMinRating(null)
        break
      case 'price':
        setPriceRange([0, 100])
        break
      case 'new':
        setShowNewOnly(false)
        break
      case 'stock':
        setShowInStockOnly(false)
        break
      case 'medical':
        if (value) setSelectedMedicalEquipment(prev => prev.filter(m => m !== value))
        break
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleMinPriceChange = (value: number) => {
    if (value <= tempPriceRange[1]) {
      setTempPriceRange([value, tempPriceRange[1]])
    }
  }

  const handleMaxPriceChange = (value: number) => {
    if (value >= tempPriceRange[0]) {
      setTempPriceRange([tempPriceRange[0], value])
    }
  }

  useEffect(() => {
    setTempPriceRange(priceRange)
  }, [priceRange])

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="border-b border-border bg-transparent">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Catalogue</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Tous les produits</h1>
            <p className="text-muted-foreground text-sm md:text-base">Découvrez notre sélection de produits de santé et bien-être</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-soft border border-border hover:border-primary transition-all lg:w-full lg:justify-start lg:hidden"
                  >
                    <Filter className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-sm md:text-base">Filtres</span>
                    {activeFiltersCount > 0 && (
                      <Badge className="bg-primary text-white">
                        {activeFiltersCount}
                      </Badge>
                    )}
                    <ChevronDown className={`h-4 w-4 transition-transform ml-auto ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  <div className="hidden lg:flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-soft border border-border">
                      <Filter className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-sm">Filtres</span>
                      {activeFiltersCount > 0 && (
                        <Badge className="bg-primary text-white">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </div>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Réinitialiser
                      </Button>
                    )}
                  </div>

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="gap-2 lg:hidden"
                    >
                      <X className="h-4 w-4" />
                      Réinitialiser
                    </Button>
                  )}
                </div>

                {showFilters && (
                  <div className="bg-white rounded-2xl shadow-soft border border-border p-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300 lg:hidden">
                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('categories')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Catégories</span>
                          {selectedCategories.length > 0 && (
                            <Badge variant="secondary" className="text-xs">{selectedCategories.length}</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'categories' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'categories' && (
                        <div className="p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {categories.filter(cat => !medicalEquipmentCategories.includes(cat.slug)).map((cat) => (
                            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.slug)}
                                onChange={() => toggleCategory(cat.slug)}
                                className="w-4 h-4 accent-primary rounded"
                              />
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {cat.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('medical')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Matériel médical</span>
                          {selectedMedicalEquipment.length > 0 && (
                            <Badge variant="secondary" className="text-xs">{selectedMedicalEquipment.length}</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'medical' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'medical' && (
                        <div className="p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {categories.filter(cat => medicalEquipmentCategories.includes(cat.slug)).map((cat) => (
                            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedMedicalEquipment.includes(cat.slug)}
                                onChange={() => toggleMedicalEquipment(cat.slug)}
                                className="w-4 h-4 accent-primary rounded"
                              />
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {cat.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('brands')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Sliders className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Marques</span>
                          {selectedBrands.length > 0 && (
                            <Badge variant="secondary" className="text-xs">{selectedBrands.length}</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'brands' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'brands' && (
                        <div className="p-4 space-y-2 max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                          {brands.map((brand) => (
                            <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand.slug)}
                                onChange={() => toggleBrand(brand.slug)}
                                className="w-4 h-4 accent-primary rounded"
                              />
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {brand.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('price')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">Prix</span>
                          {(priceRange[0] !== 0 || priceRange[1] !== 100) && (
                            <Badge variant="secondary" className="text-xs">{priceRange[0]}€-{priceRange[1]}€</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'price' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'price' && (
                        <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          <div className="space-y-3">
                            <label className="text-xs text-muted-foreground">Prix minimum: {tempPriceRange[0]}€</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={tempPriceRange[0]}
                              onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                              className="w-full accent-primary"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs text-muted-foreground">Prix maximum: {tempPriceRange[1]}€</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={tempPriceRange[1]}
                              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                              className="w-full accent-primary"
                            />
                          </div>

                          <div className="pt-3 border-t">
                            <h4 className="font-semibold text-sm mb-2">Note minimum</h4>
                            <div className="flex flex-wrap gap-2">
                              {[null, 5, 4, 3].map((rating) => (
                                <button
                                  key={rating || 'all'}
                                  onClick={() => setMinRating(rating)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    minRating === rating
                                      ? "bg-primary text-white shadow-sm"
                                      : "bg-muted text-foreground hover:bg-muted/80"
                                  }`}
                                >
                                  {rating ? `${rating}★+` : 'Toutes'}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('options')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">Options</span>
                          {(showNewOnly || showInStockOnly) && (
                            <Badge variant="secondary" className="text-xs">
                              {(showNewOnly ? 1 : 0) + (showInStockOnly ? 1 : 0)}
                            </Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'options' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'options' && (
                        <div className="p-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={showNewOnly}
                              onChange={(e) => setShowNewOnly(e.target.checked)}
                              className="w-4 h-4 accent-primary rounded"
                            />
                            <span className="text-sm group-hover:text-primary transition-colors">
                              Nouveautés uniquement
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={showInStockOnly}
                              onChange={(e) => setShowInStockOnly(e.target.checked)}
                              className="w-4 h-4 accent-primary rounded"
                            />
                            <span className="text-sm group-hover:text-primary transition-colors">
                              En stock uniquement
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="hidden lg:block bg-white rounded-2xl shadow-soft border border-border p-4 space-y-3">
                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('categories')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Catégories</span>
                          {selectedCategories.length > 0 && (
                            <Badge variant="secondary" className="text-xs">{selectedCategories.length}</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'categories' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'categories' && (
                        <div className="p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {categories.filter(cat => !medicalEquipmentCategories.includes(cat.slug)).map((cat) => (
                            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.slug)}
                                onChange={() => toggleCategory(cat.slug)}
                                className="w-4 h-4 accent-primary rounded"
                              />
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {cat.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('medical')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Matériel médical</span>
                          {selectedMedicalEquipment.length > 0 && (
                            <Badge variant="secondary" className="text-xs">{selectedMedicalEquipment.length}</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'medical' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'medical' && (
                        <div className="p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {categories.filter(cat => medicalEquipmentCategories.includes(cat.slug)).map((cat) => (
                            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedMedicalEquipment.includes(cat.slug)}
                                onChange={() => toggleMedicalEquipment(cat.slug)}
                                className="w-4 h-4 accent-primary rounded"
                              />
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {cat.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('brands')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Sliders className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Marques</span>
                          {selectedBrands.length > 0 && (
                            <Badge variant="secondary" className="text-xs">{selectedBrands.length}</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'brands' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'brands' && (
                        <div className="p-4 space-y-2 max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                          {brands.map((brand) => (
                            <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand.slug)}
                                onChange={() => toggleBrand(brand.slug)}
                                className="w-4 h-4 accent-primary rounded"
                              />
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {brand.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('price')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">Prix</span>
                          {(priceRange[0] !== 0 || priceRange[1] !== 100) && (
                            <Badge variant="secondary" className="text-xs">{priceRange[0]}€-{priceRange[1]}€</Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'price' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'price' && (
                        <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          <div className="space-y-3">
                            <label className="text-xs text-muted-foreground">Prix minimum: {tempPriceRange[0]}€</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={tempPriceRange[0]}
                              onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                              className="w-full accent-primary"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs text-muted-foreground">Prix maximum: {tempPriceRange[1]}€</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={tempPriceRange[1]}
                              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                              className="w-full accent-primary"
                            />
                          </div>

                          <div className="pt-3 border-t">
                            <h4 className="font-semibold text-sm mb-2">Note minimum</h4>
                            <div className="flex flex-wrap gap-2">
                              {[null, 5, 4, 3].map((rating) => (
                                <button
                                  key={rating || 'all'}
                                  onClick={() => setMinRating(rating)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    minRating === rating
                                      ? "bg-primary text-white shadow-sm"
                                      : "bg-muted text-foreground hover:bg-muted/80"
                                  }`}
                                >
                                  {rating ? `${rating}★+` : 'Toutes'}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('options')}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">Options</span>
                          {(showNewOnly || showInStockOnly) && (
                            <Badge variant="secondary" className="text-xs">
                              {(showNewOnly ? 1 : 0) + (showInStockOnly ? 1 : 0)}
                            </Badge>
                          )}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === 'options' ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedSection === 'options' && (
                        <div className="p-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={showNewOnly}
                              onChange={(e) => setShowNewOnly(e.target.checked)}
                              className="w-4 h-4 accent-primary rounded"
                            />
                            <span className="text-sm group-hover:text-primary transition-colors">
                              Nouveautés uniquement
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={showInStockOnly}
                              onChange={(e) => setShowInStockOnly(e.target.checked)}
                              className="w-4 h-4 accent-primary rounded"
                            />
                            <span className="text-sm group-hover:text-primary transition-colors">
                              En stock uniquement
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 bg-white rounded-xl p-3 border border-border">
                  {selectedCategories.map((slug) => {
                    const cat = categories.find(c => c.slug === slug)
                    return cat ? (
                      <Badge
                        key={slug}
                        variant="secondary"
                        className="gap-1.5 pr-1"
                      >
                        {cat.name}
                        <button
                          onClick={() => removeFilter('category', slug)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null
                  })}
                  {selectedMedicalEquipment.map((slug) => {
                    const cat = categories.find(c => c.slug === slug)
                    return cat ? (
                      <Badge
                        key={slug}
                        variant="secondary"
                        className="gap-1.5 pr-1"
                      >
                        {cat.name}
                        <button
                          onClick={() => removeFilter('medical', slug)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null
                  })}
                  {selectedBrands.map((slug) => {
                    const brand = brands.find(b => b.slug === slug)
                    return brand ? (
                      <Badge
                        key={slug}
                        variant="secondary"
                        className="gap-1.5 pr-1"
                      >
                        {brand.name}
                        <button
                          onClick={() => removeFilter('brand', slug)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null
                  })}
                  {minRating && (
                    <Badge variant="secondary" className="gap-1.5 pr-1">
                      Note {minRating}★+
                      <button
                        onClick={() => removeFilter('rating')}
                        className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {(priceRange[0] !== 0 || priceRange[1] !== 100) && (
                    <Badge variant="secondary" className="gap-1.5 pr-1">
                      {priceRange[0]}€ - {priceRange[1]}€
                      <button
                        onClick={() => removeFilter('price')}
                        className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {showNewOnly && (
                    <Badge variant="secondary" className="gap-1.5 pr-1">
                      Nouveautés
                      <button
                        onClick={() => removeFilter('new')}
                        className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {showInStockOnly && (
                    <Badge variant="secondary" className="gap-1.5 pr-1">
                      En stock
                      <button
                        onClick={() => removeFilter('stock')}
                        className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <p className="text-sm text-muted-foreground">
                  {loading ? (
                    <span className="inline-block h-4 w-32 bg-muted rounded animate-pulse" />
                  ) : (
                    <>
                      <span className="font-bold text-foreground">{products.length}</span> produit{products.length !== 1 ? 's' : ''}
                    </>
                  )}
                </p>

                <div className="relative w-full sm:w-auto">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium cursor-pointer hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  >
                    <span>
                      {sortBy === 'popular' && 'Populaires'}
                      {sortBy === 'price-low' && 'Prix croissant'}
                      {sortBy === 'price-high' && 'Prix décroissant'}
                      {sortBy === 'newest' && 'Les plus récents'}
                      {sortBy === 'rating' && 'Meilleures notes'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showSortMenu && (
                    <div className="absolute top-full mt-1 right-0 w-full sm:w-56 bg-white border border-border rounded-xl shadow-soft overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-10">
                      <button
                        onClick={() => { setSortBy('popular'); setShowSortMenu(false) }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted/50 transition-colors ${sortBy === 'popular' ? 'bg-muted/30 font-semibold text-primary' : ''}`}
                      >
                        Populaires
                      </button>
                      <button
                        onClick={() => { setSortBy('price-low'); setShowSortMenu(false) }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted/50 transition-colors ${sortBy === 'price-low' ? 'bg-muted/30 font-semibold text-primary' : ''}`}
                      >
                        Prix croissant
                      </button>
                      <button
                        onClick={() => { setSortBy('price-high'); setShowSortMenu(false) }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted/50 transition-colors ${sortBy === 'price-high' ? 'bg-muted/30 font-semibold text-primary' : ''}`}
                      >
                        Prix décroissant
                      </button>
                      <button
                        onClick={() => { setSortBy('newest'); setShowSortMenu(false) }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted/50 transition-colors ${sortBy === 'newest' ? 'bg-muted/30 font-semibold text-primary' : ''}`}
                      >
                        Les plus récents
                      </button>
                      <button
                        onClick={() => { setSortBy('rating'); setShowSortMenu(false) }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted/50 transition-colors ${sortBy === 'rating' ? 'bg-muted/30 font-semibold text-primary' : ''}`}
                      >
                        Meilleures notes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-soft overflow-hidden animate-pulse">
                      <div className="h-48 bg-muted" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-8 bg-muted rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                    <Sliders className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    Essayez de modifier vos filtres
                  </p>
                  <Button onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="flex-1 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="h-10 w-64 bg-muted rounded animate-pulse mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <CatalogContent />
    </Suspense>
  )
}
