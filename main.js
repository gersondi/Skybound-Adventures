// Phaser game configuration
const config = {
  type: Phaser.AUTO, // Automatically choose WebGL or Canvas renderer
  width: 800,        // Game width
  height: 600,       // Game height
  parent: 'game-container', // Attach to #game-container
  physics: {
    default: 'arcade', // Use arcade physics
    arcade: {
      gravity: { y: 300 }, // Apply gravity
      debug: false         // Disable debug mode
    }
  },
  scene: {
    preload: preload, // Preload assets
    create: create,   // Create game objects
    update: update    // Game loop logic
  }
};

// Initialize the game
const game = new Phaser.Game(config);

let cursors; // Declare controls globally
let player;  // Declare player globally

function preload() {
  // Load assets
  this.load.image('sky', 'assets/sky.png');          // Background image
  this.load.image('platform', 'assets/platform.png'); // Platform image
  this.load.image('player', 'assets/player.png');     // Player sprite
}

function create() {
  // Add background
  this.add.image(400, 300, 'sky'); // Centered background

  // Create platforms
  const platforms = this.physics.add.staticGroup(); // Static platforms
  platforms.create(400, 568, 'platform').setScale(2).refreshBody(); // Ground platform
  platforms.create(600, 400, 'platform'); // Floating platforms
  platforms.create(50, 250, 'platform');
  platforms.create(750, 220, 'platform');

  // Create player
  player = this.physics.add.sprite(100, 450, 'player'); // Player sprite
  player.setBounce(0.2); // Add bounce effect
  player.setCollideWorldBounds(true); // Prevent player from leaving the world

  // Enable collision between player and platforms
  this.physics.add.collider(player, platforms);

  // Enable keyboard input for controls
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Reset horizontal velocity
  player.setVelocityX(0);

  // Player movement
  if (cursors.left.isDown) {
    player.setVelocityX(-160); // Move left
  } else if (cursors.right.isDown) {
    player.setVelocityX(160); // Move right
  }

  // Jumping
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330); // Jump
  }
}
