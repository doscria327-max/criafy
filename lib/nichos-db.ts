/**
 * Banco de dados de nichos.
 * Cada nicho traz vocabulário próprio pra o gerador combinar em
 * produtos, copies, páginas e PDFs — sem chamar nenhuma IA externa.
 */

export type Nicho = {
  id: string;
  nome: string;
  keywords: string[];
  formatos: string[];
  dores: string[];
  desejos: string[];
  objecoes: string[];
  beneficios: string[];
  modulos: string[];
  headlines: string[];
  subheadlines: string[];
  angulosCopy: string[];
  garantias: string[];
  bonus: string[];
  grupos: { nome: string; plataforma: string; link: string; risco: "baixo" | "medio" | "alto"; motivo: string }[];
  capitulosPdf: { titulo: string; paragrafos: string[] }[];
};

export const NICHOS: Nicho[] = [
  // ============ EMAGRECIMENTO ============
  {
    id: "emagrecimento",
    nome: "Emagrecimento",
    keywords: ["emagrecer", "peso", "gordura", "dieta", "magra", "shape", "corpo", "obesa", "silhueta"],
    formatos: ["ebook", "curso", "protocolo", "guia", "método"],
    dores: [
      "Você já tentou de tudo e o ponteiro não sai do lugar",
      "A roupa que servia ano passado não fecha mais",
      "Você olha no espelho e não reconhece mais seu corpo",
      "O efeito sanfona virou rotina e a autoestima foi junto",
      "Você começa segunda-feira e sempre desiste na quarta",
    ],
    desejos: [
      "Voltar a caber naquela roupa que você ama",
      "Se sentir leve, bonita e cheia de energia de novo",
      "Ir à praia sem se esconder atrás da canga",
      "Emagrecer sem passar fome nem viver de salada",
      "Manter o peso pra sempre, sem efeito sanfona",
    ],
    objecoes: [
      "não tenho tempo pra academia",
      "já tentei dietas e nunca funcionou",
      "não sei cozinhar",
      "não consigo largar o doce",
      "meu metabolismo é lento",
    ],
    beneficios: [
      "Perca de 3 a 8 kg no primeiro mês sem passar fome",
      "Aprenda a comer bem sem contar caloria nenhuma",
      "Elimine a compulsão por doce em 21 dias",
      "Cardápio pronto pra café, almoço e jantar",
      "Estratégia contra o efeito sanfona (a maior parte falha aqui)",
      "Rotina que cabe em quem trabalha 8h por dia",
    ],
    modulos: [
      "Módulo 1: Destravando o seu metabolismo em 7 dias",
      "Módulo 2: O prato que emagrece sem passar fome",
      "Módulo 3: Como cortar o doce sem sofrimento",
      "Módulo 4: Cardápio pronto de 30 dias (café, almoço, jantar)",
      "Módulo 5: Movimento diário: 15 minutos que valem 1 hora",
      "Módulo 6: Manutenção definitiva — nunca mais engordar",
    ],
    headlines: [
      "Descubra como perder até 8kg em 30 dias sem passar fome e sem academia",
      "O método que já ajudou milhares de mulheres a caberem naquela roupa de novo",
      "Emagreça de forma definitiva com um cardápio simples que cabe na sua rotina",
    ],
    subheadlines: [
      "Um passo a passo simples pra quem já tentou de tudo e não teve resultado",
      "Sem dieta maluca, sem restrição extrema, sem passar o dia com fome",
      "O plano completo que transforma seu corpo em 30 dias",
    ],
    angulosCopy: [
      "Você começa segunda e desiste quarta? Não é falta de força de vontade. É método errado.",
      "Já pensou por que dieta funciona pros outros e não pra você? A resposta te chocou.",
      "Uma amiga minha emagreceu 12kg em 3 meses sem academia. O que ela fez foi isso aqui.",
      "Toda dieta te faz voltar ao ponto de partida em 6 meses. Existe um jeito de manter pra sempre.",
      "Sabe aquele vestido que ficou pequeno? Ele vai voltar a servir. Prometo.",
    ],
    garantias: [
      "Garantia incondicional de 7 dias. Não gostou, devolvemos 100% do valor.",
      "30 dias de garantia. Se em 1 mês você não ver resultado, pedimos desculpa e devolvemos tudo.",
    ],
    bonus: [
      "Bônus 1: Lista de compras semanal pra economizar no mercado",
      "Bônus 2: 30 receitas fit rápidas (menos de 15 min)",
      "Bônus 3: Grupo de apoio no WhatsApp",
    ],
    grupos: [
      { nome: "Emagrecimento Definitivo BR", plataforma: "Telegram", link: "t.me/emagrecimentodefinitivo", risco: "baixo", motivo: "Grupo de apoio, admin libera divulgação com moderação." },
      { nome: "Mulheres em Transformação", plataforma: "Facebook", link: "facebook.com/groups/mulheresemtransformacao", risco: "medio", motivo: "Aceita posts, mas exige que agregue conteúdo, não só link." },
      { nome: "r/loseit_brasil", plataforma: "Reddit", link: "reddit.com/r/loseit_brasil", risco: "medio", motivo: "Comunidade ativa, autopromoção só na thread de sábado." },
      { nome: "Vida Leve", plataforma: "Discord", link: "discord.gg/vidaleve", risco: "baixo", motivo: "Canal específico #recursos-e-produtos permite divulgação." },
      { nome: "Skool - Fit Life BR", plataforma: "Skool", link: "skool.com/fit-life-br", risco: "baixo", motivo: "Comunidade paga, alta qualidade de leads." },
      { nome: "Fórum Dieta e Saúde", plataforma: "Fórum", link: "forumdieta.com.br", risco: "baixo", motivo: "Fórum antigo, permite assinatura com link no perfil." },
      { nome: "Emagrecer Sem Sofrer", plataforma: "Telegram", link: "t.me/emagrecersemsofrer", risco: "baixo", motivo: "Grupo temático abre pra parceiros toda sexta." },
      { nome: "Foco no Corpo", plataforma: "Facebook", link: "facebook.com/groups/foconocorpo", risco: "medio", motivo: "Post educativo com link no comentário funciona bem." },
      { nome: "Comunidade Low Carb BR", plataforma: "Telegram", link: "t.me/lowcarbbr", risco: "baixo", motivo: "Interessados em produtos do nicho." },
      { nome: "r/BrasilFitness", plataforma: "Reddit", link: "reddit.com/r/brasilfitness", risco: "medio", motivo: "Precisa ser membro há 30+ dias antes de postar link." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: Por que dieta nunca funcionou pra você",
        paragrafos: [
          "Se você chegou aqui, provavelmente já tentou de tudo. Low carb, jejum intermitente, contagem de caloria, shake substituto, aplicativo de dieta. E aqui está você, ainda insatisfeita com o corpo no espelho. A boa notícia é que o problema não é você — é o método.",
          "A maior parte das dietas falha porque foi desenhada pra emagrecer no curto prazo, não pra manter no longo. E manutenção é o que separa quem emagrece de verdade de quem vive no efeito sanfona.",
          "Neste guia, você vai aprender um método diferente. Um método que não depende de força de vontade sobre-humana, não te faz passar fome e — o mais importante — funciona quando a vida real acontece.",
        ],
      },
      {
        titulo: "Capítulo 2: Destravando o seu metabolismo",
        paragrafos: [
          "Metabolismo lento não é destino, é resultado. Anos de dieta restritiva, sono ruim e estresse ensinam ao seu corpo a economizar energia — como se você estivesse em uma zona de fome. Reverter isso é totalmente possível, e leva menos tempo do que você imagina.",
          "O primeiro passo é comer mais, não menos. Sim, você leu certo. Restrição extrema desacelera o metabolismo. Uma alimentação nutritiva, com proteína adequada, é o que acelera de novo.",
          "Durma 7 a 8 horas por noite, tome sol pela manhã e faça pelo menos 15 minutos de movimento diário. Não precisa ser academia. Caminhada resolve.",
        ],
      },
      {
        titulo: "Capítulo 3: O prato que emagrece",
        paragrafos: [
          "Chega de contar caloria. Existe uma fórmula muito mais simples: metade do prato de vegetais, um quarto de proteína e um quarto de carboidrato bom. Em qualquer refeição.",
          "Proteína é a rainha do emagrecimento — sacia, preserva massa muscular e acelera o metabolismo. Ovos, frango, peixe, carne magra, feijão. Coma em todas as refeições principais.",
          "Vegetais têm fibras e água, ocupam espaço no estômago e você come menos das outras coisas sem perceber. Coloca cor no prato: verde escuro, vermelho, laranja. Fica lindo e funciona.",
        ],
      },
      {
        titulo: "Capítulo 4: Domando o doce",
        paragrafos: [
          "Vontade de doce não é fraqueza — é bioquímica. Quando você corta radical, o cérebro entra em pânico e a compulsão dispara. A saída é gradual: primeiro reduzir, depois substituir, depois eliminar.",
          "Frutas com pasta de amendoim, iogurte grego com mel, chocolate 70%. São transições que enganam o cérebro e educam o paladar.",
          "Em 21 dias de consistência, seu cérebro reprogramou o desejo. Você passa a preferir naturalmente o que faz bem.",
        ],
      },
      {
        titulo: "Capítulo 5: Manutenção — o segredo pra nunca mais engordar",
        paragrafos: [
          "Emagrecer é a parte fácil. Manter é o desafio real. E o segredo tá em não voltar pro padrão antigo depois que atingiu a meta.",
          "Se pesar 1x por semana funciona pra maioria. Não pra se cobrar, mas pra ajustar cedo. 2kg de variação já é sinal pra apertar.",
          "E, principalmente: encara isso como um novo estilo de vida, não como uma dieta que termina. O corpo que você conquistou é reflexo dos hábitos que você mantém.",
        ],
      },
    ],
  },

  // ============ FINANÇAS PESSOAIS ============
  {
    id: "financas",
    nome: "Finanças Pessoais",
    keywords: ["dinheiro", "finanças", "financeiro", "investir", "investimento", "renda", "dívida", "grana", "sair do vermelho"],
    formatos: ["ebook", "curso", "planilha", "método", "programa"],
    dores: [
      "Todo mês o dinheiro some antes do dia 20 e você não sabe pra onde foi",
      "Você trabalha, trabalha, trabalha e mesmo assim não sobra nada",
      "As contas vencem e a ansiedade só cresce",
      "Você tem medo de olhar o extrato do banco",
      "Sonhos foram engavetados porque parece impossível ter dinheiro",
    ],
    desejos: [
      "Terminar o mês com dinheiro sobrando na conta",
      "Sair do vermelho de uma vez por todas",
      "Começar a investir mesmo ganhando pouco",
      "Ter uma reserva de emergência que te dê paz",
      "Realizar aquele sonho que parecia impossível",
    ],
    objecoes: [
      "eu ganho pouco",
      "eu já tentei planilha e nunca deu certo",
      "eu não entendo nada de investimento",
      "isso é pra quem já tem dinheiro",
      "eu tenho dívida, não sobra nada",
    ],
    beneficios: [
      "Descubra pra onde o seu dinheiro está indo (o vazamento invisível)",
      "Método pra sair do vermelho em até 90 dias",
      "Como começar a investir com R$ 30 por mês",
      "Aprenda a montar uma reserva de emergência sem sofrimento",
      "Estratégia pra negociar e reduzir suas dívidas",
      "Planilha simples que qualquer pessoa consegue usar",
    ],
    modulos: [
      "Módulo 1: Diagnóstico — descubra pra onde vai seu dinheiro",
      "Módulo 2: Cortando gastos invisíveis (você vai se assustar)",
      "Módulo 3: Como sair do vermelho em 90 dias",
      "Módulo 4: Montando sua reserva de emergência",
      "Módulo 5: Primeiros investimentos pra quem ganha pouco",
      "Módulo 6: Escalando sua renda extra pra multiplicar resultados",
    ],
    headlines: [
      "Como sair do vermelho e começar a investir mesmo ganhando pouco",
      "O método simples que já tirou milhares de pessoas das dívidas em menos de 6 meses",
      "Aprenda a controlar seu dinheiro e conquistar sua liberdade financeira",
    ],
    subheadlines: [
      "Passo a passo prático pra quem cansou de ver o dinheiro sumir",
      "Sem planilha complicada, sem termo de economista, sem promessa milagrosa",
      "Do zero à sua primeira reserva em 90 dias",
    ],
    angulosCopy: [
      "Se todo mês termina no vermelho, o problema não é seu salário. É seu sistema.",
      "Você sabia que 7 em cada 10 brasileiros estão endividados? Existe um jeito de virar essa estatística.",
      "Meu vizinho ganha metade do que eu e conseguiu comprar carro à vista. O segredo tá aqui.",
      "Não precisa ganhar 10 mil pra investir. Comece com 30. Sério.",
      "Enquanto você não organiza suas finanças, alguém tá organizando as delas com o seu dinheiro.",
    ],
    garantias: [
      "7 dias de garantia total. Se não gostar, devolvemos até o último centavo.",
      "Garantia de 30 dias. Aplique o método por 1 mês. Se não sentir diferença, é seu dinheiro de volta.",
    ],
    bonus: [
      "Bônus 1: Planilha de controle mensal automática",
      "Bônus 2: Guia de renegociação de dívidas (scripts prontos)",
      "Bônus 3: Aulas ao vivo com Q&A mensais",
    ],
    grupos: [
      { nome: "Poupança Simplificada", plataforma: "Telegram", link: "t.me/poupancasimplificada", risco: "baixo", motivo: "Admin permite divulgação de material educativo do nicho." },
      { nome: "Dinheiro Sem Mistério", plataforma: "Facebook", link: "facebook.com/groups/dinheirosemmisterio", risco: "medio", motivo: "Aceita posts contextualizados, sem spam direto." },
      { nome: "r/investimentos", plataforma: "Reddit", link: "reddit.com/r/investimentos", risco: "alto", motivo: "Comunidade grande mas rigorosa com autopromoção — leia as regras." },
      { nome: "Comunidade FIRE Brasil", plataforma: "Discord", link: "discord.gg/firebrasil", risco: "baixo", motivo: "Canal #recursos permite compartilhar produtos úteis." },
      { nome: "Finanças pra Iniciantes", plataforma: "Telegram", link: "t.me/financaspraininiciantes", risco: "baixo", motivo: "Grupo aberto, foco em educação financeira." },
      { nome: "Sair do Vermelho BR", plataforma: "Telegram", link: "t.me/sairvermelhobr", risco: "baixo", motivo: "Público qualificado, aberto a soluções pagas." },
      { nome: "r/personalfinance_br", plataforma: "Reddit", link: "reddit.com/r/personalfinance_br", risco: "medio", motivo: "Compartilhe resultado antes do link — engaje primeiro." },
      { nome: "Vida Financeira Livre", plataforma: "Facebook", link: "facebook.com/groups/vidafinanceiralivre", risco: "medio", motivo: "Requer aprovação pra postar." },
      { nome: "Investir Começando do Zero", plataforma: "Discord", link: "discord.gg/investirdozero", risco: "baixo", motivo: "Comunidade jovem e receptiva." },
      { nome: "Fórum Economia e Investimento", plataforma: "Fórum", link: "foruminvest.com.br", risco: "baixo", motivo: "Fórum antigo com regra clara pra assinatura do perfil." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: A verdade sobre o seu dinheiro",
        paragrafos: [
          "Se você chegou aqui, provavelmente sente que seu dinheiro escorre pelas mãos. Trabalha o mês inteiro e no dia 25 já não sabe pra onde foi. Não é você, é o sistema — ou melhor, a falta dele.",
          "Educação financeira não é sobre ganhar muito. É sobre saber pra onde vai o que você já ganha. E aqui você vai aprender exatamente isso.",
          "Prepara papel, caneta e coragem. Porque a primeira semana é a mais desconfortável — você vai ver de onde estão saindo seus problemas. E o primeiro passo pra resolver é enxergar.",
        ],
      },
      {
        titulo: "Capítulo 2: O diagnóstico honesto",
        paragrafos: [
          "Antes de resolver, é preciso enxergar. Anote todos os seus gastos dos últimos 3 meses. Todos. Do café da manhã ao streaming. Você vai se assustar.",
          "Separe em: fixos (aluguel, luz, internet), variáveis (mercado, transporte) e supérfluos (delivery, assinaturas, café).",
          "O terceiro grupo costuma ser o dobro do que a gente imagina. É aqui que mora o vazamento invisível — e é aqui que você vai começar.",
        ],
      },
      {
        titulo: "Capítulo 3: Saindo do vermelho em 90 dias",
        paragrafos: [
          "Dívida no cartão a 15% ao mês corrói qualquer salário. A primeira meta não é investir, é sair do vermelho. E existe um jogo pra isso.",
          "Liste todas as dívidas do menor pro maior valor. Ataque a menor primeiro (bola de neve). Cada dívida quitada é uma vitória psicológica que te dá gás pra próxima.",
          "Ligue e negocie. 90% das dívidas podem ser reduzidas em 30 a 60% do valor com um telefonema. Não subestime esse passo.",
        ],
      },
      {
        titulo: "Capítulo 4: A reserva que muda tudo",
        paragrafos: [
          "Reserva de emergência é a diferença entre passar por uma crise e ser destruído por ela. Comece pequena: 1 mês do seu custo fixo.",
          "Guarde no Tesouro Selic ou CDB de liquidez diária. Não precisa render muito — precisa ter no dia que você precisar.",
          "Meta final: 6 meses de custo fixo guardados. É aí que você respira de verdade.",
        ],
      },
      {
        titulo: "Capítulo 5: Seus primeiros investimentos",
        paragrafos: [
          "Com dívida quitada e reserva montada, é hora de fazer o dinheiro trabalhar pra você. E não, não precisa ter muito pra começar. Com R$ 30 já dá.",
          "Comece simples: Tesouro Direto, CDB e fundos de índice. Ignore criptomoeda, ações individuais e day trade por enquanto. Você vai chegar lá, mas não é agora.",
          "Consistência bate ousadia. R$ 100 por mês por 20 anos vale muito mais do que R$ 1000 aleatórios num mês só.",
        ],
      },
    ],
  },

  // ============ RELACIONAMENTO ============
  {
    id: "relacionamento",
    nome: "Relacionamento",
    keywords: ["amor", "relacionamento", "namorado", "namorada", "casamento", "conquista", "paquera", "sedução", "casal", "ex"],
    formatos: ["ebook", "curso", "método", "guia"],
    dores: [
      "Você se apaixona sempre pelas pessoas erradas",
      "Toda vez que o relacionamento começa a ficar sério, você é abandonada",
      "Você não consegue esquecer o seu ex",
      "A relação virou um deserto — sem carinho, sem sexo, sem conversa",
      "Você se anula pra manter o outro por perto",
    ],
    desejos: [
      "Ter um relacionamento saudável e apaixonante",
      "Reconquistar a pessoa que você ama",
      "Ser desejada, admirada e escolhida de novo",
      "Parar de se apaixonar pelas pessoas erradas",
      "Reacender a chama que se apagou",
    ],
    objecoes: [
      "meu caso é diferente",
      "isso é manipulação",
      "acho que ele não me ama mais",
      "eu já tentei conversar e ele não me escuta",
      "tenho medo de me machucar de novo",
    ],
    beneficios: [
      "Descubra por que sempre atrai o tipo errado de pessoa",
      "Aprenda a se posicionar sem parecer chata ou carente",
      "Estratégia pra reconquistar sem se humilhar",
      "Reacenda o desejo do seu parceiro em semanas",
      "Construa autoestima que atrai o parceiro certo",
    ],
    modulos: [
      "Módulo 1: O padrão invisível que sabota seus relacionamentos",
      "Módulo 2: Autoestima real — a base de todo relacionamento saudável",
      "Módulo 3: Comunicação que aproxima (e o que afasta na hora)",
      "Módulo 4: Como reacender o desejo sem forçar",
      "Módulo 5: Reconquista consciente (nada de mensagens desesperadas)",
      "Módulo 6: Construindo um relacionamento que dura",
    ],
    headlines: [
      "Descubra como reconquistar quem você ama sem se humilhar",
      "O método que mostra por que você atrai as pessoas erradas — e como mudar isso",
      "Reacenda o amor e o desejo no seu relacionamento em poucas semanas",
    ],
    subheadlines: [
      "Um caminho honesto pra quem cansou de sofrer por amor",
      "Sem magia, sem manipulação, sem promessa impossível",
      "Baseado em psicologia de vínculo e comunicação afetiva",
    ],
    angulosCopy: [
      "Toda vez que a relação começa a ficar séria, ele some. Nunca é coincidência.",
      "Você não perde o amor porque é pouco. Você perde porque se anula.",
      "Reconquista não é convencer. É lembrar. E existe um método pra isso.",
      "A pessoa certa não vai chegar enquanto você continuar sendo a pessoa que aceita qualquer coisa.",
      "Ele parou de te querer? Talvez você tenha parado de ser querida — sem perceber.",
    ],
    garantias: [
      "7 dias de garantia. Se você não sentir a mudança já na primeira semana, devolvemos tudo.",
      "Garantia de 15 dias. Aplique o método e veja resultado ou receba de volta.",
    ],
    bonus: [
      "Bônus 1: Scripts prontos de conversa pra momentos difíceis",
      "Bônus 2: Guia da linguagem corporal que atrai",
      "Bônus 3: Áudios semanais de autoestima",
    ],
    grupos: [
      { nome: "Amor Consciente BR", plataforma: "Telegram", link: "t.me/amorconscientebr", risco: "baixo", motivo: "Comunidade aberta a materiais do nicho." },
      { nome: "Mulheres que Amam Demais", plataforma: "Facebook", link: "facebook.com/groups/mulheresqueamamdemais", risco: "medio", motivo: "Postagens educativas passam melhor." },
      { nome: "r/relacionamentos", plataforma: "Reddit", link: "reddit.com/r/relacionamentos", risco: "alto", motivo: "Autopromoção rigidamente moderada — engaje muito antes." },
      { nome: "Reconquista Consciente", plataforma: "Telegram", link: "t.me/reconquistaconsciente", risco: "baixo", motivo: "Público exatamente do nicho." },
      { nome: "Casais em Reconstrução", plataforma: "Discord", link: "discord.gg/casaisreconstrucao", risco: "baixo", motivo: "Canal específico pra recomendação de materiais." },
      { nome: "Sedução Saudável", plataforma: "Facebook", link: "facebook.com/groups/seducaosaudavel", risco: "medio", motivo: "Precisa passar por triagem antes de postar." },
      { nome: "Autoestima e Relacionamento", plataforma: "Telegram", link: "t.me/autoestimarelacionamento", risco: "baixo", motivo: "Grupo temático receptivo." },
      { nome: "Após o Rompimento", plataforma: "Facebook", link: "facebook.com/groups/aposorompimento", risco: "medio", motivo: "Comunidade sensível — poste com empatia, não com venda direta." },
      { nome: "Amor Próprio Primeiro", plataforma: "Discord", link: "discord.gg/amorproprioprimeiro", risco: "baixo", motivo: "Público jovem, aberto a produtos digitais." },
      { nome: "Fórum Relacionamento Brasil", plataforma: "Fórum", link: "forumrel.com.br", risco: "baixo", motivo: "Assinatura de perfil com link permitida." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: Por que sempre acontece com você",
        paragrafos: [
          "Se você está lendo isso, provavelmente já se perguntou: 'por que sempre acaba assim?'. E a resposta é dolorosa, mas libertadora: existe um padrão. E o padrão está em você, não neles.",
          "Não é culpa, é responsabilidade. A diferença é enorme. Culpa te paralisa. Responsabilidade te move. E o objetivo deste guia é te mover.",
          "Nas próximas páginas você vai encontrar o padrão que se repete, as crenças que sustentam esse padrão e — mais importante — o caminho pra quebrar o ciclo pra sempre.",
        ],
      },
      {
        titulo: "Capítulo 2: A raiz invisível",
        paragrafos: [
          "Todo padrão de relacionamento tem uma raiz na infância. Não pra culpar seus pais, mas pra entender de onde vem a sua fome de amor.",
          "Se você foi amada com condições, aprendeu a se anular pra ser amada. Se foi ignorada, aprendeu a implorar por atenção. Cada padrão veio de algum lugar.",
          "Reconhecer isso não te vitimiza. Te dá o controle. Porque o que você reconhece, você pode mudar.",
        ],
      },
      {
        titulo: "Capítulo 3: A autoestima verdadeira",
        paragrafos: [
          "Autoestima não é achar bonita a foto no espelho. É saber, do fundo, que você é suficiente mesmo sozinha. E paradoxalmente, é exatamente essa mulher que é escolhida.",
          "Construir autoestima real é um trabalho diário e silencioso. Passa por cortar toxicidade, se cercar bem, se realizar em áreas fora do amor.",
          "Mulher realizada não implora amor. Ela escolhe. E é escolhida.",
        ],
      },
      {
        titulo: "Capítulo 4: Comunicação que aproxima",
        paragrafos: [
          "Grande parte dos conflitos não são sobre o assunto. São sobre como o assunto é conduzido. E existem padrões de fala que aproximam — e outros que afastam na hora.",
          "Comece pelo 'eu me sinto' ao invés do 'você fez'. É a diferença entre convite e ataque.",
          "Escute pra entender, não pra responder. Só isso já muda 70% das brigas.",
        ],
      },
      {
        titulo: "Capítulo 5: Reconquista consciente",
        paragrafos: [
          "Reconquista não é convencer alguém a ficar com você. É lembrar essa pessoa por que ela te escolheu no começo. E, se a resposta for 'não vale mais a pena', é você se libertar com dignidade.",
          "Nada de mensagens desesperadas. Nada de imploração. O melhor jogo é o silêncio estratégico enquanto você se reconstrói publicamente.",
          "Se voltar, volta pra uma versão melhor de você. Se não voltar, você já é uma versão melhor. Você ganha nas duas.",
        ],
      },
    ],
  },

  // ============ CARREIRA ============
  {
    id: "carreira",
    nome: "Carreira e Renda",
    keywords: ["emprego", "carreira", "salário", "trabalho", "renda extra", "profissão", "linkedin", "currículo", "entrevista"],
    formatos: ["ebook", "curso", "mentoria", "guia"],
    dores: [
      "Você trabalha muito e ganha pouco",
      "Faz anos que você não é promovido, mesmo entregando resultado",
      "Você quer mudar de área mas não sabe por onde começar",
      "Envia currículo pra tudo quanto é lugar e não te chamam",
      "Sente que está estagnado enquanto todo mundo passa por você",
    ],
    desejos: [
      "Dobrar seu salário em um ano",
      "Trocar de área sem começar do zero",
      "Sair do CLT e ter renda própria",
      "Ser reconhecida e valorizada no trabalho",
      "Conquistar aquela vaga dos sonhos",
    ],
    objecoes: [
      "não tenho tempo pra estudar",
      "não tenho faculdade",
      "meu currículo é fraco",
      "eu não sei me vender",
      "o mercado tá ruim",
    ],
    beneficios: [
      "Reformule seu currículo pra passar em qualquer triagem",
      "Domine o LinkedIn e receba propostas em vez de correr atrás",
      "Aprenda a negociar aumento (com script pronto)",
      "Descubra sua área ideal com um teste de perfil aprofundado",
      "Estratégia pra transição de carreira sem começar do zero",
    ],
    modulos: [
      "Módulo 1: Autoanálise — onde você está e pra onde quer ir",
      "Módulo 2: Currículo e LinkedIn que abrem portas",
      "Módulo 3: Networking sem parecer interesseiro",
      "Módulo 4: Entrevistas que fecham vagas",
      "Módulo 5: Negociação salarial (o script que funciona)",
      "Módulo 6: Plano de carreira pros próximos 5 anos",
    ],
    headlines: [
      "Como dobrar seu salário em 12 meses sem trocar de empresa (ou trocando com propósito)",
      "O método que já ajudou milhares a saírem da estagnação profissional",
      "Assuma o controle da sua carreira e conquiste a vida que você merece",
    ],
    subheadlines: [
      "Passo a passo prático pra quem cansou de ser esquecido no trabalho",
      "Do currículo travado até a proposta dos sonhos",
      "Estratégia real, sem discurso motivacional vazio",
    ],
    angulosCopy: [
      "Trabalhar duro sem estratégia é a fórmula pra estagnar. E você trabalha demais.",
      "Enquanto você espera reconhecimento, alguém menos capaz que você tá sendo promovido.",
      "Currículo fraco não é falta de experiência. É falta de posicionamento.",
      "LinkedIn parado é oportunidade perdida. Todo dia.",
      "Aumento não se pede. Se negocia. E existe um jeito certo de fazer isso.",
    ],
    garantias: [
      "7 dias de garantia. Aplique e veja diferença ou receba tudo de volta.",
      "30 dias de garantia. Se em 1 mês seu currículo não render mais entrevistas, devolvemos.",
    ],
    bonus: [
      "Bônus 1: Templates de currículo aprovados por recrutadores",
      "Bônus 2: 50 scripts de mensagem pra LinkedIn",
      "Bônus 3: Simulados de entrevistas com feedback",
    ],
    grupos: [
      { nome: "Carreira 4.0 BR", plataforma: "Telegram", link: "t.me/carreira40br", risco: "baixo", motivo: "Aberto a materiais educativos do nicho." },
      { nome: "Profissionais em Transição", plataforma: "Facebook", link: "facebook.com/groups/profissionaisemtransicao", risco: "medio", motivo: "Aceita post educativo com link no comentário." },
      { nome: "r/BrasildoB", plataforma: "Reddit", link: "reddit.com/r/BrasildoB", risco: "medio", motivo: "Comunidade de trabalho brasileira ativa." },
      { nome: "Comunidade LinkedIn BR", plataforma: "Discord", link: "discord.gg/linkedinbr", risco: "baixo", motivo: "Canal #ferramentas permite indicação." },
      { nome: "Ex-CLT Livres", plataforma: "Telegram", link: "t.me/excltlivres", risco: "baixo", motivo: "Público interessado em desenvolvimento profissional." },
      { nome: "Mulheres na TI", plataforma: "Slack", link: "mulheresnati.slack.com", risco: "medio", motivo: "Compartilhe primeiro, promova depois." },
      { nome: "Talent Brasil", plataforma: "Facebook", link: "facebook.com/groups/talentbrasil", risco: "medio", motivo: "Educativo funciona, spam é banido rápido." },
      { nome: "Skool Carreira Acelerada", plataforma: "Skool", link: "skool.com/carreiraacelerada", risco: "baixo", motivo: "Comunidade paga com público qualificado." },
      { nome: "Emprego Já BR", plataforma: "Telegram", link: "t.me/empregojabr", risco: "baixo", motivo: "Aceita conteúdo útil pro público." },
      { nome: "Fórum de RH Brasil", plataforma: "Fórum", link: "rhforum.com.br", risco: "baixo", motivo: "Fórum permite assinatura com link." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: Você não tá estagnado. Você tá esperando.",
        paragrafos: [
          "A maior parte das pessoas espera. Espera ser notada, promovida, valorizada. E a maior parte espera pra sempre. Porque o mundo do trabalho não recompensa quem espera — recompensa quem se posiciona.",
          "Este guia é sobre parar de esperar. É sobre construir uma carreira ativa, onde você não é escolhida por sobra, mas por escolha.",
          "Prepare-se pra rever coisas. Currículo, LinkedIn, o jeito que você fala, o jeito que você negocia. Nada muda enquanto tudo continua igual.",
        ],
      },
      {
        titulo: "Capítulo 2: O diagnóstico honesto",
        paragrafos: [
          "Onde você tá hoje? Não em cargo — em progresso. Se hoje é igual há 2 anos, você não estagnou. Estagnou já faz tempo. Reconhecer é o primeiro passo.",
          "Faça uma lista: 3 conquistas dos últimos 6 meses. Se você trava, é sinal claro.",
          "Agora liste onde quer estar em 1 ano. Se for igual ao que você é hoje, você não tem meta. Tem rotina.",
        ],
      },
      {
        titulo: "Capítulo 3: Currículo e LinkedIn que abrem portas",
        paragrafos: [
          "Currículo não é biografia. É catálogo. Cada linha tem que gritar 'olha o resultado que eu entrego'. Verbo de ação + número + impacto. É a fórmula.",
          "LinkedIn é a nova entrevista. Foto profissional, headline específica, resumo em primeira pessoa e postagens semanais. Você vira lembrado.",
          "Recrutador não procura o mais qualificado. Procura o mais fácil de encontrar e mais fácil de contratar. Você quer ser esse.",
        ],
      },
      {
        titulo: "Capítulo 4: Networking sem cara de interesse",
        paragrafos: [
          "Networking não é pedir emprego. É construir presença. Comente conteúdo alheio, dê valor antes de pedir, mande mensagem sem link.",
          "3 conexões novas por semana, mensagens personalizadas. Em 6 meses você tem uma rede que abre portas.",
          "A maioria das vagas boas nunca é anunciada. Elas circulam na rede. E rede não se compra — se cultiva.",
        ],
      },
      {
        titulo: "Capítulo 5: A conversa que dobra o salário",
        paragrafos: [
          "Aumento não se pede. Se negocia. E negociação tem preparo, argumentação e timing.",
          "Documente entregas dos últimos 12 meses com números. Pesquise faixa do mercado pra sua função. Marque a conversa (não emboscada).",
          "Use ancoragem alta: peça 20% acima do que quer. E não aceite a primeira contraproposta. Silêncio é sua melhor ferramenta.",
        ],
      },
    ],
  },

  // ============ MARKETING DIGITAL ============
  {
    id: "marketing",
    nome: "Marketing Digital",
    keywords: ["digital", "marketing", "vendas online", "afiliado", "tráfego", "instagram", "seguidores", "influencer", "empreendedor digital"],
    formatos: ["ebook", "curso", "mentoria", "método"],
    dores: [
      "Você posta todo dia e ninguém compra nada",
      "Seus seguidores curtem mas nunca clicam no link",
      "Você gasta com anúncio e o retorno não vem",
      "Todo mundo diz pra fazer conteúdo, mas ninguém fala como monetizar",
      "Você vê iniciante faturando alto enquanto você trava",
    ],
    desejos: [
      "Faturar sua primeira venda online",
      "Escalar seu negócio digital de 5 pra 6 dígitos",
      "Ter previsibilidade de vendas todo mês",
      "Sair da roda hamster de postar sem vender",
      "Construir uma audiência que compra, não só curte",
    ],
    objecoes: [
      "eu não sou influencer",
      "não tenho seguidor",
      "tráfego pago é muito caro",
      "eu não sei o que vender",
      "isso é pra quem já tem grana",
    ],
    beneficios: [
      "Aprenda a vender no orgânico sem depender de tráfego pago",
      "Descubra o nicho lucrativo mesmo que ninguém te conheça",
      "Copywriting que converte curtida em venda",
      "Funil de vendas simples que roda no automático",
      "Estratégia de escala do R$ 0 aos primeiros R$ 10 mil",
    ],
    modulos: [
      "Módulo 1: Escolha do nicho que vende de verdade",
      "Módulo 2: Produto validado antes de gastar um centavo",
      "Módulo 3: Copy que converte — a arte de vender sem parecer que vende",
      "Módulo 4: Tráfego orgânico e como escalar barato",
      "Módulo 5: Funil de vendas automatizado",
      "Módulo 6: Escala — dos R$ 10k aos R$ 100k por mês",
    ],
    headlines: [
      "Como faturar seus primeiros R$ 10 mil na internet mesmo sem seguidores",
      "O método que já ajudou milhares de iniciantes a começarem a vender online",
      "Transforme sua ideia em um negócio digital lucrativo em 90 dias",
    ],
    subheadlines: [
      "Do zero absoluto às primeiras vendas com estratégia real",
      "Sem depender de milhões de seguidores, sem gastar rios em anúncio",
      "Estratégia de quem tá faturando agora, não teoria antiga",
    ],
    angulosCopy: [
      "Você não vende porque não tem seguidor. Vende porque tem oferta. Existe diferença.",
      "Postar todo dia sem estratégia é caminhar no lugar. Sua energia merece direção.",
      "Enquanto você espera engajamento, alguém sem seguidor tá faturando 20 mil no mês.",
      "Vender online não é sobre audiência. É sobre método. E ninguém te ensinou o método certo.",
      "Copy é a diferença entre 100 curtidas e 100 vendas. Adivinha o que a maior parte prioriza.",
    ],
    garantias: [
      "7 dias de garantia total. Se não fizer sentido, devolvemos.",
      "30 dias pra aplicar. Se não tiver progresso, dinheiro de volta na hora.",
    ],
    bonus: [
      "Bônus 1: 30 templates de copy prontos pra colar",
      "Bônus 2: Planilha de análise de nicho lucrativo",
      "Bônus 3: Comunidade de alunos no Discord",
    ],
    grupos: [
      { nome: "Empreendedores Digitais BR", plataforma: "Telegram", link: "t.me/empreendedoresdigitaisbr", risco: "baixo", motivo: "Grupo grande e aberto a material do nicho." },
      { nome: "Afiliados de Sucesso", plataforma: "Facebook", link: "facebook.com/groups/afiliadosdesucesso", risco: "medio", motivo: "Requer conteúdo antes da promoção." },
      { nome: "r/empreendedorismo", plataforma: "Reddit", link: "reddit.com/r/empreendedorismo", risco: "alto", motivo: "Autopromoção só na thread semanal específica." },
      { nome: "Comunidade Digital Growth", plataforma: "Discord", link: "discord.gg/digitalgrowth", risco: "baixo", motivo: "Canal específico pra parceria e material." },
      { nome: "Marketing Digital Brasil", plataforma: "Telegram", link: "t.me/marketingdigitalbrasil", risco: "baixo", motivo: "Público exato do nicho." },
      { nome: "Skool Vendas Digitais", plataforma: "Skool", link: "skool.com/vendasdigitais", risco: "baixo", motivo: "Comunidade paga com público hiperqualificado." },
      { nome: "Instagram Growth BR", plataforma: "Facebook", link: "facebook.com/groups/instagramgrowthbr", risco: "medio", motivo: "Post educativo com CTA suave." },
      { nome: "Copywriters do Brasil", plataforma: "Discord", link: "discord.gg/copywritersbr", risco: "baixo", motivo: "Público que consome material do nicho." },
      { nome: "Empresa Digital Sem Chefe", plataforma: "Telegram", link: "t.me/empresadigitalsemchefe", risco: "baixo", motivo: "Grupo aberto a soluções pagas." },
      { nome: "Fórum Adesita Marketing", plataforma: "Fórum", link: "adesita.com.br", risco: "baixo", motivo: "Fórum tradicional com assinatura permitida." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: A grande mentira do marketing digital",
        paragrafos: [
          "Se você chegou aqui, provavelmente já ouviu que precisa ter milhões de seguidores pra faturar na internet. Ou que precisa de R$ 10 mil em anúncio. Ou que precisa ser influencer.",
          "Mentira. Mentira. Mentira. As três.",
          "O que faz alguém faturar online é: nicho certo, oferta boa, copy afinada e distribuição. Nessa ordem. Seguidor é consequência. Anúncio é acelerador. Influencer é vaidade.",
        ],
      },
      {
        titulo: "Capítulo 2: O nicho que faz a diferença",
        paragrafos: [
          "Nicho errado é sentença de morte. Você pode ter a melhor copy, o melhor produto e o melhor tráfego — se o nicho não paga, você não fatura.",
          "Nicho lucrativo tem 3 características: dor real, poder de compra e urgência. Emagrecimento tem. Finanças tem. Relacionamento tem. Colecionador de miniaturas provavelmente não tem.",
          "Pesquise antes de escolher. Fóruns, Reddit, Amazon. Onde há muita reclamação sobre o mesmo assunto, há dinheiro na mesa.",
        ],
      },
      {
        titulo: "Capítulo 3: A oferta que muda tudo",
        paragrafos: [
          "Oferta boa vende sozinha. Oferta ruim precisa de milagre. E oferta boa é: promessa clara + prova + garantia + urgência.",
          "Prometa um resultado específico num prazo específico. 'Emagreça' é fraco. 'Perca 5kg em 30 dias sem passar fome' é forte.",
          "Prova mata objeção. Depoimento, print, screenshot, número. Cada uma pesa mais que 10 argumentos.",
        ],
      },
      {
        titulo: "Capítulo 4: Copy que converte",
        paragrafos: [
          "Copy não é escrever bonito. É vender. E o segredo é uma fórmula simples: dor + agitação + solução + prova + oferta + call to action.",
          "Comece pela dor. A pessoa precisa se sentir entendida antes de comprar. Se ela lê a headline e pensa 'nossa, é comigo', você já ganhou metade da batalha.",
          "Termine sempre com um call to action direto. Não sugira. Não convide. Ordene com clareza: 'Clique aqui', 'Compre agora'. Verbos fortes convertem.",
        ],
      },
      {
        titulo: "Capítulo 5: Distribuição inteligente",
        paragrafos: [
          "Ter produto sem distribuição é ter cristal na estante — bonito, útil pra ninguém.",
          "Comece no orgânico: 1 conteúdo por dia num único canal principal. Constância bate perfeição.",
          "Quando o orgânico começar a mostrar sinais, entre no pago com R$ 10 por dia. Escalar não é queimar dinheiro — é multiplicar o que já funciona.",
        ],
      },
    ],
  },

  // ============ ESPIRITUALIDADE ============
  {
    id: "espiritualidade",
    nome: "Espiritualidade e Autoconhecimento",
    keywords: ["espiritual", "espiritualidade", "meditação", "autoconhecimento", "ansiedade", "mindfulness", "manifestação", "energia", "gratidão"],
    formatos: ["ebook", "curso", "mentoria", "método", "programa"],
    dores: [
      "Você se sente perdida, sem propósito, à deriva",
      "A ansiedade toma conta e você não sabe como parar",
      "Tudo parece pesado, mesmo quando as coisas estão indo bem",
      "Você sente que a vida tem que ser mais do que isso",
      "Não consegue silenciar a mente por 5 minutos",
    ],
    desejos: [
      "Encontrar paz interior de verdade",
      "Reconectar com seu propósito de vida",
      "Sair do modo automático e sentir a vida",
      "Manifestar a vida que você deseja",
      "Silenciar a mente e viver o presente",
    ],
    objecoes: [
      "meditar é chato",
      "eu não consigo silenciar a mente",
      "isso é coisa de quem tem tempo sobrando",
      "eu não sou uma pessoa espiritualizada",
      "isso é só ilusão",
    ],
    beneficios: [
      "Encontre 15 minutos diários de silêncio real na sua rotina caótica",
      "Reduza a ansiedade em até 60% em 30 dias",
      "Reconecte com seu propósito de vida por meio de práticas simples",
      "Aprenda a meditar mesmo com a mente agitada",
      "Descubra o poder da gratidão como prática de manifestação",
    ],
    modulos: [
      "Módulo 1: O básico da meditação pra quem nunca conseguiu",
      "Módulo 2: Descobrindo seu propósito real",
      "Módulo 3: Práticas diárias de reconexão",
      "Módulo 4: Manifestação consciente (não é magia, é prática)",
      "Módulo 5: Autoconhecimento profundo",
      "Módulo 6: Vivendo em paz — o novo padrão",
    ],
    headlines: [
      "Reconecte com seu propósito e viva em paz em 30 dias, mesmo com uma rotina caótica",
      "O método simples que já ajudou milhares a saírem da ansiedade e encontrarem propósito",
      "Descubra como manifestar a vida que você quer com práticas espirituais de verdade",
    ],
    subheadlines: [
      "Práticas realistas pra quem cansou de viver no automático",
      "Sem incenso obrigatório, sem discurso místico, sem promessa vazia",
      "Baseado em neurociência, filosofia oriental e psicologia moderna",
    ],
    angulosCopy: [
      "Você não tá cansada da vida. Tá cansada de viver ela no automático.",
      "Ansiedade não é sinal de fraqueza. É pedido do seu corpo por presença.",
      "Meditar não é silenciar a mente. É observar sem julgamento. E existe um jeito pra quem trava.",
      "Enquanto você espera 'ter tempo pra se cuidar', a vida passa. 15 minutos por dia mudam tudo.",
      "Propósito não é destino. É bússola. E ela tá dentro de você — só precisa aprender a escutar.",
    ],
    garantias: [
      "7 dias pra experimentar sem risco. Não sentiu o efeito, receba tudo de volta.",
      "Garantia de 30 dias. Aplique por 1 mês. Se sua vida não estiver mais leve, devolvemos.",
    ],
    bonus: [
      "Bônus 1: Áudios guiados de meditação (30 dias)",
      "Bônus 2: Diário de manifestação com prompts diários",
      "Bônus 3: Comunidade de prática no WhatsApp",
    ],
    grupos: [
      { nome: "Autoconhecimento e Presença", plataforma: "Telegram", link: "t.me/autoconhecimentopresenca", risco: "baixo", motivo: "Grupo aberto a material do nicho." },
      { nome: "Meditadores Iniciantes BR", plataforma: "Facebook", link: "facebook.com/groups/meditadoresbr", risco: "medio", motivo: "Post reflexivo com CTA suave funciona." },
      { nome: "r/meditacao_br", plataforma: "Reddit", link: "reddit.com/r/meditacao_br", risco: "medio", motivo: "Comunidade pequena mas engajada." },
      { nome: "Manifestação Consciente", plataforma: "Discord", link: "discord.gg/manifestacaoconsciente", risco: "baixo", motivo: "Canal específico pra recursos e cursos." },
      { nome: "Ansiedade Zero", plataforma: "Telegram", link: "t.me/ansiedadezero", risco: "baixo", motivo: "Público exatamente do nicho." },
      { nome: "Gratidão Diária BR", plataforma: "Facebook", link: "facebook.com/groups/gratidaobr", risco: "medio", motivo: "Post empático com storytelling passa bem." },
      { nome: "Skool Vida Consciente", plataforma: "Skool", link: "skool.com/vidaconsciente", risco: "baixo", motivo: "Comunidade paga qualificada." },
      { nome: "Yoga e Meditação Brasil", plataforma: "Telegram", link: "t.me/yogameditacaobrasil", risco: "baixo", motivo: "Aberto a produtos afins." },
      { nome: "Espiritualidade Sem Rótulo", plataforma: "Discord", link: "discord.gg/espiritualsemrotulo", risco: "baixo", motivo: "Público jovem e receptivo." },
      { nome: "Fórum Autoconhecimento", plataforma: "Fórum", link: "forumautoconhecimento.com", risco: "baixo", motivo: "Assinatura permitida com link." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: Você não tá quebrada. Você tá desconectada.",
        paragrafos: [
          "A gente aprendeu a viver correndo. Correndo pra trabalhar, pra pagar as contas, pra atingir metas, pra ser suficiente. E, no meio dessa corrida, a gente esqueceu de estar.",
          "Se você chegou aqui, é porque algo dentro tá pedindo pra parar. Não é falta de coisa. É excesso de coisa. E o antídoto é presença.",
          "Este guia não vai te trazer respostas prontas. Vai te devolver a pergunta certa. Porque quando a pergunta é boa, a resposta aparece.",
        ],
      },
      {
        titulo: "Capítulo 2: A meditação que funciona pra quem trava",
        paragrafos: [
          "Meditar não é esvaziar a mente. Ninguém consegue. Meditar é observar o pensamento sem se identificar com ele. É diferente. É viável.",
          "Comece com 3 minutos. Sentada, olhos fechados, atenção na respiração. A mente vai divagar. Você volta. Sem julgamento.",
          "Em 30 dias de prática consistente, seu sistema nervoso muda. E você começa a notar antes de reagir. É aí que a paz mora.",
        ],
      },
      {
        titulo: "Capítulo 3: Descobrindo seu propósito",
        paragrafos: [
          "Propósito não é grande. Propósito é presente. É o que você faria se ninguém pagasse. É o que te acende sem esforço.",
          "Faça 3 perguntas: o que me energiza? O que me irrita quando é feito errado? O que eu ensinaria de graça?",
          "Na intersecção dessas 3 respostas mora seu propósito. Não é fórmula mágica. É honestidade.",
        ],
      },
      {
        titulo: "Capítulo 4: Manifestação consciente",
        paragrafos: [
          "Manifestação não é magia. É neurociência. Quando você foca em algo, seu cérebro filtra a realidade em busca dessa coisa. Você atrai o que enxerga.",
          "Escreva o que você quer com clareza. Sinta antecipadamente como se já tivesse. Aja como quem vai receber. Esse é o método completo.",
          "Fé sem ação é ilusão. Ação sem clareza é agitação. Manifestação real é as duas coisas juntas.",
        ],
      },
      {
        titulo: "Capítulo 5: A vida em paz",
        paragrafos: [
          "Paz não é ausência de problema. É presença de você. Você em você. Sem se abandonar quando as coisas apertam.",
          "Práticas diárias sustentam. 10 minutos de silêncio, gratidão consciente, movimento consciente, alimentação com atenção. Coisas pequenas.",
          "A vida não fica melhor. Você é que fica mais equipada. E isso muda tudo.",
        ],
      },
    ],
  },

  // ============ CULINÁRIA ============
  {
    id: "culinaria",
    nome: "Culinária e Confeitaria",
    keywords: ["receita", "cozinha", "confeitaria", "bolo", "doces", "salgados", "fitness", "vegetariano", "vegano", "chef"],
    formatos: ["ebook", "curso", "método"],
    dores: [
      "Você quer cozinhar melhor mas não sabe por onde começar",
      "Os seus doces nunca ficam tão bonitos quanto os das confeiteiras",
      "Falta ideia de refeição e você acaba sempre no mesmo cardápio",
      "Quer aprender a vender doces mas não sabe precificar",
      "Cansou de queimar bolo e desperdiçar ingrediente",
    ],
    desejos: [
      "Cozinhar como uma chef sem sair de casa",
      "Fazer doces profissionais e vender de casa",
      "Ter um cardápio semanal saudável e prático",
      "Impressionar visitas com pratos incríveis",
      "Faturar uma renda extra com o que você já ama fazer",
    ],
    objecoes: [
      "não sei nada de cozinha",
      "não tenho equipamento profissional",
      "não sei precificar",
      "não sei se vou saber vender",
      "não tenho tempo",
    ],
    beneficios: [
      "Domine 50+ receitas testadas passo a passo",
      "Aprenda os fundamentos da confeitaria pra criar sozinha depois",
      "Saiba precificar cada receita pra vender lucrando",
      "Cardápios semanais prontos pra sua família",
      "Truques de chef que fazem qualquer prato ficar profissional",
    ],
    modulos: [
      "Módulo 1: Fundamentos que ninguém te ensinou",
      "Módulo 2: 20 receitas essenciais do dia a dia",
      "Módulo 3: Confeitaria — do bolo simples ao naked cake",
      "Módulo 4: Precificação real pra quem quer vender",
      "Módulo 5: Divulgação e primeiras vendas online",
      "Módulo 6: Escalando — de hobby a negócio",
    ],
    headlines: [
      "Aprenda a cozinhar (e vender) como uma profissional sem sair de casa",
      "50+ receitas testadas e o método que transforma sua cozinha em fonte de renda",
      "Da amadora com medo à confeiteira que vende todo fim de semana",
    ],
    subheadlines: [
      "Um passo a passo real pra quem quer cozinhar bem e faturar com isso",
      "Sem termos técnicos, sem equipamentos caros, sem enrolação",
      "Do prato caseiro à venda profissional",
    ],
    angulosCopy: [
      "Você não precisa de faculdade de gastronomia. Precisa de método.",
      "Já pensou em transformar aquele bolo que todo mundo elogia em renda extra?",
      "Uma receita testada rende 5 vezes o preço dos ingredientes. Basta saber vender.",
      "Precificação errada é o motivo real de muita confeiteira quebrar. Existe uma fórmula certa.",
      "Cozinhar não é dom. É repetição. E com o método certo, você acelera muito.",
    ],
    garantias: [
      "7 dias pra experimentar as primeiras receitas. Não gostou? Devolvemos.",
      "30 dias de garantia. Aplique. Se não render, seu dinheiro volta.",
    ],
    bonus: [
      "Bônus 1: Planilha de precificação automática",
      "Bônus 2: Templates de embalagem e etiqueta",
      "Bônus 3: Comunidade de troca de receitas",
    ],
    grupos: [
      { nome: "Confeiteiras do Brasil", plataforma: "Telegram", link: "t.me/confeiteirasdobrasil", risco: "baixo", motivo: "Grupo enorme e receptivo a material do nicho." },
      { nome: "Cozinha Fácil BR", plataforma: "Facebook", link: "facebook.com/groups/cozinhafacilbr", risco: "medio", motivo: "Receita antes da promoção passa bem." },
      { nome: "r/culinariabr", plataforma: "Reddit", link: "reddit.com/r/culinariabr", risco: "medio", motivo: "Compartilhe receita, promova em seguida." },
      { nome: "Doces e Salgados Business", plataforma: "Telegram", link: "t.me/docessalgadosbusiness", risco: "baixo", motivo: "Público que quer virar profissional." },
      { nome: "Confeitaria Sem Segredos", plataforma: "Facebook", link: "facebook.com/groups/confeitariasemsegredos", risco: "medio", motivo: "Post educativo com CTA suave." },
      { nome: "Skool Padaria Caseira", plataforma: "Skool", link: "skool.com/padariacaseira", risco: "baixo", motivo: "Comunidade paga qualificada." },
      { nome: "Comunidade Confeiteira BR", plataforma: "Discord", link: "discord.gg/confeiteirabr", risco: "baixo", motivo: "Canal específico pra materiais e receitas." },
      { nome: "Cozinha Prática 2.0", plataforma: "Telegram", link: "t.me/cozinhapratica20", risco: "baixo", motivo: "Aberto a material útil." },
      { nome: "Fit e Saudável na Cozinha", plataforma: "Facebook", link: "facebook.com/groups/fitesaudavelcozinha", risco: "medio", motivo: "Cross-nicho de saúde e culinária." },
      { nome: "Fórum Padeiros e Confeiteiros", plataforma: "Fórum", link: "confeiteiros.forumbrasil.net", risco: "baixo", motivo: "Fórum permite assinatura." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: A cozinha é ciência (e você pode dominar)",
        paragrafos: [
          "Cozinhar bem parece dom. Não é. É ciência. Cada receita é uma reação química, cada técnica é uma variável controlada. Quando você entende os fundamentos, cozinhar vira montar quebra-cabeça.",
          "Este guia começa pelo básico que ninguém te ensinou. Como o sal age, por que o ovo é indispensável, quando adicionar cada ingrediente. Uma vez entendido, você improvisa como as grandes.",
          "Se o objetivo é só cozinhar bem em casa, você já tá bem servida com os primeiros três capítulos. Se é virar profissional, siga até o fim.",
        ],
      },
      {
        titulo: "Capítulo 2: Os fundamentos que ninguém te contou",
        paragrafos: [
          "Sal não é só sabor. Sal é textura, cor e realce. Aprender quando e quanto colocar muda 80% dos pratos.",
          "Temperatura importa mais do que técnica. Fogo baixo pra molho, alto pra fritar, médio pra refogar. Erro aqui estraga qualquer receita.",
          "Ingrediente fresco bate técnica sofisticada. Sempre.",
        ],
      },
      {
        titulo: "Capítulo 3: 20 receitas que salvam qualquer semana",
        paragrafos: [
          "Rotina de casa não é MasterChef. É praticidade. Receita boa é aquela que rende, sobra pra próxima refeição e a família come sem reclamar.",
          "Este capítulo traz 20 receitas testadas pra almoço e jantar, mais 5 lanches saudáveis e 5 doces práticos.",
          "Todas rendem 4 porções, levam menos de 40 minutos e usam ingredientes acessíveis. É pra sua rotina real, não pra fotos de Instagram.",
        ],
      },
      {
        titulo: "Capítulo 4: Confeitaria — o passo a passo",
        paragrafos: [
          "Confeitaria é a parte mais científica da culinária. Pequenos erros matam a receita. Mas com precisão, é a coisa mais gratificante que existe.",
          "Bolo básico bem feito é a fundação. Depois vem cobertura, recheio, montagem. Cada camada é uma habilidade nova.",
          "Comece simples: pão de ló, ganache, brigadeiro. Domine. Depois evolua pra naked cake, macaron, entremet. Rota clara evita frustração.",
        ],
      },
      {
        titulo: "Capítulo 5: De cozinheira a empreendedora",
        paragrafos: [
          "Se você chegou até aqui e ainda quer mais, é sinal: você tem material pra virar negócio.",
          "Vender doces exige 3 coisas: qualidade constante, precificação correta e distribuição inteligente. Os capítulos seguintes destrincham cada uma.",
          "Mas antes: valide seu produto. Ofereça amostra pra 10 pessoas fora do seu círculo. Se todas quiserem pagar pra ter mais, você tá pronta.",
        ],
      },
    ],
  },

  // ============ ESTUDOS/CONCURSOS ============
  {
    id: "estudos",
    nome: "Estudos e Concursos",
    keywords: ["concurso", "vestibular", "enem", "estudar", "aprovação", "prova", "faculdade", "medicina", "direito", "oab"],
    formatos: ["ebook", "curso", "método", "cronograma"],
    dores: [
      "Você estuda 8 horas por dia e não é aprovada",
      "A matéria não fica na cabeça, você lê e esquece",
      "Você trava na hora da prova mesmo sabendo o conteúdo",
      "Não consegue conciliar trabalho e estudo",
      "Vê gente com metade do seu esforço sendo aprovada",
    ],
    desejos: [
      "Ser aprovada no concurso dos seus sonhos",
      "Passar na universidade que você sempre quis",
      "Estudar menos horas com muito mais aproveitamento",
      "Reter o conteúdo de verdade, sem esquecer no dia seguinte",
      "Chegar na prova confiante, não desesperada",
    ],
    objecoes: [
      "eu esqueço tudo que estudo",
      "não tenho tempo, trabalho o dia todo",
      "minha cabeça é ruim pra prova",
      "isso é só pra quem tem grana pra cursinho",
      "vou tentar de novo ano que vem",
    ],
    beneficios: [
      "Método de estudo com retenção 3x maior em metade do tempo",
      "Cronograma personalizado pra qualquer concurso ou vestibular",
      "Técnicas científicas de memorização (o cérebro respeita a ciência)",
      "Como controlar o nervosismo na hora da prova",
      "Revisão eficiente que impede o esquecimento",
    ],
    modulos: [
      "Módulo 1: Como o cérebro aprende (o que ninguém te ensinou)",
      "Módulo 2: Técnicas de leitura ativa e retenção",
      "Módulo 3: Montando um cronograma que funciona",
      "Módulo 4: Revisão inteligente e curva do esquecimento",
      "Módulo 5: Controle emocional na hora da prova",
      "Módulo 6: Estratégia final na semana antes da prova",
    ],
    headlines: [
      "O método que ajudou milhares a passarem em concursos e vestibulares em menos tempo",
      "Estude menos, aprove mais: o passo a passo que transforma horas em resultado",
      "Descubra como reter 3x mais conteúdo com metade do esforço",
    ],
    subheadlines: [
      "Baseado em neurociência da aprendizagem — não em achismo motivacional",
      "Pra quem estuda muito e não é aprovada, e pra quem quer estudar melhor",
      "Do zero da preparação à aprovação com estratégia real",
    ],
    angulosCopy: [
      "8 horas por dia lendo. Zero na prova. O problema não é você — é o método.",
      "Concurseiro que passa cedo não estuda mais. Estuda melhor.",
      "Existe uma diferença entre 'ler o conteúdo' e 'aprender o conteúdo'. Adivinha o que você tá fazendo.",
      "Enquanto você lê pela sétima vez, alguém já revisou o capítulo três vezes e sabe de cor.",
      "Nervosismo na prova mata mais aprovação que falta de conteúdo. E tem solução.",
    ],
    garantias: [
      "7 dias de garantia. Se o método não fizer diferença já na primeira semana, devolvemos.",
      "Garantia de 30 dias. Aplique por um mês. Se seu rendimento não subir, dinheiro de volta.",
    ],
    bonus: [
      "Bônus 1: Cronogramas prontos pros 10 concursos mais concorridos",
      "Bônus 2: 100 mapas mentais das matérias mais cobradas",
      "Bônus 3: Grupo semanal de accountability com outros alunos",
    ],
    grupos: [
      { nome: "Concurseiros de Elite", plataforma: "Telegram", link: "t.me/concurseirosdeelite", risco: "baixo", motivo: "Grupo receptivo a materiais do nicho." },
      { nome: "Vestibulandos Brasil", plataforma: "Facebook", link: "facebook.com/groups/vestibulandosbrasil", risco: "medio", motivo: "Aceita post educativo com CTA no comentário." },
      { nome: "r/estudosconcursos", plataforma: "Reddit", link: "reddit.com/r/estudosconcursos", risco: "medio", motivo: "Compartilhe estratégia antes do link." },
      { nome: "OAB de Primeira", plataforma: "Telegram", link: "t.me/oabdeprimeira", risco: "baixo", motivo: "Público hiperqualificado do subnicho." },
      { nome: "Concursos Federais", plataforma: "Facebook", link: "facebook.com/groups/concursosfederais", risco: "medio", motivo: "Educativo passa, spam é banido." },
      { nome: "ENEM 1000 na Redação", plataforma: "Discord", link: "discord.gg/enem1000", risco: "baixo", motivo: "Canal específico pra materiais." },
      { nome: "Skool Aprovados", plataforma: "Skool", link: "skool.com/aprovados", risco: "baixo", motivo: "Comunidade paga qualificada." },
      { nome: "Estudantes de Medicina", plataforma: "Telegram", link: "t.me/estudantesmedicinabrasil", risco: "baixo", motivo: "Nicho específico, alto ticket." },
      { nome: "Direito Concurso Público", plataforma: "Facebook", link: "facebook.com/groups/direitoconcurso", risco: "medio", motivo: "Post relevante ao subnicho." },
      { nome: "Fórum Concurseiros Brasil", plataforma: "Fórum", link: "concurseirosbrasil.com", risco: "baixo", motivo: "Fórum antigo com assinatura permitida." },
    ],
    capitulosPdf: [
      {
        titulo: "Capítulo 1: Por que 8 horas de estudo não te aprovam",
        paragrafos: [
          "Se você estuda 8 horas por dia e não passa, o problema não é dedicação. É método. Você tá construindo casa com prego, quando existe parafuso.",
          "O cérebro tem regras claras pra aprender. Repetição espaçada, recuperação ativa, contexto emocional. Quando você ignora as regras, o esforço vaza.",
          "Este guia te ensina as regras. Aplicando, você estuda menos e retém mais. Simples assim.",
        ],
      },
      {
        titulo: "Capítulo 2: Como o cérebro aprende (de verdade)",
        paragrafos: [
          "Existem 3 fases: exposição, consolidação e recuperação. A maioria dos concurseiros só faz a primeira. Lê, lê, lê. E esquece.",
          "Consolidação acontece no sono, na revisão espaçada e no cruzamento com outros conteúdos. Sem isso, tudo evapora.",
          "Recuperação é o mais poderoso. Testar o conhecimento fixa o conhecimento. Simulado não é depois — é durante o estudo.",
        ],
      },
      {
        titulo: "Capítulo 3: O cronograma que funciona",
        paragrafos: [
          "Cronograma ruim é o que promete estudar 12 horas e a pessoa quebra na terceira semana. Cronograma bom respeita descanso, revisão e sua vida real.",
          "Divida a semana: 5 dias de estudo intenso, 1 de revisão profunda, 1 de descanso completo. Sem culpa no dia de descanso — é biologia, não preguiça.",
          "Bloco de estudo eficaz: 50 minutos foco absoluto, 10 minutos pausa. Repetir 4 vezes. Total: 4 horas úteis. Mais que isso rende cada vez menos.",
        ],
      },
      {
        titulo: "Capítulo 4: Revisão inteligente",
        paragrafos: [
          "Curva do esquecimento é a inimiga silenciosa. Você esquece 70% do conteúdo em 24h se não revisar. Mas basta 5 minutos de revisão pra reverter.",
          "Revisão espaçada: 1 dia, 3 dias, 7 dias, 14 dias, 30 dias. Cada revisão renova a memória por mais tempo.",
          "Use flashcards, mapa mental, ensinar em voz alta. Recuperação ativa é o segredo. Ler de novo é o pior método existente.",
        ],
      },
      {
        titulo: "Capítulo 5: A prova é psicológica",
        paragrafos: [
          "Você chega na prova sabendo o conteúdo. E trava. Não é você — é seu sistema nervoso reagindo. E existe treino pra isso.",
          "Simulados semanais com tempo cronometrado condicionam o corpo. Quanto mais simulados, menos ansiedade no dia real.",
          "No dia da prova: dormiu bem, comeu bem, chegou cedo. Respire fundo antes de ler. E lembre: você chegou até aqui, o pior já passou.",
        ],
      },
    ],
  },
];

/**
 * Nicho genérico usado quando nenhum específico bate.
 * Permite aceitar qualquer entrada do usuário sem quebrar.
 */
export const NICHO_GENERICO: Nicho = {
  id: "generico",
  nome: "Genérico",
  keywords: [],
  formatos: ["ebook", "curso", "método", "guia"],
  dores: [
    "Você tenta há tempos mas os resultados não vêm",
    "Sente que tá desperdiçando tempo e energia",
    "Vê outros conseguindo e não entende o que falta",
    "Já investiu em coisa que não funcionou",
    "Está travada num ciclo que se repete",
  ],
  desejos: [
    "Ter resultado concreto em pouco tempo",
    "Sair do ponto onde você está travada",
    "Ganhar clareza sobre o próximo passo",
    "Conquistar aquilo que parecia impossível",
    "Ter previsibilidade no seu progresso",
  ],
  objecoes: [
    "não tenho tempo",
    "já tentei e não deu certo",
    "não sei se vou conseguir",
    "meu caso é diferente",
    "não posso investir agora",
  ],
  beneficios: [
    "Passo a passo aplicável desde o primeiro dia",
    "Resultados visíveis em até 30 dias",
    "Método que funciona mesmo com pouco tempo disponível",
    "Estratégia direta, sem enrolação",
    "Comunidade de apoio pra você não travar",
    "Bônus exclusivos pra acelerar sua jornada",
  ],
  modulos: [
    "Módulo 1: Diagnóstico honesto do ponto de partida",
    "Módulo 2: Os fundamentos essenciais",
    "Módulo 3: A rotina que produz resultado",
    "Módulo 4: Os erros que travam a maioria",
    "Módulo 5: Estratégia de aceleração",
    "Módulo 6: Manutenção e evolução contínua",
  ],
  headlines: [
    "Descubra o método que já transformou a vida de milhares de pessoas",
    "O passo a passo prático pra sair do ponto onde você está",
    "Resultado real em 30 dias — mesmo pra quem já tentou de tudo",
  ],
  subheadlines: [
    "Um caminho claro pra quem cansou de tentar sozinha",
    "Sem enrolação, sem promessa impossível, sem gasto absurdo",
    "Método completo, do zero ao resultado",
  ],
  angulosCopy: [
    "Você não tá parada porque quer. Tá parada porque nunca teve o método certo.",
    "Enquanto você espera o momento ideal, alguém já começou.",
    "O que separa quem consegue de quem não consegue não é talento. É método.",
    "Se você chegou até aqui, é porque tá pronta pra fazer diferente.",
    "Resultado não é sobre esforço. É sobre direção.",
  ],
  garantias: [
    "7 dias pra experimentar. Não gostou, devolvemos tudo.",
    "30 dias de garantia total. Sem risco pra você.",
  ],
  bonus: [
    "Bônus 1: Comunidade exclusiva de alunos",
    "Bônus 2: Materiais de apoio semanais",
    "Bônus 3: Sessão de tira-dúvidas mensal",
  ],
  grupos: [
    { nome: "Comunidade Aberta BR", plataforma: "Telegram", link: "t.me/comunidadeabertabr", risco: "baixo", motivo: "Grupo generalista aberto a divulgação." },
    { nome: "Empreendedores Brasil", plataforma: "Facebook", link: "facebook.com/groups/empreendedoresbrasil", risco: "medio", motivo: "Aceita post educativo." },
    { nome: "r/brasil", plataforma: "Reddit", link: "reddit.com/r/brasil", risco: "alto", motivo: "Autopromoção só na thread semanal específica." },
    { nome: "Discord Networking BR", plataforma: "Discord", link: "discord.gg/networkingbr", risco: "baixo", motivo: "Canal #recursos permite compartilhar." },
    { nome: "Skool Brasileiros", plataforma: "Skool", link: "skool.com/brasileiros", risco: "baixo", motivo: "Comunidade paga qualificada." },
    { nome: "Grupo Comunicação Ativa", plataforma: "Telegram", link: "t.me/comunicacaoativa", risco: "baixo", motivo: "Aberto a materiais úteis." },
    { nome: "Trabalho e Renda BR", plataforma: "Facebook", link: "facebook.com/groups/trabalhoerendabr", risco: "medio", motivo: "Post educativo aceito." },
    { nome: "Discord Iniciantes", plataforma: "Discord", link: "discord.gg/iniciantesbr", risco: "baixo", motivo: "Público jovem e receptivo." },
    { nome: "Fórum Diversos BR", plataforma: "Fórum", link: "diversosbr.forumbrasil.net", risco: "baixo", motivo: "Fórum aberto com assinatura permitida." },
    { nome: "Telegram Oportunidades", plataforma: "Telegram", link: "t.me/oportunidadesbr", risco: "baixo", motivo: "Aberto a produtos digitais." },
  ],
  capitulosPdf: [
    {
      titulo: "Capítulo 1: Você não precisa fazer mais. Precisa fazer diferente.",
      paragrafos: [
        "Se você chegou aqui, provavelmente já se esforçou. Muito. E a sensação é a de que esforço não tá mais bastando. E não tá mesmo.",
        "O que separa quem consegue de quem não consegue quase nunca é esforço. É direção. Método. Ordem certa das coisas.",
        "Este guia é um mapa. Não vai fazer o caminho por você, mas vai mostrar onde pisar pra chegar mais rápido — e sem precisar redobrar o cansaço.",
      ],
    },
    {
      titulo: "Capítulo 2: O diagnóstico honesto",
      paragrafos: [
        "Antes de qualquer estratégia, é preciso saber onde você está. E não é onde você acha que está — é onde você está de verdade.",
        "Pega papel e caneta. Anote: 3 coisas que estão funcionando na sua vida, 3 que não estão, e 1 padrão que se repete há mais de 1 ano.",
        "O padrão que se repete é o que você vai atacar primeiro. Ali mora o desbloqueio.",
      ],
    },
    {
      titulo: "Capítulo 3: Os fundamentos que você pulou",
      paragrafos: [
        "Todo resultado sustentável se apoia em 4 pilares: clareza do objetivo, rotina de ação, revisão semanal e comunidade de apoio.",
        "Sem clareza, você anda em círculo. Sem rotina, você depende de motivação — que é volátil. Sem revisão, você não ajusta. Sem comunidade, você desiste sozinha.",
        "Nas próximas semanas, você vai construir cada um desses pilares. Um por vez. Sem pressa.",
      ],
    },
    {
      titulo: "Capítulo 4: Ação que vira resultado",
      paragrafos: [
        "Ação sem estratégia é agitação. Estratégia sem ação é sonho. O que gera resultado é a interseção das duas.",
        "Regra dos 3: 3 ações prioritárias por dia. Nada além disso. Feito com foco > feito muito.",
        "No fim de cada dia, marque quais fez. No fim da semana, veja o padrão. Ali mora seu diagnóstico contínuo.",
      ],
    },
    {
      titulo: "Capítulo 5: Manutenção — o segredo pra não voltar",
      paragrafos: [
        "Todo mundo consegue mudança por 30 dias. Motivação sustenta. O desafio é o dia 90, 180, 365.",
        "Manutenção não é motivação. É sistema. Rotina automatizada, ambiente adaptado, gatilhos de retomada quando você derrapar (porque vai derrapar).",
        "Você não vai virar outra pessoa. Vai virar uma versão consistente da que você já é. E isso muda tudo.",
      ],
    },
  ],
};

/**
 * Encontra o nicho mais próximo baseado no input do usuário.
 */
export function encontrarNicho(inputNicho: string): Nicho {
  const input = inputNicho.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  let melhor: { nicho: Nicho; score: number } = { nicho: NICHO_GENERICO, score: 0 };

  for (const n of NICHOS) {
    let score = 0;
    for (const kw of n.keywords) {
      if (input.includes(kw)) score += kw.length;
    }
    if (input.includes(n.nome.toLowerCase())) score += 20;
    if (score > melhor.score) melhor = { nicho: n, score };
  }

  return melhor.nicho;
}
