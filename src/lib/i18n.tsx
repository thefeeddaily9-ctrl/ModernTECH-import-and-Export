import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh' | 'de' | 'ar';

interface Translation {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translation = {
  // Navigation
  'nav.home': { en: 'Home', zh: '首页', de: 'Startseite', ar: 'الرئيسية' },
  'nav.about': { en: 'About Us', zh: '关于我们', de: 'Über uns', ar: 'من نحن' },
  'nav.exports': { en: 'Exports', zh: '出口业务', de: 'Exporte', ar: 'الصادرات' },
  'nav.coffee': { en: 'Ethiopian Coffee', zh: '埃塞俄比亚生咖啡豆', de: 'Äthiopischer Rohkaffee', ar: 'البن الإثيوبي الأخضر' },
  'nav.minerals': { en: 'Minerals', zh: '矿产资源', de: 'Mineralien', ar: 'المعادن' },
  'nav.seeds': { en: 'Oilseeds & Pulses', zh: '油籽与豆类', de: 'Ölsaaten & Hülsenfrüchte', ar: 'البذور الزيتية والبقوليات' },
  'nav.imports': { en: 'Imports', zh: '进口业务', de: 'Importe', ar: 'الواردات' },
  'nav.contact': { en: 'Contact Us', zh: '联系我们', de: 'Kontakt', ar: 'اتصل بنا' },
  'whatsapp.chat': { en: 'Chat on WhatsApp', zh: '在 WhatsApp 上咨询', de: 'Auf WhatsApp chatten', ar: 'تواصل عبر واتساب' },

  // Hero Section
  'hero.tagline': { en: 'Ethiopian Coffee & Commodity Exporter', zh: '埃塞俄比亚咖啡与大宗商品出口商', de: 'Äthiopischer Kaffee- & Rohstoffexporteur', ar: 'مصدّر البن والسلع الإثيوبية' },
  'hero.title': { en: 'Ethiopian Green Coffee,', zh: '埃塞俄比亚精品生咖啡豆，', de: 'Äthiopischer Rohkaffee,', ar: 'البن الإثيوبي الأخضر،' },
  'hero.title.span': { en: 'Direct from Origin', zh: '源头产地直供', de: 'Direkt vom Ursprung', ar: 'مباشرة من بلد المنشأ' },
  'hero.title.growth': { en: 'Specialty Grades & Commercial Volumes', zh: '精品等级与大宗商业供应', de: 'Spezialitätenkaffee & Handelsvolumina', ar: 'درجات مختصة وكميات تجارية' },
  'hero.title.leading': { en: 'Traceable Sourcing', zh: '可追溯源头', de: 'Rückverfolgbare Beschaffung', ar: 'توريد قابل للتتبع' },
  'hero.subtitle': { en: 'Moderntech Export & Import PLC exports premium Ethiopian green coffee beans, high-purity minerals, and machine-cleaned oilseeds worldwide from Addis Ababa.', zh: 'Moderntech Export & Import PLC 从亚的斯亚贝巴向全球出口优质埃塞俄比亚生咖啡豆、高纯度矿产和精选油籽。', de: 'Moderntech Export & Import PLC exportiert erstklassigen äthiopischen Rohkaffee, hochreine Mineralien und gereinigte Ölsaaten weltweit von Addis Abeba aus.', ar: 'تقوم شركة مودرنتيك للتصدير والاستيراد PLC بتصدير حبوب البن الإثيوبية الخضراء الفاخرة والمعادن عالية النقاء والبذور الزيتية المنظفة آلياً إلى جميع أنحاء العالم من أديس أبابا.' },
  'hero.description': { en: 'From our managed washing stations and partner smallholders across Yirgacheffe, Guji, Sidamo, and Limu, we supply roasters and importers with Grade 1 & 2 Specialty Arabica and Grade 4/5 Commercial coffee.', zh: '从我们在耶加雪菲、古吉、西达摩和利姆的管理水洗站和合作小农户出发，我们为全球烘焙商与进口商提供 1级/2级 精品阿拉比卡以及 4/5级 商业咖啡生豆。', de: 'Von unseren Waschstationen und Partnerbauern in Yirgacheffe, Guji, Sidamo und Limu beliefern wir Röster und Importeure mit Spezialitäten- (G1/G2) und Handelskaffee (G4/G5).', ar: 'من محطات الغسل والمزارع الشريكة عبر يرجاشيفي وجوجي وسيدامو وليمو، نوفر للمحامص والمستوردين بن أرابيكا مختص من الدرجة الأولى والثانية وبن تجاري من الدرجة الرابعة والخامسة.' },
  'hero.cta.coffee': { en: 'Explore Coffee Catalog', zh: '浏览生咖啡豆目录', de: 'Kaffeekatalog ansehen', ar: 'استكشف كتالوج البن' },
  'hero.cta.minerals': { en: 'Mineral Portfolio', zh: '矿产资源', de: 'Mineralienportfolio', ar: 'محفظة المعادن' },
  'hero.cta.beans': { en: 'Oilseeds & Pulses', zh: '油籽与豆类', de: 'Ölsaaten & Hülsenfrüchte', ar: 'البذور الزيتية والبقوليات' },
  'hero.cta.seeds': { en: 'Oilseeds & Pulses', zh: '油籽与豆类', de: 'Ölsaaten & Hülsenfrüchte', ar: 'البذور الزيتية والبقوليات' },

  // Stats
  'stat.owned_farms': { en: 'Washing Stations & Farms', zh: '水洗站与合作农场', de: 'Waschstationen & Farmen', ar: 'محطات الغسيل والمزارع' },
  'stat.mineral_source': { en: 'Mineral Concessions', zh: '矿产特许供应源', de: 'Mineralienvorkommen', ar: 'امتيازات المعادن' },
  'stat.global_reach': { en: 'Export Destinations', zh: '出口目的地', de: 'Exportdestinationen', ar: 'وجهات التصدير' },
  'coffee.stat.owned': { en: 'Origin Regions', zh: '产区覆盖', de: 'Anbaugebiete', ar: 'مناطق الإنتاج' },
  'coffee.stat.market': { en: 'Global Delivery', zh: '全球交付', de: 'Weltweite Lieferung', ar: 'تسليم عالمي' },
  'coffee.stat.market_growth': { en: 'Current Crop Available', zh: '新产季现货供应', de: 'Aktuelle Ernte verfügbar', ar: 'المحصول الحالي متوفر' },
  'section.stats.farms': { en: 'Ethiopian Coffee Origins', zh: '埃塞俄比亚著名咖啡产区', de: 'Äthiopische Kaffeeursprünge', ar: 'أصول البن الإثيوبي' },
  'section.stats.minerals': { en: 'Mineral Portfolio', zh: '优质矿产组合', de: 'Mineralienportfolio', ar: 'محفظة المعادن' },
  'section.stats.capacity': { en: 'Annual Export Tons', zh: '年出口能力 (吨)', de: 'Jährliche Exporttonnen', ar: 'أطنان التصدير السنوية' },
  'section.stats.market': { en: 'Global Reach', zh: '全球覆盖', de: 'Globale Reichweite', ar: 'الوصول العالمي' },

  // Section Headers
  'section.exports.title': { en: 'Core Export Divisions', zh: '主要出口产品', de: 'Hauptexportbereiche', ar: 'أقسام التصدير الرئيسية' },
  'section.exports.subtitle': { en: 'We combine origin sourcing in Ethiopia with international grading standards and professional export logistics.', zh: '我们将埃塞俄比亚源头采购与国际分级标准和专业出口物流相结合。', de: 'Wir verbinden den direkten Bezug in Äthiopien mit internationalen Qualitätsstandards und professioneller Exportlogistik.', ar: 'نجمع بين التوريد من المنشأ في إثيوبيا ومعايير التصنيف الدولية والخدمات اللوجستية المهنية.' },

  // Coffee Catalog Specific
  'coffee.catalog.title': { en: 'Ethiopian Green Coffee Catalog', zh: '埃塞俄比亚生咖啡豆目录', de: 'Katalog für äthiopischen Rohkaffee', ar: 'كتالوج البن الإثيوبي الأخضر' },
  'coffee.catalog.subtitle': { en: '100% Arabica, Raw Unroasted Green Beans for Roasters and Importers worldwide. Harvested from Ethiopia’s premier micro-climates.', zh: '100% 阿拉比卡未烘焙生咖啡豆，专为全球烘焙商和进口商提供。采收自埃塞俄比亚优质微气候产区。', de: '100 % Arabica-Rohkaffeebohnen für Röster und Importeure weltweit. Geerntet in den besten Mikroklimazonen Äthiopiens.', ar: 'حبوب بن عربية خضراء خام بنسبة 100% غير محمصة للمحامص والمستوردين حول العالم. تم حصادها من أفضل المناخات في إثيوبيا.' },
  'coffee.hero.authority': { en: 'Single Origin & Commercial Green Coffee', zh: '单一产区精品与商业生咖啡豆', de: 'Single-Origin & Handelsrohkaffee', ar: 'بن أحادي المنشأ وتجاري أخضر' },
  'coffee.cta.bulk': { en: 'Request Coffee Quote', zh: '索取咖啡报价', de: 'Kaffee-Angebot anfordern', ar: 'طلب عرض أسعار البن' },
  'coffee.cta.network': { en: 'View Origin Specs', zh: '查看产区规格', de: 'Ursprungsspezifikationen', ar: 'عرض مواصفات المنشأ' },
  'coffee.quality.title': { en: 'Milling, Processing & Quality Control', zh: '水洗、处理与品质把控', de: 'Aufbereitung & Qualitätskontrolle', ar: 'المعالجة وضبط الجودة' },
  'coffee.quality.p1': { en: 'Every lot is sampled, moisture-tested, and cupped at our export facility in Addis Ababa before stuffing into GrainPro-lined jute bags.', zh: '每一批咖啡生豆在装入 GrainPro 内衬麻袋前，均在亚的斯亚贝巴出口中心经过抽样、水分测定和杯测评分。', de: 'Jede Charge wird in unserer Exportanlage in Addis Abeba bemustert, auf Feuchtigkeit getestet und verkostet, bevor sie in mit GrainPro ausgekleidete Jutesäcke verpackt wird.', ar: 'يتم أخذ عينات من كل دفعة واختبار رطوبتها وتذوقها في منشأة التصدير بأديس أبابا قبل تعبئتها في أكياس الجوت المبطنة بـ GrainPro.' },
  'coffee.region.moderntech': { en: 'Direct Origin Sourcing', zh: '产地直源直采', de: 'Direkter Ursprungsbezug', ar: 'توريد مباشر من المنشأ' },
  
  // Coffee Origins Descriptions
  'coffee.region.yirgacheffe': { en: 'Delicate floral jasmine, sweet bergamot, clean lemon blossom, silky tea-like body.', zh: '优雅茉莉花香、甜香佛手柑、清雅柠檬花、轻柔茶感质地。', de: 'Zarter Jasmin, süße Bergamotte, saubere Zitronenblüte, seidiger Teekörper.', ar: 'ياسمين زهري رقيق، برغموت حلو، زهر الليمون النقي، قوام ناعم كالشاي.' },
  'coffee.region.sidamo': { en: 'Vibrant mixed berry, candied citrus, dark chocolate undertone, juicy honeyed sweetness.', zh: '鲜明混合浆果、糖渍柑橘、黑巧克力底蕴、多汁蜂蜜甜感。', de: 'Lebendige Beeren, kandierte Zitrusfrüchte, dunkle Schokolade, saftige Süße.', ar: 'توت مشكل نابض بالحياة، حمضيات مسكرة، لمسة شوكولاتة داكنة، حلاوة عسلية.' },
  'coffee.region.guji': { en: 'Explosive blueberry, lavender, peach nectar, black tea, complex layered acidity.', zh: '浓郁蓝莓果香、薰衣草香气、白桃果泥、红茶质感与多层次果酸。', de: 'Blaubeere, Lavendel, Pfirsichnektar, Schwarztee, komplexe Säure.', ar: 'توت بري كثيف، لافندر، خوخ، شاي أسود، حموضة متوازنة ومعقدة.' },
  'coffee.region.jimma': { en: 'Deep dark cocoa, roasted nuts, heavy syrupy body, ideal for rich espresso blends.', zh: '浓郁黑可可、烘烤坚果香气、醇厚糖浆般质感，浓缩拼配的优选。', de: 'Dunkler Kakao, geröstete Nüsse, voller Körper, ideal für Espresso-Mischungen.', ar: 'كاكاو داكن عميق، مكسرات محمصة، قوام ثقيل ومثالي لخلطات الإسبريسو.' },
  'coffee.region.limu': { en: 'Sweet winey fruitiness, balanced crisp apple acidity, cinnamon spice, smooth mouthfeel.', zh: '甜润红酒发酵感、清脆苹果果酸、肉桂香料味、顺滑适口。', de: 'Weinige Fruchtigkeit, knackige Apfelsäure, Zimtwürze, weiches Mundgefühl.', ar: 'فاكهية نبيذية حلوة، حموضة تفاح مقرمشة، توابل قرفة، ملمس ناعم.' },
  'coffee.region.harrar': { en: 'Sun-dried wild mocha, dry blueberries, dark baker’s cocoa, robust heavy body.', zh: '日晒野性摩卡风味、干蓝莓、浓郁烘焙可可、醇厚饱满体感。', de: 'Sonnengereiftes Wild-Mocha, getrocknete Blaubeeren, kräftiger Körper.', ar: 'موكا برية مجففة بالشمس، توت بري مجفف، كاكاو غني، قوام ثقيل.' },
  'coffee.region.nekemte': { en: 'Pleasant fruity overtone, subtle winey notes, mild pleasant acidity, round finish.', zh: '舒适果香调性、微妙红酒微醺感、柔和果酸、圆润余韵。', de: 'Angenehme Fruchtnote, weinige Nuancen, milde Säure, runder Abgang.', ar: 'نكهات فواكه لطيفة، لمسات نبيذية خفيفة، حموضة معتدلة، نهاية مستديرة.' },

  // Packaging & Export Specs
  'coffee.spec.title': { en: 'Export Specifications & Packaging', zh: '出口标准与包装规格', de: 'Exportspezifikationen & Verpackung', ar: 'مواصفات التصدير والتعبئة' },
  'coffee.spec.moisture': { en: 'Moisture Content: 9.5% – 11.5%', zh: '水分含量：9.5% – 11.5%', de: 'Feuchtigkeitsgehalt: 9,5 % – 11,5 %', ar: 'نسبة الرطوبة: 9.5% - 11.5%' },
  'coffee.spec.packaging': { en: '60 kg Jute Bags with GrainPro / Ecotact multi-barrier liners; 30 kg vacuum cartons; Bulk container liners (~19.2 - 21.6 MT / 20ft FCL).', zh: '60公斤麻袋带 GrainPro / Ecotact 多层高阻隔内衬；30公斤真空箱装；或20尺整柜散装（约19.2 - 21.6吨）。', de: '60-kg-Jutesäcke mit GrainPro/Ecotact-Inlinern; 30-kg-Vakuumkartons; 20-Fuß-Containerladung (ca. 19,2 - 21,6 t).', ar: 'أكياس خيش سعة 60 كجم مع بطانات GrainPro / Ecotact متعددة الطبقات؛ كراتين مفرغة من الهواء سعة 30 كجم؛ حاوية 20 قدم (19.2 - 21.6 طن).' },
  'coffee.spec.shipping': { en: 'FOB Port of Djibouti or FCA Addis Ababa / Modjo Dry Port. Prompt ocean freight scheduling.', zh: 'FOB 吉布提港 或 FCA 亚的斯亚贝巴/莫乔干港。准时订舱海运。', de: 'FOB Hafen von Dschibuti oder FCA Addis Abeba / Modjo Dry Port. Schnelle Seefracht.', ar: 'تسليم FOB ميناء جيبوتي أو FCA أديس أبابا / ميناء موجو الجاف. شحن بحري سريع.' },

  // Common Buttons & Labels
  'btn.details': { en: 'View Specifications', zh: '查看规格', de: 'Spezifikationen anzeigen', ar: 'عرض المواصفات' },
  'btn.contact': { en: 'Request a Quote', zh: '索取报价', de: 'Angebot anfordern', ar: 'طلب تسعيرة' },
  'label.request_quote': { en: 'Request a Quote', zh: '索取报价', de: 'Angebot anfordern', ar: 'طلب تسعيرة' },
  'label.request_samples': { en: 'Request Samples (1-5 kg)', zh: '索取样品 (1-5 公斤)', de: 'Muster anfordern (1-5 kg)', ar: 'طلب عينات (1-5 كجم)' },
  'label.global_express': { en: 'Reliable Freight', zh: '可靠货运', de: 'Zuverlässige Fracht', ar: 'شحن موثوق' },
  'label.growing': { en: 'Expanding', zh: '持续增长', de: 'Expandierend', ar: 'متوسع' },
  'label.visit_site': { en: 'Visit Group Website', zh: '访问集团网站', de: 'Gruppen-Website besuchen', ar: 'زيارة موقع المجموعة' },
  'label.our_mission': { en: 'Our Export Mission', zh: '我们的出口使命', de: 'Unsere Exportmission', ar: 'مهمتنا التصديرية' },
  'label.mission_desc': { en: 'To deliver authentic, traceable Ethiopian green coffee and agricultural commodities directly from local farmers and washing stations to global buyers with total commercial transparency.', zh: '直接将真实、可追溯的埃塞俄比亚生咖啡豆及农产品，从本地农户和水洗站以完全的商业透明度送达全球买家。', de: 'Authentischen, rückverfolgbaren äthiopischen Rohkaffee und Agrarrohstoffe von lokalen Bauern und Waschstationen mit vollständiger Transparenz an globale Käufer zu liefern.', ar: 'تقديم بن إثيوبي أخضر وسلع زراعية أصلية وقابلة للتتبع مباشرة من المزارعين المحليين ومحطات الغسيل إلى المشترين العالميين بشفافية تجارية كاملة.' },

  // Contact Page
  'contact.title': { en: 'Commercial Inquiries & Quotes', zh: '贸易咨询与报价', de: 'Handelsanfragen & Angebote', ar: 'الاستفسارات التجارية وعروض الأسعار' },
  'contact.subtitle': { en: 'Speak directly with our export desk in Addis Ababa for green coffee contracts, sample requests, or commodity specifications.', zh: '直接与我们亚的斯亚贝巴出口中心联系，获取咖啡生豆合同、样品索取或商品详细规格。', de: 'Sprechen Sie direkt mit unserem Exportteam in Addis Abeba bezüglich Rohkaffeeverträgen, Musteranfragen oder Spezifikationen.', ar: 'تحدث مباشرة مع مكتب التصدير لدينا في أديس أبابا بخصوص عقود البن الأخضر أو طلبات العينات أو مواصفات السلع.' },
  'contact.desc': { en: 'Headquartered in Addis Ababa with regional processing hubs across Oromia and an international coordination office in Dubai.', zh: '总部位于亚的斯亚贝巴，在奥罗米亚设有区域加工中心，在迪拜设有国际协调办公室。', de: 'Hauptsitz in Addis Abeba mit regionalen Verarbeitungszentren in Oromia und einem internationalen Büro in Dubai.', ar: 'يقع المقر الرئيسي في أديس أبابا مع مراكز معالجة إقليمية عبر أوروميا ومكتب تنسيق دولي في دبي.' },
  'contact.locations': { en: 'Offices & Facilities', zh: '办公室与设施', de: 'Büros & Einrichtungen', ar: 'المكاتب والمرافق' },
  'contact.address.hq.title': { en: 'Addis Ababa, Ethiopia', zh: '亚的斯亚贝巴，埃塞俄比亚', de: 'Addis Abeba, Äthiopien', ar: 'أديس أبابا، إثيوبيا' },
  'contact.address.hq.desc': { en: 'Africa Avenue, Africa Insurance Building, 3rd Floor', zh: '非洲大道，非洲保险大厦 3 层', de: 'Africa Avenue, Africa Insurance Gebäude, 3. Etage', ar: 'شارع أفريقيا، مبنى التأمين الأفريقي، الطابق الثالث' },
  'contact.address.uae.title': { en: 'Dubai, UAE', zh: '迪拜，阿联酋', de: 'Dubai, VAE', ar: 'دبي، الإمارات العربية المتحدة' },
  'contact.address.uae.desc': { en: 'International Trade Coordination Office', zh: '国际贸易协调办事处', de: 'Büro für internationale Handelskoordination', ar: 'مكتب تنسيق التجارة الدولية' },
  'contact.presence.title': { en: 'Export Handling', zh: '出口操作', de: 'Exportabwicklung', ar: 'إدارة التصدير' },
  'contact.presence.desc': { en: 'Direct origin packing in Addis Ababa & logistics via Port of Djibouti.', zh: '亚的斯亚贝巴原产地打包，经由吉布提港海运出港。', de: 'Direkte Verpackung in Addis Abeba & Logistik über den Hafen von Dschibuti.', ar: 'تعبئة مباشرة في أديس أبابا وشحن عبر ميناء جيبوتي.' },
  'contact.lines': { en: 'Telephone & WhatsApp', zh: '电话与 WhatsApp', de: 'Telefon & WhatsApp', ar: 'الهاتف وواتساب' },
  'contact.emails': { en: 'Direct Email', zh: '电子邮箱', de: 'E-Mail-Adresse', ar: 'البريد الإلكتروني' },
  'contact.commercial': { en: 'Request Export Quotation', zh: '提交出口询价表', de: 'Exportangebot anfordern', ar: 'طلب عرض أسعار التصدير' },
  'contact.success.desc': { en: 'Your inquiry has been received. Our coffee export desk will respond with specifications and pricing within 24 hours.', zh: '您的询价已收到。我们的咖啡出口团队将在 24 小时内向您提供详细规格与价格。', de: 'Ihre Anfrage ist eingegangen. Unser Kaffee-Exportteam wird sich innerhalb von 24 Stunden mit Spezifikationen und Preisen bei Ihnen melden.', ar: 'تم استلام استفسارك. سيرد فريق تصدير البن لدينا بالمواصفات والأسعار في غضون 24 ساعة.' },

  // Forms
  'form.name': { en: 'Contact Name / Company', zh: '联系人姓名 / 公司名称', de: 'Name / Unternehmen', ar: 'اسم المسؤول / الشركة' },
  'form.email': { en: 'Work Email Address', zh: '工作电子邮件', de: 'E-Mail-Adresse', ar: 'البريد الإلكتروني للعمل' },
  'form.phone': { en: 'Phone / WhatsApp Number', zh: '电话 / WhatsApp 号码', de: 'Telefon- / WhatsApp-Nummer', ar: 'رقم الهاتف / واتساب' },
  'form.subject': { en: 'Product of Interest', zh: '感兴趣的产品', de: 'Produkt von Interesse', ar: 'المنتج المطلوب' },
  'form.quantity': { en: 'Target Volume (e.g. Sample, 10 Bags, 1 FCL Container / 19.2 MT)', zh: '预计订购量 (如: 样品, 10袋, 1个20尺集装箱 / 19.2吨)', de: 'Zielmenge (z. B. Muster, 10 Säcke, 1 FCL-Container / 19,2 t)', ar: 'الكمية المستهدفة (مثال: عينة، 10 أكياس، حاوية كاملة 19.2 طن)' },
  'form.message': { en: 'Order Details & Destination Port', zh: '订单详情与目的港口', de: 'Bestelldetails & Bestimmungshafen', ar: 'تفاصيل الطلب وميناء الوصول' },
  'form.send': { en: 'Submit Export Inquiry', zh: '发送出口咨询', de: 'Exportanfrage senden', ar: 'إرسال طلب التصدير' },
  'form.whatsapp_direct': { en: 'Send via WhatsApp', zh: '通过 WhatsApp 直接发送', de: 'Direkt per WhatsApp senden', ar: 'إرسال مباشرة عبر واتساب' },
  'form.success': { en: 'Inquiry Submitted Successfully', zh: '询价已成功提交', de: 'Anfrage erfolgreich übermittelt', ar: 'تم إرسال الاستفسار بنجاح' },

  // Home Page
  'home.capacity.tag': { en: 'Direct Ethiopian Sourcing', zh: '埃塞俄比亚原产地直采', de: 'Direkter äthiopischer Bezug', ar: 'توريد إثيوبي مباشر' },
  'home.capacity.title': { en: 'Farming Heritage, Traceable Coffee Export', zh: '深厚耕作底蕴，全程可追溯咖啡出口', de: 'Landwirtschaftliches Erbe, rückverfolgbarer Kaffee-Export', ar: 'تراث زراعي، تصدير بن قابل للتتبع' },
  'home.capacity.p1': { 
    en: "Moderntech Export & Import PLC operates with strong roots in Ethiopian agriculture. Originating in Oromia's fertile coffee zones, we manage direct partnerships with washing stations and growers to provide raw green coffee beans prepared to rigorous international standards.",
    zh: "Moderntech Export & Import PLC 扎根于埃塞俄比亚肥沃的农业土地。发源于奥罗米亚核心咖啡产区，我们与水洗处理站及种植农户直接合作，提供严格遵循国际标准的优质生咖啡豆。",
    de: "Moderntech Export & Import PLC ist tief in der äthiopischen Landwirtschaft verwurzelt. Ausgehend von den fruchtbaren Kaffeezonen in Oromia arbeiten wir direkt mit Waschstationen und Kleinbauern zusammen, um erstklassigen Rohkaffee nach strengen internationalen Standards zu liefern.",
    ar: "تعمل شركة مودرنتيك للتصدير والاستيراد PLC بجذور قوية في الزراعة الإثيوبية. انطلاقاً من مناطق البن الخصبة في أوروميا، ندير شراكات مباشرة مع محطات الغسيل والمزارعين لتقديم بن أخضر مُعد وفقاً للمعايير الدولية الصارمة."
  },
  'home.capacity.p2': { 
    en: "From cherry selection, raised-bed drying, and dry-milling in Addis Ababa to port loading at Djibouti, our operations ensure full batch traceability, moisture stability, and reliable export fulfillment.",
    zh: "从红果人工精选、非洲高架网床日晒干燥，到亚的斯亚贝巴的精细脱壳分选与吉布提港装船，我们的流程确保了批次可追溯性、稳定的水分控制及准时交付。",
    de: "Von der Auslese der Kaffeekirschen über die Trocknung auf Hochbeeten bis hin zur Trockenmühle in Addis Abeba und der Verladung in Dschibuti gewährleisten wir lückenlose Rückverfolgbarkeit, Feuchtigkeitsstabilität und verlässliche Exportabwicklung.",
    ar: "من قطف الكرز الأحمر وتجفيفه على الأسرة المرتفعة وطحنه الجاف في أديس أبابا إلى التحميل في ميناء جيبوتي، تضمن عملياتنا تتبعاً كاملاً للدفعات وثباتاً في الرطوبة وتنفيذاً موثوقاً للتصدير."
  },
  'home.heritage.link': { en: 'Read more about our operations', zh: '了解我们的出口运营', de: 'Mehr über unsere Arbeitsweise erfahren', ar: 'اقرأ المزيد عن عملياتنا' },
  'home.product.view': { en: 'View Catalog & Specs', zh: '查看目录与规格', de: 'Katalog & Spezifikationen', ar: 'عرض الكتالوج والمواصفات' },
  'home.cta.title': { en: "Source Ethiopian Green Coffee Directly for Your Roastery", zh: "为您的烘焙工坊直接采购埃塞俄比亚生咖啡豆", de: "Beziehen Sie äthiopischen Rohkaffee direkt für Ihre Rösterei", ar: "اشترِ البن الإثيوبي الأخضر مباشرة لمحمصتك" },
  'home.cta.subtitle': { en: "Connect with our export team in Addis Ababa for sample testing, current crop cupping reports, and shipping schedules.", zh: "联系我们亚的斯亚贝巴出口团队，获取样品测试、当季杯测报告及船期安排。", de: "Kontaktieren Sie unser Exportteam in Addis Abeba für Musterlieferungen, Verkostungsberichte der aktuellen Ernte und Frachtpläne.", ar: "تواصل مع فريق التصدير لدينا في أديس أبابا للحصول على عينات وتقارير تذوق المحصول وجداول الشحن." },
  'home.cta.button': { en: 'Request Current Crop Pricing', zh: '获取新产季价格单', de: 'Preise für die aktuelle Ernte anfordern', ar: 'طلب أسعار المحصول الحالي' },
  'home.synergy.tag': { en: 'Parent Organization', zh: '母集团架构', de: 'Muttergesellschaft', ar: 'المجموعة الأم' },
  'home.synergy.title': { en: 'Moderntech Enterprises', zh: 'Moderntech 企业集团', de: 'Moderntech Enterprises', ar: 'مشاريع مودرنتيك' },
  'home.synergy.desc': { 
    en: "Providing multi-sector backing and logistics coordination across exports, manufacturing, and technology.",
    zh: "为出口、制造和科技产业提供多领域的坚实后盾与物流协同支持。",
    de: "Bereitstellung von branchenübergreifender Unterstützung und Logistikkoordination in den Bereichen Export, Fertigung und Technologie.",
    ar: "توفير الدعم متعدد القطاعات والتنسيق اللوجستي عبر الصادرات والتصنيع والتكنولوجيا."
  },
  'home.product.coffee.desc': { 
    en: "100% Arabica Green Coffee Beans from Yirgacheffe, Guji, Sidamo, and Limu. Washed & Natural processing in Grade 1 & 2 Specialty and Grade 4/5 Commercial lots.",
    zh: "来自耶加雪菲、古吉、西达摩和利姆的 100% 阿拉比卡生咖啡豆。包含水洗与日晒处理，提供 G1/G2 精品级及 G4/G5 商业级。",
    de: "100 % Arabica-Rohkaffee aus Yirgacheffe, Guji, Sidamo und Limu. Gewaschen und naturaufbereitet in Spezialitäten- (G1/G2) und Handelsqualität (G4/G5).",
    ar: "حبوب بن أرابيكا خضراء 100% من يرجاشيفي وجوجي وسيدامو وليمو. معالجة مغسولة ومجففة طبيعياً بدرجات متميزة (G1/G2) وتجارية (G4/G5)."
  },
  'home.product.minerals.desc': { 
    en: "Industrial-grade raw minerals including high-purity gold ores, tantalum concentrates, and natural gemstones sourced with transparent traceability.",
    zh: "工业级矿产资源，包括高纯度金矿石、钽精矿及天然宝石，具备透明可追溯的采购链。",
    de: "Industriemineralien, einschließlich hochreiner Golderze, Tantalkonzentrate und natürlicher Edelsteine mit transparenter Rückverfolgbarkeit.",
    ar: "معادن خام صناعية تشمل خامات الذهب عالي النقاء ومركزات التنتالوم والأحجار الكريمة الطبيعية بتتبع شفاف."
  },
  'home.product.seeds.desc': { 
    en: "Machine-cleaned Humera & Wollega sesame seeds, non-GMO soybeans, chickpeas, and niger seeds meeting SGS purity criteria.",
    zh: "机器精选的胡梅拉与沃莱加芝麻、非转基因大豆、鹰嘴豆及尼日尔油籽，符合 SGS 纯度认证要求。",
    de: "Maschinell gereinigte Humera- & Wollega-Sesamsamen, GVO-freie Sojabohnen, Kichererbsen und Nigersamen gemäß SGS-Reinheitskriterien.",
    ar: "سمسم هوميرا ووليجا المنظف آلياً، وفول صويا غير معدل وراثياً، وحمص، وبذور النيجر المطابقة لمعايير النقاء."
  },

  // Export Features
  'export.f.coffee.1': { en: '100% Arabica Green Coffee', zh: '100% 阿拉比卡生咖啡豆', de: '100 % Arabica Rohkaffee', ar: 'بن أرابيكا أخضر 100%' },
  'export.f.coffee.2': { en: 'Specialty Grades 1 & 2', zh: '1级 & 2级 精品级生豆', de: 'Spezialitätenkaffee Grad 1 & 2', ar: 'درجات مختصة 1 و 2' },
  'export.f.coffee.3': { en: 'Commercial Grades 4 & 5', zh: '4级 & 5级 商业拼配生豆', de: 'Handelskaffee Grad 4 & 5', ar: 'درجات تجارية 4 و 5' },
  'export.f.coffee.4': { en: 'GrainPro Multi-Barrier Packing', zh: 'GrainPro 高阻隔保鲜包装', de: 'GrainPro-Auskleidung', ar: 'تعبئة بأكياس GrainPro المحكمة' },
  'export.f.minerals.1': { en: 'Compliant Concession Sources', zh: '合规矿区直接供应', de: 'Konforme Förderquellen', ar: 'مصادر تعدين متوافقة' },
  'export.f.minerals.2': { en: 'Laboratory Verified Purity', zh: '经实验室化验纯度', de: 'Laborgeprüfte Reinheit', ar: 'نقاء مختبري معتمد' },
  'export.f.minerals.3': { en: 'Traceable Origin Documentation', zh: '完备产地证明与溯源文件', de: 'Rückverfolgbare Dokumentation', ar: 'وثائق منشأ قابلة للتتبع' },
  'export.f.minerals.4': { en: 'Secured Air & Ocean Freight', zh: '安全可靠的航空与海运', de: 'Gesicherte Luft- & Seefracht', ar: 'شحن جوي وبحري مؤمن' },
  'export.f.seeds.1': { en: '99% Machine Cleaned Purity', zh: '99% 机器分选纯度', de: '99 % maschinelle Reinheit', ar: 'نقاء 99% منظف آلياً' },
  'export.f.seeds.2': { en: 'Non-GMO Certified Harvests', zh: '非转基因认证作物', de: 'GVO-freie Ernten', ar: 'محاصيل غير معدلة وراثياً' },
  'export.f.seeds.3': { en: 'Bulk Container Liner Loading', zh: '大宗集装箱整柜装运', de: 'Containerladung im Großgebinde', ar: 'تحميل حاويات بالجملة' },
  'export.f.seeds.4': { en: 'Controlled Moisture Retention', zh: '严格控制仓储含水率', de: 'Kontrollierte Restfeuchte', ar: 'تحكم دقيق في الرطوبة' },
  'export.v.category': { en: 'Export Division', zh: '出口门类', de: 'Exportsparte', ar: 'قسم التصدير' },
  'export.v.export': { en: 'Commodity', zh: '大宗商品', de: 'Rohstoff', ar: 'سلعة' },

  // Minerals Page
  'minerals.hero.tag': { en: 'Ethiopian Strategic Minerals', zh: '埃塞俄比亚战略矿产出口', de: 'Äthiopische strategische Mineralien', ar: 'المعادن الاستراتيجية الإثيوبية' },
  'minerals.hero.title': { en: 'Strategic Minerals & Precious Resources', zh: '战略矿产与高品位天然宝石', de: 'Strategische Mineralien & Edelsteine', ar: 'المعادن الاستراتيجية والموارد الثمينة' },
  'minerals.hero.subtitle': { en: 'Direct concession sourcing of certified high-purity gold ores, industrial tantalum concentrates, and unprocessed Ethiopian gemstones for global industrial and jewelry markets.', zh: '矿区源头直供合规高纯度金矿石、工业级钽精矿及埃塞俄比亚天然宝石原石，服务全球工业与珠宝市场。', de: 'Direkter Bezug von zertifizierten Golderzen, Tantalkonzentraten und äthiopischen Edelsteinen für weltweite Industrie- und Schmuckmärkte.', ar: 'توريد مباشر من مناطق التعدين لخامات الذهب المعتمدة ومركزات التنتالوم الصناعية والأحجار الكريمة الإثيوبية الخام للأسواق العالمية.' },
  'minerals.gold.title': { en: 'High-Purity Gold Ores', zh: '高纯度金矿石', de: 'Hochreine Golderze', ar: 'خامات ذهب عالية النقاء' },
  'minerals.gold.desc': { en: 'Sourced directly from verified Ethiopian mining zones with formal assay documentation and strict adherence to export standards.', zh: '直接来源于埃塞俄比亚认证矿区，配备官方化验单据并严格符合出口规定。', de: 'Direkt aus verifizierten äthiopischen Bergbaugebieten mit offiziellen Analysedokumenten und strikter Einhaltung der Exportnormen.', ar: 'مستخرجة مباشرة من مناطق التعدين المعتمدة في إثيوبيا مع وثائق فحص رسمية والتزام صارم بمعايير التصدير.' },
  'minerals.tech.title': { en: 'Tantalum (Ta2O5 Concentrate)', zh: '五氧化二钽精矿 (Tantalum)', de: 'Tantal (Ta2O5-Konzentrat)', ar: 'التنتالوم (مركز Ta2O5)' },
  'minerals.tech.desc': { en: 'Supplying industrial-grade tantalum concentrates for electronics and metallurgical applications, fully traceable and conflict-free.', zh: '为电子工业及冶金应用提供工业级钽精矿，全程可追溯且无冲突认证。', de: 'Lieferung von Tantalkonzentraten für Elektronik und Metallurgie, vollständig rückverfolgbar und konfliktfrei.', ar: 'توريد مركزات التنتالوم الصناعية للتطبيقات الإلكترونية والمعادن، قابلة للتتبع وخالية من النزاعات.' },
  'minerals.gems.title': { en: 'Rough Ethiopian Gemstones', zh: '埃塞俄比亚天然宝石原石', de: 'Äthiopische Rohedelsteine', ar: 'أحجار كريمة إثيوبية خام' },
  'minerals.gems.desc': { en: 'Unprocessed natural Opals from Wollo, rough Emeralds from Shakiso, and natural Sapphires inspected prior to export packaging.', zh: '来自沃洛的天然欧泊原石、沙基索的祖母绿原石和天然蓝宝石，出口前均经过严格检验。', de: 'Unbehandelte Natur-Opale aus Wollo, Smaragde aus Shakiso und Saphire, vor der Ausfuhr geprüft.', ar: 'أوبال طبيعي خام من وولو، وزمرد خام من شاكيسو، وياقوت طبيعي تم فحصه قبل التصدير.' },
  'minerals.standards.gold': { en: 'Dore Bar & Concentrates', zh: '合质金块与精矿', de: 'Dore-Barren & Konzentrat', ar: 'سبائك دوري ومركزات' },
  'minerals.standards.grade': { en: 'Ta2O5 > 30% Concentrate', zh: 'Ta2O5 含量 > 30% 精矿', de: 'Ta2O5 > 30 % Konzentrat', ar: 'مركز Ta2O5 أكثر من 30%' },
  'minerals.standards.ethical': { en: 'Ministry Certified Sourcing', zh: '矿业部认证来源', de: 'Ministeriell zertifizierter Bezug', ar: 'توريد معتمد من الوزارة' },
  'minerals.leadership.tag': { en: 'Mineral Supply Desk', zh: '矿产出口业务处', de: 'Mineralien-Exportbüro', ar: 'مكتب توريد المعادن' },
  'minerals.leadership.title': { en: 'Responsible Ethiopian Mineral Trade', zh: '合规负责的埃塞俄比亚矿产贸易', de: 'Verantwortungsvoller Mineralienhandel', ar: 'تجارة معادن إثيوبية مسؤولة' },
  'minerals.processing.title': { en: 'Assay Testing & Secure Logistics', zh: '化验检测与安全押运', de: 'Laboranalyse & Sichere Fracht', ar: 'الفحص المختبري والشحن الآمن' },
  'minerals.capability.desc': { en: 'All mineral consignments are verified through official laboratories, sealed, and handled via secured customs corridors.', zh: '所有矿产批次均经由官方指定实验室化验核准、密封并走安全海关绿色通道完成出口。', de: 'Alle Mineralienlieferungen werden durch offizielle Labore verifiziert, versiegelt und über gesicherte Zollkorridore abgewickelt.', ar: 'يتم فحص جميع شحنات المعادن من خلال مختبرات رسمية وتشميعها والتعامل معها عبر ممرات جمركية آمنة.' },
  'minerals.capability.1.title': { en: 'Direct Mining Concessions', zh: '矿区源头直供', de: 'Direkte Förderverträge', ar: 'امتيازات تعدين مباشرة' },
  'minerals.capability.1.desc': { en: 'Working with regional miners across southern and western Ethiopia.', zh: '与埃塞俄比亚南部和西部的矿区展开合规采购。', de: 'Zusammenarbeit mit regionalen Minen im Süden und Westen Äthiopiens.', ar: 'العمل مع عمال المناجم الإقليميين في جنوب وغرب إثيوبيا.' },
  'minerals.capability.2.title': { en: 'Laboratory Verification', zh: '实验室纯度验证', de: 'Laboranalyse', ar: 'التحقق المختبري' },
  'minerals.capability.2.desc': { en: 'Providing purity and assay certificates with each export shipment.', zh: '每批出口均提供详细的纯度化验与检测证书。', de: 'Bereitstellung von Reinheits- und Analysezertifikaten für jede Sendung.', ar: 'تقديم شهادات النقاء والفحص مع كل شحنة تصدير.' },
  'minerals.capability.3.title': { en: 'Secured Export Handling', zh: '保价与安全通关', de: 'Gesicherte Abwicklung', ar: 'مناولة تصدير مؤمنة' },
  'minerals.capability.3.desc': { en: 'Insured air and maritime transport protocols.', zh: '提供全程投保的航空与海运物流方案。', de: 'Versicherte Luft- und Seefrachtprotokolle.', ar: 'بروتوكولات نقل جوي وبحري مؤمنة.' },

  // Seeds & Pulses Page
  'seeds.purity.title': { en: 'Machine-Cleaned Agricultural Commodities', zh: '机器精选优质农产品', de: 'Maschinell gereinigte Agrarprodukte', ar: 'سلع زراعية منظفة آلياً' },
  'seeds.purity.desc': { en: 'We utilize mechanical air-screen cleaners, gravity destoners, and optical sorters to deliver oilseeds and pulses that meet rigorous international buyer standards.', zh: '我们使用风选筛分机、比重去石机和光学色选设备，确保油籽与豆类纯度符合国际采购商的严格要求。', de: 'Wir setzen mechanische Windsiebe, Entsteiner und optische Sortierer ein, um Ölsaaten und Hülsenfrüchte nach internationalen Standards zu liefern.', ar: 'نستخدم آلات التنظيف بالهواء والغربلة ومزيلات الحجارة لتقديم بذور زيتية وبقوليات تطابق معايير المشترين الدولية.' },
  'seeds.sesame.title': { en: 'Humera & Wollega Sesame Seeds', zh: '胡梅拉与沃莱加芝麻', de: 'Humera & Wollega Sesamsamen', ar: 'سمسم هوميرا ووليجا' },
  'seeds.sesame.desc': { en: 'Recognized for high oil content (>50%) and sweet aroma. Machine-cleaned to 99% minimum purity with minimal moisture.', zh: '以高含油量（>50%）和香甜风味闻名。机器清洗至不低于 99% 的纯度，含水量适中。', de: 'Bekannt für hohen Ölgehalt (> 50 %) und nussiges Aroma. Auf mindestens 99 % Reinheit maschinell gereinigt.', ar: 'معروف بمحتواه العالي من الزيت (>50%) ورائحته الزكية. تم تنظيفه آلياً بنسبة نقاء لا تقل عن 99%.' },
  'seeds.soy.title': { en: 'Non-GMO Soybeans', zh: '非转基因优质大豆', de: 'GVO-freie Sojabohnen', ar: 'فول صويا غير معدل وراثياً' },
  'seeds.soy.desc': { en: 'Naturally cultivated yellow soybeans rich in plant protein. Screened for uniform sizing and low broken bean count.', zh: '自然日照栽培的高蛋白黄大豆，颗粒均匀，碎豆率低。', de: 'Natürlich angebaut, reich an pflanzlichem Eiweiß. Gesiebt für gleichmäßige Größe und minimale Bruchstücke.', ar: 'يُزرع طبيعياً وغني بالبروتين النباتي. مفروز للحصول على حجم متناسق ونسبة كسر منخفضة.' },
  'seeds.niger.title': { en: 'Niger Seeds (Neug)', zh: '尼日尔油籽 (Neug)', de: 'Nigersamen (Neug)', ar: 'بذور النيجر (نيوج)' },
  'seeds.niger.desc': { en: 'Small black oilseeds with rich lipid profile (>38%), favored for cooking oil extraction and specialized food mixes.', zh: '高油脂率（>38%）的小粒黑油籽，广泛用于压榨优质食用油和专用食品配方。', de: 'Kleine, ölreiche Samen (> 38 % Ölgehalt), ideal für Speiseölgewinnung und Futtermischungen.', ar: 'بذور زيتية سوداء غنية بنسبة زيت (>38%)، مفضلة لاستخلاص زيت الطهي والخلطات الغذائية.' },
  'seeds.chickpea.title': { en: 'Kabuli & Desi Chickpeas', zh: '卡布里与德西鹰嘴豆', de: 'Kabuli & Desi Kichererbsen', ar: 'حمص كابولي وديسي' },
  'seeds.chickpea.desc': { en: 'Evenly graded chickpeas with high protein value, packaged in 50kg polypropylene bags for wholesale food distribution.', zh: '规格均匀的高蛋白鹰嘴豆，采用 50公斤 编织袋包装，适于大宗食品分销。', de: 'Gleichmäßig sortierte Kichererbsen mit hohem Proteingehalt, verpackt in 50-kg-PP-Säcken.', ar: 'حمص متناسق الحجم وغني بالبروتين، معبأ في أكياس بولي بروبيلين سعة 50 كجم.' },
  'seeds.haricot.title': { en: 'White Haricot / Pea Beans', zh: '白菜豆 / 白豌豆', de: 'Weiße Bohnen (Haricot)', ar: 'فاصوليا بيضاء / حبة هاريكوت' },
  'seeds.haricot.desc': { en: 'Clean round white beans widely demanded in canned food canning and international food relief supply chains.', zh: '颗粒圆润洁白的白菜豆，广泛应用于罐头食品加工及国际粮食供应链。', de: 'Saubere, weiße Bohnen, ideal für Konserven und die weltweite Lebensmittelindustrie.', ar: 'فاصوليا بيضاء نظيفة ومستديرة مطلوبة بكثرة في صناعة التعليب وسلاسل الإمداد الغذائي الدولية.' },

  // About Page
  'about.hero.title': { en: 'Agricultural Roots, Professional Global Execution', zh: '植根农业原乡，践行专业贸易', de: 'Landwirtschaftliche Wurzeln, globale Exzellenz', ar: 'جذور زراعية، وتنفيذ تجاري عالمي محترف' },
  'about.tech.desc': { en: 'Infrastructure and telecommunication engineering services connecting Ethiopian enterprises.', zh: '为埃塞俄比亚企事业单位提供专业通信基础设施与工程服务。', de: 'Telekommunikations- und Infrastrukturlösungen für äthiopische Unternehmen.', ar: 'خدمات البنية التحتية والاتصالات التي تربط المؤسسات الإثيوبية.' },
  'about.tech.telecom': { en: 'Telecom & Fiber Network Infrastructure', zh: '通信与光纤网络基础设施', de: 'Telekommunikation & Glasfasernetze', ar: 'البنية التحتية لشبكات الاتصالات والألياف' },
  'about.tech.sales': { en: 'Enterprise Network Equipment & Service', zh: '企业级网络设备与维护服务', de: 'Netzwerkausrüstung für Unternehmen', ar: 'معدات الشبكات وخدمات المؤسسات' },
  'about.manufacturing.desc': { en: 'Industrial manufacturing facilities producing consumer packaged bottled water and materials.', zh: '现代化工业制造设施，生产消费包装瓶装水及工业配套物资。', de: 'Industrielle Fertigung von abgefülltem Trinkwasser und Verpackungsmaterialien.', ar: 'مرافق التصنيع الصناعي لإنتاج مياه الشرب المعبأة ومواد التغليف.' },
  'about.manufacturing.water': { en: 'Purified Bottled Natural Water Production', zh: '纯净瓶装天然饮用水生产线', de: 'Produktion von reinem Flaschenwasser', ar: 'إنتاج مياه شرب طبيعية معبأة نقية' },
  'about.manufacturing.industrial': { en: 'Blow Molding & Consumer Packaging Units', zh: '吹瓶成型与消费包装生产单元', de: 'Blasformen & Verpackungseinheiten', ar: 'وحدات نفخ القوالب والتعبئة والتغليف' },
  'about.tech_mfg.desc': { en: 'Domestic electronic and technology equipment assembly located in industrial development corridors.', zh: '位于工业园区内的本地电子产品与技术设备组装生产线。', de: 'Lokale Montage von Elektronik- und Technologiegeräten in Äthiopien.', ar: 'تجميع محلي للأجهزة الإلكترونية والتقنية داخل المجمعات الصناعية.' },
  'about.tech_mfg.assembly': { en: 'Electronics & Component Assembly Lines', zh: '电子与精密零部件装配生产线', de: 'Elektronik- & Komponentenmontagelinien', ar: 'خطوط تجميع الإلكترونيات والمكونات' },
  'about.tech_mfg.electronic': { en: 'Testing & Certified Quality Inspection Lab', zh: '出厂检测与认证质检实验室', de: 'Prüf- & Qualitätskontrolllabor', ar: 'مختبر فحص الجودة المعتمد واختبار المنتجات' },
  'about.advantage.title': { en: 'Why Work With Moderntech', zh: '为什么选择与我们合作', de: 'Warum mit Moderntech zusammenarbeiten', ar: 'لماذا تعمل مع مودرنتيك' },
  'about.advantage.1.desc': { en: "Direct control over washing stations and collection centers ensures honest origin traceability.", zh: "对水洗处理站和初级收购点的直接把控，确保了清晰可信的产地溯源。", de: "Direkte Kontrolle über Waschstationen sorgt für transparente Rückverfolgbarkeit.", ar: "التحكم المباشر في محطات الغسيل ومراكز التجميع يضمن تتبعاً أصيلاً للمنشأ." },
  'about.advantage.2.desc': { en: "In-house dry-milling and cupping laboratory in Addis Ababa guarantees consistent batch grading.", zh: "位于亚的斯亚贝巴的自营脱壳厂与杯测实验室，确保每批生豆等级品质一致。", de: "Eigene Trockenmühle und Verkostungslabor in Addis Abeba garantieren gleichbleibende Qualität.", ar: "معمل تقشير جاف ومختبر تذوق خاص في أديس أبابا يضمن جودة تصنيف متسقة." },
  'about.advantage.3.desc': { en: "Smooth multimodal container transport via Addis Ababa / Modjo to Port of Djibouti.", zh: "从亚的斯亚贝巴/莫乔干港直通吉布提港的高效多式联运集装箱物流。", de: "Zuverlässiger Containertransport von Addis Abeba über Modjo zum Hafen von Dschibuti.", ar: "نقل حاويات سلس متعدد الوسائط عبر أديس أبابا / موجو إلى ميناء جيبوتي." },
  'about.vision.title': { en: 'Building dependable trade bridges for Ethiopia.', zh: '为埃塞俄比亚打造可靠的国际贸易桥梁。', de: 'Verlässliche Handelsbrücken für Äthiopien bauen.', ar: 'بناء جسور تجارية موثوقة لإثيوبيا.' },
  'about.vision.content': { en: 'Our focus is straightforward: delivering genuine Ethiopian quality to global markets on time, with full commercial integrity.', zh: '我们的理念清晰明确：以完全的商业诚信，按时将正宗的埃塞俄比亚优质商品送达全球买家。', de: 'Unser Fokus ist klar: Echte äthiopische Qualität pünktlich und mit voller Integrität auf die Weltmärkte zu bringen.', ar: 'تركيزنا واضح: تقديم الجودة الإثيوبية الأصيلة للأسواق العالمية في الوقت المحدد وبنزاهة تجارية تامة.' },
  'about.ceo.name': { en: 'Abdi Edao', zh: 'Abdi Edao 先生', de: 'Abdi Edao', ar: 'عبدي إداو' },
  'about.ceo.role': { en: 'Managing Director & Founder', zh: '总经理兼创始人', de: 'Geschäftsführer & Gründer', ar: 'المدير العام والمؤسس' },

  // Testimonials
  'testimonials.tag': { en: 'Importer & Roaster Feedback', zh: '进口商与烘焙商反馈', de: 'Kundenstimmen', ar: 'آراء المستوردين والمحامص' },
  'testimonials.title': { en: 'Trusted by International Buyers', zh: '深受国际采购商信赖', de: 'Von internationalen Käufern geschätzt', ar: 'موثوق به من المشترين الدوليين' },
  'testimonials.1.content': { 
    en: "Moderntech's Yirgacheffe Grade 1 washed lots arrived with exceptional moisture consistency and clean floral cup profile. Their documentation was flawless.",
    zh: "Moderntech 出口的耶加雪菲 1级 水洗生豆含水率十分均匀，展现了纯净的经典花香杯测风味。出口单据完备无误。",
    de: "Die Yirgacheffe G1-Partien kamen mit hervorragender Feuchtigkeitsstabilität und einem klaren, floralen Profil an. Die Abwicklung war einwandfrei.",
    ar: "وصلت شحنات يرجاشيفي المغسولة من الدرجة الأولى بثبات رائع في الرطوبة ونكهة زهرية نقية. وكانت المستندات متقنة تماماً."
  },
  'testimonials.2.content': { 
    en: "Working directly with a team that has actual boots on the ground at the washing stations makes green coffee sourcing predictable and reliable.",
    zh: "与真正深入水洗处理站源头的团队直接对接，让我们的生豆采购变得透明且高度可预期。",
    de: "Die direkte Zusammenarbeit mit einem Team vor Ort an den Waschstationen macht den Rohkaffeebezug transparent und verlässlich.",
    ar: "العمل المباشر مع فريق متواجد فعلياً في محطات الغسيل يجعل شراء البن الأخضر عملية موثوقة ومضمونة."
  },
  'testimonials.3.content': { 
    en: "Their natural Guji Grade 2 has become a core staple for our single-origin espresso offering. The GrainPro packing preserved freshness throughout ocean transit.",
    zh: "他们的日晒古吉 2级 生豆已成为我们单一产区意式浓缩的主打豆。GrainPro 包装在整个海运过程中保持了生豆的新鲜度。",
    de: "Der sonnengetrocknete Guji G2 ist zu einem festen Bestandteil unserer Espresso-Linie geworden. Die GrainPro-Verpackung schützt die Frische optimal.",
    ar: "أصبح بن جوجي المجفف طبيعياً من الدرجة الثانية عنصراً أساسياً في قهوة الإسبريسو لدينا. حافظت تعبئة GrainPro على الطزاجة طوال فترة الشحن البحري."
  },
  'testimonials.4.content': { 
    en: "Prompt communication and transparent assay reporting on mineral shipments. Moderntech is a dependable Ethiopian trade partner.",
    zh: "沟通及时，矿产化验单据清晰透明。Moderntech 是值得信赖的埃塞俄比亚贸易伙伴。",
    de: "Schnelle Kommunikation und transparente Analyseberichte bei Mineralienlieferungen. Ein zuverlässiger Handelspartner in Äthiopien.",
    ar: "تواصل سريع وتقارير فحص شفافة لشحنات المعادن. مودرنتيك شريك تجاري إثيوبي يُعتمد عليه."
  },

  // Imports Page
  'imports.hero.infrastructure': { en: 'Industrial Sourcing & Logistics', zh: '工业物资采购与进口物流', de: 'Industriebeschaffung & Logistik', ar: 'التوريد الصناعي واللوجستيات' },
  'imports.cat.vehicles': { en: 'Commercial & Transport Vehicles', zh: '商用与运输车辆', de: 'Nutz- & Transportfahrzeuge', ar: 'المركبات التجارية ومركبات النقل' },
  'imports.cat.vehicles.desc': { en: 'Importing reliable commercial trucks, utility vehicles, and heavy logistics units to support local supply chains.', zh: '进口可靠的商用卡车、工程用车及重型物流车辆，支持国内供应链运转。', de: 'Import von Nutzfahrzeugen und Lkw zur Unterstützung lokaler Lieferketten.', ar: 'استيراد الشاحنات التجارية ومركبات النقل الثقيل لدعم سلاسل التوريد المحلية.' },
  'imports.cat.machinery': { en: 'Industrial Equipment & Machinery', zh: '工业设备与加工机械', de: 'Industrieanlagen & Maschinen', ar: 'المعدات والآلات الصناعية' },
  'imports.cat.machinery.desc': { en: 'Supplying processing machinery, packaging lines, and agricultural processing equipment for manufacturing.', zh: '为生产制造提供农产品初加工机械、自动化包装流水线及工业装备。', de: 'Lieferung von Verarbeitungs- und Verpackungsmaschinen für die Industrie.', ar: 'تزويد الآلات الصناعية وخطوط التعبئة والتغليف لمصانع الإنتاج.' },
  'imports.cat.parts': { en: 'Industrial & Automotive Spare Parts', zh: '工业与汽车专用零配件', de: 'Ersatzteile & Komponenten', ar: 'قطع الغيار الصناعية وقطع السيارات' },
  'imports.cat.parts.desc': { en: 'High-wear replacement components and maintenance parts for fleet and facility operations.', zh: '为车队运营与生产设施提供高耐磨替换零件与日常维护配件。', de: 'Hochwertige Ersatzteile und Wartungskomponenten für Fuhrpark und Anlagen.', ar: 'قطع غيار عالية الجودة ومكونات صيانة للأسطول والمرافق.' },
  'imports.cat.materials': { en: 'Packaging Materials & Polymers', zh: '食品级包装材料与聚合物', de: 'Verpackungsmaterialien & Polymere', ar: 'مواد التعبئة والتغليف والبوليمرات' },
  'imports.cat.materials.desc': { en: 'Food-grade plastic preforms and industrial raw materials for bottling and packaging.', zh: '用于饮料灌装与工业包装的食品级塑料瓶坯及原材料。', de: 'Lebensmittelechte Rohstoffe und Vorformlinge für Flaschenabfüllung und Verpackung.', ar: 'مواد خام بلاستيكية آمنة غذائياً وقوالب لتعبئة الزجاجات والتغليف.' },
  'imports.cta.quote': { en: 'Our import department connects verified international manufacturers with Ethiopia’s developing industrial and agricultural infrastructure.', zh: '我们的进口部门将经过认证的国际制造商与埃塞俄比亚不断发展的工业及农业基础设施紧密连接。', de: 'Unsere Importabteilung verbindet internationale Hersteller mit Äthiopiens wachsender Infrastruktur.', ar: 'يربط قسم الاستيراد لدينا المصنعين الدوليين المعتمدين بالبنية التحتية الصناعية والزراعية المتنامية في إثيوبيا.' },
  'imports.cta.partnership': { en: 'Inquire About Import Services', zh: '咨询进口合作服务', de: 'Importdienstleistungen anfragen', ar: 'استفسر عن خدمات الاستيراد' },

  // Footer
  'footer.description': { 
    en: 'Moderntech Export & Import PLC is a licensed Ethiopian export house based in Addis Ababa, specializing in 100% Arabica Green Coffee Beans, high-purity minerals, and machine-cleaned oilseeds.',
    zh: 'Moderntech Export & Import PLC 是位于亚的斯亚贝巴的正规持牌埃塞俄比亚出口商，专注于 100% 阿拉比卡生咖啡豆、高纯度矿产及精选油籽。',
    de: 'Moderntech Export & Import PLC ist ein lizenziertes äthiopisches Exporthaus mit Sitz in Addis Abeba, spezialisiert auf 100 % Arabica-Rohkaffee, hochreine Mineralien und gereinigte Ölsaaten.',
    ar: 'شركة مودرنتيك للتصدير والاستيراد PLC هي بيت تصدير إثيوبي مرخص ومقره أديس أبابا، متخصص في حبوب البن الإثيوبية الخضراء 100% والمعادن عالية النقاء والبذور الزيتية.'
  },
  'footer.links': { en: 'Navigation', zh: '网站导航', de: 'Navigation', ar: 'التنقل' },
  'footer.group': { en: 'Parent Company', zh: '集团企业', de: 'Unternehmensgruppe', ar: 'الشركة الأم' },
  'footer.contact': { en: 'Contact Details', zh: '联系方式', de: 'Kontaktdaten', ar: 'بيانات الاتصال' },
  'footer.technologies': { en: 'Moderntech Technologies', zh: 'Moderntech 科技公司', de: 'Moderntech Technologies', ar: 'مودرنتيك للتكنولوجيا' },
  'footer.manufacturing.domestic': { en: 'Moderntech Manufacturing', zh: 'Moderntech 制造公司', de: 'Moderntech Fertigung', ar: 'مودرنتيك للتصنيع' },
  'footer.manufacturing.tech': { en: 'Moderntech Tech Manufacturing PLC', zh: 'Moderntech 技术制造 PLC', de: 'Moderntech Tech Manufacturing PLC', ar: 'مودرنتيك لتصنيع التكنولوجيا PLC' },
  'footer.quicklinks': { en: 'Quick Links', zh: '快捷链接', de: 'Schnellzugriff', ar: 'روابط سريعة' },
  'footer.legal': { en: 'Legal & Compliance', zh: '法律与合规', de: 'Rechtliches', ar: 'الشؤون القانونية والامتثال' },
  'footer.rights': { en: 'All rights reserved.', zh: '版权所有。', de: 'Alle Rechte vorbehalten.', ar: 'جميع الحقوق محفوظة.' },
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
