/*blocklyRoboy_lib-1.0.0 by Arthur Léonard*/

var robotCommands = [];

var getContext = function(display, infos, curLevel) {
	var localLanguageStrings = {
		fr: {
			label: {},
			code: {},
			messages: {},
			description: {}
		}
	};
	
	var contextStrings = {
		none: {
			fr: {
				label: {
					row: "ligne du robot",
					col: "colonne du robot",
					north: "avancer vers le haut",
					south: "avancer vers le bas",
					east: "avancer vers la droite",
					west: "avancer vers la gauche",
					left: "tourner à gauche",
					right: "tourner à droite",
					turnAround: "faire demi-tour",
					forward: "avancer",
					backwards: "reculer",
					jump: "sauter",
					obstacleInFront: "obstacle devant",
					obstacleEast: "obstacle à droite",
					obstacleWest: "obstacle à gauche",
					obstacleNorth: "obstacle en haut",
					obstacleSouth: "obstacle en bas",
					obstacleRight: "obstacle à droite",
					obstacleLeft: "obstacle à gauche",
					platformInFront: "plateforme devant",
					withdrawObject: "ramasser l'objet",
					dropObject: "déposer l'objet",
					onObject: "sur un objet",
					onContainer: "sur un conteneur",
					onNumber: "sur un nombre",
					onWritable: "sur un tableau",
					writeNumber: "écrire le nombre",
					readNumber: "lire le nombre",
					pushObject: "pousser l'objet",
					pushableInFront: "poussable devant"
				},
				code: {
					row: "ligneRobot",
					col: "colonneRobot",
					north: "haut",
					south: "bas",
					east: "droite",
					west: "gauche",
					left: "tournerGauche",
					right: "tournerDroite",
					turnAround: "demiTour",
					forward: "avancer",
					backwards: "reculer",
					jump: "sauter",
					obstacleInFront: "obstacleDevant",
					obstacleEast: "obstacleDroite",
					obstacleWest: "obstacleGauche",
					obstacleNorth: "obstacleHaut",
					obstacleSouth: "obstacleBas",
					obstacleRight: "obstacleDroiteRel",
					obstacleLeft: "obstacleGaucheRel",
					platformInFront: "plateformeDevant",
					withdrawObject: "ramasserObjet",
					dropObject: "deposerObjet",
					onObject: "surObjet",
					onContainer: "surConteneur",
					onNumber: "surNombre",
					onWritable: "surTableau",
					writeNumber: "ecrireNombre",
					readNumber: "lireNombre",
					pushObject: "pousserObjet",
					pushableInFront: "poussableDevant"
				},
				messages: {
					leavesGrid: "Le robot sort de la grille !",
					obstacle: "Le robot essaie de se déplacer sur un obstacle !",
					nothingToPickUp: "Il n'y a rien à ramasser !",
					falls: "Le robot se jette dans le vide",
					willFallAndCrash: "Le robot va tomber de haut et s'écraser !",
					jumpOutsideGrid: "Le robot essaie de sauter en dehors de la grille !",
					jumpObstacleBlocking: "Le robot essaie de sauter mais il y a un obstacle qui le bloque",
					jumpNoPlatform: "Le robot essaie de sauter mais il n'y a pas de plateforme au dessus !",
					tooManyObjects: "Le robot essaie de transporter trop d'objets à la fois !",
					emptyBag: "Le robot essaie de déposer un objet alors qu'il n'en transporte pas !",
					successReachExit: "Bravo, votre robot a atteint la sortie !",
					failureReachExit: "Votre robot n'a pas atteint la sortie.",
					successPickedAllWithdrawables: "Bravo, votre robot a tout ramassé !",
					failurePickedAllWithdrawables: "Votre robot n'a pas tout ramassé.",
					successContainersFilled: "Bravo, votre robot a rempli tous les conteneurs",
					failureContainersFilled: "Votre robot n'a pas rempli tous les conteneurs",
					failureUnfilteredObject: "Votre robot a ramassé un objet invalide",
					failureWriteHere: "Votre robot ne peut pas écrire ici !",
					failureReadHere: "Il n'y a pas de nombre écrit ici !",
					successNumbersWritten: "Bravo, votre robot a écrit les bons nombres !",
					failureNumbersWritten: "Votre robot n'a pas écrit les bons nombres !",
					failureNothingToPush: "Il n'y a pas d'objet à pousser !",
					failureWhilePushing: "Le robot ne peut pas pousser cet objet !"
				},
				startingBlockName: "Programme du robot"
			}
		},
		arrows: {
			fr: {
				messages: {
					obstacle: "Le robot va sortir du parcours fléché !",
					successReachExit: "Bravo, votre robot a récupéré le coffre !",
					failureReachExit: "Votre robot s'est perdu en chemin."
				}
			}	
		},
		cards: {
			fr: {
				label: {
					withdrawObject: "ramasser la carte",
					dropObject: "déposer la carte",
					onObject: "sur une carte",
					onContainer: "sur un emplacement de dépôt",
				},
				 messages: {
					successContainersFilled: "Bravo, votre robot a rangé les cartes au bon endroit !",
					failureContainersFilled: "Il y a encore des cartes mal rangées."
				}
			}
		},
		cones: {
			fr: {
				label: {
					dropObject: "déposer un plot",
					onContainer: "sur une case marquée",
					obstacleInFront: "plot devant"
				},
				 messages: {
					successContainersFilled: "Bravo, votre robot a déposé des plots sur les bonnes cases !",
					failureContainersFilled: "Il manque des plots ou ils ne sont pas au bon endroit."
				}
			}
		},	
		course: {
			fr: {
				messages: {
               successReachExit: "Bravo, le robot a atteint la case verte !",
               failureReachExit: "Le robot n'est pas arrivé sur la case verte.",
               obstacle: "Le robot tente de foncer dans un mur !"
            }
			}
		},
		dominoes: {
			fr: {
				label: {
               "withdrawObject": "ramasser le domino",
            },
				messages: {
               "successPickedAllWithdrawables": "Bravo, le robot a ramassé tous les dominos demandés !",
               "failurePickedAllWithdrawables": "Le robot n'a pas ramassé les dominos demandés."
            }
			}
		},
		marbles: {
			fr: {
				label: {
					withdrawObject: "ramasser la bille",
					dropObject: "déposer la bille",
					onObject: "sur une bille",
					onContainer: "sur un trou",
				},
				messages: {
					emptyBag: "Le robot ne porte pas de bille !",
					tooManyObjects: "Le robot porte déjà une bille !",
					successContainersFilled: "Bravo, vous avez rangé les billes !",
					failureContainersFilled: "Les billes ne sont pas toutes bien rangées !"
				}
			}
		},
		objects_in_space: {
			fr: {
				label: {
					obstacleInFront: "astéroïde devant"
				},
				messages: {
               obstacle: "Attention à l'astéroïde !"
            }
			}
		},
		paint: {
			fr: {
				 label: {
					dropObject: "peindre la case",
					onContainer: "sur une case marquée",
					readNumber: "nombre sur la case",
				 },
				 messages: {
					successContainersFilled: "Bravo, votre robot a peint le motif !",
					failureContainersFilled: "Le robot n'a pas peint les bonnes cases."
				 }
			}  
      },
		rocket: {
			fr: {
				label: {
				},
				messages: {
               successReachExit: "Bravo, le robot a rejoint la fusée !",
               failureReachExit: "Le robot est perdu dans l'espace. Recommencez pour l'aider à rejoindre la fusée.",
               obstacle: "Attention à l'astéroïde !"
            }
			}
		},
		sokoban: {
			fr: {
					label: {
						pushObject: "pousser la caisse",
						onContainer: "sur une case marquée",
						pushableInFront: "caisse devant",
						obstacleInFront: "mur devant"
					},
					messages: {
						successContainersFilled: "Bravo, les caisses sont bien rangées !",
						failureContainersFilled: "Il y a encore des caisses qui ne sont pas à leur place.",
						failureNothingToPush: "Il n'y a pas de caisse à pousser ici !",
						failureWhilePushing: "Le robot ne peut pas pousser ici !",
						obstacle: "Le robot essaie de foncer dans un mur ou dans une caisse !"
					}
				}
		},
	};
	
	var contextParams = {
		none: {
			hideSaveOrLoad: true,
			actionDelay: 200,
			ignoreInvalidMoves: false,
			checkEndEveryTurn: false,
			cellSide: 60
		},
		arrows: {
			newBlocks: [
				{
					name: "onRightArrow",
					strings: {
						fr: {
							label: "sur une flèche vers la droite",
							code: "surFlecheDroite",
							description: "surFlecheDroite(): Le robot est-il sur une flèche vers la droite ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onRightArrow",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.forwardsRight===true;}));
					}
				},
				{
					name: "onLeftArrow",
					strings: {
						fr: {
							label: "sur une flèche vers la gauche",
							code: "surFlecheGauche",
							description: "surFlecheGauche(): Le robot est-il sur une flèche vers la gauche ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onLeftArrow",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.forwardsLeft===true;}));
					}
				},
				{
					name: "onTopArrow",
					strings: {
						fr: {
							label: "sur une flèche vers le haut",
							code: "surFlecheHaut",
							description: "surFlecheHaut(): Le robot est-il sur une flèche vers le haut ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onTopArrow",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.forwardsTop===true;}));
					}
				},
				{
					name: "onBottomArrow",
					strings: {
						fr: {
							label: "sur une flèche vers le bas",
							code: "surFlecheBas",
							description: "surFlecheBas(): Le robot est-il sur une flèche vers le bas ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onBottomArrow",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.forwardsBottom===true;}));
					}
				}
			],
			itemTypes: {
				red_robot: { img: "red_robot.png", side: 65, nbStates: 1, isRobot: true, offsetX: -5, zOrder: 2 },
				cell: {num: 1, img: "cell.png", side: 60, isObstacle: true },
				box: { num: 3, img: "box.png", side: 60, isExit: true },
				leftArrow: { num: 4, img: "leftArrow.png", side: 60, forwardsLeft: true, zOrder: 0},
				rightArrow: { num: 5, img: "rightArrow.png", side: 60, forwardsRight: true, zOrder: 0},
				topArrow: { num: 6, img: "topArrow.png", side: 60, forwardsTop: true, zOrder: 0},
				bottomArrow: { num: 7, img: "bottomArrow.png", side: 60, forwardsBottom: true, zOrder: 0}
			},
			checkEndCondition: robotEndConditions.checkReachExit
		},
		cards: {
			newBlocks: [
				{
					name: "onRound",
					strings: {
						fr: {
							label: "rond sur la carte",
							code: "rondCarte",
							description: "rondCarte(): Le robot est-il sur une carte qui contient un rond ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onRound",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isRound===true;}));
					}
				},
				{
					name: "onSquare",
					strings: {
						fr: {
							label: "carré sur la carte",
							code: "carreCarte",
							description: "carreCarte(): Le robot est-il sur une carte qui contient un carré ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onSquare",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isSquare===true;}));
					}
				},
				{
					name: "onTriangle",
					strings: {
						fr: {
							label: "triangle sur la carte",
							code: "triangleCarte",
							description: "rondCarte(): Le robot est-il sur une carte qui contient un triangle ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onTriangle",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isTriangle===true;}));
					}
				},
				{
					name: "onPurple",
					strings: {
						fr: {
							label: "carte violette",
							code: "surViolet",
							description: "surViolet(): Le robot est-il sur une carte violette ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onPurple",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isPurple===true;}));
					}
				},
				{
					name: "onOrange",
					strings: {
						fr: {
							label: "carte orange",
							code: "surOrange",
							description: "surOrange(): Le robot est-il sur une carte orange ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onOrange",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isOrange===true;}));
					}
				},
				{
					name: "onGreen",
					strings: {
						fr: {
							label: "carte verte",
							code: "surVert",
							description: "surviolet(): Le robot est-il sur une carte verte ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onGreen",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isGreen===true;}));
					}
				},
				{
					name: "onQuadrille",
					strings: {
						fr: {
							label: "motif quadrillé",
							code: "surQuadrille",
							description: "surQuadrille(): Le robot est-il sur une carte quadrillée ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onQuadrille",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isQuadrille===true;}));
					}
				},
				{
					name: "onStriped",
					strings: {
						fr: {
							label: "motif rayé",
							code: "surRaye",
							description: "surRaye(): Le robot est-il sur une carte rayée ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onStriped",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isStriped===true;}));
					}
				},
				{
					name: "onDotted",
					strings: {
						fr: {
							label: "motif à pois",
							code: "surPois",
							description: "surPois(): Le robot est-il sur une carte à pois ?"
						}
					},
					category: "robot",
					type: "sensors",
					block: {
						name: "onDotted",
						yieldsValue: true
					},
					func: function(callback) {
						this.callCallback(callback, this.isOn(function(obj) {return obj.isDotted===true;}));
					}
				}
			],
			containerSize: 100,
			itemTypes: {
				red_robot: { img: "red_robot.png", side: 60, nbStates: 1, isRobot: true, zOrder: 2 },
				cell: {num: 1, img: "cell.png", side: 60, zOrder: 0},
				purple: { num: 2, img: "purple.png", side: 60, isContainer: true, containerFilter: function(obj) { return obj.isPurple === true; }, zOrder: 0 },
				green: { num: 3, img: "green.png", side: 60, isContainer: true, containerFilter: function(obj) { return obj.isGreen === true; }, zOrder: 0 },
				orange: { num: 4, img: "orange.png", side: 60, isContainer: true, containerFilter: function(obj) { return obj.isOrange === true; }, zOrder: 0 },
				roundPurpleQuadrille: { img: "roundPurpleQuadrille.png", side: 60, isWithdrawable: true, isRound: true, isPurple: true, isQuadrille: true, zOrder: 1 },
				squarePurpleQuadrille: { img: "squarePurpleQuadrille.png", side: 60, isWithdrawable: true, isSquare: true, isPurple: true, isQuadrille: true, zOrder: 1 },
				trianglePurpleQuadrille: { img: "trianglePurpleQuadrille.png", side: 60, isWithdrawable: true, isTriangle: true, isPurple: true, isQuadrille: true, zOrder: 1 },
				roundOrangeQuadrille: { img: "roundOrangeQuadrille.png", side: 60, isWithdrawable: true, isRound: true, isOrange: true, isQuadrille: true, zOrder: 1 },
				squareOrangeQuadrille: { img: "squareOrangeQuadrille.png", side: 60, isWithdrawable: true, isSquare: true, isOrange: true, isQuadrille: true, zOrder: 1 },
				triangleOrangeQuadrille: { img: "triangleOrangeQuadrille.png", side: 60, isWithdrawable: true, isTriangle: true, isOrange: true, isQuadrille: true, zOrder: 1 },
				roundGreenQuadrille: { img: "roundGreenQuadrille.png", side: 60, isWithdrawable: true, isRound: true, isGreen: true, isQuadrille: true, zOrder: 1 },
				squareGreenQuadrille: { img: "squareGreenQuadrille.png", side: 60, isWithdrawable: true, isSquare: true, isGreen: true, isQuadrille: true, zOrder: 1 },
				triangleGreenQuadrille: { img: "triangleGreenQuadrille.png", side: 60, isWithdrawable: true, isTriangle: true, isGreen: true, isQuadrille: true, zOrder: 1 },
				roundPurpleStriped: { img: "roundPurpleStriped.png", side: 60, isWithdrawable: true, isRound: true, isPurple: true, isStriped: true, zOrder: 1 },
				squarePurpleStriped: { img: "squarePurpleStriped.png", side: 60, isWithdrawable: true, isSquare: true, isPurple: true, isStriped: true, zOrder: 1 },
				trianglePurpleStriped: { img: "trianglePurpleStriped.png", side: 60, isWithdrawable: true, isTriangle: true, isPurple: true, isStriped: true, zOrder: 1 },
				roundOrangeStriped: { img: "roundOrangeStriped.png", side: 60, isWithdrawable: true, isRound: true, isOrange: true, isStriped: true, zOrder: 1 },
				squareOrangeStriped: { img: "squareOrangeStriped.png", side: 60, isWithdrawable: true, isSquare: true, isOrange: true, isStriped: true, zOrder: 1 },
				triangleOrangeStriped: { img: "triangleOrangeStriped.png", side: 60, isWithdrawable: true, isTriangle: true, isOrange: true, isStriped: true, zOrder: 1 },
				roundGreenStriped: { img: "roundGreenStriped.png", side: 60, isWithdrawable: true, isRound: true, isGreen: true, isStriped: true, zOrder: 1 },
				squareGreenStriped: { img: "squareGreenStriped.png", side: 60, isWithdrawable: true, isSquare: true, isGreen: true, isStriped: true, zOrder: 1 },
				triangleGreenStriped: { img: "triangleGreenStriped.png", side: 60, isWithdrawable: true, isTriangle: true, isGreen: true, isStriped: true, zOrder: 1 },
				roundPurpleDotted: { img: "roundPurpleDotted.png", side: 60, isWithdrawable: true, isRound: true, isPurple: true, isDotted: true, zOrder: 1 },
				squarePurpleDotted: { img: "squarePurpleDotted.png", side: 60, isWithdrawable: true, isSquare: true, isPurple: true, isDotted: true, zOrder: 1 },
				trianglePurpleDotted: { img: "trianglePurpleDotted.png", side: 60, isWithdrawable: true, isTriangle: true, isPurple: true, isDotted: true, zOrder: 1 },
				roundOrangeDotted: { img: "roundOrangeDotted.png", side: 60, isWithdrawable: true, isRound: true, isOrange: true, isDotted: true, zOrder: 1 },
				squareOrangeDotted: { img: "squareOrangeDotted.png", side: 60, isWithdrawable: true, isSquare: true, isOrange: true, isDotted: true, zOrder: 1 },
				triangleOrangeDotted: { img: "triangleOrangeDotted.png", side: 60, isWithdrawable: true, isTriangle: true, isOrange: true, isDotted: true, zOrder: 1 },
				roundGreenDotted: { img: "roundGreenDotted.png", side: 60, isWithdrawable: true, isRound: true, isGreen: true, isDotted: true, zOrder: 1 },
				squareGreenDotted: { img: "squareGreenDotted.png", side: 60, isWithdrawable: true, isSquare: true, isGreen: true, isDotted: true, zOrder: 1 },
				triangleGreenDotted: { img: "triangleGreenDotted.png", side: 60, isWithdrawable: true, isTriangle: true, isGreen: true, isDotted: true, zOrder: 1 },
			},
			checkEndCondition: robotEndConditions.checkContainersFilled
		},
		cones: {
			bagInit: {
			  count: 200,
			  type: "cone"
			},
			itemTypes: {
				green_robot: { img: "green_robot.png", side: 65, nbStates: 9, isRobot: true, offsetX: -2, offsetY: -2, zOrder: 2 },
				cell: {num: 1, img: "cell.png", side: 60, zOrder: 0},
				marker: { num: 2, img: "marker.png", side: 60, isContainer: true, zOrder: 0 },
				cone: { num: 3, img: "cone.png", side: 60, isWithdrawable: true, isObstacle: true, zOrder: 1 },
			},
			checkEndCondition: robotEndConditions.checkContainersFilled
		},
		course: {
			itemTypes: {
				red_robot: { img: "red_robot.png", side: 60, nbStates: 1, isRobot: true },
				obstacle: { num: 2, img: "obstacle.png", side: 60, isObstacle: true },
				green: { num: 3, img: "green.png", side: 60, isExit: true}
			},
			checkEndCondition: robotEndConditions.checkReachExit
		},
		dominoes: {
			newBlocks: [
			  {
				 name: "onYellow",
				 strings: {
					fr: {
					  label: "sur du jaune",
					  code: "surJaune",
					  description: "surJaune(): Le robot est-il sur du jaune ?"
					}
				 },
				 category: "robot",
				 type: "sensors",
				 block: {
					name: "onYellow",
					yieldsValue: true
				 },
				 func: function(callback) {
					this.callCallback(callback, this.isOn(function(obj) {return obj.isYellow===true;}));
				 }
			  },
			  {
				 name: "onOrange",
				 strings: {
					fr: {
					  label: "sur du orange",
					  code: "surOrange",
					  description: "surOrange(): Le robot est-il sur du orange ?"
					}
				 },
				 category: "robot",
				 type: "sensors",
				 block: {
					name: "onOrange",
					yieldsValue: true
				 },
				 func: function(callback) {
					this.callCallback(callback, this.isOn(function(obj) {return obj.isOrange===true;}));
				 }
			  },
			  {
				 name: "onBlue",
				 strings: {
					fr: {
					  label: "sur du bleu",
					  code: "surBleu",
					  description: "surBleu(): Le robot est-il sur du bleu ?"
					}
				 },
				 category: "robot",
				 type: "sensors",
				 block: {
					name: "onBlue",
					yieldsValue: true
				 },
				 func: function(callback) {
					this.callCallback(callback, this.isOn(function(obj) {return obj.isBlue===true;}));
				 }
			  }
			],
			itemTypes: {
				red_robot: { img: "red_robot.png", side: 60, nbStates: 1, isRobot: true, zOrder: 2 },
				cell: { num: 1, img: "cell.png", side: 60, zOrder: 0},
				YY: { num: 2, img: "YY.png", side: 60, isWithdrawable: true, isYellow: true, zOrder: 1 },
				YO: { num: 3, img: "YO.png", side: 60, isWithdrawable: true, isYellow: true, isOrange: true, zOrder: 1 },
				YB: { num: 4, img: "YB.png", side: 60, isWithdrawable: true, isYellow: true, isBlue: true, zOrder: 1 },
				OY: { num: 5, img: "OY.png", side: 60, isWithdrawable: true, isOrange: true, isYellow: true, zOrder: 1 },
				OO: { num: 6, img: "OO.png", side: 60, isWithdrawable: true, isOrange: true, zOrder: 1 },
				OB: { num: 7, img: "OB.png", side: 60, isWithdrawable: true, isOrange: true, isBlue: true, zOrder: 1 },
				BY: { num: 8, img: "BY.png", side: 60, isWithdrawable: true, isBlue: true, isYellow: true, zOrder: 1 },
				BO: { num: 9, img: "BO.png", side: 60, isWithdrawable: true, isBlue: true, isOrange: true, zOrder: 1 },
				BB: { num: 10, img: "BB.png", side: 60, isWithdrawable: true, isBlue: true, zOrder: 1 }
			}
		},
		gems: {
			itemTypes: {
				green_robot: { img: "green_robot.png", side: 50, nbStates: 9, isRobot: true, offsetX: 3, zOrder: 2 },
				cell: { num: 2, img: "cell.png", side: 60},
				gem: { num: 3, img: "gem.png", side: 60, isWithdrawable: true, autoWithdraw: true, zOrder: 1 },
				obstacle: { num: 4, img: "obstacle.png", side: 60, isObstacle: true, zOrder: 0 }
			},
			checkEndCondition: robotEndConditions.checkPickedAllWithdrawables
		},
		help: {
			itemTypes: {
				green_robot: { img: "green_robot.png", side: 60, nbStates: 9, isRobot: true, zOrder: 2 },
				obstacle: { num: 2, img: "obstacle.png", side: 60, isObstacle: true },
				green: { num: 3, img: "green.png", side: 60, isExit: true}
			},
			checkEndCondition: robotEndConditions.checkReachExit
		},
		marbles: {
			bagSize: 1,
			itemTypes: {
				red_robot: { img: "red_robot.png", side: 60, nbStates: 1, isRobot: true,  zOrder: 2 },
				cell: { num: 2, img: "cell.png", side: 60 },
				hole: { num: 3, img: "hole.png", side: 60, isContainer: true, zOrder: 0 },
				marble: { num: 4, img: "marble.png", side: 60, isWithdrawable: true, zOrder: 1 }
			},
			checkEndCondition: robotEndConditions.checkContainersFilled
		},
		objects_in_space: {
			itemTypes: {
				green_robot: { img: "green_robot.png", side: 50, nbStates: 9, isRobot: true, offsetX: 3, zOrder: 2 },
				cell: { num: 2, img: "cell.png", side: 60},
				stars: { num: 3, img: "stars.png", side: 60},
				objet1: { num: 4, img: "objet1.png", side: 60, isWithdrawable: true, zOrder: 1 },
				objet2: { num: 5, img: "objet2.png", side: 60, isWithdrawable: true, zOrder: 1 },
				obstacle: { num: 6, img: "asteroide.png", side: 60, isObstacle: true, zOrder: 0 }
			},
			checkEndCondition: robotEndConditions.checkPickedAllWithdrawables
		},
		paint: {
			bagInit: {
			  count: 200,
			  type: "paint"
			},
			backgroundColor: "#ffbf5e",
			itemTypes: {
				red_robot: { img: "red_robot.png", side: 60, nbStates: 1, isRobot: true, zOrder: 2 },
				cell: { num: 2, color: "#ffbf5e", side: 60 },
				marker: { num: 3, img: "marker.png", side: 60, isContainer: true, zOrder: 0 },
				paint: { color: "#2e1de5", side: 60, isWithdrawable: true, zOrder: 1 },
				number: { side: 60, zOrder: 1 }
			},
			checkEndCondition: robotEndConditions.checkContainersFilled
		},
		rocket: {
			itemTypes: {
				green_robot: { img: "green_robot.png", side: 50, nbStates: 9, isRobot: true, offsetX: 3, zOrder: 2 },
				cell: { num: 2, img: "cell.png", side: 60},
				stars: { num: 3, img: "stars.png", side: 60},
				obstacle: { num: 4, img: "asteroide.png", side: 60, isObstacle: true, zOrder: 0 },
				rocket: { num: 5, img: "rocket.png", side: 60, isExit: true, zOrder: 0 }			
			},
			checkEndCondition: robotEndConditions.checkReachExit
		},
		sokoban: {
			itemTypes: {
				green_robot: { img: "green_robot.png", side: 60, nbStates: 9, isRobot: true, offsetX: 3, zOrder: 2 },
				cell: { num: 1, img: "cell.png", side: 60},
				wall: { num: 2, img: "wall.png", side: 60, isObstacle: true, zOrder: 0 },
				marker: { num: 3, img: "marker.png", side: 60, isContainer: true, zOrder: 0 },
				box: { num: 4, img: "box.png", side: 60, isObstacle: true, isPushable: true, isWithdrawable: true, zOrder: 1 }			
			},
			checkEndCondition: robotEndConditions.checkContainersFilled
		}
	};

   var iconSrc = $("img[src$='icon.png']").attr("src");
   var imgPrefix = iconSrc.substring(0, iconSrc.length - 8);
	
	if(infos.newBlocks == undefined)
		infos.newBlocks = [];
	if(infos.maxFallAltitude == undefined)
		infos.maxFallAltitude = 2;
	
	var loadContext = function(name) {
		for(var language in contextStrings[name]) {
			var ctx = contextStrings[name][language];
			for(var type in ctx) {
				if((typeof ctx[type]) === "string") {
					localLanguageStrings[language][type] = ctx[type];
				}
				else {
					if(localLanguageStrings[language][type] == undefined)
						localLanguageStrings[language][type] = {};
					for(var line in ctx[type]) {
						localLanguageStrings[language][type][line] = ctx[type][line];
					}
				}
			}
		}
		
		for(var param in contextParams[name]) {
			if(infos.param === undefined) {
				infos[param] = contextParams[name][param];
			}
		}
	};
	
	loadContext("none");
	if(infos.contextType != undefined) {
		loadContext(infos.contextType);
	}
	
	infos.newBlocks.push({
		name: "row",
		type: "sensors",
		block: { name: "row", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, 1 + this.getRobot().row);
		}
	});
	
	infos.newBlocks.push({
		name: "col",
		type: "sensors",
		block: { name: "col", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, 1 + this.getRobot().col);
		}
	});
	
	infos.newBlocks.push({
		name: "north",
		type: "actions",
		block: { name: "north" },
		func: function(callback) {
			this.north(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "south",
		type: "actions",
		block: { name: "south" },
		func: function(callback) {
			this.south(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "east",
		type: "actions",
		block: { name: "east" },
		func: function(callback) {
			this.east(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "west",
		type: "actions",
		block: { name: "west" },
		func: function(callback) {
			this.west(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "left",
		type: "actions",
		block: { name: "left" },
		func: function(callback) {
			this.turnLeft(callback);
		}
	});

	infos.newBlocks.push({
		name: "right",
		type: "actions",
		block: { name: "right" },
		func: function(callback) {
			this.turnRight(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "turnAround",
		type: "actions",
		block: { name: "turnAround" },
		func: function(callback) {
			this.turnAround(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "forward",
		type: "actions",
		block: { name: "forward" },
		func: function(callback) {
			this.forward(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "backwards",
		type: "actions",
		block: { name: "backwards" },
		func: function(callback) {
			this.backwards(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "jump",
		type: "actions",
		block: { name: "jump" },
		func: function(callback) {
			this.jump(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "obstacleInFront",
		type: "sensors",
		block: { name: "obstacleInFront", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, this.obstacleInFront());
		}
	});
	
	infos.newBlocks.push({
		name: "obstacleEast",
		type: "sensors",
		block: { name: "obstacleEast", yieldsValue: true },
		func: function(callback) {
			var robot = this.getRobot();
			this.callCallback(callback, this.hasOn(robot.row, robot.col + 1, function(obj) { return obj.isObstacle === true; }));
		}
	});
	
	infos.newBlocks.push({
		name: "obstacleWest",
		type: "sensors",
		block: { name: "obstacleWest", yieldsValue: true },
		func: function(callback) {
			var robot = this.getRobot();
			this.callCallback(callback, this.hasOn(robot.row, robot.col - 1, function(obj) { return obj.isObstacle === true; }));
		}
	});
	
	infos.newBlocks.push({
		name: "obstacleNorth",
		type: "sensors",
		block: { name: "obstacleNorth", yieldsValue: true },
		func: function(callback) {
			var robot = this.getRobot();
			this.callCallback(callback, this.hasOn(robot.row - 1, robot.col, function(obj) { return obj.isObstacle === true; }));
		}
	});
	
	infos.newBlocks.push({
		name: "obstacleSouth",
		type: "sensors",
		block: { name: "obstacleSouth", yieldsValue: true },
		func: function(callback) {
			var robot = this.getRobot();
			this.callCallback(callback, this.hasOn(robot.row + 1, robot.col, function(obj) { return obj.isObstacle === true; }));
		}
	});
	
	infos.newBlocks.push({
		name: "obstacleRight",
		type: "sensors",
		block: { name: "obstacleRight", yieldsValue: true },
		func: function(callback) {
			var robot = this.getRobot();
			var coords = this.coordsInFront(1);
			this.callCallback(callback, this.hasOn(coords.row, coords.col, function(obj) { return obj.isObstacle === true; }));
		}
	});
	
	infos.newBlocks.push({
		name: "obstacleLeft",
		type: "sensors",
		block: { name: "obstacleLeft", yieldsValue: true },
		func: function(callback) {
			var robot = this.getRobot();
			var coords = this.coordsInFront(3);
			this.callCallback(callback, this.hasOn(coords.row, coords.col, function(obj) { return obj.isObstacle === true; }));
		}
	});
	
	infos.newBlocks.push({
		name: "platformInFront",
		type: "sensors",
		block: { name: "platformInFront", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, this.platformInFront());
		}
	});
	
	infos.newBlocks.push({
		name: "withdrawObject",
		type: "actions",
		block: { name: "withdrawObject" },
		func: function(callback) {
			this.withdraw();
			this.waitDelay(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "dropObject",
		type: "actions",
		block: { name: "dropObject" },
		func: function(callback) {
			this.drop();
			this.waitDelay(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "onObject",
		type: "sensors",
		block: { name: "onObject", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, this.isOn(function(obj) { return obj.isWithdrawable === true;}));
		}
	});
	
	infos.newBlocks.push({
		name: "onContainer",
		type: "sensors",
		block: { name: "onContainer", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, this.isOn(function(obj) { return obj.isContainer === true;}));
		}
	});
	
	infos.newBlocks.push({
		name: "onNumber",
		type: "sensors",
		block: { name: "onNumber", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, this.isOn(function(obj) { return obj.value !== undefined;}));
		}
	});
	
	infos.newBlocks.push({
		name: "onWritable",
		type: "sensors",
		block: { name: "onWritable", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, this.isOn(function(obj) { return obj.isWritable === true; }));
		}
	});
	
	infos.newBlocks.push({
		name: "writeNumber",
		type: "actions",
		block: { name: "writeNumber", params: [null] },
		func: function(value, callback) {
			var robot = this.getRobot();
			this.writeNumber(robot.row, robot.col, value);
			this.waitDelay(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "readNumber",
		type: "sensors",
		block: { name: "readNumber", yieldsValue: true },
		func: function(callback) {
			var robot = this.getRobot();
			this.callCallback(callback, this.readNumber(robot.row, robot.col));
		}
	});
	
	infos.newBlocks.push({
		name: "pushObject",
		type: "actions",
		block: { name: "pushObject" },
		func: function(callback) {
			this.pushObject(callback);
		}
	});
	
	infos.newBlocks.push({
		name: "pushableInFront",
		type: "sensors",
		block: { name: "pushableInFront", yieldsValue: true },
		func: function(callback) {
			this.callCallback(callback, this.isInFront(function(obj) { return obj.isPushable === true; }));
		}
	});
	
	var context = quickAlgoContext(display, infos);
	context.robot = {};
	context.customBlocks = {
		robot: {
			actions: [],
			sensors: []
		}
	};
	
	for(var command in infos.newBlocks) {
		cmd = infos.newBlocks[command];
		context.customBlocks.robot[cmd.type].push(cmd.block);
		if(cmd.strings) {
			for(var language in cmd.strings) {
				for(var type in cmd.strings[language]) {
					localLanguageStrings[language][type][cmd.name] = cmd.strings[language][type];
				}
			}
		}
		if(cmd.func) {
			context.robot[cmd.name] = cmd.func.bind(context);
		}
	}
	
	var strings = context.setLocalLanguageStrings(localLanguageStrings);
	
	function replaceStringsRec(source, dest) {
	
		if((typeof source != "object") || (typeof dest != "object")) {
			return;
		}
		for(var key1 in source) {
			if(dest[key1] != undefined) {
				if(typeof dest[key1] == "object") {
					replaceStringsRec(source[key1], dest[key1]);
				}
				else {
					dest[key1] = source[key1];
				}
			}
		}
	}
	
	if(infos.languageStrings != undefined) {
		replaceStringsRec(infos.languageStrings.blocklyRobot_lib, strings);
	}
	
	var cells = [];
	var colsLabels = [];
	var rowsLabels = [];
	var scale = 1;
	var paper;
	
	if(infos.leftMargin === undefined) {
		infos.leftMargin = 0;
	}
	if(infos.topMargin === undefined) {
		if(infos.showLabels) {
			infos.topMargin = 0;
		}
		else {
			infos.topMargin = infos.cellSide / 2;
		}
	}
	if(infos.showLabels) {
		infos.leftMargin += infos.cellSide;
		infos.topMargin += infos.cellSide;
	}
	
	switch(infos.blocklyColourTheme) {
		case "bwinf":
			context.provideBlocklyColours = function() {
				return {
					categories: {
						logic: 100,
						loops: 180,
						math: 220,
						text: 250,
						lists: 60,
						colour: 310,
						variables: 340,
						functions: 20,
						actions: 260,
						sensors : 340,
						_default: 280
					},
					blocks: {}
				};
			}
			break;
		default:
	}
	
	context.reset = function(gridInfos) {
		if(gridInfos) {
			context.tiles = gridInfos.tiles;
			context.initItems = gridInfos.initItems;
			context.nbRows = context.tiles.length;
			context.nbCols = context.tiles[0].length;
		}
		context.items = [];
		context.lost = false;
		context.success = false;
		context.nbMoves = 0;
		context.bag = [];
		
		if(infos.bagInit != undefined) {
			for(var i = 0;i < infos.bagInit.count;i++) {
				var item = {};
				
				var initItem = infos.itemTypes[infos.bagInit.type];
				
				item.type = infos.bagInit.type;
				item.side = 0;
				item.offsetX = 0;
				item.offsetY = 0;
				item.nbStates = 1;
				item.zOrder = 0;
				for(var property in initItem) {
					item[property] = initItem[property];
				}
				
				context.bag.push(item);
			}
		}
		
		if(context.display) {
			context.resetDisplay();
			$("#nbMoves").html(context.nbMoves);
		}
		else {
			resetItems();
		}
	};
	
	context.resetDisplay = function() {
		this.delayFactory.destroyAll();
		this.raphaelFactory.destroyAll();
		paper = this.raphaelFactory.create("paperMain", "grid", infos.cellSide * context.nbCols * scale, infos.cellSide * context.nbRows * scale);
		resetBoard();
		resetItems();
		context.updateScale();
	};
	
	context.unload = function() {
		if(context.display && paper != null) {
			paper.remove();
		}
	};
	
	var itemAttributes = function(item) {
		var itemType = infos.itemTypes[item.type];
		var x = (infos.cellSide * item.col + item.offsetX + infos.leftMargin) * scale;
		var y = (infos.cellSide * item.row - (item.side - infos.cellSide) + item.offsetY + infos.topMargin) * scale;
		var xClip = x;
		if(item.dir != undefined) {
			var dirToState = [0, 2, 4, 6];
			x = x - (dirToState[item.dir] * item.side * scale);
		}
		var clipRect = "" + xClip + "," + y + "," + (item.side * scale) + "," + (item.side * scale);
		if(!itemType.img && !itemType.color) {
			x += item.side * scale / 2;
			y += item.side * scale / 2;
		}
		
		var ret = {x: x, y: y, width: item.side * item.nbStates * scale, height: item.side * scale, "clip-rect": clipRect};
		return ret;//{x: x, y: y, width: item.side * item.nbStates * scale, height: item.side * scale, "clip-rect": clipRect};
	}
	
	var resetBoard = function() {
		for(var iRow = 0;iRow < context.nbRows;iRow++) {
			cells[iRow] = [];
			for(var iCol = 0;iCol < context.nbCols;iCol++) {
				cells[iRow][iCol] = paper.rect(0, 0, 10, 10);
				if(infos.backgroundColor)
					cells[iRow][iCol].attr({'fill': infos.backgroundColor});
			}
		}
		if(infos.showLabels) {
			for(var iRow = 0;iRow < context.nbRows;iRow++) {
				rowsLabels[iRow] = paper.text(0, 0, (iRow + 1));
			}
			for(var iCol = 0;iCol < context.nbCols;iCol++) {
				colsLabels[iCol] = paper.text(0, 0, (iCol + 1));
			}
		}
	};
	
	var resetItem = function(initItem, redisplay) {
		if(redisplay === undefined)
			redisplay = true;
		var item = {};
		context.items.push(item);
		for(var property in initItem) {
			item[property] = initItem[property];
		}
		
		item.side = 0;
		item.offsetX = 0;
		item.offsetY = 0;
		item.nbStates = 1;
		item.zOrder = 0;
		for(var property in infos.itemTypes[item.type]) {
			item[property] = infos.itemTypes[item.type][property];
		}
		if(context.display && redisplay) {
			redisplayItem(item);
		}
	};
	
	var resetItems = function() {
		context.items = [];
		var itemTypeByNum = {};
		for(var type in infos.itemTypes) {
			var itemType = infos.itemTypes[type];
			if(itemType.num != undefined) {
				itemTypeByNum[itemType.num] = type;
			}
		}
		for(var iRow = 0;iRow < context.nbRows;iRow++) {
			for(var iCol = 0;iCol < context.nbCols;iCol++) {
				var itemTypeNum = context.tiles[iRow][iCol];
				if(itemTypeByNum[itemTypeNum] != undefined) {
					resetItem({
						row: iRow,
						col: iCol,
						type: itemTypeByNum[itemTypeNum]
					}, false);
				}
			}
		}
		for(var iItem = context.initItems.length - 1;iItem >= 0;iItem--) {
			resetItem(context.initItems[iItem], false);
		}
		
		if(context.display)
			redisplayAllItems();
	};
	
	var resetItemsZOrder = function(row, col) {
		var cellItems = [];
		for(var iItem = context.items.length - 1;iItem >= 0;iItem--) {
			var item = context.items[iItem];
			if((item.row == row) && (item.col == col)) {
				cellItems.push(item);
			}
		}
		cellItems.sort(function(itemA, itemB) {
			if(itemA.zOrder < itemB.zOrder) {
				return -1;
			}
			if(itemA.zOrder > itemB.zOrder) {
				return 1;
			}
			return 0;
		});
		for(var iItem = 0;iItem < cellItems.length;iItem++) {
			cellItems[iItem].element.toFront();
		}
	};

	var redisplayItem = function(item, resetZOrder) {
		if(resetZOrder === undefined)
			resetZOrder = true;
		if(item.element != null) {
			item.element.remove();
		}
		var x = (infos.cellSide * item.col + infos.leftMargin) * scale;
		var y = (infos.cellSide * item.row + infos.topMargin) * scale;
		var itemType = infos.itemTypes[item.type];
		if(itemType.img) {
			item.element = paper.image(imgPrefix + itemType.img, x, y, item.side * item.nbStates * scale, item.side * scale);
		}
		else if(item.value !== undefined) {
			item.element = paper.text(x + item.side * scale / 2, y + item.side * scale / 2, item.value).attr({"font-size": item.side * scale / 2});
		}
		else if(item.color !== undefined) {
			item.element = paper.rect(0, 0, item.side, item.side).attr({"fill": item.color});
		}
		item.element.attr(itemAttributes(item));
		if(resetZOrder)
			resetItemsZOrder(item.row, item.col);
	};
	
	context.updateScale = function() {
		if(!context.display) {
			return;
		}
		if(paper == null) {
			return;
		}
		var newCellSide = 0;
		if(context.nbCols && context.nbRows) {
			var marginAsCols = infos.leftMargin / infos.cellSide;
			var marginAsRows = infos.topMargin / infos.cellSide;
			newCellSide = Math.min(infos.cellSide, Math.min(400 / (context.nbCols + marginAsCols), 600 / (context.nbRows + marginAsRows)));
		}
		scale = newCellSide / infos.cellSide;
		paper.setSize((infos.cellSide * context.nbCols + infos.leftMargin) * scale, (infos.cellSide * context.nbRows + infos.topMargin) * scale);
		
		for(var iRow = 0;iRow < context.nbRows;iRow++) {
			for(var iCol = 0;iCol < context.nbCols;iCol++) {
				if(cells[iRow][iCol] === undefined)
					continue;
				var x = (infos.cellSide * iCol + infos.leftMargin) * scale;
				var y = (infos.cellSide * iRow + infos.topMargin) * scale;
				cells[iRow][iCol].attr({x: x, y: y, width: infos.cellSide * scale, height: infos.cellSide * scale});
			}
		}
		if(infos.showLabels) {
			for(var iRow = 0;iRow < context.nbRows;iRow++) {
				var x = (infos.leftMargin - infos.cellSide / 2) * scale;
				var y = (infos.cellSide * (iRow + 0.5) + infos.topMargin) * scale;
				rowsLabels[iRow].attr({x: x, y: y}).attr({"font-size": infos.cellSide * scale / 2});
			}
			for(var iCol = 0;iCol < context.nbCols;iCol++) {
				var x = (infos.cellSide * iCol + infos.leftMargin + infos.cellSide / 2) * scale;
				var y = (infos.topMargin - infos.cellSide / 2) * scale;
				colsLabels[iCol].attr({x: x, y: y}).attr({"font-size": infos.cellSide * scale / 2});
			}
		}
		
		redisplayAllItems();		
	};
	
	var redisplayAllItems = function() {
		for(var iItem = 0;iItem < context.items.length;iItem++) {
			var item = context.items[iItem];
			redisplayItem(item, false);
			item.element.attr(itemAttributes(item));
		}
		
		var cellItems = [];
		for(var iRow = 0;iRow < context.nbRows;iRow++) {
			cellItems[iRow] = [];
			for(var iCol = 0;iCol < context.nbCols;iCol++) {
				cellItems[iRow][iCol] = [];
			}
		}
		
		for(var iItem = context.items.length - 1;iItem >= 0;iItem--) {
			var item = context.items[iItem];
			cellItems[item.row][item.col].push(item);
		}
		
		for(var iRow = 0;iRow < context.nbRows;iRow++) {
			for(var iCol = 0;iCol < context.nbCols;iCol++) {
				cellItems[iRow][iCol].sort(function(itemA, itemB) {
					if(itemA.zOrder < itemB.zOrder) {
						return -1;
					}
					if(itemA.zOrder > itemB.zOrder) {
						return 1;
					}
					return 0;
				});
				for(var iItem = 0;iItem < cellItems[iRow][iCol].length;iItem++) {
					cellItems[iRow][iCol][iItem].element.toFront();
				}
			}
		}
	};
	
	context.getRobotId = function() {
		for(var id in context.items) {
			if(context.items[id].isRobot != undefined) {
				return id;
			}
		}
		return undefined;
	};
	
	context.getRobot = function() {
		return context.items[context.getRobotId()];
	};
	
	context.hasOn = function(row, col, filter) {
		for(var id in context.items) {
			var item = context.items[id];
			if(item.row == row && item.col == col && filter(item)) {
				return true;
			}
		}
		return false;
	};
	
	context.getItemsOn = function(row, col, filter) {
		if(filter === undefined) {
			filter = function(obj) { return true; };
		}
		var selected = [];
		for(var id in context.items) {
			var item = context.items[id];
			if(item.row == row && item.col == col && filter(item)) {
				item.index = id;
				selected.push(item);
			}
		}
		return selected;
	};
	
	context.isOn = function(filter) {
		var item = context.getRobot();
		return context.hasOn(item.row, item.col, filter);
	};
	
	context.isInFront = function(filter) {
		var coords = context.coordsInFront();
		return context.hasOn(coords.row, coords.col, filter);
	};
	
	context.isInGrid = function(row, col) {
		if(row < 0 || col < 0 || row >= context.nbRows || col >= context.nbCols)
			return false;
		return true;
	};
	
	context.tryToBeOn = function(row, col) {
		if(!context.isInGrid(row, col) || (context.tiles[row][col] == 0)) {
			if(infos.ignoreInvalidMoves)
				return false;
			throw(strings.messages.leavesGrid);
		}
		
		if(context.hasOn(row, col, function(item) { return item.isObstacle === true; })) {
			if(infos.ignoreInvalidMoves)
				return false;
			throw(strings.messages.obstacle);
		}
		return true;
	};
	
	context.coordsInFront = function(dDir, mult) {
		if(dDir === undefined)
			dDir = 0;
		if(mult === undefined)
			mult = 1;
		var item = context.getRobot();
		var lookDir = (item.dir + dDir + 4) % 4;
		var delta = [[0,1],[1,0],[0,-1],[-1,0]];
		return {
			row: item.row + delta[lookDir][0] * mult,
			col: item.col + delta[lookDir][1] * mult
		};
	};
	
	context.moveRobot = function(newRow, newCol, newDir, callback) {
		var iRobot = context.getRobotId();
		var item = context.items[iRobot];
		var animate = (item.row != newRow) || (item.col != newCol) || (newDir == item.dir);
		
		if((item.dir != newDir) && ((item.row != newRow) || (item.col != newCol))) {
			if(item.dir !== undefined)
				item.dir = newDir;
			if(context.display) {
				var attr = itemAttributes(item);
				item.element.attr(attr);
			}
		}
		
		if(item.dir !== undefined)
			item.dir = newDir;
		item.row = newRow;
		item.col = newCol;
		
		context.withdraw(function(obj) { return obj.autoWithdraw === true; }, false);
		
		if(context.display) {
			if(animate) {
				attr = itemAttributes(item);
				context.raphaelFactory.animate("animRobot" + iRobot + "_" + Math.random(), item.element, attr, infos.actionDelay);
			}
			else {
				attr = itemAttributes(item);
				if(infos.actionDelay > 0) {
					context.delayFactory.createTimeout("moveRobot" + iRobot + "_" + Math.random(), function() {
						item.element.attr(attr);
					}, infos.actionDelay / 2);
				} else {
					item.element.attr(attr);
				}
			}
			$("#nbMoves").html(context.nbMoves);
		}
		
		context.waitDelay(callback);
	};
	
	context.moveItem = function(item, newRow, newCol) {
		var animate = (item.row != newRow) || (item.col != newCol);
		var robot = context.getRobot();
		if(context.display) {
			resetItemsZOrder(newRow, newCol);
			resetItemsZOrder(item.row, item.col);
			resetItemsZOrder(robot.row, robot.col);
		}
		item.row = newRow;
		item.col = newCol;
		
		if(context.display) {
			if(animate) {
				attr = itemAttributes(item);
				context.raphaelFactory.animate("animItem" + "_" + Math.random(), item.element, attr, infos.actionDelay);
			}
			else {
				attr = itemAttributes(item);
				if(infos.actionDelay > 0) {
					context.delayFactory.createTimeout("moveItem" + "_" + Math.random(), function() {
						item.element.attr(attr);
					}, infos.actionDelay / 2);
				} else {
					item.element.attr(attr);
				}
			}
		}
	};
	
	context.fall = function(item, row, col, callback) {
		var startRow = row;
		var platforms = context.getItemsOn(row + 1, col, function(obj) { return obj.isObstacle === true; });
		
		while(context.isInGrid(row + 1, col) && platforms.length == 0) {
			row++;
			platforms = context.getItemsOn(row + 1, col, function(obj) { return obj.isObstacle === true; });
		}
		
		if(!context.isInGrid(row + 1, col)) {
			throw(context.strings.messages.falls);
		}
		
		if(row - startRow > infos.maxFallAltitude) {
			throw(context.strings.messages.willFallAndCrash);
		}
		context.nbMoves++;
		context.moveRobot(row, col, item.dir, callback);
	};
	
	context.jump = function(callback) {
		if(!infos.hasGravity) {
			throw("Error: can't jump without gravity");
		}
		
		var item = context.getRobot();
		if(!context.isInGrid(item.row - 1, item.col)) {
			throw(context.strings.messages.jumpOutsideGrid);
		}
		var obstacle = context.getItemsOn(item.row - 2, item.col, function(obj) { return obj.isObstacle === true; });
		if(obstacle.length > 0) {
			throw(context.strings.messages.jumpObstacleBlocking);
		}
		var platforms = context.getItemsOn(item.row - 1, item.col, function(obj) { return obj.isObstacle === true; });
		if(platforms.length == 0) {
			throw(context.strings.messages.jumpNoPlatform);
		}
		context.nbMoves++;
		context.moveRobot(item.row - 2, item.col, item.dir, callback);
	};
	
	context.withdraw = function(filter, errorWhenEmpty) {
		if(filter === undefined) {
			filter = function(obj) { return true; };
		}
		if(errorWhenEmpty === undefined) {
			errorWhenEmpty = true;
		}
		var item = context.getRobot();
		var withdrawables = context.getItemsOn(item.row, item.col, function(obj) { return obj.isWithdrawable === true && filter(obj); });
		if(withdrawables.length == 0) {
			if(errorWhenEmpty)
				throw(context.strings.messages.nothingToPickUp);
			return;
		}
		
		if(infos.bagSize != undefined && context.bag.length == infos.bagSize) {
			throw(context.strings.messages.tooManyObjects);
		}
		
		var withdrawable = withdrawables[0];
		context.items.splice(withdrawable.index, 1);
		context.bag.push(withdrawable);
		
		if(context.display) {
			context.delayFactory.createTimeout("takeItem_" + Math.random(), function() {
				withdrawable.element.remove();
			}, infos.actionDelay);
		}
	};
	
	context.drop = function(count, filter) {
		if(count === undefined) {
			count = 1;
		}
		if(filter === undefined) {
			filter = function(obj) { return true; };
		}
		var item = context.getRobot();
		
		for(var i = 0;i < count;i++) {
			if(context.bag.length == 0) {
				throw(context.strings.messages.emptyBag);
			}
			
			var object = context.bag.pop();
			object.row = item.row;
			object.col = item.col;
			context.items.push(object);
			
			if(context.display) {
				redisplayItem(object);
			}
		}
	}
	
	context.turnLeft = function(callback) {
		var robot = context.getRobot();
		context.moveRobot(robot.row, robot.col, (robot.dir + 3) % 4, callback);
	};
	
	context.turnRight = function(callback) {
		var robot = context.getRobot();
		context.moveRobot(robot.row, robot.col, (robot.dir + 1) % 4, callback);
	};
	
	context.turnAround = function(callback) {
		var robot = context.getRobot();
		context.moveRobot(robot.row, robot.col, (robot.dir + 2) % 4, callback);
	};
	
	context.forward = function(callback) {
		var robot = context.getRobot();
		var coords = context.coordsInFront();
		if(!context.tryToBeOn(coords.row, coords.col)) {
			context.waitDelay(callback);
		}
		if(infos.hasGravity) {
			context.fall(item, coords.row, coords.col, callback);
		}
		else {
			context.nbMoves++;
			context.moveRobot(coords.row, coords.col, robot.dir, callback);
		}
	};
	
	context.backwards = function(callback) {
		var robot = context.getRobot();
		var coords = context.coordsInFront(2);
		if(!context.tryToBeOn(coords.row, coords.col)) {
			context.waitDelay(callback);
		}
		if(infos.hasGravity) {
			context.fall(item, coords.row, coords.col, callback);
		}
		else {
			context.nbMoves++;
			context.moveRobot(coords.row, coords.col, robot.dir, callback);
		}
	};
	
	context.north = function(callback) {
		var item = context.getRobot();
		if(!context.tryToBeOn(item.row - 1, item.col)) {
			context.waitDelay(callback);
		} else {
			context.nbMoves++;
			context.moveRobot(item.row - 1, item.col, 3, callback);
		}
	};
	
	context.south = function(callback) {
		var item = context.getRobot();
		if(!context.tryToBeOn(item.row + 1, item.col)) {
			context.waitDelay(callback);
		} else {
			context.nbMoves++;
			context.moveRobot(item.row + 1, item.col, 1, callback);
		}
	};
	
	context.east = function(callback) {
		var item = context.getRobot();
		if(!context.tryToBeOn(item.row, item.col + 1)) {
			context.waitDelay(callback);
		} else {
			context.nbMoves++;
			context.moveRobot(item.row, item.col + 1, 0, callback);
		}
	};
	
	context.west = function(callback) {
		var item = context.getRobot();
		if(!context.tryToBeOn(item.row, item.col - 1)) {
			context.waitDelay(callback);
		} else {
			context.nbMoves++;
			context.moveRobot(item.row, item.col - 1, 2, callback);
		}
	};
	
	context.obstacleInFront = function() {
		return context.isInFront(function(obj) { return obj.isObstacle === true; });
	};
	
	context.platformInFront = function() {
		var coords = context.coordsInFront();
		return context.hasOn(coords.row + 1, coords.col, function(obj) { return obj.isObstacle === true; });
	};
	
	context.writeNumber = function(row, col, value) {
		var numbers = context.getItemsOn(row, col, function(obj) { return obj.isWritable === true; });
		
		if(numbers.length == 0) {
			throw(strings.messages.failureWriteHere);
		}
		
		var number = numbers[0];
		number.value = value;
		if(context.display) {
			redisplayItem(number);
		}
	};
	
	context.readNumber = function(row, col) {
		var numbers = context.getItemsOn(row, col, function(obj) { return obj.value !== undefined; });
		
		if(numbers.length == 0) {
			throw(strings.messages.failureReadHere);
		}
		
		return numbers[0].value;
	};
	
	context.pushObject = function(callback) {
		var robot = context.getRobot();
		var coords = context.coordsInFront();
		
		var items = context.getItemsOn(coords.row, coords.col, function(obj) { return obj.isPushable === true ; });
		
		if(items.length == 0) {
			throw(strings.messages.failureNothingToPush);
		}
		
		var coordsAfter = context.coordsInFront(0, 2);
		
		if(!context.isInGrid(coordsAfter.row, coordsAfter.col))
			throw(strings.messages.failureWhilePushing);
		if(context.hasOn(coordsAfter.row, coordsAfter.col, function(obj) { return obj.isObstacle === true; } ))
			throw(strings.messages.failureWhilePushing);
		if(context.tiles[coordsAfter.row][coordsAfter.col] == 0)
			throw(strings.messages.failureWhilePushing);
		
		context.moveItem(items[0], coordsAfter.row, coordsAfter.col);
		
		context.forward(callback);
	};
		
	return context;
};

var robotEndConditions = {
	checkReachExit: function(context, lastTurn) {
		var robot = context.getRobot();
		if(context.isOn(function(obj) { return obj.isExit === true; })) {
			context.success = true;
			throw(window.languageStrings.messages.successReachExit);
		}
		if(lastTurn) {
			context.success = false;
			throw(window.languageStrings.messages.failureReachExit);
		}
	},
	checkPickedAllWithdrawables: function(context, lastTurn) {
		var solved = true;
		for(var row = 0;row < context.nbRows;row++) {
			for(var col = 0;col < context.nbCols;col++) {
				if(context.hasOn(row, col, function(obj) { return obj.isWithdrawable === true; })) {
					solved = false;
				}
			}
		}
		
		if(solved) {
			context.success = true;
			throw(window.languageStrings.messages.successPickedAllWithdrawables);
		}
		if(lastTurn) {
			context.success = false;
			throw(window.languageStrings.messages.failurePickedAllWithdrawables);
		}
	},
	checkContainersFilled: function(context, lastTurn) {
		var solved = true;
		for(var row = 0;row < context.nbRows;row++) {
			for(var col = 0;col < context.nbCols;col++) {
				var containers = context.getItemsOn(row, col, function(obj) { return obj.isContainer === true });
				if(containers.length != 0) {
					var container = containers[0];
					if(container.containerSize == undefined && container.containerFilter == undefined) {
						container.containerSize = 1;
					}
					var filter;
					if(container.containerFilter == undefined)
						filter = function(obj) { return obj.isWithdrawable === true; };
					else
						filter = function(obj) { return obj.isWithdrawable === true && container.containerFilter(obj) };
					
					if(container.containerSize != undefined && context.getItemsOn(row, col, filter).length < container.containerSize) {
						solved = false;
					}
					if(container.containerFilter != undefined) {
						if(context.hasOn(row, col, function(obj) { return obj.isWithdrawable === true && !container.containerFilter(obj) })) {
							solved = false;
						}
					}
				}
				else {
					if(context.getItemsOn(row, col, function(obj) { return obj.isWithdrawable === true && obj.canBeOutside !== true; }).length > 0) {
						solved = false;
					}
				}
			}
		}
		
		if(solved) {
			context.success = true;
			throw(window.languageStrings.messages.successContainersFilled);
		}
		if(lastTurn) {
			context.success = false;
			throw(window.languageStrings.messages.failureContainersFilled);
		}
	}
};

var robotEndFunctionGenerator = {
	allFilteredPicked: function(filter) {
		return function(context, lastTurn) {
			var solved = true;
			for(var row = 0;row < context.nbRows;row++) {
				for(var col = 0;col < context.nbCols;col++) {
					var filtered = context.getItemsOn(row, col, function(obj) { return obj.isWithdrawable && filter(obj); })
					if(filtered.length != 0) {
						solved = false;
					}
				}
			}
			
			for(var item in context.bag) {
				if(!filter(context.bag[item])) {
					context.success = false;
					throw(window.languageStrings.messages.failureUnfilteredObject);
				}
			}
			
			if(solved) {
				context.success = true;
				throw(window.languageStrings.messages.successPickedAllWithdrawables);
			}
			if(lastTurn) {
				context.success = false;
				throw(window.languageStrings.messages.failurePickedAllWithdrawables);
			}
		};
	},
	allNumbersWritten: function(numbers) {
		return function(context, lastTurn) {
			var solved = true;
			for(var iNumber in numbers) {
				var number = numbers[iNumber];
				var items = context.getItemsOn(number.row, number.col, function(obj) { return obj.value !== undefined; });
				if(items.length == 0)
					throw("Error: no number here");
				
				var expected;
				if(typeof number.value === "number") {
					expected = number.value;
				} else {
					expected = number.value.bind(context)();
				}
				
				if(expected != items[0].value) {
					solved = false;
				}
			}
			
			if(solved) {
				context.success = true;
				throw(window.languageStrings.messages.successNumbersWritten);
			}
			
			if(lastTurn) {
				context.success = false;
				throw(window.languageStrings.messages.failureNumbersWritten);
			}
		};
	}
};
