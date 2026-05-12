import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh' | 'de' | 'ar';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.coffee': { en: 'Specialty Coffee', zh: '精品咖啡', de: 'Spezialitätenkaffee', ar: 'القهوة المختصة' },
  'nav.minerals': { en: 'Premium Minerals', zh: '优质矿产', de: 'Premium-Mineralien', ar: 'معادن فاخرة' },
  'nav.seeds': { en: 'Quality Seeds', zh: '优质种子', de: 'Qualitäts-Saatgut', ar: 'بذور عالية الجودة' },
  'nav.beans': { en: 'Beans & Grains', zh: '豆类与谷物', de: 'Bohnen & Getreide', ar: 'البقوليات والحبوب' },
  'nav.home': { en: 'Home', zh: '首页', de: 'Startseite', ar: 'الرئيسية' },
  'nav.about': { en: 'About Us', zh: '关于我们', de: 'Über uns', ar: 'من نحن' },
  'nav.exports': { en: 'Exports', zh: '出口业务', de: 'Exporte', ar: 'تصدير' },
  'nav.imports': { en: 'Imports', zh: '进口业务', de: 'Importe', ar: 'استيراد' },
  'nav.contact': { en: 'Contact', zh: '联系我们', de: 'Kontakt', ar: 'اتصل بنا' },
  
  // Hero
  'hero.tagline': { 
    en: "Ethiopia's Premier Sourcing Enterprise", 
    zh: "埃塞俄比亚领先的采购企业", 
    de: "Äthiopiens führendes Beschaffungsunternehmen", 
    ar: "المؤسسة الرائدة في توريد المواد في إثيوبيا" 
  },
  'hero.title.leading': { en: 'Leading', zh: '领先的', de: 'Führende', ar: 'رائد' },
  'hero.title.products': { en: 'Coffee & Minerals', zh: '咖啡与矿产', de: 'Kaffee & Mineralien', ar: 'القهوة والمعادن' },
  'hero.title.exports': { en: 'Exports to the World', zh: '出口全球', de: 'Exporte in die Welt', ar: 'الصادرات إلى العالم' },
  'hero.description': { 
    en: "We operate Ethiopia's largest sourcing network. Controlling over 10 industrial farms in Oromia and serving as the #1 Mineral export powerhouse, we bridge heritage with global industrial scale.",
    zh: "我们经营着埃塞俄比亚最大的采购网络。在奥罗米亚控制着10多个工业农场，并作为排名第一的矿产出口领军企业，我们将传统遗产与全球工业规模联系起来。",
    de: "Wir betreiben Äthiopiens größtes Beschaffungsnetzwerk. Mit über 10 Industriefarmen in Oromia und als die Nr. 1 im Mineralexport schlagen wir die Brücke zwischen Erbe und globalem industriellem Maßstab.",
    ar: "نحن ندير أكبر شبكة توريد في إثيوبيا. من خلال التحكم في أكثر من 10 مزارع صناعية في أوروميا والعمل كقوة تصدير المعادن رقم 1 ، نحن نربط التراث بنطاق صناعي عالمي."
  },
  'hero.cta.coffee': { en: 'Specialty Coffee', zh: '特种咖啡', de: 'Spezialitätenkaffee', ar: 'قهوة مختصة' },
  'hero.cta.minerals': { en: 'Premium Minerals', zh: '优质矿产', de: 'Premium-Mineralien', ar: 'معادن فاخرة' },

  // Sections
  'section.exports.title': { en: 'Our Primary Exports', zh: '我们的主要出口产品', de: 'Unsere wichtigsten Exporte', ar: 'صادراتنا الرئيسية' },
  'section.exports.subtitle': { 
    en: 'Discover our range of premium Ethiopian agricultural products, harvested with care and processed for perfection.',
    zh: '探索我们一系列优质的埃塞俄比亚农产品，精心收割，完美加工。',
    de: 'Entdecken Sie unser Sortiment an erstklassigen äthiopischen Agrarprodukten, mit Sorgfalt geerntet und zur Perfektion verarbeitet.',
    ar: 'اكتشف مجموعتنا من المنتجات الزراعية الإثيوبية المتميزة ، التي تم حصادها بعناية ومعالجتها من أجل الكمال.'
  },
  'section.stats.farms': { en: 'Industrial Farms', zh: '工业农场', de: 'Industrie-Farmen', ar: 'مزارع صناعية' },
  'section.stats.minerals': { en: 'Mineral Sourcing Strength', zh: '矿产采购实力', de: 'Stärke in der Mineralbeschaffung', ar: 'قوة توريد المعادن' },
  'section.stats.capacity': { en: 'Annual Tons Capacity', zh: '年产吨位', de: 'Jährliche Kapazität in Tonnen', ar: 'السعة السنوية بالأطنان' },
  'section.stats.market': { en: 'Market Leader', zh: '市场领导者', de: 'Marktführer', ar: 'رائد السوق' },

  // Footer
  'footer.description': { 
    en: "Leading Ethiopian export and import authority, managing premium agricultural clusters and critical industrial sourcing.",
    zh: "埃塞俄比亚领先的进出口机构，管理优质农业集群和关键工业采购。",
    de: "Führende äthiopische Export- und Importbehörde, die erstklassige Agrarcluster und kritische industrielle Beschaffung verwaltet.",
    ar: "هيئة تابعة رائدة في إثيوبيا للتصدير والاستيراد، تدير مجموعات زراعية متميزة ومصادر صناعية هامة."
  },
  'footer.manufacturing': { en: 'Moderntech Manufacturing (Water)', zh: 'Moderntech 制造（水供应）', de: 'Moderntech Produktion (Wasser)', ar: 'مودرنتك للتصنيع (المياه)' },
  'footer.technologies': { en: 'Moderntech Technologies', zh: 'Moderntech 科技', de: 'Moderntech Technologien', ar: 'مودرنتك للتقنيات' },
  'footer.links': { en: 'Quick Links', zh: '快速链接', de: 'Schnelllinks', ar: 'روابط سريعة' },
  'footer.group': { en: 'Our Group', zh: '我们的集团', de: 'Unsere Gruppe', ar: 'مجموعتنا' },
  'footer.contact': { en: 'Contact Us', zh: '联系我们', de: 'Kontakt uns', ar: 'طرق الاتصال' },
  'footer.rights': { en: 'All Rights Reserved.', zh: '版权所有。', de: 'Alle Rechte vorbehalten.', ar: 'جميع الحقوق محفوظة.' },

  // New Hero keys for other pages
  'hero.cta.beans': { en: 'Premium Pulses', zh: '优质豆类', de: 'Premium-Hülsenfrüchte', ar: 'بقوليات فاخرة' },
  'hero.cta.seeds': { en: 'Oilseeds & Grains', zh: '油籽与谷物', de: 'Ölsaaten & Getreide', ar: 'البذور الزيتية والحبوب' },
  'hero.subtitle': { en: 'Specializing in high-yield staples for international markets.', zh: '专门为国际市场提供高产主食。', de: 'Spezialisierung auf ertragreiche Grundnahrungsmittel für internationale Märkte.', ar: 'متخصصون في المواد الأساسية عالية الإنتاجية للأسواق الدولية.' },

  // About Page
  'coffee.hero.authority': { en: 'Authority', zh: '权威机构', de: 'Autorität', ar: 'السلطة' },
  'coffee.stat.owned': { en: 'Owned Farms', zh: '自有农场', de: 'Eigene Farmen', ar: 'مزارع مملوكة' },
  'coffee.stat.market': { en: 'Market Rank', zh: '市场排名', de: 'Marktrang', ar: 'رتبة السوق' },
  'coffee.cta.bulk': { en: 'Inquire for Bulk Export', zh: '询价大宗出口', de: 'Anfrage für Großexport', ar: 'استعلام عن تصدير بالجملة' },
  'coffee.cta.network': { en: 'Explore Sourcing Network', zh: '探索采购网络', de: 'Beschaffungsnetzwerk erkunden', ar: 'استكشاف شبكة التوريد' },
  'coffee.quality.title': { en: 'Industrial Processing & Quality Control', zh: '工业化加工与质量控制', de: 'Industrielle Verarbeitung & Qualitätskontrolle', ar: 'المعالجة الصناعية ومراقبة الجودة' },
  'coffee.region.moderntech': { en: 'Moderntech Owned', zh: 'Moderntech 所有', de: 'Besitz von Moderntech', ar: 'مملوكة لمودرنتيك' },
  'minerals.gold.title': { en: 'Industrial Gold', zh: '工业黄金', de: 'Industriegold', ar: 'الذهب الصناعي' },
  'minerals.gold.desc': { en: 'Sourced from the mineral-rich corridors of Ethiopia. We supply high-purity gold bullion for international refining.', zh: '源自埃塞俄比亚资源丰富的走廊。我们为国际精炼提供高纯度金条。', de: 'Bezogen aus den mineralreichen Korridoren Äthiopiens. Wir liefern hochreines Gold für die internationale Raffination.', ar: 'يتم الحصول عليه من ممرات إثيوبيا الغنية بالمعادن. نقوم بتوريد سبائك الذهب عالية النقاء للتكرير الدولي.' },
  'minerals.tech.title': { en: 'Tantalum & Lithium', zh: '钽与锂', de: 'Tantal & Lithium', ar: 'التنتالوم والليثيوم' },
  'minerals.tech.desc': { en: 'Critical minerals for the global battery and electronics industry. Ethical sourcing with high-grade concentrates.', zh: '全球电池和电子工业的关键矿物。具有高品位精矿的伦理采购。', de: 'Kritische Mineralien für die globale Batterie- und Elektronikindustrie. Ethische Beschaffung mit hochwertigen Konzentraten.', ar: 'معادن هامة لصناعة البطاريات الإلكترونيات العالمية. توريد أخلاقي بتركيزات عالية الجودة.' },
  'minerals.gems.title': { en: 'Precious Gemstones', zh: '珍贵宝石', de: 'Edelsteine', ar: 'الأحجار الكريمة الثمينة' },
  'minerals.gems.desc': { en: 'High-quality Emeralds, Opals, and Sapphires. Each stone is ethically mined and professionally graded.', zh: '优质祖母绿、欧泊和蓝宝石。每块石头都经过伦理开采和专业分级。', de: 'Hochwertige Smaragde, Opale und Saphire. Jeder Stein wird ethisch abgebaut und professionell bewertet.', ar: 'زمرد وأوبال وياقوت عالي الجودة. يتم استخراج كل حجر بشكل أخلاقي وتصنيفه بشكل احترافي.' },
  'minerals.leadership.tag': { en: 'Dominant Market Force', zh: '占主导地位的市场力量', de: 'Dominante Marktkraft', ar: 'قوة السوق المهيمنة' },
  'minerals.leadership.title': { en: 'The Undisputed Leader in Minerals', zh: '无可争议的矿产领导者', de: 'Der unbestrittene Marktführer bei Mineralien', ar: 'الزعيم بلا منازع في المعادن' },
  'minerals.processing.title': { en: 'Advanced Extraction & Industrial Flow', zh: '先进提取与工业流程', de: 'Fortschrittliche Extraktion & industrieller Fluss', ar: 'الاستخراج المتقدم والتدفق الصناعي' },
  'minerals.standards.gold': { en: 'LBMA Compliant Sourcing', zh: '符合 LBMA 标准的采购', de: 'LBMA-konforme Beschaffung', ar: 'توريد متوافق مع LBMA' },
  'minerals.standards.grade': { en: 'Export Grade Concentrates', zh: '出口级精矿', de: 'Konzentrate in Exportqualität', ar: 'مركزات درجة التصدير' },
  'minerals.standards.ethical': { en: 'Ethically Sourced & Certified', zh: '伦理采购与认证', de: 'Ethisch bezogen und zertifiziert', ar: 'مصادر أخلاقية ومعتمدة' },
  'minerals.capability.desc': { en: 'Our Mineral division operates with industrial precision, guaranteeing purity levels required by international refineries.', zh: '我们的矿产部门以工业化的精确度运营，保证了国际精炼厂所需的纯度水平。', de: 'Unsere Mineralienabteilung arbeitet mit industrieller Präzision und garantiert die von internationalen Raffinerien geforderten Reinheitsgrade.', ar: 'يعمل قسم المعادن لدينا بدقة صناعية، مما يضمن مستويات النقاء التي تتطلبها المصافي الدولية.' },
  'minerals.capability.1.title': { en: 'Strategic Resource Control', zh: '战略资源控制', de: 'Strategische Ressourcenkontrolle', ar: 'التحكم الاستراتيجي في الموارد' },
  'minerals.capability.1.desc': { en: "Dominating the sourcing landscape in Ethiopia's primary mining zones.", zh: '在埃塞俄比亚的主要矿区占据采购领先地位。', de: 'Dominante Beschaffungslandschaft in den primären Bergbauzonen Äthiopiens.', ar: 'السيطرة على مشهد التوريد في مناطق التعدين الرئيسية في إثيوبيا.' },
  'minerals.capability.2.title': { en: 'Industrial Processing', zh: '工业加工', de: 'Industrielle Verarbeitung', ar: 'المعالجة الصناعية' },
  'minerals.capability.2.desc': { en: 'Equipped with specialized crushing, sorting, and grading technology.', zh: '配备专业的破碎、分拣和分级技术。', de: 'Ausgestattet mit spezialisierter Brech-, Sortier- und Klassiertechnik.', ar: 'مجهزة بتكنولوجيا التكسير والفرز والتصنيف المتخصصة.' },
  'minerals.capability.3.title': { en: 'Unmatched Reliability', zh: '无与伦比的可靠性', de: 'Unmatched Zuverlässigkeit', ar: 'موثوقية لا مثيل لها' },
  'minerals.capability.3.desc': { en: 'Trusted by international industrial giants for bulk mineral supply.', zh: '深受国际工业巨头信任的大宗矿产供应。', de: 'Vertrauen internationaler Industriegiganten bei der Lieferung von Massenmineralien.', ar: 'موثوق به من قبل عمالقة الصناعة الدوليين لتوريد المعادن بالجملة.' },
  'seeds.sesame.title': { en: 'Sesame (Wollega & Humera)', zh: '芝麻（Wollega 和 Humera）', de: 'Sesam (Wollega & Humera)', ar: 'السمسم (ووليجا وحميرا)' },
  'seeds.sesame.desc': { en: 'Globally recognized for its high oil content and distinct aroma. Cleaned to 99% purity.', zh: '因其高含油量和独特的香气而享誉全球。清洗纯度达 99%。', de: 'Weltweit anerkannt für seinen hohen Ölgehalt und sein ausgeprägtes Aroma. Auf 99 % Reinheit gereinigt.', ar: 'معترف به عالميًا بمحتواه العالي من الزيت ورائحته المتميزة. نقي بنسبة 99٪.' },
  'seeds.soy.title': { en: 'Soybeans', zh: '大豆', de: 'Sojabohnen', ar: 'فول الصويا' },
  'seeds.soy.desc': { en: 'Non-GMO Ethiopian soybeans. Excellent for oil extraction and animal feed industries.', zh: '非转基因埃塞俄比亚大豆。非常适合榨油和动物饲料行业。', de: 'Gentechnikfreie äthiopische Sojabohnen. Hervorragend geeignet für die Ölextraktion und die Tierfutterindustrie.', ar: 'فول الصويا الإثيوبي غير المعدل وراثيًا. ممتاز لاستخراج الزيت وصناعات علف الحيوانات.' },
  'seeds.niger.title': { en: 'Linseed / Niger Seeds', zh: '亚麻籽 / 尼日尔种子', de: 'Leinsamen / Nigersaat', ar: 'كتان / بذور النيجر' },
  'seeds.niger.desc': { en: 'Rich in healthy fats and widely used in the birdseed and oil industries.', zh: '富含健康脂肪，广泛用于鸟类饲料和石油工业。', de: 'Reich an gesunden Fetten und weit verbreitet in der Vogelfutter- und Ölindustrie.', ar: 'غنية بالدهون الصحية وتستخدم على نطاق واسع في صناعات طعام الطيور والزيوت.' },
  'seeds.purity.title': { en: 'Exceptional Purity & Standards', zh: '卓越的纯度与标准', de: 'Außergewöhnliche Reinheit & Standards', ar: 'نقاء ومعايير استثنائية' },
  'seeds.purity.desc': { en: 'We ensure our seeds are machine-cleaned, color-sorted, and graded to exceed international trade expectations.', zh: '我们确保我们的种子经过机器清洗、颜色分拣和分级，超越国际贸易预期。', de: 'Wir stellen sicher, dass unser Saatgut maschinell gereinigt, farblich sortiert und bewertet wird, um die Erwartungen des internationalen Handels zu übertreffen.', ar: 'نحن نضمن أن بذورنا نظيفة آلياً، ومفرزة بالألوان، ومصنفة لتتجاوز تطلعات التجارة الدولية.' },
  'beans.haricot.title': { en: 'White Haricot Beans', zh: '白腰豆', de: 'Weiße Gartenbohnen', ar: 'فاصوليا بيضاء' },
  'beans.haricot.desc': { en: 'Machine-cleaned and hand-picked for canning and catering industries globally.', zh: '为全球罐头和餐饮行业进行机器清洗和手工挑选。', de: 'Maschinell gereinigt und handverlesen für die Konserven- und Gastronomieindustrie weltweit.', ar: 'نظيفة آلياً ومنتقاة يدوياً لصناعات التعليب والتموين عالمياً.' },
  'beans.red.title': { en: 'Red Kidney Beans', zh: '红腰豆', de: 'Rote Kidneybohnen', ar: 'فاصوليا حمراء' },
  'beans.red.desc': { en: 'High protein and high nutrient value. Harvested from the central rift valley of Ethiopia.', zh: '高蛋白和高营养价值。采自埃塞俄比亚中部大裂谷。', de: 'Hoher Protein- und hoher Nährwert. Geerntet im zentralen Rift Valley in Äthiopien.', ar: 'بروتين عالي وقيمة غذائية عالية. تم حصادها من وادي الصدع المركزي في إثيوبيا.' },
  'beans.mung.title': { en: 'Green Mung Beans', zh: '绿豆', de: 'Grüne Mungobohnen', ar: 'ماش أخضر' },
  'beans.mung.desc': { en: 'Fast-growing demand in the global sprout and flour production industry.', zh: '在全球豆芽和面粉生产行业中的需求快速增长。', de: 'Schnell wachsende Nachfrage in der weltweiten Sprossen- und Mehlproduktionsindustrie.', ar: 'طلب متزايد بسرعة في صناعة إنتاج البراعم والدقيق العالمية.' },
  'beans.pea.title': { en: 'Haricot Beans (White Pea)', zh: '白腰豆', de: 'Weiße Gartenbohnen', ar: 'فاصوليا بيضاء (بسلة)' },
  'beans.pea.desc': { en: 'Ethiopia is a world leader in white pea bean exports. Uniform in size and moisture-controlled.', zh: '埃塞俄比亚是白腰豆出口的世界领导者。尺寸均匀且控制水分。', de: 'Äthiopien ist weltweit führend beim Export von weißen Gartenbohnen. Einheitliche Größe und feuchtigkeitskontrolliert.', ar: 'إثيوبيا رائدة عالمياً في صادرات الفاصوليا البيضاء. موحدة في الحجم ومتحكم في الرطوبة.' },
  'beans.soy.premium.title': { en: 'Premium Soybeans', zh: '高品质大豆', de: 'Premium-Sojabohnen', ar: 'فول صويا فاخر' },
  'beans.soy.premium.desc': { en: 'Non-GMO soybeans sourced from high-rainfall regions. High oil and protein content.', zh: '产自高降雨地区的非转基因大豆。含油量和蛋白质含量高。', de: 'Gentechnikfreie Sojabohnen aus niederschlagsreichen Regionen. Hoher Öl- und Proteingehalt.', ar: 'فول صويا غير معدل وراثياً يتم الحصول عليه من مناطق عالية الأمطار. محتوى عالي من الزيت والبروتين.' },
  'beans.vetch.title': { en: 'Mung Beans & Vetch', zh: '绿豆与巢菜', de: 'Mungobohnen & Wicke', ar: 'ماش وبسلة زهور' },
  'beans.vetch.desc': { en: 'Specialized legumes for sprouting and nutritional supplements. Machine-cleaned to 99.5% purity.', zh: '用于发芽和营养补充剂的专用豆类。机器清洗纯度达 99.5%。', de: 'Spezialisierte Hülsenfrüchte für Keimlinge und Nahrungsergänzungsmittel. Maschinell gereinigt auf 99,5 % Reinheit.', ar: 'بقوليات متخصصة للتنبيت والمكملات الغذائية. نظيفة آلياً بنسبة نقاء 99.5٪.' },
  'beans.guarantee.title': { en: 'Our Quality Guarantee', zh: '我们的质量保证', de: 'Unsere Qualitätsgarantie', ar: 'ضمان الجودة لدينا' },
  'beans.guarantee.desc': { en: 'Ethiopian pulses are sought after for their natural taste and superior nutritional value. We enhance this through strict protocols.', zh: '埃塞俄比亚豆类因其天然口感和卓越营养价值而备受青睐。我们通过严格的协议来增强这一点。', de: 'Äthiopische Hülsenfrüchte sind wegen ihres natürlichen Geschmacks und ihres hohen Nährwerts begehrt. Wir verstärken dies durch strenge Protokolle.', ar: 'البقوليات الإثيوبية مرغوبة لمذاقها الطبيعي وقيمتها الغذائية العالية. نحن نعزز ذلك من خلال بروتوكولات صارمة.' },
  'beans.logistics.title': { en: 'Expert Logistics for Pulses', zh: '专业的豆类物流', de: 'Expertenlogistik für Hülsenfrüchte', ar: 'خدمات لوجستية متخصصة للبقوليات' },
  'beans.logistics.bulk': { en: 'Bulk Shipments', zh: '大宗运输', de: 'Massengutsendungen', ar: 'شحنات ضخمة' },
  'beans.logistics.bulk.desc': { en: 'Large-scale containerized exports handling thousands of tons annually.', zh: '每年处理数千吨的大规模集装箱出口。', de: 'Großflächige Container-Exporte mit einem jährlichen Umschlag von Tausenden von Tonnen.', ar: 'صادرات واسعة النطاق في حاويات تتعامل مع آلاف الأطنان سنوياً.' },
  'beans.logistics.secure': { en: 'Secure Packing', zh: '安全包装', de: 'Sichere Verpackung', ar: 'تعبئة آمنة' },
  'beans.logistics.secure.desc': { en: 'Packing in 25kg, 50kg or custom bags based on client requirements.', zh: '根据客户要求提供 25kg、50kg 或定制包装袋。', de: 'Verpackung in 25 kg, 50 kg oder kundenspezifischen Beuteln basierend auf Kundenanforderungen.', ar: 'تعبئة في أكياس 25 كجم أو 50 كجم أو أكياس مخصصة بناءً على متطلبات العميل.' },
  // About Page
  'about.hero.title': { en: 'Ethical Exports, Global Standards', zh: '伦理出口，国际标准', de: 'Ethische Exporte, globale Standards', ar: 'صادرات أخلاقية ، معايير عالمية' },
  'about.vision.title': { en: 'A Vision for Ethiopia', zh: '展望埃塞俄比亚', de: 'Eine Vision für Äthiopien', ar: 'رؤية لإثيوبيا' },
  'about.vision.content': { 
    en: "Our journey is about more than just trade; it's about showcasing the unmatched quality of Ethiopian heritage to the world while empowering our local communities through sustainable industrial growth.",
    zh: "我们的旅程不仅仅是贸易；它是向世界展示埃塞俄比亚遗产无与伦比的品质，同时通过可持续的工业增长增强我们当地社区的力量。",
    de: "Bei unserer Reise geht es um mehr als nur Handel; es geht darum, der Welt die unübertroffene Qualität des äthiopischen Erbes zu präsentieren und gleichzeitig unsere lokalen Gemeinschaften durch nachhaltiges industrielles Wachstum zu stärken.",
    ar: "رحلتنا تتعلق بأكثر من مجرد تجارة ؛ يتعلق الأمر بعرض الجودة التي لا تضاهى للتراث الإثيوبي للعالم مع تمكين مجتمعاتنا المحلية من خلال النمو الصناعي المستدام."
  },
  'about.ceo.name': { en: 'Abdi Edao', zh: '阿布迪·埃道', de: 'Abdi Edao', ar: 'عبدي إيداو' },
  'about.ceo.role': { en: 'CEO & Founder', zh: '首席执行官兼创始人', de: 'CEO & Gründer', ar: 'الرئيس التنفيذي والمؤسس' },

  // Contact Page
  'contact.title': { en: 'Start Your Global Partnership', zh: '开启您的全球伙伴关系', de: 'Starten Sie Ihre globale Partnerschaft', ar: 'ابدأ شراكتك العالمية' },
  'contact.subtitle': { 
    en: 'We are ready to handle your global supply needs. Reach out to our professional team in Addis Ababa and Dubai.',
    zh: '我们已准备好处理您的全球供应需求。联系我们在亚的斯亚贝巴和迪拜的专业团队。',
    de: 'Wir sind bereit, Ihre globalen Versorgungsanforderungen zu erfüllen. Kontaktieren Sie unser professionelles Team in Addis Abeba und Dubai.',
    ar: 'نحن على استعداد للتعامل مع احتياجات التوريد العالمية الخاصة بك. تواصل مع فريقنا المحترف في أديس أبابا ودبي.'
  },
  'contact.desc': { en: 'Our strategic offices in Addis Ababa and Dubai provide us with direct access to global shipping hubs and premium agricultural markets.', zh: '我们在亚的斯亚贝巴和迪拜的战略办公室使我们能够直接进入全球航运枢纽和优质农业市场。', de: 'Unsere strategischen Büros in Addis Abeba und Dubai bieten uns direkten Zugang zu globalen Schifffahrtsdrehkreuzen und Premium-Agrarmärkten.', ar: 'توفر لنا مكاتبنا الإستراتيجية في أديس أبابا ودبي وصولاً مباشراً إلى مراكز الشحن العالمية والأسواق الزراعية المتميزة.' },
  'contact.locations': { en: 'Office Locations', zh: '办公地点', de: 'Bürostandorte', ar: 'مواقع المكاتب' },
  'contact.lines': { en: 'Direct Lines', zh: '直拨热线', de: 'Direktleitungen', ar: 'الخطوط المباشرة' },
  'contact.emails': { en: 'Email Inquiries', zh: '邮件查询', de: 'E-Mail-Anfragen', ar: 'استفسارات البريد الإلكتروني' },
  'contact.commercial': { en: 'Commercial Inquiry', zh: '业务查询', de: 'Gewerbliche Anfrage', ar: 'استفسار تجاري' },
  'contact.success.desc': { en: 'Thank you for your inquiry. Our global export team will review your requirements and contact you within 24 hours.', zh: '感谢您的查询。我们的全球出口团队将审查您的要求，并在 24 小时内与您联系。', de: 'Vielen Dank für Ihre Anfrage. Unser globales Exportteam wird Ihre Anforderungen prüfen und Sie innerhalb von 24 Stunden kontaktieren.', ar: 'شكراً لاستفسارك. سيقوم فريق التصدير العالمي لدينا بمراجعة متطلباتك والاتصال بك في غضون 24 ساعة.' },
  'form.name': { en: 'Full Name', zh: '全名', de: 'Vollständiger Name', ar: 'الاسم الكامل' },
  'form.email': { en: 'Corporate Email', zh: '公司邮箱', de: 'Firmen-E-Mail', ar: 'البريد الإلكتروني للشركة' },
  'form.subject': { en: 'Product Subject', zh: '产品主题', de: 'Thema', ar: 'الموضوع' },
  'form.message': { en: 'Message / Requirements', zh: '留言 / 需求', de: 'Nachricht / Anforderungen', ar: 'الرسالة / المتطلبات' },
  'form.send': { en: 'Send Inquiry', zh: '发送询价', de: 'Anfrage senden', ar: 'إرسال الاستفسار' },
  'form.success': { en: 'Inquiry Sent Successfully', zh: '询价发送成功', de: 'Anfrage erfolgreich gesendet', ar: 'تم إرسال الاستفسار بنجاح' },

  // Home Page Content
  'home.capacity.tag': { en: 'Our Capacity', zh: '我们的实力', de: 'Unsere Kapazität', ar: 'قدرتنا' },
  'home.capacity.title': { en: 'Production Excellence Meeting Strategic Sourcing', zh: '生产卓越，战略采购', de: 'Exzellenz in der Produktion trifft auf strategische Beschaffung', ar: 'التميز في الإنتاج يلتقي بالتوريد الاستراتيجي' },
  'home.capacity.p1': { 
    en: "Moderntech Export and Import PLC stands as a dual-force leader in Ethiopia's agricultural sector. We own and operate over 10 industrial-scale coffee farms in the fertile Oromia region.",
    zh: "Moderntech 出口和进口 PLC 是埃塞俄比亚农业领域的双重力量领导者。我们在肥沃的奥罗米亚地区拥有并经营着 10 多个工业规模的咖啡农场。",
    de: "Moderntech Export and Import PLC ist ein führendes Unternehmen im äthiopischen Agrarsektor. Wir besitzen und betreiben über 10 Kaffeefarmen im industriellen Maßstab in der fruchtbaren Region Oromia.",
    ar: "تقف شركة مودرنتيك للتصدير والاستيراد PLC كقائد مزدوج القوة في القطاع الزراعي في إثيوبيا. نحن نمتلك وندير أكثر من 10 مزارع بن صناعية في منطقة أوروميا الخصبة."
  },
  'home.capacity.p2': { 
    en: "Our unique combination of own-farm production and nationwide sourcing allows us to fulfill industrial-scale orders with consistent quality for global partners.",
    zh: "我们自家农场生产与全国采购的独特结合，使我们能够为全球合作伙伴提供质量一致的工业规模订单。",
    de: "Unsere einzigartige Kombination aus eigener Farmproduktion und landesweiter Beschaffung ermöglicht es uns, Aufträge im industriellen Maßstab mit gleichbleibender Qualität für globale Partner zu erfüllen.",
    ar: "يسمح لنا مزيجنا الفريد من إنتاج المزارع الخاصة والتوريد على مستوى البلاد بتلبية الطلبات على نطاق صناعي بجودة متسقة للشركاء العالميين."
  },
  'home.heritage.link': { en: 'Learn more about our heritage', zh: '了解我们的传统遗产', de: 'Erfahren Sie mehr über unser Erbe', ar: 'تعرف على تراثنا' },
  'home.product.view': { en: 'View Product Details', zh: '查看产品详情', de: 'Produktdetails anzeigen', ar: 'عرض تفاصيل المنتج' },
  'home.cta.title': { en: "Ready to Scale Your Import Business with Ethiopia's Finest?", zh: "准备好通过埃塞俄比亚最优质的产品扩展您的进口业务了吗？", de: "Bereit, Ihr Importgeschäft mit dem Besten aus Äthiopien auszubauen?", ar: "هل أنت مستعد لتوسيع نطاق أعمال الاستيراد الخاصة بك مع أفضل ما في إثيوبيا؟" },
  'home.cta.subtitle': { en: "Join our global network of satisfied partners. Experience reliability, quality, and professional export handling.", zh: "加入我们满意的全球合作伙伴网络。体验可靠、优质和专业的出口处理。", de: "Treten Sie unserem globalen Netzwerk zufriedener Partner bei. Erfahren Sie Zuverlässigkeit, Qualität und professionelle Exportabwicklung.", ar: "انضم إلى شبكتنا العالمية من الشركاء الراضين. جرب الموثوقية والجودة والتعامل الاحترافي مع الصادرات." },
  'home.cta.button': { en: 'Start Your Partnership Now', zh: '立即开始您的合作伙伴关系', de: 'Starten Sie jetzt Ihre Partnerschaft', ar: 'ابدأ شراكتك الآن' },
  'home.synergy.tag': { en: 'Our Strategic Group', zh: '我们的战略集团', de: 'Unsere strategische Gruppe', ar: 'مجموعتنا الاستراتيجية' },
  'home.synergy.title': { en: 'Moderntech Enterprises Group', zh: 'Moderntech 企业集团', de: 'Moderntech Enterprises Group', ar: 'مجموعة مودرنتيك للمشاريع' },
  'home.synergy.desc': { 
    en: "Connecting Ethiopia's potential through technology, manufacturing, and trade.",
    zh: "通过技术、制造和贸易连接埃塞俄比亚的潜力。",
    de: "Äthiopiens Potenzial durch Technologie, Fertigung und Handel vernetzen.",
    ar: "ربط إمكانات إثيوبيا من خلال التكنولوجيا والتصنيع والتجارة."
  },

  // Testimonials
  'testimonials.tag': { en: 'Global Partnerships', zh: '全球合作伙伴', de: 'Globale Partnerschaften', ar: 'شراكات عالمية' },
  'testimonials.title': { en: 'Trusted By Industry Leaders', zh: '深受行业领导者信任', de: 'Von Branchenführern geschätzt', ar: 'موثوق به من قبل قادة الصناعة' },
  'testimonials.1.content': { 
    en: "Moderntech's sourcing capacity in Ethiopia is unmatched. Their ability to deliver 99.5% pure sesame seeds consistently has made them our primary partner.",
    zh: "Moderntech 在埃塞俄比亚的采购能力是无与伦比的。他们持续提供 99.5% 纯度芝麻的能力使他们成为我们的主要合作伙伴。",
    de: "Die Beschaffungskapazität von Moderntech in Äthiopien ist unerreicht. Ihre Fähigkeit, konsistent 99,5 % reinen Sesam zu liefern, hat sie zu unserem Hauptpartner gemacht.",
    ar: "قدرة توريد مودرنتيك في إثيوبيا لا مثيل لها. إن قدرتهم على تقديم بذور سمسم نقية بنسبة 99.5٪ باستمرار جعلتهم شريكنا الأساسي."
  },
  'testimonials.2.content': { 
    en: "Finding an exporter that actually owns their farms in Oromia changed everything. The cup profile of their Specialty Coffee is consistently superior.",
    zh: "找到一个在奥罗米亚真正拥有农场的出口商改变了一切。他们特种咖啡的杯测表现始终优越。",
    de: "Einen Exporteur zu finden, dem die Farmen in Oromia tatsächlich gehören, hat alles verändert. Das Tassenprofil ihres Spezialitätenkaffees ist durchweg überlegen.",
    ar: "لقد غير العثور على مصدر يمتلك بالفعل مزارعه في أوروميا كل شيء. المذاق لقهوتهم المختصة متفوق باستمرار."
  },
  'export.f.coffee.1': { en: 'Owned Farm Production', zh: '自有农场生产', de: 'Eigene Farmproduktion', ar: 'إنتاج مزارع مملوكة' },
  'export.f.coffee.2': { en: 'Strategic Sourcing Network', zh: '战略采购网络', de: 'Strategisches Beschaffungsnetzwerk', ar: 'شبكة توريد استراتيجية' },
  'export.f.coffee.3': { en: 'Grade 1 & 2 Speciality', zh: '1级和2级精品', de: 'Spezialität Grad 1 & 2', ar: 'تخصص الدرجة 1 و 2' },
  'export.f.coffee.4': { en: 'Washing & Natural Process', zh: '水洗及日晒处理', de: 'Wasch- & Naturprozess', ar: 'معالجة غسيل وطبيعية' },
  'export.f.minerals.1': { en: '#1 Export Volume', zh: '#1 出口量', de: '#1 Exportvolumen', ar: 'حجم التصدير رقم 1' },
  'export.f.minerals.2': { en: 'Laboratory Verified Purity', zh: '实验室验证纯度', de: 'Laborgeprüfte Reinheit', ar: 'نقاء مختبري معتمد' },
  'export.f.minerals.3': { en: 'Conflict-Free Certified', zh: '无冲突认证', de: 'Konfliktfrei zertifiziert', ar: 'معتمد كمنتج خالٍ من النزاعات' },
  'export.f.minerals.4': { en: 'Secured Global Logistics', zh: '安全的全球物流', de: 'Gesicherte globale Logistik', ar: 'لوجستيات عالمية مؤمنة' },
  'export.v.category': { en: 'Category', zh: '类别', de: 'Kategorie', ar: 'الفئة' },
  'export.v.export': { en: 'Export', zh: '出口', de: 'Export', ar: 'تصدير' },
  'testimonials.3.content': { 
    en: "Working with Moderntech is a pleasure. Their supply of Grade 1 Yirgacheffe is consistent, and their logistics team makes the import process into Los Angeles incredibly smooth.",
    zh: "与 Moderntech 合作是一种愉快的体验。他们供应的一级耶加雪菲品质稳定，其物流团队让进入洛杉矶的进口过程变得异常顺畅。",
    de: "Die Zusammenarbeit mit Moderntech ist ein Vergnügen. Ihre Lieferung von Grade 1 Yirgacheffe ist konsistent, und ihr Logistikteam macht den Importprozess nach Los Angeles unglaublich reibungslos.",
    ar: "العمل مع مودرنتيك هو متعة. إمداداتهم من الدرجة الأولى من ييرغاتشيفي متسقة، وفريقهم اللوجستي يجعل عملية الاستيراد إلى لوس أنجلوس سلسة للغاية."
  },
  'testimonials.4.content': { 
    en: "We've audited many suppliers in East Africa. Moderntech stands out as the most professional mineral exporter. Their lithium and tantalum purity levels always meet our industrial specs.",
    zh: "我们审计了东非的许多供应商。Moderntech 是最专业的矿产出口商。他们的锂和钽纯度水平始终符合我们的工业规格。",
    de: "Wir haben viele Lieferanten in Ostafrika geprüft. Moderntech sticht als professionellster Mineralienexporteur hervor. Ihre Lithium- und Tantal-Reinheitsgrade entsprechen immer unseren Industriespezifikationen.",
    ar: "لقد قمنا بمراجعة العديد من الموردين في شرق إفريقيا. تبرز مودرنتيك كأكثر مصدري المعادن احترافاً. مستويات نقاء الليثيوم والتنتالوم لديهم تلبي دائماً مواصفاتنا الصناعية."
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
