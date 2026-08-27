export interface CMSImageItem {
  id: string; // unique key e.g. 'home_hero_bg'
  title: string; // readable name e.g. 'Home Hero Background'
  page: 'Home' | 'About' | 'Exports' | 'Imports' | 'Contact' | 'Coffee' | 'Minerals' | 'Seeds' | 'Global';
  section: string; // e.g. 'Hero Banner', 'Product Cards', 'Leadership', 'Logistics'
  description: string; // Where and how this image is used
  defaultUrl: string; // Original bundled local path or Unsplash URL
  url: string; // Current active URL (can be external URL or default)
  previousUrl?: string; // Stored previous URL for undo/restore
  active: boolean; // Toggle active status; if false, falls back to defaultUrl
  aspectRatio?: string; // Recommended ratio hint: '16:9', '4:3', '1:1', '3:4', '21:9'
  altText?: string;
  updatedAt?: number;
  updatedBy?: string;
}

// Alias mapping to seamlessly resolve alternative keys used across legacy or shorthand references
export const IMAGE_KEY_ALIASES: Record<string, string> = {
  // Exports category aliases
  'exports_coffee_preview': 'exports_cat_coffee',
  'exports_minerals_preview': 'exports_cat_minerals',
  'exports_seeds_preview': 'exports_cat_seeds',

  // Coffee lot aliases
  'coffee_yirgacheffe': 'coffee_origin_yirgacheffe',
  'coffee_guji': 'coffee_origin_guji',
  'coffee_sidamo': 'coffee_origin_sidama',
  'coffee_limu': 'coffee_origin_limu',
  'coffee_harrar': 'coffee_origin_harar',
  'coffee_jimma': 'coffee_origin_djmmah',
  'coffee_drying_beds': 'coffee_quality_sorting',
  'coffee_cupping_lab': 'about_quality_lab',

  // Minerals aliases
  'minerals_gold': 'minerals_prod_gold',
  'minerals_tech': 'minerals_prod_tech',
  'minerals_gems': 'minerals_prod_gems',
  'minerals_extraction': 'minerals_grid_extraction',
  'minerals_resource': 'minerals_grid_aggregation',
  'minerals_facility': 'minerals_grid_industrial',
  'minerals_qc': 'minerals_grid_qc',

  // Seeds aliases
  'seeds_showcase': 'seeds_prod_sesame',
  'seeds_sesame': 'seeds_prod_sesame',

  // About aliases
  'about_farm_photo': 'about_coffee_origins',
  'about_logistics_photo': 'exports_supply_chain_1',
  'about_seeds_photo': 'seeds_prod_sesame',
  'about_coffee_beans': 'coffee_origin_yirgacheffe'
};

export const DEFAULT_IMAGE_REGISTRY: CMSImageItem[] = [
  // --- HOME PAGE ---
  {
    id: 'home_hero_bg',
    title: 'Home Hero Background',
    page: 'Home',
    section: 'Hero Banner',
    description: 'High-impact panoramic background for the main homepage hero banner.',
    defaultUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Moderntech Ethiopia Global Trade Background'
  },
  {
    id: 'home_export_card_coffee',
    title: 'Home Export Card - Premium Coffee',
    page: 'Home',
    section: 'Export Commodities Grid',
    description: 'Preview card image representing Ethiopian specialty coffee on the home exports section.',
    defaultUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Premium Ethiopian Green & Roasted Coffee Export'
  },
  {
    id: 'home_export_card_minerals',
    title: 'Home Export Card - Minerals & Ores',
    page: 'Home',
    section: 'Export Commodities Grid',
    description: 'Preview card image representing gold, lithium, and tantalum on the home exports section.',
    defaultUrl: '/assets/images/regenerated_image_1778505448378.png',
    url: '/assets/images/regenerated_image_1778505448378.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Gold and Industrial Minerals Export'
  },
  {
    id: 'home_export_card_seeds',
    title: 'Home Export Card - Pulses & Oilseeds',
    page: 'Home',
    section: 'Export Commodities Grid',
    description: 'Preview card image for sesame, soybeans, and pulses export on homepage.',
    defaultUrl: '/assets/images/regenerated_image_1778502399482.png',
    url: '/assets/images/regenerated_image_1778502399482.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Ethiopian Sesame Seeds and Agricultural Commodities'
  },
  {
    id: 'home_manufacturing_banner',
    title: 'Home Industrial Processing Banner',
    page: 'Home',
    section: 'Manufacturing & Processing Facility',
    description: 'Featured visual showcase of Moderntech domestic dry milling and processing plants.',
    defaultUrl: '/assets/images/regenerated_image_1778503816656.png',
    url: '/assets/images/regenerated_image_1778503816656.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Moderntech Domestic Processing & Milling Facility'
  },
  {
    id: 'home_imports_bg',
    title: 'Home Imports Section Background',
    page: 'Home',
    section: 'Import Operations Showcase',
    description: 'Maritime freight & container vessel backdrop for import operations on homepage.',
    defaultUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Global Import Shipping Logistics'
  },
  {
    id: 'home_contact_cta_bg',
    title: 'Home Bottom CTA Background',
    page: 'Home',
    section: 'Inquiry CTA Banner',
    description: 'Background for the primary call-to-action banner at bottom of homepage.',
    defaultUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'International Trade Contact Banner'
  },

  // --- ABOUT PAGE ---
  {
    id: 'about_hero_bg',
    title: 'About Us Hero Background',
    page: 'About',
    section: 'Hero Header',
    description: 'Corporate architectural imagery for the About Moderntech header.',
    defaultUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Modern Corporate Infrastructure'
  },
  {
    id: 'about_leadership_founder',
    title: 'Executive Leadership - Founder Portrait',
    page: 'About',
    section: 'Leadership & Governance',
    description: 'Executive portrait of the CEO & Managing Director on the About page.',
    defaultUrl: '/assets/images/regenerated_image_1778502422774.png',
    url: '/assets/images/regenerated_image_1778502422774.png',
    active: true,
    aspectRatio: '1:1',
    altText: 'Moderntech PLC Executive Leadership'
  },
  {
    id: 'about_processing_facility',
    title: 'About Dry Mill & Processing Plant',
    page: 'About',
    section: 'Infrastructure & Operations',
    description: 'Industrial cleaning and color-sorting facility featured on the About page.',
    defaultUrl: '/assets/images/regenerated_image_1778503816656.png',
    url: '/assets/images/regenerated_image_1778503816656.png',
    active: true,
    aspectRatio: '4:3',
    altText: 'Moderntech Certified Processing Facility'
  },
  {
    id: 'about_coffee_origins',
    title: 'About Origin Farms Landscape',
    page: 'About',
    section: 'Origin Partnerships',
    description: 'Highland farm visual representing direct sourcing partnerships with farmers.',
    defaultUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
    active: true,
    aspectRatio: '16:9',
    altText: 'Ethiopian Agricultural Origin Farms'
  },
  {
    id: 'about_quality_lab',
    title: 'About Quality Control Lab',
    page: 'About',
    section: 'Quality Assurance',
    description: 'Certified cupping and laboratory testing verification imagery.',
    defaultUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1200',
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1200',
    active: true,
    aspectRatio: '16:9',
    altText: 'Laboratory Quality Control & Cupping'
  },

  // --- EXPORTS PAGE ---
  {
    id: 'exports_hero_bg',
    title: 'Exports Page Hero Background',
    page: 'Exports',
    section: 'Hero Banner',
    description: 'Global port terminal and maritime logistics background on main Exports page.',
    defaultUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Global Export Logistics and Port Shipping'
  },
  {
    id: 'exports_cat_coffee',
    title: 'Exports Category - Specialty Coffee',
    page: 'Exports',
    section: 'Export Divisions Grid',
    description: 'Category card image for Specialty Coffee division on Exports catalog.',
    defaultUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Ethiopian Grade 1 Coffee Export'
  },
  {
    id: 'exports_cat_minerals',
    title: 'Exports Category - Strategic Minerals',
    page: 'Exports',
    section: 'Export Divisions Grid',
    description: 'Category card image for Mining & Minerals division on Exports catalog.',
    defaultUrl: '/assets/images/regenerated_image_1778505448378.png',
    url: '/assets/images/regenerated_image_1778505448378.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Gold and Rare Strategic Minerals'
  },
  {
    id: 'exports_cat_seeds',
    title: 'Exports Category - Oilseeds & Pulses',
    page: 'Exports',
    section: 'Export Divisions Grid',
    description: 'Category card image for Oilseeds & Pulses division on Exports catalog.',
    defaultUrl: '/assets/images/regenerated_image_1778502399482.png',
    url: '/assets/images/regenerated_image_1778502399482.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Sesame Seeds, Soybeans and Pulses'
  },
  {
    id: 'exports_supply_chain_1',
    title: 'Exports Supply Chain - Warehousing',
    page: 'Exports',
    section: 'Supply Chain Operations',
    description: 'Warehouse consolidation and dry storage facility image.',
    defaultUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '4:3',
    altText: 'Bonded Warehouse and Cargo Logistics'
  },
  {
    id: 'exports_supply_chain_2',
    title: 'Exports Supply Chain - Maritime Loading',
    page: 'Exports',
    section: 'Supply Chain Operations',
    description: 'Container stuffing and freight handling operations.',
    defaultUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '4:3',
    altText: 'Vessel Container Handling'
  },

  // --- IMPORTS PAGE ---
  {
    id: 'imports_hero_bg',
    title: 'Imports Hero Background',
    page: 'Imports',
    section: 'Hero Banner',
    description: 'International container shipping backdrop for the main Imports page.',
    defaultUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Global Imports and Maritime Procurement'
  },
  {
    id: 'imports_division_rebar',
    title: 'Imports Card - Rebar & Construction Steel',
    page: 'Imports',
    section: 'Import Divisions Grid',
    description: 'Card visual for high-tensile rebar, billets, and construction metals import.',
    defaultUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Construction Rebar & Structural Steel'
  },
  {
    id: 'imports_division_heavy_machinery',
    title: 'Imports Card - Industrial Machinery',
    page: 'Imports',
    section: 'Import Divisions Grid',
    description: 'Card visual for earthmoving machinery, generators, and industrial equipment.',
    defaultUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Heavy Industrial Machinery & Equipment'
  },
  {
    id: 'imports_division_automotive',
    title: 'Imports Card - Commercial Vehicles',
    page: 'Imports',
    section: 'Import Divisions Grid',
    description: 'Card visual for commercial trucks, prime movers, and transport vehicles.',
    defaultUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Commercial Fleet & Transport Vehicles'
  },
  {
    id: 'imports_division_chemicals',
    title: 'Imports Card - Industrial Raw Materials',
    page: 'Imports',
    section: 'Import Divisions Grid',
    description: 'Card visual for polymers, industrial chemicals, and manufacturing inputs.',
    defaultUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Industrial Raw Materials and Polymers'
  },
  {
    id: 'imports_partner_tech_supply',
    title: 'Imports Supply Network Feature',
    page: 'Imports',
    section: 'Global Sourcing & Supply Chain',
    description: 'Industrial automation and international sourcing showcase image.',
    defaultUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    active: true,
    aspectRatio: '16:9',
    altText: 'Global Procurement & Direct Manufacturer Supply'
  },

  // --- CONTACT PAGE ---
  {
    id: 'contact_hero_bg',
    title: 'Contact Hero Background',
    page: 'Contact',
    section: 'Hero Banner',
    description: 'Header background for the Contact & Commercial Inquiries page.',
    defaultUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Moderntech International Corporate Headquarters'
  },
  {
    id: 'contact_hq_office',
    title: 'Contact - Addis Ababa HQ Building',
    page: 'Contact',
    section: 'Global Locations Grid',
    description: 'Corporate office image for Moderntech PLC Headquarters in Addis Ababa.',
    defaultUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Addis Ababa Executive Headquarters'
  },
  {
    id: 'contact_logistics_hub',
    title: 'Contact - Port Logistics Hub',
    page: 'Contact',
    section: 'Global Locations Grid',
    description: 'Djibouti & regional shipping corridor liaison office image.',
    defaultUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    active: true,
    aspectRatio: '16:9',
    altText: 'Djibouti Port Logistics Operations'
  },

  // --- COFFEE CATALOG ---
  {
    id: 'coffee_hero_bg',
    title: 'Coffee Catalog Hero Background',
    page: 'Coffee',
    section: 'Hero Banner',
    description: 'Ethiopian highland coffee plantation background on Coffee catalog page.',
    defaultUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Ethiopian Highland Specialty Coffee Plantation'
  },
  {
    id: 'coffee_origin_yirgacheffe',
    title: 'Coffee Lot - Yirgacheffe Grade 1 Washed',
    page: 'Coffee',
    section: 'Export Coffee Catalog Lots',
    description: 'Product card image for floral and jasmine Yirgacheffe G1 washed coffee lot.',
    defaultUrl: '/assets/images/regenerated_image_1778502381273.png',
    url: '/assets/images/regenerated_image_1778502381273.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Yirgacheffe Grade 1 Washed Coffee Beans'
  },
  {
    id: 'coffee_origin_sidama',
    title: 'Coffee Lot - Sidama Grade 1 Natural',
    page: 'Coffee',
    section: 'Export Coffee Catalog Lots',
    description: 'Product card image for berry-noted Sidama G1 natural coffee lot.',
    defaultUrl: '/assets/images/regenerated_image_1778502384784.png',
    url: '/assets/images/regenerated_image_1778502384784.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Sidama Grade 1 Natural Green Coffee Beans'
  },
  {
    id: 'coffee_origin_guji',
    title: 'Coffee Lot - Guji Highland Natural',
    page: 'Coffee',
    section: 'Export Coffee Catalog Lots',
    description: 'Product card image for Guji highland single origin micro-lot.',
    defaultUrl: '/assets/images/regenerated_image_1778502388657.png',
    url: '/assets/images/regenerated_image_1778502388657.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Guji Highland Specialty Green Coffee'
  },
  {
    id: 'coffee_origin_harar',
    title: 'Coffee Lot - Harar Longberry Horse',
    page: 'Coffee',
    section: 'Export Coffee Catalog Lots',
    description: 'Product card image for sun-dried Harar Longberry sun-dried heirloom lot.',
    defaultUrl: '/assets/images/regenerated_image_1778502392437.png',
    url: '/assets/images/regenerated_image_1778502392437.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Harar Longberry Heirloom Coffee Beans'
  },
  {
    id: 'coffee_origin_limu',
    title: 'Coffee Lot - Limu Grade 2 Washed',
    page: 'Coffee',
    section: 'Export Coffee Catalog Lots',
    description: 'Product card image for balanced winey Limu G2 washed coffee lot.',
    defaultUrl: '/assets/images/regenerated_image_1778502396147.png',
    url: '/assets/images/regenerated_image_1778502396147.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Limu Grade 2 Washed Coffee Beans'
  },
  {
    id: 'coffee_origin_djmmah',
    title: 'Coffee Lot - Djimmah Commercial Grade 5',
    page: 'Coffee',
    section: 'Export Coffee Catalog Lots',
    description: 'Product card image for bulk commercial roasting Djimmah natural lot.',
    defaultUrl: '/assets/images/regenerated_image_1778502381273.png',
    url: '/assets/images/regenerated_image_1778502381273.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Djimmah Commercial Grade Coffee'
  },
  {
    id: 'coffee_quality_sorting',
    title: 'Coffee Processing - Sorting & Cupping',
    page: 'Coffee',
    section: 'Processing & Quality Assurance',
    description: 'Feature photo demonstrating bean density grading and export preparation.',
    defaultUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
    active: true,
    aspectRatio: '16:9',
    altText: 'Optical Color Sorting and Cupping Protocol'
  },
  {
    id: 'coffee_cta_bg',
    title: 'Coffee CTA Background',
    page: 'Coffee',
    section: 'Direct Sample Request CTA',
    description: 'Warm background for the sample booking form at the bottom of Coffee page.',
    defaultUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Specialty Coffee Sample Booking'
  },

  // --- MINERALS PAGE ---
  {
    id: 'minerals_hero_bg',
    title: 'Minerals Hero Background',
    page: 'Minerals',
    section: 'Hero Banner',
    description: 'Industrial mining and geological exploration backdrop on Minerals page.',
    defaultUrl: 'https://images.unsplash.com/photo-1516192511155-07202167386d?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1516192511155-07202167386d?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Ethiopian Strategic Mineral Mining'
  },
  {
    id: 'minerals_prod_gold',
    title: 'Minerals Product - Gold Bullion & Concentrates',
    page: 'Minerals',
    section: 'Mineral Portfolio Grid',
    description: 'Product card visual for unrefined and assay-certified gold commodities.',
    defaultUrl: '/assets/images/regenerated_image_1778505448378.png',
    url: '/assets/images/regenerated_image_1778505448378.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Gold Dore Bars & Concentrates'
  },
  {
    id: 'minerals_prod_tech',
    title: 'Minerals Product - Tantalite & Lithium Ores',
    page: 'Minerals',
    section: 'Mineral Portfolio Grid',
    description: 'Product card visual for high-purity critical technology minerals.',
    defaultUrl: '/assets/images/regenerated_image_1778504652929.png',
    url: '/assets/images/regenerated_image_1778504652929.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Tantalite & Lithium Industrial Ores'
  },
  {
    id: 'minerals_prod_gems',
    title: 'Minerals Product - Ethiopian Opals & Emeralds',
    page: 'Minerals',
    section: 'Mineral Portfolio Grid',
    description: 'Product card visual for Welo opals and natural precious gemstones.',
    defaultUrl: '/assets/images/regenerated_image_1778504655777.png',
    url: '/assets/images/regenerated_image_1778504655777.png',
    active: true,
    aspectRatio: '16:9',
    altText: 'Natural Ethiopian Precious Gemstones'
  },
  {
    id: 'minerals_grid_extraction',
    title: 'Minerals Gallery - Mining Extraction',
    page: 'Minerals',
    section: 'Market Leadership Mosaic',
    description: 'Mosaic gallery image 1 on Minerals market leadership section.',
    defaultUrl: '/assets/images/regenerated_image_1778505215239.png',
    url: '/assets/images/regenerated_image_1778505215239.png',
    active: true,
    aspectRatio: '1:1',
    altText: 'Mineral Extraction in Southern Ethiopia'
  },
  {
    id: 'minerals_grid_aggregation',
    title: 'Minerals Gallery - Resource Aggregation',
    page: 'Minerals',
    section: 'Market Leadership Mosaic',
    description: 'Mosaic gallery image 2 on Minerals market leadership section.',
    defaultUrl: '/assets/images/regenerated_image_1778505226563.png',
    url: '/assets/images/regenerated_image_1778505226563.png',
    active: true,
    aspectRatio: '3:4',
    altText: 'Mineral Ore Sorting and Aggregation'
  },
  {
    id: 'minerals_grid_industrial',
    title: 'Minerals Gallery - Industrial Facility',
    page: 'Minerals',
    section: 'Market Leadership Mosaic',
    description: 'Mosaic gallery image 3 on Minerals market leadership section.',
    defaultUrl: '/assets/images/regenerated_image_1778505220555.png',
    url: '/assets/images/regenerated_image_1778505220555.png',
    active: true,
    aspectRatio: '3:4',
    altText: 'Moderntech Mineral Smelting & Refining Facility'
  },
  {
    id: 'minerals_grid_qc',
    title: 'Minerals Gallery - Assay Quality Control',
    page: 'Minerals',
    section: 'Market Leadership Mosaic',
    description: 'Mosaic gallery image 4 on Minerals market leadership section.',
    defaultUrl: '/assets/images/regenerated_image_1778505230834.png',
    url: '/assets/images/regenerated_image_1778505230834.png',
    active: true,
    aspectRatio: '1:1',
    altText: 'Spectrometry & Assay Testing for Minerals'
  },
  {
    id: 'minerals_equip_1',
    title: 'Minerals Capability - Mining Equipment',
    page: 'Minerals',
    section: 'Industrial Capability Showcase',
    description: 'Heavy exploration drills and extraction equipment visual.',
    defaultUrl: '/assets/images/regenerated_image_1778503049133.png',
    url: '/assets/images/regenerated_image_1778503049133.png',
    active: true,
    aspectRatio: '3:4',
    altText: 'Heavy Extraction Machinery'
  },
  {
    id: 'minerals_equip_2',
    title: 'Minerals Capability - Processing Facility',
    page: 'Minerals',
    section: 'Industrial Capability Showcase',
    description: 'Primary refining plant and processing line visual.',
    defaultUrl: '/assets/images/regenerated_image_1778503054691.png',
    url: '/assets/images/regenerated_image_1778503054691.png',
    active: true,
    aspectRatio: '3:4',
    altText: 'Mineral Primary Refining and Beneficiation Line'
  },
  {
    id: 'minerals_cta_bg',
    title: 'Minerals CTA Background',
    page: 'Minerals',
    section: 'Procurement CTA',
    description: 'Dark backdrop for the mineral procurement contact CTA.',
    defaultUrl: 'https://images.unsplash.com/photo-1582213726893-edc444f0c391?auto=format&fit=crop&q=80&w=2000',
    url: 'https://images.unsplash.com/photo-1582213726893-edc444f0c391?auto=format&fit=crop&q=80&w=2000',
    active: true,
    aspectRatio: '21:9',
    altText: 'Industrial Minerals Supply Agreement'
  },

  // --- SEEDS PAGE ---
  {
    id: 'seeds_prod_sesame',
    title: 'Seeds Main Feature - Humera Sesame Seeds',
    page: 'Seeds',
    section: 'Purity & Yield Showcase',
    description: 'Primary high-resolution showcase image of cleaned white Humera sesame seeds.',
    defaultUrl: '/assets/images/regenerated_image_1778502399482.png',
    url: '/assets/images/regenerated_image_1778502399482.png',
    active: true,
    aspectRatio: '4:3',
    altText: 'Machine Cleaned 99% Purity Humera Sesame Seeds'
  }
];

export const REGISTRY_MAP: Record<string, CMSImageItem> = DEFAULT_IMAGE_REGISTRY.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, CMSImageItem>
);

/**
 * Universal high-resolution fallback image URL if an unknown slot or invalid asset fails
 */
export const GLOBAL_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200';

/**
 * Explicit default image URL constant for every slot and alias.
 * Guarantees that every known slot has a pristine, working fallback image.
 */
export const DEFAULT_SLOT_FALLBACKS: Record<string, string> = (() => {
  const fallbacks: Record<string, string> = {};

  // 1. Map all registered slots
  DEFAULT_IMAGE_REGISTRY.forEach((item) => {
    const url = item.defaultUrl || item.url || GLOBAL_FALLBACK_IMAGE;
    fallbacks[item.id] = url;
  });

  // 2. Map all aliases to their canonical slot fallbacks
  Object.entries(IMAGE_KEY_ALIASES).forEach(([alias, targetKey]) => {
    if (fallbacks[targetKey]) {
      fallbacks[alias] = fallbacks[targetKey];
    }
  });

  return fallbacks;
})();

/**
 * Helper to safely retrieve the default fallback image URL for any slot
 */
export function getDefaultSlotFallback(slotId?: string, customFallback?: string): string {
  if (!slotId) return customFallback || GLOBAL_FALLBACK_IMAGE;
  const resolved = IMAGE_KEY_ALIASES[slotId] || slotId;
  return (
    customFallback ||
    DEFAULT_SLOT_FALLBACKS[resolved] ||
    DEFAULT_SLOT_FALLBACKS[slotId] ||
    REGISTRY_MAP[resolved]?.defaultUrl ||
    REGISTRY_MAP[slotId]?.defaultUrl ||
    GLOBAL_FALLBACK_IMAGE
  );
}

