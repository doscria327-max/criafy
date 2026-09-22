/**
 * Conteúdo massivo e curado por nicho para geração de ebooks profissionais.
 *
 * Cada nicho tem um livro completo estruturado como livro editorial: introdução,
 * capítulos com múltiplas seções, exercícios práticos, citações reflexivas e
 * resumos. O conteúdo é baseado em conhecimento consolidado da área e escrito
 * pra ser genuinamente útil ao leitor.
 */

export type Secao = {
  titulo?: string;
  paragrafos: string[];
  lista?: { titulo?: string; itens: string[] };
  citacao?: { texto: string; autor?: string };
  destaque?: string; // caixa colorida de destaque
  exercicio?: { titulo: string; passos: string[] };
  estatistica?: { numero: string; texto: string };
};

export type Capitulo = {
  numero: number;
  titulo: string;
  subtitulo?: string;
  epigrafe?: { texto: string; autor?: string };
  secoes: Secao[];
  resumo: string[];
};

export type LivroConteudo = {
  nichoId: string;
  titulo: string;
  subtitulo: string;
  dedicatoria: string;
  introducao: {
    paragrafos: string[];
    promessa: string;
  };
  capitulos: Capitulo[];
  conclusao: {
    paragrafos: string[];
    proximosPassos: string[];
  };
  posfacio: string[];
};

// ============================================================
// EMAGRECIMENTO
// ============================================================
export const LIVRO_EMAGRECIMENTO: LivroConteudo = {
  nichoId: "emagrecimento",
  titulo: "O Método Definitivo",
  subtitulo: "Emagrecer sem passar fome, sem efeito sanfona, sem abrir mão da sua vida",
  dedicatoria:
    "Para você,\nque decidiu que hoje era o dia certo\npara começar de verdade.",
  introducao: {
    paragrafos: [
      "Se você chegou até este livro, provavelmente já tentou muitas coisas. Contou calorias em aplicativo. Cortou carboidrato. Fez jejum intermitente. Comprou balança de bioimpedância. Talvez tenha até conseguido resultados temporários — perdeu 3, 5, 10 quilos — e depois viu tudo voltar. Se é isso, você não está sozinho. E a boa notícia é que o problema nunca foi você. Foi o método.",
      "A maior parte dos protocolos de emagrecimento vendidos por aí funciona no curto prazo porque são baseados em restrição extrema. Você emagrece porque come muito pouco. Só que restrição extrema é insustentável — biologicamente e psicologicamente. Seu corpo entra em modo de conservação, sua fome dispara, e a força de vontade se esgota. Aí você desiste. E, quando volta a comer normal, recupera o peso perdido — geralmente com juros.",
      "Este livro propõe outro caminho. Um caminho baseado em ciência da nutrição, comportamento humano e realidade prática. Não vou te prometer 10 kg em 30 dias. Vou te ensinar a construir hábitos que fazem você emagrecer de forma sustentável, sem odiar cada refeição, sem perder sua vida social e sem viver contando gramas de arroz.",
      "O conteúdo aqui é destilado de anos observando o que funciona e o que não funciona. Cada capítulo trata de um aspecto específico da jornada: metabolismo, alimentação, movimento, psicologia, sono, hábitos. Você vai encontrar teoria — a mínima necessária — e muita prática. No fim de cada capítulo tem um exercício pra você aplicar imediatamente.",
    ],
    promessa:
      "Se você aplicar o que está aqui dentro pelos próximos 90 dias, você não vai apenas emagrecer. Você vai construir uma relação nova com o seu corpo, com a comida e consigo mesmo. E essa mudança dura.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "A verdade sobre o metabolismo",
      subtitulo: "Por que o problema quase nunca é o seu",
      epigrafe: {
        texto:
          "Não existe metabolismo lento. Existe metabolismo adaptado — e ele pode ser reeducado.",
      },
      secoes: [
        {
          paragrafos: [
            "Se tem uma frase que ouço em toda consulta é essa: 'meu metabolismo é lento'. E quase sempre, quando a gente investiga, o metabolismo não é lento — está adaptado. Anos de dietas restritivas, sono ruim, estresse crônico e sedentarismo ensinaram ao corpo a economizar energia. Ele agora queima menos porque aprendeu que precisa economizar.",
            "A boa notícia é que isso é reversível. O corpo humano é surpreendentemente plástico. Com estímulos corretos — comida em quantidade suficiente, movimento diário, sono restaurador — o metabolismo se reajusta. Não em uma semana. Mas em alguns meses, sim.",
          ],
        },
        {
          titulo: "Os três motores metabólicos",
          paragrafos: [
            "Seu corpo gasta energia de três formas principais. A primeira é a taxa metabólica basal — a energia que você gasta simplesmente estando vivo, sem fazer nada. Ela responde por 60 a 70% do seu gasto energético diário. É determinada principalmente pela sua massa muscular.",
            "A segunda é o efeito térmico dos alimentos — a energia que o corpo gasta pra digerir e absorver o que você come. Proteína tem o maior efeito térmico. Isso significa que uma dieta rica em proteína naturalmente aumenta seu gasto energético diário sem exigir esforço.",
            "A terceira é o gasto pela atividade física — que inclui não só academia, mas caminhadas, subir escadas, atividades domésticas. Chama-se NEAT (thermogenesis das atividades não-exercício) e é o motor mais fácil de mexer no dia a dia.",
          ],
          lista: {
            titulo: "Como reativar seu metabolismo",
            itens: [
              "Preserve massa muscular — isso significa comer proteína suficiente e fazer exercício de força",
              "Coma o suficiente — restrição extrema derruba a taxa metabólica em semanas",
              "Durma bem — quem dorme menos de 6h queima menos calorias no dia seguinte",
              "Mexa-se ao longo do dia — 8 mil passos diários já bate 30 minutos de esteira",
              "Reduza o estresse crônico — cortisol alto favorece armazenamento de gordura abdominal",
            ],
          },
        },
        {
          titulo: "O erro clássico do déficit muito grande",
          paragrafos: [
            "Um erro comum de quem começa a se cuidar é aplicar um déficit calórico muito grande. A pessoa lê que precisa comer menos, e corta 1000 kcal do dia. Nas primeiras semanas, funciona. Mas rapidamente o corpo se adapta — a taxa metabólica cai, a fome dispara, o sono piora, a compulsão aparece. Em dois meses, a pessoa está comendo mais do que antes e ganhando peso com facilidade.",
            "O déficit correto para emagrecimento sustentável é entre 15% e 25% do seu gasto energético total. Se você gasta 2200 kcal por dia, deve comer entre 1650 e 1870 kcal. Isso permite emagrecer entre 300 g e 700 g por semana — que parece pouco, mas em 6 meses são 12 a 15 kg. E ficam.",
          ],
          exercicio: {
            titulo: "Calcule seu déficit ideal",
            passos: [
              "Multiplique seu peso atual em kg por 30 — esse número aproxima seu gasto diário",
              "Reduza 20% desse valor — esse é o total de calorias pra emagrecer sem sofrer",
              "Divida por 4 refeições ao longo do dia",
              "Se em 2 semanas você não perdeu peso, reduza mais 10%. Se perdeu mais de 1kg, aumente 10%",
            ],
          },
        },
      ],
      resumo: [
        "Metabolismo lento é quase sempre metabolismo adaptado — e reversível.",
        "Sua massa muscular determina a maior parte do seu gasto energético diário.",
        "Déficits calóricos muito agressivos são o principal motivo do efeito sanfona.",
        "Uma perda de 300 a 700 g por semana é sustentável — e permanente.",
      ],
    },
    {
      numero: 2,
      titulo: "O prato que emagrece",
      subtitulo: "A fórmula simples que substitui contar calorias",
      epigrafe: {
        texto: "Coma comida de verdade. Não muito. Principalmente vegetais.",
        autor: "Michael Pollan",
      },
      secoes: [
        {
          paragrafos: [
            "Contar caloria é matematicamente correto, mas psicologicamente é insustentável pra maior parte das pessoas. Quem consegue manter durante meses é raridade. A alternativa que funciona pra 90% é a fórmula do prato — uma regra visual simples que você pode aplicar em qualquer refeição, em qualquer lugar, sem precisar de balança nem aplicativo.",
            "A fórmula é a seguinte: metade do prato de vegetais (crus e cozidos), um quarto de proteína, um quarto de carboidrato complexo. Só isso. Quando você segue essa regra em três refeições principais, você automaticamente cria um déficit calórico moderado, atinge suas necessidades de nutrientes e sente-se saciado.",
          ],
        },
        {
          titulo: "Por que essa fórmula funciona",
          paragrafos: [
            "Vegetais têm baixa densidade calórica — muito volume, poucas calorias. Ocupam espaço no estômago e ativam receptores de saciedade. Você come menos das outras coisas sem perceber. Além disso, são ricos em fibras, que retardam a absorção de açúcar e evitam picos de insulina.",
            "Proteína é o macronutriente que mais sacia e o que mais preserva massa muscular durante um déficit. Também tem o maior efeito térmico — cerca de 30% das calorias da proteína são gastas na própria digestão. É a diferença entre emagrecer perdendo gordura ou perdendo músculo.",
            "Carboidratos complexos — arroz integral, batata-doce, quinoa, feijão — fornecem energia sustentada e evitam a fissura por doce. Cortar carboidrato completamente funciona por algumas semanas, mas leva à compulsão. Melhor incluir em porção controlada.",
          ],
          citacao: {
            texto:
              "O prato ideal não é uma dieta. É um hábito que dura pra vida toda.",
          },
        },
        {
          titulo: "Aplicando na vida real",
          paragrafos: [
            "Café da manhã: 2 ovos + 1 fatia de pão integral + 1 fruta. Almoço: arroz integral + peito de frango + salada colorida + feijão. Jantar: batata-doce + salmão + brócolis + azeite de oliva.",
            "Isso não é dieta restritiva. É comida de verdade, saborosa, saciante. E que emagrece. Você pode variar infinitamente dentro dessa fórmula — trocar frango por carne, arroz por quinoa, brócolis por couve. O que não muda é a proporção.",
          ],
          lista: {
            titulo: "Lista de compras semanal (base)",
            itens: [
              "Proteínas: ovos, peito de frango, ovos, patinho moído, tilápia ou salmão, iogurte natural",
              "Vegetais: alface, tomate, brócolis, cenoura, abobrinha, couve, espinafre",
              "Carboidratos: arroz integral, batata-doce, aveia, feijão, lentilha, pão integral",
              "Gorduras boas: azeite de oliva, abacate, castanhas, sementes de chia",
              "Frutas: banana, maçã, mamão, morango, laranja",
            ],
          },
          exercicio: {
            titulo: "Monte seu próximo prato",
            passos: [
              "Antes da próxima refeição, olhe o prato vazio e divida mentalmente ao meio",
              "Preencha metade com vegetais (cores diferentes = nutrientes diferentes)",
              "Um quarto de proteína (palma da mão como referência de porção)",
              "Um quarto de carboidrato complexo (punho fechado como referência)",
              "Coma devagar, mastigue bem, e pare quando sentir 80% de saciedade",
            ],
          },
        },
      ],
      resumo: [
        "A fórmula do prato substitui a contagem de calorias sem perder eficiência.",
        "Metade de vegetais, um quarto de proteína, um quarto de carboidrato complexo.",
        "Cortar carboidrato totalmente leva à compulsão — incluir em porção controlada é melhor.",
        "Você pode variar infinitamente os alimentos, mas a proporção não muda.",
      ],
    },
    {
      numero: 3,
      titulo: "O poder da proteína",
      subtitulo: "Por que ela é o nutriente-chave pra emagrecer sem perder músculo",
      secoes: [
        {
          paragrafos: [
            "Se tivesse que escolher um único ajuste na alimentação de alguém que quer emagrecer, seria: aumentar a proteína. Nenhuma outra intervenção nutricional tem tanto impacto na composição corporal, na saciedade e na preservação de massa muscular durante um déficit calórico.",
            "A recomendação padrão é entre 1,6 g e 2,2 g de proteína por kg de peso corporal ao dia. Uma pessoa de 70 kg deveria consumir entre 112 g e 154 g de proteína por dia. Distribuído em 4 refeições, dá 28 a 38 g por refeição. É bem mais do que a maioria das pessoas come.",
          ],
          estatistica: {
            numero: "80%",
            texto:
              "das pessoas em déficit calórico perdem massa muscular junto com gordura por consumir proteína insuficiente. Isso acelera a queda do metabolismo.",
          },
        },
        {
          titulo: "Fontes de proteína de qualidade",
          paragrafos: [
            "Fontes animais são as mais completas — ovos, peito de frango, carne magra, peixes, iogurte grego, whey protein. Todas fornecem os 9 aminoácidos essenciais que o corpo precisa e não produz.",
            "Fontes vegetais são possíveis mas exigem combinações. Feijão + arroz completa o perfil de aminoácidos. Lentilha, grão-de-bico, tofu, tempeh também são boas opções pra vegetarianos.",
          ],
          lista: {
            titulo: "Quantidade de proteína por porção comum",
            itens: [
              "1 ovo inteiro: 6g",
              "100g de peito de frango grelhado: 31g",
              "100g de patinho moído magro: 26g",
              "1 filé de tilápia (150g): 30g",
              "1 pote de iogurte grego natural (170g): 15g",
              "1 scoop de whey protein: 24g",
              "1 xícara de feijão preto cozido: 15g",
            ],
          },
        },
        {
          titulo: "Como distribuir ao longo do dia",
          paragrafos: [
            "Não adianta comer 100 g de proteína numa refeição só. O corpo tem um limite de aproveitamento — cerca de 40 g por vez. O ideal é distribuir em 4 a 5 refeições, com 25 a 35 g em cada uma.",
            "Um dia bem estruturado poderia ser: café da manhã com 3 ovos + iogurte (30 g), lanche com 1 scoop de whey (25 g), almoço com 150 g de frango (46 g), lanche da tarde com iogurte grego + castanhas (20 g), jantar com 130 g de patinho (34 g). Total: 155 g. Mais do que suficiente pra uma pessoa de 70 kg.",
          ],
          exercicio: {
            titulo: "Calcule sua meta e monte seu dia",
            passos: [
              "Multiplique seu peso em kg por 1.8 — essa é sua meta diária mínima em gramas",
              "Divida por 4 refeições — essa é a meta por refeição",
              "Pra cada refeição, escolha uma fonte da lista acima que atinja o alvo",
              "Nas 2 primeiras semanas, foque em atingir a meta antes de se preocupar com outras coisas",
            ],
          },
        },
      ],
      resumo: [
        "Proteína é o nutriente mais importante pra preservar músculo durante emagrecimento.",
        "Meta: 1.6 a 2.2 g por kg de peso corporal por dia.",
        "Distribua em 4-5 refeições — o corpo aproveita melhor doses moderadas.",
        "Fontes completas: ovos, frango, carne magra, peixes, iogurte, whey.",
      ],
    },
    {
      numero: 4,
      titulo: "O movimento certo",
      subtitulo: "Musculação, cardio e caminhada — qual funciona pra emagrecer",
      secoes: [
        {
          paragrafos: [
            "A pergunta clássica é: 'qual exercício queima mais gordura?'. E a resposta clássica dos guias de fitness é: 'cardio'. Mas essa resposta está incompleta e leva muita gente a errar a estratégia.",
            "Cardio queima calorias durante o exercício. Musculação queima calorias durante e depois do exercício — pelo efeito EPOC (consumo de oxigênio pós-exercício) — e principalmente aumenta a massa muscular, que aumenta seu gasto calórico basal 24 horas por dia. Musculação é uma revolução metabólica silenciosa.",
          ],
        },
        {
          titulo: "A ordem ideal de importância",
          paragrafos: [
            "Se você tem 30 minutos por dia pra treinar, essa é a hierarquia que faz mais diferença: 1) caminhada diária de 8 a 10 mil passos, 2) musculação 3 vezes por semana, 3) cardio 2 vezes por semana.",
            "Caminhada é o exercício mais subestimado. Não requer academia, roupa especial, equipamento. Você faz enquanto vai pro trabalho, no intervalo do almoço, à noite. Não gera fome descontrolada. Não te machuca. E queima em torno de 300 kcal por dia se você fizer 8 mil passos.",
          ],
          citacao: {
            texto:
              "Caminhar não parece exercício. Por isso funciona pra quem odeia exercício.",
          },
        },
        {
          titulo: "Musculação pra iniciantes",
          paragrafos: [
            "Musculação assusta muita gente. Parece coisa de fisiculturista. Não é. É pra qualquer pessoa que queira envelhecer com autonomia, ossos fortes e metabolismo saudável.",
            "Você não precisa de academia com máquinas. Um bom protocolo caseiro tem 6 exercícios básicos: agachamento, avanço, flexão de braço, prancha, remada com garrafa d'água, elevação de quadril. 3 séries de 12 repetições. 3 vezes por semana. 30 minutos por sessão.",
          ],
          lista: {
            titulo: "Protocolo caseiro semanal (30 min por dia)",
            itens: [
              "Segunda: agachamento livre, flexão, prancha (3 séries de 12)",
              "Terça: caminhada de 40 minutos em ritmo moderado",
              "Quarta: avanço, elevação de quadril, remada com garrafa (3x12)",
              "Quinta: caminhada + subida de escada 10 minutos",
              "Sexta: circuito completo (agachamento + flexão + prancha + avanço)",
              "Sábado: caminhada mais longa ao ar livre (60 minutos)",
              "Domingo: descanso ativo (alongamento, ioga leve)",
            ],
          },
          exercicio: {
            titulo: "Comece hoje sem depender de academia",
            passos: [
              "Baixe um app de contagem de passos (o do próprio celular já serve)",
              "Coloque como meta 6 mil passos hoje (aumente 1000 por semana)",
              "Faça 3 séries de 10 agachamentos livres antes do banho",
              "Faça 3 séries de 5 flexões de braço (encostando joelhos no chão se precisar)",
              "Repita amanhã. Repita depois de amanhã. Consistência bate perfeição.",
            ],
          },
        },
      ],
      resumo: [
        "Musculação supera cardio na preservação e ganho de massa muscular.",
        "Caminhada diária de 8-10 mil passos é a base mais subestimada.",
        "Você não precisa de academia — protocolo caseiro simples resolve.",
        "Consistência (3-5 sessões por semana) importa mais que intensidade extrema.",
      ],
    },
    {
      numero: 5,
      titulo: "Dominando o doce",
      subtitulo: "Como parar de sofrer pra evitar chocolate",
      secoes: [
        {
          paragrafos: [
            "A compulsão por doce é o vilão que quebra a maioria dos planos de emagrecimento. Você fica dias comendo direitinho, sente-se orgulhoso, e aí — no fim da tarde ou depois do jantar — a fissura bate. Você sabe que não devia. Come mesmo assim. Sente culpa. E o ciclo se repete no dia seguinte.",
            "Isso não é falta de força de vontade. É bioquímica. Alimentos ultraprocessados, ricos em açúcar refinado, ativam o sistema de recompensa cerebral de forma parecida com drogas. Você desenvolve tolerância. Precisa cada vez mais pra sentir prazer. E quando não come, tem sintomas de abstinência.",
          ],
        },
        {
          titulo: "A regra dos 21 dias",
          paragrafos: [
            "Corta doces completamente por 21 dias. Zero. Nenhum. Não é 'moderação'. É zero. Sim, vai ser difícil nos primeiros dias — talvez você tenha dor de cabeça, irritabilidade, falta de energia. Isso passa em 5 dias. Depois disso, sua bioquímica começa a se reajustar.",
            "No dia 21, uma fruta doce vai parecer um doce. Um pedaço de chocolate 70% vai parecer intenso. Você reeducou seu paladar. E o mais importante: descobre que a compulsão não era por doce — era por dopamina. E você pode gerar dopamina de outras formas.",
          ],
          destaque:
            "Nas primeiras semanas, mantenha zero doce em casa. Vontade de doce à noite se resolve escovando os dentes e indo dormir. Em 21 dias você sai do outro lado.",
        },
        {
          titulo: "Substitutos inteligentes",
          paragrafos: [
            "Depois dos 21 dias, você pode incorporar substituições saudáveis pra situações específicas. Frutas com pasta de amendoim. Iogurte grego com mel e canela. Chocolate 70% ou mais. Cacau em pó batido com banana congelada.",
            "Isso não é pra você comer todos os dias em quantidade infinita. É pra quando você quiser algo doce, você tenha uma opção que não te tire do trilho.",
          ],
          exercicio: {
            titulo: "Prepare seu kit anti-compulsão",
            passos: [
              "Vá ao mercado hoje e compre: 1 pote de iogurte grego, 1 pote de pasta de amendoim natural, 1 barra de chocolate 70%, banana",
              "Guarde tudo em local visível na geladeira",
              "Quando bater a fissura, coma 1 colher de iogurte grego com meia colher de pasta de amendoim",
              "Ou 2 quadradinhos de chocolate 70% mastigados devagar (não engolidos)",
              "Espere 15 minutos antes de decidir se ainda quer mais algo",
            ],
          },
        },
      ],
      resumo: [
        "Compulsão por doce é bioquímica, não falta de força de vontade.",
        "21 dias de zero doce reeducam seu paladar completamente.",
        "Substituições inteligentes: chocolate 70%, frutas, iogurte grego + mel.",
        "Preparar antecipadamente evita cair em ultraprocessados.",
      ],
    },
    {
      numero: 6,
      titulo: "O sono e o hormônio da fome",
      subtitulo: "Por que quem dorme mal não emagrece — mesmo comendo pouco",
      secoes: [
        {
          paragrafos: [
            "Você pode estar comendo perfeitamente e treinando 5 vezes por semana. Se está dormindo mal, seu emagrecimento vai travar. Sono é uma das variáveis mais subestimadas na jornada de composição corporal.",
            "Quando você dorme menos de 6 horas, dois hormônios cruciais se desajustam. A leptina, que sinaliza saciedade, cai. A grelina, que gera fome, sobe. O resultado é que você acorda com mais fome, tem mais fissura por comida ultra-processada durante o dia, e tem menos disposição pra se movimentar.",
          ],
          estatistica: {
            numero: "300 kcal",
            texto:
              "é o quanto uma pessoa que dorme mal consome a mais por dia — em média — apenas por causa do desajuste hormonal.",
          },
        },
        {
          titulo: "Higiene do sono na prática",
          paragrafos: [
            "Sono de qualidade não acontece por acaso. Ele depende de sinais consistentes que você dá ao seu corpo. A luz do sol da manhã calibra seu relógio biológico. A escuridão à noite dispara a produção de melatonina. Se você quebrar essas duas coisas, seu sono nunca vai ser reparador.",
            "Cortar telas 90 minutos antes de dormir parece extremo, mas é o passo mais impactante. A luz azul dos celulares suprime a melatonina. Se você não consegue cortar totalmente, use óculos de bloqueio ou modo noturno.",
          ],
          lista: {
            titulo: "Rotina noturna que garante 8 horas de sono",
            itens: [
              "21h: última refeição do dia (nada pesado depois disso)",
              "21h30: banho quente (queda de temperatura corporal induz sono)",
              "22h: telas desligadas ou modo noturno + luz baixa",
              "22h30: leitura de livro físico, meditação ou música calma",
              "23h: quarto escuro, temperatura entre 18 e 21°C, celular fora do quarto",
              "6h30: despertar sem soneca — luz do sol nos primeiros 10 minutos",
            ],
          },
          exercicio: {
            titulo: "7 dias de sono estruturado",
            passos: [
              "Escolha um horário fixo de dormir e de acordar",
              "Cumpra esses horários todos os dias — inclusive fim de semana",
              "Cortar cafeína depois das 14h",
              "Cortar telas 60 minutos antes de dormir",
              "Anote como se sente ao acordar — a diferença fica óbvia em 7 dias",
            ],
          },
        },
      ],
      resumo: [
        "Dormir mal desajusta leptina e grelina, aumentando fome e reduzindo saciedade.",
        "Meta: 7 a 9 horas de sono restaurador por noite, horários consistentes.",
        "Luz do sol na manhã e escuridão à noite calibram o ciclo circadiano.",
        "Sem sono adequado, seu emagrecimento vai sempre travar.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Você acabou de ler seis capítulos de conteúdo denso e prático. Se sentiu overwhelm em algum momento, respira. Ninguém aplica tudo de uma vez. Aliás, quem tenta aplicar tudo de uma vez geralmente não aplica nada.",
      "A diferença entre quem transforma o corpo e quem só sonha com isso não é conhecimento — é aplicação. Nesse ponto do livro, você tem mais conhecimento do que 90% das pessoas que dizem que querem emagrecer. O que separa você delas agora é a ação.",
      "Escolha UMA coisa deste livro pra colocar em prática nos próximos 7 dias. Não tudo. Uma. E se compromete com ela. Consistência bate ousadia. Um passo por dia, todo dia, chega mais longe do que uma corrida esporádica.",
    ],
    proximosPassos: [
      "Nas próximas 24 horas: faça o cálculo do seu déficit calórico ideal (capítulo 1) e anote em um lugar visível.",
      "Nos próximos 7 dias: aplique a fórmula do prato em pelo menos 1 refeição por dia.",
      "Nos próximos 30 dias: comece o protocolo de 21 dias sem doce (capítulo 5) e adote a rotina de sono do capítulo 6.",
      "Nos próximos 90 dias: adicione musculação caseira 3 vezes por semana + caminhada diária.",
    ],
  },
  posfacio: [
    "Nada aqui é revolucionário. Você provavelmente já ouviu partes desse conteúdo em outros lugares. A diferença é que aqui está integrado num sistema coerente e prático.",
    "Emagrecimento sustentável não vem de um segredo escondido. Vem da aplicação consistente de princípios simples. Você tem tudo o que precisa agora. Boa jornada.",
  ],
};

// ============================================================
// FINANÇAS PESSOAIS
// ============================================================
export const LIVRO_FINANCAS: LivroConteudo = {
  nichoId: "financas",
  titulo: "Sair do Vermelho",
  subtitulo:
    "O sistema simples pra organizar seu dinheiro, quitar dívidas e começar a construir patrimônio de verdade",
  dedicatoria:
    "Para você,\nque cansou de ver o dinheiro sumir\nsem saber pra onde foi.",
  introducao: {
    paragrafos: [
      "Se todo mês o dinheiro some antes do dia 20 e você não sabe pra onde foi — este livro é pra você. Se você trabalha, ganha um salário decente, mas nunca sobra nada — este livro é pra você. Se você tem dívida no cartão, no cheque especial ou em qualquer outro lugar — este livro é pra você.",
      "A verdade que ninguém te contou é que educação financeira não é sobre ganhar muito. É sobre saber pra onde vai o que você já ganha. E a maioria dos brasileiros tem essa parte completamente descontrolada. Não é vergonha. É consequência de um sistema que não te ensinou nada sobre dinheiro na escola e te empurra crédito toda semana.",
      "Nas próximas páginas, você vai aprender um sistema completo. Da parte mais dolorosa (encarar suas dívidas) até a parte mais empolgante (fazer seu primeiro investimento). Cada capítulo tem um exercício prático. Você vai fazer, não só ler. Porque aqui informação sem ação não vira transformação.",
    ],
    promessa:
      "Se você aplicar consistentemente o que está aqui dentro pelos próximos 12 meses, você vai sair do vermelho, construir sua primeira reserva de emergência e começar a investir com regularidade — mesmo ganhando o mesmo que ganha hoje.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "O diagnóstico honesto",
      subtitulo: "Sem esse passo, nada mais funciona",
      epigrafe: {
        texto: "Você não pode consertar o que você não enxerga.",
      },
      secoes: [
        {
          paragrafos: [
            "A primeira coisa que você precisa fazer é encarar sua situação com honestidade brutal. Não é confortável. Ninguém gosta. Mas ignorar não faz o problema desaparecer — apenas torna ele maior.",
            "Você vai listar TODAS as suas dívidas. Cada uma. Cartão de crédito, cheque especial, empréstimo consignado, financiamento, o dinheiro emprestado do primo. Tudo. Com valor exato, taxa de juros, prazo. Isso é o retrato da sua realidade.",
          ],
          estatistica: {
            numero: "78%",
            texto:
              "dos brasileiros endividados nunca sentaram e listaram todas as dívidas no papel. Você vai fazer parte dos 22% que fazem isso.",
          },
        },
        {
          titulo: "A planilha do vazamento",
          paragrafos: [
            "Depois das dívidas, você vai mapear os últimos 3 meses de gastos. Todos. Do café da manhã ao aluguel. Do streaming ao delivery de sexta à noite. Extrato de conta corrente, fatura de cartão, comprovantes de PIX. Tudo.",
            "Separe em 3 categorias: fixos (aluguel, luz, internet, mensalidades), variáveis necessários (mercado, transporte, remédio), e supérfluos (delivery, streaming, café, assinaturas que você esqueceu que existiam). Faça uma soma de cada categoria.",
            "A terceira categoria vai te chocar. Praticamente todo mundo que faz esse exercício descobre que gasta muito mais em supérfluos do que imaginava. É aí que mora seu vazamento invisível.",
          ],
          exercicio: {
            titulo: "Faça o diagnóstico agora",
            passos: [
              "Pegue papel e caneta (ou abre uma planilha em branco)",
              "Liste todas as suas dívidas com valor, juros e prazo",
              "Puxe os extratos dos últimos 3 meses de todas as contas",
              "Categorize cada gasto em fixo/variável necessário/supérfluo",
              "Some cada categoria — e não desconte nada por vergonha",
            ],
          },
        },
      ],
      resumo: [
        "Sem diagnóstico honesto, nenhuma estratégia financeira funciona.",
        "Liste TODAS as dívidas com valores exatos, juros e prazos.",
        "Categorize gastos em fixo, variável necessário e supérfluo.",
        "O vazamento invisível mora nos supérfluos — quase sempre.",
      ],
    },
    {
      numero: 2,
      titulo: "A bola de neve das dívidas",
      subtitulo: "O método comprovado pra sair do vermelho em 90 dias",
      secoes: [
        {
          paragrafos: [
            "Existem duas formas de atacar dívidas. A matematicamente ótima e a psicologicamente eficaz. Adivinha qual funciona pra maioria das pessoas na vida real?",
            "A matematicamente ótima manda você quitar primeiro a dívida com maior taxa de juros. Faz sentido — é a que mais custa. Mas na prática, quase ninguém consegue manter o compromisso, porque não vê vitórias rápidas.",
            "A psicologicamente eficaz — o método bola de neve — manda quitar primeiro a menor dívida em valor. Você quita rapidamente, sente uma vitória concreta, ganha momentum. Depois ataca a segunda menor. E assim por diante. Em poucos meses, você quitou várias dívidas e ganhou fôlego psicológico pra atacar as maiores.",
          ],
          citacao: {
            texto:
              "Comportamento humano é mais poderoso que matemática quando o assunto é dinheiro pessoal.",
            autor: "Dave Ramsey",
          },
        },
        {
          titulo: "Passo a passo da bola de neve",
          paragrafos: [
            "Primeiro, você quita todos os pagamentos mínimos de todas as dívidas — isso não é negociável, senão você entra em atraso e piora tudo. Segundo, o valor extra que você conseguir juntar por mês, você joga inteiro na menor dívida.",
            "Quando a menor dívida for quitada, o valor que ia pra ela + o valor extra vai pra segunda menor. E assim sucessivamente. Cada dívida quitada acelera a próxima, porque o valor livre cresce.",
          ],
          exercicio: {
            titulo: "Monte sua bola de neve",
            passos: [
              "Ordene suas dívidas do menor pro maior valor total",
              "Continue pagando o mínimo de todas",
              "O valor que sobra do orçamento vai 100% pra menor dívida",
              "Após quitar a primeira, jogue o valor liberado pra segunda",
              "Repita — e em 6-12 meses você estará no zero",
            ],
          },
        },
        {
          titulo: "Negociação: a arma secreta",
          paragrafos: [
            "Antes de começar a bola de neve, ligue pra cada credor e negocie. É um passo que 90% das pessoas ignoram e é onde mora ouro. Dívidas em atraso podem ser negociadas com desconto de 40 a 80%. Empresas de cobrança preferem receber uma parte do que nada.",
            "Fale com clareza: 'Estou querendo quitar essa dívida, mas tenho recursos limitados. Qual o melhor desconto que vocês podem oferecer?'. Se recusarem, agradeça e ligue de novo em 15 dias. Peça pra falar com o supervisor. Insista com educação.",
          ],
          destaque:
            "Toda sexta-feira do mês, campanhas Serasa Limpa Nome e Feirões oferecem descontos de 50% ou mais em dívidas antigas. Aproveite.",
        },
      ],
      resumo: [
        "O método bola de neve funciona porque cria vitórias rápidas.",
        "Ordene as dívidas do menor pro maior valor e ataque a menor primeiro.",
        "Negocie antes de pagar — descontos de 40-80% são comuns.",
        "Consistência mensal é o que faz o método funcionar.",
      ],
    },
    {
      numero: 3,
      titulo: "A reserva que muda tudo",
      subtitulo: "Por que essa é a primeira coisa a construir depois de sair do vermelho",
      secoes: [
        {
          paragrafos: [
            "Reserva de emergência é a diferença entre passar por uma crise e ser destruído por ela. É o dinheiro que te permite dormir tranquilo sabendo que se algo der errado — perder o emprego, um problema de saúde, um imprevisto — você não vai voltar pro vermelho.",
            "A meta ideal é ter 6 meses do seu custo fixo mensal guardados em uma aplicação de liquidez diária. Se seu custo fixo é R$ 3 mil por mês, sua reserva deve ser de R$ 18 mil. Parece muito? Você chega em 12 a 24 meses com estratégia.",
          ],
          estatistica: {
            numero: "62%",
            texto:
              "dos brasileiros não conseguem cobrir uma despesa inesperada de R$ 1000 sem entrar em dívida. Você vai sair dessa estatística.",
          },
        },
        {
          titulo: "Onde guardar sua reserva",
          paragrafos: [
            "Reserva não é pra render muito. É pra estar disponível quando você precisar. Não coloque em ações, criptomoedas, fundos imobiliários — coisas que oscilam. Guarde em Tesouro Selic ou CDBs de liquidez diária de bancos digitais confiáveis.",
            "O Tesouro Selic rende 100% da Selic (que hoje está em torno de 10-13% ao ano), tem taxa zero, e você resgata em 1 dia útil. Bancos como Nubank, Inter, BTG oferecem CDBs de liquidez diária com 100% do CDI — o que dá em torno do mesmo rendimento.",
          ],
          lista: {
            titulo: "As 3 categorias da sua reserva",
            itens: [
              "Reserva mínima: 1 mês de custo fixo (proteção básica de curto prazo)",
              "Reserva intermediária: 3 meses de custo fixo (proteção pra troca de emprego)",
              "Reserva ideal: 6 meses de custo fixo (proteção pra crise real)",
            ],
          },
          exercicio: {
            titulo: "Sua reserva começa hoje",
            passos: [
              "Calcule seu custo fixo mensal (aluguel + contas + mercado + transporte)",
              "Multiplique por 6 — essa é sua meta final",
              "Abra conta em um banco digital (Nubank, Inter) se ainda não tem",
              "Configure aporte automático mensal — mesmo que seja R$ 100 no início",
              "Aumente o aporte a cada 3 meses conforme sua situação melhorar",
            ],
          },
        },
      ],
      resumo: [
        "Reserva é a primeira meta financeira depois de sair do vermelho.",
        "Meta: 6 meses de custo fixo em aplicação de liquidez diária.",
        "Tesouro Selic e CDB de banco digital são as melhores opções.",
        "Aporte automático mensal é o que faz a reserva crescer sem esforço.",
      ],
    },
    {
      numero: 4,
      titulo: "Seus primeiros investimentos",
      subtitulo: "O que fazer com dinheiro depois que você tem reserva",
      secoes: [
        {
          paragrafos: [
            "Chegar em investimentos com dívidas quitadas e reserva montada é a diferença entre construir patrimônio e apostar. Investimento é ferramenta. Se você não construiu a base antes, cada crise vai te forçar a resgatar no pior momento e você vai perder dinheiro.",
            "A boa notícia é que investir hoje no Brasil é mais fácil que nunca. Uma corretora, um celular, 10 minutos por mês. E você começa a colocar dinheiro pra trabalhar por você. Renda passiva não é fantasia — é matemática.",
          ],
        },
        {
          titulo: "Renda fixa: a base pra iniciantes",
          paragrafos: [
            "Comece pela renda fixa. É mais previsível, mais tranquila e ideal pra quem tá aprendendo. Tesouro IPCA+ é meu preferido pra iniciante — protege da inflação e paga juros reais. Prazos de 5 a 10 anos.",
            "CDBs de bancos médios também são ótimos — pagam entre 100% e 130% do CDI, têm proteção do FGC até R$ 250 mil por CPF e banco. Compare taxas em plataformas como Renda Fixa da XP ou Modal Mais.",
          ],
          lista: {
            titulo: "Divisão sugerida pra iniciante (após reserva)",
            itens: [
              "60% em Tesouro IPCA+ ou CDBs bons (base sólida)",
              "20% em fundos de índice (Ibovespa, S&P 500)",
              "15% em fundos imobiliários (renda mensal isenta de IR)",
              "5% em criptomoedas (Bitcoin apenas, alta volatilidade)",
            ],
          },
        },
        {
          titulo: "O poder dos juros compostos",
          paragrafos: [
            "Aplicar R$ 300 por mês em um investimento que rende 10% ao ano por 30 anos resulta em R$ 678 mil. Mesma aplicação por 20 anos: R$ 227 mil. A diferença? Tempo. Juros compostos são a oitava maravilha do mundo, disse Einstein.",
            "Quanto mais cedo você começa, menos precisa contribuir. Comece com pouco, mas comece hoje. O tempo é seu maior aliado.",
          ],
          citacao: {
            texto: "Não é sobre timing do mercado. É sobre tempo no mercado.",
          },
          exercicio: {
            titulo: "Abra sua corretora e faça o primeiro aporte",
            passos: [
              "Abra conta em uma corretora (XP, BTG, Nubank Invest, Rico)",
              "Transfira R$ 30 pra corretora — sim, 30 reais é suficiente",
              "Compre uma cota de Tesouro Selic 2029 ou similar",
              "Configure aporte automático mensal de R$ 100 (ou o que couber)",
              "Aumente 10% a cada 3 meses conforme sua renda evolui",
            ],
          },
        },
      ],
      resumo: [
        "Investimento vem DEPOIS de dívidas quitadas e reserva montada.",
        "Renda fixa (Tesouro, CDBs) é a base pra iniciantes.",
        "Juros compostos são poderosos — comece cedo, mesmo com pouco.",
        "Consistência mensal vale mais que timing perfeito.",
      ],
    },
    {
      numero: 5,
      titulo: "Escalando sua renda",
      subtitulo: "Porque o problema muitas vezes não é gastar demais, é ganhar de menos",
      secoes: [
        {
          paragrafos: [
            "Cortar gastos tem limite. Você não pode cortar aluguel, luz, comida abaixo de certo ponto — a vida vira sofrimento. Escalar renda, por outro lado, não tem teto. E é onde mora o verdadeiro poder de mudança financeira.",
            "Nesse capítulo, você vai entender os 3 caminhos pra escalar sua renda: aumentar valor no trabalho atual, começar renda extra, e criar renda passiva. Cada um serve pra um momento da vida.",
          ],
        },
        {
          titulo: "Caminho 1: valorização no trabalho",
          paragrafos: [
            "O aumento salarial mais rápido geralmente vem da valorização no seu trabalho atual — se você souber negociar. Documente entregas com números. Pesquise a faixa salarial do seu cargo em plataformas como Glassdoor, Vagas, Catho. Marque uma conversa com seu gestor e apresente dados.",
            "Alternativa: trocar de empresa. Trocar de emprego costuma dar aumento de 15-25%, contra 5-10% de aumento por mérito na empresa atual. Se você está há mais de 2 anos no mesmo lugar sem aumento significativo, considere.",
          ],
        },
        {
          titulo: "Caminho 2: renda extra",
          paragrafos: [
            "Renda extra é dinheiro que entra além do seu salário. Freelance, mentoria, aulas particulares, venda de produto, trabalho como motorista de aplicativo — tudo conta. O segredo é escolher algo que você faz bem e que gera R$ 300 a R$ 1000 por mês.",
            "Renda extra não precisa ser grande no início. R$ 500 a mais por mês, investidos consistentemente, viram R$ 60 mil em 8 anos. E o hábito de gerar renda te prepara pra criar mais fontes no futuro.",
          ],
          lista: {
            titulo: "Ideias de renda extra que funcionam",
            itens: [
              "Freelance na sua área profissional (fim de semana)",
              "Aulas particulares (idioma, matemática, música)",
              "Venda de doces ou marmitas fitness",
              "Motorista de aplicativo em horário livre",
              "Consultoria em algo que você domina",
              "Venda de infoproduto (ebook, curso online)",
              "Revenda de roupas ou cosméticos",
            ],
          },
        },
        {
          titulo: "Caminho 3: renda passiva",
          paragrafos: [
            "Renda passiva é aquela que continua entrando mesmo quando você não está trabalhando ativamente. Dividendos de ações, aluguéis, royalties de livros, receita recorrente de assinaturas. É a forma mais poderosa de renda porque não escala com seu tempo.",
            "Renda passiva não vem do nada — você constrói. Comprando ativos que geram fluxo (fundos imobiliários, ações que pagam dividendo, imóveis) ou criando ativos que continuam vendendo (ebook, curso, software).",
          ],
          exercicio: {
            titulo: "Escolha 1 caminho pra ativar nos próximos 30 dias",
            passos: [
              "Se salário atual < R$ 3000: foque em valorização + renda extra",
              "Se salário atual R$ 3000-8000: foque em renda extra + investimento",
              "Se salário atual > R$ 8000: foque em renda passiva de longo prazo",
              "Escolha UM caminho. Aja em 30 dias. Depois expanda pros outros.",
            ],
          },
        },
      ],
      resumo: [
        "Cortar gastos tem limite. Escalar renda não tem teto.",
        "3 caminhos: valorização no trabalho, renda extra, renda passiva.",
        "Renda extra transforma vida — R$ 500/mês vira R$ 60k em 8 anos.",
        "Renda passiva não vem do nada — você constrói comprando ou criando ativos.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Cinco capítulos densos depois, você tem em mãos o sistema completo pra virar sua vida financeira. Do diagnóstico honesto até renda passiva, passando por bola de neve das dívidas, reserva de emergência e primeiros investimentos. Tudo está aqui.",
      "Agora vem a parte mais importante: aplicação. Ninguém emagreceu financeiramente lendo livros. Ficou saudável quem colocou em prática. E aplicação exige constância, não gênio.",
      "Escolha UMA coisa pra começar essa semana. Faça o diagnóstico honesto se ainda não fez. Ligue pra negociar uma dívida. Abra uma conta em corretora. Uma coisa. E depois de fazer, escolha a próxima. Assim se muda uma vida financeira.",
    ],
    proximosPassos: [
      "Nas próximas 48 horas: faça o diagnóstico completo do capítulo 1.",
      "Nos próximos 7 dias: ligue pra pelo menos 3 credores e negocie descontos.",
      "Nos próximos 30 dias: configure aporte automático de reserva de emergência.",
      "Nos próximos 90 dias: quite pelo menos 2 dívidas com o método bola de neve.",
      "Nos próximos 12 meses: complete os 6 meses de reserva e comece a investir.",
    ],
  },
  posfacio: [
    "Independência financeira não é sobre ficar rico. É sobre ter escolhas. Escolha de sair de um trabalho que te consome, escolha de ajudar alguém quando precisa, escolha de descansar quando o corpo pede.",
    "O caminho é longo mas é linear. Um passo por vez. Boa jornada.",
  ],
};

// ============================================================
// MARKETING DIGITAL
// ============================================================
export const LIVRO_MARKETING: LivroConteudo = {
  nichoId: "marketing",
  titulo: "Do Zero à Primeira Venda",
  subtitulo:
    "O método realista pra começar a faturar online sem depender de milhões de seguidores ou dinheiro em anúncio",
  dedicatoria:
    "Para você,\nque tá cansado de ver iniciante vendendo\nenquanto você trava.",
  introducao: {
    paragrafos: [
      "Se você já tentou faturar online e travou — este livro é pra você. Se você posta todo dia mas ninguém compra — este livro é pra você. Se você gastou em anúncio sem retorno — este livro é pra você.",
      "A promessa aqui é honesta: você não vai ficar rico dormindo. Não vai faturar 100 mil no primeiro mês. Mas vai ter em mãos o método comprovado pra começar a vender online de forma sustentável, com foco em construir um negócio real — não fórmula mágica.",
      "Vou destrinchar as 4 partes de um negócio digital que fatura: nicho lucrativo, produto validado, copy que converte e distribuição inteligente. Cada uma tem seu capítulo com passos práticos.",
    ],
    promessa:
      "Se você aplicar consistentemente o que está aqui dentro pelos próximos 90 dias, você vai ter seu primeiro produto no ar, sua primeira estratégia de tráfego rodando e — na maioria dos casos — sua primeira venda.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "A grande mentira do marketing digital",
      subtitulo: "O que ninguém te contou sobre 'ficar rico na internet'",
      secoes: [
        {
          paragrafos: [
            "Todo dia, o Instagram te mostra alguém contando como 'faturou 500 mil em 30 dias com um método que ninguém conhece'. Todo dia. E todo dia mais uma pessoa acredita, compra o curso, e não fatura nada. Esse ciclo destrói bolsos e sonhos há uma década.",
            "A verdade é que faturar online é possível — extremamente possível. Mas não é fácil, não é rápido, e definitivamente não é do jeito que a maioria vende. É um processo que exige método, consistência e disposição pra aprender.",
          ],
        },
        {
          titulo: "Os 4 pilares que sustentam qualquer negócio digital",
          paragrafos: [
            "Todo negócio digital que fatura de verdade tem 4 pilares: nicho lucrativo, produto validado, copy que converte e distribuição inteligente. Falta um, o negócio quebra. Nesse capítulo eu apresento cada um. Nos capítulos seguintes, destrincho.",
            "Nicho lucrativo: o público que tem dor real, poder de compra e urgência. Produto validado: solução que resolve essa dor de forma diferente e memorável. Copy que converte: comunicação que leva o público da atenção ao clique de compra. Distribuição inteligente: canais onde seu público está e onde você aparece regularmente.",
          ],
          lista: {
            titulo: "Verifique seu negócio contra os 4 pilares",
            itens: [
              "Você sabe exatamente quem é seu público e qual dor específica ele tem?",
              "Você validou que existem pessoas dispostas a pagar pra resolver essa dor?",
              "Sua comunicação leva o público da atenção até a intenção de compra?",
              "Você tem canais específicos onde aparece com regularidade?",
            ],
          },
          exercicio: {
            titulo: "Diagnóstico dos 4 pilares",
            passos: [
              "Escreva em 1 frase qual o seu nicho e público-alvo",
              "Escreva em 1 frase qual dor específica seu produto resolve",
              "Escreva em 1 frase por que seu produto é diferente dos concorrentes",
              "Escreva em 1 lista os 3 canais onde você aparece semanalmente",
              "Se não consegue responder alguma dessas, aí tá o problema",
            ],
          },
        },
      ],
      resumo: [
        "Faturar online é possível mas não é rápido nem fácil — é um processo.",
        "Todo negócio digital que fatura tem 4 pilares fundamentais.",
        "Se algum pilar falta, o negócio quebra — não importa quanto você invista.",
        "Diagnóstico honesto contra os 4 pilares mostra onde está seu problema.",
      ],
    },
    {
      numero: 2,
      titulo: "Escolhendo o nicho lucrativo",
      subtitulo: "Por que essa escolha determina 70% do seu sucesso",
      secoes: [
        {
          paragrafos: [
            "Nicho errado é sentença de morte. Você pode ter a melhor copy, o melhor produto, o melhor tráfego — se o nicho não paga, você não fatura. E infelizmente, a maior parte dos iniciantes escolhe nicho pela paixão, não pela lucratividade.",
            "Paixão importa, mas não sozinha. O nicho ideal tem três características simultâneas: dor real (não superficial), poder de compra (público que tem dinheiro), e urgência (as pessoas querem resolver agora, não amanhã).",
          ],
          citacao: {
            texto:
              "O nicho perfeito é onde uma dor grande encontra um público disposto a pagar pra parar de sentir.",
          },
        },
        {
          titulo: "Os 5 grandes nichos evergreen",
          paragrafos: [
            "Existem 5 grandes nichos que sempre têm demanda alta e público pagante: saúde (emagrecimento, alimentação, fitness), finanças (investimentos, dívidas, renda extra), relacionamentos (amor, casamento, sexualidade), desenvolvimento pessoal (produtividade, propósito, hábitos) e negócios (empreendedorismo, marketing, liderança).",
            "Cada um desses grandes nichos tem centenas de subnichos lucrativos. 'Emagrecimento' é amplo demais. 'Emagrecimento pra mulheres na menopausa que já tentaram várias dietas' é um subnicho específico com dor real e público específico.",
          ],
          lista: {
            titulo: "Perguntas pra validar seu nicho",
            itens: [
              "Existe alguém que já fatura vendendo pra esse público? (Se não, cuidado)",
              "As pessoas gastam dinheiro tentando resolver essa dor?",
              "Existem grupos, fóruns, comunidades ativas discutindo esse tema?",
              "Você consegue descrever a dor específica em uma frase simples?",
              "Você gosta minimamente do tema? (Não precisa amar, mas evitar odiar)",
            ],
          },
        },
        {
          titulo: "Como validar antes de gastar tempo",
          paragrafos: [
            "Antes de criar um produto, valide. Ir em Reddit e ler discussões do subnicho. Procurar grupos no Facebook e Telegram. Ver quais produtos concorrentes existem e como estão avaliados. Ver quanto custam.",
            "Se você não encontra concorrentes, provavelmente o problema é: o nicho não tem público disposto a pagar. Se você encontra vários concorrentes bem estabelecidos, isso é sinal de mercado saudável — não fuja.",
          ],
          exercicio: {
            titulo: "Valide seu nicho em 30 minutos",
            passos: [
              "Vá no Reddit e procure o subreddit do seu nicho",
              "Leia as 20 postagens mais recentes — anote as dores mais mencionadas",
              "Vá no Facebook Groups e procure 3 grupos ativos do nicho",
              "Veja os posts mais engajados dos últimos 30 dias — as dores se repetem?",
              "Procure no Google 'curso [seu nicho]' e veja quantos concorrentes aparecem",
            ],
          },
        },
      ],
      resumo: [
        "Nicho errado é sentença de morte — validação é obrigatória.",
        "Nicho ideal: dor real + poder de compra + urgência.",
        "5 grandes nichos evergreen: saúde, finanças, relacionamentos, desenvolvimento, negócios.",
        "Concorrentes bem estabelecidos são sinal de mercado saudável — não fuja.",
      ],
    },
    {
      numero: 3,
      titulo: "Copy que converte",
      subtitulo: "O que fazer o público clicar em comprar",
      secoes: [
        {
          paragrafos: [
            "Copy não é escrever bonito. Copy é vender. Uma boa copy leva alguém de um estado neutro (só olhando) pra um estado de decisão (clicando em comprar). Isso é uma habilidade — pode ser aprendida por qualquer pessoa que se dedique.",
            "Toda copy de venda que funciona segue mais ou menos a mesma fórmula: você pega uma dor, agita ela, apresenta a solução, dá provas, faz uma oferta irresistível e chama pra ação. Simples de descrever, difícil de executar bem.",
          ],
        },
        {
          titulo: "A fórmula PAS+PO",
          paragrafos: [
            "Uma das fórmulas mais poderosas é PAS+PO: Problema, Agitação, Solução, Prova, Oferta. Você começa nomeando a dor específica que o público sente. Agita — mostra o custo de não resolver. Apresenta sua solução. Traz provas de que funciona. Faz a oferta com urgência.",
            "Exemplo aplicado: 'Você começa segunda e desiste na quarta (problema). Isso é o que separa quem emagrece de verdade de quem passa a vida tentando (agitação). O método X quebra esse ciclo através de Y (solução). Já ajudou 3000 pessoas — veja depoimentos abaixo (prova). Hoje, com 40% de desconto e 3 bônus (oferta).'",
          ],
          citacao: {
            texto: "Ninguém compra o que você vende. As pessoas compram o que sua solução representa pra elas.",
          },
        },
        {
          titulo: "Erros que matam a copy",
          paragrafos: [
            "Falar de você e não do cliente. 'Eu criei um método que...' vira 'Você vai...'. O cliente quer saber o que ele ganha, não sua trajetória.",
            "Ser vago. 'Vai transformar sua vida' não vende. 'Perder 5kg em 30 dias sem passar fome' vende. Especificidade converte.",
            "Falta de urgência. Se o cliente pensa que pode comprar amanhã, ele não compra hoje. Bônus limitado, vagas limitadas, prazo real — cria urgência ética.",
          ],
          lista: {
            titulo: "Checklist de uma boa copy de venda",
            itens: [
              "Começa com a dor específica do público",
              "Usa você o tempo todo — não fala de si mesmo",
              "É específica em resultados (números, prazos, comparações)",
              "Traz pelo menos 3 provas (depoimento, print, caso real)",
              "Tem oferta com bônus e urgência ética",
              "Termina com CTA direto — verbo forte, sem convite",
            ],
          },
          exercicio: {
            titulo: "Escreva sua primeira copy PAS+PO",
            passos: [
              "Pegue papel e caneta ou abra um doc em branco",
              "P: Escreva a dor mais específica do seu público em 1 frase",
              "A: Escreva o custo emocional/prático de não resolver",
              "S: Apresente sua solução em 2-3 frases claras",
              "P: Traga 3 provas concretas (depoimento, print, estatística)",
              "O: Faça a oferta com bônus + urgência ética",
              "Termine com CTA verbo forte: 'Clique aqui', 'Compre agora'",
            ],
          },
        },
      ],
      resumo: [
        "Copy não é escrever bonito — é levar do neutro à decisão.",
        "Fórmula PAS+PO: Problema, Agitação, Solução, Prova, Oferta.",
        "Fale do cliente, não de você. Seja específica. Crie urgência ética.",
        "CTA sempre com verbo forte — sem convite, sem sugestão.",
      ],
    },
    {
      numero: 4,
      titulo: "Distribuição inteligente",
      subtitulo: "Como fazer as pessoas certas verem seu produto",
      secoes: [
        {
          paragrafos: [
            "Ter produto sem distribuição é ter cristal na estante — bonito mas inútil pra quem não vê. Distribuição é como você faz o público certo encontrar sua oferta. Sem isso, nem o melhor produto do mundo vende.",
            "Existem duas grandes categorias de distribuição: orgânica (você gera atenção com conteúdo consistente) e paga (você compra atenção com anúncio). Cada uma tem seu momento. Iniciantes devem começar pelo orgânico — depois escalar com pago.",
          ],
        },
        {
          titulo: "Estratégia orgânica que funciona",
          paragrafos: [
            "Escolha UM canal principal. Instagram, TikTok, YouTube, LinkedIn — qualquer um funciona pra qualquer nicho, mas você precisa focar. Iniciante que tenta 5 canais ao mesmo tempo não consegue consistência em nenhum.",
            "No canal escolhido, poste 1 conteúdo por dia. Todo dia. Sem falta. Por 90 dias. Isso é o mínimo pra você entender o algoritmo, o público, o que engaja. Aí você ajusta e continua.",
          ],
          lista: {
            titulo: "Estrutura ideal de conteúdo orgânico",
            itens: [
              "70% de conteúdo útil (educar, resolver dor)",
              "20% de conteúdo de conexão (histórias, valores, bastidor)",
              "10% de conteúdo de venda (oferta, depoimento, resultado)",
              "Post principal 1x por dia + 3-5 stories/tweets menores",
              "Consistência de horários (algoritmo premia)",
              "Interaja com todos os comentários nas primeiras 2 horas",
            ],
          },
        },
        {
          titulo: "Tráfego pago pra iniciantes",
          paragrafos: [
            "Depois que você tem produto validado e conteúdo orgânico gerando resultado (mesmo que pequeno), aí sim faz sentido investir em tráfego pago. Comece com Meta Ads (Facebook/Instagram) — é a plataforma mais fácil pra iniciante.",
            "Não invista R$ 500 de uma vez. Comece com R$ 20 por dia. Teste 3 anúncios diferentes por 5 dias. Veja qual tem melhor CTR e menor CPA. Escale só o que funciona.",
          ],
          destaque:
            "Regra de ouro: cada real investido em tráfego deve gerar pelo menos R$ 3 em venda. Se está gerando menos, algo está errado na copy ou no produto — não invista mais dinheiro até consertar.",
          exercicio: {
            titulo: "Monte sua estratégia de distribuição de 30 dias",
            passos: [
              "Escolha 1 canal principal (não 2, não 3 — 1)",
              "Defina um horário fixo pra postar todos os dias",
              "Prepare 10 ideias de conteúdo baseadas nas dores do público",
              "Poste todo dia por 30 dias sem falha",
              "No dia 31, analise o que teve melhor performance e faça mais desse",
            ],
          },
        },
      ],
      resumo: [
        "Distribuição é como o público certo encontra sua oferta.",
        "Iniciantes começam pelo orgânico — foque em UM canal e seja consistente.",
        "Post por dia, por 90 dias — sem exceção — pra ter dados reais.",
        "Tráfego pago só depois de produto validado. Comece pequeno, escale o que funciona.",
      ],
    },
    {
      numero: 5,
      titulo: "Escala consciente",
      subtitulo: "O que fazer depois das primeiras vendas",
      secoes: [
        {
          paragrafos: [
            "Suas primeiras vendas são um marco enorme. Merecem ser celebradas. Mas também são um ponto de virada — é aí que a maioria dos iniciantes comete os erros que travam o crescimento futuro.",
            "O erro mais comum é achar que o que funcionou pra vender R$ 1000 vai naturalmente funcionar pra vender R$ 100 mil. Não vai. Escala exige mudanças estruturais — em produto, marketing, atendimento, entrega.",
          ],
        },
        {
          titulo: "Os 3 estágios da escala",
          paragrafos: [
            "Estágio 1 (R$ 0 a R$ 10k por mês): você faz tudo sozinho. Produto simples, marketing manual, atendimento pessoal. Foco é validar e conseguir constância.",
            "Estágio 2 (R$ 10k a R$ 50k por mês): você começa a delegar. Contrata assistente, terceiriza edição de vídeo, faz atendimento por bot + FAQ. Foco é sistematizar o que funciona.",
            "Estágio 3 (R$ 50k a R$ 500k por mês): você tem equipe. Especialistas em marketing, atendimento, produto, financeiro. Foco é liderança e visão estratégica.",
          ],
        },
        {
          titulo: "A escada de produtos",
          paragrafos: [
            "Negócio digital saudável tem escada de produtos — ofertas de diferentes valores pra diferentes momentos do cliente. Isso multiplica seu faturamento sem multiplicar seu esforço.",
            "Frontend barato (R$ 27-97): atrai novos clientes e valida se eles são o público certo. Produto principal (R$ 297-997): resolve a dor central do cliente. Upsell/mentoria (R$ 1997-9997): pra clientes que querem resultado mais rápido ou personalizado.",
          ],
          lista: {
            titulo: "Sinais de que é hora de escalar",
            itens: [
              "Você vende com previsibilidade há pelo menos 3 meses",
              "Sua taxa de conversão de tráfego pago é consistentemente lucrativa",
              "Você tem uma lista de espera ou solicitações que não consegue atender",
              "Você está trabalhando 60+ horas por semana e vira gargalo",
              "Você tem processos claros que outra pessoa poderia executar",
            ],
          },
        },
      ],
      resumo: [
        "Primeira venda é marco — mas é onde começam os erros clássicos de escala.",
        "3 estágios: fazer tudo (R$0-10k), delegar (R$10-50k), liderar equipe (R$50k+).",
        "Escada de produtos multiplica faturamento sem multiplicar esforço.",
        "Escale só quando tiver previsibilidade — não antes.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Cinco capítulos densos depois, você conhece o método. Nicho lucrativo, produto validado, copy que converte, distribuição inteligente e escala consciente. Nada revolucionário, tudo comprovado.",
      "A diferença entre você e alguém faturando 100 mil por mês não é conhecimento. É aplicação consistente ao longo do tempo. Quem começa e não desiste vence.",
      "Escolha UMA coisa desse livro pra fazer nas próximas 24 horas. Uma. E amanhã escolha outra. E depois. E depois. Assim se constrói negócio.",
    ],
    proximosPassos: [
      "Nas próximas 24 horas: faça o diagnóstico dos 4 pilares (capítulo 1).",
      "Nos próximos 7 dias: valide seu nicho conforme exercício do capítulo 2.",
      "Nos próximos 30 dias: escreva sua primeira copy PAS+PO (capítulo 3).",
      "Nos próximos 90 dias: poste 1 conteúdo por dia sem falha em UM canal.",
      "Nos próximos 12 meses: monte sua escada de produtos e comece a escalar.",
    ],
  },
  posfacio: [
    "Vender online mudou minha vida. Não do jeito que os influenciadores prometem — sem carro, sem viagem, sem foto na piscina. Mudou de um jeito real. Autonomia sobre meu tempo. Trabalho que faz sentido. Renda que cresce quando eu me dedico.",
    "Espero que aqui esteja o começo da sua história parecida. Boa jornada.",
  ],
};

// ============================================================
// ESPIRITUALIDADE
// ============================================================
export const LIVRO_ESPIRITUALIDADE: LivroConteudo = {
  nichoId: "espiritualidade",
  titulo: "Presente",
  subtitulo: "Como sair do modo automático e reencontrar o sentido em uma vida corrida",
  dedicatoria:
    "Para você,\nque sabe que tem algo maior te chamando\nmas não sabe por onde começar.",
  introducao: {
    paragrafos: [
      "Se você está lendo isso, provavelmente sente algo. Uma inquietação difícil de nomear. A sensação de estar vivendo no automático, correndo atrás de coisas que nem tem certeza se quer, e chegando no fim do dia esgotado sem saber pra quê.",
      "Esse livro não é sobre religião. Não é sobre crenças específicas. É sobre a prática de estar presente — de reconectar com você mesmo e com o que realmente importa. E é baseado em ciência da meditação, filosofia oriental clássica e psicologia contemporânea.",
      "Nas próximas páginas, você vai aprender a meditar de verdade (mesmo se você acha que 'não consegue meditar'), a acalmar a ansiedade sem depender de remédio, a descobrir seu propósito real (não o que o Instagram vende), e a construir uma vida com mais sentido — mesmo dentro da correria que você não pode mudar.",
    ],
    promessa:
      "Se você aplicar consistentemente o que está aqui dentro pelos próximos 60 dias, você vai sentir uma diferença profunda na sua qualidade de presença, na sua paz interior e na clareza sobre o que quer da vida.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "A mente que não para",
      subtitulo: "Por que meditação não é esvaziar a cabeça",
      epigrafe: {
        texto: "Você não é seus pensamentos. Você é quem observa os pensamentos.",
      },
      secoes: [
        {
          paragrafos: [
            "A confusão mais comum sobre meditação é que ela é sobre 'esvaziar a mente'. Isso é fisiologicamente impossível — sua mente produz pensamentos como o coração produz batidas. Tentar parar de pensar é como tentar parar de respirar. Frustrante e inútil.",
            "Meditação é outra coisa. É a prática de observar seus pensamentos sem se identificar com eles. Você percebe que está pensando em algo, reconhece esse pensamento sem julgar, e volta a atenção pra âncora escolhida (respiração, sensações do corpo, um mantra).",
          ],
        },
        {
          titulo: "Começando com 3 minutos",
          paragrafos: [
            "Ninguém precisa começar com 30 minutos de meditação. Comece com 3. Todo dia. Consistência mata perfeição. É melhor 3 minutos por 60 dias que 30 minutos por 3 dias.",
            "Sente-se em uma cadeira confortável, coluna reta mas não tensa. Feche os olhos. Sinta as sensações da respiração — o ar entrando pelas narinas, o peito subindo, o ar saindo. Quando sua mente divagar (vai divagar), simplesmente perceba isso e volte pra respiração. Sem julgar. Sem se irritar. Simplesmente voltar.",
          ],
          citacao: {
            texto:
              "Você não medita bem ou mal. Você medita ou não medita.",
            autor: "Jon Kabat-Zinn",
          },
          exercicio: {
            titulo: "Sua primeira semana de meditação",
            passos: [
              "Escolha um horário fixo (manhã é ideal — antes do celular)",
              "Programe timer pra 3 minutos",
              "Sente-se em posição confortável, coluna alinhada",
              "Feche os olhos e sinta a respiração",
              "Quando a mente divagar (vai divagar), volte pra respiração sem julgar",
              "No dia 8, aumente pra 5 minutos. No 15, pra 7. No 30, pra 10.",
            ],
          },
        },
        {
          titulo: "O que muda no seu cérebro",
          paragrafos: [
            "Estudos com ressonância magnética mostram que 8 semanas de prática consistente de meditação já produzem mudanças estruturais no cérebro. Aumenta a densidade da matéria cinzenta em áreas ligadas à regulação emocional. Diminui a atividade da amígdala (nosso centro de medo).",
            "Isso significa menos reatividade em situações estressantes. Mais capacidade de responder em vez de reagir. Melhor qualidade de sono. Redução mensurável dos sintomas de ansiedade e depressão. Meditação é a intervenção mais barata e mais poderosa que existe pra saúde mental.",
          ],
          estatistica: {
            numero: "58%",
            texto:
              "de redução em sintomas de ansiedade após 8 semanas de meditação consistente — segundo estudo da JAMA Internal Medicine.",
          },
        },
      ],
      resumo: [
        "Meditar não é esvaziar a mente — é observar sem se identificar.",
        "Comece com 3 minutos por dia — consistência mata perfeição.",
        "8 semanas de prática mudam a estrutura do cérebro (comprovado).",
        "Redução mensurável de ansiedade, melhora do sono e regulação emocional.",
      ],
    },
    {
      numero: 2,
      titulo: "A raiz da ansiedade moderna",
      subtitulo: "Por que estamos coletivamente adoecendo",
      secoes: [
        {
          paragrafos: [
            "Nunca na história a humanidade teve tanto acesso à informação, tanto conforto material, tanta longevidade. E nunca a humanidade adoeceu tanto psicologicamente. Isso não é coincidência.",
            "A ansiedade moderna vem de uma combinação nova: excesso de estímulos externos (redes sociais, notícias, notificações), falta de tempo com nós mesmos (o silêncio virou desconfortável), disconexão da natureza e do corpo, e comparação constante com vidas curadas de outras pessoas.",
          ],
        },
        {
          titulo: "Os 4 vilões silenciosos",
          paragrafos: [
            "Primeiro vilão: rolagem infinita. Redes sociais são desenhadas pra sequestrar sua atenção. Cada rolagem libera pequenas doses de dopamina que criam dependência. Você chega no fim do dia esgotado sem ter feito nada substancial.",
            "Segundo vilão: multitarefa. Nosso cérebro não é feito pra multitarefa — só alterna atenção rapidamente entre tarefas. E cada alternância custa energia. Fazer 5 coisas ao mesmo tempo esgota muito mais do que fazer 5 coisas em sequência.",
            "Terceiro vilão: falta de contato com natureza. Estudos mostram que apenas 20 minutos por semana em contato com árvores reduz significativamente cortisol. A maioria de nós passa 90% do tempo em ambientes fechados. Não é surpresa que estamos ansiosos.",
            "Quarto vilão: sono ruim. Dormir menos de 7 horas por noite reduz drasticamente a capacidade de regulação emocional. Você não é 'estressado' — você tá exausto.",
          ],
          lista: {
            titulo: "Antídotos práticos pros 4 vilões",
            itens: [
              "Rolagem infinita: apps de bloqueio (Freedom, Cold Turkey) + 30 min por dia sem tela nenhuma",
              "Multitarefa: técnica pomodoro (25 min de foco total + 5 de pausa)",
              "Falta de natureza: 20 minutos em parque/praça 3x por semana",
              "Sono ruim: rotina noturna consistente, quarto escuro, celular fora do quarto",
            ],
          },
        },
        {
          titulo: "Ansiedade útil vs ansiedade tóxica",
          paragrafos: [
            "É importante distinguir: existe ansiedade útil (a que te faz correr do carro que vem em sua direção) e ansiedade tóxica (a que te faz ruminar sobre coisas que não pode controlar).",
            "A tóxica é sempre sobre passado (arrependimento) ou futuro (medo). A útil é sobre o presente (ação). Meditação treina você pra passar mais tempo no presente e menos nos loops mentais tóxicos.",
          ],
          exercicio: {
            titulo: "Detox de 24 horas",
            passos: [
              "Escolha um sábado ou domingo pra fazer isso",
              "Desative notificações de todos os apps não essenciais",
              "Deixe o celular em modo avião por 4 horas na parte da manhã",
              "Passe pelo menos 30 minutos em um parque ou praça",
              "Faça uma refeição sem telas — só você e a comida",
              "Vá pra cama 30 minutos mais cedo que o normal",
              "Anote como se sente na manhã seguinte",
            ],
          },
        },
      ],
      resumo: [
        "Ansiedade moderna vem de excesso de estímulos + falta de presença.",
        "4 vilões silenciosos: rolagem infinita, multitarefa, falta de natureza, sono ruim.",
        "Antídotos são simples mas exigem consistência: bloqueios, pomodoro, natureza, rotina.",
        "Ansiedade útil é sobre presente e ação. Ansiedade tóxica é sobre passado ou futuro.",
      ],
    },
    {
      numero: 3,
      titulo: "Descobrindo seu propósito",
      subtitulo: "O caminho pra encontrar o que realmente importa pra você",
      secoes: [
        {
          paragrafos: [
            "Propósito virou palavra da moda. E como toda palavra que vira moda, perdeu sentido. As pessoas confundem propósito com 'grande missão' — algo enorme, que muda o mundo. Isso paralisa.",
            "Propósito verdadeiro é simples e presente. É o que te acende sem esforço. É o que você faria mesmo se ninguém pagasse. É o que você ensinaria de graça. Ele já está em você — é sobre reconhecer, não sobre buscar.",
          ],
        },
        {
          titulo: "As 3 perguntas do propósito",
          paragrafos: [
            "Pergunta 1: O que me energiza? Não me distrai — me energiza. Quando faço isso, saio com mais energia do que entrei.",
            "Pergunta 2: O que me irrita quando é feito errado? A gente é atraído pelo que domina. A irritação é sinal de conexão profunda com um tema.",
            "Pergunta 3: O que eu ensinaria de graça? Onde você tem paixão e conhecimento a ponto de compartilhar sem esperar retorno?",
            "Na interseção dessas 3 respostas mora seu propósito. Não é fórmula mágica — é honestidade.",
          ],
          citacao: {
            texto:
              "Seu propósito não é destino. É bússola. E ela sempre esteve em você — você só precisou aprender a escutar.",
          },
        },
        {
          titulo: "Propósito não é profissão",
          paragrafos: [
            "Importante entender: propósito não precisa ser sua profissão. Você pode ter propósito de conectar pessoas e ser contador — a profissão paga as contas, o propósito você exercita em espaços de conexão. Você pode ter propósito de criar arte e ser advogado — a profissão sustenta, a arte alimenta a alma.",
            "A fusão de propósito com profissão é uma criação recente e problemática. Ela empurra as pessoas a odiar seus trabalhos por 'não serem propósitos'. Trabalho é trabalho. Propósito é propósito. Quando eles coincidem, é maravilhoso. Quando não coincidem, ainda é possível ter uma vida com sentido.",
          ],
          exercicio: {
            titulo: "Descubra seu propósito em uma tarde",
            passos: [
              "Reserve 1 hora sem interrupções (sábado à tarde é ideal)",
              "Escreva 20 respostas pra 'o que me energiza?'",
              "Escreva 20 respostas pra 'o que me irrita quando é feito errado?'",
              "Escreva 20 respostas pra 'o que ensinaria de graça?'",
              "Marque as respostas que aparecem em mais de uma lista",
              "Ali está a direção do seu propósito",
              "Escolha 1 delas pra praticar essa semana em pequena escala",
            ],
          },
        },
      ],
      resumo: [
        "Propósito não é grande missão — é o que te acende sem esforço.",
        "3 perguntas: o que me energiza, o que me irrita quando errado, o que ensinaria de graça?",
        "Na interseção dessas respostas mora a direção do seu propósito.",
        "Propósito não precisa ser profissão — pode ser paralelo à profissão.",
      ],
    },
    {
      numero: 4,
      titulo: "A prática da presença",
      subtitulo: "Trazendo a meditação pra vida cotidiana",
      secoes: [
        {
          paragrafos: [
            "Meditação formal (sentar em silêncio) é apenas o treino. O jogo verdadeiro é presença no cotidiano — comer com atenção, andar com atenção, ouvir com atenção, trabalhar com atenção.",
            "Presença é o oposto do modo automático. É estar aqui, agora, completamente. É a única coisa que existe de verdade. Passado é memória, futuro é imaginação. Só o presente é real. E a maioria de nós passa a vida evitando o presente.",
          ],
        },
        {
          titulo: "Práticas simples de presença",
          paragrafos: [
            "Alimentação consciente: coma uma refeição por dia sem tela nenhuma. Só você e a comida. Sinta as texturas, os sabores, as temperaturas. Mastigue devagar. Você vai descobrir que come menos e sente mais.",
            "Caminhada consciente: uma vez por dia, faça uma caminhada de 10 minutos sem celular. Sinta os pés tocando o chão. Ouça os sons ao redor. Observe o que vê. Não é sobre chegar em algum lugar — é sobre estar no caminho.",
            "Escuta consciente: quando alguém falar com você, escute completamente. Não pense na resposta enquanto o outro fala. Não pegue o celular. Não olhe pro relógio. Estar 100% presente é o presente mais valioso que você pode dar.",
          ],
          lista: {
            titulo: "Micro-práticas de presença ao longo do dia",
            itens: [
              "Ao acordar, 3 respirações profundas antes de pegar o celular",
              "Antes de qualquer refeição, 30 segundos de gratidão pela comida",
              "Ao ligar o carro, feche os olhos 10 segundos e sinta o corpo na cadeira",
              "Antes de reunião importante, respire fundo 5 vezes",
              "Ao final do dia, escreva 3 momentos em que sentiu presença total",
            ],
          },
          exercicio: {
            titulo: "Semana da presença",
            passos: [
              "Segunda: uma refeição por dia sem tela",
              "Terça: adicione caminhada consciente de 10 minutos",
              "Quarta: adicione escuta consciente em pelo menos 1 conversa",
              "Quinta: 3 respirações profundas antes de cada mudança de atividade",
              "Sexta: escreva 3 momentos de presença total ao final do dia",
              "Sábado: 30 minutos em contato com natureza sem celular",
              "Domingo: reflita — o que mudou nessa semana?",
            ],
          },
        },
      ],
      resumo: [
        "Meditação formal é treino. Presença no cotidiano é o jogo verdadeiro.",
        "Passado é memória, futuro é imaginação. Só o presente é real.",
        "Práticas simples: alimentação, caminhada e escuta consciente.",
        "Micro-práticas ao longo do dia transformam a experiência de estar vivo.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Quatro capítulos depois, você tem em mãos as práticas que podem transformar sua relação com você mesmo, com o mundo e com o tempo. Meditação, ansiedade, propósito, presença. Nada revolucionário — tudo comprovado por milênios de tradição e décadas de ciência.",
      "A pergunta agora é: você vai aplicar? Ou vai fechar esse livro, sentir aquele momento de 'nossa que legal' e voltar pro modo automático?",
      "Comece pequeno. 3 minutos de meditação amanhã de manhã. Uma refeição sem tela. Uma caminhada consciente. Uma escuta completa. Você não precisa mudar sua vida — só precisa começar a estar presente nela.",
    ],
    proximosPassos: [
      "Amanhã de manhã: 3 minutos de meditação antes de pegar o celular.",
      "Nesta semana: 1 refeição por dia sem tela + 10 minutos de caminhada consciente diária.",
      "Neste mês: identifique seu propósito com o exercício do capítulo 3.",
      "Nos próximos 3 meses: pratique meditação diária mesmo que seja só 5 minutos.",
    ],
  },
  posfacio: [
    "Você não precisa de mais nada pra ser feliz. Você já tem tudo — só precisou aprender a perceber.",
    "Boa jornada.",
  ],
};

// ============================================================
// RELACIONAMENTO
// ============================================================
export const LIVRO_RELACIONAMENTO: LivroConteudo = {
  nichoId: "relacionamento",
  titulo: "O Amor Que Fica",
  subtitulo: "Como construir uma relação sólida em tempos de amor descartável",
  dedicatoria:
    "Para quem já amou de verdade\ne para quem ainda vai amar —\nque este livro te ajude a fazer diferente desta vez.",
  introducao: {
    paragrafos: [
      "Este livro não é sobre encontrar a pessoa certa. É sobre se tornar a pessoa certa — e sobre construir, em dupla, uma relação que sobreviva ao tempo, ao cansaço e às inevitáveis dificuldades que qualquer casal enfrenta. Se você chegou até aqui, provavelmente já viveu uma decepção. Ou várias. Talvez esteja num relacionamento que parece esfriar. Talvez esteja sozinho tentando entender por que os anteriores não funcionaram. Seja qual for o caso, o problema quase nunca é a falta de amor — é a falta de método.",
      "A cultura contemporânea vende uma ideia romântica de que amor verdadeiro é sentimento espontâneo, algo que acontece com você. É meio verdade, meio mito. O sentimento existe, sim, mas ele é a fagulha inicial. O que faz um relacionamento durar não é o quanto vocês se amam no dia zero — é o que vocês fazem com esse amor nos mil dias seguintes. Amor é sentimento; relacionamento é prática.",
      "Este livro reúne o que a psicologia relacional, décadas de pesquisa sobre casais duradouros (do laboratório do Dr. John Gottman em diante) e a experiência prática consolidada de terapeutas de casal têm ensinado. Não é motivacional. Não é receita mágica. É um manual de práticas concretas: como conversar de forma que resolva ao invés de escalar; como manter atração viva; como sobreviver às fases de tédio; como reparar depois de brigar.",
      "Você vai encontrar cinco capítulos densos. Um sobre comunicação — porque é a habilidade que mais pesa. Um sobre linguagens de amor e conexão emocional. Um sobre conflito e reparação. Um sobre intimidade e atração no longo prazo. E um sobre valores compartilhados e projeto de vida a dois. No fim de cada, um exercício pra fazer sozinho ou com a pessoa.",
    ],
    promessa:
      "Se você aplicar as práticas deste livro pelos próximos 90 dias, você não vai apenas melhorar sua relação atual — vai aprender uma forma de amar que dura. E isso serve pra esta relação e pras próximas.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "A conversa que muda tudo",
      subtitulo: "Por que a maioria dos casais briga sobre a coisa errada",
      epigrafe: {
        texto: "Não é o que você diz que destrói o casal. É o como.",
        autor: "John Gottman",
      },
      secoes: [
        {
          paragrafos: [
            "O laboratório do Dr. John Gottman, na Universidade de Washington, filmou milhares de casais discutindo por décadas. Analisando cada expressão facial, tom de voz e escolha de palavra, ele conseguiu prever com mais de 90% de acerto quais casais se separariam nos anos seguintes. E o preditor mais forte não era 'quantas vezes brigam'. Era o modo de brigar.",
            "Casais que ficam juntos também discordam. Também sobem o tom. Também têm dias ruins. A diferença está em quatro comportamentos específicos que Gottman batizou de 'os quatro cavaleiros do apocalipse relacional': crítica, desprezo, defensividade e barreira. Quando esses quatro aparecem com frequência, o relacionamento entra numa espiral que tende a terminar.",
          ],
          estatistica: {
            numero: "94%",
            texto: "de precisão de Gottman em prever divórcio observando 15 minutos de conflito. O previsor mais forte é a presença do desprezo — o mais tóxico dos quatro.",
          },
        },
        {
          titulo: "Os quatro cavaleiros — e os antídotos",
          paragrafos: [
            "Crítica é atacar o caráter da pessoa em vez do comportamento. Reclamar de uma ação específica é saudável ('me incomodou você não ter avisado que ia chegar tarde'). Criticar o caráter é destrutivo ('você é egoísta, nunca pensa em mim'). O antídoto é aprender a começar toda queixa de forma suave, falando dos seus sentimentos e da situação específica, sem generalizar o parceiro como pessoa.",
            "Desprezo é o mais venenoso. Sarcasmo cruel, revirar de olhos, ironia amarga, xingamentos, imitações debochadas. Desprezo diz ao outro: 'eu sou superior a você'. É corrosivo — literalmente derruba o sistema imunológico do parceiro que o recebe. O antídoto é construir uma cultura de apreciação: expressar gratidão e admiração em pequenas doses diárias.",
            "Defensividade é responder toda queixa com contra-queixa ou justificativa. 'Você não me ajuda em casa' — 'Ah, e você acha que trabalho pouco?'. É natural, mas mata a conversa. O antídoto é assumir a parcela de responsabilidade, mesmo pequena: 'você tem razão, eu podia ter feito diferente'.",
            "Barreira é quando um dos dois se fecha. Cara fechada, silêncio, sair da sala. Geralmente é sinal de sobrecarga emocional — o cérebro entra em modo luta-ou-fuga. O antídoto é aprender a se auto-acalmar e pedir uma pausa explícita: 'preciso de 20 minutos, mas volto pra gente conversar'.",
          ],
          lista: {
            titulo: "Como transformar uma queixa em pedido",
            itens: [
              "Comece por 'eu me sinto...' em vez de 'você...'",
              "Descreva o comportamento específico, não o caráter",
              "Termine com um pedido concreto e positivo",
              "Exemplo: 'me senti sozinha ontem quando você ficou no celular durante o jantar. Poderíamos combinar de deixar o celular fora do quarto quando comemos juntos?'",
            ],
          },
        },
        {
          titulo: "A regra dos 5 pra 1",
          paragrafos: [
            "Outra descoberta de Gottman: casais que duram mantêm uma proporção de pelo menos 5 interações positivas para cada negativa. Elogios, toques afetuosos, olhares de aprovação, humor cúmplice, gratidão expressa. Quando essa proporção cai abaixo de 1 pra 1, o relacionamento está em zona vermelha.",
            "Isso significa que uma discussão feia precisa ser 'compensada' com muitas microinterações positivas depois. Não com um jantar caro, mas com pequenas conexões cotidianas. Um bom-dia com beijo. Um 'que bom te ver' na volta do trabalho. Uma piada interna. Uma mão na mão vendo série.",
          ],
          destaque:
            "Casais duradouros discutem menos e curtem mais. Não porque não haja motivo — mas porque investem tempo desproporcional nos momentos positivos.",
        },
        {
          titulo: "A escuta que cura",
          paragrafos: [
            "A maior parte das brigas de casal poderia ser resolvida se um dos dois soubesse escutar de verdade. Escutar não é ficar em silêncio esperando a sua vez de falar. É estar presente. É reformular no seu jeito o que o outro disse pra ter certeza que entendeu. É perguntar antes de responder.",
            "A técnica é simples: quando o outro reclama, sua primeira frase deve ser uma validação. 'Faz sentido você se sentir assim.' 'Eu entendo por que você tá chateado.' Não é concordar — é reconhecer. Só depois disso venha sua perspectiva, se ainda for necessário. Você vai perceber que 70% das vezes, depois da validação, a briga se dissolve.",
          ],
          exercicio: {
            titulo: "A conversa dos 20 minutos por semana",
            passos: [
              "Escolha um horário fixo semanal — pode ser domingo de manhã com café.",
              "Combinem: 10 minutos cada um fala sem ser interrompido sobre a semana, sentimentos, algo que os incomodou ou alegrou.",
              "Enquanto um fala, o outro só escuta e valida ao final ('faz sentido, entendo').",
              "Nada de defesa nesse momento. Se algo precisa ser resolvido, marquem outra conversa.",
              "Repitam por 8 semanas seguidas e observem a diferença.",
            ],
          },
        },
      ],
      resumo: [
        "Casais que duram não são os que não brigam — são os que sabem brigar direito.",
        "Os quatro cavaleiros: crítica, desprezo, defensividade e barreira. Os antídotos existem — pratique-os.",
        "Mantenha a proporção 5:1 de interações positivas versus negativas.",
        "Escutar antes de responder resolve 70% dos conflitos.",
      ],
    },
    {
      numero: 2,
      titulo: "As cinco formas de sentir amor",
      subtitulo: "Por que ele te ama do jeito dele e não do seu jeito",
      epigrafe: {
        texto: "Amamos as pessoas do jeito que gostaríamos de ser amados — e isso quase nunca é o jeito que elas precisam.",
        autor: "Gary Chapman",
      },
      secoes: [
        {
          paragrafos: [
            "Gary Chapman, terapeuta com mais de 30 anos de consultório, notou um padrão nas queixas dos casais que atendia. Um dizia 'eu faço tudo por ela, e ela diz que não sente amor'. Outra dizia 'ele me dá tudo, mas eu me sinto sozinha'. Não era falta de amor. Era falta de tradução.",
            "Cada pessoa sente amor de forma diferente. Chapman identificou cinco 'linguagens' principais. Você provavelmente tem uma ou duas dominantes. Seu parceiro também. E se essas linguagens não coincidem, você pode estar amando muito e o outro sentindo pouco — porque você está falando em uma língua que ele não entende.",
          ],
        },
        {
          titulo: "As cinco linguagens",
          paragrafos: [
            "Palavras de afirmação. Quem tem essa linguagem principal precisa ouvir. 'Você é incrível.' 'Estou orgulhoso de você.' 'Obrigado por ter feito isso.' Elogios sinceros e gratidão expressa em palavras alimentam essa pessoa. Silêncio ou críticas frequentes destroem.",
            "Tempo de qualidade. Não é qualquer tempo — é atenção plena. Sem celular, sem TV de fundo, olhos nos olhos. Uma caminhada juntos conversando, um jantar sem distração. Quem tem essa linguagem precisa sentir que o outro está ali por inteiro.",
            "Presentes. Não é materialismo. É o gesto simbólico. Um chocolate quando ela chega do trabalho cansada. Um livro que você viu e lembrou dele. O pensamento por trás do objeto é o que importa.",
            "Atos de serviço. 'Fazer' pelo outro. Preparar o café. Consertar aquilo que estava quebrado. Passar a roupa. Quem tem essa linguagem sente amor quando o parceiro tira do ombro dele uma tarefa.",
            "Toque físico. Não só sexo. Mão na mão, abraço demorado, cafuné, cabeça no ombro. Quem tem essa linguagem precisa de contato corporal frequente pra se sentir amado.",
          ],
          lista: {
            titulo: "Como descobrir a linguagem dele/dela",
            itens: [
              "Preste atenção no que a pessoa pede: 'você nunca me elogia', 'a gente nunca faz nada juntos', 'nem me abraça mais' — o que ela pede é o que ela precisa",
              "Observe como ela demonstra amor pros outros — geralmente é a linguagem dela também",
              "Note o que a irrita: as ausências revelam as prioridades",
              "Peça diretamente: 'em quais momentos você mais se sente amado?'",
            ],
          },
        },
        {
          titulo: "O erro clássico: amar como você gostaria de ser amado",
          paragrafos: [
            "É intuitivo. Você dá presentes porque adora receber. Ela quer tempo de qualidade e sente falta. Você acha que ela é ingrata porque 'não valoriza os presentes'. Ela acha que você é distante porque 'nunca tem tempo'. Os dois amam. Nenhum dos dois se sente amado.",
            "A virada acontece quando você para de amar o outro como você gostaria de ser amado e começa a amar como ele precisa ser amado. É esforço no início — parece antinatural. Depois vira hábito e transforma a relação.",
          ],
          citacao: {
            texto: "Amor é uma escolha diária de servir a pessoa amada na língua que ela entende.",
            autor: "Gary Chapman",
          },
        },
        {
          titulo: "O tanque emocional",
          paragrafos: [
            "Chapman usa a metáfora do 'tanque de amor'. Cada pessoa tem um tanque interno que precisa ser abastecido. Quando o tanque está cheio, ela funciona bem — é generosa, paciente, presente. Quando está vazio, ela reclama, se afasta, se irrita à toa. O combustível certo é a linguagem dominante dela.",
            "Aprenda a ler o nível do tanque do outro. E aprenda a dizer o seu nível também. 'Meu tanque tá baixo essa semana, preciso de mais tempo com você.' Isso é maturidade relacional. Não é fraqueza — é honestidade.",
          ],
          exercicio: {
            titulo: "O mapa das linguagens",
            passos: [
              "Em uma folha, escreva as 5 linguagens em coluna. Numere de 1 a 5 (1 = mais importante pra você, 5 = menos).",
              "Peça ao parceiro que faça o mesmo em outra folha.",
              "Comparem. Onde estão os desencontros?",
              "Cada um se compromete a agir na linguagem dominante do outro por 30 dias.",
              "Ao fim, conversem sobre como se sentiram. É quase certeza que houve mudança.",
            ],
          },
        },
      ],
      resumo: [
        "Cada pessoa tem uma linguagem principal de amor: palavras, tempo, presentes, atos ou toque.",
        "Amar como você gostaria de ser amado quase nunca funciona.",
        "O que a pessoa pede e o que a irrita revelam a linguagem dela.",
        "O tanque emocional precisa ser abastecido diariamente na língua certa.",
      ],
    },
    {
      numero: 3,
      titulo: "Brigar bem, reparar melhor",
      subtitulo: "O conflito não é problema — é o modo de conduzi-lo",
      epigrafe: {
        texto: "A perfeição em relacionamento não é ausência de conflito. É a capacidade de reparação depois dele.",
      },
      secoes: [
        {
          paragrafos: [
            "Todo casal briga. Estudos com casais felizes de 40 anos de casamento mostram que eles brigam sim — e às vezes até com frequência. A diferença é que eles sabem uma coisa que a maioria não sabe: como sair da briga. A capacidade de reparar depois do conflito é o que separa os relacionamentos que duram dos que se desgastam.",
            "Reparação não é fingir que não brigou. Não é esperar passar. É um processo ativo de reconectar depois de ferir. E precisa acontecer nas primeiras 24 horas, porque quanto mais tempo passa, mais o ressentimento se instala como sedimento no fundo da relação.",
          ],
        },
        {
          titulo: "O antes: preveni a escalada",
          paragrafos: [
            "A maioria das brigas feias tem dois momentos. O momento zero — algo aconteceu, foi dito, foi feito. E o momento X, onde a discussão escalou até virar guerra. Entre um e outro, geralmente uns 4 a 5 minutos onde a situação podia ter tomado outro rumo.",
            "O que faz escalar é adrenalina. Quando seu batimento cardíaco passa de 100 bpm em contexto de conflito, seu cérebro entra em modo primitivo. Você não consegue mais raciocinar. Só reage. Nada bom sai de conversa nesse estado.",
            "A técnica é aprender a reconhecer os sinais e pedir pausa. Sinais: coração acelerado, mãos suando, sensação de aperto no peito, vontade de gritar ou de sair correndo. Quando você percebe qualquer um desses, chame pausa. Diga: 'preciso de 20 minutos'. Sai. Respire. Volte quando tiver se acalmado.",
          ],
          destaque:
            "Nunca resolva conflito com adrenalina alta. Se seus batimentos passaram de 100, seu cérebro racional saiu de operação — e qualquer palavra dita agora vai ferir mais do que ajudar.",
        },
        {
          titulo: "O durante: como brigar sem destruir",
          paragrafos: [
            "Se a briga vai acontecer, que ela seja produtiva. Isso significa: um assunto por vez. Não puxe o histórico. Não traga a mãe dele, o desemprego dela, o que aconteceu em 2019. Fique no que provocou a discussão agora. Puxar histórico é o sinal mais claro de que a briga vai destruir e não resolver.",
            "Fale por si mesmo. 'Eu me senti...' não 'Você me fez sentir...'. A primeira forma é responsabilizada. A segunda é acusação. Uma abre conversa, a outra escala guerra.",
            "Pergunte antes de assumir. 'Foi por isso que você fez isso?' é sempre melhor que 'você fez isso porque X'. Você pode estar errado sobre a motivação do outro — e quase sempre está.",
          ],
          lista: {
            titulo: "As três perguntas que desarmam briga",
            itens: [
              "'Do que você tá precisando de mim agora?' — mostra que você quer ajudar",
              "'O que eu falei que te machucou?' — pede feedback específico sem defesa",
              "'A gente pode dar uma pausa e voltar em 30 minutos?' — permite desescalar sem fugir",
            ],
          },
        },
        {
          titulo: "O depois: a arte de reparar",
          paragrafos: [
            "A briga acabou. Vocês estão em cantos diferentes. Aqui é onde a maioria dos casais falha — deixam o ressentimento assentar. O certo é reparar antes de dormir. Mesmo que seja com uma frase curta: 'ainda estamos ok? Eu te amo.'",
            "A reparação completa tem quatro passos. Primeiro, cada um reconhece a sua parte — o que fez ou disse que machucou. Segundo, pede desculpa específica: não 'desculpa por tudo', mas 'desculpa por ter falado alto e por ter chamado você de teimoso'. Terceiro, o outro aceita. Quarto, combinam algo diferente pra próxima vez.",
            "Isso funciona porque valida o sentimento sem virar culpa geral. É concreto. É reparável. E fecha o ciclo pra que o ressentimento não se acumule.",
          ],
          exercicio: {
            titulo: "O ritual da reparação",
            passos: [
              "Depois da próxima briga, esperem 30 minutos pra baixar a adrenalina.",
              "Sentem juntos. Cada um responde três perguntas em voz alta: 'o que eu fiz que te machucou?', 'o que eu senti?', 'o que eu quero diferente na próxima?'.",
              "Terminem com um pedido de desculpas específico e um abraço de 30 segundos.",
              "Combinem uma palavra-código pra usar nas próximas: se um dos dois disser essa palavra, os dois param a discussão imediatamente.",
              "Testem por 3 semanas — é o tempo de virar hábito.",
            ],
          },
        },
      ],
      resumo: [
        "Todo casal duradouro briga — a diferença é saber reparar depois.",
        "Se sua adrenalina está alta, pare a conversa. Nada bom sai daí.",
        "Um assunto por vez. Sem puxar histórico. Fale de você, não do outro.",
        "Repare antes de dormir. Quatro passos: reconhecer, desculpar, aceitar, combinar diferente.",
      ],
    },
    {
      numero: 4,
      titulo: "A atração no longo prazo",
      subtitulo: "Como manter viva a chama de anos atrás",
      epigrafe: {
        texto: "Amor sem desejo é amizade. Desejo sem amor é aventura. Casamento pede as duas coisas.",
        autor: "Esther Perel",
      },
      secoes: [
        {
          paragrafos: [
            "Esther Perel, psicoterapeuta belga que revolucionou o pensamento sobre casais, escreveu que 'o desejo precisa de distância — e o amor precisa de proximidade'. Essa é a contradição central de qualquer relacionamento longo. Você quer se sentir profundamente conhecido pelo outro. E ao mesmo tempo, precisa de um pouco de mistério pra manter viva a atração.",
            "É por isso que muitos casais que se amam profundamente relatam que 'a chama esfriou'. Não é falta de amor. É excesso de fusão. Quando duas pessoas viram uma coisa só, a atração morre — não há mais o outro a desejar.",
          ],
        },
        {
          titulo: "O paradoxo do desejo",
          paragrafos: [
            "Perel observa que desejo é atraído por três coisas: mistério, competência e vitalidade. Você deseja o parceiro quando o vê em ação em algo em que ele é bom. Quando o vê rindo com amigos, exercendo autoridade no trabalho, criando, ensinando. É a distância que gera a atração — a possibilidade de olhá-lo como um outro, não como uma extensão sua.",
            "A rotina, o excesso de logística, o compartilhar cada detalhe do dia — tudo isso mata a distância. Não porque intimidade seja ruim, mas porque o desejo precisa de espaço pra respirar.",
            "A solução não é criar distância artificial. É preservar áreas de identidade individual. Um hobby que é só seu. Amigos que são só seus. Um curso, uma paixão, um projeto pessoal. O parceiro que tem vida própria é o parceiro desejável.",
          ],
          citacao: {
            texto: "Somos atraídos por quem parece completo em si mesmo — não por quem precisa de nós pra existir.",
            autor: "Esther Perel",
          },
        },
        {
          titulo: "Manter o encontro vivo",
          paragrafos: [
            "Casais que mantêm atração no longo prazo têm algo em comum: eles ainda se conquistam. Não moram a inércia. Continuam a se produzir um pouquinho um pro outro. Continuam a marcar encontros — não jantares em família, mas encontros a dois, tipo namoro.",
            "Um encontro semanal, sem crianças, sem celular, sem falar de logística doméstica. Duas horas em que vocês são dois amantes, não gerentes de projeto conjunto. Isso mantém viva a dinâmica erótica, mesmo em fases de cansaço extremo.",
          ],
          lista: {
            titulo: "Pequenos gestos que preservam atração",
            itens: [
              "Se produzir pra ele/ela — não só pra sair, mas às vezes em casa também",
              "Manter contato visual em conversas cotidianas",
              "Elogiar aspectos específicos do corpo, do jeito, das ideias do outro",
              "Flertar por mensagem durante o dia — mesmo depois de 10 anos juntos",
              "Reservar 30 minutos por semana só pra intimidade, sem interrupção",
              "Não falar de trabalho ou logística no quarto",
            ],
          },
        },
        {
          titulo: "Sexo depois dos anos",
          paragrafos: [
            "Estudos mostram que a frequência sexual cai naturalmente ao longo do tempo em qualquer casal. A média nos primeiros anos é 2 a 3 vezes por semana. Aos 10 anos, cai pra uma vez por semana. Isso é normal. O que importa não é a frequência — é a qualidade e o mútuo desejo.",
            "O problema aparece quando um quer mais que o outro e a conversa nunca acontece. Cria-se um desconforto silencioso que apodrece a intimidade. A saída é conversar sobre sexo com a mesma franqueza que se fala de finanças ou filhos. Sem constrangimento. Com curiosidade.",
            "Perguntas que ajudam: 'o que você tá gostando ultimamente?', 'do que você sente falta?', 'tem algo que você queria experimentar e não me contou?'. Casais que conversam sobre sexo têm sexo melhor. É simples assim.",
          ],
          estatistica: {
            numero: "70%",
            texto: "dos casais em terapia relatam que a insatisfação sexual começou com falta de conversa — não com falta de desejo. A conversa quase sempre reacende.",
          },
        },
        {
          paragrafos: [
            "Uma última coisa. Atração no longo prazo é decisão diária tanto quanto é sentimento. Você acorda e escolhe olhar pro seu parceiro com olhos de quem ainda quer conquistá-lo. É uma prática, não um acaso.",
          ],
          exercicio: {
            titulo: "O reset da conquista",
            passos: [
              "Combine um encontro semanal fixo — dia e hora — só entre vocês. Sem exceção.",
              "Reserve um dos encontros por mês pra fazer algo novo juntos: aula, evento, restaurante que nunca foram.",
              "Uma vez por semana, mande uma mensagem só pra flertar — não pra combinar nada.",
              "Todo dia, faça 30 segundos de contato visual sem falar nada, antes ou depois do abraço de bom dia.",
              "Depois de 60 dias fazendo isso, avaliem juntos como a atração mudou.",
            ],
          },
        },
      ],
      resumo: [
        "Desejo precisa de distância. Amor precisa de proximidade. Preservar as duas coisas é o desafio.",
        "Preserve áreas de identidade individual — o outro com vida própria é desejável.",
        "Continuem a se conquistar mesmo depois de anos. Encontro semanal sem exceção.",
        "Converse sobre sexo com naturalidade. Casais que conversam têm sexo melhor.",
      ],
    },
    {
      numero: 5,
      titulo: "Um projeto de vida a dois",
      subtitulo: "Amor é sentimento — parceria é construção",
      epigrafe: {
        texto: "Casais felizes têm uma missão em comum. Sem projeto compartilhado, o amor não sustenta o cotidiano.",
      },
      secoes: [
        {
          paragrafos: [
            "Perguntar a um casal com 30 anos de casamento o segredo, e a resposta raramente é 'a gente se ama muito'. A resposta é geralmente: 'a gente se ajuda, a gente cresce junto, a gente construiu algo'. Amor é o combustível — mas o veículo é o projeto compartilhado. Sem projeto, o combustível queima no ar e não leva a nada.",
            "Um projeto de vida a dois não precisa ser grandioso. Pode ser criar bem os filhos. Pode ser construir uma casa aos poucos. Pode ser tocar uma empresa juntos. Pode ser cuidar de causas sociais. Pode ser simplesmente envelhecer bem. O que importa é que os dois olhem pra mesma direção — que haja um 'nós' no lugar de dois 'eus' morando junto.",
          ],
        },
        {
          titulo: "Os quatro pilares do projeto conjunto",
          paragrafos: [
            "Valores. Antes de qualquer coisa, os dois precisam concordar no essencial: honestidade, respeito, forma de tratar os outros, ética. Não é preciso concordar em tudo — mas nos pilares morais, é. Casais que divergem no essencial se desgastam nos milhares de conflitos que descendem dessa divergência.",
            "Finanças. Um dos assuntos que mais separa casais. Não pela falta de dinheiro em si — mas pela ausência de conversa transparente sobre ele. Casais duradouros têm reuniões financeiras periódicas, sabem quanto o outro ganha, quanto gastam, o que estão poupando pra quê.",
            "Filhos (ou não). A decisão de ter filhos e como criá-los precisa ser conversada em profundidade. Divergências fundamentais aqui — um quer, outro não; um quer criar rígido, outro solto — são geradoras de conflito crônico.",
            "Sonhos individuais. O projeto conjunto não pode apagar os sonhos individuais. Cada um precisa ter seus objetivos, e os dois precisam se apoiar mutuamente pra atingi-los. Ela quer voltar a estudar? Ele quer mudar de carreira? Como o casal se organiza pra apoiar isso?",
          ],
          destaque:
            "Sem alinhamento nos pilares — valores, finanças, filhos, sonhos — o amor sozinho não sustenta o cotidiano. Os pilares precisam ser conversados explicitamente, não presumidos.",
        },
        {
          titulo: "A reunião estratégica do casal",
          paragrafos: [
            "Empresas fazem reuniões estratégicas. Casais também deveriam. Não é romântico, mas é eficiente. Uma vez por mês, sentem por uma hora, sem distração, e revisam: como tá o dinheiro, o que tá pendente na casa, quais decisões precisam ser tomadas, o que cada um tá precisando.",
            "Parece frio. Mas casais que fazem isso brigam muito menos sobre logística — o que libera o tempo em casa pra ser tempo de afeto, não de gerenciamento. É contraintuitivo mas funciona.",
          ],
          exercicio: {
            titulo: "A reunião mensal do casal",
            passos: [
              "Escolham uma data fixa: primeiro sábado do mês, por exemplo. Uma hora.",
              "Levem uma folha com quatro tópicos: finanças, casa, filhos, cada um.",
              "Em finanças: quanto entrou, quanto saiu, o que está poupando pra quê.",
              "Em casa: o que precisa ser feito ou consertado neste mês.",
              "Em filhos: como estão, o que precisa ser resolvido.",
              "Em 'cada um': como está o outro? Do que precisa? O que sonha pros próximos 3 meses?",
              "Fechem com 15 minutos só pra falar do casal: como estamos como dupla?",
            ],
          },
        },
        {
          titulo: "Envelhecer bem, juntos",
          paragrafos: [
            "Estudo de Harvard, o mais longo estudo sobre felicidade humana já feito, acompanhou pessoas por mais de 80 anos. A conclusão, depois de milhares de horas de análise: o preditor mais forte de felicidade e saúde na velhice não é dinheiro, nem carreira, nem hábitos alimentares. É a qualidade dos relacionamentos íntimos aos 50 anos.",
            "Investir na relação hoje é investir na velhice feliz. É o único investimento com retorno garantido — porque ele acumula juros compostos ao longo dos anos. Cada conversa boa, cada reparação bem feita, cada momento de conexão real vai voltar multiplicado no tempo que vem.",
          ],
          citacao: {
            texto: "As pessoas mais satisfeitas aos 80 anos não eram as mais bem sucedidas — eram as mais bem amadas.",
            autor: "Robert Waldinger, Harvard Study of Adult Development",
          },
        },
      ],
      resumo: [
        "Amor é combustível; projeto conjunto é o veículo. Sem os dois, a relação não vai longe.",
        "Alinhem valores, finanças, filhos e sonhos individuais — explicitamente, não por suposição.",
        "Reuniões mensais do casal reduzem drasticamente as brigas de logística.",
        "A qualidade da relação hoje é o melhor preditor de felicidade aos 80 anos.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Cinco capítulos depois, você tem em mãos o que a psicologia relacional consolidou como as competências centrais de casais duradouros. Comunicação, linguagens de amor, reparação, atração no longo prazo, projeto compartilhado. Nada disso é impossível. Tudo isso é aprendível.",
      "Mas nada disso funciona se você ler e não praticar. A diferença entre casais que sobrevivem e casais que florescem não está no que sabem — está no que aplicam. Escolha um capítulo. Escolha um exercício. Comece nesta semana.",
      "E lembre-se: relacionamento é a construção mais lenta e mais poderosa da vida adulta. Você não vai ver resultado em uma semana. Vai ver em três meses. Em seis meses, vocês são outro casal. Em dois anos, uma outra pessoa. Vale cada minuto de esforço.",
    ],
    proximosPassos: [
      "Nesta semana: aplique a técnica da queixa suave em toda reclamação que fizer.",
      "Neste mês: descubra a linguagem de amor dominante do parceiro e aja nela por 30 dias.",
      "Nos próximos 3 meses: instale a conversa dos 20 minutos por semana e a reunião mensal do casal.",
      "Ao longo da vida: continue investindo. Nunca dê a relação como pronta.",
    ],
  },
  posfacio: [
    "Você não vai encontrar o amor perfeito.",
    "Você vai construir, com esforço e método, um amor que basta.",
    "E isso é infinitamente mais valioso.",
  ],
};

// ============================================================
// CARREIRA
// ============================================================
export const LIVRO_CARREIRA: LivroConteudo = {
  nichoId: "carreira",
  titulo: "Carreira Estratégica",
  subtitulo: "Um manual para quem quer parar de correr atrás e começar a ser procurado",
  dedicatoria:
    "Para quem trabalha muito e cresce pouco —\neste livro é a diferença entre esforço e estratégia.",
  introducao: {
    paragrafos: [
      "A maior parte das pessoas administra a carreira do jeito que dirige olhando pro retrovisor. Aceita o que aparece. Fica no emprego que tem. Espera ser reconhecida. Trabalha muito, espera muito, e cresce pouco. Se você está lendo este livro, provavelmente já percebeu que esforço sozinho não vai te levar onde você quer chegar. E acertou.",
      "Carreira é um jogo com regras específicas. Quem não conhece as regras joga na sorte. Quem conhece, joga com estratégia. A boa notícia é que essas regras não são segredo — só que ninguém as ensina na escola, na faculdade, ou na maioria dos empregos. Este livro reúne o que consultores de carreira, headhunters seniores e executivos que subiram rápido têm em comum. Não é motivacional. É tático.",
      "Você vai encontrar cinco capítulos densos. Um sobre auto-conhecimento estratégico — o que você faz melhor que a média e onde isso vale ouro no mercado. Um sobre posicionamento — como as pessoas certas passam a te reconhecer. Um sobre rede de contatos verdadeira — o oposto do LinkedIn superficial. Um sobre negociação — de salário, de posição, de projeto. E um sobre reinvenção — porque toda carreira que dura passa por várias mudanças.",
      "Cada capítulo termina com um exercício prático. Se você aplicar o que está aqui pelos próximos 90 dias, sua trajetória vai começar a mudar. Não porque você vai passar a trabalhar mais — mas porque você vai passar a trabalhar diferente.",
    ],
    promessa:
      "Ao fim deste livro, você não vai apenas ter um plano de carreira. Você vai ter clareza sobre onde é forte, onde vale seu tempo, como pessoas certas descobrem quem você é e como pedir o que merece. É a diferença entre ter carreira e ser levado por ela.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "O que você faz melhor que a média",
      subtitulo: "A pergunta que quase ninguém consegue responder — e por que ela vale ouro",
      epigrafe: {
        texto: "Você não é pago pelo tempo que trabalha. É pago pelo valor que gera. E valor é o que você faz melhor que os outros.",
      },
      secoes: [
        {
          paragrafos: [
            "Se eu te perguntasse agora, 'no que exatamente você é melhor que 90% das pessoas na sua área?', você teria uma resposta clara em 10 segundos? A maioria não tem. E é justamente essa incapacidade de responder que trava carreiras. Se você não sabe dizer o que faz melhor, ninguém consegue te posicionar. Ninguém sabe pra onde te indicar. E você fica no vagão do meio, esperando que alguém enxergue seu valor por osmose.",
            "Auto-conhecimento estratégico não é olhar pro umbigo. É olhar pro mercado com honestidade. É saber onde seu talento cruza com uma necessidade real. E é a base de qualquer carreira que sai do lugar.",
          ],
        },
        {
          titulo: "As três perguntas do posicionamento",
          paragrafos: [
            "Peter Drucker, o pai da administração moderna, dizia que toda pessoa produtiva precisa responder três perguntas com precisão. Primeiro: em que sou realmente bom? Não bom-o-suficiente. Realmente bom. A diferença entre os dois é o abismo entre trabalhador comum e profissional valorizado.",
            "Segundo: o que o mercado precisa que sobreponha isso? Muita gente é excelente em coisas que ninguém quer comprar. Talento sem demanda vira hobby, não carreira. Um bom marceneiro em uma cidade que só quer preço baixo vai passar frustração — não por falta de habilidade, mas por descompasso com o mercado local.",
            "Terceiro: onde tenho vantagem competitiva sustentável? Ou seja, o que eu faço que os outros teriam dificuldade de replicar? Pode ser experiência acumulada, pode ser uma combinação rara de habilidades, pode ser um relacionamento específico. Vantagem sustentável é o que te protege quando aparecem substitutos.",
          ],
          lista: {
            titulo: "Sinais de que você tem um diferencial real",
            itens: [
              "Pessoas te procuram espontaneamente pra tirar dúvida sobre um tema específico",
              "Você resolve em uma hora o que os outros gastam um dia",
              "Colegas te elogiam sempre pela mesma coisa (isso não é acaso)",
              "Você teria facilidade em ensinar aquilo pra outra pessoa",
              "Quando você faz isso, você entra em fluxo — o tempo passa sem esforço",
            ],
          },
        },
        {
          titulo: "O erro do 'sou bom em tudo'",
          paragrafos: [
            "Muita gente resiste a se especializar. 'Sou versátil, sei fazer de tudo um pouco'. Isso é verdade — e é ruim. No mercado atual, versatilidade indefinida é sinônimo de indispensabilidade zero. Especialistas ganham mais, são mais requisitados e têm mais liberdade de escolha. Generalistas competem por preço.",
            "Isso não significa fechar as portas pra outras áreas. Significa ter um foco principal — uma competência âncora que te define. Um médico pode ser cardiologista e ainda saber muito de várias outras áreas. Mas ele é lembrado como cardiologista. É o que o traz clientes, o que gera renda, o que constrói reputação.",
          ],
          citacao: {
            texto: "A pessoa que decide o que quer ser deixa de aceitar o que aparece — e passa a escolher.",
            autor: "Peter Drucker",
          },
        },
        {
          titulo: "O mapa da sua vantagem",
          paragrafos: [
            "Existe uma técnica simples pra achar seu ponto forte. Escreva em uma folha três colunas. Na primeira, liste 10 coisas que você faz bem no trabalho. Na segunda, marque quais delas o mercado tá disposto a pagar. Na terceira, marque quais delas você faz melhor que a maioria dos seus pares. A interseção das três colunas é onde está seu ouro.",
            "Isso não é exercício de auto-ajuda. É análise de mercado aplicada a você. Depois de fazer esse mapa, olhe pra sua rotina e pergunte: quanto por cento do meu tempo eu passo naquela interseção? Se for menos de 30%, sua carreira está mal alocada. Você tá gastando tempo em coisas que outros fariam melhor, ao invés de dobrar aposta no que só você faz bem.",
          ],
          exercicio: {
            titulo: "O mapa dos três círculos",
            passos: [
              "Em uma folha, desenhe três círculos que se sobrepõem parcialmente. Nomeie: 'O que faço bem', 'O que o mercado quer', 'Onde tenho vantagem'.",
              "Preencha cada círculo com 5 a 10 competências ou temas.",
              "Marque com destaque as áreas onde os três círculos se sobrepõem — esse é seu foco estratégico.",
              "Nas próximas duas semanas, monitore quanto do seu tempo você passa nessa interseção.",
              "Se for menos de 30%, comece a redesenhar sua rotina pra aumentar isso.",
            ],
          },
        },
      ],
      resumo: [
        "Você não é pago por tempo — é pago por valor gerado. E valor vem do que você faz melhor.",
        "Responda com precisão: em que sou bom, o que o mercado quer, onde tenho vantagem?",
        "Generalistas competem por preço. Especialistas competem por resultado.",
        "Seu tempo bem alocado é o que está na interseção dos três círculos.",
      ],
    },
    {
      numero: 2,
      titulo: "Reputação: o ativo mais rentável",
      subtitulo: "Como as pessoas certas passam a te reconhecer sem você precisar se vender",
      epigrafe: {
        texto: "Sua reputação chega antes de você em toda sala. Cuide dela como cuida do seu dinheiro — porque é dinheiro.",
      },
      secoes: [
        {
          paragrafos: [
            "Reputação é o que as pessoas dizem sobre você quando você não está na sala. É o ativo mais valioso da sua carreira, e paradoxalmente o menos gerenciado. Você faz reunião de RH sobre suas metas trimestrais, mas quando foi a última vez que pensou estrategicamente sobre como está sendo lembrado no mercado?",
            "A boa notícia: reputação é construível. Não com marketing pessoal barato, não com posts motivacionais no LinkedIn — mas com um conjunto de práticas silenciosas e consistentes que fazem as pessoas certas te associarem a algo específico. Vamos ao método.",
          ],
        },
        {
          titulo: "O ativo por associação",
          paragrafos: [
            "A regra número um de reputação: você é associado a poucas coisas. Se você é associado a muitas coisas, ninguém lembra de você por nada. É melhor ser 'o cara que resolve problemas de operações' do que 'o profissional experiente com muitas habilidades'. Uma frase objetiva vale mais que dez adjetivos genéricos.",
            "Escolha uma associação central. Seja o especialista de X, na região Y, para o público Z. Quanto mais específico, mais fácil ser lembrado. E quanto mais lembrado, mais oportunidades chegam.",
          ],
          destaque:
            "Se um recrutador precisa te descrever em uma frase pra outro recrutador, essa frase tem que caber na cabeça dele. Trabalhe pra que ela seja simples, específica e memorável.",
        },
        {
          titulo: "Excelência que se espalha",
          paragrafos: [
            "Reputação é construída por resultados repetidos. Fazer uma coisa excepcional uma vez gera comentário. Fazer excepcional por 12 meses seguidos gera reputação. Fazer excepcional por 5 anos gera autoridade.",
            "Isso significa que a maior alavanca da sua reputação é a consistência da entrega. Um profissional que entrega 8/10 todos os meses é mais valioso que um que entrega 10 num mês e 5 no outro. Reputação é média, não pico. E a média é feita de disciplina, não de talento.",
          ],
          estatistica: {
            numero: "80%",
            texto: "das vagas executivas são preenchidas por indicação, não por candidatura. A reputação decide antes do currículo aparecer.",
          },
        },
        {
          titulo: "As três formas de aparecer sem apelar",
          paragrafos: [
            "Ensinar. A pessoa que ensina um tema é lembrada como a autoridade daquele tema. Não precisa ser em curso formal — pode ser em post, em palestra interna, em vídeo curto, em texto no blog. Ensinar solidifica o que você sabe e faz sua marca crescer no mercado.",
            "Publicar. Um texto por semana ou um vídeo por mês, em um formato consistente. Não pra ficar viral — pra ser encontrado por quem precisa exatamente do que você entrega. É trabalho de longo prazo. Em dois anos você tem uma pequena audiência de alta qualidade.",
            "Ajudar. Ajudar sem cobrar, no momento certo, cria um circuito de reciprocidade poderoso. Não é caridade — é investimento. Você virá à cabeça primeiro quando aquela pessoa tiver uma oportunidade pra indicar.",
          ],
          lista: {
            titulo: "Onde não gastar energia em nome de reputação",
            itens: [
              "Posts motivacionais genéricos que qualquer um poderia ter escrito",
              "Networking em eventos onde ninguém trabalha com o que você faz",
              "Aparecer em toda foto de time (você vira decoração, não referência)",
              "Discussões inflamadas em rede social — desgasta e não gera",
              "Aceitar qualquer projeto pra 'construir portfolio' — dilui foco",
            ],
          },
        },
        {
          titulo: "Reputação online importa (mas não é tudo)",
          paragrafos: [
            "Seu LinkedIn é o primeiro lugar onde as pessoas te procuram. Se ele estiver vago, genérico ou desatualizado, você perde oportunidades antes mesmo delas chegarem. Bom LinkedIn tem título específico (não 'profissional apaixonado'), resumo que fala do problema que você resolve, e histórico com resultados concretos, não com atribuições.",
            "Mas cuidado com o excesso de vida online. Seu diferencial não se constrói no feed. Se constrói na entrega. Post é vitrine — trabalho é loja. Se a loja não existe, a vitrine mente.",
          ],
          exercicio: {
            titulo: "O check-up de reputação",
            passos: [
              "Peça a 5 pessoas do trabalho (dois pares, dois chefes, um subordinado) que te descrevam em três palavras. Prometa não se ofender.",
              "Compare as respostas. Existe consistência? Ou cada um te descreve diferente?",
              "Se estão consistentes, essa é sua reputação atual. Ela reflete quem você quer ser?",
              "Se não estão consistentes, você está sendo lido de forma difusa — foco ainda incompleto.",
              "Escreva a frase que você quer que descrevam você daqui a dois anos. Trabalhe pra encarnar essa frase.",
            ],
          },
        },
      ],
      resumo: [
        "Reputação é o ativo mais valioso da carreira — e o mais mal gerenciado.",
        "Seja associado a poucas coisas, mas com precisão máxima.",
        "Excelência consistente vale mais que picos ocasionais. A média é o que constrói.",
        "Ensinar, publicar e ajudar sem cobrar são as três alavancas mais fortes.",
      ],
    },
    {
      numero: 3,
      titulo: "Rede real, não LinkedIn de fachada",
      subtitulo: "Como cultivar relacionamentos profissionais que realmente movem sua carreira",
      epigrafe: {
        texto: "Sua carreira não é feita do que você sabe — é feita das pessoas que sabem o que você sabe.",
      },
      secoes: [
        {
          paragrafos: [
            "Rede de contatos é um dos temas mais banalizados da vida profissional. Todo mundo fala em 'networking', quase ninguém sabe o que isso realmente é. Networking não é ter 3.000 conexões no LinkedIn. Não é ir em happy hours corporativos. Não é distribuir cartões. Rede de contatos verdadeira é um pequeno grupo de pessoas que confiam em você o suficiente pra te indicar, te consultar, te trazer oportunidades.",
            "E ela se constrói de forma completamente diferente do que a cultura corporativa vende. Não com trocas de cartões — com trocas de valor, ao longo de anos, com honestidade e sem cálculo imediato.",
          ],
        },
        {
          titulo: "A regra dos 150",
          paragrafos: [
            "O antropólogo Robin Dunbar descobriu que o cérebro humano só consegue manter relacionamento significativo com cerca de 150 pessoas. Além disso, os relacionamentos ficam superficiais — você lembra dos nomes, mas não da vida delas. Essa é a sua rede real. Não os 3.000 do LinkedIn — os 150 que você conhece de verdade.",
            "Dessas 150, cerca de 15 são realmente próximas — pessoas que você chamaria pra jantar sem cerimônia. E dessas 15, umas 5 são as que você chama em crise. Esses três círculos concêntricos formam sua rede real.",
          ],
          estatistica: {
            numero: "150",
            texto: "é o número máximo de relacionamentos significativos que o cérebro humano sustenta. Foque nesses — não em milhares de conexões vazias.",
          },
        },
        {
          titulo: "O erro de pedir sem ter dado",
          paragrafos: [
            "A pior forma de fazer networking é aparecer na vida de alguém só quando você precisa. Você fica 2 anos sem falar com uma pessoa, aí manda mensagem 'oi, tudo bem? Preciso de uma dica'. Isso é usar. E as pessoas percebem — mesmo que respondam educadamente.",
            "A regra de ouro: dê antes de pedir. Sempre. Um artigo relevante, uma indicação de vaga (mesmo que não seja pra ela), uma congratulação sincera por uma conquista. Pequenos gestos, mas consistentes ao longo dos anos. Quando você precisar, ela vai lembrar de tudo que você deu.",
          ],
          citacao: {
            texto: "Cultive a rede quando não precisa dela. Assim ela estará lá quando você precisar.",
            autor: "Keith Ferrazzi, autor de 'Never Eat Alone'",
          },
        },
        {
          titulo: "As reuniões que valem ouro",
          paragrafos: [
            "Café. Almoço. Zoom rápido. Não pra 'trocar figurinhas' — mas pra realmente entender o outro. O que ela está trabalhando agora? Do que ela precisa? Como você pode ajudar? Você sai desses encontros com uma coisa concreta pra fazer pela pessoa. E na próxima vez, ela vai lembrar.",
            "Faça pelo menos uma dessas por mês. Não com o mesmo círculo — com pessoas de fora do seu ambiente imediato. É de fora que vêm as melhores oportunidades. Seu chefe atual só pode te levar até certo ponto. Os desconhecidos-que-vão-virar-conhecidos abrem portas maiores.",
          ],
          lista: {
            titulo: "Como cuidar da sua rede sem ser artificial",
            itens: [
              "Uma mensagem por mês pra cinco pessoas diferentes — só perguntando como estão",
              "Um café por mês com alguém que você admira mas ainda não conhece de perto",
              "Um post no LinkedIn por mês parabenizando alguém publicamente pela conquista",
              "Uma indicação de vaga ou oportunidade por mês pra alguém que você conhece",
              "Nas festas de fim de ano, mande mensagem individual pras 15 pessoas mais próximas",
            ],
          },
        },
        {
          titulo: "Mentores: o atalho invisível",
          paragrafos: [
            "Ter mentor é a diferença entre aprender por conta e aprender por atalho. Pessoas que já passaram pelo caminho que você quer trilhar podem te poupar anos de erros. E, curiosamente, elas geralmente aceitam mentorar — porque no fundo, todos gostam de contribuir e passar aprendizado.",
            "Como pedir mentoria sem parecer intrusivo: identifique 3 pessoas 10 a 15 anos à sua frente na carreira. Peça uma conversa específica de 30 minutos sobre um tema específico. Não peça 'mentoria' abstrata — peça conselho sobre uma questão real. Se a conversa for boa, peça pra voltar. Aos poucos vira uma relação de mentoria natural.",
          ],
          exercicio: {
            titulo: "O mapa da rede real",
            passos: [
              "Faça uma lista das 15 pessoas mais valiosas da sua rede profissional.",
              "Marque a última vez que você teve contato significativo com cada uma. Não 'curti um post' — conversa.",
              "Identifique as 5 que você não fala há mais de 6 meses.",
              "Nesta semana, mande mensagem pra cada uma dessas 5 — sem pedir nada. Só perguntando como estão e oferecendo algo (indicação, artigo, ajuda).",
              "Programe reencontros quando fizer sentido. Faça isso todo mês.",
            ],
          },
        },
      ],
      resumo: [
        "Sua rede real são 150 pessoas — não 3.000. Cuide dessas.",
        "Dê antes de pedir. Sempre. Networking é reciprocidade acumulada.",
        "Uma reunião presencial por mês com alguém fora do seu círculo vale mais que 100 conexões online.",
        "Mentores encurtam anos de aprendizado. Peça conselho específico, não 'mentoria' abstrata.",
      ],
    },
    {
      numero: 4,
      titulo: "Negociar como quem entende do jogo",
      subtitulo: "Salário, promoção, condições — pedir do jeito certo faz diferença de anos",
      epigrafe: {
        texto: "Você não ganha o que merece. Você ganha o que negocia.",
      },
      secoes: [
        {
          paragrafos: [
            "Um estudo clássico da Universidade Carnegie Mellon acompanhou pessoas por 30 anos e mostrou que aqueles que negociam o primeiro salário terminam a carreira ganhando entre 500 mil e 1 milhão de dólares a mais que aqueles que aceitam a oferta inicial. Um milhão de dólares. Por causa de uma conversa de 15 minutos no início.",
            "E não é só sobre salário inicial. É sobre cada revisão, cada promoção, cada mudança de emprego. Quem sabe negociar cria uma inclinação diferente na curva de renda ao longo do tempo. Quem não sabe, aceita o que é oferecido e paga o preço em silêncio, ao longo de décadas.",
          ],
          estatistica: {
            numero: "US$ 1M",
            texto: "é a diferença acumulada, ao longo de 30 anos, entre quem negocia o primeiro salário e quem aceita a oferta inicial — por causa de uma conversa de 15 minutos.",
          },
        },
        {
          titulo: "O princípio do BATNA",
          paragrafos: [
            "BATNA é sigla em inglês pra Best Alternative To a Negotiated Agreement — a melhor alternativa que você tem caso a negociação não dê certo. É o conceito central de qualquer negociação, e ainda assim quase ninguém usa.",
            "Antes de negociar, você precisa saber: se a proposta que estou pedindo for negada, qual é minha alternativa real? Continuo no emprego atual? Tenho outra proposta na manga? Aceito ficar sem trabalho por 2 meses? A qualidade do seu BATNA determina o quanto você pode pressionar. Quem chega numa negociação sem alternativa, negocia fraco. Quem tem alternativa, negocia forte.",
          ],
          destaque:
            "Nunca vá a uma negociação sem pelo menos entender qual sua alternativa. Melhor ainda: chegue com duas alternativas viáveis. Isso muda toda a dinâmica da conversa.",
        },
        {
          titulo: "Ancorar primeiro, ancorar alto",
          paragrafos: [
            "Estudos de negociação mostram consistentemente que quem faz a primeira proposta define a âncora psicológica de toda a conversa. Se a empresa pergunta 'quanto você quer?', responder com um número alto (mas defensável) puxa toda a negociação pra cima. Responder 'quanto vocês pagam?' e esperar a oferta te coloca em desvantagem.",
            "Como definir seu número: pesquise faixa salarial do cargo pelo mercado. Some 20% no topo. Peça esse número inicial. Dê espaço pra negociação descer um pouco — mas mesmo o descer vai deixar você acima do que teria aceito se não tivesse ancorado alto.",
          ],
          lista: {
            titulo: "Como pesquisar salário certo",
            itens: [
              "Sites como Glassdoor, Salario.com.br e Vagas.com dão faixa de mercado",
              "Perguntar a 3-4 pessoas do mesmo cargo em outras empresas",
              "Buscar no LinkedIn empresas parecidas e ver histórico de anúncios com salários",
              "Falar com recrutadores especializados na sua área — eles têm dados internos",
              "Considerar cidade, tamanho de empresa e escopo do cargo (não é comparação direta)",
            ],
          },
        },
        {
          titulo: "A moeda invisível",
          paragrafos: [
            "Salário é só uma das dimensões. Existem muitas outras coisas negociáveis, e às vezes elas somam mais que o próprio salário: bônus, participação em resultados, dias de férias adicionais, home office, orçamento pra cursos, plano de saúde estendido, título mais sênior, escopo maior de responsabilidade.",
            "Quando a empresa diz 'não tenho como dar o que você tá pedindo', muitas vezes é verdade — mas ainda há espaço pra melhorar outras dimensões. 'Ok, entendo. E se ao invés disso, vocês pudessem me dar X dias de home office ou Y de orçamento pra formação?' Você raramente sai com nada. Sai com algo diferente do que pediu, mas que somado tem valor equivalente.",
          ],
          citacao: {
            texto: "Numa boa negociação, os dois lados saem melhores do que entraram. Não é vitória sobre o outro — é criação de valor conjunto.",
            autor: "Roger Fisher, autor de 'Getting to Yes'",
          },
        },
        {
          titulo: "Pedir promoção: o método",
          paragrafos: [
            "Promoção não vem pedindo em revisão anual — vem construída ao longo do ano. O erro clássico é esperar a conversa formal pra pedir. Nessa hora, seu chefe já tem os budgets fechados, os cargos definidos e as prioridades organizadas. Sua pedida chega tarde.",
            "O método certo é conversar antes. Uns 4 meses antes da revisão, marque uma conversa: 'Chefe, eu quero crescer na empresa. Quero uma promoção nos próximos 6 meses. O que preciso demonstrar pra isso acontecer?'. Isso faz três coisas: sinaliza sua ambição, força ele a articular o que ele espera, e dá tempo pra você entregar antes da revisão. Quando chegar a data formal, o caso já está feito.",
          ],
          exercicio: {
            titulo: "Preparação de negociação em 5 passos",
            passos: [
              "Defina o número ou condição que você quer. Seja específico.",
              "Pesquise 3 fontes de referência de mercado pra fundamentar.",
              "Liste 5 resultados concretos seus dos últimos 12 meses — números, impactos, projetos.",
              "Identifique seu BATNA: o que você faz se não conseguir? Seja honesto consigo mesmo.",
              "Ensaie a conversa em voz alta. Antecipe 3 objeções possíveis e prepare sua resposta.",
            ],
          },
        },
      ],
      resumo: [
        "Quem negocia bem termina a carreira com centenas de milhares a mais — literalmente.",
        "Sempre conheça seu BATNA antes de negociar. Alternativa dá poder.",
        "Ancore primeiro, ancore alto. Quem propõe primeiro define a régua.",
        "Não é só salário. Muita coisa é negociável — e às vezes vale mais.",
      ],
    },
    {
      numero: 5,
      titulo: "Reinventar antes de ter que",
      subtitulo: "Toda carreira longa passa por várias mudanças — a arte é fazer antes do mercado te forçar",
      epigrafe: {
        texto: "Não é o mais forte nem o mais inteligente que sobrevive. É o que se adapta melhor à mudança.",
        autor: "Charles Darwin",
      },
      secoes: [
        {
          paragrafos: [
            "Existe uma ilusão comum na carreira: a de que uma vez que você atinge o cargo desejado, você chegou. É mentira. Toda carreira longa passa por várias reinvenções — algumas por escolha, outras por necessidade. Quem se prepara antes escolhe. Quem não se prepara, é escolhido pelo mercado.",
            "Tecnologia acelera obsolescência. Profissões inteiras somem em uma década. Cargos que existiam há 10 anos não existem mais. E cargos que dominarão os próximos 10 anos ainda estão sendo criados. Sua principal defesa é a capacidade de aprender e reinventar, não a especialização em um único ofício.",
          ],
        },
        {
          titulo: "Sinais que sua carreira precisa de reinvenção",
          paragrafos: [
            "Alguns sinais claros: você não aprende algo novo há mais de um ano. Você não sente entusiasmo em falar do que faz. Você acompanha eventos da sua área e sente que ficou pra trás. Seus colegas mais novos sabem coisas que você não sabe. Seu salário está estagnado há mais de 2 anos, mesmo em ambiente inflacionário. O que você faz está sendo automatizado ou terceirizado no mercado.",
            "Nenhum desses sinais isolado é motivo pra crise. Mas se três ou mais aparecem juntos, é hora de agir. Antes que a decisão seja tomada por você.",
          ],
          lista: {
            titulo: "Sinais de que você precisa se reinventar",
            itens: [
              "Você não aprende algo novo há mais de um ano",
              "Sua área está sendo automatizada rapidamente",
              "Seu salário estagnou por mais de 2 anos",
              "Você fica horas online sem produzir nada relevante",
              "Colegas mais novos superam você em habilidades básicas do setor",
              "Você não fala do trabalho com entusiasmo há tempos",
            ],
          },
        },
        {
          titulo: "O método da reinvenção lateral",
          paragrafos: [
            "Grande erro: mudar de carreira do zero. Sair de contador pra chef aos 40 anos é possível, mas é caro. Perde-se anos de acúmulo. O método mais eficiente é a reinvenção lateral: aproveitar 70% do que você já sabe e agregar 30% de habilidade nova pra chegar a um cargo diferente.",
            "Exemplo: contador que aprende análise de dados vira analista financeiro sênior. Vendedor que aprende gestão vira gerente comercial. Jornalista que aprende SEO e conteúdo digital vira gestor de mídia. A ponte usa a base que você já tem — só adiciona a peça que falta.",
          ],
          destaque:
            "Sua próxima carreira quase nunca é totalmente nova. É a que combina 70% do que você já sabe com 30% do que você ainda vai aprender. Encontrar essa combinação é o coração da reinvenção estratégica.",
        },
        {
          titulo: "Aprender rápido, aprender sozinho",
          paragrafos: [
            "Hoje você pode aprender qualquer coisa por conta. Cursos online de alta qualidade custam menos que um jantar. YouTube tem conteúdo profissional grátis. Comunidades online conectam você com especialistas em qualquer nicho. A única coisa que separa quem sabe de quem não sabe é dedicação.",
            "Reserve pelo menos 5 horas por semana pro seu desenvolvimento — fora do horário de trabalho. Isso é 260 horas por ano. Em 3 anos, são quase 800 horas de estudo focado. Isso é mais que muitas graduações. E o retorno é gigante: você vira uma referência no seu campo, ou pivota pra um campo adjacente sem precisar sair do jogo.",
          ],
          citacao: {
            texto: "A pessoa que dedica uma hora por dia a aprender algo relevante vai, em 5 anos, superar 95% dos seus pares.",
          },
        },
        {
          titulo: "Preparar antes de precisar",
          paragrafos: [
            "A melhor hora pra procurar emprego é quando você não precisa. A melhor hora pra aprender uma habilidade nova é quando o mercado ainda não exige. A melhor hora pra construir rede em uma nova área é quando você ainda não pensa em migrar. Pareceria contraintuitivo — por que investir em algo que você não vai usar amanhã?",
            "Porque quando você precisar, será tarde. Você vai estar desesperado, sem tempo, sem escolha. Investir na próxima carreira enquanto ainda está confortável na atual é o hedge mais poderoso que existe. Você mantém a receita atual e constrói a próxima em paralelo. Quando o momento certo chegar, você já está preparado.",
          ],
          exercicio: {
            titulo: "Plano de reinvenção em 24 meses",
            passos: [
              "Identifique 3 áreas ou funções que interessam pra seus próximos 5 anos.",
              "Pesquise: quais habilidades específicas essas funções exigem?",
              "Encontre a área com maior sobreposição com o que você já faz.",
              "Escolha 1 habilidade central pra desenvolver nesses 24 meses.",
              "Reserve 5 horas semanais pra desenvolvê-la. Curso online, prática, projetos.",
              "Ao fim de 24 meses, você é um profissional válido pra essa nova função — ainda com base sólida na atual.",
            ],
          },
        },
      ],
      resumo: [
        "Toda carreira longa passa por várias reinvenções. Faça antes de ser forçado.",
        "Sinais claros: sem aprendizado novo, salário estagnado, sem entusiasmo — é hora de agir.",
        "Reinvenção lateral: aproveite 70% do que já sabe, adicione 30% de novo.",
        "Aprenda 5 horas por semana. Em 3 anos, você já é outra pessoa profissionalmente.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Cinco capítulos depois, você tem em mãos as habilidades centrais de quem gerencia a carreira de forma estratégica. Auto-conhecimento aplicado, reputação construída, rede real, negociação e reinvenção. Não é motivacional. É prático. É aplicável na segunda-feira de manhã.",
      "A diferença entre carreira média e carreira excepcional raramente é talento. É a soma de pequenas decisões conscientes tomadas ao longo de anos. Quem lê sobre isso e não aplica, fica onde tá. Quem aplica, muda de vagão.",
      "Comece com uma coisa. Uma só. Se você acabou de ler o capítulo 1, faça o mapa dos três círculos essa semana. Se identifica no capítulo 4, comece a preparar sua próxima negociação hoje. Aplicação vale mais que consumo de conteúdo.",
    ],
    proximosPassos: [
      "Nesta semana: faça o mapa dos três círculos e identifique onde está seu ouro.",
      "Neste mês: contate 5 pessoas da sua rede real. Ofereça valor antes de pedir.",
      "Nos próximos 3 meses: prepare sua próxima negociação — salário, promoção ou novo cargo.",
      "Nos próximos 24 meses: escolha uma habilidade de reinvenção e desenvolva 5 horas/semana.",
    ],
  },
  posfacio: [
    "Sua carreira é você quem gerencia. Não o RH, não seu chefe, não o mercado.",
    "Estratégia bate esforço. Consistência bate talento. Comece pequeno, mas comece hoje.",
  ],
};

// ============================================================
// CULINÁRIA
// ============================================================
export const LIVRO_CULINARIA: LivroConteudo = {
  nichoId: "culinaria",
  titulo: "A Cozinha Que Encanta",
  subtitulo: "Do básico bem feito ao prato que ninguém esquece",
  dedicatoria:
    "Para quem alimenta os outros —\ndas cozinhas simples às grandes brigadas.\nCozinhar é servir. Servir é amar.",
  introducao: {
    paragrafos: [
      "Cozinhar não é receita. É método. É por isso que duas pessoas com a mesma receita chegam a pratos completamente diferentes. Uma pessoa segue os passos e acerta. A outra segue os mesmos passos e o prato sai sem alma, sem sal certo, sem ponto adequado. A diferença não está na receita. Está na compreensão do que está acontecendo enquanto se cozinha.",
      "Este livro não é uma coleção de receitas — dessas você tem milhares na internet, de graça. Este livro é sobre os princípios que fazem qualquer receita funcionar. Sobre entender por que sal antes ou depois, por que fogo alto ou baixo, por que descansar carne, por que reduzir molho, por que salgar água de macarrão. Se você entende os porquês, você deixa de ser executor de receita e vira cozinheiro.",
      "E cozinheiro é uma coisa poderosa. É quem alimenta, quem cuida, quem cria memória. A comida boa é o ponto de encontro mais universal que existe — em qualquer cultura, em qualquer tempo. Um prato bem feito não é só nutrição. É afeto material. É presença tangível. É a forma mais concreta de dizer 'estou aqui pra você'.",
      "Você vai encontrar cinco capítulos densos. Os fundamentos que separam cozinha caseira de cozinha excepcional. As técnicas base que uma vez dominadas abrem 500 pratos diferentes. Os erros comuns que arruinam a maioria dos pratos e como evitá-los. E, no final, como planejar cardápios pra dias diferentes — do almoço rápido ao jantar que vai virar memória.",
    ],
    promessa:
      "Ao fim deste livro, você não vai apenas cozinhar melhor. Vai entender por que cozinha assim. E daí em diante, qualquer receita vira executável pra você — porque você domina os fundamentos.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "O sal, o fogo, o tempo",
      subtitulo: "Os três pilares que sustentam qualquer prato",
      epigrafe: {
        texto: "Sal, fogo e tempo. Domine essas três coisas e qualquer receita se rende a você.",
        autor: "Samin Nosrat, autora de 'Sal, Gordura, Ácido e Calor'",
      },
      secoes: [
        {
          paragrafos: [
            "Existe uma ilusão de que boa cozinha depende de ingredientes caros ou técnicas exóticas. Não depende. A cozinha francesa que revolucionou o mundo se ergue sobre três variáveis: sal, gordura, ácido e calor. Uma cozinheira italiana da roça faz maravilhas com farinha, ovo, tomate e manjericão. O segredo não está no que você tem — está em como você usa o mínimo.",
            "Este capítulo trata do que Samin Nosrat, chef e escritora que popularizou esse pensamento, chamou de 'a base'. Os elementos que estão em todo prato bom, mesmo os simples. Se você entender esses três — sal, fogo, tempo — e como eles interagem, a cozinha para de ser aleatória.",
          ],
        },
        {
          titulo: "O sal: mais do que tempero",
          paragrafos: [
            "Sal não é opcional. Sal é o realçador universal do sabor. Ele existe em toda cozinha do mundo, em todas as culturas, em toda tradição culinária. E ainda assim, a maior parte das pessoas o usa mal — pouco, tarde ou no momento errado.",
            "A regra de ouro: sal salga em camadas. Sal cedo. Sal durante. Sal no fim. Cada momento tem função diferente. Sal cedo (antes de cozinhar) penetra fundo — usado em carnes, ovos e legumes densos. Sal durante temperar o próprio cozimento — em molhos, caldos, cozidos. Sal no fim ajusta e realça — pra pratos finais e pra sabor imediato no paladar.",
            "Como saber quanto: prove. Sempre prove. Salgar 'de olho' é o erro mais comum. Prove antes de servir, ajuste se preciso. E prefira sal grosso ou marinho, que tem sabor mais rico e permite melhor controle. Sal refinado é intenso demais e sala demais rápido.",
          ],
          lista: {
            titulo: "Como salgar cada tipo de comida",
            itens: [
              "Carne vermelha: sal grosso 40 minutos antes de grelhar (penetra e forma crosta boa)",
              "Frango: sal 1 hora antes ou 24 horas antes (dry brine — resultado tenro e suculento)",
              "Legumes cozidos: água muito salgada como do mar — 15g de sal por litro",
              "Massa: água muito salgada — 10g por litro é o mínimo",
              "Ovo: sal apenas depois de cozido, senão fica borrachudo",
              "Peixe: sal 15-20 minutos antes, tirar o excesso antes de cozinhar",
            ],
          },
          estatistica: {
            numero: "80%",
            texto: "das pessoas usa sal de menos. Chefs profissionais salgam mais que cozinheiros caseiros — por isso a comida deles parece 'ter mais sabor'.",
          },
        },
        {
          titulo: "O fogo: alto quando queima, baixo quando cozinha",
          paragrafos: [
            "Fogo alto é pra quando você quer que a superfície doure sem que o interior cozinhe. Bife na frigideira. Peixe crocante por fora. Legume de wok. Nesses casos, se o fogo estiver baixo, a comida vai cozinhar em vez de dourar — libera água, fica murcha, sem crosta.",
            "Fogo baixo é pra quando você quer que o interior cozinhe sem que a superfície queime. Molhos que reduzem. Carnes de longa cocção. Cebola caramelizada. Nesses casos, fogo alto queima o exterior antes que o interior chegue no ponto.",
            "A maior parte da comida caseira é feita com fogo médio — que é a pior escolha em 80% dos casos. Ou você quer dourar (então alto) ou você quer cozinhar (então baixo). Médio é indefinição.",
          ],
          destaque:
            "Quando dourar não fica dourando — o fogo está baixo. Quando o exterior queimou mas o interior está cru — o fogo está alto pro tipo de prato. Aprenda a ler a chama.",
        },
        {
          titulo: "O tempo: o segredo do descanso",
          paragrafos: [
            "Muita cozinha caseira é apressada. E muita coisa boa acontece por espera. Uma carne que descansa 5 minutos depois de sair do fogo mantém 40% mais suco. Uma massa que descansa em geladeira por 30 minutos fica mais macia. Um molho que reduz por 20 minutos concentra o sabor de forma que ferver rápido nunca alcança.",
            "Tempo também é fermentação. Um pão que fermenta 24 horas é infinitamente melhor que um que fermenta 1 hora. Um vinho que descansa 5 anos é outra coisa comparado ao que sai jovem. Aprenda a esperar — a comida faz sozinha o que a pressa impede.",
          ],
          citacao: {
            texto: "A pressa é a inimiga silenciosa da boa cozinha. O bom cozinheiro é aquele que sabe esperar.",
          },
        },
        {
          titulo: "A gordura e o ácido",
          paragrafos: [
            "Além dos três pilares, dois coadjuvantes essenciais: gordura e ácido. Gordura carrega sabor — é por isso que manteiga, azeite e óleo dão profundidade ao prato. Ácido corta gordura e realça sabor — é por isso que limão em cima do bife, vinagre em cima da salada, ou vinho tinto no molho de tomate faz cada componente brilhar.",
            "Quase todo prato bom tem os três: sal (que abre o paladar), gordura (que carrega e envolve), ácido (que corta e refresca). Faltando um, o prato fica sem equilíbrio. Se você achou o prato meio 'sem graça', quase sempre é falta de ácido. Uma gotinha de limão ou vinagre transforma.",
          ],
          exercicio: {
            titulo: "O experimento do sal",
            passos: [
              "Cozinhe duas batatas iguais. Uma sem sal, uma com bastante sal na água (15g por litro).",
              "Prove ambas depois. Note como a segunda tem sabor de batata — e a primeira parece sem alma.",
              "Repita com massa. Sem sal na água, com sal na água.",
              "Você vai perceber que sal não é opcional. É o que faz o sabor da comida aparecer.",
              "A partir daí, revise todas as suas receitas: você tá salgando o suficiente?",
            ],
          },
        },
      ],
      resumo: [
        "Sal, fogo e tempo são os três pilares de qualquer prato bom.",
        "Sal em camadas: cedo, durante, no fim. Sempre prove antes de servir.",
        "Fogo alto pra dourar, fogo baixo pra cozinhar. Médio quase nunca é a resposta.",
        "Descansar carnes, reduzir molhos, fermentar massas: o tempo faz sozinho o que a pressa impede.",
      ],
    },
    {
      numero: 2,
      titulo: "As técnicas base",
      subtitulo: "Domine cinco, cozinhe centenas de pratos",
      epigrafe: {
        texto: "Um bom cozinheiro não sabe mil receitas — sabe as dez técnicas que abrem essas mil.",
      },
      secoes: [
        {
          paragrafos: [
            "Culinária profissional se organiza em torno de técnicas, não de receitas. Chefs em escolas culinárias estudam sautéing, braising, roasting, poaching e sear como se fossem matérias separadas. Cada técnica abre um universo de pratos. Dominando cinco delas, você faz 300 pratos diferentes com pequena variação de ingrediente e tempero.",
            "Este capítulo é o mais prático do livro. Cinco técnicas, cinco métodos, e a explicação do por que cada uma funciona. Domine todas e você não precisa mais de receita pra improvisar bem.",
          ],
        },
        {
          titulo: "Salteado (sauté)",
          paragrafos: [
            "Frigideira alta, gordura fina, comida em pedaços pequenos, movimento constante. Sauté é pra comida que cozinha rápido e precisa manter textura e cor. Vegetais firmes, camarão, tirinhas de carne. Não superlote a frigideira — se colocar comida demais, a temperatura cai, e a água sai. Vira cozimento, não salteado.",
            "Regra: nunca cobrir mais da metade da frigideira. Cozinhe em lotes se preciso. Aqueça a gordura antes de colocar a comida — teste com uma gotinha d'água: se chia forte, tá pronta. Se sisar fraco, tá fria.",
          ],
          lista: {
            titulo: "Pratos que se abrem com salteado",
            itens: [
              "Legumes salteados (brócolis, aspargos, abobrinha, cogumelos)",
              "Camarão salteado ao alho e limão",
              "Tirinhas de frango ou carne pra prato pronto rápido",
              "Vegetais pra risoto ou massa",
              "Frutos do mar pra paella ou arroz",
            ],
          },
        },
        {
          titulo: "Selar / grelhar / dourar",
          paragrafos: [
            "Fogo alto, gordura pouca, comida seca. Selar é criar aquela crosta escura, dourada, cheia de sabor. É a reação de Maillard — a mesma que dá sabor a bife, pão, café e chocolate torrado. É a técnica que separa 'cozido' de 'saboroso'.",
            "Regra crucial: comida molhada não sela. Se a superfície tá úmida, o calor primeiro tem que evaporar essa água — e enquanto isso, você cozinha em vez de dourar. Seque bem a carne com papel-toalha antes. Chegue ela em temperatura ambiente (uns 20 minutos fora da geladeira). E não mexa nos primeiros 3-4 minutos, deixe a crosta formar.",
          ],
          destaque:
            "Se você mexer a carne o tempo todo, ela nunca sela. A crosta escura de bife bem grelhado é resultado de paciência: coloca, espera, vira uma só vez.",
        },
        {
          titulo: "Cozimento em líquido: refogar, brasear, cozinhar",
          paragrafos: [
            "Comida imersa em líquido, fogo baixo por tempo longo. É como se fazem cozidos, guisados, molhos, ensopados. O ingrediente vai amolecendo enquanto absorve sabor do líquido. Quanto mais tempo, mais macio e saboroso.",
            "A base é sempre a mesma. Dourar a carne primeiro (pra ganhar sabor da crosta). Refogar cebola, alho e outros aromáticos. Adicionar líquido (vinho, caldo, água). Deixar cozinhar em fogo baixo por 1 a 3 horas. É a técnica pra cortes duros — músculo, paleta, coxa — que só ficam macios com tempo longo.",
          ],
          citacao: {
            texto: "Tempo é o ingrediente mais barato e o mais transformador da cozinha.",
          },
        },
        {
          titulo: "Assar / rostir",
          paragrafos: [
            "Forno alto, comida seca, gordura de fora, tempo controlado. Assar é a técnica que combina secar por fora e cozinhar por dentro. Ideal pra pedaços grandes de carne, aves inteiras, legumes que ficam bons crocantes por fora.",
            "Regra do forno: preaquecer sempre. 220°C é padrão pra a maioria dos legumes e aves. Se colocar comida em forno frio, ela cozinha antes de dourar. E use fôrma rasa — se for funda, os vapores ficam presos e cozem no lugar de assar.",
          ],
          lista: {
            titulo: "Regras pra assar melhor",
            itens: [
              "Forno preaquecido a 220°C na maioria dos casos",
              "Legumes cortados em tamanhos iguais (senão uns queimam, outros ficam crus)",
              "Sal, azeite, sem apinhar a assadeira (se apinhar, cozinha em vez de assar)",
              "Frango inteiro: 45min a 1h em 200°C, dependendo do tamanho",
              "Deixe descansar 5-10 minutos depois de sair do forno",
            ],
          },
        },
        {
          titulo: "Cozinhar em água (poach) e vapor",
          paragrafos: [
            "Cozimento gentil em água quente ou vapor, ideal pra ingredientes delicados. Poaching é imerso em água ligeiramente abaixo da fervura (uns 70-80°C). Ovos, peixes, aves finas ficam macios e nunca ressecam. Vapor é acima da água fervente, com a comida sem contato direto. Ideal pra legumes que devem preservar cor e nutrientes.",
            "Erro comum: colocar tudo em água fervente forte. A fervura violenta desmancha peixes, endurece ovos, deixa legumes borrachudos. Use água quente, quase parada — é onde a delicadeza aparece.",
          ],
          exercicio: {
            titulo: "A semana das cinco técnicas",
            passos: [
              "Segunda-feira: salteie um vegetal (brócolis, aspargo ou cogumelo).",
              "Terça-feira: sele um bife ou peito de frango com crosta bem dourada.",
              "Quarta-feira: faça um cozido (galinha, ossobuco, ou carne de panela) por pelo menos 2 horas.",
              "Quinta-feira: asse um frango inteiro ou legumes no forno a 220°C.",
              "Sexta-feira: prepare um ovo poché ou um peixe pochê (imerso em água quente sem fervura).",
              "Ao fim da semana, você experimentou as cinco técnicas base. Continue a repeti-las até virarem intuitivas.",
            ],
          },
        },
      ],
      resumo: [
        "Cinco técnicas abrem 300 pratos: sauté, sear, cozimento em líquido, assar e pocher.",
        "Comida molhada não sela. Seque a carne antes de ir na frigideira.",
        "Assar precisa forno preaquecido e assadeira rasa — senão cozinha em vez de dourar.",
        "Fervura violenta destrói ingredientes delicados. Água quente parada é o segredo do poché.",
      ],
    },
    {
      numero: 3,
      titulo: "Os erros que arruínam a maioria dos pratos",
      subtitulo: "E como corrigi-los antes de servir",
      epigrafe: {
        texto: "Todo cozinheiro erra. O bom aprende a corrigir antes de servir.",
      },
      secoes: [
        {
          paragrafos: [
            "Prato salgado demais. Molho fino demais. Carne dura. Legume papando. Massa colada. Esses são os erros mais comuns da cozinha caseira — e todos eles têm correção, se você agir rápido. A boa notícia: quase nunca você precisa jogar comida fora. A má: se você ignorar o erro e seguir em frente, ele se cristaliza.",
            "Este capítulo é o mais útil pra quem cozinha no dia a dia. É um manual de emergência culinária. Guarde-o na memória — ele vai te salvar dezenas de pratos.",
          ],
        },
        {
          titulo: "Salgou demais? Não jogue fora",
          paragrafos: [
            "É o erro mais comum. E a maior parte das pessoas joga a comida fora. Não jogue. Há três técnicas que resolvem quase sempre.",
            "Adicionar volume: aumente o líquido (água, caldo) ou adicione mais dos ingredientes principais. Cozido salgado? Adicione mais legumes e água. Molho salgado? Adicione mais tomate ou creme. Isso dilui o sal.",
            "Adicionar ácido: um pouco de vinagre, limão ou vinho tinto neutraliza a sensação de salgado. É contra-intuitivo mas funciona — o ácido 'corta' o sal no paladar.",
            "Adicionar gordura ou açúcar: uma colher de manteiga ou creme suaviza o excesso de sal. Uma pitada de açúcar em molhos salgados também neutraliza. Use com moderação.",
          ],
          destaque:
            "Nunca jogue fora um prato salgado demais. Volume, ácido ou gordura resolvem em 90% dos casos.",
        },
        {
          titulo: "Molho fino demais",
          paragrafos: [
            "Um molho que precisava estar cremoso ficou aguado. Duas correções.",
            "Reduzir: continue cozinhando em fogo médio-alto até evaporar parte da água. Isso concentra os sabores e engrossa naturalmente. Leva 10 a 20 minutos, dependendo do volume.",
            "Ligar com espessante: para pressa, misture 1 colher de sopa de amido de milho em 3 colheres de água fria. Adicione ao molho fervente. Fica denso em 1-2 minutos. Ou, pra molhos gordurosos, uma colher de manteiga gelada bate no final: emulsifica e engrossa.",
          ],
          lista: {
            titulo: "Formas de engrossar molho",
            itens: [
              "Redução no fogo médio-alto (mais tempo, sabor mais concentrado)",
              "Amido de milho dissolvido em água fria",
              "Farinha de trigo dissolvida em água (mais para molhos escuros)",
              "Manteiga gelada batida no final (emulsão, molhos ricos)",
              "Creme de leite ou nata (mudam sabor, mas engrossam bem)",
              "Purê de legumes cozidos (batata, abóbora — sabor sutil)",
            ],
          },
        },
        {
          titulo: "Carne dura",
          paragrafos: [
            "Se a carne já saiu do fogo dura, existem só duas saídas: continuar cozinhando por mais tempo (se for corte duro tipo paleta, músculo — precisa de 2-3 horas em líquido pra amaciar) ou fatiar bem fino contra as fibras (se for corte magro tipo alcatra que passou do ponto).",
            "Prevenção é melhor. Cortes duros exigem cocção lenta em líquido. Cortes macios (filé, contra-filé) exigem cocção rápida em fogo alto. Trocar isso é receita pra desastre — filé cozido por 2 horas fica seco e duro; paleta grelhada rápido fica intragável.",
          ],
          estatistica: {
            numero: "3h",
            texto: "é o tempo médio pra cortes de carne duros ficarem macios em cozimento lento. Menos que isso, sai duro. Mais que isso, cai sozinho no garfo.",
          },
        },
        {
          titulo: "Legume borrachudo, massa colada",
          paragrafos: [
            "Legume borrachudo: cozinhou demais. Solução paliativa: passe rapidamente em água muito gelada pra parar o cozimento. Mas se já passou muito, aproveite pra fazer purê ou creme. Ou refogue com bastante azeite e sal, que mascara a textura.",
            "Massa colada: água pouca. Regra: 1 litro de água pra cada 100g de massa. E sal na água (15g por litro). E não coloque óleo na água — óleo cria filme na massa que impede o molho de aderir depois. Se ficou colada mesmo assim, jogue água fervente por cima no escorredor e mexa.",
          ],
        },
        {
          titulo: "Pratos sem graça: falta um dos três",
          paragrafos: [
            "Se o prato ficou 'sem graça', quase sempre é falta de um dos três: sal, gordura ou ácido. Prove com atenção. Ta sem sal? Salgue mais. Ta sem estrutura de sabor? Adicione manteiga ou azeite. Ta com sensação chata na boca? Adicione ácido — limão, vinagre, vinho.",
            "Muita gente sai colocando ervas, especiarias, temperos, quando na verdade falta ajuste dos três básicos. Sempre volte pro básico primeiro. Só depois pense em adicionar complexidade.",
          ],
          exercicio: {
            titulo: "O ajuste em três provas",
            passos: [
              "Depois de terminar qualquer prato, prove antes de servir.",
              "Primeira prova: perguntar 'tá salgado o suficiente?'. Se não, ajuste.",
              "Segunda prova: 'tá com estrutura de sabor?'. Se sem alma, adicione manteiga, azeite ou creme.",
              "Terceira prova: 'tem frescor, tem contraste?'. Se plano, adicione ácido — limão, vinagre.",
              "Só sirva depois das três provas. É a diferença entre prato bom e prato memorável.",
            ],
          },
        },
      ],
      resumo: [
        "Prato salgado se resolve com volume, ácido ou gordura — não jogue fora.",
        "Molho fino: reduza no fogo ou engrosse com amido/manteiga.",
        "Cortes duros exigem cocção lenta em líquido. Cortes macios exigem cocção rápida em fogo alto.",
        "Prato sem graça? Quase sempre falta sal, gordura ou ácido — nunca esqueça os três.",
      ],
    },
    {
      numero: 4,
      titulo: "Sabor em camadas",
      subtitulo: "O que separa cozinha caseira boa de cozinha memorável",
      epigrafe: {
        texto: "Sabor não é adicionado no fim. É construído em camadas, do início ao fim.",
      },
      secoes: [
        {
          paragrafos: [
            "Você já reparou que a comida de restaurante bom parece ter 'mais sabor' que a de casa, mesmo quando os ingredientes são iguais? Não é ilusão. É técnica. Chefs constroem sabor em camadas — não jogam tudo junto e esperam. Cada etapa da preparação adiciona uma dimensão. E o resultado é comida que tem profundidade, complexidade, e permanece na memória.",
            "Este capítulo é sobre como fazer isso. Não requer ingredientes especiais. Requer atenção ao processo. E uma vez aprendido, muda pra sempre a comida que sai da sua cozinha.",
          ],
        },
        {
          titulo: "Camada 1: os aromáticos base",
          paragrafos: [
            "Quase toda cozinha do mundo começa com uma base aromática. Na França é o mirepoix (cebola, cenoura, aipo). Na Itália é o soffritto (cebola, cenoura, aipo, muitas vezes salsão). No Brasil é cebola e alho. No sudeste asiático é gengibre, alho e capim-limão.",
            "Essa base é a fundação. Ela precisa de tempo e paciência. Cebola bem refogada — não crua nem queimada, mas dourada, quase caramelizada, uns 15 a 20 minutos em fogo baixo — libera açúcares e cria a base de doçura que sustenta o prato inteiro. A maior parte da cozinha caseira apressa essa etapa. Não apresse.",
          ],
          destaque:
            "A diferença entre molho de tomate razoável e molho de tomate excepcional é 20 minutos de cebola bem refogada antes de tudo. Só isso.",
        },
        {
          titulo: "Camada 2: o douramento",
          paragrafos: [
            "Depois da base, vem o douramento das proteínas ou ingredientes principais. É onde a reação de Maillard entra. Carne dourada libera sucos que caramelizam no fundo da panela — aquele resíduo escurinho, o 'fond'. Não jogue fora. Ele é ouro puro.",
            "Depois de dourar a carne, retire-a e comece a soltar o fond com um líquido: vinho, caldo, água, cerveja. Raspe o fundo da panela. Essa raspa vira a base de sabor do molho ou caldo do prato. É onde nascem molhos memoráveis.",
          ],
          citacao: {
            texto: "O fond é o pequeno tesouro do fundo da panela. Aprenda a extraí-lo e você virou cozinheiro sério.",
          },
        },
        {
          titulo: "Camada 3: os líquidos e os aromatizantes",
          paragrafos: [
            "Nesta etapa, entram os líquidos que carregam o sabor pro cozimento. Caldo caseiro é infinitamente melhor que cubinho — o cubinho é sal com pimenta e MSG. Se puder fazer seus caldos de sobras de frango, legumes ou carne, use por meses congelados. Um bom caldo transforma qualquer molho.",
            "Também aqui entram ervas robustas — louro, alecrim, tomilho — que precisam de tempo pra soltar aroma. E vinhos, que reduzem e concentram sabor. Um bom vinho na base de um cozido não é luxo — é técnica.",
          ],
          lista: {
            titulo: "Ervas e quando adicionar",
            itens: [
              "Ervas robustas (louro, alecrim, tomilho, salsão): no início ou meio, precisam tempo",
              "Ervas frescas macias (manjericão, salsa, cebolinha, coentro): sempre no final, cru ou quase cru",
              "Cravo, canela, anis-estrelado, pimenta em grão: no meio, tempo pra liberar aromas",
              "Especiarias moídas (páprica, cominho, curry): tostar em gordura antes de adicionar líquido",
              "Sementes (mostarda, cominho, coentro): frite em óleo quente por 30s pra soltar aroma",
            ],
          },
        },
        {
          titulo: "Camada 4: os toques finais",
          paragrafos: [
            "É aqui que muita cozinha caseira falha. O prato tá pronto, tá bom, mas falta o final que arrebata. E o final quase sempre é ácido e frescor. Uma raspa de limão sobre o peixe. Uma folha de manjericão sobre a massa. Um fio de azeite bom sobre o cozido. Vinagre balsâmico sobre o legume assado.",
            "Também entra aqui o crunch. Croutons, castanhas tostadas, farinha panko, cebola crocante. Contraste de textura faz o prato ganhar vida. Pense em cada prato tendo três dimensões: sabor base (do cozimento), sabor final (do ácido e ervas frescas) e textura (do crunch).",
          ],
          estatistica: {
            numero: "3",
            texto: "camadas mínimas para um prato ganhar profundidade: base aromática, cozimento com bom fond, e toque final de frescor. Faltando uma, o prato fica plano.",
          },
        },
        {
          titulo: "Sabor umami: a quinta dimensão",
          paragrafos: [
            "Além dos quatro sabores clássicos (doce, salgado, azedo, amargo), existe o umami — descoberto por cientistas japoneses no início do século 20. É a sensação de 'preenchimento' na boca, aquele sabor rico e complexo dos cogumelos, queijos curados, tomate maduro, molho de soja, ovo, carnes cozidas por muito tempo.",
            "Adicionar umami a um prato é como adicionar dimensão em uma foto. Uma colher de molho de soja em um cozido. Uma casquinha de queijo parmesão no fundo do caldo. Cogumelos secos triturados sobre a carne. Anchovas derretidas no molho de tomate. Tudo isso adiciona umami — e pouca gente sabe usar. Se você começar, sua comida sai de nível caseiro pra nível memorável.",
          ],
          lista: {
            titulo: "Ingredientes ricos em umami",
            itens: [
              "Molho de soja e molho inglês (Worcestershire)",
              "Cogumelos frescos e secos (shitake, porcini)",
              "Queijos duros curados (parmesão, pecorino)",
              "Anchovas — se derretem em qualquer molho quente sem deixar sabor de peixe",
              "Tomates muito maduros ou pasta de tomate concentrada",
              "Miso, missô, e outros fermentados asiáticos",
              "Ovos, especialmente gemas",
              "Alga marinha (kombu, nori)",
            ],
          },
          exercicio: {
            titulo: "Cozinhar em camadas: um jantar",
            passos: [
              "Escolha um prato de longa cocção (cozido, ragu, ossobuco).",
              "Comece com base aromática bem refogada — pelo menos 15 minutos de cebola dourada.",
              "Doure a proteína separada, atenção ao fond que forma no fundo.",
              "Solte o fond com vinho ou caldo, raspando bem.",
              "Adicione tomate, ervas robustas, cozinhe por 1 a 3 horas.",
              "No fim, ajuste sal e adicione ácido — limão ou vinagre — e ervas frescas.",
              "Sirva com um fio de azeite bom e algo crocante em cima (pão torrado, castanha).",
              "Prove antes, durante e no fim. Você acabou de fazer comida em camadas.",
            ],
          },
        },
      ],
      resumo: [
        "Sabor é construído em camadas, não improvisado no final.",
        "Base aromática bem refogada (mirepoix, soffritto, cebola-alho) sustenta o prato inteiro.",
        "O fond — o resíduo escuro do fundo da panela — é ouro. Extraia com líquido.",
        "Umami é a quinta dimensão: cogumelos, queijos, molho de soja, anchovas transformam.",
      ],
    },
    {
      numero: 5,
      titulo: "Cardápios que fazem sentido",
      subtitulo: "Do almoço rápido ao jantar que vira memória — como planejar refeições completas",
      epigrafe: {
        texto: "Um prato é um evento. Uma refeição bem planejada é uma experiência.",
      },
      secoes: [
        {
          paragrafos: [
            "Fazer um prato bom é uma coisa. Compor uma refeição inteira que se equilibra em sabor, textura, cor e ritmo — outra completamente diferente. Chefs pensam refeições, não pratos. Cada elemento conversa com o outro. Contraste de textura, complementaridade de sabor, alternância entre pesado e leve, equilíbrio nutricional.",
            "Este capítulo é sobre planejamento. Como pensar refeições pra diferentes ocasiões. Almoço rápido de dia útil. Jantar de fim de semana. Recepção especial. Cada uma tem regras próprias — e conhecê-las eleva sua cozinha de eficiência culinária a arte hospitaleira.",
          ],
        },
        {
          titulo: "A regra da tríade: proteína, carboidrato, vegetal",
          paragrafos: [
            "A base de qualquer refeição saudável e satisfatória é a tríade: uma fonte de proteína, uma de carboidrato e vegetais em abundância. Isso não é dieta — é senso comum construído sobre milênios de tradição alimentar.",
            "Proteína traz saciedade e estrutura. Carboidrato traz energia e conforto. Vegetal traz frescor, cor e nutrientes. Falta um dos três, a refeição fica desequilibrada — ou pesa demais, ou desilude, ou cansa antes de terminar. A tríade é a fundação. Depois dela, você monta variações infinitas.",
          ],
          lista: {
            titulo: "Combinações rápidas de tríade",
            itens: [
              "Frango grelhado + arroz integral + brócolis salteado",
              "Salmão assado + purê de batata + salada verde",
              "Bife de tira + macarrão com azeite e alho + tomate assado",
              "Ovo mexido + pão bom + salada de rúcula com tomate",
              "Grão-de-bico + arroz basmati + berinjela grelhada (vegetariano)",
              "Feijão preto + arroz + couve refogada (o clássico brasileiro)",
            ],
          },
        },
        {
          titulo: "Contraste é rei",
          paragrafos: [
            "Uma refeição bem planejada tem contrastes claros. Se o prato principal é pesado (cozido, feijoada), o acompanhamento deve ser leve (salada refrescante). Se é cremoso (risoto, purê), precisa de algo crocante ao lado. Se é rico em gordura (carne gorda), precisa de ácido (limão, vinagre, tomate cru).",
            "Sem contraste, a refeição cansa. Muita cozinha caseira serve tudo do mesmo peso: carne, arroz, farofa, mandioca. Fica bom nos primeiros dois garfos e enjoa depois. Adicionar uma salada refrescante ou uma laranja em rodelas ao lado muda a experiência inteira.",
          ],
          destaque:
            "Se sua refeição for pesada, adicione algo fresco. Se for cremosa, adicione algo crocante. Se for rica, adicione algo ácido. Contraste transforma refeição comum em experiência.",
        },
        {
          titulo: "O almoço de segunda-feira",
          paragrafos: [
            "É a refeição mais subestimada. Você tem 20 minutos, energia baixa, fome real. É onde a maioria das pessoas apela pra fast food ou opções sem graça. Não precisa.",
            "Fórmula do almoço rápido: use 3 ingredientes no máximo, protagoniza um deles, complementa com dois. Por exemplo: frango temperado com alho na frigideira (5 min), arroz na panela (feito na noite anterior), salada de tomate com azeite e sal (1 min). Total: 12 minutos de cozinha ativa. Nutritivo, saboroso, e melhor que qualquer marmita.",
          ],
          exercicio: {
            titulo: "A semana planejada",
            passos: [
              "Domingo, dedique 1 hora ao planejamento.",
              "Escolha 3 proteínas pra semana (ex: frango, carne moída, ovos).",
              "Escolha 3 carboidratos (ex: arroz, batata, macarrão).",
              "Compre vegetais frescos pra 5 refeições.",
              "Cozinhe arroz e frango grande no domingo — dividem em 3 dias.",
              "A cada almoço, monte uma tríade com 5 minutos de finalização (salada, molho, tempero final).",
              "Você vai comer bem toda semana, com 90 minutos de cozinha total.",
            ],
          },
        },
        {
          titulo: "O jantar que vira memória",
          paragrafos: [
            "É quando você cozinha pra quem você ama. Tem tempo, tem intenção, quer que a pessoa saia com sensação de cuidado. Aqui, o planejamento é tudo.",
            "Estrutura clássica: entrada leve (uma bruschetta, um creme frio, uma salada), prato principal (proteína + acompanhamento), e sobremesa simples mas caprichada (sorvete com fruta caramelizada, torta pequena, brownie quente). Três atos, cada um pensado. Não precisa ser sofisticado — precisa ser cuidado.",
            "Regras práticas: escolha um prato que você já domina como principal. Não experimente coisa nova em jantar importante — os riscos são altos. Faça a maior parte antes de a pessoa chegar. E sirva com atenção à mesa: uma louça bonita, luz baixa, música baixa. A experiência é 50% comida, 50% ambiente.",
          ],
          citacao: {
            texto: "Ninguém lembra do que comeu num jantar. Todos lembram de como se sentiram.",
          },
        },
        {
          titulo: "Cardápios de estação",
          paragrafos: [
            "Comida boa segue as estações. Não é filosofia — é bom senso. Fruta e legume da estação chegam no ponto certo, com sabor máximo, e por preço menor. Fora de época, você paga mais por qualidade menor.",
            "Verão pede pratos frios, saladas, frutas suculentas, cocção rápida. Inverno pede caldos, cozidos, assados demorados, sopas quentes. Outono e primavera abrem espaço pra transições. Um cardápio bem planejado respeita o ritmo natural — e naturalmente equilibra pesados e leves ao longo do ano.",
          ],
          lista: {
            titulo: "Ingredientes por estação (Brasil)",
            itens: [
              "Verão: tomate, manga, abacaxi, melancia, peixes leves, saladas frias",
              "Outono: abóbora, mandioca, batata-doce, cogumelos, cozidos suaves",
              "Inverno: caldos, sopas, feijão, carnes de cozimento longo, raízes",
              "Primavera: aspargo, morango, ervas frescas, peixes, pratos coloridos",
            ],
          },
        },
      ],
      resumo: [
        "Toda refeição bem pensada tem tríade: proteína, carboidrato e vegetal.",
        "Contraste é rei: pesado com leve, cremoso com crocante, gordo com ácido.",
        "Planejamento de semana economiza tempo e melhora qualidade da alimentação.",
        "Jantar memorável é 50% comida, 50% ambiente. Prepare antes, sirva com cuidado.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Cinco capítulos depois, você tem em mãos os fundamentos que separam quem executa receita de quem cozinha de verdade. Sal, fogo e tempo. Técnicas base. Correção de erros. Camadas de sabor. Composição de refeições. Não é receituário — é entendimento.",
      "Agora vem a parte mais importante: prática. Nenhum livro de cozinha ensina a cozinhar de verdade sem cozinha real, cheiros reais, erros reais. Faça pequenos experimentos toda semana. Prove tudo. Ajuste. Aprenda com cada prato. Em três meses você vai estar cozinhando visivelmente melhor. Em um ano, você vira referência entre seus amigos.",
      "E lembre-se: cozinhar é serviço. Você não cozinha pra si — cozinha pra alguém, mesmo quando esse alguém é você mesmo. Trate cada prato como se fosse um presente. Isso muda a energia da comida.",
    ],
    proximosPassos: [
      "Nesta semana: faça o experimento do sal — cozinhe uma batata com muito sal na água e uma sem.",
      "Neste mês: pratique as cinco técnicas base — uma por dia útil.",
      "Nos próximos 3 meses: aprenda a construir sabor em camadas em cada prato principal.",
      "Ao longo da vida: continue curioso, prove tudo, ajuste sem medo. Cozinha é prática, não talento.",
    ],
  },
  posfacio: [
    "Cozinhar é o gesto mais antigo de cuidado.",
    "Um prato bem feito é um jeito de dizer 'estou aqui pra você'.",
    "Cozinhe com atenção. E alimente com afeto.",
  ],
};

// ============================================================
// ESTUDOS
// ============================================================
export const LIVRO_ESTUDOS: LivroConteudo = {
  nichoId: "estudos",
  titulo: "Aprender de Verdade",
  subtitulo: "O método por trás dos aprovados, dos melhores alunos e das mentes que retêm",
  dedicatoria:
    "Para quem estuda muito e rende pouco —\naqui está a diferença entre esforço e método.",
  introducao: {
    paragrafos: [
      "Se você tá lendo este livro, provavelmente já se viu em uma situação frustrante: estudar horas, sentir que absorveu tudo, e uma semana depois estar quase em branco. Ou pior — chegar na prova e travar em questões cujo assunto você jurava dominar. Essa é a maldição do estudante moderno: muito tempo dedicado, pouca retenção real.",
      "A boa notícia é que ciência cognitiva tem investigado exatamente isso por décadas. Como o cérebro humano aprende. Como retém. Como esquece. E, mais importante, quais técnicas de estudo funcionam de verdade — e quais são intuitivas mas ineficazes. Se você conhece o que funciona, você para de perder tempo com métodos ruins e passa a aprender de forma que dura.",
      "O problema é que quase ninguém ensina isso. Você aprende matéria — mas não como aprender matéria. Sai da escola, entra na faculdade, começa a trabalhar, e nunca teve uma disciplina que abordasse o método por trás do aprendizado. Este livro preenche essa lacuna.",
      "Você vai encontrar quatro capítulos densos. Um sobre como o cérebro aprende — a teoria mínima necessária pra você entender o que os outros capítulos te ensinam. Um sobre as três técnicas comprovadas de retenção: recuperação ativa, repetição espaçada e interleaving. Um sobre concentração e ambiente de estudo. E um sobre como estudar pra prova — o método específico que aprovados usam.",
    ],
    promessa:
      "Se você aplicar as técnicas deste livro pelos próximos 90 dias, seu tempo de estudo se torna mais eficaz. Você reduz horas de estudo e aumenta retenção. É o oposto do que a maioria faz — e é o que separa aprovados de reprovados.",
  },
  capitulos: [
    {
      numero: 1,
      titulo: "Como o cérebro aprende",
      subtitulo: "A ciência mínima que você precisa saber pra estudar melhor",
      epigrafe: {
        texto: "Não é sobre estudar mais. É sobre estudar como o cérebro quer.",
      },
      secoes: [
        {
          paragrafos: [
            "Aprender é biologia. Toda vez que você aprende algo novo, o cérebro cria ou fortalece conexões neurais entre células chamadas sinapses. Quanto mais você usa aquela conexão, mais forte ela fica. Quanto menos, mais fraca — e eventualmente, ela se apaga. Isso é conhecido como plasticidade cerebral. E é a base de tudo o que vem neste livro.",
            "O grande erro do estudo tradicional é assumir que quantidade de tempo importa mais que qualidade de estímulo. Um estudo intensivo, feito da forma certa, pode reter mais em 30 minutos do que 4 horas de leitura passiva. Isso não é boato — é o consenso de décadas de pesquisa em ciência cognitiva.",
          ],
        },
        {
          titulo: "A curva do esquecimento",
          paragrafos: [
            "Em 1885, o psicólogo alemão Hermann Ebbinghaus fez um experimento simples: memorizou listas de palavras sem sentido e testou a si mesmo em intervalos crescentes. Descobriu que, sem revisão, esquecemos cerca de 50% do que aprendemos em 1 hora. Em 24 horas, esquecemos 70%. Em uma semana, 90%.",
            "Isso significa: se você lê algo hoje e não revisa, em uma semana você lembra menos de 10%. É por isso que tanta gente tem sensação de 'estudo pra prova mas esqueço tudo depois'. Não é falta de inteligência. É o funcionamento normal da memória sem reforço.",
            "A boa notícia: cada revisão eficaz reduz drasticamente essa curva. E existem formas específicas de revisar que multiplicam retenção. É disso que os próximos capítulos tratam.",
          ],
          estatistica: {
            numero: "90%",
            texto: "do que você aprende hoje se perde em uma semana — se você não revisar. Com revisão espaçada, essa curva se inverte quase totalmente.",
          },
        },
        {
          titulo: "Duas formas de pensar: focado e difuso",
          paragrafos: [
            "Barbara Oakley, engenheira e neurocientista, popularizou uma distinção importante: pensamento focado versus pensamento difuso. Focado é quando você está concentrado em uma tarefa — resolver um problema, ler atentamente, escrever. Difuso é quando o cérebro fica solto — chuveiro, caminhada, sono. Nesses momentos, o cérebro conecta ideias em segundo plano.",
            "Ambos são necessários. Focado gasta energia mas resolve problemas específicos. Difuso permite ao cérebro digerir e integrar informação. É por isso que muitas ideias vêm no banho. É por isso que dormir depois de estudar ajuda a memorizar. Sem os dois modos, aprendizado fica pela metade.",
          ],
          destaque:
            "Alterne entre focar e desfocar. Estude por 25 a 50 minutos concentrado. Depois desconecte por 15 minutos. Seu cérebro precisa dos dois modos pra realmente aprender.",
        },
        {
          titulo: "Aprendizado é ativo, não passivo",
          paragrafos: [
            "A maior parte do estudo tradicional é passivo. Você lê. Você grifa. Você assiste. Sua atenção está ligada, mas seu cérebro não está sendo desafiado a produzir. E aprendizado só se consolida quando o cérebro produz — quando ele tem que puxar informação, aplicar conceito, resolver problema.",
            "Grifar texto é um dos métodos mais usados e um dos mais ineficazes. Você sente que está estudando. Mas basicamente está apenas passando os olhos pela página. Nada é produzido pelo seu cérebro. E o que não é produzido, não é consolidado.",
            "O que funciona é o oposto: fechar o livro depois de ler, e tentar explicar o que leu em voz alta. Ou fazer exercícios sem consultar o material. Ou escrever, na sua própria letra, os conceitos principais. Isso força o cérebro a produzir — e produção fixa aprendizado.",
          ],
          lista: {
            titulo: "Métodos passivos (mais fracos)",
            itens: [
              "Ler o material várias vezes seguidas",
              "Grifar texto sem produzir depois",
              "Assistir aula em modo passivo",
              "Refazer os mesmos exercícios que já resolveu",
              "Estudar tudo junto em um assunto (blocked practice)",
            ],
          },
          exercicio: {
            titulo: "Teste o poder da produção ativa",
            passos: [
              "Escolha um texto de estudo de 3 páginas de uma matéria sua.",
              "Leia por 15 minutos com máxima atenção. Não grife nem tome nota.",
              "Feche o material. Pegue papel em branco.",
              "Escreva tudo que lembra do texto, em suas próprias palavras. Faça pausa quando travar.",
              "Só depois de tentar, abra o material e compare o que escreveu com o que era.",
              "Você vai sentir que aprendeu muito mais desse jeito do que só relendo. É a prova de que produzir supera consumir.",
            ],
          },
        },
      ],
      resumo: [
        "Aprender é biologia — a plasticidade cerebral cria e fortalece conexões neurais com uso.",
        "A curva do esquecimento é implacável: 90% se perde em uma semana sem revisão eficaz.",
        "Alterne entre pensamento focado e difuso. O cérebro precisa dos dois modos.",
        "Estudo passivo (grifar, reler) é fraco. Estudo ativo (produzir, explicar, aplicar) fixa.",
      ],
    },
    {
      numero: 2,
      titulo: "As três técnicas que funcionam",
      subtitulo: "Recuperação ativa, repetição espaçada e prática entrelaçada",
      epigrafe: {
        texto: "A ciência cognitiva já sabe o que funciona. O problema é que quase ninguém aplica.",
      },
      secoes: [
        {
          paragrafos: [
            "Existem centenas de técnicas de estudo. A grande maioria não tem evidência científica. Algumas são até prejudiciais — dão sensação de progresso sem gerar retenção real. Mas três técnicas, testadas em dezenas de estudos ao longo de décadas, se destacam por eficácia comprovada: recuperação ativa, repetição espaçada e prática entrelaçada.",
            "Se você aprender essas três e as aplicar sistematicamente, seu tempo de estudo vira ouro. Elas exigem esforço maior por sessão — porque produzem desconforto mental. Mas o retorno é assimétrico: você aprende mais em menos tempo, e retém por muito mais tempo.",
          ],
        },
        {
          titulo: "Recuperação ativa: puxar da memória",
          paragrafos: [
            "Recuperação ativa é o ato de tentar recuperar informação da memória sem consultar o material. É o oposto de reler. Você tenta lembrar — e é justamente o esforço de lembrar que consolida a memória. Cada vez que você puxa uma informação de volta pra consciência, aquela conexão neural fica mais forte.",
            "Formas práticas: depois de ler um capítulo, feche o livro e escreva um resumo do que aprendeu. Faça flashcards com pergunta de um lado e resposta do outro — depois teste-se sem consultar. Resolva exercícios sem olhar a solução, mesmo que trave. Explique o assunto em voz alta pra alguém (ou pra parede).",
            "O incômodo é o sinal de que funciona. Quando você tenta lembrar e não consegue, seu cérebro tá trabalhando. Essa dificuldade é o que faz a memória se solidificar. Se estiver fácil, provavelmente você não tá recuperando — tá reconhecendo. E reconhecer não fixa.",
          ],
          estatistica: {
            numero: "50%",
            texto: "de melhoria em retenção quando estudantes usam recuperação ativa em vez de releitura — confirmado por dezenas de estudos em universidades diferentes.",
          },
        },
        {
          titulo: "Repetição espaçada: revisar no momento certo",
          paragrafos: [
            "Repetir o mesmo assunto em intervalos crescentes é uma das descobertas mais poderosas da psicologia da aprendizagem. Você aprende hoje. Revisa amanhã. Revisa em 3 dias. Depois em 7. Depois em 21. Depois em 60. Depois em 180.",
            "A cada revisão, se a informação está fresca demais, você não faz esforço — e o aprendizado não se fortalece. Se está esquecida demais, você não recupera — e você reaprende do zero. Existe um ponto ótimo: quando você tá quase esquecendo. Nesse momento, revisar consolida a memória de forma muito mais eficaz.",
            "Aplicativos como Anki automatizam isso pra você. Você cria flashcards uma vez, e o app decide quando você deve revisar cada card com base na sua performance. É a técnica preferida de estudantes de medicina, línguas e concursos exigentes — porque é o método mais eficiente já descoberto pra reter grande volume de informação por muito tempo.",
          ],
          lista: {
            titulo: "Intervalos recomendados de revisão",
            itens: [
              "Primeira revisão: no mesmo dia, antes de dormir",
              "Segunda revisão: 24 a 48 horas depois",
              "Terceira revisão: 7 dias depois",
              "Quarta revisão: 21 a 30 dias depois",
              "Quinta revisão: 60 a 90 dias depois",
              "Sexta revisão: 180 dias depois (memória de longo prazo consolidada)",
            ],
          },
          destaque:
            "A repetição espaçada é o mais poderoso multiplicador de aprendizado que a ciência conhece. É como juros compostos aplicados à memória.",
        },
        {
          titulo: "Prática entrelaçada: misturar tópicos",
          paragrafos: [
            "A intuição diz: estude um tópico até dominar, depois passe pro próximo. A ciência diz: essa é uma das formas menos eficazes de estudar. Ao contrário — misturar tópicos diferentes na mesma sessão de estudo aumenta drasticamente a retenção de longo prazo.",
            "É chamado de interleaving, ou prática entrelaçada. Se você está estudando matemática, em vez de fazer 20 exercícios do tipo A, faça 5 do tipo A, 5 do tipo B, 5 do tipo C, e depois 5 misturados. O desempenho durante o estudo cai — você erra mais, sente que tá mais difícil. Mas o teste final e a retenção de longo prazo saem muito melhores.",
            "Isso funciona porque o cérebro é forçado a discriminar entre problemas. Ele tem que reconhecer o padrão antes de aplicar a técnica. Isso constrói uma habilidade muito mais robusta do que a repetição cega. É o mesmo motivo por que atletas de alto nível fazem treinos variados, e não sempre o mesmo exercício.",
          ],
          citacao: {
            texto: "Estudar assuntos misturados parece pior. É mais frustrante, os erros aumentam. Mas o resultado no longo prazo é radicalmente melhor. Confie no processo.",
            autor: "Robert Bjork, professor de psicologia da UCLA",
          },
        },
        {
          titulo: "Combinando as três",
          paragrafos: [
            "As três técnicas se potencializam. Você cria flashcards com perguntas (recuperação ativa). Revisa esses flashcards em intervalos crescentes (repetição espaçada). E misture flashcards de assuntos diferentes na mesma sessão (prática entrelaçada). O resultado é um sistema de estudo cientificamente otimizado.",
            "Compare com o estudo tradicional: você lê, grifa, faz resumo em um caderno que nunca revisa, e depois relê antes da prova. Isso é o oposto de tudo o que ciência mostra funcionar. É por isso que tanta gente estuda muito e retém pouco.",
          ],
          exercicio: {
            titulo: "Montar o sistema em 5 passos",
            passos: [
              "Baixe o Anki (grátis) e crie seu primeiro deck.",
              "Para cada assunto que estudar hoje, crie 5 a 10 flashcards com pergunta de um lado, resposta do outro.",
              "Revise os cards ao final do dia de estudo (primeira revisão).",
              "Continue estudando novos assuntos e criando cards — misture cards de assuntos diferentes nas revisões.",
              "Deixe o Anki gerenciar os intervalos. Revise diariamente por 15-20 minutos.",
              "Em 60 dias, você terá centenas de conceitos gravados na memória de longo prazo com pouca dor.",
            ],
          },
        },
      ],
      resumo: [
        "Recuperação ativa: puxar da memória em vez de reler. Faz doer, funciona.",
        "Repetição espaçada: revisar em intervalos crescentes. É o multiplicador mais poderoso.",
        "Prática entrelaçada: misturar tópicos diferentes na mesma sessão. Parece pior, é melhor.",
        "As três combinadas em um app como Anki formam o sistema ideal de estudo comprovado.",
      ],
    },
    {
      numero: 3,
      titulo: "Concentração de verdade",
      subtitulo: "Por que sua atenção é o recurso mais escasso — e como treiná-la",
      epigrafe: {
        texto: "Você não perde estudo por falta de tempo. Perde por falta de atenção.",
      },
      secoes: [
        {
          paragrafos: [
            "A revolução digital trouxe muitas vantagens pra estudo — cursos online, aplicativos, bibliotecas inteiras no celular. Mas também trouxe uma epidemia de dispersão. A pessoa média pega o celular mais de 150 vezes por dia. Cada notificação é um cortante na atenção. E atenção fragmentada não gera aprendizado. Gera ilusão de estudo.",
            "Se você abrir seu celular a cada 3 minutos enquanto estuda, você não está estudando. Está tocando estudo. É como ir à academia e parar entre cada exercício pra verificar Instagram — o esforço não se acumula, o corpo não se transforma. Estudo é igual.",
          ],
        },
        {
          titulo: "A técnica Pomodoro",
          paragrafos: [
            "Desenvolvida nos anos 80 por Francesco Cirillo, a técnica Pomodoro é simples: 25 minutos de foco absoluto em uma coisa, 5 minutos de pausa. Depois de 4 pomodoros, uma pausa longa de 15 a 30 minutos. É baseada na descoberta de que o cérebro sustenta atenção intensa em blocos curtos melhor do que em blocos longos.",
            "Durante o pomodoro: celular fora do alcance. Uma aba de navegador aberta. Uma tarefa clara. Sem música com letra. Sem notificação. Se um pensamento externo aparecer, anota rápido em um papel pra tratar depois — e volta pro trabalho.",
            "Nas pausas: se levantar, olhar pra longe, tomar água, esticar. Não pegar celular — porque celular ativa o modo de dispersão e prejudica o próximo pomodoro. O ideal é uma pausa vazia, quase entediante. É nela que o cérebro consolida.",
          ],
          lista: {
            titulo: "Setup mínimo pra bom pomodoro",
            itens: [
              "Celular em modo avião, fora do alcance visual",
              "Aba única aberta, notificações do desktop desligadas",
              "Uma tarefa clara e específica (não 'estudar matemática', mas 'resolver exercícios do cap 5')",
              "Água por perto — sem justificativa pra levantar no meio",
              "Timer visível (o próprio celular em modo avião serve — só como cronômetro)",
              "Papel e caneta perto pra anotar pensamentos intrusivos e tratá-los depois",
            ],
          },
        },
        {
          titulo: "O custo real da distração",
          paragrafos: [
            "Pesquisas da Universidade de Califórnia em Irvine mostram que, após uma interrupção, leva em média 23 minutos pra a pessoa voltar ao mesmo nível de atenção anterior. Se você é interrompido a cada 15 minutos, você nunca chega a atingir concentração profunda — e é justamente na concentração profunda que aprendizado acontece.",
            "Isso significa: 4 horas de estudo com interrupções constantes valem, na prática, menos de 1 hora de estudo focado. Você tá gastando o quádruplo do tempo pra o mesmo resultado. Ou pior — pra resultado inferior, porque o esforço parcial não fixa.",
          ],
          estatistica: {
            numero: "23 min",
            texto: "é o tempo médio pra o cérebro voltar ao foco depois de uma interrupção. Ser interrompido a cada 15 minutos significa nunca atingir foco profundo.",
          },
        },
        {
          titulo: "Ambiente muda tudo",
          paragrafos: [
            "Seu ambiente de estudo dita metade do resultado. Estudar na cama associa cama a estudo, dificulta o sono e reduz eficácia. Estudar na sala com TV ligada, mesmo baixa, divide atenção. Estudar em silêncio absoluto pode piorar pra quem se distrai com o próprio pensamento — pra esses, um ruído de fundo neutro (chuva, café, brown noise) ajuda.",
            "Regra: crie um lugar exclusivo pra estudo. Mesmo que seja um canto da sala, uma cadeira, uma mesa. Sempre estude ali. Seu cérebro vai associar aquele lugar a estudo, e com o tempo você entra em foco automaticamente quando senta ali. É condicionamento simples e eficaz.",
          ],
          destaque:
            "Não estude na cama, no sofá, ou onde você faz outras coisas. Crie um lugar exclusivo — nem que seja uma mesa em um canto. Ambiente é 50% da concentração.",
        },
        {
          titulo: "Sono, exercício e comida importam mais do que você imagina",
          paragrafos: [
            "O cérebro em cochilo aprende melhor. Estudos mostram que uma noite bem dormida depois de aprender aumenta a retenção em até 30%. Durante o sono profundo, o cérebro consolida a informação recente e fortalece as conexões formadas durante o dia. Cortar sono pra estudar mais é a receita perfeita pra estudar mal.",
            "Exercício aeróbico regular (mesmo caminhada de 30 minutos) aumenta o volume do hipocampo — a região do cérebro ligada à memória. Não é exagero: gente que caminha diariamente tem cérebro mensuravelmente mais eficiente pra aprender.",
            "Alimentação afeta função cognitiva imediata. Refeições muito pesadas antes de estudar reduzem irrigação cerebral. Excesso de açúcar causa picos e quedas de energia. Água insuficiente reduz atenção em 30% em algumas horas. Sem cuidar do corpo, o cérebro não performa.",
          ],
          exercicio: {
            titulo: "A semana do foco",
            passos: [
              "Escolha uma semana pra experimentar. Nada radical.",
              "Todo dia: 3 sessões pomodoro (25 min foco + 5 min pausa) — só com uma tarefa por sessão.",
              "Celular em outra sala durante os pomodoros. Sem exceção.",
              "Dormir 8 horas por noite. Caminhar 30 minutos por dia.",
              "Cortar o segundo café ou o segundo docinho após as 15h.",
              "No fim da semana, compare: quanto conteúdo você absorveu em 90 minutos concentrados versus quatro horas dispersas antes?",
            ],
          },
        },
      ],
      resumo: [
        "Atenção fragmentada é ilusão de estudo. Sem foco profundo, aprendizado não fixa.",
        "Pomodoro: 25 minutos concentrados, 5 minutos de pausa. Celular longe.",
        "Cada interrupção custa 23 minutos de foco. Ser interrompido demais mata o estudo.",
        "Sono, exercício e alimentação afetam capacidade cognitiva. Sem cuidar do corpo, cérebro fraca.",
      ],
    },
    {
      numero: 4,
      titulo: "Estudar pra prova com método",
      subtitulo: "Como aprovados usam as últimas semanas antes do exame",
      epigrafe: {
        texto: "Aprovado não é quem estuda mais. É quem estuda com método enquanto os outros estudam com força.",
      },
      secoes: [
        {
          paragrafos: [
            "Prova é um teste específico — e estudar bem pra prova exige método específico. Não é só saber a matéria. É saber a matéria da forma que a prova cobra, na velocidade que a prova exige, com resistência emocional pra performar sob pressão. Aprovados têm rotina de estudo pra prova radicalmente diferente da rotina de estudo pra aprender.",
            "Este capítulo é o mais tático do livro. É o passo a passo do que fazer nas últimas semanas antes de qualquer prova importante — vestibular, concurso, prova de faculdade, certificação profissional. Se você aplicar, aumenta drasticamente suas chances.",
          ],
        },
        {
          titulo: "Provas passadas: seu melhor estudo",
          paragrafos: [
            "Um segredo aberto de aprovados de concurso: eles resolvem centenas de questões da prova em anos anteriores. Não porque as questões vão se repetir — mas porque cada banca tem um estilo. Frases favoritas. Armadilhas típicas. Assuntos que caem mais. Você aprende essa gramática interna resolvendo muitas questões da mesma banca.",
            "Comece pelas questões pelo menos 3 meses antes da prova. Faça 10 a 20 questões por dia. Corrija cada uma imediatamente após responder, entendendo por que errou (isso é muito mais importante que só saber a resposta certa). Anote temas que você tem dificuldade e priorize-os no estudo.",
            "Um bônus enorme: resolver questões é a forma mais eficaz de recuperação ativa que existe. Você tá simultaneamente testando a memória e aprendendo a lidar com o formato da prova.",
          ],
          estatistica: {
            numero: "60%",
            texto: "dos temas de uma prova de concurso costumam se repetir dos 5 anos anteriores. Quem estuda provas passadas aprende com o que já foi cobrado.",
          },
        },
        {
          titulo: "O simulado como diagnóstico",
          paragrafos: [
            "A cada 2 semanas nos meses finais, faça um simulado completo. Tempo cronometrado. Ambiente parecido com o da prova. Sem consultar material. Isso vai fazer três coisas essenciais: testar sua velocidade real, mostrar teus pontos fracos, e te acostumar com a pressão psicológica da prova de verdade.",
            "Após cada simulado, dedique tempo maior à correção que à realização. Anote cada erro. Categorize: errei por não saber, errei por interpretação, errei por descuido, errei por chutar. Cada tipo de erro exige tratamento diferente. Não saber = estudar mais. Interpretação = ler mais devagar. Descuido = revisar sempre. Chutar = eliminar respostas obviamente erradas primeiro.",
          ],
          lista: {
            titulo: "Como corrigir um simulado",
            itens: [
              "Marque o tempo total gasto — você precisa saber sua velocidade",
              "Identifique cada questão: acertei sabendo, acertei chutando, errei por não saber, errei por descuido",
              "Nas erradas por não saber: estude o tema imediatamente e crie flashcard",
              "Nas erradas por descuido: identifique o padrão (ler pouco, escolher rápido) e crie protocolo pessoal",
              "Compare com simulados anteriores: onde melhorou? Onde piorou? Ajuste foco.",
            ],
          },
        },
        {
          titulo: "Últimas 2 semanas: o modo revisão",
          paragrafos: [
            "As duas últimas semanas antes de qualquer prova importante devem ser dedicadas quase exclusivamente à revisão. Não é hora de aprender coisa nova — é hora de consolidar o que já foi aprendido. Novos conteúdos nas últimas semanas geralmente confundem em vez de agregar.",
            "Método: mapa mental resumido de cada matéria. Revisão diária dos flashcards. Simulados mais espaçados (1 por semana). Foco em temas que você errou mais em simulados anteriores. Sono e alimentação disciplinados. Nada de virar noite.",
          ],
          destaque:
            "Últimas 2 semanas são de consolidação, não de aprendizado novo. Se você chegou a essa fase e ainda tem matéria a aprender do zero, o problema é de planejamento — não de esforço.",
        },
        {
          titulo: "A noite anterior e o dia da prova",
          paragrafos: [
            "Regras do dia anterior: dormir cedo. Não estudar depois das 20h. Fazer atividade leve — caminhada, filme leve, conversa. O cérebro precisa consolidar tudo dormindo. Ficar estudando até tarde só aumenta ansiedade e reduz performance.",
            "Regra do dia: café da manhã simples e leve. Chegar cedo. Levar água. Roupas confortáveis. Nas primeiras 5 minutos da prova, leia todas as questões rapidamente antes de começar a responder. Isso ativa reconhecimento e permite planejar tempo. Depois responda primeiro as fáceis, deixando as difíceis pro final.",
            "Regra emocional: se travar em uma questão, pule. Não fique 15 minutos numa questão de 5 pontos e perca 5 questões de 10 pontos por falta de tempo. Aprovado é quem administra bem o tempo — não quem sabe mais.",
          ],
          citacao: {
            texto: "A prova não mede quem sabe mais. Mede quem se prepara melhor.",
          },
          exercicio: {
            titulo: "Cronograma reverso de 90 dias",
            passos: [
              "3 meses antes: comece a resolver questões passadas — 10 a 20 por dia.",
              "2 meses antes: primeiro simulado completo cronometrado. Analise erros por categoria.",
              "6 semanas antes: segundo simulado. Ajuste estudo pros pontos fracos identificados.",
              "4 semanas antes: terceiro simulado. Comece a revisão diária de flashcards.",
              "3 semanas antes: quarto simulado. Foco máximo em pontos fracos remanescentes.",
              "2 semanas antes: modo revisão pura. Sem matéria nova. Mapa mental de cada tema.",
              "1 semana antes: quinto simulado com condições realistas. Ajuste último.",
              "Dia anterior: descansar. Trocar de canal.",
              "Dia da prova: leitura completa antes de responder, fáceis primeiro, gerenciar tempo.",
            ],
          },
        },
      ],
      resumo: [
        "Provas passadas são o melhor material — cada banca tem sua gramática.",
        "Simulados regulares são diagnóstico. Corrigir vale mais que fazer.",
        "Últimas 2 semanas: só revisão, sem matéria nova.",
        "Dia da prova: leitura geral primeiro, fáceis antes das difíceis, gerenciar tempo.",
      ],
    },
  ],
  conclusao: {
    paragrafos: [
      "Quatro capítulos depois, você tem em mãos o método que funciona. Não é mágica, não é motivacional. É ciência aplicada. Como o cérebro aprende. As três técnicas comprovadas. Concentração real. Estudo pra prova estruturado.",
      "Nada disso importa se você fechar o livro e não aplicar. A diferença entre alunos comuns e aprovados quase nunca é inteligência — é método aplicado com disciplina ao longo dos meses. Você já tem o método. Falta só aplicar.",
      "Comece pequeno. Baixe o Anki hoje. Crie 10 flashcards do seu assunto atual. Faça um pomodoro concentrado antes de dormir. Amanhã, faça mais um. Em 30 dias, você já está estudando de forma diferente — e melhor. Em 90, os resultados começam a aparecer.",
    ],
    proximosPassos: [
      "Nesta semana: baixe o Anki e crie seu primeiro deck de flashcards.",
      "Neste mês: implemente rotina de pomodoros diários com celular fora do alcance.",
      "Nos próximos 3 meses: se preparando pra prova, comece resolução de questões passadas.",
      "Ao longo dos estudos: use as três técnicas — recuperação ativa, repetição espaçada, prática entrelaçada.",
    ],
  },
  posfacio: [
    "Aprender é a habilidade que multiplica todas as outras.",
    "Aprenda a aprender — e nenhum conhecimento fica fora do teu alcance.",
  ],
};

// ============================================================
// MAPA DE LIVROS DISPONÍVEIS
// ============================================================
export const LIVROS_POR_NICHO: Record<string, LivroConteudo> = {
  emagrecimento: LIVRO_EMAGRECIMENTO,
  financas: LIVRO_FINANCAS,
  marketing: LIVRO_MARKETING,
  espiritualidade: LIVRO_ESPIRITUALIDADE,
  relacionamento: LIVRO_RELACIONAMENTO,
  carreira: LIVRO_CARREIRA,
  culinaria: LIVRO_CULINARIA,
  estudos: LIVRO_ESTUDOS,
};

export function pegarLivroDoNicho(nichoId: string): LivroConteudo | null {
  return LIVROS_POR_NICHO[nichoId] || null;
}
