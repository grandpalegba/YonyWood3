import { 
  Documentary, 
  Protagonist, 
  Duo, 
  Videographer, 
  CommunityReviewItem, 
  BackOfficeApplication,
  ReviewCandidate,
  SeriesAffiliationTree,
  AffiliationPerson
} from '../types';

export const DOCUMENTARIES: Documentary[] = [
  {
    id: 'jesus-legba',
    slug: 'jesus-legba',
    title: 'Révélation < > Tradition',
    subtitle: 'Deux traditions. Une même question de foi.',
    centralQuestion: 'La foi',
    shortSynopsis: 'Quand la ferveur chrétienne et le culte vodoun dialoguent d’égal à égal au Bénin face aux grands mystères humains : l’épreuve, le pardon et la réconciliation.',
    description: 'Au Bénin, berceau du culte des ancêtres et terre de ferveur biblique, deux croyances cohabitent sous le même toit sans jamais s’affronter frontalement. Cette série met en miroir des dévots du Vodoun Legba — gardien des carrefours, messager de l\'invisible et protecteur des seuils — avec des pasteurs, religieuses et fidèles chrétiens. Face aux grands mystères humains (l\'épreuve de la maladie, le pardon, le deuil, l\'abandon à une puissance supérieure), leurs rituels, louanges et oraisons silencieuses dialoguent d\'égal à égal, révélant la quête universelle d\'une foi incarnée.',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    teaserDuration: '1:15',
    universes: [
      {
        name: 'Révélation',
        tagline: 'L’espérance chrétienne et le don de soi',
        description: 'Parcours de foi ecclésiale, d’oraison silencieuse, d’accueil du prochain et d’engagement au cœur des communautés contemporaines.',
        territory: 'Bénin (Littoral) & Diaspora'
      },
      {
        name: 'Tradition',
        tagline: 'Le gardien des carrefours et des seuils sacrés',
        description: 'Spiritualité vodoun ancestrale où Legba ouvre les voies, protège les demeures et relie le monde visible aux forces cosmiques.',
        territory: 'Bénin (Allada, Abomey, Ouidah)'
      }
    ],
    questions: [
      {
        number: '01',
        title: 'LA RENCONTRE',
        prompt: 'Racontez-nous un moment de votre vie où vous avez réellement rencontré votre foi. Que s\'est-il passé ?',
        audioDuration: '0:42',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        audioVoiceName: 'Dah Zounon & Père Matthieu',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous un moment de votre vie où vous avez réellement rencontré votre foi. Que s\'est-il passé ?' },
          { lang: 'fon', label: 'Fongbe', prompt: 'Mǐ ɖɔ xó dó hwenu e a mɔ nùɖiɖi towe nugbó nugbó é wú. Etɛ ka jɛ ?' },
          { lang: 'quz', label: 'Quechua', prompt: 'Willawayku huk pacha kawsayniykipi maypichus iñiyta riqsirqanki. Imataq karqan ?' },
          { lang: 'wol', label: 'Wolof', prompt: 'Nettali nu jamono ci sa dundu bu nga gisee sa ngëm dëgg dëgg. Lu xewoon ?' },
          { lang: 'es', label: 'Español', prompt: 'Cuéntanos un momento de tu vida en el que realmente encontraste tu fe. ¿Qué ocurrió?' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a moment in your life when you truly encountered your faith. What happened?' }
        ]
      },
      {
        number: '02',
        title: 'L\'ÉPREUVE',
        prompt: 'Racontez-nous une épreuve ou un moment difficile de votre vie où votre foi a été mise à l\'épreuve. Qu\'avez-vous vécu ?',
        audioDuration: '0:38',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        audioVoiceName: 'Sœur Blandine Dossou',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une épreuve ou un moment difficile de votre vie où votre foi a été mise à l\'épreuve. Qu\'avez-vous vécu ?' },
          { lang: 'fon', label: 'Fongbe', prompt: 'Mǐ ɖɔ tagba ɖé e a mɔ bɔ nùɖiɖi towe dán é wú. Nɛ̌ a ka zɔn gbɔn ?' },
          { lang: 'wol', label: 'Wolof', prompt: 'Nettali nu jafe-jafe bu metti ci sa dundu bu nattu sa ngëm. Lo dunde ?' },
          { lang: 'es', label: 'Español', prompt: 'Cuéntanos una prueba o momento difícil en el que tu fe fue puesta a prueba. ¿Qué viviste?' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a trial or difficult moment when your faith was tested. What did you experience?' }
        ]
      },
      {
        number: '03',
        title: 'LA TRANSMISSION',
        prompt: 'Si vous pouviez transmettre une seule chose de votre foi à quelqu\'un qui cherche aujourd\'hui son chemin, quelle histoire de votre vie lui raconteriez-vous pour lui montrer ce qu\'elle représente pour vous ?',
        audioDuration: '0:45',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        audioVoiceName: 'Père Matthieu',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Si vous pouviez transmettre une seule chose de votre foi à quelqu\'un qui cherche aujourd\'hui son chemin, quelle histoire de votre vie lui raconteriez-vous ?' },
          { lang: 'fon', label: 'Fongbe', prompt: 'Enyi a sixú na nùɖé mɛɖé dó nùɖiɖi towe mɛ, tan tɛ a na ɖɔ n\'i ?' },
          { lang: 'es', label: 'Español', prompt: 'Si pudieras transmitir una sola cosa de tu fe a alguien que busca su camino, ¿qué historia le contarías?' },
          { lang: 'en', label: 'English', prompt: 'If you could pass on just one thing from your faith to someone seeking their path, what story would you tell?' }
        ]
      },
      {
        number: '04',
        title: 'LA PERSONNE QUI VOUS A CHANGÉ',
        prompt: 'Racontez-nous l\'histoire d\'une personne que votre foi a mise sur votre chemin et qui a profondément changé votre manière de voir la vie. Qu\'avez-vous appris d\'elle ?',
        audioDuration: '0:49',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        audioVoiceName: 'Dah Zounon',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous l\'histoire d\'une personne que votre foi a mise sur votre chemin et qui a profondément changé votre manière de voir la vie.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about someone your faith brought into your life who deeply changed the way you see the world.' }
        ]
      },
      {
        number: '05',
        title: 'L\'HÉRITAGE',
        prompt: 'Imaginez que dans cent ans, quelqu\'un découvre votre histoire sans jamais vous avoir rencontré. Quelle histoire de votre vie voudriez-vous qu\'il connaisse pour comprendre ce que votre foi vous a appris ?',
        audioDuration: '0:52',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        audioVoiceName: 'Voix de la Communauté',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Imaginez que dans cent ans, quelqu\'un découvre votre histoire sans jamais vous avoir rencontré. Quelle histoire voudriez-vous qu\'il connaisse ?' },
          { lang: 'en', label: 'English', prompt: 'Imagine that in a hundred years someone discovers your story. What story would you want them to know?' }
        ]
      }
    ],
    episodeCount: 5,
    protagonistsCount: 8,
    territories: ['Ouidah', 'Cotonou', 'Allada', 'Abomey']
  },
  {
    id: 'finagnon-qosqorico',
    slug: 'finagnon-qosqorico',
    title: 'Finagnon < > Qosqorico',
    subtitle: 'Bénin < > Pérou. Deux territoires. Une même réflexion sur ce qui nous relie à un lieu.',
    centralQuestion: 'Le territoire',
    shortSynopsis: 'Des cités lacustres de Ganvié aux cimes sacrées de Cusco et Pisac, pêcheurs et paysans dialoguent sur l’enracinement, l’eau, la montagne et l’amour inconditionnel d’une terre.',
    description: 'Des cités lacustres de Ganvié, bâties sur pilotis pour échapper aux razzias du Dahomey, jusqu\'aux terrasses millénaires de Pisac et Cusco au Pérou, perchées à 3 400 mètres d\'altitude. Finagnon < > Qosqorico réunit des pêcheurs toffinou et des paysans quechuas gardiens de la Pachamama. Comment habite-t-on l\'eau ou la roche sacrée ? Que ressent-on lorsqu\'il faut quitter sa lagune ou sa cordillère, et que retrouve-t-on en revenant ? Une épopée intime sur la mémoire des terres nourricières et la résistance poétique des peuples autochtones face à l\'exil.',
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    teaserDuration: '1:45',
    universes: [
      {
        name: 'Finagnon',
        tagline: 'La mémoire lacustre et la terre rouge du golfe de Guinée',
        description: 'Des cités sur pilotis de Ganvié aux collines argileuses, un dialogue perpétuel entre l’eau bienfaitrice et l’enracinement des aïeux.',
        territory: 'Bénin (Ganvié, Grand-Popo)'
      },
      {
        name: 'Qosqorico',
        tagline: 'Les cimes andines et le souffle des terrasses sacrées',
        description: 'Entre Cusco et la Vallée Sacrée, la relation intime à la Pachamama, la pierre millénaire et la culture vivante des hauts plateaux.',
        territory: 'Pérou (Cusco, Vallée Sacrée, Pisac)'
      }
    ],
    questions: [
      {
        number: '01',
        title: 'CHEZ SOI',
        prompt: 'Racontez-nous un moment où vous avez compris que vous étiez vraiment chez vous. Où étiez-vous et que s\'est-il passé ?',
        audioDuration: '0:40',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        audioVoiceName: 'Tobi & Sayri (Bénin / Pérou)',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous un moment où vous avez compris que vous étiez vraiment chez vous. Où étiez-vous et que s\'est-il passé ?' },
          { lang: 'quz', label: 'Quechua', prompt: 'Willawayku maypichus yacharqanki wasiykipi kashasqaykita. Maypitaq karqanki, imataq pasarqan ?' },
          { lang: 'fon', label: 'Fongbe', prompt: 'Mǐ ɖɔ hwenu e a mɔ ɖɔ émí ɖò xwégbe nugbó é wú. Fitɛ a ka ɖè bɔ etɛ jɛ ?' },
          { lang: 'es', label: 'Español', prompt: 'Cuéntanos un momento en el que comprendiste que realmente estabas en tu hogar. ¿Dónde estabas y qué sucedió?' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a moment when you realized you were truly home. Where were you and what happened?' }
        ]
      },
      {
        number: '02',
        title: 'PARTIR',
        prompt: 'Racontez-nous une fois où vous avez dû quitter un lieu qui comptait profondément pour vous. Qu\'avez-vous ressenti en partant ?',
        audioDuration: '0:36',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        audioVoiceName: 'Koffi Tisserand',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une fois où vous avez dû quitter un lieu qui comptait profondément pour vous. Qu\'avez-vous ressenti en partant ?' },
          { lang: 'quz', label: 'Quechua', prompt: 'Willawayku huk kuti maypichus ripuyta atirqanki munakusqayki llaqtaykimanta. Imaynataq qhawarikurqanki ?' },
          { lang: 'es', label: 'Español', prompt: 'Cuéntanos una vez en que tuviste que dejar un lugar que amabas profundamente. ¿Qué sentiste al marcharte?' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a time when you had to leave a place that meant the world to you. What did you feel leaving?' }
        ]
      },
      {
        number: '03',
        title: 'REVENIR',
        prompt: 'Racontez-nous votre histoire d\'un retour dans un lieu qui avait changé — ou qui vous avait changé. Qu\'avez-vous découvert en y revenant ?',
        audioDuration: '0:44',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        audioVoiceName: 'Amara Tisserande',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous votre histoire d\'un retour dans un lieu qui avait changé — ou qui vous avait changé. Qu\'avez-vous découvert en y revenant ?' },
          { lang: 'en', label: 'English', prompt: 'Tell us your story of returning to a place that had changed — or had changed you. What did you discover?' }
        ]
      },
      {
        number: '04',
        title: 'CE QUI RESTE',
        prompt: 'Racontez-nous quelque chose de votre territoire que vous avez reçu de ceux qui étaient là avant vous et que vous voulez absolument préserver. Pourquoi ?',
        audioDuration: '0:48',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        audioVoiceName: 'Piroguiers de Ganvié',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous quelque chose de votre territoire reçu des aïeux et que vous voulez absolument préserver.' },
          { lang: 'es', label: 'Español', prompt: 'Cuéntanos algo de tu territorio que recibiste de los antiguos y que quieres preservar.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about something from your territory inherited from those before you that you wish to preserve.' }
        ]
      },
      {
        number: '05',
        title: 'DEMAIN',
        prompt: 'Imaginez que quelqu\'un découvre votre territoire dans cent ans. Quelle histoire aimeriez-vous qu\'il connaisse pour comprendre ce que ce lieu représente pour vous ?',
        audioDuration: '0:50',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        audioVoiceName: 'Chant Collectif Ganvié & Andes',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Imaginez que quelqu\'un découvre votre territoire dans cent ans. Quelle histoire aimeriez-vous qu\'il connaisse ?' },
          { lang: 'en', label: 'English', prompt: 'Imagine that someone discovers your land in a hundred years. What story would you want them to know?' }
        ]
      }
    ],
    episodeCount: 5,
    protagonistsCount: 6,
    territories: ['Ganvié (Bénin)', 'Cusco (Pérou)', 'Grand-Popo', 'Pisac']
  },
  {
    id: 'blacks-one-beyond-eve',
    slug: 'blacks-one-beyond-eve',
    title: 'Blacks One < > Beyond Eve',
    subtitle: 'Deux expériences collectives. Une exploration de l\'identité et de ce que nous devenons.',
    centralQuestion: 'L\'identité',
    shortSynopsis: 'Entre la vitalité urbaine des collectifs de hip-hop à Dakar et les cercles de femmes créatrices d’Abidjan et d’Europe, une quête collective pour réinventer notre souveraineté intime.',
    description: 'À Dakar, la jeunesse se réapproprie l\'espace public par le verbe, le hip-hop et la fraternité des rues (Blacks One), transformant la précarité en dignité collective. En miroir, entre Abidjan, Marseille et Bruxelles, des cercles de femmes créatrices, artisanes et chercheuses (Beyond Eve) dénouent les carcans patriarcaux pour réinventer la filiation et la puissance du matrimoine. Deux mouvements d\'émancipation qui posent la question cruciale : comment s\'affranchir du regard imposé par l\'histoire pour forger, ensemble, notre propre identité ?',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    teaserDuration: '1:30',
    universes: [
      {
        name: 'Blacks One',
        tagline: 'L’affirmation par le rythme, le verbe et la fraternité',
        description: 'Collectifs artistiques et urbains forgeant des espaces de dignité, de création partagée et de reconquête des récits d’émancipation.',
        territory: 'Dakar & banlieues francophones'
      },
      {
        name: 'Beyond Eve',
        tagline: 'La réinvention de la lignée féminine et du devenir',
        description: 'Cercles de transmission intergénérationnelle où femmes artistes, chercheuses et artisanes dénouent les stéréotypes pour tisser un futur souverain.',
        territory: 'Abidjan, Marseille & Bruxelles'
      }
    ],
    questions: [
      {
        number: '01',
        title: 'QUI SUIS-JE ?',
        prompt: 'Racontez-nous un moment de votre vie où quelque chose vous a fait comprendre qui vous étiez vraiment. Que s\'est-il passé ?',
        audioDuration: '0:39',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        audioVoiceName: 'Malik & Éléonore',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous un moment de votre vie où quelque chose vous a fait comprendre qui vous étiez vraiment. Que s\'est-il passé ?' },
          { lang: 'wol', label: 'Wolof', prompt: 'Nettali nu jamono ci sa dundu bu la yëggal koo doon dëgg dëgg. Lu xewoon ?' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a moment in your life when something made you realize who you truly were. What happened?' }
        ]
      },
      {
        number: '02',
        title: 'LE REGARD DES AUTRES',
        prompt: 'Racontez-nous une fois où le regard de quelqu\'un sur vous a changé votre manière de vous regarder vous-même. Qu\'avez-vous vécu ?',
        audioDuration: '0:43',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        audioVoiceName: 'Éléonore (Marseille)',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une fois où le regard de quelqu\'un a changé votre manière de vous regarder vous-même.' },
          { lang: 'wol', label: 'Wolof', prompt: 'Nettali nu benn yoon bu xoolu nit soppi ni nga doon gise sa bopp.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a time when the gaze of someone else altered the way you looked at yourself.' }
        ]
      },
      {
        number: '03',
        title: 'CE QUE L\'ON PORTE',
        prompt: 'Racontez-nous quelque chose que vous avez reçu de votre histoire, de votre famille ou de ceux qui vous ont précédé et que vous portez encore aujourd\'hui. Qu\'est-ce que cela représente pour vous ?',
        audioDuration: '0:47',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        audioVoiceName: 'Malik Barou (Dakar)',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous quelque chose que vous avez reçu de votre histoire ou de vos ancêtres et que vous portez encore aujourd\'hui.' },
          { lang: 'wol', label: 'Wolof', prompt: 'Nettali nu mbir moo jot ci sa cosaan walla sa waajur te nga wéy di ko yóbbante tay.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about something you inherited from your family or history that you carry with you to this day.' }
        ]
      },
      {
        number: '04',
        title: 'DEVENIR',
        prompt: 'Racontez-nous un moment où vous avez compris que vous étiez en train de devenir quelqu\'un de différent de ce que vous aviez imaginé. Qu\'est-ce qui avait changé ?',
        audioDuration: '0:41',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        audioVoiceName: 'Collectif Beyond Eve',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous un moment où vous avez compris que vous deveniez quelqu\'un de différent de ce que vous aviez imaginé.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a moment when you realized you were becoming someone different from what you had imagined.' }
        ]
      },
      {
        number: '05',
        title: 'À CELUI QUI VIENDRA',
        prompt: 'Racontez-nous une histoire de votre vie que vous aimeriez transmettre à quelqu\'un qui viendra après vous pour l\'aider à comprendre quelque chose que vous avez appris.',
        audioDuration: '0:50',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        audioVoiceName: 'Ablaye Cissoko & Voix Dakar',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une histoire de votre vie que vous aimeriez transmettre à la génération suivante.' },
          { lang: 'en', label: 'English', prompt: 'Tell us a story from your life that you would like to pass down to future generations.' }
        ]
      }
    ],
    episodeCount: 5,
    protagonistsCount: 6,
    territories: ['Dakar', 'Abidjan', 'Paris', 'Marseille']
  },
  {
    id: 'dixeat-fiat-luxe',
    slug: 'dixeat-fiat-luxe',
    title: 'Dixeat < > Fiat Luxe',
    subtitle: 'Ceux qui nourrissent les autres < > ceux qui créent des expériences d\'exception.',
    centralQuestion: 'L\'expérience',
    shortSynopsis: 'Des marmites populaires de Dantokpa aux tables d’exception à Paris et Milan, des artisans de bouche et scénographes révèlent l’art du don, du détail et du souvenir impérissable.',
    description: 'Dans la fumée des marmites de Dantokpa à Cotonou, Dixeat incarne l\'artisanat nourricier populaire : des femmes et cuisiniers qui se lèvent à 4h du matin pour offrir réconfort et dignité à des centaines de travailleurs avec une sauce gombo ou un igname pilé. En écho, Fiat Luxe explore la haute précision des arts de la table, de la scénographie olfactive et de l\'hospitalité d\'exception à Paris, Marrakech et Milan. Tout les sépare en apparence, sauf l\'essentiel : l\'obsession du détail, la générosité du don et la grâce de transformer un simple repas en un souvenir inoubliable.',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    teaserDuration: '1:20',
    universes: [
      {
        name: 'Dixeat',
        tagline: 'L’artisanat nourricier populaire et la générosité brute',
        description: 'La chaleur des marmites de rue, l’igname pilée au lever du jour, le partage sans fard où chaque repas est un pacte de solidarité.',
        territory: 'Cotonou, Dantokpa & marchés ouest-africains'
      },
      {
        name: 'Fiat Luxe',
        tagline: 'La haute scénographie du détail et le temps suspendu',
        description: 'L’orfèvrerie des arts de la table, la scénographie olfactive, la précision du geste qui transforme l’éphémère en mémoire inoubliable.',
        territory: 'Paris, Marrakech, Milan'
      }
    ],
    questions: [
      {
        number: '01',
        title: 'LE GOÛT',
        prompt: 'Racontez-nous un moment où vous avez créé quelque chose pour quelqu\'un et où vous avez compris, à sa réaction, que vous lui aviez vraiment fait plaisir. Qu\'est-ce qui s\'est passé ?',
        audioDuration: '0:35',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        audioVoiceName: 'Chef Koffi & Hélène',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous un moment où vous avez créé quelque chose pour quelqu\'un et où vous avez compris que vous lui aviez vraiment fait plaisir.' },
          { lang: 'fon', label: 'Fongbe', prompt: 'Mǐ ɖɔ hwenu e a bló nùɖé nú mɛɖé bɔ a mɔ ɖɔ é víví n\'i tawun é wú.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a time when you created something for someone and realized you had truly brought them joy.' }
        ]
      },
      {
        number: '02',
        title: 'L\'ATTENTION',
        prompt: 'Racontez-nous une fois où vous avez accordé une attention particulière à quelqu\'un pour lui offrir quelque chose qu\'il n\'oublierait pas. Pourquoi avez-vous voulu faire cela pour cette personne ?',
        audioDuration: '0:44',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        audioVoiceName: 'Hélène Saint-Amand',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une fois où vous avez accordé une attention particulière à quelqu\'un pour lui offrir quelque chose qu\'il n\'oublierait pas.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a time you paid special attention to someone to give them something unforgettable.' }
        ]
      },
      {
        number: '03',
        title: 'LE DÉTAIL',
        prompt: 'Racontez-nous une expérience que vous avez créée et dont vous vous souvenez encore à cause d\'un tout petit détail. Pourquoi ce détail avait-il autant d\'importance ?',
        audioDuration: '0:42',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        audioVoiceName: 'Chef Koffi (Dantokpa)',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une expérience dont vous vous souvenez à cause d\'un tout petit détail.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about an experience you created that you still remember because of one tiny detail.' }
        ]
      },
      {
        number: '04',
        title: 'LA SURPRISE',
        prompt: 'Racontez-nous une fois où vous avez voulu surprendre quelqu\'un et où les choses ne se sont pas passées exactement comme prévu. Qu\'avez-vous découvert à ce moment-là ?',
        audioDuration: '0:46',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        audioVoiceName: 'Scénographe Fiat Luxe',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une fois où vous avez voulu surprendre quelqu\'un et où les choses ne se sont pas passées exactement comme prévu.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about a time you wanted to surprise someone and things did not go as planned.' }
        ]
      },
      {
        number: '05',
        title: 'CE QUE L\'ON OFFRE',
        prompt: 'Racontez-nous une chose que vous avez offerte à quelqu\'un et dont vous vous souvenez encore aujourd\'hui. Qu\'est-ce que cette histoire représente pour vous ?',
        audioDuration: '0:50',
        videoAvatarUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        audioVoiceName: 'Chœur Cotonou & Paris',
        translations: [
          { lang: 'fr', label: 'Français', prompt: 'Racontez-nous une chose que vous avez offerte à quelqu\'un et dont vous vous souvenez encore aujourd\'hui.' },
          { lang: 'en', label: 'English', prompt: 'Tell us about something you gave to someone that you still remember to this day.' }
        ]
      }
    ],
    episodeCount: 5,
    protagonistsCount: 6,
    territories: ['Cotonou', 'Paris', 'Marrakech', 'Lomé']
  }
];

export const PROTAGONISTS: Protagonist[] = [
  {
    id: 'koffi-tisserand',
    slug: 'koffi-tisserand',
    name: 'Koffi',
    age: 54,
    role: 'Tisserand traditionnel',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: 'Tisserand à Porto-Novo, Koffi perpétue un savoir transmis de père en fils. Ses étoffes racontent les marchés et les rites de la côte.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'finagnon-qosqorico',
    universeTag: 'Finagnon',
    quote: '« Le tissage est une langue qu’on apprend sans parler. »',
    tree: {
      passeurs: [
        {
          id: 'p-tanaka',
          name: 'Maître Tanaka',
          role: 'Maître ébéniste',
          country: 'Japon',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
        },
        {
          id: 'p-sayuri',
          name: 'Sayuri',
          role: 'Laqueuse',
          country: 'Japon',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
        },
        {
          id: 'p-goro',
          name: 'Goro',
          role: 'Bûcheron',
          country: 'Japon',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
        }
      ],
      heritiers: [
        {
          id: 'h-yuki',
          name: 'Yuki',
          role: 'Apprentie tissage',
          country: 'Japon',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        },
        {
          id: 'h-awa',
          name: 'Awa',
          role: 'Luthière',
          country: 'Sénégal',
          photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
        }
      ],
      transmissions: [
        {
          id: 't-koffi-1',
          title: 'Le rythme du peigne d’acajou',
          ancestorOrMentor: 'Son père Mensah Houndété (1932–2012)',
          description: 'L’art de tendre la chaîne sans briser les fibres de coton sous la chaleur de midi.',
          connectedProtagonistId: 'amara-tisserande'
        },
        {
          id: 't-koffi-2',
          title: 'Les symboles de dignité royale d’Abomey',
          ancestorOrMentor: 'Feu Da Zannou, chef tisseur de cour',
          description: 'Savoir insérer le caméléon et le lion sans briser l’harmonie des teintes d’indigo.'
        }
      ],
      duos: [
        {
          id: 'duo-koffi-amara-ref',
          partnerName: 'Amara',
          partnerRole: 'Tisserande andine',
          partnerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-koffi-amara',
          question: '« Que transmet une main qui tisse depuis toujours ? »'
        }
      ],
      creations: [
        {
          id: 'c-koffi-1',
          title: 'Étoffes rituelles de Porto-Novo',
          type: 'Tissage d’exception',
          description: 'Tissées sur métier horizontal en fil de coton biologique teint à l’indigo naturel végétal.',
          priceOrDetail: 'Fabrication artisanale sur commande'
        },
        {
          id: 'c-koffi-2',
          title: 'Écharpes cérémonielles d’Allada',
          type: 'Parure textile',
          description: 'Bandes de 15 cm aux motifs traditionnels de passage et de bénédiction.'
        }
      ],
      projects: [
        {
          id: 'p-koffi-1',
          title: 'L’Atelier Vivant des Jeunes Tisserands',
          stage: 'Chantier participatif à Porto-Novo',
          description: 'Création d’un hangar d’apprentissage gratuit pour former 12 jeunes filles et garçons déscolarisés aux métiers du fil.'
        }
      ],
      opportunities: [
        {
          id: 'o-koffi-1',
          title: 'Résidence d’initiation au tissage traditionnel',
          description: 'Accueil de 2 créateurs textiles par an pour une immersion de 3 semaines au rythme des métiers en bois.',
          badge: 'Résidence ouverte'
        }
      ],
      needs: [
        {
          id: 'n-koffi-1',
          title: 'Sourcing de fil de coton biologique ouest-africain',
          urgency: 'Prioritaire',
          description: 'Recherche de coopératives agricoles féminines produisant du fil écru non traité.'
        }
      ]
    },
    stories: [
      {
        id: 'story-koffi-tiss-01',
        title: 'Le bruit de la navette avant le jour',
        questionNumber: '01',
        questionTitle: 'LE GESTE ANCESTRAL',
        duration: '08:40',
        videoDurationSeconds: 520,
        summary: 'Koffi raconte ce matin brumeux où son père l’a réveillé à 4 heures pour écouter la cadence de la navette sans allumer de lampe : comprendre que le tissu n’est pas fait par les yeux, mais par la pulsation du corps.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Koffi' },
          { role: 'director', label: 'Réalisateur', name: 'Ayaba Senou' }
        ]
      }
    ]
  },
  {
    id: 'amara-tisserande',
    slug: 'amara-tisserande',
    name: 'Amara',
    age: 42,
    role: 'Tisserande andine',
    territory: 'Cusco (Vallée Sacrée)',
    country: 'Pérou',
    flag: '🇵🇪',
    bio: 'Tisserande des hauteurs de Cusco, Amara travaille la laine et les teintes végétales. Ses tissus portent les symboles de sa communauté.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'finagnon-qosqorico',
    universeTag: 'Qosqorico',
    quote: '« Chaque fil garde la mémoire de la montagne. »',
    tree: {
      passeurs: [
        {
          id: 'p-asunta',
          name: 'Mama Asunta',
          role: 'Grand-mère tisseuse',
          country: 'Pérou',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
        },
        {
          id: 'p-huaman',
          name: 'Don Huamán',
          role: 'Teinturier d’altitude',
          country: 'Pérou',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
        }
      ],
      heritiers: [
        {
          id: 'h-inti',
          name: 'Nayra',
          role: 'Apprentie fileuse',
          country: 'Pérou',
          photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
        }
      ],
      transmissions: [
        {
          id: 't-amara-1',
          title: 'La teinture à la cochenille sauvage',
          ancestorOrMentor: 'Sa mère Rosa Huamán',
          description: 'Obtenir treize nuances de pourpre en ajustant le jus de citron vert et la cendre de quinoa.',
          connectedProtagonistId: 'koffi-tisserand'
        }
      ],
      duos: [
        {
          id: 'duo-amara-koffi-ref',
          partnerName: 'Koffi',
          partnerRole: 'Tisserand de Porto-Novo',
          partnerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-koffi-amara',
          question: '« Que transmet une main qui tisse depuis toujours ? »'
        }
      ],
      creations: [
        {
          id: 'c-amara-1',
          title: 'Lliclla andine cérémonielle',
          type: 'Châle de laine d’alpaga',
          description: 'Tissé sur métier à ceinture (telar de cintura), motifs racontant les cycles des constellations.',
          priceOrDetail: 'Laine filée main et teinte aux plantes'
        }
      ],
      projects: [
        {
          id: 'p-amara-1',
          title: 'La Maison des Tisseuses de Chinchero',
          stage: 'Construction en adobe',
          description: 'Créer un espace autonome où 25 femmes peuvent teindre et filer sans dépendre des intermédiaires touristiques.'
        }
      ],
      opportunities: [
        {
          id: 'o-amara-1',
          title: 'Cercle de transmission du filage au fuseau',
          description: 'Ateliers mensuels ouverts aux enfants de la vallée pour préserver le quechua textile.',
          badge: 'Transmission communautaire'
        }
      ],
      needs: [
        {
          id: 'n-amara-1',
          title: 'Cuves en cuivre pour bains de teinture douce',
          urgency: 'En cours',
          description: 'Équipement pour stabiliser les pigments naturels sans mordant toxique.'
        }
      ]
    },
    stories: [
      {
        id: 'story-amara-01',
        title: 'Le premier motif gravé dans la laine',
        questionNumber: '01',
        questionTitle: 'LE GESTE ANCESTRAL',
        duration: '09:15',
        videoDurationSeconds: 555,
        summary: 'Amara raconte comment sa grand-mère lui a attaché les mains au métier à l’âge de huit ans non pour la contraindre, mais pour qu’elle sente la tension invisible entre le cœur de la femme et les crêtes de la montagne.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Amara' },
          { role: 'director', label: 'Réalisateur', name: 'Mateo Quispe Flores' }
        ]
      }
    ]
  },
  {
    id: 'dah-zounon',
    slug: 'dah-zounon',
    name: 'Dah Zounon Gbegnon',
    age: 62,
    role: 'Dignitaire du Vodoun Legba & Gardien des Seuils',
    territory: 'Allada / Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: 'Héritier d\'une lignée de prêtres vodoun d’Allada, Dah Zounon veille sur l’autel de Legba depuis quarante ans. Pour lui, la foi n’est pas une spéculation : c’est un pacte quotidien d’équilibre avec la nature, les carrefours de la vie et le respect de la parole donnée.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'jesus-legba',
    universeTag: 'Legba',
    quote: '« Legba ne ferme jamais une porte sans avoir déjà placé la clé entre les mains de celui qui écoute. »',
    tree: {
      transmissions: [
        {
          id: 't-1',
          title: 'L’onction des carrefours',
          ancestorOrMentor: 'Son grand-père Hounnon Kpossou (1918–1996)',
          description: 'L’apprentissage du silence auprès des pierres levées et l’art de reconnaître le battement d’ailes d’un présage sans panique.',
          connectedProtagonistId: 'pere-matthieu'
        },
        {
          id: 't-2',
          title: 'La langue des plantes de berge',
          ancestorOrMentor: 'Maman Agbassi, herboriste à Tori',
          description: 'La connaissance des feuilles calmantes et des racines protectrices cueillies avant l’aurore.'
        }
      ],
      duos: [
        {
          id: 'duo-1',
          partnerName: 'Père Matthieu Agonhossou',
          partnerRole: 'Prêtre catholique & enseignant',
          partnerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-jesus-legba-01',
          question: '01 — LA RENCONTRE : Le jour où la foi a cessé d\'être un mot'
        }
      ],
      opportunities: [
        {
          id: 'o-1',
          title: 'Immersion culturelle aux sources d’Allada',
          description: 'Accueil de chercheurs, étudiants et cinéastes pour décrypter la philosophie des autels carrefours.',
          badge: 'Ouvert aux résidences'
        },
        {
          id: 'o-2',
          title: 'Cercle de dialogue inter-spirituel',
          description: 'Séances mensuelles de médiation paisible entre dignitaires et pasteurs des villages lacustres.',
          badge: 'Médiation'
        }
      ],
      creations: [
        {
          id: 'c-1',
          title: 'Huile protectrice de néré et karité sanctifiée',
          type: 'Baume artisanal',
          description: 'Formule ancestrale préparée lors du solstice d’harmattan pour apaiser la fatigue des voyageurs.',
          priceOrDetail: 'Fabrication rituelle limitée'
        },
        {
          id: 'c-2',
          title: 'Colliers de perles de corail et terre d’Allada',
          type: 'Objets de mémoire',
          description: 'Parures confectionnées avec les forgerons de la cour royale.'
        }
      ],
      projects: [
        {
          id: 'p-1',
          title: 'Le Sanctuaire-Conservatoire des plantes sacrées',
          stage: 'Jeune pousse (terrassement en cours)',
          description: 'Création d’un arboretum protégé de 4 hectares pour préserver les essences médicinales du plateau d’Allada.'
        }
      ],
      needs: [
        {
          id: 'n-1',
          title: 'Archivage sonore et traduction en langues locales',
          urgency: 'Prioritaire',
          description: 'Besoin d’un jeune ingénieur du son pour numériser 60 heures de chants oraux avant la saison des pluies.'
        }
      ]
    },
    stories: [
      {
        id: 'story-dah-01',
        title: 'Le feu sous l’iroko noir',
        questionNumber: '01',
        questionTitle: 'LA RENCONTRE',
        duration: '11:42',
        videoDurationSeconds: 702,
        summary: 'À l’âge de dix-neuf ans, Dah Zounon fuyait le village après un naufrage familial. Assis au carrefour d’Allada, une simple poignée de terre chaude déposée par un vieillard a suspendu son désespoir.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Dah Zounon Gbegnon' },
          { role: 'director', label: 'Réalisateur', name: 'Ayaba Senou' },
          { role: 'mentor', label: 'Mentor spirituel', name: 'Feu Hounnon Kpossou' },
          { role: 'sound', label: 'Prise de son', name: 'Eric Houndo' }
        ]
      }
    ]
  },
  {
    id: 'pere-matthieu',
    slug: 'pere-matthieu',
    name: 'Père Matthieu Agonhossou',
    role: 'Prêtre diocésain, philosophe & éducateur',
    territory: 'Cotonou / Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: 'Né au bord de la lagune de Cotonou, ordonné à Ouidah, le Père Matthieu conjugue l’étude de saint Augustin avec une écoute attentive des traditions de son terroir. Il enseigne la philosophie aux jeunes lycéens et partage son temps entre l’oratoire et la rue.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'jesus-legba',
    universeTag: 'Jesus',
    quote: '« La foi n’est pas une citadelle contre l’autre, c’est une table basse dressée en plein vent où l’on attend celui qui a soif. »',
    tree: {
      transmissions: [
        {
          id: 't-3',
          title: 'Le bréviaire au bord de l’eau',
          ancestorOrMentor: 'Monseigneur Isidore de Souza',
          description: 'Le courage civique au service de la paix nationale lors de la Conférence des Forces Vives de 1990.',
          connectedProtagonistId: 'dah-zounon'
        }
      ],
      duos: [
        {
          id: 'duo-1-bis',
          partnerName: 'Dah Zounon Gbegnon',
          partnerRole: 'Dignitaire Vodoun',
          partnerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-jesus-legba-01',
          question: '01 — LA RENCONTRE : L’éveil devant l’invisible'
        }
      ],
      opportunities: [
        {
          id: 'o-3',
          title: 'Ateliers de lecture philosophique pour lycéens',
          description: 'Ouverture hebdomadaire de sa bibliothèque personnelle à 30 élèves sans moyens.',
          badge: 'Éducation ouverte'
        }
      ],
      creations: [
        {
          id: 'c-3',
          title: 'Cahiers de méditation sur les proverbes du golfe',
          type: 'Essai éditorial',
          description: 'Recueil de 120 pages rapprochant les Béatitudes des maximes fòn d’autrefois.'
        }
      ],
      projects: [
        {
          id: 'p-2',
          title: 'La Maison du Repos et de l’Écoute',
          stage: 'Plans architecturaux finalisés',
          description: 'Un lieu neutre pour accueillir sans distinction de culte les personnes éprouvées par un deuil brutal.'
        }
      ],
      needs: [
        {
          id: 'n-2',
          title: 'Équipement en panneaux solaires',
          urgency: 'En recherche de donateurs',
          description: 'Alimenter la salle d’études pour permettre aux jeunes d’étudier le soir sans coupures.'
        }
      ]
    },
    stories: [
      {
        id: 'story-matthieu-01',
        title: 'Le silence dans la nef de Ouidah',
        questionNumber: '01',
        questionTitle: 'LA RENCONTRE',
        duration: '13:05',
        videoDurationSeconds: 785,
        summary: 'Pendant ses années de doute à l’université, Matthieu est entré par hasard dans la basilique déserte de Ouidah en plein midi. Ce n’est pas un miracle qui l’a retenu, mais une soudaine certitude d’être attendu.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Père Matthieu Agonhossou' },
          { role: 'director', label: 'Réalisateur', name: 'Ayaba Senou' },
          { role: 'camera', label: 'Cadre', name: 'Célestin Kiki' }
        ]
      }
    ]
  },
  {
    id: 'tobi-houndegla',
    slug: 'tobi-houndegla',
    name: 'Tobi Houndegla',
    role: 'Maître charpentier de pirogues & pêcheur',
    territory: 'Ganvié (Cité lacustre)',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: 'À Ganvié, on dit que Tobi connaît l’âge de chaque pieu d’acajou enfoncé sous la lagune Nokoué. Né sur l’eau, il taille les pirogues qui permettent aux enfants d’aller à l’école et aux marchandes d’atteindre le marché flottant.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'finagnon-qosqorico',
    universeTag: 'Finagnon',
    quote: '« L’eau ne t’appartient pas : c’est toi qui deviens une goutte de son histoire. Si tu oublies le fond, la vague t’avale. »',
    tree: {
      transmissions: [
        {
          id: 't-4',
          title: 'Le choix des troncs d’iroko flottés',
          ancestorOrMentor: 'Son père Basile Houndegla',
          description: 'Savoir lire les veines du bois pour que la proue fende le courant sans vaciller pendant vingt ans.'
        }
      ],
      duos: [
        {
          id: 'duo-2',
          partnerName: 'Sayri Quispe',
          partnerRole: 'Cultivateur de maïs & tisseur andin',
          partnerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-finagnon-qosqorico-01',
          question: '01 — CHEZ SOI : Là où le corps reconnaît la terre ou l’onde'
        }
      ],
      opportunities: [
        {
          id: 'o-4',
          title: 'Apprentissage de la charpente navale traditionnelle',
          description: 'Accueil de deux jeunes par an pour transmettre la forge des clous forgés à la main.',
          badge: 'Atelier vivant'
        }
      ],
      creations: [
        {
          id: 'c-4',
          title: 'Pirogues sculptées en modèle réduit pour la mémoire',
          type: 'Artisanat d’art',
          description: 'Modèles fidèles à échelle 1/10e représentant les embarcations historiques du XVIIIe siècle.'
        }
      ],
      projects: [
        {
          id: 'p-3',
          title: 'Restauration des passerelles communes de Ganvié',
          stage: 'Mobilisation communautaire',
          description: 'Chantier participatif pour remplacer les pieux fragilisés avant la crue.'
        }
      ],
      needs: [
        {
          id: 'n-3',
          title: 'Scies à ruban manuelles de précision',
          urgency: 'Modérée',
          description: 'Pour soulager l’effort physique des apprentis lors de l’ébauche des coques.'
        }
      ]
    },
    stories: [
      {
        id: 'story-tobi-01',
        title: 'Le premier coup de pagaie seul',
        questionNumber: '01',
        questionTitle: 'CHEZ SOI',
        duration: '09:28',
        videoDurationSeconds: 568,
        summary: 'Le jour de ses sept ans, son père l’a laissé seul au milieu de la lagune brumeuse avec une perche de bambou. Ce jour-là, l’effroi s’est métamorphosé en un sentiment d’appartenance absolu.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Tobi Houndegla' },
          { role: 'director', label: 'Réalisateur', name: 'Mateo Quispe' }
        ]
      }
    ]
  },
  {
    id: 'sayri-quispe',
    slug: 'sayri-quispe',
    name: 'Sayri Quispe Huamán',
    role: 'Cultivateur de semences anciennes & tisseur Quechua',
    territory: 'Vallée Sacrée / Pisac',
    country: 'Pérou',
    flag: '🇵🇪',
    bio: 'Vivant à 3 600 mètres d’altitude sur les contreforts de la Vallée Sacrée des Incas, Sayri cultive plus de quarante variétés de maïs natif et tisse la laine d’alpaga selon les motifs cosmiques transmis par sa mère.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'finagnon-qosqorico',
    universeTag: 'Qosqorico',
    quote: '« La montagne ne parle pas avec des mots, elle parle avec le vent et la couleur des feuilles de maïs. Si tu es chez toi, tes pieds la comprennent avant ta tête. »',
    tree: {
      transmissions: [
        {
          id: 't-5',
          title: 'Le secret des teintures végétales de la vallée',
          ancestorOrMentor: 'Sa grand-mère Mama Asunta',
          description: 'L’usage de la cochenille et des lichens d’altitude pour fixer des pourpres et des ocres indélébiles.'
        }
      ],
      duos: [
        {
          id: 'duo-2-bis',
          partnerName: 'Tobi Houndegla',
          partnerRole: 'Charpentier de pirogues de Ganvié',
          partnerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-finagnon-qosqorico-01',
          question: '01 — CHEZ SOI : Deux mondes reliés par la fidélité à un élément'
        }
      ],
      opportunities: [
        {
          id: 'o-5',
          title: 'Partage de semences paysannes libres',
          description: 'Échange annuel de graines avec les communautés des vallées voisines pour préserver la biodiversité.',
          badge: 'Biodiversité'
        }
      ],
      creations: [
        {
          id: 'c-5',
          title: 'Ponchos d’alpaga teints aux herbes sauvages',
          type: 'Tissage d’exception',
          description: 'Pièces uniques tissées sur métier à ceinture demandant jusqu’à trois mois de travail minutieux.'
        }
      ],
      projects: [
        {
          id: 'p-4',
          title: 'La Banque Communautaire de Semences de Pisac',
          stage: 'Murs d’adobe érigés',
          description: 'Un silo thermique traditionnel pour conserver les semences sans réfrigération électrique.'
        }
      ],
      needs: [
        {
          id: 'n-4',
          title: 'Collecte de mémoire orale en quechua',
          urgency: 'Urgente',
          description: 'Enregistrer les chants de récolte des anciens avant leur disparition.'
        }
      ]
    },
    stories: [
      {
        id: 'story-sayri-01',
        title: 'Le sel de Maras au lever du soleil',
        questionNumber: '01',
        questionTitle: 'CHEZ SOI',
        duration: '10:14',
        videoDurationSeconds: 614,
        summary: 'Sayri se rappelle la première aurore passée seul sur la terrasse familiale, les doigts engourdis par la gelée matinale, lorsqu’une flûte résonnant au loin a donné une voix à la vallée entière.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Sayri Quispe Huamán' },
          { role: 'director', label: 'Réalisateur', name: 'Mateo Quispe' }
        ]
      }
    ]
  },
  {
    id: 'malik-diop',
    slug: 'malik-diop',
    name: 'Malik Diop',
    role: 'Chorégraphe de danses urbaines & passeur de mémoires',
    territory: 'Dakar / Paris',
    country: 'Sénégal & France',
    flag: '🇸🇳',
    bio: 'Formé dans les battles de rue de la Médina de Dakar puis sur les scènes internationales, Malik a fondé le collectif Blacks One pour donner à la jeunesse un langage corporel où l’héritage sabar irrigue le krump et le hip-hop contemporain.',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'blacks-one-beyond-eve',
    universeTag: 'Blacks One',
    quote: '« Ton identité n’est pas une cage qu’on t’assigne : c’est le rythme que tu inventes pour faire vibrer le sol sous tes pas. »',
    tree: {
      transmissions: [
        {
          id: 't-6',
          title: 'Les pas du sabar royal des Lébous',
          ancestorOrMentor: 'Son oncle El Hadj Diop',
          description: 'La cadence des pieds nus sur la terre battue qui raconte l’histoire d’un peuple de pêcheurs insoumis.'
        }
      ],
      duos: [
        {
          id: 'duo-3',
          partnerName: 'Éléonore Vance',
          partnerRole: 'Artiste textile & fondatrice de collectif',
          partnerPhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-blacks-one-beyond-eve-01',
          question: '03 — CE QUE L’ON PORTE : Ce que l’on a reçu et qu’on ne peut poser'
        }
      ],
      opportunities: [
        {
          id: 'o-6',
          title: 'Résidence tremplin pour danseurs émergents',
          description: 'Bourses de création pour 4 jeunes talents par an à Dakar.',
          badge: 'Tremplin chorégraphique'
        }
      ],
      creations: [
        {
          id: 'c-6',
          title: 'Spectacle vivant « Mémoire de Sable »',
          type: 'Création scénique',
          description: 'Pièce pour 7 danseurs explorant les migrations intérieures et la fierté retrouvée.'
        }
      ],
      projects: [
        {
          id: 'p-5',
          title: 'L’École Buissonnière des Rythmes',
          stage: 'Ateliers itinérants dans les quartiers',
          description: 'Former des médiateurs culturels pour réinvestir les places publiques par la danse.'
        }
      ],
      needs: [
        {
          id: 'n-5',
          title: 'Espaces de répétition sécurisés à Dakar',
          urgency: 'Recherche de partenariats municipaux',
          description: 'Trouver un hangar ou une friche pour les répétitions de la troupe.'
        }
      ]
    },
    stories: [
      {
        id: 'story-malik-01',
        title: 'Le premier cercle sous le réverbère',
        questionNumber: '03',
        questionTitle: 'CE QUE L’ON PORTE',
        duration: '12:10',
        videoDurationSeconds: 730,
        summary: 'Malik raconte l’instant où, rejeté d’une grande audition à Paris pour « manque d’académisme », il a compris que son bagage le plus précieux n’était pas leur validation, mais la pulsation lébou transmise par sa mère.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Malik Diop' },
          { role: 'director', label: 'Réalisateur', name: 'Kadiatou Bocoum' }
        ]
      }
    ]
  },
  {
    id: 'eleonore-vance',
    slug: 'eleonore-vance',
    name: 'Éléonore Vance',
    role: 'Artiste plasticienne, tisseuse de récits & curatrice',
    territory: 'Marseille / Abidjan',
    country: 'Côte d’Ivoire & France',
    flag: '🇨🇮',
    bio: 'Entre les ateliers de la Canebière et les teinturières d’Abobo, Éléonore interroge ce que les femmes portent sans jamais l’avoir choisi. Elle recompose des tapisseries monumentales à partir de pagnes de deuil, de lin brut et de fils d’or.',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'blacks-one-beyond-eve',
    universeTag: 'Beyond Eve',
    quote: '« On hérite de silences aussi lourds que des pierres. Mon travail est de les défaire brin par brin pour en faire une voile. »',
    tree: {
      transmissions: [
        {
          id: 't-7',
          title: 'Le pagne kita de ma grand-mère Akissi',
          ancestorOrMentor: 'Akissi Vance',
          description: 'L’art de lire les motifs de royauté qui n’étaient jamais prononcés à voix haute.'
        }
      ],
      duos: [
        {
          id: 'duo-3-bis',
          partnerName: 'Malik Diop',
          partnerRole: 'Chorégraphe',
          partnerPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-blacks-one-beyond-eve-01',
          question: '03 — CE QUE L’ON PORTE : Récits cousus dans la chair'
        }
      ],
      opportunities: [
        {
          id: 'o-7',
          title: 'Mentorat artistique pour femmes plasticiennes',
          description: 'Accompagnement annuel de 3 jeunes diplômées dans la structuration de leur démarche.',
          badge: 'Mentorat'
        }
      ],
      creations: [
        {
          id: 'c-7',
          title: 'Tapisserie « Les Noms Oubliés »',
          type: 'Œuvre textile',
          description: 'Fresque de 4 mètres de haut brodée à la main avec les noms des aïeules disparues.'
        }
      ],
      projects: [
        {
          id: 'p-6',
          title: 'La Maison Beyond Eve Marseille',
          stage: 'Recherche de lieu pérenne',
          description: 'Un atelier partagé réunissant des artisanes de la Méditerranée et d’Afrique de l’Ouest.'
        }
      ],
      needs: [
        {
          id: 'n-6',
          title: 'Métier à tisser horizontal grand format',
          urgency: 'En cours',
          description: 'Recherche d’un artisan menuisier pour concevoir un métier adapté aux pièces de 5 mètres.'
        }
      ]
    },
    stories: [
      {
        id: 'story-eleonore-01',
        title: 'Le coffre de fer d’Abidjan',
        questionNumber: '03',
        questionTitle: 'CE QUE L’ON PORTE',
        duration: '11:45',
        videoDurationSeconds: 705,
        summary: 'À la mort de sa mère, Éléonore a ouvert la vieille malle en fer blanc conservée sous le lit. Y reposaient trois pagnes usés jusqu’à la corde, témoins muets de quarante ans de dignité discrète.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Éléonore Vance' },
          { role: 'director', label: 'Réalisatrice', name: 'Kadiatou Bocoum' }
        ]
      }
    ]
  },
  {
    id: 'chef-koffi',
    slug: 'chef-koffi',
    name: 'Chef Koffi Mensah',
    role: 'Artisan cuisinier de rue & chercheur de goûts',
    territory: 'Cotonou (Dantokpa)',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: 'Au cœur du grand marché de Dantokpa, Koffi cuisine depuis l’aube sur des réchauds à braises. Il sublime l’igname pilée, les sauces gombo aux écrevisses fumées et les bouillons mijotés 14 heures pour nourrir plus de trois cents personnes par jour.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'dixeat-fiat-luxe',
    universeTag: 'Dixeat',
    quote: '« La cuisine n’a pas besoin d’étoiles : elle a besoin de bras qui n’ont pas peur de la fumée et d’un cœur qui veut rassasier l’âme. »',
    tree: {
      transmissions: [
        {
          id: 't-8',
          title: 'Le secret du piment noir confit',
          ancestorOrMentor: 'Sa tante Da Tété',
          description: 'La cuisson lente au feu de coque de coco qui donne cette rondeur fumée incomparable.'
        }
      ],
      duos: [
        {
          id: 'duo-4',
          partnerName: 'Hélène de Saint-Amand',
          partnerRole: 'Maître d’hôtel & scénographe sensorielle',
          partnerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-dixeat-fiat-luxe-01',
          question: '01 — LE GOÛT : Quand l’émotion traverse la première bouchée'
        }
      ],
      opportunities: [
        {
          id: 'o-8',
          title: 'Formation gratuite des jeunes du quartier aux bases culinaires',
          description: 'Chaque semestre, Koffi prend 3 apprentis sans qualification pour leur transmettre un métier noble.',
          badge: 'Apprentissage solidaire'
        }
      ],
      creations: [
        {
          id: 'c-8',
          title: 'Pâte d’épices de brousse en pots de terre cuite',
          type: 'Condiment signature',
          description: 'Mélange fermenté de graines de néré, piment doux et sel de lagune séché au soleil.'
        }
      ],
      projects: [
        {
          id: 'p-7',
          title: 'La Cantine Populaire Zéro Déchet de Dantokpa',
          stage: 'Recherche de matériel inox',
          description: 'Créer un point de distribution alimentaire pour les portefaix du marché avec récupération des surplus maraîchers.'
        }
      ],
      needs: [
        {
          id: 'n-7',
          title: 'Fours à basse consommation de bois',
          urgency: 'Prioritaire',
          description: 'Remplacer les foyers ouverts pour préserver la santé pulmonaire des cuisinières.'
        }
      ]
    },
    stories: [
      {
        id: 'story-koffi-01',
        title: 'Le bol d’igname au milieu de l’orage',
        questionNumber: '01',
        questionTitle: 'LE GOÛT',
        duration: '08:52',
        videoDurationSeconds: 532,
        summary: 'Koffi raconte ce soir de déluge où un voyageur sans le sou, trempé jusqu’aux os, s’est effondré en larmes devant sa marmite fumante après avoir goûté sa sauce gboma.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Chef Koffi Mensah' },
          { role: 'director', label: 'Réalisateur', name: 'Adrien Vasseur' }
        ]
      }
    ]
  },
  {
    id: 'helene-saint-amand',
    slug: 'helene-saint-amand',
    name: 'Hélène de Saint-Amand',
    role: 'Maître d’hôtel, scénographe de table & créatrice d’expériences',
    territory: 'Paris / Marrakech',
    country: 'France',
    flag: '🇫🇷',
    bio: 'Passée par les palaces parisiens et les riads d’exception de Marrakech, Hélène conçoit l’hospitalité comme une dramaturgie invisible. Pour elle, la lumière d’une bougie, l’inclinaison d’un verre ou le silence d’un accueil constituent le véritable luxe.',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    documentaryId: 'dixeat-fiat-luxe',
    universeTag: 'Fiat Luxe',
    quote: '« Le luxe n’est pas ce qui brille : c’est l’attention totale portée à l’instant où quelqu’un pose enfin son fardeau pour se laisser nourrir. »',
    tree: {
      transmissions: [
        {
          id: 't-9',
          title: 'L’art du pas feutré et du regard périphérique',
          ancestorOrMentor: 'Monsieur François, Premier Maître d’Hôtel au Ritz (1975)',
          description: 'Devancer le désir d’un convive sans jamais imposer sa présence physique.'
        }
      ],
      duos: [
        {
          id: 'duo-4-bis',
          partnerName: 'Chef Koffi Mensah',
          partnerRole: 'Cuisinier de rue',
          partnerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
          duoId: 'duo-dixeat-fiat-luxe-01',
          question: '01 — LE GOÛT : Deux artisans de l’instant précieux'
        }
      ],
      opportunities: [
        {
          id: 'o-9',
          title: 'Masterclass sur la mémoire olfactive et la réception',
          description: 'Sessions trimestrielles pour jeunes professionnels de l’hôtellerie d’art.',
          badge: 'Masterclass'
        }
      ],
      creations: [
        {
          id: 'c-9',
          title: 'Verrerie soufflée à la bouche « Larmes d’Atlas »',
          type: 'Art de la table',
          description: 'Série limitée conçue avec les maîtres verriers de Marrakech.'
        }
      ],
      projects: [
        {
          id: 'p-8',
          title: 'Le Dîner Silencieux au Jardin Majorelle',
          stage: 'Production en cours',
          description: 'Une expérience gastronomique nocturne où les convives dégustent sans un mot au son de la brise.'
        }
      ],
      needs: [
        {
          id: 'n-8',
          title: 'Sourcing de lin brut biologique non blanchi',
          urgency: 'En cours',
          description: 'Trouver une filature artisanale respectant le cycle végétal sans apprêt chimique.'
        }
      ]
    },
    stories: [
      {
        id: 'story-helene-01',
        title: 'Le verre d’eau offert sans un mot',
        questionNumber: '01',
        questionTitle: 'LE GOÛT',
        duration: '10:48',
        videoDurationSeconds: 648,
        summary: 'Hélène se souvient d’un grand dîner d’État où le geste le plus marquant ne fut pas le caviar servi, mais une simple coupe d’eau de source tiède infusée à la feuille d’oranger, apportée à une femme terrifiée par la foule.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
        credits: [
          { role: 'story_owner', label: 'Propriétaire de l’histoire', name: 'Hélène de Saint-Amand' },
          { role: 'director', label: 'Réalisateur', name: 'Adrien Vasseur' }
        ]
      }
    ]
  }
];

export const DUOS: Duo[] = [
  {
    id: 'duo-koffi-amara',
    slug: 'duo-koffi-amara',
    documentaryId: 'finagnon-qosqorico',
    documentaryTitle: 'Finagnon < > Qosqorico',
    episodeNumber: 'ÉPISODE 02',
    protagonistA: PROTAGONISTS.find(p => p.id === 'koffi-tisserand') || PROTAGONISTS[0],
    protagonistB: PROTAGONISTS.find(p => p.id === 'amara-tisserande') || PROTAGONISTS[1],
    questionNumber: '02',
    questionTitle: 'LE GESTE ANCESTRAL',
    centralQuestion: '« Que transmet une main qui tisse depuis toujours ? »',
    quoteA: '« Le tissage est une langue qu’on apprend sans parler. Ses étoffes racontent les marchés et les rites de la côte. »',
    quoteB: '« Chaque fil garde la mémoire de la montagne. Tisserande des hauteurs de Cusco, je travaille la laine et les teintes végétales. »',
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
    storyA: (PROTAGONISTS.find(p => p.id === 'koffi-tisserand') || PROTAGONISTS[0]).stories[0],
    storyB: (PROTAGONISTS.find(p => p.id === 'amara-tisserande') || PROTAGONISTS[1]).stories[0],
    editorialReflection: 'De Porto-Novo à la Vallée Sacrée de Cusco, le métier à tisser n’est pas un outil de confection : c’est une prière muette où les mains nouent la mémoire des ancêtres pour habiller les vivants.'
  },
  {
    id: 'duo-jesus-legba-01',
    slug: 'duo-jesus-legba-01',
    documentaryId: 'jesus-legba',
    documentaryTitle: 'Révélation < > Tradition',
    episodeNumber: 'ÉPISODE 01',
    protagonistA: PROTAGONISTS.find(p => p.id === 'pere-matthieu') || PROTAGONISTS[3],
    protagonistB: PROTAGONISTS.find(p => p.id === 'dah-zounon') || PROTAGONISTS[2],
    questionNumber: '01',
    questionTitle: 'LA RENCONTRE',
    centralQuestion: 'Racontez-nous un moment de votre vie où vous avez réellement rencontré votre foi. Que s\'est-il passé ?',
    quoteA: '« Je suis entré dans la nef déserte de Ouidah pour fuir la brûlure du soleil. Ce n’est pas un miracle qui m’a retenu : c’était la certitude d’être attendu. »',
    quoteB: '« Legba ne m’a pas parlé dans un coup de tonnerre. C’était la chaleur d’une poignée de terre d’Allada, un jour où je croyais que le monde était mort. »',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    storyA: (PROTAGONISTS.find(p => p.id === 'pere-matthieu') || PROTAGONISTS[3]).stories[0],
    storyB: (PROTAGONISTS.find(p => p.id === 'dah-zounon') || PROTAGONISTS[2]).stories[0],
    editorialReflection: 'Deux traditions que l’histoire a parfois opposées se découvrent ici une racine commune : l’humilité de l’homme devant ce qui le dépasse et l’impérieuse nécessité de ne pas traverser l’obscurité seul.'
  },
  {
    id: 'duo-finagnon-qosqorico-01',
    slug: 'duo-finagnon-qosqorico-01',
    documentaryId: 'finagnon-qosqorico',
    documentaryTitle: 'Finagnon < > Qosqorico',
    episodeNumber: 'ÉPISODE 01',
    protagonistA: PROTAGONISTS.find(p => p.id === 'tobi-ganvie') || PROTAGONISTS[0],
    protagonistB: PROTAGONISTS.find(p => p.id === 'sayri-pisac') || PROTAGONISTS[1],
    questionNumber: '01',
    questionTitle: 'CHEZ SOI',
    centralQuestion: 'Racontez-nous un moment où vous avez compris que vous étiez vraiment chez vous. Où étiez-vous et que s\'est-il passé ?',
    quoteA: '« Le jour où la pirogue a glissé dans la brume sans que j’aie besoin de regarder le rivage. Ganvié n’est pas sur la terre, mais elle est dans mon sang. »',
    quoteB: '« Quand les pieds nus touchent la roche glacée de Pisac à l’aube et que la montagne souffle son premier vent. Là, tu sais que tu n’es pas un étranger. »',
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
    storyA: (PROTAGONISTS.find(p => p.id === 'tobi-ganvie') || PROTAGONISTS[0]).stories[0],
    storyB: (PROTAGONISTS.find(p => p.id === 'sayri-pisac') || PROTAGONISTS[1]).stories[0],
    editorialReflection: 'Des pilotis de Ganvié aux terrasses de Pisac, le chez-soi n’est pas une propriété cadastrale : c’est une fidélité organique au rythme d’un élément — l’eau vive ou la pierre d’altitude.'
  },
  {
    id: 'duo-blacks-one-beyond-eve-01',
    slug: 'duo-blacks-one-beyond-eve-01',
    documentaryId: 'blacks-one-beyond-eve',
    documentaryTitle: 'Blacks One < > Beyond Eve',
    episodeNumber: 'ÉPISODE 03',
    protagonistA: PROTAGONISTS.find(p => p.id === 'malik-diop') || PROTAGONISTS[4],
    protagonistB: PROTAGONISTS.find(p => p.id === 'eleonore-vance') || PROTAGONISTS[5],
    questionNumber: '03',
    questionTitle: 'CE QUE L’ON PORTE',
    centralQuestion: 'Racontez-nous quelque chose que vous avez reçu de votre histoire, de votre famille ou de ceux qui vous ont précédé et que vous portez encore aujourd\'hui. Qu\'est-ce que cela représente pour vous ?',
    quoteA: '« On m’a dit à Paris que ma danse était trop lourde. J’ai compris ce jour-là que cette pesanteur, c’était le sable de mes aïeux que je refusais de secouer. »',
    quoteB: '« Dans la malle de ma mère, il n’y avait aucun bijou en or, mais trois pagnes de coton usés par le travail. C’est mon manteau de reine. »',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80',
    storyA: (PROTAGONISTS.find(p => p.id === 'malik-diop') || PROTAGONISTS[4]).stories[0],
    storyB: (PROTAGONISTS.find(p => p.id === 'eleonore-vance') || PROTAGONISTS[5]).stories[0],
    editorialReflection: 'Ce que l’on porte n’est pas un fardeau qui alourdit le pas : c’est le fil secret qui permet de traverser l’exil sans s’égarer.'
  },
  {
    id: 'duo-dixeat-fiat-luxe-01',
    slug: 'duo-dixeat-fiat-luxe-01',
    documentaryId: 'dixeat-fiat-luxe',
    documentaryTitle: 'Dixeat < > Fiat Luxe',
    episodeNumber: 'ÉPISODE 01',
    protagonistA: PROTAGONISTS.find(p => p.id === 'chef-koffi') || PROTAGONISTS[0],
    protagonistB: PROTAGONISTS.find(p => p.id === 'helene-saint-amand') || PROTAGONISTS[1],
    questionNumber: '01',
    questionTitle: 'LE GOÛT',
    centralQuestion: 'Racontez-nous un moment où vous avez créé quelque chose pour quelqu\'un et où vous avez compris, à sa réaction, que vous lui aviez vraiment fait plaisir. Qu\'est-ce qui s\'est passé ?',
    quoteA: '« Quand l’homme s’est assis dans la fumée et a fermé les yeux à la première cuillerée d’igname, ses larmes m’ont dit que je n’étais pas un marchand, mais un frère. »',
    quoteB: '« Ce n’est pas la coupe de cristal qui a touché cette femme, mais le fait que quelqu’un avait remarqué son angoisse et lui offrait un refuge invisible. »',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    storyA: (PROTAGONISTS.find(p => p.id === 'chef-koffi') || PROTAGONISTS[0]).stories[0],
    storyB: (PROTAGONISTS.find(p => p.id === 'helene-saint-amand') || PROTAGONISTS[1]).stories[0],
    editorialReflection: 'Entre la marmite populaire et le salon d’apparat, la grandeur de l’expérience ne réside jamais dans le prix facturé, mais dans l’intensité du soin offert à l’autre.'
  }
];

export const VIDEOGRAPHERS: Videographer[] = [
  {
    id: 'vid-1',
    name: 'Ayaba Senou',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    territory: 'Bénin (Cotonou, Ouidah, Allada)',
    country: 'Bénin',
    bio: 'Documentariste diplômée de l’ISMA. Spécialiste de la lumière naturelle et des récits de mémoire vivante.',
    gear: 'Sony FX3, optiques fixes cinéma 35mm & 50mm, micros cravates HF Sennheiser',
    equipment: 'Sony FX3, optiques fixes cinéma 35mm & 50mm, micros HF Sennheiser',
    specialties: ['Spiritualités traditionnelles', 'Artisanat d’art', 'Entretiens intimes'],
    languages: ['Français', 'Fòn', 'Yorùbá'],
    rateInfo: 'Accompagnement subventionné par la forêt YonyWood',
    rate: 'Forfait Forêt YonyWood (Prise en charge 70%)',
    availability: 'Disponible sous 48h',
    rating: 4.9,
    storiesShot: 14,
    verified: true,
    completedShoots: 14
  },
  {
    id: 'vid-2',
    name: 'Mateo Quispe Flores',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    territory: 'Pérou (Cusco, Vallée Sacrée, Pisac)',
    country: 'Pérou',
    bio: 'Natif de la région de Pisac, réalisateur indépendant formé à Lima. Passionné par les cosmologies andines et l’agriculture paysanne d’altitude.',
    gear: 'Blackmagic Pocket 6K Pro, stabilisateur Ronin, micros directionnels Rode NTG',
    equipment: 'Blackmagic Pocket 6K Pro, Ronin RS3, micros Rode NTG',
    specialties: ['Territoires ruraux', 'Cultures indigènes', 'Plans contemplatifs'],
    languages: ['Espagnol', 'Quechua', 'Anglais'],
    rateInfo: 'Accompagnement solidaire certifié YonyWood',
    rate: 'Forfait Forêt YonyWood (Prise en charge 70%)',
    availability: 'Disponible cette semaine',
    rating: 4.8,
    storiesShot: 9,
    verified: true,
    completedShoots: 9
  },
  {
    id: 'vid-3',
    name: 'Kadiatou Bocoum',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    territory: 'Sénégal (Dakar, Saint-Louis, Rufisque)',
    country: 'Sénégal',
    bio: 'Cheffe opératrice et monteuse. Son regard sensible saisit la spontanéité des collectifs urbains, de la danse et des paroles féminines insoumises.',
    gear: 'Canon C70, objectifs RF L-Series, enregistreur audio 32-bit float Zoom F3',
    equipment: 'Canon C70, objectifs RF L-Series, Zoom F3 32-bit float',
    specialties: ['Arts vivants', 'Portraits de collectifs', 'Dynamiques urbaines'],
    languages: ['Français', 'Wolof', 'Anglais'],
    rateInfo: 'Agrément charte qualité YonyWood',
    rate: 'Convention solidaire YonyWood',
    availability: 'Disponible sur rendez-vous',
    rating: 5.0,
    storiesShot: 18,
    verified: true,
    completedShoots: 18
  },
  {
    id: 'vid-4',
    name: 'Adrien Vasseur',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    territory: 'France (Paris, Île-de-France, Lyon)',
    country: 'France',
    bio: 'Cadreur spécialisé dans la gastronomie sensorielle, les ateliers d’art et l’architecture d’intérieur. Travail subtil sur le clair-obscur et la texture des matières.',
    gear: 'Sony A7S III, série optique anamorphique, éclairage doux Aputure Amaran',
    equipment: 'Sony A7S III, série optique anamorphique, son HF Shure',
    specialties: ['Gastronomie', 'Gestes d’exception', 'Atmosphères feutrées'],
    languages: ['Français', 'Anglais', 'Arabe dialectal'],
    rateInfo: 'Mission conventionnée YonyWood',
    rate: 'Tarif conventionné YonyWood',
    availability: 'Disponible sous 72h',
    rating: 4.9,
    storiesShot: 11,
    verified: true,
    completedShoots: 11
  }
];

export const PENDING_REVIEWS: ReviewCandidate[] = [
  {
    id: 'rev-01',
    candidateName: 'Akouavi Gbedan',
    territory: 'Grand-Popo, Bénin',
    documentaryTitle: 'FINAGNON × QOSQORICO',
    questionNumber: '02',
    questionTitle: 'PARTIR',
    storyTitle: 'La vague qui a emporté ma maison de sable',
    summary: 'Quand l’érosion côtière a englouti la cour familiale à Grand-Popo, partir n’était pas un départ volontaire mais un deuil physique de la terre natale.',
    duration: '07:45',
    stage: 'Étape 3/7 : Avis de la forêt',
    currentReviewsCount: 3,
    requiredReviewsCount: 5,
    videoCoverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rev-02',
    candidateName: 'Inti Champi',
    territory: 'Ollantaytambo, Pérou',
    documentaryTitle: 'FINAGNON × QOSQORICO',
    questionNumber: '04',
    questionTitle: 'CE QUI RESTE',
    storyTitle: 'Le secret des canaux de pierre d’Ollantaytambo',
    summary: 'La façon dont les terrasses incas canalisent l’eau de fonte sans qu’une seule goutte ne se perde. Sagesse transmise par son arrière-grand-père avant de s’éteindre.',
    duration: '09:12',
    stage: 'Étape 3/7 : Avis de la forêt',
    currentReviewsCount: 4,
    requiredReviewsCount: 5,
    videoCoverUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rev-03',
    candidateName: 'Sœur Blandine Dossou',
    territory: 'Abomey, Bénin',
    documentaryTitle: 'RÉVÉLATION × TRADITION',
    questionNumber: '04',
    questionTitle: 'LA PERSONNE QUI VOUS A CHANGÉ',
    storyTitle: 'La rencontre avec la prêtresse de Sakpata',
    summary: 'Alors qu’elle préparait ses vœux perpétuels, sa rencontre avec une vieille prêtresse soignant les malades avec une douceur infinie a renouvelé sa foi chrétienne.',
    duration: '11:20',
    stage: 'Étape 3/7 : Avis de la forêt',
    currentReviewsCount: 2,
    requiredReviewsCount: 5,
    videoCoverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  }
];

export const COMMUNITY_REVIEWS: CommunityReviewItem[] = [
  {
    id: 'rev-1',
    candidateName: 'Akouavi Gbedan',
    candidatePhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    territory: 'Bénin (Grand-Popo)',
    documentaryTitle: 'FINAGNON × QOSQORICO',
    questionNumber: '02',
    questionTitle: 'PARTIR',
    pitch: '« Quand l’érosion côtière a emporté la maison de sable de mon enfance à Grand-Popo, partir n’était pas un voyage : c’était laisser la moitié de mon ombre sur la plage. »',
    videoDuration: '07:45',
    videoThumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    supports: 24,
    revisionRequests: 1
  },
  {
    id: 'rev-2',
    candidateName: 'Inti Champi',
    candidatePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    territory: 'Pérou (Ollantaytambo)',
    documentaryTitle: 'FINAGNON × QOSQORICO',
    questionNumber: '04',
    questionTitle: 'CE QUI RESTE',
    pitch: '« La façon dont les pierres de nos terrasses canalisent l’eau de fonte sans qu’une goutte ne se perde. C’est la sagesse que mon arrière-grand-père m’a laissée avant de s’éteindre. »',
    videoDuration: '09:12',
    videoThumbnail: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    supports: 31,
    revisionRequests: 0
  },
  {
    id: 'rev-3',
    candidateName: 'Sœur Blandine Dossou',
    candidatePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    territory: 'Bénin (Abomey)',
    documentaryTitle: 'RÉVÉLATION × TRADITION',
    questionNumber: '04',
    questionTitle: 'LA PERSONNE QUI VOUS A CHANGÉ',
    pitch: '« Je préparais mes vœux perpétuels quand j’ai rencontré une prêtresse de Sakpata qui soignait les lépreux avec une tendresse infinie. Sa foi a bouleversé la mienne. »',
    videoDuration: '11:20',
    videoThumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    supports: 42,
    revisionRequests: 2
  }
];

export const BACKOFFICE_APPLICATIONS: BackOfficeApplication[] = [
  {
    id: 'app-001',
    candidateName: 'Akouavi Gbedan',
    candidatePhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    territory: 'Bénin (Grand-Popo)',
    documentaryId: 'finagnon-qosqorico',
    documentaryTitle: 'FINAGNON × QOSQORICO',
    universeGroup: 'Finagnon',
    status: 'AVIS_FORET',
    submittedDate: '12 Septembre 2026',
    assignedReviewer: 'Comité Littoral',
    technicalStatus: 'VALIDE',
    videoDuration: '07:45'
  },
  {
    id: 'app-002',
    candidateName: 'Inti Champi',
    candidatePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    territory: 'Pérou (Ollantaytambo)',
    documentaryId: 'finagnon-qosqorico',
    documentaryTitle: 'FINAGNON × QOSQORICO',
    universeGroup: 'Qosqorico',
    status: 'COMITE',
    submittedDate: '09 Septembre 2026',
    assignedReviewer: 'Comité Andes',
    technicalStatus: 'VALIDE',
    videoDuration: '09:12'
  },
  {
    id: 'app-003',
    candidateName: 'Djimon Agassa',
    candidatePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    territory: 'Bénin (Porto-Novo)',
    documentaryId: 'jesus-legba',
    documentaryTitle: 'RÉVÉLATION × TRADITION',
    universeGroup: 'Tradition',
    status: 'CONTROLE_TECHNIQUE',
    submittedDate: '13 Septembre 2026',
    assignedReviewer: 'Équipe Son/Image',
    technicalStatus: 'EN_ATTENTE',
    videoDuration: '14:20'
  },
  {
    id: 'app-004',
    candidateName: 'Nesta Touré',
    candidatePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    territory: 'Sénégal (Dakar)',
    documentaryId: 'blacks-one-beyond-eve',
    documentaryTitle: 'BLACKS ONE × BEYOND EVE',
    universeGroup: 'Blacks One',
    status: 'NOUVELLES',
    submittedDate: 'Hier',
    assignedReviewer: 'Non assigné',
    technicalStatus: 'EN_ATTENTE',
    videoDuration: '10:05'
  },
  {
    id: 'app-005',
    candidateName: 'Clara Delorme',
    candidatePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    territory: 'France (Paris)',
    documentaryId: 'dixeat-fiat-luxe',
    documentaryTitle: 'DIXEAT × FIAT LUXE',
    universeGroup: 'Fiat Luxe',
    status: 'REVISIONS',
    submittedDate: '04 Septembre 2026',
    assignedReviewer: 'Équipe Son/Image',
    technicalStatus: 'REVISION_REQUISE',
    videoDuration: '06:30'
  },
  {
    id: 'app-006',
    candidateName: 'Sœur Blandine Dossou',
    candidatePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    territory: 'Bénin (Abomey)',
    documentaryId: 'jesus-legba',
    documentaryTitle: 'RÉVÉLATION × TRADITION',
    universeGroup: 'Révélation',
    status: 'APPROUVEES',
    submittedDate: '28 Août 2026',
    assignedReviewer: 'Direction Éditoriale',
    technicalStatus: 'VALIDE',
    videoDuration: '11:20'
  }
];

export const SERIES_AFFILIATION_TREES: SeriesAffiliationTree[] = [
  {
    seriesId: 'jesus-legba',
    seriesTitle: 'Révélation < > Tradition',
    subtitle: 'Deux traditions. Une même question de foi.',
    description: 'Comment la rencontre de deux géants de la spiritualité béninoise a ouvert une chaîne vivante d\'initiations, tissant des liens inattendus entre couvents vodoun et monastères chrétiens.',
    centralQuestion: 'La foi',
    totalAffiliatedCount: 12,
    generationsCount: 3,
    pioneers: [
      {
        id: 'dah-zounon',
        name: 'Dah Zounon',
        age: 68,
        role: 'Dignitaire & gardien du temple de Legba',
        territory: 'Allada',
        country: 'Bénin',
        flag: '🇧🇯',
        universeTag: 'Legba',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Pionnier fondateur de la série. A accepté d\'ouvrir le secret des seuils sacrés pour que la jeunesse comprenne la vraie nature protectrice de Legba.',
        duoPartnerName: 'Père Matthieu',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-jesus-legba-01',
        episodeQuestion: '01 — Racontez-nous un moment où vous avez réellement rencontré votre foi.',
        protagonistIdRef: 'dah-zounon',
        invitedPeople: [
          {
            id: 'soeur-blandine',
            name: 'Sœur Blandine',
            age: 46,
            role: 'Religieuse bénédictine & herboriste',
            territory: 'Abomey',
            country: 'Bénin',
            flag: '🇧🇯',
            universeTag: 'Jesus',
            photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'dah-zounon',
            invitedByName: 'Dah Zounon',
            invitationStory: 'Invité par Dah Zounon après qu\'ils ont soigné ensemble des enfants fébriles au dispensaire de Toffo, échangeant tisanes de racines et prières d\'oraison.',
            duoPartnerName: 'Hounon Gbaguidi',
            duoId: 'duo-jesus-legba-01',
            episodeQuestion: '02 — L’épreuve qui révèle le vrai dénuement de l’âme.',
            protagonistIdRef: 'dah-zounon',
            invitedPeople: [
              {
                id: 'frere-jean-baptiste',
                name: 'Frère Jean-Baptiste',
                age: 31,
                role: 'Moine copiste et apiculteur',
                territory: 'Toffo',
                country: 'Bénin',
                flag: '🇧🇯',
                universeTag: 'Jesus',
                photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'soeur-blandine',
                invitedByName: 'Sœur Blandine',
                invitationStory: 'Fait entrer dans la série par Sœur Blandine pour son témoignage sur le silence nocturne des ruches et la contemplation des psaumes.',
                duoPartnerName: 'Marie-Noëlle',
                duoId: 'duo-jesus-legba-01',
                episodeQuestion: '03 — Ce que l’on transmet sans un mot.',
                protagonistIdRef: 'dah-zounon'
              }
            ]
          },
          {
            id: 'hounon-gbaguidi',
            name: 'Hounon Gbaguidi',
            age: 52,
            role: 'Forgeron rituel et sculpteur de fer Legba',
            territory: 'Ouidah',
            country: 'Bénin',
            flag: '🇧🇯',
            universeTag: 'Legba',
            photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'dah-zounon',
            invitedByName: 'Dah Zounon',
            invitationStory: 'Invité par Dah Zounon pour son talent rare à forger les fers d\'Asen et à raconter le mystère du feu qui purifie la colère.',
            duoPartnerName: 'Pasteur Emmanuel',
            duoId: 'duo-jesus-legba-01',
            episodeQuestion: '04 — La personne qui a retourné votre regard sur l’invisible.',
            protagonistIdRef: 'dah-zounon'
          }
        ]
      },
      {
        id: 'pere-matthieu',
        name: 'Père Matthieu',
        age: 59,
        role: 'Prêtre diocésain & vicaire de paroisse',
        territory: 'Cotonou',
        country: 'Bénin',
        flag: '🇧🇯',
        universeTag: 'Jesus',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Pionnier fondateur représentant le pôle chrétien. A voulu témoigner d\'une foi dépouillée de tout mépris envers les traditions des ancêtres.',
        duoPartnerName: 'Dah Zounon',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-jesus-legba-01',
        episodeQuestion: '01 — La rencontre intime avec la grâce.',
        protagonistIdRef: 'pere-matthieu',
        invitedPeople: [
          {
            id: 'pasteur-emmanuel',
            name: 'Pasteur Emmanuel',
            age: 44,
            role: 'Prédicateur évangélique & médiateur social',
            territory: 'Porto-Novo',
            country: 'Bénin',
            flag: '🇧🇯',
            universeTag: 'Jesus',
            photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'pere-matthieu',
            invitedByName: 'Père Matthieu',
            invitationStory: 'Fait entrer par le Père Matthieu après des nuits entières passées à apaiser les tensions entre jeunes convertis et anciens du village.',
            duoPartnerName: 'Hounon Gbaguidi',
            duoId: 'duo-jesus-legba-01',
            episodeQuestion: '04 — Le pardon aux portes de l’impossible.',
            protagonistIdRef: 'pere-matthieu',
            invitedPeople: [
              {
                id: 'marie-noelle',
                name: 'Marie-Noëlle',
                age: 28,
                role: 'Chanteuse chorale et maraîchère bio',
                territory: 'Ouidah',
                country: 'Bénin',
                flag: '🇧🇯',
                universeTag: 'Jesus',
                photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'pasteur-emmanuel',
                invitedByName: 'Pasteur Emmanuel',
                invitationStory: 'Invitée par le pasteur pour faire entendre la voix des femmes qui portent la foi quotidienne au marché et sous la pluie.',
                duoPartnerName: 'Frère Jean-Baptiste',
                duoId: 'duo-jesus-legba-01',
                episodeQuestion: '05 — Ce qu’on laisse aux générations futures.',
                protagonistIdRef: 'pere-matthieu'
              }
            ]
          },
          {
            id: 'theodore-cotonou',
            name: 'Théodore',
            age: 38,
            role: 'Éducateur auprès des enfants de rue',
            territory: 'Cotonou',
            country: 'Bénin',
            flag: '🇧🇯',
            universeTag: 'Jesus',
            photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'pere-matthieu',
            invitedByName: 'Père Matthieu',
            invitationStory: 'Invité par le Père Matthieu pour son engagement auprès des plus vulnérables à Dantokpa sans jamais juger personne.',
            duoPartnerName: 'Dah Zounon',
            duoId: 'duo-jesus-legba-01',
            episodeQuestion: '02 — L’amour éprouvé par la nuit.',
            protagonistIdRef: 'pere-matthieu'
          }
        ]
      }
    ]
  },
  {
    seriesId: 'finagnon-qosqorico',
    seriesTitle: 'Finagnon < > Qosqorico',
    subtitle: 'Bénin < > Pérou. Deux territoires. Une même réflexion sur ce qui nous relie à un lieu.',
    description: 'Comment l\'alliance secrète entre un maître tisserand de Porto-Novo et une gardienne des cimes andines a inspiré toute une communauté de piroguiers, luthiers et paysans d\'altitude.',
    centralQuestion: 'Le territoire',
    totalAffiliatedCount: 14,
    generationsCount: 3,
    pioneers: [
      {
        id: 'koffi-tisserand',
        name: 'Koffi',
        age: 54,
        role: 'Tisserand traditionnel',
        territory: 'Porto-Novo',
        country: 'Bénin',
        flag: '🇧🇯',
        universeTag: 'Finagnon',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Première effigie et initiateur du volet Finagnon. A posé la question originelle : « Que transmet une main qui tisse depuis l\'enfance ? »',
        duoPartnerName: 'Amara',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-koffi-amara',
        episodeQuestion: '02 — Le geste ancestral qui relie les générations.',
        protagonistIdRef: 'koffi-tisserand',
        invitedPeople: [
          {
            id: 'tobi-ganvie',
            name: 'Tobi',
            age: 48,
            role: 'Pêcheur toffinou & charpentier de pirogues',
            territory: 'Ganvié',
            country: 'Bénin',
            flag: '🇧🇯',
            universeTag: 'Finagnon',
            photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'koffi-tisserand',
            invitedByName: 'Koffi',
            invitationStory: 'Fait entrer par Koffi : Tobi sculptait les bois de teck sur les pilotis de Ganvié exactement avec la même patience que Koffi tendait ses fils.',
            duoPartnerName: 'Sayri',
            duoId: 'duo-finagnon-qosqorico-01',
            episodeQuestion: '01 — Chez soi : Quand sait-on qu’on appartient à un lieu ?',
            protagonistIdRef: 'koffi-tisserand',
            invitedPeople: [
              {
                id: 'amina-diallo',
                name: 'Amina',
                age: 34,
                role: 'Artiste sonore & gardienne de l’acoustique lacustre',
                territory: 'Ganvié',
                country: 'Bénin',
                flag: '🇧🇯',
                universeTag: 'Finagnon',
                photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'tobi-ganvie',
                invitedByName: 'Tobi',
                invitationStory: 'Invitée par Tobi pour capturer le chant des rames frappant l\'eau avant l\'aube et les berceuses toffinou oubliées.',
                duoPartnerName: 'Nayra',
                duoId: 'duo-finagnon-qosqorico-01',
                episodeQuestion: '04 — Ce qui reste quand tout le reste change.',
                protagonistIdRef: 'koffi-tisserand',
                invitedPeople: [
                  {
                    id: 'babacar-luthier',
                    name: 'Babacar',
                    age: 26,
                    role: 'Jeune luthier & fabricant d’instruments en bambou',
                    territory: 'Ganvié',
                    country: 'Bénin',
                    flag: '🇧🇯',
                    universeTag: 'Finagnon',
                    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
                    badge: 'Invité(e)',
                    invitedById: 'amina-diallo',
                    invitedByName: 'Amina',
                    invitationStory: 'Initié par Amina après qu’il a créé la première harpe d’eau en roseaux de la lagune de Nokoué.',
                    duoPartnerName: 'Nayra',
                    duoId: 'duo-finagnon-qosqorico-01',
                    episodeQuestion: '05 — Le chant de demain.',
                    protagonistIdRef: 'koffi-tisserand'
                  }
                ]
              }
            ]
          },
          {
            id: 'ayaba-grandpopo',
            name: 'Ayaba',
            age: 39,
            role: 'Tisseuse de nattes de jonc et sel traditionnel',
            territory: 'Grand-Popo',
            country: 'Bénin',
            flag: '🇧🇯',
            universeTag: 'Finagnon',
            photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'koffi-tisserand',
            invitedByName: 'Koffi',
            invitationStory: 'Invitée par Koffi pour sa mémoire des plantes tinctoriales sauvages du cordon littoral.',
            duoPartnerName: 'Don Huamán',
            duoId: 'duo-koffi-amara',
            episodeQuestion: '03 — Les couleurs qui naissent de la terre.',
            protagonistIdRef: 'koffi-tisserand'
          }
        ]
      },
      {
        id: 'amara-tisserande',
        name: 'Amara',
        age: 42,
        role: 'Tisserande andine',
        territory: 'Cusco',
        country: 'Pérou',
        flag: '🇵🇪',
        universeTag: 'Qosqorico',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Première effigie du volet Qosqorico. A fait résonner la laine d\'alpaga avec le coton de Koffi par-delà l\'océan Pacifique et l\'Atlantique.',
        duoPartnerName: 'Koffi',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-koffi-amara',
        episodeQuestion: '02 — La mémoire que chaque fil garde de la montagne.',
        protagonistIdRef: 'amara-tisserande',
        invitedPeople: [
          {
            id: 'sayri-pisac',
            name: 'Sayri',
            age: 51,
            role: 'Gardien des semences de maïs sacré & conteur quechua',
            territory: 'Pisac',
            country: 'Pérou',
            flag: '🇵🇪',
            universeTag: 'Qosqorico',
            photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'amara-tisserande',
            invitedByName: 'Amara',
            invitationStory: 'Invité par Amara : ses champs en terrasses sont les parchemins vivants dont les motifs de ses tissages sont issus.',
            duoPartnerName: 'Tobi',
            duoId: 'duo-finagnon-qosqorico-01',
            episodeQuestion: '01 — Le premier souffle reçu de la terre.',
            protagonistIdRef: 'amara-tisserande',
            invitedPeople: [
              {
                id: 'nayra-fileuse',
                name: 'Nayra',
                age: 29,
                role: 'Fileuse de vigogne et guide des sentiers incas',
                territory: 'Ollantaytambo',
                country: 'Pérou',
                flag: '🇵🇪',
                universeTag: 'Qosqorico',
                photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'sayri-pisac',
                invitedByName: 'Sayri',
                invitationStory: 'Inspirée par Sayri pour documenter le regard des jeunes filles quechuas face au tourisme de masse et préserver la dignité du geste.',
                duoPartnerName: 'Amina',
                duoId: 'duo-finagnon-qosqorico-01',
                episodeQuestion: '04 — Le courage de ne pas vendre son âme.',
                protagonistIdRef: 'amara-tisserande'
              }
            ]
          },
          {
            id: 'don-huaman',
            name: 'Don Huamán',
            age: 63,
            role: 'Maître teinturier d’altitude aux lichens sauvages',
            territory: 'Vallée Sacrée',
            country: 'Pérou',
            flag: '🇵🇪',
            universeTag: 'Qosqorico',
            photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'amara-tisserande',
            invitedByName: 'Amara',
            invitationStory: 'Fait entrer par Amara car il est le seul à connaître le secret de la teinture rouge cochenille fixée à l\'eau de source volcanique.',
            duoPartnerName: 'Ayaba',
            duoId: 'duo-koffi-amara',
            episodeQuestion: '03 — Les secrets confiés par le vent des hauteurs.',
            protagonistIdRef: 'amara-tisserande'
          }
        ]
      }
    ]
  },
  {
    seriesId: 'blacks-one-beyond-eve',
    seriesTitle: 'Blacks One < > Beyond Eve',
    subtitle: 'Deux expériences collectives. Une exploration de l\'identité et de ce que nous devenons.',
    description: 'De la poussière des ronds-points de Dakar aux galeries militantes de Marseille et Abidjan : comment une sororité et une fraternité se sont cooptées pour réécrire les identités.',
    centralQuestion: 'L\'identité',
    totalAffiliatedCount: 11,
    generationsCount: 3,
    pioneers: [
      {
        id: 'malik-barou',
        name: 'Malik Diop',
        age: 32,
        role: 'Danseur & chorégraphe urbain',
        territory: 'Dakar',
        country: 'Sénégal',
        flag: '🇸🇳',
        universeTag: 'Blacks One',
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Pionnier fondateur de Blacks One. A refusé de danser pour complaire à l\'Europe et a rassemblé la jeunesse de Dakar autour du rythme du sabar revisité.',
        duoPartnerName: 'Éléonore Vance',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-blacks-one-beyond-eve-01',
        episodeQuestion: '03 — Ce que l’on porte : Ce que l’on a reçu et qu’on refuse de poser.',
        protagonistIdRef: 'malik-barou',
        invitedPeople: [
          {
            id: 'cheikh-slam',
            name: 'Cheikh Fall',
            age: 27,
            role: 'Slameur & chroniqueur des coursives',
            territory: 'Médina (Dakar)',
            country: 'Sénégal',
            flag: '🇸🇳',
            universeTag: 'Blacks One',
            photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'malik-barou',
            invitedByName: 'Malik Diop',
            invitationStory: 'Invité par Malik après un duel de verbe sous un réverbère de la Médina : Malik a vu dans sa plume le miroir exact de ses pas de danse.',
            duoPartnerName: 'Fatou Bamba',
            duoId: 'duo-blacks-one-beyond-eve-01',
            episodeQuestion: '01 — Qui suis-je quand la musique s’arrête ?',
            protagonistIdRef: 'malik-barou',
            invitedPeople: [
              {
                id: 'ousmane-beat',
                name: 'Ousmane',
                age: 22,
                role: 'Beatmaker et archiveur de rythmes populaires',
                territory: 'Pikine',
                country: 'Sénégal',
                flag: '🇸🇳',
                universeTag: 'Blacks One',
                photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'cheikh-slam',
                invitedByName: 'Cheikh Fall',
                invitationStory: 'Fait entrer par Cheikh pour enregistrer sur cassettes audio les percussions spontanées des vendeuses de poisson.',
                duoPartnerName: 'Solène',
                duoId: 'duo-blacks-one-beyond-eve-01',
                episodeQuestion: '02 — Le regard des autres sur notre colère.',
                protagonistIdRef: 'malik-barou'
              }
            ]
          },
          {
            id: 'ibrahima-guediawaye',
            name: 'Ibrahima',
            age: 35,
            role: 'Bâtisseur d’espaces d’art autogérés',
            territory: 'Guédiawaye',
            country: 'Sénégal',
            flag: '🇸🇳',
            universeTag: 'Blacks One',
            photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'malik-barou',
            invitedByName: 'Malik Diop',
            invitationStory: 'Invité par Malik pour avoir transformé un garage abandonné en conservatoire populaire pour 80 adolescents.',
            duoPartnerName: 'Aïcha',
            duoId: 'duo-blacks-one-beyond-eve-01',
            episodeQuestion: '04 — Devenir quelqu’un d’autre sans trahir d’où l’on vient.',
            protagonistIdRef: 'malik-barou'
          }
        ]
      },
      {
        id: 'eleonore-saint-cloud',
        name: 'Éléonore Vance',
        age: 39,
        role: 'Artiste plasticienne, tisseuse de récits & curatrice',
        territory: 'Marseille / Abidjan',
        country: 'Côte d’Ivoire & France',
        flag: '🇨🇮',
        universeTag: 'Beyond Eve',
        photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Première effigie de Beyond Eve. A réuni les premières malles de pagnes de deuil pour questionner ce que les femmes portent sans l’avoir choisi.',
        duoPartnerName: 'Malik Diop',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-blacks-one-beyond-eve-01',
        episodeQuestion: '03 — Racontez-nous ce que vous portez encore de votre histoire.',
        protagonistIdRef: 'eleonore-saint-cloud',
        invitedPeople: [
          {
            id: 'fatou-bamba',
            name: 'Fatou Bamba',
            age: 34,
            role: 'Designer textile & théoricienne du matrimoine',
            territory: 'Abidjan',
            country: 'Côte d’Ivoire',
            flag: '🇨🇮',
            universeTag: 'Beyond Eve',
            photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'eleonore-saint-cloud',
            invitedByName: 'Éléonore Vance',
            invitationStory: 'Invitée par Éléonore pour ses recherches pionnières sur la signification secrète des motifs kita féminins chez les Akan.',
            duoPartnerName: 'Cheikh Fall',
            duoId: 'duo-blacks-one-beyond-eve-01',
            episodeQuestion: '01 — Qui nous nomme avant que nous ayons parlé ?',
            protagonistIdRef: 'eleonore-saint-cloud',
            invitedPeople: [
              {
                id: 'solene-marseille',
                name: 'Solène',
                age: 26,
                role: 'Photographe argentique & archiviste militante',
                territory: 'Marseille',
                country: 'France',
                flag: '🇫🇷',
                universeTag: 'Beyond Eve',
                photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'fatou-bamba',
                invitedByName: 'Fatou Bamba',
                invitationStory: 'Fait entrer par Fatou pour immortaliser les mains des mères au travail à Noailles et Abobo sans aucun filtre exotisant.',
                duoPartnerName: 'Ousmane',
                duoId: 'duo-blacks-one-beyond-eve-01',
                episodeQuestion: '05 — À celle qui viendra après nous.',
                protagonistIdRef: 'eleonore-saint-cloud'
              }
            ]
          },
          {
            id: 'aicha-conteur',
            name: 'Aïcha',
            age: 41,
            role: 'Sculptrice sur bronze à la cire perdue & conteuse',
            territory: 'Grand-Bassam',
            country: 'Côte d’Ivoire',
            flag: '🇨🇮',
            universeTag: 'Beyond Eve',
            photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'eleonore-saint-cloud',
            invitedByName: 'Éléonore Vance',
            invitationStory: 'Invitée par Éléonore pour son courage d’avoir conquis un métier réservé aux hommes depuis 400 ans dans la lagune Ébrié.',
            duoPartnerName: 'Ibrahima',
            duoId: 'duo-blacks-one-beyond-eve-01',
            episodeQuestion: '04 — La mue : devenir qui l’on était destinée à être.',
            protagonistIdRef: 'eleonore-saint-cloud'
          }
        ]
      }
    ]
  },
  {
    seriesId: 'dixeat-fiat-luxe',
    seriesTitle: 'Dixeat < > Fiat Luxe',
    subtitle: 'Ceux qui nourrissent les autres < > ceux qui créent des expériences d\'exception.',
    description: 'Le pont inattendu entre les géantes du feu de bois à Cotonou et les orfèvres des réceptions étoilées à Paris et Marrakech : comment chacun s\'est passé le flambeau de la délicatesse.',
    centralQuestion: 'L\'expérience',
    totalAffiliatedCount: 10,
    generationsCount: 3,
    pioneers: [
      {
        id: 'chef-koffi',
        name: 'Maman Henriette & Chef Koffi',
        age: 52,
        role: 'Maîtres cuisiniers du patrimoine vivant',
        territory: 'Cotonou',
        country: 'Bénin',
        flag: '🇧🇯',
        universeTag: 'Dixeat',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Première effigie de Dixeat. Ils préparent 400 repas chaque jour dès l\'aurore à Dantokpa avec une dignité royale et le respect absolu de chaque convive.',
        duoPartnerName: 'Hélène Saint-Amand',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-dixeat-fiat-luxe-01',
        episodeQuestion: '01 — Le goût : Créer quelque chose qui touche l’autre au cœur.',
        protagonistIdRef: 'chef-koffi',
        invitedPeople: [
          {
            id: 'roland-huile',
            name: 'Roland',
            age: 38,
            role: 'Presseur d’huile rouge ancestrale & fermier bio',
            territory: 'Bohicon',
            country: 'Bénin',
            flag: '🇧🇯',
            universeTag: 'Dixeat',
            photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'chef-koffi',
            invitedByName: 'Chef Koffi',
            invitationStory: 'Fait entrer par Chef Koffi car son huile de palme rouge pressée à froid au pilon de bois donne à la sauce la saveur intemporelle des grand-mères.',
            duoPartnerName: 'Marc-Antoine',
            duoId: 'duo-dixeat-fiat-luxe-01',
            episodeQuestion: '03 — Le détail infime qui change tout.',
            protagonistIdRef: 'chef-koffi',
            invitedPeople: [
              {
                id: 'felicite-epices',
                name: 'Félicité',
                age: 29,
                role: 'Cueilleuse de poivres sauvages et graines de paradis',
                territory: 'Dassa-Zoumè',
                country: 'Bénin',
                flag: '🇧🇯',
                universeTag: 'Dixeat',
                photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'roland-huile',
                invitedByName: 'Roland',
                invitationStory: 'Invitée par Roland pour faire découvrir les épices sacrées de savane qui soignent autant qu’elles régalent.',
                duoPartnerName: 'Yasmine',
                duoId: 'duo-dixeat-fiat-luxe-01',
                episodeQuestion: '05 — Ce que l’on offre sans compter.',
                protagonistIdRef: 'chef-koffi'
              }
            ]
          }
        ]
      },
      {
        id: 'helene-saint-amand',
        name: 'Hélène Saint-Amand',
        age: 49,
        role: 'Scénographe de tables d’exception & curatrice sensorielle',
        territory: 'Paris / Marrakech',
        country: 'France & Maroc',
        flag: '🇫🇷',
        universeTag: 'Fiat Luxe',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        isPioneer: true,
        badge: 'Première effigie',
        invitationStory: 'Première effigie de Fiat Luxe. Crée des dîners pour 12 convives où chaque assiette, odeur et bougie est pensée comme une partition théâtrale pour susciter l’émotion pure.',
        duoPartnerName: 'Chef Koffi',
        duoPartnerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        duoId: 'duo-dixeat-fiat-luxe-01',
        episodeQuestion: '01 — L’attention particulière qui rend un instant inoubliable.',
        protagonistIdRef: 'helene-saint-amand',
        invitedPeople: [
          {
            id: 'marc-antoine-sommelier',
            name: 'Marc-Antoine',
            age: 41,
            role: 'Alchimiste des infusions & sommelier botanique',
            territory: 'Paris',
            country: 'France',
            flag: '🇫🇷',
            universeTag: 'Fiat Luxe',
            photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
            badge: 'Invité(e)',
            invitedById: 'helene-saint-amand',
            invitedByName: 'Hélène Saint-Amand',
            invitationStory: 'Invité par Hélène pour ses accords subtils d\'eaux d\'herbes rares et de fermentations naturelles qui décuplent les arômes.',
            duoPartnerName: 'Roland',
            duoId: 'duo-dixeat-fiat-luxe-01',
            episodeQuestion: '02 — L’art d’écouter ce que l’autre attend en silence.',
            protagonistIdRef: 'helene-saint-amand',
            invitedPeople: [
              {
                id: 'yasmine-parfumeuse',
                name: 'Yasmine Benjelloun',
                age: 33,
                role: 'Nez parfumeur & créatrice de scénographies olfactives',
                territory: 'Marrakech',
                country: 'Maroc',
                flag: '🇲🇦',
                universeTag: 'Fiat Luxe',
                photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
                badge: 'Invité(e)',
                invitedById: 'marc-antoine-sommelier',
                invitedByName: 'Marc-Antoine',
                invitationStory: 'Fait entrer par Marc-Antoine pour créer la signature olfactive de fleur d’oranger et de résine de cèdre diffusée avant les repas.',
                duoPartnerName: 'Félicité',
                duoId: 'duo-dixeat-fiat-luxe-01',
                episodeQuestion: '04 — La surprise qui bouleverse les certitudes.',
                protagonistIdRef: 'helene-saint-amand'
              }
            ]
          }
        ]
      }
    ]
  }
];

