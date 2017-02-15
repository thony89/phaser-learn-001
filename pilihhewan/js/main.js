var game = new Phaser.Game(640, 360, Phaser.AUTO );

var Gamestate = {
		preload: function(){
			this.load.image('backgroundmain' , 'assets/images/background.jpg');
			this.load.image('singa' , 'assets/images/singa.png');
			this.load.image('anjing' , 'assets/images/anjing.png');
			this.load.image('kucing' , 'assets/images/kucing.png');
			this.load.image('kodok' , 'assets/images/kodok.png');
			this.load.image('arrow' , 'assets/images/arrow.png');
		},
		create: function(){

			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;

			this.scale.updateLayout(true);

			this.background = this.game.add.sprite(0, 0, 'backgroundmain');

			var animalData = [
				{key: 'singa',  text:'SINGA'},
				{key: 'anjing',  text:'ANJING'},	
				{key: 'kucing',  text:'KUCING'},
				{key: 'kodok',  text:'KODOK'},
			];

			this.animals = this.game.add.group();

			var self = this;

			animalData.forEach(function(element){

				animal = self.animals.create(-2700, self.game.world.centerY, element.key);
				
				animal.customParams = {text: element.text};
				animal.anchor.setTo(0.5);

				animal.inputEnabled = true;
				animal.input.pixelPerfectClick = true;
				animal.events.onInputDown.add(self.animateAnimal, self);
			});

			this.currentAnimal = this.animals.next();
			this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

	

			this.rightArrow = this.game.add.sprite(500, this.game.world.centerY, 'arrow');
			this.rightArrow.anchor.setTo(0.1 , 0.5)
			this.rightArrow.customParams = {direction: 1};

			this.rightArrow.inputEnabled = true;
			this.rightArrow.input.pixelPerfectClick = true;
			this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

			this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
			this.leftArrow.anchor.setTo(0.8 , 0.5);
			this.leftArrow.scale.x = -1;
			this.leftArrow.customParams = {direction: -1};
			
			this.leftArrow.inputEnabled = true;
			this.leftArrow.input.pixelPerfectClick = true;
			this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

		},

		update: function()
		{

		},
		animateAnimal: function(sprite, event)
		{

		console.log('animate..');
		
		},
		switchAnimal: function(sprite, event)
		{
			var newAnimal, endX;
			if(sprite.customParams.direction > 0)
			{
				newAnimal = this.animals.next();
				endX = 640 + this.currentAnimal.width/2;
			}
			else {
				newAnimal = this.animals.previous();
				endX = -this.currentAnimal.width/2;
			}

			this.currentAnimal.x = endX;
			newAnimal.x = this.game.world.centerX;
			this.currentAnimal = newAnimal;
		}



};

game.state.add('mulaigame', Gamestate);
game.state.start('mulaigame');