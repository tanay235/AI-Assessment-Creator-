import { buildExamPaper, QuestionSeed } from './seedPaperBuilder';

export type SeedAssignment = {
  title: string;
  dueDate: string;
  assignedOn: string;
  status: 'completed' | 'draft' | 'pending';
  subject?: string;
  grade?: string;
  totalMarks?: number;
  description?: string;
  fileUrl?: string;
  paper?: ReturnType<typeof buildExamPaper>;
};

const mcq = (
  text: string,
  difficulty: 'easy' | 'medium' | 'hard',
  options: string[],
  correctAnswer: string,
  explanation: string
): QuestionSeed => ({
  text,
  type: 'mcq',
  difficulty,
  marks: 1,
  options,
  correctAnswer,
  explanation,
});

const short = (
  text: string,
  difficulty: 'easy' | 'medium' | 'hard',
  correctAnswer: string,
  explanation: string
): QuestionSeed => ({
  text,
  type: 'short_answer',
  difficulty,
  marks: 2,
  correctAnswer,
  explanation,
});

export const SEED_DATA: SeedAssignment[] = [
  {
    title: 'Quadratic Equations — Class X Mathematics',
    assignedOn: '2026-05-25',
    dueDate: '2026-06-05',
    status: 'completed',
    subject: 'Mathematics',
    grade: '10',
    paper: buildExamPaper(
      [
        mcq('The roots of x² − 5x + 6 = 0 are:', 'easy', ['1 and 6', '2 and 3', '−2 and −3', '5 and 6'], '2 and 3', 'Factorising gives (x−2)(x−3)=0.'),
        mcq('Discriminant of 2x² + 3x + 5 = 0 is:', 'medium', ['−31', '31', '9', '−9'], '−31', 'D = b²−4ac = 9−40 = −31; negative D means no real roots.'),
        mcq('Sum of roots of ax² + bx + c = 0 equals:', 'medium', ['−b/a', 'b/a', 'c/a', '−c/a'], '−b/a', 'For ax²+bx+c=0, α+β = −b/a by Vieta\'s formulas.'),
        mcq('A quadratic has equal roots when discriminant is:', 'easy', ['0', '1', 'negative', 'positive'], '0', 'Equal roots occur when D = 0, giving one repeated root.'),
        mcq('Which is a quadratic in standard form?', 'easy', ['x + 3 = 0', 'x² − 4 = 0', '1/x + x = 2', '√x = 5'], 'x² − 4 = 0', 'Standard form is ax²+bx+c=0 with a≠0.'),
        mcq('Product of roots of x² − 7x + 10 = 0 is:', 'medium', ['7', '10', '−7', '−10'], '10', 'Product αβ = c/a = 10/1 = 10.'),
        mcq('Completing the square converts x² + 6x + 5 into:', 'medium', ['(x+3)² − 4', '(x+3)² + 4', '(x−3)² − 4', '(x+6)² − 5'], '(x+3)² − 4', 'Add and subtract (6/2)² = 9 to complete the square.'),
        mcq('Graph of y = x² − 2x + 1 touches x-axis at:', 'easy', ['x = 0', 'x = 1', 'x = 2', 'never'], 'x = 1', 'Perfect square (x−1)²; vertex on x-axis at x=1.'),
      ],
      [
        short('Solve by factorisation: x² − 9x + 20 = 0.', 'medium', 'x = 4 or x = 5', 'Factors (x−4)(x−5)=0 give the two roots.'),
        short('Find the discriminant and nature of roots of 3x² − 2x + 1 = 0.', 'hard', 'D = −8; roots are not real.', 'D = (−2)²−12 = −8 < 0, so roots are complex/non-real.'),
        short('If one root of x² − kx + 12 = 0 is 3, find k.', 'medium', 'k = 7', 'Substitute x=3: 9−3k+12=0 ⇒ k=7.'),
        short('Write the quadratic whose roots are 2 and −5.', 'medium', 'x² + 3x − 10 = 0', 'Sum −3, product −10 ⇒ x²−(−3)x+(−10)=0.'),
        short('A rectangular plot has area 48 m² and length exceeds width by 2 m. Form the quadratic.', 'hard', 'Let width x: x(x+2)=48 ⇒ x²+2x−48=0.', 'Model with variable width; area constraint gives quadratic equation.'),
      ]
    ),
  },
  {
    title: 'Acids, Bases and Salts — Class 10 Chemistry',
    assignedOn: '2026-05-25',
    dueDate: '2026-05-31',
    status: 'completed',
    subject: 'Chemistry',
    grade: '10',
    paper: buildExamPaper(
      [
        mcq('pH of a neutral solution at 25°C is approximately:', 'easy', ['0', '7', '14', '1'], '7', 'Neutral solutions have equal H⁺ and OH⁻ activity; pH = 7 at 25°C.'),
        mcq('Which gas turns moist blue litmus red?', 'easy', ['NH₃', 'CO₂', 'HCl', 'O₂'], 'HCl', 'Acidic gases like HCl release H⁺ in water and turn blue litmus red.'),
        mcq('Baking soda is chemically:', 'easy', ['Na₂CO₃', 'NaHCO₃', 'NaCl', 'CaCO₃'], 'NaHCO₃', 'Baking soda is sodium hydrogen carbonate (NaHCO₃).'),
        mcq('Antacids contain bases to:', 'medium', ['increase acidity', 'neutralise excess HCl in stomach', 'produce CO₂ only', 'lower pH further'], 'neutralise excess HCl in stomach', 'They neutralise stomach acid, relieving indigestion.'),
        mcq('Plaster of Paris is obtained by heating:', 'medium', ['gypsum partially', 'limestone', 'common salt', 'ammonium chloride'], 'gypsum partially', 'Heating gypsum (CaSO₄·2H₂O) removes water to form CaSO₄·½H₂O.'),
        mcq('A substance that donates OH⁻ in water is a:', 'easy', ['acid', 'base', 'salt', 'indicator'], 'base', 'Arrhenius bases increase OH⁻ concentration in aqueous solution.'),
        mcq('Which salt is used in chlor-alkali process?', 'medium', ['NaCl', 'KNO₃', 'CaSO₄', 'NH₄Cl'], 'NaCl', 'Electrolysis of brine (NaCl solution) produces NaOH, Cl₂, and H₂.'),
        mcq('Water of crystallisation in CuSO₄·5H₂O is:', 'medium', ['5 molecules per formula unit', '5 grams only', 'absent after heating blue crystals', 'always lost at room temperature'], '5 molecules per formula unit', 'Five water molecules are chemically bound in hydrated copper sulphate.'),
      ],
      [
        short('Why does dry HCl gas not change dry blue litmus paper?', 'medium', 'Litmus needs water for ionisation; dry acid has no free H⁺.', 'Indicators respond to aqueous H⁺; without moisture, HCl stays molecular.'),
        short('Write the reaction when zinc reacts with dilute sulphuric acid.', 'easy', 'Zn + H₂SO₄ → ZnSO₄ + H₂↑', 'Single displacement: zinc replaces hydrogen, releasing hydrogen gas.'),
        short('Define pH scale and what pH < 7 indicates.', 'easy', 'pH = −log[H⁺]; pH < 7 means acidic solution.', 'Logarithmic scale; lower pH means higher hydrogen ion concentration.'),
        short('Give one use each of washing soda and bleaching powder.', 'medium', 'Washing soda: cleaning/water softening; bleaching powder: disinfection/bleaching.', 'Links household and industrial applications of chapter salts.'),
        short('Why should acids be added to water slowly with stirring, not water to acid?', 'hard', 'Dissolution is highly exothermic; adding water to acid can splatter hot acid.', 'Controls heat release and prevents dangerous splashing.'),
      ]
    ),
  },
  {
    title: 'World_War_II_Timeline.pdf',
    assignedOn: '2026-05-25',
    dueDate: '2026-05-29',
    status: 'completed',
    subject: 'History',
    grade: '9',
    fileUrl: 'https://example.com/World_War_II_Timeline.pdf',
    paper: buildExamPaper(
      [
        mcq('World War II in Europe began with the invasion of:', 'easy', ['France', 'Poland', 'Russia', 'Britain'], 'Poland', 'Germany invaded Poland on 1 September 1939, prompting declarations of war.'),
        mcq('The Allied D-Day landings occurred in:', 'medium', ['Italy', 'Normandy, France', 'Greece', 'North Africa only'], 'Normandy, France', 'Operation Overlord (June 1944) opened the Western Front in France.'),
        mcq('The Holocaust primarily targeted:', 'medium', ['only soldiers', 'European Jews and other persecuted groups', 'colonial traders', 'Pacific islanders'], 'European Jews and other persecuted groups', 'Nazi policy systematically murdered millions in camps and mass shootings.'),
        mcq('Pearl Harbor attack led which country to enter the Pacific war formally?', 'easy', ['Germany', 'USA', 'Italy', 'Spain'], 'USA', 'Japan\'s 1941 attack brought the United States into WWII against the Axis.'),
        mcq('The United Nations was founded toward the end of WWII to:', 'medium', ['divide colonies', 'promote international peace and cooperation', 'ban all trade', 'restore monarchies only'], 'promote international peace and cooperation', 'Allies sought a permanent forum to prevent future global wars.'),
        mcq('Stalingrad is significant because:', 'hard', ['it ended WWI', 'it marked a major turning point on the Eastern Front', 'it was in the Pacific', 'it was a naval battle only'], 'it marked a major turning point on the Eastern Front', 'Soviet victory (1943) weakened German offensive capacity.'),
        mcq('Atomic bombs in 1945 were dropped on:', 'medium', ['Berlin and Rome', 'Hiroshima and Nagasaki', 'London and Paris', 'Moscow and Kiev'], 'Hiroshima and Nagasaki', 'US used atomic weapons to compel Japan\'s surrender.'),
        mcq('Appeasement before WWII is associated with:', 'medium', ['Munich Agreement concessions to Hitler', 'Marshall Plan', 'Treaty of Versailles only', 'League enforcement'], 'Munich Agreement concessions to Hitler', 'Britain/France allowed German annexation of Sudetenland hoping to avoid war.'),
      ],
      [
        short('Name two causes of World War II.', 'medium', 'Treaty of Versailles harsh terms; rise of fascism; failure of League of Nations; appeasement.', 'Multiple political and economic factors destabilised interwar peace.'),
        short('What was the Blitz?', 'easy', 'Sustained German bombing campaign against British cities, especially London, in 1940–41.', 'Aimed to break British morale and industry during the Battle of Britain period.'),
        short('Define total war in the WWII context.', 'medium', 'Mobilisation of entire economies and civilian populations for the war effort.', 'Distinction from limited wars where home front stays separate.'),
        short('Why was the Battle of Midway important?', 'hard', 'US naval victory halted Japanese expansion in the Pacific; shifted initiative to Allies.', 'Destroyed four Japanese carriers; turning point in Pacific theatre.'),
        short('State one consequence of WWII for colonial empires.', 'medium', 'Weakened European powers accelerated decolonisation and independence movements in Asia/Africa.', 'War costs and ideology undermined imperial control after 1945.'),
      ]
    ),
  },
  {
    title: 'संधि और समास — Class 8 Hindi',
    assignedOn: '2026-05-26',
    dueDate: '2026-05-30',
    status: 'completed',
    subject: 'Hindi',
    grade: '8',
    paper: buildExamPaper(
      [
        mcq('"राजेश" में कौन-सी संधि है?', 'medium', ['गुण', 'वृद्धि', 'यण', 'अयादि'], 'यण', 'रा + इष = राजेश; स्वर संधि में यण संधि का उदाहरण।'),
        mcq('"महात्मा" किस समास का उदाहरण है?', 'easy', ['तत्पुरुष', 'कर्मधारय', 'बहुव्रीहि', 'द्वंद्व'], 'बहुव्रीहि', 'महान आत्मा वाला — बाह्य विशेषता से संबंध; बहुव्रीहि समास।'),
        mcq('द्वन्द्व समास की पहचान:', 'easy', ['एक पद प्रधान', 'दोनों पद प्रधान', 'केवल उपमान', 'क्रिया मुख्य'], 'दोनों पद प्रधान', 'द्वन्द्व में दोनों पद समान महत्व के होते हैं (राम-लक्ष्मण)।'),
        mcq('"नीलकमल" में समास:', 'medium', ['कर्मधारय', 'तत्पुरुष', 'अव्ययीभाव', 'द्विगु'], 'कर्मधारय', 'नीला है कमल — विशेषण-विशेष्य संबंध; कर्मधारय समास।'),
        mcq('विसर्ग संधि का नियम किसके साथ लागू होता है?', 'medium', ['केवल अ', 'अ से पहले विसर्ग', 'सभी व्यंजन', 'केवल ह'], 'अ से पहले विसर्ग', 'विसर्ग (:) के बाद अ आने पर संधि परिवर्तन होता है।'),
        mcq('"पंचाग" में समास:', 'easy', ['द्विगु', 'तत्पुरुष', 'द्वन्द्व', 'बहुव्रीहि'], 'द्विगु', 'पाँच अंग — संख्यावाचक पूर्वपद; द्विगु समास।'),
        mcq('अयादि संधि में परिवर्तन किस प्रकार होता है?', 'hard', ['व्यंजन लोप', 'वर्ण का अय वर्ण में बदलना', 'स्वर ह्रास', 'विसर्ग लोप'], 'वर्ण का अय वर्ण में बदलना', 'जैसे च + आय = चाय (य + आ = ऐ)।'),
        mcq('"राजपुत्र" समास का विग्रह:', 'medium', ['राजा का पुत्र', 'राजा के लिए पुत्र', 'राजा और पुत्र', 'राजा जैसा पुत्र'], 'राजा का पुत्र', 'संबंध तत्पुरुष — राजा से संबंधित पुत्र।'),
      ],
      [
        short('"देवालय" का संधि-विच्छेद लिखें।', 'easy', 'देव + आलय', 'दो शब्द मिलकर एक शब्द — स्वर संधि।'),
        short('कर्मधारय और तत्पुरुष समास में अंतर लिखें।', 'medium', 'कर्मधारय: विशेषण-विशेष्य; तत्पुरुष: संबंध (का, के, की)।', 'विग्रह और प्रधान पद से अंतर स्पष्ट होता है।'),
        short('"श्रमनिष्ठ" में कौन-सी संधि है? विच्छेद करें।', 'hard', 'दीर्घ संधि: श्रम + निष्ठ (म + नि = मा नि)', 'समान स्वर मिलने पर दीर्घ संधि लागू।'),
        short('द्वन्द्व समास के दो उदाहरण दें।', 'easy', 'माता-पिता; दिन-रात', 'दोनों पद समान रूप में जुड़ते हैं।'),
        short('"लोहपुरुष" किस समास का उदाहरण है? अर्थ लिखें।', 'medium', 'बहुव्रीहि — जिसका शरीर लोहे जैसा मजबूत हो।', 'बाह्य लक्षण से संबोधन; प्रधान पद बाहर।'),
      ]
    ),
  },
  {
    title: 'Gravitation and Motion — Class 9 Physics',
    assignedOn: '2026-05-26',
    dueDate: '2026-05-28',
    status: 'completed',
    subject: 'Physics',
    grade: '9',
    paper: buildExamPaper(
      [
        mcq('SI unit of gravitational constant G is:', 'medium', ['N m² kg⁻²', 'N kg m⁻¹', 'm s⁻²', 'kg m⁻³'], 'N m² kg⁻²', 'From F = G m₁m₂/r², dimension gives N·m²/kg².'),
        mcq('Weight of a body equals:', 'easy', ['mass only', 'mg', 'm/g', 'G m²'], 'mg', 'Gravitational force on body near Earth: W = mg.'),
        mcq('Value of g on Moon is less because:', 'medium', ['no atmosphere', 'mass and radius of Moon differ from Earth', 'Moon has no gravity', 'distance is zero'], 'mass and radius of Moon differ from Earth', 'g = GM/R²; smaller M and larger R ratio lowers surface g.'),
        mcq('Kepler\'s third law relates:', 'hard', ['period and semi-major axis of orbit', 'mass and colour', 'speed and density only', 'charge and field'], 'period and semi-major axis of orbit', 'T² ∝ a³ for planetary motion around the Sun.'),
        mcq('An object in free fall near Earth (ignoring air) has acceleration:', 'easy', ['zero', 'g downward', 'g upward', 'depends on mass'], 'g downward', 'All bodies fall with same acceleration in vacuum near Earth.'),
        mcq('Universal law of gravitation was given by:', 'easy', ['Einstein', 'Newton', 'Galileo', 'Faraday'], 'Newton', 'Newton stated inverse-square law between masses.'),
        mcq('Thrust is:', 'medium', ['force per unit area', 'total force exerted by fluid on surface', 'mass × velocity', 'work per time'], 'total force exerted by fluid on surface', 'Thrust is perpendicular force on a surface; pressure = thrust/area.'),
        mcq('Buoyant force on fully submerged body equals weight of:', 'medium', ['body only', 'displaced fluid', 'container', 'air above fluid'], 'displaced fluid', 'Archimedes\' principle: buoyancy = weight of displaced fluid.'),
      ],
      [
        short('State Newton\'s law of universal gravitation.', 'medium', 'F = G m₁m₂/r²; force attractive, along line joining centres.', 'Inverse-square dependence on distance between point masses.'),
        short('Differentiate mass and weight.', 'easy', 'Mass is scalar amount of matter (kg); weight is gravitational force (N).', 'Mass constant; weight varies with g and location.'),
        short('Why do astronauts feel weightless in orbit?', 'medium', 'They are in continuous free fall around Earth; normal force from floor is negligible.', 'Orbital motion is falling around Earth, not absence of gravity.'),
        short('Write the formula for pressure in fluids.', 'easy', 'P = F/A or P = hρg for depth in liquid.', 'Pressure increases with depth in a static fluid.'),
        short('A stone and feather dropped on Moon fall together because:', 'hard', 'No air resistance; only gravity acts; acceleration same for all masses.', 'Demonstrates independence of fall rate from mass without drag.'),
      ]
    ),
  },
  {
    title: 'Latin_Roots_Vocabulary.pdf',
    assignedOn: '2026-05-26',
    dueDate: '2026-05-27',
    status: 'completed',
    subject: 'English',
    grade: '7',
    fileUrl: 'https://example.com/Latin_Roots_Vocabulary.pdf',
    paper: buildExamPaper(
      [
        mcq('Root "port" means:', 'easy', ['carry', 'write', 'see', 'hear'], 'carry', 'Transport, export, portable — all relate to carrying.'),
        mcq('"audible" relates to:', 'easy', ['sound', 'light', 'water', 'heat'], 'sound', 'Aud = hear; audible means can be heard.'),
        mcq('Prefix "anti-" means:', 'easy', ['against', 'before', 'after', 'under'], 'against', 'Antibiotic, antifreeze — oppose or counter.'),
        mcq('"scrib/script" appears in:', 'medium', ['describe', 'inject', 'construct', 'reflect'], 'describe', 'Scrib = write; describe = write down.'),
        mcq('"bio" in biology means:', 'easy', ['life', 'book', 'stone', 'star'], 'life', 'Greek bios = life; study of living organisms.'),
        mcq('"tele" in telephone means:', 'medium', ['far', 'near', 'self', 'one'], 'far', 'Tele = distant; phone = sound → sound over distance.'),
        mcq('"rupt" in erupt means:', 'medium', ['break', 'build', 'carry', 'hide'], 'break', 'Erupt = break out; rupture shares root.'),
        mcq('"graph" in photograph means:', 'medium', ['write/draw', 'eat', 'sleep', 'run'], 'write/draw', 'Graph = record visually; photo = light.'),
      ],
      [
        short('Use "port" in two English words and explain meanings.', 'easy', 'Import (carry in), support (carry from below).', 'Root consistency helps vocabulary building.'),
        short('What is a root word? Give one example.', 'easy', 'Base morpheme carrying core meaning, e.g. "ject" = throw (project, reject).', 'Prefixes/suffixes attach to roots.'),
        short('Difference between prefix and suffix with examples.', 'medium', 'Prefix before base (un-happy); suffix after base (happy-ness).', 'Both modify meaning or word class.'),
        short('Infer meaning of "aquarium" using roots.', 'easy', 'Aqua = water; place related to water — tank for aquatic life.', 'Combining Latin/Greek roots aids inference.'),
        short('Why study Latin/Greek roots for English?', 'medium', 'Many academic/scientific words derive from them; helps decode unfamiliar terms.', 'Improves reading comprehension and spelling patterns.'),
      ]
    ),
  },
  {
    title: 'Portfolio_Design_Meera.pdf',
    assignedOn: '2026-05-26',
    dueDate: '2026-05-24',
    status: 'draft',
    fileUrl: 'https://example.com/Portfolio_Design_Meera.pdf',
    totalMarks: 0,
  },
  {
    title: 'Introduction to Magnetism — Class 8 Science',
    assignedOn: '2026-05-27',
    dueDate: '2026-05-28',
    status: 'completed',
    subject: 'Science',
    grade: '8',
    paper: buildExamPaper(
      [
        mcq('Magnetic field lines emerge from:', 'easy', ['north to south outside magnet', 'south to north outside', 'only inside magnet', 'random directions'], 'north to south outside magnet', 'Convention: field lines leave north pole externally.'),
        mcq('Materials strongly attracted to magnets:', 'medium', ['copper', 'iron', 'wood', 'plastic'], 'iron', 'Ferromagnetic materials like iron, nickel, cobalt show strong attraction.'),
        mcq('A compass needle aligns because Earth acts as:', 'easy', ['electric heater', 'magnet', 'insulator', 'conductor only'], 'magnet', 'Earth\'s magnetic field exerts torque on magnetised needle.'),
        mcq('Electromagnet strength increases with:', 'medium', ['fewer turns', 'more current in coil', 'open circuit', 'plastic core'], 'more current in coil', 'Current in solenoid creates B-field; more turns/current strengthen it.'),
        mcq('Like magnetic poles:', 'easy', ['attract', 'repel', 'have no force', 'cancel gravity'], 'repel', 'Same poles repel; opposite poles attract.'),
        mcq('Magnetic field unit in SI is:', 'hard', ['tesla', 'coulomb', 'joule', 'pascal'], 'tesla', 'Tesla (T) measures magnetic flux density B.'),
        mcq('Soft iron is used in electromagnet cores because:', 'medium', ['high retentivity always', 'easily magnetised and demagnetised', 'non-magnetic', 'insulates current'], 'easily magnetised and demagnetised', 'Low coercivity makes switching efficient.'),
        mcq('Magnetic effect of current was discovered by:', 'medium', ['Oersted', 'Darwin', 'Curie only for heat', 'Galileo'], 'Oersted', 'Oersted showed compass deflection near current-carrying wire.'),
      ],
      [
        short('State two properties of magnetic field lines.', 'medium', 'Continuous closed curves; never cross; density shows field strength.', 'Visual model for direction and strength of B-field.'),
        short('How is electromagnet made? Draw idea in words.', 'easy', 'Insulated wire coiled around soft iron core; current through coil magnetises core.', 'Solenoid with ferromagnetic core becomes temporary magnet.'),
        short('Why should magnets be stored in pairs with keepers?', 'medium', 'Keepers complete magnetic circuit, preserving magnetisation longer.', 'Reduces self-demagnetisation from stray fields.'),
        short('Difference between permanent magnet and electromagnet.', 'easy', 'Permanent: alloy retains magnetism; electromagnet: needs current, switchable.', 'Electromagnets used where control needed (cranes, relays).'),
        short('Give one use of electromagnet in daily life.', 'easy', 'Electric bell, MRI (strong fields), junkyard cranes, relay switches.', 'Links chapter concepts to applications.'),
      ]
    ),
  },
  {
    title: 'Triangles and Circle Theorems — Class 9 Maths',
    assignedOn: '2026-05-27',
    dueDate: '2026-05-27',
    status: 'completed',
    subject: 'Mathematics',
    grade: '9',
    paper: buildExamPaper(
      [
        mcq('Sum of angles in a triangle is:', 'easy', ['90°', '180°', '270°', '360°'], '180°', 'Euclidean triangle angle-sum property.'),
        mcq('Angle in a semicircle is:', 'medium', ['45°', '90°', '60°', '180°'], '90°', 'Thales\' theorem: angle subtended by diameter is right angle.'),
        mcq('Congruent triangles have:', 'easy', ['same shape only', 'same shape and size', 'different sides', 'no equal angles'], 'same shape and size', 'All corresponding sides and angles equal.'),
        mcq('Tangent to circle is perpendicular to:', 'medium', ['chord at any point', 'radius at point of contact', 'diameter always', 'secant'], 'radius at point of contact', 'Radius-tangent theorem: 90° at point of tangency.'),
        mcq('ASA congruence needs:', 'medium', ['three sides', 'two angles and included side', 'right angle only', 'one angle'], 'two angles and included side', 'ASA: two angles and the side between them equal.'),
        mcq('Exterior angle of triangle equals:', 'medium', ['sum of interior opposite angles', '90° always', 'half interior', 'zero'], 'sum of interior opposite angles', 'Exterior angle theorem links remote interior angles.'),
        mcq('Angles in same segment of circle are:', 'hard', ['equal', 'supplementary', 'complementary', 'random'], 'equal', 'Angles subtended by same arc/chord in same segment are equal.'),
        mcq('Centroid divides median in ratio:', 'hard', ['1:1', '2:1', '3:1', '1:2'], '2:1', 'Centroid lies 2/3 along median from vertex.'),
      ],
      [
        short('State Pythagoras theorem.', 'easy', 'In right triangle, hypotenuse² = sum of squares of other two sides.', 'Used for distance and right-triangle problems.'),
        short('Prove base angles of isosceles triangle are equal (idea).', 'medium', 'Draw altitude from apex to base; two right triangles congruent by RHS.', 'Symmetry of isosceles triangle gives equal base angles.'),
        short('What is circumcentre of triangle?', 'medium', 'Intersection of perpendicular bisectors; centre of circle through all vertices.', 'Equidistant from all three vertices.'),
        short('If two chords are equal, what about their arcs?', 'medium', 'In same circle, equal chords subtend equal arcs.', 'Circle symmetry property from congruent triangles to centre.'),
        short('Define cyclic quadrilateral.', 'easy', 'Quadrilateral with all vertices on one circle; opposite angles sum to 180°.', 'Key for angle problems in circle geometry.'),
      ]
    ),
  },
  {
    title: 'Climate Change and Indian Monsoons — Geography',
    assignedOn: '2026-05-27',
    dueDate: '2026-05-25',
    status: 'completed',
    subject: 'Geography',
    grade: '8',
    paper: buildExamPaper(
      [
        mcq('Greenhouse effect is caused mainly by:', 'medium', ['only oxygen', 'CO₂ and other greenhouse gases', 'nitrogen only', 'ozone alone in troposphere'], 'CO₂ and other greenhouse gases', 'GHGs trap outgoing infrared radiation, warming Earth.'),
        mcq('Southwest monsoon in India is driven by:', 'medium', ['only local rivers', 'differential heating of land and sea', 'polar winds only', 'volcanoes'], 'differential heating of land and sea', 'Summer low over land draws moist air from ocean.'),
        mcq('El Niño often weakens Indian monsoon because:', 'hard', ['cools Pacific abnormally', 'warms eastern Pacific shifting Walker circulation', 'stops rotation of Earth', 'removes Himalayas'], 'warms eastern Pacific shifting Walker circulation', 'ENSO alters global circulation patterns affecting rainfall.'),
        mcq('Deforestation increases climate risk by:', 'medium', ['more carbon sink', 'reducing CO₂ absorption', 'cooling locally always', 'increasing ozone hole'], 'reducing CO₂ absorption', 'Fewer trees mean less photosynthetic CO₂ uptake.'),
        mcq('Renewable energy example is:', 'easy', ['coal', 'solar power', 'diesel', 'lignite'], 'solar power', 'Solar/wind/hydro replenish quickly vs fossil fuels.'),
        mcq('Mawsynram receives heavy rain due to:', 'medium', ['desert location', 'orographic lift on Khasi hills', 'polar front', 'offshore winds year-round'], 'orographic lift on Khasi hills', 'Moist air forced up mountains condenses intensely.'),
        mcq('Paris Agreement aims to limit warming to well below:', 'medium', ['5°C', '2°C above pre-industrial', '10°C', '0°C change'], '2°C above pre-industrial', 'International mitigation and adaptation framework.'),
        mcq('Retreating glaciers in Himalayas threaten:', 'medium', ['only wildlife colour', 'river water supply downstream', 'ocean salinity increase locally only', 'wind patterns only in Antarctica'], 'river water supply downstream', 'Millions depend on glacier-fed rivers like Ganga, Indus.'),
      ],
      [
        short('Define monsoon in simple terms.', 'easy', 'Seasonal reversal of wind bringing wet summer and dry winter over South Asia.', 'Driven by land-sea thermal contrast and ITCZ shift.'),
        short('Give two human causes of global warming.', 'easy', 'Burning fossil fuels; deforestation; industrial emissions.', 'Anthropogenic GHG increase enhances greenhouse effect.'),
        short('How do Western Ghats affect monsoon rain on west coast?', 'medium', 'Moist winds rise, cool, condense — heavy orographic rainfall on windward side.', 'Explains Konkan/Malabar wet climate.'),
        short('What is climate adaptation? Example for India.', 'medium', 'Adjusting to climate impacts: drought-resistant crops, flood-resistant housing.', 'Differs from mitigation (reducing emissions).'),
        short('Why is renewable energy important for India?', 'hard', 'Reduces coal dependence, air pollution, and GHG emissions while improving energy security.', 'Aligns development with climate goals.'),
      ]
    ),
  },
  {
    title: 'French Greetings & Classroom Phrases — Class 6',
    assignedOn: '2026-05-27',
    dueDate: '2025-06-22',
    status: 'completed',
    subject: 'French',
    grade: '6',
    paper: buildExamPaper(
      [
        mcq('"Bonjour" is used:', 'easy', ['only at night', 'in the morning/day as hello', 'when leaving', 'only in writing'], 'in the morning/day as hello', 'Standard daytime greeting in French.'),
        mcq('"Merci" means:', 'easy', ['sorry', 'thank you', 'please', 'goodbye'], 'thank you', 'Polite expression of gratitude.'),
        mcq('"Au revoir" means:', 'easy', ['hello', 'goodbye', 'yes', 'no'], 'goodbye', 'Common farewell phrase.'),
        mcq('Formal "you" in French is:', 'medium', ['tu', 'vous', 'ils', 'on'], 'vous', 'Vous shows respect/formality; tu is informal.'),
        mcq('"Comment ça va?" asks:', 'easy', ['your name', 'how are you', 'the time', 'the price'], 'how are you', 'Informal wellbeing question.'),
        mcq('Number "quinze" is:', 'easy', ['5', '15', '50', '500'], '15', 'French teens: seize=16, quinze=15.'),
        mcq('"S\'il vous plaît" means:', 'easy', ['please', 'excuse me only', 'never mind', 'welcome'], 'please', 'Polite request phrase.'),
        mcq('Feminine adjective for "petit" is:', 'medium', ['petite', 'petits', 'petites only plural', 'petita'], 'petite', 'Agreement: petite fille (small girl).'),
      ],
      [
        short('Write three classroom phrases in French with English meaning.', 'easy', 'Où est…? = Where is…?; Je ne comprends pas = I don\'t understand; Répétez = Repeat.', 'Core survival phrases for beginners.'),
        short('When use "tu" vs "vous"?', 'medium', 'Tu for friends/family/peers; vous for teachers, elders, strangers formally.', 'Reflects social register in French.'),
        short('Introduce yourself in French (name + age) two sentences.', 'easy', 'Je m\'appelle… J\'ai … ans.', 'Je m\'appelle Marie. J\'ai onze ans.'),
        short('What is liaison in French pronunciation?', 'hard', 'Linking final consonant sound to next vowel for fluent speech.', 'Example: les_amis sounds connected.'),
        short('Translate: "Good evening, how are you?" formally.', 'medium', 'Bonsoir, comment allez-vous ?', 'Bonsoir for evening; allez-vous formal form.'),
      ]
    ),
  },
  {
    title: 'Useful Microorganisms — Class 7 Biology',
    assignedOn: '2026-05-25',
    dueDate: '2026-05-26',
    status: 'pending',
    subject: 'Science',
    grade: '7',
    totalMarks: 0,
  },
];
