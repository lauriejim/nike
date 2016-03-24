// Objet
var story = {


	/* INTRO */


	intro : {
		video : 'intro',
	},


	/* CHAPTER 1 */


	gift : {
		title : 'Awake / Page blanche',
		chapter : 1,
		placeholder : 'Ecris ton texte ...',
		video : 'offre-chaussures',
		content : 'Marie m\’a offert une paire de running pour Noël. C\’est vrai que je me rappelle lui avoir dit que je comptais me mettre à courir, parce que',
		solution : [
			{word : false, story : 'wakeup'}
		], 
		rules : [
			{type: 'limit', param: 90}
		]
	},

	wakeup : {
		title : 'Awake / Page blanche',
		chapter : 1,
		video : 'reveil',
		placeholder : 'Que fais tu ? ...',
		content : 'Il est 6 heures. J\’avais dit que je commencerai à courir dès aujourd\’hui, mais c\’est encore les vacances. Je pourrais me lever plus tard. Finalement, je choisis de',
		solution : [
			{word : false, story : 'smsCine', consequence: 'reveil-long', conclusion : 'J\’ai à peine cligné des yeux et il est déjà midi. Ça commence bien…'},

			{word : ['dormir', 'rendormir', 'coucher', 'recoucher', 'rien', 'rester', 'pioncer', 'somnoler', 'roupiller', 'reposer', 'rêver', 'retourner', 'allonger', 'm\'allonger', 'prélasser', 'étirer', 'm\'étirer', 'clouer'], story : 'smsCine', consequence: 'reveil-long', conclusion : 'J\’ai à peine cligné des yeux et il est déjà midi. Ça commence bien…'},

			{word : ['lever', 'courir', 'réveiller', 'entrainer', 'jogging', 'debout', 'éveiller', 'm\’éveiller', 'sortir', 'dégager', 'bondir', 'sauter', 'rouler', 'redresser', 'aérer', 'm\’aérer'], story : 'getup', consequence: 'narrateur-dejeune', conclusion : 'Ce n\’est pas le moment de déjà laisser tomber mes bonnes résolutions. <i>Time to run !</i>'}
		], 
		rules : [
			{type: 'limit', param: 20}
		]
	},

			getup : {
				title : 'Awake / Page blanche',
				chapter : 1,
				placeholder : 'Ecris un verbe ...',
				video : 'epuisement',
				content : 'Premier jour d\’entraînement : tenir la distance est plus dur que prévu ! Je suis complètement essoufflé après 20 minutes de course. C\’est pas terrible, et je ne sais pas trop si je peux continuer. Je pense que je vais',
				solution : [
					{word : false, story : 'smsNext1', add : ['km:14', 'v:0.5'], consequence : 'narrateur-fuit', conclusion : 'Pas le temps pour ça : j\’entends des grognements bizarres pas loin, je vais faire demi-tour.'},

					{word : ['arreter', 'abandonner', 'mourir', 'clamser', 'écrouler', 'vomir', 'gerber', 'stopper', 'décéder', 'marcher', 'ramper', 'pause', 'rentrer', 'attendre', 'patienter', 'clopiner', 'errer', 'flâner', 'promener', 'trainer', 'balader', 'cesser', 'interrompre', 'abdiquer', 'lâcher', 'renoncer', 'céder', 'succomber', 'suspendre', 'reposer', 'immobiliser', 'm\’arreter', 'm\’écrouler', 'm\’attendre', 'm\’interrompre'], add : ['km:14', 'v:1'], story : 'smsParty', consequence: 'abandon', conclusion : 'Il est plus raisonnable de ne pas forcer plus pour aujourd’hui. Je ferai mieux la prochaine fois.'},

					{word : ['continuer', 'courir', 'suivre', 'galoper', 'trotter', 'trottiner', 'gambader', 'voyager', 'avancer', 'dépasser', 'poursuivre', 'persévérer', 'jogger'], story : 'howLong'}
				],
				rules : [
					{type: 'limit', param : 20},
					{type: 'space'}
				]
			},

					howLong : {
						title : 'Awake / Page blanche',
						chapter : 1,
						placeholder : 'Quelle durée / distance ? ...',
						content : 'Finalement, je décide de courir encore',
						endContent : 'minutes.',
						solution : [
							{word : false, story : 'smsParty', consequence : 'narrateur-fuit', conclusion : 'Pas le temps pour ça : j\’entends des grognements bizarres pas loin, je vais faire demi-tour.'},

							{word : ['longtemps', 'km', 'kms', 'kilomètres', 'heure', 'beaucoup', 'vite', 'encore', 'loin'], add : ['km:14', 'v:1'], story : 'smsNext1', consequence : 'chute', conclusion : 'A vouloir trop en faire je m\’étale par terre. Je serai plus raisonnable la prochaine fois.'},

							{word : ['peu', 'métres', 'minutes', 'moins', 'doucement'], add : ['km:28', 'v:0.5'], story : 'smsParty',consequence : 'narrateur-court-1', conclusion : 'Je réussis à tenir le coup. Comme quoi, quand on veut on peut.'}
						],
						rules : [
							{type: 'limit', param: 25}
						]
					},


			smsCine : {
				title : 'Awake / Page blanche',
				chapter : 1,
				placeholder : 'Ecris ton texte ...',
				video : 'sms-ami',
				content : 'Vincent me propose d\’aller au ciné aujourd\’hui. Je dois avouer que j\’avais très envie de',
				solution : [
					{word : false, story : 'smsCineNext'}
				],
				rules : [
					{type: 'limit', param: 45}
				]
			},

					smsCineNext : {
						title : 'Awake / Page blanche',
						chapter : 1,
						placeholder : 'Quelle est ta réponse ? ...',
						content : 'Mais j\’ai loupé mon entraînement ce matin, du coup j\’hésite. Après réflexion, je réponds',
						solution : [
							{word : false, add : ['km:14', 'v:0.5'], story : 'run', consequence: 'narrateur-recoit-appel', conclusion : 'Ma mère m\’appelle avant que j\’aie le temps d\’envoyer ma réponse. Elle a besoin de moi en urgence, le reste attendra.'},

							{word : ['oui', 'ok', 'oki', 'okidoki', 'ciné', 'cinéma', 'cine', 'd\’accord', 'yes', 'peux', 'veux', 'aérer', 'm\’aérer', 'sortir', 'venir', 'viens', 'viendrai', 'accepte'], add : ['km:14', 'v:0.5'], story : 'run', consequence: 'narrateur-attend-bus', conclusion : 'J\’espère que le film sera cool. Et après tout, je pourrai toujours aller courir plus tard.'},

							{word : ['non', 'courir', 'entrainer', 'm\’entrainer', 'jogging', 'jogger', 'rien', 'dehors', 'feignasse', 'fainéant'], add : ['km:28', 'v:1'], story : 'smsNext1', consequence: 'narrateur-court', conclusion : 'Il faut que je tienne mes résolutions si je veux atteindre mon objectif. Je n\’irai pas au cinéma avant d\’avoir fait mon jogging.'}
						],
						rules : [
							{type: 'limit', param: 32}
						]
					},


					/* CHAPTER 2 */


					smsNext1 : {
						title : 'Possibilities / Premiers jets',
						chapter : 2,
						placeholder : 'Ecris ton texte ...',
						video : 'sms-ami-2',
						content : 'Depuis trois mois, trois fois par semaine, je cours avec Vincent. Par contre j\’ai remarqué qu\’il annule ou veut reporter nos sessions de plus en plus souvent. La dernière fois c\’était à cause de',
						solution : [
							{word : false, story : 'smsNext1Next'}
						],
						rules : [
							{type: 'limit', param: 45}
						]
					},

							smsNext1Next : {
								title : 'Possibilities / Premiers jets',
								chapter : 2,
								placeholder : 'Quelle est ta réponse ? ...',
								content : 'Vincent vient encore d\’annuler. Je lui réponds',
								solution : [
									{word : false, add : ['km:230', 'v:1'], story : 'holliday2', consequence : 'narrateur-recoit-appel', conclusion : 'Ma mère m\’appelle avant que j\’aie le temps d\’envoyer ma réponse. Elle a besoin de moi en urgence, le reste attendra.'},

									{word : ['oui', 'ok', 'oki', 'okidoki', 'd\’accord', 'yes', 'peux', 'veux', 'fatiguer', 'fatigué', 'crever', 'crevé', 'flemme', 'accepte'],  add : ['km:276', 'v:1'], story : 'holliday2', consequence: 'narrateur-attend-bus', conclusion : 'C\’est toujours mieux de courir à deux, j\’attendrai qu\’il soit disponible.'},

									{word : ['non', 'aérer', 'm\’aérer', 'sortir', 'dehors', 'chiant', 'con', 'connard', 'salaud', 'merde', 'feignasse', 'fainéant', 'gueule'],  add : ['km:331', 'v:1'], story : 'holliday3', consequence: 'course-nuit-2', conclusion : 'Tant pis pour Vincent, mais je ne compte pas faire d\’écarts.'}
								],
								rules : [
									{type: 'limit', param: 32}
								]
							},

					run : {
						title : 'Possibilities / Premiers jets',
						chapter : 2,
						placeholder : 'Ecris un verbe ...',
						video : 'epuisement',
						content : 'Même après trois mois d\’entraînement, tenir la distance est plus dur que prévu. Aujourd\’hui, je suis complètement essoufflé après 40 minutes de course ; j\’aurais dû être plus rigoureux. Je ne sais pas trop si je peux continuer. Je pense que je vais',
						solution : [
							{word : false,  add : ['km:189', 'v:1'], story : 'holliday1', consequence : 'narrateur-fuit', conclusion : 'Pas le temps pour ça : j\’entends des grognements bizarres pas loin, je vais faire demi-tour.'},

							{word : ['arreter', 'abandonner', 'mourir', 'clamser', 'écrouler', 'vomir', 'gerber', 'stopper', 'décéder', 'marcher', 'ramper', 'pause', 'rentrer', 'attendre', 'patienter', 'clopiner', 'errer', 'flâner', 'promener', 'trainer', 'balader', 'cesser', 'interrompre', 'abdiquer', 'lâcher', 'renoncer', 'céder', 'succomber', 'suspendre', 'reposer', 'immobiliser', 'm\’arreter', 'm\’écrouler', 'm\’attendre', 'm\’interrompre'], add : ['km:230', 'v:1'], story : 'holliday2', consequence: 'abandon', conclusion : 'Parfois il faut savoir s\’arrêter au bon moment. Je dois reprendre le rythme progressivement.'},

							{word : ['continuer', 'courir', 'suivre', 'galoper', 'trotter', 'trottiner', 'gambader', 'voyager', 'avancer', 'dépasser', 'poursuivre', 'persévérer', 'jogger'], story : 'howLong2'}
						],
						rules : [
							{type: 'limit', param: 20},
							{type: 'space'}
						]
					},

							howLong2 : {
								title : 'Possibilities / Premiers jets',
								chapter : 2,
								placeholder : 'Quelle durée / distance ? ...',
								content : 'Finalement, je décide de courir encore',
								endContent : 'minutes.',
								solution : [
									{word : false, story : 'holliday1', consequence : 'narrateur-fuit', conclusion : 'Pas le temps pour ça : j\’entends des grognements bizarres pas loin, je vais faire demi-tour.'},

									{word : ['longtemps', 'km', 'kms', 'kilomètres', 'heure', 'beaucoup', 'vite', 'encore', 'loin'], add : ['km:189', 'v:1'], story : 'holliday1', consequence : 'chute', conclusion : 'A vouloir trop en faire je m\’étale par terre. Je serai plus raisonnable la prochaine fois.'},

									{word : ['peu', 'métres', 'minutes', 'moins', 'doucement'], add : ['km:276', 'v:1'], story : 'holliday2',consequence : 'narrateur-court-1', conclusion : 'Je réussis à tenir le coup. Comme quoi, quand on veut on peut.'}
								],
								rules : [
									{type: 'limit', param: 25}
								]
							},

					smsParty : {
						title : 'Possibilities / Premiers jets',
						chapter : 2,
						placeholder : 'Ecris ton texte ...',
						video : 'sms-ami-3',
						content : 'Ça fait trois mois que j\’ai commencé à courir régulièrement, et j\’ai plutôt bien pris le rythme. Aujourd\’hui Vincent me propose de venir à sa soirée. Je dois avouer que j\’avais très envie de',
						solution : [
							{word : false, story : 'smsPartyNext'}
						],
						rules : [
							{type: 'limit', param: 45}
						]
					},

							smsPartyNext : {
								title : 'Possibilities / Premiers jets',
								chapter : 2,
								placeholder : 'Quelle est ta réponse ? ...',
								content : 'Mais ça tombe un soir d\’entraînement, du coup j\’hésite. Après réflexion, je réponds',
								solution : [
									{word : false, add : ['km:189', 'v:1'], story : 'holliday1', consequence : 'narrateur-recoit-appel', conclusion : 'Ma mère m\’appelle avant que j\’aie le temps d\’envoyer ma réponse. Elle a besoin de moi en urgence ; le reste attendra.'},

									{word : ['oui', 'ok', 'oki', 'okidoki', 'd\’accord', 'yes', 'peux', 'veux', 'aérer', 'm\’aérer', 'sortir', 'venir', 'viens', 'viendrai', 'j\'accepte'], add : ['km:189', 'v:1'], story : 'holliday1', consequence: 'narrateur-prepare-soiree', conclusion : 'Rater un entraînement ne vas pas changer grand-chose..'},

									{word : ['non', 'courir', 'entrainer', 'm\’entrainer', 'jogging', 'jogger', 'rien', 'dehors', 'feignasse', 'fainéant', 'longtemps'], add : ['km:345', 'v:1'], story : 'holliday3', consequence: 'course-nuit-2', conclusion : 'Finalement tant pis pour la soirée. Je ne dois pas faire d\’écarts.'}
								],
								rules : [
									{type: 'limit', param: 32}
								]
							},


							/* CHAPTER 3 */


							holliday1 : {
								title : 'Move / Noircir les pages',
								chapter : 3,
								placeholder : 'Ecris un verbe ...',
								video : 'narrateur-valise-hotel',
								content : 'J\’en suis à six mois d\’entraînement, que je suis de façon plus ou moins régulière. Mais aujourd\’hui, je suis en vacances ! J\’ai noté plusieurs coins sympas à voir et des bons spots de running. Voilà une bonne journée pour',
								solution : [
									{word : false, add : ['km:598', 'v:1'], story : 'smsNext2', consequence : 'narrateur-range-ses-chaussures', conclusion : 'Les vacances c\’est fait pour se reposer, je vais laisser mes baskets au placard.'},

									{word : ['courir', 'entrainer', 's\’entrainer', 'm\’entrainer', 'jogging', 'jogger', 'sprinter', 'galoper', 'trotter', 'trottiner', 'sport', 'vélo', 'entrainement', 'bouger'], add : ['km:745', 'v:2'], story : 'runNight1', consequence : 'narrateur-met-ses-chaussures', conclusion : 'Je ne dois pas me laisser aller parce que c\’est les vacances. Un peu d\’exercice ne me fera pas de mal.'}
								],
								rules : [
									{type: 'limit', param: 20},
									{type: 'space'}
								]
							},

							holliday2 : {
								title : 'Move / Noircir les pages',
								chapter : 3,
								placeholder : 'Ecris un verbe ...',
								video : 'narrateur-valise-hotel',
								content : 'J\’en suis à six mois d\’entraînement régulier : je commence à m\’en sortir plutôt bien. Mais aujourd\’hui, je suis en vacances ! J\’ai noté plusieurs coins sympas à voir et des bons spots de running. Voilà une bonne journée pour',
								solution : [
									{word : false, add : ['km:745', 'v:2'], story : 'runNight1', consequence : 'narrateur-range-ses-chaussures', conclusion : 'Les vacances c\’est fait pour se reposer, je vais laisser mes baskets au placard pour aujourd\’hui. On verra demain.'},

									{word : ['courir', 'entrainer', 's\’entrainer', 'm\’entrainer', 'jogging', 'jogger', 'sprinter', 'galoper', 'trotter', 'trottiner', 'sport', 'vélo', 'entrainement', 'bouger'], add : ['km:910', 'v:3'], story : 'runNight2', consequence : 'narrateur-met-ses-chaussures', conclusion : 'Je ne dois pas me laisser aller parce que c\’est les vacances. Un peu d\’exercice ne me fera pas de mal.'}
								],
								rules : [
									{type: 'limit', param: 20},
									{type: 'space'}
								]
							},

							holliday3 : {
								title : 'Move / Noircir les pages',
								chapter : 3,
								placeholder : 'Ecris un verbe ...',
								video : 'narrateur-valise-hotel',
								content : 'J\’en suis à six mois d\’entraînement intensif : les changements sont incroyables. Mais aujourd\’hui, je suis en vacances ! J\’ai noté plusieurs coins sympas à voir et des bons spots de running. Voilà une bonne journée pour',
								solution : [
									{word : false, add : ['km:745', 'v:2'], story : 'runNight1', consequence : 'narrateur-range-ses-chaussures', conclusion : 'Les vacances c\’est fait pour se reposer, je vais laisser mes baskets au placard pour aujourd\’hui. On verra demain.'},

									{word : ['courir', 'entrainer', 's\’entrainer', 'm\’entrainer', 'jogging', 'jogger', 'sprinter', 'galoper', 'trotter', 'trottiner', 'sport', 'vélo', 'entrainement', 'bouger'], add : ['km:910', 'v:3'], story : 'runNight2', consequence : 'narrateur-met-ses-chaussures', conclusion : 'Je ne dois pas me laisser aller parce que c\’est les vacances. L\’entraînement avant tout !'}
								],
								rules : [
									{type: 'limit', param: 20},
									{type: 'space'}
								]
							},


									/* CHAPTER 4 */


									smsNext2 : {
										title : 'Rise / Envolée lyrique',
										chapter : 4,
										placeholder : 'Ecris ton text ...',
										video : 'sms-ami-2',
										content : 'Ça fait maintenant presque un an qu\’on m\’a offert ma première paire de running. J\’ai pris l\’habitude de courir avec Vincent.  Par contre, j\’ai remarqué qu\’il annule ou veut reporter nos sessions de plus en plus souvent. La dernière fois c\’était à cause de',
										solution : [
											{word : false, story : 'smsNext2Next'}
										],
										rules : [
											{type: 'limit', param: 45}
										]
									},

											smsNext2Next : {
												title : 'Rise / Envolée lyrique',
												chapter : 4,
												placeholder : 'Quelle est ta réponse ? ...',
												content : 'Vincent vient encore d\’annuler. Je lui réponds',
												solution : [
													{word : false, add : ['km:113', 'v:0.5'], story : 'schedule', consequence : 'narrateur-recoit-appel', conclusion : 'Je reçois un appel de ma mère avant que j\’aie le temps d\’envoyer ma réponse. Elle a besoin de moi en urgence, du coup le reste attendra.'},

													{word : ['oui', 'ok', 'oki', 'okidoki', 'd\’accord', 'yes', 'peux', 'veux', 'fatiguer', 'fatigué', 'crever', 'crevé', 'flemme', 'accepte'], add : ['km:113', 'v:0.5'], story : 'schedule', consequence: 'narrateur-attend-bus', conclusion : 'C\’est toujours mieux de courir à deux, j\’attendrai qu\’il soit disponible.'},

													{word : ['non', 'rien', 'courir', 'aérer', 'm\’aérer', 'sortir', 'dehors', 'chiant', 'con', 'connard', 'salaud', 'merde', 'feignasse', 'fainéant'], story : 'runNight1bis', conclusion : 'Tant pis pour Vincent, mais je ne compte pas faire d\’écarts.'}
												],
												rules : [
													{type: 'limit', param: 32}
												]
											},

									runNight1: {
										title : 'Rise / Envolée lyrique',
										chapter : 4,
										placeholder : 'Ecris un verbe ...',
										video : 'narrateur-point-de-cote-nuit',
										content : 'Ça fait maintenant presque un an qu\’on m\’a offert ma première paire de running. J\’ai atteint un niveau pas mauvais. Aujourd\’hui, comme à mon habitude, je cours mes 8 kilomètres, mais je sens la fatigue arriver. La semaine a été rude. Il me reste encore 2 kilomètres à parcourir pour atteindre mon objectif. Du coup je vais',
										solution : [
											{word : false, add : ['km:113', 'v:0.5'], story : 'schedule', consequence : 'narrateur-perdu-nuit', conclusion : 'Je n\’ai pas fait attention au trajet que j\’ai suivi, et maintenant je suis complètement perdu. Je sens la galère pour rentrer…'},

											{word : ['arreter', 'abandonner', 'mourir', 'clamser', 'écrouler', 'vomir', 'gerber', 'stopper', 'décéder', 'marcher', 'ramper', 'pause', 'rentrer', 'attendre', 'patienter', 'clopiner', 'errer', 'flâner', 'promener', 'trainer', 'balader', 'cesser', 'interrompre', 'abdiquer', 'lâcher', 'renoncer', 'céder', 'succomber', 'suspendre', 'reposer', 'immobiliser', 'm\’arreter', 'm\’écrouler', 'm\’attendre', 'm\’interrompre'], add : ['km:134', 'v:0.5'], story : 'schedule', consequence: 'narrateur-abandon-nuit', conclusion : 'Il est plus raisonnable de ne pas forcer plus pour aujourd\’hui. Je ferai mieux la prochaine fois.'},

											{word : ['continuer', 'courir', 'suivre', 'galoper', 'trotter', 'trottiner', 'gambader', 'voyager', 'avancer', 'dépasser', 'poursuivre', 'persévérer', 'jogger'], add : ['km:168', 'v:1'], story : 'perf', consequence: 'course-nuit-1', conclusion : 'C\’était difficile, mais j\’ai réussi. C\’est important de ne pas faire de concession sur ses objectifs.'},

										],
										rules : [
											{type: 'limit', param: 20}
										]
									},

									runNight1bis: {
										title : 'Rise / Envolée lyrique',
										chapter : 4,
										placeholder : 'Ecris un verbe ...',
										video : 'narrateur-point-de-cote-nuit',
										content : 'Aujourd\’hui, comme à mon habitude, je cours mes 6 kilomètres, mais je sens la fatigue arriver. La semaine a été rude. Il me reste encore 2 kilomètres à parcourir pour atteindre mon objectif. Du coup je vais',
										solution : [
											{word : false, add : ['km:113', 'v:0.5'], story : 'schedule', consequence : 'narrateur-perdu-nuit', conclusion : 'Je n\’ai pas fait attention au trajet que j\’ai suivi, et maintenant je suis complètement perdu. Je sens la galère pour rentrer…'},

											{word : ['arreter', 'abandonner', 'mourir', 'clamser', 'écrouler', 'vomir', 'gerber', 'stopper', 'décéder', 'marcher', 'ramper', 'pause', 'rentrer', 'attendre', 'patienter', 'clopiner', 'errer', 'flâner', 'promener', 'trainer', 'balader', 'cesser', 'interrompre', 'abdiquer', 'lâcher', 'renoncer', 'céder', 'succomber', 'suspendre', 'reposer', 'immobiliser', 'm\’arreter', 'm\’écrouler', 'm\’attendre', 'm\’interrompre'], add : ['km:127', 'v:0.5'], story : 'schedule', consequence: 'narrateur-abandon-nuit', conclusion : 'Il est plus raisonnable de ne pas forcer plus pour aujourd\’hui. Je ferai mieux la prochaine fois.'},

											{word : ['continuer', 'courir', 'suivre', 'galoper', 'trotter', 'trottiner', 'gambader', 'voyager', 'avancer', 'dépasser', 'poursuivre', 'persévérer', 'jogger'], add : ['km:159', 'v:1'], story : 'perf', consequence: 'course-nuit-1', conclusion : 'C\’était difficile, mais j\’ai réussi. C\’est important de ne pas faire de concession sur ses objectifs.'},

										],
										rules : [
											{type: 'limit', param: 20}
										]
									},

									runNight2: {
										title : 'Rise / Envolée lyrique',
										chapter : 4,
										placeholder : 'Ecris un verbe ...',
										video : 'narrateur-point-de-cote-nuit',
										content : 'Ça fait maintenant presque un an qu\’on m\’a offert ma première paire de running. J\’ai atteint un bon niveau. Aujourd\’hui, comme à mon habitude, je cours mes 10 kilomètres, mais je sens la fatigue arriver. La semaine a été rude. Il me reste encore 3 kilomètres à parcourir pour atteindre mon objectif. Du coup je vais',
										solution : [
											{word : false, add : ['km:127', 'v:0.5'], story : 'schedule', consequence : 'reveil', conclusion : 'Je n\’ai pas fait attention au trajet que j\’ai suivi, et maintenant je suis complètement perdu. Je sens la galère pour rentrer…'},

											{word : ['arreter', 'abandonner', 'mourir', 'clamser', 'écrouler', 'vomir', 'gerber', 'stopper', 'décéder', 'marcher', 'ramper', 'pause', 'rentrer', 'attendre', 'patienter', 'clopiner', 'errer', 'flâner', 'promener', 'trainer', 'balader', 'cesser', 'interrompre', 'abdiquer', 'lâcher', 'renoncer', 'céder', 'succomber', 'suspendre', 'reposer', 'immobiliser', 'm\’arreter', 'm\’écrouler', 'm\’attendre', 'm\’interrompre'], add : ['km:168', 'v:1'], story : 'perf', consequence: 'narrateur-abandon-nuit', conclusion : 'Il est plus raisonnable de ne pas forcer plus pour aujourd\’hui. Je ferai mieux la prochaine fois.'},

											{word : ['continuer', 'courir', 'suivre', 'galoper', 'trotter', 'trottiner', 'gambader', 'voyager', 'avancer', 'dépasser', 'poursuivre', 'persévérer', 'jogger'], add : ['km:211', 'v:1'], story : 'marathon', consequence: 'course-nuit-1', conclusion : 'C\’était difficile, mais j\’ai réussi. C\’est important de ne pas faire de concession sur ses objectifs.'},

										],
										rules : [
											{type: 'limit', param: 20}
										]
									},


											/* CHAPTER 5 */


											schedule: {
												title : 'Go Tell the World',
												chapter : 5,
												placeholder : 'Mets le point final à ton histoire ...',
												video : 'agenda',
												content : 'Mine de rien, au bout d\’un an de running, je sens vraiment la différence ; ça se voit aussi dans mon carnet d\’entraînement. Mais je ne compte pas en rester là : cette année j\’irai plus loin, plus vite.',
												solution : [
													{word : false, story : 'end', conclusion : 'Voici le point final de mon histoire.'}
												],
												rules : [
													{type: 'limit', param: 135}
												],
											},

											perf: {
												title : 'Go Tell the World',
												chapter : 5,
												placeholder : 'Mets le point final à ton histoire ...',
												video : 'records',
												content : 'Cette année d\’entraînement a vraiment porté ses fruits. J\’ai gardé une trace de mes premières courses dans mon carnet d’entraînement, et l\’évolution est flagrante !',
												solution : [
													{word : false, story : 'end', conclusion : 'Voici le point final de mon histoire.'}
												],
												rules : [
													{type: 'limit', param: 135}
												],
											},

											marathon: {
												title : 'Go Tell the World',
												chapter : 5,
												placeholder : 'Mets le point final à ton histoire ...',
												video : 'marathon',
												content : 'Ça y est, après tout ce temps, je me sens prêt à affronter la compétition. Après avoir inscrit minutieusement mes performances et m\’en être tenu à un programme rigoureux, il est temps de passer à l\’action.',
												solution : [
													{word : false, story : 'end', conclusion : 'Voici le point final de mon histoire.' }
												],
												rules : [
													{type: 'limit', param: 135}
												],
											},

											end: {
												end : true
											}

}