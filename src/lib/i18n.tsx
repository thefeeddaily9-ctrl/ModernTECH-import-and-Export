import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh' | 'de' | 'ar';

interface Translation {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translation = {
  'nav.home': { en: 'Home', zh: '首页', de: 'Startseite', ar: 'الرئيسية' },
  'nav.about': { en: 'About Us', zh: '关于我们', de: 'Über uns', ar: 'من نحن' },
  'nav.exports': { en: 'Global Exports', zh: '全球出口', de: 'Globale Exporte', ar: 'صادرات عالمية' },
  'nav.coffee': { en: 'Specialty Coffee', zh: '精品咖啡', de: 'Spezialitätenkaffee', ar: 'قهوة مختصة' },
  'nav.minerals': { en: 'Minerals', zh: '矿产', de: 'Mineralien', ar: 'معادن' },
  'nav.seeds': { en: 'Seeds & Pulses', zh: '种子和脉冲', de: 'Sämereien & Hülsenfrüchte', ar: 'بذور وبقوليات' },
  'nav.logistics': { en: 'Logistics', zh: '物流', de: 'Logistik', ar: 'خدمات لوجستية' },
  'nav.imports': { en: 'Global Imports', zh: '全球进口', de: 'Globale Importe', ar: 'واردات عالمية' },
  'nav.contact': { en: 'Contact', zh: '联系', de: 'Kontakt', ar: 'اتصال' },
  
  // Hero Section
  'hero.tagline': { en: 'Authentic Ethiopian Excellence', zh: '真实的埃塞俄比亚卓越', de: 'Authentische äthiopische Exzellenz', ar: 'التميز الإثيوبي الأصيل' },
  'hero.title': { en: 'Rooted in the Soil,', zh: '扎根于土地，', de: 'Verwurzelt im Boden,', ar: 'متجذر في التربة،' },
  'hero.title.span': { en: 'Professional in Trade', zh: '专业于贸易', de: 'Professionell im Handel', ar: 'محترف في التجارة' },
  'hero.title.growth': { en: 'Bridging Ethiopian Heritage to the World', zh: '将埃塞俄比亚遗产连接到世界', de: 'Das äthiopische Erbe mit der Welt verbinden', ar: 'ربط التراث الإثيوبي بالعالم' },
  'hero.title.leading': { en: 'Reliable Heritage', zh: '可靠的传承', de: 'Zuverlässiges Erbe', ar: 'تراث موثوق' },
  'hero.subtitle': { en: 'Moderntech Export and Import PLC bridges the gap between exceptional Ethiopian resources and global demand with professional precision.', zh: 'Moderntech 出口和进口 PLC 以专业的精准度弥合了卓越的埃塞俄比亚资源与全球需求之间的差距。', de: 'Moderntech Export and Import PLC schließt die Lücke zwischen außergewöhnlichen äthiopischen Ressourcen und der weltweiten Nachfrage mit professioneller Präzision.', ar: 'شركة مودرنتيك للتصدير والاستيراد PLC تسد الفجوة بين الموارد الإثيوبية الاستثنائية والطلب العالمي بدقة مهنية.' },
  'hero.title.coffee': { en: 'A Professional Link to Ethiopian Specialty Coffee', zh: '连接埃塞俄比亚精品咖啡的专业纽带', de: 'Ein professionelles Bindeglied zu äthiopischem Spezialitätenkaffee', ar: 'رابط مهني للبن الإثيوبي المختص' },
  'hero.title.minerals': { en: 'Reliable Sourcing for High-Purity Minerals', zh: '高纯度矿产的可靠采购', de: 'Zuverlässige Beschaffung hochreiner Mineralien', ar: 'تزويد موثوق للمعادن عالية النقاء' },
  'hero.title.seeds': { en: 'Agricultural Roots, Professional Global Trade', zh: '农业根基，全球专业贸易', de: 'Landwirtschaftliche Wurzeln, professioneller Welthandel', ar: 'جذور زراعية، تجارة عالمية مهنية' },
  'hero.description': { en: 'Moderntech Export and Import PLC bridges the gap between exceptional Ethiopian resources and global demand. From our own coffee farms to high-purity minerals, we prioritize reliability and professional sourcing.', zh: 'Moderntech 出口和进口 PLC 弥合了卓越的埃塞俄比亚资源与全球需求之间的差距。从我们自己的咖啡农场到高纯度矿产，我们优先考虑可靠性和专业采购。', de: 'Moderntech Export and Import PLC schließt die Lücke zwischen außergewöhnlichen äthiopischen Ressourcen und der weltweiten Nachfrage. Von unseren eigenen Kaffeefarmen bis hin zu hochreinen Mineralien legen wir Wert auf Zuverlässigkeit und professionelle Beschaffung.', ar: 'شركة مودرنتيك للتصدير والاستيراد PLC تسد الفجوة بين الموارد الإثيوبية الاستثنائية والطلب العالمي. من مزارع البن الخاصة بنا إلى المعادن عالية النقاء، نولي الأولوية للموثوقية والتوريد المهني.' },
  'hero.cta.coffee': { en: 'Specialty Coffee', zh: '精品咖啡', de: 'Spezialitätenkaffee', ar: 'قهوة مختصة' },
  'hero.cta.minerals': { en: 'Ethiopian Minerals', zh: '埃塞俄比亚矿产', de: 'Äthiopische Mineralien', ar: 'معادن إثيوبية' },
  'hero.cta.beans': { en: 'Pulses & Oilseeds', zh: '种子和脉冲', de: 'Sämereien & Hülsenfrüchte', ar: 'بذور وبقوليات' },
  
  // Global Presence
  'coffee.hero.authority': { en: 'Our Roots', zh: '我们的根基', de: 'Unsere Wurzeln', ar: 'جذورنا' },
  'coffee.stat.owned': { en: 'Owned Farms', zh: '自有农场', de: 'Eigene Farmen', ar: 'مزارع مملوكة' },
  'coffee.stat.market': { en: 'Market Reach', zh: '市场足迹', de: 'Marktreichweite', ar: 'الوصول للسوق' },
  
  // Sections
  'section.stats.farms': { en: 'Industrial Farms', zh: '工业化农场', de: 'Industriefarmen', ar: 'مزارع صناعية' },
  'section.stats.minerals': { en: 'Mineral Portfolio', zh: '矿产组合', de: 'Mineralportfolio', ar: 'محفظة المعادن' },
  'section.stats.capacity': { en: 'Export Capacity', zh: '出口能力', de: 'Exportkapazität', ar: 'قدرة التصدير' },
  'section.stats.market': { en: 'Global Reach', zh: '全球化视野', de: 'Marktpräsenz', ar: 'الوصول العالمي' },
  'section.exports.title': { en: 'Global Export Products', zh: '全球出口产品', de: 'Globale Exportprodukte', ar: 'منتجات التصدير العالمية' },
  'section.exports.subtitle': { en: 'We combine professional grading with direct sourcing to supply high-demand commodities across three primary exports divisions.', zh: '我们将专业评级与直接采购相结合，为三个主要出口部门提供高需求大宗商品。', de: 'Wir kombinieren professionelle Einstufung mit direktem Bezug, um in drei Hauptexportbereichen stark nachgefragte Rohstoffe zu liefern.', ar: 'نحن نجمع بين التصنيف الاحترافي والتوريد المباشر لتوريد السلع عالية الطلب عبر ثلاثة أقسام تصدير رئيسية.' },
  
  // Common Buttons
  'btn.details': { en: 'View Details', zh: '查看详情', de: 'Details anzeigen', ar: 'عرض التفاصيل' },
  'btn.contact': { en: 'Contact Sales', zh: '联系销售', de: 'Vertrieb kontaktieren', ar: 'اتصل بالمبيعات' },

  // Contact Page
  'contact.title': { en: 'Start Your Global Partnership', zh: '开启您的全球伙伴关系', de: 'Starten Sie Ihre globale Partnerschaft', ar: 'ابدأ شراكتك العالمية' },
  'contact.subtitle': { 
    en: 'We are ready to handle your global supply needs. Reach out to our professional team in Addis Ababa and Dubai.',
    zh: '我们已准备好处理您的全球供应需求。联系我们在亚的斯亚贝巴和迪拜的专业团队。',
    de: 'Wir sind bereit, Ihre globalen Versorgungsanforderungen zu erfüllen. Kontaktieren Sie unser professionelles Team in Addis Abeba und Dubai.',
    ar: 'نحن على استعداد للتعامل مع احتياجات التوريد العالمية الخاصة بك. تواصل مع فريقنا المحترف في أديس أبابا ودبي.'
  },
  'contact.desc': { en: 'Our strategic offices in Addis Ababa and Dubai provide us with direct access to global shipping hubs and premium agricultural markets.', zh: '我们在亚的斯亚贝巴和迪拜的战略办公室使我们能够直接进入全球航运枢纽和优质农业市场。', de: 'Unsere strategischen Büros in Addis Abeba und Dubai bieten uns direkten Zugang zu globalen Schifffahrtsdrehkreuzen und Premium-Agrarmärkten.', ar: 'توفر لنا مكاتبنا الاستراتيجية في أديس أبابا ودبي وصولاً مباشراً إلى مراكز الشحن العالمية والأسواق الزراعية المتميزة.' },
  'contact.locations': { en: 'Our Locations', zh: '我们的位置', de: 'Unsere Standorte', ar: 'مواقعنا' },
  'contact.address.hq.title': { en: 'Addis Ababa, Ethiopia', zh: '亚的斯亚贝巴，埃塞俄比亚', de: 'Addis Abeba, Äthiopien', ar: 'أديس أبابا، إثيوبيا' },
  'contact.address.hq.desc': { en: 'Africa Avenue, Africa Insurance 3rd floor', zh: '非洲大道，非洲保险大楼3层', de: 'Africa Avenue, Africa Insurance 3. Etage', ar: 'شارع أفريقيا، أفريكا للتأمين، الطابق الثالث' },
  'contact.address.uae.title': { en: 'Dubai, UAE', zh: '迪拜，阿联酋', de: 'Dubai, VAE', ar: 'دبي، الإمارات العربية المتحدة' },
  'contact.address.uae.desc': { en: 'Strategic Business Hub, Dubai', zh: '迪拜战略商务中心', de: 'Strategisches Geschäftszentrum, Dubai', ar: 'مركز الأعمال الاستراتيجي، دبي' },
  'contact.presence.title': { en: 'Our Presence', zh: '我们的业务布局', de: 'Unsere Präsenz', ar: 'تواجدنا' },
  'contact.presence.desc': { en: 'Strategic Handling Offices in Addis Ababa and Dubai.', zh: '在亚的斯亚贝巴和迪拜设有战略处理办公室。', de: 'Strategische Abwicklungsbüros in Addis Abeba und Dubai.', ar: 'مكاتب المناولة الاستراتيجية في أديس أبابا ودبي.' },
  'contact.lines': { en: 'Direct Lines', zh: '直拨电话', de: 'Direktleitungen', ar: 'الخطوط المباشرة' },
  'contact.emails': { en: 'Emails', zh: '电子邮件', de: 'E-Mails', ar: 'البريد الإلكتروني' },
  'contact.commercial': { en: 'Commercial Inquiry', zh: '贸易咨询', de: 'Handelsanfrage', ar: 'الاستفسار التجاري' },
  'contact.success.desc': { en: 'Our team will review your inquiry and get back to you within 24 hours.', zh: '我们的团队将审查您的咨询，并在24小时内回复您。', de: 'Unser Team wird Ihre Anfrage prüfen und sich innerhalb von 24 Stunden bei Ihnen melden.', ar: 'سيقوم فريقنا بمراجعة استفسارك والرد عليك في غضون 24 ساعة.' },
  
  // Additional Labels
  'label.global_express': { en: 'Global Express', zh: '全球快递', de: 'Global Express', ar: 'إكسبريس العالمي' },
  'label.growing': { en: 'Growing', zh: '增长中', de: 'Wachsend', ar: 'متنامي' },
  'label.visit_site': { en: 'Visit Site', zh: '访问网站', de: 'Seite besuchen', ar: 'زيارة الموقع' },
  'label.our_mission': { en: 'Our Mission', zh: '我们的使命', de: 'Unsere Mission', ar: 'مهمتنا' },
  'label.mission_desc': { en: 'To be the most reliable link between Ethiopian agricultural excellence and global industry needs, delivering quality through innovation and integrity.', zh: '成为埃塞俄比亚卓越农业与全球工业需求之间最可靠的纽带，通过创新和诚信提供品质。', de: 'Die zuverlässigste Verbindung zwischen äthiopischer landwirtschaftlicher Exzellenz und globalen Industrieanforderungen zu sein und Qualität durch Innovation und Integrität zu liefern.', ar: 'أن نكون الرابط الأكثر موثوقية بين التميز الزراعي الإثيوبي واحتياجات الصناعة العالمية، ونقدم الجودة من خلال الابتكار والنزاهة.' },
  'footer.description': { 
    en: 'Connecting Ethiopian agricultural excellence and mineral wealth with global markets. Trust, reliability, and professional trade handling.',
    zh: '将埃塞俄比亚卓越的农业和矿产财富与全球市场连接起来。信任、可靠和专业的贸易处理。',
    de: 'Verbindung äthiopischer landwirtschaftlicher Exzellenz und Mineralreichtum mit globalen Märkten. Vertrauen, Zuverlässigkeit und professionelle Handelsabwicklung.',
    ar: 'ربط التميز الزراعي والثروة المعدنية الإثيوبية بالأسواق العالمية. الثقة والموثوقية والتعامل التجاري المهني.'
  },
  'footer.links': { en: 'Quick Links', zh: '快速链接', de: 'Quick Links', ar: 'روابط سريعة' },
  'footer.group': { en: 'Moderntech Group', zh: 'Moderntech 集团', de: 'Moderntech Gruppe', ar: 'مجموعة مودرنتيك' },
  'footer.contact': { en: 'Contact', zh: '联系', de: 'Kontakt', ar: 'اتصال' },
  'footer.technologies': { en: 'Moderntech Technologies', zh: 'Moderntech 技术', de: 'Moderntech Technologien', ar: 'مودرنتيك للتكنولوجيا' },
  'footer.manufacturing.domestic': { en: 'Moderntech Manufacturing', zh: 'Moderntech 制造', de: 'Moderntech Fertigung', ar: 'مودرنتيك للتصنيع' },
  'footer.manufacturing.tech': { en: 'Moderntech Technology Manufacturing PLC', zh: 'Moderntech 技术制造 PLC', de: 'Moderntech Technologiefertigung PLC', ar: 'مودرنتيك لتصنيع التكنولوجيا PLC' },
  'about.tech.telecom': { en: 'Telecom Infrastructure', zh: '电信基础设施', de: 'Telekommunikationsinfrastruktur', ar: 'البنية التحتية للاتصالات' },
  'about.tech.sales': { en: 'Sales Pipeline Solutions', zh: '销售渠道解决方案', de: 'Vertriebspipeline-Lösungen', ar: 'حلول قنوات البيع' },
  'about.manufacturing.water': { en: 'Water Bottling & Manufacturing', zh: '瓶装水生产与制造', de: 'Wasserabfüllung und -herstellung', ar: 'تعبئة المياه وتصنيعها' },
  'about.manufacturing.industrial': { en: 'Industrial Capacity', zh: '工业能力', de: 'Industrielle Kapazität', ar: 'القدرة الصناعية' },
  'about.tech_mfg.assembly': { en: 'Tech Assembly & Precision', zh: '技术组装与精密', de: 'Tech-Montage und Präzision', ar: 'تجميع التكنولوجيا والدقة' },
  'about.tech_mfg.electronic': { en: 'Local Electronic Production', zh: '本地电子生产', de: 'Lokale Elektronikproduktion', ar: 'الإنتاج الإلكتروني المحلي' },
  'about.hero.title': { en: 'Leading with integrity and agricultural heritage.', zh: '以诚信和农业遗产处于领先地位。', de: 'Führend mit Integrität und landwirtschaftlichem Erbe.', ar: 'الريادة بالنزاهة والتراث الزراعي.' },
  'footer.quicklinks': { en: 'Quick Links', zh: '快速链接', de: 'Quick Links', ar: 'روابط سريعة' },
  'footer.legal': { en: 'Legal', zh: '法律', de: 'Rechtliches', ar: 'قانوني' },
  'footer.rights': { en: 'All rights reserved.', zh: '版权所有。', de: 'Alle Rechte vorbehalten.', ar: 'جميع الحقوق محفوظة.' },

  // Imports Page
  'imports.hero.infrastructure': { en: 'Infrastructure', zh: '基础设施', de: 'Infrastruktur', ar: 'البنية التحتية' },
  'imports.cat.vehicles': { en: 'Vehicles & Transportation', zh: '车辆与运输', de: 'Fahrzeuge & Transport', ar: 'المركبات والنقل' },
  'imports.cat.vehicles.desc': { en: 'Sourcing and importing high-quality commercial and private vehicles.', zh: '采购和进口高质量的商用和私人车辆。', de: 'Beschaffung und Import hochwertiger Nutz- und Privatfahrzeuge.', ar: 'توريد واستيراد المركبات التجارية والخاصة عالية الجودة.' },
  'imports.cat.machinery': { en: 'Industrial Machinery', zh: '工业机械', de: 'Industriemaschinen', ar: 'الآلات الصناعية' },
  'imports.cat.machinery.desc': { en: 'Providing the Ethiopian industrial sector with advanced machinery and tools.', zh: '为埃塞俄比亚工业部门提供先进的机械和工具。', de: 'Versorgung des äthiopischen Industriesektors mit fortschrittlichen Maschinen und Werkzeugen.', ar: 'تزويد القطاع الصناعي الإثيوبي بالآلات والأدوات المتقدمة.' },
  'imports.cat.parts': { en: 'Spare Parts', zh: '零配件', de: 'Ersatzteile', ar: 'قطع الغيار' },
  'imports.cat.parts.desc': { en: 'Critical automotive and industrial spare parts supply chain.', zh: '关键的汽车和工业零配件供应链。', de: 'Kritische Lieferkette für Automobil- und Industrieersatzteile.', ar: 'سلسلة توريد قطع غيار السيارات والصناعية الحيوية.' },
  'imports.cat.materials': { en: 'Plastics & Materials', zh: '塑料与材料', de: 'Kunststoffe & Materialien', ar: 'البلاستيك والمواد' },
  'imports.cat.materials.desc': { en: 'Industrial plastics for water filling and food-grade packaging.', zh: '用于注水和食品级包装的工业塑料。', de: 'Industrielle Kunststoffe für die Wasserabfüllung und lebensmittelgerechte Verpackungen.', ar: 'البلاستيك الصناعي لتعبئة المياه والتغليف المخصص للمواد الغذائية.' },
  'imports.cta.quote': { en: 'Our import division supports Ethiopia\'s growing infrastructure by providing reliable access to global technical resources.', zh: '我们的进口部门通过提供全球技术资源的可靠访问，支持埃塞俄比亚不断增长的基础设施。', de: 'Unsere Importabteilung unterstützt die wachsende Infrastruktur Äthiopiens durch den zuverlässigen Zugang zu globalen technischen Ressourcen.', ar: 'يدعم قسم الاستيراد لدينا البنية التحتية المتنامية في إثيوبيا من خلال توفير وصول موثوق إلى الموارد التقنية العالمية.' },
  'imports.cta.partnership': { en: 'Inquire about import partnerships', zh: '咨询进口合作伙伴关系', de: 'Anfrage zu Import-Partnerschaften', ar: 'استفسر عن شراكات الاستيراد' },

  // Forms
  'form.name': { en: 'Full Name', zh: '全名', de: 'Vollständiger Name', ar: 'الاسم الكامل' },
  'form.email': { en: 'Email Address', zh: '电子邮件', de: 'E-Mail-Adresse', ar: 'البريد الإلكتروني' },
  'form.subject': { en: 'Subject', zh: '主题', de: 'Betreff', ar: 'الموضوع' },
  'form.message': { en: 'Message', zh: '消息', de: 'Nachricht', ar: 'الرسالة' },
  'form.send': { en: 'Send Message', zh: '发送消息', de: 'Nachricht senden', ar: 'إرسال الرسالة' },
  'form.success': { en: 'Inquiry Sent Successfully', zh: '询价发送成功', de: 'Anfrage erfolgreich gesendet', ar: 'تم إرسال الاستفسار بنجاح' },

  // Home Page Content
  'home.capacity.tag': { en: 'Authentic Growth', zh: '真实增长', de: 'Authentisches Wachstum', ar: 'نمو حقيقي' },
  'home.capacity.title': { en: 'Agricultural Roots, Industrial Future', zh: '农业根基，工业未来', de: 'Landwirtschaftliche Wurzeln, industrielle Zukunft', ar: 'جذور زراعية， مستقبل صناعي' },
  'home.capacity.p1': { 
    en: "Moderntech Export and Import PLC is grounded in real farming experience. Our journey began in the soil of Oromia, where we still own and manage coffee farms with a commitment to quality from the ground up.",
    zh: "Moderntech 出口和进口 PLC 扎根于真实的农业经验。我们的旅程始于奥罗米亚的土地，在那里我们仍然拥有并管理着咖啡农场，致力于从基础开始保证品质。",
    de: "Moderntech Export and Import PLC ist in echter landwirtschaftlicher Erfahrung verwurzelt. Unsere Reise begann in der Erde von Oromia, wo wir noch immer Kaffeefarmen besitzen und verwalten, mit einer Verpflichtung zur Qualität von Grund auf.",
    ar: "تأسست شركة مودرنتيك للتصدير والاستيراد PLC على خبرة زراعية حقيقية. بدأت رحلتنا في تربة أوروميا، حيث لا نزال نمتلك مزارع البن ونديرها مع التزام بالجودة من الألف إلى الياء."
  },
  'home.capacity.p2': { 
    en: "Understanding coffee from the farm upward allows us to build a credible reputation. As we grow into global trade, we remain connected to the agricultural heritage that made us farmers first.",
    zh: "从农场向上了解咖啡使我们能够建立可靠的声誉。随着我们在全球贸易中成长，我们仍然与让我们成为农民的农业遗产保持联系。",
    de: "Das Verständnis von Kaffee von der Farm an ermöglicht es uns, einen glaubwürdigen Ruf aufzubauen. Während wir in den Welthandel hineinwachsen, bleiben wir mit dem landwirtschaftlichen Erbe verbunden, das uns zuerst zu Farmern gemacht hat.",
    ar: "فهم القهوة من المزرعة فصاعدًا يسمح لنا ببناء سمعة موثوقة. وبينما ننمو في التجارة العالمية، نظل مرتبطين بالتراث الزراعي الذي جعلنا مزارعين أولاً."
  },
  'home.heritage.link': { en: 'Learn more about our heritage', zh: '了解我们的传统遗产', de: 'Erfahren Sie mehr über unser Erbe', ar: 'تعرف على تراثنا' },
  'home.product.view': { en: 'View Product Details', zh: '查看产品详情', de: 'Produktdetails anzeigen', ar: 'عرض تفاصيل المنتج' },
  'home.cta.title': { en: "Ready to Scale Your Import Business with Ethiopia's Finest?", zh: "准备好通过埃塞俄比亚最优质的产品扩展您的进口业务了吗？", de: "Bereit, Ihr Importgeschäft mit dem Besten aus Äthiopien auszubauen?", ar: "هل أنت مستعد لتوسيع نطاق أعمال الاستيراد الخاصة بك مع أفضل ما في إثيوبيا؟" },
  'home.cta.subtitle': { en: "Join our global network of satisfied partners. Experience reliability, quality, and professional export handling.", zh: "加入我们满意的全球合作伙伴网络。体验可靠、优质和专业的出口处理。", de: "Treten Sie unserem globalen Netzwerk zufriedener Partner bei. Erfahren Sie Zuverlässigkeit, Qualität und professionelle Exportabwicklung.", ar: "انضم إلى شبكتنا العالمية من الشركاء الراضين. جرب الموثوقية والجودة والتعامل الاحترافي مع الصادرات." },
  'home.cta.button': { en: 'Start Your Partnership Now', zh: '立即开始您的合作伙伴关系', de: 'Starten Sie jetzt Ihre Partnerschaft', ar: 'ابدأ شراكتك الآن' },
  'home.synergy.tag': { en: 'Our Strategic Group', zh: '我们的战略集团', de: 'Unsere strategische Gruppe', ar: 'مجموعتنا الاستراتيجية' },
  'home.synergy.title': { en: 'Moderntech Enterprises Group', zh: 'Moderntech 企业集团', de: 'Moderntech Enterprises Group', ar: 'مجموعة مودرنتيك للمشاريع' },
  'home.synergy.desc': { 
    en: "Building potential through agricultural heritage and reliable trade.",
    zh: "通过农业遗产和可靠的贸易挖掘潜力。",
    de: "Potenzial durch landwirtschaftliches Erbe und zuverlässigen Handel aufbauen.",
    ar: "بناء الإمكانات من خلال التراث الزراعي والتجارة الموثوقة."
  },
  'home.product.coffee.desc': { 
    en: "Arabica beans from our own farms and trusted growers. We are growing from our Oromia roots into specialized trade, delivering Specialty and Commercial grades.",
    zh: "产自我们自有农场和值得信赖的种植者的阿拉伯卡咖啡豆。我们正从奥罗米亚的根基稳步发展为专业贸易商，提供精品和商业等级的产品。",
    de: "Arabica-Bohnen von unseren eigenen Farmen und vertrauenswürdigen Anbauern. Wir wachsen von unseren Wurzeln in Oromia in den spezialisierten Handel hinein und liefern Spezialitäten- und Handelsqualitäten.",
    ar: "حبوب أرابيكا من مزارعنا ومن مزارعين موثوقين. نحن ننمو من جذورنا في أوروميا إلى تجارة متخصصة، ونقدم درجات متميزة وتجارية."
  },
  'home.product.minerals.desc': { 
    en: "A reliable sourcing partner for Ethiopian minerals. We provide a steady supply of high-purity gold, tantalum, and precious gemstones for global industries.",
    zh: "埃塞俄比亚矿产的可靠采购伙伴。我们为全球工业提供高纯度黄金、钽和珍贵宝石的稳定供应。",
    de: "Ein zuverlässiger Beschaffungspartner für äthiopische Mineralien. Wir bieten eine stetige Versorgung mit hochreinem Gold, Tantal und Edelsteinen für globale Industrien.",
    ar: "شريك توريد موثوق للمعادن الإثيوبية. نحن نوفر إمدادات ثابتة من الذهب عالي النقاء والتنتالوم والأحجار الكريمة الثمينة للصناعات العالمية."
  },
  'home.product.seeds.desc': { 
    en: "High-protein beans and uniform oilseeds. We focus on machine-cleaning and careful processing to meet the standards of international markets.",
    zh: "高蛋白豆类和均匀的油籽。我们专注于机器清洗和精细加工，以满足国际市场的标准。",
    de: "Eiweißreiche Bohnen und gleichmäßige Ölsaaten. Wir konzentrieren uns auf die maschinelle Reinigung und sorgfältige Verarbeitung, um die Standards internationaler Marken zu erfüllen.",
    ar: "بقوليات عالية البروتين وبذور زيتية موحدة. نحن نركز على التنظيف الآلي والمعالجة الدقيقة لتلبية معايير الأسواق الدولية."
  },
  
  // Stats
  'stat.owned_farms': { en: 'Managed Farms', zh: '管理农场', de: 'Verwaltete Farmen', ar: 'مزارع مدارة' },
  'stat.mineral_source': { en: 'Mineral Sources', zh: '矿产资源', de: 'Mineralquellen', ar: 'مصادر المعادن' },
  'stat.global_reach': { en: 'Global Presence', zh: '全球化视野', de: 'Globale Präsenz', ar: 'حضور عالمي' },
  
  // Coffee specific
  'coffee.quality.p1': { 
    en: "We are investing in our washing stations and hulling facilities as we grow. Our coffee undergoes careful verification to ensure it meets the expectations of our international partners.",
    zh: "随着我们的成长，我们不断投资于水洗站和脱壳设施。我们的咖啡经过仔细的验证，以确保其符合国际合作伙伴的期望。",
    de: "Wir investieren in unsere Waschstationen und Enthülsungsanlagen, während wir wachsen. Unser Kaffee wird einer sorgfältigen Prüfung unterzogen, um sicherzustellen, dass er den Erwartungen unserer internationalen Partner entspricht.",
    ar: "نحن نستثمر in محطات الغسل ومرافق التقشير الخاصة بنا مع نمونا. تخضع قهوتنا لعملية تحقق دقيقة لضمان تلبيتها لتوقعات شركائنا الدوليين."
  },
  'coffee.stat.market_growth': { en: 'Steady Expansion', zh: '稳步扩张', de: 'Stetige Expansion', ar: 'توسع ثابت' },
  'coffee.region.yirgacheffe': { en: 'Citrusy and floral, light-bodied.', zh: '带有柑橘和花香，口感轻盈。', de: 'Zitrusartig und blumig, leicht.', ar: 'حمضيات وأزهار، خفيفة القوام.' },
  'coffee.region.sidamo': { en: 'Deep fruity notes with a rich aroma.', zh: '具有浓郁的果香和香气。', de: 'Tiefe fruchtige Noten mit reichem Aroma.', ar: 'نغمات فاكهية عميقة مع رائحة غنية.' },
  'coffee.region.guji': { en: 'Complex flavors with hints of jasmine.', zh: '口味复杂，带有茉莉花的芳香。', de: 'Komplexe Aromen mit einem Hauch von Jasmin.', ar: 'نكهات معقدة مع لمحات من الياسمين.' },
  'coffee.region.jimma': { en: 'Bold, winey, and distinctively spicy.', zh: '口感醇厚、具有酒香和独特香气。', de: 'Kräftig, weinig und charakteristisch würzig.', ar: 'جريئة، نبيذية، وحارة بشكل مميز.' },

  // Minerals Page
  'minerals.gold.title': { en: 'High-Purity Gold Ores', zh: '高纯度金矿石', de: 'Hochreine Golderze', ar: 'خامات ذهب عالية النقاء' },
  'minerals.hero.specialty': { en: 'Ethiopian specialty sourcing', zh: '埃塞俄比亚专业采购', de: 'Äthiopische Spezialbeschaffung', ar: 'توريد إثيوبي متخصص' },
  'home.export.title': { en: 'Strategic Mineral Sourcing', zh: '战略矿产采购', de: 'Strategische Mineralbeschaffung', ar: 'توريد المعادن الاستراتيجي' },
  'minerals.gold.desc': { en: 'Sourced from verified mineral-rich regions, ensuring ethical extraction and consistent fine gold content through modern aggregation.', zh: '源自经过验证的矿产资源丰富地区，通过现代聚合确保道德提取和一致的一级黄金含量。', de: 'Aus verifizierten mineralstoffreichen Regionen stammend, was eine ethische Gewinnung und einen konsistenten Feingoldgehalt durch moderne Aggregation gewährleistet.', ar: 'مصدرها مناطق غنية بالمعادن تم التحقق منها، مما يضمن الاستخراج الأخلاقي ومحتوى الذهب الناعم المتسق من خلال التجميع الحديث.' },
  'minerals.tech.title': { en: 'Tantalum & Critical Minerals', zh: '钽及关键矿产', de: 'Tantal und kritische Mineralien', ar: 'التنتالوم والمعادن الحيوية' },
  'minerals.tech.desc': { en: 'Providing critical raw materials for global technology, sourced under strict compliance with conflict-free mineral standards.', zh: '按照无冲突矿产标准严格合规地为全球技术提供关键原材料。', de: 'Bereitstellung kritischer Rohstoffe für die globale Technologie, die unter strikter Einhaltung der Standards für konfliktfreie Mineralien bezogen werden.', ar: 'توفير المواد الخام الحيوية للتكنولوجيا العالمية، والتي يتم الحصول عليها في ظل امتثال صارم لمعايير المعادن الخالية من النزاعات.' },
  'minerals.gems.title': { en: 'Rough Gemstones', zh: '原石', de: 'Rohedelsteine', ar: 'أحجار كريمة خام' },
  'minerals.gems.desc': { en: 'Direct access to raw Opals, Emeralds, and Sapphires from Ethopia’s diverse geological landscapes.', zh: '直接从埃塞俄比亚多样化的地质景观中获取原欧宝、祖母绿和蓝宝石。', de: 'Direkter Zugang zu rohen Opalen, Smaragden und Saphiren aus den vielfältigen geologischen Landschaften Äthiopiens.', ar: 'وصول مباشر إلى الأوبال والزمرد والياقوت الخام من المناظر الطبيعية الجيولوجية المتنوعة في إثيوبيا.' },
  'minerals.standards.gold': { en: 'Dore Bar Grade', zh: '金块级', de: 'Dore-Bar-Qualität', ar: 'درجة سبائك دوري' },
  'minerals.standards.grade': { en: 'Ta2O5 Concentrate', zh: '五氧化二钽浓縮物', de: 'Ta2O5-Konzentrat', ar: 'مركز Ta2O5' },
  'minerals.standards.ethical': { en: 'Traceable Sourcing', zh: '可追溯采购', de: 'Rückverfolgbare Beschaffung', ar: 'توريد قابل للتتبع' },
  'minerals.leadership.tag': { en: 'Reliable Sourcing', zh: '可靠的采购', de: 'Zuverlässige Beschaffung', ar: 'توريد موثوق' },
  'minerals.leadership.title': { en: 'Strategic Sourcing Partner', zh: '战略采购伙伴', de: 'Strategischer Beschaffungspartner', ar: 'شريك توريد استراتيجي' },
  'minerals.processing.title': { en: 'Modern Handling & Accountability', zh: '现代管理与责任', de: 'Modernes Handling & Verantwortlichkeit', ar: 'المناولة الحديثة والمساءلة' },
  'minerals.capability.desc': { en: 'As we expand our presence, we are building infrastructure to bridge the gap between extraction and global export needs.', zh: '随着我们扩展业务，我们正在建设基础设施，以弥合开采与全球出口需求之间的差距。', de: 'Während wir unsere Präsenz ausbauen, errichten wir Infrastrukturen, um die Lücke zwischen Gewinnung und globalen Exportbedürfnissen zu schließen.', ar: 'بينما نوسع تواجدنا، نقوم ببناء بنية تحتية لسد الفجوة بين الاستخراج واحتياجات التصدير العالمية.' },
  'minerals.capability.1.title': { en: 'Direct Supply', zh: '直接供应', de: 'Direktlieferung', ar: 'توريد مباشر' },
  'minerals.capability.1.desc': { en: 'Partnering directly with local mining communities.', zh: '直接与当地矿业社区合作。', de: 'Direkte Partnerschaft mit lokalen Bergbaugemeinden.', ar: 'الشراكة المباشرة مع مجتمعات التعدين المحلية.' },
  'minerals.capability.2.title': { en: 'Quality Assurance', zh: '质量保证', de: 'Qualitätssicherung', ar: 'ضمان الجودة' },
  'minerals.capability.2.desc': { en: 'Verification of mineral purity and grade standards.', zh: '矿产纯度和等级标准的验证。', de: 'Überprüfung der Mineralreinheit und Qualitätsstandards.', ar: 'التحقق من نقاء المعادن ومعايير الدرجة.' },
  'minerals.capability.3.title': { en: 'Secure Transport', zh: '安全运输', de: 'Sicherer Transport', ar: 'نقل آمن' },
  'minerals.capability.3.desc': { en: 'Professional logistics handling for high-value ores.', zh: '高价值矿石的专业物流处理。', de: 'Professionelle Logistikabwicklung für hochwertige Erze.', ar: 'التعامل اللوجستي المهني للخامات عالية القيمة.' },

  // About Page Revisions
  'about.tech.desc': { 
    en: "Connecting businesses through professional technological infrastructure and telecommunication solutions.",
    zh: "通过专业的工业和电信解决方案连接企业。",
    de: "Unternehmen durch professionelle technologische Infrastruktur und Telekommunikationslösungen vernetzen.",
    ar: "ربط الشركات من خلال البنية التحتية التكنولوجية المهنية وحلول الاتصالات."
  },
  'about.manufacturing.desc': { 
    en: "Our industrial division focused on quality domestic production, including high-standard bottled water.",
    zh: "我们的工业部门专注于高质量的国内生产，包括高标准的瓶装水。",
    de: "Unsere Industrieabteilung konzentriert sich auf eine hochwertige inländische Produktion, einschließlich qualitativ hochwertigem Mineralwasser.",
    ar: "يركز قسمنا الصناعي على الإنتاج المحلي عالي الجودة، بما في ذلك المياه المعبأة ذات المعايير العالية."
  },
  'about.tech_mfg.desc': { 
    en: "Dedicated to professional tech assembly and local electronic manufacturing, expanding Ethiopia's industrial potential.",
    zh: "致力于专业的技术组装和本地电子制造，扩大埃塞俄比亚的工业潜力。",
    de: "Spezialisiert auf professionelle Tech-Montage und lokale Elektronikfertigung, um das industrielle Potenzial Äthiopiens auszubauen.",
    ar: "مكرسة لتجميع التكنولوجيا الاحترافية والتصنيع الإلكتروني المحلي، مما يوسع الإمكانات الصناعية لإثيوبيا."
  },
  'about.advantage.title': { en: 'Why Partner With Us', zh: '为什么选择我们', de: 'Warum mit uns zusammenarbeiten', ar: 'لماذا تتعامل معنا' },
  'about.advantage.1.desc': { en: "Experience in navigating international trade and professional logistics handling.", zh: "在处理国际贸易和专业物流方面拥有经验。", de: "Erfahrung in der Abwicklung des internationalen Handels und professionelle logistische Handhabung.", ar: "خبرة في إدارة التجارة الدولية والتعامل اللوجستي المهني." },
  'about.advantage.2.desc': { en: "Agricultural heritage that ensures traceability from the farm upward.", zh: "确保从农场向上可追溯性的农业遗产。", de: "Landwirtschaftliches Erbe, das die Rückverfolgbarkeit vom Hof an sicherstellt.", ar: "تراث زراعي يضمن التتبع من المزرعة فصاعدًا." },
  'about.advantage.3.desc': { en: "A growing multi-sector group with a commitment to steady expansion.", zh: "一个致力于稳步扩张的成长型跨行业集团。", de: "Eine wachsende, sektorübergreifende Gruppe, die sich einer stetigen Expansion verschrieben hat.", ar: "مجموعة متنامية متعددة القطاعات تلتزم بالتوسع الثابت." },
  'about.vision.title': { en: 'Building links through trust.', zh: '通过信任建立联系。', de: 'Verbindungen durch Vertrauen aufbauen.', ar: 'بناء روابط من خلال الثقة.' },
  'about.vision.content': { en: 'Our goal is to grow with purpose, grounding our expansion in the authenticity of our origins.', zh: '我们的目标是有目的地成长，使我们的扩张植根于起源的真实性。', de: 'Unser Ziel ist es, zielgerichtet zu wachsen und unsere Expansion in der Authentizität unserer Ursprünge zu verankern.', ar: 'هدفنا هو النمو بهدف، وتأصيل توسعنا في أصالة أصولنا.' },
  'about.ceo.name': { en: 'Mr. Adnew Siyum (Eng.)', zh: 'Adnew Siyum 先生 (工程师)', de: 'Adnew Siyum (Ingr.)', ar: 'السيد آدنيو سيوم (مهندس)' },
  'about.ceo.role': { en: 'Managing Director & Founder', zh: '总经理兼创始人', de: 'Geschäftsführer & Gründer', ar: 'المدير العام والمؤسس' },

  // Testimonials
  'testimonials.tag': { en: 'Global Partnerships', zh: '全球合作伙伴', de: 'Globale Partnerschaften', ar: 'شراكات عالمية' },
  'testimonials.title': { en: 'Growing Through Shared Trust', zh: '通过共同的信任成长', de: 'Wachsen durch gemeinsames Vertrauen', ar: 'النمو من خلال الثقة المشتركة' },
  'testimonials.1.content': { 
    en: "Working with a partner that actually understands the soil is refreshing. Moderntech's focus on authenticity makes them a valued partner for our supply needs.",
    zh: "与真正了解土壤的伙伴合作令人耳目一新。Moderntech 对真实性的关注使他们成为我们供应需求的重要合作伙伴。",
    de: "Die Zusammenarbeit mit einem Partner, der den Boden tatsächlich versteht, ist erfrischend. Der Fokus von Moderntech auf Authentizität macht sie zu einem geschätzten Partner für unsere Versorgungsbedürfnisse.",
    ar: "العمل مع شريك يفهم التربة حقًا أمر منعش. تركيز مودرنتيك على الأصالة يجعلهم شريكًا قيمًا لاحتياجات التوريد لدينا."
  },
  'testimonials.2.content': { 
    en: "Farming roots provide a level of credibility others lack. Their Specialty Coffee reflects genuine care and agricultural dedication.",
    zh: "耕作根基提供了一种其他出口商所缺乏的信誉。他们的精品咖啡反映了真实的关怀和农业奉献。",
    de: "Landwirtschaftliche Wurzeln verleihen eine Glaubwürdigkeit, die anderen fehlt. Ihr Spezialitätenkaffee spiegelt echte Sorgfalt und landwirtschaftliches Engagement wider.",
    ar: "توفر الجذور الزراعية مستوى من المصداقية يفتقر إليه الآخرون. تعكس قهوتهم المختصة اهتمامًا حقيقيًا وتفانيًا زراعيًا."
  },
  
  // Export Features
  'export.f.coffee.1': { en: 'Rooted in Farming', zh: '植根于耕作', de: 'In der Landwirtschaft verwurzelt', ar: 'متجذر في الزراعة' },
  'export.f.coffee.2': { en: 'Expanding Network', zh: '扩展中的网络', de: 'Expandierendes Netzwerk', ar: 'شبكة متوسعة' },
  'export.f.coffee.3': { en: 'Honest Quality', zh: '诚实的品质', de: 'Ehrliche Qualität', ar: 'جودة صادقة' },
  'export.f.coffee.4': { en: 'Careful Processing', zh: '细心的加工', de: 'Sorgfältige Verarbeitung', ar: 'معالجة دقيقة' },
  'export.f.minerals.1': { en: 'Growing Supply Lines', zh: '不断扩大的供应线', de: 'Wachsende Versorgungslinien', ar: 'خطوط إمداد متنامية' },
  'export.f.minerals.2': { en: 'Laboratory Verified Purity', zh: '实验室验证纯度', de: 'Laborgeprüfte Reinheit', ar: 'نقاء مختبري معتمد' },
  'export.f.minerals.3': { en: 'Conflict-Free Certified', zh: '无冲突认证', de: 'Konfliktfrei zertifiziert', ar: 'معتمد كمنتج خالٍ من النزاعات' },
  'export.f.minerals.4': { en: 'Secured Global Logistics', zh: '安全的全球物流', de: 'Gesicherte globale Logistik', ar: 'لوجستيات عالمية مؤمنة' },
  'export.f.seeds.1': { en: 'SGS Certified Quality', zh: 'SGS 认证质量', de: 'SGS-zertifizierte Qualität', ar: 'جودة معتمدة من SGS' },
  'export.f.seeds.2': { en: 'Machine Sorting Technology', zh: '机器分拣技术', de: 'Maschinelle Sortiertechnik', ar: 'تقنية الفرز الآلي' },
  'export.f.seeds.3': { en: 'Consistent Bulk Supply', zh: '持续的大宗供应', de: 'Konsistente Massenversorgung', ar: 'توريد مستمر بالجملة' },
  'export.f.seeds.4': { en: 'Harvest Traceability', zh: '收获可追溯性', de: 'Rückverfolgbarkeit der Ernte', ar: 'تتبع الحصاد' },

  // Unified Seeds & Pulses translations
  'hero.cta.seeds': { en: 'Oilseeds & Pulses', zh: '油籽与脉冲豆类', de: 'Ölsaaten & Hülsenfrüchte', ar: 'البذور الزيتية والبقوليات' },
  'seeds.purity.title': { en: 'Purity, Quality & Traceability', zh: '纯度、质量与可追溯性', de: 'Reinheit, Qualität & Rückverfolgbarkeit', ar: 'النقاء والجودة والتتبع' },
  'seeds.purity.desc': { en: 'We combine advanced machine-cleaning with thorough hand-sorting to deliver crops matching exact international grading standards.', zh: '我们将先进的机器清洗与细致的人工分拣相结合，提供符合国际分级标准的作物。', de: 'Wir kombinieren fortschrittliche maschinelle Reinigung mit sorgfältiger Handsortierung, um Ernten zu liefern, die den internationalen Sortierstandards entsprechen.', ar: 'نحن نجمع بين التنظيف الآلي المتقدم والفرز اليدوي الدقيق لتقديم محاصيل تطابق معايير التصنيف الدولية.' },
  'seeds.sesame.title': { en: 'Humera & Wollega Sesame Seeds', zh: 'Humera 和 Wollega 芝麻', de: 'Humera & Wollega Sesamsamen', ar: 'سمسم هوميرا ووليجا الممتاز' },
  'seeds.sesame.desc': { en: 'Known worldwide for their rich oil content and distinct nutty aroma, our sesame seeds are machine-cleaned to achieve the highest standards of purity.', zh: '因其丰富的含油量和独特的坚果香气而闻名于世，我们的芝麻经过机器清洁以达到最高纯度标准。', de: 'Weltweit bekannt für ihren hohen Ölgehalt und ihr ausgeprägtes nussiges Aroma. Unsere Sesamsamen werden maschinell gereinigt, um höchste Reinheitsstandards zu erfüllen.', ar: 'معروف عالمياً بمحتواه الغني من الزيت ورائحته الجوزية المميزة، يتم تنظيف بذور السمسم لدينا آلياً لتحقيق أعلى معايير النقاء.' },
  'seeds.soy.title': { en: 'Non-GMO Soybeans', zh: '非转基因大豆', de: 'GVO-freie Sojabohnen', ar: 'فول الصويا غير المعدل وراثياً' },
  'seeds.soy.desc': { en: 'Cultivated under natural sunshine, our soybeans present excellent protein and oil profiles with strict quality grading to satisfy global demand.', zh: '在自然阳光下栽培，我们的大豆具有优异的蛋白质和油脂特性，经过严格的质量分级，满足全球需求。', de: 'Unter natürlicher Sonne angebaut, weisen unsere Sojabohnen hervorragende Protein- und Ölprofile bei strenger Qualitätsklassifizierung auf, um den globalen Bedarf zu decken.', ar: 'يُزرع فول الصويا لدينا تحت أشعة الشمس الطبيعية، ويتميز بخصائص ممتازة من البروتين والزيت مع تصنيف جودة صارم لتلبية الطلب العالمي.' },
  'seeds.niger.title': { en: 'Niger Seeds (Neug)', zh: '尼日尔油籽 (Neug)', de: 'Nigersamen (Neug)', ar: 'بذور النيجر (نيوج)' },
  'seeds.niger.desc': { en: 'Rich in oil content and uniform in size, our niger seeds are carefully cleaned and sorted to exceed standard specifications for premium food applications.', zh: '含油量丰富且规格均匀，我们的尼日尔种子经过仔细清洗和分拣，超过优质食品应用的标准规格。', de: 'Nigersamen mit hohem Ölgehalt und gleichmäßiger Größe, sorgfältig gereinigt und sortiert, um die Standardvorgaben für Premium-Lebensmittelanwendungen zu übertreffen.', ar: 'تتميز بذور النيجر بغناها بمحتوى الزيت وتناسق حجمها، ويتم تنظيفها وفرزها بعناية لتتجاوز المواصفات القياسية للتطبيقات الغذائية الممتازة.' },
  'seeds.chickpea.title': { en: 'Kabuli & Desi Chickpeas', zh: '鹰嘴豆', de: 'Kabuli & Desi Kichererbsen', ar: 'حمص كابولي وديسي' },
  'seeds.chickpea.desc': { en: 'Sorted using mechanical gravimetric separators, our chickpeas are highly nutritious, uniform, and loaded with rich plant-based energy.', zh: '使用机械重力分选机筛选，我们的鹰嘴豆营养丰富、规格均匀，并富含丰富的植物性蛋白质。', de: 'Kichererbsen, sortiert mit mechanischen Schwerkrafttrennern, sind äußerst nahrhaft, gleichmäßig und vollgepackt mit pflanzlicher Energie.', ar: 'يتم فرز الحمص لدينا باستخدام فواصل الجاذبية الميكانيكية، وهو مغذٍ للغاية، ومتناسق، ومليء بالطاقة النباتية الغنية.' },
  'seeds.haricot.title': { en: 'White Pea/Haricot Beans', zh: '白豌豆/菜豆', de: 'Weiße Bohnen (Haricot)', ar: 'فاصوليا بيضاء / حبة هاريكوت' },
  'seeds.haricot.desc': { en: 'A key staple of agricultural export trade, highly uniform, hand-sorted, and stored under ideal moisture-controlled conditions to preserve freshness.', zh: '农业出口贸易的核心作物，规格高度均匀、经过人工挑选并储存于最理想的控湿系统中以保持新鲜。', de: 'Ein wichtiges Grundnahrungsmittel des Agrarexporthandels, sehr gleichmäßig, handverlesen und unter idealen, feuchtigkeitskontrollierten Bedingungen gelagert, um die Frische zu bewahren.', ar: 'عنصر أساسي في تجارة التصدير الزراعية، متناسق للغاية، يتم فرزه يدوياً وحفظه في ظروف مثالية يتم التحكم في رطوبتها للحفاظ على النضارة.' },

  'export.f.beans.1': { en: '99.5% Machine Cleaned', zh: '99.5% 机器清洗', de: '99,5 % maschinell gereinigt', ar: 'تنظيف آلي بنسبة 99.5٪' },
  'export.f.beans.2': { en: 'Non-GMO Identification', zh: '非转基因识别', de: 'GVO-freie Identifizierung', ar: 'تحديد المنتجات غير المعدلة وراثياً' },
  'export.f.beans.3': { en: 'Planned Supply Chains', zh: '规划的供应链', de: 'Geplante Lieferketten', ar: 'سلاسل توريد مخططة' },
  'export.f.beans.4': { en: 'Agricultural Roots', zh: '农业根基', de: 'Landwirtschaftliche Wurzeln', ar: 'جذور زراعية' },
  'export.v.category': { en: 'Category', zh: '类别', de: 'Kategorie', ar: 'الفئة' },
  'export.v.export': { en: 'Export', zh: '出口', de: 'Export', ar: 'تصدير' },

  // Additional Testimonials
  'testimonials.3.content': { 
    en: "Working with Moderntech is a pleasure. Their supply is consistent, and their logistics team makes the import process incredibly smooth.",
    zh: "与 Moderntech 合作是一种愉快的体验。他们的供应品质稳定，其物流团队让进口过程变得异常顺畅。",
    de: "Die Zusammenarbeit mit Moderntech ist ein Vergnügen. Ihre Lieferung ist konsistent, und ihr Logistikteam macht den Importprozess unglaublich reibungslos.",
    ar: "العمل مع مودرنتيك هو متعة. إمداداتهم متسقة، وفريقهم اللوجستي يجعل عملية الاستيراد سلسة للغاية."
  },
  'testimonials.4.content': { 
    en: "Professional and reliable. Moderntech stands out as an emerging force in the mineral sector, always meeting our industrial specs.",
    zh: "专业且可靠。Moderntech 作为矿产领域的新兴力量脱颖而出，始终符合我们的工业规格。",
    de: "Professionell und zuverlässig. Moderntech sticht als aufstrebende Kraft im Mineraliensektor hervor und erfüllt immer unsere Industriespezifikationen.",
    ar: "محترف وموثوق. تبرز مودرنتيك كقوة ناشئة في قطاع المعادن، حيث تلبي دائماً مواصفاتنا الصناعية."
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[lang] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}
